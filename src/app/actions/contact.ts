
'use server';

import * as Brevo from '@getbrevo/brevo';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
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
    return { success: false, message: 'Données du formulaire invalides.' };
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

  sendSmtpEmail.subject = `Nouveau Message: ${subject}`;
  sendSmtpEmail.htmlContent = `
    <h1>Nouveau message depuis le site The Moroccan Community</h1>
    <p><strong>Nom:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Sujet:</strong> ${subject}</p>
    <hr>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `;
  sendSmtpEmail.sender = { name: "TMC Contact Form", email: "contact@themoroccan.community" };
  sendSmtpEmail.to = [{ email: "themoroccananalyst@gmail.com", name: "The Moroccan Analyst" }];
  sendSmtpEmail.replyTo = { email, name };

  try {
    await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
    return { success: true, message: 'Votre message a été envoyé avec succès.' };
  } catch (error: any) {
    console.error('Failed to send contact email:', error?.response?.body || error.message);
    return { success: false, message: "Une erreur est survenue lors de l'envoi de l'e-mail." };
  }
}
