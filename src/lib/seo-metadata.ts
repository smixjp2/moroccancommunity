import { Metadata } from 'next';

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://themoroccancommuntiy.com';

export interface OpenGraphMetadata {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  url?: string;
  locale?: string;
}

export interface AuthorSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  sameAs: string[];
}

export interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  contact: {
    '@type': string;
    contactType: string;
    email: string;
  };
}

export interface WebpageSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: AuthorSchema | string;
  publisher?: OrganizationSchema | string;
  isPartOf?: {
    '@type': string;
    url: string;
  };
}

export interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

/**
 * Generate OpenGraph metadata for a page
 */
export function generateOpenGraphMetadata(data: OpenGraphMetadata): Metadata {
  const url = data.url || baseUrl;
  const imageUrl = data.imageUrl || `${baseUrl}/og-image.png`;

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      url,
      type: data.type || 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: data.imageAlt || data.title,
          type: 'image/png',
        },
      ],
      locale: data.locale || 'fr_FR',
      alternateLocale: data.locale === 'en' ? ['fr_FR'] : ['en_US'],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
      languages: {
        'fr': `${baseUrl}${new URL(url).pathname.replace('/en/', '/')}`,
        'en': `${baseUrl}/en${new URL(url).pathname}`,
      },
    },
  };
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The Moroccan Community',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'Your source for analysis, tools and resources to understand the Moroccan economy and finance.',
    sameAs: [
      'https://www.youtube.com/@themoroccancommuntiy',
      'https://twitter.com/moroccan_community',
      'https://www.linkedin.com/company/the-moroccan-community',
      'https://www.instagram.com/themoroccancommuntiy',
    ],
    contact: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'contact@themoroccancommuntiy.com',
    },
  };
}

/**
 * Generate WebPage schema
 */
export function generateWebpageSchema(data: {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished?: string;
  dateModified?: string;
}): WebpageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: data.title,
    description: data.description,
    url: data.url,
    image: data.imageUrl,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    publisher: generateOrganizationSchema(),
    isPartOf: {
      '@type': 'WebSite',
      url: baseUrl,
    },
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * Generate LocalBusiness schema for financial services
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'The Moroccan Community',
    image: `${baseUrl}/logo.png`,
    description: 'Financial education platform for the Moroccan market',
    url: baseUrl,
    areaServed: 'MA',
    priceRange: '$$',
    service: [
      {
        '@type': 'Service',
        name: 'Financial Education',
        description: 'Comprehensive financial education platform',
      },
      {
        '@type': 'Service',
        name: 'Financial Tools',
        description: 'Interactive financial calculators and comparators',
      },
      {
        '@type': 'Service',
        name: 'Market Analysis',
        description: 'In-depth analysis of the Moroccan stock market',
      },
    ],
    contact: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'contact@themoroccancommuntiy.com',
    },
  };
}

/**
 * Generate Article schema
 */
export function generateArticleSchema(data: {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    image: data.imageUrl,
    url: data.url,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    author: {
      '@type': 'Organization',
      name: data.authorName || 'The Moroccan Community',
      url: baseUrl,
    },
    publisher: generateOrganizationSchema(),
  };
}
