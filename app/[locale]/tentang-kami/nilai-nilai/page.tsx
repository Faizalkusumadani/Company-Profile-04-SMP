import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumb";
import { getTranslations, getLocale, getMessages } from "next-intl/server";
import { coreValuesData } from "@/data/corevalues";
import CoreValuesList from "@/components/Corelist";

const siteUrl = "https://sinergimandiriperkasa.co.id/";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title: "Nilai-Nilai Perusahaan",
    description:
      "Nilai-nilai utama yang kami junjung tinggi sebagai fondasi utama dalam bekerja.",
    openGraph: {
      title: " Sinergi Mandiri Perkasa | nilai-nilai Perusahaan",
      description:
        "Nilai-nilai utama yang kami junjung tinggi sebagai fondasi utama dalam bekerja.",
      url: `${siteUrl}/${locale}/nilai-nilai Perusahaan`,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/nilai-nilai Perusahaan`,
      languages: {
        "id-ID": `${siteUrl}/id/nilai-nilai Perusahaan`,
        "en-US": `${siteUrl}/en/nilai-nilai Perusahaan`,
      },
    },
  };
}

interface CoreValueText {
  title: string;
  description: string;
}

export default async function Nilai_NilaiPage() {
  const t = await getTranslations();
  const messages = await getMessages();

  const coreValuesMessages = (
    messages as {
      corevalues: Record<string, CoreValueText> & { heading: string };
    }
  ).corevalues;

  const items = coreValuesData
    .map(({ id, accentColor }) => {
      const value = coreValuesMessages?.[id];

      if (!value) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            `[nilai-nilai] Key "coreValues.${id}" tidak ditemukan di file translation. ` +
              `Pastikan key ini ada di messages/id.json dan messages/en.json.`,
          );
        }
        return null;
      }

      return {
        id,
        accentColor,
        title: value.title,
        description: value.description,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <div className="w-full min-h-screen">
      <header className="relative h-64 md:h-115 flex items-center justify-center">
        <Breadcrumbs
          title={t("nav.value")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.about") },
            { label: t("nav.value") },
          ]}
        />
      </header>

      <section id="nilai-nilai" className="relative w-full overflow-hidden">
        {/* REFAKTOR WATERMARK: Posisi dipindah ke kanan bawah dengan opasitas super tipis (4%) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-5%] bottom-1.25 hidden h-120 w-120 opacity-[0.04] md:block lg:right-[2%] lg:bottom-2.5 lg:h-120 lg:w-120"
        >
          <Image
            src="/logo/Logo-icon.png"
            alt="logo-reddmas"
            fill
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-contain"
          />
        </div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-15 md:py-24 space-y-24 md:space-y-36">
          <div className="space-y-6 mb-12">
            <h2 className="text-2xl sm:text-4xl font-semibold text-foreground md:text-5xl">
              {t("corevalues.heading")}
            </h2>
            <p className="text-smp-muted text-sm md:text-base leading-relaxed font-normal">
              {t("corevalues.desc_corevalues")}
            </p>
          </div>

          {/* Dekorasi Tambahan: Membungkus list dengan border-t atau membiarkannya mengalir */}
          <div className="border-t border-gray-100 pt-8 [&_>_div]:border-b [&_>_div]:border-gray-50 [&_>_div]:pb-8">
            <CoreValuesList items={items} />
          </div>
        </main>
      </section>
    </div>
  );
}
