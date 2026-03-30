import React from 'react';

export interface JsonLdProps {
  data: Record<string, any>;
  type?: 'Organization' | 'WebPage' | 'Article' | 'FAQPage' | 'BreadcrumbList';
}

/**
 * Component to render JSON-LD schema in page head
 */
export function JsonLd({ data, type }: JsonLdProps) {
  const jsonString = JSON.stringify(data);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: jsonString,
      }}
    />
  );
}

/**
 * Export for server component usage
 */
export function generateJsonLdScript(data: Record<string, any>): string {
  return JSON.stringify(data);
}
