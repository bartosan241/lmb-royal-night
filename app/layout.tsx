import type { Metadata, Viewport } from "next";
import { Anton, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Preloader, CustomCursor, ScrollProgress, Atmosphere } from "@/components/ui/chrome";
import { VENUE } from "@/lib/data";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jbMono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lmb-royal-night.ga"),
  title: {
    default: "LMB Royal Night — Bar & Lounge · Libreville",
    template: "%s · LMB Royal Night",
  },
  description:
    "Bar, lounge et club au cœur de Libreville. Réservez votre carré VIP ou votre Loge Royale, composez votre seau de bouteilles et votre carte champagne en quelques clics.",
  keywords: [
    "LMB", "bar Libreville", "lounge Gabon", "boite de nuit Libreville",
    "réservation table VIP", "champagne Libreville", "club Gabon", "Quartier Louis",
  ],
  openGraph: {
    title: "LMB Royal Night — Bar & Lounge · Libreville",
    description:
      "Le rendez-vous des nuits de Libreville. Carrés VIP, Loges Royales, seaux à composer et cave à champagne.",
    locale: "fr_GA",
    type: "website",
    siteName: "LMB Royal Night",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#06060a",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NightClub",
  name: "LMB Royal Night",
  description: "Bar, lounge et club à Libreville, Gabon.",
  address: {
    "@type": "PostalAddress",
    streetAddress: VENUE.address,
    addressLocality: "Libreville",
    addressCountry: "GA",
  },
  telephone: VENUE.phone,
  email: VENUE.email,
  servesCuisine: "Tapas",
  priceRange: "$$$",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${anton.variable} ${interTight.variable} ${jbMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Preloader />
        <CustomCursor />
        <ScrollProgress />
        <Atmosphere />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
