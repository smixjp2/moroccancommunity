
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
  analysisSummary: z.string().describe("Un résumé de haut niveau de la situation actuelle de l'action."),
  financialHealth: z.string().describe("Une analyse de la santé financière de l'entreprise, incluant la dette, le chiffre d'affaires, et la rentabilité, avec des chiffres clés si possible."),
  growthPotential: z.string().describe("Une évaluation des perspectives de croissance future de l'entreprise et de sa position sur le marché."),
  dividendAnalysis: z.string().describe("Une analyse de la politique de dividende de l'entreprise, sa pérennité et son attrait pour les investisseurs de revenu."),
  valuation: z.string().describe("Une évaluation de la valorisation actuelle de l'action (par exemple, surévaluée, sous-évaluée, correctement évaluée) basée sur des métriques communes comme le ratio P/E."),
  finalRecommendation: z.string().describe("Une recommandation finale pour différents types d'investisseurs marocains (prudent, dynamique)."),
});
export type StockAnalysisOutput = z.infer<typeof StockAnalysisOutputSchema>;

export async function analyzeStock(input: StockAnalysisInput): Promise<StockAnalysisOutput> {
    return stockAnalyzerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'stockAnalyzerPrompt',
  input: {schema: StockAnalysisInputSchema},
  output: {schema: StockAnalysisOutputSchema},
  prompt: `Vous êtes un analyste financier expert spécialisé dans la Bourse de Casablanca. Votre tâche est de fournir une analyse complète en FRANÇAIS, détaillée et chiffrée pour un investisseur individuel.

Analysez la société suivante :
- Nom : {{{stockName}}}
- Symbole : {{{stockSymbol}}}

IMPORTANT : Basez-vous sur les données les plus récentes disponibles dans vos connaissances, y compris les données de 2024 si possible.

Fournissez une analyse détaillée couvrant les points suivants. Soyez précis et utilisez des données chiffrées (chiffre d'affaires, bénéfice, ratios clés comme le P/E, rendement du dividende) lorsque c'est pertinent.

Règles de formatage :
- Utilisez des balises HTML <b>...</b> pour mettre en gras les titres de section (ex: <b>Chiffre d'affaires :</b>). N'utilisez PAS d'astérisques ou de Markdown.
- Utilisez des listes à puces (avec des tirets -) pour structurer vos points clés dans chaque section pour une meilleure lisibilité.

1.  <b>Résumé de l'Analyse</b>: Un aperçu rapide et percutant.
2.  <b>Santé Financière</b>: Commentez le bilan, les tendances du chiffre d'affaires, la rentabilité (marges), et le niveau d'endettement. Citez des chiffres récents.
3.  <b>Potentiel de Croissance</b>: Quelles sont les perspectives futures ? Position de leader ? Nouveaux projets, expansion ?
4.  <b>Analyse du Dividende</b>: Est-ce une bonne action de rendement ? Le dividende est-il fiable et a-t-il un historique de croissance ? Quel est le rendement approximatif ?
5.  <b>Valorisation</b>: L'action est-elle actuellement bon marché, chère, ou à son juste prix ? Mentionnez le P/E ratio et le comparez à son secteur.
6.  <b>Recommandation Finale</b>: Concluez avec une recommandation claire et nuancée, adaptée à différents profils d'investisseurs marocains (par exemple : 'Pour un profil prudent...', 'Pour un investisseur dynamique...').

Votre ton doit être expert mais facile à comprendre. La réponse DOIT être en français. Structurez la sortie au format JSON requis.
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
