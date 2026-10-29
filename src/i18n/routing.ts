import { defineRouting } from "next-intl/routing";

export const locales = ["fr", "en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  ar: "العربية",
};

export const localeShort: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  ar: "ع",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "fr",
  localePrefix: "always",
});
