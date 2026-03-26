import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CheckCircle } from "lucide-react";
import { getDictionary, getLocaleFromCookie } from "@/lib/i18n";

const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us');

export default function AboutPage() {
  const locale = getLocaleFromCookie();
  const t = getDictionary(locale);

  const processSteps = t.about.processSteps.map((text: string) => ({ text }));

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
            {t.about.title}
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
            {t.about.intro}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
            <div className="text-center">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">{t.about.missionTitle}</h2>
                <p className="mt-4 text-muted-foreground md:text-lg">
                    {t.about.missionText}
                </p>
                 <div className="mt-4 text-sm text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 rounded-md p-3 max-w-2xl mx-auto">
                    ▲ <span className="font-semibold">{t.company.warningTitle} :</span> {t.company.warningText}
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
