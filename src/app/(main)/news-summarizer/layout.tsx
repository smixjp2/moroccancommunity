import { Metadata } from 'next';
import { generateOpenGraphMetadata, generateWebpageSchema, baseUrl } from '@/lib/seo-metadata';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = generateOpenGraphMetadata({
  title: "Résumé d'Actualités | The Moroccan Community",
  description: "Résumez les actualités du marché marocain avec notre outil alimenté par l'IA.",
  imageUrl: `${baseUrl}/og-image-news.png`,
  imageAlt: "Résumé d'Actualités - The Moroccan Community",
  url: `${baseUrl}/news-summarizer`,
  locale: 'fr',
});

const schema = generateWebpageSchema({
  title: "Résumé d'Actualités",
  description: "Résumez les actualités du marché avec l'IA",
  url: `${baseUrl}/news-summarizer`,
});

export default function NewsSummarizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  );
}
