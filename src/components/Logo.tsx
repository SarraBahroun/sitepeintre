import { site } from "@/data/site";
import type { Locale } from "@/i18n/routing";

/* =============================================================================
   Marque — monogramme HB inscrit dans une feuille, repris de la signature
   portée au bas des toiles, suivi du nom en toutes lettres.
   ========================================================================== */

export function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className={className}
      role="presentation"
    >
      <defs>
        <linearGradient id="hb-stroke" x1="6" y1="4" x2="42" y2="44">
          <stop offset="0%" stopColor="var(--color-glow)" />
          <stop offset="62%" stopColor="var(--color-gold-soft)" />
          <stop offset="100%" stopColor="var(--color-gold)" />
        </linearGradient>
      </defs>

      {/* la feuille : deux arcs qui se rejoignent en pointe */}
      <path
        d="M24 3 C 39 12, 45 26, 41 36 C 37 45, 25 46, 17 41 C 7 35, 5 18, 24 3 Z"
        stroke="url(#hb-stroke)"
        strokeWidth="1.2"
        opacity="0.5"
        fill="none"
      />

      {/* H */}
      <g
        stroke="url(#hb-stroke)"
        strokeWidth="1.9"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M16 16 L16 33" />
        <path d="M16 24.5 L25 24.5" />
        <path d="M25 16 L25 33" />
        {/* B adossé au montant du H */}
        <path d="M27.5 16.5 C 34 16.5, 35.5 20, 32.5 23 C 37 24.5, 36 31, 29 31.5" />
      </g>
    </svg>
  );
}

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
      <Monogram className="h-8 w-8 shrink-0 transition-transform duration-500 ease-[var(--ease-silk)] group-hover:rotate-[8deg] group-hover:scale-105" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.05rem] font-medium tracking-[0.14em] text-ivory">
            {name}
          </span>
          <span className="mt-1 font-sans text-[0.55rem] font-medium uppercase tracking-[0.3em] text-sage-dim transition-colors duration-500 group-hover:text-glow">
            {locale === "ar" ? "فنانة تشكيلية" : "artiste peintre"}
          </span>
        </span>
      )}
    </span>
  );
}
