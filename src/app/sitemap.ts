import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { expositions } from "@/data/expositions";
import { courses } from "@/data/site";

/* =============================================================================
   Plan du site pour les moteurs de recherche — chaque page dans ses trois
   langues, chacune pointant vers ses deux sœurs.
   ========================================================================== */

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const pages = [
  "",
  "/artiste",
  ...expositions.map((expo) => `/expositions/${expo.slug}`),
  "/livres",
  "/bijoux",
  ...(courses.enabled ? ["/cours"] : []),
  "/contact",
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
