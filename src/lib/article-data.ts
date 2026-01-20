
import type { Article } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export const articles: Article[] = [
  {
    id: "8",
    title: "LafargeHolcim Maroc : perspectives de cours en Bourse en 2026",
    category: "Analyse d'actions",
    excerpt: "Après une correction en 2025, l'action LafargeHolcim Maroc montre un potentiel de hausse notable pour 2026, soutenu par la reprise du secteur cimentier et des fondamentaux solides.",
    author: "L'équipe de TMC",
    date: "2026-01-20",
    imageUrl: PlaceHolderImages.find(p => p.id === 'article-8')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'article-8')?.imageHint || ''
  },
  {
    id: "7",
    title: "Réforme des OPCVM au Maroc : une étape structurante",
    category: "Réglementation",
    excerpt: "La nouvelle loi 03-25 vise à diversifier l'offre de produits financiers, renforcer l'attractivité du marché et attirer de nouveaux investisseurs.",
    author: "L'équipe de TMC",
    date: "2026-01-13",
    imageUrl: PlaceHolderImages.find(p => p.id === 'article-7')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'article-7')?.imageHint || ''
  },
  {
    id: "6",
    title: "Cash Plus : quels leviers pour la trajectoire du titre",
    category: "Analyse d'actions",
    excerpt: "Notre analyse fondamentale et perspectives après l’IPO de Cash Plus. Quels sont les leviers qui influenceront la trajectoire du titre ?",
    author: "L'équipe de TMC",
    date: "2026-01-13",
    imageUrl: PlaceHolderImages.find(p => p.id === 'article-6')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'article-6')?.imageHint || ''
  },
  {
    id: "5",
    title: "Quels moteurs pour le marché actions marocain en 2026 ?",
    category: "Analyse de Marché",
    excerpt: "Notre analyse économique et boursière sur les perspectives du marché marocain pour 2026, analysant les moteurs de croissance potentiels.",
    author: "L'équipe de TMC",
    date: "2024-08-25",
    imageUrl: PlaceHolderImages.find(p => p.id === 'article-5')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'article-5')?.imageHint || ''
  },
  {
    id: "4",
    title: "Réouverture du complexe hospitalier Akdital à Rabat : un signal fort pour le secteur privé de la santé",
    category: "Analyse Sectorielle",
    excerpt: "Après plusieurs mois d’attente, le complexe hospitalier Akdital de Rabat a obtenu les autorisations pour sa réouverture. Un signal positif pour les investisseurs et le secteur.",
    author: "L'équipe de TMC",
    date: "2026-01-10",
    imageUrl: PlaceHolderImages.find(p => p.id === 'article-4')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'article-4')?.imageHint || ''
  },
];
