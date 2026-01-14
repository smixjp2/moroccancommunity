'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import {
  allocatePortfolio,
  type PortfolioAllocatorOutput,
} from '@/ai/flows/portfolio-allocator';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Briefcase, Sparkles, BarChart, Info, Target, TrendingUp } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import AdminAuthGuard from '@/app/components/admin-auth-guard'; // Reuse for member check
import { useUser } from '@/firebase';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  initialInvestment: z.coerce.number().min(1000, 'Minimum 1000 MAD'),
  monthlyInvestment: z.coerce.number().min(100, 'Minimum 100 MAD'),
  investmentHorizon: z.string({ required_error: 'Veuillez sélectionner un horizon.' }),
  riskProfile: z.string({ required_error: 'Veuillez sélectionner un profil.' }),
});

type FormValues = z.infer<typeof formSchema>;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8442ff', '#ff42f5'];

function PortfolioAllocatorPage() {
  const [analysis, setAnalysis] = useState<PortfolioAllocatorOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initialInvestment: 50000,
      monthlyInvestment: 2000,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await allocatePortfolio(values);
      setAnalysis(result);
    } catch (e: any) {
      console.error(e);
      setError("Une erreur est survenue lors de l'analyse. Le service est peut-être momentanément indisponible. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-12">
      <header className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold font-headline flex items-center gap-3"><Briefcase className="text-primary" />Simulateur d'Allocation de Portefeuille</h1>
          <p className="text-muted-foreground mt-2">
            Recevez une proposition d'allocation d'actifs professionnelle basée sur votre profil.
          </p>
        </div>
        <Button asChild variant="outline">
            <Link href="/dashboard">Retour au tableau de bord</Link>
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Votre Profil</CardTitle>
            <CardDescription>Remplissez le questionnaire pour générer votre allocation.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="initialInvestment"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Investissement Initial (MAD)</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="monthlyInvestment"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Investissement Mensuel (MAD)</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="investmentHorizon"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Horizon de Placement</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger><SelectValue placeholder="Sélectionnez..." /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Court terme (< 3 ans)">Court terme (&lt; 3 ans)</SelectItem>
                                <SelectItem value="Moyen terme (3-7 ans)">Moyen terme (3-7 ans)</SelectItem>
                                <SelectItem value="Long terme (> 7 ans)">Long terme (&gt; 7 ans)</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="riskProfile"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Profil de Risque</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger><SelectValue placeholder="Sélectionnez..." /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Prudent">Prudent</SelectItem>
                                <SelectItem value="Équilibré">Équilibré</SelectItem>
                                <SelectItem value="Dynamique">Dynamique</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  Générer l'Allocation
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
            {loading && (
                <div className="flex flex-col items-center justify-center text-center py-16 h-full">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                    <p className="font-semibold text-lg">Génération de votre allocation sur-mesure...</p>
                    <p className="text-muted-foreground">L'IA analyse votre profil pour construire la meilleure stratégie.</p>
                </div>
            )}

            {error && (
                <Alert variant="destructive" className="max-w-3xl mx-auto">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Erreur d'Analyse</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {analysis && (
            <>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><BarChart className="text-primary"/>Allocation d'Actifs Suggérée</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                         <div className="w-full h-64">
                            <ResponsiveContainer>
                                <PieChart>
                                <Pie
                                    data={analysis.allocation}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                                        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                                        return (
                                        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold">
                                            {`${(percent * 100).toFixed(0)}%`}
                                        </text>
                                        );
                                    }}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="percentage"
                                    nameKey="category"
                                >
                                    {analysis.allocation.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value, name) => [`${value.toFixed(2)}%`, name]} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div>
                             <Legend content={({ payload }) => (
                                <ul className="space-y-2">
                                    {payload?.map((entry, index) => (
                                        <li key={`item-${index}`} className="flex items-center gap-2 text-sm">
                                            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
                                            <span className="text-muted-foreground">{entry.value}:</span>
                                            <span className="font-semibold">{analysis.allocation.find(a => a.category === entry.value)?.percentage.toFixed(1)}%</span>
                                        </li>
                                    ))}
                                </ul>
                            )} />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><Info className="text-primary"/>Analyse de la Stratégie</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground whitespace-pre-line">{analysis.analysis}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><TrendingUp className="text-primary"/>Recommandations de Produits</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground whitespace-pre-line">{analysis.recommendation}</p>
                         <Alert variant="default" className="mt-4">
                            <Info className="h-4 w-4" />
                            <AlertTitle>Avertissement</AlertTitle>
                            <AlertDescription>
                            Ces recommandations sont à but éducatif. Faites vos propres recherches avant d'investir.
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            </>
            )}

            {!analysis && !loading && (
                 <Card className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <Briefcase className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold">Votre allocation personnalisée</h3>
                    <p className="text-muted-foreground max-w-sm">Remplissez le formulaire pour que notre IA génère une stratégie de portefeuille adaptée à votre profil et au marché marocain.</p>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}

// Wrapper pour vérifier l'authentification
export default function ProtectedPortfolioAllocatorPage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();

    if (isUserLoading) {
        return (
            <div className="flex h-full min-h-[calc(100vh-10rem)] items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) {
        // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
        if(typeof window !== 'undefined') {
            router.push('/login');
        }
        return null; // ou un autre loader
    }

    return <PortfolioAllocatorPage />;
}
