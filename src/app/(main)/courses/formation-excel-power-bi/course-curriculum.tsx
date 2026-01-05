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
import { CheckCircle, BarChart, Gift, FileSpreadsheet, Database } from "lucide-react";

const sessions = [
  {
    icon: FileSpreadsheet,
    title: "Séance 1 : Introduction aux outils et exploration de Power Query",
    points: [
      "Présentation de la formation et des outils",
      "Exploration de l’interface Power Query dans Excel",
      "Connexion aux sources de données simples (Excel, CSV)",
      "Nettoyage de données de base (supprimer colonnes, remplacer valeurs)",
    ],
  },
  {
    icon: FileSpreadsheet,
    title: "Séance 2 : Transformation et structuration des données avec Power Query",
    points: [
      "Gestion des colonnes (scinder, fusionner, renommer)",
      "Transformation des types de données",
      "Filtrage et tri des données",
      "Introduction aux colonnes calculées",
    ],
  },
  {
    icon: Database,
    title: "Séance 3 : Introduction à Power BI et intégration des données",
    points: [
      "Présentation de l’interface Power BI Desktop",
      "Importation des données depuis Power Query",
      "Exploration des options de chargement de données",
      "Préparation d'un modèle simple pour un tableau de bord",
    ],
  },
  {
    icon: BarChart,
    title: "Séance 4 : Visualisations de base dans Power BI",
    points: [
      "Types de visualisations : tableaux, graphiques, cartes",
      "Ajout de filtres, segments et légendes",
      "Mise en forme des visualisations",
      "Construction d'un tableau de bord simple avec des KPI",
    ],
  },
  {
    icon: Database,
    title: "Séance 5 : Optimisation des modèles de données et introduction à DAX",
    points: [
      "Création et gestion des relations entre tables",
      "Concepts de base de DAX (mesures et colonnes calculées)",
      "Introduction aux fonctions DAX courantes (SUM, AVERAGE, IF)",
    ],
  },
  {
    icon: BarChart,
    title: "Séance 6 : Tableaux de bord interactifs",
    points: [
      "Utilisation des segments pour interagir avec les données",
      "Synchronisation des filtres entre plusieurs visualisations",
      "Optimisation de l’ergonomie et design des tableaux de bord",
    ],
  },
  {
    icon: Database,
    title: "Séance 7 : Publication et partage des rapports",
    points: [
      "Introduction à Power BI Service (composants et fonctionnalités)",
      "Publication des rapports et gestion des accès",
      "Planification de l’actualisation des données",
    ],
  },
  {
    icon: Gift,
    title: "Séance 8 : Projet final et coaching carrière",
    points: [
      "Application de toutes les compétences sur un cas concret",
      "Coaching carrière premium (1-to-1)",
      "Aide à la recherche d'emploi en finance",
      "Optimisation de CV et préparation aux entretiens",
    ],
  },
];


export function CourseCurriculum() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="font-bold text-lg w-full md:w-auto">
          Voir le Programme &amp; le Prix
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-3xl font-headline text-center">
            Programme de la Formation Complète
          </DialogTitle>
          <DialogDescription className="text-center">
            8 séances (16 heures) pour maîtriser Excel, Power Query et Power BI pour la finance.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto pr-4">
          <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            {sessions.map((session, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-center gap-3">
                    <session.icon className="h-5 w-5 text-primary" />
                    <span className="font-semibold">{session.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pl-8">
                    {session.points.map((point, pIndex) => (
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
                 <p className="text-sm text-muted-foreground">Accès à vie à la formation et au coaching carrière</p>
                 <p className="text-4xl font-bold font-headline my-2 text-primary">1,999 MAD</p>
                 <p className="text-xs text-muted-foreground">(Prix de lancement suggéré)</p>
            </div>
          <Button type="button" size="lg" asChild className="w-full mt-4">
            <a href="#">S'inscrire Maintenant</a>
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
