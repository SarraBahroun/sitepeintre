import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { dimensions } from "@/data/dimensions";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";

/* =============================================================================
   Page d'accueil — le bandeau des livres, celui des bijoux
   -----------------------------------------------------------------------------
   Le même dessin que les bandeaux d'exposition (ExpositionRow), à l'or :
   le titre à gauche, la flèche vers la page, puis quatre pièces côte à
   côte, entières, jamais rognées.
   ========================================================================== */

export type PreviewItem = {
  key: string;
  image: string;
  title: string;
  /** Ligne sous le titre : auteurs, prix… */
  detail?: string;
  /** Pastille posée sur l'image : « Vendu »… */
  badge?: string;
  /** Lien propre à la pièce, sinon celui du bandeau. */
  href?: string;
};

type Props = {
  href: string;
  eyebrow: string;
  title: string;
  lead?: string;
  cta: string;
  items: PreviewItem[];
  /** « + 2 livres », « + 69 pièces en 12 collections »… */
  more?: string;
};

export default function PreviewRow({
  href,
  eyebrow,
  title,
  lead,
  cta,
  items,
  more,
}: Props) {
  return (
    <div className="py-16 sm:py-20">
      {/* --- Titre + flèche --- */}
      <Reveal>
        <Link
          href={href}
          className="group flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h3 className="mt-3 font-display text-[clamp(2rem,4.6vw,3.4rem)] font-light leading-tight text-ivory transition-colors duration-500 group-hover:text-gold">
              {title}
            </h3>
            {lead && (
              <p className="mt-2 max-w-xl text-sm text-sage">{lead}</p>
            )}
          </div>

          <span className="flex items-center gap-4">
            <span className="text-[0.74rem] font-medium uppercase tracking-[0.2em] text-sage transition-colors duration-500 group-hover:text-gold">
              {cta}
            </span>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/25 transition-all duration-500 ease-[var(--ease-silk)] group-hover:scale-110 group-hover:border-gold/60 group-hover:bg-gold/10">
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                aria-hidden
                className="text-gold transition-transform duration-500 ease-[var(--ease-silk)] group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
              >
                <path
                  d="M12.5 1L18 7l-5.5 6M18 7H1"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
        </Link>
      </Reveal>

      <div className="rule-glow mt-8" aria-hidden />

      {/* --- Les pièces, côte à côte --- */}
      <RevealGroup className="mt-10 grid grid-cols-2 items-start gap-5 sm:gap-7 lg:grid-cols-4">
        {items.map((item) => (
          <RevealItem key={item.key}>
            <Link href={item.href ?? href} className="group block">
              <div className="relative overflow-hidden rounded-sm border border-gold/10 bg-night-2 transition-all duration-700 ease-[var(--ease-silk)] group-hover:border-gold/45">
                <Image
                  src={item.image}
                  alt={item.title}
                  {...dimensions(item.image)}
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="h-auto w-full transition-transform duration-[1.2s] ease-[var(--ease-silk)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-35" />
                {item.badge && (
                  <span className="absolute start-3 top-3 rounded-full border border-ember/40 bg-night/70 px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-ember backdrop-blur-md">
                    {item.badge}
                  </span>
                )}
              </div>

              <h4
                dir="auto"
                className="mt-3 font-display text-[1.05rem] font-light leading-snug text-ivory transition-colors duration-300 group-hover:text-gold"
              >
                {item.title}
              </h4>
              {item.detail && (
                <p dir="auto" className="mt-1 text-xs text-sage-dim">
                  {item.detail}
                </p>
              )}
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>

      {more && (
        <Reveal>
          <p className="mt-6 text-sm text-sage-dim">{more}</p>
        </Reveal>
      )}
    </div>
  );
}
