"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";

import type { Jewel } from "@/data/bijoux";
import { t as tr, formatPrice } from "@/data/types";
import { dimensions } from "@/data/dimensions";
import type { Locale } from "@/i18n/routing";

/* =============================================================================
   La vitrine d'une collection
   -----------------------------------------------------------------------------
   Le cousin du mur du musée (MuseumWall), pensé pour des bijoux nombreux :
   une seule rangée, le bijou de face au centre sous son spot, ses voisins
   dans la pénombre. On passe de l'un à l'autre par les flèches, un glissé du
   doigt ou un clic sur un voisin — jamais en faisant défiler la page, qui
   reste libre de descendre à la collection suivante.

   Aucune photo n'est rognée : toutes ont la même hauteur, leur largeur suit
   leur proportion. Un clic sur le bijou de face ouvre sa fiche.
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

  const arrowClass =
    "absolute top-[42%] z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/25 bg-night/70 text-sage backdrop-blur-md transition-all duration-300 hover:border-gold/60 hover:text-gold disabled:pointer-events-none disabled:opacity-0 sm:h-14 sm:w-14";

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
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
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
          className="pointer-events-none absolute inset-x-0 top-6 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent"
        />

        <motion.ul
          ref={trackRef}
          dir="ltr"
          style={{ x }}
          className="relative flex w-max items-start gap-[clamp(28px,5vw,72px)] will-change-transform"
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
                  className={`group relative block text-start outline-none transition-all duration-700 ease-[var(--ease-silk)] ${
                    front ? "opacity-100" : "scale-[0.86] opacity-35 hover:opacity-60"
                  }`}
                >
                  {/* Le spot */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -top-[30%] left-1/2 h-[85%] w-[170%] -translate-x-1/2 transition-opacity duration-700 ${
                      front ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      background:
                        "radial-gradient(ellipse 50% 60% at 50% 0%, color-mix(in oklab, var(--color-gold) 20%, transparent) 0%, color-mix(in oklab, var(--color-gold) 6%, transparent) 45%, transparent 75%)",
                    }}
                  />

                  {/* La photo, à hauteur commune */}
                  <span className="relative block transition-transform duration-700 ease-[var(--ease-silk)] group-hover:-translate-y-1.5">
                    <Image
                      src={jewel.images[0]}
                      alt={title}
                      width={width}
                      height={height}
                      sizes="(max-width: 768px) 70vw, 30vw"
                      draggable={false}
                      className="h-[clamp(260px,46svh,460px)] w-auto max-w-[78vw] rounded-sm object-contain shadow-[0_28px_50px_-18px_rgba(0,0,0,0.85),0_6px_14px_-6px_rgba(0,0,0,0.6)]"
                    />
                    {jewel.status === "sold" && (
                      <span className="absolute start-2.5 top-2.5 rounded-full border border-ember/40 bg-night/70 px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.14em] text-ember backdrop-blur-md">
                        {t("status.sold")}
                      </span>
                    )}
                  </span>

                  {/* Le cartel */}
                  <span
                    className={`mt-5 block max-w-[280px] transition-opacity duration-500 ${
                      front ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="mb-3 block h-px w-8 bg-gold/50 transition-all duration-500 group-hover:w-14"
                    />
                    <span className="block font-display text-[1.15rem] leading-snug font-light text-ivory transition-colors group-hover:text-gold">
                      {title}
                    </span>
                    <span className="mt-1.5 block text-[0.72rem] tracking-[0.08em] text-sage-dim uppercase">
                      {jewel.status === "sold"
                        ? t("status.sold")
                        : (formatPrice(jewel.price, "TND", locale) ??
                          t("onRequest"))}
                    </span>
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

      {/* Où l'on en est dans la collection */}
      <div className="mx-auto mt-2 flex w-[min(360px,70vw)] items-center gap-4">
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
