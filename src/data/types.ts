/* =============================================================================
   Modèle de contenu du site
   -----------------------------------------------------------------------------
   Tout le contenu éditorial vit dans /src/data. Chaque texte est décliné dans
   les trois langues du site. Pour ajouter une œuvre, une vidéo ou une
   exposition, il suffit d'éditer ces fichiers : aucun composant à toucher.
   ========================================================================== */

import type { Locale } from "@/i18n/routing";

/** Un texte dans les trois langues du site. */
export type Localized = Record<Locale, string>;

/** Un texte multi-paragraphes dans les trois langues. */
export type LocalizedRich = Record<Locale, string[]>;

/** Disponibilité d'une œuvre. */
export type ArtworkStatus = "available" | "sold" | "reserved" | "notForSale";

export type Artwork = {
  /** Identifiant stable, sert d'ancre dans l'URL : ?oeuvre=le-tigre */
  id: string;
  /** Chemin depuis /public, ex. "/images/jungle-2/tableau-d.jpeg" */
  image: string;
  /**
   * Dimensions du fichier, relevées à l'installation. Elles donnent à
   * chaque toile sa proportion exacte dans la grille : rien n'est rogné,
   * et la page ne sursaute pas au chargement.
   */
  width?: number;
  height?: number;
  title: Localized;
  /** Série à laquelle l'œuvre appartient, ex. « The Jungle Series ». */
  collection?: Localized;
  /** « À propos de l'œuvre » — laisser vide tant que le texte n'est pas écrit. */
  description: Localized;
  /** « Symbolisme & concept » — paragraphe séparé, affiché en exergue. */
  symbolism?: Localized;
  /** Ex. "Huile sur toile" */
  technique: Localized;
  /** Ex. "Cadre doré mat" */
  framing?: Localized;
  /** Ex. "140 × 110 cm" */
  dimensions?: string;
  year?: string;
  /** Montant numérique. Omettre pour afficher « Prix sur demande ». */
  price?: number;
  currency?: "TND" | "EUR" | "USD";
  status: ArtworkStatus;
  /** Mise en avant sur la page d'accueil. */
  featured?: boolean;
};

export type MediaKind = "video" | "radio" | "tv" | "interview";

export type MediaItem = {
  id: string;
  kind: MediaKind;
  title: Localized;
  /** Nom du média : « Mosaïque FM », « Watania 1 »… */
  outlet?: string;
  /** Identifiant YouTube seul, ex. "dQw4w9WgXcQ" */
  youtubeId?: string;
  /** Lien externe si ce n'est pas une vidéo YouTube (podcast, replay…). */
  url?: string;
  date?: string;
};

export type PressItem = {
  id: string;
  title: Localized;
  outlet: string;
  url?: string;
  date?: string;
};

export type Exposition = {
  slug: string;
  /** Numéro affiché dans le chapitrage : I, II… */
  numeral: string;
  title: Localized;
  subtitle: Localized;
  year: string;
  dates: Localized;
  venue: Localized;
  city: Localized;
  /** Texte de présentation, un élément par paragraphe. */
  statement: LocalizedRich;
  /** Vignette de l'exposition : une toile, pour les cartes et le partage. */
  cover: string;
  /**
   * Fond de l'en-tête de page. La jungle de nuit par défaut, commune aux
   * deux expositions : elle les tient ensemble, là où une toile en
   * particulier n'engagerait qu'elle-même.
   */
  backdrop?: string;
  /** Teinte dominante de l'exposition, pour les halos et les filets. */
  accent: "glow" | "gold" | "iris";
  artworks: Artwork[];
  /** Photographies du vernissage et de l'accrochage. */
  vernissage: string[];
  media: MediaItem[];
  press: PressItem[];
};

/** Rubrique de la page « Divers » : illustration, bijoux, etc. */
export type DiversSection = {
  id: string;
  title: Localized;
  lead: Localized;
  description: LocalizedRich;
  cover?: string;
  images: string[];
  artworks: Artwork[];
};

/* --------------------------------------------------------------------------
   Aides de lecture
   -------------------------------------------------------------------------- */

/** Lit un champ traduit en retombant sur le français si la langue manque. */
export function t(value: Localized | undefined, locale: Locale): string {
  if (!value) return "";
  return value[locale] || value.fr || "";
}

/** Idem pour les textes multi-paragraphes. */
export function tRich(
  value: LocalizedRich | undefined,
  locale: Locale,
): string[] {
  if (!value) return [];
  const paragraphs = value[locale]?.length ? value[locale] : value.fr;
  return (paragraphs ?? []).filter(Boolean);
}

/** Formate un prix selon la langue affichée. */
export function formatPrice(
  price: number | undefined,
  currency: Artwork["currency"] = "TND",
  locale: Locale = "fr",
): string | null {
  if (typeof price !== "number") return null;
  const tag = locale === "ar" ? "ar-TN" : locale === "en" ? "en-GB" : "fr-TN";
  try {
    return new Intl.NumberFormat(tag, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `${price} ${currency}`;
  }
}
