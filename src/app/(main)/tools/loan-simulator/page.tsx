
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, HelpCircle, Home, Calendar, Percent, Banknote, Landmark } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const formSchema = z.object({
  loanAmount: z.coerce.number().min(10000, "Le montant doit être d'au moins 10 000."),
  interestRate: z.coerce.number().min(0.1, "Le taux doit être positif."),
  loanDuration: z.coerce.number().int().min(1, "La durée doit être d'au moins 1 an.").max(30, "La durée ne peut excéder 30 ans."),
  insuranceRate: z.coerce.number().min(0, "Le taux d'assurance ne peut être négatif."),
  applicationFee: z.coerce.number().min(0, "Les frais ne peuvent être négatifs."),
});

type FormValues = z.infer<typeof formSchema>;

interface AmortizationRow {
  year: number;
  monthlyPayment: number;
  principalPaid: number;
  interestPaid: number;
  insurancePaid: number;
  remainingBalance: number;
}

interface CalculationResult {
  monthlyPayment: number;
  totalCreditCost: number;
  totalInsuranceCost: number;
  totalAmountRepaid: number;
  amortizationTable: AmortizationRow[];
}

export default function LoanSimulatorPage() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanAmount: 1000000,
      interestRate: 4.5,
      loanDuration: 25,
      insuranceRate: 0.4,
      applicationFee: 1500,
    },
  });

  function onSubmit(values: FormValues) {
    setLoading(true);

    const { loanAmount, interestRate, loanDuration, insuranceRate, applicationFee } = values;

    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfMonths = loanDuration * 12;
    
    // Calcul de la mensualité du crédit (hors assurance)
    const principalMonthly = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) / (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);
    
    // Calcul de la mensualité de l'assurance
    const insuranceMonthly = (loanAmount * (insuranceRate / 100)) / 12;

    const totalMonthlyPayment = principalMonthly + insuranceMonthly;

    // Tableau d'amortissement
    let remainingBalance = loanAmount;
    const amortizationTable: AmortizationRow[] = [];
    
    for (let year = 1; year <= loanDuration; year++) {
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;

      for (let month = 1; month <= 12; month++) {
        const interestForMonth = remainingBalance * monthlyInterestRate;
        const principalForMonth = principalMonthly - interestForMonth;
        yearlyInterest += interestForMonth;
        yearlyPrincipal += principalForMonth;
        remainingBalance -= principalForMonth;
      }
      
       // Assurer que le solde restant est exactement 0 à la fin
      if (year === loanDuration) {
        remainingBalance = 0;
      }

      amortizationTable.push({
        year,
        monthlyPayment: totalMonthlyPayment,
        principalPaid: yearlyPrincipal,
        interestPaid: yearlyInterest,
        insurancePaid: insuranceMonthly * 12,
        remainingBalance: remainingBalance > 0 ? remainingBalance : 0,
      });
    }

    const totalCreditCost = (principalMonthly * numberOfMonths) - loanAmount + applicationFee;
    const totalInsuranceCost = insuranceMonthly * numberOfMonths;
    const totalAmountRepaid = loanAmount + totalCreditCost + totalInsuranceCost;
    
    setTimeout(() => {
        setResult({
            monthlyPayment: totalMonthlyPayment,
            totalCreditCost,
            totalInsuranceCost,
            totalAmountRepaid,
            amortizationTable,
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
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Simulateur de Crédit Immobilier</h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Estimez avec précision vos mensualités, le coût total de votre prêt et visualisez votre plan de remboursement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="font-headline">Paramètres du Prêt</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField control={form.control} name="loanAmount" render={({ field }) => (
                    <FormItem><FormLabel>Montant du Prêt (MAD)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="loanDuration" render={({ field }) => (
                    <FormItem><FormLabel>Durée (années)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="interestRate" render={({ field }) => (
                    <FormItem><FormLabel>Taux d'Intérêt Annuel (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={form.control} name="insuranceRate" render={({ field }) => (
                    <FormItem><FormLabel>Taux d'Assurance Annuel (%)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="applicationFee" render={({ field }) => (
                    <FormItem><FormLabel>Frais de Dossier (MAD)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Calculer'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        
          <div className="lg:col-span-2 space-y-8">
            {loading && <div className="flex justify-center items-center h-full min-h-[50vh]"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}
            
            {result && !loading && (
              <>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Synthèse de votre Crédit</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-4 bg-muted rounded-lg">
                           <p className="text-sm text-muted-foreground">Mensualité (avec assurance)</p>
                           <p className="text-2xl font-bold text-primary">{formatCurrency(result.monthlyPayment)}</p>
                        </div>
                         <div className="p-4 bg-muted rounded-lg">
                           <p className="text-sm text-muted-foreground">Coût Total du Crédit</p>
                           <p className="text-2xl font-bold">{formatCurrency(result.totalCreditCost)}</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                           <p className="text-sm text-muted-foreground">Coût Total Assurance</p>
                           <p className="text-2xl font-bold">{formatCurrency(result.totalInsuranceCost)}</p>
                        </div>
                         <div className="p-4 bg-muted rounded-lg">
                           <p className="text-sm text-muted-foreground">Montant Total Remboursé</p>
                           <p className="text-2xl font-bold">{formatCurrency(result.totalAmountRepaid)}</p>
                        </div>
                    </CardContent>
                </Card>
              
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Tableau d'Amortissement Annuel</CardTitle>
                        <CardDescription>Visualisez la répartition de vos paiements au fil du temps.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead className="text-center">Année</TableHead>
                                <TableHead className="text-right">Capital Remboursé</TableHead>
                                <TableHead className="text-right">Intérêts Payés</TableHead>
                                <TableHead className="text-right">Capital Restant Dû</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {result.amortizationTable.map((row) => (
                                <TableRow key={row.year}>
                                    <TableCell className="text-center font-medium">{row.year}</TableCell>
                                    <TableCell className="text-right text-green-600">{formatCurrency(row.principalPaid)}</TableCell>
                                    <TableCell className="text-right text-red-600">{formatCurrency(row.interestPaid)}</TableCell>
                                    <TableCell className="text-right font-semibold">{formatCurrency(row.remainingBalance)}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline"><HelpCircle className="h-6 w-6 text-primary"/>Guide d'Utilisation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>Ce simulateur vous donne une estimation détaillée de votre prêt immobilier. Voici ce que chaque champ signifie :</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong className="text-foreground">Montant du Prêt :</strong> La somme que vous empruntez à la banque.</li>
                            <li><strong className="text-foreground">Durée :</strong> Le nombre d'années sur lesquelles vous rembourserez le prêt. Une durée plus longue réduit la mensualité mais augmente le coût total.</li>
                            <li><strong className="text-foreground">Taux d'Intérêt :</strong> Le taux nominal annuel du crédit. C'est le coût principal de l'emprunt.</li>
                            <li><strong className="text-foreground">Taux d'Assurance :</strong> Le taux annuel de l'assurance emprunteur, obligatoire au Maroc. Il est calculé sur le capital initial.</li>
                            <li><strong className="text-foreground">Frais de Dossier :</strong> Frais uniques payés à la banque pour la mise en place du crédit.</li>
                        </ul>
                        <p className="pt-2"><strong className="text-foreground">Comment lire le tableau :</strong> Au début, vos paiements couvrent majoritairement les intérêts. Au fil du temps, la part du capital remboursé augmente. Le "Coût Total du Crédit" est la somme de tous les intérêts plus les frais de dossier. C'est ce que l'emprunt vous coûte réellement, en plus du montant emprunté.</p>
                    </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
