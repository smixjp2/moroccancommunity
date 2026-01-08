
import type { OpcvmCategory } from './types';
import { TrendingUp, BarChart, CircleDot, Infinity, Coins, FileText } from 'lucide-react';

export const opcvmCategories: OpcvmCategory[] = [
  {
    id: "actions",
    title: "Fonds OPCVM Actions",
    icon: TrendingUp,
    description: "Fonds investis majoritairement en actions de la Bourse de Casablanca. Ils présentent un potentiel de rendement élevé, mais avec un risque plus important.",
    funds: [
      {
        id: "fcp-irgam-actions",
        name: "FCP IRGAM ACTIONS",
        managementCompany: "IRG Asset Management",
        ytd: 21.46,
        perf1Y: 25.10,
        perf3Y: 12.55,
        description: "L'objectif du FCP IRGAM ACTIONS est de permettre aux investisseurs de profiter du potentiel de croissance du marché actions."
      },
      {
        id: "fcp-cam-investissement",
        name: "FCP CAM INVESTISSEMENT",
        managementCompany: "CAM Gestion",
        ytd: 18.87,
        perf1Y: 22.41,
        perf3Y: 9.80,
        description: "L'objectif de gestion du FCP est d'offrir sur le moyen et long terme une croissance de la valeur liquidative."
      },
      {
        id: "africapital-equity",
        name: "AFRICAPITAL EQUITY",
        managementCompany: "AFRICAPITAL GESTION",
        ytd: 11.17,
        perf1Y: 14.50,
        perf3Y: 7.20,
        description: "L'objectif du FCP est d'offrir aux porteurs de parts une rentabilité optimale via une gestion active sur le marché actions marocain."
      },
    ],
  },
  {
    id: "omlt",
    title: "Fonds OPCVM Obligataire Moyen & Long Terme",
    icon: BarChart,
    description: "Fonds investis en obligations d'entreprises ou d'État. Ils sont considérés comme moins risqués que les actions et visent un rendement régulier.",
    funds: [
      {
        id: "alpha-secure-fund",
        name: "ALPHA SECURE FUND",
        managementCompany: "Alpha Gestion",
        ytd: 4.89,
        perf1Y: 5.10,
        perf3Y: 3.90,
        description: "L'objectif du FCP est d'offrir aux souscripteurs une performance régulière et supérieure à celle du marché monétaire."
      },
      {
        id: "instiobligations",
        name: "INSTIOBLIGATIONS",
        managementCompany: "BMCE Capital Gestion",
        ytd: 3.60,
        perf1Y: 4.20,
        perf3Y: 3.10,
        description: "L'objectif de gestion du FCP est de valoriser les parts en investissant principalement sur le marché des taux."
      },
      {
        id: "fcp-oblig-opportunites",
        name: "FCP OBLIG OPPORTUNITES",
        managementCompany: "Wafa Gestion",
        ytd: 3.16,
        perf1Y: 3.80,
        perf3Y: 2.95,
        description: "L'objectif de gestion vise à obtenir, sur une durée de placement recommandée de 2 ans, une performance supérieure à celle des bons du Trésor."
      },
    ],
  },
  {
    id: "diversifie",
    title: "Fonds OPCVM Diversifié",
    icon: Infinity,
    description: "Ces fonds mixent actions, obligations et autres actifs pour équilibrer le couple rendement/risque. Une solution tout-en-un.",
    funds: [
        {
            id: 'attijari-patrimoine',
            name: 'ATTIJARI PATRIMOINE',
            managementCompany: "Wafa Gestion",
            ytd: 8.75,
            perf1Y: 10.20,
            perf3Y: 6.50,
            description: "L'objectif du fonds ATTIJARI PATRIMOINE DIVERSIFIE est de fournir une croissance du capital à moyen-long terme."
        },
        {
            id: 'upline-diversifie',
            name: 'UPLINE DIVERSIFIE',
            managementCompany: "Upline Capital Management",
            ytd: 5.61,
            perf1Y: 7.80,
            perf3Y: 5.10,
            description: "L'objectif de gestion est de permettre aux porteurs de parts de bénéficier du rendement du marché actions tout en maîtrisant le risque."
        },
        {
            id: 'fcp-africapital-diversifie',
            name: 'FCP AFRICAPITAL DIVERSIFIE',
            managementCompany: "AFRICAPITAL GESTION",
            ytd: 4.53,
            perf1Y: 6.90,
            perf3Y: 4.80,
            description: "L'objectif du FCP est d'offrir aux porteurs de parts une performance supérieure à celle des fonds diversifiés traditionnels."
        },
    ],
  },
  {
    id: "monetaire",
    title: "Fonds OPCVM Monétaire",
    icon: Coins,
    description: "Fonds à très faible risque, investis dans des instruments financiers à très court terme. Idéal pour placer sa trésorerie en toute sécurité.",
    funds: [
        {
            id: 'capital-trust-monetaire',
            name: 'CAPITAL TRUST MONETAIRE',
            managementCompany: "Capital Trust Gestion",
            ytd: 2.78,
            perf1Y: 3.05,
            perf3Y: 2.50,
            description: "L'objectif du fonds est d'offrir à ses porteurs de parts un rendement comparable au marché monétaire."
        },
        {
            id: 'wineo-cash',
            name: 'WINEO CASH',
            managementCompany: "Valoris Management",
            ytd: 2.53,
            perf1Y: 2.90,
            perf3Y: 2.30,
            description: "L'objectif du fonds est d'offrir une appréciation régulière au placement du porteur de parts sur le marché monétaire."
        },
        {
            id: 'sg-social-impact-fund',
            name: 'SG SOCIAL IMPACT FUND',
            managementCompany: "Société Générale Gestion",
            ytd: -0.73,
            perf1Y: -0.50,
            perf3Y: 0.10,
            description: "L'objectif du fonds est de permettre aux porteurs de parts de subventionner sous forme de don une association."
        },
    ],
  },
];
