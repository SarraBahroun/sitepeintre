import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";

import CartView from "@/components/CartView";
import { Section, SectionHeading } from "@/components/ui";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cart" });
  // Le panier de chacun n'a rien à faire dans un moteur de recherche
  return { title: t("title"), robots: { index: false } };
}

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  setRequestLocale(locale);

  const t = await getTranslations("cart");

  return (
    <Section className="pt-40 pb-32 sm:pt-48">
      <SectionHeading title={t("title")} lead={t("lead")} />
      <div className="mt-14">
        <CartView locale={locale} />
      </div>
    </Section>
  );
}
