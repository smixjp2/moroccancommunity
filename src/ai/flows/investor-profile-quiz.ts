'use server';

/**
 * @fileOverview Determines a user's investor profile based on a quiz.
 *
 * - determineInvestorProfile - A function that analyzes quiz answers.
 * - InvestorProfileQuizInput - The input type for the function.
 * - InvestorProfileQuizOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InvestorProfileQuizInputSchema = z.object({
  age: z.number().describe("The user's current age."),
  investmentHorizon: z.string().describe("The user's investment time horizon (e.g., 'Court terme', 'Moyen terme', 'Long terme')."),
  riskTolerance: z.string().describe("The user's stated tolerance for risk (e.g., 'Très faible', 'Faible', 'Modérée', 'Élevée', 'Très élevée')."),
  marketDropResponse: z.string().describe("How the user would react to a 20% market drop."),
  investmentKnowledge: z.string().describe("The user's self-assessed investment knowledge level."),
});
export type InvestorProfileQuizInput = z.infer<typeof InvestorProfileQuizInputSchema>;

const InvestorProfileQuizOutputSchema = z.object({
  profile: z.string().describe("The determined investor profile name (e.g., 'Prudent', 'Équilibré', 'Dynamique', 'Agressif')."),
  description: z.string().describe("A detailed description of the investor profile, explaining its characteristics."),
  recommendation: z.string().describe("Actionable recommendations for this type of investor, including asset allocation suggestions suitable for the Moroccan market."),
});
export type InvestorProfileQuizOutput = z.infer<typeof InvestorProfileQuizOutputSchema>;

export async function determineInvestorProfile(input: InvestorProfileQuizInput): Promise<InvestorProfileQuizOutput> {
  return investorProfileQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'investorProfileQuizPrompt',
  input: {schema: InvestorProfileQuizInputSchema},
  output: {schema: InvestorProfileQuizOutputSchema},
  prompt: `You are a senior financial advisor in Morocco. Your task is to analyze a user's answers to an investment quiz and determine their investor profile.

Analyze the following user responses:
- Age: {{{age}}}
- Investment Horizon: {{{investmentHorizon}}}
- Risk Tolerance: {{{riskTolerance}}}
- Reaction to a 20% Market Drop: "{{{marketDropResponse}}}"
- Investment Knowledge: {{{investmentKnowledge}}}

Based on these answers, determine the most suitable investor profile from the following options: Prudent, Équilibré, Dynamique, or Agressif.

Provide a detailed description of the assigned profile and offer clear, actionable recommendations tailored to a Moroccan investor. The recommendation should include a sample asset allocation (e.g., % in Moroccan stocks, % in bonds, % in real estate/OPCI, % in cash).

Output the result in JSON format.
`,
});

const investorProfileQuizFlow = ai.defineFlow(
  {
    name: 'investorProfileQuizFlow',
    inputSchema: InvestorProfileQuizInputSchema,
    outputSchema: InvestorProfileQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);