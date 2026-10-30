/* =============================================================================
   Dimensions des images — FICHIER ENGENDRÉ, NE PAS ÉDITER
   -----------------------------------------------------------------------------
   Relevé sur les fichiers de public/images par scripts/mesurer-images.mjs.
   Après avoir ajouté ou remplacé une image :  npm run images
   ========================================================================== */

export const DIMENSIONS: Record<string, readonly [number, number]> = {
  "/images/artiste/portrait-01.jpeg": [815, 1087],
  "/images/artiste/portrait-02.jpeg": [969, 1144],
  "/images/artiste/portrait-03.jpeg": [194, 259],
  "/images/jungle-1/tableau-01.jpeg": [1280, 914],
  "/images/jungle-1/tableau-02.jpeg": [913, 1280],
  "/images/jungle-1/tableau-03.jpeg": [1080, 1280],
  "/images/jungle-1/tableau-04.jpeg": [913, 1280],
  "/images/jungle-1/tableau-05.jpeg": [1280, 913],
  "/images/jungle-1/tableau-06.jpeg": [1063, 1280],
  "/images/jungle-1/tableau-07.jpeg": [913, 1280],
  "/images/jungle-1/tableau-08.jpeg": [913, 1280],
  "/images/jungle-1/tableau-09.jpeg": [1280, 1280],
  "/images/jungle-1/tableau-10.jpeg": [913, 1280],
  "/images/jungle-1/tableau-11.jpeg": [913, 1280],
  "/images/jungle-1/tableau-12.jpeg": [913, 1280],
  "/images/jungle-1/tableau-13.jpeg": [913, 1280],
  "/images/jungle-1/tableau-14.jpeg": [913, 1280],
  "/images/jungle-1/tableau-15.jpeg": [913, 1280],
  "/images/jungle-1/tableau-16.jpeg": [913, 1280],
  "/images/jungle-1/tableau-17.jpeg": [1280, 913],
  "/images/jungle-2/j2-01.jpeg": [1280, 853],
  "/images/jungle-2/j2-03.jpeg": [1280, 853],
  "/images/jungle-2/j2-04.jpeg": [1280, 853],
  "/images/jungle-2/j2-05.jpeg": [1280, 853],
  "/images/jungle-2/j2-06.jpeg": [1280, 853],
  "/images/jungle-2/j2-07.jpeg": [1280, 853],
  "/images/jungle-2/j2-08.jpeg": [1280, 853],
  "/images/jungle-2/j2-09.jpeg": [1280, 853],
  "/images/jungle-2/j2-10.jpeg": [1280, 853],
  "/images/jungle-2/j2-11.jpeg": [1280, 853],
  "/images/jungle-2/j2-12.jpeg": [1280, 853],
  "/images/jungle-2/j2-14.jpeg": [1280, 853],
  "/images/jungle-2/j2-15.jpeg": [1280, 853],
  "/images/jungle-2/j2-16.jpeg": [1280, 853],
  "/images/jungle-2/j2-17.jpeg": [1280, 853],
  "/images/jungle-2/j2-18.jpeg": [1280, 853],
  "/images/jungle-2/j2-19.jpeg": [1280, 853],
  "/images/jungle-2/j2-20.jpeg": [1280, 853],
  "/images/jungle-2/j2-21.jpeg": [1280, 853],
  "/images/jungle-2/tableau-a.jpeg": [1076, 1280],
  "/images/jungle-2/tableau-b.jpeg": [1280, 1097],
  "/images/jungle-2/tableau-c.jpeg": [996, 1280],
  "/images/jungle-2/tableau-d.jpeg": [1267, 1280],
  "/images/jungle-2/tableau-e.jpeg": [1031, 1280],
  "/images/jungle-2/tableau-f.jpeg": [1056, 1280],
  "/images/jungle-2/tableau-g.jpeg": [990, 1236],
  "/images/jungle-2/tableau-h.jpeg": [1269, 1160],
  "/images/jungle-2/tableau-i.jpeg": [966, 1267],
  "/images/oeuvres/animaux.jpeg": [2560, 1429],
  "/images/oeuvres/flamant.jpeg": [460, 660],
  "/images/oeuvres/jungle.jpeg": [2400, 1350],
  "/images/oeuvres/phenix-profil.png": [1200, 721],
  "/images/oeuvres/phenix.png": [1200, 713],
  "/images/oeuvres/phenix/aile-droite.png": [560, 713],
  "/images/oeuvres/phenix/aile-gauche.png": [560, 713],
  "/images/oeuvres/phenix/corps.png": [310, 713],
  "/images/oeuvres/tigre.jpeg": [1198, 852],
};

/**
 * Les dimensions d'une image, ou un format debout par défaut si elle n'a
 * pas encore été mesurée — mieux vaut une proportion plausible qu'un cadre
 * imposé qui rognerait.
 */
export function dimensions(src: string): { width: number; height: number } {
  const mesure = DIMENSIONS[src];
  return mesure
    ? { width: mesure[0], height: mesure[1] }
    : { width: 1200, height: 1500 };
}
