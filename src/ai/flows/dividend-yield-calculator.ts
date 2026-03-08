'use server';

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
  prompt: `You are a financial analyst specializing in dividend investing in the Moroccan market.

Your task is to calculate the dividend yield, potential income, and provide a clear analysis and recommendation for an investor.

Input Data:
- Stock Price: {{{stockPrice}}} MAD
- Annual Dividend Per Share: {{{annualDividendPerShare}}} MAD
- Investment Amount: {{{investmentAmount}}} MAD

Calculations:
1.  **Number of Shares**: \`investmentAmount / stockPrice\`
2.  **Dividend Yield**: \`(annualDividendPerShare / stockPrice) * 100\`
3.  **Annual Dividend Income**: \`numberOfShares * annualDividendPerShare\`

Analysis:
- Explain what the calculated dividend yield represents (e.g., high, low, average for the market).
- Discuss the relationship between yield, stock price, and dividend safety.
- Provide a clear, actionable recommendation for a Moroccan investor.

Output in JSON format.
`,
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
