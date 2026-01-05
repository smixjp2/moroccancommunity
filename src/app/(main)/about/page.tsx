import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CheckCircle } from "lucide-react";

const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us');

const processSteps = [
    { text: "Nous vous aidons à comprendre les mécanismes de la bourse et de la finance au Maroc." },
    { text: "En fonction de vos objectifs, nous vous donnons les outils pour améliorer votre santé financière." },
    { text: "Nous vous aidons ensuite à trouver les meilleures stratégies d'épargne et d'investissement adaptées à vos besoins." },
    { text: "Nous mettons à jour nos analyses en fonction de l'évolution du marché et des nouvelles opportunités." }
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative bg-card text-card-foreground py-16 md:py-24">
         <div className="absolute inset-0 bg-black/20" />
         {aboutImage && (
             <Image
                src={aboutImage.imageUrl}
                alt="À propos de The Moroccan Community"
                data-ai-hint={aboutImage.imageHint}
                fill
                className="object-cover opacity-20"
                priority
            />
         )}
        <div className="container relative z-10 text-center">
          <h1 className="font-headline text-4xl md:text-6xl font-bold mt-4 max-w-4xl mx-auto">
            Qu'est-ce que The Moroccan Community ?
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
            The Moroccan Community est une plateforme éducative dédiée à aider chaque Marocain(e) à mieux gérer ses finances, à épargner efficacement et à investir au Maroc en toute confiance.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
            <div className="text-center">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Notre Mission</h2>
                <p className="mt-4 text-muted-foreground md:text-lg">
                    Nous contribuons à l'éducation et à l'inclusion financière en offrant une visibilité claire et des analyses approfondies sur le marché marocain. Nous vous donnons les clés pour prendre des décisions éclairées, mais nous ne fournissons pas de conseils financiers personnalisés.
                </p>
                 <div className="mt-4 text-sm text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 rounded-md p-3 max-w-2xl mx-auto">
                    ▲ <span className="font-semibold">Avertissement :</span> Les informations et outils sur ce site sont à but éducatif. Ils ne constituent pas des conseils en investissement.
                </div>
            </div>
            
            <div className="mt-20">
                 <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">Notre Processus</h2>
                 <div className="grid gap-10">
                    {processSteps.map((step, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-center gap-6">
                            <div className="flex-shrink-0 bg-primary text-primary-foreground h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold">
                                {index + 1}
                            </div>
                            <div className="flex-1">
                                <p className="text-lg text-foreground text-center md:text-left">
                                    {step.text}
                                </p>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
      </section>
    </div>
  );
}
