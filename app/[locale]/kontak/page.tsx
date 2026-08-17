import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumb";
import Form from "@/components/Form";
import { getTranslations, getLocale } from "next-intl/server";

// 1. Import icon dari io5
import {
  IoArrowForwardOutline,
  IoLocationOutline,
  IoMailOutline,
  IoCallOutline,
  IoDownloadOutline,
} from "react-icons/io5";

const siteUrl = "https://sinergimandiriperkasa.co.id/";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title: "Kontak Perusahaan",
    description: "Hubungi kami , Kami siap melayani kebutuhan proyek anda",
    openGraph: {
      title: "Sinergi Mandiri Perkasa | Kontak Perusahaan",
      description: "Hubungi kami , Kami siap melayani kebutuhan proyek anda",
      url: `${siteUrl}/${locale}/Kontak Perusahaan`,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/Kontak Perusahaan`,
      languages: {
        "id-ID": `${siteUrl}/id/Kontak Perusahaan`,
        "en-US": `${siteUrl}/en/contact Company`,
      },
    },
  };
}

// Contoh Mapping Icon (Sesuaikan dengan data locations Anda)
const iconMap: Record<string, React.ElementType> = {
  location: IoLocationOutline,
  email: IoMailOutline,
  phone: IoCallOutline,
  download: IoDownloadOutline,
};

const locations = [
  {
    key: "kantor-utama",
    icon: "location",
    value: "Rukan CBD Blok M No.51 Green Lake City Tangerang 15147",
    href: "null",
  },
  {
    key: "email",
    icon: "email",
    value: "sales@smp-merahputih.com",
    href: "mailto:sales@smp-merahputih.com",
  },
  {
    key: "phone",
    icon: "phone",
    value: "+62 21 550 3019",
    href: "tel:+62215503019",
  },
  {
    key: "company-profile",
    icon: "download",
    value: "klik here",
    href: "/dokument/Company-profile-sinergi.pdf",
  },
];

export default async function KontakPage() {
  const t = await getTranslations();

  return (
    <div className="w-full min-h-screen">
      <header className="relative h-64 md:h-115 flex items-center justify-center">
        <Breadcrumbs
          title={t("nav.contact")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.about") },
            { label: t("nav.contact") },
          ]}
        />
      </header>
      <section id="kontak">
        <div className="max-w-7xl w-full mx-auto px-4 py-15 md:py-24 space-y-24">
          {/* ================= Lokasi Kami ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-foreground tracking-tight">
                {t("kontak.header")}
              </h2>
              <p className="mt-3 text-smp-muted max-w-5xl">
                {t("kontak.desc")}
              </p>

              <div className="mt-10 divide-y divide-gray-300">
                {locations.map((loc) => {
                  const Icon = iconMap[loc.icon];
                  const name = t(`kontak.locations.${loc.key}.name`);
                  const isLink = Boolean(loc.href);

                  const rowContent = (
                    <div className="group flex items-center gap-5 py-5">
                      {/* 2. Hapus strokeWidth dan gunakan icon dari io5 */}
                      <Icon className="h-5 w-5 shrink-0 text-smp-blue" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-normal tracking-wide text-smp-muted hover:text-smp-blue">
                          {name}
                        </p>
                        <p className="mt-0.5 text-base text-foreground leading-relaxed">
                          {loc.value}
                        </p>
                      </div>
                      {isLink && (
                        /* 3. Gunakan IoArrowForwardOutline dengan -rotate-45 sebagai pengganti ArrowUpRight */
                        <IoArrowForwardOutline className="h-4 w-4 text-gray-300 -rotate-45 transition-all duration-300 group-hover:text-smp-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      )}
                    </div>
                  );

                  return loc.href ? (
                    <a
                      key={loc.key}
                      href={loc.href}
                      target={loc.icon === "download" ? "_blank" : undefined}
                      rel={
                        loc.icon === "download"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      download={loc.icon === "download"}
                      className="block"
                    >
                      {rowContent}
                    </a>
                  ) : (
                    <div key={loc.key}>{rowContent}</div>
                  );
                })}
              </div>
            </div>

            {/* Kolom kanan: image talent, natural tanpa overlay */}
            <div className="order-1 lg:order-2">
              <div className="relative aspect-4/5 w-full max-w-md mx-auto rounded-3xl overflow-hidden ">
                <Image
                  src="/images/cs-kontak-01.png"
                  alt="Customer Service "
                  fill
                  className="object-contain mask-[linear-gradient(to_bottom,black_80%,transparent_100%)]"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* ================= Form Kontak ================= */}
          <div className="mb-4 space-y-6">
            <h2 className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight">
              {t("kontak.hero_heading_01")} {t("kontak.hero_heading_02")}
            </h2>
            <p className="mt-3 text-smp-muted leading-relaxed max-w-sm">
              {t("kontak.hero_subtext")}
            </p>
            {/* Form */}
            <Form />
          </div>
        </div>
      </section>
    </div>
  );
}
