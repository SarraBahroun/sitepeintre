"use client";

/* =============================================================================
   Traînées de lumière
   -----------------------------------------------------------------------------
   Des filaments fluo qui traversent le champ en diagonale, à des vitesses et
   des hauteurs différentes. Ils occupent le regard pendant que le phénix
   tourne, et donnent au rideau sa vitesse.

   Tirage déterministe : le serveur et le navigateur dessinent les mêmes
   traînées, sans quoi l'hydratation se plaindrait.
   ========================================================================== */

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Streak = {
  top: number; // %
  length: number; // vw
  thickness: number; // px
  duration: number; // s
  delay: number; // s
  tilt: number; // deg
  gold: boolean;
  blur: number; // px
};

const STREAKS: Streak[] = (() => {
  const rnd = mulberry32(905412);
  return Array.from({ length: 14 }, () => ({
    top: rnd() * 104 - 2,
    length: 14 + rnd() * 30,
    thickness: rnd() > 0.7 ? 2 : 1,
    duration: 1.7 + rnd() * 2.6,
    delay: -rnd() * 5,
    tilt: -16 + rnd() * 10,
    gold: rnd() > 0.38,
    blur: rnd() > 0.55 ? 1.4 : 0,
  }));
})();

export default function LightStreaks() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {STREAKS.map((s, i) => {
        const colour = s.gold ? "var(--color-gold-soft)" : "var(--color-glow)";
        return (
          <span
            key={i}
            className="animate-streak absolute block rounded-full"
            style={
              {
                ["--tilt" as string]: `${s.tilt}deg`,
                top: `${s.top}%`,
                left: 0,
                width: `${s.length}vw`,
                height: `${s.thickness}px`,
                animationDuration: `${s.duration}s`,
                animationDelay: `${s.delay}s`,
                filter: s.blur ? `blur(${s.blur}px)` : undefined,
                background: `linear-gradient(90deg, transparent, ${colour} 55%, #fff 80%, transparent)`,
                boxShadow: `0 0 10px ${colour}, 0 0 26px ${colour}`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
