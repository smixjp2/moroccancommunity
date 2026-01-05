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
import { CheckCircle, BookOpen, Gift, Users, Video, BarChart, FileText, AlertTriangle, Target, Radio, Briefcase, Gem } from "lucide-react";

const modules = [
  {
    icon: BookOpen,
    title: "MODULE 1 : Comprendre la Bourse de Casablanca en profondeur",
    points: [
      "Histoire & rôle économique",
      "Structure du marché marocain (principal, alternatif, obligataire)",
      "Les acteurs clés : AMMC, Maroclear, Sociétés de bourse",
      "Les indices marocains : MASI, MADEX et leur fonctionnement",
    ],
  },
  {
    icon: Briefcase,
    title: "MODULE 2 : Comment fonctionne l'investissement au Maroc",
    points: [
      "Les types de comptes (titres, espèces)",
      "Frais & fiscalité spécifiques au Maroc (commissions, IR, plus-values)",
      "Passer un ordre : limité, au marché et lecture du carnet d'ordres",
      "Cas pratique : calcul des frais sur un ordre réel",
    ],
  },
  {
    icon: BarChart,
    title: "MODULE 3 : Analyse fondamentale – Version Spéciale Maroc",
    points: [
      "Lire et interpréter les publications des sociétés marocaines",
      "Analyse financière complète (Bilan, Compte de résultat)",
      "Ratios clés appliqués aux actions marocaines (PER, PBV, ROE, Yield)",
      "Cas pratiques ultra détaillés : HPS, IAM, Label'Vie, Attijariwafa bank",
    ],
  },
  {
    icon: FileText,
    title: "MODULE 4 : Analyse sectorielle du marché marocain",
    points: [
      "Banques et Assurances : ratios et analyse spécifique",
      "Immobilier coté marocain (Risma, Aradei Capital)",
      "BTP & matériaux (LafargeHolcim, TGCC)",
      "Distribution, Consommation, Télécom & Énergie",
    ],
  },
    {
    icon: Radio,
    title: "MODULE 5 : Analyse technique (Casablanca Edition)",
    points: [
        "Principaux outils appliqués aux actions marocaines",
        "Tendance MASI et moyennes mobiles",
        "Supports / résistances et patterns simples",
        "Analyse des volumes sur un marché peu liquide",
    ],
    },
    {
    icon: Target,
    title: "MODULE 6 : Construire un portefeuille marocain",
    points: [
        "Stratégies d'investissement selon votre budget (500, 1000, 2000 DH/mois)",
        "Diversification sectorielle optimale",
        "Exemple de portefeuille solide et diversifié",
        "Fichier Excel de suivi de portefeuille fourni",
    ],
    },
    {
    icon: Video,
    title: "MODULE 7 : Plateformes marocaines (tutoriels réels)",
    points: [
        "Démos réelles des plateformes : BCP Bourse, Attijari, BMCE Capital, etc.",
        "Tutoriels : acheter, vendre, suivre son portefeuille",
        "Consulter l'historique et les carnets d'ordres en direct",
    ],
    },
    {
    icon: AlertTriangle,
    title: "MODULE 8 : Gestion du risque (spécifique au Maroc)",
    points: [
        "Les pièges de la faible liquidité du marché marocain",
        "Identifier les actions volatiles à éviter",
        "Impact des risques macroéconomiques (inflation, taux directeur BAM)",
        "Fiabilité des dividendes et comment éviter les 'pièges à dividendes'",
    ],
    },
    {
    icon: Gem,
    title: "MODULE 9 : Cas pratiques complets",
    points: [
        "Plus de 20 études de cas détaillées : HPS, Attijari, Maroc Telecom...",
        "Construire un portefeuille avec 1000 DH/mois",
        "Repérer une action sous-évaluée sur le marché marocain",
        "Analyse live d'un communiqué trimestriel et du carnet d'ordres",
    ],
    },
  {
    icon: Gift,
    title: "MODULE 10 : Bonus Exclusifs",
    points: [
      "Templates Excel : Analyse d'action, gestion de portefeuille, suivi dividendes",
      "Accès au groupe WhatsApp privé de la communauté",
      "1 session Live de Q&R par mois",
      "Liste des 20 actions marocaines à suivre (actualisée)",
      "Checklist d'analyse et Quiz de certification",
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
            Programme de la Formation Complète
          </DialogTitle>
          <DialogDescription className="text-center">
            10 modules, +12 heures de contenu et +20 cas pratiques 100% marocains.
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
                 <p className="text-4xl font-bold font-headline my-2 text-primary">1,499 MAD</p>
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
