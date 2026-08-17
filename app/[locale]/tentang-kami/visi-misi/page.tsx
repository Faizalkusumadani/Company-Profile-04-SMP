import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumb";
import { getTranslations, getLocale } from "next-intl/server";
import { visiMisiData } from "@/data/data-visimisi";

const siteUrl = "https://sinergimandiriperkasa.co.id/";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title: "Visi & Misi Perusahaan",
    description: "Visi & Misi Sinergi Mandiri Perkasa sebagai fondasi utama",
    openGraph: {
      title: "Sinergi Mandiri Perkasa | Visi & Misi Perusahaan",
      description: "Visi & Misi Sinergi Mandiri Perkasa sebagai fondasi utama",
      url: `${siteUrl}/${locale}/visi-misi Perusahaan`,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/visi-misi Perusahaan`,
      languages: {
        "id-ID": `${siteUrl}/id/visi-misi Perusahaan`,
        "en-US": `${siteUrl}/en/visi-misi Perusahaan`,
      },
    },
  };
}

interface MisiPoint {
  title: string;
  description: string;
}

export default async function Visi_MisiPage() {
  const t = await getTranslations();

  return (
    <div className="w-full min-h-screen">
      <header className="relative h-64 md:h-115 flex items-center justify-center">
        <Breadcrumbs
          title={t("nav.vision-mision")}
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.about") },
            { label: t("nav.vision-mision") },
          ]}
        />
      </header>

      <section id="visi-misi">
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-15 md:py-24 space-y-24 md:space-y-36">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visiMisiData.map(({ id, icon: Icon }) => (
              <div key={id}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-smp-orange/10 shrink-0">
                    <Icon className="w-7 h-7 text-smp-blue" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                    {t(`visiMisi.${id}.title`)}
                  </h2>
                </div>

                {id === "visi" && (
                  <p className="text-smp-muted text-lg leading-relaxed max-w-3xl">
                    {t("visiMisi.visi.description")}
                  </p>
                )}

                {id === "misi" && (
                  <ol className="space-y-8">
                    {(() => {
                      const rawList = t.raw("visiMisi.misi.list");
                      const list: MisiPoint[] = Array.isArray(rawList)
                        ? rawList
                        : Object.values(rawList ?? {});

                      return list.map((point: MisiPoint, idx: number) => (
                        <li key={point.title} className="flex gap-4">
                          <span className="text-smp-orange font-bold text-lg shrink-0 w-6">
                            {idx + 1}.
                          </span>
                          <div>
                            <p className="text-smp-muted leading-relaxed">
                              {point.description}
                            </p>
                          </div>
                        </li>
                      ));
                    })()}
                  </ol>
                )}
              </div>
            ))}
          </div>
        </main>
      </section>
    </div>
  );
}
