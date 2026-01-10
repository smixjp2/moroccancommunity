
'use server';

import * as Brevo from '@getbrevo/brevo';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, "Le nom est requis."),
  email: z.string().email("Veuillez entrer une adresse email valide."),
  subject: z.string({ required_error: "Veuillez sélectionner un sujet." }).min(1, "Le sujet est requis."),
  message: z.string().min(10, "Votre message doit contenir au moins 10 caractères."),
});


interface FormState {
  success: boolean;
  message: string;
}

export async function sendContactEmail(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {

  const parsed = formSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsed.success) {
    // This should not happen if client-side validation is working, but it's a good safeguard.
    const errorMessage = parsed.error.issues.map(issue => issue.message).join(', ');
    return { success: false, message: `Données du formulaire invalides: ${errorMessage}` };
  }
  
  const { name, email, subject, message } = parsed.data;

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('Brevo API key is not configured.');
    return { success: false, message: 'La configuration du service de messagerie est incomplète.' };
  }

  const transactionalEmailsApi = new Brevo.TransactionalEmailsApi();
  transactionalEmailsApi.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);

  const sendSmtpEmail = new Brevo.SendSmtpEmail();

  sendSmtpEmail.subject = `[TMC Contact] Nouveau Message: ${subject}`;
  sendSmtpEmail.htmlContent = `
    <h1>Nouveau message depuis le site The Moroccan Community</h1>
    <p><strong>Nom:</strong> ${name}</p>
    <p><strong>Email (pour répondre):</strong> ${email}</p>
    <p><strong>Sujet:</strong> ${subject}</p>
    <hr>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `;
  sendSmtpEmail.sender = { name: "The Moroccan Community", email: "noreply@yourdomain.com" };
  sendSmtpEmail.to = [{ email: "themoroccananalyst@gmail.com", name: "The Moroccan Analyst" }];
  sendSmtpEmail.replyTo = { email, name };

  try {
    await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
    return { success: true, message: 'Votre message a été envoyé avec succès.' };
  } catch (error: any) {
    console.error('Failed to send contact email:', error?.response?.body || error.message);
    return { success: false, message: "Une erreur est survenue lors de l'envoi de l'e-mail. Veuillez réessayer." };
  }
}
