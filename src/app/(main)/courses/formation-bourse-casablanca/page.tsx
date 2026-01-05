import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, BarChart, Target, Gift, Check } from "lucide-react";
import { CourseCurriculum } from "./course-curriculum";

const courseImage = PlaceHolderImages.find(p => p.id === 'course-casablanca-bourse');

const highlights = [
  { icon: BookOpen, text: "+12 heures de vidéo à la demande" },
  { icon: BarChart, text: "+20 études de cas 100% marocaines" },
  { icon: Target, text: "Fichiers Excel et templates fournis" },
  { icon: Gift, text: "Accès à un groupe privé et des lives mensuels" },
];

export default function FormationBourseCasablancaPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative bg-card text-card-foreground py-16 md:py-24">
         <div className="absolute inset-0 bg-black/20" />
         {courseImage && (
             <Image
                src={courseImage.imageUrl}
                alt="Formation Bourse de Casablanca"
                data-ai-hint={courseImage.imageHint}
                fill
                className="object-cover opacity-20"
                priority
            />
         )}
        <div className="container relative z-10 text-center">
          <Badge variant="secondary">Formation Vidéo Complète</Badge>
          <h1 className="font-headline text-4xl md:text-6xl font-bold mt-4 max-w-4xl mx-auto">
            De Zéro à Héros : La Formation Complète sur la Bourse de Casablanca
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
            Maîtrisez l'investissement à la Bourse de Casablanca, même en partant de zéro. Une méthode pas à pas avec des cas pratiques 100% marocains.
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
            <h2 className="font-headline text-3xl md:text-4xl font-bold">À qui s'adresse cette formation ?</h2>
            <p className="mt-4 text-muted-foreground">
              Que vous soyez un débutant absolu ou un investisseur cherchant à se perfectionner sur le marché marocain, cette formation est faite pour vous.
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start">
                <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                <span><strong>Les débutants</strong> qui veulent investir leur premier dirham en bourse de manière intelligente.</span>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                <span><strong>Les investisseurs intermédiaires</strong> qui souhaitent professionnaliser leur approche sur le marché marocain.</span>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                <span>Ceux qui en ont marre de suivre des conseils génériques et veulent une <strong>analyse 100% adaptée au Maroc.</strong></span>
              </li>
               <li className="flex items-start">
                <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                <span>Les <strong>futurs retraités</strong> qui veulent construire un portefeuille de dividendes solide.</span>
              </li>
            </ul>
          </div>
          <div>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Ce que vous saurez faire après la formation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p>✅ Analyser n'importe quelle action marocaine de A à Z.</p>
                    <p>✅ Lire et comprendre les rapports financiers des entreprises cotées.</p>
                    <p>✅ Construire et gérer un portefeuille diversifié et performant.</p>
                    <p>✅ Utiliser les plateformes de courtage marocaines sans stress.</p>
                    <p>✅ Éviter les erreurs coûteuses spécifiques au marché marocain.</p>
                </CardContent>
            </Card>
          </div>
        </div>
      </section>

        {/* CTA Final */}
       <section className="py-20 text-center">
        <div className="container">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Prêt à Devenir un Investisseur Averti ?</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Ne laissez pas la complexité du marché vous intimider. Rejoignez la formation et prenez le contrôle de votre avenir financier.
          </p>
          <div className="mt-8">
             <CourseCurriculum />
          </div>
        </div>
      </section>
    </div>
  );
}
