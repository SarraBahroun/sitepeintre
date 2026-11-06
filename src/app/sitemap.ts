import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { expositions } from "@/data/expositions";
import { courses, siteUrl } from "@/data/site";

/* =============================================================================
   Plan du site pour les moteurs de recherche — chaque page dans ses trois
   langues, chacune pointant vers ses deux sœurs.
   ========================================================================== */

// Le site est statique : ce fichier est écrit une fois, à la construction.
export const dynamic = "force-static";

const base = siteUrl;

const pages = [
  "",
  "/artiste",
  ...expositions.map((expo) => `/expositions/${expo.slug}`),
  "/livres",
  "/bijoux",
  ...(courses.enabled ? ["/cours"] : []),
  "/contact",
  "/confidentialite",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((page) =>
    routing.locales.map((locale) => ({
      url: `${base}/${locale}${page}`,
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${base}/${l}${page}`]),
        ),
      },
    })),
  );
}
