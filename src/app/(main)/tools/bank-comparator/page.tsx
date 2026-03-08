import { BankComparator } from "../bank-comparator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export default function BankComparatorPage() {
  return (
    <div className="container py-12 md:py-16">
       <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Comparateur de Banques</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
            Prenez des décisions basées sur les données. Comparez les produits financiers et simulez l'impact des frais sur vos investissements.
        </p>
      </div>
      <BankComparator />
      <Card className="max-w-4xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            Guide d'Utilisation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <p>Ce comparateur vous aide à choisir une banque pour vos opérations courantes au Maroc. Voici comment l'interpréter :</p>
            <ul className="list-disc pl-6 space-y-2">
                <li><strong>Frais Annuels :</strong> Indique le niveau général des frais pour la tenue de compte et les services de base. "Standard", "Compétitifs", et "Bas" vous donnent une idée relative des coûts. Les banques digitales comme CIH ont souvent les frais les plus bas.</li>
                <li><strong>Accessibilité :</strong> Évalue la facilité d'accès aux services, que ce soit via un large réseau d'agences physiques ou des plateformes digitales performantes.</li>
            </ul>
            <p><strong>Commentaire :</strong> Pour une utilisation principalement digitale avec des frais minimaux, <strong>CIH Bank</strong> est souvent un excellent choix. Pour un service complet avec un grand réseau d'agences, <strong>Attijariwafa Bank</strong> et <strong>Banque Populaire</strong> sont des options solides, bien que leurs frais puissent être plus élevés.</p>
        </CardContent>
      </Card>
    </div>
  );
}
