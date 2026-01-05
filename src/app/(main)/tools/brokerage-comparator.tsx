import type { Brokerage } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Landmark } from "lucide-react";

const brokerages: Brokerage[] = [
    { name: "Attijariwafa Trade", fees: "0.45% par transaction", platform: "Bonne", responsiveness: "Moyenne", logo: <Landmark className="text-yellow-500" /> },
    { name: "BMCE Capital Bourse", fees: "0.40% par transaction", platform: "Excellente", responsiveness: "Bonne", logo: <Landmark className="text-blue-600" /> },
    { name: "BP Bourse", fees: "0.50% par transaction", platform: "Basique", responsiveness: "Bonne", logo: <Landmark className="text-purple-600" /> },
    { name: "CIH Trade", fees: "0.35% (Variable)", platform: "Moderne", responsiveness: "Bonne (Digitale)", logo: <Landmark className="text-pink-500" /> },
    { name: "SG Maroc Bourse", fees: "0.55% par transaction", platform: "Bonne", responsiveness: "Moyenne", logo: <Landmark className="text-red-600" /> },
];

export function BrokerageComparator() {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline">Comparateur de Comptes de Courtage</CardTitle>
        <CardDescription>Comparez les courtiers marocains en fonction des frais, de la plateforme de trading et de la réactivité du service.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Courtier</TableHead>
              <TableHead>Frais & Commissions</TableHead>
              <TableHead>Plateforme de Trading</TableHead>
              <TableHead>Réactivité</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brokerages.map((brokerage) => (
              <TableRow key={brokerage.name}>
                <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                    <div className="h-6 w-6 flex items-center justify-center">{brokerage.logo}</div>
                    <span>{brokerage.name}</span>
                  </div>
                </TableCell>
                <TableCell>{brokerage.fees}</TableCell>
                <TableCell>{brokerage.platform}</TableCell>
                <TableCell>{brokerage.responsiveness}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
