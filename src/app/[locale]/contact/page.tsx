import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/data/site";
import { t as tr } from "@/data/types";

import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { Section } from "@/components/ui";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(locale);

  const t = await getTranslations("contact");

  const coordinates = [
    site.email && {
      label: t("email"),
      value: site.email,
      href: `mailto:${site.email}`,
    },
    site.phone && {
      label: t("phone"),
      value: site.phoneDisplay,
      href: `tel:${site.phone.replace(/\s/g, "")}`,
    },
    {
      label: t("studio"),
      value: `${tr(site.city, locale)}, ${tr(site.country, locale)}`,
      href: undefined,
    },
    site.instagram && {
      label: "Instagram",
      value: site.instagramHandle,
      href: site.instagram,
    },
    site.saatchi && {
      label: t("saatchi"),
      value: "Saatchi Art",
      href: site.saatchi,
    },
  ].filter(Boolean) as { label: string; value: string; href?: string }[];

  return (
    <Section className="pt-40 pb-32 sm:pt-48">
      <div className="grid gap-16 lg:grid-cols-[0.85fr_1fr] lg:gap-24">
        {/* ------------------------------------------------------------ */}
        {/*  Coordonnées                                                   */}
        {/* ------------------------------------------------------------ */}
        <Reveal>
          <p className="eyebrow">{t("title")}</p>
          <h1 className="mt-6 font-display text-[clamp(2.4rem,6vw,4.6rem)] font-light leading-[1.05] text-ivory">
            {locale === "ar" ? site.nameAr : site.name}
          </h1>
          <div className="rule-glow mt-8 w-32" aria-hidden />
          <p className="mt-8 max-w-md text-[0.98rem] leading-relaxed text-sage">
            {t("lead")}
          </p>

          <dl className="mt-12 space-y-7">
            {coordinates.map((item) => (
              <div key={item.label}>
                <dt className="eyebrow">{item.label}</dt>
                <dd className="mt-2">
                  {item.href ? (
                    <a
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="font-display text-xl font-light text-ivory transition-colors duration-300 hover:text-glow"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-display text-xl font-light text-ivory">
                      {item.value}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* ------------------------------------------------------------ */}
        {/*  Formulaire                                                    */}
        {/* ------------------------------------------------------------ */}
        <Reveal delay={0.12}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
