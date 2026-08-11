// app/sitemap.ts
import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { newsData } from "@/data/data-berita";
import { activitiesData } from "@/data/data-kegiatan";

const baseUrl = "https://sinergimandiriperkasa.co.id/";
const SITE_LAST_UPDATED = new Date("2026-08-01");

const routes: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "", priority: 1.0, changeFrequency: "yearly" },
  {
    path: "/tentang-kami/profil-perusahaan",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/tentang-kami/visi-misi",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/tentang-kami/nilai-nilai",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    path: "/tentang-kami/pencapaian",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  { path: "/tentang-kami/logistik", priority: 0.6, changeFrequency: "monthly" },
  {
    path: "/tentang-kami/manajemen",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  { path: "/produk", priority: 0.9, changeFrequency: "weekly" },
  { path: "/ruang-informasi/berita", priority: 0.8, changeFrequency: "weekly" },
  {
    path: "/ruang-informasi/kegiatan",
    priority: 0.7,
    changeFrequency: "weekly",
  },
  { path: "/karir", priority: 0.7, changeFrequency: "weekly" },
  { path: "/kontak", priority: 0.5, changeFrequency: "yearly" },
];

type DynamicItem = {
  slug: string;
  updatedAt: string;
  images?: string[];
  image: string;
};

// Helper generik: bikin entri sitemap untuk daftar item (berita/kegiatan) x semua locale
function buildDynamicUrls(
  items: DynamicItem[],
  segment: "berita" | "kegiatan",
): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    items.map((item) => {
      // Sertakan gambar galeri (kalau ada), fallback ke thumbnail utama.
      const galleryImages =
        item.images && item.images.length > 0 ? item.images : [item.image];

      return {
        url: `${baseUrl}/${locale}/ruang-informasi/${segment}/${item.slug}`,
        lastModified: new Date(item.updatedAt),
        changeFrequency: "monthly" as const,
        priority: locale === routing.defaultLocale ? 0.5 : 0.4,
        images: galleryImages.map((img) => `${baseUrl}${img}`),
        alternates: {
          languages: {
            ...Object.fromEntries(
              routing.locales.map((l) => [
                l,
                `${baseUrl}/${l}/ruang-informasi/${segment}/${item.slug}`,
              ]),
            ),
            "x-default": `${baseUrl}/${routing.defaultLocale}/ruang-informasi/${segment}/${item.slug}`,
          },
        },
      };
    }),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticUrls: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route.path}`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: route.changeFrequency,
      priority:
        locale === routing.defaultLocale
          ? route.priority
          : route.priority - 0.1,
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((l) => [l, `${baseUrl}/${l}${route.path}`]),
          ),
          "x-default": `${baseUrl}/${routing.defaultLocale}${route.path}`,
        },
      },
    })),
  );

  const beritaUrls = buildDynamicUrls(newsData, "berita");
  const kegiatanUrls = buildDynamicUrls(activitiesData, "kegiatan");

  return [...staticUrls, ...kegiatanUrls, ...beritaUrls];
}
