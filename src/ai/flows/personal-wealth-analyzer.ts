'use server';

/**
 * @fileOverview Analyzes a user's personal wealth and provides insights.
 *
 * - analyzePersonalWealth - A function that analyzes assets and liabilities.
 * - PersonalWealthInput - The input type for the function.
 * - PersonalWealthOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalWealthInputSchema = z.object({
  cash: z.number().describe("Liquidités et comptes courants."),
  savings: z.number().describe("Comptes épargne, livrets, et dépôts à terme."),
  stocks: z.number().describe("Portefeuille d'actions, OPCVM, et autres placements boursiers."),
  realEstate: z.number().describe("Valeur estimée du patrimoine immobilier (résidence principale et investissements locatifs)."),
  otherAssets: z.number().describe("Autres actifs (voitures, objets de valeur, etc.)."),
  shortTermDebt: z.number().describe("Dettes à court terme (crédits à la consommation, découverts)."),
  longTermDebt: z.number().describe("Dettes à long terme (crédit immobilier)."),
});
export type PersonalWealthInput = z.infer<typeof PersonalWealthInputSchema>;

const AssetAllocationSchema = z.object({
    cash: z.number().describe("The percentage of cash in the asset allocation."),
    savings: z.number().describe("The percentage of savings in the asset allocation."),
    stocks: z.number().describe("The percentage of stocks in the asset allocation."),
    realEstate: z.number().describe("The percentage of real estate in the asset allocation."),
    other: z.number().describe("The percentage of other assets in the asset allocation."),
});

const PersonalWealthOutputSchema = z.object({
  netWorth: z.number().describe("Le patrimoine net calculé (Total Actifs - Total Dettes)."),
  assetAllocation: AssetAllocationSchema.describe("La répartition en pourcentage des différents actifs."),
  debtToAssetRatio: z.number().describe("Le ratio d'endettement (Total Dettes / Total Actifs)."),
  liquidityAnalysis: z.string().describe("Une analyse de la liquidité du patrimoine (capacité à mobiliser des fonds rapidement)."),
  riskAnalysis: z.string().describe("Une analyse du niveau de risque du patrimoine basée sur l'allocation d'actifs."),
  recommendation: z.string().describe("Des recommandations générales pour optimiser la structure du patrimoine, améliorer la diversification ou réduire l'endettement."),
});
export type PersonalWealthOutput = z.infer<typeof PersonalWealthOutputSchema>;

export async function analyzePersonalWealth(input: PersonalWealthInput): Promise<PersonalWealthOutput> {
  return personalWealthAnalyzerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalWealthPrompt',
  input: {schema: PersonalWealthInputSchema},
  output: {schema: PersonalWealthOutputSchema},
  prompt: `You are a savvy financial advisor in Morocco. Your task is to analyze a user's financial situation based on their assets and liabilities, and provide a comprehensive analysis and actionable recommendations.

Calculate the net worth, asset allocation percentages, and debt-to-asset ratio. Then, provide a clear analysis of the user's liquidity and risk exposure. Finally, offer targeted recommendations for a Moroccan investor.

Input Data (in MAD):
- Cash: {{{cash}}}
- Savings: {{{savings}}}
- Stocks: {{{stocks}}}
- Real Estate: {{{realEstate}}}
- Other Assets: {{{otherAssets}}}
- Consumer Credit & Overdrafts (short-term debt): {{{shortTermDebt}}}
- Mortgage (long-term debt): {{{longTermDebt}}}

Calculations to be performed by you before generating analysis:
1.  **Total Assets**: cash + savings + stocks + realEstate + otherAssets
2.  **Total Debts**: shortTermDebt + longTermDebt
3.  **Net Worth**: Total Assets - Total Debts
4.  **Asset Allocation**: Calculate the percentage of each asset class relative to Total Assets.
5.  **Debt-to-Asset Ratio**: Total Debts / Total Assets

Based on these calculations, generate the analysis for 'liquidityAnalysis', 'riskAnalysis', and 'recommendation'.
- **Liquidity Analysis**: Comment on the proportion of liquid assets (cash, savings) versus illiquid assets (real estate).
- **Risk Analysis**: Analyze the risk profile. A high allocation to stocks implies higher risk and potential for growth, while a high allocation to real estate or savings is more conservative.
- **Recommendation**: Provide actionable advice. For example, if the debt ratio is high, suggest a reduction plan. If the stock allocation is low for a young user, suggest increasing it. Tailor it to a Moroccan context.

Output the final result in JSON format.
`,
});

const personalWealthAnalyzerFlow = ai.defineFlow(
  {
    name: 'personalWealthAnalyzerFlow',
    inputSchema: PersonalWealthInputSchema,
    outputSchema: PersonalWealthOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
