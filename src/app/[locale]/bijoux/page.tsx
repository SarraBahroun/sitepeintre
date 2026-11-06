import type { Metadata } from "next";

import { routing, type Locale } from "@/i18n/routing";
import OtherWorksPage, {
  otherWorksMetadata,
} from "@/components/OtherWorksPage";

/* Bijoux — Chic & Glamour — le contenu vient de src/data/site.ts → diversSections. */

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return otherWorksMetadata(locale, "jewels");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <OtherWorksPage locale={locale as Locale} kind="jewels" />;
}
