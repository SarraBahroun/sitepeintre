import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Exposition } from "@/data/types";
import { t as tr, formatPrice } from "@/data/types";
import { dimensions } from "@/data/dimensions";
import { StatusBadge } from "./ui";
import Reveal, { RevealGroup, RevealItem } from "./Reveal";

/* =============================================================================
   Page d'accueil — un bandeau par exposition
   -----------------------------------------------------------------------------
   Le titre de l'exposition à gauche, ses toiles alignées à droite, et une
   flèche qui emmène vers la page complète.
   ========================================================================== */

export default async function ExpositionRow({
  expo,
  locale,
  lead,
}: {
  expo: Exposition;
  locale: Locale;
  lead?: string;
}) {
  const t = await getTranslations("home");
  const te = await getTranslations("expo");
  const ta = await getTranslations("artwork");

  const href = `/expositions/${expo.slug}`;
  const accentText =
    expo.accent === "gold"
      ? "text-gold"
      : expo.accent === "iris"
        ? "text-iris"
        : "text-glow";
  const accentBorder =
    expo.accent === "gold"
      ? "group-hover:border-gold/45"
      : expo.accent === "iris"
        ? "group-hover:border-iris/45"
        : "group-hover:border-glow/45";

  // Au plus quatre toiles en vitrine ; le reste se découvre sur la page.
  const preview = expo.artworks.slice(0, 4);
  const remaining = expo.artworks.length - preview.length;

  return (
    <div className="py-16 sm:py-20">
      {/* --- Titre + flèche --- */}
      <Reveal>
        <Link
          href={href}
          className="group flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <p className="eyebrow">
              {expo.year}
              {expo.venue[locale] && (
                <span className="text-sage-dim">
                  {" "}
                  · {tr(expo.venue, locale)}, {tr(expo.city, locale)}
                </span>
              )}
            </p>
            <h3 className="mt-3 flex items-baseline gap-4 font-display text-[clamp(2rem,4.6vw,3.4rem)] font-light leading-tight text-ivory transition-colors duration-500 group-hover:text-glow">
              {tr(expo.title, locale)}
              <span
                aria-hidden
                className={`font-sans text-xs tracking-[0.3em] ${accentText} opacity-50`}
              >
                {expo.numeral}
              </span>
            </h3>
            {lead && <p className="mt-2 text-sm text-sage">{lead}</p>}
          </div>

          {/* La flèche demandée : emmène vers la page de l'exposition */}
          <span className="flex items-center gap-4">
            <span className="text-[0.74rem] font-medium uppercase tracking-[0.2em] text-sage transition-colors duration-500 group-hover:text-glow">
              {t("seeExposition")}
            </span>
            <span
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-glow/20 transition-all duration-500 ease-[var(--ease-silk)] group-hover:scale-110 group-hover:border-glow/60 group-hover:bg-glow/10`}
            >
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                aria-hidden
                className="text-glow transition-transform duration-500 ease-[var(--ease-silk)] group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
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

      {/* --- Les toiles, côte à côte --- */}
      {preview.length > 0 ? (
        <RevealGroup className="mt-10 grid grid-cols-2 items-start gap-5 sm:gap-7 lg:grid-cols-4">
          {preview.map((artwork) => {
            const title = tr(artwork.title, locale);
            const price = formatPrice(artwork.price, artwork.currency, locale);

            return (
              <RevealItem key={artwork.id}>
                <Link href={href} className="group block">
                  {/* La toile entière, jamais rognée : elle garde sa
                      proportion et la vignette s'y plie. */}
                  <div
                    className={`relative overflow-hidden rounded-sm border border-glow/10 bg-night-2 transition-all duration-700 ease-[var(--ease-silk)] ${accentBorder}`}
                  >
                    <Image
                      src={artwork.image}
                      alt={title || tr(expo.title, locale)}
                      {...dimensions(artwork.image)}
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="h-auto w-full transition-transform duration-[1.2s] ease-[var(--ease-silk)] group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night/75 via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-45" />
                    <div className="absolute start-3 top-3">
                      <StatusBadge
                        label={ta(`status.${artwork.status}`)}
                        status={artwork.status}
                      />
                    </div>
                  </div>

                  <h4 className="mt-3 font-display text-[1.05rem] font-light leading-snug text-ivory transition-colors duration-300 group-hover:text-glow">
                    {title || (
                      <span className="text-sage-dim italic">
                        {locale === "ar" ? "بدون عنوان" : "Sans titre"}
                      </span>
                    )}
                  </h4>
                  <p className="mt-1 text-xs text-sage-dim">
                    {artwork.dimensions}
                    {artwork.dimensions && price && " · "}
                    {artwork.status !== "sold" && price}
                  </p>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      ) : (
        <Reveal>
          <p className="mt-10 text-sm text-sage-dim italic">
            {te("artworksTitle")} — {expo.vernissage.length} photos
          </p>
        </Reveal>
      )}

      {remaining > 0 && (
        <Reveal>
          <p className="mt-6 text-sm text-sage-dim">
            + {remaining} {te("artworksCount")}
          </p>
        </Reveal>
      )}
    </div>
  );
}
