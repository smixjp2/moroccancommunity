
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Newspaper, Wrench, GraduationCap, Crown } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import { toast } from "@/hooks/use-toast";

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
const featureImages = {
  articles: PlaceHolderImages.find(p => p.id === 'feature-articles'),
  tools: PlaceHolderImages.find(p => p.id === 'feature-tools'),
  courses: PlaceHolderImages.find(p => p.id === 'feature-courses'),
}
const privateCommunityImage = PlaceHolderImages.find(p => p.id === 'private-community');

const features = [
  {
    icon: <Newspaper className="h-8 w-8 text-primary" />,
    title: "Articles Approfondis",
    description: "Explorez l'analyse d'experts du marché boursier marocain, les tendances sectorielles et la performance de l'indice MASI.",
    link: "/articles",
    image: featureImages.articles,
  },
  {
    icon: <Wrench className="h-8 w-8 text-primary" />,
    title: "Simulateurs Puissants",
    description: "Comparez les banques, les courtiers et simulez l'impact des frais sur vos investissements avec nos outils performants.",
    link: "/tools",
    image: featureImages.tools,
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: "Cours d'Investissement",
    description: "De votre premier salaire aux stratégies avancées, nos cours vous permettent d'investir avec confiance.",
    link: "/courses",
    image: featureImages.courses,
  },
];

const faqItems = [
  {
    question: "Qu'est-ce que The Moroccan Community ?",
    answer: "C'est une plateforme éducative qui fournit des analyses, des outils et des cours pour aider les Marocains à investir en bourse, à gérer leurs finances et à développer leurs compétences professionnelles.",
  },
  {
    question: "Vos cours sont-ils adaptés aux débutants ?",
    answer: "Absolument. Nous proposons des formations pour tous les niveaux, y compris des cours spécialement conçus pour les débutants qui partent de zéro, comme notre formation sur la Bourse de Casablanca.",
  },
  {
    question: "Les analyses se concentrent-elles uniquement sur le marché marocain ?",
    answer: "Oui, notre expertise principale se concentre à 100% sur le marché marocain, ses entreprises, son économie et les compétences recherchées par les employeurs au Maroc.",
  },
  {
    question: "Comment puis-je accéder à du contenu exclusif ?",
    answer: "Vous pouvez rejoindre notre communauté privée en devenant membre payant sur notre chaîne YouTube. Cela vous donne accès à des analyses approfondies, du contenu exclusif et des interactions directes.",
  },
];


export default function Home() {

  async function handleSubscription(formData: FormData) {
    'use server';
    const email = formData.get('email') as string;
    if (!email) return;

    try {
      await subscribeToNewsletter(email);
      // NOTE: We cannot call `toast` from a server action. 
      // This would need a more complex implementation using useFormState
      // to show a success message to the user.
    } catch (error) {
       // Similarly, error handling would need to be bubbled up to the client.
      console.error('Subscription failed:', error);
    }
  }

  return (
    <>
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-headline text-4xl font-bold md:text-6xl lg:text-7xl drop-shadow-md">
              Débloquez le Potentiel du Marché Marocain
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-lg text-primary-foreground/90 md:text-xl">
              Votre source d'analyses d'experts, d'outils puissants et de ressources pédagogiques pour investir au Maroc.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="font-bold">
                <Link href="/articles">Explorer les Analyses <ArrowRight className="ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="font-bold">
                <Link href="/tools">Utiliser les Outils</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main>
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-headline text-3xl font-bold md:text-4xl">Des Outils pour Chaque Investisseur</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Que vous soyez débutant ou professionnel chevronné, The Moroccan Community vous apporte la clarté dont vous avez besoin pour naviguer sur le marché marocain.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                  <CardHeader className="p-0">
                    {feature.image && (
                      <div className="aspect-video overflow-hidden">
                          <Image
                              src={feature.image.imageUrl}
                              alt={feature.title}
                              data-ai-hint={feature.image.imageHint}
                              width={600}
                              height={400}
                              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-6">
                      <div className="mb-4">{feature.icon}</div>
                      <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                      <CardDescription className="mt-2">{feature.description}</CardDescription>
                      <Button asChild variant="link" className="px-0 mt-4 font-bold">
                          <Link href={feature.link}>Découvrir <ArrowRight className="ml-2" /></Link>
                      </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="relative rounded-lg overflow-hidden p-8 md:p-12 text-center text-white bg-card">
                {privateCommunityImage && (
                  <Image
                    src={privateCommunityImage.imageUrl}
                    alt={privateCommunityImage.description}
                    data-ai-hint={privateCommunityImage.imageHint}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-primary/80" />
                <div className="relative z-10 max-w-2xl mx-auto">
                    <div className="mb-4">
                        <Crown className="h-12 w-12 mx-auto text-yellow-300" />
                    </div>
                    <h2 className="font-headline text-3xl font-bold md:text-4xl text-primary-foreground">
                        Rejoignez notre Communauté Privée
                    </h2>
                    <p className="mt-4 text-lg text-primary-foreground/90">
                        Accédez à du contenu exclusif, des analyses approfondies et interagissez directement avec nous en devenant membre payant sur YouTube.
                    </p>
                    <Button asChild size="lg" className="mt-8 font-bold bg-background text-foreground hover:bg-background/90">
                        <a href="https://www.youtube.com/channel/UCK6m2fe2txUxNFxpn65rURg/join" target="_blank" rel="noopener noreferrer">
                            Devenir Membre
                        </a>
                    </Button>
                </div>
            </div>
          </div>
        </section>

        <section className="bg-card py-16 md:py-24">
          <div className="container grid md:grid-cols-2 gap-8 items-center">
              <div>
                  <h2 className="font-headline text-3xl font-bold md:text-4xl">Restez à l'Avant-Garde du Marché</h2>
                  <p className="mt-4 text-muted-foreground md:text-lg">
                      Abonnez-vous à notre newsletter mensuelle gratuite pour recevoir les dernières actualités du marché, des analyses et des offres exclusives.
                  </p>
              </div>
              <form action={handleSubscription} className="flex w-full max-w-md items-center space-x-2 mx-auto">
                <Input name="email" type="email" placeholder="Votre meilleure adresse e-mail" className="flex-1 py-6" required />
                <Button type="submit" size="lg">S'abonner</Button>
              </form>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-headline text-3xl font-bold md:text-4xl">Foire Aux Questions</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Trouvez des réponses rapides aux questions les plus courantes.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-left font-semibold hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
