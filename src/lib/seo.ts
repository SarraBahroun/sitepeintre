import type { Metadata } from "next";

import { routing } from "@/i18n/routing";

/**
 * L'adresse officielle d'une page et celles de ses deux sœurs dans les
 * autres langues. Sans cela, Google voit /fr, /en et /ar comme trois copies
 * d'une même page et peut en écarter deux.
 *
 * `path` sans la langue : "" pour l'accueil, "/artiste", "/expositions/jungle-1"…
 * Les adresses sont relatives : `metadataBase` (layout) les complète.
 */
export function alternates(locale: string, path: string): Metadata["alternates"] {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}${path}`])),
      "x-default": `/${routing.defaultLocale}${path}`,
    },
  };
}
