"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { site } from "@/data/site";
import { Signature } from "./Logo";
import Embers from "./Embers";

/* =============================================================================
   Ouverture — L'Embrasement
   -----------------------------------------------------------------------------
   Deux temps.

   D'abord un carton : le monogramme, le nom qui s'allume lettre à lettre, la
   devise, et une invite qui respire. Rien ne bouge encore.

   Puis le film, au premier geste : le phénix brûle plein cadre, un second
   plan prend la place du premier par un long fondu que réchauffe une braise,
   et le rideau se lève sur le site.

   Pourquoi ce carton. Aucun navigateur ne laisse un son partir seul — la
   règle protège le visiteur, et rien ne la contourne. Mais un son demandé
   DANS le geste du visiteur est toujours accordé. Le carton n'est donc pas
   une porte à pousser : c'est ce qui garantit qu'on entende le feu dès la
   première image, à chaque visite, sur n'importe quel navigateur.

   Une fois par session, sur la page d'accueil seulement.
   ========================================================================== */

const SEEN_KEY = "hb-intro-seen";

/* La conduite du film, en secondes — comptées à partir du geste */
const PREROLL = 4.2; // le second plan se met en route, encore invisible
const CUT = 5.0; // le fondu commence
const DISSOLVE = 1.7; // sa durée — assez long pour que rien ne tranche
const END = 10.4; // le rideau se lève, juste avant la fin du second plan

/** Sans geste, le carton finit par céder — mais alors en silence. */
const PATIENCE = 9000;

/*
  Le second plan existe en deux tailles. L'original (1080p, 60 images/s)
  et le premier plan se décodent ensemble pendant le fondu : un ordinateur
  le fait sans peine, un téléphone hachait. Les petits écrans reçoivent une
  version 720p à 30 images/s, à l'œil identique.
*/
const SHOTS: { src: string; phone?: string }[] = [
  { src: "/videos/phenix-1.mp4" },
  { src: "/videos/phenix-2.mp4", phone: "/videos/phenix-2-mobile.mp4" },
];
const PHONE = "(max-width: 900px), (pointer: coarse)";

export default function Intro({ locale }: { locale: Locale }) {
  const t = useTranslations("intro");
  const pathname = usePathname();
  const onHome = pathname === "/";

  const [open, setOpen] = useState(true);
  const [rolling, setRolling] = useState(false); // le film est lancé
  const [shot, setShot] = useState(0);
  const [second, setSecond] = useState(false); // le second plan tourne déjà
  const [glow, setGlow] = useState(false); // la braise du passage

  const [cutDue, setCutDue] = useState(false); // l'heure du fondu est venue
  const [secondPlaying, setSecondPlaying] = useState(false); // il tourne vraiment

  const videos = useRef<(HTMLVideoElement | null)[]>([null, null]);
  const started = useRef(false);
  const prerolled = useRef(false); // le second plan a été lancé pour de bon
  const cutDone = useRef(false);
  /*
    Le volume se règle-t-il ? Pas sur iPhone : il y reste toujours à fond.
    Le son ne peut donc pas y glisser d'un plan à l'autre — le second plan
    reste muet, et le premier garde la parole jusqu'au bout.
  */
  const canFade = useRef(true);

  /* --- Lever le rideau ------------------------------------------------- */

  const close = useCallback(() => {
    // On arrête le film avant de l'emporter : composer une vidéo en cours
    // de lecture pendant qu'on l'agrandit et l'efface coûte cher, et c'est
    // là que la transition hachait.
    videos.current.forEach((v) => {
      if (!v) return;
      v.pause();
      v.querySelectorAll("source").forEach((source) => source.remove());
      v.removeAttribute("src");
      v.load();
    });
    // Le site reprend ses esprits pendant que le rideau s'efface :
    // les deux mouvements se recouvrent.
    delete document.documentElement.dataset.intro;
    setOpen(false);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* navigation privée : le rideau reviendra, tant pis */
    }
  }, []);

  /* --- Lancer le film, depuis le geste lui-même ------------------------
     Tout se joue ici. `play()` est appelé dans la pile d'appel du geste,
     piste sonore ouverte : c'est à cette condition, et à elle seule, que
     le navigateur accorde le son.
     --------------------------------------------------------------------- */

  const start = useCallback((withSound: boolean) => {
    if (started.current) return;
    started.current = true;

    const first = videos.current[0];
    if (first) {
      first.muted = !withSound;
      first.volume = 1;
      void first.play().catch(() => {
        // Refusé malgré tout : on repart en silence plutôt que pas du tout
        first.muted = true;
        void first.play().catch(() => {});
      });
    }

    // Le second plan se prépare dans le même geste. Un téléphone ne charge
    // pas d'avance une vidéo qu'on ne lit pas : sans cela, il commençait
    // seulement à la télécharger au moment du fondu, et l'image se figeait.
    const next = videos.current[1];
    if (next) {
      next.volume = 0.5;
      canFade.current = Math.abs(next.volume - 0.5) < 0.01;
      next.volume = 1;
      next.muted = true;
      void next
        .play()
        .then(() => {
          if (prerolled.current) return;
          next.pause();
          next.currentTime = 0;
        })
        .catch(() => {});
    }

    setRolling(true);
  }, []);

  /* --- Faut-il seulement l'afficher ? ---------------------------------- */

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

    // Le site se met en retrait le temps de l'ouverture
    document.documentElement.dataset.intro = "running";
    return () => {
      delete document.documentElement.dataset.intro;
    };
  }, [onHome]);

  /* --- Le carton cède au premier geste ---------------------------------
     Le clic est écouté sur le rideau lui-même, non sur la fenêtre : posé
     sur la fenêtre, il partait au `pointerdown` et le `click` qui suivait
     trouvait le film déjà lancé — donc le refermait aussitôt. Un même
     geste allumait et éteignait.
     --------------------------------------------------------------------- */

  useEffect(() => {
    if (!open || rolling) return;

    // Personne ne bouge : on finit par jouer, sans le son
    const patience = window.setTimeout(() => start(false), PATIENCE);
    return () => window.clearTimeout(patience);
  }, [open, rolling, start]);

  /* --- La conduite du film, une fois lancé ------------------------------ */

  useEffect(() => {
    if (!rolling) return;

    const toSecond = window.setTimeout(() => setSecond(true), PREROLL * 1000);
    const toCut = window.setTimeout(() => setCutDue(true), CUT * 1000);
    // Filet : si le second plan ne vient jamais, le rideau se lève quand même.
    const giveUp = window.setTimeout(close, (END + 3) * 1000);

    return () => {
      window.clearTimeout(toSecond);
      window.clearTimeout(toCut);
      window.clearTimeout(giveUp);
    };
  }, [rolling, close]);

  /* --- Le fondu attend que le second plan tourne vraiment --------------
     Sur un réseau lent, il peut lui manquer une demi-seconde : mieux vaut
     prolonger le premier plan que fondre vers une image arrêtée.
     --------------------------------------------------------------------- */

  useEffect(() => {
    if (!cutDue || !secondPlaying || cutDone.current) return;
    cutDone.current = true;
    setShot(1);
    setGlow(true);
    // Volontairement sans nettoyage : ces deux minuteries doivent survivre
    // au rendu que provoque le changement de plan.
    window.setTimeout(() => setGlow(false), DISSOLVE * 1000);
    window.setTimeout(close, (END - CUT) * 1000);
  }, [cutDue, secondPlaying, close]);

  /* --- Le second plan se met en route en coulisse ----------------------- */

  useEffect(() => {
    if (!second) return;
    const v = videos.current[1];
    if (!v) return;
    prerolled.current = true;
    if (canFade.current) {
      v.volume = 0; // il entrera par le fondu
      v.muted = videos.current[0]?.muted ?? true;
    } else {
      v.muted = true; // le premier plan garde le son
    }
    void v.play().catch(() => {
      // Refusé : on le relance muet, l'image compte plus que le son
      v.muted = true;
      void v.play().catch(() => {});
    });
  }, [second]);

  /* --- Le son suit l'image, et bascule à la même allure ----------------- */

  useEffect(() => {
    if (!rolling || !canFade.current) return;

    const [a, b] = videos.current;
    const target = shot === 0 ? a : b;
    const other = shot === 0 ? b : a;
    if (!target) return;

    const t0 = performance.now();
    const from = { t: target.volume, o: other?.volume ?? 0 };
    let frame = 0;

    const ramp = () => {
      const k = Math.min((performance.now() - t0) / (DISSOLVE * 1000), 1);
      target.volume = from.t + (1 - from.t) * k;
      if (other) other.volume = from.o * (1 - k);
      if (k < 1) frame = requestAnimationFrame(ramp);
      else if (other && shot === 1) other.pause();
    };
    frame = requestAnimationFrame(ramp);
    return () => cancelAnimationFrame(frame);
  }, [shot, rolling]);

  /* --- Échapper, et bloquer le défilement ------------------------------- */

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      // Échap coupe court ; sinon la touche fait ce que ferait le clic :
      // elle lance le film, ou le quitte s'il est déjà lancé.
      if (e.key === "Escape") close();
      else if (!rolling) start(true);
      else close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, rolling, close, start]);

  if (!onHome) return null;

  const name = locale === "ar" ? site.nameAr : site.name;
  const units = locale === "ar" ? name.split(" ") : Array.from(name);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="intro"
          exit={{ opacity: 0, scale: 1.18 }}
          transition={{
            opacity: { duration: 0.75, ease: [0.4, 0, 1, 1] },
            scale: { duration: 1.25, ease: [0.16, 1, 0.3, 1] },
          }}
          onClick={() => (rolling ? close() : start(true))}
          role="dialog"
          aria-label={t("title")}
          className="fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-night"
        >
          {/* ============================================================ */}
          {/*  Le feu — il ne paraît qu'une fois le film lancé              */}
          {/* ============================================================ */}
          {SHOTS.map((plan, i) => (
            <motion.div
              key={plan.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: rolling && i === shot ? 1 : 0 }}
              transition={{
                duration: i === 0 ? 1.2 : DISSOLVE,
                ease: "easeInOut",
              }}
              className="absolute inset-0"
            >
              {/*
                Les plans sont verticaux, l'écran ne l'est pas. On remplit
                le cadre plutôt que d'y loger la vidéo entière : mieux vaut
                perdre le haut et le bas que laisser des bords apparents.
              */}
              <video
                ref={(el) => {
                  videos.current[i] = el;
                }}
                muted
                playsInline
                preload="auto"
                onPlaying={
                  i === 1
                    ? () => prerolled.current && setSecondPlaying(true)
                    : undefined
                }
                className="absolute inset-0 h-full w-full object-cover"
              >
                {plan.phone && <source src={plan.phone} media={PHONE} />}
                <source src={plan.src} />
              </video>
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

          {/* La braise du passage : elle lie les deux plans */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: glow ? 0.42 : 0 }}
            transition={{ duration: DISSOLVE * 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,color-mix(in_oklab,var(--color-gold)_55%,transparent),transparent_70%)]"
          />

          {/* ============================================================ */}
          {/*  Le titre — du carton jusqu'à la fin du film                  */}
          {/* ============================================================ */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.55, rotate: -22 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 1.3,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Signature className="h-[clamp(150px,26vh,230px)] w-auto drop-shadow-[0_0_30px_rgba(230,184,100,0.55)]" />
            </motion.div>

            <h1 className="mt-6 font-display text-[clamp(2.3rem,8.5vw,6rem)] font-light leading-[1.02] tracking-[0.06em] text-ivory">
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
                      delay: 0.6 + i * 0.07,
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
                delay: 1.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 h-px w-56 bg-gradient-to-r from-transparent via-gold to-transparent"
              aria-hidden
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 2 }}
              className="eyebrow mt-6 text-gold/80"
            >
              {t("motto")}
            </motion.p>
          </div>

          {/* ============================================================ */}
          {/*  L'invite — elle ne vit que le temps du carton                */}
          {/* ============================================================ */}
          <AnimatePresence>
            {!rolling && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.8, delay: 2.6 }}
                className="absolute inset-x-0 bottom-[11vh] flex flex-col items-center gap-4"
              >
                <motion.span
                  animate={{ opacity: [0.45, 1, 0.45] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-[0.72rem] font-medium uppercase tracking-[0.3em] text-gold"
                >
                  {t("enter")}
                </motion.span>
                <motion.span
                  aria-hidden
                  animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.3, 0.9, 0.3] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="block h-px w-24 bg-gold"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
