"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

import type { Artwork } from "@/data/types";
import { t as tr, formatPrice } from "@/data/types";
import { dimensions } from "@/data/dimensions";
import type { Locale } from "@/i18n/routing";

/* =============================================================================
   Le mur du musée
   -----------------------------------------------------------------------------
   Les toiles sont accrochées côte à côte sur un même mur. En descendant dans
   la page, on longe ce mur : le défilement vertical devient une marche
   latérale, sans bouton ni flèche.

   Chaque toile garde sa proportion — aucune n'est rognée — et sa taille
   suit ses dimensions réelles : une toile de 1,50 m paraît plus grande
   qu'une de 90 cm, comme dans une salle. Un spot l'éclaire, un cartel la
   nomme ; un clic ouvre sa fiche.
   ========================================================================== */

/** Le plus grand côté, en cm, qui occupe la hauteur de référence du mur. */
const LONGEST_CM = 150;
/** Côté le plus long d'une toile sans dimensions connues. */
const FALLBACK_CM = 100;

/** « 140 × 110 cm » → le plus grand des deux nombres. */
function longestSide(dims: string): number {
  const numbers = dims
    .match(/\d+(?:[.,]\d+)?/g)
    ?.map((n) => parseFloat(n.replace(",", ".")));
  return numbers && numbers.length ? Math.max(...numbers) : FALLBACK_CM;
}

/** La même flèche que le carrousel du vernissage. */
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
  artworks: Artwork[];
  locale: Locale;
  onOpen: (index: number) => void;
  /** Teinte d'accent de l'exposition : la barre de marche la reprend. */
  accent?: "glow" | "gold" | "iris";
};

const accentBar: Record<string, string> = {
  glow: "bg-glow/70",
  gold: "bg-gold/70",
  iris: "bg-iris/70",
};

export default function MuseumWall({
  artworks,
  locale,
  onOpen,
  accent = "glow",
}: Props) {
  const t = useTranslations("artwork");
  const rtl = locale === "ar";

  const trackRef = useRef<HTMLDivElement>(null);
  const wallRef = useRef<HTMLUListElement>(null);
  const [travel, setTravel] = useState(0);

  // La longueur du mur, moins un écran : c'est la distance à parcourir.
  useLayoutEffect(() => {
    const wall = wallRef.current;
    if (!wall) return;
    const measure = () =>
      setTravel(Math.max(0, wall.scrollWidth - window.innerWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(wall);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  // Un léger amorti : le mur suit la main sans à-coups de molette.
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.35,
  });
  const x = useTransform(progress, (p) => (rtl ? 1 : -1) * p * travel);
  const bar = useTransform(progress, (p) => p);

  /** La hauteur de page où la toile n° index se tient au centre de l'écran. */
  const scrollTargetOf = (index: number): number | null => {
    const track = trackRef.current;
    const wall = wallRef.current;
    const item = wall?.children[index] as HTMLElement | undefined;
    if (!track || !wall || !item) return null;
    const center =
      item.offsetLeft + item.offsetWidth / 2 - window.innerWidth / 2;
    const along = rtl ? wall.scrollWidth - window.innerWidth - center : center;
    const p = travel > 0 ? Math.min(1, Math.max(0, along / travel)) : 0;
    const top = track.getBoundingClientRect().top + window.scrollY;
    return top + p * (track.offsetHeight - window.innerHeight);
  };

  /** La toile la plus proche du centre de l'écran. */
  const nearest = (): number => {
    let best = 0;
    let gap = Infinity;
    for (let i = 0; i < artworks.length; i++) {
      const target = scrollTargetOf(i);
      if (target === null) continue;
      const d = Math.abs(target - window.scrollY);
      if (d < gap) {
        gap = d;
        best = i;
      }
    }
    return best;
  };

  // Le numéro de la toile qu'on a devant soi.
  const [here, setHere] = useState(0);
  useEffect(
    () => scrollYProgress.on("change", () => setHere(nearest())),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scrollYProgress, travel, artworks.length],
  );

  /** Amène la toile n° index devant soi, en glissant ou d'un coup. */
  const goTo = (index: number, behavior: ScrollBehavior = "smooth") => {
    const clamped = Math.min(artworks.length - 1, Math.max(0, index));
    const target = scrollTargetOf(clamped);
    if (target !== null) window.scrollTo({ top: target, behavior });
  };

  // Au clavier, la toile qui reçoit le focus vient se placer devant soi —
  // une image plus tard : le navigateur a fini son propre défilement de
  // focus, qui ne connaît pas le mur, et c'est le nôtre qui l'emporte.
  const bringIntoView = (index: number) =>
    requestAnimationFrame(() => goTo(index, "instant"));

  const arrowClass =
    "absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-glow/25 bg-night/60 text-sage backdrop-blur-md transition-all duration-300 hover:border-glow/60 hover:text-glow disabled:pointer-events-none disabled:opacity-0 sm:h-14 sm:w-14";

  return (
    <div
      ref={trackRef}
      className="relative"
      // Autant de hauteur à descendre que de mur à longer.
      style={{ height: `calc(100svh + ${travel}px)` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-clip">
        {/* Le mur : une cimaise en haut, une plinthe en bas. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[16%] h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[14%] bg-gradient-to-t from-night via-night/60 to-transparent"
        />

        <motion.ul
          ref={wallRef}
          style={{ x }}
          className="relative flex w-max items-center gap-[clamp(72px,10vw,180px)] px-[max(8vw,40px)] pt-[6svh] will-change-transform"
        >
          {artworks.map((artwork, i) => {
            const title = tr(artwork.title, locale);
            const { width, height } = dimensions(artwork.image);
            const aspect = width / height;
            const scale = longestSide(artwork.dimensions ?? "") / LONGEST_CM;
            // Le plus grand côté de la toile, en hauteur d'écran.
            const longSvh = scale * 56;
            const cssWidth =
              aspect >= 1 ? `${longSvh}svh` : `${longSvh * aspect}svh`;
            const price = formatPrice(artwork.price, artwork.currency, locale);
            const technique = tr(artwork.technique, locale);

            return (
              <li key={artwork.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => onOpen(i)}
                  // Seulement au clavier : un clic donne aussi le focus, et
                  // faire glisser le mur entre l'appui et le relâché
                  // annulait le clic.
                  onFocus={(e) => {
                    if (e.currentTarget.matches(":focus-visible"))
                      bringIntoView(i);
                  }}
                  className="group relative block text-start outline-none"
                  style={{ width: cssWidth, maxWidth: "80vw" }}
                >
                  {/* Le spot, au-dessus de la toile */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-[38%] left-1/2 h-[90%] w-[150%] -translate-x-1/2 opacity-70 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100"
                    style={{
                      background:
                        "radial-gradient(ellipse 50% 60% at 50% 0%, color-mix(in oklab, var(--color-gold) 18%, transparent) 0%, color-mix(in oklab, var(--color-gold) 6%, transparent) 45%, transparent 75%)",
                    }}
                  />

                  {/* La toile, accrochée : une ombre portée sur le mur */}
                  <span
                    className="relative block transition-transform duration-700 ease-[var(--ease-silk)] group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5"
                    style={{ aspectRatio: `${width} / ${height}` }}
                  >
                    <Image
                      src={artwork.image}
                      alt={title || `${t("untitled")} ${i + 1}`}
                      width={width}
                      height={height}
                      sizes="(max-width: 768px) 80vw, 45vw"
                      className="h-full w-full shadow-[0_28px_50px_-18px_rgba(0,0,0,0.85),0_6px_14px_-6px_rgba(0,0,0,0.6)] transition-shadow duration-700 group-hover:shadow-[0_40px_70px_-20px_rgba(0,0,0,0.9),0_8px_18px_-6px_rgba(0,0,0,0.6)]"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 ring-1 ring-inset ring-white/5 group-focus-visible:ring-2 group-focus-visible:ring-glow/70"
                    />
                  </span>

                  {/* Le cartel */}
                  <span className="mt-6 block max-w-[300px]">
                    <span
                      aria-hidden
                      className="mb-3 block h-px w-8 bg-gold/50 transition-all duration-500 group-hover:w-14"
                    />
                    <span className="block font-display text-[1.15rem] leading-snug font-light text-ivory transition-colors duration-300 group-hover:text-glow">
                      {title || t("untitled")}
                    </span>
                    <span className="mt-1 block text-[0.74rem] tracking-[0.04em] text-sage">
                      {[technique, artwork.dimensions]
                        .filter(Boolean)
                        .map((part, k) => (
                          <span key={k}>
                            {k > 0 && " · "}
                            <bdi dir={k === 1 ? "ltr" : undefined}>{part}</bdi>
                          </span>
                        ))}
                    </span>
                    <span className="mt-1.5 block text-[0.72rem] tracking-[0.08em] text-sage-dim uppercase">
                      {artwork.status === "available"
                        ? (price ?? t("onRequest"))
                        : t(`status.${artwork.status}`)}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </motion.ul>

        {/* Les flèches : la toile d'avant, la toile d'après */}
        <button
          type="button"
          onClick={() => goTo(here - 1)}
          disabled={here === 0}
          aria-label={t("previous")}
          className={`${arrowClass} start-3 sm:start-6`}
        >
          <Arrow dir="prev" />
        </button>
        <button
          type="button"
          onClick={() => goTo(here + 1)}
          disabled={here === artworks.length - 1}
          aria-label={t("next")}
          className={`${arrowClass} end-3 sm:end-6`}
        >
          <Arrow dir="next" />
        </button>

        {/* Où l'on en est, le long du mur */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[5svh] mx-auto flex w-[min(420px,70vw)] items-center gap-4">
          <span className="text-[0.7rem] tracking-[0.2em] text-sage tabular-nums">
            <bdi dir="ltr">
              {String(here + 1).padStart(2, "0")} /{" "}
              {String(artworks.length).padStart(2, "0")}
            </bdi>
          </span>
          <span className="relative h-px flex-1 overflow-hidden bg-glow/15">
            <motion.span
              className={`absolute inset-y-0 w-full ${accentBar[accent]} ${rtl ? "right-0 origin-right" : "left-0 origin-left"}`}
              style={{ scaleX: bar }}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
