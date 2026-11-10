# Où nous en sommes

Dernière séance : 6 novembre 2026.
Le site est **statique** : `npm run build` écrit le site entier dans `out/`
(pages, images redimensionnées, vidéos), sans serveur. C'est ce dossier que
l'on publie.

Pour **regarder** le site : `npm run build`, puis `npm run voir`
→ http://localhost:3000 (le script affiche aussi l'adresse pour le
téléphone, sur le même Wi-Fi). `npm run voir` sert `out/` comme le fera
Cloudflare : redirections, pages 404, vidéos lues par morceaux.
`npm run dev` sert à **modifier** : il recompile une page à sa première
visite (5 à 8 s), d'où l'impression d'un site lourd. Au téléphone en mode
dev, l'adresse de l'ordinateur doit figurer dans `allowedDevOrigins`
(`next.config.ts`).
Une erreur partout, ou un changement de `globals.css` qui ne s'affiche pas :
arrêter, supprimer `.next/` et `out/`, reconstruire.

**Ce que la construction fait en plus** (`package.json`) :
- `prebuild` → `scripts/variantes-images.mjs` prépare chaque image en
  8 largeurs WebP dans `public/_img/` (hors dépôt, refaites au besoin) ;
  `src/lib/image-loader.ts` y conduit le navigateur.
- `postbuild` → `scripts/apres-construction.mjs` pose les pages 404
  traduites et répare les fichiers de préchargement que Next 16 range mal
  sous Windows.
- `public/index.html` choisit la langue à l'arrivée sur « / » ;
  `public/_redirects` envoie /divers vers /livres (lu par Cloudflare).

Rien n'est en ligne pour l'instant.

---

## À vérifier en reprenant

1. **Le mail** — envoyer un message depuis `/fr/contact` dans un vrai
   navigateur et voir s'il arrive à bahrounhana19@gmail.com (spam compris).
   Jamais confirmé : le navigateur automatisé est bloqué par Web3Forms, et les
   trois formulaires n'ont été testés qu'avec un envoi simulé.
2. **Le téléphone** — parcourir le site sur un vrai téléphone. La fluidité n'a
   été vérifiée qu'en format téléphone dans le navigateur.
3. **Les liens des livres** (page Livres, `/livres`) — les ouvrir à la main : ces
   sites refusent les robots, aucun n'a pu être lu. Seuls *La Maison de
   bambous* (Al Kitab) et *Le Petit Tracteur* (Nouvelle-Aquitaine) ont une
   page d'achat à eux ; les quatre autres livres attendent la leur
   (`books[].buy` dans `src/data/site.ts`).

---

## La prochaine chose à faire

**La vidéo de la page Bijoux** — l'artiste la prépare (dit le 10 novembre) :
elle viendra en fond de l'en-tête de `/bijoux`, comme la jungle de nuit en
tête des expositions et de l'accueil. C'est le dernier contenu attendu ;
après elle, le site est complet et part en ligne.

**Les textes des toiles sont écrits** — les 18 de La Jungle 1 et les 9 de La
Jungle 2. Il reste :

- **Yes, I am beautiful peacock** (La Jungle 1, le paon) — la fiche reçue
  s’arrêtait net ; l’artiste a demandé (10 novembre) que la phrase soit
  achevée ici. C’est fait, dans les trois langues.
- **Arrêté avec l’artiste le 10 novembre** : pas de photos de vernissage pour
  La Jungle 1, pas d’autres médias ni liens de livres que ceux déjà en place,
  pas de tarif affiché pour les cours.
- **Les prix et la disponibilité** — reçus le 10 novembre : toutes les
  toiles ont un prix ou sont vendues (10 vendues sur 18 dans La Jungle 1,
  *Flame of Grace* dans La Jungle 2). Le tigre blanc (images 7 et 15
  d’origine, une seule toile) est à 4 800 TND.
- **Les bijoux** — 73 pièces en 12 collections (`src/data/bijoux.ts`,
  photos `public/images/bijoux/article-NN.jpeg`, NN = numéro de l'artiste ;
  la photo 84 remplace la 50). Tous les prix sont là.
- Les traductions anglaise et arabe sont faites ici : l’artiste donne une
  seule langue.

Puis la **mise en ligne** (Next.js est déjà en 16.4.5 et le site statique) :
le publier sur Cloudflare avec hanabahroun.com, déclarer le domaine dans Web3Forms, puis essayer les trois
formulaires et la vidéo d’ouverture sur iPhone.

Dernière vérification (6 novembre) : 9 pages × 3 langues × ordinateur et
téléphone, sans erreur, sans débordement, sans image cassée.

---

## Ce qui est fait

- **Structure** — six pages, trois langues, bascule RTL pour l'arabe.
- **Ouverture** — carton puis film en deux plans, avec le son. Le carton
  n'est pas une porte à pousser : aucun navigateur n'autorise un son à
  partir seul, mais un son demandé dans le geste du visiteur l'est
  toujours. Voir l'en-tête de `src/components/Intro.tsx`.
- **Marque** — le monogramme HB, relevé de la signature des toiles, en
  nervure d'une plume de phénix. Trois états selon la taille, et l'onglet
  porte les lettres seules.
- **Les toiles** — 18 pour La Jungle 1 (le tigre blanc était en double), 9 pour La Jungle 2, plus les 19
  photographies de vernissage.
- **Aucun recadrage** — chaque œuvre garde sa proportion, partout.
- **Le mur du musée** — dans chaque exposition, les toiles sont accrochées
  sur un même mur que l’on longe en descendant dans la page
  (`src/components/MuseumWall.tsx`). Leur taille suit leurs dimensions
  réelles ; un spot les éclaire, un cartel les nomme, un clic ouvre la fiche.
  Deux flèches amènent la toile d’avant ou d’après au centre.
- **La vitrine des bijoux** — chaque collection a sa rangée, le bijou de
  face sous un spot, les voisins dans la pénombre ; on avance aux flèches ou
  d'un glissé du doigt, la page descend librement d'une collection à
  l'autre (`src/components/JewelStage.tsx`).
- **Pages d'exposition** — dans l'ordre : le texte (emplacement réservé
  tant qu'il n'est pas écrit), le film YouTube, puis le vernissage une
  photo à la fois, flèches à gauche et à droite. La Jungle 1 n'a pas
  encore de photos de vernissage.
- **Fond d'accueil** — la jungle de nuit en HD (`animaux-hd.jpeg`) ; les
  écrans en hauteur reçoivent la version peinte en hauteur
  (`animaux-telephone.jpeg`), via `portrait` dans `heroPlates`.

---

## Ce qui attend du contenu

| Ce qui manque | Où cela se pose |
| --- | --- |
| Titres, symbolisme, descriptions, dimensions, prix | `src/data/expositions.ts` |
| Le texte de présentation de chaque exposition | fait — fr, en, ar |
| Les photos et textes des bijoux (page Bijoux). « Divers » n’existe plus : `/divers` mène à `/livres` | `src/data/site.ts` → `diversSections` |
| Les vidéos et passages radio | `src/data/expositions.ts` → `media` |
| Le tarif des cours, s'il doit s'afficher (groupe adultes le jeudi, 14 h – 16 h ; les autres créneaux se conviennent après l'inscription) | `src/data/site.ts` → `courses.practical` |

**Après avoir déposé des images dans `public/images/`, lancer
`npm run images`** : le relevé des proportions se refait, et c'est lui qui
permet d'afficher les œuvres entières.

---

## Panier et commande

Chaque œuvre **disponible** a un bouton « Ajouter au panier » dans sa fiche.
Le panier (`/panier`) envoie la commande par Web3Forms, comme les autres
formulaires, avec une référence (HB-AAMMJJ-1234). Aucun paiement en ligne :
l'artiste rappelle, le règlement se fait en espèces ou par chèque.
Une œuvre vendue : passer son `status` à `sold`, le bouton disparaît.
Les bijoux pourront entrer dans le même panier (`kind: "jewel"`).

---

## À régler avant la mise en ligne

**Le poids des vidéos** — 7,7 Mo ramenés à 6,0 Mo (H.264, CRF 25, démarrage
rapide), sans perte visible (SSIM ≥ 0,987). Aller plus bas abîme l'image :
les originaux sont déjà bien compressés. ffmpeg est installé (winget,
Gyan.FFmpeg). Les originaux restent dans `_sources-originales/`.
Les téléphones reçoivent une version 720p à 30 images/s du second plan
(`phenix-2-mobile.mp4`, 2,2 Mo, SSIM 0,979) : l’original 1080p à 60 images/s,
décodé en même temps que le premier pendant le fondu, les faisait hacher.

**Les formulaires** (contact et cours) envoient par Web3Forms vers
bahrounhana19@gmail.com — clé dans `src/data/site.ts`. Au moment de la mise
en ligne, remplacer `localhost` par la vraie adresse du site dans les
réglages du formulaire, sur web3forms.com.

**`NEXT_PUBLIC_SITE_URL`** doit être renseigné au déploiement : les
métadonnées Open Graph retombent sinon sur `localhost`.

---

## Repères

- Dépôt privé : https://github.com/SarraBahroun/sitepeintre
- Les fichiers d'origine — photos, vidéos, pistes de logo — sont dans
  `_sources-originales/`, hors dépôt.
- Les dessins de marque retenus et écartés sont dans `design/logo/`.
- `npm run lint` et `npm run build` passent sans rien signaler.
