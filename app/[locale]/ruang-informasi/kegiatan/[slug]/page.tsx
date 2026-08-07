import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  activitiesData,
  getActivityBySlug,
  getActivityGalleryImages,
  getAllActivityParams,
  generateHref,
} from "@/data/data-kegiatan";
import Sidebar from "@/components/Sidebar";
import Gallery from "@/components/Slides-Gallery";
import Breadcrumbs from "@/components/Breadcrumb";

const siteUrl = "https://sinergimandiriperkasa.co.id";
const siteName = "PT. Sinergi Mandiri Perkasa";

type Params = { locale: string; slug: string };
type Props = { params: Promise<Params> };

export function generateStaticParams() {
  return getAllActivityParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const activity = getActivityBySlug(slug);
  if (!activity) return {};

  const t = await getTranslations({ locale, namespace: "Roominformation" });
  const title = t(`${activity.contentKey}_title`);
  const description = t(`${activity.contentKey}_description`);
  const url = `${siteUrl}/${locale}${generateHref(activity.slug)}`;
  const ogImage = `${siteUrl}${activity.image}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        id: `${siteUrl}/id${generateHref(activity.slug)}`,
        en: `${siteUrl}/en${generateHref(activity.slug)}`,
      },
    },
    openGraph: {
      title: `${siteName} | ${title}`,
      description,
      url,
      siteName,
      type: "article",
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

export default async function KegiatanDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const activity = getActivityBySlug(slug);
  if (!activity) notFound();

  const t = await getTranslations({ locale });
  const title = t(`Roominformation.${activity.contentKey}_title`);
  const description = t(`Roominformation.${activity.contentKey}_description`);
  const date = t(`Roominformation.${activity.contentKey}_date`);
  const gallery = getActivityGalleryImages(activity);
  const otherActivities = activitiesData;

  // t.raw() mengembalikan nilai asli (array atau string) dari i18n
  const rawContent = t.raw(`Roominformation.${activity.contentKey}_content_1`);
  const paragraphs: string[] = Array.isArray(rawContent)
    ? rawContent
    : [String(rawContent)];

  return (
    <div className="w-full min-h-screen">
      <header className="relative h-64 md:h-115 flex items-center justify-center">
        <Breadcrumbs
          title={title}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.news") },
            {
              label: t("nav.activity_company"),
              href: "/ruang-informasi/kegiatan",
            },
            { label: title },
          ]}
        />
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-15 md:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          <article className="min-w-0">
            <div className="space-y-3 pb-6 border-b border-neutral-100">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug tracking-tight text-neutral-900">
                {title}
              </h2>

              <p className="text-base sm:text-lg text-neutral-500 leading-relaxed">
                {description}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs sm:text-sm text-neutral-400">
                <span className="inline-flex items-center gap-1.5">
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="8" r="3.25" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"
                    />
                  </svg>
                  {t("Roominformation.posted")} Admin
                </span>

                <span aria-hidden="true" className="text-neutral-300">
                  &middot;
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  >
                    <rect x="3.5" y="5" width="17" height="16" rx="2" />
                    <path strokeLinecap="round" d="M3.5 9.5h17M8 3v4M16 3v4" />
                  </svg>
                  <time dateTime={date}>{date}</time>
                </span>
              </div>
            </div>

            <div className="pt-8">
              <Gallery images={gallery} alt={title} />
            </div>

            <div className="pt-8 space-y-5">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm sm:text-base text-neutral-600 leading-relaxed"
                >
                  {index === 0 && (
                    <span className="font-semibold uppercase tracking-wide text-neutral-800">
                      Jakarta, {date}{" "}
                      <span className="text-neutral-400 normal-case tracking-normal font-normal">
                        &mdash;{" "}
                      </span>
                    </span>
                  )}
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          <Sidebar
            locale={locale}
            items={otherActivities}
            currentSlug={activity.slug}
            kind="activities"
          />
        </div>
      </main>
    </div>
  );
}
