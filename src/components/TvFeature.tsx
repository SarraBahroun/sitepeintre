import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { artist, site } from "@/data/site";

import Reveal from "@/components/Reveal";
import ExpoFilm from "@/components/ExpoFilm";
import { Section, SectionHeading } from "@/components/ui";

/* =============================================================================
   Le passage télévisé — sur l'accueil, juste après la présentation de
   l'artiste, et sur sa page, juste après la biographie. C'est elle qui
   parle : il doit se trouver tôt, sans avoir à le chercher.
   ========================================================================== */

export default async function TvFeature({ locale }: { locale: Locale }) {
  if (!artist.tv.youtubeId) return null;

  const t = await getTranslations({ locale, namespace: "artist" });
  const tm = await getTranslations({ locale, namespace: "media" });
  const name = locale === "ar" ? site.nameAr : site.name;

  return (
    <Section className="py-20 sm:py-28">
      <Reveal>
        <SectionHeading
          eyebrow={artist.tv.outlet}
          title={t("tvTitle")}
          lead={t("tvLead")}
          align="center"
        />
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mx-auto mt-12 max-w-5xl">
          <ExpoFilm
            youtubeId={artist.tv.youtubeId}
            title={`${name} — ${artist.tv.outlet}`}
            playLabel={tm("watch")}
          />
        </div>
      </Reveal>
    </Section>
  );
}
