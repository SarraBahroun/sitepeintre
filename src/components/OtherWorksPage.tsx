import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { diversSections } from "@/data/site";
import { t as tr, tRich } from "@/data/types";

import Image from "next/image";

import { dimensions } from "@/data/dimensions";
import Reveal from "@/components/Reveal";
import ArtworkGallery from "@/components/ArtworkGallery";
import PhotoGallery from "@/components/PhotoGallery";
import JewelGallery from "@/components/JewelGallery";
import { jewels, jewelCollections } from "@/data/bijoux";
import { Section, SectionHeading, Placeholder } from "@/components/ui";

/* =============================================================================
   Gabarit des pages « hors toile » — Livres, Bijoux.
   Chaque page reçoit les rubriques qu'elle montre ; leur contenu vient de
   src/data/site.ts → diversSections.
   ========================================================================== */

export type OtherWorksKind = "books" | "jewels";

/** Quelles rubriques de diversSections chaque page rassemble. */
const SECTIONS: Record<OtherWorksKind, string[]> = {
  books: ["illustration", "direction-artistique"],
  jewels: ["bijoux"],
};

export async function otherWorksMetadata(
  locale: string,
  kind: OtherWorksKind,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "nav" });
  const tm = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t(kind),
    description: tm(kind === "books" ? "seoBooks" : "seoJewels"),
  };
}

export default async function OtherWorksPage({
  locale,
  kind,
}: {
  locale: Locale;
  kind: OtherWorksKind;
}) {
  setRequestLocale(locale);
  const sections = diversSections.filter((s) => SECTIONS[kind].includes(s.id));

  const t = await getTranslations("home");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("common");
  const ta = await getTranslations("artist");

  return (
    <>
      {/* ================================================================== */}
      {/*  En-tête                                                            */}
      {/* ================================================================== */}
      <Section className="pt-40 pb-16 sm:pt-48">
        <Reveal>
          {/* Le surtitre ne répète pas le titre : la marque pour les bijoux. */}
          <p className="eyebrow">
            {kind === "jewels" ? "Chic & Glamour" : tn(kind)}
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.6rem,7vw,5.5rem)] font-light leading-[1.02] text-ivory">
            {t(`${kind}Title`)}
          </h1>
          <div className="rule-glow mt-9 w-48" aria-hidden />
          <p className="mt-8 max-w-xl text-[1rem] leading-relaxed text-sage">
            {t(`${kind}Lead`)}
          </p>
        </Reveal>

        {/* Sommaire des rubriques, s'il y en a plusieurs */}
        {sections.length > 1 && (
          <Reveal delay={0.1}>
            <nav className="mt-12 flex flex-wrap gap-3">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="rounded-full border border-gold/20 px-5 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-sage transition-all duration-400 hover:border-gold/55 hover:text-gold"
                >
                  {tr(section.title, locale)}
                </a>
              ))}
            </nav>
          </Reveal>
        )}
      </Section>

      {/* ================================================================== */}
      {/*  Les bijoux, par collection                                         */}
      {/* ================================================================== */}
      {kind === "jewels" && (
        <Section className="pb-20 sm:pb-28">
          <JewelGallery
            jewels={jewels}
            collections={jewelCollections}
            locale={locale}
          />
        </Section>
      )}

      {/* ================================================================== */}
      {/*  Les rubriques                                                      */}
      {/* ================================================================== */}
      {sections.map((section, i) => {
        const description = tRich(section.description, locale);
        const lead = tr(section.lead, locale);
        const isEmpty =
          !section.artworks.length &&
          !section.images.length &&
          !section.links?.length &&
          !section.books?.length &&
          !description.length;

        return (
          <Section
            key={section.id}
            id={section.id}
            className={
              sections.length > 1
                ? "scroll-mt-28 py-20 sm:py-28"
                : "scroll-mt-28 pt-0 pb-20 sm:pb-28"
            }
          >
            <Reveal>
              {/* Seule sur sa page, la rubrique laisse l'en-tête parler pour elle. */}
              {sections.length > 1 && (
                <SectionHeading
                  eyebrow={`0${i + 1}`}
                  title={tr(section.title, locale)}
                  lead={lead || undefined}
                />
              )}
            </Reveal>

            {description.length > 0 && (
              <Reveal delay={0.08}>
                <div className="mt-10 max-w-2xl space-y-5">
                  {description.map((paragraph, k) => (
                    <p
                      key={k}
                      className="text-[0.98rem] leading-[1.9] text-sage"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            )}

            {section.books && section.books.length > 0 && (
              <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {section.books.map((book, k) => (
                  <li key={book.id}>
                    <Reveal delay={(k % 3) * 0.06}>
                      <figure>
                        {/* Cadre commun 4:3 — la couverture y tient entière, sans rognure. */}
                        <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-sm border border-gold/15 bg-night-2">
                          {book.cover ? (
                            <Image
                              src={book.cover}
                              alt={book.title}
                              {...dimensions(book.cover)}
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="h-full w-auto max-w-full object-contain"
                            />
                          ) : (
                            // Pas encore de couverture : un livre esquissé au filet d'or.
                            <div className="flex flex-col items-center gap-5 text-center">
                              <div
                                aria-hidden
                                className="flex h-28 w-20 items-center justify-center rounded-[2px] border border-gold/35 bg-gradient-to-b from-gold/[0.07] to-transparent"
                              >
                                <span className="h-px w-8 bg-gold/40" />
                              </div>
                              <p className="text-[0.7rem] uppercase tracking-[0.28em] text-gold/80">
                                {ta("coverSoon")}
                              </p>
                            </div>
                          )}
                        </div>
                        <figcaption className="mt-5">
                          <p
                            dir="auto"
                            className="font-display text-[1.35rem] font-light leading-snug text-ivory"
                          >
                            {book.title}
                          </p>
                          <p
                            dir="auto"
                            className="mt-1.5 text-[0.85rem] text-sage"
                          >
                            {book.authors}
                          </p>
                          {/* L'ours dans l'ordre du livre ; l'éditeur ou le rôle de l'artiste vient en dernier. */}
                          {book.credits?.map((line) => (
                            <p
                              key={line}
                              dir="auto"
                              className="mt-0.5 text-[0.78rem] text-sage/70"
                            >
                              {line}
                            </p>
                          ))}

                          <p
                            dir="auto"
                            className="mt-0.5 text-[0.78rem] text-sage/70"
                          >
                            {book.publisher}
                          </p>
                          {book.buy.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2.5">
                              {book.buy.map((link) => (
                                <a
                                  key={link.href}
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-[0.76rem] text-ivory transition-all duration-400 hover:border-gold hover:text-gold"
                                >
                                  {ta("buyBook")} · {link.label}
                                  <span
                                    aria-hidden
                                    className="text-gold rtl:-scale-x-100"
                                  >
                                    ↗
                                  </span>
                                </a>
                              ))}
                            </div>
                          )}
                        </figcaption>
                      </figure>
                    </Reveal>
                  </li>
                ))}
              </ul>
            )}

            {section.links && section.links.length > 0 && (
              <Reveal delay={0.1}>
                <div className={section.books?.length ? "mt-16" : "mt-10"}>
                  <p className="eyebrow">
                    {section.books?.length
                      ? ta("booksElsewhere")
                      : ta("findIt")}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-3">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-gold/25 px-5 py-2.5 text-[0.8rem] text-ivory transition-all duration-400 hover:border-gold/60 hover:text-gold"
                        >
                          {link.label}
                          <span
                            aria-hidden
                            className="text-gold rtl:-scale-x-100"
                          >
                            ↗
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            <div className="mt-14 space-y-14">
              {section.artworks.length > 0 && (
                <ArtworkGallery
                  artworks={section.artworks}
                  locale={locale}
                  accent="gold"
                />
              )}

              {section.images.length > 0 && (
                <PhotoGallery
                  images={section.images}
                  label={tr(section.title, locale)}
                />
              )}

              {isEmpty && (
                <Placeholder
                  label={tc("comingSoon")}
                  hint={`src/data/site.ts → diversSections.${section.id}`}
                />
              )}
            </div>
          </Section>
        );
      })}
    </>
  );
}
