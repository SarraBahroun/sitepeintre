"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/* =============================================================================
   Le phénix, et le battement de ses ailes
   -----------------------------------------------------------------------------
   L'oiseau est découpé en trois : l'aile gauche, l'aile droite, et le corps.
   Les ailes pivotent autour de l'épaule ; le corps, posé par-dessus, cache
   les coutures.

   Ce qui sépare un battement crédible d'un pantin de papier :

     · le rythme n'est pas symétrique. La descente est brève et puissante,
       la remontée longue et molle — c'est elle qui porte l'oiseau ;
     · l'aile n'est pas une planche. Son extrémité traîne sur le mouvement,
       la plume ploie : un léger cisaillement, en retard d'un temps ;
     · au haut et au bas de la course l'aile pointe vers nous, donc se
       raccourcit. Une compression horizontale rend ce raccourci ;
     · le corps se soulève sur la descente, retombe sur la remontée.
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

const BEAT = 1.05; // s — un battement complet

/* Les instants du battement : descente brève, remontée longue */
const TIMES = [0, 0.16, 0.34, 0.5, 0.76, 1];

/* Haut de course → descente → bas de course → remontée */
const WING_ROTATE = [-26, 0, 19, 11, -11, -26];
/** L'extrémité traîne : la plume ploie à contretemps de la course. */
const WING_SKEW = [7, 3, -8, -4, 4, 7];
/** Aux extrêmes, l'aile pointe vers nous : elle paraît plus courte. */
const WING_SQUEEZE = [0.88, 0.97, 1, 0.99, 0.92, 0.88];
/** Le corps se soulève sur la descente. */
const BODY_LIFT = ["2.2%", "0.4%", "-2.6%", "-1.8%", "1.2%", "2.2%"];

const BLOOM = "brightness(1.75) saturate(1.9)";
const SHARP =
  "brightness(1.1) saturate(1.3) drop-shadow(0 0 10px rgba(255,205,105,0.8)) drop-shadow(0 0 32px rgba(255,160,50,0.6)) drop-shadow(0 0 86px rgba(255,120,25,0.4))";

const EASE = [0.4, 0, 0.3, 1] as [number, number, number, number];

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
        className="absolute inset-0 h-auto w-full scale-[1.06] opacity-70 blur-[22px]"
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

/** Une aile, et sa course. `side` vaut -1 à gauche, +1 à droite. */
function Wing({ side }: { side: -1 | 1 }) {
  const left = side === -1;
  return (
    <motion.div
      animate={{
        rotate: WING_ROTATE.map((r) => r * side * -1),
        skewY: WING_SKEW.map((s) => s * side * -1),
        scaleX: WING_SQUEEZE,
      }}
      transition={{
        duration: BEAT,
        ease: EASE,
        repeat: Infinity,
        times: TIMES,
      }}
      style={{
        position: "absolute",
        left: left ? 0 : `${RIGHT_X * 100}%`,
        top: 0,
        width: `${LEFT_W * 100}%`,
        transformOrigin: left ? PIVOT_LEFT : PIVOT_RIGHT,
        willChange: "transform",
      }}
    >
      <Piece
        src={`/images/oeuvres/phenix/aile-${left ? "gauche" : "droite"}.png`}
        width={560}
        height={713}
      />
    </motion.div>
  );
}

export default function Phoenix({ width }: { width: number }) {
  return (
    <div
      className="relative"
      style={{ width, height: width * RATIO }}
      aria-hidden
    >
      <Wing side={-1} />
      <Wing side={1} />

      {/* Le corps, posé par-dessus : il cache les coutures et se soulève */}
      <motion.div
        animate={{ y: BODY_LIFT }}
        transition={{
          duration: BEAT,
          ease: EASE,
          repeat: Infinity,
          times: TIMES,
        }}
        style={{
          position: "absolute",
          left: `${BODY_X * 100}%`,
          top: 0,
          width: `${BODY_W * 100}%`,
          willChange: "transform",
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
