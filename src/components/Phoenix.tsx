"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/* =============================================================================
   Le passage du phénix
   -----------------------------------------------------------------------------
   Il ne tourne plus en boucle. Il traverse le champ une seule fois, d'un bord
   à l'autre, et s'en va. C'est la boucle qui trahissait le jouet pendu à son
   fil : au cinéma, l'oiseau passe, et le plan continue sans lui.

   Trois emprunts à l'image filmée, qui font le plus gros du réalisme :

     · le flou de vitesse. Net au sommet de sa course, là où il ralentit ;
       filé aux deux bords, là où il entre et sort le plus vite ;
     · la traîne. Trois doubles en retard de quelques centièmes, de plus en
       plus pâles — ce que donne une pose longue sur un sujet lumineux ;
     · la perspective. Il grandit en venant vers nous, décroît en s'éloignant,
       et s'incline sur la pente de sa trajectoire.
   ========================================================================== */

const RATIO = 721 / 1200;

/** Le passage, échantillonné. `t` va de 0 (hors champ) à 1 (hors champ). */
const STEPS = 40;

type Pass = {
  x: string[];
  y: string[];
  scale: number[];
  opacity: number[];
  rotate: number[];
  blur: string[];
  times: number[];
};

function buildPass(): Pass {
  const x: string[] = [];
  const y: string[] = [];
  const scale: number[] = [];
  const opacity: number[] = [];
  const rotate: number[] = [];
  const blur: string[] = [];
  const times: number[] = [];

  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS;
    times.push(t);

    // Il entre vite, ralentit au milieu, repart vite : une sinusoïde
    // sur la position donne exactement cela.
    const eased = 0.5 - Math.cos(Math.PI * t) / 2;
    const glide = t * 0.35 + eased * 0.65; // moitié linéaire, moitié ralentie

    x.push(`${-72 + glide * 144}vw`);

    // Une arche : il monte, puis redescend en sortant
    const arc = Math.sin(Math.PI * t);
    y.push(`${14 - arc * 26}vh`);

    // Au plus près à mi-course
    scale.push(0.4 + arc * 0.6);
    opacity.push(Math.min(1, Math.sin(Math.PI * t) * 2.4));

    // Il s'incline sur la pente qu'il suit
    const slope = Math.cos(Math.PI * t);
    rotate.push(-slope * 11);

    // Net là où il ralentit, filé là où il file
    const speed = 1 - arc;
    blur.push(`blur(${(speed * speed * 7).toFixed(2)}px)`);
  }

  return { x, y, scale, opacity, rotate, blur, times };
}

const PASS = buildPass();

const BLOOM = "brightness(1.65) saturate(1.8)";
const SHARP =
  "brightness(1.06) saturate(1.26) drop-shadow(0 0 14px rgba(255,205,105,0.8)) drop-shadow(0 0 44px rgba(255,160,50,0.55)) drop-shadow(0 0 110px rgba(255,120,25,0.35))";

/** Les doubles de la traîne : mêmes gestes, quelques centièmes plus tard. */
const TRAIL = [
  { delay: 0.16, opacity: 0.3, blur: 16 },
  { delay: 0.09, opacity: 0.45, blur: 9 },
  { delay: 0, opacity: 1, blur: 0 },
];

export default function Phoenix({
  size = 420,
  duration = 6.4,
  delay = 1.1,
}: {
  /** Largeur de l'oiseau à mi-course, en pixels. */
  size?: number;
  /** Durée du passage, en secondes. */
  duration?: number;
  /** Temps mort avant qu'il n'entre. */
  delay?: number;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {TRAIL.map((ghost) => (
        <motion.div
          key={ghost.delay}
          initial={{ opacity: 0 }}
          animate={{
            x: PASS.x,
            y: PASS.y,
            rotate: PASS.rotate,
            opacity: PASS.opacity.map((o) => o * ghost.opacity),
          }}
          transition={{
            duration,
            delay: delay + ghost.delay,
            ease: "linear",
            times: PASS.times,
          }}
          className="absolute left-1/2 top-1/2"
          style={{ willChange: "transform, opacity" }}
        >
          <motion.div
            initial={{ scale: PASS.scale[0] }}
            animate={{ scale: PASS.scale, filter: PASS.blur }}
            transition={{
              duration,
              delay: delay + ghost.delay,
              ease: "linear",
              times: PASS.times,
            }}
            style={{
              width: size,
              height: size * RATIO,
              marginLeft: -size / 2,
              marginTop: (-size * RATIO) / 2,
            }}
          >
            <div
              className="relative h-full w-full"
              style={
                ghost.blur ? { filter: `blur(${ghost.blur}px)` } : undefined
              }
            >
              <Image
                src="/images/oeuvres/phenix-profil.png"
                alt=""
                width={1200}
                height={721}
                priority
                aria-hidden
                className="absolute inset-0 h-full w-full scale-[1.08] opacity-70 blur-[22px]"
                style={{ filter: BLOOM }}
              />
              <Image
                src="/images/oeuvres/phenix-profil.png"
                alt=""
                width={1200}
                height={721}
                priority
                className="relative h-full w-full"
                style={{ filter: SHARP }}
              />
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
