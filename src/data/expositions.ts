import type { Exposition } from "./types";

/* =============================================================================
   LES EXPOSITIONS
   -----------------------------------------------------------------------------
   Pour ajouter une œuvre : copiez un bloc de `artworks`, changez `id`, `image`
   et les textes. `status` accepte : "available" | "sold" | "reserved"
   | "notForSale". Retirez `price` pour afficher « Prix sur demande ».

   Pour ajouter une vidéo : un bloc dans `media`. `youtubeId` est la partie
   après « v= » dans l'adresse YouTube. `kind` accepte : "video" | "radio"
   | "tv" | "interview".
   ========================================================================== */

export const expositions: Exposition[] = [
  /* ---------------------------------------------------------------------- */
  /*  LA JUNGLE I                                                            */
  /* ---------------------------------------------------------------------- */
  {
    slug: "jungle-1",
    numeral: "I",
    title: {
      fr: "La Jungle I",
      en: "The Jungle I",
      ar: "الأدغال I",
    },
    subtitle: {
      fr: "Première incursion",
      en: "First incursion",
      ar: "التوغّل الأول",
    },
    year: "",
    dates: { fr: "", en: "", ar: "" },
    venue: { fr: "", en: "", ar: "" },
    city: { fr: "Tunis", en: "Tunis", ar: "تونس" },
    statement: {
      fr: [],
      en: [],
      ar: [],
    },
    cover: "",
    accent: "gold",
    artworks: [
      // Exemple de fiche — dupliquez ce bloc pour chaque toile.
      // {
      //   id: "exemple",
      //   image: "/images/jungle-1/j1-01.jpeg",
      //   title: { fr: "Titre", en: "Title", ar: "العنوان" },
      //   description: { fr: "", en: "", ar: "" },
      //   technique: {
      //     fr: "Acrylique sur toile",
      //     en: "Acrylic on canvas",
      //     ar: "أكريليك على قماش",
      //   },
      //   dimensions: "100 × 80 cm",
      //   year: "2023",
      //   price: 2400,
      //   currency: "TND",
      //   status: "available",
      //   featured: true,
      // },
    ],
    vernissage: [],
    media: [],
    press: [],
  },

  /* ---------------------------------------------------------------------- */
  /*  LA JUNGLE II                                                           */
  /* ---------------------------------------------------------------------- */
  {
    slug: "jungle-2",
    numeral: "II",
    title: {
      fr: "La Jungle II",
      en: "The Jungle II",
      ar: "الأدغال II",
    },
    subtitle: {
      fr: "La lumière sous les feuilles",
      en: "The light beneath the leaves",
      ar: "الضوء تحت الأوراق",
    },
    year: "2026",
    dates: { fr: "Mai 2026", en: "May 2026", ar: "ماي 2026" },
    venue: {
      fr: "Jeelen — Art & Events Home",
      en: "Jeelen — Art & Events Home",
      ar: "جيلان — دار الفعاليات والفنون",
    },
    city: { fr: "Tunis", en: "Tunis", ar: "تونس" },
    statement: {
      fr: [],
      en: [],
      ar: [],
    },
    cover: "/images/jungle-2/j2-07.jpeg",
    accent: "glow",
    artworks: [
      {
        id: "fleur-de-lumiere",
        image: "/images/jungle-2/j2-07.jpeg",
        title: { fr: "", en: "", ar: "" },
        description: { fr: "", en: "", ar: "" },
        technique: {
          fr: "Acrylique sur toile",
          en: "Acrylic on canvas",
          ar: "أكريليك على قماش",
        },
        dimensions: "",
        year: "2026",
        status: "available",
        featured: true,
      },
      {
        id: "le-chat",
        image: "/images/jungle-2/j2-05.jpeg",
        title: { fr: "", en: "", ar: "" },
        description: { fr: "", en: "", ar: "" },
        technique: {
          fr: "Acrylique sur toile",
          en: "Acrylic on canvas",
          ar: "أكريليك على قماش",
        },
        dimensions: "",
        year: "2026",
        status: "available",
        featured: true,
      },
      {
        id: "accrochage-figuratif",
        image: "/images/jungle-2/j2-04.jpeg",
        title: { fr: "", en: "", ar: "" },
        description: { fr: "", en: "", ar: "" },
        technique: {
          fr: "Acrylique sur toile",
          en: "Acrylic on canvas",
          ar: "أكريليك على قماش",
        },
        dimensions: "",
        year: "2026",
        status: "available",
        featured: true,
      },
      {
        id: "mur-des-felins",
        image: "/images/jungle-2/j2-06.jpeg",
        title: { fr: "", en: "", ar: "" },
        description: { fr: "", en: "", ar: "" },
        technique: {
          fr: "Acrylique sur toile",
          en: "Acrylic on canvas",
          ar: "أكريليك على قماش",
        },
        dimensions: "",
        year: "2026",
        status: "available",
      },
    ],
    vernissage: [
      "/images/jungle-2/j2-01.jpeg",
      "/images/jungle-2/j2-02.jpeg",
      "/images/jungle-2/j2-03.jpeg",
      "/images/jungle-2/j2-08.jpeg",
      "/images/jungle-2/j2-09.jpeg",
      "/images/jungle-2/j2-10.jpeg",
      "/images/jungle-2/j2-11.jpeg",
      "/images/jungle-2/j2-12.jpeg",
      "/images/jungle-2/j2-13.jpeg",
      "/images/jungle-2/j2-14.jpeg",
      "/images/jungle-2/j2-15.jpeg",
      "/images/jungle-2/j2-16.jpeg",
      "/images/jungle-2/j2-17.jpeg",
      "/images/jungle-2/j2-18.jpeg",
      "/images/jungle-2/j2-19.jpeg",
      "/images/jungle-2/j2-20.jpeg",
      "/images/jungle-2/j2-21.jpeg",
    ],
    media: [
      // {
      //   id: "radio-mosaique",
      //   kind: "radio",
      //   title: { fr: "", en: "", ar: "" },
      //   outlet: "Mosaïque FM",
      //   youtubeId: "",
      //   date: "2026-05",
      // },
    ],
    press: [],
  },
];

export const expositionSlugs = expositions.map((e) => e.slug);

export function getExposition(slug: string): Exposition | undefined {
  return expositions.find((e) => e.slug === slug);
}

/** Exposition suivante dans le chapitrage, pour la navigation de bas de page. */
export function getSiblingExpositions(slug: string) {
  const index = expositions.findIndex((e) => e.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: index > 0 ? expositions[index - 1] : undefined,
    next: index < expositions.length - 1 ? expositions[index + 1] : undefined,
  };
}

/** Œuvres mises en avant sur la page d'accueil. */
export function getFeaturedArtworks() {
  return expositions.flatMap((expo) =>
    expo.artworks
      .filter((a) => a.featured)
      .map((artwork) => ({ artwork, expo })),
  );
}
