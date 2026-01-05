import type { Article } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export const articles: Article[] = [
  {
    id: "1",
    title: "Analyse du MASI : Tendances du T3 et Perspectives",
    category: "Analyse de Marché",
    excerpt: "Une analyse approfondie de la performance de l'indice Moroccan All Shares au troisième trimestre et les prévisions à venir.",
    author: "Fatima Zahra",
    date: "2023-10-15",
    imageUrl: PlaceHolderImages.find(p => p.id === 'article-1')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'article-1')?.imageHint || ''
  },
  {
    id: "2",
    title: "Analyse du Secteur Bancaire : Quelle Action Bancaire Marocaine Acheter ?",
    category: "Analyse d'Actions",
    excerpt: "Nous comparons les principales banques cotées à la Bourse de Casablanca pour identifier les opportunités d'investissement les plus prometteuses.",
    author: "Youssef Alaoui",
    date: "2023-10-12",
    imageUrl: PlaceHolderImages.find(p => p.id === 'article-2')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'article-2')?.imageHint || ''
  },
  {
    id: "3",
    title: "L'Impact des Tendances Immobilières sur les Actions du BTP",
    category: "Analyse Sectorielle",
    excerpt: "Le marché immobilier marocain est en pleine évolution. Découvrez comment ces changements affectent la valorisation des grandes entreprises de construction.",
    author: "Amina Saadi",
    date: "2023-10-10",
    imageUrl: PlaceHolderImages.find(p => p.id === 'article-3')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'article-3')?.imageHint || ''
  },
];
