import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

/* =============================================================================
   Petites pièces réutilisées d'une page à l'autre.
   ========================================================================== */

/** Enveloppe de section : largeur et respiration constantes. */
export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-[1400px] px-5 sm:px-8 ${className}`}
    >
      {children}
    </section>
  );
}

/** Titre de section : surtitre, titre et chapeau. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "start",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  align?: "start" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <header
      className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-3xl"} ${className}`}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.12] tracking-[0.01em] text-ivory">
        {title}
      </h2>
      <div
        className={`rule-glow mt-6 w-24 ${centered ? "mx-auto" : ""}`}
        aria-hidden
      />
      {lead && (
        <p className="mt-6 text-[0.98rem] leading-relaxed text-sage">{lead}</p>
      )}
    </header>
  );
}

/** Lien d'action, discret mais net. */
export function ActionLink({
  href,
  children,
  external = false,
  tone = "glow",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  tone?: "glow" | "gold";
}) {
  const color = tone === "gold" ? "text-gold" : "text-glow";
  const content = (
    <span className="group inline-flex items-center gap-2.5">
      <span
        className={`text-[0.78rem] font-medium uppercase tracking-[0.2em] ${color}`}
      >
        {children}
      </span>
      <span
        aria-hidden
        className={`h-px w-8 origin-left bg-current transition-all duration-500 ease-[var(--ease-silk)] group-hover:w-14 ${color}`}
      />
    </span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return <Link href={href}>{content}</Link>;
}

/** Paire étiquette / valeur des fiches d'œuvre et d'exposition. */
export function MetaRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-glow/10 py-3">
      <dt className="shrink-0 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-sage-dim">
        {label}
      </dt>
      <dd className="text-end text-sm text-ivory">{value}</dd>
    </div>
  );
}

/** Marque de disponibilité posée sur les vignettes et dans la fiche. */
export function StatusBadge({
  label,
  status,
  size = "sm",
}: {
  label: string;
  status: "available" | "sold" | "reserved" | "notForSale";
  size?: "sm" | "md";
}) {
  const tones: Record<typeof status, string> = {
    available: "border-glow/35 text-glow bg-glow/10",
    sold: "border-ember/40 text-ember bg-ember/10",
    reserved: "border-gold/40 text-gold bg-gold/10",
    notForSale: "border-sage/25 text-sage bg-sage/10",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border backdrop-blur-md ${tones[status]} ${
        size === "md"
          ? "px-3.5 py-1.5 text-[0.7rem]"
          : "px-2.5 py-1 text-[0.62rem]"
      } font-medium uppercase tracking-[0.14em]`}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full bg-current opacity-80"
      />
      {label}
    </span>
  );
}

/**
 * Emplacement en attente de contenu. Rend l'absence lisible plutôt que
 * de laisser un trou dans la page tant que les textes ne sont pas fournis.
 */
export function Placeholder({
  label,
  hint,
  className = "",
}: {
  label: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 rounded-sm border border-dashed border-glow/15 bg-night-2/40 px-8 py-16 text-center ${className}`}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
        <path
          d="M12 3c5 3 7 7 6 10s-5 5-8 4-5-5-4-8 3-5 6-6Z"
          stroke="var(--color-glow)"
          strokeWidth="1.1"
          fill="none"
          opacity="0.45"
        />
        <path
          d="M12 20V8"
          stroke="var(--color-glow)"
          strokeWidth="1.1"
          opacity="0.3"
        />
      </svg>
      <p className="text-sm text-sage">{label}</p>
      {/* Le chemin du fichier à remplir ne regarde que nous, pas le visiteur. */}
      {hint && process.env.NODE_ENV === "development" && (
        <p className="text-xs text-sage-dim">{hint}</p>
      )}
    </div>
  );
}
