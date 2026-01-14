
export interface NewsItem {
  title: string;
  source: string;
  excerpt: string;
  href: string;
}

export const newsItems: NewsItem[] = [
  {
    title: 'La Bourse de Casablanca termine la séance sur une note positive',
    source: 'Le Matin',
    excerpt: 'L\'indice MASI a progressé de 0.45%, porté par la bonne performance des secteurs bancaire et des télécommunications.',
    href: 'https://lematin.ma/express/2024/bourse-casablanca-cloture-mardi-seance-hausse/420000.html',
  },
  {
    title: 'Akdital: forte croissance des résultats au premier semestre',
    source: 'Medias24',
    excerpt: 'Le groupe hospitalier privé affiche une augmentation significative de son chiffre d\'affaires et de sa rentabilité, confirmant sa stratégie d\'expansion.',
    href: 'https://medias24.com/2024/09/19/akdital-forte-croissance-des-resultats-au-premier-semestre/',
  },
  {
    title: 'Bank Al-Maghrib maintient son taux directeur inchangé à 3%',
    source: 'L\'Economiste',
    excerpt: 'Le Conseil de la banque centrale a décidé de maintenir le statu quo, jugeant le niveau actuel approprié pour favoriser le retour de l\'inflation à des niveaux modérés.',
    href: 'https://www.leconomiste.com/flash-infos/bank-al-maghrib-maintient-son-taux-directeur-inchange-3',
  },
];
