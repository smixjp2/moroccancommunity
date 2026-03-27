

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download, Youtube, Award } from "lucide-react";
import type { Resource } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { getDictionary, getLocaleFromCookie } from "@/lib/i18n";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";


const resources: Resource[] = [];

const allVideos = [
    { id: "aik4x2VzzCI", title: "CIH BANK : LE GUIDE ULTIME DE L'ACTION EN BOURSE" },
    { id: "jUvqLYAWp8U", title: "Le Guide ULTIME pour investir en Bourse (de 0 à 1 million de DH)" },
    { id: "nUg6o50JVNQ", title: "Le guide ULTIME pour investir dans l'immobilier au Maroc" },
    { id: "MUuiJETTMPM", title: "Le guide ULTIME pour lire un bilan et un compte de résultat" },
    { id: "se3FHTgLbAI", title: "Le guide ULTIME du cash-flow (Flux de trésorerie)" },
    { id: "4aFiKzB3xKg", title: "La psychologie de l'argent (pour les nuls)" },
    { id: "OSwdZSkwvgk", title: "AKDITAL : LE GUIDE ULTIME DE L'ACTION EN BOURSE" },
];

const premiumVideos = [
    { id: "jrQmUPfpGXs", title: "Le guide ULTIME des dividendes en bourse" },
    { id: "tBkZ6D873lk", title: "Le guide ULTIME pour préparer sa retraite" },
    { id: "4Yix-mCzoM8", title: "Le guide ULTIME du PER (taux de rendement, avantages fiscaux, etc.)" },
    { id: "3cLwEiJCuNQ", title: "Le guide ULTIME pour investir dans les OPCI au Maroc" },
];


export default function ResourcesPage() {
  const locale = getLocaleFromCookie();
  const t = getDictionary(locale);

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">{t.resources.pageTitle}</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          {t.resources.pageSubtitle}
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                    {resource.price === 'Gratuit' ? 'Télécharger' : (resource.price.includes('DH') || resource.price === 'Voir sur Gumroad') ? 'Acheter' : 'Obtenir'} 
                    {resource.price !== 'Bientôt' && !resource.price.includes('DH') && resource.price !== 'Voir sur Gumroad' && <Download className="ml-2 h-4 w-4" />}
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
          <h2 className="font-headline text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
            <Youtube className="h-10 w-10 text-red-600" />
            Nos Vidéos YouTube Gratuites
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Découvrez nos analyses, tutoriels et guides directement sur notre
            site.
          </p>
        </div>

        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full"
        >
          <CarouselContent>
            {allVideos.map((video) => (
              <CarouselItem
                key={video.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0 aspect-video">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <Separator className="my-16" />

      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
            <Award className="h-10 w-10 text-primary" />
            Contenu Premium
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Passez au niveau supérieur avec des stratégies avancées, des modèles
            Excel et du contenu exclusif pour accélérer votre maîtrise de la
            finance.
          </p>
          <Button asChild className="mt-6" size="lg">
            <a
              href="https://www.youtube.com/channel/UCK6m2fe2txUxNFxpn65rURg/join"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rejoindre la Communauté Privée
            </a>
          </Button>
        </div>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full"
        >
          <CarouselContent>
            {premiumVideos.map((video) => (
              <CarouselItem
                key={video.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0 aspect-video">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
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
