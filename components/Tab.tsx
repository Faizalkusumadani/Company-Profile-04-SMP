"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FaGear, FaLayerGroup, FaPhone } from "react-icons/fa6";
import type { IconType } from "react-icons";
import type { ProductVariant } from "@/data/data-produk";

// ─── Icon map ───────────────────────────────────────────────────────────────

const ICONS: Record<string, IconType> = {
  Settings: FaGear,
  Layers: FaLayerGroup,
  Phone: FaPhone,
};

// ─── Types ──────────────────────────────────────────────────────────────────
export interface TabItem {
  id: string;
  label: string;
  icon?: keyof typeof ICONS;
}

export interface ContactInfo {
  title: string;
  description: string;
}

export interface TabsCustomData {
  features: string[];
  variants: ProductVariant[];
  contact: ContactInfo;
}

interface TabsCustomProps {
  tabs: TabItem[];
  data: TabsCustomData;
  defaultTab?: string;
  accent?: "red" | "blue" | "green";
}

const ACCENT_CLASSES: Record<
  NonNullable<TabsCustomProps["accent"]>,
  { text: string; bg: string; ring: string; underline: string }
> = {
  red: {
    text: "text-smp-blue",
    bg: "bg-gray-200",
    ring: "ring-smp-orange/15",
    underline: "bg-smp-orange",
  },
  blue: {
    text: "text-blue-600",
    bg: "bg-blue-50/60",
    ring: "ring-blue-600/15",
    underline: "bg-blue-600",
  },
  green: {
    text: "text-green-600",
    bg: "bg-green-50/60",
    ring: "ring-green-600/15",
    underline: "bg-green-600",
  },
};

export default function TabsCustom({
  tabs,
  data,
  defaultTab,
  accent = "red",
}: TabsCustomProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const accentClasses = ACCENT_CLASSES[accent];

  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  const [activeTab, setActiveTab] = useState<string>(
    () => defaultTab ?? tabs[0]?.id,
  );

  // Jaga-jaga kalau daftar tabs berubah dan activeTab lama sudah tidak ada.
  useEffect(() => {
    if (tabs.length > 0 && !tabs.some((tab) => tab.id === activeTab)) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs, activeTab]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateFade = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setShowLeftFade(scrollLeft > 4);
      setShowRightFade(scrollLeft < scrollWidth - clientWidth - 4);
    };

    updateFade();
    el.addEventListener("scroll", updateFade, { passive: true });
    window.addEventListener("resize", updateFade);
    return () => {
      el.removeEventListener("scroll", updateFade);
      window.removeEventListener("resize", updateFade);
    };
  }, [tabs]);

  // Menggunakan manual container scroll untuk mencegah kegagalan viewport
  // shifting di mobile.
  const handleSelectTab = (value: string, buttonEl: HTMLButtonElement) => {
    setActiveTab(value);

    const container = scrollRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const buttonLeft = buttonEl.offsetLeft;
    const buttonWidth = buttonEl.clientWidth;

    const targetScrollLeft = buttonLeft - containerWidth / 2 + buttonWidth / 2;

    container.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });
  };

  if (tabs.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-gray-400">
        Tidak ada data untuk ditampilkan.
      </p>
    );
  }

  return (
    <div>
      {/* Tab menu */}
      <div className="relative mb-8 border-b border-slate-200">
        <motion.div
          ref={scrollRef}
          layoutScroll
          role="tablist"
          aria-label="Tab produk"
          className="flex snap-x snap-proximity touch-pan-x gap-1 overflow-x-auto overscroll-x-contain px-1 scroll-smooth [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] scrollbar-none sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon ? ICONS[tab.icon] : undefined;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={(e) => handleSelectTab(tab.id, e.currentTarget)}
                className={`relative flex shrink-0 snap-start select-none items-center gap-2 whitespace-nowrap rounded-t-lg px-4 py-3 text-sm md:text-base font-medium outline-none transition-colors duration-200 [-webkit-tap-highlight-color:transparent] focus-visible:ring-2 focus-visible:ring-reddmas-red/40 focus-visible:ring-offset-2 sm:px-5 sm:py-3.5 ${
                  isActive
                    ? `${accentClasses.bg} ${accentClasses.text} font-semibold`
                    : `text-slate-500 hover:bg-slate-50 hover:${accentClasses.text} active:bg-slate-100`
                }`}
              >
                {Icon && <Icon className="relative z-10 h-5 w-5" />}
                <span className="relative z-10">{tab.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="product-tab-underline"
                    className={`absolute inset-x-0 -bottom-px h-0.5 ${accentClasses.underline}`}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-white to-transparent transition-opacity duration-200 sm:hidden ${
            showLeftFade ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-white to-transparent transition-opacity duration-200 sm:hidden ${
            showRightFade ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Konten tab */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {activeTab === "fitur" && (
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {data.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-700 shadow-sm"
                >
                  {feature}
                </li>
              ))}
              {data.features.length === 0 && (
                <p className="col-span-full py-10 text-center text-sm text-gray-400">
                  Belum ada fitur untuk ditampilkan.
                </p>
              )}
            </ul>
          )}

          {activeTab === "tipe" && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
              {data.variants.map((variant) => (
                <div
                  key={variant.id ?? variant.name}
                  className="flex flex-col items-center"
                >
                  <div className="group relative flex h-48 sm:h-56 w-full flex-col items-center justify-center gap-1 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm transition hover:-translate-y-0.5 hover:border-reddmas-red/40 hover:shadow-md sm:px-8">
                    <div
                      className={`pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ${accentClasses.ring} transition group-hover:opacity-100`}
                    />
                    {variant.image && (
                      <Image
                        src={variant.image}
                        alt={variant.name}
                        width={220}
                        height={80}
                        className="h-30 sm:h-40 w-auto max-w-full object-contain transition "
                      />
                    )}
                  </div>
                  {/* Nama varian dirender di luar card */}
                  <h2 className="mt-2 text-center text-sm font-medium text-slate-700">
                    {variant.name}
                  </h2>
                </div>
              ))}
              {data.variants.length === 0 && (
                <p className="col-span-full py-10 text-center text-sm text-gray-400">
                  Belum ada varian untuk ditampilkan.
                </p>
              )}
            </div>
          )}

          {activeTab === "kontak" && (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-8 text-center shadow-sm sm:px-10 sm:py-12">
              <h3 className="text-lg font-semibold text-slate-800 sm:text-xl">
                {data.contact.title}
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 sm:text-base">
                {data.contact.description}
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
