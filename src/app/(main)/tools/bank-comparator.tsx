import type { Bank } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Landmark } from "lucide-react";

const banks: Bank[] = [
    { name: "Attijariwafa Bank", fees: "Standard", accessibility: "Excellente", logo: <Landmark className="text-yellow-500" /> },
    { name: "BMCE Bank of Africa", fees: "Compétitifs", accessibility: "Bonne", logo: <Landmark className="text-blue-600" /> },
    { name: "Banque Populaire", fees: "Bas", accessibility: "Très Bonne", logo: <Landmark className="text-purple-600" /> },
    { name: "CIH Bank", fees: "Très Bas (Digital)", accessibility: "Excellente (Digitale)", logo: <Landmark className="text-pink-500" /> },
    { name: "Société Générale Maroc", fees: "Élevés", accessibility: "Bonne", logo: <Landmark className="text-red-600" /> },
];

export function BankComparator() {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline">Comparateur de Comptes Courants</CardTitle>
        <CardDescription>Comparez les banques marocaines pour les comptes courants en fonction des frais et de l'accessibilité.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Banque</TableHead>
              <TableHead>Frais Annuels</TableHead>
              <TableHead>Accessibilité (Agence & Digitale)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banks.map((bank) => (
              <TableRow key={bank.name}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 flex items-center justify-center">{bank.logo}</div>
                    <span>{bank.name}</span>
                  </div>
                </TableCell>
                <TableCell>{bank.fees}</TableCell>
                <TableCell>{bank.accessibility}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
