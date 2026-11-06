/* =============================================================================
   Les variantes d'images
   -----------------------------------------------------------------------------
   Le site est publié en fichiers statiques : aucun serveur n'est là pour
   redimensionner une image à la demande. On prépare donc chaque image de
   public/images à l'avance, dans chacune des largeurs que Next peut
   demander, au format WebP, dans public/_img/.

   `src/lib/image-loader.ts` envoie ensuite le navigateur vers la bonne.
   Les deux fichiers lisent la même liste de largeurs (LARGEURS ci-dessous,
   `deviceSizes` + `imageSizes` dans next.config.ts) : les garder d'accord.

   Une variante déjà faite et plus récente que son original n'est pas
   refaite. Lancé avant chaque construction (`prebuild`).
   ========================================================================== */

import { mkdirSync, readdirSync, statSync, existsSync, rmSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import sharp from "sharp";

export const LARGEURS = [320, 480, 640, 828, 1080, 1440, 1920, 2400];
const QUALITE = 82;

const SOURCE = "public/images";
const SORTIE = "public/_img";

function parcourir(dossier) {
  return readdirSync(dossier).flatMap((entree) => {
    const chemin = join(dossier, entree);
    if (statSync(chemin).isDirectory()) return parcourir(chemin);
    return /\.(jpe?g|png|webp)$/i.test(entree) ? [chemin] : [];
  });
}

/** public/images/a/b.jpeg + 640 → public/_img/a/b-640.webp */
function cible(fichier, largeur) {
  const rel = relative(SOURCE, fichier).replace(/\.[^.]+$/, "");
  return join(SORTIE, `${rel}-${largeur}.webp`);
}

const fichiers = parcourir(SOURCE);
const attendues = new Set();
let faites = 0;

for (const fichier of fichiers) {
  const date = statSync(fichier).mtimeMs;
  for (const largeur of LARGEURS) {
    const sortie = cible(fichier, largeur);
    attendues.add(sortie);
    if (existsSync(sortie) && statSync(sortie).mtimeMs >= date) continue;
    mkdirSync(dirname(sortie), { recursive: true });
    // Jamais agrandie : au-delà de sa taille, l'image reste à sa taille.
    await sharp(fichier)
      .rotate()
      .resize({ width: largeur, withoutEnlargement: true })
      .webp({ quality: QUALITE })
      .toFile(sortie);
    faites++;
  }
}

// Les variantes d'images disparues s'en vont avec elles.
let retirees = 0;
if (existsSync(SORTIE)) {
  for (const fichier of parcourir(SORTIE)) {
    if (!attendues.has(fichier.split(sep).join(sep))) {
      rmSync(fichier);
      retirees++;
    }
  }
}

console.log(
  `${fichiers.length} images · ${faites} variante(s) préparée(s)` +
    (retirees ? ` · ${retirees} retirée(s)` : ""),
);
