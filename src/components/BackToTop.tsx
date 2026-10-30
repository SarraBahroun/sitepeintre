"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

/* =============================================================================
   Remonter en haut de page — le bouton n'apparaît qu'une fois que l'on a
   descendu plus d'un écran, et s'efface quand on est revenu en haut.
   ========================================================================== */

export default function BackToTop() {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: still ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label={t("backToTop")}
          title={t("backToTop")}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed end-5 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-glow/30 bg-night/70 text-glow shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur-md transition-colors duration-300 hover:border-glow/70 hover:bg-glow/15 sm:end-8 sm:h-14 sm:w-14"
          style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))" }}
        >
          <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden>
            <path
              d="M1 7l6-6 6 6M7 1v14"
              stroke="currentColor"
              strokeWidth="1.3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
