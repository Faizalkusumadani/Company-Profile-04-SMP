"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import LocaleToggle from "@/components/Switcher";
import Search from "@/components/Search";
import { Link, usePathname } from "@/i18n/navigation";
import { type Locale } from "@/i18n/routing";
import {
  IoBusinessOutline,
  IoEyeOutline,
  IoHeartOutline,
  IoPeopleOutline,
  IoTrophyOutline,
  IoCubeOutline,
  IoNewspaperOutline,
  IoCalendarOutline,
} from "react-icons/io5";
import { type ReactNode } from "react";

// ─── Types & Data ──────────────────────────────────────────────────────────────
interface NavItem {
  href?: string;
  labelKey: string;
  children?: {
    href: string;
    labelKey: string;
    descKey?: string;
    icon?: ReactNode;
  }[];
}

const navItems: NavItem[] = [
  { href: "/", labelKey: "nav.home" },
  {
    labelKey: "nav.about",
    children: [
      {
        href: "/tentang-kami/profil-perusahaan",
        labelKey: "nav.profile",
        descKey: "nav.profile_desc",
        icon: <IoBusinessOutline className="h-4.5 w-4.5" />,
      },
      {
        href: "/tentang-kami/visi-misi",
        labelKey: "nav.vision-mision",
        descKey: "nav.vision-mision_desc",
        icon: <IoEyeOutline className="h-4.5 w-4.5" />,
      },
      {
        href: "/tentang-kami/nilai-nilai",
        labelKey: "nav.value",
        descKey: "nav.value_desc",
        icon: <IoHeartOutline className="h-4.5 w-4.5" />,
      },
      {
        href: "/tentang-kami/manajemen",
        labelKey: "nav.management",
        descKey: "nav.management_desc",
        icon: <IoPeopleOutline className="h-4.5 w-4.5" />,
      },
      {
        href: "/tentang-kami/pencapaian",
        labelKey: "nav.achievement",
        descKey: "nav.achievement_desc",
        icon: <IoTrophyOutline className="h-4.5 w-4.5" />,
      },
      {
        href: "/tentang-kami/logistik",
        labelKey: "nav.logistics",
        descKey: "nav.logistics_desc",
        icon: <IoCubeOutline className="h-4.5 w-4.5" />,
      },
    ],
  },
  { href: "/produk", labelKey: "nav.product" },
  {
    labelKey: "nav.news",
    children: [
      {
        href: "/ruang-informasi/berita",
        labelKey: "nav.news_company",
        descKey: "nav.news_company_desc",
        icon: <IoNewspaperOutline className="h-4.5 w-4.5" />,
      },
      {
        href: "/ruang-informasi/kegiatan",
        labelKey: "nav.activity_company",
        descKey: "nav.activity_company_desc",
        icon: <IoCalendarOutline className="h-4.5 w-4.5" />,
      },
    ],
  },
  { href: "/karir", labelKey: "nav.career" },
  { href: "/kontak", labelKey: "nav.contact" },
];

const SCROLL_THRESHOLD = 70;

// ─── Helpers ───────────────────────────────────────────────────────────────────
function stripLocale(path: string) {
  return path.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";
}

function isPathActive(pathname: string, href: string) {
  const clean = stripLocale(pathname);
  if (href === "/") return clean === "/";
  return clean === href || clean.startsWith(`${href}/`);
}

function getActiveState(pathname: string, item: NavItem) {
  const childActive =
    item.children?.some((c) => isPathActive(pathname, c.href)) ?? false;
  const selfActive = item.href ? isPathActive(pathname, item.href) : false;
  return selfActive || childActive;
}

// Shared scroll-state hook: dipakai Desktop & Mobile navbar supaya style
// mengikuti React render cycle (bukan manipulasi classList langsung ke DOM).
function useIsScrolled(threshold: number) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > threshold);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}

// ─── Shared: Logo ──────────────────────────────────────────────────────────────
function NavLogo({
  onClick,
  isScrolled = false,
  compact = false,
}: {
  onClick?: () => void;
  isScrolled?: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex min-w-0 shrink-0 items-center gap-2"
      aria-label="Sinergi Mandiri Perkasa"
    >
      <Image
        src="/logo/logo-smp.png"
        alt=""
        width={120}
        height={80}
        className={`shrink-0 object-contain ${
          compact ? "h-14 w-14" : "h-20 w-20"
        }`}
        priority
        fetchPriority="high"
      />
      <span className="flex min-w-0 flex-col leading-tight">
        <span
          className={`whitespace-nowrap font-medium transition-colors duration-300 ${
            compact ? "text-sm" : "text-sm sm:text-base"
          } ${isScrolled ? "text-smp-dark" : "text-white"}`}
        >
          Sinergi
        </span>
        <span
          className={`whitespace-nowrap font-medium text-smp-blue ${
            compact ? "text-sm" : "text-sm sm:text-base"
          }`}
        >
          Mandiri Perkasa
        </span>
      </span>
    </Link>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// DESKTOP
function DesktopDropdown({
  items,
  pathname,
}: {
  items: {
    href: string;
    labelKey: string;
    descKey?: string;
    icon?: ReactNode;
  }[];
  pathname: string;
}) {
  const t = useTranslations();
  const hasIcons = items.some((item) => item.icon);

  return (
    <motion.ul
      initial={{ opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute left-0 top-full z-50 mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl shadow-black/40 backdrop-blur-xl ${
        hasIcons
          ? items.length > 2
            ? "grid w-180 grid-cols-2 gap-1"
            : "grid w-110 grid-cols-1 gap-1"
          : "w-86"
      }`}
    >
      {items.map((item) => {
        const active = isPathActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex items-start gap-3 rounded-xl px-3.5 py-3 text-sm transition-colors ${
                active
                  ? "bg-gray-100 text-smp-blue"
                  : "text-smp-dark hover:bg-gray-100 hover:text-smp-blue"
              }`}
            >
              {item.icon && (
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    active
                      ? "bg-smp-blue/10 text-smp-blue"
                      : "bg-gray-100 text-smp-dark/60"
                  }`}
                >
                  {item.icon}
                </span>
              )}
              <span className="flex-1 min-w-0">
                <span className="flex items-center gap-2">
                  <span className="truncate">{t(item.labelKey)}</span>
                  {active && (
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-smp-blue" />
                  )}
                </span>
                {item.descKey && (
                  <span className="mt-0.5 block text-xs font-normal leading-snug text-smp-dark/45">
                    {t(item.descKey)}
                  </span>
                )}
              </span>
            </Link>
          </li>
        );
      })}
    </motion.ul>
  );
}

// active link indicator
function DesktopNavUnderline({ show }: { show: boolean }) {
  return (
    <motion.span
      initial={false}
      animate={{ scaleX: show ? 1 : 0, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      style={{ originX: 0.5 }}
      className="pointer-events-none absolute -bottom-0.5 left-0 right-0 h-px rounded-full bg-smp-blue"
    />
  );
}

function DesktopNavItem({
  item,
  pathname,
  isScrolled,
}: {
  item: NavItem;
  pathname: string;
  isScrolled: boolean;
}) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearCloseTimer() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function handleMouseEnter() {
    clearCloseTimer();
    setOpen(true);
  }

  function handleMouseLeave() {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  useEffect(() => clearCloseTimer, []);

  const active = getActiveState(pathname, item);

  if (item.children) {
    return (
      <li
        ref={ref}
        className="group relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="menu"
          className={`flex items-center gap-1.5 py-2 text-sm font-normal transition-colors sm:text-base ${
            active
              ? "text-smp-blue"
              : isScrolled
                ? "text-smp-dark/75 group-hover:text-smp-blue"
                : "text-white/70 group-hover:text-smp-blue"
          }`}
        >
          {t(item.labelKey)}
          <motion.svg
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </button>
        {/* PERBAIKAN DI SINI: Menyembunyikan baris hover CSS jika menu dropdown berstatus active */}
        <span
          className={`pointer-events-none absolute -bottom-0.5 left-0 right-0 h-px origin-center scale-x-0 rounded-full bg-smp-blue opacity-0 transition-all duration-200 ${
            active
              ? "group-hover:scale-x-0"
              : "group-hover:scale-x-100 group-hover:opacity-100"
          }`}
        />
        {active && <DesktopNavUnderline show />}
        <AnimatePresence>
          {open && (
            <DesktopDropdown items={item.children} pathname={pathname} />
          )}
        </AnimatePresence>
      </li>
    );
  }

  return (
    <li className="group relative">
      <Link
        href={item.href!}
        className={`inline-block py-2 text-sm font-normal transition-colors sm:text-base ${
          active
            ? "text-smp-blue"
            : isScrolled
              ? "text-smp-dark/75 group-hover:text-smp-blue"
              : "text-white/70 group-hover:text-smp-blue"
        }`}
      >
        {t(item.labelKey)}
      </Link>
      {/* PERBAIKAN DI SINI: Menyembunyikan baris hover CSS jika link biasa berstatus active */}
      <span
        className={`pointer-events-none absolute -bottom-0.5 left-0 right-0 h-px origin-center scale-x-0 rounded-full bg-smp-blue opacity-0 transition-all duration-200 ${
          active
            ? "group-hover:scale-x-0"
            : "group-hover:scale-x-100 group-hover:opacity-100"
        }`}
      />
      {active && <DesktopNavUnderline show />}
    </li>
  );
}

function DesktopNavbar({
  pathname,
  locale,
}: {
  pathname: string;
  locale: Locale;
}) {
  const isScrolled = useIsScrolled(SCROLL_THRESHOLD);

  return (
    <header
      id="navbar"
      className={`fixed top-0 z-50 hidden w-full border-b transition-all duration-500 lg:block ${
        isScrolled
          ? "border-black/5 bg-white shadow-lg shadow-black/10 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        <NavLogo isScrolled={isScrolled} />
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <DesktopNavItem
                key={item.labelKey}
                item={item}
                pathname={pathname}
                isScrolled={isScrolled}
              />
            ))}
          </ul>
          <span
            className={`h-5 w-px transition-colors duration-300 ${
              isScrolled ? "bg-smp-dark/75" : "bg-white/75"
            }`}
            aria-hidden="true"
          />
          <LocaleToggle currentLocale={locale} isScrolled={isScrolled} />
          <Search currentLocale={locale} isScrolled={isScrolled} />
        </div>
      </nav>
    </header>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MOBILE
// ══════════════════════════════════════════════════════════════════════════════

function MobileOverlay({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const t = useTranslations();
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  function toggleExpand(key: string) {
    setExpandedKey((prev) => (prev === key ? null : key));
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-60 bg-black/50"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      {open && (
        <motion.div
          key="panel"
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-y-0 right-0 z-60 flex w-full flex-col bg-white sm:max-w-sm sm:border-l sm:border-gray-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5">
            <NavLogo onClick={onClose} isScrolled={true} />
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-smp-dark transition-colors hover:bg-gray-200 hover:text-smp-blue"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-6">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const active = getActiveState(pathname, item);
                const isExpanded = expandedKey === item.labelKey;

                return (
                  <li key={item.labelKey}>
                    {item.children ? (
                      <>
                        <button
                          onClick={() => toggleExpand(item.labelKey)}
                          aria-expanded={isExpanded}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-3.5 text-base font-normal transition-colors ${
                            active
                              ? "bg-gray-200 text-smp-blue"
                              : "text-smp-dark hover:bg-gray-200 hover:text-smp-blue"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {active && (
                              <span className="h-1.5 w-1.5 rounded-full bg-smp-blue" />
                            )}
                            {t(item.labelKey)}
                          </span>
                          <motion.svg
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </motion.svg>
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.ul
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-4 mt-1 flex flex-col gap-0.5 overflow-hidden border-l border-gray-200 pl-3"
                            >
                              {item.children.map((child) => {
                                const childIsActive = isPathActive(
                                  pathname,
                                  child.href,
                                );
                                return (
                                  <li key={child.href}>
                                    <Link
                                      href={child.href}
                                      onClick={onClose}
                                      className={`flex items-start gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                                        childIsActive
                                          ? "text-smp-blue bg-white/8"
                                          : "text-smp-dark/55 hover:bg-gray-200 hover:text-smp-blue"
                                      }`}
                                    >
                                      {child.icon && (
                                        <span
                                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                                            childIsActive
                                              ? "bg-smp-blue/10 text-smp-blue"
                                              : "bg-gray-100 text-smp-dark/50"
                                          }`}
                                        >
                                          {child.icon}
                                        </span>
                                      )}
                                      <span className="min-w-0 flex-1 pt-0.5">
                                        <span className="block truncate">
                                          {t(child.labelKey)}
                                        </span>
                                        {child.descKey && (
                                          <span className="mt-0.5 block text-xs font-normal leading-snug text-smp-dark/40">
                                            {t(child.descKey)}
                                          </span>
                                        )}
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href!}
                        onClick={onClose}
                        className={`flex items-center gap-2 rounded-lg px-3 py-3.5 text-base font-normal transition-colors ${
                          active
                            ? "bg-gray-200 text-smp-blue"
                            : "text-smp-dark hover:bg-gray-200 hover:text-smp-blue"
                        }`}
                      >
                        {active && (
                          <span className="h-1.5 w-1.5 rounded-full bg-smp-blue" />
                        )}
                        {t(item.labelKey)}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MobileNavbar({
  pathname,
  locale,
}: {
  pathname: string;
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function updateNavbarOnScroll(): void {
      const currentY = window.scrollY;

      setIsScrolled(currentY > SCROLL_THRESHOLD);
      setIsHidden(
        currentY > SCROLL_THRESHOLD && currentY > lastScrollY.current,
      );

      lastScrollY.current = currentY;
    }

    updateNavbarOnScroll();
    window.addEventListener("scroll", updateNavbarOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateNavbarOnScroll);
  }, []);

  return (
    <>
      <header
        id="navbar-mobile"
        className={`fixed top-0 z-50 w-full transition-all duration-300 lg:hidden ${
          isScrolled
            ? "bg-white shadow-md shadow-black/20 backdrop-blur-md"
            : "bg-transparent"
        } ${isHidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <NavLogo isScrolled={isScrolled} compact />

          {/* Grup aksi kanan: search, locale, divider, hamburger — satu
              blok konsisten supaya tidak "mencar" saat justify-between
              dengan logo. */}
          <div className="flex shrink-0 items-center gap-0.5">
            <Search currentLocale={locale} isScrolled={isScrolled} />
            <LocaleToggle currentLocale={locale} isScrolled={isScrolled} />

            <span
              className={`mx-1.5 h-5 w-px shrink-0 transition-colors duration-300 ${
                isScrolled ? "bg-smp-dark/15" : "bg-white/20"
              }`}
              aria-hidden="true"
            />

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full transition-colors hover:bg-black/5"
            >
              {/* Ubah juga warna hamburger menu agar tidak menghilang saat navbar berwarna putih */}
              <span
                className={`block h-0.5 w-5 rounded-full transition-colors ${isScrolled ? "bg-smp-dark" : "bg-white"}`}
              />
              <span
                className={`block h-0.5 w-3.5 rounded-full transition-colors ${isScrolled ? "bg-smp-dark" : "bg-white"}`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full transition-colors ${isScrolled ? "bg-smp-dark" : "bg-white"}`}
              />
            </button>
          </div>
        </div>
      </header>

      <MobileOverlay
        open={open}
        onClose={() => setOpen(false)}
        pathname={pathname}
      />
    </>
  );
}

export default function Navbar({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <>
      <DesktopNavbar pathname={pathname} locale={locale} />
      <MobileNavbar pathname={pathname} locale={locale} />
    </>
  );
}
