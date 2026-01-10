
'use server';

import * as Brevo from '@getbrevo/brevo';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string(),
  message: z.string().min(10),
});

/**
 * Sends a contact email using Brevo's transactional email API.
 */
export async function sendContactEmail(prevState: any, formData: FormData): Promise<{ success: boolean; message: string }> {
  const parsed = formSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    return { success: false, message: 'Données du formulaire invalides. Veuillez vérifier les champs.' };
  }

  const { name, email, subject, message } = parsed.data;

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('Brevo API key is not configured.');
    return { success: false, message: 'Le service de contact est temporairement indisponible.' };
  }

  const transactionalEmailsApi = new Brevo.TransactionalEmailsApi();
  transactionalEmailsApi.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);

  const sendSmtpEmail = new Brevo.SendSmtpEmail();

  sendSmtpEmail.subject = `[Contact] ${subject} - de ${name}`;
  sendSmtpEmail.htmlContent = `
    <html>
      <body>
        <h1>Nouvelle demande de contact depuis le site</h1>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      </body>
    </html>
  `;
  // IMPORTANT: The sender email must be a validated sender in your Brevo account.
  sendSmtpEmail.sender = { name: 'The Moroccan Community', email: 'contact@themoroccan.community' };
  sendSmtpEmail.to = [{ email: 'themoroccananalyst@gmail.com', name: 'The Moroccan Analyst' }];
  sendSmtpEmail.replyTo = { email: email, name: name };

  try {
    await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
    return { success: true, message: 'Votre message a été envoyé avec succès. Nous vous répondrons bientôt.' };
  } catch (error: any) {
    console.error('Failed to send contact email:', error?.response?.body || error.message);
    return { success: false, message: "Une erreur est survenue lors de l'envoi. Veuillez réessayer plus tard." };
  }
}

