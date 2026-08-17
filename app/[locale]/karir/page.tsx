import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { IoArrowForwardOutline } from "react-icons/io5";
import Breadcrumbs from "@/components/Breadcrumb";
import { Link } from "@/i18n/navigation";

const SITE_URL = "https://sinergimandiriperkasa.co.id";
const CAREER_PORTAL_URL = "https://www.reddmasgroup.com/id/karir";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const path = locale === "en" ? "career" : "karir";

  return {
    title: "Karir Perusahaan",
    description:
      "Informasi lowongan kerja dan proses rekrutmen di Sinergi Mandiri Perkasa.",
    openGraph: {
      title: "Sinergi Mandiri Perkasa | Karir Perusahaan",
      description:
        "Informasi lowongan kerja dan proses rekrutmen di Sinergi Mandiri Perkasa.",
      url: `${SITE_URL}/${locale}/${path}`,
      type: "website",
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/${path}`,
      languages: {
        "id-ID": `${SITE_URL}/id/karir`,
        "en-US": `${SITE_URL}/en/career`,
      },
    },
  };
}

export default async function KarirPage() {
  const t = await getTranslations();

  return (
    <div className="w-full min-h-screen">
      {/* Header & Breadcrumb */}
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

      <section id="karir">
        <div className="max-w-7xl w-full mx-auto px-4 py-15 md:py-24 space-y-24">
          {/* ================= Intro ================= */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-30">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-widest text-smp-orange">
                {t("karir.tag")}
              </p>
              <h1 className="mt-4 text-3xl md:text-5xl font-semibold text-foreground tracking-tight">
                {t("karir.header")}
              </h1>
              <p className="mt-5 text-smp-muted leading-relaxed max-w-lg">
                {t("karir.desc")}
              </p>
            </div>
            <Link
              href={CAREER_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-2 rounded-xl border border-smp-blue px-6 py-3.5 text-sm font-semibold text-smp-blue transition-colors duration-200 hover:bg-smp-blue hover:text-white"
            >
              {t("karir.cta")}
              <IoArrowForwardOutline
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
