"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import type { Jewel, JewelCollection } from "@/data/bijoux";
import { t as tr, tRich, formatPrice } from "@/data/types";
import type { Locale } from "@/i18n/routing";
import { MetaRow, StatusBadge } from "./ui";
import AddToCart from "./AddToCart";
import JewelStage from "./JewelStage";

/* =============================================================================
   Les bijoux — collections, vitrine et fiche
   -----------------------------------------------------------------------------
   Des pastilles mènent à chaque collection ; chacune a sa vitrine
   (JewelStage), que l'on parcourt aux flèches sans faire défiler la page.
   Un clic sur le bijou de face ouvre la fiche : photos, texte, vertus, prix, panier.
   ========================================================================== */

type Props = {
  jewels: Jewel[];
  collections: JewelCollection[];
  locale: Locale;
};

export default function JewelGallery({ jewels, collections, locale }: Props) {
  const t = useTranslations("jewels");
  const ta = useTranslations("artwork");
  const [openId, setOpenId] = useState<string | null>(null);
  const [photo, setPhoto] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Les collections qui ont au moins une pièce, dans l'ordre des données.
  const groups = useMemo(
    () =>
      collections
        .map((c) => ({
          collection: c,
          items: jewels.filter((j) => j.collection === c.id),
        }))
        .filter((g) => g.items.length > 0),
    [collections, jewels],
  );

  // Dans la fiche, on circule au sein de la collection du bijou ouvert.
  const openCollection = openId
    ? jewels.find((j) => j.id === openId)?.collection
    : undefined;
  const shown = useMemo(
    () => jewels.filter((j) => j.collection === openCollection),
    [jewels, openCollection],
  );

  const openIndex = openId ? shown.findIndex((j) => j.id === openId) : -1;
  const current = openIndex >= 0 ? shown[openIndex] : null;
  const isOpen = current !== null;

  const close = useCallback(() => setOpenId(null), []);
  const go = useCallback(
    (step: number) => {
      if (openIndex < 0) return;
      const next = shown[(openIndex + step + shown.length) % shown.length];
      setOpenId(next.id);
      setPhoto(0);
    },
    [openIndex, shown],
  );

  // Clavier : échappe pour fermer, flèches pour circuler (inversées en arabe).
  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen, close, go, locale]);

  // Le clavier entre dans la fiche, et retrouve le bijou en en sortant.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    return () => previous?.focus({ preventScroll: true });
  }, [isOpen]);

  // Chaque fiche se lit depuis son début.
  useEffect(() => {
    boxRef.current?.scrollTo(0, 0);
    textRef.current?.scrollTo(0, 0);
  }, [openId]);

  const open = (id: string) => {
    setOpenId(id);
    setPhoto(0);
  };

  const price = (j: Jewel) =>
    formatPrice(j.price, "TND", locale) ?? t("onRequest");

  const chip =
    "rounded-full border border-gold/20 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-sage transition-all duration-400 hover:border-gold/55 hover:text-gold";

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/*  Les collections                                                  */}
      {/* ---------------------------------------------------------------- */}
      <nav aria-label={t("collections")} className="flex flex-wrap gap-2.5">
        {groups.map(({ collection, items }) => (
          <a
            key={collection.id}
            href={`#c-${collection.id}`}
            className={chip}
          >
            {tr(collection.title, locale)}
            <span className="ms-2 text-sage-dim">{items.length}</span>
          </a>
        ))}
      </nav>

      {/* ---------------------------------------------------------------- */}
      {/*  Une vitrine par collection                                       */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-16 space-y-16 sm:space-y-24">
        {groups.map(({ collection, items }) => (
          <section
            key={collection.id}
            id={`c-${collection.id}`}
            aria-labelledby={`t-${collection.id}`}
            className="scroll-mt-24"
          >
            <header className="flex items-baseline gap-4 border-b border-gold/15 pb-4">
              <h2
                id={`t-${collection.id}`}
                className="font-display text-[clamp(1.6rem,3vw,2.3rem)] font-light text-ivory"
              >
                {tr(collection.title, locale)}
              </h2>
              <span className="text-[0.72rem] uppercase tracking-[0.16em] text-sage-dim">
                {t("count", { count: items.length })}
              </span>
            </header>

            <div className="mt-4">
              <JewelStage items={items} locale={locale} onOpen={open} />
            </div>
          </section>
        ))}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/*  La fiche                                                         */}
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
            aria-label={tr(current.title, locale)}
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              ref={boxRef}
              onClick={(e) => e.stopPropagation()}
              className="relative grid max-h-[92dvh] w-full max-w-[1150px] grid-cols-1 overflow-y-auto md:grid-cols-[1.2fr_1fr] md:overflow-hidden"
            >
              {/* Les photos */}
              <div className="relative flex flex-col bg-night-2">
                <div className="relative aspect-[4/5] w-full md:aspect-auto md:h-[82dvh] md:flex-1">
                  <Image
                    key={current.images[photo]}
                    src={current.images[photo] ?? current.images[0]}
                    alt={tr(current.title, locale)}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-contain"
                    priority
                  />
                </div>
                {current.images.length > 1 && (
                  <div className="flex justify-center gap-2.5 p-3 md:absolute md:bottom-3 md:start-3 md:p-0">
                    {current.images.map((src, k) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setPhoto(k)}
                        aria-label={t("photo", { n: k + 1 })}
                        aria-pressed={photo === k}
                        className={`relative h-16 w-14 overflow-hidden rounded-sm border bg-night transition-colors ${
                          photo === k
                            ? "border-gold"
                            : "border-gold/20 hover:border-gold/60"
                        }`}
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Le texte */}
              <div
                ref={textRef}
                className="flex flex-col justify-center-safe gap-6 bg-night-2/70 p-7 sm:p-10 md:max-h-[82dvh] md:overflow-y-auto md:pe-16 min-[1270px]:pe-10"
              >
                <div>
                  <StatusBadge
                    label={t(`status.${current.status}`)}
                    status={current.status}
                    size="md"
                  />
                  <p className="eyebrow mt-5">
                    Chic & Glamour ·{" "}
                    {tr(
                      collections.find((c) => c.id === current.collection)
                        ?.title,
                      locale,
                    )}
                  </p>
                  <h2
                    dir="auto"
                    className="mt-3 font-display text-[clamp(1.6rem,3vw,2.3rem)] font-light leading-tight text-ivory"
                  >
                    {tr(current.title, locale)}
                  </h2>
                  <div className="rule-glow mt-5 w-20" aria-hidden />
                </div>

                <div className="space-y-4">
                  {tRich(current.description, locale).map((p, k) => (
                    <p
                      key={k}
                      className="text-[0.94rem] leading-[1.8] text-sage"
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {tr(current.virtues, locale) && (
                  <div className="border-s-2 border-gold/40 ps-5">
                    <p className="eyebrow">{t("virtues")}</p>
                    <p className="mt-3 font-display text-[1.02rem] font-light italic leading-[1.8] text-ivory/90">
                      {tr(current.virtues, locale)}
                    </p>
                    <p className="mt-3 text-[0.72rem] leading-relaxed text-sage-dim">
                      {t("virtuesNote")}
                    </p>
                  </div>
                )}

                <dl>
                  {current.pieces && current.pieces.length > 0 && (
                    <MetaRow
                      label={t("pieces")}
                      value={current.pieces
                        .map((p) => t(`piece.${p}`))
                        .join(" · ")}
                    />
                  )}
                  {current.length && (
                    <MetaRow
                      label={t("length")}
                      value={<bdi dir="ltr">{current.length}</bdi>}
                    />
                  )}
                  {current.status !== "sold" && (
                    <MetaRow
                      label={t("price")}
                      value={
                        <span className="font-display text-xl text-gold">
                          {price(current)}
                        </span>
                      }
                    />
                  )}
                </dl>

                {current.status === "available" && (
                  <AddToCart
                    item={{
                      id: `bijou-${current.id}`,
                      kind: "jewel",
                      title: current.title,
                      image: current.images[0],
                      price: current.price,
                      currency: "TND",
                      origin: "Chic & Glamour",
                    }}
                  />
                )}

                {/* Circulation */}
                {shown.length > 1 && (
                  <div className="mt-2 flex items-center gap-3 border-t border-glow/10 pt-6">
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label={ta("previous")}
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
                      aria-label={ta("next")}
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
                      {String(openIndex + 1).padStart(2, "0")} /{" "}
                      {String(shown.length).padStart(2, "0")}
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
              aria-label={ta("close")}
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
