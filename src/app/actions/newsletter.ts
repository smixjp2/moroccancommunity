
'use server';

import * as Brevo from '@getbrevo/brevo';

export async function subscribeToNewsletter(email: string) {
  if (!process.env.BREVO_API_KEY) {
    throw new Error('Brevo API key is not configured.');
  }

  const api = new Brevo.TransactionalEmailsApi();
  api.setApiKey(
    Brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
  );

  const createContact = new Brevo.CreateContact();
  createContact.email = email;
  // IMPORTANT: You need to specify which list(s) to add the contact to.
  // Go to your Brevo account -> Contacts -> Lists to find your list ID.
  // For example, if your newsletter list has an ID of 2, you would use [2].
  createContact.listIds = [2]; 

  const contactsApi = new Brevo.ContactsApi();
  contactsApi.setApiKey(
    Brevo.ContactsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
  );

  try {
    const data = await contactsApi.createContact(createContact);
    return { success: true, data };
  } catch (error) {
    // Brevo's API might throw an error if the contact already exists.
    // You might want to handle this gracefully.
    console.error('Failed to subscribe to newsletter:', error);
    throw new Error('Could not subscribe user.');
  }
}
