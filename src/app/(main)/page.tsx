
'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Newspaper, Wrench, Crown } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import { useToast } from "@/hooks/use-toast";
import fr from "@/locales/fr.json";
import en from "@/locales/en.json";
import { useLocale } from "@/hooks/use-locale";
import React, { useEffect } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
const featureImages = {
  articles: PlaceHolderImages.find(p => p.id === 'feature-articles'),
  tools: PlaceHolderImages.find(p => p.id === 'feature-tools'),
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
];

// FAQ items are built dynamically inside the component from locale dictionaries.

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" size="lg" disabled={pending}>
            {pending ? "Inscription..." : "S'abonner"}
        </Button>
    );
}

export default function Home() {
    const { toast } = useToast();
    const locale = useLocale();
    const t = locale === "en" ? en : fr;
    const faqItems = [
      { question: t.faq.q1, answer: t.faq.a1 },
      { question: t.faq.q2, answer: t.faq.a2 },
      { question: t.faq.q3, answer: t.faq.a3 },
      { question: t.faq.q4, answer: t.faq.a4 },
    ];
    const formRef = React.useRef<HTMLFormElement>(null);
    const [state, formAction] = useActionState(subscribeToNewsletter, { success: false, message: "" });

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast({
                    title: "Inscription réussie !",
                    description: state.message,
                });
                formRef.current?.reset();
            } else {
                toast({
                    variant: "destructive",
                    title: "Erreur d'inscription",
                    description: state.message,
                });
            }
        }
    }, [state, toast]);

  return (
    <>
      <section className="relative w-full h-[70vh] min-h-[600px] flex items-center justify-center text-center text-white">
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
              {t.home.heroTitle}
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-lg text-primary-foreground/90 md:text-xl">
              {t.home.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="font-bold text-lg px-8">
                <Link href="/articles">{t.home.heroCtaArticles} <ArrowRight className="ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="font-bold text-lg px-8">
                <Link href="/tools">{t.home.heroCtaTools}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* Features Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-headline text-3xl font-bold md:text-4xl">{t.home.featuresTitle}</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                {t.home.featuresSubtitle}
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
                      <CardTitle className="mt-2 text-sm font-normal text-muted-foreground">{feature.description}</CardTitle>
                      <Button asChild variant="link" className="px-0 mt-4 font-bold">
                          <Link href={feature.link}>Découvrir <ArrowRight className="ml-2" /></Link>
                      </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Community Section */}
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
                        {t.home.communityTitle}
                    </h2>
                    <p className="mt-4 text-lg text-primary-foreground/90">
                        {t.home.communityDescription}
                    </p>
                    <Button asChild size="lg" className="mt-8 font-bold bg-background text-foreground hover:bg-background/90">
                        <a href="https://www.youtube.com/channel/UCK6m2fe2txUxNFxpn65rURg/join" target="_blank" rel="noopener noreferrer">
                            {t.home.communityCta}
                        </a>
                    </Button>
                </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-card py-16 md:py-24 border-y">
          <div className="container grid md:grid-cols-2 gap-8 items-center">
              <div>
                  <h2 className="font-headline text-3xl font-bold md:text-4xl">{t.home.newsletterTitle}</h2>
                  <p className="mt-4 text-muted-foreground md:text-lg">
                      {t.home.newsletterSubtitle}
                  </p>
              </div>
              <form action={formAction} ref={formRef} className="flex w-full max-w-md items-center space-x-2 mx-auto">
                <Input name="email" type="email" placeholder="Votre meilleure adresse e-mail" className="flex-1 py-6" required />
                <SubmitButton />
              </form>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-headline text-3xl font-bold md:text-4xl">{t.home.faqTitle}</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                {t.home.faqSubtitle}
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
