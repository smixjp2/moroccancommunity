
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download, Youtube } from "lucide-react";
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

const analystVideos = [
    { id: "JbU8a_2g4eU", title: "Le Guide ULTIME pour investir dans l'immobilier au Maroc" },
    { id: "d_2y2oQY0wI", title: "Comment investir 1000 DH par mois en bourse ?" },
    { id: "84t6A6PVI7c", title: "Le guide ULTIME pour devenir rentier au Maroc" },
    { id: "GzXG6o-g42U", title: "Le guide ULTIME pour épargner au Maroc" },
];

const cfoVideos = [
    { id: "vD24lsohAAs", title: "Le guide ULTIME du contrôle de gestion au Maroc" },
    { id: "T6V6XKEnaN0", title: "Comment réussir son entretien d'embauche en finance" },
    { id: "X8-zq-wO_x4", title: "Analyse financière : Le guide ULTIME" },
    { id: "sE_AIjB7Prk", title: "Le guide ULTIME de la comptabilité pour les nuls" },
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
                <h2 className="font-headline text-3xl md:text-4xl font-bold flex items-center justify-center gap-3"><Youtube className="h-10 w-10 text-red-600"/>Nos Chaînes YouTube</h2>
                <p className="mt-4 text-muted-foreground md:text-lg">
                Découvrez nos analyses, tutoriels et guides en format vidéo.
                </p>
            </div>

            {/* The Moroccan Analyst Section */}
            <div className="space-y-4">
                 <h3 className="font-headline text-2xl font-bold">The Moroccan Analyst</h3>
                 <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                    >
                    <CarouselContent>
                        {analystVideos.map((video) => (
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
                                    <div className="p-4">
                                        <p className="font-semibold text-sm truncate">{video.title}</p>
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

             {/* The Moroccan CFO Section */}
            <div className="space-y-4">
                 <h3 className="font-headline text-2xl font-bold">The Moroccan CFO</h3>
                 <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                    >
                    <CarouselContent>
                        {cfoVideos.map((video) => (
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
                                     <div className="p-4">
                                        <p className="font-semibold text-sm truncate">{video.title}</p>
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

    </div>
  );
}

