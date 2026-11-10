import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { expositions } from "@/data/expositions";
import { artist, courses, diversSections, heroPlates } from "@/data/site";
import { jewels, jewelCollections } from "@/data/bijoux";
import { t as tr, formatPrice } from "@/data/types";
import { dimensions } from "@/data/dimensions";

import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import ExpositionRow from "@/components/ExpositionRow";
import TvFeature from "@/components/TvFeature";
import PreviewRow from "@/components/PreviewRow";
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
  const tn = await getTranslations("nav");
  const firstExpo = expositions[0];

  // Les livres illustrés et l'ouvrage dirigé, dans l'ordre de la page Livres.
  const books = diversSections.flatMap((s) => s.books ?? []);
  // Un bijou disponible par collection, des quatre premières collections.
  const jewelPreview = jewelCollections
    .map((c) =>
      jewels.find((j) => j.collection === c.id && j.status === "available"),
    )
    .filter((j) => j !== undefined)
    .slice(0, 4);

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
            <div className="relative mx-auto w-full max-w-sm">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-sm border border-glow/15"
              />
              <Image
                src={artist.portrait}
                alt=""
                {...dimensions(artist.portrait)}
                sizes="(max-width: 1024px) 80vw, 35vw"
                className="h-auto w-full rounded-sm"
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
      {/*  À la télévision                                                    */}
      {/* ================================================================== */}
      <TvFeature locale={locale} />

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
      {/*  Livres et bijoux                                                   */}
      {/* ================================================================== */}
      <Section className="pb-24 sm:pb-32">
        <Reveal>
          <SectionHeading
            eyebrow={`${tn("books")} · ${tn("jewels")}`}
            title={t("otherTitle")}
            lead={t("otherLead")}
          />
        </Reveal>

        {/* Deux bandeaux, dessinés comme ceux des expositions */}
        <div className="mt-10 divide-y divide-gold/10">
          <PreviewRow
            href="/livres"
            eyebrow={tn("books")}
            title={t("booksTitle")}
            lead={t("booksLead")}
            cta={t("seeBooks")}
            items={books.slice(0, 4).map((book) => ({
              key: book.id,
              image: book.cover,
              title: book.title,
              detail: book.authors,
            }))}
            more={
              books.length > 4
                ? t("moreBooks", { count: books.length - 4 })
                : undefined
            }
          />
          <PreviewRow
            href="/bijoux"
            eyebrow="Chic & Glamour"
            title={t("jewelsTitle")}
            lead={t("jewelsLead")}
            cta={t("seeJewels")}
            items={jewelPreview.map((jewel) => ({
              key: jewel.id,
              image: jewel.images[0],
              title: tr(jewel.title, locale),
              detail: formatPrice(jewel.price, "TND", locale) ?? undefined,
              href: `/bijoux#c-${jewel.collection}`,
            }))}
            more={t("moreJewels", {
              count: jewels.length - jewelPreview.length,
              collections: jewelCollections.length,
            })}
          />
        </div>
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
