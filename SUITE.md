# Où nous en sommes

Dernière séance : 2 novembre 2026.
`npm run dev`, puis http://localhost:3000 — la racine redirige vers `/fr`.
Au téléphone, sur le même réseau : http://172.20.10.2:3000/fr — si
l'adresse de l'ordinateur change, la mettre aussi dans `allowedDevOrigins`
(`next.config.ts`), sinon la page s'affiche mais ne réagit plus.
Une erreur 500 partout, ou un changement de `globals.css` qui ne s'affiche
pas : arrêter le serveur,
supprimer `.next/`, relancer.
Rien n'est en ligne pour l'instant.

---

## À vérifier en reprenant

1. **Le mail** — envoyer un message depuis `/fr/contact` dans un vrai
   navigateur et voir s'il arrive à bahrounhana19@gmail.com (spam compris).
   Jamais confirmé : le navigateur automatisé est bloqué par Web3Forms, et les
   trois formulaires n'ont été testés qu'avec un envoi simulé.
2. **Le téléphone** — parcourir le site sur un vrai téléphone. La fluidité n'a
   été vérifiée qu'en format téléphone dans le navigateur.
3. **Les liens des livres** (Divers → Illustration) — les ouvrir à la main : ces
   sites refusent les robots, aucun n'a pu être lu.

---

## La prochaine chose à faire

**Écrire les textes de La Jungle 1.** Les neuf toiles de La Jungle 2 sont
écrites ; sur les dix-sept de La Jungle 1, seize attendent encore leur texte.
Les versions anglaise et arabe de La Jungle 2 sont des traductions à faire
relire par l'artiste. Chaque fiche porte en commentaire le
sujet qu'elle montre — « la coccinelle sur le trèfle », « le phénix d'or » —
de sorte qu'on sait de quelle toile il s'agit sans rouvrir les images.

Pour chacune, dans `src/data/expositions.ts` :

| Champ | Ce qu'il attend |
| --- | --- |
| `title` | le titre, dans les trois langues |
| `symbolism` | ce que l'œuvre dit — affiché en exergue, filet doré |
| `description` | ce que l'on voit, la facture, le format |
| `dimensions` | `"140 × 110 cm"` |
| `price` | un nombre ; retirer la ligne affiche « Prix sur demande » |
| `status` | `available` · `sold` · `reserved` · `notForSale` |

*The Infinite Mystery* (La Jungle 1, le tigre) est déjà écrite : elle sert de
modèle. Le bloc « Détails d'acquisition » s'affiche seul sous chaque œuvre
`available` : il vient de `messages/*.json`, pas de la fiche.

Vient ensuite le **texte de présentation de chaque exposition**
(`statement`) — c'est lui qui raconte avant que l'on regarde.

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
- **Les toiles** — 17 pour La Jungle 1, 9 pour La Jungle 2, plus les 19
  photographies de vernissage.
- **Aucun recadrage** — chaque œuvre garde sa proportion, partout.
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
| Les images de la rubrique Divers : couvertures des livres, Diwaniyat Al-Rajhi, bijoux | `src/data/site.ts` → `diversSections` |
| Les vidéos et passages radio | `src/data/expositions.ts` → `media` |
| Le tarif des cours, s'il doit s'afficher (pas d'horaires fixes : ils se conviennent après l'inscription) | `src/data/site.ts` → `courses.practical` |

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
