# Où nous en sommes

Dernière séance : 29 octobre 2026.
Le site tourne en local — `npm run dev`, puis http://localhost:3000 (redirige
vers `/fr`). Rien n'est en ligne pour l'instant.

---

## La prochaine chose à faire

**Poser le logo retenu.** La variante **3** a été choisie : le monogramme HB
de l'artiste tient lieu de nervure centrale à une plume de phénix, la hampe
reste visible derrière, et la signature « Bahroun Hana » court dessous.

Le dessin est prêt : `design/logo/plume-3.svg`.
Il reste à remplacer le `Monogram` de `src/components/Logo.tsx`, qui porte
encore l'ancienne marque — des initiales dans une feuille, que l'artiste
n'aime pas.

Attention en le posant :

- le logo sert en petit (barre de navigation, favicon) autant qu'en grand
  (ouverture, pied de page). La signature sous la plume devient illisible
  en dessous de ~40 px : prévoir une variante sans elle pour les petites
  tailles ;
- les couleurs viennent des variables du thème, pas de valeurs en dur, pour
  que la marque suive la palette ;
- l'ouverture (`src/components/Intro.tsx`) et le pied de page utilisent tous
  deux `Monogram` : les deux suivront d'eux-mêmes.

Les autres pistes écartées restent dans `design/logo/` — la signature seule,
l'œil de la jungle, la plume nue, le nom sans symbole — avec les planches de
comparaison en JPEG.

---

## Ce qui attend du contenu

Tout le contenu éditorial vit dans `src/data/`. Les emplacements vides
s'affichent proprement, le site ne casse pas. Voir `README.md` pour la
marche à suivre.

| Ce qui manque | Où cela se pose |
| --- | --- |
| Les toiles de La Jungle 2 (`tableau-a.jpeg`, `tableau-b.jpeg`…) | `public/images/jungle-2/` puis `src/data/expositions.ts` |
| Les autres toiles de La Jungle (`tableau-2.jpeg`…) | `public/images/jungle-1/` puis `src/data/expositions.ts` |
| Le texte de présentation de chaque exposition | `src/data/expositions.ts` → `statement` |
| Le prix de *The Infinite Mystery* | `src/data/expositions.ts` → `price` |
| Les images de la rubrique Divers | `src/data/site.ts` → `diversSections` |
| Les vidéos et passages radio | `src/data/expositions.ts` → `media` |
| Le lien Saatchi Art | `src/data/site.ts` → `site.saatchi` |
| Horaires et tarif des cours | `src/data/site.ts` → `courses.practical` |

---

## À régler avant la mise en ligne

**Le poids des vidéos.** `public/videos/` pèse 7,7 Mo. Sur une connexion
lente, l'ouverture se fera attendre. Avec ffmpeg on descend autour de 2 Mo
sans perte visible ; ffmpeg n'est pas installé sur cette machine.

**Le formulaire des cours** ouvre la messagerie du visiteur avec une demande
préremplie. Pour recevoir les demandes sur le site, il faudra brancher un
service d'envoi — Resend, Formspree ou équivalent.

**`NEXT_PUBLIC_SITE_URL`** doit être renseigné au déploiement : les
métadonnées Open Graph retombent sinon sur `localhost`.

---

## Repères

- Dépôt privé : https://github.com/SarraBahroun/sitepeintre
- Les photos d'origine sont dans `_sources-originales/` (hors dépôt).
- `npm run lint` et `npm run build` passent sans rien signaler.
