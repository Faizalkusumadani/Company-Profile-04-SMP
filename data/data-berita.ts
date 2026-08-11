export type NewsStatic = {
  id: string;
  slug: string;
  image: string;
  imageDetail?: string;
  images?: string[];
  contentKey: string;
  isNew?: boolean;
  updatedAt: string;
};

/** Shape lengkap setelah digabung dengan terjemahan */
export type News = NewsStatic & {
  title: string;
  description: string;
  date: string;
  href: string;
};

// ── Static Data ────────────────────────────────────────────────
export const newsData: NewsStatic[] = [
  {
    id: "1",
    slug: "wavin-2026",
    image: "/images/ruang-in/berita/Retailer Wavin 2026/001.jpeg",
    contentKey: "Wavin_2026",
    images: [
      "/images/ruang-in/berita/Retailer Wavin 2026/001.jpeg",
      "/images/ruang-in/berita/Retailer Wavin 2026/002.jpeg",
      "/images/ruang-in/berita/Retailer Wavin 2026/003.jpeg",
      "/images/ruang-in/berita/Retailer Wavin 2026/004.jpeg",
      "/images/ruang-in/berita/Retailer Wavin 2026/005.jpeg",
    ],
    isNew: true,
    updatedAt: "2026-06-04",
  },
];

// ── Helpers ────────────────────────────────────────────────────

/*** Generate href dari slug ***/
export function generateHref(slug: string): string {
  return `/ruang-informasi/berita/${slug}`;
}

/**
 * Lookup activity by slug. Return null jika tidak ditemukan (→ 404).
 */
export function getNewsBySlug(slug: string): NewsStatic | null {
  return newsData.find((a) => a.slug === slug) ?? null;
}

/**
 * Resolve daftar gambar untuk galeri di halaman detail.
 * Fallback ke satu foto (imageDetail ?? image) kalau `images` kosong.
 */
export function getNewsGalleryImages(news: NewsStatic): string[] {
  if (news.images && news.images.length > 0) return news.images;
  return [news.imageDetail ?? news.image];
}

/**
 * generateStaticParams untuk [locale]/informasi/kegiatan/[slug]/page.tsx
 * Ekspor langsung agar bisa dipakai di halaman detail.
 */
export function getAllNewsParams() {
  const locales = ["id", "en"];
  return locales.flatMap((locale) =>
    newsData.map((a) => ({ locale, slug: a.slug })),
  );
}

// ── Default Export ─────────────────────────────────────────────
// Gabungkan data statis + terjemahan dari t() + href otomatis.
// Dipakai di: sidebar, carousel, gallery list, halaman detail.

const Allnews = (t: (key: string) => string): News[] =>
  newsData.map((a) => ({
    ...a,
    href: generateHref(a.slug),
    title: t(`Roominformation.${a.contentKey}_title`),
    description: t(`Roominformation.${a.contentKey}_description`),
    date: t(`Roominformation.${a.contentKey}_date`),
  }));

export default Allnews;
