"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

/* =============================================================================
   Photographies du vernissage — une image à la fois, flèches de part et
   d'autre.
   -----------------------------------------------------------------------------
   La mosaïque empilait les photos les unes sous les autres : on n'en voyait
   aucune. Ici chaque photo occupe la scène entière, sans être rognée — la
   même image, floutée, remplit les marges que laisse sa proportion.
   On passe de l'une à l'autre par les flèches, le clavier ou le glissé.
   ========================================================================== */

const SWIPE = 60;

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

export default function VernissageCarousel({
  images,
  label,
  rtl = false,
}: {
  images: string[];
  label: string;
  /** En arabe, la photo suivante est à gauche — clavier et glissé compris. */
  rtl?: boolean;
}) {
  const t = useTranslations("artwork");
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);

  const go = useCallback(
    (step: number) =>
      setState(([i]) => [(i + step + images.length) % images.length, step]),
    [images.length],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(rtl ? -1 : 1);
    if (e.key === "ArrowLeft") go(rtl ? 1 : -1);
  };

  if (!images.length) return null;

  const src = images[index];
  const offset = (rtl ? -1 : 1) * 48;

  const arrowClass =
    "absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-glow/25 bg-night/60 text-sage backdrop-blur-md transition-colors duration-300 hover:border-glow/60 hover:text-glow sm:h-14 sm:w-14";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="outline-none"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-glow/10 bg-night-2 sm:aspect-[3/2] lg:aspect-[16/9]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={src}
            custom={direction}
            initial={{ opacity: 0, x: direction * offset }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * offset }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              const forward = rtl
                ? info.offset.x > SWIPE
                : info.offset.x < -SWIPE;
              const back = rtl ? info.offset.x < -SWIPE : info.offset.x > SWIPE;
              if (forward) go(1);
              else if (back) go(-1);
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            {/* Les marges, remplies par la photo elle-même, floutée */}
            <Image
              src={src}
              alt=""
              aria-hidden
              fill
              sizes="40vw"
              className="scale-110 object-cover opacity-35 blur-2xl"
              draggable={false}
            />
            <Image
              src={src}
              alt={`${label} — ${index + 1}`}
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-contain"
              priority={index === 0}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={t("previous")}
          className={`${arrowClass} start-3 sm:start-5`}
        >
          <Arrow dir="prev" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={t("next")}
          className={`${arrowClass} end-3 sm:end-5`}
        >
          <Arrow dir="next" />
        </button>
      </div>

      <p
        className="mt-5 text-center text-[0.72rem] tracking-[0.16em] text-sage-dim"
        aria-live="polite"
      >
        {String(index + 1).padStart(2, "0")} /{" "}
        {String(images.length).padStart(2, "0")}
      </p>

      {/* Les photos voisines, chargées d'avance pour que le passage soit
          net. Même `sizes` que la scène : le navigateur choisit le même
          fichier, déjà en cache au moment du clic. */}
      <div
        aria-hidden
        className="pointer-events-none relative h-px w-px overflow-hidden opacity-0"
      >
        {[1, -1].map((step) => (
          <Image
            key={step}
            src={images[(index + step + images.length) % images.length]}
            alt=""
            fill
            loading="eager"
            sizes="(max-width: 1280px) 100vw, 1200px"
          />
        ))}
      </div>
    </div>
  );
}
