import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { courses, site } from "@/data/site";
import { t as tr, tRich } from "@/data/types";

import Reveal from "@/components/Reveal";
import CourseForm from "@/components/CourseForm";
import { Section, SectionHeading } from "@/components/ui";

/* =============================================================================
   Cours de peinture — présentation des formules et demande d'inscription.
   Se désactive d'un seul interrupteur : src/data/site.ts → courses.enabled
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
  const t = await getTranslations({ locale, namespace: "courses" });
  return { title: t("title") };
}

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(locale);

  if (!courses.enabled) notFound();

  const t = await getTranslations("courses");
  const tn = await getTranslations("nav");

  const description = tRich(courses.description, locale);

  const practical = [
    { label: t("location"), value: tr(courses.practical.location, locale) },
    { label: t("schedule"), value: tr(courses.practical.schedule, locale) },
    { label: t("price"), value: tr(courses.practical.price, locale) },
  ].filter((row) => row.value);

  return (
    <>
      {/* ================================================================== */}
      {/*  En-tête                                                            */}
      {/* ================================================================== */}
      <Section className="pt-40 pb-16 sm:pt-48">
        <Reveal>
          <p className="eyebrow">{t("studio")}</p>
          <h1 className="mt-6 font-display text-[clamp(2.6rem,7vw,5.5rem)] font-light leading-[1.02] text-ivory">
            {t("title")}
          </h1>
          <div className="rule-glow mt-9 w-48" aria-hidden />
          <p className="mt-8 max-w-2xl text-[1.05rem] leading-relaxed text-sage">
            {tr(courses.lead, locale)}
          </p>

          {description.length > 0 && (
            <div className="mt-8 max-w-2xl space-y-5">
              {description.map((paragraph, i) => (
                <p key={i} className="text-[0.98rem] leading-[1.9] text-sage">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </Reveal>
      </Section>

      {/* ================================================================== */}
      {/*  Les formules                                                       */}
      {/* ================================================================== */}
      {courses.formulas.length > 0 && (
        <Section className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading title={t("formulasTitle")} />
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {courses.formulas.map((formula, i) => (
              <Reveal key={formula.id} delay={i * 0.1}>
                <article className="group h-full rounded-sm border border-glow/12 bg-night-2/40 p-8 transition-all duration-700 ease-[var(--ease-silk)] hover:border-glow/35 hover:bg-night-2/70">
                  <span
                    aria-hidden
                    className="font-display text-3xl font-light text-glow/30 transition-colors duration-500 group-hover:text-glow/60"
                  >
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-light text-ivory">
                    {tr(formula.title, locale)}
                  </h3>
                  <div className="rule-glow mt-4 w-12" aria-hidden />
                  <p className="mt-5 text-[0.94rem] leading-relaxed text-sage">
                    {tr(formula.description, locale)}
                  </p>
                  {tr(formula.detail, locale) && (
                    <p className="mt-4 text-sm text-sage-dim">
                      {tr(formula.detail, locale)}
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* ================================================================== */}
      {/*  Inscription                                                        */}
      {/* ================================================================== */}
      <Section id="inscription" className="scroll-mt-28 py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow={tn("courses")}
              title={t("registerTitle")}
              lead={t("registerLead")}
            />

            {practical.length > 0 && (
              <dl className="mt-12">
                <p className="eyebrow">{t("practicalTitle")}</p>
                <div className="mt-5">
                  {practical.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between gap-6 border-b border-glow/10 py-3.5"
                    >
                      <dt className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-sage-dim">
                        {row.label}
                      </dt>
                      <dd className="text-end text-sm text-ivory">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </div>
              </dl>
            )}

            <div className="mt-10 space-y-2 text-sm">
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="block text-sage transition-colors hover:text-glow"
              >
                <bdi dir="ltr">{site.phoneDisplay}</bdi>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="block text-sage transition-colors hover:text-glow"
              >
                <bdi dir="ltr">{site.email}</bdi>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <CourseForm locale={locale} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
