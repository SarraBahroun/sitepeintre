"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

/* =============================================================================
   Fond d'ouverture — les toiles elles-mêmes
   -----------------------------------------------------------------------------
   Plein cadre, nettes, en fondu enchaîné lent, avec une lente dérive d'échelle.
   Un voile sombre descend par-dessus : la peinture reste lisible, le nom aussi.
   ========================================================================== */

export type HeroPlate = {
  src: string;
  /** Cadrage : « center », « top », « 60% 40% »… */
  position?: string;
  alt?: string;
};

const DURATION = 7000; // ms sur chaque toile

export default function HeroCanvas({ plates }: { plates: HeroPlate[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    if (plates.length < 2) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const id = setInterval(
      () => setIndex((i) => (i + 1) % plates.length),
      DURATION,
    );
    return () => clearInterval(id);
  }, [plates.length]);

  if (!plates.length) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={plates[index].src}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 2.2, ease: "easeInOut" },
              scale: { duration: DURATION / 1000 + 3, ease: "linear" },
            }}
            className="absolute inset-0"
          >
            <Image
              src={plates[index].src}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: plates[index].position ?? "center" }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* --- Les voiles : la toile reste visible, le texte reste lisible --- */}

      {/* assombrissement général, léger */}
      <div className="absolute inset-0 bg-night/45" />
      {/* colonne centrale, derrière le nom */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_52%_at_50%_46%,color-mix(in_oklab,var(--color-night)_78%,transparent),transparent_72%)]" />
      {/* raccord haut et bas avec le reste de la page */}
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-night via-night/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-night via-night/80 to-transparent" />
      {/* une pointe de vert, pour raccorder à la palette du site */}
      <div className="absolute inset-0 bg-moss/20 mix-blend-color" />

      {/* --- Repères de progression --- */}
      {plates.length > 1 && (
        <div className="absolute inset-x-0 bottom-28 flex justify-center gap-2.5">
          {plates.map((plate, i) => (
            <span
              key={plate.src}
              className={`h-px transition-all duration-700 ease-[var(--ease-silk)] ${
                i === index ? "w-10 bg-glow" : "w-4 bg-sage-dim/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
