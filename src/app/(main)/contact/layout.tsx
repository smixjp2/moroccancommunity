import { Metadata } from 'next';
import { generateOpenGraphMetadata, generateWebpageSchema, baseUrl } from '@/lib/seo-metadata';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = generateOpenGraphMetadata({
  title: "Contact | The Moroccan Community",
  description: "Kontactez-nous pour vos questions sur l'éducation financière au Maroc.",
  imageUrl: `${baseUrl}/og-image-contact.png`,
  imageAlt: "Contact - The Moroccan Community",
  url: `${baseUrl}/contact`,
  locale: 'fr',
});

const schema = generateWebpageSchema({
  title: "Contact",
  description: "Contactez The Moroccan Community",
  url: `${baseUrl}/contact`,
});

export default function ContactLayout({
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
