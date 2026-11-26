import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { expositions } from "@/data/expositions";
import {
  artist,
  courses,
  diversSections,
  heroPlates,
  site,
  siteUrl,
} from "@/data/site";
import { jewels, jewelCollections } from "@/data/bijoux";
import { t as tr, tRich, formatPrice } from "@/data/types";
import { dimensions } from "@/data/dimensions";
import { alternates } from "@/lib/seo";

import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import ExpositionRow from "@/components/ExpositionRow";
import TvFeature from "@/components/TvFeature";
import PreviewRow from "@/components/PreviewRow";
import { Section, SectionHeading, ActionLink } from "@/components/ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: alternates(locale, "") };
}

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
  const tc = await getTranslations("courses");
  const firstExpo = expositions[0];

  // Les surtitres disent autre chose que le titre qu'ils coiffent :
  // la casquette de l'artiste, les années des expositions, l'atelier.
  const artistRole = tRich(artist.roles, locale)[0];
  const expoYears = [...new Set(expositions.map((e) => e.year))].sort();
  const expoSpan =
    expoYears.length > 1
      ? `${expoYears[0]} — ${expoYears[expoYears.length - 1]}`
      : expoYears[0];

  // Les livres illustrés et l'ouvrage dirigé, dans l'ordre de la page Livres.
  const books = diversSections.flatMap((s) => s.books ?? []);
  // Le bandeau ne montre que les livres qui ont déjà leur couverture.
  const booksWithCover = books.filter((book) => book.cover);
  // Un bijou disponible par collection, des quatre premières collections.
  const jewelPreview = jewelCollections
    .map((c) =>
      jewels.find((j) => j.collection === c.id && j.status === "available"),
    )
    .filter((j) => j !== undefined)
    .slice(0, 4);

  // Fiche pour Google : qui est l'artiste, où, ce qu'elle propose.
  const tm = await getTranslations("meta");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.nameAr,
    jobTitle: tm("tagline"),
    description: tm("description"),
    url: `${siteUrl}/${locale}`,
    image: `${siteUrl}/images/jungle-2/tableau-d.jpeg`,
    email: `mailto:${site.email}`,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: tr(site.city, locale),
      addressCountry: "TN",
    },
    sameAs: [site.instagram, site.facebook, site.x, site.tiktok, site.saatchi],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero
        locale={locale}
        firstExpoSlug={firstExpo.slug}
        plates={heroPlates}
      />

      {/* ================================================================== */}
      {/*  L'artiste                                                          */}
      {/* ================================================================== */}
      <Section className="pt-24 pb-6 sm:pt-32 sm:pb-10">
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
              eyebrow={artistRole}
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
      <Section id="expositions" className="pt-10 pb-24 sm:pt-14 sm:pb-32">
        <Reveal>
          <SectionHeading
            eyebrow={expoSpan}
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
          <SectionHeading title={t("otherTitle")} lead={t("otherLead")} />
        </Reveal>

        {/* Deux bandeaux, dessinés comme ceux des expositions */}
        <div className="mt-10 divide-y divide-gold/10">
          <PreviewRow
            href="/livres"
            eyebrow={tn("books")}
            title={t("booksTitle")}
            lead={t("booksLead")}
            cta={t("seeBooks")}
            items={booksWithCover.slice(0, 4).map((book) => ({
              key: book.id,
              image: book.cover!,
              title: book.title,
              detail: book.authors,
            }))}
            more={
              booksWithCover.length > 4
                ? t("moreBooks", { count: booksWithCover.length - 4 })
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
        <Section className="pb-16 sm:pb-20">
          <Reveal>
            <div className="relative overflow-hidden rounded-sm border border-glow/15 px-7 py-14 text-center sm:px-14 sm:py-20">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--color-glow-deep)_22%,transparent),transparent_70%)]"
              />
              <p className="eyebrow">{tc("studio")}</p>
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
