"use client";

import { motion, useReducedMotion } from "framer-motion";

const MARQUEE_TEXT = "Sinergi Mandiri Perkasa";
const REPEAT_COUNT = 8; // Perbanyak jika teks pendek / layar sangat lebar

/**
 * Pembatas footer bergaya marquee (scrolling strip) miring - lebih modern
 * dan dinamis dibanding pita datar sebelumnya. Menggunakan Framer Motion
 * (sesuai stack yang sudah dipakai di project ini) untuk animasi loop
 * yang mulus, dan menghormati preferensi "reduced motion" pengguna.
 *
 * Cara kerja loop mulus: konten digandakan 2x (REPEAT_COUNT * 2), lalu
 * di-animate dari x: 0% ke x: -50%. Karena separuh kedua adalah duplikat
 * persis separuh pertama, saat animasi "reset" ke 0% tampilannya identik
 * sehingga terlihat menyambung tanpa jeda.
 */
export default function FooterMarquee() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full overflow-hidden py-8 sm:py-10">
      <div className="-rotate-1 sm:-rotate-2 w-[120%] -ml-[10%] bg-smp-orange shadow-[0_10px_30px_-6px_rgba(0,0,0,0.25)]">
        <motion.div
          className="flex whitespace-nowrap py-3 sm:py-4 will-change-transform"
          animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: REPEAT_COUNT * 2 }).map((_, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-4 sm:gap-6 px-4 sm:px-6 text-sm sm:text-base font-bold uppercase tracking-wide text-white"
            >
              {MARQUEE_TEXT}
              <span
                className="text-base text-white/60 sm:text-lg"
                aria-hidden="true"
              >
                ✦
              </span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
