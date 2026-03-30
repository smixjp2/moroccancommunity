import type { Metadata, Viewport } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { baseUrl } from "@/lib/seo-metadata";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#22c55e",
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "The Moroccan Community",
    template: "%s | The Moroccan Community",
  },
  description: "Débloquez le potentiel du marché marocain. Votre source d'analyses, d'outils et de ressources pour comprendre l'économie et la finance au Maroc.",
  keywords: [
    "finance maroc",
    "bourse casablanca",
    "marché boursier marocain",
    "investissement maroc",
    "MASI",
    "économie maroc",
    "éducation financière",
    "simulateurs financiers",
  ],
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: baseUrl,
    siteName: "The Moroccan Community",
    title: "The Moroccan Community",
    description: "Débloquez le potentiel du marché marocain",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "The Moroccan Community",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@moroccan_community",
    creator: "@moroccan_community",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      "fr": baseUrl,
      "en": `${baseUrl}/en`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Locale handling is moved to client-side with useLocale hook
  // Default locale is 'fr' and will be determined by client cookies
  const defaultLocale = "fr";
  
  return (
    <html lang={defaultLocale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {/* Simple SVG favicon to match the logo */}
        <link 
          rel="icon" 
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='24' height='100' rx='4' fill='%2322c55e' /><rect x='38' y='30' width='24' height='70' rx='4' fill='%23ca8a04' /><rect x='76' width='24' height='100' rx='4' fill='%2322c55e' /></svg>" 
        />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
