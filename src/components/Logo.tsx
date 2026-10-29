import { site } from "@/data/site";
import type { Locale } from "@/i18n/routing";

/* =============================================================================
   La marque
   -----------------------------------------------------------------------------
   Le monogramme HB est relevé de la signature que l'artiste porte au bas de
   ses toiles. Il tient lieu de nervure à une plume de phénix : les barbes
   s'écartent de part et d'autre des lettres, la hampe court derrière.

   Trois états, parce qu'un dessin fin ne survit pas à toutes les tailles :

     · `Monogram feather` — les lettres dans leur plume. C'est la marque,
       partout où elle tient : il lui faut 44 px, et une densité de barbes
       accordée à sa taille (voir `density`).
     · `Monogram` seul — les lettres, rien d'autre. Le dernier recours,
       quand la place manque vraiment : favicon, vignettes.
     · `Signature` — la plume, les lettres, et le nom tracé dessous. Il faut
       140 px au moins pour que le nom se lise.
   ========================================================================== */

/** Les barbes, écartées d'un couloir central où logent les lettres. */
function barbs(count: number) {
  const AXIS = 110;
  const CHANNEL = 14;
  const REACH = 70;
  const TOP = 18;
  const BOTTOM = 196;

  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const y = TOP + t * (BOTTOM - TOP);
    const span = Math.sin(t * Math.PI) * REACH + 5;
    const drop = 6 + t * 11;
    const opacity = 0.26 + Math.sin(t * Math.PI) * 0.6;

    return (
      <g key={i}>
        {[-1, 1].map((side) => (
          <path
            key={side}
            d={`M${AXIS + side * CHANNEL} ${y.toFixed(1)} Q${(AXIS + side * (CHANNEL + span * 0.55)).toFixed(1)} ${(y + drop * 0.35).toFixed(1)} ${(AXIS + side * (CHANNEL + span)).toFixed(1)} ${(y + drop).toFixed(1)}`}
            stroke="url(#hb-plume)"
            strokeWidth={count < 24 ? 1.5 : 1.1}
            fill="none"
            strokeLinecap="round"
            opacity={opacity.toFixed(2)}
          />
        ))}
      </g>
    );
  });
}

/** Le tracé des lettres, tel qu'elle les signe. */
function letters(transform?: string) {
  return (
    <g
      transform={transform}
      fill="none"
      stroke="url(#hb-encre)"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* la hampe du H, terminée par une boucle */}
      <path
        d="M34 10 C 30 32, 28 56, 29 74 C 29 82, 34 85, 40 81"
        strokeWidth="2.6"
      />
      {/* la barre, lancée vers la droite */}
      <path d="M24 48 C 40 44, 56 42, 70 40" strokeWidth="2.3" />
      {/* la seconde hampe, qui se prolonge dans le B */}
      <path d="M64 12 C 60 34, 58 58, 58 78" strokeWidth="2.6" />
      {/* les deux panses du B */}
      <path
        d="M64 16 C 80 12, 94 20, 88 30 C 84 37, 74 39, 68 39"
        strokeWidth="2.4"
      />
      <path
        d="M68 39 C 86 40, 96 50, 88 60 C 81 68, 68 68, 60 64"
        strokeWidth="2.4"
      />
    </g>
  );
}

function Defs() {
  return (
    <defs>
      <linearGradient id="hb-plume" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--color-gold-soft)" />
        <stop offset="58%" stopColor="var(--color-gold)" />
        <stop offset="100%" stopColor="var(--color-glow)" />
      </linearGradient>
      <linearGradient id="hb-encre" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="var(--color-gold-soft)" />
        <stop offset="100%" stopColor="var(--color-gold)" />
      </linearGradient>
    </defs>
  );
}

export function Monogram({
  className = "",
  feather = false,
  density = 38,
}: {
  className?: string;
  /** Pose les lettres dans leur plume. À réserver au-delà de 44 px. */
  feather?: boolean;
  /**
   * Nombre de barbes. Elles doivent s'espacer quand la marque rapetisse :
   * à 52 px, trente-huit barbes se referment en tache, dix-huit se
   * comptent encore. Elles s'épaississent d'autant.
   */
  density?: number;
}) {
  if (!feather) {
    // Les lettres seules : le cadrage serre au plus près du tracé
    return (
      <svg viewBox="18 4 84 88" fill="none" aria-hidden className={className}>
        <Defs />
        {letters()}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 220 215" fill="none" aria-hidden className={className}>
      <Defs />
      {barbs(density)}
      {/* la hampe, derrière les lettres */}
      <path
        d="M110 14 C 107 70, 108 140, 113 200"
        stroke="url(#hb-plume)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
        strokeLinecap="round"
      />
      {letters("translate(40 52) scale(1.45)")}
    </svg>
  );
}

/** La marque entière : la plume, les lettres, et le nom tracé dessous. */
export function Signature({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 250" fill="none" aria-hidden className={className}>
      <Defs />
      {barbs(38)}
      <path
        d="M110 14 C 107 70, 108 140, 113 200"
        stroke="url(#hb-plume)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
        strokeLinecap="round"
      />
      {letters("translate(40 52) scale(1.45)")}
      <text
        x="110"
        y="232"
        fill="var(--color-gold)"
        opacity="0.78"
        fontFamily="var(--font-display), Georgia, serif"
        fontStyle="italic"
        fontSize="16"
        textAnchor="middle"
        letterSpacing="1.6"
      >
        Bahroun Hana
      </text>
    </svg>
  );
}

/* --- La marque de la barre de navigation ------------------------------- */

export default function Logo({
  locale,
  compact = false,
}: {
  locale: Locale;
  compact?: boolean;
}) {
  const name = locale === "ar" ? site.nameAr : site.name;

  return (
    <span className="group inline-flex items-center gap-2.5">
      <Monogram
        feather
        density={16}
        className="h-[52px] w-[52px] shrink-0 transition-transform duration-500 ease-[var(--ease-silk)] group-hover:rotate-[4deg] group-hover:scale-105"
      />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.05rem] font-medium tracking-[0.14em] text-ivory">
            {name}
          </span>
          <span className="mt-1 font-sans text-[0.55rem] font-medium uppercase tracking-[0.3em] text-sage-dim transition-colors duration-500 group-hover:text-gold">
            {locale === "ar" ? "فنانة تشكيلية" : "artiste peintre"}
          </span>
        </span>
      )}
    </span>
  );
}
