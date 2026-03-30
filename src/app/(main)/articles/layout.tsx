import { Metadata } from 'next';
import { generateOpenGraphMetadata, generateWebpageSchema, baseUrl } from '@/lib/seo-metadata';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = generateOpenGraphMetadata({
  title: "Articles | The Moroccan Community",
  description: "Explorez nos articles approfondis sur le marché boursier marocain, l'analyse d'experts et les tendances du secteur financier.",
  imageUrl: `${baseUrl}/og-image-articles.png`,
  imageAlt: "Articles - The Moroccan Community",
  url: `${baseUrl}/articles`,
  locale: 'fr',
});

const schema = generateWebpageSchema({
  title: "Articles",
  description: "Explorez nos articles approfondis sur l'économie et la finance au Maroc",
  url: `${baseUrl}/articles`,
});

export default function ArticlesLayout({
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
