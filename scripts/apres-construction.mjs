/* =============================================================================
   Après la construction
   -----------------------------------------------------------------------------
   1. Les fichiers de préchargement de Next, réparés sous Windows.
      En passant d'une page à l'autre, le navigateur précharge la suivante
      par petits fichiers nommés à plat :
        fr/livres/__next.$d$locale.livres.__PAGE__.txt
      Sous Windows, Next 16 les range par erreur dans des dossiers
        fr/livres/__next.$d$locale/livres/__PAGE__.txt
      (il remplace les « / » du chemin par des points, pas les « \ »).
      On les remet à plat. Sur une machine Linux il n'y a rien à faire.

   2. La page « introuvable » de chaque langue devient le 404.html de son
      dossier (out/fr/404.html…), et la française celui de la racine.
      Cloudflare sert le 404.html le plus proche de l'adresse demandée.
   ========================================================================== */

import {
  copyFileSync,
  existsSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
} from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = "out";

/* --- 1. Les préchargements à plat ----------------------------------------- */

function fichiersSous(dossier) {
  return readdirSync(dossier).flatMap((nom) => {
    const chemin = join(dossier, nom);
    return statSync(chemin).isDirectory() ? fichiersSous(chemin) : [chemin];
  });
}

let remis = 0;
function reparer(dossier) {
  for (const nom of readdirSync(dossier)) {
    const chemin = join(dossier, nom);
    if (!statSync(chemin).isDirectory()) continue;
    if (nom.startsWith("__next.")) {
      for (const fichier of fichiersSous(chemin)) {
        const aplat = `${nom}.${relative(chemin, fichier).split(sep).join(".")}`;
        renameSync(fichier, join(dossier, aplat));
        remis++;
      }
      rmSync(chemin, { recursive: true });
    } else {
      reparer(chemin);
    }
  }
}
reparer(OUT);
if (remis) console.log(`${remis} fichier(s) de préchargement remis à plat`);

/* --- 2. Les pages 404 ------------------------------------------------------ */

for (const langue of ["fr", "en", "ar"]) {
  const page = join(OUT, langue, "introuvable.html");
  if (!existsSync(page)) {
    console.error(`Manque ${page} : la page introuvable n'a pas été construite.`);
    process.exit(1);
  }
  copyFileSync(page, join(OUT, langue, "404.html"));
}
copyFileSync(join(OUT, "fr", "introuvable.html"), join(OUT, "404.html"));
console.log("404.html posé à la racine et dans chaque langue");
