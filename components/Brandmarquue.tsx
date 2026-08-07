"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Brand } from "@/data/data-principle";

interface BrandMarqueeProps {
  brands: Brand[];
  title?: string;
  speed?: number;
}

export default function BrandMarquee({
  brands,
  title,
  speed = 60, // Diubah ke 60 agar jauh lebih lambat dan elegan
}: BrandMarqueeProps) {
  const duplicatedBrands = [...brands, ...brands];

  // Menggunakan state untuk melacak saat user melakukan hover
  const [isHovered, setIsHovered] = useState(false);

  // Custom Motion Value untuk menyimpan koordinat "x"
  const baseX = useMotionValue(0);

  // Animasi frame-by-frame untuk menggantikan fungsi animate={}
  useAnimationFrame((time, delta) => {
    // 1. Jika di-hover, hentikan kalkulasi pergerakan (Pause efek)
    if (isHovered) return;

    // 2. Kalkulasi seberapa jauh elemen bergerak setiap frame (ms)
    // Berjalan 50% jarak sesuai durasi speed yang ditentukan
    const moveBy = (50 / speed) * (delta / 1000);
    let newX = baseX.get() - moveBy;

    // 3. Reset posisi secara matematis/mulus saat menembus titik -50% (Infinite loop)
    if (newX <= -50) {
      newX += 50;
    }

    baseX.set(newX);
  });

  // Konversi nilai angka menjadi format persentase (%)
  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <section className="py-16 bg-gray-50 dark:bg-neutral-900 border-y border-gray-100 dark:border-neutral-800 overflow-hidden">
      {title && (
        <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
          <h2 className="text-xs md:text-sm font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
            {title}
          </h2>
        </div>
      )}

      {/* Mask Gradient untuk efek Fade di kiri-kanan */}
      <div className="relative w-full overflow-hidden flex mask-[linear-gradient(to_right,transparent_0%,white_10%,white_90%,transparent_100%)]">
        <motion.div
          className="flex items-center gap-16 md:gap-24 flex-nowrap min-w-max pr-16 md:pr-24"
          // Gunakan custom style x yang sudah kita ikat dengan AnimationFrame
          style={{ x }}
          // Event listener Next.js/React murni untuk deteksi Mouse Hover
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="flex items-center justify-center opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <div className="relative w-36 md:w-52 h-18 md:h-22  flex items-center justify-center">
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    fill
                    quality={65}
                    sizes="auto"
                    className="object-contain"
                  />
                ) : (
                  <span className="text-2xl md:text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-200 select-none">
                    {brand.name}
                  </span>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
