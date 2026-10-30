# Où nous en sommes

Dernière séance : 29 octobre 2026.
`npm run dev`, puis http://localhost:3000 — la racine redirige vers `/fr`.
Rien n'est en ligne pour l'instant.

---

## La prochaine chose à faire

**Écrire les textes des œuvres.** Les vingt-six toiles sont en place et
s'affichent ; il leur manque la parole. Chaque fiche porte en commentaire le
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
modèle.

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

---

## Ce qui attend du contenu

| Ce qui manque | Où cela se pose |
| --- | --- |
| Titres, symbolisme, descriptions, dimensions, prix | `src/data/expositions.ts` |
| Le texte de présentation de chaque exposition | `src/data/expositions.ts` → `statement` |
| Les images de la rubrique Divers | `src/data/site.ts` → `diversSections` |
| Les vidéos et passages radio | `src/data/expositions.ts` → `media` |
| Horaires et tarif des cours | `src/data/site.ts` → `courses.practical` |

**Après avoir déposé des images dans `public/images/`, lancer
`npm run images`** : le relevé des proportions se refait, et c'est lui qui
permet d'afficher les œuvres entières.

---

## À régler avant la mise en ligne

**Le poids des vidéos.** `public/videos/` pèse 7,7 Mo. Sur une connexion
lente, l'ouverture se fera attendre. Avec ffmpeg on descend autour de 2 Mo
sans perte visible ; ffmpeg n'est pas installé sur cette machine.

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
