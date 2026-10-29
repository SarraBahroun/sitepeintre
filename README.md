# Hana Bahroun — site d'artiste peintre

Site vitrine trilingue (français · anglais · arabe) construit avec Next.js 16,
Tailwind v4 et Framer Motion.

```bash
npm run dev     # http://localhost:3000  → redirige vers /fr
npm run build   # vérifie que tout compile et pré-génère les pages
npm run images  # relève les dimensions après avoir ajouté des images
```

> **Après avoir déposé une image dans `public/images/`, lancer `npm run images`.**
> Les proportions de chaque fichier sont relevées là, et c'est ce qui permet
> d'afficher les œuvres entières au lieu de les recadrer.

---

## Où se trouve quoi

| Je veux…                                  | Fichier à ouvrir                          |
| ----------------------------------------- | ----------------------------------------- |
| Ajouter une œuvre, un prix, un « vendu »  | `src/data/expositions.ts`                 |
| Ajouter une vidéo YouTube / un passage radio | `src/data/expositions.ts` → `media`    |
| Écrire la biographie de l'artiste         | `src/data/site.ts` → `artist`             |
| Remplir la page « Divers »                | `src/data/site.ts` → `diversSections`     |
| E-mail, téléphone, réseaux                | `src/data/site.ts` → `site`               |
| Traduire un libellé d'interface           | `messages/fr.json` · `en.json` · `ar.json` |
| Changer les couleurs ou les polices       | `src/app/globals.css` (bloc `@theme`)     |
| Ajouter une photo                         | `public/images/…`                         |
| Modifier les cours de peinture            | `src/data/site.ts` → `courses`            |

Les photos d'origine, non redimensionnées, restent dans `_sources-originales/`
(ignoré par git).

---

## Nommer les images

Pour s'y retrouver entre les toiles et les photos de vernissage :

| Dossier                  | Fichier                        | Devient            |
| ------------------------ | ------------------------------ | ------------------ |
| `public/images/jungle-1/` | `tableau-1.jpeg`, `tableau-2…` | une œuvre          |
| `public/images/jungle-2/` | `tableau-a.jpeg`, `tableau-b…` | une œuvre          |
| les deux                 | tout autre nom                 | photo d'exposition |

Les photos d'exposition vont dans `vernissage`, les toiles dans `artworks`.

---

## Ajouter une œuvre

Dans `src/data/expositions.ts`, à l'intérieur du tableau `artworks` de
l'exposition concernée :

```ts
{
  id: "le-tigre",                        // identifiant unique, en minuscules
  image: "/images/jungle-2/j2-12.jpeg",  // chemin depuis public/
  title: { fr: "Le Tigre", en: "The Tiger", ar: "النمر" },
  description: { fr: "…", en: "…", ar: "…" },
  technique: {
    fr: "Acrylique sur toile",
    en: "Acrylic on canvas",
    ar: "أكريليك على قماش",
  },
  dimensions: "100 × 80 cm",
  year: "2026",
  price: 2400,          // retirer cette ligne → « Prix sur demande »
  currency: "TND",      // "TND" | "EUR" | "USD"
  status: "available",  // "available" | "sold" | "reserved" | "notForSale"
  featured: true,       // apparaît aussi en page d'accueil
}
```

`status` pilote la pastille de couleur sur la vignette et dans la fiche :

| Valeur        | Affichage           |
| ------------- | ------------------- |
| `available`   | Disponible (vert)   |
| `sold`        | Vendue (orange)     |
| `reserved`    | Réservée (or)       |
| `notForSale`  | Collection privée   |

Un champ laissé vide (`""`) n'est simplement pas affiché — le site reste propre
tant que les textes ne sont pas écrits.

---

## Ajouter une vidéo ou un passage radio

Toujours dans `src/data/expositions.ts`, tableau `media` :

```ts
{
  id: "radio-mosaique",
  kind: "radio",            // "video" | "radio" | "tv" | "interview"
  title: { fr: "…", en: "…", ar: "…" },
  outlet: "Mosaïque FM",
  youtubeId: "dQw4w9WgXcQ", // la partie après « v= » dans l'adresse YouTube
  date: "2026-05",
}
```

Pour un lien qui n'est pas une vidéo YouTube (podcast, replay), remplacer
`youtubeId` par `url: "https://…"`.

La vignette YouTube reste une image tant qu'on ne clique pas : aucun script tiers
n'est chargé à l'ouverture de la page.

---

## Ajouter une exposition

Copier un bloc complet du tableau `expositions`, changer `slug`, `numeral`,
`title`. La page `/[langue]/expositions/<slug>`, les liens du menu et le
chaînage « exposition suivante » se mettent à jour tout seuls.

Le menu de navigation est listé dans `src/components/Nav.tsx` (tableau `links`)
— c'est le seul endroit à compléter à la main.

---

## Les cours de peinture

Tout se règle dans `src/data/site.ts` → `courses` : les formules proposées,
le lieu, les horaires et le tarif. Mettre `enabled: false` retire la page et
son entrée de menu d'un seul coup.

Le formulaire d'inscription ouvre pour l'instant la messagerie du visiteur avec
une demande préremplie adressée à l'artiste. Pour recevoir les demandes
directement sur le site, il faudra brancher un service d'envoi (Resend,
Formspree…) — à faire au moment de la mise en ligne.

---

## Les trois langues

Le préfixe de langue est toujours présent dans l'adresse : `/fr/…`, `/en/…`,
`/ar/…`. L'arabe bascule automatiquement en écriture de droite à gauche et
change de police (Amiri / Cairo au lieu de Cormorant / Inter).

Le sélecteur de langue conserve la page en cours.
