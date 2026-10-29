import type { Localized, LocalizedRich, DiversSection } from "./types";

/* =============================================================================
   IDENTITÉ, BIOGRAPHIE, CONTACT, RUBRIQUE « DIVERS »
   ========================================================================== */

export const site = {
  name: "Hana Bahroun",
  nameAr: "هناء بحرون",
  monogram: "HB",
  email: "",
  phone: "",
  instagram: "https://www.instagram.com/bahroun_hana/",
  instagramHandle: "@bahroun_hana",
  facebook: "",
  city: { fr: "Tunis", en: "Tunis", ar: "تونس" } as Localized,
};

/* --------------------------------------------------------------------------
   L'artiste
   -------------------------------------------------------------------------- */

export const artist = {
  portrait: "/images/artiste/portrait-01.jpeg",
  gallery: [
    "/images/artiste/portrait-02.jpeg",
    "/images/artiste/portrait-03.jpeg",
  ],
  /** Phrase d'accroche posée sous le portrait. */
  statement: {
    fr: "",
    en: "",
    ar: "",
  } as Localized,
  bio: {
    fr: [],
    en: [],
    ar: [],
  } as LocalizedRich,
  approach: {
    fr: [],
    en: [],
    ar: [],
  } as LocalizedRich,
  /** Parcours : expositions, prix, résidences. */
  timeline: [] as {
    year: string;
    label: Localized;
    place?: Localized;
  }[],
};

/* --------------------------------------------------------------------------
   Divers — illustration de livres, bijoux, et le reste
   -------------------------------------------------------------------------- */

export const diversSections: DiversSection[] = [
  {
    id: "illustration",
    title: {
      fr: "Illustration de livres",
      en: "Book illustration",
      ar: "رسوم الكتب",
    },
    lead: { fr: "", en: "", ar: "" },
    description: { fr: [], en: [], ar: [] },
    images: [],
    artworks: [],
  },
  {
    id: "bijoux",
    title: {
      fr: "Création de bijoux",
      en: "Jewellery design",
      ar: "تصميم المجوهرات",
    },
    lead: { fr: "", en: "", ar: "" },
    description: { fr: [], en: [], ar: [] },
    images: [],
    artworks: [],
  },
];
