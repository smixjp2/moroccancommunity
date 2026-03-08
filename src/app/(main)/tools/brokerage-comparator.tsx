import type { Brokerage } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Landmark, Tv, Wallet } from "lucide-react";

const brokerages: Brokerage[] = [
    { 
        name: "BMCE Capital Bourse", 
        fees: "0.35% HT (min 35 DH)", 
        custodyFees: "0.20% HT de la valeur du portefeuille (min 200 DH/an)",
        platform: "Web (bmcecapitalbourse.com) et mobile. Plateforme jugée moderne et performante.", 
        responsiveness: "Bonne", 
        logo: <Landmark className="text-blue-600" /> 
    },
    { 
        name: "CDG Capital Bourse", 
        fees: "0.40% HT (min 40 DH)",
        custodyFees: "0.35% HT de la valeur du portefeuille (min 200 DH/an)",
        platform: "Web et mobile. Plateforme complète avec des outils d'analyse.", 
        responsiveness: "Bonne", 
        logo: <Landmark className="text-teal-600" /> 
    },
    { 
        name: "Upline - CFG Group", 
        fees: "0.29% HT (min 29 DH)",
        custodyFees: "Gratuit la première année, puis conditions non publiques (souvent pour une clientèle patrimoniale).",
        platform: "Web (Upline direct). Très réputée pour sa qualité et ses analyses.", 
        responsiveness: "Excellente", 
        logo: <Landmark className="text-gray-700" /> 
    },
    { 
        name: "CIH Bank (CIH Trade)", 
        fees: "Variable, souvent promotionnel (ex: 0.25%). Structure standard moins claire.",
        custodyFees: "Généralement gratuits ou très bas, intégrés au package du compte.",
        platform: "Intégré à l'application CIH Mobile. Simple et accessible, mais moins riche en fonctionnalités.", 
        responsiveness: "Bonne (Digitale)", 
        logo: <Landmark className="text-pink-500" /> 
    },
    { 
        name: "Attijariwafa Bank", 
        fees: "0.45% HT (min 45 DH)",
        custodyFees: "Variable selon le contrat, souvent autour de 300-400 DH/an.",
        platform: "Web. Plateforme fonctionnelle mais considérée comme moins moderne que certains concurrents.", 
        responsiveness: "Moyenne", 
        logo: <Landmark className="text-yellow-500" /> 
    },
    { 
        name: "BP Bourse (Banque Populaire)", 
        fees: "0.50% HT (min 50 DH)",
        custodyFees: "Environ 0.30% de la valeur du portefeuille.",
        platform: "Web. Considérée comme basique et moins intuitive.", 
        responsiveness: "Moyenne", 
        logo: <Landmark className="text-purple-600" /> 
    },
];

export function BrokerageComparator() {
  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline">Comparateur de Comptes de Courtage</CardTitle>
        <CardDescription>Comparez les courtiers marocains en fonction des frais, de la plateforme de trading et des droits de garde.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[200px]">Courtier</TableHead>
                <TableHead>Frais de Courtage (HT)</TableHead>
                <TableHead>Droits de Garde Annuels (HT)</TableHead>
                <TableHead>Plateforme de Trading</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {brokerages.map((brokerage) => (
                <TableRow key={brokerage.name}>
                    <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-muted">{brokerage.logo}</div>
                        <span>{brokerage.name}</span>
                    </div>
                    </TableCell>
                    <TableCell>
                        <div className="font-semibold">{brokerage.fees}</div>
                    </TableCell>
                    <TableCell>
                        <div>{brokerage.custodyFees}</div>
                    </TableCell>
                    <TableCell>
                        <p className="max-w-xs">{brokerage.platform}</p>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
        <div className="mt-6 text-sm text-muted-foreground">
            <p><strong>Note importante :</strong> Les frais et conditions sont susceptibles de changer. HT signifie "Hors Taxes", la TVA (généralement 10% sur les commissions) est à ajouter. Il est fortement recommandé de contacter directement le courtier pour obtenir les informations les plus récentes et une brochure tarifaire complète avant d'ouvrir un compte.</p>
        </div>
      </CardContent>
    </Card>
  );
}
