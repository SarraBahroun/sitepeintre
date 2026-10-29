"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { site } from "@/data/site";
import JungleScene from "./JungleScene";

/* =============================================================================
   Ouverture — le nom se lève lettre à lettre sur la jungle,
   puis se décale doucement au défilement.
   ========================================================================== */

export default function Hero({
  locale,
  firstExpoSlug,
}: {
  locale: Locale;
  /** L'exposition vers laquelle mène « Entrer dans la jungle ». */
  firstExpoSlug: string;
}) {
  const t = useTranslations("home");
  const tm = useTranslations("meta");
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const name = locale === "ar" ? site.nameAr : site.name;
  // En arabe le mot reste entier ; en latin on anime lettre à lettre.
  const units = locale === "ar" ? name.split(" ") : Array.from(name);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pt-28 pb-20 sm:px-8"
    >
      {/* La jungle dessinée : fauve, oiseau et regards dans le sous-bois */}
      <JungleScene />

      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative mx-auto max-w-5xl text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="eyebrow"
        >
          {tm("tagline")}
        </motion.p>

        <h1 className="mt-7 font-display text-[clamp(2.8rem,10vw,8rem)] font-light leading-[0.95] tracking-[0.04em] text-ivory">
          <span className="sr-only">{name}</span>
          <span aria-hidden className="inline-flex flex-wrap justify-center">
            {units.map((unit, i) => (
              <motion.span
                key={`${unit}-${i}`}
                initial={{ opacity: 0, y: 46, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 1.05,
                  delay: 0.3 + i * 0.045,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {unit === " " ? " " : unit}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="rule-glow mx-auto mt-9 w-56"
          aria-hidden
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="mt-10"
        >
          <Link
            href={`/expositions/${firstExpoSlug}`}
            className="group inline-flex items-center gap-4 rounded-full border border-glow/25 bg-night/40 px-8 py-4 backdrop-blur-md transition-all duration-500 ease-[var(--ease-silk)] hover:border-glow/60 hover:bg-glow/10"
          >
            <span className="text-[0.76rem] font-medium uppercase tracking-[0.22em] text-glow">
              {t("enter")}
            </span>
            <svg
              width="18"
              height="12"
              viewBox="0 0 18 12"
              aria-hidden
              className="text-glow transition-transform duration-500 ease-[var(--ease-silk)] group-hover:translate-x-1.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-1.5"
            >
              <path
                d="M11 1l5 5-5 5M16 6H1"
                stroke="currentColor"
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </motion.div>

      {/* Invitation à descendre */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        style={{ opacity: titleOpacity }}
        className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-sage-dim">
          {t("scroll")}
        </span>
        <motion.span
          animate={{ y: [0, 9, 0], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="block h-10 w-px bg-gradient-to-b from-glow to-transparent"
          aria-hidden
        />
      </motion.div>
    </section>
  );
}
