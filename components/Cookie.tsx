"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

function gtagUpdate(granted: boolean) {
  const state = granted ? "granted" : "denied";
  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push([
    "consent",
    "update",
    {
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      analytics_storage: state,
    },
  ]);
}

export default function CookieConsent() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    const stored = localStorage.getItem("cookie_consent");
    if (!stored) banner.style.display = "flex";
  }, []);

  const choose = (granted: boolean) => {
    localStorage.setItem("cookie_consent", granted ? "granted" : "denied");
    gtagUpdate(granted);
    if (bannerRef.current) bannerRef.current.style.display = "none";
  };

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-live="polite"
      aria-label="Persetujuan cookie"
      style={{ display: "none" }}
      className="fixed inset-x-0 bottom-0 z-9998 flex-col gap-3 border-t border-zinc-200 bg-white p-4 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] md:flex-row md:items-center md:justify-between md:px-8"
    >
      <p className="text-sm text-smp-muted">{t("cookie.desc")}</p>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => choose(false)}
          className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
        >
          {t("cookie.cta-02")}
        </button>
        <button
          type="button"
          onClick={() => choose(true)}
          className="rounded-full bg-smp-blue px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          {t("cookie.cta-01")}
        </button>
      </div>
    </div>
  );
}
