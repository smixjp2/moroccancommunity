'use server';

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
  prompt: `You are an AI assistant helping a newsletter editor summarize Moroccan market news for their weekly newsletter.

  Please provide a concise and informative summary of the following news articles:

  {{~#each articles}}
  Source: {{this.source}}
  Title: {{this.title}}
  Content: {{this.content}}
  ---
  {{~/each}}
  `,
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
