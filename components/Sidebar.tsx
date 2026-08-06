import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { IoCalendarOutline } from "react-icons/io5";
import { generateHref as generateActivityHref } from "@/data/data-kegiatan";
import { generateHref as generateNewsHref } from "@/data/data-berita";

// Bentuk minimum yang dibutuhkan Sidebar dari item data —
// ActivityStatic maupun NewsStatic harus punya field-field ini.
type SidebarSourceItem = {
  slug: string;
  contentKey: string;
  image: string;
  isNew?: boolean;
};

type Props = {
  locale: string;
  // Opsional & default [] — jaga-jaga kalau data belum siap / gagal diambil.
  items?: SidebarSourceItem[];
  currentSlug?: string;
  kind: "activities" | "news";
};

export default async function InfoSidebar({
  locale,
  items = [],
  currentSlug,
  kind,
}: Props) {
  const t = await getTranslations({ locale, namespace: "Roominformation" });

  // Pilih generateHref sesuai jenis datanya, supaya link yang dihasilkan
  // tetap benar baik untuk item kegiatan maupun berita.
  const generateHref =
    kind === "news" ? generateNewsHref : generateActivityHref;

  const filteredItems = items
    .filter((item) => item.slug !== currentSlug)
    .map((item) => ({
      ...item,
      title: t(`${item.contentKey}_title`),
      description: t(`${item.contentKey}_description`),
      date: t(`${item.contentKey}_date`),
      href: generateHref(item.slug),
    }));

  // Fallback ini kepakai baik saat `items` kosong/tidak ada sama sekali,
  // maupun saat isinya cuma 1 (yaitu item yang sedang dibuka sendiri),
  // sehingga tidak ada "item lain" tersisa untuk ditampilkan.
  const isEmpty = filteredItems.length === 0;

  return (
    <aside className="lg:sticky lg:top-24 lg:h-fit">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500">
        {t(kind)} {t("others")}
      </h2>

      {isEmpty ? (
        <p className="rounded-lg border border-dashed border-neutral-200 p-4 text-sm text-neutral-400">
          {t(`${kind}_empty`)}
        </p>
      ) : (
        <ul className="space-y-4">
          {filteredItems.map((item, i) => (
            // key digabung slug + index karena beberapa data source bisa
            // punya slug duplikat antar section (lihat catatan di masing-masing file data).
            <li key={`${item.slug}-${i}`}>
              <Link
                href={`/${locale}${item.href}`}
                className="group flex gap-3 rounded-lg p-2 transition-colors hover:bg-neutral-50"
              >
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {item.isNew && (
                    <span className="absolute left-1 top-1 rounded bg-smp-blue px-1.5 py-0.5 text-[10px] font-semibold text-white">
                      Baru
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <h2 className="line-clamp-2 text-sm font-medium text-neutral-800 transition-colors group-hover:text-brand-600">
                    {item.title}
                  </h2>
                  <p className="text-smp-muted text-sm line-clamp-2 mb-2">
                    {item.description}
                  </p>
                  <div className="flex items-center text-gray-400 text-xs mt-1">
                    <IoCalendarOutline className="w-4 h-4 mr-1.5" />
                    <time>{item.date}</time>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
