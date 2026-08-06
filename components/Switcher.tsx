"use client";

import { useTransition } from "react";
import { FaGlobe } from "react-icons/fa";
import { usePathname, useRouter } from "@/i18n/navigation";
import { type Locale } from "@/i18n/routing";

interface LocaleToggleProps {
  currentLocale: Locale;
  isScrolled?: boolean;
}

export default function LocaleToggle({
  currentLocale,
  isScrolled = false,
}: LocaleToggleProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const isId = currentLocale === "id";

  function toggle() {
    const next: Locale = isId ? "en" : "id";
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      aria-label={`Switch language to ${isId ? "English" : "Bahasa Indonesia"}`}
      title={isId ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors hover:text-smp-blue disabled:opacity-50 ${
        isScrolled
          ? "border-smp-dark/15  text-smp-dark/80 hover:bg-smp-dark/10"
          : "border-white/15  text-white/80 hover:bg-white/12"
      }`}
    >
      <FaGlobe
        className={`h-4 w-4 ${isPending ? "animate-pulse" : ""}`}
        strokeWidth={2}
      />
      <span className="text-sm font-medium uppercase tracking-wide">
        {currentLocale}
      </span>
    </button>
  );
}
