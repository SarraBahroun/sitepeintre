"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";

import type { Jewel } from "@/data/bijoux";
import { t as tr, formatPrice } from "@/data/types";
import { dimensions } from "@/data/dimensions";
import type { Locale } from "@/i18n/routing";
import AddToCart from "./AddToCart";

/* =============================================================================
   La vitrine d'une collection
   -----------------------------------------------------------------------------
   Le cousin du mur du musée (MuseumWall), pensé pour des bijoux nombreux :
   une seule rangée, le bijou de face en grand au centre, sous son spot,
   ses voisins un peu en retrait de part et d'autre. Sous lui, son cartel :
   nom, prix, panier.

   On passe de l'un à l'autre par les flèches, un glissé du doigt ou un clic
   sur un voisin — jamais en faisant défiler la page, qui reste libre de
   descendre à la collection suivante.

   Aucune photo n'est rognée : toutes ont la même hauteur, leur largeur suit
   leur proportion. Les voisins rapetissent par une échelle, qui ne touche
   pas la mise en page : le centrage mesuré reste juste.
   ========================================================================== */

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 15 12"
      aria-hidden
      className="rtl:-scale-x-100"
    >
      <path
        d={dir === "prev" ? "M6 1L1 6l5 5M1 6h13" : "M9 1l5 5-5 5M14 6H1"}
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Props = {
  items: Jewel[];
  locale: Locale;
  onOpen: (id: string) => void;
};

export default function JewelStage({ items, locale, onOpen }: Props) {
  const t = useTranslations("jewels");
  const ta = useTranslations("artwork");
  const rtl = locale === "ar";
  const [here, setHere] = useState(0);
  const current = items[here];

  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const x = useSpring(0, { stiffness: 110, damping: 22, mass: 0.6 });

  // La rangée est toujours posée de gauche à droite ; en arabe, l'ordre est
  // inversé : le premier bijou est à droite, et « suivant » va vers la gauche.
  const ordered = rtl ? [...items].reverse() : items;
  const slotOf = (index: number) => (rtl ? items.length - 1 - index : index);

  // Centre le bijou de face, et le recentre si l'écran change de taille.
  useLayoutEffect(() => {
    const place = (instant: boolean) => {
      const stage = stageRef.current;
      const item = trackRef.current?.children[slotOf(here)] as
        | HTMLElement
        | undefined;
      if (!stage || !item) return;
      const target =
        stage.clientWidth / 2 - (item.offsetLeft + item.offsetWidth / 2);
      if (instant) x.jump(target);
      else x.set(target);
    };
    place(false);
    const onResize = () => place(true);
    const observer = new ResizeObserver(onResize);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", onResize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [here, items.length, rtl]);

  const go = (index: number) =>
    setHere(Math.min(items.length - 1, Math.max(0, index)));

  // Les flèches, à mi-hauteur des photos (padding de la scène compris).
  const arrowClass =
    "absolute top-[calc(clamp(340px,64svh,640px)/2+40px)] z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 bg-night/75 text-sage backdrop-blur-md transition-all duration-300 hover:border-gold/70 hover:text-gold disabled:pointer-events-none disabled:opacity-0 sm:h-14 sm:w-14";

  return (
    <div className="relative">
      <motion.div
        ref={stageRef}
        // Posée de gauche à droite dans toutes les langues : la rangée part du
        // bord gauche, et le calcul du centrage reste le même (voir `ordered`).
        dir="ltr"
        className="relative overflow-hidden py-10"
        // Les bords s'effacent dans la page, sans cadre visible.
        style={{
          touchAction: "pan-y",
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
        // Un glissé du doigt : vers la gauche, on avance (à rebours en arabe).
        onPanEnd={(_, info) => {
          const swipe = info.offset.x + info.velocity.x * 0.2;
          if (Math.abs(swipe) < 50) return;
          const forward = rtl ? swipe > 0 : swipe < 0;
          go(here + (forward ? 1 : -1));
        }}
      >
        {/* La cimaise */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-6 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        />

        <motion.ul
          ref={trackRef}
          style={{ x }}
          className="relative flex w-max items-center gap-[clamp(0px,1vw,16px)] will-change-transform"
        >
          {ordered.map((jewel) => {
            const index = items.indexOf(jewel);
            const front = index === here;
            const title = tr(jewel.title, locale);
            const { width, height } = dimensions(jewel.images[0]);

            return (
              <li key={jewel.id} className="shrink-0">
                <button
                  type="button"
                  dir={rtl ? "rtl" : "ltr"}
                  onClick={() => (front ? onOpen(jewel.id) : go(index))}
                  aria-label={front ? `${title} — ${t("open")}` : title}
                  tabIndex={front ? 0 : -1}
                  className={`group relative block outline-none transition-[transform,opacity,filter] duration-700 ease-[var(--ease-silk)] ${
                    front
                      ? "z-10 scale-100 opacity-100"
                      : "scale-[0.74] opacity-60 brightness-75 hover:opacity-90"
                  }`}
                >
                  {/* Le spot, chaud et large sur le bijou de face */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -top-[22%] left-1/2 h-[75%] w-[190%] -translate-x-1/2 transition-opacity duration-700 ${
                      front ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      background:
                        "radial-gradient(ellipse 50% 60% at 50% 0%, color-mix(in oklab, var(--color-gold) 30%, transparent) 0%, color-mix(in oklab, var(--color-gold) 9%, transparent) 45%, transparent 75%)",
                    }}
                  />

                  {/* La photo, à hauteur commune */}
                  <span className="relative block">
                    <Image
                      src={jewel.images[0]}
                      alt={title}
                      width={width}
                      height={height}
                      sizes="(max-width: 768px) 85vw, 45vw"
                      draggable={false}
                      // Hauteur plafonnée, largeur plafonnée : la photo
                      // garde sa proportion et le cadre l'épouse exactement.
                      className={`h-auto max-h-[clamp(340px,64svh,640px)] w-auto max-w-[80vw] rounded-sm transition-shadow duration-700 ${
                        front
                          ? "shadow-[0_40px_80px_-24px_rgba(0,0,0,0.9),0_0_70px_-12px_rgba(230,184,100,0.28)] ring-1 ring-gold/30"
                          : "shadow-[0_24px_40px_-18px_rgba(0,0,0,0.85)]"
                      }`}
                    />
                    {jewel.status === "sold" && (
                      <span className="absolute start-3 top-3 rounded-full border border-ember/40 bg-night/70 px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-ember backdrop-blur-md">
                        {t("status.sold")}
                      </span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </motion.ul>
      </motion.div>

      {/* Les flèches */}
      <button
        type="button"
        onClick={() => go(here - 1)}
        disabled={here === 0}
        aria-label={ta("previous")}
        className={`${arrowClass} start-0 sm:start-2`}
      >
        <Arrow dir="prev" />
      </button>
      <button
        type="button"
        onClick={() => go(here + 1)}
        disabled={here === items.length - 1}
        aria-label={ta("next")}
        className={`${arrowClass} end-0 sm:end-2`}
      >
        <Arrow dir="next" />
      </button>

      {/* Le cartel du bijou de face : son nom, son prix, le panier */}
      <motion.div
        key={current.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-2 flex max-w-md flex-col items-center text-center"
      >
        <span aria-hidden className="mb-4 block h-px w-10 bg-gold/60" />
        <h3
          dir="auto"
          className="font-display text-[clamp(1.5rem,3vw,2.1rem)] font-light leading-tight text-ivory"
        >
          {tr(current.title, locale)}
        </h3>
        <p
          className={`mt-2 font-display text-xl ${
            current.status === "sold" ? "text-ember" : "text-gold"
          }`}
        >
          {current.status === "sold"
            ? t("status.sold")
            : (formatPrice(current.price, "TND", locale) ?? t("onRequest"))}
        </p>
        <div className="mt-6 w-full max-w-xs space-y-3">
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
              withInquire={false}
            />
          )}
          <button
            type="button"
            onClick={() => onOpen(current.id)}
            className="block w-full text-center text-[0.72rem] uppercase tracking-[0.16em] text-sage transition-colors hover:text-gold"
          >
            {t("open")}{" "}
            <span aria-hidden className="inline-block rtl:-scale-x-100">
              →
            </span>
          </button>
        </div>
      </motion.div>

      {/* Où l'on en est dans la collection */}
      <div className="mx-auto mt-8 flex w-[min(360px,70vw)] items-center gap-4">
        <span className="text-[0.7rem] tracking-[0.2em] text-sage tabular-nums">
          <bdi dir="ltr">
            {String(here + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </bdi>
        </span>
        <span className="relative h-px flex-1 overflow-hidden bg-gold/15">
          <span
            className="absolute inset-y-0 start-0 bg-gold/70 transition-all duration-700"
            style={{ width: `${((here + 1) / items.length) * 100}%` }}
          />
        </span>
      </div>
    </div>
  );
}
