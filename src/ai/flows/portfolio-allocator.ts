
'use server';

/**
 * @fileOverview Un agent IA qui crée une allocation de portefeuille personnalisée.
 *
 * - allocatePortfolio - Une fonction qui génère une allocation d'actifs.
 * - PortfolioAllocatorInput - Le type d'entrée pour la fonction.
 * - PortfolioAllocatorOutput - Le type de retour de la fonction.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const PortfolioAllocatorInputSchema = z.object({
  initialInvestment: z.number().describe("Le montant de l'investissement initial en MAD."),
  monthlyInvestment: z.number().describe("Le montant de l'investissement mensuel en MAD."),
  investmentHorizon: z.string().describe("L'horizon de placement de l'utilisateur (ex: 'Court terme', 'Long terme')."),
  riskProfile: z.string().describe("Le profil de risque de l'utilisateur (ex: 'Prudent', 'Équilibré', 'Dynamique')."),
});
export type PortfolioAllocatorInput = z.infer<typeof PortfolioAllocatorInputSchema>;

const AllocationSchema = z.object({
    category: z.string().describe("La catégorie d'actif (ex: 'Actions Marocaines', 'OPCVM Monétaire')."),
    percentage: z.number().describe("Le pourcentage alloué à cette catégorie."),
});

const PortfolioAllocatorOutputSchema = z.object({
  allocation: z.array(AllocationSchema).describe("Un tableau représentant l'allocation d'actifs suggérée."),
  analysis: z.string().describe("Une analyse détaillée de la stratégie d'allocation proposée, expliquant pourquoi elle est adaptée au profil de l'utilisateur."),
  recommendation: z.string().describe("Des recommandations concrètes de produits ou de types de produits pour chaque catégorie d'actifs, adaptées au marché marocain (ex: noms d'OPCVM, types d'actions)."),
});
export type PortfolioAllocatorOutput = z.infer<typeof PortfolioAllocatorOutputSchema>;

export async function allocatePortfolio(input: PortfolioAllocatorInput): Promise<PortfolioAllocatorOutput> {
  return portfolioAllocatorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'portfolioAllocatorPrompt',
  input: {schema: PortfolioAllocatorInputSchema},
  output: {schema: PortfolioAllocatorOutputSchema},
  prompt: `Vous êtes un conseiller en gestion de patrimoine expert, spécialisé dans le marché financier marocain. Votre rôle est de proposer une allocation d'actifs personnalisée et professionnelle.

Données de l'investisseur :
- Montant de l'investissement initial : {{{initialInvestment}}} MAD
- Montant de l'investissement mensuel : {{{monthlyInvestment}}} MAD
- Horizon de placement : {{{investmentHorizon}}}
- Profil de risque : {{{riskProfile}}}

Votre tâche est de générer une allocation d'actifs sous forme de tableau, une analyse approfondie et des recommandations de produits spécifiques au marché marocain.

Règles pour l'allocation :
- **Prudent** : Forte pondération sur les obligations et les fonds monétaires (OPCVM Monétaire, OPCVM OMLT). Faible exposition aux actions.
- **Équilibré** : Répartition balancée entre actions (via OPCVM Actions ou titres vifs) et produits de taux.
- **Dynamique** : Forte pondération sur les actions, potentiellement avec une diversification sectorielle.

Pour les recommandations, suggérez des exemples concrets :
- Pour les actions, mentionnez des secteurs (bancaire, industriel) ou des exemples de 'blue chips' de la Bourse de Casablanca.
- Pour les OPCVM, citez des catégories (Actions, Obligataires, Diversifiés) et, si possible, des exemples de fonds connus si cela correspond à votre base de connaissances.
- Pour l'immobilier, mentionnez les OPCI.
- Pour la liquidité, mentionnez les comptes sur carnet ou OPCVM monétaires.

Structurez la sortie au format JSON. Votre analyse doit être experte et justifier les choix d'allocation par rapport au profil du client.
`,
});

const portfolioAllocatorFlow = ai.defineFlow(
  {
    name: 'portfolioAllocatorFlow',
    inputSchema: PortfolioAllocatorInputSchema,
    outputSchema: PortfolioAllocatorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
