
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, HelpCircle, Ratio, AlertCircle, CheckCircle, Search, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { sectors } from "@/lib/sector-data";
import type { Sector } from "@/lib/types";

const formSchema = z.object({
  sectorId: z.string({ required_error: "Veuillez sélectionner un secteur." }),
  stockPrice: z.coerce.number().min(0.01, "Le prix de l'action doit être positif."),
  earningsPerShare: z.coerce.number().min(0.01, "Le bénéfice par action (BPA) doit être positif."),
});

type FormValues = z.infer<typeof formSchema>;

interface AnalysisResult {
    peRatio: number;
    sector: Sector;
    verdict: 'Sous-évaluée' | 'Correctement évaluée' | 'Sur-évaluée';
    analysis: string;
}

export default function PeRatioAnalyzerPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sectorId: 'banking',
      stockPrice: 480,
      earningsPerShare: 45,
    },
  });

  function onSubmit(values: FormValues) {
    setLoading(true);
    setResult(null);

    const { sectorId, stockPrice, earningsPerShare } = values;
    const selectedSector = sectors.find(s => s.id === sectorId);

    if (!selectedSector) {
        // This should not happen with the form validation
        setLoading(false);
        return;
    }

    const peRatio = stockPrice / earningsPerShare;
    const sectorPE = selectedSector.averagePE;
    
    let verdict: AnalysisResult['verdict'];
    let analysis: string;

    if (peRatio < sectorPE * 0.8) {
        verdict = 'Sous-évaluée';
        analysis = `Avec un P/E de ${peRatio.toFixed(2)}, cette action semble sous-évaluée par rapport à la moyenne de son secteur (${sectorPE}). Cela pourrait indiquer une opportunité d'achat, mais nécessite une analyse plus approfondie pour comprendre les raisons de cette décote (ex: problèmes temporaires, manque de confiance du marché).`;
    } else if (peRatio > sectorPE * 1.2) {
        verdict = 'Sur-évaluée';
        analysis = `Le P/E de ${peRatio.toFixed(2)} est nettement supérieur à la moyenne du secteur (${sectorPE}). Cela suggère que le marché a des attentes de croissance très élevées pour cette entreprise. Soyez prudent, car l'action pourrait être chère et vulnérable à une correction si ces attentes ne sont pas satisfaites.`;
    } else {
        verdict = 'Correctement évaluée';
        analysis = `Le P/E de ${peRatio.toFixed(2)} est proche de la moyenne du secteur (${sectorPE}), ce qui indique que l'action est probablement valorisée de manière juste par le marché. Elle reflète les attentes de croissance actuelles pour ce secteur.`;
    }

    // Simulate API call
    setTimeout(() => {
        setResult({
            peRatio,
            sector: selectedSector,
            verdict,
            analysis,
        });
        setLoading(false);
    }, 500);
  }

  const getVerdictStyles = (verdict: AnalysisResult['verdict'] | null) => {
    switch (verdict) {
      case 'Sous-évaluée':
        return { icon: <CheckCircle className="text-green-500" />, textColor: 'text-green-500' };
      case 'Sur-évaluée':
        return { icon: <AlertCircle className="text-red-500" />, textColor: 'text-red-500' };
      case 'Correctement évaluée':
        return { icon: <Search className="text-blue-500" />, textColor: 'text-blue-500' };
      default:
        return { icon: null, textColor: '' };
    }
  };
  
  const verdictStyles = getVerdictStyles(result?.verdict || null);

  return (
    <>
      <div className="container py-12 md:py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Analyseur de Ratio P/E</h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Évaluez rapidement si une action est chère ou bon marché en comparant son Price-to-Earnings Ratio à la moyenne de son secteur.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Données de l'Action</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="sectorId"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Secteur de l'entreprise</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger><SelectValue placeholder="Sélectionnez un secteur..." /></SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {sectors.map(sector => (
                                                <SelectItem key={sector.id} value={sector.id}>
                                                    <div className="flex items-center gap-2">
                                                        <sector.icon className="h-4 w-4" />
                                                        {sector.name}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="stockPrice"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Prix actuel de l'action (MAD)</FormLabel>
                                    <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="earningsPerShare"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Bénéfice Par Action (BPA) (MAD)</FormLabel>
                                    <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={loading} className="w-full">
                                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Analyser la Valorisation'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Résultat de l'Analyse</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading && <div className="flex justify-center items-center h-48"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
                        
                        {result && (
                            <div className="space-y-4">
                                <Card className="bg-muted">
                                    <CardHeader className="text-center">
                                        <CardTitle className="font-headline text-lg">Verdict</CardTitle>
                                        <div className={`flex items-center justify-center gap-2 text-3xl font-bold ${verdictStyles.textColor}`}>
                                            {verdictStyles.icon}
                                            {result.verdict}
                                        </div>
                                    </CardHeader>
                                </Card>

                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-base">P/E de l'Action</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-3xl font-bold">{result.peRatio.toFixed(2)}x</p>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-base">P/E Moyen du Secteur</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-3xl font-bold">{result.sector.averagePE}x</p>
                                        </CardContent>
                                    </Card>
                                </div>
                                <Alert>
                                    <Info className="h-4 w-4" />
                                    <AlertTitle>Analyse Détaillée</AlertTitle>
                                    <AlertDescription>{result.analysis}</AlertDescription>
                                </Alert>
                            </div>
                        )}

                        {!result && !loading && <div className="text-center text-muted-foreground h-48 flex items-center justify-center"><p>Les résultats de l'analyse apparaîtront ici.</p></div>}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline"><HelpCircle className="h-6 w-6 text-primary"/>Guide d'Utilisation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground text-sm">
                        <p>Le <strong>Price-to-Earnings Ratio (P/E)</strong> est l'un des indicateurs les plus utilisés pour évaluer la valorisation d'une entreprise. Il compare le prix de l'action au bénéfice généré par l'entreprise.</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong className="text-foreground">P/E = Prix de l'action / Bénéfice Par Action (BPA)</strong></li>
                            <li>Un <strong>P/E bas</strong> peut suggérer qu'une action est sous-évaluée, ou que le marché a de faibles attentes de croissance.</li>
                            <li>Un <strong>P/E élevé</strong> peut indiquer que le marché anticipe une forte croissance future, mais cela peut aussi signaler une surévaluation.</li>
                        </ul>
                        <p><strong>Important :</strong> Le P/E ne doit jamais être utilisé seul. Il doit être comparé à celui d'entreprises du même secteur et à l'historique de l'entreprise. Cet outil vous donne un premier point de comparaison rapide mais ne remplace pas une analyse approfondie.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </>
  );
}
