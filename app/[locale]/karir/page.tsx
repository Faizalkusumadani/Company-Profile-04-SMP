import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumb";
import { getTranslations, getLocale } from "next-intl/server";

const siteUrl = "https://sinergimandiriperkasa.co.id/";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title: "Karir Perusahaan",
    description: "Informasi seputar Lowongan kerja di Sinergi Mandiri Perkasa ",
    openGraph: {
      title: " Sinergi Mandiri Perkasa | Karir Perusahaan",
      description:
        "Informasi seputar Lowongan kerja di Sinergi Mandiri Perkasa ",
      url: `${siteUrl}/${locale}/Karir Perusahaan`,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/Karir Perusahaan`,
      languages: {
        "id-ID": `${siteUrl}/id/Karir Perusahaan`,
        "en-US": `${siteUrl}/en/Career Company`,
      },
    },
  };
}

export default async function KarirPage() {
  const t = await getTranslations();

  return (
    <div className="w-full min-h-screen">
      <header className="relative h-64 md:h-115 flex items-center justify-center">
        <Breadcrumbs
          title={t("nav.career")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.about") },
            { label: t("nav.career") },
          ]}
        />
      </header>
      <section id="Karir"></section>
    </div>
  );
}
