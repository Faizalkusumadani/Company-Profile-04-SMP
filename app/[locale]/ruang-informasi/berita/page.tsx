import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumb";
import { getTranslations, getLocale } from "next-intl/server";
import Allnews, { newsData } from "@/data/data-berita";
import Carousel from "@/components/Carousel-base";
import { IoCalendarOutline } from "react-icons/io5";

const siteUrl = "https://sinergimandiriperkasa.co.id";
const siteName = "PT. Sinergi Mandiri Perkasa";
const pagePath = "ruang-informasi/Berita";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title = "Berita Perusahaan";
  const description =
    "Seputar informasi berita terkini di Sinergi mandiri perkasa";
  const url = `${siteUrl}/${locale}/${pagePath}`;
  const ogImage = `${siteUrl}${newsData[0]?.image ?? ""}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "id-ID": `${siteUrl}/id/${pagePath}`,
        "en-US": `${siteUrl}/en/${pagePath}`,
      },
    },
    openGraph: {
      title: `${siteName} | ${title}`,
      description,
      url,
      siteName,
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteName} | ${title}`,
      description,
      images: [ogImage],
    },
  };
}

export default async function BeritaPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale });
  const allNews = Allnews(t);
  const newNews = allNews.filter((a) => a.isNew);
  return (
    <div className="w-full min-h-screen">
      <header className="relative h-64 md:h-115 flex items-center justify-center">
        <Breadcrumbs
          title={t("nav.news_company")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.about") },
            { label: t("nav.news_company") },
          ]}
        />
      </header>

      <section id="Berita" className="px-4 sm:px-6 lg:px-8 py-15 md:py-24">
        <div className="mx-auto max-w-7xl space-y-16 lg:space-y-20">
          {/* ── Carousel + Sidebar ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Carousel */}
            <div className="order-2 lg:order-1 lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Carousel slides={allNews} />
              </div>
            </div>

            {/* Sidebar - Berita Terbaru */}
            <aside className="order-1 lg:order-2 lg:col-span-1">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                {t("Roominformation.nesw_new")}
              </h2>

              <ul className="space-y-4">
                {newNews.map((news, i) => (
                  <li key={`${news.slug}-${i}`}>
                    <Link
                      href={`/${news.href}`}
                      className="group flex gap-3 rounded-lg p-2 transition-colors hover:bg-neutral-50"
                    >
                      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                        <Image
                          src={news.image}
                          alt={news.title}
                          fill
                          sizes="80px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {news.isNew && (
                          <span className="absolute left-1 top-1 rounded bg-smp-blue px-1.5 py-0.5 text-[10px] font-semibold text-white">
                            {t("Roominformation.tag")}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h2 className="line-clamp-2 text-sm font-medium text-neutral-800 transition-colors group-hover:text-brand-600">
                          {news.title}
                        </h2>
                        <p className="mt-1 text-xs text-neutral-400 line-clamp-2">
                          {news.description}
                        </p>
                        <span className="mt-1 text-xs text-neutral-400">
                          {news.date}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          {/* ── Gallery Berita ── */}
          <div>
            <h2 className="text-gray-700 text-2xl lg:text-4xl font-semibold tracking-tight">
              {t("Roominformation.news")}{" "}
              <span className="text-mas-red">
                {t("Roominformation.exclusive")}
              </span>
            </h2>
            <div className="h-px bg-gray-200 my-9" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {allNews.map((news) => (
                <Link
                  key={news.slug}
                  href={news.href}
                  className="group transition-all duration-300 overflow-hidden transform hover:-translate-y-2 block"
                >
                  <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-200 rounded-lg">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) calc(50vw - 24px), calc(33vw - 32px)"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {news.isNew && (
                      <span className="absolute left-3 top-3 rounded bg-smp-blue px-2 py-1 text-[11px] font-semibold text-white shadow">
                        {t("Roominformation.tag")}
                      </span>
                    )}
                  </div>
                  <div className="mt-4">
                    <h3 className="text-foreground font-semibold text-base leading-snug mb-2 line-clamp-3">
                      {news.title}
                    </h3>
                    <p className="text-smp-muted text-sm line-clamp-2 mb-2">
                      {news.description}
                    </p>
                    <div className="flex items-center text-gray-400 text-xs mt-1">
                      <IoCalendarOutline className="w-4 h-4 mr-1.5" />
                      <time>{news.date}</time>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
