import type {
  Localized,
  LocalizedRich,
  DiversSection,
  PressItem,
} from "./types";

/* =============================================================================
   IDENTITÉ, BIOGRAPHIE, CONTACT, RUBRIQUE « DIVERS », COURS DE PEINTURE
   ========================================================================== */

export const site = {
  name: "Hana Bahroun",
  nameAr: "هناء بحرون",
  monogram: "HB",
  email: "bahrounhana19@gmail.com",
  /**
   * Clé Web3Forms : les formulaires envoient vers `email` ci-dessus.
   * Publique par nature — elle ne sait écrire qu'à cette adresse.
   */
  web3formsKey: "60eae060-d3ba-46c7-bd64-9aceb1d2e5fb",
  phone: "+216 56 182 269",
  phoneDisplay: "56 182 269",
  instagram: "https://www.instagram.com/bahroun_hana/",
  instagramHandle: "@bahroun_hana",
  facebook: "https://www.facebook.com/lavague.bahroun/",
  x: "https://x.com/hanabahrou14554",
  xHandle: "@hanabahrou14554",
  tiktok: "https://www.tiktok.com/@hana.bahroun",
  tiktokHandle: "@hana.bahroun",
  /** Numéro WhatsApp, chiffres seuls, indicatif compris (216 = Tunisie). */
  whatsapp: "21656182269",
  /** Profil sur la plateforme internationale Saatchi Art. */
  saatchi: "https://www.saatchiart.com/hana-bahroun-artist",
  city: { fr: "Nabeul", en: "Nabeul", ar: "نابل" } as Localized,
  country: { fr: "Tunisie", en: "Tunisia", ar: "تونس" } as Localized,
};

/** Ouvre une conversation WhatsApp avec l'artiste, premier mot déjà écrit. */
export function whatsappHref(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/* --------------------------------------------------------------------------
   Les toiles du fond d'accueil
   -----------------------------------------------------------------------------
   Ce sont de vraies peintures, en fondu enchaîné derrière le nom. Pour en
   ajouter une : déposer l'image dans public/images/oeuvres/ et ajouter une
   ligne ici. `position` recadre si le sujet n'est pas au centre
   ("center", "top", "50% 35%"…).
   -------------------------------------------------------------------------- */

export const heroPlates = [
  // La jungle de nuit : lion, tigre, phénix et tout le peuple des arbres.
  {
    src: "/images/oeuvres/animaux-hd.jpeg",
    portrait: "/images/oeuvres/animaux-telephone.jpeg",
    position: "center",
  },
  // Autres fonds possibles, à décommenter pour les faire défiler :
  // { src: "/images/oeuvres/jungle.jpeg", position: "center" },
  // { src: "/images/oeuvres/tigre.jpeg", position: "50% 42%" },
];

/* --------------------------------------------------------------------------
   L'artiste
   -------------------------------------------------------------------------- */

export const artist = {
  portrait: "/images/artiste/portrait-01.jpeg",

  /** Passage télévisé : identifiant YouTube seul, et la chaîne. */
  tv: {
    youtubeId: "0yl7YAAxPoU",
    outlet: "El Wataniya",
  },

  /**
   * Les articles qui lui sont consacrés, du plus récent au plus ancien.
   * `date` au format AAAA-MM-JJ ; le titre arabe est celui de l'article.
   */
  press: [
    {
      id: "egytimes-qui-est-hana-bahroun",
      title: {
        fr: "Qui est Hana Bahroun, l'artiste plasticienne tunisienne ?",
        en: "Who is Hana Bahroun, the Tunisian visual artist?",
        ar: "من هي هناء بحرون الفنانة التشكيلية التونسية؟",
      },
      outlet: "Egy Times",
      url: "https://egytimeseg.com/%d9%85%d9%86-%d9%87%d9%8a-%d9%87%d9%86%d8%a7%d8%a1-%d8%a8%d8%ad%d8%b1%d9%88%d9%86-%d8%a7%d9%84%d9%81%d9%86%d8%a7%d9%86%d8%a9-%d8%a7%d9%84%d8%aa%d8%b4%d9%83%d9%8a%d9%84%d9%8a%d8%a9-%d8%a7%d9%84%d8%aa/",
      date: "2026-10-17",
    },
    {
      id: "bait-al-arab-diwaniya",
      title: {
        fr: "Diwaniyat Al-Rajhi : parution du troisième volume, sous la direction artistique de Hana Bahroun",
        en: "Diwaniyat Al-Rajhi: the third volume is published, with Hana Bahroun as art director",
        ar: "الراجحي يوجّه بإصدار «الجزء الثالث» من كتب الديوانية",
      },
      outlet: "Bait Al Arab",
      url: "https://wbaad.com/index.php?name=News&file=article&sid=29937",
      date: "2026-06-11",
    },
    {
      id: "bait-al-arab-genie",
      title: {
        fr: "Hana Bahroun, un génie artistique tunisien au-delà du temps",
        en: "Hana Bahroun, a Tunisian artistic genius beyond time",
        ar: "هناء بحرون… عبقرية فنية تونسية تخطّت حدود الزمن",
      },
      outlet: "Bait Al Arab",
      url: "https://wbaad.com/index.php?name=News&file=article&sid=29522",
      date: "2026-05-25",
    },
  ] as PressItem[],

  /** Les trois casquettes, affichées en ligne sous le nom. */
  roles: {
    fr: ["Artiste plasticienne tunisienne", "Peintre", "Directrice artistique"],
    en: ["Tunisian Visual Artist", "Painter", "Art Director"],
    ar: ["فنانة تشكيلية تونسية", "رسامة", "مديرة فنية"],
  } as LocalizedRich,

  /** La devise de la série, posée en exergue. */
  motto: {
    fr: "La Jungle nous observe",
    en: "The Jungle Watches Us",
    ar: "الغابة تراقبنا",
  } as Localized,

  /** Phrase d'accroche sous le portrait. */
  statement: {
    fr: "L'art comme exploration de la nature, de la vie et du monde intérieur des êtres vivants.",
    en: "Art as an exploration of nature, life, and the inner worlds of living beings.",
    ar: "الفن رحلة لاستكشاف الطبيعة والحياة والعالم الداخلي للكائنات.",
  } as Localized,

  bio: {
    fr: [
      "Hana Bahroun est une artiste plasticienne tunisienne originaire de Nabeul. Sa démarche artistique explore la matière, la lumière et le symbolisme, en puisant dans la nature son inspiration pour créer des univers visuels où se rencontrent la vie, l'imaginaire et le monde intérieur de l'être humain.",
      "Après l'obtention de son baccalauréat, elle a poursuivi sa formation artistique au Centre Dante Alighieri de Tunis, où elle a étudié le dessin, la peinture, les techniques de la feuille d'or et la restauration du bois. Sa formation s'est également étendue à d'autres disciplines artistiques et artisanales, notamment la céramique, le travail du verre et du cristal, ainsi que la création de bijoux artisanaux. En 2009, elle a obtenu un certificat de compétence artistique, marquant une étape importante de son parcours.",
      "La peinture à l'huile sur toile occupe une place centrale dans son travail. À travers un dialogue entre réalisme et symbolisme, elle explore la couleur, la lumière et la précision du détail afin de créer des univers visuels singuliers.",
      "Parallèlement à la peinture, elle a réalisé des illustrations pour des livres pour enfants et assuré la direction artistique de l'ouvrage Diwaniyat Al-Rajhi Cultural Book. Elle a également développé sa pratique des arts appliqués à travers la création de bijoux artisanaux sous sa marque Chic & Glamour.",
      "Hana Bahroun a présenté deux expositions individuelles en Tunisie : La Jungle en 2023 au palais Ennejma Ezzahra, à Sidi Bou Saïd, et La Jungle 2 en 2026 à la Galerie Jeelen, à Nabeul. Ses œuvres sont également présentées sur la plateforme Saatchi Art.",
      "Elle poursuit le développement de sa vision artistique à travers de nouveaux projets explorant les liens entre la nature et l'humanité. Son site officiel permet aux amateurs d'art et aux collectionneurs de découvrir ses œuvres originales et de la contacter directement pour toute demande d'acquisition.",
    ],
    en: [
      "Hana Bahroun is a Tunisian visual artist from Nabeul whose practice explores material, light, and symbolism, drawing inspiration from nature to create visual worlds where life, imagination, and the human inner experience intersect.",
      "After obtaining her baccalaureate, she pursued artistic training at the Centre Dante Alighieri in Tunis, where she studied drawing, painting, gold-leaf techniques, and wood restoration. Her broader artistic training also encompassed ceramics, glass and crystal work, and handmade jewelry. In 2009, she obtained a Certificate of Artistic Competence, marking an important milestone in her artistic journey.",
      "Oil painting on canvas occupies a central place in her practice. Through a dialogue between realism and symbolism, she explores color, light, and intricate details to create distinctive visual worlds.",
      "Alongside painting, she has illustrated children's books and served as Art Director for the Diwaniyat Al-Rajhi Cultural Book. She has also explored applied arts through the design of handmade jewelry under her brand, Chic & Glamour.",
      "Bahroun has held two solo exhibitions in Tunisia: La Jungle in 2023 at Ennejma Ezzahra Palace in Sidi Bou Saïd, and La Jungle 2 in 2026 at Galerie Jeelen in Nabeul. Her artworks are also featured on Saatchi Art.",
      "She continues to develop her artistic vision through new projects exploring the relationship between nature and humanity. Through her official website, art enthusiasts and collectors can discover her original works and contact her directly regarding acquisitions.",
    ],
    ar: [
      "هناء بحرون فنانة تشكيلية تونسية من مدينة نابل، تجمع في تجربتها بين الرسم والبحث في المادة والضوء والرمزية، مستلهمةً من الطبيعة عوالم بصرية تتقاطع فيها الحياة والخيال والوجدان الإنساني.",
      "بعد نجاحها في البكالوريا، واصلت مسارها التعليمي والفني من خلال التكوين في مركز دانتي أليغييري (Centre Dante Alighieri) بتونس، حيث درست الرسم والتلوين وتقنيات ورق الذهب وترميم الخشب. كما امتدّ تكوينها الفني إلى مجالات إبداعية أخرى، منها السيراميك وتشكيل الزجاج والبلّور وصناعة المجوهرات اليدوية. وفي عام 2009، حصلت على شهادة الكفاءة الفنية، لتواصل بعدها تطوير تجربتها وصقل لغتها التشكيلية.",
      "تحتل اللوحة الزيتية على القماش مكانة أساسية في أعمالها، حيث تمزج بين الواقعية والرمزية، وتوظّف اللون والضوء والتفاصيل الدقيقة لبناء عوالم فنية ذات طابع خاص.",
      "وإلى جانب الرسم، أنجزت رسوماً توضيحية لكتب الأطفال، وتولّت الإدارة الفنية لكتاب «ديوانية الراجحي الثقافية»، كما طوّرت تجربتها في الفنون التطبيقية من خلال تصميم المجوهرات اليدوية تحت علامتها التجارية Chic & Glamour.",
      "أقامت هناء بحرون معرضين فرديين في تونس: La Jungle سنة 2023 بقصر النجمة الزهراء في سيدي بوسعيد، وLa Jungle 2 سنة 2026 بغاليري جيلان في نابل. كما تُعرض أعمالها الفنية على منصة Saatchi Art.",
      "تواصل الفنانة تطوير رؤيتها التشكيلية من خلال مشاريع جديدة تستكشف العلاقة بين الطبيعة والإنسان، وتتيح عبر موقعها الرسمي للمهتمين والمقتنين اكتشاف أعمالها الأصلية والتواصل معها مباشرة بشأن اقتنائها.",
    ],
  } as LocalizedRich,

  /** Démarche — le cœur du propos de la série « La Jungle ». */
  approach: {
    fr: [
      "La Jungle nous observe.",
      "Avec sa série La Jungle, Hana Bahroun dépasse la représentation réaliste des animaux pour en faire des symboles qui expriment la vie intérieure des êtres vivants et évoquent les émotions ainsi que les conflits intérieurs de l'être humain. Son concept artistique invite le spectateur à repenser les relations entre l'être humain, l'animal et la nature, tout en l'amenant à s'interroger sur son propre monde intérieur.",
    ],
    en: [
      "The Jungle Watches Us.",
      "In her La Jungle series, Bahroun moves beyond the realistic depiction of animals, transforming them into symbols through which she explores the inner lives of living beings and reflects on human emotions and inner conflicts. Her guiding concept invites viewers to reconsider the relationship between humanity, animals, and nature, while reflecting on their own inner worlds.",
    ],
    ar: [
      "الغابة تراقبنا.",
      "من خلال سلسلتها الفنية «الغابة» (La Jungle)، تتجاوز هناء بحرون التصوير الواقعي للحيوانات لتجعل منها رموزاً تعبّر عن الحياة الداخلية للكائنات، وتستكشف من خلالها المشاعر والصراعات الإنسانية. وتدعو رؤيتها المتلقي إلى التأمل في العلاقة بين الإنسان والحيوان والطبيعة، وإعادة اكتشاف ذاته من خلال هذه العلاقة.",
    ],
  } as LocalizedRich,

  /** Parcours : formation, diplômes, expositions. */
  timeline: [
    {
      year: "2009",
      label: {
        fr: "Certificat de compétence artistique",
        en: "Certificate of Artistic Competence",
        ar: "شهادة الكفاءة الفنية",
      },
      place: {
        fr: "Centre Dante Alighieri, Tunis",
        en: "Centre Dante Alighieri, Tunis",
        ar: "مركز دانتي أليغييري، تونس",
      },
    },
    {
      year: "2023",
      label: {
        fr: "La Jungle — exposition individuelle",
        en: "La Jungle — solo exhibition",
        ar: "الغابة — معرض فردي",
      },
      place: {
        fr: "Palais Ennejma Ezzahra, Sidi Bou Saïd",
        en: "Ennejma Ezzahra Palace, Sidi Bou Saïd",
        ar: "قصر النجمة الزهراء، سيدي بوسعيد",
      },
    },
    {
      year: "2026",
      label: {
        fr: "La Jungle 2 — exposition individuelle",
        en: "La Jungle 2 — solo exhibition",
        ar: "الغابة 2 — معرض فردي",
      },
      place: {
        fr: "Galerie Jeelen, Nabeul",
        en: "Galerie Jeelen, Nabeul",
        ar: "غاليري جيلان، نابل",
      },
    },
  ] as {
    year: string;
    label: Localized;
    place?: Localized;
  }[],
};

/* --------------------------------------------------------------------------
   Divers — illustration de livres, direction artistique, bijoux
   -------------------------------------------------------------------------- */

export const diversSections: DiversSection[] = [
  {
    id: "illustration",
    title: {
      fr: "Illustration de livres",
      en: "Book illustration",
      ar: "رسوم الكتب",
    },
    lead: {
      fr: "Des illustrations réalisées pour des livres pour enfants.",
      en: "Illustrations created for children's books.",
      ar: "رسوم توضيحية أُنجزت لكتب الأطفال.",
    },
    description: { fr: [], en: [], ar: [] },
    images: [],
    artworks: [],
    books: [
      {
        id: "maison-de-bambous",
        cover: "/images/divers/livre-maison-de-bambous.jpeg",
        title: "La Maison de bambous",
        authors: "Frédérique Lavaud-Khouja, Hana Bahroun",
        publisher: "Céli Éditions — Minime",
        buy: [
          {
            label: "Al Kitab",
            href: "https://www.alkitab.tn/livre/9789938846362-la-maison-de-bambous-hana-bahroun-frederique-khouja/",
          },
        ],
      },
      {
        id: "petit-tracteur",
        cover: "/images/divers/livre-petit-tracteur.jpeg",
        title: "Le Petit Tracteur",
        authors: "Frédérique Lavaud-Khouja, Hana Bahroun",
        publisher: "Céli Éditions — Minime",
        buy: [
          {
            label: "Librairies indépendantes en Nouvelle-Aquitaine",
            href: "https://www.librairies-nouvelleaquitaine.com/livre/9789938846355-le-petit-tracteur-hana-bahroun-frederique-khouja/",
          },
        ],
      },
      {
        id: "petit-avion",
        cover: "/images/divers/livre-petit-avion.jpeg",
        title: "Le Petit Avion",
        authors: "Frédérique Lavaud-Khouja, Hana Bahroun",
        publisher: "Céli Éditions — Minime",
        buy: [],
      },
      {
        id: "petit-bateau",
        cover: "/images/divers/livre-petit-bateau.jpeg",
        title: "Le Petit Bateau",
        authors: "Frédérique Lavaud-Khouja, Hana Bahroun",
        publisher: "Céli Éditions — Minime",
        buy: [],
      },
      {
        id: "sanfour",
        cover: "/images/divers/livre-sanfour.jpeg",
        title: "Les Aventures de Sanfour — 3 histoires à découvrir",
        authors: "Frédérique Lavaud-Khouja",
        publisher: "Céli Éditions — Cadet",
        buy: [],
      },
      {
        id: "dostour",
        cover: "/images/divers/livre-dostour.jpeg",
        title: "أمّي... سأهديك الدستور",
        authors: "عايدة العلاني، هناء بحرون",
        publisher: "سالي للنشر",
        buy: [],
      },
    ],
    // Pages qui regroupent plusieurs livres : l’éditeur, les catalogues.
    links: [
      {
        label: "Céli Éditions",
        href: "https://celi-edition.net/product-category/romans-pour-ados-et-jeunes-adultes/?max_price=5&orderby=menu_order",
      },
      {
        label: "Fnac",
        href: "https://www.fnac.com/ia4922353/Hana-Bahroun",
      },
      {
        label: "Le Bleuet",
        href: "https://www.lebleuet.fr/listeliv.php?base=paper&form_recherche_avancee=ok&auteurs=Fr%C3%A9d%C3%A9rique%20Khouja&exact&shem=aimgspe,",
      },
      {
        label: "Mots et Cie",
        href: "https://www.librairiemotsetcie.com/listeliv.php?form_recherche_avancee=ok&editeur=Celi&base=paper&shem=aimgspe,",
      },
      {
        label: "Bibliothèque Nationale de Tunisie",
        href: "https://www.bibliotheque.nat.tn/CATG/detailstatic.aspx?RSC_BASE=SYRACUSE&RSC_DOCID=1561428&TITLE=&_lg=en-US",
      },
    ],
  },
  {
    id: "direction-artistique",
    title: {
      fr: "Direction artistique",
      en: "Art direction",
      ar: "الإدارة الفنية",
    },
    lead: {
      fr: "Direction artistique de l'ouvrage Diwaniyat Al-Rajhi Cultural Book.",
      en: "Art direction for the Diwaniyat Al-Rajhi Cultural Book.",
      ar: "الإدارة الفنية لكتاب «ديوانية الراجحي الثقافية».",
    },
    description: {
      fr: [
        "Hana Bahroun a assuré la direction artistique du Diwaniyat Al-Rajhi Cultural Book, ouvrage culturel dont le troisième volume a paru sous sa direction. Elle y a porté le regard d’une peintre : donner au livre une identité visuelle cohérente, accorder l’image au texte, et faire de chaque page un espace où le contenu se lit autant qu’il se regarde.",
      ],
      en: [
        "Hana Bahroun served as art director of the Diwaniyat Al-Rajhi Cultural Book, a cultural publication whose third volume was released under her direction. She brought a painter’s eye to the work: giving the book a coherent visual identity, matching image to text, and making each page a space where the content is looked at as much as it is read.",
      ],
      ar: [
        "تولّت هناء بحرون الإدارة الفنية لكتاب «ديوانية الراجحي الثقافية»، وهو إصدار ثقافي صدر جزؤه الثالث بإدارتها الفنية. وقد حملت إليه عين الفنانة التشكيلية: منح الكتاب هوية بصرية متماسكة، والمواءمة بين الصورة والنص، وجعل كل صفحة فضاءً يُقرأ فيه المحتوى بقدر ما يُتأمَّل.",
      ],
    },
    images: [],
    artworks: [],
    books: [
      {
        id: "diwaniyat-al-rajhi-3",
        cover: "/images/divers/livre-diwaniyat-al-rajhi.jpeg",
        title: "ديوانية الراجحي الثقافية — الجزء الثالث",
        authors: "إشراف: عبد الخالق الزهراني",
        publisher: "الإدارة الفنية: هناء بحرون",
        buy: [],
      },
    ],
  },
  {
    id: "bijoux",
    title: {
      fr: "Création de bijoux — Chic & Glamour",
      en: "Jewellery design — Chic & Glamour",
      ar: "تصميم المجوهرات — Chic & Glamour",
    },
    lead: {
      fr: "Bijoux artisanaux créés sous la marque Chic & Glamour.",
      en: "Handmade jewellery created under the brand Chic & Glamour.",
      ar: "مجوهرات يدوية تحت العلامة التجارية Chic & Glamour.",
    },
    description: { fr: [], en: [], ar: [] },
    images: [],
    artworks: [],
    links: [
      {
        label: "Souk El Kahina",
        href: "https://soukelkahina.tn/en/brand/465-bazzar-of-art-chic-et-glamour",
      },
      {
        label: "Artisan Tunisien",
        href: "https://www.artisantunisien.com/artisan/28",
      },
      {
        label: "Instagram — @bazaar_of_art",
        href: "https://www.instagram.com/bazaar_of_art/",
      },
    ],
  },
];

/* --------------------------------------------------------------------------
   Cours de peinture
   -------------------------------------------------------------------------- */

export const courses = {
  /** Mettre à false pour retirer la page et son entrée de menu. */
  enabled: true,

  lead: {
    fr: "Des cours de peinture à l'atelier, pour les débutants comme pour ceux qui souhaitent approfondir leur pratique.",
    en: "Painting lessons at the studio, for beginners as well as those wishing to deepen their practice.",
    ar: "دروس في الرسم بالمرسم، للمبتدئين ولمن يرغب في تطوير تجربته.",
  } as Localized,

  /** Texte de présentation — à compléter si besoin. */
  description: { fr: [], en: [], ar: [] } as LocalizedRich,

  /** Les formules proposées. Laisser le tableau vide pour les masquer. */
  formulas: [
    {
      id: "debutant",
      title: {
        fr: "Initiation",
        en: "Introduction",
        ar: "مبادئ الرسم",
      },
      description: {
        fr: "Les bases du dessin et de la couleur, pas à pas.",
        en: "The fundamentals of drawing and colour, step by step.",
        ar: "أساسيات الرسم واللون، خطوة بخطوة.",
      },
      detail: { fr: "", en: "", ar: "" },
    },
    {
      id: "huile",
      title: {
        fr: "Peinture à l'huile",
        en: "Oil painting",
        ar: "الرسم الزيتي",
      },
      description: {
        fr: "La technique de l'huile sur toile : matière, lumière, patience.",
        en: "Oil on canvas: material, light and patience.",
        ar: "تقنية الزيت على القماش: المادة والضوء والصبر.",
      },
      detail: { fr: "", en: "", ar: "" },
    },
    {
      id: "enfants",
      title: {
        fr: "Atelier enfants",
        en: "Children's workshop",
        ar: "ورشة الأطفال",
      },
      description: {
        fr: "Un premier contact avec la peinture, par le jeu et l'observation.",
        en: "A first encounter with painting, through play and observation.",
        ar: "أول لقاء مع الرسم، عبر اللعب والملاحظة.",
      },
      detail: { fr: "", en: "", ar: "" },
    },
  ] as {
    id: string;
    title: Localized;
    description: Localized;
    detail: Localized;
  }[],

  /** Infos pratiques affichées à côté du formulaire. */
  practical: {
    location: {
      fr: "Atelier de l'artiste, Nabeul",
      en: "Artist's studio, Nabeul",
      ar: "مرسم الفنانة، نابل",
    } as Localized,
    schedule: {
      fr: "Groupe adultes : le jeudi, de 14 h à 16 h. Les autres horaires se conviennent après l'inscription.",
      en: "Adult group: Thursdays, 2 to 4 pm. Other times are arranged after registration.",
      ar: "مجموعة الكبار: كل خميس، من الساعة 14:00 إلى 16:00. وتُحدَّد المواعيد الأخرى بعد التسجيل.",
    } as Localized,
    price: { fr: "", en: "", ar: "" } as Localized,
  },
};
