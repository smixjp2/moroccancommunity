import { BrokerageComparator } from "../brokerage-comparator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export default function BrokerageComparatorPage() {
  return (
    <div className="container py-12 md:py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="font-headline text-4xl font-bold md:text-5xl">Comparateur de Courtiers</h1>
            <p className="mt-4 text-muted-foreground md:text-lg">
                Prenez des décisions basées sur les données. Comparez les produits financiers et simulez l'impact des frais sur vos investissements.
            </p>
        </div>
      <BrokerageComparator />
       <Card className="max-w-4xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            Guide d'Utilisation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <p>Choisir le bon courtier est crucial pour minimiser les coûts et optimiser votre expérience de trading. Voici comment utiliser ce tableau :</p>
            <ul className="list-disc pl-6 space-y-2">
                <li><strong>Frais & Commissions :</strong> C'est le pourcentage prélevé sur chaque transaction (achat ou vente). Des frais plus bas signifient que vous conservez une plus grande partie de vos gains.</li>
                <li><strong>Plateforme de Trading :</strong> Évalue la qualité et les fonctionnalités de l'outil en ligne fourni par le courtier pour passer des ordres et suivre votre portefeuille. Une plateforme "Excellente" ou "Moderne" offre généralement une meilleure expérience utilisateur.</li>
                <li><strong>Réactivité :</strong> Indique la rapidité et l'efficacité du service client pour répondre à vos questions ou résoudre les problèmes.</li>
            </ul>
             <p><strong>Commentaire :</strong> Pour les investisseurs actifs qui privilégient une plateforme moderne et des frais compétitifs, <strong>BMCE Capital Bourse</strong> et <strong>CIH Trade</strong> sont des concurrents de premier plan. Les investisseurs moins fréquents pourraient trouver leur compte avec des courtiers comme <strong>BP Bourse</strong> malgré une plateforme plus basique.</p>
        </CardContent>
      </Card>
    </div>
  );
}
