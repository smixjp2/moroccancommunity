
'use server';

/**
 * @fileOverview An AI agent that analyzes a stock based on key financial data.
 *
 * - analyzeStock - A function that performs the stock analysis.
 * - StockAnalysisInput - The input type for the function.
 * - StockAnalysisOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

const StockAnalysisInputSchema = z.object({
  stockSymbol: z.string().describe('The stock ticker symbol (e.g., ATW, IAM).'),
  stockName: z.string().describe('The full name of the company (e.g., Attijariwafa Bank).'),
});
export type StockAnalysisInput = z.infer<typeof StockAnalysisInputSchema>;

const StockAnalysisOutputSchema = z.object({
  analysisSummary: z.string().describe("A high-level summary of the stock's current situation."),
  financialHealth: z.string().describe("An analysis of the company's financial health, including debt, revenue, and profitability."),
  growthPotential: z.string().describe("An evaluation of the company's future growth prospects and market position."),
  dividendAnalysis: z.string().describe("An analysis of the company's dividend policy, its sustainability, and its attractiveness for income investors."),
  valuation: z.string().describe("An assessment of the stock's current valuation (e.g., overvalued, undervalued, fairly valued) based on common metrics like P/E ratio."),
  finalRecommendation: z.string().describe("A concluding recommendation for different types of Moroccan investors (e.g., prudent, dynamic)."),
});
export type StockAnalysisOutput = z.infer<typeof StockAnalysisOutputSchema>;

export async function analyzeStock(input: StockAnalysisInput): Promise<StockAnalysisOutput> {
  try {
    return await stockAnalyzerFlow(input);
  } catch (error) {
    console.error("AI analysis failed, returning fallback data.", error);
    // En cas d'échec de l'IA, renvoyer une réponse structurée pour ne pas planter l'interface.
     return {
      analysisSummary: `L'analyse pour ${input.stockName} n'a pas pu être complétée.`,
      financialHealth: "Les données sur la santé financière ne sont pas disponibles pour le moment. Veuillez réessayer.",
      growthPotential: "L'évaluation du potentiel de croissance est actuellement indisponible.",
      dividendAnalysis: "L'analyse des dividendes n'a pas pu être effectuée.",
      valuation: "L'évaluation de la valorisation est indisponible.",
      finalRecommendation: "Aucune recommandation ne peut être fournie pour le moment en raison d'une erreur technique. Veuillez vérifier votre clé API et réessayer plus tard."
    };
  }
}

const prompt = ai.definePrompt({
  name: 'stockAnalyzerPrompt',
  input: {schema: StockAnalysisInputSchema},
  output: {schema: StockAnalysisOutputSchema},
  prompt: `You are a top-tier financial analyst specializing in the Moroccan stock market (Bourse de Casablanca). Your task is to provide a comprehensive and clear analysis of a given stock for an individual investor.

Analyze the following company:
- Company Name: {{{stockName}}}
- Ticker Symbol: {{{stockSymbol}}}

Based on your knowledge of this company and the Moroccan market, please provide a detailed analysis covering the following points:
1.  **Analysis Summary**: A quick, high-level overview.
2.  **Financial Health**: Discuss its balance sheet, revenue trends, and profitability.
3.  **Growth Potential**: What are its future prospects? Market leadership? New projects?
4.  **Dividend Analysis**: Is it a good stock for income? Is the dividend reliable?
5.  **Valuation**: Is the stock currently cheap, expensive, or fairly priced? Mention relevant ratios if possible.
6.  **Final Recommendation**: Conclude with a clear recommendation tailored to different investor profiles (prudent, balanced, dynamic) in the Moroccan context.

Your tone should be expert, but easy to understand. Output the result in the required JSON format.
`,
});

const stockAnalyzerFlow = ai.defineFlow(
  {
    name: 'stockAnalyzerFlow',
    inputSchema: StockAnalysisInputSchema,
    outputSchema: StockAnalysisOutputSchema,
  },
  async input => {
    // In a real-world scenario, you might fetch live data here and pass it to the prompt.
    // For now, the prompt relies on the model's existing knowledge.
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("AI model returned no output.");
    }
    return output;
  }
);
