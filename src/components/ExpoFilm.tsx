"use client";

import { useState } from "react";
import Image from "next/image";

/* =============================================================================
   Le film d'une exposition — une vidéo YouTube, en grand.
   -----------------------------------------------------------------------------
   Tant qu'on ne clique pas, ce n'est qu'une image : aucun script YouTube
   n'est chargé à l'ouverture de la page. Le clic lance la lecture.
   La grande vignette n'existe pas pour toutes les vidéos. YouTube répond
   alors par une image grise de 120 px, sans erreur : c'est sa largeur qui
   trahit l'absence, et l'on retombe sur la vignette moyenne.
   ========================================================================== */

export default function ExpoFilm({
  youtubeId,
  title,
  playLabel,
}: {
  youtubeId: string;
  title: string;
  playLabel: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(
    `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`,
  );

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-glow/15 bg-night-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`${playLabel} — ${title}`}
          className="group absolute inset-0 block"
        >
          <Image
            src={thumb}
            alt=""
            fill
            unoptimized
            sizes="(max-width: 1280px) 100vw, 1200px"
            onError={() =>
              setThumb(`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`)
            }
            onLoad={(e) => {
              if (e.currentTarget.naturalWidth <= 120)
                setThumb(`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`);
            }}
            className="object-cover opacity-85 transition-all duration-[1.1s] ease-[var(--ease-silk)] group-hover:scale-[1.03] group-hover:opacity-100"
          />
          <span className="absolute inset-0 bg-night/35 transition-opacity duration-500 group-hover:opacity-10" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-glow/50 bg-night/55 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-glow group-hover:bg-glow/15 sm:h-24 sm:w-24">
              <svg
                width="22"
                height="25"
                viewBox="0 0 17 19"
                aria-hidden
                className="ms-1.5"
              >
                <path d="M0 0l17 9.5L0 19z" fill="var(--color-glow)" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
