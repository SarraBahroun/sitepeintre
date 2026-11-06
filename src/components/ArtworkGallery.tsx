"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import type { Artwork } from "@/data/types";
import { t as tr, formatPrice } from "@/data/types";
import type { Locale } from "@/i18n/routing";
import { MetaRow, StatusBadge } from "./ui";
import AddToCart from "./AddToCart";
import MuseumWall from "./MuseumWall";

/* =============================================================================
   Les œuvres — le mur du musée et la fiche détaillée
   -----------------------------------------------------------------------------
   Chaque toile du mur ouvre une fiche : grande image, prix, disponibilité,
   technique, dimensions, et le texte de l'artiste. On circule d'une œuvre à
   l'autre au clavier comme à la souris.
   ========================================================================== */

type Props = {
  artworks: Artwork[];
  locale: Locale;
  /** Teinte d'accent héritée de l'exposition. */
  accent?: "glow" | "gold" | "iris";
  /** D'où viennent les œuvres, pour la commande : « La Jungle 2 ». */
  origin?: string;
};

export default function ArtworkGallery({
  artworks,
  locale,
  accent = "glow",
  origin,
}: Props) {
  const t = useTranslations("artwork");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const cartelRef = useRef<HTMLDivElement>(null);

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

  // Le clavier entre dans la fiche, et retrouve la toile en en sortant.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    return () => previous?.focus({ preventScroll: true });
  }, [isOpen]);

  // Chaque œuvre se lit depuis son début, même si la précédente était défilée.
  useEffect(() => {
    boxRef.current?.scrollTo(0, 0);
    cartelRef.current?.scrollTo(0, 0);
  }, [openIndex]);

  const current = openIndex === null ? null : artworks[openIndex];

  // Les deux voisines se chargent d'avance : le passage de l'une à l'autre est
  // immédiat.
  const neighbours =
    openIndex === null
      ? []
      : [
          ...new Set([
            artworks[(openIndex + 1) % artworks.length],
            artworks[(openIndex - 1 + artworks.length) % artworks.length],
          ]),
        ].filter((artwork) => artwork !== current);

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/*  Grille                                                           */}
      {/* ---------------------------------------------------------------- */}
      <MuseumWall
        artworks={artworks}
        locale={locale}
        onOpen={setOpenIndex}
        accent={accent}
      />

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
            className="fixed inset-0 z-[70] flex items-center justify-center bg-night"
            role="dialog"
            aria-modal="true"
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              ref={boxRef}
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
                {neighbours.map((artwork) => (
                  <Image
                    key={artwork.id}
                    src={artwork.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    loading="eager"
                    className="hidden"
                  />
                ))}
              </div>

              {/* Le cartel */}
              <div
                ref={cartelRef}
                className="flex flex-col justify-center-safe gap-6 bg-night-2/70 p-7 sm:p-10 md:max-h-[82dvh] md:overflow-y-auto md:pe-16 min-[1270px]:pe-10"
              >
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
                      value={<bdi dir="ltr">{current.dimensions}</bdi>}
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
                  <div>
                    <p className="eyebrow">{t("acquisition.title")}</p>
                    <dl className="mt-1">
                      <MetaRow
                        label={t("acquisition.statusLabel")}
                        value={t("acquisition.status")}
                      />
                      <MetaRow
                        label={t("acquisition.certificateLabel")}
                        value={t("acquisition.certificate")}
                      />
                    </dl>
                  </div>
                )}

                {current.status === "available" && (
                  <AddToCart
                    item={{
                      id: current.id,
                      kind: "artwork",
                      title: current.title,
                      image: current.image,
                      price: current.price,
                      currency: current.currency,
                      origin,
                    }}
                  />
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
            </motion.div>

            {/* Fermer */}
            <button
              type="button"
              ref={closeRef}
              onClick={close}
              aria-label={t("close")}
              className="absolute end-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-glow/25 bg-night/90 text-sage transition-colors hover:border-glow/60 hover:text-glow"
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
        )}
      </AnimatePresence>
    </>
  );
}
