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
    title: "Secteur Bancaire Marocain : Analyse et Perspectives",
    category: "Analyse Sectorielle",
    excerpt: "Plongez dans l'analyse du secteur bancaire, un pilier de l'économie marocaine. Découvrez les forces, les faiblesses et les opportunités.",
    author: "Karim El-Idrissi",
    date: "2023-11-02",
    imageUrl: PlaceHolderImages.find(p => p.id === 'article-2')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'article-2')?.imageHint || ''
  },
  {
    id: "3",
    title: "Investir dans l'Immobilier Marocain via les OPCI",
    category: "Guide d'Investissement",
    excerpt: "Les Organismes de Placement Collectif en Immobilier (OPCI) démocratisent l'accès à l'investissement immobilier. Est-ce le bon choix pour vous ?",
    author: "Amina Alami",
    date: "2023-10-28",
    imageUrl: PlaceHolderImages.find(p => p.id === 'article-3')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'article-3')?.imageHint || ''
  },
];
