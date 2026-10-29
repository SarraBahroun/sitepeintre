"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/* =============================================================================
   Le phénix, et le battement de ses ailes
   -----------------------------------------------------------------------------
   L'oiseau est découpé en trois : l'aile gauche, l'aile droite, et le corps.
   Les ailes pivotent autour de l'épaule ; le corps, posé par-dessus, cache
   les coutures. Il monte et redescend d'un souffle, à contretemps du
   battement, comme un oiseau que ses ailes soulèvent.

   Chaque pièce est doublée d'une copie floutée et surexposée : c'est elle
   qui donne l'or fluorescent, et elle bat avec l'aile qu'elle embrase.
   ========================================================================== */

/* Mesures de l'image d'origine (1200 × 713), en proportions */
const LEFT_W = 560 / 1200;
const RIGHT_X = 640 / 1200;
const BODY_X = 450 / 1200;
const BODY_W = 310 / 1200;
const RATIO = 713 / 1200;

/** L'épaule, point autour duquel l'aile tourne. */
const PIVOT_LEFT = "107.1% 35%";
const PIVOT_RIGHT = "-7.1% 35%";

const BEAT = 1.15; // s — un battement complet

const BLOOM = "brightness(2.2) saturate(2.5)";
const SHARP =
  "brightness(1.2) saturate(1.65) drop-shadow(0 0 14px rgba(255,208,95,0.95)) drop-shadow(0 0 40px rgba(255,162,42,0.8)) drop-shadow(0 0 100px rgba(255,120,20,0.55))";

/** Une pièce de l'oiseau : sa nappe de feu, puis son trait net. */
function Piece({
  src,
  alt = "",
  width,
  height,
}: {
  src: string;
  alt?: string;
  width: number;
  height: number;
}) {
  return (
    <>
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        priority
        aria-hidden
        className="absolute inset-0 h-auto w-full scale-110 opacity-90 blur-[30px]"
        style={{ filter: BLOOM }}
      />
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        className="relative h-auto w-full"
        style={{ filter: SHARP }}
      />
    </>
  );
}

export default function Phoenix({ width }: { width: number }) {
  // Le battement : l'aile remonte vite, retombe plus lentement
  const wing = {
    animate: { rotate: [-20, 15, -20] },
    transition: {
      duration: BEAT,
      ease: [0.45, 0, 0.3, 1] as [number, number, number, number],
      repeat: Infinity,
      times: [0, 0.42, 1],
    },
  };

  return (
    <div
      className="relative"
      style={{ width, height: width * RATIO }}
      aria-hidden
    >
      {/* Aile gauche */}
      <motion.div
        animate={wing.animate}
        transition={wing.transition}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: `${LEFT_W * 100}%`,
          transformOrigin: PIVOT_LEFT,
        }}
      >
        <Piece
          src="/images/oeuvres/phenix/aile-gauche.png"
          width={560}
          height={713}
        />
      </motion.div>

      {/* Aile droite — même battement, en miroir */}
      <motion.div
        animate={{ rotate: [20, -15, 20] }}
        transition={wing.transition}
        style={{
          position: "absolute",
          left: `${RIGHT_X * 100}%`,
          top: 0,
          width: `${LEFT_W * 100}%`,
          transformOrigin: PIVOT_RIGHT,
        }}
      >
        <Piece
          src="/images/oeuvres/phenix/aile-droite.png"
          width={560}
          height={713}
        />
      </motion.div>

      {/* Le corps, posé par-dessus : il cache les coutures et respire */}
      <motion.div
        animate={{ y: ["2.5%", "-2.5%", "2.5%"] }}
        transition={{
          duration: BEAT,
          ease: "easeInOut",
          repeat: Infinity,
          times: [0, 0.42, 1],
        }}
        style={{
          position: "absolute",
          left: `${BODY_X * 100}%`,
          top: 0,
          width: `${BODY_W * 100}%`,
        }}
      >
        <Piece
          src="/images/oeuvres/phenix/corps.png"
          alt="Phénix"
          width={310}
          height={713}
        />
      </motion.div>
    </div>
  );
}
