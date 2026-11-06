import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";

// Le site est statique : ce fichier est écrit une fois, à la construction.
export const dynamic = "force-static";

const base = siteUrl;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
