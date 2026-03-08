
"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CheckCircle, Lightbulb, Calculator, Brain, Zap, Shield, Briefcase, XCircle, ListChecks } from "lucide-react";

const modules = [
  {
    icon: Lightbulb,
    title: "MODULE 1 : Le Mythe du Timing du Marché",
    points: [
      "Pourquoi essayer de deviner le marché est une cause perdue",
      "Les coûts cachés du market timing",
      "Introduction au Dollar Cost Averaging (DCA)",
    ],
  },
  {
    icon: Calculator,
    title: "MODULE 2 : Les Mathématiques du PRUM",
    points: [
      "Comprendre le Prix de Revient Unitaire Moyen (PRUM)",
      "Comment le DCA lisse votre prix d'achat",
      "Simulation : Achat ponctuel vs. DCA",
    ],
  },
  {
    icon: Brain,
    title: "MODULE 3 : Psychologie : Vos Biais vs le DCA",
    points: [
      "Le biais de peur (FOMO) et d'excès de confiance",
      "Comment le DCA automatise la discipline",
      "Gérer ses émotions quand le marché baisse (et monte)",
    ],
  },
  {
    icon: Zap,
    title: "MODULE 4 : DCA en Temps de Crise",
    points: [
      "Pourquoi les baisses de marché sont des opportunités pour le DCA",
      "Analyse historique : le DCA pendant les krachs",
      "Renforcer son portefeuille quand tout le monde panique",
    ],
  },
    {
    icon: Shield,
    title: "MODULE 5 : Le Bouclier Anti-Inflation",
    points: [
        "Comprendre comment l'inflation ronge votre épargne",
        "Le DCA comme stratégie pour protéger votre pouvoir d'achat",
        "Comparaison : Livret d'épargne vs. DCA en actions",
    ],
    },
    {
    icon: Briefcase,
    title: "MODULE 6 : Application Pratique à la BVC",
    points: [
        "Quelles actions/trackers choisir pour le DCA à Casablanca ?",
        "Comment mettre en place des achats programmés ?",
        "Exemple concret de portefeuille DCA marocain",
    ],
    },
    {
    icon: XCircle,
    title: "MODULE 7 : Les Erreurs Fatales à Éviter",
    points: [
        "Arrêter le DCA au pire moment",
        "Choisir les mauvaises actions pour sa stratégie",
        "Ignorer les frais et la fiscalité",
    ],
    },
    {
    icon: ListChecks,
    title: "MODULE 8 : Votre Plan d'Action en 5 Étapes",
    points: [
        "Définir votre budget et fréquence d'investissement",
        "Choisir vos supports d'investissement",
        "Automatiser le processus au maximum",
        "Suivre et ajuster votre plan (sans tout changer)",
        "Template de plan d'action fourni",
    ],
    },
];

export function CourseCurriculum() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="font-bold text-lg w-full md:w-auto">
          Voir le Programme & le Prix
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-3xl font-headline text-center">
            Programme de la Formation Stratégie DCA
          </DialogTitle>
          <DialogDescription className="text-center">
            8 modules pour maîtriser l'investissement programmé et investir sans stress.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto pr-4">
          <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            {modules.map((module, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-center gap-3">
                    <module.icon className="h-5 w-5 text-primary" />
                    <span className="font-semibold">{module.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pl-8">
                    {module.points.map((point, pIndex) => (
                      <li key={pIndex} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <DialogFooter className="flex-col sm:flex-col sm:space-x-0 items-center pt-4 border-t">
            <div className="text-center">
                 <p className="text-sm text-muted-foreground">Accès à vie à la formation et aux futures mises à jour</p>
                 <p className="text-4xl font-bold font-headline my-2 text-primary">Bientôt disponible</p>
            </div>
          <Button type="button" size="lg" className="w-full mt-4" disabled>
            S'inscrire Maintenant
          </Button>
           <DialogClose asChild>
                <Button type="button" variant="ghost" className="text-xs text-muted-foreground">
                    Fermer
                </Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
