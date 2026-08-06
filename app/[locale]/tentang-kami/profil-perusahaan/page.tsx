import { getTranslations, getLocale } from "next-intl/server";
import Image from "next/image";
import PageBreadcrumb from "@/components/Breadcrumb";
import type { Metadata } from "next";

const siteUrl = "https://sinergimandiriperkasa.co.id/";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: "Profil Perusahaan",
    description:
      "PT Sinergi Mandiri Perkasa adalah perusahaan trading dan distribusi strategis yang berfokus pada pasokan bahan bangunan (building material) serta produk FMCG berkualitas tinggi.",
    openGraph: {
      title: "Sinergi Mandiri Perkasa | Profil Perusahaan",
      description:
        "PT Sinergi Mandiri Perkasa adalah perusahaan trading dan distribusi strategis pasokan bahan bangunan dan Produk FMCG berkualitas.",
      url: `${siteUrl}/${locale}/tentang-kami/profil-perusahaan`,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/tentang-kami/profil-perusahaan`,
      languages: {
        "id-ID": `${siteUrl}/id/tentang-kami/profil-perusahaan`,
        "en-US": `${siteUrl}/en/tentang-kami/profil-perusahaan`,
      },
    },
  };
}

const officeImages = [
  {
    src: "/images/ruang/Receptionist_SMP.png",
    captionKey: "about.office_reception",
    size: "md:col-span-8 h-[400px]",
  },
  {
    src: "/images/ruang/Front_SMP.png",
    captionKey: "about.office_front",
    size: "md:col-span-4 h-[400px]",
  },
  {
    src: "/images/ruang/R.Meeting-1.jpg",
    captionKey: "about.office_meeting",
    size: "md:col-span-4 h-[320px]",
  },
  {
    src: "/images/ruang/Lantai-2.png",
    captionKey: "about.office_floor2",
    size: "md:col-span-8 h-[320px]",
  },
];

export default async function ProfilPage() {
  const t = await getTranslations();

  return (
    <div className="w-full min-h-screen">
      {/* Header Banner */}
      <header className="relative h-64 md:h-115 flex items-center justify-center">
        <PageBreadcrumb
          title={t("nav.profile")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.about") },
            { label: t("nav.profile") },
          ]}
        />
      </header>

      {/* Kontainer Utama - Diubah dari <article> menjadi <main> */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-15 md:py-24 space-y-24 md:space-y-36">
        <section id="profile-perusahaan" className="scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-b border-smp-border pb-16">
            {/* Kiri: Judul & Subtitle */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-smp-orange uppercase font-light tracking-[0.25em] text-xs sm:text-sm block">
                {t("about.tag_company")}
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground leading-tight">
                {t("about.header_01")} <br />
                <span className="font-semibold text-foreground">
                  {t("about.header_02")}
                </span>{" "}
                {t("about.header_03")}
              </h2>
            </div>

            {/* Kanan: Deskripsi Utama */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="text-sm sm:text-base md:text-lg text-smp-muted leading-relaxed text-justify [text-align-last:start] space-y-3">
                {t
                  .raw("about.ihktisar")
                  .map((paragraph: string, index: number) => (
                    <p key={index} className="mb-3">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          {/* Grid Metrik & Portofolio */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            {/* Box Kiri: Angka Kepercayaan Korporat */}
            <div className="bg-smp-border/30 border border-smp-border p-8 flex flex-col justify-between rounded-xl corporate-shadow">
              <div className="space-y-6 ">
                <div>
                  <span className="text-smp-blue text-xs font-semibold uppercase tracking-wider block mb-1">
                    {t("about.tag_sektor")}
                  </span>
                  <div className="text-4xl font-bold tracking-tight text-foreground">
                    02{" "}
                    <span className="text-base font-normal text-foreground/70">
                      {t("about.desc_lini")}
                    </span>
                  </div>
                </div>

                <div className="border-t border-smp-border pt-6">
                  <span className="text-smp-blue text-xs font-semibold uppercase tracking-wider block mb-1">
                    {t("about.tag_jaringan")}
                  </span>
                  <div className="text-4xl font-bold tracking-tight text-foreground">
                    550+{" "}
                    <span className="text-base font-normal text-foreground/70">
                      {t("about.desc_jaringan")}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-foreground/70 mt-8 leading-relaxed">
                {t("about.notif")}
              </p>
            </div>

            {/* Box Kanan: Rincian Sektor Bisnis Formal */}
            <div className="lg:col-span-2 text-foreground p-8 rounded-xl  flex flex-col justify-between">
              <div>
                <h3 className=" flex items-center gap-2 text-smp-orange uppercase font-light tracking-[0.25em] text-xs sm:text-sm mb-8">
                  {t("about.tag_struktural")}
                </h3>

                {/* Diubah menjadi <ul> dan <li> */}
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <li className="space-y-2">
                    <h4 className="text-xl font-semibold text-foreground">
                      {t("about.header_building")}
                    </h4>
                    <p className="text-sm text-smp-muted leading-relaxed">
                      {t("about.desc_building")}
                    </p>
                  </li>

                  <li className="space-y-2">
                    <h4 className="text-xl font-semibold text-foreground">
                      {t("about.header_fmcg")}
                    </h4>
                    <p className="text-sm text-smp-muted leading-relaxed">
                      {t("about.desc_fmcg")}
                    </p>
                  </li>

                  <li className="space-y-2 md:col-span-2 border-t border-gray-200 pt-6 mt-2">
                    <h4 className="text-xl font-semibold text-foreground">
                      {t("about.header_supplay")}
                    </h4>
                    <p className="text-sm text-smp-muted leading-relaxed">
                      {t("about.desc_supplay")}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="smp-office" className="scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-gray-200 pb-6">
            <div className="space-y-2">
              <span className="text-smp-orange uppercase font-light tracking-[0.25em] text-xs sm:text-sm block">
                {t("about.tag_office")}
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
                Sinergi Mandiri Perkasa{" "}
                <span className="font-semibold text-smp-dark">
                  {" "}
                  {t("about.header_office")}
                </span>
              </h2>
            </div>
            <p className="text-smp-muted max-w-md text-xs md:text-sm font-normal leading-relaxed md:text-right">
              {t("about.desc_office")}
            </p>
          </div>

          {/* Galeri Arsitektur / Fasilitas - Diubah menjadi <ul> dan <li> */}
          <ul className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {officeImages.map((img, idx) => (
              <li
                key={idx}
                className={`group relative overflow-hidden rounded-2xl border border-smp-border/60 bg-smp-blue/10 corporate-shadow ${img.size}`}
              >
                <Image
                  src={img.src}
                  alt={t(img.captionKey)}
                  fill
                  sizes="(max-width: 1280px) 100vw, 80vw"
                  className="object-cover contrast-105 transition-all duration-500 ease-out group-hover:scale-105"
                />

                {/* Scrim selalu tampil (mobile & desktop) supaya caption selalu terbaca;
                    hover di desktop hanya menguatkan gelap-terang, bukan memunculkan teks */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-smp-dark/85 via-smp-dark/15 to-transparent transition-all duration-300 group-hover:from-smp-dark/95 group-hover:via-smp-dark/25"
                />

                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 transition-transform duration-300 group-hover:-translate-y-1">
                  <span className="text-[10px] uppercase font-bold text-smp-orange tracking-wider">
                    {t("about.image-header")}
                  </span>
                  <p className="text-sm font-medium text-white mt-1 [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
                    {t(img.captionKey)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
