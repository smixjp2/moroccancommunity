'use server';

import * as Brevo from '@getbrevo/brevo';
import { z } from 'zod';

const campaignSchema = z.object({
  subject: z.string().min(1, "Le sujet est requis."),
  htmlContent: z.string().min(1, "Le contenu de l'e-mail est requis."),
});

interface FormState {
  success: boolean;
  message: string;
}

export async function sendNewsletterCampaign(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const parsed = campaignSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    const errorMessage = parsed.error.issues.map(issue => issue.message).join(', ');
    return { success: false, message: `Données invalides : ${errorMessage}` };
  }

  const { subject, htmlContent } = parsed.data;

  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID ? parseInt(process.env.BREVO_LIST_ID, 10) : null;

  if (!apiKey || !listId) {
    console.error('Brevo API key ou List ID non configuré.');
    return { success: false, message: "La configuration de la newsletter est incomplète." };
  }

  const campaignsApi = new Brevo.EmailCampaignsApi();
  campaignsApi.setApiKey(Brevo.EmailCampaignsApiApiKeys.apiKey, apiKey);

  const emailCampaigns = new Brevo.CreateEmailCampaign();

  emailCampaigns.name = `Campagne - ${subject} - ${new Date().toISOString()}`;
  emailCampaigns.subject = subject;
  emailCampaigns.htmlContent = htmlContent;
  emailCampaigns.sender = { name: "The Moroccan Community", email: "themoroccananalyst@gmail.com" }; // Assurez-vous que cet expéditeur est validé dans Brevo
  emailCampaigns.recipients = { listIds: [listId] };
  emailCampaigns.type = "classic";

  try {
    const data = await campaignsApi.createEmailCampaign(emailCampaigns);
    const campaignId = data.body.id;

    // Envoyer la campagne immédiatement
    await campaignsApi.sendEmailCampaignNow(campaignId);

    return { success: true, message: 'La campagne de newsletter a été créée et est en cours d\'envoi.' };
  } catch (error: any) {
    console.error('Échec de l\'envoi de la campagne Brevo :', error?.response?.body || error.message);
    return { success: false, message: "Une erreur est survenue lors de l'envoi de la campagne via Brevo." };
  }
}
