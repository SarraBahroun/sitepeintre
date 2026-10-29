"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

/* =============================================================================
   Photographies du vernissage — mosaïque en colonnes, visionneuse au clic.
   ========================================================================== */

export default function PhotoGallery({
  images,
  label,
}: {
  images: string[];
  label: string;
}) {
  const t = useTranslations("artwork");
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const go = useCallback(
    (step: number) =>
      setIndex((i) =>
        i === null ? null : (i + step + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, go]);

  if (!images.length) return null;

  return (
    <>
      <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
        {images.map((src, i) => (
          <motion.button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.6,
              delay: (i % 4) * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative block w-full overflow-hidden rounded-sm border border-glow/8 bg-night-2 transition-colors duration-500 hover:border-glow/30"
          >
            <Image
              src={src}
              alt={`${label} — ${i + 1}`}
              width={800}
              height={600}
              sizes="(max-width: 768px) 50vw, 25vw"
              className="h-auto w-full object-cover transition-transform duration-[1.1s] ease-[var(--ease-silk)] group-hover:scale-[1.05]"
            />
            <span className="absolute inset-0 bg-night/35 transition-opacity duration-500 group-hover:opacity-0" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[70] flex items-center justify-center bg-night/96 p-4 backdrop-blur-xl sm:p-10"
          >
            <motion.div
              key={images[index]}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-full max-h-[86dvh] w-full max-w-[1200px]"
            >
              <Image
                src={images[index]}
                alt={`${label} — ${index + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>

            <button
              type="button"
              onClick={close}
              aria-label={t("close")}
              className="absolute end-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-glow/25 bg-night/70 text-sage backdrop-blur-md transition-colors hover:border-glow/60 hover:text-glow"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <path
                  d="M1 1l12 12M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div
              className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-5"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={t("previous")}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-glow/20 bg-night/70 text-sage backdrop-blur-md transition-colors hover:border-glow/50 hover:text-glow"
              >
                <svg width="15" height="12" viewBox="0 0 15 12" aria-hidden>
                  <path
                    d="M6 1L1 6l5 5M1 6h13"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <span className="text-[0.72rem] tracking-[0.16em] text-sage-dim">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={t("next")}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-glow/20 bg-night/70 text-sage backdrop-blur-md transition-colors hover:border-glow/50 hover:text-glow"
              >
                <svg width="15" height="12" viewBox="0 0 15 12" aria-hidden>
                  <path
                    d="M9 1l5 5-5 5M14 6H1"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
