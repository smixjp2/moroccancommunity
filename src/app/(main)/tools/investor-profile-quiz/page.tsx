
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useUser, useFirestore } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, ArrowRight, ArrowLeft, User, BarChart, Brain, TrendingDown, HelpCircle, Info, Target, PieChartIcon, Gem } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

export interface InvestorProfileQuizOutput {
  profile: string;
  description: string;
  analysis: string;
  recommendation: string;
}

const formSchema = z.object({
  investmentGoal: z.string({required_error: "Veuillez sélectionner une option."}),
  investmentHorizon: z.string({required_error: "Veuillez sélectionner une option."}),
  investmentKnowledge: z.string({required_error: "Veuillez sélectionner une option."}),
  marketDropResponse: z.string({required_error: "Veuillez sélectionner une option."}),
  volatilityTolerance: z.string({required_error: "Veuillez sélectionner une option."}),
});

type FormValues = z.infer<typeof formSchema>;

const formSteps = [
    { id: "investmentGoal", label: "Objectif Principal", icon: Target },
    { id: "investmentHorizon", label: "Horizon de Placement", icon: BarChart },
    { id: "investmentKnowledge", label: "Connaissances", icon: Brain },
    { id: "marketDropResponse", label: "Réaction à la Baisse", icon: TrendingDown },
    { id: "volatilityTolerance", label: "Tolérance à la Volatilité", icon: Gem },
];

export default function InvestorProfileQuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<InvestorProfileQuizOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const { trigger } = form;

  const handleNext = async () => {
    const field = formSteps[currentStep].id as keyof FormValues;
    const isValid = await trigger(field);
    if (isValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    setResult(null);

    let score = 0;
    // Scoring logic based on new questions
    if (data.investmentGoal === 'Revenu complémentaire') score += 1;
    if (data.investmentGoal === 'Fructifier à long terme') score += 2;
    if (data.investmentGoal === 'Maximiser la croissance') score += 3;

    if (data.investmentHorizon === '3-7 ans') score += 1;
    if (data.investmentHorizon === '7-15 ans') score += 2;
    if (data.investmentHorizon === '> 15 ans') score += 3;
    
    if (data.investmentKnowledge === 'Intermédiaire') score += 1;
    if (data.investmentKnowledge === 'Avancé') score += 2;

    if (data.marketDropResponse === 'Ne rien faire') score += 1;
    if (data.marketDropResponse === 'Maintenir la stratégie') score += 2;
    if (data.marketDropResponse === 'Acheter plus') score += 3;

    if (data.volatilityTolerance === 'Accepter de légères baisses') score += 1;
    if (data.volatilityTolerance === 'Accepter des fluctuations importantes') score += 2;
    if (data.volatilityTolerance === 'Rechercher le rendement maximal') score += 3;


    let profileData: InvestorProfileQuizOutput;
    if (score <= 3) {
      profileData = {
        profile: 'Prudent',
        description: "Votre priorité absolue est la préservation de votre capital. Vous préférez des placements à faible risque, même si cela signifie un rendement plus modeste.",
        analysis: "Vos réponses indiquent une faible tolérance au risque et un besoin de sécurité. Vous êtes peu à l'aise avec la volatilité et préférez des stratégies qui minimisent les pertes potentielles.",
        recommendation: "Allocation suggérée pour le marché marocain :\n- 60% OPCVM Monétaires ou Obligataires\n- 20% OPCI (Immobilier)\n- 15% Actions de grandes entreprises stables (blue chips) à dividende\n- 5% Liquidités"
      };
    } else if (score <= 7) {
      profileData = {
        profile: 'Équilibré',
        description: "Vous recherchez un juste milieu entre la sécurité de votre capital et un potentiel de croissance. Vous êtes prêt à accepter un risque modéré pour obtenir un meilleur rendement à moyen/long terme.",
        analysis: "Vous montrez une approche réfléchie. Vous comprenez que la croissance nécessite une part de risque, mais vous restez mesuré. Votre horizon de placement vous permet d'absorber une certaine volatilité.",
        recommendation: "Allocation suggérée pour le marché marocain :\n- 45% OPCVM Actions (diversifiés)\n- 35% OPCVM Obligataires\n- 15% OPCI (Immobilier)\n- 5% Liquidités"
      };
    } else if (score <= 11) {
        profileData = {
        profile: 'Dynamique',
        description: "Votre objectif est la croissance de votre capital sur le long terme. Vous êtes à l'aise avec un niveau de risque significatif pour aller chercher des rendements plus élevés.",
        analysis: "Vos choix révèlent une bonne tolérance au risque et une vision à long terme. Vous percevez les baisses de marché comme des opportunités plutôt que des menaces, ce qui est une caractéristique des investisseurs axés sur la croissance.",
        recommendation: "Allocation suggérée pour le marché marocain :\n- 70% OPCVM Actions (incluant des secteurs de croissance)\n- 15% OPCVM Obligataires\n- 10% OPCI (Immobilier)\n- 5% Actifs alternatifs ou diversification internationale (via OPCVM)"
        };
    } else {
      profileData = {
        profile: 'Agressif',
        description: "Vous visez la performance maximale et êtes prêt à accepter une volatilité très élevée. Vous êtes à la recherche d'opportunités de croissance exceptionnelles, même si cela comporte des risques importants.",
        analysis: "Votre profil est celui d'un investisseur très expérimenté ou ayant une très forte tolérance au risque. Vous êtes prêt à vous concentrer sur des actifs à fort potentiel, en acceptant la possibilité de pertes importantes à court terme.",
        recommendation: "Allocation suggérée pour le marché marocain :\n- 85% Actions (en direct 'stock-picking' et/ou OPCVM spécialisés sur des secteurs de croissance comme la technologie)\n- 10% Actifs Alternatifs/International\n- 5% OPCI ou immobilier"
      };
    }

    if (user) {
      try {
        const userDocRef = doc(firestore, "users", user.uid);
        await setDoc(userDocRef, { investorProfile: profileData.profile }, { merge: true });
        toast({
          title: "Profil sauvegardé !",
          description: "Votre profil d'investisseur a été mis à jour sur votre tableau de bord.",
        });
        setTimeout(() => router.push('/dashboard'), 2000);
      } catch (error) {
        console.error("Erreur lors de la sauvegarde du profil:", error);
        toast({
            variant: "destructive",
            title: "Erreur",
            description: "Impossible de sauvegarder votre profil. Veuillez réessayer.",
        });
      }
    }

    setResult(profileData);
    setLoading(false);
  };

  const progress = (currentStep / formSteps.length) * 100;

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Quiz : Quel est votre Profil d'Investisseur ?</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Répondez à ces 5 questions pour découvrir votre profil d'investisseur et recevoir des recommandations adaptées au marché marocain.
        </p>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
           <Progress value={result ? 100 : progress} className="mb-4" />
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 min-h-[350px]">
              <AnimatePresence mode="wait">
                
                {currentStep === 0 && (
                    <motion.div key="step-0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                        <FormField
                            control={form.control}
                            name="investmentGoal"
                            render={({ field }) => (
                                <FormItem className="space-y-4">
                                <FormLabel className="text-lg font-semibold">1. Quel est votre objectif principal d'investissement ?</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                                        <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4 transition-all hover:bg-muted/50 has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary">
                                            <FormControl><RadioGroupItem value="Protéger de l'inflation" /></FormControl>
                                            <FormLabel className="font-normal cursor-pointer">Préserver mon capital et le protéger de l'inflation.</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4 transition-all hover:bg-muted/50 has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary">
                                            <FormControl><RadioGroupItem value="Revenu complémentaire" /></FormControl>
                                            <FormLabel className="font-normal cursor-pointer">Générer un revenu complémentaire régulier (via les dividendes ou intérêts).</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4 transition-all hover:bg-muted/50 has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary">
                                            <FormControl><RadioGroupItem value="Fructifier à long terme" /></FormControl>
                                            <FormLabel className="font-normal cursor-pointer">Faire fructifier mon capital sur le long terme, avec une croissance équilibrée.</FormLabel>
                                        </FormItem>
                                         <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4 transition-all hover:bg-muted/50 has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary">
                                            <FormControl><RadioGroupItem value="Maximiser la croissance" /></FormControl>
                                            <FormLabel className="font-normal cursor-pointer">Maximiser la croissance de mon capital, en acceptant un risque élevé.</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </motion.div>
                )}

                {currentStep === 1 && (
                    <motion.div key="step-1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                        <FormField
                            control={form.control}
                            name="investmentHorizon"
                            render={({ field }) => (
                                <FormItem className="space-y-4">
                                <FormLabel className="text-lg font-semibold">2. Dans combien de temps prévoyez-vous avoir besoin de cet argent ?</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 transition-all hover:bg-muted/50 has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary">
                                            <FormControl><RadioGroupItem value="< 3 ans" /></FormControl>
                                            <FormLabel className="font-normal cursor-pointer">Moins de 3 ans</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 transition-all hover:bg-muted/50 has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary">
                                            <FormControl><RadioGroupItem value="3-7 ans" /></FormControl>
                                            <FormLabel className="font-normal cursor-pointer">Entre 3 et 7 ans</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 transition-all hover:bg-muted/50 has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary">
                                            <FormControl><RadioGroupItem value="7-15 ans" /></FormControl>
                                            <FormLabel className="font-normal cursor-pointer">Entre 7 et 15 ans</FormLabel>
                                        </FormItem>
                                         <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 transition-all hover:bg-muted/50 has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary">
                                            <FormControl><RadioGroupItem value="> 15 ans" /></FormControl>
                                            <FormLabel className="font-normal cursor-pointer">Plus de 15 ans</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </motion.div>
                )}

                {currentStep === 2 && (
                    <motion.div key="step-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                       <FormField control={form.control} name="investmentKnowledge" render={({ field }) => (
                             <FormItem className="space-y-4">
                                <FormLabel className="text-lg font-semibold">3. Comment décririez-vous votre niveau de connaissance en matière de placements ?</FormLabel>
                                 <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                                        <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4 transition-all hover:bg-muted/50 has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary">
                                            <FormControl><RadioGroupItem value="Débutant" /></FormControl>
                                            <FormLabel className="font-normal cursor-pointer">Débutant : Je ne connais que les placements de base comme les comptes sur carnet.</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4 transition-all hover:bg-muted/50 has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary">
                                            <FormControl><RadioGroupItem value="Intermédiaire" /></FormControl>
                                            <FormLabel className="font-normal cursor-pointer">Intermédiaire : Je comprends les concepts d'actions, d'obligations et d'OPCVM.</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4 transition-all hover:bg-muted/50 has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary">
                                            <FormControl><RadioGroupItem value="Avancé" /></FormControl>
                                            <FormLabel className="font-normal cursor-pointer">Avancé : Je suis familier avec l'analyse financière et les stratégies de portefeuille.</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                 </FormControl>
                                <FormMessage />
                             </FormItem>
                        )}/>
                    </motion.div>
                )}
                
                {currentStep === 3 && (
                    <motion.div key="step-3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                        <FormField control={form.control} name="marketDropResponse" render={({ field }) => (
                             <FormItem className="space-y-4">
                                <FormLabel className="text-lg font-semibold">4. Si votre portefeuille perdait 20% de sa valeur en quelques mois, que feriez-vous ?</FormLabel>
                                 <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                                        <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4 transition-all hover:bg-muted/50 has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary">
                                            <FormControl><RadioGroupItem value="Vendre pour limiter les pertes" /></FormControl>
                                            <FormLabel className="font-normal cursor-pointer">Je vends une partie pour limiter d'autres pertes.</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4 transition-all hover:bg-muted/50 has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary">
                                            <FormControl><RadioGroupItem value="Ne rien faire" /></FormControl>
                                            <FormLabel className="font-normal cursor-pointer">Je suis inquiet mais je ne vends rien, j'attends.</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4 transition-all hover:bg-muted/50 has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary">
                                            <FormControl><RadioGroupItem value="Maintenir la stratégie" /></FormControl>
                                            <FormLabel className="font-normal cursor-pointer">Je maintiens ma stratégie, les baisses font partie du processus.</FormLabel>
                                        </FormItem>
                                         <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4 transition-all hover:bg-muted/50 has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary">
                                            <FormControl><RadioGroupItem value="Acheter plus" /></FormControl>
                                            <FormLabel className="font-normal cursor-pointer">Je vois cela comme une opportunité et j'investis davantage.</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                 </FormControl>
                                <FormMessage />
                             </FormItem>
                        )}/>
                    </motion.div>
                )}

                {currentStep === 4 && (
                    <motion.div key="step-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                       <FormField control={form.control} name="volatilityTolerance" render={({ field }) => (
                             <FormItem className="space-y-4">
                                <FormLabel className="text-lg font-semibold">5. Lequel de ces compromis rendement/risque vous convient le mieux ?</FormLabel>
                                 <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                                        <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4 transition-all hover:bg-muted/50 has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary">
                                            <FormControl><RadioGroupItem value="Rendement faible et stable" /></FormControl>
                                            <FormLabel className="font-normal cursor-pointer">Je ne suis pas à l'aise avec la volatilité. Je préfère un rendement faible mais stable.</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4 transition-all hover:bg-muted/50 has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary">
                                            <FormControl><RadioGroupItem value="Accepter de légères baisses" /></FormControl>
                                            <FormLabel className="font-normal cursor-pointer">Je peux accepter de légères baisses de valeur à court terme pour un potentiel de gain un peu plus élevé.</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4 transition-all hover:bg-muted/50 has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary">
                                            <FormControl><RadioGroupItem value="Accepter des fluctuations importantes" /></FormControl>
                                            <FormLabel className="font-normal cursor-pointer">Je suis prêt à voir la valeur de mon portefeuille fluctuer de manière significative pour viser un rendement élevé à long terme.</FormLabel>
                                        </FormItem>
                                         <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4 transition-all hover:bg-muted/50 has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary">
                                            <FormControl><RadioGroupItem value="Rechercher le rendement maximal" /></FormControl>
                                            <FormLabel className="font-normal cursor-pointer">Je recherche le rendement le plus élevé possible et je comprends que cela implique des baisses potentiellement importantes et fréquentes.</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                 </FormControl>
                                <FormMessage />
                             </FormItem>
                        )}/>
                    </motion.div>
                )}

                {loading && (
                    <motion.div key="loading" className="flex flex-col items-center justify-center h-48 space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <p className="text-muted-foreground">Analyse de votre profil...</p>
                    </motion.div>
                )}

                {result && !loading && (
                    <motion.div key="result" className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Card className="bg-primary/10 border-primary text-center">
                            <CardHeader>
                                <Target className="h-10 w-10 text-primary mx-auto mb-2"/>
                                <p className="text-muted-foreground">Votre Profil d'Investisseur</p>
                                <h2 className="text-primary font-headline text-4xl font-bold">{result.profile}</h2>
                                <p className="text-center text-muted-foreground pt-2 max-w-xl mx-auto">{result.description}</p>
                            </CardHeader>
                        </Card>
                         <Alert>
                          <Info className="h-4 w-4" />
                          <AlertTitle className="font-headline">Analyse de votre profil</AlertTitle>
                          <AlertDescription>
                            <p>{result.analysis}</p>
                          </AlertDescription>
                        </Alert>
                         <Alert>
                          <PieChartIcon className="h-4 w-4" />
                          <AlertTitle className="font-headline">Suggestion d'Allocation (Marché Marocain)</AlertTitle>
                          <AlertDescription>
                            <p className="whitespace-pre-line">{result.recommendation}</p>
                          </AlertDescription>
                        </Alert>
                    </motion.div>
                )}
                

              </AnimatePresence>

              {!result && !loading && (
                <div className="flex justify-between items-center pt-4 mt-8 border-t">
                  <Button type="button" variant="outline" onClick={handlePrev} disabled={currentStep === 0}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Précédent
                  </Button>
                  {currentStep < formSteps.length - 1 ? (
                    <Button type="button" onClick={handleNext}>
                      Suivant <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={loading}>
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Découvrir mon Profil"}
                    </Button>
                  )}
                </div>
              )}
              
               {!user && !loading && !result && currentStep === formSteps.length - 1 && (
                  <Alert variant="destructive" className="mt-4">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Connexion Recommandée</AlertTitle>
                    <AlertDescription>
                      <a href="/login" className="underline font-bold">Connectez-vous</a> pour sauvegarder votre profil et le retrouver sur votre tableau de bord.
                    </AlertDescription>
                  </Alert>
               )}

              {result && !loading && (
                 <div className="text-center pt-6 mt-8 border-t space-y-2">
                     <Button type="button" onClick={() => {
                         if (user) {
                             router.push('/dashboard');
                         } else {
                            setCurrentStep(0); setResult(null); form.reset();
                         }
                     }}>
                        {user ? "Aller à mon Tableau de Bord" : "Recommencer le quiz"}
                    </Button>
                 </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
      
       <Card className="max-w-3xl mx-auto mt-8">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline"><HelpCircle className="h-6 w-6 text-primary"/>Comment fonctionne ce quiz ?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>Ce quiz a pour but de vous aider à mieux comprendre votre propre psychologie d'investisseur. Il n'y a pas de "bon" ou de "mauvais" profil, seulement celui qui vous correspond le mieux.</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Horizon de placement :</strong> C'est la durée pendant laquelle vous pouvez vous permettre de laisser votre argent investi. Un horizon long (plus de 7 ans) permet de prendre plus de risques car vous avez le temps de surmonter les baisses du marché.</li>
                    <li><strong>Tolérance au risque :</strong> Elle mesure votre capacité, tant émotionnelle que financière, à supporter les fluctuations de la valeur de votre portefeuille.</li>
                    <li><strong>Réaction à la baisse :</strong> Cette question révèle votre comportement instinctif face au stress du marché, un facteur clé dans la réussite à long terme.</li>
                </ul>
                <p className="font-semibold text-foreground pt-2">Important :</p>
                <Alert variant="default">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Avertissement</AlertTitle>
                    <AlertDescription>
                        Les résultats et les allocations suggérées sont fournis à titre purement indicatif et éducatif. Ils ne constituent en aucun cas un conseil en investissement personnalisé. Faites toujours vos propres recherches avant de prendre une décision financière.
                    </Aler