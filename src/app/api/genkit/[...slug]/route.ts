'use server';

import {ai} from '@/ai/genkit';
import {genkitNextApiHandler} from '@genkit-ai/next';

export const {GET, POST} = genkitNextApiHandler({
  getGenkit: () => ai,
});
