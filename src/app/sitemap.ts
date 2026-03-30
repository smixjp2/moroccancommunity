import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://themoroccancommuntiy.com';
  const locales = ['fr', 'en'];

  // Main routes for each locale
  const mainRoutes = [
    '',
    '/about',
    '/articles',
    '/contact',
    '/resources',
    '/news-summarizer',
    '/tools',
  ];

  // Tool routes
  const toolRoutes = [
    '/tools/bank-comparator',
    '/tools/brokerage-comparator',
    '/tools/compound-interest-simulator',
    '/tools/dividend-yield-calculator',
    '/tools/fee-simulator',
    '/tools/investor-profile-quiz',
    '/tools/loan-simulator',
    '/tools/monthly-budget-simulator',
    '/tools/pe-ratio-analyzer',
    '/tools/personal-wealth-analyzer',
    '/tools/retirement-planner',
  ];

  const now = new Date();

  // Generate sitemap entries for all locales and routes
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Main routes
  mainRoutes.forEach((route) => {
    locales.forEach((locale) => {
      const url = locale === 'fr' 
        ? `${baseUrl}${route}` 
        : `${baseUrl}/en${route}`;

      sitemapEntries.push({
        url,
        lastModified: now,
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : route === '/tools' ? 0.9 : 0.8,
        alternates: {
          languages: {
            'fr': `${baseUrl}${route}`,
            'en': `${baseUrl}/en${route}`,
          },
        },
      });
    });
  });

  // Tool routes
  toolRoutes.forEach((route) => {
    locales.forEach((locale) => {
      const url = locale === 'fr' 
        ? `${baseUrl}${route}` 
        : `${baseUrl}/en${route}`;

      sitemapEntries.push({
        url,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            'fr': `${baseUrl}${route}`,
            'en': `${baseUrl}/en${route}`,
          },
        },
      });
    });
  });

  return sitemapEntries;
}
