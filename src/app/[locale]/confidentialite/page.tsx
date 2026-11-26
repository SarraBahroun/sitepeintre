import type { Metadata } from "next";
import { alternates } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/data/site";
import { privacySections, privacyUpdated } from "@/data/privacy";
import { t as tr } from "@/data/types";

import Reveal from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/ui";

/* =============================================================================
   Confidentialité — ce que le site fait des informations de ses visiteurs.
   Le texte vient de src/data/privacy.ts.
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
  const t = await getTranslations({ locale, namespace: "privacy" });
  return { title: t("title"), alternates: alternates(locale, "/confidentialite") };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(locale);

  const t = await getTranslations("privacy");
  const updated = new Intl.DateTimeFormat(
    locale === "ar" ? "ar-TN" : locale === "en" ? "en-GB" : "fr-FR",
    { day: "numeric", month: "long", year: "numeric" },
  ).format(new Date(privacyUpdated));

  return (
    <Section className="pt-40 pb-32 sm:pt-48">
      <Reveal>
        <SectionHeading as="h1" title={t("title")} lead={t("lead")} />
      </Reveal>

      <div className="mt-16 max-w-2xl space-y-14">
        {privacySections.map((section) => (
          <Reveal key={section.id}>
            <section aria-labelledby={`p-${section.id}`}>
              <h2
                id={`p-${section.id}`}
                className="font-display text-[1.6rem] font-light text-ivory"
              >
                {tr(section.title, locale)}
              </h2>
              <div className="rule-glow mt-4 w-12" aria-hidden />
              <div className="mt-6 space-y-4">
                {section.body[locale].map((paragraph, k) => (
                  <p
                    key={k}
                    className="text-[0.98rem] leading-[1.85] text-sage"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          </Reveal>
        ))}

        <Reveal>
          <div className="rounded-sm border border-glow/15 bg-night-2/40 px-7 py-6">
            <p className="eyebrow">{t("writeTo")}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 inline-block font-display text-xl text-ivory transition-colors duration-300 hover:text-glow"
            >
              <bdi dir="ltr">{site.email}</bdi>
            </a>
          </div>
          <p className="mt-8 text-xs text-sage-dim">
            {t("updated")} {updated}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
