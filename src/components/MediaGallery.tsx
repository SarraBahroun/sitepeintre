"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import type { MediaItem } from "@/data/types";
import { t as tr } from "@/data/types";
import type { Locale } from "@/i18n/routing";

/* =============================================================================
   Vidéos & médias — reportages, passages radio et télévision.
   -----------------------------------------------------------------------------
   La vignette YouTube reste une simple image tant qu'on ne clique pas : aucun
   script tiers n'est chargé à l'ouverture de la page.
   ========================================================================== */

const kindIcon: Record<string, React.ReactNode> = {
  radio: (
    <path
      d="M3 9h18v11H3zM7 9l10-5M7 14.5h.01M11 14.5h6"
      stroke="currentColor"
      strokeWidth="1.3"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  tv: (
    <path
      d="M3 7h18v13H3zM8 3l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.3"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  interview: (
    <path
      d="M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3ZM5 11a7 7 0 0 0 14 0M12 18v3"
      stroke="currentColor"
      strokeWidth="1.3"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  video: (
    <path
      d="M3 6h13v12H3zM16 10l5-3v10l-5-3z"
      stroke="currentColor"
      strokeWidth="1.3"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

function MediaCard({
  item,
  locale,
  index,
}: {
  item: MediaItem;
  locale: Locale;
  index: number;
}) {
  const t = useTranslations("media");
  const [playing, setPlaying] = useState(false);

  const title = tr(item.title, locale);
  const thumb = item.youtubeId
    ? `https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`
    : null;

  const body = (
    <>
      <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-glow/10 bg-night-2 transition-colors duration-500 group-hover:border-glow/35">
        {playing && item.youtubeId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <>
            {thumb ? (
              <Image
                src={thumb}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
                className="object-cover opacity-80 transition-all duration-[1.1s] ease-[var(--ease-silk)] group-hover:scale-105 group-hover:opacity-100"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-moss via-night-2 to-night" />
            )}
            <div className="absolute inset-0 bg-night/45 transition-opacity duration-500 group-hover:opacity-20" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-glow/40 bg-night/60 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-glow/80 group-hover:bg-glow/15">
                <svg
                  width="17"
                  height="19"
                  viewBox="0 0 17 19"
                  aria-hidden
                  className="ms-1 rtl:ms-0 rtl:me-1 rtl:-scale-x-100"
                >
                  <path d="M0 0l17 9.5L0 19z" fill="var(--color-glow)" />
                </svg>
              </span>
            </span>
          </>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-[0.64rem] font-medium uppercase tracking-[0.2em] text-sage-dim">
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
              {kindIcon[item.kind] ?? kindIcon.video}
            </svg>
            {t(`kind.${item.kind}`)}
            {item.outlet && <span className="text-sage">· {item.outlet}</span>}
          </p>
          <h3 className="mt-2 font-display text-lg font-light text-ivory transition-colors duration-300 group-hover:text-glow">
            {title}
          </h3>
        </div>
        {item.date && (
          <span className="shrink-0 text-xs text-sage-dim">{item.date}</span>
        )}
      </div>
    </>
  );

  // Sans identifiant YouTube, la carte devient un lien externe.
  if (!item.youtubeId && item.url) {
    return (
      <motion.a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.7,
          delay: (index % 2) * 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="group block"
      >
        {body}
      </motion.a>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: (index % 2) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <button
        type="button"
        onClick={() => setPlaying(true)}
        disabled={playing}
        aria-label={`${item.kind === "radio" ? t("listen") : t("watch")} — ${title}`}
        className="block w-full text-start"
      >
        {body}
      </button>
    </motion.div>
  );
}

export default function MediaGallery({
  items,
  locale,
}: {
  items: MediaItem[];
  locale: Locale;
}) {
  if (!items.length) return null;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {items.map((item, i) => (
        <MediaCard key={item.id} item={item} locale={locale} index={i} />
      ))}
    </div>
  );
}
