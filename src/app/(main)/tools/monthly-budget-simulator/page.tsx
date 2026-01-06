
"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, HelpCircle, Wallet, PlusCircle, Trash2, TrendingUp, TrendingDown, Circle, AlertCircle, Sparkles, Goal } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

const formSchema = z.object({
  salary: z.coerce.number().min(0, "Le salaire doit être positif."),
  otherIncomes: z.coerce.number().min(0, "Les autres revenus doivent être positifs."),
  rent: z.coerce.number().min(0, "Le loyer doit être positif."),
  loans: z.coerce.number().min(0, "Les crédits doivent être positifs."),
  food: z.coerce.number().min(0, "Le budget nourriture doit être positif."),
  transport: z.coerce.number().min(0, "Le budget transport doit être positif."),
  leisure: z.coerce.number().min(0, "Le budget loisirs doit être positif."),
  otherExpenses: z.coerce.number().min(0, "Les autres dépenses doivent être positives."),
});

type FormValues = z.infer<typeof formSchema>;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

interface AnalysisResult {
    totalIncomes: number;
    totalExpenses: number;
    balance: number;
    debtRatio: number;
    expenseData: { name: string; value: number }[];
}

const ExpenseCategory = ({ name, value }: {name: string, value: number}) => {
    const color = COLORS[Math.abs(name.split('').reduce((a,c) => (a + c.charCodeAt(0)), 0)) % COLORS.length];
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Circle className="h-3 w-3" style={{ fill: color, color: color }} />
                <span className="text-sm">{name}</span>
            </div>
            <span className="font-medium">{formatCurrency(value)}</span>
        </div>
    );
}

const DynamicRecommendations = ({ result }: { result: AnalysisResult }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <Sparkles className="h-6 w-6 text-primary"/>
                    Analyse et Recommandations
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {result.balance < 0 && (
                     <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Attention : Solde Négatif</AlertTitle>
                        <AlertDescription>
                            Votre budget est actuellement en déficit. Il est crucial d'identifier des postes de dépenses à réduire. Concentrez-vous sur les charges variables comme les loisirs ou les "autres dépenses" pour commencer.
                        </AlertDescription>
                    </Alert>
                )}
                 {result.balance >= 0 && (
                     <Alert variant="default" className="bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700">
                        <Goal className="h-4 w-4" />
                        <AlertTitle className="text-green-800 dark:text-green-300">Félicitations ! Capacité d'Épargne Positive</AlertTitle>
                        <AlertDescription className="text-green-700 dark:text-green-400">
                            Vous dégagez un excédent de <strong>{formatCurrency(result.balance)}</strong> chaque mois. C'est excellent ! C'est la somme que vous pouvez allouer à votre épargne ou à vos investissements. Pensez à des stratégies comme le <Link href="/courses/formation-dca" className="underline font-bold">DCA (Dollar Cost Averaging)</Link> pour faire travailler cet argent pour vous.
                        </AlertDescription>
                    </Alert>
                )}
                 {result.debtRatio > 0.4 && (
                     <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Taux d'Endettement à Surveiller</AlertTitle>
                        <AlertDescription>
                            Vos charges fixes (loyer + crédits) représentent plus de 40% de vos revenus. C'est un niveau élevé qui peut fragiliser votre budget. Soyez vigilant sur vos autres dépenses et envisagez de réduire ce poids si possible à l'avenir.
                        </AlertDescription>
                    </Alert>
                 )}
                 <p className="text-sm text-muted-foreground pt-2">Le graphique de répartition des dépenses est votre meilleur allié. Identifiez les catégories les plus importantes. Le "Loyer" et les "Crédits" sont souvent difficiles à réduire à court terme. Concentrez-vous sur les charges variables : Où pouvez-vous faire des économies sans trop impacter votre qualité de vie ? Chaque dirham économisé peut être un dirham investi pour votre avenir.</p>
            </CardContent>
        </Card>
    )
}

export default function MonthlyBudgetSimulatorPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salary: 10000,
      otherIncomes: 500,
      rent: 3000,
      loans: 1500,
      food: 2000,
      transport: 800,
      leisure: 1000,
      otherExpenses: 700,
    },
  });

  function onSubmit(values: FormValues) {
    setLoading(true);

    const totalIncomes = values.salary + values.otherIncomes;
    const totalExpenses = values.rent + values.loans + values.food + values.transport + values.leisure + values.otherExpenses;
    const balance = totalIncomes - totalExpenses;
    const debtRatio = totalIncomes > 0 ? (values.rent + values.loans) / totalIncomes : 0;


    const expenseData = [
      { name: 'Loyer', value: values.rent },
      { name: 'Crédits', value: values.loans },
      { name: 'Nourriture', value: values.food },
      { name: 'Transport', value: values.transport },
      { name: 'Loisirs', value: values.leisure },
      { name: 'Autres', value: values.otherExpenses },
    ].filter(item => item.value > 0);

    setTimeout(() => {
      setResult({
        totalIncomes,
        totalExpenses,
        balance,
        debtRatio,
        expenseData,
      });
      setLoading(false);
    }, 500);
  }
  
  // Trigger calculation on initial load
  useState(() => {
    onSubmit(form.getValues());
  });

  return (
    <>
      <div className="container py-12 md:py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Simulateur de Budget Mensuel</h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Prenez le contrôle de vos finances. Analysez vos revenus et vos dépenses pour comprendre et améliorer votre capacité d'épargne.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Vos Revenus et Charges</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Revenus */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Revenus</h3>
                    <FormField control={form.control} name="salary" render={({ field }) => (
                      <FormItem><FormLabel>Salaire Net Mensuel</FormLabel><FormControl><Input type="number" placeholder="10000" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="otherIncomes" render={({ field }) => (
                      <FormItem><FormLabel>Autres Revenus (bonus, loyers...)</FormLabel><FormControl><Input type="number" placeholder="500" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  {/* Charges */}
                   <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Charges Mensuelles</h3>
                     <FormField control={form.control} name="rent" render={({ field }) => (
                      <FormItem><FormLabel>Loyer ou Mensualité Immobilière</FormLabel><FormControl><Input type="number" placeholder="3000" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="loans" render={({ field }) => (
                      <FormItem><FormLabel>Autres crédits (auto, conso...)</FormLabel><FormControl><Input type="number" placeholder="1500" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="food" render={({ field }) => (
                      <FormItem><FormLabel>Nourriture & Courses</FormLabel><FormControl><Input type="number" placeholder="2000" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="transport" render={({ field }) => (
                      <FormItem><FormLabel>Transport (carburant, transports en commun...)</FormLabel><FormControl><Input type="number" placeholder="800" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="leisure" render={({ field }) => (
                      <FormItem><FormLabel>Loisirs (sorties, abonnements...)</FormLabel><FormControl><Input type="number" placeholder="1000" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="otherExpenses" render={({ field }) => (
                      <FormItem><FormLabel>Autres Dépenses (factures, imprévus...)</FormLabel><FormControl><Input type="number" placeholder="700" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Analyser mon Budget'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            {loading && <div className="flex justify-center items-center h-full"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}
            
            {result && (
              <>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-center text-xl">Votre Bilan Mensuel</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400 mb-2"/>
                                <span className="text-sm text-muted-foreground">Total Revenus</span>
                                <span className="text-2xl font-bold text-green-700 dark:text-green-300">{formatCurrency(result.totalIncomes)}</span>
                            </div>
                            <div className="flex flex-col items-center p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
                                <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400 mb-2"/>
                                <span className="text-sm text-muted-foreground">Total Charges</span>
                                <span className="text-2xl font-bold text-red-700 dark:text-red-300">{formatCurrency(result.totalExpenses)}</span>
                            </div>
                        </div>
                        <div className={`flex flex-col items-center p-6 rounded-lg ${result.balance >= 0 ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-orange-50 dark:bg-orange-900/30'}`}>
                             <Wallet className={`h-8 w-8 mb-2 ${result.balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}/>
                             <span className="text-lg font-semibold text-muted-foreground">Solde / Capacité d'Épargne</span>
                             <span className={`text-4xl font-bold ${result.balance >= 0 ? 'text-blue-700 dark:text-blue-300' : 'text-orange-700 dark:text-orange-300'}`}>{formatCurrency(result.balance)}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Répartition de vos Dépenses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full h-64">
                        <ResponsiveContainer>
                            <PieChart>
                            <Pie
                                data={result.expenseData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                            >
                                {result.expenseData.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                            </PieChart>
                        </ResponsiveContainer>
                        </div>
                         <div className="mt-4 space-y-2">
                            {result.expenseData.map((entry: any, index: number) => (
                                <ExpenseCategory key={index} name={entry.name} value={entry.value} />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <DynamicRecommendations result={result} />

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline"><HelpCircle className="h-6 w-6 text-primary"/>Guide d'Utilisation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>Cet outil vous aide à avoir une vision claire de votre budget mensuel pour identifier votre capacité d'épargne et d'investissement.</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Revenus :</strong> Incluez votre salaire net (après impôts et cotisations) ainsi que toute autre source de revenu régulière (bonus, loyers perçus, etc.).</li>
                            <li><strong>Charges :</strong> Soyez le plus précis possible. Séparez bien vos charges fixes (loyer, crédits) de vos charges variables (nourriture, loisirs). N'oubliez pas les petites dépenses qui s'accumulent !</li>
                        </ul>
                    </CardContent>
                </Card>
              </>
            )}

            {!result && !loading && <div className="text-center text-muted-foreground h-full flex items-center justify-center"><p>Vos résultats apparaîtront ici.</p></div>}
          </div>
        </div>
      </div>
    </>
  );
}

    