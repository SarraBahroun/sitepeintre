"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { site } from "@/data/site";
import { dimensions } from "@/data/dimensions";
import { useCurtain } from "@/lib/useCurtain";
import HeroCanvas, { type HeroPlate } from "./HeroCanvas";

/* =============================================================================
   Ouverture — le nom se lève lettre à lettre sur la jungle,
   puis se décale doucement au défilement.

   Sur un écran en hauteur, une toile en largeur recadrée plein écran n'en
   montrerait qu'un quart, agrandi jusqu'au flou : on la pose alors entière,
   d'un bord à l'autre, au-dessus du nom.
   ========================================================================== */

export default function Hero({
  locale,
  firstExpoSlug,
  plates,
}: {
  locale: Locale;
  /** L'exposition vers laquelle mène « Entrer dans la jungle ». */
  firstExpoSlug: string;
  /** Les toiles qui défilent en fond. */
  plates: HeroPlate[];
}) {
  const t = useTranslations("home");
  const tm = useTranslations("meta");
  // Tant que l'ouverture joue, le hero retient son entrée
  const raised = useCurtain();
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
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pt-28 pb-20 sm:px-8 portrait:flex-col portrait:items-stretch portrait:pb-32"
    >
      {/* Les toiles elles-mêmes, plein cadre */}
      <HeroCanvas plates={plates} />

      {/*
        Un halo de flou, posé seulement sous le nom : la jungle reste nette
        partout ailleurs. Le masque radial efface les bords du panneau, qui
        ne doit jamais se voir comme un rectangle.

        À garder hors du bloc animé : un parent qui porte un transform ou une
        opacité isole le backdrop, et le flou n'aurait plus rien à flouter.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 portrait:hidden h-[clamp(340px,52vh,520px)] w-[min(1120px,94vw)] -translate-x-1/2 -translate-y-[56%] backdrop-blur-[26px] backdrop-brightness-[0.76] backdrop-saturate-[1.12]"
        style={{
          maskImage:
            "radial-gradient(ellipse 54% 52% at 50% 50%, #000 42%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 54% 52% at 50% 50%, #000 42%, transparent 78%)",
        }}
      />

      {/* En hauteur : la toile entière. Elle suit la première du fond. */}
      {plates[0] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={raised ? { opacity: 1 } : undefined}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="relative z-10 -mx-5 mb-10 hidden portrait:block sm:-mx-8"
        >
          <Image
            src={plates[0].src}
            alt=""
            {...dimensions(plates[0].src)}
            priority
            sizes="100vw"
            quality={90}
            className="mx-auto h-auto max-h-[50svh] w-auto max-w-full shadow-[0_30px_60px_-20px_rgba(0,0,0,0.75)]"
          />
        </motion.div>
      )}

      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={raised ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, delay: 0.35 }}
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
                animate={
                  raised ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined
                }
                transition={{
                  duration: 1.05,
                  delay: 0.5 + i * 0.05,
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
          animate={raised ? { opacity: 1, scaleX: 1 } : undefined}
          transition={{ duration: 1.2, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
          className="rule-glow mx-auto mt-9 w-56"
          aria-hidden
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={raised ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, delay: 1.35 }}
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
        animate={raised ? { opacity: 1 } : undefined}
        transition={{ duration: 1, delay: 1.9 }}
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
