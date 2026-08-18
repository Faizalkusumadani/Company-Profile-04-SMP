import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pageloader from "@/components/Pageloader";
import CookieConsent from "@/components/Cookie";
import "../globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// ─── Site Config ──────────────────────────────────────────────────────────────
const siteConfig = {
  url: "https://sinergimandiriperkasa.co.id/",
  name: "Sinergi Mandiri Perkasa",
  shortName: "Sinergi Mandiri Perkasa",
  description:
    "Sinergi Mandiri Perkasa hadir sebagai distributor bahan bangunan terpercaya yang berfokus pada penyediaan produk-produk berkualitas tinggi untuk kebutuhan proyek di wilayah Jabodetabek",
  ogImage: "/logo/og-image.png",
  themeColor: "#ffffff",
} as const;

// ─── Static Params (wajib untuk static generation per locale) ────────────────
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// ─── Viewport (wajib dipisah dari metadata di Next.js 14+) ──────────────────
export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
    themeColor: siteConfig.themeColor,
  };
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
      default: `${siteConfig.name} | Distributor Bahan Bangunan untuk kebutuhan proyek di wilayah Jabodetabek `,
      template: `${siteConfig.name} | %s`,
    },

    description: siteConfig.description,

    keywords: [
      "Sinergi Mandiri Perkasa",
      "Distributor bahan bangunan",
      "Distributor bahan bangunan Proyek",
      "Distributor 2 divisi",
      "Trading & Distribution",
      "Distributor Semen",
    ],

    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,

    // Hindari nomor telepon otomatis jadi link di mobile browser
    formatDetection: {
      telephone: false,
      email: false,
      address: false,
    },

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

    // Ganti dengan kode verifikasi asli dari Google Search Console / Bing Webmaster
    verification: {
      google: "NeEe-TfVPT8fXlnDzmiHGryE4FryGpUmzGDgtrvltyA",
    },

    openGraph: {
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
      alternateLocale: locale === "id" ? ["en_US"] : ["id_ID"],
      url: `${siteConfig.url}${locale}`,
      siteName: siteConfig.name,
      title: `${siteConfig.name} | Distributor Bahan Bangunan untuk kebutuhan proyek di wilayah Jabodetabek`,
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
      title: `${siteConfig.name} | Distributor Bahan Bangunan untuk kebutuhan proyek di wilayah Jabodetabek`,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
    },

    alternates: {
      canonical: `${siteConfig.url}${locale}`,
      languages: {
        "id-ID": `${siteConfig.url}id`,
        "en-US": `${siteConfig.url}en`,
        // fallback untuk locale yang tidak match id/en
        "x-default": `${siteConfig.url}id`,
      },
    },

    manifest: "/manifest.webmanifest",

    icons: {
      icon: [
        { url: "/logo/favicon.ico", sizes: "any" },
        { url: "/logo/icon.png", type: "image/png" },
      ],
      apple: [{ url: "/logo/apple-touch-icon.png" }],
    },

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
    description: `${siteConfig.description}`,
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
      streetAddress: "Rukan CBD Blok M No.51 Green Lake City Tangerang",
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
    // Diperluas sesuai cakupan bisnis (Jabodetabek), bukan cuma Banten
    areaServed: [
      { "@type": "AdministrativeArea", name: "DKI Jakarta" },
      { "@type": "AdministrativeArea", name: "Banten" },
      { "@type": "AdministrativeArea", name: "Jawa Barat" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "16:30",
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
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            var stored = null;
            try { stored = localStorage.getItem("cookie_consent"); } catch (e) {}
            var granted = stored === "granted";
            gtag('consent', 'default', {
              ad_storage: granted ? 'granted' : 'denied',
              ad_user_data: granted ? 'granted' : 'denied',
              ad_personalization: granted ? 'granted' : 'denied',
              analytics_storage: granted ? 'granted' : 'denied',
              wait_for_update: 500
            });
          `}
        </Script>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Pageloader />
          <Navbar locale={locale as Locale} />
          <main className="bg-background min-h-screen scroll-smooth">
            {children}
          </main>
          <Footer />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
      {process.env.NEXT_PUBLIC_GA_ID &&
        process.env.NODE_ENV === "production" && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
    </html>
  );
}
