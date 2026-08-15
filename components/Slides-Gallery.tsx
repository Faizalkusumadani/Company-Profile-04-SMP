"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface PhotoGalleryProps {
  images: string[];
  alt: string;
  autoplayDelay?: number;
}

const CROSSFADE: Transition = {
  duration: 0.5,
  ease: [0.25, 0.46, 0.45, 0.94],
};

export default function PhotoGallery({
  images,
  alt,
  autoplayDelay = 5000,
}: PhotoGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = images.length;
  const hasMultiple = total > 1;
  const shouldReduceMotion = useReducedMotion();

  const goTo = useCallback(
    (index: number) => setCurrent((index + total) % total),
    [total],
  );
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);
  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);

  // ── Autoplay: berhenti saat hover, fokus keyboard, atau reduced-motion ──
  useEffect(() => {
    if (!hasMultiple || isPaused || shouldReduceMotion || autoplayDelay <= 0) {
      return;
    }
    const timer = setInterval(goNext, autoplayDelay);
    return () => clearInterval(timer);
  }, [hasMultiple, isPaused, shouldReduceMotion, autoplayDelay, goNext]);

  // ── Prioritaskan slide aktif + tetangga kiri/kanan agar tidak ada jeda
  //    loading saat crossfade (semua gambar sudah ter-mount, ini hanya
  //    menaikkan fetch priority-nya) ──
  const priorityIndexes = useMemo(() => {
    if (!hasMultiple) return new Set([0]);
    return new Set([
      current,
      (current - 1 + total) % total,
      (current + 1) % total,
    ]);
  }, [current, total, hasMultiple]);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* ── Foto Utama ── */}
      <div className="group relative h-75 lg:h-160 rounded-lg overflow-hidden bg-gray-100">
        {/*
          Semua gambar tetap ter-mount & bertumpuk (absolute inset-0); yang
          dianimasikan hanya opacity-nya. Ini membuat transisi benar-benar
          overlap (crossfade) alih-alih exit-lalu-enter seperti sebelumnya,
          sehingga bg-gray-100 di baliknya tidak pernah sempat terlihat.
        */}
        {images.map((src, i) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: i === current ? 1 : 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : CROSSFADE}
            style={{ zIndex: i === current ? 1 : 0 }}
            aria-hidden={i === current ? undefined : true}
          >
            <Image
              src={src}
              alt={i === current ? alt : ""}
              fill
              sizes="(max-width: 1024px) 100vw, 750px"
              className="object-cover"
              priority={priorityIndexes.has(i)}
            />
          </motion.div>
        ))}

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-200 hover:bg-black/60 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              aria-label="Foto sebelumnya"
            >
              <IoChevronBackOutline className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-200 hover:bg-black/60 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              aria-label="Foto berikutnya"
            >
              <IoChevronForwardOutline className="w-5 h-5" aria-hidden="true" />
            </button>
          </>
        )}

        {hasMultiple &&
          !isPaused &&
          !shouldReduceMotion &&
          autoplayDelay > 0 && (
            <motion.div
              key={`progress-${current}`}
              className="absolute bottom-0 left-0 h-1 bg-mas-red z-10 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: autoplayDelay / 1000, ease: "linear" }}
              style={{ width: "100%" }}
              aria-hidden="true"
            />
          )}
      </div>

      {/* ── Thumbnail Strip ── */}
      {hasMultiple && (
        <div className="flex gap-3 mt-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Lihat foto ${i + 1} dari ${total}`}
              aria-current={i === current ? "true" : undefined}
              className={`relative shrink-0 w-24 h-16 sm:w-35 sm:h-24 rounded-md overflow-hidden transition-all focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-mas-red focus-visible:outline-offset-2 ${
                i === current
                  ? "ring-1 ring-mas-red opacity-100"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
