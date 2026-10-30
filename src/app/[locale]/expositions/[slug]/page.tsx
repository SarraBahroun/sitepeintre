import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import {
  expositions,
  getExposition,
  getSiblingExpositions,
} from "@/data/expositions";
import { t as tr, tRich } from "@/data/types";

import Reveal from "@/components/Reveal";
import ArtworkGallery from "@/components/ArtworkGallery";
import VernissageCarousel from "@/components/VernissageCarousel";
import ExpoFilm from "@/components/ExpoFilm";
import MediaGallery from "@/components/MediaGallery";
import {
  Section,
  SectionHeading,
  ActionLink,
  Placeholder,
} from "@/components/ui";

/* =============================================================================
   Une exposition — même gabarit pour La Jungle I, II, et les suivantes.
   ========================================================================== */

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    expositions.map((expo) => ({ locale, slug: expo.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const expo = getExposition(slug);
  if (!expo) return {};

  const title = tr(expo.title, locale as Locale);
  return {
    title,
    description: tr(expo.subtitle, locale as Locale),
    openGraph: expo.cover ? { images: [expo.cover] } : undefined,
  };
}

export default async function ExpositionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = raw as Locale;
  setRequestLocale(locale);

  const expo = getExposition(slug);
  if (!expo) notFound();

  const t = await getTranslations("expo");
  const tc = await getTranslations("common");
  const tm = await getTranslations("media");
  const { previous, next } = getSiblingExpositions(slug);

  const statement = tRich(expo.statement, locale);
  // Le fond de page : la jungle commune, ou la vignette à défaut
  const backdrop = expo.backdrop ?? expo.cover;
  const accentText =
    expo.accent === "gold"
      ? "text-gold"
      : expo.accent === "iris"
        ? "text-iris"
        : "text-glow";

  return (
    <>
      {/* ================================================================== */}
      {/*  En-tête                                                            */}
      {/* ================================================================== */}
      <header className="relative flex min-h-[72svh] items-end overflow-hidden pt-32">
        {backdrop && (
          <div aria-hidden className="absolute inset-0 -z-10">
            {/* La jungle de nuit, commune aux deux expositions : elles
                appartiennent à la même forêt. Elle dérive lentement, comme
                en page d'accueil. */}
            <Image
              src={backdrop}
              alt=""
              fill
              priority
              sizes="100vw"
              className="animate-canvas object-cover"
            />
            {/*
              Un voile léger, et un seul. Trois couches sombres empilées
              rendaient l'en-tête presque noir : on ne voyait plus la forêt.
              Le dégradé du bas raccorde la page, sans plus.
            */}
            <div className="absolute inset-0 bg-night/25" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-night via-night/70 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-night via-night/55 to-transparent" />
          </div>
        )}

        <Section className="pb-16 sm:pb-24">
          <Reveal>
            <p className="eyebrow">
              {t("backToExpos")}
              <span className={`ms-3 ${accentText}`}>{expo.numeral}</span>
            </p>

            <h1
              className="mt-5 font-display text-[clamp(2.6rem,8vw,6rem)] font-light leading-[0.98] text-ivory"
              style={{ textShadow: "0 2px 30px rgba(5,11,9,0.85)" }}
            >
              {tr(expo.title, locale)}
            </h1>

            <p className="mt-5 max-w-xl font-display text-[clamp(1.1rem,2.2vw,1.6rem)] font-light italic text-sage">
              {tr(expo.subtitle, locale)}
            </p>

            <div className="rule-glow mt-10 w-full max-w-md" aria-hidden />

            <dl className="mt-8 flex flex-wrap gap-x-14 gap-y-5">
              {expo.dates[locale] && (
                <div>
                  <dt className="eyebrow">{t("dates")}</dt>
                  <dd className="mt-2 text-[0.95rem] text-ivory">
                    {tr(expo.dates, locale)}
                  </dd>
                </div>
              )}
              {expo.venue[locale] && (
                <div>
                  <dt className="eyebrow">{t("venue")}</dt>
                  <dd className="mt-2 text-[0.95rem] text-ivory">
                    {tr(expo.venue, locale)}
                    {expo.city[locale] && (
                      <span className="text-sage">
                        {" "}
                        — {tr(expo.city, locale)}
                      </span>
                    )}
                  </dd>
                </div>
              )}
              {expo.artworks.length > 0 && (
                <div>
                  <dt className="eyebrow">{t("artworksTitle")}</dt>
                  <dd className="mt-2 text-[0.95rem] text-ivory">
                    {expo.artworks.length} {t("artworksCount")}
                  </dd>
                </div>
              )}
            </dl>
          </Reveal>
        </Section>
      </header>

      {/* ================================================================== */}
      {/*  Texte de l'exposition                                              */}
      {/* ================================================================== */}
      {/*  Le texte se tient à sa place même avant d'être écrit : l'ordre de
          la page — le texte, le film, le vernissage — reste lisible. */}
      <Section className="py-20 sm:py-28">
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow text-center">{t("statementTitle")}</p>
            {statement.length > 0 ? (
              <div className="mt-10 space-y-6">
                {statement.map((paragraph, i) => (
                  <p
                    key={i}
                    className={`leading-[1.9] text-sage ${
                      i === 0
                        ? "font-display text-[clamp(1.2rem,2.4vw,1.6rem)] font-light italic text-ivory"
                        : "text-[0.98rem]"
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <Placeholder
                className="mt-10"
                label={tc("comingSoon")}
                hint="src/data/expositions.ts → statement"
              />
            )}
          </div>
        </Reveal>
      </Section>

      {/* ================================================================== */}
      {/*  Le film                                                          */}
      {/* ================================================================== */}
      {expo.film && (
        <Section className="py-12 sm:py-16">
          <Reveal>
            <p className="eyebrow text-center">{t("filmTitle")}</p>
            <div className="mx-auto mt-10 max-w-5xl">
              <ExpoFilm
                youtubeId={expo.film}
                title={tr(expo.title, locale)}
                playLabel={tm("watch")}
              />
            </div>
          </Reveal>
        </Section>
      )}

      {/* ================================================================== */}
      {/*  Le vernissage                                                      */}
      {/* ================================================================== */}
      {expo.vernissage.length > 0 && (
        <Section className="py-20 sm:py-28">
          <Reveal>
            <SectionHeading
              eyebrow={tr(expo.dates, locale) || expo.year}
              title={t("vernissageTitle")}
            />
          </Reveal>
          <div className="mx-auto mt-14 max-w-6xl">
            <VernissageCarousel
              images={expo.vernissage}
              label={tr(expo.title, locale)}
              rtl={locale === "ar"}
            />
          </div>
        </Section>
      )}

      {/* ================================================================== */}
      {/*  Les œuvres                                                         */}
      {/* ================================================================== */}
      <Section id="oeuvres" className="py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow={tr(expo.title, locale)}
            title={t("artworksTitle")}
            lead={expo.artworks.length > 0 ? t("artworksLead") : undefined}
          />
        </Reveal>

        <div className="mt-14">
          {expo.artworks.length > 0 ? (
            <ArtworkGallery
              artworks={expo.artworks}
              locale={locale}
              accent={expo.accent}
            />
          ) : (
            <Placeholder
              label={tc("comingSoon")}
              hint="src/data/expositions.ts → artworks"
            />
          )}
        </div>
      </Section>

      {/* ================================================================== */}
      {/*  Vidéos & médias                                                    */}
      {/* ================================================================== */}
      {(expo.media.length > 0 || expo.press.length > 0) && (
        <Section className="py-20 sm:py-28">
          <Reveal>
            <SectionHeading
              eyebrow={t("pressTitle")}
              title={t("mediaTitle")}
              lead={expo.media.length > 0 ? t("mediaLead") : undefined}
            />
          </Reveal>

          <div className="mt-14">
            <MediaGallery items={expo.media} locale={locale} />
          </div>

          {expo.press.length > 0 && (
            <ul className="mt-14 divide-y divide-glow/10 border-y border-glow/10">
              {expo.press.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.url ?? "#"}
                    target={item.url ? "_blank" : undefined}
                    rel={item.url ? "noopener noreferrer" : undefined}
                    className="group flex flex-wrap items-baseline justify-between gap-4 py-5 transition-colors duration-300 hover:bg-glow/[0.03]"
                  >
                    <span className="font-display text-lg font-light text-ivory transition-colors group-hover:text-glow">
                      {tr(item.title, locale)}
                    </span>
                    <span className="text-[0.72rem] uppercase tracking-[0.18em] text-sage-dim">
                      {item.outlet}
                      {item.date && ` · ${item.date}`}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Section>
      )}

      {/* ================================================================== */}
      {/*  Chapitre suivant                                                   */}
      {/* ================================================================== */}
      <Section className="pb-28">
        <div className="rule-glow mb-12" aria-hidden />
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div>
            {previous && (
              <Link
                href={`/expositions/${previous.slug}`}
                className="group block"
              >
                <p className="eyebrow">{t("previous")}</p>
                <p className="mt-2 font-display text-2xl font-light text-ivory transition-colors group-hover:text-glow">
                  {tr(previous.title, locale)}
                </p>
              </Link>
            )}
          </div>
          <div className="text-end">
            {next && (
              <Link href={`/expositions/${next.slug}`} className="group block">
                <p className="eyebrow">{t("next")}</p>
                <p className="mt-2 font-display text-2xl font-light text-ivory transition-colors group-hover:text-glow">
                  {tr(next.title, locale)}
                </p>
              </Link>
            )}
          </div>
        </div>

        <div className="mt-14 text-center">
          <ActionLink href="/">{tc("backHome")}</ActionLink>
        </div>
      </Section>
    </>
  );
}
