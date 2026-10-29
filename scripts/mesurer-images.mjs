/* =============================================================================
   Relevé des dimensions
   -----------------------------------------------------------------------------
   Parcourt public/images et écrit src/data/dimensions.ts.

   Next veut connaître la taille d'une image avant de l'afficher. Sans elle,
   il faut lui imposer un cadre — et le cadre rogne. Avec elle, chaque
   photographie garde sa forme et la page ne sursaute pas au chargement.

   À relancer après avoir ajouté des images :  npm run images
   ========================================================================== */

import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, posix } from "node:path";
import sharp from "sharp";

const RACINE = "public/images";
const SORTIE = "src/data/dimensions.ts";

function parcourir(dossier) {
  const trouves = [];
  for (const entree of readdirSync(dossier)) {
    const chemin = join(dossier, entree);
    if (statSync(chemin).isDirectory()) trouves.push(...parcourir(chemin));
    else if (/\.(jpe?g|png|webp|avif)$/i.test(entree)) trouves.push(chemin);
  }
  return trouves;
}

const fichiers = parcourir(RACINE).sort();
const lignes = [];

for (const fichier of fichiers) {
  const { width, height } = await sharp(fichier).metadata();
  const url = "/" + posix.join(...fichier.split(/[\\/]/).slice(1));
  lignes.push(`  "${url}": [${width}, ${height}],`);
}

writeFileSync(
  SORTIE,
  `/* =============================================================================
   Dimensions des images — FICHIER ENGENDRÉ, NE PAS ÉDITER
   -----------------------------------------------------------------------------
   Relevé sur les fichiers de public/images par scripts/mesurer-images.mjs.
   Après avoir ajouté ou remplacé une image :  npm run images
   ========================================================================== */

export const DIMENSIONS: Record<string, readonly [number, number]> = {
${lignes.join("\n")}
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
`,
  "utf8",
);

console.log(`${fichiers.length} images mesurées → ${SORTIE}`);
