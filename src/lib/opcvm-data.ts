import type { OpcvmCategory } from './types';
import { TrendingUp, BarChart, CircleDot, Infinity, Coins, FileText } from 'lucide-react';

export const opcvmCategories: OpcvmCategory[] = [
  {
    title: "Fonds OPCVM Actions",
    icon: TrendingUp,
    funds: [
      {
        id: "africapital-equity",
        name: "AFRICAPITAL EQUITY",
        ytd: 11.17,
        description: "L'objectif du FCP est d'offrir aux porteurs de parts une rentabilité optimale via une gestion active sur le marché actions marocain.",
      },
      {
        id: "fcp-irgam-actions",
        name: "FCP IRGAM ACTIONS",
        ytd: 21.46,
        description: "L'objectif du FCP IRGAM ACTIONS est de permettre aux investisseurs de profiter du potentiel de croissance du marché actions.",
      },
      {
        id: "fcp-cam-investissement",
        name: "FCP CAM INVESTISSEMENT",
        ytd: 18.87,
        description: "L'objectif de gestion du FCP est d'offrir sur le moyen et long terme une croissance de la valeur liquidative.",
      },
    ],
  },
  {
    title: "Fonds OPCVM OMLT",
    icon: BarChart,
    funds: [
      {
        id: "fcp-oblig-opportunites",
        name: "FCP OBLIG OPPORTUNITES",
        ytd: 3.16,
        description: "L'objectif de gestion vise à obtenir, sur une durée de placement recommandée de 2 ans, une performance supérieure à celle des bons du Trésor.",
      },
      {
        id: "instiobligations",
        name: "INSTIOBLIGATIONS",
        ytd: 3.60,
        description: "L'objectif de gestion du FCP est de valoriser les parts en investissant principalement sur le marché des taux.",
      },
      {
        id: "alpha-secure-fund",
        name: "ALPHA SECURE FUND",
        ytd: 4.89,
        description: "L'objectif du FCP est d'offrir aux souscripteurs une performance régulière et supérieure à celle du marché monétaire.",
      },
    ],
  },
  {
    title: "Fonds OPCVM Diversifié",
    icon: Infinity,
    funds: [
        {
            id: 'attijari-patrimoine',
            name: 'ATTIJARI PATRIMOINE',
            ytd: 8.75,
            description: "L'objectif du fonds ATTIJARI PATRIMOINE DIVERSIFIE est de fournir une croissance du capital à moyen-long terme.",
        },
        {
            id: 'fcp-africapital-diversifie',
            name: 'FCP AFRICAPITAL DIVERSIFIE',
            ytd: 4.53,
            description: "L'objectif du FCP est d'offrir aux porteurs de parts une performance supérieure à celle des fonds diversifiés traditionnels.",
        },
        {
            id: 'upline-diversifie',
            name: 'UPLINE DIVERSIFIE',
            ytd: 5.61,
            description: "L'objectif de gestion est de permettre aux porteurs de parts de bénéficier du rendement du marché actions tout en maîtrisant le risque.",
        }
    ],
  },
  {
    title: "Fonds OPCVM Monétaire",
    icon: Coins,
    funds: [
        {
            id: 'wineo-cash',
            name: 'WINEO CASH',
            ytd: 2.53,
            description: "L'objectif du fonds est d'offrir une appréciation régulière au placement du porteur de parts sur le marché monétaire.",
        },
        {
            id: 'sg-social-impact-fund',
            name: 'SG SOCIAL IMPACT FUND',
            ytd: -0.73,
            description: "L'objectif du fonds est de permettre aux porteurs de parts de subventionner sous forme de don une association.",
        },
        {
            id: 'capital-trust-monetaire',
            name: 'CAPITAL TRUST MONETAIRE',
            ytd: 2.78,
            description: "L'objectif du fonds est d'offrir à ses porteurs de parts un rendement comparable au marché monétaire.",
        }
    ],
  },
];
