
'use client';

import { useState } from 'react';

// Instruction: Ce fichier est un outil temporaire pour vous aider à pousser votre code sur GitHub.
// Comme vous travaillez directement sur GitHub, la méthode la plus simple est la suivante.
// 1. Sur votre dépôt GitHub en ligne, cliquez sur "Add file" > "Create new file".
// 2. Pour chaque fichier listé ci-dessous dans `ALL_FILES`, copiez le chemin du fichier (ex: "src/app/page.tsx").
// 3. Collez ce chemin dans le champ de nom de fichier sur GitHub.
// 4. Copiez le contenu du fichier (tout ce qui se trouve entre les ```) et collez-le dans l'éditeur de fichier sur GitHub.
// 5. Cliquez sur "Commit new file".
// 6. Répétez pour tous les fichiers.

// Une fois que vous avez transféré tous les fichiers une première fois, vous n'aurez plus qu'à mettre à jour ceux qui changent.

const ALL_FILES = {
  ".env": ``,
  "README.md": `# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.
`,
  "apphosting.yaml": `# Settings to manage and configure a Firebase App Hosting backend.
# https://firebase.google.com/docs/app-hosting/configure

runConfig:
  # Increase this value if you'd like to automatically spin up
  # more instances in response to increased traffic.
  maxInstances: 1
`,
  "components.json": `{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}`,
  "next.config.ts": `import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
`,
  "package.json": `{
  "name": "nextn",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack -p 9002",
    "genkit:dev": "genkit start -- tsx src/ai/dev.ts",
    "genkit:watch": "genkit start -- tsx --watch src/ai/dev.ts",
    "build": "NODE_ENV=production next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@genkit-ai/google-genai": "^1.20.0",
    "@genkit-ai/next": "^1.20.0",
    "@hookform/resolvers": "^4.1.3",
    "@radix-ui/react-accordion": "^1.2.3",
    "@radix-ui/react-alert-dialog": "^1.1.6",
    "@radix-ui/react-avatar": "^1.1.3",
    "@radix-ui/react-checkbox": "^1.1.4",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-menubar": "^1.1.6",
    "@radix-ui/react-popover": "^1.1.6",
    "@radix-ui/react-progress": "^1.1.2",
    "@radix-ui/react-radio-group": "^1.2.3",
    "@radix-ui/react-scroll-area": "^1.2.3",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-separator": "^1.1.2",
    "@radix-ui/react-slider": "^1.2.3",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.1.3",
    "@radix-ui/react-tabs": "^1.1.3",
    "@radix-ui/react-toast": "^1.2.6",
    "@radix-ui/react-tooltip": "^1.1.8",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "dotenv": "^16.5.0",
    "embla-carousel-react": "^8.6.0",
    "firebase": "^11.9.1",
    "genkit": "^1.20.0",
    "lucide-react": "^0.475.0",
    "next": "15.5.9",
    "patch-package": "^8.0.0",
    "react": "^19.2.1",
    "react-day-picker": "^9.11.3",
    "react-dom": "^19.2.1",
    "react-hook-form": "^7.54.2",
    "recharts": "^2.15.1",
    "tailwind-merge": "^3.0.1",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19.2.1",
    "@types/react-dom": "^19.2.1",
    "genkit-cli": "^1.20.0",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
`,
  "src/ai/dev.ts": `import { config } from 'dotenv';
config();

import '@/ai/flows/investment-news-summarizer.ts';
import '@/ai/flows/fee-simulator-tool.ts';
import '@/ai/flows/dividend-yield-calculator.ts';
import '@/ai/flows/retirement-planner.ts';
`,
  "src/ai/flows/dividend-yield-calculator.ts": `'use server';

/**
 * @fileOverview Calculates dividend yield and provides analysis.
 *
 * - calculateDividendYield - A function that calculates dividend yield.
 * - DividendYieldInput - The input type for the calculateDividendYield function.
 * - DividendYieldOutput - The return type for the calculateDividendYield function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DividendYieldInputSchema = z.object({
  stockPrice: z.number().describe('The current price of one share of the stock.'),
  annualDividendPerShare: z.number().describe('The total dividend paid per share over a year.'),
  investmentAmount: z.number().describe('The total amount you want to invest.'),
});
export type DividendYieldInput = z.infer<typeof DividendYieldInputSchema>;

const DividendYieldOutputSchema = z.object({
  dividendYield: z.number().describe('The dividend yield percentage.'),
  numberOfShares: z.number().describe('The number of shares that can be purchased with the investment amount.'),
  annualDividendIncome: z.number().describe('The estimated annual income from dividends.'),
  analysis: z.string().describe('An analysis of the dividend yield and what it means for the investor.'),
  recommendation: z.string().describe('A recommendation based on the calculation.')
});
export type DividendYieldOutput = z.infer<typeof DividendYieldOutputSchema>;

export async function calculateDividendYield(input: DividendYieldInput): Promise<DividendYieldOutput> {
  return dividendYieldFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dividendYieldPrompt',
  input: {schema: DividendYieldInputSchema},
  output: {schema: DividendYieldOutputSchema},
  prompt: \`You are a financial analyst specializing in dividend investing in the Moroccan market.

Your task is to calculate the dividend yield, potential income, and provide a clear analysis and recommendation for an investor.

Input Data:
- Stock Price: {{{stockPrice}}} MAD
- Annual Dividend Per Share: {{{annualDividendPerShare}}} MAD
- Investment Amount: {{{investmentAmount}}} MAD

Calculations:
1.  **Number of Shares**: \\\`investmentAmount / stockPrice\\\`
2.  **Dividend Yield**: \\\`(annualDividendPerShare / stockPrice) * 100\\\`
3.  **Annual Dividend Income**: \\\`numberOfShares * annualDividendPerShare\\\`

Analysis:
- Explain what the calculated dividend yield represents (e.g., high, low, average for the market).
- Discuss the relationship between yield, stock price, and dividend safety.
- Provide a clear, actionable recommendation for a Moroccan investor.

Output in JSON format.
\`,
});

const dividendYieldFlow = ai.defineFlow(
  {
    name: 'dividendYieldFlow',
    inputSchema: DividendYieldInputSchema,
    outputSchema: DividendYieldOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
`,
  "src/ai/flows/fee-simulator-tool.ts": `'use server';

/**
 * @fileOverview A fee simulator AI agent that calculates the impact of fees on investment returns.
 *
 * - feeSimulator - A function that calculates the impact of fees on investment returns.
 * - FeeSimulatorInput - The input type for the feeSimulator function.
 * - FeeSimulatorOutput - The return type for the feeSimulator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FeeSimulatorInputSchema = z.object({
  initialInvestment: z
    .number()
    .describe('The initial investment amount in Moroccan Dirhams.'),
  annualReturnRate: z
    .number()
    .describe('The estimated annual return rate as a percentage.'),
  investmentPeriod: z
    .number()
    .describe('The investment period in years.'),
  bankFees: z
    .number()
    .describe('The annual bank fees in Moroccan Dirhams.'),
  commissionStructure: z
    .string()
    .describe(
      'The commission structure of the bank, including transaction fees and any other charges.'
    ),
});
export type FeeSimulatorInput = z.infer<typeof FeeSimulatorInputSchema>;

const FeeSimulatorOutputSchema = z.object({
  finalValueWithoutFees: z
    .number()
    .describe('The final value of the investment without considering any fees.'),
  totalFeesPaid: z
    .number()
    .describe('The total amount of fees paid over the investment period.'),
  finalValueWithFees: z
    .number()
    .describe('The final value of the investment after deducting all fees.'),
  feeImpactPercentage: z
    .number()
    .describe(
      'The percentage impact of fees on the final investment value. Higher number is bad.'
    ),
  recommendation: z
    .string()
    .describe(
      'A recommendation on whether the bank is cost-effective based on the fee impact.'
    ),
});
export type FeeSimulatorOutput = z.infer<typeof FeeSimulatorOutputSchema>;

export async function feeSimulator(input: FeeSimulatorInput): Promise<FeeSimulatorOutput> {
  return feeSimulatorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'feeSimulatorPrompt',
  input: {schema: FeeSimulatorInputSchema},
  output: {schema: FeeSimulatorOutputSchema},
  prompt: \`You are an expert financial analyst specializing in Moroccan investments. You will calculate the impact of bank fees and commissions on investment returns and provide a recommendation.

Calculate the final value of an investment with and without fees, the total fees paid, and the percentage impact of fees on the final value.

Based on the fee impact, provide a recommendation on whether the bank is cost-effective. A lower fee impact is better.

Initial Investment: {{{initialInvestment}}} MAD
Annual Return Rate: {{{annualReturnRate}}}%
Investment Period: {{{investmentPeriod}}} years
Bank Fees: {{{bankFees}}} MAD
Commission Structure: {{{commissionStructure}}}

Output in JSON format:
\`,
});

const feeSimulatorFlow = ai.defineFlow(
  {
    name: 'feeSimulatorFlow',
    inputSchema: FeeSimulatorInputSchema,
    outputSchema: FeeSimulatorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
`,
  "src/ai/flows/investment-news-summarizer.ts": `'use server';

/**
 * @fileOverview Summarizes Moroccan market news for a weekly newsletter.
 *
 * - summarizeInvestmentNews - A function that summarizes investment news.
 * - SummarizeInvestmentNewsInput - The input type for the summarizeInvestmentNews function.
 * - SummarizeInvestmentNewsOutput - The return type for the summarizeInvestmentNews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NewsArticleSchema = z.object({
  title: z.string().describe('The title of the news article.'),
  content: z.string().describe('The content of the news article.'),
  source: z.string().describe('The source of the news article.'),
});

const SummarizeInvestmentNewsInputSchema = z.object({
  articles: z.array(NewsArticleSchema).describe('An array of news articles to summarize.'),
});

export type SummarizeInvestmentNewsInput = z.infer<typeof SummarizeInvestmentNewsInputSchema>;

const SummarizeInvestmentNewsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the investment news.'),
});

export type SummarizeInvestmentNewsOutput = z.infer<typeof SummarizeInvestmentNewsOutputSchema>;

export async function summarizeInvestmentNews(input: SummarizeInvestmentNewsInput): Promise<SummarizeInvestmentNewsOutput> {
  return summarizeInvestmentNewsFlow(input);
}

const summarizeNewsPrompt = ai.definePrompt({
  name: 'summarizeNewsPrompt',
  input: {schema: SummarizeInvestmentNewsInputSchema},
  output: {schema: SummarizeInvestmentNewsOutputSchema},
  prompt: \`You are an AI assistant helping a newsletter editor summarize Moroccan market news for their weekly newsletter.

  Please provide a concise and informative summary of the following news articles:

  {{~#each articles}}
  Source: {{this.source}}
  Title: {{this.title}}
  Content: {{this.content}}
  ---
  {{~/each}}
  \`,
});

const summarizeInvestmentNewsFlow = ai.defineFlow(
  {
    name: 'summarizeInvestmentNewsFlow',
    inputSchema: SummarizeInvestmentNewsInputSchema,
    outputSchema: SummarizeInvestmentNewsOutputSchema,
  },
  async input => {
    const {output} = await summarizeNewsPrompt(input);
    return output!;
  }
);
`,
  "src/ai/flows/retirement-planner.ts": `'use server';

/**
 * @fileOverview Simulates retirement savings plan.
 *
 * - planRetirement - A function that simulates retirement savings.
 * - RetirementPlannerInput - The input type for the planRetirement function.
 * - RetirementPlannerOutput - The return type for the planRetirement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RetirementPlannerInputSchema = z.object({
  currentAge: z.number().int().min(18).describe('Your current age.'),
  retirementAge: z.number().int().min(40).describe('The age at which you plan to retire.'),
  initialSavings: z.number().describe('Your current retirement savings.'),
  monthlyContribution: z.number().describe('The amount you contribute to savings each month.'),
  annualReturnRate: z.number().describe('The estimated annual return on your investments as a percentage.'),
});
export type RetirementPlannerInput = z.infer<typeof RetirementPlannerInputSchema>;

const YearDataSchema = z.object({
  year: z.number(),
  value: z.number(),
});

const RetirementPlannerOutputSchema = z.object({
  finalSavings: z.number().describe('The total estimated savings at retirement age.'),
  totalContributions: z.number().describe('The total amount of your own money contributed.'),
  totalInterest: z.number().describe('The total interest earned over the period.'),
  yearlyBreakdown: z.array(YearDataSchema).describe('A yearly breakdown of the savings growth.'),
  analysis: z.string().describe('An analysis of the retirement plan.'),
  recommendation: z.string().describe('A recommendation to improve the plan.')
});
export type RetirementPlannerOutput = z.infer<typeof RetirementPlannerOutputSchema>;

export async function planRetirement(input: RetirementPlannerInput): Promise<RetirementPlannerOutput> {
  return retirementPlannerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'retirementPlannerPrompt',
  input: {schema: RetirementPlannerInputSchema},
  output: {schema: RetirementPlannerOutputSchema},
  prompt: \`You are a Moroccan financial advisor specializing in retirement planning.

Your task is to create a retirement savings projection and provide analysis.

Input Data:
- Current Age: {{{currentAge}}}
- Retirement Age: {{{retirementAge}}}
- Initial Savings: {{{initialSavings}}} MAD
- Monthly Contribution: {{{monthlyContribution}}} MAD
- Annual Return Rate: {{{annualReturnRate}}}%

Calculations:
1.  Calculate the final savings value at retirement using compound interest.
2.  Provide a year-by-year breakdown of the savings growth. The breakdown should start from the current year.
3.  Calculate total contributions and total interest earned.
4.  Provide a concise analysis of the projection.
5.  Offer a clear, actionable recommendation for the user.

Output in JSON format, including the 'yearlyBreakdown' array.
\`,
});

const retirementPlannerFlow = ai.defineFlow(
  {
    name: 'retirementPlannerFlow',
    inputSchema: RetirementPlannerInputSchema,
    outputSchema: RetirementPlannerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
`,
  "src/ai/genkit.ts": `import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
`,
  "src/app/(main)/articles/page.tsx": `import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const articles: Article[] = [
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

export default function ArticlesPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Aperçus et Analyses du Marché</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Restez informé grâce à nos analyses d'experts sur le marché boursier marocain, les actions individuelles et les secteurs clés.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link href="#" key={article.id} className="group">
            <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="p-0">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    data-ai-hint={article.imageHint}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-2">{article.category}</Badge>
                <h2 className="font-headline text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-4">{article.excerpt}</p>
                <div className="text-xs text-muted-foreground">
                  Par {article.author} le {new Date(article.date).toLocaleDateString('fr-FR')}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
`,
  "src/app/(main)/courses/formation-bourse-casablanca/course-curriculum.tsx": `"use client";

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
              <AccordionItem value={\`item-\${index}\`} key={index}>
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
`,
  "src/app/(main)/courses/formation-bourse-casablanca/page.tsx": `import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, BarChart, Target, Gift, Check } from "lucide-react";
import { CourseCurriculum } from "./course-curriculum";

const courseImage = PlaceHolderImages.find(p => p.id === 'course-casablanca-bourse');

const highlights = [
  { icon: BookOpen, text: "+12 heures de vidéo à la demande" },
  { icon: BarChart, text: "+20 études de cas 100% marocaines" },
  { icon: Target, text: "Fichiers Excel et templates fournis" },
  { icon: Gift, text: "Accès à un groupe privé et des lives mensuels" },
];

export default function FormationBourseCasablancaPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative bg-card text-card-foreground py-16 md:py-24">
         <div className="absolute inset-0 bg-black/20" />
         {courseImage && (
             <Image
                src={courseImage.imageUrl}
                alt="Formation Bourse de Casablanca"
                data-ai-hint={courseImage.imageHint}
                fill
                className="object-cover opacity-20"
                priority
            />
         )}
        <div className="container relative z-10 text-center">
          <Badge variant="secondary">Formation Vidéo Complète</Badge>
          <h1 className="font-headline text-4xl md:text-6xl font-bold mt-4 max-w-4xl mx-auto">
            De Zéro à Héros : La Formation Complète sur la Bourse de Casablanca
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
            Maîtrisez l'investissement à la Bourse de Casablanca, même en partant de zéro. Une méthode pas à pas avec des cas pratiques 100% marocains.
          </p>
          <div className="mt-8">
            <CourseCurriculum />
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {highlights.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <item.icon className="h-10 w-10 text-primary mb-3" />
                <p className="font-semibold">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course For Who Section */}
      <section className="py-16 bg-card">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold">À qui s'adresse cette formation ?</h2>
            <p className="mt-4 text-muted-foreground">
              Que vous soyez un débutant absolu ou un investisseur cherchant à se perfectionner sur le marché marocain, cette formation est faite pour vous.
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start">
                <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                <span><strong>Les débutants</strong> qui veulent investir leur premier dirham en bourse de manière intelligente.</span>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                <span><strong>Les investisseurs intermédiaires</strong> qui souhaitent professionnaliser leur approche sur le marché marocain.</span>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                <span>Ceux qui en ont marre de suivre des conseils génériques et veulent une <strong>analyse 100% adaptée au Maroc.</strong></span>
              </li>
               <li className="flex items-start">
                <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                <span>Les <strong>futurs retraités</strong> qui veulent construire un portefeuille de dividendes solide.</span>
              </li>
            </ul>
          </div>
          <div>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Ce que vous saurez faire après la formation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p>✅ Analyser n'importe quelle action marocaine de A à Z.</p>
                    <p>✅ Lire et comprendre les rapports financiers des entreprises cotées.</p>
                    <p>✅ Construire et gérer un portefeuille diversifié et performant.</p>
                    <p>✅ Utiliser les plateformes de courtage marocaines sans stress.</p>
                    <p>✅ Éviter les erreurs coûteuses spécifiques au marché marocain.</p>
                </CardContent>
            </Card>
          </div>
        </div>
      </section>

        {/* CTA Final */}
       <section className="py-20 text-center">
        <div className="container">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Prêt à Devenir un Investisseur Averti ?</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Ne laissez pas la complexité du marché vous intimider. Rejoignez la formation et prenez le contrôle de votre avenir financier.
          </p>
          <div className="mt-8">
             <CourseCurriculum />
          </div>
        </div>
      </section>
    </div>
  );
}
`,
  "src/app/(main)/courses/formation-excel-power-bi/course-curriculum.tsx": `"use client";

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
          Voir le Programme & le Prix
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
              <AccordionItem value={\`item-\${index}\`} key={index}>
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
`,
  "src/app/(main)/courses/formation-excel-power-bi/page.tsx": `import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, BarChart, Users, Award, Check } from "lucide-react";
import { CourseCurriculum } from "./course-curriculum";

const courseImage = PlaceHolderImages.find(p => p.id === 'course-excel-power-bi');

const highlights = [
  { icon: Database, text: "Maîtrise de Power Query & Power BI" },
  { icon: BarChart, text: "Création de dashboards financiers" },
  { icon: Award, text: "Coaching carrière 1-to-1 inclus" },
  { icon: Users, text: "Compétence très demandée" },
];

const targetAudience = [
    "Professionnels (RH, compta, finance) souhaitant se former à l’analyse de données.",
    "Étudiants et jeunes diplômés voulant acquérir une compétence clé.",
    "Freelances et entrepreneurs désirant automatiser leurs analyses.",
    "Contrôleurs de gestion et analystes financiers débutants.",
]

export default function FormationExcelPowerBiPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative bg-card text-card-foreground py-16 md:py-24">
         <div className="absolute inset-0 bg-black/20" />
         {courseImage && (
             <Image
                src={courseImage.imageUrl}
                alt="Formation Excel, Power Query & Power BI"
                data-ai-hint={courseImage.imageHint}
                fill
                className="object-cover opacity-20"
                priority
            />
         )}
        <div className="container relative z-10 text-center">
          <Badge variant="secondary">Formation Carrière</Badge>
          <h1 className="font-headline text-4xl md:text-6xl font-bold mt-4 max-w-4xl mx-auto">
            Excel, Power Query & Power BI pour la Finance
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
            Acquérez la compétence technique la plus demandée en finance et analyse de données, et bénéficiez d'un coaching pour booster votre carrière.
          </p>
          <div className="mt-8">
            <CourseCurriculum />
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {highlights.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <item.icon className="h-10 w-10 text-primary mb-3" />
                <p className="font-semibold">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course For Who Section */}
      <section className="py-16 bg-card">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold">À qui s'adresse cette formation ?</h2>
            <p className="mt-4 text-muted-foreground">
              Cette formation est conçue pour toute personne souhaitant transformer des données brutes en décisions stratégiques.
            </p>
            <ul className="mt-6 space-y-4">
              {targetAudience.map((target, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                  <span>{target}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Ce que vous saurez faire après la formation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p>✅ Nettoyer et transformer n'importe quel volume de données avec Power Query.</p>
                    <p>✅ Créer des modèles de données robustes et des calculs avec DAX.</p>
                    <p>✅ Concevoir des tableaux de bord financiers interactifs et percutants sur Power BI.</p>
                    <p>✅ Automatiser vos reportings pour gagner un temps précieux.</p>
                    <p>✅ Présenter vos analyses de manière claire et professionnelle.</p>
                </CardContent>
            </Card>
          </div>
        </div>
      </section>

        {/* CTA Final */}
       <section className="py-20 text-center">
        <div className="container">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Prêt à Devenir un Expert de la Donnée Financière ?</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Ne laissez pas passer l'opportunité d'acquérir une compétence qui transformera votre profil professionnel.
          </p>
          <div className="mt-8">
             <CourseCurriculum />
          </div>
        </div>
      </section>
    </div>
  );
}
`,
  "src/app/(main)/courses/page.tsx": `import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, BarChart, Star } from "lucide-react";
import type { Course } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const courses: Course[] = [
  {
    id: "3",
    title: "De Zéro à Héros : La Formation Complète sur la Bourse de Casablanca",
    description: "Une formation exhaustive de +12 heures avec des cas pratiques 100% marocains pour maîtriser la Bourse de Casablanca, de l'analyse fondamentale à la construction de portefeuille.",
    level: "Tous Niveaux",
    duration: "12-15 Heures",
    imageUrl: PlaceHolderImages.find(p => p.id === 'course-casablanca-bourse')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'course-casablanca-bourse')?.imageHint || '',
    href: "/courses/formation-bourse-casablanca"
  },
  {
    id: "4",
    title: "Excel & Power BI pour la Finance : de Débutant à Avancé",
    description: "Maîtrisez Excel, Power Query et Power BI pour l'analyse de données financières. Une compétence très demandée, incluant un coaching carrière.",
    level: "Tous Niveaux",
    duration: "16 Heures",
    imageUrl: PlaceHolderImages.find(p => p.id === 'course-excel-power-bi')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'course-excel-power-bi')?.imageHint || '',
    href: "/courses/formation-excel-power-bi"
  },
  {
    id: "1",
    title: "Comment Investir Votre Premier Salaire",
    description: "Un guide pour débutants pour commencer votre parcours d'investissement au Maroc. Apprenez les bases des actions, des obligations et de la création d'un portefeuille équilibré.",
    level: "Débutant",
    duration: "4 Semaines",
    imageUrl: PlaceHolderImages.find(p => p.id === 'course-1')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'course-1')?.imageHint || '',
    href: "#"
  },
];

export default function CoursesPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Investissez avec Confiance</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Nos cours sont conçus pour vous doter des connaissances et des compétences nécessaires pour naviguer avec succès dans le paysage de l'investissement marocain.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {(course.id === "3" || course.id === "4") && (
                <Badge className="absolute top-4 right-4 flex items-center gap-1 z-10 bg-yellow-400 text-yellow-900">
                    <Star className="h-4 w-4" /> NOUVEAU
                </Badge>
            )}
            <CardHeader className="p-0">
                <Link href={course.href} className="block aspect-video overflow-hidden group">
                    <Image
                        src={course.imageUrl}
                        alt={course.title}
                        data-ai-hint={course.imageHint}
                        width={600}
                        height={400}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>
            </CardHeader>
            <CardContent className="p-6 flex flex-col flex-1">
                <CardTitle className="font-headline text-2xl mb-2">{course.title}</CardTitle>
                <CardDescription className="mb-4 flex-1">{course.description}</CardDescription>
                <div className="flex justify-between text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                        <BarChart className="h-4 w-4" />
                        <span>{course.level}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                    </div>
                </div>
                <Button asChild className="w-full font-bold mt-auto">
                    <Link href={course.href}>En Savoir Plus</Link>
                </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
`,
  "src/app/(main)/layout.tsx": `import { Header } from "@/app/components/layout/header";
import { Footer } from "@/app/components/layout/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
`,
  "src/app/(main)/news-summarizer/page.tsx": `import SummarizerForm from "./summarizer-form";

export default function NewsSummarizerPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Résumé d'Actualités par IA</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Générez des résumés concis des actualités du marché marocain. Parfait pour créer le contenu de votre newsletter hebdomadaire.
        </p>
      </div>
      <SummarizerForm />
    </div>
  );
}
`,
  "src/app/(main)/news-summarizer/summarizer-form.tsx": `"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { summarizeInvestmentNews } from "@/ai/flows/investment-news-summarizer";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, PlusCircle, Trash2, Sparkles } from "lucide-react";

const articleSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  content: z.string().min(1, "Le contenu est requis"),
  source: z.string().min(1, "La source est requise"),
});

const formSchema = z.object({
  articles: z.array(articleSchema).min(1, "Veuillez ajouter au moins un article."),
});

type FormValues = z.infer<typeof formSchema>;

export default function SummarizerForm() {
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      articles: [{ title: "", content: "", source: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "articles",
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setSummary(null);
    setError(null);
    try {
      const response = await summarizeInvestmentNews(values);
      setSummary(response.summary);
    } catch (e) {
      setError("Une erreur est survenue lors de la génération du résumé. Veuillez réessayer.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Articles de Presse</CardTitle>
          <CardDescription>Ajoutez un ou plusieurs articles à résumer.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-6">
                {fields.map((field, index) => (
                  <Card key={field.id} className="p-4 relative">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name={\`articles.\${index}.source\`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Source</FormLabel>
                            <FormControl>
                              <Input placeholder="ex: Le Matin" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={\`articles.\${index}.title\`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Titre</FormLabel>
                            <FormControl>
                              <Input placeholder="Titre de l'article" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={\`articles.\${index}.content\`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contenu</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Collez le contenu de l'article ici..." {...field} rows={5} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {fields.length > 1 && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                            onClick={() => remove(index)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                  </Card>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <Button type="button" variant="outline" onClick={() => append({ title: "", content: "", source: "" })}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Ajouter un Article
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Résumer
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Sparkles className="text-accent" />
            Résumé Généré par IA
          </CardTitle>
          <CardDescription>Votre résumé concis prêt pour la newsletter apparaîtra ici.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {error && <p className="text-destructive">{error}</p>}
          {summary && (
            <div className="prose prose-sm dark:prose-invert max-w-none">
                <p>{summary}</p>
            </div>
          )}
          {!summary && !loading && (
            <div className="text-center text-muted-foreground h-48 flex items-center justify-center">
              <p>Votre résumé sera généré ici.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
`,
  "src/app/(main)/page.tsx": `import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Newspaper, Wrench, GraduationCap, Crown } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Input } from "@/components/ui/input";

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
const featureImages = {
  articles: PlaceHolderImages.find(p => p.id === 'feature-articles'),
  tools: PlaceHolderImages.find(p => p.id === 'feature-tools'),
  courses: PlaceHolderImages.find(p => p.id === 'feature-courses'),
}
const privateCommunityImage = PlaceHolderImages.find(p => p.id === 'private-community');

const features = [
  {
    icon: <Newspaper className="h-8 w-8 text-primary" />,
    title: "Articles Approfondis",
    description: "Explorez l'analyse d'experts du marché boursier marocain, les tendances sectorielles et la performance de l'indice MASI.",
    link: "/articles",
    image: featureImages.articles,
  },
  {
    icon: <Wrench className="h-8 w-8 text-primary" />,
    title: "Simulateurs Puissants",
    description: "Comparez les banques, les courtiers et simulez l'impact des frais sur vos investissements avec nos outils alimentés par l'IA.",
    link: "/tools",
    image: featureImages.tools,
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: "Cours d'Investissement",
    description: "De votre premier salaire aux stratégies avancées, nos cours vous permettent d'investir avec confiance.",
    link: "/courses",
    image: featureImages.courses,
  },
];

export default function Home() {
  return (
    <>
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-headline text-4xl font-bold md:text-6xl lg:text-7xl drop-shadow-md">
              Débloquez le Potentiel du Marché Marocain
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-lg text-primary-foreground/90 md:text-xl">
              Votre source d'analyses d'experts, d'outils puissants et de ressources pédagogiques pour investir au Maroc.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="font-bold">
                <Link href="/articles">Explorer les Analyses <ArrowRight className="ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="font-bold">
                <Link href="/tools">Utiliser les Outils</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">L'Intelligence pour Chaque Investisseur</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Que vous soyez débutant ou professionnel chevronné, The Moroccan Community vous apporte la clarté dont vous avez besoin pour naviguer sur le marché marocain.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <CardHeader className="p-0">
                  {feature.image && (
                     <div className="aspect-video overflow-hidden">
                        <Image
                            src={feature.image.imageUrl}
                            alt={feature.title}
                            data-ai-hint={feature.image.imageHint}
                            width={600}
                            height={400}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                     </div>
                  )}
                </CardHeader>
                <CardContent className="p-6">
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                    <CardDescription className="mt-2">{feature.description}</CardDescription>
                    <Button asChild variant="link" className="px-0 mt-4 font-bold">
                        <Link href={feature.link}>Découvrir <ArrowRight className="ml-2" /></Link>
                    </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="relative rounded-lg overflow-hidden p-8 md:p-12 text-center text-white bg-card">
              {privateCommunityImage && (
                <Image
                  src={privateCommunityImage.imageUrl}
                  alt={privateCommunityImage.description}
                  data-ai-hint={privateCommunityImage.imageHint}
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-primary/80" />
              <div className="relative z-10 max-w-2xl mx-auto">
                  <div className="mb-4">
                      <Crown className="h-12 w-12 mx-auto text-yellow-300" />
                  </div>
                  <h2 className="font-headline text-3xl font-bold md:text-4xl text-primary-foreground">
                      Rejoignez notre Communauté Privée
                  </h2>
                  <p className="mt-4 text-lg text-primary-foreground/90">
                      Accédez à du contenu exclusif, des analyses approfondies et interagissez directement avec nous en devenant membre payant sur YouTube.
                  </p>
                  <Button asChild size="lg" className="mt-8 font-bold bg-background text-foreground hover:bg-background/90">
                      <a href="https://www.youtube.com/channel/UCK6m2fe2txUxNFxpn65rURg/join" target="_blank" rel="noopener noreferrer">
                          Devenir Membre
                      </a>
                  </Button>
              </div>
          </div>
        </div>
      </section>

      <section className="bg-card py-16 md:py-24">
        <div className="container grid md:grid-cols-2 gap-8 items-center">
            <div>
                <h2 className="font-headline text-3xl font-bold md:text-4xl">Restez à l'Avant-Garde du Marché</h2>
                <p className="mt-4 text-muted-foreground md:text-lg">
                    Abonnez-vous à notre newsletter hebdomadaire gratuite pour recevoir les dernières actualités du marché, des analyses et des offres exclusives.
                </p>
            </div>
            <form className="flex w-full max-w-md items-center space-x-2 mx-auto">
              <Input type="email" placeholder="Votre meilleure adresse e-mail" className="flex-1 py-6" />
              <Button type="submit" size="lg">S'abonner</Button>
            </form>
        </div>
      </section>
    </>
  );
}
`,
  "src/app/(main)/resources/page.tsx": `import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download } from "lucide-react";
import type { Resource } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const resources: Resource[] = [
  {
    id: "1",
    title: "Simulateur de Frais de Courtage et Commissions",
    description: "Un simulateur Excel avancé pour calculer les coûts d'entrée et de sortie pour chaque courtier bancaire marocain. Planifiez vos transactions avec précision.",
    price: "199 MAD",
    href: "#",
    imageUrl: PlaceHolderImages.find(p => p.id === 'resource-1')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'resource-1')?.imageHint || '',
  },
  {
    id: "2",
    title: "La Liste Comparative Ultime des Courtiers",
    description: "Un PDF complet comparant tous les courtiers bancaires marocains sur les commissions, les frais, les taxes et les fonctionnalités de la plateforme. Faites un choix éclairé.",
    price: "99 MAD",
    href: "#",
    imageUrl: PlaceHolderImages.find(p => p.id === 'resource-2')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'resource-2')?.imageHint || '',
  },
];

export default function ResourcesPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Outils et Ressources Numériques</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Accélérez votre analyse et votre prise de décision avec nos produits numériques téléchargeables.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
        {resources.map((resource) => (
          <Card key={resource.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
             <CardHeader className="p-0">
                <div className="aspect-video overflow-hidden">
                    <Image
                        src={resource.imageUrl}
                        alt={resource.title}
                        data-ai-hint={resource.imageHint}
                        width={600}
                        height={400}
                        className="object-cover"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-6 flex flex-col flex-1">
              <CardTitle className="font-headline text-2xl mb-2">{resource.title}</CardTitle>
              <CardDescription className="mb-4 flex-1">{resource.description}</CardDescription>
              <div className="flex justify-between items-center mt-4">
                <span className="text-2xl font-bold font-headline text-primary">{resource.price}</span>
                <Button asChild className="font-bold">
                  <Link href={resource.href}>
                    Obtenir <Download className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
`,
  "src/app/(main)/tools/bank-comparator.tsx": `import type { Bank } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Landmark } from "lucide-react";

const banks: Bank[] = [
    { name: "Attijariwafa Bank", fees: "Standard", accessibility: "Excellente", logo: <Landmark className="text-yellow-500" /> },
    { name: "BMCE Bank of Africa", fees: "Compétitifs", accessibility: "Bonne", logo: <Landmark className="text-blue-600" /> },
    { name: "Banque Populaire", fees: "Bas", accessibility: "Très Bonne", logo: <Landmark className="text-purple-600" /> },
    { name: "CIH Bank", fees: "Très Bas (Digital)", accessibility: "Excellente (Digitale)", logo: <Landmark className="text-pink-500" /> },
    { name: "Société Générale Maroc", fees: "Élevés", accessibility: "Bonne", logo: <Landmark className="text-red-600" /> },
];

export function BankComparator() {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline">Comparateur de Comptes Courants</CardTitle>
        <CardDescription>Comparez les banques marocaines pour les comptes courants en fonction des frais et de l'accessibilité.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Banque</TableHead>
              <TableHead>Frais Annuels</TableHead>
              <TableHead>Accessibilité (Agence & Digitale)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banks.map((bank) => (
              <TableRow key={bank.name}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 flex items-center justify-center">{bank.logo}</div>
                    <span>{bank.name}</span>
                  </div>
                </TableCell>
                <TableCell>{bank.fees}</TableCell>
                <TableCell>{bank.accessibility}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
`,
  "src/app/(main)/tools/bank-comparator/page.tsx": `import { BankComparator } from "../bank-comparator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export default function BankComparatorPage() {
  return (
    <div className="container py-12 md:py-16">
       <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Comparateur de Banques</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
            Prenez des décisions basées sur les données. Comparez les produits financiers et simulez l'impact des frais sur vos investissements.
        </p>
      </div>
      <BankComparator />
      <Card className="max-w-4xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            Guide d'Utilisation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <p>Ce comparateur vous aide à choisir une banque pour vos opérations courantes au Maroc. Voici comment l'interpréter :</p>
            <ul className="list-disc pl-6 space-y-2">
                <li><strong>Frais Annuels :</strong> Indique le niveau général des frais pour la tenue de compte et les services de base. "Standard", "Compétitifs", et "Bas" vous donnent une idée relative des coûts. Les banques digitales comme CIH ont souvent les frais les plus bas.</li>
                <li><strong>Accessibilité :</strong> Évalue la facilité d'accès aux services, que ce soit via un large réseau d'agences physiques ou des plateformes digitales performantes.</li>
            </ul>
            <p><strong>Commentaire :</strong> Pour une utilisation principalement digitale avec des frais minimaux, <strong>CIH Bank</strong> est souvent un excellent choix. Pour un service complet avec un grand réseau d'agences, <strong>Attijariwafa Bank</strong> et <strong>Banque Populaire</strong> sont des options solides, bien que leurs frais puissent être plus élevés.</p>
        </CardContent>
      </Card>
    </div>
  );
}
`,
  "src/app/(main)/tools/brokerage-comparator.tsx": `import type { Brokerage } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Landmark } from "lucide-react";

const brokerages: Brokerage[] = [
    { name: "Attijariwafa Trade", fees: "0.45% par transaction", platform: "Bonne", responsiveness: "Moyenne", logo: <Landmark className="text-yellow-500" /> },
    { name: "BMCE Capital Bourse", fees: "0.40% par transaction", platform: "Excellente", responsiveness: "Bonne", logo: <Landmark className="text-blue-600" /> },
    { name: "BP Bourse", fees: "0.50% par transaction", platform: "Basique", responsiveness: "Bonne", logo: <Landmark className="text-purple-600" /> },
    { name: "CIH Trade", fees: "0.35% (Variable)", platform: "Moderne", responsiveness: "Bonne (Digitale)", logo: <Landmark className="text-pink-500" /> },
    { name: "SG Maroc Bourse", fees: "0.55% par transaction", platform: "Bonne", responsiveness: "Moyenne", logo: <Landmark className="text-red-600" /> },
];

export function BrokerageComparator() {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline">Comparateur de Comptes de Courtage</CardTitle>
        <CardDescription>Comparez les courtiers marocains en fonction des frais, de la plateforme de trading et de la réactivité du service.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Courtier</TableHead>
              <TableHead>Frais & Commissions</TableHead>
              <TableHead>Plateforme de Trading</TableHead>
              <TableHead>Réactivité</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brokerages.map((brokerage) => (
              <TableRow key={brokerage.name}>
                <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                    <div className="h-6 w-6 flex items-center justify-center">{brokerage.logo}</div>
                    <span>{brokerage.name}</span>
                  </div>
                </TableCell>
                <TableCell>{brokerage.fees}</TableCell>
                <TableCell>{brokerage.platform}</TableCell>
                <TableCell>{brokerage.responsiveness}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
`,
  "src/app/(main)/tools/brokerage-comparator/page.tsx": `import { BrokerageComparator } from "../brokerage-comparator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export default function BrokerageComparatorPage() {
  return (
    <div className="container py-12 md:py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="font-headline text-4xl font-bold md:text-5xl">Comparateur de Courtiers</h1>
            <p className="mt-4 text-muted-foreground md:text-lg">
                Prenez des décisions basées sur les données. Comparez les produits financiers et simulez l'impact des frais sur vos investissements.
            </p>
        </div>
      <BrokerageComparator />
       <Card className="max-w-4xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            Guide d'Utilisation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
            <p>Choisir le bon courtier est crucial pour minimiser les coûts et optimiser votre expérience de trading. Voici comment utiliser ce tableau :</p>
            <ul className="list-disc pl-6 space-y-2">
                <li><strong>Frais & Commissions :</strong> C'est le pourcentage prélevé sur chaque transaction (achat ou vente). Des frais plus bas signifient que vous conservez une plus grande partie de vos gains.</li>
                <li><strong>Plateforme de Trading :</strong> Évalue la qualité et les fonctionnalités de l'outil en ligne fourni par le courtier pour passer des ordres et suivre votre portefeuille. Une plateforme "Excellente" ou "Moderne" offre généralement une meilleure expérience utilisateur.</li>
                <li><strong>Réactivité :</strong> Indique la rapidité et l'efficacité du service client pour répondre à vos questions ou résoudre les problèmes.</li>
            </ul>
             <p><strong>Commentaire :</strong> Pour les investisseurs actifs qui privilégient une plateforme moderne et des frais compétitifs, <strong>BMCE Capital Bourse</strong> et <strong>CIH Trade</strong> sont des concurrents de premier plan. Les investisseurs moins fréquents pourraient trouver leur compte avec des courtiers comme <strong>BP Bourse</strong> malgré une plateforme plus basique.</p>
        </CardContent>
      </Card>
    </div>
  );
}
`,
  "src/app/(main)/tools/dividend-yield-calculator/page.tsx": `"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateDividendYield, type DividendYieldOutput } from "@/ai/flows/dividend-yield-calculator";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Info, HelpCircle, Percent, HandCoins, PiggyBank } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatCurrency } from "@/lib/utils";

const formSchema = z.object({
  stockPrice: z.coerce.number().min(0.01, "Le prix doit être positif"),
  annualDividendPerShare: z.coerce.number().min(0, "Le dividende ne peut être négatif"),
  investmentAmount: z.coerce.number().min(1, "Le montant doit être positif"),
});

type FormValues = z.infer<typeof formSchema>;

export default function DividendYieldCalculatorPage() {
  const [result, setResult] = useState<DividendYieldOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stockPrice: 250,
      annualDividendPerShare: 12,
      investmentAmount: 50000,
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await calculateDividendYield(values);
      setResult(response);
    } catch (e) {
      setError("Une erreur est survenue lors du calcul. Veuillez réessayer.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const chartData = result ? [
    { name: 'Investissement Initial', value: form.getValues('investmentAmount') },
    { name: 'Revenu Annuel Dividendes', value: result.annualDividendIncome },
  ] : [];

  const COLORS = ["hsl(var(--muted))", "hsl(var(--primary))"];

  const chartConfig = {
    investment: {
      label: "Investissement",
      color: "hsl(var(--muted))",
    },
    income: {
      label: "Revenu",
      color: "hsl(var(--primary))",
    },
  };

  return (
     <>
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Calculateur de Rendement des Dividendes</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Estimez le rendement de vos actions à dividendes et comprenez le revenu passif potentiel qu'elles peuvent générer.
        </p>
      </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Paramètres de Calcul</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="stockPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix de l'Action (MAD)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="250" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="annualDividendPerShare"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dividende Annuel par Action (MAD)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="investmentAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Montant de l'Investissement (MAD)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="50000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Calculer le Rendement'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Résultats du Calcul</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && <div className="flex justify-center items-center h-48"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
            {error && <p className="text-destructive">{error}</p>}
            {result && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <Card>
                        <CardHeader>
                            <Percent className="mx-auto h-8 w-8 text-primary mb-2" />
                            <CardTitle className="text-lg">Rendement du Dividende</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{result.dividendYield.toFixed(2)}%</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <HandCoins className="mx-auto h-8 w-8 text-primary mb-2" />
                            <CardTitle className="text-lg">Revenu Annuel Estimé</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{formatCurrency(result.annualDividendIncome)}</p>
                        </CardContent>
                    </Card>
                </div>
                 <Card>
                    <CardHeader>
                        <PiggyBank className="mx-auto h-8 w-8 text-primary mb-2" />
                        <CardTitle className="text-lg text-center">Actions Achetées</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-center">{Math.floor(result.numberOfShares)}</p>
                        <p className="text-xs text-muted-foreground text-center">Nombre approximatif d'actions que vous pouvez acheter.</p>
                    </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Composition du Revenu</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Tooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                          {chartData.map((entry, index) => (
                            <Cell key={\`cell-\${index}\`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle className="font-headline">Analyse par l'IA</AlertTitle>
                  <AlertDescription>{result.analysis}</AlertDescription>
                </Alert>
                <Alert variant="default">
                    <Info className="h-4 w-4" />
                    <AlertTitle className="font-headline">Recommandation</AlertTitle>
                    <AlertDescription>{result.recommendation}</AlertDescription>
                </Alert>
              </div>
            )}
            {!result && !loading && <div className="text-center text-muted-foreground h-48 flex items-center justify-center"><p>Vos résultats apparaîtront ici.</p></div>}
          </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline"><HelpCircle className="h-6 w-6 text-primary"/>Guide d'Utilisation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>Le rendement du dividende est un ratio financier simple qui vous indique le pourcentage de retour sur investissement que vous recevez sous forme de dividendes.</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Prix de l'Action :</strong> Le prix actuel d'une seule action de l'entreprise.</li>
                    <li><strong>Dividende Annuel par Action :</strong> Le total des dividendes versés par l'entreprise pour une action sur une année. Vous pouvez le trouver dans les rapports financiers ou sur les sites de cotation.</li>
                    <li><strong>Montant de l'Investissement :</strong> La somme totale que vous souhaitez investir dans cette action.</li>
                </ul>
                <p><strong>Analyse :</strong> Un rendement élevé peut être attractif, mais il peut aussi indiquer un risque plus élevé (par exemple, si le prix de l'action a chuté). Comparez toujours le rendement à celui d'entreprises similaires dans le même secteur. L'analyse de l'IA vous donne un contexte pour le marché marocain.</p>
            </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}
`,
  "src/app/(main)/tools/fee-simulator.tsx": `"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { feeSimulator, type FeeSimulatorOutput } from "@/ai/flows/fee-simulator-tool";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, TrendingUp, TrendingDown, Info, HelpCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatCurrency } from "@/lib/utils";

const formSchema = z.object({
  initialInvestment: z.coerce.number().min(1000, "Doit être d'au moins 1 000"),
  annualReturnRate: z.coerce.number().min(0).max(100),
  investmentPeriod: z.coerce.number().int().min(1, "Doit être d'au moins 1 an"),
  bankFees: z.coerce.number().min(0),
  commissionStructure: z.string().min(10, "Veuillez fournir quelques détails"),
});

type FormValues = z.infer<typeof formSchema>;

export default function FeeSimulator() {
  const [result, setResult] = useState<FeeSimulatorOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initialInvestment: 100000,
      annualReturnRate: 8,
      investmentPeriod: 10,
      bankFees: 500,
      commissionStructure: "0.5% sur chaque transaction (achat/vente), avec 2 transactions par an.",
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await feeSimulator(values);
      setResult(response);
    } catch (e) {
      setError("Une erreur est survenue lors de l'exécution de la simulation. Veuillez réessayer.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
  
  const chartData = result ? [
    { name: "Valeur de l'investissement", "Sans Frais": result.finalValueWithoutFees, "Avec Frais": result.finalValueWithFees },
  ] : [];

  const chartConfig = {
    "Sans Frais": {
      label: "Sans Frais",
      color: "hsl(var(--chart-2))",
    },
    "Avec Frais": {
      label: "Avec Frais",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <>
     <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Simulateur d'Impact des Frais</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
            Voyez comment les frais bancaires et les commissions affectent vos rendements d'investissement dans le temps.
        </p>
      </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Paramètres de Simulation</CardTitle>
          <CardDescription>
            Entrez les détails de votre investissement pour simuler l'impact des frais.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="initialInvestment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Investissement Initial (MAD)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="100000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="annualReturnRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Taux de Rendement Annuel (%)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="8" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="investmentPeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Période d'Investissement (Années)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bankFees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frais Bancaires Annuels (MAD)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="commissionStructure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Structure des Commissions</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: 0.5% par transaction" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Calculer l'Impact
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="font-headline">Résultats de la Simulation</CardTitle>
            <CardDescription>L'impact calculé des frais sur votre investissement.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading && (
                <div className="flex justify-center items-center h-48">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            )}
            {error && <p className="text-destructive">{error}</p>}
            {result && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Valeur Finale (Sans Frais)</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(result.finalValueWithoutFees)}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Valeur Finale (Avec Frais)</CardTitle>
                            <TrendingDown className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(result.finalValueWithFees)}</div>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader className="pb-2">
                         <CardTitle className="text-lg font-medium">Total des Frais Payés</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-destructive">{formatCurrency(result.totalFeesPaid)}</p>
                        <p className="text-xs text-muted-foreground">Cela représente {result.feeImpactPercentage.toFixed(2)}% de votre valeur potentielle finale.</p>
                    </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Analyse Visuelle</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[200px] w-full">
                      <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                        <YAxis tickFormatter={(value) => formatCurrency(value as number).replace('MAD', '').trim()} />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="Sans Frais" fill="var(--color-Sans Frais)" radius={4} />
                        <Bar dataKey="Avec Frais" fill="var(--color-Avec Frais)" radius={4} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
                 <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle className="font-headline">Recommandation de l'IA</AlertTitle>
                    <AlertDescription>{result.recommendation}</AlertDescription>
                </Alert>
              </div>
            )}
            {!result && !loading && (
                 <div className="text-center text-muted-foreground h-48 flex items-center justify-center">
                    <p>Entrez les détails de votre investissement pour voir les résultats de la simulation ici.</p>
                 </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <HelpCircle className="h-6 w-6 text-primary" />
              Guide d'Utilisation du Simulateur
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>Cet outil, alimenté par l'IA, est conçu pour vous montrer l'impact réel des frais sur le long terme.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Investissement Initial :</strong> La somme que vous investissez au départ.</li>
              <li><strong>Taux de Rendement Annuel (%) :</strong> Votre gain annuel estimé avant déduction des frais. Soyez réaliste ; un rendement moyen de 8 à 10 % est une attente commune pour les marchés actions.</li>
              <li><strong>Période d'Investissement (Années) :</strong> La durée pendant laquelle vous prévoyez de laisser votre argent investi. L'impact des frais est plus visible sur de longues périodes.</li>
              <li><strong>Frais Bancaires Annuels :</strong> Ce sont les frais fixes, comme les droits de garde, que votre banque prélève chaque année.</li>
              <li><strong>Structure des Commissions :</strong> Décrivez ici les frais variables, comme les commissions sur les transactions (achat/vente). Soyez aussi précis que possible. L'IA utilisera cette information pour estimer les coûts.</li>
            </ul>
            <p><strong>Analyse des Résultats :</strong> Le graphique et les chiffres clés vous montrent la différence entre ce que vous auriez pu gagner (valeur sans frais) et ce qu'il vous reste réellement (valeur avec frais). La "Recommandation de l'IA" vous donne une interprétation de ces résultats pour vous aider à décider si la structure de frais est acceptable.</p>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}
`,
  "src/app/(main)/tools/fee-simulator/page.tsx": `import FeeSimulator from "../fee-simulator";

export default function FeeSimulatorPage() {
  return (
    <div className="container py-12 md:py-16">
      <FeeSimulator />
    </div>
  );
}
`,
  "src/app/(main)/tools/page.tsx": `import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calculator, Landmark, Briefcase, Percent, ShieldCheck } from "lucide-react";

const simulators = [
  {
    href: "/tools/fee-simulator",
    icon: <Calculator className="h-8 w-8 text-primary" />,
    title: "Simulateur d'Impact des Frais",
    description: "Analysez l'impact des frais bancaires et des commissions sur vos rendements.",
  },
  {
    href: "/tools/dividend-yield-calculator",
    icon: <Percent className="h-8 w-8 text-primary" />,
    title: "Calculateur de Rendement des Dividendes",
    description: "Calculez le rendement de vos investissements en dividendes.",
  },
  {
    href: "/tools/retirement-planner",
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Planificateur de Retraite",
    description: "Simulez votre épargne retraite pour atteindre vos objectifs financiers.",
  },
  {
    href: "/tools/bank-comparator",
    icon: <Landmark className="h-8 w-8 text-primary" />,
    title: "Comparateur de Banques",
    description: "Comparez les frais et l'accessibilité des comptes courants au Maroc.",
  },
  {
    href: "/tools/brokerage-comparator",
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    title: "Comparateur de Courtiers",
    description: "Comparez les courtiers en bourse en fonction des frais et des services.",
  },
];

export default function ToolsPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Outils Financiers et Simulateurs</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Prenez des décisions basées sur les données. Explorez nos outils pour analyser, comparer et planifier vos investissements au Maroc.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {simulators.map((tool) => (
          <Link href={tool.href} key={tool.href}>
            <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                <CardHeader>
                    <div className="mb-4">{tool.icon}</div>
                    <CardTitle className="font-headline text-xl">{tool.title}</CardTitle>
                </CardHeader>
                <CardDescription className="px-6 pb-6 flex-grow">
                    {tool.description}
                </CardDescription>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
`,
  "src/app/(main)/tools/retirement-planner/page.tsx": `"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { planRetirement, type RetirementPlannerOutput } from "@/ai/flows/retirement-planner";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Info, HelpCircle, TrendingUp, PiggyBank, Target } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatCurrency } from "@/lib/utils";

const formSchema = z.object({
  currentAge: z.coerce.number().int().min(18, "L'âge doit être d'au moins 18 ans"),
  retirementAge: z.coerce.number().int().min(40, "L'âge de la retraite doit être d'au moins 40 ans"),
  initialSavings: z.coerce.number().min(0, "L'épargne ne peut être négative"),
  monthlyContribution: z.coerce.number().min(0, "La contribution doit être positive"),
  annualReturnRate: z.coerce.number().min(0).max(100),
});

type FormValues = z.infer<typeof formSchema>;

export default function RetirementPlannerPage() {
  const [result, setResult] = useState<RetirementPlannerOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentAge: 30,
      retirementAge: 65,
      initialSavings: 100000,
      monthlyContribution: 2000,
      annualReturnRate: 7,
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await planRetirement(values);
      setResult(response);
    } catch (e) {
      setError("Une erreur est survenue lors de la simulation. Veuillez réessayer.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
  
  const chartConfig = {
    value: {
      label: "Épargne Totale",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <>
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Planificateur de Retraite</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Visualisez la croissance de votre épargne retraite et déterminez si vous êtes sur la bonne voie pour atteindre vos objectifs financiers.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Vos Informations</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="currentAge" render={({ field }) => (
                        <FormItem><FormLabel>Âge Actuel</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="retirementAge" render={({ field }) => (
                        <FormItem><FormLabel>Âge de Retraite</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                <FormField control={form.control} name="initialSavings" render={({ field }) => (
                    <FormItem><FormLabel>Épargne Actuelle (MAD)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="monthlyContribution" render={({ field }) => (
                    <FormItem><FormLabel>Contribution Mensuelle (MAD)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="annualReturnRate" render={({ field }) => (
                    <FormItem><FormLabel>Taux de Rendement Annuel (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Planifier ma Retraite"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Projection de votre Retraite</CardTitle>
            </CardHeader>
            <CardContent>
              {loading && <div className="flex justify-center items-center h-96"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}
              {error && <p className="text-destructive">{error}</p>}
              {result && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 text-center">
                    <Card>
                        <CardHeader><Target className="mx-auto h-8 w-8 text-primary mb-2" /><CardTitle className="text-lg">Épargne à la Retraite</CardTitle></CardHeader>
                        <CardContent><p className="text-3xl font-bold">{formatCurrency(result.finalSavings)}</p></CardContent>
                    </Card>
                    <div className="grid grid-cols-2 gap-4">
                        <Card>
                            <CardHeader><PiggyBank className="mx-auto h-6 w-6 text-primary mb-1" /><CardTitle className="text-base">Total Contribué</CardTitle></CardHeader>
                            <CardContent><p className="text-xl font-bold">{formatCurrency(result.totalContributions)}</p></CardContent>
                        </Card>
                        <Card>
                            <CardHeader><TrendingUp className="mx-auto h-6 w-6 text-primary mb-1" /><CardTitle className="text-base">Total des Intérêts</CardTitle></CardHeader>
                            <CardContent><p className="text-xl font-bold">{formatCurrency(result.totalInterest)}</p></CardContent>
                        </Card>
                    </div>
                  </div>
                  
                  <Card>
                    <CardHeader><CardTitle>Croissance de l'Épargne</CardTitle></CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig} className="h-[250px] w-full">
                        <LineChart data={result.yearlyBreakdown} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis tickFormatter={(value) => \`\${(value / 1000000).toFixed(1)}M\`} />
                          <Tooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number)}/>} />
                          <Legend />
                          <Line type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={2} dot={false}/>
                        </LineChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Alert><Info className="h-4 w-4" /><AlertTitle className="font-headline">Analyse par l'IA</AlertTitle><AlertDescription>{result.analysis}</AlertDescription></Alert>
                  <Alert><Info className="h-4 w-4" /><AlertTitle className="font-headline">Recommandation</AlertTitle><AlertDescription>{result.recommendation}</AlertDescription></Alert>
                </div>
              )}
              {!result && !loading && <div className="text-center text-muted-foreground h-96 flex items-center justify-center"><p>Vos résultats de planification apparaîtront ici.</p></div>}
            </CardContent>
          </Card>
           <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 font-headline"><HelpCircle className="h-6 w-6 text-primary"/>Guide d'Utilisation</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
                <p>La magie de l'investissement pour la retraite réside dans les intérêts composés. Cet outil vous aide à visualiser cet effet.</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Âge Actuel & de Retraite :</strong> Définit votre horizon de temps d'investissement. Plus il est long, plus les intérêts composés sont puissants.</li>
                    <li><strong>Épargne Actuelle :</strong> Votre point de départ.</li>
                    <li><strong>Contribution Mensuelle :</strong> La régularité de vos cotisations est la clé de la croissance.</li>
                    <li><strong>Taux de Rendement Annuel (%) :</strong> Le moteur de votre croissance. Un portefeuille diversifié en actions peut historiquement viser 7-10% par an, mais ce rendement n'est pas garanti.</li>
                </ul>
                <p><strong>Analyse :</strong> Le graphique illustre comment votre épargne (ligne bleue) s'accélère avec le temps. La différence entre votre épargne finale et le total de vos contributions représente les gains générés par vos investissements. L'IA vous donnera des pistes pour savoir si votre plan est réaliste et comment l'améliorer.</p>
            </CardContent>
        </Card>
        </div>
      </div>
    </>
  );
}
`,
  "src/app/api/genkit/[...slug]/route.ts": `import { ai } from "@/ai/genkit";
import { nextJsApiHandler } from "@genkit-ai/next";

export const { GET, POST } = nextJsApiHandler({
    getGenkit: () => ai,
});
`,
  "src/app/components/layout/footer.tsx": `import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Scaling, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
                <Scaling className="h-6 w-6 text-primary" />
                <span className="font-headline text-lg font-bold">The Moroccan Community</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Votre source de premier plan pour l'analyse du marché marocain et l'intelligence d'investissement.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.youtube.com/@The_Moroccan_Analyst" target="_blank" rel="noopener noreferrer" aria-label="The Moroccan Analyst YouTube"><Youtube className="h-5 w-5" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.youtube.com/@TheMoroccanCFO" target="_blank" rel="noopener noreferrer" aria-label="The Moroccan CFO YouTube"><Youtube className="h-5 w-5" /></a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.instagram.com/the_moroccananalyst/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
              </Button>
            </div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-headline font-semibold">Abonnez-vous à notre newsletter hebdomadaire</h3>
            <p className="text-muted-foreground text-sm">
                Recevez chaque semaine des informations sur le marché, des offres promotionnelles et des mises à jour sur les nouveaux services directement dans votre boîte de réception.
            </p>
            <form className="flex w-full max-w-md items-center space-x-2">
              <Input type="email" placeholder="Entrez votre email" className="flex-1" />
              <Button type="submit" variant="default">
                S'abonner
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} The Moroccan Community. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
`,
  "src/app/components/layout/header.tsx": `"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Scaling } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/lib/types";

const navLinks: NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/articles", label: "Articles" },
  { href: "/tools", label: "Outils" },
  { href: "/courses", label: "Cours" },
  { href: "/resources", label: "Ressources" },
  { href: "/news-summarizer", label: "IA Actualités" },
];

export function Header() {
  const pathname = usePathname();

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn("flex items-center gap-4 lg:gap-6", className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === link.href ? "text-primary" : "text-muted-foreground"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <Scaling className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-bold">The Moroccan Community</span>
        </Link>

        <div className="hidden md:flex flex-1 items-center justify-center">
          <NavLinks />
        </div>

        <div className="flex flex-1 items-center justify-end gap-4 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Ouvrir le menu de navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/" className="mr-6 flex items-center gap-2 mb-6">
                <Scaling className="h-6 w-6 text-primary" />
                <span className="font-headline text-lg font-bold">The Moroccan Community</span>
              </Link>
              <NavLinks className="flex-col items-start space-y-4 text-lg" />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
`,
  "src/app/globals.css": `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 73 27% 92%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 67 72% 41%;
    --primary-foreground: 70 80% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 50 59% 50%;
    --accent-foreground: 240 10% 3.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 67 72% 41%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 73 10% 10%;
    --foreground: 0 0% 98%;
    --card: 73 10% 15%;
    --card-foreground: 0 0% 98%;
    --popover: 73 10% 10%;
    --popover-foreground: 0 0% 98%;
    --primary: 67 72% 41%;
    --primary-foreground: 70 80% 98%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 50 59% 50%;
    --accent-foreground: 240 10% 3.9%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 67 72% 41%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`,
  "src/app/layout.tsx": `import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Moroccan Community",
  description: "Débloquez le potentiel du marché marocain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
`,
  "src/components/ui/accordion.tsx": `"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
`,
  "src/components/ui/alert-dialog.tsx": `"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
`,
  "src/components/ui/alert.tsx": `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
`,
  "src/components/ui/avatar.tsx": `"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
`,
  "src/components/ui/badge.tsx": `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
`,
  "src/components/ui/button.tsx": `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
`,
  "src/components/ui/calendar.tsx": `"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
`,
  "src/components/ui/card.tsx": `import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
`,
  "src/components/ui/carousel.tsx": `"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
`,
  "src/components/ui/chart.tsx": `"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = \`chart-\${id || uniqueId.replace(/:/g, "")}\`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => \`
\${prefix} [data-chart=\${id}] {
\${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? \`  --color-\${key}: \${color};\` : null
  })
  .join("\\n")}
}
\`
          )
          .join("\\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = \`\${labelKey || item.dataKey || item.name || "value"}\`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = \`\${nameKey || item.name || item.dataKey || "value"}\`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean
      nameKey?: string
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    const { config } = useChart()

    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {payload.map((item) => {
          const key = \`\${nameKey || item.dataKey || "value"}\`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegend"

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
`,
  "src/components/ui/checkbox.tsx": `"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
`,
  "src/components/ui/collapsible.tsx": `"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
`,
  "src/components/ui/dialog.tsx": `"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
`,
  "src/components/ui/dropdown-menu.tsx": `"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
`,
  "src/components/ui/form.tsx": `"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: \`\${id}-form-item\`,
    formDescriptionId: \`\${id}-form-item-description\`,
    formMessageId: \`\${id}-form-item-message\`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? \`\${formDescriptionId}\`
          : \`\${formDescriptionId} \${formMessageId}\`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
`,
  "src/components/ui/input.tsx": `import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
`,
  "src/components/ui/label.tsx": `"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
`,
  "src/components/ui/menubar.tsx": `"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal {...props} />
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup {...props} />
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
      className
    )}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    )}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
MenubarShortcut.displayname = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
`,
  "src/components/ui/popover.tsx": `"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
`,
  "src/components/ui/progress.tsx": `"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: \`translateX(-\${100 - (value || 0)}%)\` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
`,
  "src/components/ui/radio-group.tsx": `"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
`,
  "src/components/ui/scroll-area.tsx": `"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
`,
  "src/components/ui/select.tsx": `"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
`,
  "src/components/ui/separator.tsx": `"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
`,
  "src/components/ui/sheet.tsx": `"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
`,
  "src/components/ui/sidebar.tsx": `"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile()
    const [openMobile, setOpenMobile] = React.useState(false)

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen)
    const open = openProp ?? _open
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value
        if (setOpenProp) {
          setOpenProp(openState)
        } else {
          _setOpen(openState)
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = \`\${SIDEBAR_COOKIE_NAME}=\${openState}; path=/; max-age=\${SIDEBAR_COOKIE_MAX_AGE}\`
      },
      [setOpenProp, open]
    )

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open)
    }, [isMobile, setOpen, setOpenMobile])

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault()
          toggleSidebar()
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar])

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed"

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      )
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
            side={side}
          >
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <div
        ref={ref}
        className="group peer hidden md:block text-sidebar-foreground"
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            "duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear",
            "group-data-[collapsible=offcanvas]:w-0",
            "group-data-[side=right]:rotate-180",
            variant === "floating" || variant === "inset"
              ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
          )}
        />
        <div
          className={cn(
            "duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex",
            side === "left"
              ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
              : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset"
              ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
            className
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
})
SidebarRail.displayName = "SidebarRail"

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className
      )}
      {...props}
    />
  )
})
SidebarInset.displayName = "SidebarInset"

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className
      )}
      {...props}
    />
  )
})
SidebarInput.displayName = "SidebarInput"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  )
})
SidebarSeparator.displayName = "SidebarSeparator"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
})
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupAction.displayName = "SidebarGroupAction"

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("w-full text-sm", className)}
    {...props}
  />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("group/menu-item relative", className)}
    {...props}
  />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const { isMobile, state } = useSidebar()

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    )

    if (!tooltip) {
      return button
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      }
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltip}
        />
      </Tooltip>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    showOnHover?: boolean
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuAction.displayName = "SidebarMenuAction"

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      "absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none",
      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props}
  />
))
SidebarMenuBadge.displayName = "SidebarMenuBadge"

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return \`\${Math.floor(Math.random() * 40) + 50}%\`
  }, [])

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("rounded-md h-8 flex gap-2 px-2 items-center", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 flex-1 max-w-[--skeleton-width]"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
})
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
      "group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props}
  />
))
SidebarMenuSub.displayName = "SidebarMenuSub"

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => <li ref={ref} {...props} />)
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean
    size?: "sm" | "md"
    isActive?: boolean
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
`,
  "src/components/ui/skeleton.tsx": `import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
`,
  "src/components/ui/slider.tsx": `"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
`,
  "src/components/ui/switch.tsx": `"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
`,
  "src/components/ui/table.tsx": `import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
`,
  "src/components/ui/tabs.tsx": `"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
`,
  "src/components/ui/textarea.tsx": `import * as React from 'react';

import {cn} from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({className, ...props}, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export {Textarea};
`,
  "src/components/ui/toast.tsx": `"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
`,
  "src/components/ui/toaster.tsx": `"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
`,
  "src/components/ui/tooltip.tsx": `"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
`,
  "src/hooks/use-mobile.tsx": `import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(\`(max-width: \${MOBILE_BREAKPOINT - 1}px)\`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
`,
  "src/hooks/use-toast.ts": `"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
`,
  "src/lib/placeholder-images.json": `{
  "placeholderImages": [
    {
      "id": "hero-background",
      "description": "Arrière-plan abstrait représentant la croissance financière et les données.",
      "imageUrl": "https://images.unsplash.com/photo-1762279389002-7b6abd7bd6c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMGZpbmFuY2V8ZW58MHx8fHwxNzY2NzA0OTczfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "abstract finance"
    },
    {
      "id": "article-1",
      "description": "Image for an article about MASI index analysis.",
      "imageUrl": "https://images.unsplash.com/photo-1649003515353-c58a239cf662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzdG9jayUyMGNoYXJ0fGVufDB8fHx8MTc2NjY5NjM1OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "stock chart"
    },
    {
      "id": "article-2",
      "description": "Image for an article about Moroccan banking sector.",
      "imageUrl": "https://images.unsplash.com/photo-1644093387522-b1be6de270a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxtb2Rlcm4lMjBiYW5rfGVufDB8fHx8MTc2NjcwNDk3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "modern bank"
    },
    {
      "id": "article-3",
      "description": "Image for an article about real estate investment in Morocco.",
      "imageUrl": "https://images.unsplash.com/photo-1643875402004-22631ef914aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjaXR5JTIwYXJjaGl0ZWN0dXJlfGVufDB8fHx8MTc2NjY3NDk3MHww&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "city architecture"
    },
    {
      "id": "course-1",
      "description": "Image for a course on how to invest your first salary.",
      "imageUrl": "https://images.unsplash.com/photo-1573496799515-eebbb63814f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHx5b3VuZyUyMHByb2Zlc3Npb25hbHxlbnwwfHx8fDE3NjY3MDQ5NzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "young professional"
    },
    {
      "id": "course-excel-power-bi",
      "description": "Image representing data analysis with spreadsheets and charts.",
      "imageUrl": "https://images.unsplash.com/photo-1611926653458-09294b3142bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxleGNlbCUyMGRhc2hib2FyZHxlbnwwfHx8fDE3MjE4MTg0OTN8MA&ixlib-rb-4.0.3&q=80&w=1080",
      "imageHint": "excel dashboard"
    },
    {
      "id": "resource-1",
      "description": "Image for a digital product, a fee simulator.",
      "imageUrl": "https://images.unsplash.com/photo-1716799323871-d82962608d7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxjYWxjdWxhdG9yJTIwbW9uZXl8ZW58MHx8fHwxNzY2NzA0OTczfDA&ixlib-rb-4.1.0&q=80&w=1080",
      "imageHint": "calculator money"
    },
    {
      "id": "resource-2",
      "description": "Image for a digital product, a comparison list.",
      "imageUrl": "https://images.unsplash.com/photo-1554224155-cfa08c2a758f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxjaGVja2xpc3QlMjBkb2N1bWVudHxlbnwwfHx8fDE3NjY3MDQ5NzN8MA&ixlib_rb-4.1.0&q=80&w=1080",
      "imageHint": "checklist document"
    },
    {
      "id": "feature-articles",
      "description": "Image for the articles feature card on the homepage.",
      "imageUrl": "https://images.unsplash.com/photo-1734080512636-2741e9e3a2bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxuZXdzcGFwZXIlMjByZWFkaW5nfGVufDB8fHx8fDE3NjY2NjE3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "newspaper reading"
    },
    {
      "id": "feature-tools",
      "description": "Image for the tools feature card on the homepage.",
      "imageUrl": "https://images.unsplash.com/photo-1581166418878-11f0dde922c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Z2VhcnMlMjB0b29sc3xlbnwwfHx8fDE3NjY3MDQ5NzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "gears tools"
    },
    {
      "id": "feature-courses",
      "description": "Image for the courses feature card on the homepage.",
      "imageUrl": "https://images.unsplash.com/photo-1610484826967-09c5720778c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZ3xlbnwwfHx8fDE3NjY2NzI0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "online learning"
    },
    {
      "id": "private-community",
      "description": "Image for the private community section.",
      "imageUrl": "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGJhY2tncm91bmR8ZW58MHx8fHwxNzY2NzEzMjQyfDA&ixlib-rb-4.1.0&q=80&w=1080",
      "imageHint": "abstract background"
    },
    {
      "id": "course-casablanca-bourse",
      "description": "Image for a course about Casablanca stock exchange.",
      "imageUrl": "https://images.unsplash.com/photo-1617294255092-2b6e15490a03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxDYXNhYmxhbmNhJTIwYnVpbGRpbmd8ZW58MHx8fHwxNzE4NzQ3ODU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "imageHint": "Casablanca building"
    }
  ]
}
`,
  "src/lib/placeholder-images.ts": `import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
`,
  "src/lib/types.ts": `import type { LucideIcon } from 'lucide-react';

export type NavLink = {
  href: string;
  label: string;
};

export interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  imageUrl: string;
  imageHint: string;
  author: string;
  date: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  duration: string;
  level: string;
  href: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  price: string;
  href: string;
}

export interface Bank {
  name: string;
  fees: string;
  accessibility: string;
  logo: React.ReactNode;
}

export interface Brokerage {
  name: string;
  fees: string;
  platform: string;
  responsiveness: string;
  logo: React.ReactNode;
}
`,
  "src/lib/utils.ts": `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
  }).format(amount);
}
`,
  "tailwind.config.ts": `import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        body: ['PT Sans', 'sans-serif'],
        headline: ['Poppins', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
`,
  "tsconfig.json": `{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`
};

// This is a simple React component that renders the file data.
// In a real scenario, you'd use this data to create files in your GitHub repo.
export default function GithubFileHelper() {
  const [copied, setCopied] = useState('');

  const handleCopy = (filePath: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(filePath);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', color: '#333' }}>
      <h1>Aide au transfert de fichiers vers GitHub</h1>
      <p style={{backgroundColor: '#ffebe6', border: '1px solid #ffcdd2', padding: '10px', borderRadius: '5px'}}>
        <strong>Instruction importante :</strong> Pour chaque fichier ci-dessous, utilisez le bouton "Créer un fichier" dans l'interface de GitHub. Copiez le chemin du fichier, puis copiez le contenu du fichier et collez-le. Répétez cette opération pour tous les fichiers.
      </p>

      {Object.entries(ALL_FILES).map(([path, content]) => (
        <div key={path} style={{ border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px', padding: '10px' }}>
          <h3 style={{ margin: '0 0 10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <input 
              type="text" 
              readOnly 
              value={path} 
              style={{ flexGrow: 1, marginRight: '10px', padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }} 
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <button 
              onClick={() => handleCopy(path, content)}
              style={{
                padding: '5px 10px',
                cursor: 'pointer',
                backgroundColor: copied === path ? '#4caf50' : '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '3px'
              }}
            >
              {copied === path ? 'Contenu copié !' : 'Copier le contenu'}
            </button>
          </h3>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '3px', maxHeight: '200px', overflowY: 'auto', whiteSpace: 'pre-wrap' }}>
            <code>{content}</code>
          </pre>
        </div>
      ))}
    </div>
  );
}
