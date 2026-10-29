import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/data/site";
import { t as tr } from "@/data/types";

import Reveal from "@/components/Reveal";
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
    site.email && { label: t("email"), value: site.email, href: `mailto:${site.email}` },
    site.phone && { label: t("phone"), value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    {
      label: t("studio"),
      value: tr(site.city, locale),
      href: undefined,
    },
    site.instagram && {
      label: "Instagram",
      value: site.instagramHandle,
      href: site.instagram,
    },
  ].filter(Boolean) as { label: string; value: string; href?: string }[];

  const fields = [
    { name: "name", label: t("formName"), type: "text" },
    { name: "email", label: t("formEmail"), type: "email" },
    { name: "subject", label: t("formSubject"), type: "text" },
  ];

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
                      target={item.href.startsWith("http") ? "_blank" : undefined}
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
          <form
            className="rounded-sm border border-glow/12 bg-night-2/50 p-7 sm:p-10"
            action={site.email ? `mailto:${site.email}` : undefined}
            method="post"
            encType="text/plain"
          >
            <div className="space-y-6">
              {fields.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="eyebrow block"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    required
                    className="mt-3 w-full border-b border-glow/20 bg-transparent pb-2.5 text-[0.95rem] text-ivory outline-none transition-colors duration-300 placeholder:text-sage-dim focus:border-glow"
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="eyebrow block">
                  {t("formMessage")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-3 w-full resize-none border-b border-glow/20 bg-transparent pb-2.5 text-[0.95rem] leading-relaxed text-ivory outline-none transition-colors duration-300 focus:border-glow"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-10 w-full rounded-sm border border-glow/35 bg-glow/5 px-7 py-4 text-[0.76rem] font-medium uppercase tracking-[0.2em] text-glow transition-all duration-400 hover:border-glow/70 hover:bg-glow/15"
            >
              {t("formSend")}
            </button>

            <p className="mt-5 text-center text-xs text-sage-dim">
              {t("formNote")}
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
