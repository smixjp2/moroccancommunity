import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, BarChart, Users, Award, Check } from "lucide-react";
import { CourseCurriculum } from "./course-curriculum";

const courseImage = PlaceHolderImages.find(p => p.id === 'course-excel-power-bi');

const highlights = [
  { icon: Database, text: "Maîtrise de Power Query & Power BI" },
  { icon: BarChart, text: "Création de dashboards financiers" },
  { icon: Award, text: "Coaching carrière 1-to-1 inclus" },
  { icon: Users, text: "Compétence très demandée" },
];

const targetAudience = [
    "Professionnels (RH, compta, finance) souhaitant se former à l’analyse de données.",
    "Étudiants et jeunes diplômés voulant acquérir une compétence clé.",
    "Freelances et entrepreneurs désirant automatiser leurs analyses.",
    "Contrôleurs de gestion et analystes financiers débutants.",
]

export default function FormationExcelPowerBiPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative bg-card text-card-foreground py-16 md:py-24">
         <div className="absolute inset-0 bg-black/20" />
         {courseImage && (
             <Image
                src={courseImage.imageUrl}
                alt="Formation Excel, Power Query & Power BI"
                data-ai-hint={courseImage.imageHint}
                fill
                className="object-cover opacity-20"
                priority
            />
         )}
        <div className="container relative z-10 text-center">
          <Badge variant="secondary">Formation Carrière</Badge>
          <h1 className="font-headline text-4xl md:text-6xl font-bold mt-4 max-w-4xl mx-auto">
            Excel, Power Query & Power BI pour la Finance
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
            Acquérez la compétence technique la plus demandée en finance et analyse de données, et bénéficiez d'un coaching pour booster votre carrière.
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
              Cette formation est conçue pour toute personne souhaitant transformer des données brutes en décisions stratégiques.
            </p>
            <ul className="mt-6 space-y-4">
              {targetAudience.map((target, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <span>{target}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Ce que vous saurez faire après la formation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p>✅ Nettoyer et transformer n'importe quel volume de données avec Power Query.</p>
                    <p>✅ Créer des modèles de données robustes et des calculs avec DAX.</p>
                    <p>✅ Concevoir des tableaux de bord financiers interactifs et percutants sur Power BI.</p>
                    <p>✅ Automatiser vos reportings pour gagner un temps précieux.</p>
                    <p>✅ Présenter vos analyses de manière claire et professionnelle.</p>
                </CardContent>
            </Card>
          </div>
        </div>
      </section>

        {/* CTA Final */}
       <section className="py-20 text-center">
        <div className="container">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Prêt à Devenir un Expert de la Donnée Financière ?</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Ne laissez pas passer l'opportunité d'acquérir une compétence qui transformera votre profil professionnel.
          </p>
          <div className="mt-8">
             <CourseCurriculum />
          </div>
        </div>
      </section>
    </div>
  );
}
