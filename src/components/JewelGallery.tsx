"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import type { Jewel, JewelCollection } from "@/data/bijoux";
import { t as tr, tRich, formatPrice } from "@/data/types";
import { dimensions } from "@/data/dimensions";
import type { Locale } from "@/i18n/routing";
import { MetaRow, StatusBadge } from "./ui";
import AddToCart from "./AddToCart";

/* =============================================================================
   Les bijoux — collections, vitrine et fiche
   -----------------------------------------------------------------------------
   Des pastilles choisissent la collection ; « Toutes » les montre l'une après
   l'autre, chacune sous son titre. Les photos gardent leur proportion (aucun
   recadrage) : la vitrine est en colonnes, comme un mur de photos.
   Un clic ouvre la fiche : photos, texte, vertus, prix, panier.
   ========================================================================== */

type Props = {
  jewels: Jewel[];
  collections: JewelCollection[];
  locale: Locale;
};

const ALL = "all";

export default function JewelGallery({ jewels, collections, locale }: Props) {
  const t = useTranslations("jewels");
  const ta = useTranslations("artwork");
  const [filter, setFilter] = useState<string>(ALL);
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

  const shownGroups = useMemo(
    () =>
      filter === ALL
        ? groups
        : groups.filter((g) => g.collection.id === filter),
    [groups, filter],
  );
  // L'ordre de circulation dans la fiche suit ce qui est affiché.
  const shown = useMemo(
    () => shownGroups.flatMap((g) => g.items),
    [shownGroups],
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

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.14em] transition-all duration-400 ${
      active
        ? "border-gold/70 bg-gold/10 text-gold"
        : "border-gold/20 text-sage hover:border-gold/55 hover:text-gold"
    }`;

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/*  Les collections                                                  */}
      {/* ---------------------------------------------------------------- */}
      <nav aria-label={t("collections")} className="flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => setFilter(ALL)}
          aria-pressed={filter === ALL}
          className={chip(filter === ALL)}
        >
          {t("all")}
          <span className="ms-2 text-sage-dim">{jewels.length}</span>
        </button>
        {groups.map(({ collection, items }) => (
          <button
            key={collection.id}
            type="button"
            onClick={() => setFilter(collection.id)}
            aria-pressed={filter === collection.id}
            className={chip(filter === collection.id)}
          >
            {tr(collection.title, locale)}
            <span className="ms-2 text-sage-dim">{items.length}</span>
          </button>
        ))}
      </nav>

      {/* ---------------------------------------------------------------- */}
      {/*  La vitrine                                                       */}
      {/* ---------------------------------------------------------------- */}
      <div className="mt-14 space-y-20">
        {shownGroups.map(({ collection, items }) => (
          <section key={collection.id} aria-labelledby={`c-${collection.id}`}>
            <header className="flex items-baseline gap-4 border-b border-gold/15 pb-4">
              <h2
                id={`c-${collection.id}`}
                className="font-display text-[clamp(1.6rem,3vw,2.3rem)] font-light text-ivory"
              >
                {tr(collection.title, locale)}
              </h2>
              <span className="text-[0.72rem] uppercase tracking-[0.16em] text-sage-dim">
                {t("count", { count: items.length })}
              </span>
            </header>

            <ul className="mt-8 columns-2 gap-4 sm:gap-6 md:columns-3 xl:columns-4">
              {items.map((jewel) => (
                <li key={jewel.id} className="mb-8 break-inside-avoid">
                  <button
                    type="button"
                    onClick={() => open(jewel.id)}
                    aria-label={`${tr(jewel.title, locale)} — ${t("open")}`}
                    className="group block w-full text-start"
                  >
                    <div className="relative overflow-hidden rounded-sm border border-gold/15 bg-night-2 transition-colors duration-500 group-hover:border-gold/50">
                      <Image
                        src={jewel.images[0]}
                        alt={tr(jewel.title, locale)}
                        {...dimensions(jewel.images[0])}
                        sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className={`h-auto w-full transition-transform duration-700 group-hover:scale-[1.03] ${
                          jewel.status === "sold" ? "opacity-75" : ""
                        }`}
                      />
                      {jewel.status === "sold" && (
                        <span className="absolute start-2.5 top-2.5">
                          <StatusBadge label={t("status.sold")} status="sold" />
                        </span>
                      )}
                    </div>
                    <p
                      dir="auto"
                      className="mt-3 font-display text-[1.08rem] font-light leading-snug text-ivory transition-colors group-hover:text-gold"
                    >
                      {tr(jewel.title, locale)}
                    </p>
                    {jewel.status !== "sold" && (
                      <p className="mt-1 text-[0.82rem] text-gold/85">
                        {price(jewel)}
                      </p>
                    )}
                  </button>
                </li>
              ))}
            </ul>
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
