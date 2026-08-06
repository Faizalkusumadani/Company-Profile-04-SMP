"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaCalendarDays, FaCertificate, FaXmark } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import type { PencapaianItem } from "@/data/data-sertifikat";

interface PencapaianRegistryProps {
  items: PencapaianItem[];
}

function formatTanggal(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function CategoryLabel({ category }: { category: PencapaianItem["category"] }) {
  const t = useTranslations();
  return (
    <span className="block text-[10px] font-medium uppercase tracking-wider text-amber-700">
      {t(`achievements.${category}`)}
    </span>
  );
}

function CertificateThumbnail({
  item,
  onOpen,
}: {
  item: PencapaianItem;
  onOpen: () => void;
}) {
  const [error, setError] = useState(false);

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Lihat ${item.title}`}
      className="relative aspect-4/3 w-full overflow-hidden rounded-sm border border-stone-200 bg-stone-50 text-left transition-colors duration-300 hover:border-amber-700/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
    >
      {!error ? (
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          onError={() => setError(true)}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-stone-300">
          <FaCertificate className="h-7 w-7" />
          <span className="text-[10px] uppercase tracking-wider">Dokumen</span>
        </div>
      )}
    </button>
  );
}

export default function PencapaianRegistry({ items }: PencapaianRegistryProps) {
  const [selected, setSelected] = useState<PencapaianItem | null>(null);
  const t = useTranslations();

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const years = Array.from(
    new Set(items.map((item) => new Date(item.date).getFullYear())),
  ).sort((a, b) => b - a);

  return (
    <div className="space-y-16 md:space-y-20">
      {years.map((year) => {
        const yearItems = items
          .filter((item) => new Date(item.date).getFullYear() === year)
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          );

        return (
          <div
            key={year}
            className="grid grid-cols-1 gap-6 md:grid-cols-[120px_1fr] md:gap-10"
          >
            <div className="flex items-baseline gap-3 md:block md:border-t md:border-stone-200 md:pt-4">
              <span className="text-3xl font-semibold text-stone-900 md:text-4xl">
                {year}
              </span>
              <span className="text-xs text-stone-400 md:mt-1 md:block">
                {yearItems.length} {t("achievements.label_pencapaian")}
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid grid-cols-2 gap-5 border-t border-stone-200 pt-6 sm:grid-cols-3 md:border-t-0 md:pt-0"
            >
              {yearItems.map((item) => (
                <div key={item.id} className="group">
                  <CertificateThumbnail
                    item={item}
                    onOpen={() => setSelected(item)}
                  />
                  <div className="mt-3 space-y-1">
                    <CategoryLabel category={item.category} />
                    <h3 className="text-sm font-medium leading-snug text-stone-900">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-500">{item.issuer}</p>
                    <p className="flex items-center gap-1.5 text-xs text-stone-400">
                      <FaCalendarDays className="h-3 w-3" />
                      {formatTanggal(item.date)}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        );
      })}

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/70 p-4 md:p-8"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-sm bg-white"
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Tutup"
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-stone-600 hover:text-stone-900"
              >
                <FaXmark className="h-4 w-4" />
              </button>
              <div className="relative aspect-[4/3] w-full bg-stone-50">
                <Image
                  src={selected.image}
                  alt={selected.title}
                  fill
                  sizes="(min-width: 768px) 640px, 100vw"
                  className="object-contain"
                />
              </div>
              <div className="border-t border-stone-200 px-5 py-4">
                <CategoryLabel category={selected.category} />
                <h3 className="mt-1 text-base font-semibold text-stone-900">
                  {selected.title}
                </h3>
                <p className="mt-1 text-sm text-stone-500">
                  {selected.issuer} &middot; {formatTanggal(selected.date)}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
