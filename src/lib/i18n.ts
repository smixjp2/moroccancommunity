import fr from '@/locales/fr.json';
import en from '@/locales/en.json';
import { cookies } from 'next/headers';

export type Locale = 'fr' | 'en';

export const dictionaries = {
  fr,
  en,
};

export function getLocaleFromCookie(): Locale {
  const localeCookie = cookies().get('locale')?.value;
  if (localeCookie === 'en' || localeCookie === 'fr') {
    return localeCookie;
  }

  return 'fr';
}

export function getDictionary(locale?: string | null) {
  if (!locale || locale === 'fr' || locale === 'fr-FR') {
    return fr;
  }
  if (locale === 'en' || locale === 'en-US') {
    return en;
  }
  return fr;
}
