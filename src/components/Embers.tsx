"use client";

/* =============================================================================
   Les braises
   -----------------------------------------------------------------------------
   Des escarbilles qui montent, dérivent et s'éteignent. Elles remplacent les
   traînées qui barraient le champ : une ligne qui traverse l'écran tire l'œil
   et tranche ; une braise qui monte respire avec l'image.

   Tirage déterministe : le serveur et le navigateur dessinent les mêmes
   braises, sans quoi l'hydratation se plaindrait.
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

type Ember = {
  left: number; // %
  size: number; // px
  duration: number; // s
  delay: number; // s
  drift: number; // px — la dérive latérale en montant
  gold: boolean;
};

const EMBERS: Ember[] = (() => {
  const rnd = mulberry32(31415926);
  return Array.from({ length: 34 }, () => ({
    left: rnd() * 100,
    size: 1.4 + rnd() * 3.2,
    duration: 7 + rnd() * 9,
    delay: -rnd() * 16, // négatif : le champ est déjà peuplé à l'ouverture
    drift: (rnd() - 0.5) * 160,
    gold: rnd() > 0.28,
  }));
})();

export default function Embers() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {EMBERS.map((e, i) => {
        const colour = e.gold ? "var(--color-gold-soft)" : "var(--color-glow)";
        return (
          <span
            key={i}
            className="animate-ember absolute block rounded-full"
            style={
              {
                "--drift": `${e.drift}px`,
                left: `${e.left}%`,
                bottom: "-6%",
                width: `${e.size}px`,
                height: `${e.size}px`,
                background: colour,
                boxShadow: `0 0 ${e.size * 3}px ${colour}, 0 0 ${e.size * 8}px ${colour}`,
                animationDuration: `${e.duration}s`,
                animationDelay: `${e.delay}s`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
