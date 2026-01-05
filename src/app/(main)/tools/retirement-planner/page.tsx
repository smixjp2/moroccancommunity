"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Info, HelpCircle, TrendingUp, PiggyBank, Target } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatCurrency } from "@/lib/utils";

// Define the output type manually as we are no longer using the AI flow
interface YearData {
  year: number;
  value: number;
}
export interface RetirementPlannerOutput {
  finalSavings: number;
  totalContributions: number;
  totalInterest: number;
  yearlyBreakdown: YearData[];
  analysis: string;
  recommendation: string;
}

const formSchema = z.object({
  currentAge: z.coerce.number().int().min(18, "L'âge doit être d'au moins 18 ans"),
  retirementAge: z.coerce.number().int().min(40, "L'âge de la retraite doit être d'au moins 40 ans"),
  initialSavings: z.coerce.number().min(0, "L'épargne ne peut être négative"),
  monthlyContribution: z.coerce.number().min(0, "La contribution doit être positive"),
  annualReturnRate: z.coerce.number().min(0).max(100),
});

type FormValues = z.infer<typeof formSchema>;

export default function RetirementPlannerPage() {
  const [result, setResult] = useState<RetirementPlannerOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentAge: 30,
      retirementAge: 65,
      initialSavings: 100000,
      monthlyContribution: 2000,
      annualReturnRate: 7,
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setResult(null);

    const { currentAge, retirementAge, initialSavings, monthlyContribution, annualReturnRate } = values;
    const yearsToInvest = retirementAge - currentAge;
    const annualContribution = monthlyContribution * 12;
    const rate = annualReturnRate / 100;

    let futureValue = initialSavings;
    const yearlyBreakdown: YearData[] = [{ year: new Date().getFullYear(), value: initialSavings }];

    for (let i = 1; i <= yearsToInvest; i++) {
      futureValue = (futureValue + annualContribution) * (1 + rate);
      yearlyBreakdown.push({ year: new Date().getFullYear() + i, value: parseFloat(futureValue.toFixed(2)) });
    }

    const totalContributions = initialSavings + (annualContribution * yearsToInvest);
    const totalInterest = futureValue - totalContributions;

    const analysis = `Votre projection montre la puissance des intérêts composés. Sur ${yearsToInvest} ans, votre épargne pourrait atteindre ${formatCurrency(futureValue)}. Les intérêts générés représentent une part significative de votre capital final, démontrant l'importance d'investir tôt et régulièrement.`;
    const recommendation = `Pour améliorer votre plan, envisagez d'augmenter votre contribution mensuelle, même modestement. Explorez des options d'investissement diversifiées adaptées au marché marocain pour potentiellement améliorer votre rendement annuel. Révisez votre plan chaque année pour vous assurer que vous êtes toujours sur la bonne voie.`;

    setTimeout(() => {
      setResult({
        finalSavings: futureValue,
        totalContributions,
        totalInterest,
        yearlyBreakdown,
        analysis,
        recommendation,
      });
      setLoading(false);
    }, 500);
  }

  return (
    <>
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Planificateur de Retraite</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Visualisez la croissance de votre épargne retraite et déterminez si vous êtes sur la bonne voie pour atteindre vos objectifs financiers.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Vos Informations</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="currentAge" render={({ field }) => (
                        <FormItem><FormLabel>Âge Actuel</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="retirementAge" render={({ field }) => (
                        <FormItem><FormLabel>Âge de Retraite</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                <FormField control={form.control} name="initialSavings" render={({ field }) => (
                    <FormItem><FormLabel>Épargne Actuelle (MAD)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="monthlyContribution" render={({ field }) => (
                    <FormItem><FormLabel>Contribution Mensuelle (MAD)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="annualReturnRate" render={({ field }) => (
                    <FormItem><FormLabel>Taux de Rendement Annuel (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Planifier ma Retraite"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Projection de votre Retraite</CardTitle>
            </CardHeader>
            <CardContent>
              {loading && <div className="flex justify-center items-center h-96"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
              
              {result && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 text-center">
                    <Card>
                        <CardHeader><Target className="mx-auto h-8 w-8 text-primary mb-2" /><CardTitle className="text-lg">Épargne à la Retraite</CardTitle></CardHeader>
                        <CardContent><p className="text-3xl font-bold">{formatCurrency(result.finalSavings)}</p></CardContent>
                    </Card>
                    <div className="grid grid-cols-2 gap-4">
                        <Card>
                            <CardHeader><PiggyBank className="mx-auto h-6 w-6 text-primary mb-1" /><CardTitle className="text-base">Total Contribué</CardTitle></CardHeader>
                            <CardContent><p className="text-xl font-bold">{formatCurrency(result.totalContributions)}</p></CardContent>
                        </Card>
                        <Card>
                            <CardHeader><TrendingUp className="mx-auto h-6 w-6 text-primary mb-1" /><CardTitle className="text-base">Total des Intérêts</CardTitle></CardHeader>
                            <CardContent><p className="text-xl font-bold">{formatCurrency(result.totalInterest)}</p></CardContent>
                        </Card>
                    </div>
                  </div>
                  
                  <Card>
                    <CardHeader><CardTitle>Croissance de l'Épargne</CardTitle></CardHeader>
                    <CardContent>
                      <div className="h-[250px] w-full">
                        <ResponsiveContainer>
                          <LineChart data={result.yearlyBreakdown} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                            <Tooltip formatter={(value) => formatCurrency(value as number)}/>
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" name="Épargne Totale" strokeWidth={2} dot={false}/>
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Alert><Info className="h-4 w-4" /><AlertTitle className="font-headline">Analyse</AlertTitle><AlertDescription>{result.analysis}</AlertDescription></Alert>
                  <Alert><Info className="h-4 w-4" /><AlertTitle className="font-headline">Recommandation</AlertTitle><AlertDescription>{result.recommendation}</AlertDescription></Alert>
                </div>
              )}
              {!result && !loading && <div className="text-center text-muted-foreground h-96 flex items-center justify-center"><p>Vos résultats de planification apparaîtront ici.</p></div>}
            </CardContent>
          </Card>
           <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 font-headline"><HelpCircle className="h-6 w-6 text-primary"/>Guide d'Utilisation</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>La magie de l'investissement pour la retraite réside dans les intérêts composés. Cet outil vous aide à visualiser cet effet.</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Âge Actuel & de Retraite :</strong> Définit votre horizon de temps d'investissement. Plus il est long, plus les intérêts composés sont puissants.</li>
                    <li><strong>Épargne Actuelle :</strong> Votre point de départ.</li>
                    <li><strong>Contribution Mensuelle :</strong> La régularité de vos cotisations est la clé de la croissance.</li>
                    <li><strong>Taux de Rendement Annuel (%) :</strong> Le moteur de votre croissance. Un portefeuille diversifié en actions peut historiquement viser 7-10% par an, mais ce rendement n'est pas garanti.</li>
                </ul>
                <p><strong>Analyse :</strong> Le graphique illustre comment votre épargne (ligne bleue) s'accélère avec le temps. La différence entre votre épargne finale et le total de vos contributions représente les gains générés par vos investissements. L'outil vous donnera des pistes pour savoir si votre plan est réaliste et comment l'améliorer.</p>
            </CardContent>
        </Card>
        </div>
      </div>
    </>
  );
}
