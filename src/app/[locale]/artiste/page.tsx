import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { artist, site } from "@/data/site";
import { t as tr, tRich } from "@/data/types";
import { dimensions } from "@/data/dimensions";

import Reveal from "@/components/Reveal";
import ExpoFilm from "@/components/ExpoFilm";
import {
  Section,
  SectionHeading,
  ActionLink,
  Placeholder,
} from "@/components/ui";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "artist" });
  return { title: t("title") };
}

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(locale);

  const t = await getTranslations("artist");
  const tc = await getTranslations("common");
  const tn = await getTranslations("nav");
  const tm = await getTranslations("meta");
  const tmedia = await getTranslations("media");

  const bio = tRich(artist.bio, locale);
  const approach = tRich(artist.approach, locale);
  const roles = tRich(artist.roles, locale);
  const statement = tr(artist.statement, locale);
  const motto = tr(artist.motto, locale);
  const name = locale === "ar" ? site.nameAr : site.name;

  return (
    <>
      {/* ================================================================== */}
      {/*  Portrait                                                           */}
      {/* ================================================================== */}
      <Section className="pt-40 pb-20 sm:pt-48">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow">{tm("tagline")}</p>
            <h1 className="mt-6 font-display text-[clamp(2.6rem,7vw,5.5rem)] font-light leading-[1.02] text-ivory">
              {name}
            </h1>

            {/* Les trois casquettes, séparées par un filet */}
            {roles.length > 0 && (
              <ul className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                {roles.map((role, i) => (
                  <li
                    key={role}
                    className="flex items-center gap-4 text-[0.78rem] uppercase tracking-[0.16em] text-sage"
                  >
                    {i > 0 && (
                      <span aria-hidden className="h-3 w-px bg-glow/30" />
                    )}
                    {role}
                  </li>
                ))}
              </ul>
            )}

            <div className="rule-glow mt-9 w-40" aria-hidden />

            {/* La devise de la série */}
            <p className="mt-9 font-display text-[clamp(1.5rem,3.4vw,2.4rem)] font-light italic leading-tight text-glow halo">
              {motto}
            </p>

            {statement ? (
              <p className="mt-6 max-w-xl text-[1rem] leading-[1.85] text-sage">
                {statement}
              </p>
            ) : (
              <p className="mt-6 max-w-xl text-sage-dim italic">
                {tc("comingSoon")}
              </p>
            )}
          </Reveal>

          <Reveal delay={0.14}>
            <div className="relative mx-auto w-full max-w-md">
              <div
                aria-hidden
                className="absolute -inset-5 rounded-sm border border-glow/15"
              />
              <div
                aria-hidden
                className="absolute -inset-5 -z-10 rounded-sm bg-glow/5 blur-3xl"
              />
              {/* Le portrait garde sa proportion : on ne recadre pas un visage */}
              <Image
                src={artist.portrait}
                alt={name}
                {...dimensions(artist.portrait)}
                priority
                sizes="(max-width: 1024px) 85vw, 40vw"
                className="h-auto w-full rounded-sm"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ================================================================== */}
      {/*  Biographie                                                         */}
      {/* ================================================================== */}
      <Section className="py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.4fr_1fr] lg:gap-20">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-light text-ivory">
              {t("bioTitle")}
            </h2>
            <div className="rule-glow mt-5 w-20" aria-hidden />
          </Reveal>

          <Reveal delay={0.1}>
            {bio.length > 0 ? (
              <div className="max-w-2xl space-y-6">
                {bio.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-[0.98rem] leading-[1.95] text-sage"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <Placeholder
                label={tc("comingSoon")}
                hint="src/data/site.ts → artist.bio"
              />
            )}
          </Reveal>
        </div>
      </Section>

      {/* ================================================================== */}
      {/*  Démarche                                                           */}
      {/* ================================================================== */}
      <Section className="py-20 sm:py-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-sm border border-glow/12 bg-gradient-to-br from-moss/50 via-night-2/60 to-night px-7 py-14 sm:px-14 sm:py-20">
            <div
              aria-hidden
              className="absolute -left-16 -bottom-20 h-64 w-64 rounded-full bg-glow/10 blur-[80px]"
            />
            <div className="relative mx-auto max-w-3xl">
              <p className="eyebrow text-center">{t("approachTitle")}</p>
              {approach.length > 0 ? (
                <div className="mt-10 space-y-6">
                  {approach.map((paragraph, i) => (
                    <p
                      key={i}
                      className={`leading-[1.9] ${
                        i === 0
                          ? "text-center font-display text-[clamp(1.2rem,2.5vw,1.7rem)] font-light italic text-ivory"
                          : "text-[0.98rem] text-sage"
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="mt-8 text-center text-sage-dim italic">
                  {tc("comingSoon")}
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ================================================================== */}
      {/*  Parcours                                                           */}
      {/* ================================================================== */}
      {artist.timeline.length > 0 && (
        <Section className="py-20 sm:py-28">
          <Reveal>
            <SectionHeading title={t("pathTitle")} />
          </Reveal>
          <ol className="mt-12 border-s border-glow/15 ps-8">
            {artist.timeline.map((entry, i) => (
              <Reveal as="li" key={`${entry.year}-${i}`} delay={i * 0.06}>
                <div className="relative pb-10">
                  <span
                    aria-hidden
                    className="absolute -start-[2.1rem] top-2 h-2 w-2 rounded-full bg-glow shadow-[0_0_14px_var(--color-glow)]"
                  />
                  <p className="font-display text-xl text-gold">{entry.year}</p>
                  <p className="mt-1.5 text-[0.98rem] text-ivory">
                    {tr(entry.label, locale)}
                  </p>
                  {entry.place && (
                    <p className="mt-1 text-sm text-sage-dim">
                      {tr(entry.place, locale)}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
        </Section>
      )}

      {/* ================================================================== */}
      {/*  Atelier                                                            */}
      {/* ================================================================== */}
      {artist.gallery.length > 0 && (
        <Section className="py-20">
          <div className="grid items-start gap-5 sm:grid-cols-2">
            {artist.gallery.map((src, i) => (
              <Reveal key={src} delay={i * 0.1}>
                <div className="overflow-hidden rounded-sm border border-glow/10">
                  <Image
                    src={src}
                    alt=""
                    {...dimensions(src)}
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="h-auto w-full transition-transform duration-[1.2s] ease-[var(--ease-silk)] hover:scale-[1.04]"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* ================================================================== */}
      {/*  À la télévision                                                    */}
      {/* ================================================================== */}
      {artist.tv.youtubeId && (
        <Section className="py-20 sm:py-28">
          <Reveal>
            <SectionHeading
              eyebrow={artist.tv.outlet}
              title={t("tvTitle")}
              lead={t("tvLead")}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mx-auto mt-14 max-w-5xl">
              <ExpoFilm
                youtubeId={artist.tv.youtubeId}
                title={`${name} — ${artist.tv.outlet}`}
                playLabel={tmedia("watch")}
              />
            </div>
          </Reveal>
        </Section>
      )}

      {/* ================================================================== */}
      {/*  Dans la presse                                                     */}
      {/* ================================================================== */}
      {artist.press.length > 0 && (
        <Section className="py-20 sm:py-28">
          <Reveal>
            <SectionHeading title={t("pressTitle")} />
          </Reveal>
          <ul className="mt-12 divide-y divide-glow/10 border-y border-glow/10">
            {artist.press.map((item, i) => (
              <Reveal as="li" key={item.id} delay={i * 0.06}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-3 py-7 transition-colors duration-300 hover:bg-glow/[0.03] sm:flex-row sm:items-baseline sm:justify-between sm:gap-10"
                >
                  <span>
                    <span className="block text-[0.68rem] uppercase tracking-[0.18em] text-gold">
                      {item.outlet}
                      {item.date && (
                        <span className="text-sage-dim">
                          {" · "}
                          {new Intl.DateTimeFormat(locale, {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }).format(new Date(item.date))}
                        </span>
                      )}
                    </span>
                    <span className="mt-2 block font-display text-[clamp(1.15rem,2.2vw,1.5rem)] font-light leading-snug text-ivory transition-colors group-hover:text-glow">
                      {tr(item.title, locale)}
                    </span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-glow">
                    {t("pressRead")}
                    <span aria-hidden className="rtl:-scale-x-100">
                      ↗
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      {/* ================================================================== */}
      {/*  Saatchi Art                                                        */}
      {/* ================================================================== */}
      {site.saatchi && (
        <Section className="py-16 text-center">
          <Reveal>
            <p className="eyebrow">Saatchi Art</p>
            <p className="mx-auto mt-5 max-w-xl font-display text-[clamp(1.3rem,2.6vw,1.9rem)] font-light text-ivory">
              {t("saatchiLead")}
            </p>
            <div className="mt-8">
              <ActionLink href={site.saatchi} external tone="gold">
                {t("saatchiCta")}
              </ActionLink>
            </div>
          </Reveal>
        </Section>
      )}

      <Section className="pb-28 text-center">
        <ActionLink href="/contact">{tn("contact")}</ActionLink>
      </Section>
    </>
  );
}
