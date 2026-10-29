/* =============================================================================
   Le son de l'ouverture
   -----------------------------------------------------------------------------
   Les navigateurs refusent de jouer un son sans geste de l'utilisateur : rien
   ne démarre tout seul, tout passe par un clic ou le bouton de son.

   Si public/audio/phenix.mp3 existe, c'est lui qu'on entend. Sinon on retombe
   sur un accord de synthèse, discret, pour que l'intro ne reste pas muette.
   ========================================================================== */

const FILE = "/audio/phenix.mp3";

const FADE_MS = 420;

let current: HTMLAudioElement | null = null;
let fading: ReturnType<typeof setInterval> | null = null;

function clearFade() {
  if (fading) {
    clearInterval(fading);
    fading = null;
  }
}

/** Monte ou descend le volume par petits pas, pour éviter les à-coups. */
function ramp(audio: HTMLAudioElement, to: number, onDone?: () => void) {
  clearFade();
  const from = audio.volume;
  const started = performance.now();
  fading = setInterval(() => {
    const k = Math.min((performance.now() - started) / FADE_MS, 1);
    audio.volume = Math.max(0, Math.min(1, from + (to - from) * k));
    if (k === 1) {
      clearFade();
      onDone?.();
    }
  }, 25);
}

/** Joue le cri du phénix, ou son substitut. Ne lève jamais. */
export async function playIntroSound(volume = 0.55): Promise<void> {
  stopIntroSound();
  try {
    const audio = new Audio(FILE);
    audio.volume = 0;
    current = audio;
    await audio.play();
    ramp(audio, volume);
  } catch {
    current = null;
    chime(volume);
  }
}

/** Éteint le son en le laissant redescendre, plutôt que de le couper net. */
export function stopIntroSound() {
  const audio = current;
  current = null;
  if (!audio) {
    clearFade();
    return;
  }
  ramp(audio, 0, () => {
    audio.pause();
    audio.currentTime = 0;
  });
}

/** Trois notes qui montent puis s'éteignent — le repli si le fichier manque. */
function chime(volume: number) {
  const Ctx =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctx) return;

  const ctx = new Ctx();
  const now = ctx.currentTime;

  // Do, Sol, Do — un intervalle ouvert, qui ne tire ni vers le gai ni vers le grave
  [523.25, 783.99, 1046.5].forEach((frequency, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = frequency;

    const start = now + i * 0.2;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.linearRampToValueAtTime(volume * 0.16, start + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 2.6);

    osc.connect(gain).connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 2.7);
  });

  window.setTimeout(() => ctx.close().catch(() => {}), 3600);
}
