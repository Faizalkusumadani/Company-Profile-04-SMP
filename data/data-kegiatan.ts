export type ActivityStatic = {
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
export type Activity = ActivityStatic & {
  title: string;
  description: string;
  date: string;
  href: string;
};

// ── Static Data ────────────────────────────────────────────────
export const activitiesData: ActivityStatic[] = [
  {
    id: "1",
    slug: "dinner-celebrate",
    image: "/images/ruang-in/kegiatan/Top-Performance-2024/1.jpg",
    contentKey: "dinner_celebrate_2025",
    updatedAt: "2025-01-30",
    images: [
      "/images/ruang-in/kegiatan/Top-Performance-2024/1.jpg",
      "/images/ruang-in/kegiatan/Top-Performance-2024/2.jpg",
      "/images/ruang-in/kegiatan/Top-Performance-2024/3.jpg",
      "/images/ruang-in/kegiatan/Top-Performance-2024/4.jpg",
      "/images/ruang-in/kegiatan/Top-Performance-2024/5.jpg",
    ],
  },
  {
    id: "2",
    slug: "buka-puasa-bersama",
    image: "/images/ruang-in/kegiatan/BUKA PUASA BERSAMA RAMADHAN/1.jpg",
    contentKey: "buka_puasa_2025",
    updatedAt: "2025-03-18",
    images: [
      "/images/ruang-in/kegiatan/BUKA PUASA BERSAMA RAMADHAN/1.jpg",
      "/images/ruang-in/kegiatan/BUKA PUASA BERSAMA RAMADHAN/2.jpg",
      "/images/ruang-in/kegiatan/BUKA PUASA BERSAMA RAMADHAN/3.jpg",
      "/images/ruang-in/kegiatan/BUKA PUASA BERSAMA RAMADHAN/4.jpg",
      "/images/ruang-in/kegiatan/BUKA PUASA BERSAMA RAMADHAN/5.jpg",
    ],
  },
  {
    id: "3",
    slug: "training-employed-2025",
    image: "/images/ruang-in/kegiatan/Traning/IMG_2166.JPEG",
    contentKey: "training_employed_2025",
    updatedAt: "2025-08-09",
    images: [
      "/images/ruang-in/kegiatan/Traning/IMG_2166.JPEG",
      "/images/ruang-in/kegiatan/Traning/IMG_2319.JPEG",
      "/images/ruang-in/kegiatan/Traning/IMG_2334.JPEG",
      "/images/ruang-in/kegiatan/Traning/IMG_2338.JPEG",
    ],
  },
  {
    id: "4",
    slug: "annual-celebrate-2026",
    image: "/images/ruang-in/kegiatan/Celebrate_12_Januari_2026/1.JPG",
    contentKey: "annual_celebrate_2026",
    updatedAt: "2026-12-01",
    images: [
      "/images/ruang-in/kegiatan/Celebrate_12_Januari_2026/1.JPG",
      "/images/ruang-in/kegiatan/Celebrate_12_Januari_2026/2.JPG",
      "/images/ruang-in/kegiatan/Celebrate_12_Januari_2026/3.JPG",
      "/images/ruang-in/kegiatan/Celebrate_12_Januari_2026/4.JPG",
      "/images/ruang-in/kegiatan/Celebrate_12_Januari_2026/5.JPG",
    ],
    isNew: true,
  },
  {
    id: "5",
    slug: "traning-sales-2026",
    image: "/images/ruang-in/kegiatan/Growing/001.jpg",
    contentKey: "traning_sales_2026",
    updatedAt: "2026-02-07",
    images: [
      "/images/ruang-in/kegiatan/Growing/001.jpg",
      "/images/ruang-in/kegiatan/Growing/002.jpg",
      "/images/ruang-in/kegiatan/Growing/003.jpeg",
      "/images/ruang-in/kegiatan/Growing/004.jpeg",
      "/images/ruang-in/kegiatan/Growing/005.jpg",
      "/images/ruang-in/kegiatan/Growing/006.jpg",
      "/images/ruang-in/kegiatan/Growing/007.jpeg",
    ],
    isNew: true,
  },
  {
    id: "6",
    slug: "goes-to-bangkok",
    image: "/images/ruang-in/kegiatan/Goes-to-Bangkok/001.jpeg",
    contentKey: "Bangkok_2025",
    updatedAt: "2025-04-30",
    images: [
      "/images/ruang-in/kegiatan/Goes-to-Bangkok/001.jpeg",
      "/images/ruang-in/kegiatan/Goes-to-Bangkok/002.jpg",
      "/images/ruang-in/kegiatan/Goes-to-Bangkok/003.jpg",
      "/images/ruang-in/kegiatan/Goes-to-Bangkok/004.jpg",
      "/images/ruang-in/kegiatan/Goes-to-Bangkok/005.jpg",
    ],
    isNew: true,
  },
];

// ── Helpers ────────────────────────────────────────────────────

/**
 * Generate href dari slug.
 */
export function generateHref(slug: string): string {
  return `/ruang-informasi/kegiatan/${slug}`;
}

/**
 * Lookup activity by slug. Return null jika tidak ditemukan (→ 404).
 */
export function getActivityBySlug(slug: string): ActivityStatic | null {
  return activitiesData.find((a) => a.slug === slug) ?? null;
}

/**
 * Resolve daftar gambar untuk galeri di halaman detail.
 * Fallback ke satu foto (imageDetail ?? image) kalau `images` kosong.
 */
export function getActivityGalleryImages(activity: ActivityStatic): string[] {
  if (activity.images && activity.images.length > 0) return activity.images;
  return [activity.imageDetail ?? activity.image];
}

/**
 * generateStaticParams untuk [locale]/informasi/kegiatan/[slug]/page.tsx
 * Ekspor langsung agar bisa dipakai di halaman detail.
 */
export function getAllActivityParams() {
  const locales = ["id", "en"];
  return locales.flatMap((locale) =>
    activitiesData.map((a) => ({ locale, slug: a.slug })),
  );
}

// ── Default Export ─────────────────────────────────────────────
// Gabungkan data statis + terjemahan dari t() + href otomatis.
// Dipakai di: sidebar, carousel, gallery list, halaman detail.

const Allactivities = (t: (key: string) => string): Activity[] =>
  activitiesData.map((a) => ({
    ...a,
    href: generateHref(a.slug),
    title: t(`Roominformation.${a.contentKey}_title`),
    description: t(`Roominformation.${a.contentKey}_description`),
    date: t(`Roominformation.${a.contentKey}_date`),
  }));

export default Allactivities;
