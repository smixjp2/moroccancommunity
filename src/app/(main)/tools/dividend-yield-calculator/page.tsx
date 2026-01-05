"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateDividendYield, type DividendYieldOutput } from "@/ai/flows/dividend-yield-calculator";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Info, HelpCircle, Percent, HandCoins, PiggyBank } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatCurrency } from "@/lib/utils";

const formSchema = z.object({
  stockPrice: z.coerce.number().min(0.01, "Le prix doit être positif"),
  annualDividendPerShare: z.coerce.number().min(0, "Le dividende ne peut être négatif"),
  investmentAmount: z.coerce.number().min(1, "Le montant doit être positif"),
});

type FormValues = z.infer<typeof formSchema>;

export default function DividendYieldCalculatorPage() {
  const [result, setResult] = useState<DividendYieldOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stockPrice: 250,
      annualDividendPerShare: 12,
      investmentAmount: 50000,
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await calculateDividendYield(values);
      setResult(response);
    } catch (e) {
      setError("Une erreur est survenue lors du calcul. Veuillez réessayer.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const chartData = result ? [
    { name: 'Investissement Initial', value: form.getValues('investmentAmount') },
    { name: 'Revenu Annuel Dividendes', value: result.annualDividendIncome },
  ] : [];

  const COLORS = ["hsl(var(--muted))", "hsl(var(--primary))"];

  const chartConfig = {
    investment: {
      label: "Investissement",
      color: "hsl(var(--muted))",
    },
    income: {
      label: "Revenu",
      color: "hsl(var(--primary))",
    },
  };

  return (
     <>
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Calculateur de Rendement des Dividendes</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Estimez le rendement de vos actions à dividendes et comprenez le revenu passif potentiel qu'elles peuvent générer.
        </p>
      </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Paramètres de Calcul</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="stockPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix de l'Action (MAD)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="250" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="annualDividendPerShare"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dividende Annuel par Action (MAD)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="investmentAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Montant de l'Investissement (MAD)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="50000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Calculer le Rendement'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Résultats du Calcul</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && <div className="flex justify-center items-center h-48"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
            {error && <p className="text-destructive">{error}</p>}
            {result && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <Card>
                        <CardHeader>
                            <Percent className="mx-auto h-8 w-8 text-primary mb-2" />
                            <CardTitle className="text-lg">Rendement du Dividende</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{result.dividendYield.toFixed(2)}%</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <HandCoins className="mx-auto h-8 w-8 text-primary mb-2" />
                            <CardTitle className="text-lg">Revenu Annuel Estimé</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{formatCurrency(result.annualDividendIncome)}</p>
                        </CardContent>
                    </Card>
                </div>
                 <Card>
                    <CardHeader>
                        <PiggyBank className="mx-auto h-8 w-8 text-primary mb-2" />
                        <CardTitle className="text-lg text-center">Actions Achetées</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-center">{Math.floor(result.numberOfShares)}</p>
                        <p className="text-xs text-muted-foreground text-center">Nombre approximatif d'actions que vous pouvez acheter.</p>
                    </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Composition du Revenu</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Tooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle className="font-headline">Analyse</AlertTitle>
                  <AlertDescription>{result.analysis}</AlertDescription>
                </Alert>
                <Alert variant="default">
                    <Info className="h-4 w-4" />
                    <AlertTitle className="font-headline">Recommandation</AlertTitle>
                    <AlertDescription>{result.recommendation}</AlertDescription>
                </Alert>
              </div>
            )}
            {!result && !loading && <div className="text-center text-muted-foreground h-48 flex items-center justify-center"><p>Vos résultats apparaîtront ici.</p></div>}
          </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline"><HelpCircle className="h-6 w-6 text-primary"/>Guide d'Utilisation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>Le rendement du dividende est un ratio financier simple qui vous indique le pourcentage de retour sur investissement que vous recevez sous forme de dividendes.</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Prix de l'Action :</strong> Le prix actuel d'une seule action de l'entreprise.</li>
                    <li><strong>Dividende Annuel par Action :</strong> Le total des dividendes versés par l'entreprise pour une action sur une année. Vous pouvez le trouver dans les rapports financiers ou sur les sites de cotation.</li>
                    <li><strong>Montant de l'Investissement :</strong> La somme totale que vous souhaitez investir dans cette action.</li>
                </ul>
                <p><strong>Analyse :</strong> Un rendement élevé peut être attractif, mais il peut aussi indiquer un risque plus élevé (par exemple, si le prix de l'action a chuté). Comparez toujours le rendement à celui d'entreprises similaires dans le même secteur. L'analyse vous donne un contexte pour le marché marocain.</p>
            </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}
