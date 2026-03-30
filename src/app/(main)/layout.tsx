import { Header } from "@/app/components/layout/header";
import { Footer } from "@/app/components/layout/footer";
import TradingViewTicker from "@/components/tradingview-ticker-bar";
import { Metadata } from "next";
import { generateOrganizationSchema, baseUrl } from "@/lib/seo-metadata";
import { JsonLd } from "@/components/JsonLd";

// Mark main layout as dynamic to handle client components properly
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  applicationName: "The Moroccan Community",
  referrer: "strict-origin-when-cross-origin",
  creator: "The Moroccan Community",
  publisher: "The Moroccan Community",
  metadataBase: new URL(baseUrl),
  verification: {
    google: "google-site-verification-code", // Replace with your Google verification code
  },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={generateOrganizationSchema()} />
      <div className="flex min-h-screen flex-col">
        <Header />
        <TradingViewTicker />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
