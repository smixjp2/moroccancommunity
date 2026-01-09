
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { analyzeStock, type StockAnalysisOutput } from '@/ai/flows/stock-analyzer';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, BarChart, Activity, Briefcase, Gem, Goal, Info } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const availableStocks = [
  { symbol: 'ATW', name: 'Attijariwafa Bank' },
  { symbol: 'BCP', name: 'Banque Centrale Populaire' },
  { symbol: 'BOA', name: 'Bank of Africa' },
  { symbol: 'IAM', name: 'Maroc Telecom' },
  { symbol: 'LHM', name: 'LafargeHolcim Maroc' },
  { symbol: 'CSR', name: 'Cosumar' },
  { symbol: 'HPS', name: 'HPS' },
  { symbol: 'ACI', name: 'Akdital' },
  { symbol: 'TQM', name: 'Taqa Morocco' },
  { symbol: 'MSA', name: 'Marsa Maroc' },
  { symbol: 'LBV', name: 'Label Vie' },
  { symbol: 'GAZ', name: 'Afriquia Gaz' },
  { symbol: 'ADI', name: 'Aradei Capital' },
  { symbol: 'WAA', name: 'Wafa Assurance' },
  { symbol: 'SNA', name: 'Sanlam Maroc' },
  { symbol: 'TGC', name: 'TGCC' },
  { symbol: 'SNI', name: 'Al Mada (ex-SNI)' },
  { symbol: 'RIS', name: 'Risma' },
  { symbol: 'SID', name: 'Sonasid' },
  { symbol: 'DHO', name: 'Douja Prom Addoha' },
  { symbol: 'ALU', name: 'Aluminium du Maroc' },
  { symbol: 'CTM', name: 'CTM' },
  { symbol: 'NKL', name: 'Nekl' },
  { symbol: 'MIC', name: 'Microdata' },
];


const formSchema = z.object({
  stockSymbol: z.string({ required_error: 'Veuillez sélectionner une action.' }),
});

type FormValues = z.infer<typeof formSchema>;

const AnalysisSection = ({ icon, title, content }: { icon: React.ReactNode, title: string, content: string }) => (
    <Card>
        <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
            {icon}
            <CardTitle className="font-headline text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">{content}</p>
        </CardContent>
    </Card>
);


export default function StockAnalyzerPage() {
  const [analysis, setAnalysis] = useState<StockAnalysisOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    const selectedStock = availableStocks.find(s => s.symbol === values.stockSymbol);
    if (!selectedStock) {
      setError("Action sélectionnée non valide.");
      setLoading(false);
      return;
    }

    try {
      const result = await analyzeStock({
        stockSymbol: selectedStock.symbol,
        stockName: selectedStock.name,
      });
      setAnalysis(result);
    } catch (e: any) {
      console.error(e);
      setError("Une erreur est survenue lors de l'analyse. Le service est peut-être momentanément indisponible ou une clé API est manquante. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-12">
      <header className="mb-8 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold font-headline flex items-center justify-center gap-3"><Briefcase className="text-primary" />Analyseur d'Actions</h1>
        <p className="text-muted-foreground mt-2">
          Obtenez une analyse financière complète d'une action de la Bourse de Casablanca.
        </p>
      </header>

      <Card className="max-w-2xl mx-auto mb-8">
        <CardHeader>
          <CardTitle>Sélectionnez une Action</CardTitle>
          <CardDescription>Choisissez une entreprise à analyser.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row items-start gap-4">
              <FormField
                control={form.control}
                name="stockSymbol"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir une action..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableStocks.map(stock => (
                          <SelectItem key={stock.symbol} value={stock.symbol}>
                            {stock.name} ({stock.symbol})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BarChart className="mr-2 h-4 w-4" />}
                Analyser
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Alert variant="destructive" className="max-w-3xl mx-auto mb-8">
        <Info className="h-4 w-4" />
        <AlertTitle>Avertissement Important</AlertTitle>
        <AlertDescription>
          Cet outil utilise l'intelligence artificielle pour générer des analyses. Celles-ci sont fournies à titre informatif et éducatif uniquement et peuvent contenir des erreurs. Elles ne constituent en aucun cas un conseil en investissement.
        </AlertDescription>
      </Alert>
      
      {loading && (
        <div className="flex flex-col items-center justify-center text-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="font-semibold text-lg">Analyse en cours...</p>
            <p className="text-muted-foreground">Préparation de votre rapport financier.</p>
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
        <div className="max-w-4xl mx-auto space-y-6">
            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle className="font-headline">Résumé de l'Analyse</AlertTitle>
                <AlertDescription>{analysis.analysisSummary}</AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnalysisSection icon={<Activity className="h-6 w-6 text-primary"/>} title="Santé Financière" content={analysis.financialHealth} />
                <AnalysisSection icon={<BarChart className="h-6 w-6 text-primary"/>} title="Potentiel de Croissance" content={analysis.growthPotential} />
                <AnalysisSection icon={<Briefcase className="h-6 w-6 text-primary"/>} title="Analyse des Dividendes" content={analysis.dividendAnalysis} />
                <AnalysisSection icon={<Gem className="h-6 w-6 text-primary"/>} title="Valorisation" content={analysis.valuation} />
            </div>

             <Alert variant="default" className="bg-primary/10 border-primary">
                <Goal className="h-4 w-4" />
                <AlertTitle className="font-headline text-primary">Recommandation Finale</AlertTitle>
                <AlertDescription>{analysis.finalRecommendation}</AlertDescription>
            </Alert>
        </div>
      )}

    </div>
  );
}
