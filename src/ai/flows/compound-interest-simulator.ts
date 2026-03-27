'use server';

/**
 * @fileOverview A compound interest calculator that shows the power of compounding over time.
 *
 * - calculateCompoundInterest - A function that calculates compound interest growth.
 * - CompoundInterestInput - The input type for the calculateCompoundInterest function.
 * - CompoundInterestOutput - The return type for the calculateCompoundInterest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CompoundInterestInputSchema = z.object({
  initialInvestment: z
    .number()
    .describe('The initial investment amount in Moroccan Dirhams.'),
  monthlyContribution: z
    .number()
    .describe('The monthly contribution amount in Moroccan Dirhams.'),
  annualReturnRate: z
    .number()
    .describe('The estimated annual return rate as a percentage.'),
  investmentPeriod: z
    .number()
    .describe('The investment period in years.'),
  compoundingFrequency: z
    .enum(['annually', 'monthly'])
    .describe('How often interest is compounded.'),
});
export type CompoundInterestInput = z.infer<typeof CompoundInterestInputSchema>;

const YearDataSchema = z.object({
  year: z.number(),
  principal: z.number(),
  interest: z.number(),
  total: z.number(),
});

const CompoundInterestOutputSchema = z.object({
  finalValue: z
    .number()
    .describe('The final value of the investment after the specified period.'),
  totalContributions: z
    .number()
    .describe('The total amount contributed over the period.'),
  totalInterest: z
    .number()
    .describe('The total interest earned over the period.'),
  yearlyBreakdown: z.array(YearDataSchema).describe('A yearly breakdown of the investment growth.'),
  analysis: z
    .string()
    .describe('An analysis of the compound interest growth and its benefits.'),
  recommendation: z
    .string()
    .describe('A recommendation on how to maximize compound interest benefits.'),
});
export type CompoundInterestOutput = z.infer<typeof CompoundInterestOutputSchema>;

export async function calculateCompoundInterest(input: CompoundInterestInput): Promise<CompoundInterestOutput> {
  return compoundInterestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'compoundInterestPrompt',
  input: {schema: CompoundInterestInputSchema},
  output: {schema: CompoundInterestOutputSchema},
  prompt: `You are an expert financial analyst specializing in compound interest calculations for Moroccan investors.

Your task is to calculate the growth of an investment through compound interest and provide educational analysis.

Input Data:
- Initial Investment: {{{initialInvestment}}} MAD
- Monthly Contribution: {{{monthlyContribution}}} MAD
- Annual Return Rate: {{{annualReturnRate}}}%
- Investment Period: {{{investmentPeriod}}} years
- Compounding Frequency: {{{compoundingFrequency}}}

Calculations:
1. Calculate the final value using compound interest formula, accounting for monthly contributions.
2. Provide a year-by-year breakdown showing principal, interest earned, and total value each year.
3. Calculate total contributions and total interest earned.
4. Provide an educational analysis explaining the power of compound interest.
5. Offer practical recommendations for maximizing compound interest benefits.

For compounding frequency:
- If 'annually': compound once per year
- If 'monthly': compound 12 times per year

Use the standard compound interest formula with regular contributions.

Output in JSON format, including the 'yearlyBreakdown' array.
`,
});

const compoundInterestFlow = ai.defineFlow(
  {
    name: 'compoundInterestFlow',
    inputSchema: CompoundInterestInputSchema,
    outputSchema: CompoundInterestOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);