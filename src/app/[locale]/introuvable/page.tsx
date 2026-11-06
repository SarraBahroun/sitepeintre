import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import NotFound from "../not-found";

/* =============================================================================
   La page « introuvable », construite dans chaque langue.
   Le site est statique : c'est Cloudflare qui répond à une adresse inconnue,
   avec le fichier 404.html. scripts/apres-construction.mjs copie cette page
   à cet endroit — la même que le site montre lui-même, et non celle, nue et
   en anglais, que Next produit par défaut.
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
  const t = await getTranslations({ locale, namespace: "common" });
  return { title: t("notFound"), robots: { index: false } };
}

export default async function Introuvable({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <NotFound />;
}
