import type { Exposition } from "./types";

/* =============================================================================
   LES EXPOSITIONS
   -----------------------------------------------------------------------------
   Convention de nommage des images, pour s'y retrouver :
     • Jungle I  → tableau-1.jpeg, tableau-2.jpeg …   (les toiles)
     • Jungle II → tableau-a.jpeg, tableau-b.jpeg …   (les toiles)
     • tout fichier sans nom de tableau = photo d'exposition → `vernissage`

   Pour ajouter une œuvre : copier un bloc de `artworks`, changer `id`, `image`
   et les textes. `status` accepte : "available" | "sold" | "reserved"
   | "notForSale". Retirer `price` pour afficher « Prix sur demande ».

   Pour ajouter une vidéo : un bloc dans `media`. `youtubeId` est la partie
   après « v= » dans l'adresse YouTube. `kind` accepte : "video" | "radio"
   | "tv" | "interview".
   ========================================================================== */

/** Le fond de nuit commun aux pages d'exposition. */
const JUNGLE = "/images/oeuvres/animaux.jpeg";

/** Série commune aux deux expositions. */
const jungleSeries = {
  fr: "The Jungle Series",
  en: "The Jungle Series",
  ar: "سلسلة قصة الغابة",
};

const oilOnCanvas = {
  fr: "Huile sur toile",
  en: "Oil on canvas",
  ar: "زيت على قماش",
};

export const expositions: Exposition[] = [
  /* ---------------------------------------------------------------------- */
  /*  LA JUNGLE I — 2023, Ennejma Ezzahra, Sidi Bou Saïd                     */
  /* ---------------------------------------------------------------------- */
  {
    slug: "jungle-1",
    numeral: "I",
    title: {
      fr: "La Jungle 1",
      en: "La Jungle 1",
      ar: "الغابة 1",
    },
    subtitle: {
      fr: "La Jungle nous observe",
      en: "The Jungle Watches Us",
      ar: "الغابة تراقبنا",
    },
    year: "2023",
    dates: { fr: "2023", en: "2023", ar: "2023" },
    venue: {
      fr: "Palais Ennejma Ezzahra",
      en: "Ennejma Ezzahra Palace",
      ar: "قصر النجمة الزهراء",
    },
    city: {
      fr: "Sidi Bou Saïd",
      en: "Sidi Bou Saïd",
      ar: "سيدي بوسعيد",
    },
    statement: {
      // Paragraphe de présentation de l'exposition — à fournir.
      fr: [],
      en: [],
      ar: [],
    },
    cover: "/images/jungle-1/tableau-01.jpeg",
    backdrop: JUNGLE,
    accent: "gold",
    artworks: [
      {
        id: "the-infinite-mystery",
        image: "/images/jungle-1/tableau-01.jpeg",
        title: {
          fr: "The Infinite Mystery",
          en: "The Infinite Mystery",
          ar: "The Infinite Mystery",
        },
        collection: jungleSeries,
        symbolism: {
          fr: "Faisant partie de la collection « The Jungle Series », cette œuvre majeure incarne un symbole suprême de royauté et de mystère. Craint et profondément respecté pour sa puissance naturelle, le tigre s'impose comme le gardien majestueux et énigmatique d'une forêt vierge.",
          en: "Part of « The Jungle Series », this magnificent piece embodies an emblem of ultimate royalty and mystery. Feared, deeply respected for its raw power, and exuding a quiet authority, the tiger stands as the regal and enigmatic guardian of the pristine forest.",
          ar: "ضمن مجموعة «قصة الغابة»، تجسّد هذه اللوحة الاستثنائية رمزاً خالصاً للسيادة والملكية. إنه الحاكم الخفيّ للغابة؛ كائن غامض يُهاب ويُحترم لقوته الهادئة وهيبته الخالدة، ليقف كحارس ملكي يفرض حضوره بوقار وسكينة.",
        },
        description: {
          fr: "« The Infinite Mystery » invite le spectateur au cœur d'un sanctuaire tropical à la fois serein et imposant. Peinte avec une maîtrise remarquable de l'huile sur toile, l'œuvre capture la présence souveraine du tigre au milieu d'un feuillage luxuriant et de dégradés de verts profonds. Avec ses dimensions généreuses et son cadre doré mat raffiné, cette création offre une élégance intemporelle et constitue une pièce maîtresse idéale pour les collections privées et les amateurs d'art.",
          en: "« The Infinite Mystery » invites viewers into a serene yet commanding tropical sanctuary. Masterfully painted in rich oil on canvas, the artwork captures the majestic presence of the tiger amidst dense, atmospheric jungle foliage and deep green gradients. Measuring an impressive 140 × 110 cm, this creation is elegantly housed in a sophisticated matte gold frame, offering a refined touch of timeless elegance and a commanding focal point for private collections and art connoisseurs.",
          ar: "تأخذنا لوحة «The Infinite Mystery» في رحلة بصرية عميقة إلى قلب الطبيعة الاستوائية الكثيفة. أُنجز العمل بألوان زيتية دقيقة ومتقنة تُبرز التفاصيل المعقّدة لفرو النمر وتدرّجات الخضرة الغنية بالعمق والجو الغامض. بحجمها الكبير وحضورها المهيب (140 × 110 سم)، وتكتمل فخامتها بإطار ذهبي مطفي راقٍ، لتشكّل قطعة فنية متحفية تُضفي هيبة وأناقة.",
        },
        technique: oilOnCanvas,
        framing: {
          fr: "Cadre doré mat",
          en: "Matte gold frame",
          ar: "إطار ذهبي مطفي",
        },
        dimensions: "140 × 110 cm",
        status: "available",
        featured: true,
      },
      {
        // l'oiseau de paradis
        id: "oiseau-de-paradis",
        image: "/images/jungle-1/tableau-02.jpeg",
        title: { fr: "", en: "", ar: "" },
        collection: jungleSeries,
        symbolism: { fr: "", en: "", ar: "" },
        description: { fr: "", en: "", ar: "" },
        technique: oilOnCanvas,
        dimensions: "",
        status: "available",
      },
      {
        // le cheval blanc sous le porche
        id: "cheval-blanc",
        image: "/images/jungle-1/tableau-03.jpeg",
        title: { fr: "", en: "", ar: "" },
        collection: jungleSeries,
        symbolism: { fr: "", en: "", ar: "" },
        description: { fr: "", en: "", ar: "" },
        technique: oilOnCanvas,
        dimensions: "",
        status: "available",
      },
      {
        // l'éléphant en sous-bois
        id: "elephant",
        image: "/images/jungle-1/tableau-04.jpeg",
        title: { fr: "", en: "", ar: "" },
        collection: jungleSeries,
        symbolism: { fr: "", en: "", ar: "" },
        description: { fr: "", en: "", ar: "" },
        technique: oilOnCanvas,
        dimensions: "",
        status: "available",
      },
      {
        // le cheval bai
        id: "cheval-bai",
        image: "/images/jungle-1/tableau-05.jpeg",
        title: { fr: "", en: "", ar: "" },
        collection: jungleSeries,
        symbolism: { fr: "", en: "", ar: "" },
        description: { fr: "", en: "", ar: "" },
        technique: oilOnCanvas,
        dimensions: "",
        status: "available",
      },
      {
        // les danseuses-paons
        id: "danseuses-paon",
        image: "/images/jungle-1/tableau-06.jpeg",
        title: { fr: "", en: "", ar: "" },
        collection: jungleSeries,
        symbolism: { fr: "", en: "", ar: "" },
        description: { fr: "", en: "", ar: "" },
        technique: oilOnCanvas,
        dimensions: "",
        status: "available",
      },
      {
        // le tigre blanc sous la neige
        id: "tigre-blanc",
        image: "/images/jungle-1/tableau-07.jpeg",
        title: { fr: "", en: "", ar: "" },
        collection: jungleSeries,
        symbolism: { fr: "", en: "", ar: "" },
        description: { fr: "", en: "", ar: "" },
        technique: oilOnCanvas,
        dimensions: "",
        status: "available",
      },
      {
        // l'ara sur sa branche
        id: "ara",
        image: "/images/jungle-1/tableau-08.jpeg",
        title: { fr: "", en: "", ar: "" },
        collection: jungleSeries,
        symbolism: { fr: "", en: "", ar: "" },
        description: { fr: "", en: "", ar: "" },
        technique: oilOnCanvas,
        dimensions: "",
        status: "available",
      },
      {
        // la coccinelle sur le trèfle
        id: "coccinelle",
        image: "/images/jungle-1/tableau-09.jpeg",
        title: { fr: "", en: "", ar: "" },
        collection: jungleSeries,
        symbolism: { fr: "", en: "", ar: "" },
        description: { fr: "", en: "", ar: "" },
        technique: oilOnCanvas,
        dimensions: "",
        status: "available",
      },
      {
        // le lion de lumière
        id: "lion-de-lumiere",
        image: "/images/jungle-1/tableau-10.jpeg",
        title: { fr: "", en: "", ar: "" },
        collection: jungleSeries,
        symbolism: { fr: "", en: "", ar: "" },
        description: { fr: "", en: "", ar: "" },
        technique: oilOnCanvas,
        dimensions: "",
        status: "available",
      },
      {
        // les colombes
        id: "colombes",
        image: "/images/jungle-1/tableau-11.jpeg",
        title: { fr: "", en: "", ar: "" },
        collection: jungleSeries,
        symbolism: { fr: "", en: "", ar: "" },
        description: { fr: "", en: "", ar: "" },
        technique: oilOnCanvas,
        dimensions: "",
        status: "available",
      },
      {
        // le flamant rose
        id: "flamant-rose",
        image: "/images/jungle-1/tableau-12.jpeg",
        title: { fr: "", en: "", ar: "" },
        collection: jungleSeries,
        symbolism: { fr: "", en: "", ar: "" },
        description: { fr: "", en: "", ar: "" },
        technique: oilOnCanvas,
        dimensions: "",
        status: "available",
      },
      {
        // le poisson doré
        id: "poisson-dore",
        image: "/images/jungle-1/tableau-13.jpeg",
        title: { fr: "", en: "", ar: "" },
        collection: jungleSeries,
        symbolism: { fr: "", en: "", ar: "" },
        description: { fr: "", en: "", ar: "" },
        technique: oilOnCanvas,
        dimensions: "",
        status: "available",
      },
      {
        // le paon et les magnolias
        id: "paon",
        image: "/images/jungle-1/tableau-14.jpeg",
        title: { fr: "", en: "", ar: "" },
        collection: jungleSeries,
        symbolism: { fr: "", en: "", ar: "" },
        description: { fr: "", en: "", ar: "" },
        technique: oilOnCanvas,
        dimensions: "",
        status: "available",
      },
      {
        // le tigre blanc, second état
        id: "tigre-blanc-ii",
        image: "/images/jungle-1/tableau-15.jpeg",
        title: { fr: "", en: "", ar: "" },
        collection: jungleSeries,
        symbolism: { fr: "", en: "", ar: "" },
        description: { fr: "", en: "", ar: "" },
        technique: oilOnCanvas,
        dimensions: "",
        status: "available",
      },
      {
        // le monarque sur la fleur rouge
        id: "monarque",
        image: "/images/jungle-1/tableau-16.jpeg",
        title: { fr: "", en: "", ar: "" },
        collection: jungleSeries,
        symbolism: { fr: "", en: "", ar: "" },
        description: { fr: "", en: "", ar: "" },
        technique: oilOnCanvas,
        dimensions: "",
        status: "available",
      },
      {
        // le léopard sur son rocher
        id: "leopard",
        image: "/images/jungle-1/tableau-17.jpeg",
        title: { fr: "", en: "", ar: "" },
        collection: jungleSeries,
        symbolism: { fr: "", en: "", ar: "" },
        description: { fr: "", en: "", ar: "" },
        technique: oilOnCanvas,
        dimensions: "",
        status: "available",
      },
    ],
    vernissage: [],
    media: [],
    press: [],
  },

  /* ---------------------------------------------------------------------- */
  /*  LA JUNGLE II — 2026, Galerie Jeelen, Nabeul                            */
  /* ---------------------------------------------------------------------- */
  {
    slug: "jungle-2",
    numeral: "II",
    title: {
      fr: "La Jungle 2",
      en: "La Jungle 2",
      ar: "الغابة 2",
    },
    subtitle: {
      fr: "La Jungle nous observe",
      en: "The Jungle Watches Us",
      ar: "الغابة تراقبنا",
    },
    year: "2026",
    dates: { fr: "Mai 2026", en: "May 2026", ar: "ماي 2026" },
    venue: {
      fr: "Galerie Jeelen — Art & Events Home",
      en: "Galerie Jeelen — Art & Events Home",
      ar: "غاليري جيلان — دار الفعاليات والفنون",
    },
    city: { fr: "Nabeul", en: "Nabeul", ar: "نابل" },
    statement: {
      // Paragraphe de présentation de l'exposition — à fournir.
      fr: [],
      en: [],
      ar: [],
    },
    cover: "/images/jungle-2/j2-07.jpeg",
    backdrop: JUNGLE,
    accent: "glow",
    artworks: [
      // Les toiles de La Jungle 2 viendront ici, nommées tableau-a, tableau-b…
      // Modèle à copier :
      // {
      //   id: "tableau-a",
      //   image: "/images/jungle-2/tableau-a.jpeg",
      //   title: { fr: "", en: "", ar: "" },
      //   collection: jungleSeries,
      //   symbolism: { fr: "", en: "", ar: "" },
      //   description: { fr: "", en: "", ar: "" },
      //   technique: oilOnCanvas,
      //   framing: { fr: "", en: "", ar: "" },
      //   dimensions: "",
      //   price: 0,
      //   currency: "TND",
      //   status: "available",
      //   featured: true,
      // },
    ],
    vernissage: [
      "/images/jungle-2/j2-01.jpeg",
      "/images/jungle-2/j2-02.jpeg",
      "/images/jungle-2/j2-03.jpeg",
      "/images/jungle-2/j2-04.jpeg",
      "/images/jungle-2/j2-05.jpeg",
      "/images/jungle-2/j2-06.jpeg",
      "/images/jungle-2/j2-07.jpeg",
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
      //   id: "radio-xxx",
      //   kind: "radio",
      //   title: { fr: "", en: "", ar: "" },
      //   outlet: "",
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
