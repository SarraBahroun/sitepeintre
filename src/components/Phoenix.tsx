"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/* =============================================================================
   Le vol du phénix
   -----------------------------------------------------------------------------
   L'oiseau est de profil, tourné vers la droite. Il ne tourne plus en rond
   autour du nom : il traverse l'écran entier, par une boucle large et creusée,
   et revient. Ce qui fait un vol crédible, et non un décor qui glisse :

     · il regarde toujours où il va. Dès qu'il repart vers la gauche,
       l'image se retourne ;
     · il s'incline sur sa trajectoire — le nez suit la tangente, amorti,
       comme un oiseau qui s'appuie sur l'air dans son virage ;
     · il grandit en passant devant, s'éteint et rapetisse au loin ;
     · ses ailes battent : la silhouette s'écrase et s'étire légèrement,
       en retard d'un temps sur la montée, et le corps suit.
   ========================================================================== */

const RATIO = 721 / 1200;
const BEAT = 0.9; // s — un battement d'aile
const BEAT_TIMES = [0, 0.16, 0.34, 0.5, 0.76, 1];
/** Descente brève et puissante, remontée longue : l'aile pousse puis se replace. */
const BEAT_SQUASH = [1.06, 1.0, 0.9, 0.95, 1.03, 1.06];
const BEAT_SKEW = [-2.2, -0.6, 2.6, 1.4, -1.2, -2.2];

const BLOOM = "brightness(1.7) saturate(1.85)";
const SHARP =
  "brightness(1.08) saturate(1.28) drop-shadow(0 0 12px rgba(255,205,105,0.85)) drop-shadow(0 0 38px rgba(255,160,50,0.6)) drop-shadow(0 0 95px rgba(255,120,25,0.38))";

type Flight = {
  x: number[];
  y: number[];
  scale: number[];
  opacity: number[];
  rotate: number[];
  scaleX: number[];
  times: number[];
};

/**
 * Une boucle qui balaie tout l'écran. Pas un cercle : une courbe creusée,
 * plus large que haute, pour que l'oiseau passe loin des bords autant que
 * devant le nom.
 */
function useFlight(w: number, h: number): Flight {
  return useMemo(() => {
    const steps = 160;
    const rx = w * 0.4;
    const ry = h * 0.33;

    const x: number[] = [];
    const y: number[] = [];
    const scale: number[] = [];
    const opacity: number[] = [];
    const scaleX: number[] = [];
    const raw: number[] = [];

    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * Math.PI * 2 + Math.PI / 2;
      // Les harmoniques creusent la boucle : elle cesse d'être un rond
      const px = Math.cos(a) * rx * (1 + 0.14 * Math.sin(3 * a));
      const py = Math.sin(a) * ry * (1 + 0.2 * Math.cos(2 * a));
      x.push(px);
      y.push(py);

      const front = (Math.sin(a) + 1) / 2; // 1 devant, 0 au loin
      scale.push(0.42 + front * 0.58);
      opacity.push(0.5 + front * 0.5);
    }

    // La tangente, prise sur le point suivant : elle donne le cap
    for (let i = 0; i <= steps; i++) {
      const n = (i + 1) % (steps + 1) || 1;
      const dx = x[n] - x[i];
      const dy = y[n] - y[i];
      const heading = (Math.atan2(dy, dx) * 180) / Math.PI;
      // L'image regarde à droite : vers la gauche, on la retourne
      const left = dx < 0;
      scaleX.push(left ? -1 : 1);
      raw.push(left ? heading - 180 : heading);
    }

    // On déroule les angles : sans cela, un passage de 179 à -179
    // ferait faire un tour complet à l'oiseau.
    const rotate: number[] = [raw[0]];
    for (let i = 1; i < raw.length; i++) {
      let d = raw[i] - raw[i - 1];
      while (d > 180) d -= 360;
      while (d < -180) d += 360;
      rotate.push(rotate[i - 1] + d);
    }
    // Amorti : un oiseau ne pointe pas à la verticale dans son virage
    const base = rotate[0];
    const damped = rotate.map((r) => base + (r - base) * 0.55);

    return {
      x,
      y,
      scale,
      opacity,
      rotate: damped,
      scaleX,
      times: x.map((_, i) => i / steps),
    };
  }, [w, h]);
}

export default function Phoenix({
  size = 300,
  duration = 11,
  className = "",
}: {
  /** Largeur de l'oiseau au plus près, en pixels. */
  size?: number;
  /** Durée d'un tour complet, en secondes. */
  duration?: number;
  className?: string;
}) {
  const [box, setBox] = useState({ w: 1200, h: 700 });

  useEffect(() => {
    // Hors du rendu : mesurer puis poser l'état d'affilée ferait
    // cascader les rendus.
    const measure = () =>
      setBox((b) => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        return b.w === w && b.h === h ? b : { w, h };
      });
    const id = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const flight = useFlight(box.w, box.h);
  const loop = {
    duration,
    ease: "linear" as const,
    repeat: Infinity,
    times: flight.times,
  };

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute left-1/2 top-1/2 h-0 w-0 ${className}`}
    >
      {/* Le trajet, et le cap */}
      <motion.div
        animate={{ x: flight.x, y: flight.y, rotate: flight.rotate }}
        transition={loop}
        style={{ willChange: "transform" }}
      >
        {/* La distance : il grandit devant, s'efface au loin */}
        <motion.div
          animate={{ scale: flight.scale, opacity: flight.opacity }}
          transition={loop}
        >
          {/* Le sens de vol : vers la gauche, l'image se retourne */}
          <motion.div
            animate={{ scaleX: flight.scaleX }}
            transition={loop}
            style={{ transformOrigin: "50% 50%" }}
          >
            {/* Le battement : la silhouette s'écrase puis s'étire */}
            <motion.div
              animate={{ scaleY: BEAT_SQUASH, skewY: BEAT_SKEW }}
              transition={{
                duration: BEAT,
                ease: [0.4, 0, 0.3, 1],
                repeat: Infinity,
                times: BEAT_TIMES,
              }}
              style={{
                width: size,
                height: size * RATIO,
                marginLeft: -size / 2,
                marginTop: (-size * RATIO) / 2,
                transformOrigin: "62% 48%", // l'épaule, non le centre
                willChange: "transform",
              }}
            >
              <div className="relative h-full w-full">
                <Image
                  src="/images/oeuvres/phenix-profil.png"
                  alt=""
                  width={1200}
                  height={721}
                  priority
                  aria-hidden
                  className="absolute inset-0 h-full w-full scale-[1.06] opacity-70 blur-[20px]"
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
        </motion.div>
      </motion.div>
    </div>
  );
}
