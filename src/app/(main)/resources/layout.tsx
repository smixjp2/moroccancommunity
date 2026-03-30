import { Metadata } from 'next';
import { generateOpenGraphMetadata, generateWebpageSchema, baseUrl } from '@/lib/seo-metadata';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = generateOpenGraphMetadata({
  title: "Ressources | The Moroccan Community",
  description: "Accédez à nos ressources éducatives pour maîtriser l'économie et la finance au Maroc.",
  imageUrl: `${baseUrl}/og-image-resources.png`,
  imageAlt: "Ressources - The Moroccan Community",
  url: `${baseUrl}/resources`,
  locale: 'fr',
});

const schema = generateWebpageSchema({
  title: "Ressources",
  description: "Des ressources éducatives pour votre formation financière",
  url: `${baseUrl}/resources`,
});

export default function ResourcesLayout({
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
