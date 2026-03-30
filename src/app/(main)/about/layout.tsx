import { Metadata } from 'next';
import { generateOpenGraphMetadata, generateWebpageSchema, baseUrl } from '@/lib/seo-metadata';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = generateOpenGraphMetadata({
  title: "À Propos | The Moroccan Community",
  description: "Apprenez-en plus sur The Moroccan Community, notre mission et notre vision pour l'éducation financière au Maroc.",
  imageUrl: `${baseUrl}/og-image-about.png`,
  imageAlt: "À Propos - The Moroccan Community",
  url: `${baseUrl}/about`,
  locale: 'fr',
});

const schema = generateWebpageSchema({
  title: "À Propos",
  description: "Apprenez-en plus sur The Moroccan Community",
  url: `${baseUrl}/about`,
});

export default function AboutLayout({
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
