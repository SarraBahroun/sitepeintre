"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import type { Artwork } from "@/data/types";
import { t as tr, formatPrice } from "@/data/types";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { MetaRow, StatusBadge } from "./ui";

/* =============================================================================
   Les œuvres — grille et fiche détaillée
   -----------------------------------------------------------------------------
   Chaque vignette ouvre une fiche : grande image, prix, disponibilité,
   technique, dimensions, et le texte de l'artiste. On circule d'une œuvre à
   l'autre au clavier comme à la souris.
   ========================================================================== */

type Props = {
  artworks: Artwork[];
  locale: Locale;
  /** Teinte d'accent héritée de l'exposition. */
  accent?: "glow" | "gold" | "iris";
};

const accentRing: Record<string, string> = {
  glow: "group-hover:border-glow/45 group-hover:shadow-[0_0_50px_-10px_var(--color-glow-deep)]",
  gold: "group-hover:border-gold/45 group-hover:shadow-[0_0_50px_-10px_var(--color-gold-deep)]",
  iris: "group-hover:border-iris/45 group-hover:shadow-[0_0_50px_-10px_var(--color-iris)]",
};

export default function ArtworkGallery({
  artworks,
  locale,
  accent = "glow",
}: Props) {
  const t = useTranslations("artwork");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const go = useCallback(
    (step: number) =>
      setOpenIndex((i) =>
        i === null ? null : (i + step + artworks.length) % artworks.length,
      ),
    [artworks.length],
  );

  // Clavier : échappe pour fermer, flèches pour circuler (inversées en arabe).
  useEffect(() => {
    if (openIndex === null) return;
    const rtl = locale === "ar";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(rtl ? -1 : 1);
      if (e.key === "ArrowLeft") go(rtl ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, go, locale]);

  const current = openIndex === null ? null : artworks[openIndex];

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/*  Grille                                                           */}
      {/* ---------------------------------------------------------------- */}
      {/*
        Mosaïque en colonnes, et non grille à cases égales : chaque toile
        garde sa proportion. Les cadres ne s'alignent pas — c'est le prix à
        payer pour qu'aucune peinture ne soit rognée, et il est juste.
      */}
      <div className="columns-1 gap-7 sm:columns-2 lg:columns-3 [&>*]:mb-7">
        {artworks.map((artwork, i) => {
          const title = tr(artwork.title, locale);
          const price = formatPrice(artwork.price, artwork.currency, locale);

          return (
            <motion.button
              key={artwork.id}
              type="button"
              onClick={() => setOpenIndex(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: (i % 3) * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group block w-full break-inside-avoid text-start"
            >
              <div
                className={`relative overflow-hidden rounded-sm border border-glow/10 bg-night-2 transition-all duration-700 ease-[var(--ease-silk)] ${accentRing[accent]}`}
              >
                <Image
                  src={artwork.image}
                  alt={title || `Œuvre ${i + 1}`}
                  width={artwork.width ?? 1200}
                  height={artwork.height ?? 1500}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full transition-transform duration-[1.1s] ease-[var(--ease-silk)] group-hover:scale-[1.04]"
                />

                {/* voile qui se lève au survol */}
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/15 to-transparent opacity-75 transition-opacity duration-700 group-hover:opacity-55" />

                <div className="absolute start-4 top-4">
                  <StatusBadge
                    label={t(`status.${artwork.status}`)}
                    status={artwork.status}
                  />
                </div>

                {/* invite à cliquer */}
                <div className="absolute end-4 bottom-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-glow/30 bg-night/60 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                    <path
                      d="M7 1v12M1 7h12"
                      stroke="var(--color-glow)"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-lg font-light text-ivory transition-colors duration-300 group-hover:text-glow">
                  {title || (
                    <span className="text-sage-dim italic">
                      {locale === "ar" ? "بدون عنوان" : "Sans titre"}
                    </span>
                  )}
                </h3>
                <p className="shrink-0 text-[0.78rem] tracking-[0.08em] text-sage">
                  {artwork.status === "sold" ? "" : (price ?? t("onRequest"))}
                </p>
              </div>
              {artwork.dimensions && (
                <p className="mt-1 text-xs text-sage-dim">
                  {artwork.dimensions}
                </p>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/*  Fiche                                                            */}
      {/* ---------------------------------------------------------------- */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-night/95 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative grid max-h-[92dvh] w-full max-w-[1150px] grid-cols-1 overflow-y-auto md:grid-cols-[1.25fr_1fr] md:overflow-hidden"
            >
              {/* L'image */}
              <div className="relative aspect-[4/5] w-full bg-night-2 md:aspect-auto md:h-[82dvh]">
                <Image
                  src={current.image}
                  alt={tr(current.title, locale) || "Œuvre"}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Le cartel */}
              <div className="flex flex-col justify-center gap-6 bg-night-2/70 p-7 sm:p-10 md:max-h-[82dvh] md:overflow-y-auto">
                <div>
                  <StatusBadge
                    label={t(`status.${current.status}`)}
                    status={current.status}
                    size="md"
                  />
                  {tr(current.collection, locale) && (
                    <p className="eyebrow mt-5">
                      {tr(current.collection, locale)}
                    </p>
                  )}
                  <h2 className="mt-3 font-display text-[clamp(1.7rem,3.2vw,2.5rem)] font-light leading-tight text-ivory">
                    {tr(current.title, locale) || (
                      <span className="text-sage-dim italic">
                        {locale === "ar" ? "بدون عنوان" : "Sans titre"}
                      </span>
                    )}
                  </h2>
                  <div className="rule-glow mt-5 w-20" aria-hidden />
                </div>

                {/* Symbolisme — mis en exergue, c'est le propos de l'œuvre */}
                {tr(current.symbolism, locale) && (
                  <div className="border-s-2 border-gold/40 ps-5">
                    <p className="eyebrow">{t("symbolism")}</p>
                    <p className="mt-3 font-display text-[1.05rem] font-light italic leading-[1.8] text-ivory/90">
                      {tr(current.symbolism, locale)}
                    </p>
                  </div>
                )}

                {tr(current.description, locale) && (
                  <div>
                    <p className="eyebrow">{t("about")}</p>
                    <p className="mt-3 text-[0.94rem] leading-[1.8] text-sage">
                      {tr(current.description, locale)}
                    </p>
                  </div>
                )}

                <dl className="mt-1">
                  {tr(current.technique, locale) && (
                    <MetaRow
                      label={t("technique")}
                      value={tr(current.technique, locale)}
                    />
                  )}
                  {current.dimensions && (
                    <MetaRow
                      label={t("dimensions")}
                      value={current.dimensions}
                    />
                  )}
                  {tr(current.framing, locale) && (
                    <MetaRow
                      label={t("framing")}
                      value={tr(current.framing, locale)}
                    />
                  )}
                  {current.year && (
                    <MetaRow label={t("year")} value={current.year} />
                  )}
                  {current.status !== "sold" &&
                    current.status !== "notForSale" && (
                      <MetaRow
                        label={t("price")}
                        value={
                          <span className="font-display text-xl text-gold">
                            {formatPrice(
                              current.price,
                              current.currency,
                              locale,
                            ) ?? t("onRequest")}
                          </span>
                        }
                      />
                    )}
                </dl>

                {current.status === "available" && (
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-sm border border-glow/35 bg-glow/5 px-6 py-3.5 text-[0.76rem] font-medium uppercase tracking-[0.18em] text-glow transition-all duration-400 hover:border-glow/70 hover:bg-glow/15"
                  >
                    {t("inquire")}
                  </Link>
                )}

                {/* Circulation */}
                {artworks.length > 1 && (
                  <div className="mt-2 flex items-center gap-3 border-t border-glow/10 pt-6">
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label={t("previous")}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-glow/20 text-sage transition-colors hover:border-glow/50 hover:text-glow"
                    >
                      <svg
                        width="15"
                        height="12"
                        viewBox="0 0 15 12"
                        aria-hidden
                        className="rtl:rotate-180"
                      >
                        <path
                          d="M6 1L1 6l5 5M1 6h13"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label={t("next")}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-glow/20 text-sage transition-colors hover:border-glow/50 hover:text-glow"
                    >
                      <svg
                        width="15"
                        height="12"
                        viewBox="0 0 15 12"
                        aria-hidden
                        className="rtl:rotate-180"
                      >
                        <path
                          d="M9 1l5 5-5 5M14 6H1"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <span className="ms-auto text-[0.72rem] tracking-[0.14em] text-sage-dim">
                      {String(openIndex! + 1).padStart(2, "0")} /{" "}
                      {String(artworks.length).padStart(2, "0")}
                    </span>
                  </div>
                )}
              </div>

              {/* Fermer */}
              <button
                type="button"
                onClick={close}
                aria-label={t("close")}
                className="absolute end-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-glow/25 bg-night/70 text-sage backdrop-blur-md transition-colors hover:border-glow/60 hover:text-glow"
              >
                <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden>
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
