"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useTranslations } from "next-intl";

// ─── Types & Data ──────────────────────────────────────────────────────────────
interface SlideData {
  id: number;
  image: string;
  ctaHref?: string;
}

const slides: SlideData[] = [
  { id: 1, image: "/carousel/Banner-Carousel-01.png" },
  { id: 2, image: "/carousel/Banner-Carousel-02.png", ctaHref: "/produk" },
  { id: 3, image: "/carousel/Banner-Carousel-03.png", ctaHref: "/kontak" },
  { id: 4, image: "/carousel/Banner-Carousel-04.jpg" },
  { id: 5, image: "/carousel/Banner-Carousel-05.png" },
];

const SLIDE_DURATION = 7000; // ms
const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Component ─────────────────────────────────────────────────────────────────
export default function Carousel() {
  const t = useTranslations("Carousel");
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((i: number) => {
    setCurrent(((i % slides.length) + slides.length) % slides.length);
  }, []);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Autoplay
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    timeoutRef.current = setTimeout(
      () => setCurrent((c) => (c + 1) % slides.length),
      SLIDE_DURATION,
    );
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, isPaused, prefersReducedMotion]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const slide = slides[current];
  const eyebrow = t(`slides.${slide.id}.eyebrow`);
  const title = t(`slides.${slide.id}.title`);
  const subtitle = t(`slides.${slide.id}.subtitle`);
  const ctaLabel = slide.ctaHref ? t(`slides.${slide.id}.ctaLabel`) : undefined;

  // ─── Motion variants ─────────────────────────────────────────────────────────
  const textStagger: Variants = {
    hidden: {},
    visible: {
      transition: prefersReducedMotion
        ? {}
        : { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };
  const item: Variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: EASE },
        },
      };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t("ariaLabel")}
      className="relative h-[88vh] min-h-180 w-full overflow-hidden bg-neutral-950 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* ─── Background image + gradient ─── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 1.2, ease: EASE },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            priority={current === 0}
            className="object-cover"
            loading="eager"
            sizes="100vw"
          />
          {/* Gradasi terarah: gelap di kiri-bawah, transparan di kanan-atas */}
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/70 to-smp-orange/30" />
        </motion.div>
      </AnimatePresence>

      {/* ─── Konten teks: bottom-left, container terkendali ─── */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-24 sm:px-10 sm:pb-28 lg:px-16 lg:pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            variants={textStagger}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="max-w-4xl"
          >
            {eyebrow && (
              <motion.div
                variants={item}
                className="mb-5 flex items-center gap-3"
              >
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-smp-orange">
                  {eyebrow}
                </span>
              </motion.div>
            )}

            <motion.h2
              variants={item}
              className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              {title}
            </motion.h2>

            {subtitle && (
              <motion.p
                variants={item}
                className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
              >
                {subtitle}
              </motion.p>
            )}

            {slide.ctaHref && ctaLabel && (
              <motion.div variants={item} className="mt-8">
                <Link
                  href={slide.ctaHref}
                  className="group/cta inline-flex items-center gap-2 rounded-full border border-white text-white px-6 py-3 text-sm font-semibold transition-all hover:border-smp-blue hover:bg-smp-blue hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-smp-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:text-base"
                >
                  {ctaLabel}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover/cta:translate-x-1"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Bottom bar: segmented progress + counter + arrows ─── */}
      <div className="absolute inset-x-0 bottom-0 z-20 mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 pb-8 sm:px-10 lg:px-16">
        {/* Segmented progress */}
        <div
          role="tablist"
          aria-label={t("selectSlide")}
          className="flex flex-1 items-center gap-2"
        >
          {slides.map((s, i) => {
            const isActive = i === current;
            const isDone = i < current;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={isActive}
                aria-label={t("slideLabel", {
                  number: i + 1,
                  title: t(`slides.${s.id}.title`),
                })}
                onClick={() => goTo(i)}
                className="group/bar relative h-1 flex-1 overflow-hidden rounded-full bg-white/20 transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-smp-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <motion.span
                  key={`${s.id}-${current}-${isPaused ? "p" : "r"}`}
                  className="absolute inset-y-0 left-0 block bg-smp-blue"
                  initial={{ width: isDone ? "100%" : "0%" }}
                  animate={{
                    width: isActive ? "100%" : isDone ? "100%" : "0%",
                  }}
                  transition={
                    isActive && !prefersReducedMotion
                      ? { duration: SLIDE_DURATION / 1000, ease: "linear" }
                      : { duration: 0.3 }
                  }
                />
              </button>
            );
          })}
        </div>

        {/* Counter + arrows */}
        <div className="flex items-center gap-4">
          <div className="hidden font-mono text-xs tabular-nums text-white/70 sm:block">
            <span className="text-white">
              {String(current + 1).padStart(2, "0")}
            </span>
            <span className="mx-1 text-white/40">/</span>
            <span>{String(slides.length).padStart(2, "0")}</span>
          </div>
          <div className="flex items-center gap-2">
            <NavButton onClick={prev} label={t("prevSlide")} dir="prev" />
            <NavButton onClick={next} label={t("nextSlide")} dir="next" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Small subcomponent ────────────────────────────────────────────────────────
function NavButton({
  onClick,
  label,
  dir,
}: {
  onClick: () => void;
  label: string;
  dir: "prev" | "next";
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-smp-blue focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {dir === "prev" ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 18 15 12 9 6" />
        )}
      </svg>
    </button>
  );
}
