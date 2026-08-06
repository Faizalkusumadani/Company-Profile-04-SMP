"use client";
import { Link } from "@/i18n/navigation";
import { useState, type ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  IoConstructOutline,
  IoWaterOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import produkDetailList, { type Product } from "@/data/data-produk";

type CategoryTab = {
  id: string;
  i18nKey: string;
  icon: ReactNode;
};

const CATEGORY_TABS: CategoryTab[] = [
  {
    id: "all",
    i18nKey: "category_00",
    icon: (
      <svg
        className="w-8 h-8 md:w-13 md:h-13"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
      </svg>
    ),
  },
  {
    id: "building",
    i18nKey: "category_01",
    icon: <IoConstructOutline className="w-8 h-8 md:w-13 md:h-13" />,
  },
  {
    id: "sanitary",
    i18nKey: "category_02",
    icon: <IoWaterOutline className="w-8 h-8 md:w-13 md:h-13" />,
  },
  {
    id: "safety",
    i18nKey: "category_03",
    icon: <IoShieldCheckmarkOutline className="w-8 h-8 md:w-13 md:h-13" />,
  },
];

function getCategoryLabel(
  t: ReturnType<typeof useTranslations>,
  categoryId: Product["category"],
) {
  const tab = CATEGORY_TABS.find((tab) => tab.id === categoryId);
  return tab ? t(`product.${tab.i18nKey}.title`) : categoryId;
}

export default function ProductCatalog() {
  const [activeTab, setActiveTab] = useState("all");
  const t = useTranslations();
  const products = produkDetailList;

  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter((product) => product.category === activeTab);

  return (
    <div className="w-full flex flex-col items-center">
      {/* ============================================================
          HEADER — judul halaman produk
      ============================================================ */}
      <div className="text-center mb-16 flex flex-col items-center gap-4 md:gap-6">
        <span className="text-smp-orange uppercase font-light tracking-[0.25em] text-xs sm:text-sm block">
          {t("product.tag_pages")}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
          {t("product.header_pages")}
        </h2>
        <p className="text-smp-muted text-sm md:text-base">
          {t("product.desc_pages")}
        </p>
      </div>

      {/* ============================================================
          TABS — filter kategori
      ============================================================ */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 w-full max-w-6xl">
        {CATEGORY_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center w-32 h-32 md:w-44 md:h-44 rounded-2xl border transition-all duration-300 ${
                isActive
                  ? "border-smp-blue text-smp-blue bg-white shadow-sm"
                  : "border-gray-100 bg-white text-slate-500 hover:border-gray-300 hover:shadow-md"
              }`}
            >
              <div
                className={`mb-3 transition-colors ${isActive ? "text-smp-blue" : "text-smp-blue/60"}`}
              >
                {tab.icon}
              </div>
              <span className="font-medium text-xs md:text-base text-center px-2">
                {t(`product.${tab.i18nKey}.title`)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Indikator jumlah produk */}
      <div className="text-center text-slate-500 text-sm mb-8">
        Menampilkan{" "}
        <span className="font-semibold text-smp-orange">
          {filteredProducts.length}
        </span>{" "}
        produk
      </div>

      {/* ============================================================
          GRID PRODUK — card digabung langsung di sini
      ============================================================ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group  bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Area gambar */}
              <div className="relative h-44 sm:h-56 bg-linear-to-br from-smp-orange/20 to-smp-orange/50 overflow-hidden shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Badge jumlah varian */}
                {product.itemsBadge && (
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                    <span className="bg-white/95 backdrop-blur-sm px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold text-gray-500 shadow-md">
                      {product.itemsBadge}
                    </span>
                  </div>
                )}

                {/* Badge diskon — opsional, hanya tampil kalau ada nilainya */}
                {product.discount && product.discount !== "" && (
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <div className="bg-smp-orange text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg animate-pulse">
                      -{product.discount}%
                    </div>
                  </div>
                )}

                {/* Quick View Overlay - Desktop only (hover) */}
                <div className="absolute inset-0 bg-black/50 opacity-0 hidden md:flex md:group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
                  <Link
                    href={product.href ?? `/produk/${product.slug}`}
                    className="bg-white border border-smp-blue text-smp-blue px-6 py-2.5 rounded-full font-semibold text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-smp-blue hover:text-white"
                  >
                    {t("product.cta")}
                  </Link>
                </div>
              </div>

              {/* Konten card */}
              <div className="p-3.5 sm:p-5 flex flex-col grow">
                <h3 className="font-bold mb-1.5 sm:mb-2 text-foreground text-sm sm:text-lg line-clamp-2 group-hover:text-smp-blue transition-colors leading-snug">
                  {product.name.trim()}
                </h3>
                <span className="inline-block text-[11px] sm:text-xs font-medium text-smp-blue mb-2 sm:mb-3">
                  {getCategoryLabel(t, product.category)}
                </span>
                <p className="text-sm text-slate-500 line-clamp-3">
                  {t(`product.${product.descKey}`)}
                </p>

                {/* CTA "Lihat Detail" — selalu tampil di mobile (tanpa hover) */}
                <Link
                  href={product.href ?? `/produk/${product.slug}`}
                  className="mt-auto pt-3 border-t border-gray-100 flex md:hidden items-center justify-center gap-1.5 text-smp-blue font-semibold text-xs active:scale-95 transition-transform"
                >
                  {t("product.cta")}
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 py-10">
            Produk untuk kategori ini belum tersedia.
          </div>
        )}
      </div>
    </div>
  );
}
