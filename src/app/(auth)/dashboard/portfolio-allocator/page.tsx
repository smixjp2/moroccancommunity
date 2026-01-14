
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useRouter } from 'next/navigation';
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
import { Loader2, Briefcase, Sparkles, BarChart as BarChartIcon, Info, Target, TrendingUp, Building, Phone, Zap, Lightbulb } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { useUser } from '@/firebase';
import { formatCurrency } from '@/lib/utils';

// Types pour la sortie de l'analyse
interface Allocation {
  category: string;
  percentage: number;
}
interface SectorSuggestion {
    sector: string;
    rationale: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}
interface InvestmentGrowthPoint {
    year: number;
    value: number;
}
interface PortfolioAllocatorOutput {
  allocation: Allocation[];
  analysis: string;
  recommendation: string;
  sectorSuggestions: SectorSuggestion[];
  investmentGrowth: InvestmentGrowthPoint[];
}

const formSchema = z.object({
  initialInvestment: z.coerce.number().min(1000, 'Minimum 1000 MAD'),
  monthlyInvestment: z.coerce.number().min(100, 'Minimum 100 MAD'),
  investmentHorizon: z.coerce.number().min(1, "L'horizon doit être d'au moins 1 an."),
  riskProfile: z.string({ required_error: 'Veuillez sélectionner un profil.' }),
  annualReturn: z.coerce.number().min(0, "Le rendement ne peut être négatif."),
});

type FormValues = z.infer<typeof formSchema>;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8442ff', '#ff42f5'];

function PortfolioAllocatorPage() {
  const [analysis, setAnalysis] = useState<PortfolioAllocatorOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initialInvestment: 50000,
      monthlyInvestment: 2000,
      investmentHorizon: 10,
      riskProfile: 'Équilibré',
      annualReturn: 8,
    },
  });

  const generateAnalysis = (values: FormValues): PortfolioAllocatorOutput => {
    const { riskProfile, initialInvestment, monthlyInvestment, investmentHorizon, annualReturn } = values;

    let output: Omit<PortfolioAllocatorOutput, 'investmentGrowth'>;

    if (riskProfile === 'Prudent') {
      output = {
        allocation: [
          { category: 'OPCVM Obligataire/Monétaire', percentage: 60 },
          { category: 'OPCVM Actions', percentage: 20 },
          { category: 'OPCI (Immobilier)', percentage: 15 },
          { category: 'Liquidités', percentage: 5 },
        ],
        analysis:
          "Votre profil prudent privilégie la sécurité du capital. Cette allocation est donc majoritairement investie dans des produits de taux (obligations, fonds monétaires) qui offrent une volatilité faible et des rendements réguliers. L'exposition aux actions est limitée à 20% pour capter une partie de la performance du marché sans prendre de risque excessif. Les OPCI apportent une diversification décorrélée des marchés financiers, et les liquidités assurent une poche de sécurité.",
        recommendation:
          "Pour les OPCVM Actions, privilégiez des fonds investis dans des 'blue chips' de la Bourse de Casablanca (grandes capitalisations solides). Pour la partie obligataire, des fonds 'Obligataire Moyen & Long Terme' sont adaptés. Les OPCI comme 'Aradei Capital' ou 'Immorente Invest' sont des exemples pour l'exposition immobilière. Maintenez vos liquidités sur un compte sur carnet ou un OPCVM monétaire pour un accès facile.",
        sectorSuggestions: [
            { sector: "Services Publics (Utilities)", rationale: "Secteur défensif avec des revenus réguliers et des dividendes souvent stables (ex: Taqa Morocco).", icon: Zap },
            { sector: "Télécommunications", rationale: "Activité essentielle avec une forte génération de cash-flow (ex: Maroc Telecom).", icon: Phone },
            { sector: "Biens de consommation de base", rationale: "Entreprises vendant des produits de première nécessité, moins sensibles aux cycles économiques (ex: Cosumar, Label'Vie).", icon: Building },
        ]
      };
    } else if (riskProfile === 'Équilibré') {
      output = {
        allocation: [
          { category: 'OPCVM Actions', percentage: 50 },
          { category: 'OPCVM Obligataire', percentage: 35 },
          { category: 'OPCI (Immobilier)', percentage: 10 },
          { category: 'Liquidités', percentage: 5 },
        ],
        analysis:
          "En tant que profil équilibré, vous recherchez un juste milieu entre croissance et sécurité. Cette allocation répartit le risque de manière équilibrée avec 50% en actions pour le potentiel de croissance et 35% en obligations pour la stabilité. L'horizon de placement à moyen/long terme est compatible avec cette exposition au marché actions. L'immobilier via les OPCI et les liquidités complètent la diversification.",
        recommendation:
          "Vous pouvez diversifier votre poche 'Actions' entre des OPCVM 'Actions' classiques et des OPCVM 'Diversifiés' pour une meilleure gestion du risque. Considérez des secteurs porteurs comme les banques, les télécoms ou la consommation. La partie obligataire peut être investie dans des fonds 'OMLT'. Surveillez les publications des entreprises pour ajuster votre perception du marché.",
        sectorSuggestions: [
            { sector: "Bancaire", rationale: "Pilier de l'économie marocaine, profite de la croissance économique et offre des dividendes attractifs (ex: Attijariwafa, BCP).", icon: Briefcase },
            { sector: "BTP & Cimentiers", rationale: "Secteur lié aux grands projets d'infrastructure du pays (ex: LafargeHolcim, TGCC).", icon: Building },
            { sector: "Assurances", rationale: "Secteur résilient avec une bonne visibilité sur les revenus (ex: Wafa Assurance, Sanlam).", icon: TrendingUp },
        ]
      };
    } else { // Dynamique
      output = {
        allocation: [
          { category: 'OPCVM Actions', percentage: 70 },
          { category: 'OPCVM Obligataire', percentage: 15 },
          { category: 'OPCI (Immobilier)', percentage: 10 },
          { category: 'Actifs Alternatifs/Liquidités', percentage: 5 },
        ],
        analysis:
          "Votre profil dynamique et votre horizon long terme vous permettent de viser une performance élevée en acceptant une volatilité plus forte. L'allocation est donc fortement pondérée en actions (70%) pour maximiser le potentiel de croissance du capital. La part obligataire est réduite au profit d'une exposition plus forte aux actifs risqués. L'immobilier et une petite poche d'alternatifs (ou liquidités) permettent une légère diversification.",
        recommendation:
          "Pour votre poche actions, vous pouvez combiner des OPCVM Actions et investir directement dans des titres vifs ('stock-picking') si vous avez le temps et les connaissances. Ciblez des entreprises avec un fort potentiel de croissance, y compris des valeurs technologiques comme HPS. La diversification internationale via des OPCVM spécialisés peut aussi être une option. Restez discipliné et ne paniquez pas lors des baisses de marché, qui peuvent être des opportunités d'achat.",
        sectorSuggestions: [
            { sector: "Technologie", rationale: "Potentiel de croissance élevé, souvent lié à l'innovation et à l'export (ex: HPS).", icon: Lightbulb },
            { sector: "Industrie & Mines", rationale: "Secteurs cycliques qui peuvent surperformer en période de croissance économique mondiale (ex: Managem).", icon: Zap },
            { sector: "Santé", rationale: "Secteur en pleine expansion au Maroc avec des besoins croissants (ex: Akdital).", icon: TrendingUp },
        ]
      };
    }
    
    // Calculate investment growth
    const investmentGrowth: InvestmentGrowthPoint[] = [];
    let currentValue = initialInvestment;
    const rate = annualReturn / 100;
    const annualInvestment = monthlyInvestment * 12;

    investmentGrowth.push({ year: 0, value: currentValue });
    for (let i = 1; i <= investmentHorizon; i++) {
        currentValue = currentValue * (1 + rate) + annualInvestment;
        investmentGrowth.push({ year: i, value: currentValue });
    }

    return { ...output, investmentGrowth };
  };

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    // Simulate API call delay
    setTimeout(() => {
      try {
        const result = generateAnalysis(values);
        setAnalysis(result);
      } catch (e: any) {
        console.error(e);
        setError("Une erreur est survenue lors de la génération de l'analyse.");
      } finally {
        setLoading(false);
      }
    }, 500);
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
                        <FormLabel>Horizon de Placement (années)</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} />
                        </FormControl>
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
                 <FormField
                    control={form.control}
                    name="annualReturn"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Rendement Annuel Espéré (%)</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} />
                        </FormControl>
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
                    <p className="text-muted-foreground">Analyse de votre profil pour construire la meilleure stratégie.</p>
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
                        <CardTitle className="flex items-center gap-3"><BarChartIcon className="text-primary"/>Allocation d'Actifs Suggérée</CardTitle>
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
                                <Tooltip formatter={(value, name) => [`${(value as number).toFixed(2)}%`, name]} />
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
                        <CardTitle className="flex items-center gap-3"><TrendingUp className="text-primary"/>Projection de Croissance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] w-full">
                             <ResponsiveContainer>
                                <BarChart data={analysis.investmentGrowth}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="year" label={{ value: 'Années', position: 'insideBottom', offset: -5 }}/>
                                    <YAxis tickFormatter={(value) => formatCurrency(value as number).replace(/\s/g, '')} />
                                    <Tooltip formatter={(value) => [formatCurrency(value as number), "Valeur du Portefeuille"]} />
                                    <Bar dataKey="value" fill="hsl(var(--primary))" name="Valeur du Portefeuille" />
                                </BarChart>
                            </ResponsiveContainer>
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
                        <CardTitle className="flex items-center gap-3"><Target className="text-primary"/>Suggestions de Secteurs</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {analysis.sectorSuggestions.map((suggestion, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <suggestion.icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold">{suggestion.sector}</h4>
                                    <p className="text-sm text-muted-foreground">{suggestion.rationale}</p>
                                </div>
                            </div>
                        ))}
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
                    <p className="text-muted-foreground max-w-sm">Remplissez le formulaire pour que notre système génère une stratégie de portefeuille adaptée à votre profil et au marché marocain.</p>
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
