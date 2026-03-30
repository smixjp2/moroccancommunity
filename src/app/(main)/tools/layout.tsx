
import { Metadata } from 'next';
import { generateOpenGraphMetadata, generateWebpageSchema, baseUrl } from '@/lib/seo-metadata';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = generateOpenGraphMetadata({
  title: "Outils Financiers | The Moroccan Community",
  description: "Découvrez nos simulateurs financiers et comparateurs pour optimiser vos investissements au Maroc.",
  imageUrl: `${baseUrl}/og-image-tools.png`,
  imageAlt: "Outils Financiers - The Moroccan Community",
  url: `${baseUrl}/tools`,
  locale: 'fr',
});

const schema = generateWebpageSchema({
  title: "Outils Financiers",
  description: "Des simulateurs et comparateurs pour vos décisions financières",
  url: `${baseUrl}/tools`,
});

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={schema} />
      <div className="bg-background">
        {children}
      </div>
    </>
  );
}
