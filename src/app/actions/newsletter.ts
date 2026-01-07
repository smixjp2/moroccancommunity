'use server';

import * as Brevo from '@getbrevo/brevo';

/**
 * Adds a contact to the Brevo mailing list.
 * @param prevState The previous state of the form.
 * @param formData The form data containing the email.
 * @returns An object indicating success or failure.
 */
export async function subscribeToNewsletter(prevState: any, formData: FormData): Promise<{ success: boolean; message: string }> {
  const email = formData.get('email') as string;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'Veuillez fournir une adresse e-mail valide.' };
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('Brevo API key is not configured.');
    return { success: false, message: 'La configuration de la newsletter est incomplète.' };
  }
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const contactsApi = new Brevo.ContactsApi();
  contactsApi.setApiKey(Brevo.ContactsApiApiKeys.apiKey, apiKey);

  const createContact = new Brevo.CreateContact();
  createContact.email = email;
  // Add the contact to a specific list.
  createContact.listIds = [2];

  try {
    await contactsApi.createContact(createContact);
    return { success: true, message: 'Merci pour votre inscription !' };
  } catch (error: any) {
    // It's common for the API to signal an error if the contact already exists.
    // We can interpret this as a "soft" success.
    if (error?.response?.body?.code === 'duplicate_parameter') {
        return { success: true, message: 'Vous êtes déjà inscrit !' };
    }

    console.error('Failed to subscribe to newsletter:', error?.response?.body || error.message);
    return { success: false, message: "Une erreur est survenue lors de l'inscription. Veuillez réessayer." };
  }
}
