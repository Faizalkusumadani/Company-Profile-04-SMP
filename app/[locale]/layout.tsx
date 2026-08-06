import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// ─── Site Config ──────────────────────────────────────────────────────────────
const siteConfig = {
  url: "https://build.sinergimandiriperkasa.co.id/",
  name: "Sinergi Mandiri Perkasa",
  shortName: "Sinergi Mandiri Perkasa",
  description:
    "Sinergi Mandiri Perkasa membangun ekosistem bisnis terintegrasi: Trading, HVAC Installation, IT Solutions, Creative IP, dan F&B. Inovasi & kolaborasi untuk pertumbuhan berkelanjutan.",
  ogImage: "/og-image.png",
} as const;

// ─── Static Params (wajib untuk static generation per locale) ────────────────
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL(siteConfig.url),

    title: {
      default: `${siteConfig.name} | Beranda`,
      template: `${siteConfig.name} | %s`,
    },

    description: siteConfig.description,

    keywords: [
      "Sinergi Mandiri Perkasa",
      "Distributor bahan bangunan",
      "Distributor bahan bangunan Proyek ",
      "Distributor 2 divisi",
      "Trading & Distribution",
      "Distributor Semen",
    ],

    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    openGraph: {
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
      alternateLocale: locale === "id" ? ["en_US"] : ["id_ID"],
      url: `${siteConfig.url}${locale}`,
      siteName: siteConfig.name,
      title: `${siteConfig.name} | Beranda`,
      description: siteConfig.description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `Banner ${siteConfig.name}`,
          type: "image/png",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} | Beranda`,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
    },

    alternates: {
      canonical: `${siteConfig.url}${locale}`,
      languages: {
        "id-ID": `${siteConfig.url}id`,
        "en-US": `${siteConfig.url}en`,
      },
    },

    manifest: "/manifest.webmanifest",

    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: siteConfig.name,
    },
  };
}

// ─── Layout ───────────────────────────────────────────────────────────────────
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Guard: kalau locale di URL tidak terdaftar (mis. /fr/...), 404
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Wajib dipanggil supaya static rendering per-locale bekerja dengan benar
  setRequestLocale(locale);

  // Dynamic Schema JSON-LD per Locale — tetap di layout karena ini
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: `${siteConfig.url}/${locale}`,
    logo: `${siteConfig.url}/logo/logo-smp.png`,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    telephone: "+62-21-550-3019",
    email: "sales@smp-merahputih.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rukan CBD Blok M No.51 Green Lake City Tangerang ",
      addressLocality: "Tangerang Kota",
      addressRegion: "Banten",
      postalCode: "15147",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.183925463337667,
      longitude: 106.69935959559166,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Banten",
    },
    sameAs: [
      "https://www.instagram.com/sinergi.mp?utm_source=qr&igsh=MTljOTdwc2p0NjdzYw==",
    ],
  };

  const messages = await getMessages();
  return (
    <html lang={locale} className={`${poppins.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar locale={locale as Locale} />
          <main className="bg-background min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
