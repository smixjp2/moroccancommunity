'use server';

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
  prompt: `You are a Moroccan financial advisor specializing in retirement planning.

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
`,
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
