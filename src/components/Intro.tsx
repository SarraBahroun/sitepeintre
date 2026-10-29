"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { site } from "@/data/site";
import { playIntroSound, stopIntroSound } from "@/lib/sound";
import { Monogram } from "./Logo";

/* =============================================================================
   Ouverture — le phénix tourne autour du nom
   -----------------------------------------------------------------------------
   Un rideau plein écran, une fois par session, sur la page d'accueil
   seulement. Il se lève tout seul au bout de quelques secondes, et à la
   première touche ou au premier clic si l'on est pressé.
   ========================================================================== */

const SEEN_KEY = "hb-intro-seen";
const SOUND_KEY = "hb-sound";
const AUTO_DISMISS = 6400; // ms
const ORBIT_DURATION = 7.5; // s

/** Un tour d'ellipse, échantillonné pour framer-motion. */
function useOrbit(rx: number, ry: number) {
  return useMemo(() => {
    const steps = 72;
    const x: number[] = [];
    const y: number[] = [];
    const scale: number[] = [];
    const opacity: number[] = [];
    const rotate: number[] = [];

    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * Math.PI * 2 - Math.PI / 2;
      const sin = Math.sin(a);
      x.push(Math.cos(a) * rx);
      y.push(sin * ry);
      // En bas de l'ellipse l'oiseau est « devant » : plus grand, plus net
      scale.push(0.58 + ((sin + 1) / 2) * 0.5);
      opacity.push(0.5 + ((sin + 1) / 2) * 0.5);
      // Un léger roulis, comme un oiseau qui vire
      rotate.push(Math.cos(a) * -13);
    }
    return { x, y, scale, opacity, rotate };
  }, [rx, ry]);
}

export default function Intro({ locale }: { locale: Locale }) {
  const t = useTranslations("intro");
  const pathname = usePathname();
  const onHome = pathname === "/";

  const [open, setOpen] = useState(true);
  const [sound, setSound] = useState(false);
  const [rx, setRx] = useState(300);

  const orbit = useOrbit(rx, rx * 0.34);
  const name = locale === "ar" ? site.nameAr : site.name;
  const units = locale === "ar" ? name.split(" ") : Array.from(name);

  const close = useCallback(() => {
    setOpen(false);
    stopIntroSound();
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* navigation privée : tant pis, le rideau reviendra */
    }
  }, []);

  /* --- Faut-il seulement l'afficher ? --- */
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* ignore */
    }
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (seen || reduced || !onHome) {
      setOpen(false);
      return;
    }

    setRx(Math.min(Math.max(window.innerWidth * 0.3, 160), 330));

    const timer = window.setTimeout(close, AUTO_DISMISS);
    return () => window.clearTimeout(timer);
  }, [onHome, close]);

  /* --- Le son suit la préférence enregistrée, jamais tout seul --- */
  useEffect(() => {
    if (!open) return;
    let wanted = false;
    try {
      wanted = localStorage.getItem(SOUND_KEY) === "on";
    } catch {
      /* ignore */
    }
    if (wanted) {
      setSound(true);
      void playIntroSound();
    }
  }, [open]);

  /* --- Toute touche lève le rideau --- */
  useEffect(() => {
    if (!open) return;
    const onKey = () => close();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !sound;
    setSound(next);
    try {
      localStorage.setItem(SOUND_KEY, next ? "on" : "off");
    } catch {
      /* ignore */
    }
    if (next) void playIntroSound();
    else stopIntroSound();
  };

  if (!onHome) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="intro"
          exit={{ opacity: 0, filter: "blur(14px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          onClick={close}
          role="dialog"
          aria-label={t("title")}
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center overflow-hidden bg-night"
        >
          {/* --- La braise du fond --- */}
          <div
            aria-hidden
            className="animate-breathe pointer-events-none absolute left-1/2 top-1/2 h-[82vmin] w-[82vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--color-gold-deep) 30%, transparent) 0%, color-mix(in oklab, var(--color-glow-deep) 16%, transparent) 45%, transparent 70%)",
            }}
          />

          {/* --- Le théâtre : nom au centre, phénix en orbite --- */}
          <div className="relative flex flex-col items-center px-6 text-center">
            {/* Le monogramme ouvre la marche */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -18 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Monogram className="h-16 w-16 sm:h-20 sm:w-20" />
            </motion.div>

            {/* Le nom, lettre à lettre */}
            <h1 className="mt-8 font-display text-[clamp(2.2rem,8vw,5.5rem)] font-light leading-[1.02] tracking-[0.05em] text-ivory">
              <span className="sr-only">{name}</span>
              <span aria-hidden className="inline-flex flex-wrap justify-center">
                {units.map((unit, i) => (
                  <motion.span
                    key={`${unit}-${i}`}
                    initial={{ opacity: 0, y: 34, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.95,
                      delay: 0.55 + i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                  >
                    {unit === " " ? " " : unit}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="eyebrow mt-6"
            >
              {t("motto")}
            </motion.p>

            {/* L'oiseau de feu tourne autour de tout cela */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.9 }}
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-0 w-0"
            >
              <motion.div
                animate={{
                  x: orbit.x,
                  y: orbit.y,
                  scale: orbit.scale,
                  opacity: orbit.opacity,
                  rotate: orbit.rotate,
                }}
                transition={{
                  duration: ORBIT_DURATION,
                  ease: "linear",
                  repeat: Infinity,
                  times: orbit.x.map((_, i) => i / (orbit.x.length - 1)),
                }}
                className="absolute -left-[110px] -top-[76px]"
              >
                <Image
                  src="/images/oeuvres/phenix.png"
                  alt=""
                  width={220}
                  height={153}
                  priority
                  className="w-[220px] drop-shadow-[0_0_38px_rgba(230,184,100,0.55)]"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* --- Entrer --- */}
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.6 }}
            onClick={close}
            className="group absolute bottom-16 inline-flex items-center gap-3.5 rounded-full border border-gold/30 px-7 py-3.5 transition-all duration-500 hover:border-gold/70 hover:bg-gold/10"
          >
            <span className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-gold">
              {t("enter")}
            </span>
            <span
              aria-hidden
              className="h-px w-6 bg-gold transition-all duration-500 group-hover:w-10"
            />
          </motion.button>

          {/* --- Le son --- */}
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            onClick={toggleSound}
            aria-pressed={sound}
            aria-label={sound ? t("soundOff") : t("soundOn")}
            title={sound ? t("soundOff") : t("soundOn")}
            className="absolute end-7 top-7 flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 text-gold/70 transition-all duration-400 hover:border-gold/60 hover:text-gold"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 9v6h4l5 4V5L8 9H4Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              {sound ? (
                <>
                  <path
                    d="M16.5 8.5a5 5 0 0 1 0 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M19.5 6a9 9 0 0 1 0 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </>
              ) : (
                <path
                  d="M17 10l4 4m0-4l-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
