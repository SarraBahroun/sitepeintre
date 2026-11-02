import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { diversSections } from "@/data/site";
import { t as tr, tRich } from "@/data/types";

import Reveal from "@/components/Reveal";
import ArtworkGallery from "@/components/ArtworkGallery";
import PhotoGallery from "@/components/PhotoGallery";
import { Section, SectionHeading, Placeholder } from "@/components/ui";

/* =============================================================================
   Divers — illustration de livres, bijoux et autres explorations.
   Chaque rubrique vient de src/data/site.ts → diversSections.
   ========================================================================== */

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("divers") };
}

export default async function DiversPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(locale);

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
          <p className="eyebrow">{tn("divers")}</p>
          <h1 className="mt-6 font-display text-[clamp(2.6rem,7vw,5.5rem)] font-light leading-[1.02] text-ivory">
            {t("diversTitle")}
          </h1>
          <div className="rule-glow mt-9 w-48" aria-hidden />
          <p className="mt-8 max-w-xl text-[1rem] leading-relaxed text-sage">
            {t("diversLead")}
          </p>
        </Reveal>

        {/* Sommaire des rubriques */}
        <Reveal delay={0.1}>
          <nav className="mt-12 flex flex-wrap gap-3">
            {diversSections.map((section) => (
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
      </Section>

      {/* ================================================================== */}
      {/*  Les rubriques                                                      */}
      {/* ================================================================== */}
      {diversSections.map((section, i) => {
        const description = tRich(section.description, locale);
        const lead = tr(section.lead, locale);
        const isEmpty =
          !section.artworks.length &&
          !section.images.length &&
          !section.links?.length &&
          !description.length;

        return (
          <Section
            key={section.id}
            id={section.id}
            className="scroll-mt-28 py-20 sm:py-28"
          >
            <Reveal>
              <SectionHeading
                eyebrow={`0${i + 1}`}
                title={tr(section.title, locale)}
                lead={lead || undefined}
              />
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

            {section.links && section.links.length > 0 && (
              <Reveal delay={0.1}>
                <div className="mt-10">
                  <p className="eyebrow">{ta("findIt")}</p>
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
