import { BrokerageComparator } from "../brokerage-comparator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export default function BrokerageComparatorPage() {
  return (
    <div className="container py-12 md:py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="font-headline text-4xl font-bold md:text-5xl">Comparateur de Courtiers</h1>
            <p className="mt-4 text-muted-foreground md:text-lg">
                Choisissez le meilleur courtier pour votre profil d'investisseur en comparant les détails essentiels.
            </p>
        </div>
      <BrokerageComparator />
       <Card className="max-w-6xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            Guide d'Utilisation et Conseils
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <p>Choisir le bon courtier est une étape cruciale pour optimiser vos investissements. Voici comment interpréter les informations ci-dessus :</p>
            <ul className="list-disc pl-6 space-y-2">
                <li><strong>Frais de Courtage :</strong> C'est la commission prélevée sur chaque transaction (achat ou vente). Des frais plus bas ont un impact direct et positif sur votre performance, surtout si vous êtes un investisseur actif. Attention au minimum de commission qui peut être pénalisant sur les petits ordres.</li>
                <li><strong>Droits de Garde :</strong> Ce sont des frais annuels pour la conservation de vos titres. Certains courtiers, notamment les plus récents ou digitaux, peuvent offrir la gratuité, ce qui est un avantage considérable sur le long terme.</li>
                <li><strong>Plateforme de Trading :</strong> Une plateforme moderne et intuitive (web et mobile) est essentielle pour passer des ordres facilement, suivre votre portefeuille en temps réel et accéder à des analyses. Une plateforme basique peut être un frein à votre réactivité.</li>
            </ul>
             <p className="pt-2 font-semibold"><strong>Nos Recommandations :</strong></p>
             <ul className="list-disc pl-6 space-y-2">
                <li><strong>Pour l'investisseur actif et digital :</strong> <span className="font-medium text-foreground">BMCE Capital Bourse</span> et <span className="font-medium text-foreground">Upline-CFG Group</span> offrent les plateformes les plus robustes et des frais compétitifs. <span className="font-medium text-foreground">CIH Trade</span> est une excellente alternative mobile-first avec des frais souvent attractifs.</li>
                <li><strong>Pour l'investisseur passif :</strong> Si vous faites peu de transactions, un courtier avec de faibles droits de garde est prioritaire, même si les frais de transaction sont légèrement plus élevés.</li>
                <li><strong>Pour le client d'une grande banque :</strong> La simplicité de tout avoir au même endroit peut être un avantage, mais soyez conscient que les frais sont souvent plus élevés (ex: Attijariwafa, BP Bourse).</li>
             </ul>
        </CardContent>
      </Card>
    </div>
  );
}
