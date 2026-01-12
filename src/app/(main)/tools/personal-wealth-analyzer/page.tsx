'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

import {
  analyzePersonalWealth,
  type PersonalWealthOutput,
} from '@/ai/flows/personal-wealth-analyzer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, HelpCircle, Wallet, Sparkles, BarChart, TrendingUp, TrendingDown } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { formatCurrency } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  cash: z.coerce.number().min(0),
  savings: z.coerce.number().min(0),
  stocks: z.coerce.number().min(0),
  realEstate: z.coerce.number().min(0),
  otherAssets: z.coerce.number().min(0),
  shortTermDebt: z.coerce.number().min(0),
  longTermDebt: z.coerce.number().min(0),
});

type FormValues = z.infer<typeof formSchema>;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function PersonalWealthAnalyzerPage() {
  const [result, setResult] = useState<PersonalWealthOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cash: 50000,
      savings: 200000,
      stocks: 150000,
      realEstate: 1200000,
      otherAssets: 100000,
      shortTermDebt: 15000,
      longTermDebt: 800000,
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await analyzePersonalWealth(values);
      setResult(response);
    } catch (e) {
      setError(
        "Une erreur est survenue lors de l'analyse. Veuillez réessayer."
      );
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const assetData = result
    ? Object.entries(result.assetAllocation).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  return (
    <>
      <div className="container py-12 md:py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">
            Analyseur de Patrimoine Personnel
          </h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Obtenez une vue d'ensemble de votre situation financière et des
            recommandations personnalisées par IA pour optimiser votre
            patrimoine.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">
                Votre Situation Financière
              </CardTitle>
              <CardDescription>
                Remplissez les champs ci-dessous (en MAD).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Actifs</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="cash"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Liquidités</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="savings"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Épargne</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="stocks"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Actions/Bourse</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="realEstate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Immobilier</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="otherAssets"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Autres Actifs</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Dettes</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="shortTermDebt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Dettes Court Terme</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="longTermDebt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Dettes Long Terme</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      'Analyser Mon Patrimoine'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  Analyse par IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading && (
                  <div className="flex justify-center items-center h-96">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}
                {error && <p className="text-destructive">{error}</p>}
                {result && (
                  <div className="space-y-6">
                    <Card className="bg-muted/50">
                        <CardHeader className="text-center">
                            <CardTitle className="text-lg">Votre Patrimoine Net</CardTitle>
                            <p className="text-4xl font-bold text-primary">{formatCurrency(result.netWorth)}</p>
                        </CardHeader>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2"><BarChart />Répartition des Actifs</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className="w-full h-52">
                                <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                    data={assetData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                    >
                                    {assetData.map((entry, index) => (
                                        <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                    </Pie>
                                    <Tooltip
                                    formatter={(value: number) => [
                                        `${value.toFixed(2)}%`,
                                        'Pourcentage',
                                    ]}
                                    />
                                    <Legend />
                                </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                     <div className="grid grid-cols-2 gap-4">
                          <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Ratio d'Endettement</CardTitle>
                                <TrendingDown className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{(result.debtToAssetRatio * 100).toFixed(2)}%</div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Actifs</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatCurrency(Object.values(form.getValues()).slice(0, 5).reduce((a, b) => a + b, 0))}</div>
                            </CardContent>
                        </Card>
                     </div>

                    <Separator />

                    <Alert>
                        <AlertTitle className='font-headline'>Analyse de Liquidité</AlertTitle>
                        <AlertDescription>{result.liquidityAnalysis}</AlertDescription>
                    </Alert>
                     <Alert>
                        <AlertTitle className='font-headline'>Analyse de Risque</AlertTitle>
                        <AlertDescription>{result.riskAnalysis}</AlertDescription>
                    </Alert>
                    <Alert variant="default" className="bg-primary/10 border-primary">
                        <AlertTitle className='font-headline text-primary'>Recommandation Générale</AlertTitle>
                        <AlertDescription>{result.recommendation}</AlertDescription>
                    </Alert>

                  </div>
                )}
                {!result && !loading && (
                  <div className="text-center text-muted-foreground h-96 flex items-center justify-center">
                    <p>Votre analyse personnalisée apparaîtra ici.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <HelpCircle className="h-6 w-6 text-primary" />
                  Guide d'Utilisation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Cet outil vous donne une vision d'ensemble de votre santé
                  financière.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Actifs :</strong> Tout ce que vous possédez et qui
                    a une valeur (comptes, investissements, biens...).
                  </li>
                  <li>
                    <strong>Dettes :</strong> Tout ce que vous devez. Séparez
                    les crédits à court terme (conso) et à long terme
                    (immobilier).
                  </li>
                  <li>
                    <strong>Patrimoine Net :</strong> C'est la vraie mesure de
                    votre richesse (Actifs - Dettes).
                  </li>
                   <li>
                    <strong>Ratio d'endettement :</strong> Un ratio élevé (ex: > 50%) peut indiquer un risque financier.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}