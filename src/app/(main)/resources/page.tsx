
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download, Youtube, Award } from "lucide-react";
import type { Resource } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";


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
    title: "كيفية فتح حساب في بورصة الدار البيضاء (Titres-Compte)",
    description: "دليل PDF مفصل خطوة بخطوة لمساعدتك في فتح أول حساب أوراق مالية لك مع وسيط مغربي.",
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

const allVideos = [
    { id: "aik4x2VzzCI", title: "CIH BANK : LE GUIDE ULTIME DE L'ACTION EN BOURSE" },
    { id: "OSwdZSkwvgk", title: "AKDITAL : LE GUIDE ULTIME DE L'ACTION EN BOURSE" },
    { id: "jUvqLYAWp8U", title: "Le Guide ULTIME pour investir en Bourse (de 0 à 1 million de DH)" },
    { id: "nUg6o50JVNQ", title: "Le guide ULTIME pour investir dans l'immobilier au Maroc" },
    { id: "MUuiJETTMPM", title: "Le guide ULTIME pour lire un bilan et un compte de résultat" },
    { id: "se3FHTgLbAI", title: "Le guide ULTIME du cash-flow (Flux de trésorerie)" },
    { id: "4aFiKzB3xKg", title: "La psychologie de l'argent (pour les nuls)" },
];

const premiumVideos = [
    { id: "jrQmUPfpGXs", title: "Le guide ULTIME des dividendes en bourse" },
    { id: "tBkZ6D873lk", title: "Le guide ULTIME pour préparer sa retraite" },
    { id: "4Yix-mCzoM8", title: "Le guide ULTIME du PER (taux de rendement, avantages fiscaux, etc.)" },
    { id: "3cLwEiJCuNQ", title: "Le guide ULTIME pour investir dans les OPCI au Maroc" },
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
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
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

      <Separator className="my-16" />

        <section className="space-y-12">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="font-headline text-3xl md:text-4xl font-bold flex items-center justify-center gap-3"><Youtube className="h-10 w-10 text-red-600"/>Nos Vidéos YouTube Gratuites</h2>
                <p className="mt-4 text-muted-foreground md:text-lg">
                Découvrez nos analyses, tutoriels et guides directement sur notre site.
                </p>
            </div>

            <div className="space-y-4">
                 <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                    >
                    <CarouselContent>
                        {allVideos.map((video) => (
                        <CarouselItem key={video.id} className="md:basis-1/2 lg:basis-1/3">
                            <Card className="overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="aspect-video">
                                        <iframe
                                            className="w-full h-full"
                                            src={`https://www.youtube.com/embed/${video.id}`}
                                            title={video.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                    </Carousel>
            </div>
        </section>

        <Separator className="my-16" />

        <section className="space-y-12">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="font-headline text-3xl md:text-4xl font-bold flex items-center justify-center gap-3"><Award className="h-10 w-10 text-primary"/>Contenu Premium et Accompagnement</h2>
                <p className="mt-4 text-muted-foreground md:text-lg">
                Passez au niveau supérieur avec des stratégies avancées, des modèles Excel, et un support direct pour accélérer votre maîtrise de la finance.
                </p>
                 <Button asChild className="mt-6" size="lg">
                    <a href="https://www.youtube.com/channel/UCK6m2fe2txUxNFxpn65rURg/join" target="_blank" rel="noopener noreferrer">Rejoindre la Communauté Privée</a>
                </Button>
            </div>
             <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
                >
                <CarouselContent>
                    {premiumVideos.map((video) => (
                    <CarouselItem key={video.id} className="md:basis-1/2 lg:basis-1/3">
                        <Card className="overflow-hidden">
                            <CardContent className="p-0">
                                <div className="aspect-video">
                                    <iframe
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${video.id}`}
                                        title={video.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                </Carousel>
        </section>

    </div>
  );
}
