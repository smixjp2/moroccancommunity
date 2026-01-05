"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { determineInvestorProfile, type InvestorProfileQuizInput, type InvestorProfileQuizOutput } from "@/ai/flows/investor-profile-quiz";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, ArrowRight, ArrowLeft, User, BarChart, Brain, TrendingDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
]

export default function InvestorProfileQuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<InvestorProfileQuizOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    setError(null);
    try {
      const response = await determineInvestorProfile(data);
      setResult(response);
    } catch (e) {
      setError("Une erreur est survenue lors de l'analyse. Veuillez réessayer.");
      console.error(e);
    } finally {
      setLoading(false);
    }
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
                        <p className="text-muted-foreground">Analyse de votre profil en cours...</p>
                    </motion.div>
                )}

                {result && !loading && (
                    <motion.div key="result" className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Card className="bg-primary/10">
                            <CardHeader>
                                <CardTitle className="text-primary text-center font-headline text-3xl">{result.profile}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center text-muted-foreground">{result.description}</p>
                            </CardContent>
                        </Card>
                         <Alert>
                          <BarChart className="h-4 w-4" />
                          <AlertTitle className="font-headline">Recommandations</AlertTitle>
                          <AlertDescription>
                            <p className="whitespace-pre-line">{result.recommendation}</p>
                          </AlertDescription>
                        </Alert>
                    </motion.div>
                )}
                
                {error && <p className="text-destructive text-center">{error}</p>}

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
                    <Button type="submit" disabled={loading}>
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Découvrir mon Profil"}
                    </Button>
                  )}
                </div>
              )}

              {(result || error) && !loading && (
                 <div className="text-center pt-4">
                     <Button type="button" onClick={() => { setCurrentStep(0); setResult(null); setError(null); form.reset(); }}>
                        Recommencer le quiz
                    </Button>
                 </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
