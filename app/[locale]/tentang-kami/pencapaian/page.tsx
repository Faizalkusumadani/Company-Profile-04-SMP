import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumb";
import PencapaianRegistry from "@/components/Card-pencapaian";
import { pencapaianData } from "@/data/data-sertifikat";
import { getTranslations, getLocale } from "next-intl/server";

const siteUrl = "https://sinergimandiriperkasa.co.id/";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title: "Pencapaian Perusahaan",
    description:
      "Pencapaian atas Komitmen Perusaahaan Sinergi Mandiri Perkasa yang di raih",
    openGraph: {
      title: " Sinergi Mandiri Perkasa | Pencapaian Perusahaan",
      description:
        "Pencapaian atas Komitmen Perusaahaan Sinergi Mandiri Perkasa yang di raih",
      url: `${siteUrl}/${locale}/pencapaian Perusahaan`,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/pencapaian Perusahaan`,
      languages: {
        "id-ID": `${siteUrl}/id/pencapaian Perusahaan`,
        "en-US": `${siteUrl}/en/achievement Perusahaan`,
      },
    },
  };
}

export default async function PencapaianPage() {
  const t = await getTranslations();

  const totalSertifikasi = pencapaianData.filter(
    (item) => item.category === "label_01",
  ).length;
  const totalPenghargaan = pencapaianData.filter(
    (item) => item.category === "label_02",
  ).length;
  const tahunPertama = Math.min(
    ...pencapaianData.map((item) => new Date(item.date).getFullYear()),
  );

  return (
    <div className="w-full min-h-screen">
      <header className="relative h-64 md:h-115 flex items-center justify-center">
        <Breadcrumbs
          title={t("nav.achievement")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.about") },
            { label: t("nav.achievement") },
          ]}
        />
      </header>

      <section id="Pencapaian">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-15 md:py-24">
          <div className="max-w-3xl">
            <span className="text-smp-orange uppercase font-medium tracking-[0.25em] text-xs sm:text-sm">
              {t("achievements.tag")}
            </span>
            <h2 className="mt-3 text-2xl md:text-5xl font-semibold text-foreground leading-snug">
              {t("achievements.header")}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-smp-muted md:text-base">
              {t("achievements.desc")} {tahunPertama}.
            </p>
          </div>
          <div className="relative mt-8 w-full aspect-video overflow-hidden group">
            <Image
              src="/images/piagam/image-utama.png"
              alt="Piagam Utama"
              fill
              sizes="(max-width: 1280px) 100vw, 80vw"
              className="object-cover contrast-105 transition-all duration-500 ease-out group-hover:scale-105"
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-stone-200 py-5 text-sm text-stone-600">
            <span>
              <strong className="text-lg font-semibold text-smp-red">
                {totalSertifikasi}
              </strong>{" "}
              {t("achievements.label_01")}
            </span>
            <span className="hidden h-4 w-px bg-gray-200 sm:block" />
            <span>
              <strong className="text-lg font-semibold text-smp-red">
                {totalPenghargaan}
              </strong>{" "}
              {t("achievements.label_02")}
            </span>
            <span className="hidden h-4 w-px bg-gray-200 sm:block" />
            <span>
              {t("achievements.label_years")}{" "}
              <strong className="text-smp-red">{tahunPertama}</strong>
            </span>
          </div>

          <div className="mt-12 md:mt-16">
            <PencapaianRegistry items={pencapaianData} />
          </div>
        </div>
      </section>
    </div>
  );
}
