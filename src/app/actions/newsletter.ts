'use server';

import * as Brevo from '@getbrevo/brevo';

/**
 * Adds a contact to the Brevo mailing list.
 * @param email The email address of the user to subscribe.
 * @returns An object indicating success or failure.
 */
export async function subscribeToNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  const apiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY;
  if (!apiKey) {
    console.error('Brevo API key is not configured.');
    return { success: false, message: 'La configuration de la newsletter est incomplète.' };
  }

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
