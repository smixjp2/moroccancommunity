'use server';

/**
 * @fileOverview Generates a full professional article from a title and excerpt.
 * 
 * - generateArticle - A function that creates a full article.
 * - ArticleGeneratorInput - The input type for the function.
 * - ArticleGeneratorOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ArticleGeneratorInputSchema = z.object({
  title: z.string().describe('The title of the article.'),
  excerpt: z.string().describe('A short excerpt or summary of the article topic.'),
});
export type ArticleGeneratorInput = z.infer<typeof ArticleGeneratorInputSchema>;

const ArticleGeneratorOutputSchema = z.object({
  introduction: z.string().describe('A compelling introduction for the article.'),
  body: z.string().describe("The main body of the article, formatted with markdown. Use '##' for main section titles and '###' for sub-section titles. Include at least 3 main sections."),
  conclusion: z.string().describe('A concluding paragraph that summarizes the key takeaways.'),
});
export type ArticleGeneratorOutput = z.infer<typeof ArticleGeneratorOutputSchema>;

export async function generateArticle(input: ArticleGeneratorInput): Promise<ArticleGeneratorOutput> {
  return articleGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'articleGeneratorPrompt',
  input: { schema: ArticleGeneratorInputSchema },
  output: { schema: ArticleGeneratorOutputSchema },
  prompt: `You are an expert financial analyst and content writer for "The Moroccan Community". Your task is to write a full, professional, and insightful article based on the provided title and excerpt. The article must be relevant to the Moroccan market.

  Your writing style should be clear, engaging, and authoritative. Structure the article logically.

  Use the following information to generate the article:
  - Title: {{{title}}}
  - Excerpt: {{{excerpt}}}

  **Instructions:**
  1.  **Introduction:** Write a strong introduction that grabs the reader's attention and outlines what the article will cover.
  2.  **Body:**
      -   Develop the main topic into a detailed article body.
      -   Create at least three distinct sections, each with a clear heading.
      -   Format main section headings with '##' (e.g., '## The Current State of the Market').
      -   Use '###' for any sub-headings if needed.
      -   Provide deep analysis, real-world examples relevant to Morocco, and actionable insights. Do not just repeat the excerpt.
      -   Ensure smooth transitions between paragraphs and sections.
  3.  **Conclusion:** Write a concise conclusion that summarizes the main points and gives the reader a final takeaway or outlook.

  Output the entire response in JSON format.
  `,
});

const articleGeneratorFlow = ai.defineFlow(
  {
    name: 'articleGeneratorFlow',
    inputSchema: ArticleGeneratorInputSchema,
    outputSchema: ArticleGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
