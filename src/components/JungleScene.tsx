"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* =============================================================================
   Décor d'ouverture — « La Jungle nous observe »
   -----------------------------------------------------------------------------
   Pas une photographie : un dessin, construit au trait comme les toiles de
   l'artiste. Une face de fauve et un oiseau naissent d'un faisceau de
   filaments lumineux, tandis que des regards s'allument dans le sous-bois.
   Les plans défilent à des vitesses différentes au scroll.
   ========================================================================== */

/* --- Générateur déterministe : même dessin au serveur et au navigateur --- */

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Filament = { d: string; w: number; o: number; gold: boolean };

/**
 * La face du fauve : des traits partent d'une ellipse intérieure et
 * s'échappent vers l'extérieur, plus longs sur les joues (la collerette)
 * et au sommet du crâne (les oreilles).
 */
function buildFace(seed: number, count: number): Filament[] {
  const rnd = mulberry32(seed);
  const cx = 400;
  const cy = 300;
  const irx = 84;
  const iry = 76;
  const out: Filament[] = [];

  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + (rnd() - 0.5) * 0.07;

    const start = 0.3 + rnd() * 0.34;
    const x0 = cx + Math.cos(a) * irx * start;
    const y0 = cy + Math.sin(a) * iry * start;

    const cheeks = Math.abs(Math.cos(a)); // 1 sur les côtés
    const crown = Math.max(0, -Math.sin(a)); // 1 au sommet
    const len = 1.45 + cheeks * 1.55 + crown * 0.95 + rnd() * 0.75;

    const x1 = cx + Math.cos(a) * irx * len;
    const y1 = cy + Math.sin(a) * iry * len;

    // Point de contrôle poussé perpendiculairement : le trait se courbe
    const sweep = (rnd() - 0.5) * 76;
    const mx = (x0 + x1) / 2 - Math.sin(a) * sweep;
    const my = (y0 + y1) / 2 + Math.cos(a) * sweep;

    out.push({
      d: `M${x0.toFixed(1)} ${y0.toFixed(1)}Q${mx.toFixed(1)} ${my.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`,
      w: 0.35 + rnd() * 0.95,
      o: 0.1 + rnd() * 0.46,
      gold: rnd() > 0.8,
    });
  }
  return out;
}

/** L'oiseau : deux éventails d'ailes et une queue, au même trait. */
function buildBird(seed: number, perWing: number): Filament[] {
  const rnd = mulberry32(seed);
  const cx = 400;
  const cy = 300;
  const out: Filament[] = [];

  for (const side of [-1, 1]) {
    for (let i = 0; i < perWing; i++) {
      const t = i / (perWing - 1);
      const ang = -1.18 + t * 1.52; // de l'épaule vers le bout de l'aile
      const envelope = Math.sin(t * Math.PI) * 0.72 + 0.34;
      const len = 168 * envelope * (0.82 + rnd() * 0.36);

      const x0 = cx + side * (6 + rnd() * 16);
      const y0 = cy + (rnd() - 0.5) * 26;
      const x1 = cx + side * Math.cos(ang) * len;
      const y1 = cy + Math.sin(ang) * len;

      const mx = (x0 + x1) / 2 + side * 20;
      const my = (y0 + y1) / 2 + 34 * envelope;

      out.push({
        d: `M${x0.toFixed(1)} ${y0.toFixed(1)}Q${mx.toFixed(1)} ${my.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`,
        w: 0.4 + rnd() * 0.85,
        o: 0.12 + rnd() * 0.44,
        gold: rnd() > 0.68,
      });
    }
  }

  // la queue, qui retombe
  for (let i = 0; i < 14; i++) {
    const t = i / 13;
    const spread = (t - 0.5) * 72;
    const len = 150 - Math.abs(t - 0.5) * 120;
    out.push({
      d: `M${cx} ${cy + 10}Q${cx + spread * 0.5} ${cy + len * 0.6} ${cx + spread} ${cy + len}`,
      w: 0.4 + rnd() * 0.7,
      o: 0.1 + rnd() * 0.34,
      gold: rnd() > 0.7,
    });
  }

  return out;
}

const FACE = buildFace(20260529, 190);
const BIRD = buildBird(77041, 26);

/* --- Les regards du sous-bois ------------------------------------------- */

const WATCHERS = [
  { x: 9, y: 26, s: 1.15, d: 0, gold: false },
  { x: 88, y: 19, s: 0.85, d: 2.4, gold: true },
  { x: 17, y: 72, s: 0.7, d: 5.1, gold: true },
  { x: 93, y: 62, s: 1.0, d: 3.3, gold: false },
  { x: 72, y: 84, s: 0.62, d: 6.8, gold: false },
  { x: 33, y: 12, s: 0.55, d: 8.2, gold: true },
];

function Watcher({
  s,
  delay,
  gold,
}: {
  s: number;
  delay: number;
  gold: boolean;
}) {
  const colour = gold ? "var(--color-gold)" : "var(--color-glow)";
  return (
    <svg
      viewBox="0 0 60 24"
      aria-hidden
      className="animate-watch absolute h-auto"
      style={{ width: `${s * 58}px`, animationDelay: `${delay}s` }}
    >
      <defs>
        <radialGradient id={`w-${delay}-${gold}`}>
          <stop offset="0%" stopColor={colour} stopOpacity="0.9" />
          <stop offset="100%" stopColor={colour} stopOpacity="0" />
        </radialGradient>
      </defs>
      {[16, 44].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="12" r="12" fill={`url(#w-${delay}-${gold})`} />
          <ellipse cx={cx} cy="12" rx="6.5" ry="4" fill={colour} opacity="0.85" />
          <ellipse cx={cx} cy="12" rx="1.7" ry="3.4" fill="var(--color-night)" />
        </g>
      ))}
    </svg>
  );
}

/* --- Les masses de feuillage -------------------------------------------- */

function Canopy({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 300"
      aria-hidden
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M0 0h1200v96c-54 34-96-6-150 14s-72 54-132 44-80-56-140-44-66 58-130 52-86-62-148-54-78 60-140 52S98 118 44 134 0 168 0 168Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* --- Assemblage ---------------------------------------------------------- */

export default function JungleScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Chaque plan dérive à sa vitesse : le lointain lentement, le proche vite.
  const faceY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const faceScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const birdY = useTransform(scrollYProgress, [0, 1], ["0%", "-46%"]);
  const canopyY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const watchY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <motion.div style={{ opacity: fade }} className="absolute inset-0">
        {/* --- Plan lointain : la face du fauve --- */}
        <motion.div
          style={{ y: faceY, scale: faceScale }}
          className="absolute left-1/2 top-1/2 h-[min(104vh,980px)] w-[min(104vh,980px)] -translate-x-1/2 -translate-y-1/2"
        >
          <svg viewBox="0 0 800 600" className="h-full w-full">
            <defs>
              <linearGradient id="fil-glow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--color-glow)" />
                <stop offset="55%" stopColor="#bdf5ea" />
                <stop offset="100%" stopColor="var(--color-glow-soft)" />
              </linearGradient>
              <linearGradient id="fil-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--color-gold-soft)" />
                <stop offset="100%" stopColor="var(--color-gold)" />
              </linearGradient>
              <radialGradient id="face-veil">
                <stop offset="38%" stopColor="transparent" />
                <stop offset="100%" stopColor="var(--color-night)" />
              </radialGradient>
            </defs>

            <g fill="none" strokeLinecap="round">
              {FACE.map((f, i) => (
                <path
                  key={i}
                  d={f.d}
                  stroke={f.gold ? "url(#fil-gold)" : "url(#fil-glow)"}
                  strokeWidth={f.w}
                  opacity={f.o * 0.62}
                />
              ))}
            </g>

            {/* Les yeux du fauve — le cœur du regard */}
            <g>
              {[352, 448].map((cx) => (
                <g key={cx}>
                  <ellipse
                    cx={cx}
                    cy="284"
                    rx="19"
                    ry="11"
                    fill="var(--color-gold)"
                    opacity="0.3"
                  />
                  <ellipse
                    cx={cx}
                    cy="284"
                    rx="11"
                    ry="6.6"
                    fill="var(--color-gold-soft)"
                    opacity="0.5"
                  />
                  <ellipse
                    cx={cx}
                    cy="284"
                    rx="2.6"
                    ry="5.4"
                    fill="var(--color-night)"
                    opacity="0.75"
                  />
                </g>
              ))}
            </g>

            {/* Le voile qui noie les bords dans la nuit */}
            <rect width="800" height="600" fill="url(#face-veil)" />
          </svg>
        </motion.div>

        {/* --- Plan médian : l'oiseau --- */}
        <motion.div
          style={{ y: birdY }}
          className="animate-drift absolute -top-[4%] end-[4%] h-[clamp(190px,30vw,460px)] w-[clamp(190px,30vw,460px)] opacity-[0.55]"
        >
          <svg viewBox="0 0 800 600" className="h-full w-full">
            <g fill="none" strokeLinecap="round">
              {BIRD.map((f, i) => (
                <path
                  key={i}
                  d={f.d}
                  stroke={f.gold ? "url(#fil-gold)" : "url(#fil-glow)"}
                  strokeWidth={f.w}
                  opacity={f.o * 0.7}
                />
              ))}
            </g>
          </svg>
        </motion.div>

        {/* --- Les regards --- */}
        <motion.div style={{ y: watchY }} className="absolute inset-0">
          {WATCHERS.map((w) => (
            <div
              key={`${w.x}-${w.y}`}
              className="absolute"
              style={{
                left: `${w.x}%`,
                top: `${w.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <Watcher s={w.s} delay={w.d} gold={w.gold} />
            </div>
          ))}
        </motion.div>

        {/* --- Plan proche : la canopée, en haut et en bas --- */}
        <motion.div style={{ y: canopyY }} className="absolute inset-0">
          <Canopy className="absolute inset-x-0 top-0 h-[22vh] w-full text-moss opacity-80" />
          <Canopy className="absolute inset-x-0 bottom-0 h-[26vh] w-full rotate-180 text-moss opacity-90" />
        </motion.div>
      </motion.div>
    </div>
  );
}
