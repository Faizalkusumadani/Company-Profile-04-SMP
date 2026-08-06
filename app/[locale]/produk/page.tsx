import { getTranslations, getLocale } from "next-intl/server";
import PageBreadcrumb from "@/components/Breadcrumb";
import type { Metadata } from "next";
import ProductCatalog from "@/components/Menutabs";

const siteUrl = "https://build.sinergimandiriperkasa.co.id/";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: "Produk Perusahaan",
    description:
      "Temukan pasokan bahan bangunan berkualitas unggulan dari PT Sinergi Mandiri Perkasa untuk kebutuhan proyek dan distribusi Anda",
    openGraph: {
      title: "Sinergi Mandiri Perkasa | Produk Perusahaan",
      description:
        "Temukan pasokan bahan bangunan berkualitas unggulan dari PT Sinergi Mandiri Perkasa untuk kebutuhan proyek dan distribusi Anda",
      url: `${siteUrl}/${locale}/tentang-kami/produk-perusahaan`,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/tentang-kami/produk-perusahaan`,
      languages: {
        "id-ID": `${siteUrl}/id/tentang-kami/produk-perusahaan`,
        "en-US": `${siteUrl}/en/tentang-kami/produk-perusahaan`,
      },
    },
  };
}

export default async function ProdukPage() {
  const t = await getTranslations();

  return (
    <div className="w-full min-h-screen bg-slate-50/50">
      {/* Header Banner */}
      <header className="relative h-64 md:h-115 flex items-center justify-center">
        <PageBreadcrumb
          title={t("nav.product")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.about") },
            { label: t("nav.product") },
          ]}
        />
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-15 md:py-24">
        <section id="produk-perusahaan" className="scroll-mt-28">
          <ProductCatalog />
        </section>
      </main>
    </div>
  );
}
