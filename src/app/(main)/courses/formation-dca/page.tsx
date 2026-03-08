import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Brain, Shield, Check, Target } from "lucide-react";
import { CourseCurriculum } from "./course-curriculum";

const courseImage = PlaceHolderImages.find(p => p.id === 'course-dca');

const highlights = [
  { icon: Zap, text: "Simple & Efficace" },
  { icon: Brain, text: "Anti-Stress & Psychologie" },
  { icon: Target, text: "Application Pratique BVC" },
  { icon: Shield, text: "Bouclier Anti-Inflation" },
];

export default function FormationDcaPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative bg-card text-card-foreground py-16 md:py-24">
         <div className="absolute inset-0 bg-black/20" />
         {courseImage && (
             <Image
                src={courseImage.imageUrl}
                alt="Formation Stratégie DCA"
                data-ai-hint={courseImage.imageHint}
                fill
                className="object-cover opacity-20"
                priority
            />
         )}
        <div className="container relative z-10 text-center">
          <Badge variant="secondary">Formation Stratégique</Badge>
          <h1 className="font-headline text-4xl md:text-6xl font-bold mt-4 max-w-4xl mx-auto">
            La Stratégie DCA : Investir Simplement et Efficacement
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
            Arrêtez de deviner le marché. Apprenez la méthode prouvée pour investir régulièrement, réduire votre risque et construire votre patrimoine sur le long terme.
          </p>
          <div className="mt-8">
            <CourseCurriculum />
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {highlights.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <item.icon className="h-10 w-10 text-primary mb-3" />
                <p className="font-semibold">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course For Who Section */}
      <section className="py-16 bg-card">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Pourquoi apprendre la stratégie DCA ?</h2>
            <p className="mt-4 text-muted-foreground">
              Cette formation est pour vous si vous voulez investir en bourse sans stress, de manière disciplinée et efficace, quel que soit votre niveau.
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start">
                <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                <span><strong>Pour les débutants</strong> qui veulent une méthode claire et facile à appliquer pour commencer à investir.</span>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                <span><strong>Pour les investisseurs frustrés</strong> par la volatilité du marché et qui cherchent une approche moins émotionnelle.</span>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                <span>Ceux qui veulent <strong>construire un patrimoine solide</strong> sur le long terme sans essayer de "timer" le marché.</span>
              </li>
               <li className="flex items-start">
                <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                <span>Les personnes qui souhaitent <strong>protéger leur épargne de l'inflation</strong> avec une méthode simple.</span>
              </li>
            </ul>
          </div>
          <div>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Ce que vous saurez faire après la formation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p>✅ Comprendre pourquoi le DCA est supérieur au "market timing".</p>
                    <p>✅ Appliquer le DCA concrètement à la Bourse de Casablanca.</p>
                    <p>✅ Gérer vos émotions et éviter les biais psychologiques coûteux.</p>
                    <p>✅ Transformer les crises de marché en opportunités d'achat.</p>
                    <p>✅ Créer votre propre plan d'investissement DCA personnalisé en 5 étapes.</p>
                </CardContent>
            </Card>
          </div>
        </div>
      </section>

        {/* CTA Final */}
       <section className="py-20 text-center">
        <div className="container">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Prêt à Investir avec Discipline et Sérénité ?</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Rejoignez la formation et adoptez une stratégie qui a fait ses preuves pour atteindre vos objectifs financiers.
          </p>
          <div className="mt-8">
             <CourseCurriculum />
          </div>
        </div>
      </section>
    </div>
  );
}

    