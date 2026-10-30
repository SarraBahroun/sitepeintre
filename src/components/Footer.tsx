import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { site, courses, whatsappHref } from "@/data/site";
import { expositions } from "@/data/expositions";
import { t as tr } from "@/data/types";
import { Monogram } from "./Logo";
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from "./SocialIcons";

export default async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations("nav");
  const tf = await getTranslations("footer");
  const tc = await getTranslations("contact");
  const year = new Date().getFullYear();

  const columns = [
    {
      heading: t("expositions"),
      items: expositions.map((expo) => ({
        label: tr(expo.title, locale),
        href: `/expositions/${expo.slug}`,
      })),
    },
    {
      heading: t("menu"),
      items: [
        { label: t("artist"), href: "/artiste" },
        { label: t("divers"), href: "/divers" },
        ...(courses.enabled ? [{ label: t("courses"), href: "/cours" }] : []),
        { label: t("contact"), href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="relative mt-32 border-t border-glow/10">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marque */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Monogram feather density={18} className="h-16 w-16" />
              <div>
                <p className="font-display text-xl tracking-[0.12em] text-ivory">
                  {locale === "ar" ? site.nameAr : site.name}
                </p>
                <p className="eyebrow mt-1.5">
                  {locale === "ar" ? "فنانة تشكيلية" : "artiste peintre"}
                </p>
              </div>
            </div>

            {site.instagram && (
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2.5 text-sm text-sage transition-colors duration-300 hover:text-glow"
              >
                <InstagramIcon />
                <bdi dir="ltr">{site.instagramHandle}</bdi>
              </a>
            )}

            {site.facebook && (
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-2.5 text-sm text-sage transition-colors duration-300 hover:text-glow"
              >
                <FacebookIcon />
                Facebook
              </a>
            )}

            {site.whatsapp && (
              <a
                href={whatsappHref(tc("whatsappHello"))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-2.5 text-sm text-sage transition-colors duration-300 hover:text-glow"
              >
                <WhatsAppIcon />
                WhatsApp
              </a>
            )}

            {site.saatchi && (
              <a
                href={site.saatchi}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-2.5 text-sm text-sage transition-colors duration-300 hover:text-glow"
              >
                <span
                  aria-hidden
                  className="flex h-[17px] w-[17px] items-center justify-center rounded-[4px] border border-current text-[0.6rem] font-semibold"
                >
                  S
                </span>
                Saatchi Art
              </a>
            )}
          </div>

          {/* Plan du site */}
          {columns.map((column) => (
            <nav key={column.heading}>
              <h3 className="eyebrow">{column.heading}</h3>
              <ul className="mt-5 space-y-3">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-sage transition-colors duration-300 hover:text-glow"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="rule-glow my-10" />

        <div className="flex flex-col items-center justify-between gap-3 text-[0.72rem] tracking-[0.1em] text-sage-dim sm:flex-row">
          <p>
            © {year} {locale === "ar" ? site.nameAr : site.name}. {tf("rights")}
          </p>
          <p>
            {tr(site.city, locale)}, {tr(site.country, locale)}
          </p>
        </div>
      </div>
    </footer>
  );
}
