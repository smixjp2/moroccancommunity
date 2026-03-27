"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Info, HelpCircle, TrendingUp, PiggyBank, Target, Calculator } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatCurrency } from "@/lib/utils";

// Define the output type manually as we are no longer using the AI flow
interface YearData {
  year: number;
  principal: number;
  interest: number;
  total: number;
}
export interface CompoundInterestOutput {
  finalValue: number;
  totalContributions: number;
  totalInterest: number;
  yearlyBreakdown: YearData[];
  analysis: string;
  recommendation: string;
}

const formSchema = z.object({
  initialInvestment: z.coerce.number().min(0, "L'investissement initial ne peut être négatif"),
  monthlyContribution: z.coerce.number().min(0, "La contribution mensuelle ne peut être négative"),
  annualReturnRate: z.coerce.number().min(0).max(100),
  investmentPeriod: z.coerce.number().int().min(1, "La période doit être d'au moins 1 an"),
  compoundingFrequency: z.enum(["annually", "monthly"]),
});

type FormValues = z.infer<typeof formSchema>;

export default function CompoundInterestSimulatorPage() {
  const [result, setResult] = useState<CompoundInterestOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initialInvestment: 10000,
      monthlyContribution: 500,
      annualReturnRate: 8,
      investmentPeriod: 20,
      compoundingFrequency: "monthly",
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setResult(null);

    const { initialInvestment, monthlyContribution, annualReturnRate, investmentPeriod, compoundingFrequency } = values;

    // Calculate compound interest
    const rate = annualReturnRate / 100;
    const compoundsPerYear = compoundingFrequency === 'monthly' ? 12 : 1;
    const monthlyRate = rate / compoundsPerYear;
    const monthlyContrib = monthlyContribution;

    let balance = initialInvestment;
    let totalContributions = initialInvestment;
    const yearlyBreakdown: YearData[] = [];

    for (let year = 1; year <= investmentPeriod; year++) {
      let yearStartBalance = balance;
      let yearInterest = 0;

      for (let month = 1; month <= 12; month++) {
        // Add monthly contribution at the beginning of each month
        if (compoundingFrequency === 'monthly') {
          balance += monthlyContrib;
          totalContributions += monthlyContrib;
        }

        // Calculate interest for this compounding period
        const interest = balance * monthlyRate;
        balance += interest;
        yearInterest += interest;

        // For annual compounding, add contribution once per year
        if (compoundingFrequency === 'annually' && month === 12) {
          balance += monthlyContrib * 12;
          totalContributions += monthlyContrib * 12;
        }
      }

      yearlyBreakdown.push({
        year,
        principal: totalContributions,
        interest: yearInterest,
        total: balance,
      });
    }

    const finalValue = balance;
    const totalInterest = finalValue - totalContributions;

    const analysis = `Sur ${investmentPeriod} ans, votre investissement initial de ${formatCurrency(initialInvestment)} MAD, combiné à des contributions mensuelles de ${formatCurrency(monthlyContribution)} MAD et un taux de rendement annuel de ${annualReturnRate}%, génère un montant total de ${formatCurrency(finalValue)} MAD. L'intérêt composé représente ${formatCurrency(totalInterest)} MAD, soit ${(totalInterest / finalValue * 100).toFixed(1)}% de la valeur finale.`;

    const recommendation = `L'intérêt composé est l'un des concepts les plus puissants en finance. Commencez tôt, contribuez régulièrement et laissez le temps travailler pour vous. Même de petits montants peuvent devenir significatifs grâce à la magie de la capitalisation.`;

    setTimeout(() => {
      setResult({
        finalValue,
        totalContributions,
        totalInterest,
        yearlyBreakdown,
        analysis,
        recommendation,
      });
      setLoading(false);
    }, 500);
  }

  const chartData = result ? result.yearlyBreakdown.map(item => ({
    year: item.year,
    "Principal": item.principal,
    "Intérêt Cumulé": item.interest,
    "Valeur Totale": item.total,
  })) : [];

  return (
    <div className="container py-8 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="font-headline text-3xl font-bold md:text-4xl mb-4">
          Simulateur d'Intérêt Composé
        </h1>
        <p className="text-muted-foreground md:text-lg max-w-2xl mx-auto">
          Découvrez la puissance de l'intérêt composé. Simulez la croissance de votre investissement au fil du temps.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Paramètres de Simulation
            </CardTitle>
            <CardDescription>
              Entrez les détails de votre investissement pour voir l'effet de l'intérêt composé.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="initialInvestment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Investissement Initial (MAD)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="10000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="monthlyContribution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contribution Mensuelle (MAD)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="annualReturnRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Taux de Rendement Annuel (%)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" placeholder="8" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="investmentPeriod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Période d'Investissement (années)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="compoundingFrequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fréquence de Capitalisation</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez la fréquence" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monthly">Mensuelle</SelectItem>
                          <SelectItem value="annually">Annuelle</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Calcul en cours...
                    </>
                  ) : (
                    <>
                      <Calculator className="mr-2 h-4 w-4" />
                      Calculer l'Intérêt Composé
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {result && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Résultats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {formatCurrency(result.finalValue)}
                    </div>
                    <div className="text-sm text-muted-foreground">Valeur Finale</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(result.totalInterest)}
                    </div>
                    <div className="text-sm text-muted-foreground">Intérêt Total</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCurrency(result.totalContributions)}
                    </div>
                    <div className="text-sm text-muted-foreground">Contributions Totales</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {((result.totalInterest / result.finalValue) * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Part de l'Intérêt</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Analyse</AlertTitle>
              <AlertDescription>{result.analysis}</AlertDescription>
            </Alert>

            <Alert>
              <HelpCircle className="h-4 w-4" />
              <AlertTitle>Recommandation</AlertTitle>
              <AlertDescription>{result.recommendation}</AlertDescription>
            </Alert>
          </div>
        )}
      </div>

      {result && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="font-headline">Évolution de l'Investissement</CardTitle>
            <CardDescription>
              Visualisez la croissance de votre portefeuille année par année
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    formatCurrency(value),
                    name === "Principal" ? "Principal" :
                    name === "Intérêt Cumulé" ? "Intérêt Cumulé" : "Valeur Totale"
                  ]}
                  labelFormatter={(label) => `Année ${label}`}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="Principal"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="Intérêt Cumulé"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}