
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download } from "lucide-react";
import type { Resource } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const resources: Resource[] = [
    {
    id: "5",
    title: "Simulateur d'Intérêts Composés",
    description: "Un outil Excel puissant pour visualiser la croissance de vos investissements sur le long terme grâce à la magie des intérêts composés.",
    price: "Gratuit",
    href: "https://docs.google.com/spreadsheets/d/10hXt59mH8YaJixCOHUZaGyYCKszxtc_Q/edit?usp=sharing&ouid=104577439630191948819&rtpof=true&sd=true",
    imageUrl: PlaceHolderImages.find(p => p.id === 'resource-compound-interest')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'resource-compound-interest')?.imageHint || '',
  },
    {
    id: "resource-account-opening",
    title: "Comment créer un compte-titre à la Bourse de Casablanca",
    description: "Un guide PDF pas à pas pour vous accompagner dans l'ouverture de votre premier compte-titres auprès d'un courtier marocain.",
    price: "Gratuit",
    href: "https://drive.google.com/uc?export=download&id=1bL4Yam2LfuJISP0_ExyigJyLpeeLhw7s",
    imageUrl: PlaceHolderImages.find(p => p.id === 'resource-account-opening')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'resource-account-opening')?.imageHint || '',
  },
   {
    id: "resource-psychology-arabic",
    title: "كيفية فتح حساب في بورصة (Titres-Compte) الدار البيضاء",
    description: "Un guide essentiel pour comprendre la psychologie derrière le trading et maîtriser vos émotions pour prendre de meilleures décisions sur le marché.",
    price: "Gratuit",
    href: "https://drive.google.com/uc?export=download&id=1SJMxRYWXLN84R-ELkFZcc_-QcqwEJZYY",
    imageUrl: PlaceHolderImages.find(p => p.id === 'resource-psychology-arabic')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'resource-psychology-arabic')?.imageHint || '',
  },
  {
    id: "2",
    title: "La Liste Comparative Ultime des Courtiers",
    description: "Un PDF complet comparant tous les courtiers bancaires marocains sur les commissions, les frais, les taxes et les fonctionnalités de la plateforme. Faites un choix éclairé.",
    price: "Bientôt",
    href: "#",
    imageUrl: PlaceHolderImages.find(p => p.id === 'resource-2')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'resource-2')?.imageHint || '',
  },
];

export default function ResourcesPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Outils et Ressources Numériques</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Accélérez votre analyse et votre prise de décision avec nos produits numériques téléchargeables.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
        {resources.map((resource) => (
          <Card key={resource.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
             <CardHeader className="p-0">
                <Link href={resource.price === 'Bientôt' ? '#' : resource.href} target="_blank" rel="noopener noreferrer" className="block aspect-video overflow-hidden group">
                    <Image
                        src={resource.imageUrl}
                        alt={resource.title}
                        data-ai-hint={resource.imageHint}
                        width={600}
                        height={400}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>
            </CardHeader>
            <CardContent className="p-6 flex flex-col flex-1">
              <CardTitle className="font-headline text-2xl mb-2">{resource.title}</CardTitle>
              <CardDescription className="mb-4 flex-1">{resource.description}</CardDescription>
              <div className="flex justify-between items-center mt-4">
                <span className="text-2xl font-bold font-headline text-primary">{resource.price}</span>
                <Button asChild className="font-bold" disabled={resource.price === 'Bientôt'}>
                  <Link href={resource.href} target="_blank" rel="noopener noreferrer">
                    {resource.price === 'Gratuit' ? 'Télécharger' : 'Obtenir'} 
                    {resource.price !== 'Bientôt' && <Download className="ml-2 h-4 w-4" />}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
