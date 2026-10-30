"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import Logo from "./Logo";
import LocaleSwitcher from "./LocaleSwitcher";
import CartButton from "./CartButton";

/* =============================================================================
   Barre de navigation
   -----------------------------------------------------------------------------
   Transparente en haut de page, elle se dépose sur un verre dépoli dès que l'on
   descend. Le menu plein écran prend le relais sur mobile.
   ========================================================================== */

const links = [
  { href: "/", key: "home" },
  { href: "/artiste", key: "artist" },
  { href: "/expositions/jungle-1", key: "jungle1" },
  { href: "/expositions/jungle-2", key: "jungle2" },
  { href: "/divers", key: "divers" },
  { href: "/cours", key: "courses" },
  { href: "/contact", key: "contact" },
] as const;

export default function Nav({ locale }: { locale: Locale }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    // La page peut être rechargée déjà défilée : on lit la position une
    // fois, mais à l'image suivante, pour ne pas cascader les rendus.
    const first = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Et bloque le défilement de la page tant qu'il est ouvert.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-silk)] ${
          scrolled
            ? "border-b border-glow/10 bg-night/80 backdrop-blur-xl py-3"
            : "border-b border-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/" aria-label={t("home")} className="shrink-0">
            <Logo locale={locale} />
          </Link>

          {/* --- Navigation large --- */}
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative px-3.5 py-2 text-[0.78rem] font-medium tracking-[0.14em] uppercase transition-colors duration-300 ${
                    active ? "text-glow" : "text-sage hover:text-ivory"
                  }`}
                >
                  {t(link.key)}
                  <span
                    className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-center bg-gradient-to-r from-transparent via-glow to-transparent transition-transform duration-500 ease-[var(--ease-silk)] ${
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <LocaleSwitcher current={locale} className="hidden sm:flex" />
            <CartButton />

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t("menu")}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-glow/15 text-sage transition-colors duration-300 hover:border-glow/40 hover:text-glow lg:hidden"
            >
              <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden>
                <path
                  d="M0 1h18M0 6h13M0 11h18"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* --- Menu plein écran --- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] bg-night/97 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex h-dvh flex-col">
              <div className="flex items-center justify-between px-5 py-5 sm:px-8">
                <Logo locale={locale} />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t("close")}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-glow/20 text-sage transition-colors hover:border-glow/50 hover:text-glow"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                    <path
                      d="M1 1l12 12M13 1L1 13"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-1 flex-col justify-center gap-1 px-7 sm:px-12">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.07 + i * 0.055, duration: 0.45 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block py-3 font-display text-[2rem] leading-tight transition-colors duration-300 ${
                        isActive(link.href)
                          ? "text-glow halo"
                          : "text-ivory/80 hover:text-glow"
                      }`}
                    >
                      <span className="me-4 align-middle font-sans text-[0.6rem] tracking-[0.25em] text-sage-dim">
                        0{i + 1}
                      </span>
                      {t(link.key)}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="px-7 pb-10 sm:px-12">
                <div className="rule-glow mb-6" />
                <LocaleSwitcher current={locale} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
