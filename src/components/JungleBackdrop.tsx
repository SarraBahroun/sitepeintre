"use client";

import { useEffect, useRef } from "react";

/* =============================================================================
   Décor de fond — la jungle
   -----------------------------------------------------------------------------
   Trois plans superposés, fixes derrière le contenu :
     1. une nappe de lumière végétale qui respire — des dégradés à paliers,
        sans filtre de flou : un flou de 120 px recalculé à chaque image
        suffisait à rendre tout le site lourd ;
     2. des frondes découpées, posées dans les angles, qui ondulent ;
     3. une poussière lumineuse (canvas) qui dérive lentement.
   Le tout s'efface si l'utilisateur demande moins d'animations.
   ========================================================================== */

/* --- Plan 3 : la poussière lumineuse ------------------------------------ */

type Mote = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  hue: number;
  phase: number;
  speed: number;
};

function Motes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let motes: Mote[] = [];
    let frame = 0;

    // Deux teintes seulement : le turquoise des filaments, l'or des toiles.
    const hues = [168, 42];

    // Le halo et le cœur de chaque teinte, dessinés une seule fois : à
    // chaque image on ne fait plus que les poser, au lieu de recréer
    // soixante-dix dégradés.
    const SPRITE = 64;
    const sprites = new Map<number, HTMLCanvasElement>();
    for (const hue of hues) {
      const c = document.createElement("canvas");
      c.width = c.height = SPRITE;
      const g = c.getContext("2d");
      if (!g) return;
      const mid = SPRITE / 2;
      const halo = g.createRadialGradient(mid, mid, 0, mid, mid, mid);
      halo.addColorStop(0, `hsla(${hue}, 82%, 72%, 1)`);
      halo.addColorStop(1, `hsla(${hue}, 82%, 72%, 0)`);
      g.fillStyle = halo;
      g.fillRect(0, 0, SPRITE, SPRITE);
      g.fillStyle = `hsla(${hue}, 90%, 88%, 1)`;
      g.beginPath();
      g.arc(mid, mid, mid * (0.52 / 7) + 0.6, 0, Math.PI * 2);
      g.fill();
      sprites.set(hue, c);
    }

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Densité proportionnelle à la surface, plafonnée sur petits écrans.
      const count = Math.min(70, Math.round((width * height) / 26000));
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.7 + 0.5,
        vx: (Math.random() - 0.5) * 0.13,
        vy: -(Math.random() * 0.17 + 0.04),
        hue: hues[Math.random() > 0.72 ? 1 : 0],
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.014 + 0.005,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const m of motes) {
        m.phase += m.speed;
        m.x += m.vx + Math.sin(m.phase) * 0.22;
        m.y += m.vy;

        // Remise en bas de l'écran une fois sorti par le haut.
        if (m.y < -12) {
          m.y = height + 12;
          m.x = Math.random() * width;
        }
        if (m.x < -12) m.x = width + 12;
        if (m.x > width + 12) m.x = -12;

        const alpha = 0.18 + (Math.sin(m.phase) + 1) * 0.21;
        const size = m.r * 14;
        ctx.globalAlpha = alpha;
        ctx.drawImage(
          sprites.get(m.hue)!,
          m.x - size / 2,
          m.y - size / 2,
          size,
          size,
        );
      }
      ctx.globalAlpha = 1;

      frame = requestAnimationFrame(draw);
    };

    seed();
    draw();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(seed, 180);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 h-full w-full opacity-70"
    />
  );
}

/* --- Plan 2 : les frondes ----------------------------------------------- */

/** Une fronde : nervure centrale et folioles de part et d'autre. */
function Frond({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const leaflets = Array.from({ length: 11 }, (_, i) => {
    const t = i / 10;
    const y = 18 + t * 150;
    // Les folioles s'allongent au milieu de la fronde puis se resserrent.
    const span = Math.sin(t * Math.PI) * 52 + 10;
    const droop = 10 + t * 16;
    return { y, span, droop, key: i };
  });

  return (
    <svg
      viewBox="0 0 160 190"
      fill="none"
      aria-hidden
      className={className}
      style={style}
      preserveAspectRatio="xMidYMid meet"
    >
      <g stroke="currentColor" strokeLinecap="round" fill="none">
        {/* nervure */}
        <path
          d="M80 4 C 78 60, 80 120, 84 186"
          strokeWidth="1.6"
          opacity="0.85"
        />
        {leaflets.map(({ y, span, droop, key }) => (
          <g key={key}>
            <path
              d={`M80 ${y} C ${80 - span * 0.5} ${y + droop * 0.3}, ${80 - span * 0.85} ${y + droop * 0.7}, ${80 - span} ${y + droop}`}
              strokeWidth="1.1"
              opacity={0.3 + (span / 62) * 0.55}
            />
            <path
              d={`M80 ${y} C ${80 + span * 0.5} ${y + droop * 0.3}, ${80 + span * 0.85} ${y + droop * 0.7}, ${80 + span} ${y + droop}`}
              strokeWidth="1.1"
              opacity={0.3 + (span / 62) * 0.55}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Une feuille pleine, type monstera, pour les masses sombres. */
function Monstera({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden
      className={className}
      style={style}
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M100 6 C 150 26, 184 70, 186 120 C 188 160, 156 190, 112 194
           C 72 198, 30 176, 16 138 C 2 100, 22 48, 62 22 Z"
        fill="currentColor"
        opacity="0.9"
      />
      {/* fenestrations */}
      <g fill="var(--color-night)">
        <ellipse cx="100" cy="60" rx="7" ry="26" />
        <ellipse
          cx="132"
          cy="92"
          rx="6"
          ry="30"
          transform="rotate(22 132 92)"
        />
        <ellipse cx="68" cy="92" rx="6" ry="30" transform="rotate(-22 68 92)" />
        <ellipse
          cx="146"
          cy="140"
          rx="5.5"
          ry="24"
          transform="rotate(48 146 140)"
        />
        <ellipse
          cx="54"
          cy="140"
          rx="5.5"
          ry="24"
          transform="rotate(-48 54 140)"
        />
        <ellipse cx="100" cy="150" rx="6" ry="26" />
      </g>
    </svg>
  );
}

/* --- Assemblage ---------------------------------------------------------- */

export default function JungleBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {/* Plan 1 — la nappe de lumière */}
      <div className="absolute inset-0 bg-night" />

      <div
        className="animate-breathe absolute -top-[20%] left-[-10%] h-[70vmax] w-[70vmax] will-change-[transform,opacity]"
        style={{
          background:
            "radial-gradient(circle closest-side, color-mix(in oklab, var(--color-glow-deep) 34%, transparent) 0%, color-mix(in oklab, var(--color-glow-deep) 21%, transparent) 30%, color-mix(in oklab, var(--color-glow-deep) 9%, transparent) 58%, color-mix(in oklab, var(--color-glow-deep) 2%, transparent) 80%, transparent 100%)",
        }}
      />
      <div
        className="animate-breathe absolute right-[-18%] top-[22%] h-[60vmax] w-[60vmax] will-change-[transform,opacity]"
        style={{
          animationDelay: "-3.5s",
          background:
            "radial-gradient(circle closest-side, color-mix(in oklab, var(--color-gold-deep) 22%, transparent) 0%, color-mix(in oklab, var(--color-gold-deep) 14%, transparent) 30%, color-mix(in oklab, var(--color-gold-deep) 6%, transparent) 58%, color-mix(in oklab, var(--color-gold-deep) 2%, transparent) 80%, transparent 100%)",
        }}
      />
      <div
        className="animate-breathe absolute bottom-[-25%] left-[25%] h-[62vmax] w-[62vmax] will-change-[transform,opacity]"
        style={{
          animationDelay: "-6s",
          background:
            "radial-gradient(circle closest-side, color-mix(in oklab, var(--color-iris) 16%, transparent) 0%, color-mix(in oklab, var(--color-iris) 10%, transparent) 30%, color-mix(in oklab, var(--color-iris) 4%, transparent) 58%, color-mix(in oklab, var(--color-iris) 1%, transparent) 80%, transparent 100%)",
        }}
      />

      {/* Plan 2 — la végétation */}
      <Monstera className="animate-sway absolute -left-24 -top-20 w-[clamp(200px,26vw,420px)] text-jade opacity-50" />
      <Monstera
        className="animate-sway absolute -right-28 top-[42%] w-[clamp(180px,22vw,360px)] -scale-x-100 text-moss opacity-55"
        style={{ animationDelay: "-4s" }}
      />
      <Monstera
        className="animate-sway absolute -bottom-28 -left-16 w-[clamp(220px,28vw,440px)] text-jade opacity-40"
        style={{ animationDelay: "-7s" }}
      />

      <Frond
        className="animate-sway absolute -top-10 right-[8%] w-[clamp(120px,15vw,240px)] text-glow opacity-[0.13]"
        style={{ animationDelay: "-2s" }}
      />
      <Frond
        className="animate-sway absolute bottom-[6%] right-[-4%] w-[clamp(140px,17vw,280px)] rotate-[160deg] text-gold opacity-[0.11]"
        style={{ animationDelay: "-5.5s" }}
      />
      <Frond
        className="animate-sway absolute bottom-[-6%] left-[38%] hidden w-[clamp(120px,14vw,220px)] rotate-[185deg] text-glow opacity-[0.09] lg:block"
        style={{ animationDelay: "-8.5s" }}
      />

      {/* Plan 3 — la poussière */}
      <Motes />

      {/* Voile du haut : garde la barre de navigation lisible */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-night via-night/70 to-transparent" />
      {/* Voile du bas : assoit le pied de page */}
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-night via-night/60 to-transparent" />
    </div>
  );
}
