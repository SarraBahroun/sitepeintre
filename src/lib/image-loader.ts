/* =============================================================================
   Où trouver une image à la bonne taille
   -----------------------------------------------------------------------------
   Le site est statique : les images sont redimensionnées à l'avance par
   scripts/variantes-images.mjs, dans public/_img/. Next demande une largeur
   parmi `deviceSizes` et `imageSizes` (next.config.ts) — les mêmes que le
   script prépare — et on lui rend le fichier correspondant.

   Une image venue d'ailleurs (les vignettes YouTube) passe telle quelle.
   ========================================================================== */

export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (/^https?:\/\//.test(src) || !src.startsWith("/images/")) return src;
  const base = src.slice("/images/".length).replace(/\.[^.]+$/, "");
  return `/_img/${base}-${width}.webp`;
}
