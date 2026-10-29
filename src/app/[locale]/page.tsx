import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { expositions } from "@/data/expositions";
import { artist, courses, diversSections, heroPlates } from "@/data/site";
import { t as tr } from "@/data/types";

import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import ExpositionRow from "@/components/ExpositionRow";
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
  const firstExpo = expositions[0];

  return (
    <>
      <Hero
        locale={locale}
        firstExpoSlug={firstExpo.slug}
        plates={heroPlates}
      />

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

        {/* Un bandeau par exposition : ses toiles, puis la flèche vers sa page */}
        <div className="mt-10 divide-y divide-glow/10">
          {expositions.map((expo) => (
            <ExpositionRow
              key={expo.slug}
              expo={expo}
              locale={locale}
              lead={
                expo.slug === "jungle-1"
                  ? t("jungle1Lead")
                  : expo.slug === "jungle-2"
                    ? t("jungle2Lead")
                    : tr(expo.subtitle, locale)
              }
            />
          ))}
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

      {/* ================================================================== */}
      {/*  Cours de peinture                                                  */}
      {/* ================================================================== */}
      {courses.enabled && (
        <Section className="pb-28 sm:pb-36">
          <Reveal>
            <div className="relative overflow-hidden rounded-sm border border-glow/15 px-7 py-14 text-center sm:px-14 sm:py-20">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--color-glow-deep)_22%,transparent),transparent_70%)]"
              />
              <p className="eyebrow">{tn("courses")}</p>
              <h2 className="mx-auto mt-4 max-w-2xl font-display text-[clamp(1.9rem,4vw,3rem)] font-light leading-tight text-ivory">
                {t("coursesTitle")}
              </h2>
              <div className="rule-glow mx-auto mt-6 w-24" aria-hidden />
              <p className="mx-auto mt-6 max-w-xl text-[0.98rem] leading-relaxed text-sage">
                {tr(courses.lead, locale) || t("coursesLead")}
              </p>
              <div className="mt-10 flex justify-center">
                <ActionLink href="/cours">{t("discover")}</ActionLink>
              </div>
            </div>
          </Reveal>
        </Section>
      )}
    </>
  );
}
