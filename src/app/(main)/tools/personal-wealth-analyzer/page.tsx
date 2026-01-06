"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { analyzePersonalWealth, type PersonalWealthOutput } from "@/ai/flows/personal-wealth-analyzer";
import { formatCurrency } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, TrendingUp, TrendingDown, Info, Wallet, PiggyBank, Briefcase, Home, Car, Landmark, HelpCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  cash: z.coerce.number().min(0, "Ne peut être négatif"),
  savings: z.coerce.number().min(0, "Ne peut être négatif"),
  stocks: z.coerce.number().min(0, "Ne peut être négatif"),
  realEstate: z.coerce.number().min(0, "Ne peut être négatif"),
  otherAssets: z.coerce.number().min(0, "Ne peut être négatif"),
  shortTermDebt: z.coerce.number().min(0, "Ne peut être négatif"),
  longTermDebt: z.coerce.number().min(0, "Ne peut être négatif"),
});

type FormValues = z.infer<typeof formSchema>;

const ASSET_COLORS = {
    "Liquidités": "hsl(var(--chart-1))",
    "Épargne": "hsl(var(--chart-2))",
    "Actions": "hsl(var(--chart-3))",
    "Immobilier": "hsl(var(--chart-4))",
    "Autres": "hsl(var(--chart-5))",
};

export default function PersonalWealthAnalyzerPage() {
  const [result, setResult] = useState<PersonalWealthOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cash: 15000,
      savings: 150000,
      stocks: 250000,
      realEstate: 2000000,
      otherAssets: 80000,
      shortTermDebt: 20000,
      longTermDebt: 800000,
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await analyzePersonalWealth(values);
      setResult(response);
    } catch (e) {
      setError("Une erreur est survenue lors de l'analyse. Veuillez réessayer.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const assetChartData = result ? Object.entries(result.assetAllocation).map(([name, value]) => ({
      name: {cash: 'Liquidités', savings: 'Épargne', stocks: 'Actions', realEstate: 'Immobilier', other: 'Autres'}[name], 
      value
    })).filter(item => item.value > 0) : [];
    
  const debtAssetChartData = result ? [
      { name: "Dettes", value: form.getValues('shortTermDebt') + form.getValues('longTermDebt') },
      { name: "Actifs", value: form.getValues('cash') + form.getValues('savings') + form.getValues('stocks') + form.getValues('realEstate') + form.getValues('otherAssets') },
  ] : [];

  return (
    <>
      <div className="text-center max-w-3xl mx-auto my-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Analyse de Patrimoine Personnel</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Obtenez une vue claire de votre situation financière. Saisissez vos actifs et passifs pour recevoir une analyse IA de votre patrimoine et des conseils pour l'optimiser.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Bilan Patrimonial</CardTitle>
            <CardDescription>Remplissez les champs pour générer votre analyse.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <div>
                  <h3 className="text-lg font-medium mb-2 font-headline">Actifs</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="cash" render={({ field }) => (
                      <FormItem><FormLabel className="flex items-center gap-2"><Landmark/>Liquidités</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="savings" render={({ field }) => (
                      <FormItem><FormLabel className="flex items-center gap-2"><PiggyBank/>Épargne</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="stocks" render={({ field }) => (
                      <FormItem><FormLabel className="flex items-center gap-2"><Briefcase/>Actions & Placements</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="realEstate" render={({ field }) => (
                      <FormItem><FormLabel className="flex items-center gap-2"><Home/>Immobilier</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="otherAssets" render={({ field }) => (
                      <FormItem><FormLabel className="flex items-center gap-2"><Car/>Autres Actifs</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2 font-headline">Passifs (Dettes)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="shortTermDebt" render={({ field }) => (
                      <FormItem><FormLabel>Crédit Consommation & Découverts</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="longTermDebt" render={({ field }) => (
                      <FormItem><FormLabel>Crédit Immobilier</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormMessage>
                    )} />
                  </div>
                </div>
                
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Analyser Mon Patrimoine"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {loading && <div className="flex justify-center items-center h-full"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}
          {error && <Alert variant="destructive"><AlertTitle>Erreur</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
          
          {result ? (
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-center">Votre Patrimoine Net</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-5xl font-bold text-center text-primary">{formatCurrency(result.netWorth)}</p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <Card>
                    <CardHeader><CardTitle className="text-lg">Ratio Endettement</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{(result.debtToAssetRatio * 100).toFixed(1)}%</p>
                        <p className="text-xs text-muted-foreground">Dettes / Actifs</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle className="text-lg">Total Actifs</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{formatCurrency(debtAssetChartData[1].value)}</p>
                    </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Répartition des Actifs</CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                   <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={assetChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={(entry) => `${(entry.percent * 100).toFixed(0)}%`}>
                        {assetChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={ASSET_COLORS[entry.name as keyof typeof ASSET_COLORS]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [`${(value as number).toFixed(2)}%`, name]}/>
                    </PieChart>
                  </ResponsiveContainer>
                   <div className="flex flex-wrap justify-center gap-4 text-xs mt-4">
                    {assetChartData.map(entry => (
                        <div key={entry.name} className="flex items-center gap-2">
                           <span className="h-3 w-3 rounded-full" style={{ backgroundColor: ASSET_COLORS[entry.name as keyof typeof ASSET_COLORS] }} />
                           {entry.name}
                        </div>
                    ))}
                   </div>
                </CardContent>
              </Card>

              <Alert><Info className="h-4 w-4" /><AlertTitle className="font-headline">Analyse de Liquidité</AlertTitle><AlertDescription>{result.liquidityAnalysis}</AlertDescription></Alert>
              <Alert><TrendingDown className="h-4 w-4" /><AlertTitle className="font-headline">Analyse de Risque</AlertTitle><AlertDescription>{result.riskAnalysis}</AlertDescription></Alert>
              <Alert><TrendingUp className="h-4 w-4" /><AlertTitle className="font-headline">Recommandations</AlertTitle><AlertDescription>{result.recommendation}</AlertDescription></Alert>
            </div>
          ) : !loading && (
             <div className="text-center text-muted-foreground h-full flex items-center justify-center border rounded-lg">
                <p>Vos résultats d'analyse apparaîtront ici.</p>
             </div>
          )}

           <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline">
                        <HelpCircle className="h-6 w-6 text-primary"/>
                        Guide d'Utilisation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>Cet outil vous donne une vision à 360° de votre santé financière. Voici comment remplir les champs :</p>
                    <div>
                        <h4 className="font-semibold text-foreground">Actifs</h4>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li><strong>Liquidités :</strong> Argent disponible sur vos comptes courants.</li>
                            <li><strong>Épargne :</strong> Argent sur vos livrets (Livret A, etc.) et comptes à terme.</li>
                            <li><strong>Actions & Placements :</strong> Valeur de votre portefeuille boursier (actions, OPCVM).</li>
                            <li><strong>Immobilier :</strong> Valeur marchande de votre résidence principale et autres biens immobiliers.</li>
                            <li><strong>Autres Actifs :</strong> Valeur de vos voitures, objets de valeur, etc.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-foreground">Passifs (Dettes)</h4>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                             <li><strong>Crédit Consommation & Découverts :</strong> Total des crédits à la consommation, prêts personnels et découverts bancaires.</li>
                            <li><strong>Crédit Immobilier :</strong> Le capital restant dû de votre crédit immobilier.</li>
                        </ul>
                    </div>
                    <p className="pt-2"><strong>Analyse des Résultats :</strong> L'outil calcule votre <strong>patrimoine net</strong> (ce que vous possédez réellement), votre <strong>répartition d'actifs</strong> (comment votre richesse est diversifiée) et votre <strong>ratio d'endettement</strong>. Les analyses de liquidité, de risque et les recommandations de l'IA vous aideront à identifier les points forts et les faiblesses de votre situation pour prendre de meilleures décisions. </p>
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
