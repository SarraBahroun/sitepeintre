import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { expositions, getFeaturedArtworks } from "@/data/expositions";
import { artist, diversSections } from "@/data/site";
import { t as tr } from "@/data/types";

import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { Section, SectionHeading, ActionLink } from "@/components/ui";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const te = await getTranslations("expo");
  const tn = await getTranslations("nav");

  const featured = getFeaturedArtworks();
  const heroImage = expositions.find((e) => e.cover)?.cover;

  return (
    <>
      <Hero locale={locale} image={heroImage} />

      {/* ================================================================== */}
      {/*  Les expositions                                                    */}
      {/* ================================================================== */}
      <Section id="expositions" className="py-24 sm:py-32">
        <Reveal>
          <SectionHeading
            eyebrow={tn("expositions")}
            title={t("expositionsTitle")}
            lead={t("expositionsLead")}
          />
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {expositions.map((expo, i) => {
            const count = expo.artworks.length;
            return (
              <Reveal key={expo.slug} delay={i * 0.12}>
                <Link
                  href={`/expositions/${expo.slug}`}
                  className="group relative block overflow-hidden rounded-sm border border-glow/10 transition-all duration-700 ease-[var(--ease-silk)] hover:border-glow/35"
                >
                  <div className="relative aspect-[16/11] w-full bg-night-2">
                    {expo.cover ? (
                      <Image
                        src={expo.cover}
                        alt={tr(expo.title, locale)}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover opacity-65 transition-all duration-[1.3s] ease-[var(--ease-silk)] group-hover:scale-[1.07] group-hover:opacity-90"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-jade via-moss to-night" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-night via-night/55 to-transparent" />

                    {/* Chiffre romain en filigrane */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute end-6 top-2 font-display text-[clamp(5rem,12vw,9rem)] font-light leading-none text-ivory/[0.07] transition-all duration-700 group-hover:text-glow/20"
                    >
                      {expo.numeral}
                    </span>

                    <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                      <p className="eyebrow">
                        {expo.year || te("year")}
                        {expo.venue[locale] && (
                          <span className="text-sage-dim">
                            {" "}
                            · {tr(expo.venue, locale)}
                          </span>
                        )}
                      </p>
                      <h3 className="mt-3 font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-light leading-tight text-ivory transition-colors duration-500 group-hover:text-glow">
                        {tr(expo.title, locale)}
                      </h3>
                      <p className="mt-2 text-sm text-sage">
                        {tr(expo.subtitle, locale)}
                      </p>

                      <div className="mt-6 flex items-center justify-between gap-4">
                        <span className="inline-flex items-center gap-2.5">
                          <span className="text-[0.74rem] font-medium uppercase tracking-[0.2em] text-glow">
                            {t("discover")}
                          </span>
                          <span
                            aria-hidden
                            className="h-px w-8 bg-glow transition-all duration-500 ease-[var(--ease-silk)] group-hover:w-14"
                          />
                        </span>
                        {count > 0 && (
                          <span className="text-[0.72rem] tracking-[0.12em] text-sage-dim">
                            {count} {te("artworksCount")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ================================================================== */}
      {/*  Œuvres choisies                                                    */}
      {/* ================================================================== */}
      {featured.length > 0 && (
        <Section className="py-20 sm:py-28">
          <Reveal>
            <SectionHeading
              eyebrow={tn("expositions")}
              title={t("featuredTitle")}
              align="center"
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-5 sm:gap-7 lg:grid-cols-4">
            {featured.slice(0, 4).map(({ artwork, expo }, i) => (
              <Reveal key={`${expo.slug}-${artwork.id}`} delay={i * 0.09}>
                <Link
                  href={`/expositions/${expo.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-glow/10 bg-night-2 transition-all duration-700 ease-[var(--ease-silk)] group-hover:border-glow/40 group-hover:shadow-[0_0_60px_-18px_var(--color-glow-deep)]">
                    <Image
                      src={artwork.image}
                      alt={tr(artwork.title, locale) || tr(expo.title, locale)}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-silk)] group-hover:scale-[1.07]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night/80 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-40" />
                  </div>
                  <p className="mt-3 text-[0.7rem] uppercase tracking-[0.18em] text-sage-dim transition-colors duration-300 group-hover:text-glow">
                    {tr(expo.title, locale)}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* ================================================================== */}
      {/*  L'artiste                                                          */}
      {/* ================================================================== */}
      <Section className="py-24 sm:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          <Reveal>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-sm border border-glow/15"
              />
              <Image
                src={artist.portrait}
                alt=""
                fill
                sizes="(max-width: 1024px) 80vw, 35vw"
                className="rounded-sm object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-sm bg-gradient-to-t from-night/45 to-transparent"
              />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <SectionHeading
              eyebrow={tn("artist")}
              title={t("artistTitle")}
              lead={tr(artist.statement, locale) || t("artistLead")}
            />
            <div className="mt-9">
              <ActionLink href="/artiste">{t("discover")}</ActionLink>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ================================================================== */}
      {/*  Divers                                                             */}
      {/* ================================================================== */}
      <Section className="pb-24 sm:pb-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-sm border border-gold/15 bg-gradient-to-br from-moss/60 via-night-2/70 to-night px-7 py-14 sm:px-14 sm:py-20">
            <div
              aria-hidden
              className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-[90px]"
            />
            <div className="relative max-w-2xl">
              <SectionHeading
                eyebrow={tn("divers")}
                title={t("diversTitle")}
                lead={t("diversLead")}
              />
              <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
                {diversSections.map((section) => (
                  <li
                    key={section.id}
                    className="flex items-center gap-2.5 text-sm text-sage"
                  >
                    <span
                      aria-hidden
                      className="h-1 w-1 rounded-full bg-gold"
                    />
                    {tr(section.title, locale)}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <ActionLink href="/divers" tone="gold">
                  {t("seeAll")}
                </ActionLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
