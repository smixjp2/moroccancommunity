'use server';

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
  prompt: `You are an expert financial analyst specializing in Moroccan investments. You will calculate the impact of bank fees and commissions on investment returns and provide a recommendation.

Calculate the final value of an investment with and without fees, the total fees paid, and the percentage impact of fees on the final value.

Based on the fee impact, provide a recommendation on whether the bank is cost-effective. A lower fee impact is better.

Initial Investment: {{{initialInvestment}}} MAD
Annual Return Rate: {{{annualReturnRate}}}%
Investment Period: {{{investmentPeriod}}} years
Bank Fees: {{{bankFees}}} MAD
Commission Structure: {{{commissionStructure}}}

Output in JSON format:
`,
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
