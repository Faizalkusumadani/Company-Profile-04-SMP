import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumb";
import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";

const siteUrl = "https://sinergimandiriperkasa.co.id/";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title: "Logistik & Fasilitas Distribusi",
    description:
      "Sinergi Mandiri Perkasa didukung sistem logistik terintegrasi, gudang modern, dan armada distribusi profesional untuk memastikan pengiriman produk yang cepat, aman, dan tepat waktu ke seluruh Indonesia.",

    openGraph: {
      title: "Sinergi Mandiri Perkasa | Logistik & Fasilitas Distribusi",
      description:
        "Fasilitas distribusi modern, gudang terintegrasi, dan armada pengiriman profesional yang mendukung pelayanan terbaik kepada seluruh pelanggan.",

      url: `${siteUrl}/${locale}/logistik-perusahaan`,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: "Sinergi Mandiri Perkasa | Logistik & Fasilitas Distribusi",
      description:
        "Sistem logistik modern dan fasilitas distribusi profesional untuk mendukung pengiriman yang cepat dan tepat waktu.",
    },

    alternates: {
      canonical: `${siteUrl}/${locale}/logistik-perusahaan`,
      languages: {
        "id-ID": `${siteUrl}/id/logistik-perusahaan`,
        "en-US": `${siteUrl}/en/logistics-company`,
      },
    },
  };
}

const galleryData = [
  { id: "area-utama", src: "/images/gudang/image-01.png" },
  { id: "loading-dock", src: "/images/gudang/image-02.png" },
  { id: "armada-distribusi", src: "/images/gudang/image-03.png" },
  { id: "sistem-racking", src: "/images/gudang/image-04.png" },
  { id: "quality-control", src: "/images/gudang/image-05.png" },
  { id: "fasilitas-keamanan", src: "/images/gudang/image-06.png" },
];

const bentoLayout = [
  "sm:col-start-1 sm:row-start-1 sm:row-span-3",
  "sm:col-start-2 sm:row-start-1",
  "sm:col-start-3 sm:row-start-1",
  "sm:col-start-2 sm:col-span-2 sm:row-start-2",
  "sm:col-start-2 sm:row-start-3",
  "sm:col-start-3 sm:row-start-3",
];

export default async function LogistikPage() {
  const t = await getTranslations();

  return (
    <div className="w-full min-h-screen">
      <header className="relative h-64 md:h-115 flex items-center justify-center">
        <Breadcrumbs
          title={t("nav.logistics")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.about") },
            { label: t("nav.logistics") },
          ]}
        />
      </header>

      <section
        id="logistik"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-15 md:py-24 space-y-24 md:space-y-36"
      >
        <div className="text-center mb-16 flex flex-col items-center gap-4 md:gap-6">
          <span className="text-smp-orange uppercase font-medium tracking-[0.25em] text-xs sm:text-sm">
            {t("logistics.tag")}
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold text-foreground">
            {t("logistics.header")}
          </h2>
          <p className="text-lg text-smp-muted max-w-5xl mx-auto">
            {t("logistics.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 auto-rows-70 sm:auto-rows-55">
          {galleryData.map((item, index) => (
            <div
              key={item.id}
              className={`relative overflow-hidden rounded-2xl bg-gray-200 shadow-md group cursor-pointer ${bentoLayout[index]}`}
            >
              <Image
                src={item.src}
                alt={t(`logistics.gallery.${item.id}.alt`)}
                loading="lazy"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent sm:from-black/80 sm:via-black/30 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 sm:p-6">
                <div className="transform translate-y-0 sm:translate-y-8 sm:group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-smp-orange mb-1 sm:mb-2">
                    {t(`logistics.gallery.${item.id}.title`)}
                  </h3>
                  <p className="text-xs md:text-sm text-white/70 line-clamp-2 sm:line-clamp-3">
                    {t(`logistics.gallery.${item.id}.description`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
