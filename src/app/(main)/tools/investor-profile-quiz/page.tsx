
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
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, ArrowRight, ArrowLeft, User, BarChart, Brain, TrendingDown, HelpCircle, Info, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

export interface InvestorProfileQuizOutput {
  profile: string;
  description: string;
  recommendation: string;
  analysis: string;
}

const formSchema = z.object({
  age: z.coerce.number().min(18, "L'âge doit être d'au moins 18 ans"),
  investmentHorizon: z.string({required_error: "Veuillez sélectionner une option."}),
  riskTolerance: z.string({required_error: "Veuillez sélectionner une option."}),
  marketDropResponse: z.string({required_error: "Veuillez sélectionner une option."}),
  investmentKnowledge: z.string({required_error: "Veuillez sélectionner une option."}),
});

type FormValues = z.infer<typeof formSchema>;

const formSteps = [
    { id: "age", label: "Votre Âge", icon: User },
    { id: "investmentHorizon", label: "Horizon de Placement", icon: BarChart },
    { id: "riskTolerance", label: "Tolérance au Risque", icon: TrendingDown },
    { id: "marketDropResponse", label: "Réaction à la Baisse", icon: TrendingDown },
    { id: "investmentKnowledge", label: "Connaissances", icon: Brain },
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
    defaultValues: {
        age: 30,
    },
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

    // Simple logic to determine profile
    let score = 0;
    if (data.investmentHorizon === 'Moyen terme (3-7 ans)') score += 1;
    if (data.investmentHorizon === 'Long terme (> 7 ans)') score += 2;
    if (data.riskTolerance === 'Modérée') score += 1;
    if (data.riskTolerance === 'Élevée') score += 2;
    if (data.marketDropResponse === 'Ne rien faire et attendre') score += 1;
    if (data.marketDropResponse === "Acheter plus car c'est une opportunité") score += 2;
    if (data.investmentKnowledge === 'Intermédiaire') score += 1;
    if (data.investmentKnowledge === 'Avancé') score += 2;
    if (data.age < 40) score += 1;

    let profileData: InvestorProfileQuizOutput;
    if (score <= 3) {
      profileData = {
        profile: 'Prudent',
        description: "Votre priorité est la sécurité du capital. Vous préférez des rendements stables et un risque minimal.",
        analysis: "Votre profil prudent est principalement défini par une faible tolérance au risque et un horizon de placement potentiellement court. Votre réaction face à une baisse de marché et vos connaissances en investissement confirment cette tendance à la prudence.",
        recommendation: "Allocation suggérée : 60% Obligations/Fonds monétaires, 20% OPCVM Actions, 10% Immobilier (OPCI), 10% Liquidités. Concentrez-vous sur des entreprises solides et bien établies avec des dividendes réguliers."
      };
    } else if (score <= 6) {
      profileData = {
        profile: 'Équilibré',
        description: "Vous recherchez un équilibre entre croissance et sécurité. Vous êtes prêt à accepter un risque modéré pour un meilleur rendement.",
        analysis: "Votre profil équilibré montre que vous comprenez la nécessité de prendre un certain risque pour obtenir de la croissance, tout en restant mesuré. Votre horizon de placement à moyen ou long terme vous le permet. Votre réponse à une baisse de marché est rationnelle.",
        recommendation: "Allocation suggérée : 40% OPCVM Actions, 40% Obligations, 15% Immobilier (OPCI), 5% Liquidités. Un portefeuille diversifié entre actions de croissance et de valeur est idéal."
      };
    } else {
      profileData = {
        profile: 'Dynamique',
        description: "Vous êtes à l'aise avec le risque et visez une croissance significative de votre capital à long terme.",
        analysis: "Votre profil dynamique est caractérisé par un horizon de placement long, une bonne tolérance au risque et une vision opportuniste des baisses de marché. Votre niveau de connaissance vous permet d'envisager des stratégies plus audacieuses.",
        recommendation: "Allocation suggérée : 70% Actions (Marocaines et Internationales via OPCVM), 15% Obligations, 15% Immobilier/Alternatifs. Vous pouvez inclure des secteurs de croissance comme la technologie et les énergies renouvelables."
      };
    }

    // Save profile to Firestore if user is logged in
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
          Répondez à quelques questions pour découvrir votre profil d'investisseur et recevoir des recommandations adaptées au marché marocain.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
           <Progress value={result ? 100 : progress} className="mb-4" />
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <AnimatePresence mode="wait">
                
                {currentStep === 0 && (
                    <motion.div key="step-0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                        <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-lg">Quel âge avez-vous ?</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
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
                                <FormItem className="space-y-3">
                                <FormLabel className="text-lg">Quel est votre horizon de placement ?</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl><RadioGroupItem value="Court terme (< 3 ans)" /></FormControl>
                                        <FormLabel className="font-normal">Court terme (&lt; 3 ans)</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl><RadioGroupItem value="Moyen terme (3-7 ans)" /></FormControl>
                                        <FormLabel className="font-normal">Moyen terme (3-7 ans)</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl><RadioGroupItem value="Long terme (> 7 ans)" /></FormControl>
                                        <FormLabel className="font-normal">Long terme (&gt; 7 ans)</FormLabel>
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
                        <FormField control={form.control} name="riskTolerance" render={({ field }) => (
                             <FormItem className="space-y-3">
                                <FormLabel className="text-lg">Comment décririez-vous votre tolérance au risque ?</FormLabel>
                                 <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                        <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Très faible" /></FormControl><FormLabel className="font-normal">Très faible : La préservation du capital est ma priorité absolue.</FormLabel></FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Faible" /></FormControl><FormLabel className="font-normal">Faible : Je préfère des gains modestes avec un risque minimal.</FormLabel></FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Modérée" /></FormControl><FormLabel className="font-normal">Modérée : Je suis prêt à prendre un risque calculé pour un rendement plus élevé.</FormLabel></FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Élevée" /></FormControl><FormLabel className="font-normal">Élevée : Je vise des rendements élevés et j'accepte une volatilité importante.</FormLabel></FormItem>
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
                             <FormItem className="space-y-3">
                                <FormLabel className="text-lg">Si le marché chutait de 20%, que feriez-vous ?</FormLabel>
                                 <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                        <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Vendre pour limiter les pertes" /></FormControl><FormLabel className="font-normal">Je vends pour limiter mes pertes.</FormLabel></FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Ne rien faire et attendre" /></FormControl><FormLabel className="font-normal">Je ne fais rien et j'attends que ça remonte.</FormLabel></FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Acheter plus car c'est une opportunité" /></FormControl><FormLabel className="font-normal">J'achète plus, c'est une opportunité !</FormLabel></FormItem>
                                    </RadioGroup>
                                 </FormControl>
                                <FormMessage />
                             </FormItem>
                        )}/>
                    </motion.div>
                )}

                {currentStep === 4 && (
                    <motion.div key="step-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                       <FormField control={form.control} name="investmentKnowledge" render={({ field }) => (
                             <FormItem className="space-y-3">
                                <FormLabel className="text-lg">Quel est votre niveau de connaissance en investissement ?</FormLabel>
                                 <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                        <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Débutant" /></FormControl><FormLabel className="font-normal">Débutant : Je commence tout juste à apprendre.</FormLabel></FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Intermédiaire" /></FormControl><FormLabel className="font-normal">Intermédiaire : Je connais les bases (actions, obligations).</FormLabel></FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="Avancé" /></FormControl><FormLabel className="font-normal">Avancé : Je suis à l'aise avec des concepts complexes (options, analyse technique).</FormLabel></FormItem>
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
                        <p className="text-muted-foreground">Analyse et sauvegarde de votre profil...</p>
                    </motion.div>
                )}

                {result && !loading && (
                    <motion.div key="result" className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Card className="bg-primary/10 border-primary">
                            <CardHeader>
                                <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                                    <Target className="h-8 w-8 text-primary"/>
                                    <p className="text-muted-foreground">Votre Profil d'Investisseur</p>
                                </CardHeader>
                                <h2 className="text-primary text-center font-headline text-3xl">{result.profile}</h2>
                                <p className="text-center text-muted-foreground pt-2">{result.description}</p>
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
                          <BarChart className="h-4 w-4" />
                          <AlertTitle className="font-headline">Recommandations</AlertTitle>
                          <AlertDescription>
                            <p className="whitespace-pre-line">{result.recommendation}</p>
                          </AlertDescription>
                        </Alert>
                    </motion.div>
                )}
                

              </AnimatePresence>

              {!result && !loading && (
                <div className="flex justify-between items-center pt-4">
                  <Button type="button" variant="outline" onClick={handlePrev} disabled={currentStep === 0}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Précédent
                  </Button>
                  {currentStep < formSteps.length - 1 ? (
                    <Button type="button" onClick={handleNext}>
                      Suivant <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={loading || !user}>
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Découvrir mon Profil"}
                    </Button>
                  )}
                </div>
              )}
              
               {!user && !loading && !result && currentStep === formSteps.length - 1 && (
                  <Alert variant="destructive" className="mt-4">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Connexion requise</AlertTitle>
                    <AlertDescription>
                      Vous devez être <a href="/login" className="underline font-bold">connecté</a> pour sauvegarder et voir votre profil sur votre tableau de bord.
                    </AlertDescription>
                  </Alert>
               )}

              {result && !loading && (
                 <div className="text-center pt-6 space-y-2">
                     <Button type="button" onClick={() => {
                         if (user) {
                             router.push('/dashboard');
                         } else {
                            setCurrentStep(0); setResult(null); form.reset();
                         }
                     }}>
                        {user ? "Voir mon Tableau de Bord" : "Recommencer le quiz"}
                    </Button>
                 </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
      
       <Card className="max-w-2xl mx-auto mt-8">
            <CardHeader>
                <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                    <HelpCircle className="h-6 w-6 text-primary"/>
                    <h3 className="font-headline text-lg">Guide d'Utilisation</h3>
                </CardHeader>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>Ce quiz vous aide à mieux comprendre votre attitude face à l'investissement et au risque. Il n'y a pas de bonnes ou de mauvaises réponses.</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Horizon de placement :</strong> C'est la durée pendant laquelle vous prévoyez d'investir. Un horizon long permet de prendre plus de risques car vous avez le temps de récupérer d'éventuelles baisses.</li>
                    <li><strong>Tolérance au risque :</strong> C'est votre capacité émotionnelle et financière à supporter les fluctuations du marché. Soyez honnête avec vous-même.</li>
                    <li><strong>Réaction à la baisse :</strong> Cette question est un excellent indicateur de votre comportement en situation de stress sur les marchés.</li>
                </ul>
                <p><strong>Analyse :</strong> Le profil déterminé est une indication de votre comportement général. Les recommandations d'allocation sont des exemples classiques et doivent être adaptées à votre situation personnelle et à vos recherches.</p>
            </CardContent>
        </Card>
    </div>
  );
}
