"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { site } from "@/data/site";
import { Monogram } from "./Logo";
import Embers from "./Embers";

/* =============================================================================
   Ouverture — L'Embrasement
   -----------------------------------------------------------------------------
   Un film, en deux plans. Le phénix brûle en fond ; par-dessus, le monogramme
   paraît, puis le nom s'allume lettre à lettre. À mi-course le second plan,
   déjà en mouvement en coulisse, prend la place du premier par un long fondu
   que réchauffe une braise. Puis tout retombe, et le rideau se lève.

   Le son vient des vidéos elles-mêmes. Elles démarrent muettes — aucun
   navigateur ne les laisserait partir autrement — et se dévoilent au premier
   geste du visiteur.

   Une fois par session, sur la page d'accueil seulement.
   ========================================================================== */

const SEEN_KEY = "hb-intro-seen";
const SOUND_KEY = "hb-sound";

/* La conduite du film, en secondes */
const PREROLL = 4.2; // le second plan se met en route, encore invisible
const CUT = 5.0; // le fondu commence
const DISSOLVE = 1.7; // sa durée — assez long pour que rien ne tranche
const END = 10.4; // le rideau se lève, juste avant la fin du second plan

const SHOTS = ["/videos/phenix-1.mp4", "/videos/phenix-2.mp4"] as const;

export default function Intro({ locale }: { locale: Locale }) {
  const t = useTranslations("intro");
  const pathname = usePathname();
  const onHome = pathname === "/";

  const [open, setOpen] = useState(true);
  const [shot, setShot] = useState(0);
  // Le second plan tourne-t-il déjà, en coulisse ?
  const [rolling, setRolling] = useState(false);
  // La chaleur qui enfle pendant le fondu
  const [glow, setGlow] = useState(false);
  const [sound, setSound] = useState(false);

  const videos = useRef<(HTMLVideoElement | null)[]>([null, null]);
  const soundButton = useRef<HTMLButtonElement>(null);
  // Le premier geste sert à dévoiler le son, pas à lever le rideau
  const armed = useRef(false);

  /**
   * Démasque ou masque les deux pistes sur-le-champ. À appeler depuis le
   * geste lui-même : un démasquage différé au rendu suivant sort de la
   * pile d'appel du geste, et plusieurs navigateurs le refusent.
   */
  const unmute = useCallback((on: boolean) => {
    videos.current.forEach((v) => {
      if (v) v.muted = !on;
    });
  }, []);

  /* --- Lever le rideau ------------------------------------------------- */

  const close = useCallback((force = false) => {
    if (!force && armed.current) {
      armed.current = false;
      return;
    }
    videos.current.forEach((v) => v?.pause());
    setOpen(false);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* navigation privée : le rideau reviendra, tant pis */
    }
  }, []);

  /* --- Faut-il seulement le jouer ? ------------------------------------ */

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
      const skip = requestAnimationFrame(() => setOpen(false));
      return () => cancelAnimationFrame(skip);
    }

    // Le second plan se met en route avant d'être visible : au moment du
    // fondu il est déjà en mouvement, et les deux images se recouvrent.
    const toPreroll = window.setTimeout(() => setRolling(true), PREROLL * 1000);
    const toCut = window.setTimeout(() => {
      setShot(1);
      setGlow(true);
    }, CUT * 1000);
    const toCalm = window.setTimeout(
      () => setGlow(false),
      (CUT + DISSOLVE) * 1000,
    );
    const toEnd = window.setTimeout(() => close(true), END * 1000);

    return () => {
      window.clearTimeout(toPreroll);
      window.clearTimeout(toCut);
      window.clearTimeout(toCalm);
      window.clearTimeout(toEnd);
    };
  }, [onHome, close]);

  /* --- Les deux plans tournent, l'image passe de l'un à l'autre --------- */

  useEffect(() => {
    if (!open) return;
    videos.current.forEach((v, i) => {
      if (!v) return;
      // Le second ne démarre qu'au préroll ; ensuite les deux tournent
      if (i === 0 || rolling) void v.play().catch(() => {});
    });
  }, [open, rolling]);

  /* --- Le son suit l'image : il passe d'un plan à l'autre en fondu ----- */

  useEffect(() => {
    if (!open) return;

    const [a, b] = videos.current;
    const target = shot === 0 ? a : b;
    const other = shot === 0 ? b : a;
    if (!target) return;

    // Les deux pistes restent ouvertes ; c'est le volume qui bascule,
    // sur la même durée que l'image. Couper net s'entendrait.
    target.muted = !sound;
    if (other) other.muted = !sound;

    const started = performance.now();
    const from = { t: target.volume, o: other?.volume ?? 0 };
    let frame = 0;

    const ramp = () => {
      const k = Math.min((performance.now() - started) / (DISSOLVE * 1000), 1);
      target.volume = from.t + (1 - from.t) * k;
      if (other) other.volume = from.o * (1 - k);
      if (k < 1) frame = requestAnimationFrame(ramp);
      else if (other) other.pause();
    };
    frame = requestAnimationFrame(ramp);
    return () => cancelAnimationFrame(frame);
  }, [shot, open, sound]);

  /* --- Le son -----------------------------------------------------------
     La vidéo démarre muette : c'est la seule façon qu'un navigateur la
     laisse partir seule. Le premier geste du visiteur la dévoile — et ce
     geste-là ne lève pas le rideau, pour ne pas emporter le son avec lui.
     --------------------------------------------------------------------- */

  useEffect(() => {
    if (!open) return;

    let muted = false;
    try {
      muted = localStorage.getItem(SOUND_KEY) === "off";
    } catch {
      /* ignore */
    }
    if (muted) return;

    let done = false;

    function reveal(e: Event) {
      if (done) return;
      // Le bouton de son parle pour lui-même : s'il est visé, on le laisse
      // faire, sinon son clic allumerait puis éteindrait aussitôt.
      const target = e.target as Node | null;
      if (target && soundButton.current?.contains(target)) return;

      done = true;
      armed.current = true;
      // On démasque dans la foulée du geste : certains navigateurs
      // refusent un démasquage qui arrive après coup.
      unmute(true);
      setSound(true);
      detach();
    }

    function detach() {
      window.removeEventListener("pointerdown", reveal, true);
      window.removeEventListener("keydown", reveal, true);
      window.removeEventListener("touchstart", reveal, true);
    }

    window.addEventListener("pointerdown", reveal, true);
    window.addEventListener("keydown", reveal, true);
    window.addEventListener("touchstart", reveal, true);
    return detach;
  }, [open, unmute]);

  /* --- Échapper, et bloquer le défilement ------------------------------ */

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
    unmute(next); // dans la foulée du clic, sans attendre le rendu
    setSound(next);
    try {
      localStorage.setItem(SOUND_KEY, next ? "on" : "off");
    } catch {
      /* ignore */
    }
  };

  if (!onHome) return null;

  const name = locale === "ar" ? site.nameAr : site.name;
  const units = locale === "ar" ? name.split(" ") : Array.from(name);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="intro"
          exit={{ opacity: 0, scale: 1.06, filter: "blur(18px)" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => close()}
          role="dialog"
          aria-label={t("title")}
          className="fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-night"
        >
          {/* ============================================================ */}
          {/*  Le feu                                                       */}
          {/* ============================================================ */}
          {SHOTS.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0 }}
              animate={{ opacity: i === shot ? 1 : 0 }}
              transition={{
                duration: i === 0 && shot === 0 ? 1.2 : DISSOLVE,
                ease: "easeInOut",
              }}
              className="absolute inset-0"
            >
              {/*
                Les plans sont verticaux, l'écran ne l'est pas. On remplit
                le cadre plutôt que d'y loger la vidéo entière : mieux vaut
                perdre le haut et le bas que laisser des bords apparents de
                part et d'autre. Le feu occupe tout le champ.
              */}
              <video
                ref={(el) => {
                  videos.current[i] = el;
                }}
                src={src}
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </motion.div>
          ))}

          {/* Les voiles : le feu reste visible, le nom reste lisible */}
          <div
            aria-hidden
            className="absolute inset-0 bg-night/40 mix-blend-multiply"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_58%_48%_at_50%_50%,transparent_16%,color-mix(in_oklab,var(--color-night)_86%,transparent)_88%)]"
          />

          {/* Les braises, par-dessus le feu */}
          <Embers />

          {/* Les barres du cadre : on est au cinéma */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[5vh] bg-night"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[5vh] bg-night"
          />

          {/* ============================================================ */}
          {/*  La braise du passage                                         */}
          {/*  Non plus un éclair qui tranche, mais une chaleur qui enfle   */}
          {/*  pendant le fondu et retombe avec lui : elle lie les deux     */}
          {/*  plans au lieu de les séparer.                                */}
          {/* ============================================================ */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: glow ? 0.42 : 0 }}
            transition={{ duration: DISSOLVE * 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,color-mix(in_oklab,var(--color-gold)_55%,transparent),transparent_70%)]"
          />

          {/* ============================================================ */}
          {/*  Le titre                                                     */}
          {/* ============================================================ */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.55, rotate: -22 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 1.3,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Monogram className="h-16 w-16 drop-shadow-[0_0_26px_rgba(230,184,100,0.8)] sm:h-20 sm:w-20" />
            </motion.div>

            <h1 className="mt-8 font-display text-[clamp(2.3rem,8.5vw,6rem)] font-light leading-[1.02] tracking-[0.06em] text-ivory">
              <span className="sr-only">{name}</span>
              <span
                aria-hidden
                className="inline-flex flex-wrap justify-center"
              >
                {units.map((unit, i) => (
                  <motion.span
                    key={`${unit}-${i}`}
                    initial={{
                      opacity: 0,
                      y: 40,
                      filter: "blur(18px) brightness(3)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px) brightness(1)",
                    }}
                    transition={{
                      duration: 1.1,
                      delay: 1 + i * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                    style={{
                      textShadow:
                        "0 0 24px rgba(255,205,110,0.45), 0 0 70px rgba(255,150,40,0.25)",
                    }}
                  >
                    {unit === " " ? " " : unit}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{
                duration: 1.4,
                delay: 2.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 h-px w-56 bg-gradient-to-r from-transparent via-gold to-transparent"
              aria-hidden
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 2.6 }}
              className="eyebrow mt-6 text-gold/80"
            >
              {t("motto")}
            </motion.p>
          </div>

          {/* ============================================================ */}
          {/*  Entrer                                                       */}
          {/* ============================================================ */}
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 6.4 }}
            onClick={(e) => {
              e.stopPropagation();
              close(true);
            }}
            className="group absolute inset-x-0 bottom-[9vh] mx-auto inline-flex w-fit items-center gap-3.5 rounded-full border border-gold/35 bg-night/40 px-8 py-3.5 backdrop-blur-md transition-all duration-500 hover:border-gold/80 hover:bg-gold/10"
          >
            <span className="text-[0.72rem] font-medium uppercase tracking-[0.26em] text-gold">
              {t("enter")}
            </span>
            <span
              aria-hidden
              className="h-px w-6 bg-gold transition-all duration-500 group-hover:w-11"
            />
          </motion.button>

          {/* ============================================================ */}
          {/*  Le son                                                       */}
          {/* ============================================================ */}
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            ref={soundButton}
            onClick={toggleSound}
            aria-pressed={sound}
            aria-label={sound ? t("soundOff") : t("soundOn")}
            title={sound ? t("soundOff") : t("soundOn")}
            className={`absolute end-6 top-[calc(5vh+1.25rem)] flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-400 ${
              sound
                ? "border-gold/60 text-gold"
                : "animate-breathe border-gold/25 text-gold/60 hover:border-gold/60 hover:text-gold"
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
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
