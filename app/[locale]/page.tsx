"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion as m, useReducedMotion, AnimatePresence } from "framer-motion";
import { IoArrowForward } from "react-icons/io5";
import { useTranslations } from "next-intl";
import features from "@/data/features";
import faqs from "@/data/data-faq";
import productCategories from "@/data/data-category";
import BrandMarquee from "@/components/Brandmarquue";
import { brandData } from "@/data/data-principle";
import StatItem from "@/components/Stat";
import Carousel from "@/components/Carousel";

// ─── Komponen Lokal: FAQ Accordion Item ───
const FaqItem = ({ faqKey, index }: { faqKey: string; index: number }) => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-start justify-between gap-4 py-5 sm:py-6 text-left group focus-visible:outline-none"
      >
        <span className="flex items-start gap-2 sm:gap-3 pr-2">
          <span className="shrink-0 text-smp-orange/80 text-sm sm:text-base font-mono pt-0.5">
            {String(index + 1).padStart(2, "0")}.
          </span>
          <span
            className={`text-base sm:text-lg font-medium transition-colors duration-300 ${
              isOpen
                ? "text-smp-blue"
                : "text-foreground group-hover:text-smp-blue"
            }`}
          >
            {t(`home_FAQ.items.${faqKey}.q`)}
          </span>
        </span>
        <div
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 mt-0.5 ${
            isOpen
              ? "text-blue"
              : "text-smp-muted group-hover:bg-smp-blue/10 group-hover:text-smp-blue"
          }`}
        >
          <m.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </m.svg>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 pt-1 text-smp-muted text-sm sm:text-base leading-relaxed pr-10 pl-7 sm:pl-8">
              {t(`home_FAQ.items.${faqKey}.a`)}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Main Component ───
export default function Home() {
  const t = useTranslations();
  const shouldReduceMotion = useReducedMotion();

  const stats = [
    { number: "10+", labelKey: "stat.label_01" },
    { number: "550+", labelKey: "stat.label_02" },
    { number: "2", labelKey: "stat.label_03" },
    { number: "2014", labelKey: "stat.label_04" },
  ];

  return (
    <div className="relative w-full min-h-screen">
      <header className="relative w-full h-auto min-h-90 overflow-hidden">
        <Carousel />
      </header>

      {/* ── About Section ── */}
      <section id="home_about" className="px-4 py-10 sm:py-16 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center">
            {/* Text Side (Kiri) */}
            <m.div
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.08,
              }}
              className="order-1 lg:order-1 space-y-4 sm:space-y-6"
            >
              <div>
                <span className="text-smp-orange uppercase font-medium tracking-[0.25em] text-xs sm:text-sm">
                  {t("home_about.title")}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[60px] font-semibold text-foreground tracking-tight leading-tight">
                Sinergi Mandiri Perkasa
              </h1>

              <div className="text-sm sm:text-base md:text-lg text-smp-muted leading-relaxed text-justify [text-align-last:start] space-y-3">
                {t
                  .raw("home_about.overview.desc")
                  .map((paragraph: string, index: number) => (
                    <p key={index} className="mb-3">
                      {paragraph}
                    </p>
                  ))}
              </div>

              <div className="pt-2 sm:pt-4">
                <Link
                  href="/tentang-kami/profil-perusahaan"
                  className="inline-flex items-center gap-3 border border-smp-blue text-smp-blue font-medium px-7 py-3 sm:px-8 sm:py-3.5 rounded-full transition-all duration-300 hover:bg-smp-blue hover:text-white shadow-sm hover:shadow-md group"
                >
                  <span>{t("home_about.cta")}</span>
                  <IoArrowForward
                    className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </m.div>

            {/* Image Side (Kanan) */}
            <m.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative w-full aspect-square flex items-center justify-center">
                <div
                  className="absolute w-72 h-72 sm:w-md sm:h-112 rounded-full bg-smp-orange/30 blur-3xl"
                  aria-hidden="true"
                />
                <Image
                  src="/images/ps-home.png"
                  width={900}
                  height={1150}
                  priority
                  quality={75}
                  sizes="(max-width: 640px) 70vw, (max-width: 1024px) 35vw, 440px"
                  className="w-full h-full z-10 object-contain mask-[linear-gradient(to_bottom,black_70%,transparent_100%)]"
                  alt="Tim PT Sinergi Mandiri Perkasa"
                />
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* ── Section Stat ── */}
      <section id="home_stat">
        <div className="px-4 sm:px-6 py-4 md:py-8  bg-zinc-50">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x-0 divide-y-0">
              {stats.map((stat, index) => {
                const borderClasses = [
                  index % 2 === 0 && index < stats.length - 1
                    ? "border-r border-gray-200"
                    : "",
                  index < stats.length - 1
                    ? "sm:border-r sm:border-gray-200"
                    : "sm:border-r-0",
                  index < 2 ? "border-b border-gray-200 sm:border-b-0" : "",
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <div key={stat.labelKey} className={borderClasses}>
                    <StatItem
                      number={stat.number}
                      label={t(stat.labelKey)}
                      index={index}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section Features ── */}
      <section
        id="home_features"
        className="relative isolate overflow-hidden px-4 py-16 sm:py-20 lg:py-24"
      >
        <Image
          src="/carousel/background-features.png"
          width={900}
          height={700}
          quality={70}
          sizes="(max-width: 600px) 480px, (max-width: 1024px) 800px, 1280px"
          alt="Gedung IMS"
          className="absolute inset-0 -z-20 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/80 via-black/70 to-black/80" />

        <div className="relative mx-auto max-w-7xl">
          <m.div
            className="flex flex-col items-center text-center mb-10 sm:mb-14 space-y-4 sm:space-y-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="text-smp-orange uppercase font-medium tracking-[0.25em] text-xs sm:text-sm">
              {t("home_features.desc")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight tracking-tight">
              {t("home_features.tag")} {t("home_features.header_01")}
            </h2>
          </m.div>

          {/* List fitur transparan di atas foto, dipisah divider putih tipis */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-3 divide-y divide-white/15 md:divide-y-0"
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const isLeftEdge = index % 3 === 0;
              const isTopRow = index < 3;

              return (
                <div
                  key={feature.key ?? index}
                  className={`group flex items-start gap-4 p-6 sm:p-7 transition-colors duration-300 hover:bg-white/5 ${
                    !isLeftEdge ? "md:border-l md:border-white/15" : ""
                  } ${!isTopRow ? "md:border-t md:border-white/15" : ""}`}
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-white/10 border border-white/25 text-white flex items-center justify-center transition-colors duration-300 group-hover:border-smp-blue group-hover:bg-smp-blue">
                    <IconComponent
                      className="w-5 h-5"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-white leading-snug mb-1.5 transition-colors duration-300 group-hover:text-smp-blue">
                      {t(`home_features.${feature.key}.title`)}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {t(`home_features.${feature.key}.desc`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </m.div>
        </div>
      </section>

      {/* ── Section Kategori Produk ── */}
      <section className="px-4 py-20 sm:py-24  border-t border-gray-200">
        <div className="mx-auto max-w-7xl">
          {/* Header Kategori */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <m.div
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <span className="text-smp-orange uppercase font-medium tracking-[0.25em] text-xs sm:text-sm block mb-3">
                {t("home_product.tag")}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-[60px] font-semibold text-foreground tracking-tight leading-snug mb-3">
                {t("home_product.header")}
              </h2>
              <p className="text-smp-muted font-normal text-base">
                {t("home_product.desc")}
              </p>
            </m.div>
            <m.div
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link
                href="/produk"
                className="inline-flex items-center gap-2 text-foreground font-medium hover:text-smp-blue transition-colors duration-300 group"
              >
                {t("home_product.cta")}
                <IoArrowForward className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </m.div>
          </div>

          {/* Split Layout: Gambar + List Kategori */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            <m.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2 lg:sticky lg:top-32"
            >
              <div className="relative w-full aspect-square flex items-center justify-center">
                <div
                  className="absolute w-72 h-72 sm:w-md sm:h-112 rounded-full bg-smp-orange/30 blur-3xl"
                  aria-hidden="true"
                />
                <Image
                  src="/images/cs-home-01.png"
                  width={900}
                  height={1150}
                  quality={70}
                  sizes="(max-width: 1024px) 70vw, 31vw"
                  className="w-full h-full z-10 object-contain mask-[linear-gradient(to_bottom,black_70%,transparent_100%)]"
                  alt="Produk PT Mega Adhitama Sejati"
                />
              </div>
            </m.div>

            {/* List Kategori (kanan) */}
            <div className="lg:col-span-3 divide-y divide-gray-200 border-y border-gray-200">
              {productCategories.map((cat, index) => (
                <m.div
                  key={cat.id}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={cat.href}
                    className="group flex items-center gap-5 sm:gap-7 py-7 sm:py-8"
                  >
                    <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-smp-blue transition-colors duration-300 group-hover:bg-smp-blue group-hover:border-smp-blue group-hover:text-white">
                      <cat.icon className="w-7 h-7" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1.5 transition-colors duration-300 group-hover:text-smp-blue">
                        {t(`home_product.${cat.key}.title`)}
                      </h3>
                      <p className="text-smp-muted leading-relaxed text-sm sm:text-base">
                        {t(`home_product.${cat.key}.desc`)}
                      </p>
                    </div>

                    <div className="shrink-0 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 transition-all duration-300 group-hover:bg-smp-blue group-hover:border-smp-blue group-hover:text-white">
                      <IoArrowForward className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                  </Link>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/*Section Brandmarquee */}
      <section id="home_brandmarquee">
        <BrandMarquee
          brands={brandData}
          title={t("home_product.header_brandmarquee")}
        />
      </section>

      {/* ── Section FAQ ── */}
      <section id="home_FAQ" className="px-4 py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Kolom Kanan: Accordion List */}
            <m.div
              className="order-2 lg:order-1 lg:col-span-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="border-t border-gray-200">
                {faqs.map((faq, index) => (
                  <FaqItem key={faq.key} faqKey={faq.key} index={index} />
                ))}
              </div>
            </m.div>
            {/* Kolom Kiri: Header FAQ */}
            <m.div
              className="order-1 lg:order-1 lg:col-span-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="sticky top-32">
                <span className="text-smp-orange uppercase font-medium tracking-[0.25em] text-xs sm:text-sm block  mb-3">
                  {t("home_FAQ.tag")}
                </span>
                <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight mb-6 leading-tight">
                  {t("home_FAQ.header_01")} <br className="hidden sm:block" />
                  {t("home_FAQ.header_02")}
                </h2>
                <p className="text-smp-muted text-base leading-relaxed mb-8 max-w-md">
                  {t("home_FAQ.desc")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/kontak"
                    className="inline-flex justify-center items-center gap-2 bg-smp-blue text-white font-medium px-7 py-3 rounded-full transition-all duration-300 hover:bg-foreground hover:shadow-lg"
                  >
                    {t("home_FAQ.cta")}
                  </Link>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </section>
    </div>
  );
}
