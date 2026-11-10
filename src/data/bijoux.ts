/* =============================================================================
   Les bijoux — Chic & Glamour
   -----------------------------------------------------------------------------
   Une pièce = une fiche. `ref` garde le numéro de la photo d'origine
   (_sources-originales/divers/article N.jpeg), pour s'y retrouver avec
   l'artiste. Les photos sont dans public/images/bijoux/article-NN.jpeg.

   Une pièce vendue : passer `status` à "sold". Sans `price`, la fiche
   affiche « Prix sur demande ».

   Les textes viennent de l'artiste, en français. Ils ont été nettoyés
   (références d'images, redites, allégations médicales) et traduits.
   ========================================================================== */

import type { Localized, LocalizedRich } from "./types";

export type JewelPiece =
  | "necklace"
  | "longNecklace"
  | "pendant"
  | "bracelet"
  | "earrings";

export type JewelCollection = {
  id: string;
  title: Localized;
};

export type Jewel = {
  id: string;
  /** Numéro de la photo d'origine (« article 12 »). */
  ref: number;
  /** La première est la photo principale. */
  images: string[];
  collection: string;
  title: Localized;
  description: LocalizedRich;
  /** Vertus prêtées à la pierre (lithothérapie). */
  virtues?: Localized;
  pieces?: JewelPiece[];
  /** Ex. "42 cm" */
  length?: string;
  price?: number;
  status: "available" | "sold";
};

const L = (fr: string, en: string, ar: string): Localized => ({ fr, en, ar });
const R = (fr: string[], en: string[], ar: string[]): LocalizedRich => ({
  fr,
  en,
  ar,
});
const img = (...refs: number[]) =>
  refs.map((n) => `/images/bijoux/article-${String(n).padStart(2, "0")}.jpeg`);

/* --------------------------------------------------------------------------
   Les collections, dans l'ordre de la page
   -------------------------------------------------------------------------- */

export const jewelCollections: JewelCollection[] = [
  { id: "pierres", title: L("Pierres naturelles", "Natural stones", "الأحجار الطبيعية") },
  { id: "perles", title: L("Perles de culture", "Cultured pearls", "اللؤلؤ المستزرع") },
  { id: "energetiques", title: L("Pierres énergétiques", "Energy stones", "الأحجار الطاقية") },
  { id: "cristal", title: L("Strass & cristal", "Rhinestones & crystal", "الستراس والكريستال") },
  { id: "fillettes", title: L("Bijoux fillettes", "Jewellery for girls", "حُليّ البنات") },
  { id: "corail", title: L("Corail", "Coral", "المرجان") },
  { id: "boucles", title: L("Boucles d'oreilles", "Earrings", "الأقراط") },
  { id: "bracelets", title: L("Bracelets fins", "Fine bracelets", "أساور رقيقة") },
  { id: "inox", title: L("Acier inoxydable", "Stainless steel", "الفولاذ المقاوم للصدأ") },
  { id: "cuivre", title: L("Cuivre plaqué or", "Gold-plated copper", "نحاس مطليّ بالذهب") },
  { id: "jouhar", title: L("Modèles en jouhar", "Jouhar pearl designs", "موديلات الجوهر") },
  { id: "homme", title: L("Bracelets homme", "Men's bracelets", "أساور رجالية") },
];

/* --------------------------------------------------------------------------
   Les pièces
   -------------------------------------------------------------------------- */

const STEEL_FR =
  "Acier inoxydable doré : il ne rouille pas, ne noircit pas, garde son éclat au fil du temps et convient aux peaux sensibles.";
const STEEL_EN =
  "Gold-tone stainless steel: it does not rust or tarnish, keeps its shine over time and suits sensitive skin.";
const STEEL_AR =
  "فولاذ مقاوم للصدأ بلون ذهبي: لا يصدأ ولا يسودّ، يحافظ على بريقه مع الزمن ويناسب البشرة الحساسة.";

export const jewels: Jewel[] = [
  /* ---------------------------------------------------------------- Pierres */
  {
    id: "eclat-lunaire",
    ref: 1,
    images: img(1),
    collection: "pierres",
    title: L("Parure « Éclat Lunaire »", "“Éclat Lunaire” set", "طقم «بريق القمر»"),
    description: R(
      [
        "Une création délicate et lumineuse de la collection Chic & Glamour. Le collier, en agate blanche, porte un pendentif central unique aux nuances subtiles, rehaussé de touches dorées. Les boucles d'oreilles reprennent la pureté de l'agate blanche.",
        "Édition limitée.",
      ],
      [
        "A delicate, luminous piece from the Chic & Glamour collection. The white agate necklace carries a one-of-a-kind central pendant in subtle shades, set off with touches of gold. The earrings echo the purity of the white agate.",
        "Limited edition.",
      ],
      [
        "قطعة رقيقة ومضيئة من مجموعة Chic & Glamour. العقد من العقيق الأبيض، تتوسّطه تعليقة فريدة بألوان هادئة تزيّنها لمسات ذهبية، والأقراط تستعيد صفاء العقيق الأبيض.",
        "إصدار محدود.",
      ],
    ),
    virtues: L(
      "L'agate blanche apporte paix intérieure et équilibre, et aide à apaiser l'esprit.",
      "White agate brings inner peace and balance, and helps calm the mind.",
      "يمنح العقيق الأبيض السلام الداخلي والتوازن، ويساعد على تهدئة الذهن.",
    ),
    pieces: ["necklace", "earrings"],
    price: 210,
    status: "available",
  },
  {
    id: "collier-tourmaline",
    ref: 2,
    images: img(2),
    collection: "pierres",
    title: L("Collier tourmaline", "Tourmaline necklace", "عقد التورمالين"),
    description: R(
      [
        "Des perles rondes de tourmaline naturelle de 10 mm, d'une belle présence et au toucher texturé. Au centre, un pendentif rectangulaire aux lignes épurées encadre une pierre, rehaussé de finitions dorées.",
        "Les nuances de la tourmaline, riches et profondes, changent d'une perle à l'autre : chaque collier est unique.",
      ],
      [
        "Round natural tourmaline beads, 10 mm across, with a strong presence and a textured feel. At the centre, a clean-lined rectangular pendant frames a stone, finished in gold.",
        "Tourmaline's rich, deep shades change from bead to bead: no two necklaces are alike.",
      ],
      [
        "خرز دائري من التورمالين الطبيعي بقطر 10 مم، حضوره لافت وملمسه مميّز. في الوسط تعليقة مستطيلة بخطوط بسيطة تحيط بحجر، مع لمسات ذهبية.",
        "تتبدّل ألوان التورمالين الغنية العميقة من خرزة إلى أخرى، فيكون كل عقد قطعة فريدة.",
      ],
    ),
    pieces: ["necklace"],
    price: 210,
    status: "available",
  },
  {
    id: "obsidienne-citrine",
    ref: 3,
    images: img(3),
    collection: "pierres",
    title: L("Parure obsidienne dorée et citrine", "Golden obsidian & citrine set", "طقم الأوبسيديان الذهبي والسترين"),
    description: R(
      [
        "Un collier de perles d'obsidienne dorée, orné d'un pendentif rond en onyx noir mat qui sertit une citrine à l'état brut : une touche d'originalité. Les boucles d'oreilles assorties sont en perles d'obsidienne dorée.",
      ],
      [
        "A necklace of golden obsidian beads with a round matte black onyx pendant set with a raw citrine, for a touch of originality. The matching earrings are golden obsidian beads.",
      ],
      [
        "عقد من خرز الأوبسيديان الذهبي، تزيّنه تعليقة دائرية من الأونيكس الأسود المطفأ تحتضن حجر سترين خاماً، في لمسة مبتكرة. والأقراط المتناسقة من خرز الأوبسيديان الذهبي.",
      ],
    ),
    pieces: ["necklace", "earrings"],
    price: 270,
    status: "available",
  },
  {
    id: "parure-citrine",
    ref: 4,
    images: img(4),
    collection: "pierres",
    title: L("Parure citrine", "Citrine set", "طقم السترين"),
    description: R(
      [
        "Un collier lumineux de perles rondes de citrine, espacées de petites perles dorées qui en rehaussent l'éclat. Les boucles d'oreilles pendantes reprennent une perle de citrine suspendue à un crochet doré.",
      ],
      [
        "A bright necklace of round citrine beads, spaced with small gold beads that bring out their glow. The drop earrings each hang a citrine bead from a gold hook.",
      ],
      [
        "عقد مشرق من خرز السترين الدائري، تفصل بينه حبّات ذهبية صغيرة تزيد من بريقه. والأقراط المتدلّية خرزة سترين معلّقة بخطّاف ذهبي.",
      ],
    ),
    pieces: ["necklace", "earrings"],
    price: 180,
    status: "available",
  },
  {
    id: "collier-malachite",
    ref: 5,
    images: img(5),
    collection: "pierres",
    title: L("Collier malachite", "Malachite necklace", "عقد الملاكيت"),
    description: R(
      [
        "Des perles rondes de malachite naturelle d'un vert profond. Le rang est rythmé, de chaque côté, par deux anneaux sertis de strass, et au centre par un motif torsadé en plaqué or. De petites perles dorées d'espacement complètent l'ensemble.",
      ],
      [
        "Round natural malachite beads in deep green. The strand is punctuated on each side by two rhinestone-set rings, and at the centre by a twisted gold-plated motif. Small gold spacer beads complete the piece.",
      ],
      [
        "خرز دائري من الملاكيت الطبيعي بلون أخضر عميق، تتخلّله من كل جانب حلقتان مرصّعتان بالستراس، وفي الوسط زخرفة ملتوية مطلية بالذهب، مع حبّات ذهبية صغيرة فاصلة.",
      ],
    ),
    pieces: ["necklace"],
    price: 450,
    status: "available",
  },
  {
    id: "parure-ambre-ronde",
    ref: 7,
    images: img(7),
    collection: "pierres",
    title: L("Parure ambre et créoles", "Amber set with hoops", "طقم الكهرمان بالأقراط الحلقية"),
    description: R(
      [
        "Un collier de perles rondes d'ambre aux reflets dorés et miel, rythmées de perles dorées. Les boucles d'oreilles sont des créoles dorées serties de strass, d'où pend une goutte d'ambre facettée.",
      ],
      [
        "A necklace of round amber beads with golden, honey-toned glints, punctuated by gold beads. The earrings are gold hoops set with rhinestones, each holding a faceted amber drop.",
      ],
      [
        "عقد من خرز الكهرمان الدائري بانعكاسات ذهبية وعسلية، تتخلّله حبّات ذهبية. والأقراط حلقات ذهبية مرصّعة بالستراس تتدلّى منها قطرة كهرمان مشطوفة.",
      ],
    ),
    pieces: ["necklace", "earrings"],
    price: 250,
    status: "available",
  },
  {
    id: "parure-lapis",
    ref: 8,
    images: img(8),
    collection: "pierres",
    title: L("Parure lapis-lazuli", "Lapis lazuli set", "طقم اللازورد"),
    description: R(
      [
        "Un collier de perles rondes de lapis-lazuli, d'un bleu profond semé de reflets dorés, avec un pendentif ovale assorti monté sur une bordure dorée. Les boucles d'oreilles pendantes portent des perles de lapis-lazuli sur des attaches dorées.",
      ],
      [
        "A necklace of round lapis lazuli beads, deep blue flecked with gold, with a matching oval pendant in a gold setting. The drop earrings hang lapis beads from gold fittings.",
      ],
      [
        "عقد من خرز اللازورد الدائري بلون أزرق عميق تتخلّله ومضات ذهبية، مع تعليقة بيضاوية متناسقة في إطار ذهبي. والأقراط المتدلّية من خرز اللازورد على مشابك ذهبية.",
      ],
    ),
    pieces: ["necklace", "earrings"],
    price: 265,
    status: "available",
  },
  {
    id: "parure-cornaline",
    ref: 9,
    images: img(9),
    collection: "pierres",
    title: L("Parure cornaline", "Carnelian set", "طقم العقيق الأحمر"),
    description: R(
      [
        "Un collier chaleureux de perles rondes de cornaline aux teintes flamboyantes, rythmées de perles dorées. Les boucles d'oreilles pendantes assorties associent la cornaline à des éléments dorés ciselés.",
      ],
      [
        "A warm necklace of round carnelian beads in fiery tones, punctuated by gold beads. The matching drop earrings pair carnelian with chased gold details.",
      ],
      [
        "عقد دافئ من خرز العقيق الأحمر الدائري بألوان متوهّجة، تتخلّله حبّات ذهبية. والأقراط المتدلّية المتناسقة تجمع العقيق الأحمر بعناصر ذهبية منقوشة.",
      ],
    ),
    virtues: L(
      "La cornaline est réputée motivante, stimulante et énergisante.",
      "Carnelian is known as a motivating, stimulating and energising stone.",
      "يُعرف العقيق الأحمر بأنه حجر محفّز ومنشّط يبعث الطاقة.",
    ),
    pieces: ["necklace", "earrings"],
    price: 120,
    status: "available",
  },
  {
    id: "parure-machallah",
    ref: 10,
    images: img(10),
    collection: "pierres",
    title: L("Parure œil de tigre « Machallah »", "Tiger's eye “Mashallah” set", "طقم عين النمر «ما شاء الله»"),
    description: R(
      [
        "Un collier de perles rondes d'œil de tigre aux reflets bruns et dorés, rythmées de petites perles scintillantes, sublimé par un grand pendentif calligraphié « ما شاء الله » en cuivre fin plaqué or.",
        "Les boucles d'oreilles dormeuses assorties portent une perle d'œil de tigre et la même calligraphie.",
      ],
      [
        "A necklace of round tiger's eye beads shimmering in brown and gold, punctuated by small sparkling beads and crowned by a large “ما شاء الله” (Mashallah) calligraphy pendant in fine gold-plated copper.",
        "The matching lever-back earrings carry a tiger's eye bead and the same calligraphy.",
      ],
      [
        "عقد من خرز عين النمر الدائري بانعكاسات بنّية وذهبية، تتخلّله حبّات صغيرة لامعة، وتتوّجه تعليقة كبيرة بخط «ما شاء الله» من النحاس الرقيق المطلي بالذهب.",
        "والأقراط المتناسقة بمشبك مغلق، فيها خرزة عين النمر والخط نفسه.",
      ],
    ),
    pieces: ["necklace", "earrings"],
    price: 190,
    status: "available",
  },
  {
    id: "parure-jaspe",
    ref: 11,
    images: img(11),
    collection: "pierres",
    title: L("Parure jaspe impérial", "Imperial jasper set", "طقم اليشب الإمبراطوري"),
    description: R(
      [
        "Des perles régulières de jaspe impérial, du bleu ciel au turquoise, tachetées de douces inclusions terreuses : chaque perle est unique. Les boucles d'oreilles assorties ont des lignes épurées.",
        "Fermoir et apprêts en acier inoxydable doré : un éclat durable, une bonne tenue au quotidien, et aucune irritation pour les peaux sensibles.",
      ],
      [
        "Even beads of imperial jasper, from sky blue to turquoise, speckled with soft earthy inclusions: every bead is unique. The matching earrings have clean lines.",
        "Clasp and findings in gold-tone stainless steel: lasting shine, everyday durability, and gentle on sensitive skin.",
      ],
      [
        "خرز منتظم من اليشب الإمبراطوري، من الأزرق السماوي إلى الفيروزي، تتخلّله بقع ترابية ناعمة، فكل خرزة فريدة. والأقراط المتناسقة بخطوط بسيطة.",
        "القفل والملحقات من الفولاذ المقاوم للصدأ بلون ذهبي: بريق يدوم، ومتانة للاستعمال اليومي، ولا يهيّج البشرة الحساسة.",
      ],
    ),
    pieces: ["necklace", "earrings"],
    price: 200,
    status: "available",
  },
  {
    id: "parure-quartz-fume",
    ref: 12,
    images: img(12),
    collection: "pierres",
    title: L("Parure quartz fumé", "Smoky quartz set", "طقم الكوارتز المدخّن"),
    description: R(
      [
        "Un collier de perles de quartz fumé, sublimé par un grand pendentif en pierre naturelle aux reflets irisés, avec des boucles d'oreilles assorties. Un bijou à la fois élégant et protecteur.",
      ],
      [
        "A smoky quartz bead necklace, set off by a large natural-stone pendant with iridescent glints, with matching earrings. Elegant and protective at once.",
      ],
      [
        "عقد من خرز الكوارتز المدخّن، تزيّنه تعليقة كبيرة من حجر طبيعي بانعكاسات قزحية، مع أقراط متناسقة. قطعة أنيقة وحامية في آن.",
      ],
    ),
    virtues: L(
      "Pierre d'ancrage et de clarté, le quartz fumé apporte calme et stabilité émotionnelle, et éloigne les énergies négatives.",
      "A stone of grounding and clarity, smoky quartz brings calm and emotional stability, and keeps negative energy away.",
      "الكوارتز المدخّن حجر للثبات والصفاء، يمنح الهدوء والاستقرار العاطفي ويُبعد الطاقات السلبية.",
    ),
    pieces: ["necklace", "earrings"],
    price: 230,
    status: "available",
  },
  {
    id: "parure-hematite-corail",
    ref: 13,
    images: img(13, 14),
    collection: "pierres",
    title: L("Parure hématite et corail", "Hematite & coral set", "طقم الهيماتيت والمرجان"),
    description: R(
      [
        "L'hématite grise à l'éclat métallique et le corail naturel aux nuances chaudes : un collier aux perles structurées, un bracelet assorti et des boucles d'oreilles pendantes, rehaussés de touches dorées. Un style moderne et intemporel.",
      ],
      [
        "Grey hematite with a metallic sheen and natural coral in warm tones: a structured bead necklace, a matching bracelet and drop earrings, with touches of gold. Modern and timeless.",
      ],
      [
        "الهيماتيت الرمادي ببريقه المعدني والمرجان الطبيعي بألوانه الدافئة: عقد بخرز متناسق، وسوار متناسق، وأقراط متدلّية، مع لمسات ذهبية. أسلوب عصري لا يبطل.",
      ],
    ),
    pieces: ["necklace", "bracelet", "earrings"],
    length: "42 cm",
    price: 180,
    status: "available",
  },
  {
    id: "agate-sulemani",
    ref: 15,
    images: img(15),
    collection: "pierres",
    title: L("Pendentif agate Sulemani", "Sulemani agate pendant", "تعليقة عقيق سليماني"),
    description: R(
      [
        "Une agate Sulemani ovale, au cœur d'un bleu profond et aux contours translucides, entourée d'un sertissage de cristaux scintillants. Elle est fixée par une bélière argentée à un cordon de soie noire tressée, fin, brillant et très doux à porter.",
      ],
      [
        "An oval Sulemani agate, deep blue at its heart with translucent edges, framed by sparkling crystals. A silver bail hangs it from a fine, glossy braided black silk cord that is very soft to wear.",
      ],
      [
        "عقيق سليماني بيضاوي، قلبه أزرق عميق وحوافه شفّافة، تحيط به بلّورات لامعة، معلّق ببكلة فضية في حبل من الحرير الأسود المضفور، رقيق ولامع وناعم جداً على البشرة.",
      ],
    ),
    pieces: ["pendant"],
    price: 190,
    status: "available",
  },
  {
    id: "agate-orange",
    ref: 16,
    images: img(16),
    collection: "pierres",
    title: L("Pendentif agate orange", "Orange agate pendant", "تعليقة عقيق برتقالي"),
    description: R(
      [
        "Une agate orange éclatante, sertie de petits cristaux et suspendue à une bélière, sur un cordon de cuir marron tressé, souple et résistant, qui lui donne une touche naturelle.",
      ],
      [
        "A vivid orange agate set with small crystals and hung from a bail, on a supple, sturdy braided brown leather cord for a natural touch.",
      ],
      [
        "عقيق برتقالي زاهٍ مرصّع ببلّورات صغيرة ومعلّق ببكلة، على حبل من الجلد البنّي المضفور، ليّن ومتين، يمنحه لمسة طبيعية.",
      ],
    ),
    pieces: ["pendant"],
    price: 170,
    status: "available",
  },
  {
    id: "turquoise-filigrane",
    ref: 17,
    images: img(17),
    collection: "pierres",
    title: L("Parure turquoise et filigrane", "Turquoise & filigree set", "طقم الفيروز والتلّ"),
    description: R(
      [
        "Un collier de 65 cm en turquoise aux nuances intenses et des boucles d'oreilles assorties, sublimés par des pendentifs filigranés en cuivre plaqué or : la finesse orientale rencontre l'élégance d'aujourd'hui.",
      ],
      [
        "A 65 cm necklace of intensely coloured turquoise with matching earrings, set off by filigree pendants in gold-plated copper: oriental finesse meets today's elegance.",
      ],
      [
        "عقد بطول 65 سم من الفيروز بألوان قوية مع أقراط متناسقة، تزيّنها تعليقات مخرّمة بتقنية التلّ من النحاس المطلي بالذهب: رقّة شرقية بأناقة معاصرة.",
      ],
    ),
    virtues: L(
      "Pierre d'harmonie et de protection depuis l'Antiquité, la turquoise passe pour éloigner les énergies négatives et le mauvais œil, favoriser le calme, l'expression et la créativité, et apaiser les humeurs.",
      "A stone of harmony and protection since Antiquity, turquoise is said to ward off negative energy and the evil eye, encourage calm, expression and creativity, and soothe moods.",
      "الفيروز حجر الانسجام والحماية منذ القدم، يُقال إنه يُبعد الطاقات السلبية والعين، ويبعث على الهدوء ويحفّز التعبير والإبداع ويلطّف المزاج.",
    ),
    pieces: ["necklace", "earrings"],
    length: "65 cm",
    price: 350,
    status: "available",
  },
  {
    id: "murano-turquoise",
    ref: 18,
    images: img(18),
    collection: "pierres",
    title: L("Collier Murano et turquoise", "Murano & turquoise necklace", "عقد مورانو والفيروز"),
    description: R(
      [
        "Un pendentif en verre de Murano, orné de feuilles d'or et de motifs colorés disposés en spirale, sur un rang de pépites de turquoise brute.",
      ],
      [
        "A Murano glass pendant, decorated with gold leaf and colourful motifs in a spiral, on a strand of raw turquoise nuggets.",
      ],
      [
        "تعليقة من زجاج مورانو مزيّنة بورق الذهب وزخارف ملوّنة في شكل حلزوني، على سلسلة من قطع الفيروز الخام.",
      ],
    ),
    virtues: L(
      "La turquoise est associée à la protection et à la communication.",
      "Turquoise is associated with protection and communication.",
      "يرتبط الفيروز بالحماية والتواصل.",
    ),
    pieces: ["necklace"],
    price: 180,
    status: "available",
  },
  {
    id: "vegetale-malachite",
    ref: 19,
    images: img(19, 20),
    collection: "pierres",
    title: L("Parure végétale dorée", "Golden botanical set", "طقم الأوراق الذهبية"),
    description: R(
      [
        "Des feuilles filigranées dorées et des perles de malachite d'un vert profond : un collier et des boucles d'oreilles au dessin botanique, poétique et élégant.",
        STEEL_FR,
      ],
      [
        "Gold filigree leaves and deep green malachite beads: a necklace and earrings with a poetic, elegant botanical design.",
        STEEL_EN,
      ],
      [
        "أوراق ذهبية مخرّمة وخرز من الملاكيت الأخضر العميق: عقد وأقراط بتصميم نباتي شاعري وأنيق.",
        STEEL_AR,
      ],
    ),
    virtues: L(
      "Pierre de protection, la malachite passe pour absorber les énergies négatives, donner de l'assurance, apaiser les tensions et accompagner les changements.",
      "A protective stone, malachite is said to absorb negative energy, build self-assurance, ease tension and support change.",
      "الملاكيت حجر حماية، يُقال إنه يمتصّ الطاقات السلبية ويمنح الثقة ويخفّف التوتر ويرافق التغيير.",
    ),
    pieces: ["necklace", "earrings"],
    price: 155,
    status: "available",
  },
  {
    id: "jade-jaune",
    ref: 21,
    images: img(21),
    collection: "pierres",
    title: L("Pendentif jade jaune", "Yellow jade pendant", "تعليقة اليشم الأصفر"),
    description: R(
      [
        "Un anneau de jade jaune — dit « jade citron » ou « jade d'or » — d'une couleur douce et lumineuse, traversé d'une perle à facettes qui capte la lumière sous tous les angles, sur une fine chaîne dorée.",
        "Pierre fine, chaque jade a ses variations : la pièce est unique.",
      ],
      [
        "A ring of yellow jade — known as “lemon jade” or “golden jade” — soft and luminous in colour, threaded with a faceted bead that catches the light from every angle, on a fine gold chain.",
        "As a natural fine stone, every jade varies: the piece is unique.",
      ],
      [
        "حلقة من اليشم الأصفر، المعروف بـ«يشم الليمون» أو «اليشم الذهبي»، بلون ناعم ومضيء، تتوسّطها خرزة مشطوفة تلتقط الضوء من كل زاوية، على سلسلة ذهبية رقيقة.",
        "ولأنه حجر كريم طبيعي، يختلف كل يشم عن غيره، فالقطعة فريدة.",
      ],
    ),
    virtues: L(
      "Le jade jaune symbolise la joie, la prospérité et la paix intérieure.",
      "Yellow jade symbolises joy, prosperity and inner peace.",
      "يرمز اليشم الأصفر إلى الفرح والرخاء والسلام الداخلي.",
    ),
    pieces: ["pendant"],
    price: 110,
    status: "available",
  },
  {
    id: "ambre-cubes",
    ref: 22,
    images: img(22),
    collection: "pierres",
    title: L("Parure ambre", "Amber set", "طقم الكهرمان"),
    description: R(
      [
        "Un collier de perles d'ambre taillées en cubes, du jaune miel au brun ambré profond, et des boucles d'oreilles pendantes assorties.",
        "Résine fossile de conifères préhistoriques, l'ambre est léger et chaud au toucher.",
      ],
      [
        "A necklace of cube-cut amber beads, from honey yellow to deep amber brown, with matching drop earrings.",
        "A fossil resin from prehistoric conifers, amber is light and warm to the touch.",
      ],
      [
        "عقد من خرز الكهرمان المقطّع على شكل مكعّبات، من الأصفر العسلي إلى البنّي الكهرماني العميق، مع أقراط متدلّية متناسقة.",
        "الكهرمان راتنج متحجّر من أشجار صنوبرية ما قبل التاريخ، خفيف ودافئ الملمس.",
      ],
    ),
    virtues: L(
      "On lui prête une énergie douce et réchauffante, qui aide à libérer le stress et stimule l'enthousiasme.",
      "It is credited with a gentle, warming energy that helps release stress and lifts enthusiasm.",
      "تُنسب إليه طاقة دافئة لطيفة تساعد على التخلّص من التوتر وتبعث الحماس.",
    ),
    pieces: ["necklace", "earrings"],
    price: 380,
    status: "available",
  },
  {
    id: "agate-sainte-lucie",
    ref: 39,
    images: img(39),
    collection: "pierres",
    title: L("Parure agate et œil de Sainte-Lucie", "Agate & Saint Lucia's eye set", "طقم العقيق وعين القديسة لوسيا"),
    description: R(
      [
        "Un collier ras-de-cou en perles d'agate facettées, avec un fermoir ornemental argenté incrusté de zircons ; un bracelet assorti qui associe l'agate à l'œil de Sainte-Lucie ; des boucles d'oreilles pendantes.",
      ],
      [
        "A choker of faceted agate beads with a silver ornamental clasp set with zircons; a matching bracelet pairing agate with Saint Lucia's eye; and drop earrings.",
      ],
      [
        "عقد قصير من خرز العقيق المشطوف بقفل زخرفي فضي مرصّع بالزركون، وسوار متناسق يجمع العقيق بعين القديسة لوسيا، وأقراط متدلّية.",
      ],
    ),
    virtues: L(
      "L'agate apporte équilibre émotionnel, paix intérieure et stabilité ; l'œil de Sainte-Lucie est traditionnellement porte-chance et protecteur.",
      "Agate brings emotional balance, inner peace and stability; Saint Lucia's eye is traditionally a lucky, protective charm.",
      "يمنح العقيق التوازن العاطفي والسلام الداخلي والثبات، وعين القديسة لوسيا تميمة تقليدية للحظ والحماية.",
    ),
    pieces: ["necklace", "bracelet", "earrings"],
    status: "sold",
  },
  {
    id: "agate-infini",
    ref: 40,
    images: img(43, 40),
    collection: "pierres",
    title: L("Parure agate « Infini »", "“Infinity” agate set", "طقم العقيق «اللانهاية»"),
    description: R(
      [
        "Un collier ras-de-cou en perles d'agate facettées, sublimé par un fermoir scintillant en forme de symbole de l'infini incrusté de zircons ; un bracelet et des boucles d'oreilles assortis.",
      ],
      [
        "A choker of faceted agate beads, set off by a sparkling infinity-symbol clasp inlaid with zircons, with a matching bracelet and earrings.",
      ],
      [
        "عقد قصير من خرز العقيق المشطوف، يزيّنه قفل لامع على شكل رمز اللانهاية مرصّع بالزركون، مع سوار وأقراط متناسقة.",
      ],
    ),
    virtues: L(
      "L'agate apporte l'équilibre émotionnel, apaise l'esprit et procure un sentiment de paix intérieure.",
      "Agate brings emotional balance, calms the mind and gives a sense of inner peace.",
      "يمنح العقيق التوازن العاطفي ويهدّئ الذهن ويبعث شعوراً بالسلام الداخلي.",
    ),
    pieces: ["necklace", "bracelet", "earrings"],
    status: "sold",
  },
  {
    id: "agate-solaire",
    ref: 41,
    images: img(41),
    collection: "pierres",
    title: L("Parure « Agate solaire »", "“Solar Agate” set", "طقم «العقيق الشمسي»"),
    description: R(
      [
        "L'éclat chaleureux de l'agate jaune naturelle, sublimée par de délicats pendentifs floraux dorés sertis de cristaux. Une touche de lumière pour toutes les tenues.",
      ],
      [
        "The warm glow of natural yellow agate, set off by delicate gold floral pendants set with crystals. A touch of light for any outfit.",
      ],
      [
        "البريق الدافئ للعقيق الأصفر الطبيعي، تزيّنه تعليقات زهرية ذهبية رقيقة مرصّعة بالبلّور. لمسة ضوء لكل إطلالة.",
      ],
    ),
    status: "sold",
  },
  {
    id: "pierre-de-lune",
    ref: 42,
    images: img(42),
    collection: "pierres",
    title: L("Parure pierre de lune", "Moonstone set", "طقم حجر القمر"),
    description: R(
      [
        "La beauté délicate de la pierre de lune naturelle : des nuances nacrées et de subtils reflets bleutés, rehaussés de fines touches dorées.",
      ],
      [
        "The delicate beauty of natural moonstone: pearly hues and subtle bluish glints, set off by fine touches of gold.",
      ],
      [
        "الجمال الرقيق لحجر القمر الطبيعي: ألوان لؤلؤية وانعكاسات زرقاء خفيفة، مع لمسات ذهبية دقيقة.",
      ],
    ),
    virtues: L(
      "Associée à la féminité et à l'énergie lunaire, la pierre de lune est une pierre d'harmonie, d'intuition, de douceur, de renouveau et de confiance en soi.",
      "Linked to femininity and lunar energy, moonstone is a stone of harmony, intuition, gentleness, renewal and self-confidence.",
      "يرتبط حجر القمر بالأنوثة وطاقة القمر، وهو حجر الانسجام والحدس واللطف والتجدّد والثقة بالنفس.",
    ),
    status: "sold",
  },
  {
    id: "etoile-nebuleuse",
    ref: 44,
    images: img(44),
    collection: "pierres",
    title: L("Parure « Étoile nébuleuse »", "“Nebula Star” set", "طقم «نجمة السديم»"),
    description: R(
      [
        "Des pépites d'améthyste brute aux violets profonds, rythmées de perles dorées, et un pendentif étoile doré serti de zircons. Les boucles d'oreilles reprennent une pépite d'améthyste et la même étoile, sur des crochets dorés.",
        "Chaque pierre a sa forme et sa teinte : chaque parure est unique.",
      ],
      [
        "Raw amethyst nuggets in deep violet, punctuated by gold beads, with a gold star pendant set with zircons. The earrings repeat an amethyst nugget and the same star, on gold hooks.",
        "Each stone has its own shape and shade: every set is unique.",
      ],
      [
        "قطع من الجمشت الخام بألوان بنفسجية عميقة، تتخلّلها حبّات ذهبية، وتعليقة نجمة ذهبية مرصّعة بالزركون. والأقراط فيها قطعة جمشت والنجمة نفسها على خطّافات ذهبية.",
        "لكل حجر شكله ولونه، فكل طقم فريد.",
      ],
    ),
    virtues: L(
      "Pierre de sagesse et de tranquillité, l'améthyste aide à dissiper le stress et les pensées négatives, et favorise l'intuition ; l'étoile symbolise l'espoir et la lumière intérieure.",
      "A stone of wisdom and calm, amethyst helps dispel stress and negative thoughts and encourages intuition; the star stands for hope and inner light.",
      "الجمشت حجر الحكمة والسكينة، يساعد على تبديد التوتر والأفكار السلبية ويقوّي الحدس، والنجمة رمز للأمل والنور الداخلي.",
    ),
    pieces: ["necklace", "earrings"],
    status: "sold",
  },
  {
    id: "rose-royale",
    ref: 45,
    images: img(45),
    collection: "pierres",
    title: L("Parure « Rose royale »", "“Royal Rose” set", "طقم «الوردة الملكية»"),
    description: R(
      [
        "Des pépites de quartz rose brut et de petites perles dorées, autour d'un pendentif Main de Fatma (khamsa) doré pavé de zircons. Les boucles d'oreilles sont des dormeuses dorées pavées, d'où pend une pépite de quartz rose sur une finition fleurie.",
        "Pierres brutes : chaque pépite a sa forme et sa nuance.",
      ],
      [
        "Raw rose quartz nuggets and small gold beads around a gold Hand of Fatima (khamsa) pendant paved with zircons. The earrings are paved gold lever-backs, each holding a rose quartz nugget on a flower-shaped cap.",
        "Raw stones: every nugget has its own shape and shade.",
      ],
      [
        "قطع من الكوارتز الوردي الخام وحبّات ذهبية صغيرة حول تعليقة «خمسة» ذهبية مرصّعة بالزركون. والأقراط بمشبك مغلق مرصّع، تتدلّى منها قطعة كوارتز وردي على قاعدة زهرية.",
        "أحجار خام: لكل قطعة شكلها ولونها.",
      ],
    ),
    virtues: L(
      "Le quartz rose favorise l'harmonie, l'amour de soi et la douceur ; la khamsa protège et porte chance.",
      "Rose quartz encourages harmony, self-love and gentleness; the khamsa protects and brings luck.",
      "يبعث الكوارتز الوردي على الانسجام وحبّ الذات واللطف، والخمسة تحمي وتجلب الحظ.",
    ),
    pieces: ["necklace", "earrings"],
    price: 210,
    status: "available",
  },

  /* ----------------------------------------------------------------- Perles */
  {
    id: "perles-infini",
    ref: 23,
    images: img(23),
    collection: "perles",
    title: L("Parure perles et nœud infini", "Pearl & infinity knot set", "طقم اللؤلؤ وعقدة اللانهاية"),
    description: R(
      [
        "Un collier ras-de-cou d'un rang de perles de culture d'eau douce, rondes et nacrées, avec au centre un fermoir décoratif en acier inoxydable doré : deux boucles entrelacées, comme un infini ou un nœud marin, pavées de cristaux.",
        "Les boucles d'oreilles, en acier doré assorti, portent une fleur à cinq pétales sertie de cristaux, d'où une fine courbe d'or suspend une perle de culture.",
      ],
      [
        "A single-strand choker of round, lustrous freshwater cultured pearls, centred on a decorative gold-tone stainless steel clasp: two interlaced loops, like an infinity sign or a sailor's knot, paved with crystals.",
        "The matching gold steel earrings carry a five-petal crystal flower, from which a fine gold curve suspends a cultured pearl.",
      ],
      [
        "عقد قصير بصفّ واحد من لؤلؤ المياه العذبة المستزرع، دائري ولامع، يتوسّطه قفل زخرفي من الفولاذ الذهبي: حلقتان متشابكتان كرمز اللانهاية أو العقدة البحرية، مرصّعتان بالبلّور.",
        "والأقراط من الفولاذ الذهبي، فيها زهرة بخمس بتلات مرصّعة بالبلّور، يتدلّى منها بانحناءة ذهبية رقيقة لؤلؤة مستزرعة.",
      ],
    ),
    pieces: ["necklace", "earrings"],
    price: 180,
    status: "available",
  },
  {
    id: "perles-medaillon",
    ref: 24,
    images: img(24),
    collection: "perles",
    title: L("Collier perles et médaillon", "Pearl necklace with medallion", "عقد اللؤلؤ بالميدالية"),
    description: R(
      [
        "Un collier ras-de-cou de perles de culture d'eau douce, rondes et nacrées, mis en valeur par un médaillon rond en acier inoxydable argenté, ajouré comme une dentelle et pavé de cristaux qui captent la lumière.",
      ],
      [
        "A choker of round, lustrous freshwater cultured pearls, set off by a round silver-tone stainless steel medallion, openworked like lace and paved with light-catching crystals.",
      ],
      [
        "عقد قصير من لؤلؤ المياه العذبة المستزرع، تزيّنه ميدالية دائرية من الفولاذ الفضي، مخرّمة كالدانتيل ومرصّعة ببلّورات تلتقط الضوء.",
      ],
    ),
    pieces: ["necklace"],
    price: 140,
    status: "available",
  },
  {
    id: "perles-grises",
    ref: 25,
    images: img(25),
    collection: "perles",
    title: L("Parure perles grises double rang", "Double-strand grey pearl set", "طقم اللؤلؤ الرمادي بصفّين"),
    description: R(
      [
        "Un collier à double rang de perles de culture grises aux reflets ardoise, fermé sur le côté par un fermoir-bijou en acier inoxydable argenté pavé de cristaux, et ponctué d'anneaux étincelants.",
        "Les boucles d'oreilles dormeuses, en acier argenté, portent une perle grise en pendant. Pour une soirée, ou une touche d'audace chic.",
      ],
      [
        "A double-strand necklace of grey cultured pearls with slate-blue glints, closed at the side by a jewelled silver-tone stainless steel clasp paved with crystals, and punctuated by sparkling rings.",
        "The silver steel lever-back earrings each hold a grey pearl drop. For an evening out, or a touch of chic daring.",
      ],
      [
        "عقد بصفّين من اللؤلؤ المستزرع الرمادي بانعكاسات أردوازية، يُغلق من الجانب بقفل-حلية من الفولاذ الفضي مرصّع بالبلّور، وتتخلّله حلقات لامعة.",
        "والأقراط من الفولاذ الفضي بمشبك مغلق، تتدلّى منها لؤلؤة رمادية. لسهرة، أو للمسة جريئة أنيقة.",
      ],
    ),
    pieces: ["necklace", "earrings"],
    price: 350,
    status: "available",
  },

  /* ------------------------------------------------------- Pierres énergétiques */
  {
    id: "sautoir-turquoise",
    ref: 26,
    images: img(26),
    collection: "energetiques",
    title: L("Parure sautoir turquoise", "Turquoise long necklace set", "طقم العقد الطويل بالفيروز"),
    description: R(
      [
        "Des pépites de turquoise naturelle, aux vraies veinures, sur une fine chaîne en acier inoxydable doré. Le sautoir de 115 cm se porte long ou doublé en deux rangs. Le bracelet, réglable par une chaînette, et les boucles d'oreilles en cascade reprennent les mêmes pierres.",
        "Acier inoxydable de premier choix : résistant à l'eau, hypoallergénique, inaltérable. Un style méditerranéen, artisanal et bohème chic.",
      ],
      [
        "Natural turquoise nuggets with genuine veining, on a fine gold-tone stainless steel chain. The 115 cm necklace can be worn long or doubled into two strands. The bracelet, adjustable with an extender chain, and the cascading earrings use the same stones.",
        "Top-grade stainless steel: water-resistant, hypoallergenic, untarnishable. A Mediterranean, handmade, boho-chic style.",
      ],
      [
        "قطع من الفيروز الطبيعي بعروقه الحقيقية على سلسلة رقيقة من الفولاذ الذهبي. العقد بطول 115 سم يُلبس طويلاً أو مضاعفاً في صفّين، والسوار القابل للتعديل بسلسلة صغيرة والأقراط المتدلّية من الأحجار نفسها.",
        "فولاذ مقاوم للصدأ من الدرجة الأولى: مقاوم للماء، لا يسبّب الحساسية، لا يتغيّر. أسلوب متوسطي حِرفي بلمسة بوهيمية.",
      ],
    ),
    pieces: ["longNecklace", "bracelet", "earrings"],
    length: "115 cm",
    price: 190,
    status: "available",
  },
  {
    id: "sautoir-lapis",
    ref: 27,
    images: img(27),
    collection: "energetiques",
    title: L("Parure sautoir lapis-lazuli", "Lapis lazuli long necklace set", "طقم العقد الطويل باللازورد"),
    description: R(
      [
        "Des éclats de lapis-lazuli d'un bleu profond, espacés avec finesse sur une chaîne dorée en acier inoxydable de premier choix, garantie au moins dix ans. Le sautoir de 115 cm se porte en deux rangs ; boucles d'oreilles pendantes et bracelet assortis.",
        "Chaque pierre a ses nuances et ses irrégularités : chaque parure est unique.",
      ],
      [
        "Deep blue lapis lazuli chips, finely spaced on a top-grade gold-tone stainless steel chain, guaranteed for at least ten years. The 115 cm necklace can be worn as two strands, with matching drop earrings and bracelet.",
        "Every stone has its own shades and irregularities: each set is unique.",
      ],
      [
        "قطع من اللازورد الأزرق العميق موزّعة برقّة على سلسلة ذهبية من الفولاذ المقاوم للصدأ من الدرجة الأولى، مضمونة عشر سنوات على الأقل. العقد بطول 115 سم يُلبس في صفّين، مع أقراط متدلّية وسوار متناسق.",
        "لكل حجر ألوانه وتفاصيله، فكل طقم فريد.",
      ],
    ),
    pieces: ["longNecklace", "bracelet", "earrings"],
    length: "115 cm",
    price: 190,
    status: "available",
  },

  /* ---------------------------------------------------------------- Cristal */
  {
    id: "florale-multicolore",
    ref: 28,
    images: img(28),
    collection: "cristal",
    title: L("Parure florale multicolore", "Multicoloured floral set", "طقم الزهرة الملوّنة"),
    description: R(
      [
        "Une fine chaîne en acier inoxydable doré porte un pendentif floral richement travaillé : pierres rouges naturelles, cristaux et strass Swarovski vert émeraude, blancs, orange et violets, et une cascade de perles rouges.",
        "Les boucles d'oreilles reprennent la fleur, sertie de cristaux verts et blancs, avec des pampilles de perles rouges.",
      ],
      [
        "A fine gold-tone stainless steel chain carries a richly worked floral pendant: natural red stones, emerald-green, white, orange and violet Swarovski crystals and rhinestones, and a cascade of red beads.",
        "The earrings repeat the flower, set with green and white crystals, with red bead tassels.",
      ],
      [
        "سلسلة رقيقة من الفولاذ الذهبي تحمل تعليقة زهرية غنية التفاصيل: أحجار حمراء طبيعية، وبلّورات وستراس سواروفسكي بالأخضر الزمردي والأبيض والبرتقالي والبنفسجي، وشلّال من الخرز الأحمر.",
        "والأقراط تستعيد الزهرة المرصّعة ببلّور أخضر وأبيض، مع شرّابات من الخرز الأحمر.",
      ],
    ),
    pieces: ["necklace", "earrings"],
    price: 180,
    status: "available",
  },
  {
    id: "ras-de-cou-rouge",
    ref: 29,
    images: img(29),
    collection: "cristal",
    title: L("Parure ras-de-cou fleurie", "Floral choker set", "طقم العقد القصير المزهّر"),
    description: R(
      [
        "Un collier ras-de-cou en acier inoxydable doré qui s'épanouit en un pendentif central et des motifs floraux latéraux, sertis de cristaux scintillants et de pampilles de pierres rouges. Boucles d'oreilles pendantes assorties.",
      ],
      [
        "A gold-tone stainless steel choker that blossoms into a central pendant and side floral motifs, set with sparkling crystals and red stone tassels. Matching drop earrings.",
      ],
      [
        "عقد قصير من الفولاذ الذهبي يتفتّح في تعليقة وسطى وزخارف زهرية جانبية، مرصّعة ببلّورات لامعة وشرّابات من الأحجار الحمراء، مع أقراط متدلّية متناسقة.",
      ],
    ),
    pieces: ["necklace", "earrings"],
    price: 240,
    status: "available",
  },
  {
    id: "degrade-ambre",
    ref: 30,
    images: img(30),
    collection: "cristal",
    title: L("Parure dégradé ambré", "Amber-gradient set", "طقم التدرّج الكهرماني"),
    description: R(
      [
        "Un collier à plusieurs rangs de perles de cristal facettées, en dégradé du jaune ambré à l'orange et au brun cuivré, avec un pendentif ovale à pierre sombre entourée de petits cristaux. Les boucles d'oreilles sont de petites créoles dorées à pampilles de cristal.",
        "Monture en acier inoxydable doré.",
      ],
      [
        "A multi-strand necklace of faceted crystal beads, shading from amber yellow to orange and copper brown, with an oval pendant holding a dark stone ringed by small crystals. The earrings are small gold hoops with crystal drops.",
        "Gold-tone stainless steel setting.",
      ],
      [
        "عقد بعدّة صفوف من الخرز البلّوري المشطوف، يتدرّج من الأصفر الكهرماني إلى البرتقالي والبنّي النحاسي، مع تعليقة بيضاوية بحجر داكن تحيط به بلّورات صغيرة. والأقراط حلقات ذهبية صغيرة بشرّابات بلّورية.",
        "التركيب من الفولاذ الذهبي.",
      ],
    ),
    pieces: ["necklace", "earrings"],
    price: 110,
    status: "available",
  },
  {
    id: "grenat-multirangs",
    ref: 31,
    images: img(31),
    collection: "cristal",
    title: L("Collier grenat multirangs", "Multi-strand garnet necklace", "عقد العقيق القرمزي متعدّد الصفوف"),
    description: R(
      [
        "Un collier ras-de-cou à plusieurs rangs de perles de grenat synthétique, bordeaux et sombres, fermé par un fermoir en acier inoxydable serti de strass qui illumine la nuque.",
      ],
      [
        "A multi-strand choker of synthetic garnet beads in dark burgundy, closed by a rhinestone-set stainless steel clasp that lights up the nape of the neck.",
      ],
      [
        "عقد قصير بعدّة صفوف من خرز العقيق القرمزي الصناعي بلون عنّابي داكن، يُغلق بقفل من الفولاذ مرصّع بالستراس يضيء مؤخّرة العنق.",
      ],
    ),
    pieces: ["necklace"],
    price: 110,
    status: "available",
  },
  {
    id: "florale-violette",
    ref: 32,
    images: img(32),
    collection: "cristal",
    title: L("Parure fleur violette", "Violet flower set", "طقم الزهرة البنفسجية"),
    description: R(
      [
        "Une fine chaîne en acier inoxydable porte un pendentif floral serti de cristaux Swarovski blancs et violets, terminé de pampilles de perles rouges et de cristal. Les boucles d'oreilles pendantes reprennent la même fleur, sertie de blanc et de grenat.",
      ],
      [
        "A fine stainless steel chain carries a floral pendant set with white and violet Swarovski crystals, finished with red bead and crystal tassels. The drop earrings repeat the flower, set in white and garnet red.",
      ],
      [
        "سلسلة رقيقة من الفولاذ تحمل تعليقة زهرية مرصّعة ببلّور سواروفسكي أبيض وبنفسجي، تنتهي بشرّابات من الخرز الأحمر والبلّور. والأقراط المتدلّية تستعيد الزهرة نفسها بالأبيض والعنّابي.",
      ],
    ),
    pieces: ["necklace", "earrings"],
    price: 145,
    status: "available",
  },
  {
    id: "collerette-rose",
    ref: 33,
    images: img(33),
    collection: "cristal",
    title: L("Collier collerette rose", "Pink crystal collar necklace", "عقد الطوق الوردي"),
    description: R(
      [
        "Une chaîne argentée délicate et une collerette de cristaux facettés rose tendre, bordée d'une frange de baguettes de cristal transparent et de rangées de strass. Fermoir mousqueton argenté.",
      ],
      [
        "A delicate silver chain and a collar of soft pink faceted crystals, edged with a fringe of clear crystal baguettes and rows of rhinestones. Silver lobster clasp.",
      ],
      [
        "سلسلة فضية رقيقة وطوق من البلّور المشطوف بلون وردي ناعم، تحفّه أهداب من قطع البلّور الشفّاف وصفوف من الستراس، بقفل فضي.",
      ],
    ),
    pieces: ["necklace"],
    price: 95,
    status: "available",
  },
  {
    id: "orientale",
    ref: 34,
    images: img(34),
    collection: "cristal",
    title: L("Parure orientale", "Oriental set", "الطقم الشرقي"),
    description: R(
      [
        "Une chaîne dorée en acier inoxydable, un médaillon et des boucles d'oreilles pendantes au dessin oriental, sertis de cristaux Swarovski et ornés de perles de grenat synthétique aux reflets profonds.",
      ],
      [
        "A gold-tone stainless steel chain, a medallion and drop earrings with an oriental design, set with Swarovski crystals and adorned with deep-toned synthetic garnet beads.",
      ],
      [
        "سلسلة ذهبية من الفولاذ، وميدالية وأقراط متدلّية بتصميم شرقي، مرصّعة ببلّور سواروفسكي ومزيّنة بخرز العقيق القرمزي الصناعي بانعكاسات عميقة.",
      ],
    ),
    pieces: ["necklace", "earrings"],
    price: 180,
    status: "available",
  },

  /* -------------------------------------------------------------- Fillettes */
  {
    id: "coeur-pastel",
    ref: 36,
    images: img(36, 35),
    collection: "fillettes",
    title: L("Parure cœur pastel", "Pastel heart set", "طقم القلب الباستيل"),
    description: R(
      [
        "Un collier et un bracelet de perles aux teintes pastel, au fini néon qui leur donne une lueur vive. Le collier porte un cœur en verre de Murano qui renferme une spirale violette et blanche.",
      ],
      [
        "A necklace and bracelet of pastel beads with a neon finish that gives them a bright glow. The necklace carries a Murano glass heart enclosing a violet and white swirl.",
      ],
      [
        "عقد وسوار من خرز بألوان الباستيل بلمسة نيون تمنحه توهّجاً زاهياً. ويحمل العقد قلباً من زجاج مورانو بداخله دوّامة بنفسجية وبيضاء.",
      ],
    ),
    pieces: ["necklace", "bracelet"],
    price: 90,
    status: "available",
  },
  {
    id: "murano-fleurs",
    ref: 37,
    images: img(37),
    collection: "fillettes",
    title: L("Parure Murano fleurie", "Murano flower set", "طقم مورانو المزهّر"),
    description: R(
      [
        "Un collier et des boucles d'oreilles en acier inoxydable argenté, ornés de perles et de pendentifs rectangulaires en verre de Murano aux motifs floraux multicolores, et de perles facettées qui captent la lumière.",
      ],
      [
        "A necklace and earrings in silver-tone stainless steel, with Murano glass beads and rectangular pendants in multicoloured floral patterns, and faceted beads that catch the light.",
      ],
      [
        "عقد وأقراط من الفولاذ الفضي، مزيّنة بخرز وتعليقات مستطيلة من زجاج مورانو بزخارف زهرية ملوّنة، وخرز مشطوف يلتقط الضوء.",
      ],
    ),
    pieces: ["necklace", "earrings"],
    price: 95,
    status: "available",
  },
  {
    id: "eclat-boreal",
    ref: 38,
    images: img(38),
    collection: "fillettes",
    title: L("Parure « Éclat boréal »", "“Aurora Glow” set", "طقم «وهج الشفق»"),
    description: R(
      [
        "Un collier, un bracelet et des boucles d'oreilles en perles de cristal Aurora, qui décomposent la lumière en reflets irisés — du bleu au rose, du vert au doré — selon l'angle et l'éclairage.",
        "La monture en acier inoxydable est dorée par PVD, une dorure bien plus tenace qu'un plaqué classique : ni rouille ni noircissement, même au contact de l'eau, et aucune irritation pour les peaux sensibles. Se nettoie à l'eau savonneuse, avec un chiffon doux.",
      ],
      [
        "A necklace, bracelet and earrings in Aurora crystal beads, which split light into iridescent glints — blue to pink, green to gold — depending on the angle and lighting.",
        "The stainless steel setting is PVD gold-plated, far more durable than ordinary plating: no rust or tarnish, even in contact with water, and gentle on sensitive skin. Clean with soapy water and a soft cloth.",
      ],
      [
        "عقد وسوار وأقراط من خرز بلّور «أورورا» الذي يحلّل الضوء إلى انعكاسات قزحية، من الأزرق إلى الوردي ومن الأخضر إلى الذهبي، حسب الزاوية والإضاءة.",
        "التركيب من الفولاذ المطلي بالذهب بتقنية PVD، وهو طلاء أمتن بكثير من الطلاء العادي: لا يصدأ ولا يسودّ حتى مع الماء، ولا يهيّج البشرة الحساسة. يُنظّف بالماء والصابون وقطعة قماش ناعمة.",
      ],
    ),
    pieces: ["necklace", "bracelet", "earrings"],
    price: 110,
    status: "available",
  },

  /* ----------------------------------------------------------------- Corail */
  {
    id: "morgane-1",
    ref: 46,
    images: img(46),
    collection: "corail",
    title: L("Collier Morgane I", "Morgane necklace I", "عقد مورغان I"),
    description: R(
      [
        "Un hommage aux trésors de la mer : des branches de corail rouge vif montées sur fil, et en leur centre un pendentif en coquillage poli aux nuances nacrées et ambrées.",
        "Fait main, pièce unique. Style marin, bohème chic.",
      ],
      [
        "A tribute to the treasures of the sea: bright red coral branches strung on thread, centred on a polished shell pendant in pearly, amber tones.",
        "Handmade, one of a kind. Marine, boho-chic style.",
      ],
      [
        "تحيّة لكنوز البحر: أغصان من المرجان الأحمر الزاهي منظومة في خيط، تتوسّطها تعليقة من صدفة مصقولة بألوان لؤلؤية وكهرمانية.",
        "صناعة يدوية، قطعة فريدة. أسلوب بحري بلمسة بوهيمية.",
      ],
    ),
    pieces: ["necklace"],
    status: "sold",
  },
  {
    id: "morgane-2",
    ref: 47,
    images: img(47),
    collection: "corail",
    title: L("Collier Morgane II", "Morgane necklace II", "عقد مورغان II"),
    description: R(
      [
        "Des branches de corail rouge vif montées sur fil, et un pendentif en coquillage véritable, poli, aux reflets nacrés et ambrés.",
        "Fait main, pièce unique.",
      ],
      [
        "Bright red coral branches strung on thread, with a genuine polished shell pendant in pearly, amber tones.",
        "Handmade, one of a kind.",
      ],
      [
        "أغصان من المرجان الأحمر الزاهي منظومة في خيط، مع تعليقة من صدفة حقيقية مصقولة بانعكاسات لؤلؤية وكهرمانية.",
        "صناعة يدوية، قطعة فريدة.",
      ],
    ),
    pieces: ["necklace"],
    status: "sold",
  },
  {
    id: "bracelet-corail",
    ref: 48,
    images: img(48),
    collection: "corail",
    title: L("Bracelet corail rouge", "Red coral bracelet", "سوار المرجان الأحمر"),
    description: R(
      [
        "Des fragments de branches de corail rouge de Méditerranée (Corallium rubrum), non teint, gardés dans leur forme naturelle et irrégulière : un rouge profond, différent d'un fragment à l'autre.",
        "Fermoir mousqueton en argent 925 poli, dont l'éclat répond au rouge mat du corail.",
      ],
      [
        "Branch fragments of undyed Mediterranean red coral (Corallium rubrum), kept in their natural, irregular shapes: a deep red that varies from piece to piece.",
        "Polished 925 silver lobster clasp, its shine answering the coral's matte red.",
      ],
      [
        "قطع من أغصان المرجان الأحمر المتوسطي (Corallium rubrum) غير المصبوغ، محفوظة في شكلها الطبيعي غير المنتظم: أحمر عميق يختلف من قطعة إلى أخرى.",
        "القفل من الفضة 925 المصقولة، يقابل لمعانُه أحمرَ المرجان المطفأ.",
      ],
    ),
    pieces: ["bracelet"],
    status: "sold",
  },

  /* ---------------------------------------------------------------- Boucles */
  {
    id: "fleur-doree-turquoise",
    ref: 49,
    images: img(49),
    collection: "boucles",
    title: L("Boucles « Fleur dorée & turquoise »", "“Golden flower & turquoise” earrings", "أقراط «الزهرة الذهبية والفيروز»"),
    description: R(
      [
        "Une fleur dorée finement texturée, une perle de turquoise rehaussée de corail, puis un pendant conique doré au motif tressé : un volume unique et un porté très élégant. Fermoir à clou.",
        "Pour préserver la turquoise et la dorure, éviter l'eau, les parfums et les produits chimiques ; essuyer avec un chiffon doux et sec.",
      ],
      [
        "A finely textured gold flower, a turquoise bead accented with coral, then a conical gold drop with a braided pattern: a distinctive volume and a very elegant look. Stud fastening.",
        "To protect the turquoise and the gilding, avoid water, perfume and chemicals; wipe with a soft, dry cloth.",
      ],
      [
        "زهرة ذهبية دقيقة النقش، ثم خرزة فيروز تزيّنها لمسات من المرجان، ثم تعليقة ذهبية مخروطية بنقش مضفور: حجم مميّز وإطلالة أنيقة. تُثبّت بمسمار.",
        "للحفاظ على الفيروز والطلاء الذهبي، تجنّبي الماء والعطور والمواد الكيميائية، وامسحيها بقطعة قماش ناعمة وجافة.",
      ],
    ),
    pieces: ["earrings"],
    status: "sold",
  },
  {
    id: "cascade-corail",
    ref: 50,
    images: img(50),
    collection: "boucles",
    title: L("Boucles « Cascade de corail »", "“Coral cascade” earrings", "أقراط «شلّال المرجان»"),
    description: R(
      [
        "Une fleur blanche nacrée surmontée d'un éclat de turquoise brute, deux rangs de pépites de corail rouge vif, et des perles de culture d'eau douce aux formes baroques en fin de cascade. Sur crochets d'oreilles.",
        "Éviter le parfum, la laque et l'eau ; essuyer après chaque port avec un chiffon doux et sec.",
      ],
      [
        "A pearly white flower topped with a raw turquoise chip, two strands of bright red coral nuggets, and baroque freshwater cultured pearls at the end of the cascade. On hook fittings.",
        "Avoid perfume, hairspray and water; wipe with a soft, dry cloth after each wear.",
      ],
      [
        "زهرة بيضاء لؤلؤية تعلوها قطعة فيروز خام، وصفّان من قطع المرجان الأحمر الزاهي، ولؤلؤ مستزرع من المياه العذبة بأشكال باروكية في آخر الشلّال. على خطّافات.",
        "تجنّبي العطر ومثبّت الشعر والماء، وامسحيها بعد كل استعمال بقطعة قماش ناعمة وجافة.",
      ],
    ),
    pieces: ["earrings"],
    price: 65,
    status: "available",
  },

  /* -------------------------------------------------------------- Bracelets */
  {
    id: "bracelet-spirale",
    ref: 51,
    images: img(51),
    collection: "bracelets",
    title: L("Bracelet spirale multicolore", "Multicoloured spiral bracelet", "سوار الحلزون الملوّن"),
    description: R(
      [
        "Un bracelet coulissant réglable, sur une fine chaîne argentée, orné d'une spirale de cristaux en navette aux couleurs vives : bleu, vert, orange, violet et jaune.",
      ],
      [
        "An adjustable slider bracelet on a fine silver chain, adorned with a spiral of marquise-cut crystals in bright colours: blue, green, orange, violet and yellow.",
      ],
      [
        "سوار منزلق قابل للتعديل على سلسلة فضية رقيقة، تزيّنه دوّامة من البلّورات البيضاوية المدبّبة بألوان زاهية: الأزرق والأخضر والبرتقالي والبنفسجي والأصفر.",
      ],
    ),
    pieces: ["bracelet"],
    price: 35,
    status: "available",
  },
  {
    id: "bracelet-medaillon",
    ref: 52,
    images: img(52),
    collection: "bracelets",
    title: L("Bracelet médaillon", "Medallion bracelet", "سوار الميدالية"),
    description: R(
      [
        "Un bracelet coulissant réglable en acier inoxydable. Au centre, un médaillon rond à deux rangs — cristaux bleu foncé à l'intérieur, transparents à l'extérieur — encadre de petits motifs scintillants.",
      ],
      [
        "An adjustable stainless steel slider bracelet. At its centre, a round two-row medallion — dark blue crystals inside, clear ones outside — frames small sparkling motifs.",
      ],
      [
        "سوار منزلق قابل للتعديل من الفولاذ المقاوم للصدأ، تتوسّطه ميدالية دائرية بصفّين من البلّور، أزرق داكن من الداخل وشفّاف من الخارج، تحيط بزخارف صغيرة لامعة.",
      ],
    ),
    pieces: ["bracelet"],
    price: 35,
    status: "available",
  },
  {
    id: "bracelet-oeil-de-tigre",
    ref: 53,
    images: img(53),
    collection: "bracelets",
    title: L("Bracelet œil de tigre", "Tiger's eye bracelet", "سوار عين النمر"),
    description: R(
      [
        "Au centre, des pépites brutes et des perles d'œil de tigre véritable, du brun doré au noir. Autour, une alternance de perles nacrées blanches et de petites perles violettes, synthétiques.",
        "Fermoir mousqueton argenté et chaînette d'extension, pour s'ajuster à tous les poignets.",
      ],
      [
        "At the centre, raw nuggets and beads of genuine tiger's eye, from golden brown to black. Around them, alternating white pearly beads and small violet beads, both synthetic.",
        "Silver lobster clasp and extender chain, to fit any wrist.",
      ],
      [
        "في الوسط قطع خام وخرز من عين النمر الحقيقية، من البنّي الذهبي إلى الأسود، وحولها يتناوب خرز لؤلؤي أبيض وخرز بنفسجي صغير، صناعيّان.",
        "قفل فضي وسلسلة تمديد تناسب كل المعاصم.",
      ],
    ),
    pieces: ["bracelet"],
    price: 35,
    status: "available",
  },
  {
    id: "bracelet-amethyste",
    ref: 54,
    images: img(54),
    collection: "bracelets",
    title: L("Bracelet améthyste", "Amethyst bracelet", "سوار الجمشت"),
    description: R(
      [
        "Au centre, des pépites brutes et des perles d'améthyste véritable, violettes et lilas. Autour, une alternance de perles nacrées blanches et de petites perles violettes, synthétiques.",
        "Fermoir mousqueton argenté et chaînette d'extension.",
      ],
      [
        "At the centre, raw nuggets and beads of genuine amethyst in violet and lilac. Around them, alternating white pearly beads and small violet beads, both synthetic.",
        "Silver lobster clasp and extender chain.",
      ],
      [
        "في الوسط قطع خام وخرز من الجمشت الحقيقي بالبنفسجي والليلكي، وحولها يتناوب خرز لؤلؤي أبيض وخرز بنفسجي صغير، صناعيّان.",
        "قفل فضي وسلسلة تمديد.",
      ],
    ),
    pieces: ["bracelet"],
    price: 35,
    status: "available",
  },
  {
    id: "bracelet-noir-et-blanc",
    ref: 55,
    images: img(55),
    collection: "bracelets",
    title: L("Bracelet noir et blanc", "Black & white bracelet", "سوار الأبيض والأسود"),
    description: R(
      [
        "Au centre, des pierres véritables — pépites brutes et perles rondes, sombres et cristallines — assemblées en une délicate forme florale. Autour, des perles noires en pierre naturelle alternent avec des perles nacrées blanches synthétiques.",
        "Fermoir mousqueton argenté et chaînette d'extension.",
      ],
      [
        "At the centre, genuine stones — raw nuggets and round beads, dark and crystal-clear — gathered into a delicate flower. Around them, black natural-stone beads alternate with white synthetic pearly beads.",
        "Silver lobster clasp and extender chain.",
      ],
      [
        "في الوسط أحجار حقيقية، قطع خام وخرز دائري داكن وبلّوري، مجمّعة في شكل زهرة رقيقة، وحولها يتناوب خرز أسود من الحجر الطبيعي وخرز لؤلؤي أبيض صناعي.",
        "قفل فضي وسلسلة تمديد.",
      ],
    ),
    pieces: ["bracelet"],
    price: 35,
    status: "available",
  },
  {
    id: "bracelet-murano",
    ref: 56,
    images: img(56),
    collection: "bracelets",
    title: L("Bracelet Murano millefiori", "Murano millefiori bracelet", "سوار مورانو ميلّيفيوري"),
    description: R(
      [
        "De grandes perles ovales en verre de Murano au motif traditionnel millefiori — de petites fleurs bleues, rouges, orange et vertes prises dans le verre — séparées par des perles facettées translucides. Monté sur fil élastique, il s'enfile facilement.",
      ],
      [
        "Large oval Murano glass beads in the traditional millefiori pattern — tiny blue, red, orange and green flowers set in the glass — separated by translucent faceted beads. Strung on elastic, it slips on easily.",
      ],
      [
        "خرز بيضاوي كبير من زجاج مورانو بنقش «ميلّيفيوري» التقليدي، زهور صغيرة زرقاء وحمراء وبرتقالية وخضراء داخل الزجاج، يفصل بينها خرز مشطوف شفّاف. على خيط مطّاطي يُلبس بسهولة.",
      ],
    ),
    pieces: ["bracelet"],
    price: 35,
    status: "available",
  },

  /* ------------------------------------------------------------------- Inox */
  {
    id: "cristal-emeraude",
    ref: 57,
    images: img(57),
    collection: "inox",
    title: L("Parure cristal émeraude", "Emerald crystal set", "طقم البلّور الزمرّدي"),
    description: R(
      [
        "Une chaîne aux maillons torsadés, texturée et légère, porte un pendentif floral : quatre cristaux vert émeraude taillés en poire autour d'un cristal rond. Boucles d'oreilles assorties.",
        "Acier inoxydable doré par PVD : il résiste à l'eau, à la transpiration, au parfum et à la ternissure, et convient aux peaux sensibles. Il se porte tous les jours, même à la mer.",
      ],
      [
        "A chain of twisted links, textured and light, carries a floral pendant: four pear-cut emerald-green crystals around a round one. Matching earrings.",
        "PVD gold-plated stainless steel: resistant to water, sweat, perfume and tarnish, and gentle on sensitive skin. Wear it every day, even at the beach.",
      ],
      [
        "سلسلة بحلقات ملتوية، خفيفة ومنقوشة، تحمل تعليقة زهرية: أربع بلّورات بلون الزمرّد على شكل إجاصة حول بلّورة دائرية، مع أقراط متناسقة.",
        "فولاذ مطلي بالذهب بتقنية PVD: يقاوم الماء والعرق والعطر ولا يبهت، ويناسب البشرة الحساسة. يُلبس كل يوم، حتى في البحر.",
      ],
    ),
    pieces: ["necklace", "earrings"],
    price: 100,
    status: "available",
  },
  {
    id: "collier-oeuf",
    ref: 58,
    images: img(58),
    collection: "inox",
    title: L("Collier œuf ajouré", "Openwork egg necklace", "عقد البيضة المخرّمة"),
    description: R(
      [
        "Une chaîne dorée à maillons allongés, ponctuée de nœuds texturés, et un pendentif en forme d'œuf d'inspiration Fabergé, ajouré en losanges et pavé de strass. Acier inoxydable doré.",
      ],
      [
        "A gold chain of elongated links punctuated by textured knots, with a Fabergé-inspired egg pendant, openworked in diamond shapes and paved with rhinestones. Gold-tone stainless steel.",
      ],
      [
        "سلسلة ذهبية بحلقات مستطيلة تتخلّلها عُقد منقوشة، وتعليقة على شكل بيضة مستوحاة من فابرجيه، مخرّمة بالمعيّنات ومرصّعة بالستراس. فولاذ ذهبي.",
      ],
    ),
    pieces: ["necklace"],
    price: 80,
    status: "available",
  },
  {
    id: "elegance-sautoir",
    ref: 59,
    images: img(59),
    collection: "inox",
    title: L("Parure « Élégance » sautoir et bracelet", "“Élégance” long necklace & bracelet", "طقم «أناقة»: عقد طويل وسوار"),
    description: R(
      [
        "Un sautoir fluide et son bracelet assorti, en maille texturée d'acier inoxydable de haute qualité, avec fermoir mousqueton. Chaque pièce porte le poinçon « ACIER INOXYDABLE ».",
        "Sans nickel, il ne noircit pas, ne rouille pas et garde son éclat.",
      ],
      [
        "A fluid long necklace and its matching bracelet, in textured high-quality stainless steel mesh, with a lobster clasp. Each piece is stamped “ACIER INOXYDABLE”.",
        "Nickel-free, it does not tarnish or rust and keeps its shine.",
      ],
      [
        "عقد طويل انسيابي وسوار متناسق، بحياكة منقوشة من الفولاذ المقاوم للصدأ عالي الجودة، بقفل كلّاب. كل قطعة تحمل ختم «ACIER INOXYDABLE».",
        "خالٍ من النيكل، لا يسودّ ولا يصدأ ويحافظ على بريقه.",
      ],
    ),
    pieces: ["longNecklace", "bracelet"],
    price: 95,
    status: "available",
  },
  {
    id: "solaire",
    ref: 60,
    images: img(60),
    collection: "inox",
    title: L("Parure « Solaire »", "“Solaire” set", "طقم «الشمس»"),
    description: R(
      [
        "Un collier à chaîne fine torsadée et des boucles d'oreilles dormeuses. Le médaillon : un cabochon rond bleu océan pailleté d'or, dans une couronne de petits strass.",
        STEEL_FR,
      ],
      [
        "A fine twisted-chain necklace and lever-back earrings. The medallion: a round ocean-blue cabochon flecked with gold, in a crown of small rhinestones.",
        STEEL_EN,
      ],
      [
        "عقد بسلسلة رقيقة ملتوية وأقراط بمشبك مغلق. والميدالية حجر دائري بلون أزرق المحيط تتخلّله ومضات ذهبية، في إكليل من الستراس الصغير.",
        STEEL_AR,
      ],
    ),
    pieces: ["necklace", "earrings"],
    price: 65,
    status: "available",
  },
  {
    id: "tortue",
    ref: 71,
    images: img(71),
    collection: "inox",
    title: L("Parure « Tortue »", "“Turtle” set", "طقم «السلحفاة»"),
    description: R(
      [
        "Une chaîne fine ponctuée de petits strass sertis clos, et un pendentif tortue marine à la carapace pavée de strass. Les boucles d'oreilles pendantes reprennent la tortue, sur des crochets en acier inoxydable doré.",
      ],
      [
        "A fine chain dotted with small bezel-set rhinestones, and a sea turtle pendant with a rhinestone-paved shell. The drop earrings repeat the turtle, on gold-tone stainless steel hooks.",
      ],
      [
        "سلسلة رقيقة تتخلّلها حبّات ستراس صغيرة، وتعليقة سلحفاة بحرية ظهرها مرصّع بالستراس. والأقراط المتدلّية تستعيد السلحفاة على خطّافات من الفولاذ الذهبي.",
      ],
    ),
    pieces: ["necklace", "earrings"],
    price: 75,
    status: "available",
  },

  /* ----------------------------------------------------------------- Cuivre */
  {
    id: "cristal-bleu",
    ref: 6,
    images: img(6),
    collection: "cuivre",
    title: L("Parure cristal aux reflets bleus", "Blue-glint crystal set", "طقم الكريستال بالانعكاسات الزرقاء"),
    description: R(
      [
        "Une parure traditionnelle faite main, collier et boucles d'oreilles assortis, en cristal soigneusement choisi aux reflets bleus profonds et lumineux. Le cristal s'unit à une monture raffinée en cuivre plaqué or, et la ligne du pendentif central donne à la pièce un caractère élégant et intemporel.",
        "L'alliance parfaite du savoir-faire artisanal et de l'élégance contemporaine.",
      ],
      [
        "A handmade traditional set — necklace and matching earrings — in carefully chosen crystal with deep, bright blue glints. The crystal is joined to a fine gold-plated copper setting, and the line of the central pendant gives the piece an elegant, timeless character.",
        "The perfect union of handcraft and contemporary elegance.",
      ],
      [
        "طقم تقليدي يدوي يتكوّن من عقد وأقراط متناسقة، مصنوع بدقّة من كريستال منتقى بعناية يتميّز بانعكاسات زرقاء عميقة ومشرقة. يجمع الطقم بين الكريستال وهيكل فاخر من النحاس المغطّس في الذهب، بتصميم ينسجم فيه خطّ التعليقة المركزية ليمنح القطعة طابعاً راقياً وخالداً.",
        "تجسيد مثالي للجمع بين مهارة الصنعة اليدوية والأناقة المعاصرة.",
      ],
    ),
    pieces: ["necklace", "earrings"],
    status: "sold",
  },
  {
    id: "croissants",
    ref: 61,
    images: img(61),
    collection: "cuivre",
    title: L("Parure traditionnelle aux croissants", "Traditional crescent set", "طقم الأهلّة التقليدي"),
    description: R(
      [
        "Inspirée du patrimoine : une parure plaquée or au dessin traditionnel de croissants, aux détails minutieux. Élégante et majestueuse, pour les tenues de fête.",
      ],
      [
        "Inspired by heritage: a gold-plated set with a traditional crescent design and fine detailing. Elegant and majestic, for festive outfits.",
      ],
      [
        "مستوحى من التراث: طقم فاخر من الحليّ التقليدية المطلية بالذهب، بتصميم هلالي أصيل وتفاصيل دقيقة تعكس عراقة التراث. أنيق ومهيب لإطلالات الأفراح.",
      ],
    ),
    price: 230,
    status: "available",
  },
  {
    id: "filigrane-irisee",
    ref: 62,
    images: img(62, 63),
    collection: "cuivre",
    title: L("Parure filigrane irisée", "Iridescent filigree set", "طقم التلّ القزحي"),
    description: R(
      [
        "Un collier et des boucles d'oreilles de perles facettées multicolores aux reflets irisés. La monture en cuivre plaqué or porte un pendentif et des motifs en filigrane — le tell traditionnel — d'où tombent de fines pampilles scintillantes.",
        "Lumineuse et raffinée, pour les grandes occasions.",
      ],
      [
        "A necklace and earrings of multicoloured faceted beads with iridescent glints. The gold-plated copper setting carries a pendant and filigree motifs — traditional tell work — from which fine sparkling tassels fall.",
        "Bright and refined, for special occasions.",
      ],
      [
        "طقم تقليدي يدوي من عقد وأقراط متناسقة، من خرز مشطوف متعدّد الألوان بانعكاسات قزحية ساحرة، بتعليقة فاخرة بتقنية التلّ التراثي من النحاس المغطّس في الذهب، تتدلّى منها شرّابات صغيرة متلألئة.",
        "قطعة مشرقة وراقية، مثالية للمناسبات الخاصة.",
      ],
    ),
    pieces: ["necklace", "earrings"],
    price: 350,
    status: "available",
  },
  {
    id: "resine-ambre",
    ref: 64,
    images: img(64),
    collection: "cuivre",
    title: L("Parure résine ambre", "Amber resin set", "طقم الراتنج العنبري"),
    description: R(
      [
        "Un collier en cuivre plaqué or orné de pièces de résine couleur ambre, avec un pendentif et des boucles d'oreilles en acier inoxydable plaqué or et résine ambre. La chaleur de l'ambre, la finesse d'un dessin moderne.",
      ],
      [
        "A gold-plated copper necklace adorned with amber-coloured resin pieces, with a pendant and earrings in gold-plated stainless steel and amber resin. The warmth of amber, the finesse of a modern design.",
      ],
      [
        "طقم يجمع دفء الكهرمان ورقّة التصميم العصري: سلسال من النحاس المغطّس في الذهب مزيّن بقطع من الراتنج العنبري، مع تعليقة وأقراط من الفولاذ المقاوم للصدأ (الإنوكس) المطلي بالذهب والراتنج العنبري.",
      ],
    ),
    pieces: ["necklace", "earrings"],
    price: 105,
    status: "available",
  },
  {
    id: "cabochons",
    ref: 65,
    images: img(65),
    collection: "cuivre",
    title: L("Parure aux cabochons", "Cabochon set", "طقم الفصوص"),
    description: R(
      [
        "Un collier en cuivre plaqué or aux motifs plaqués, et des boucles d'oreilles en acier inoxydable ornées de motifs plaqué or et de délicats cabochons.",
      ],
      [
        "A gold-plated copper necklace with plated motifs, and stainless steel earrings adorned with gold-plated motifs and delicate cabochons.",
      ],
      [
        "طقم أنيق بتصميم عصري: سلسال من النحاس المغطّس في الذهب مزيّن بزخارف مطلية، مع أقراط من الفولاذ المقاوم للصدأ (الإنوكس) بطابع مطلي بالذهب مرصّع بفصوص متألّقة.",
      ],
    ),
    pieces: ["necklace", "earrings"],
    price: 90,
    status: "available",
  },

  /* ----------------------------------------------------------------- Jouhar */
  {
    id: "jouhar-rose",
    ref: 66,
    images: img(66),
    collection: "jouhar",
    title: L("Parure jouhar et touches roses", "Jouhar set with pink accents", "طقم الجوهر الحرّ بلمسات وردية"),
    description: R(
      [
        "Un double collier de perles véritables (jouhar), un pendentif plaqué or serti de strass et de délicates touches roses, et des boucles d'oreilles assorties aux motifs plaqué or. Une création d'exception pour les plus belles tenues.",
      ],
      [
        "A double necklace of genuine jouhar pearls, a gold-plated pendant set with rhinestones and delicate pink accents, and matching earrings with gold-plated motifs. An exceptional piece for your finest outfits.",
      ],
      [
        "طقم فاخر: سلسال مزدوج من الجوهر الحرّ الأصيل، مع تعليقة مركزية مطلية بالذهب ومرصّعة بالستراس ولمسات وردية رقيقة، وأقراط متناسقة بنقوش مطلية بالذهب.",
      ],
    ),
    pieces: ["necklace", "earrings"],
    price: 380,
    status: "available",
  },
  {
    id: "jouhar-multirangs",
    ref: 67,
    images: img(67),
    collection: "jouhar",
    title: L("Parure jouhar multirangs", "Multi-strand jouhar set", "طقم الجوهر متعدّد السلاسل"),
    description: R(
      [
        "Un collier multirangs de perles véritables (jouhar) et de pierres colorées, avec un pendentif doré serti de strass et de pierres multicolores, et des boucles d'oreilles assorties. Entre tradition et élégance, pour les grandes occasions.",
      ],
      [
        "A multi-strand necklace of genuine jouhar pearls and coloured stones, with a gold pendant set with rhinestones and multicoloured stones, and matching earrings. Between tradition and elegance, for special occasions.",
      ],
      [
        "عقد متعدّد السلاسل من لآلئ الجوهر الحرّ البيضاء مع لمسات من الخرز والأحجار الملوّنة والذهبية، تتوسّطه تعليقة مذهّبة مرصّعة بأحجار ملوّنة وفصوص متألّقة، مع أقراط من الخامات والألوان نفسها. بين التراث والأناقة، للمناسبات الخاصة.",
      ],
    ),
    pieces: ["necklace", "earrings"],
    price: 390,
    status: "available",
  },
  {
    id: "eleganza",
    ref: 68,
    images: img(68),
    collection: "jouhar",
    title: L("Parure « Éléganza »", "“Éléganza” set", "طقم «إليغانزا»"),
    description: R(
      [
        "Un double rang de perles d'eau douce nacrées, un plastron de tubes bleu ciel et de franges de perles, et un médaillon serti de strass bordé de turquoise. Les boucles d'oreilles pendantes reprennent le tube bleu ciel et les finitions dorées.",
        "La tradition artisanale rencontre l'élégance d'aujourd'hui : pour les cérémonies et les grandes occasions.",
      ],
      [
        "A double strand of lustrous freshwater pearls, a bib of sky-blue tubes and pearl fringes, and a rhinestone medallion edged in turquoise. The drop earrings repeat the sky-blue tube and the gold finishes.",
        "Craft tradition meets today's elegance: for ceremonies and special occasions.",
      ],
      [
        "صفّان من لؤلؤ المياه العذبة اللامع، وصدرية من أنابيب بلون أزرق سماوي وأهداب من اللؤلؤ، وميدالية مرصّعة بالستراس بإطار فيروزي. والأقراط المتدلّية تستعيد الأنبوب السماوي واللمسات الذهبية.",
        "التقاليد الحِرفية بأناقة اليوم: للأفراح والمناسبات الكبرى.",
      ],
    ),
    pieces: ["necklace", "earrings"],
    price: 380,
    status: "available",
  },
  {
    id: "elegance-royale",
    ref: 69,
    images: img(69),
    collection: "jouhar",
    title: L("Collier « Élégance royale »", "“Royal Elegance” necklace", "عقد «الأناقة الملكية»"),
    description: R(
      [
        "Des rangs de perles fines (jouhar) et trois médaillons plaqués or, strass au centre et motifs floraux autour. Chaînette d'extension et fermoir en laiton plaqué or. Pour les mariages et les grandes occasions.",
      ],
      [
        "Strands of fine jouhar pearls and three gold-plated medallions, rhinestones at their centre and floral motifs around. Extender chain and gold-plated brass clasp. For weddings and special occasions.",
      ],
      [
        "صفوف من حبّات الجوهر الدقيقة وثلاث ميداليات مطلية بالذهب، في وسطها ستراس وحولها زخارف زهرية. سلسلة تمديد وقفل من النحاس المغطّس في الذهب. للأعراس والمناسبات الكبرى.",
      ],
    ),
    pieces: ["necklace"],
    price: 145,
    status: "available",
  },
  {
    id: "cristal-noir",
    ref: 70,
    images: img(70),
    collection: "jouhar",
    title: L("Parure cristal noir", "Black crystal set", "طقم الكريستال الأسود"),
    description: R(
      [
        "Un double collier de cristal noir scintillant, un pendentif plaqué or serti de strass, et des boucles d'oreilles assorties. Un look élégant et mystérieux.",
      ],
      [
        "A double necklace of sparkling black crystal, a gold-plated pendant set with rhinestones, and matching earrings. An elegant, mysterious look.",
      ],
      [
        "طقم فاخر: سلسال مزدوج من الكريستال الأسود المتلألئ، مع تعليقة مركزية مطلية بالذهب ومرصّعة بالستراس، وأقراط متناسقة بنقوش مطلية بالذهب وقطع سوداء متألّقة.",
      ],
    ),
    pieces: ["necklace", "earrings"],
    status: "sold",
  },

  /* ------------------------------------------------------------------ Homme */
  {
    id: "bracelet-pyrite",
    ref: 72,
    images: img(72),
    collection: "homme",
    title: L("Bracelet pyrite", "Pyrite bracelet", "سوار البيريت"),
    description: R(
      [
        "Des perles de pyrite naturelle facettées de 10 mm, à l'éclat métallique et aux stries naturelles — « l'or des fous ». Au centre, une perle en laiton rhodié micro-pavée de zircons clairs.",
        "Sur cordon élastique résistant : taille unique.",
      ],
      [
        "Faceted 10 mm natural pyrite beads, with a metallic sheen and natural striations — “fool's gold”. At the centre, a rhodium-plated brass bead micro-paved with clear zircons.",
        "On strong elastic cord: one size fits all.",
      ],
      [
        "خرز من البيريت الطبيعي المشطوف بقطر 10 مم، ببريق معدني وخطوط طبيعية، ويُسمّى «ذهب المغفّلين». في الوسط خرزة من النحاس المطلي بالروديوم مرصّعة بزركون شفّاف دقيق.",
        "على خيط مطّاطي متين: مقاس واحد.",
      ],
    ),
    virtues: L(
      "Pierre d'action, de volonté et d'abondance, la pyrite protège et ancre les énergies dispersées.",
      "A stone of action, willpower and abundance, pyrite protects and grounds scattered energy.",
      "البيريت حجر الفعل والإرادة والوفرة، يحمي ويُرسّخ الطاقة المشتّتة.",
    ),
    pieces: ["bracelet"],
    price: 140,
    status: "available",
  },
  {
    id: "bracelet-tourmaline-noire",
    ref: 73,
    images: img(73),
    collection: "homme",
    title: L("Bracelet tourmaline noire", "Black tourmaline bracelet", "سوار التورمالين الأسود"),
    description: R(
      [
        "Des perles polies de tourmaline noire (schorl), d'un noir profond, et une perle centrale pavée de zircons noirs.",
      ],
      [
        "Polished beads of deep black tourmaline (schorl), with a central bead paved with black zircons.",
      ],
      [
        "خرز مصقول من التورمالين الأسود (الشورل) بلون أسود عميق، وخرزة وسطى مرصّعة بالزركون الأسود.",
      ],
    ),
    virtues: L(
      "Pierre de protection et d'ancrage parmi les plus réputées, elle passe pour absorber les énergies négatives et apporter un sentiment de sécurité.",
      "One of the best-known stones of protection and grounding, it is said to absorb negative energy and bring a sense of security.",
      "من أشهر أحجار الحماية والثبات، يُقال إنه يمتصّ الطاقات السلبية ويبعث الشعور بالأمان.",
    ),
    pieces: ["bracelet"],
    price: 80,
    status: "available",
  },
  {
    id: "bracelet-tourmaline-oeil-vert",
    ref: 74,
    images: img(74),
    collection: "homme",
    title: L("Bracelet tourmaline et œil de tigre vert", "Tourmaline & green tiger's eye bracelet", "سوار التورمالين وعين النمر الخضراء"),
    description: R(
      [
        "Tourmaline noire et œil de tigre vert, aux reflets soyeux vert forêt et émeraude, avec une perle centrale pavée de zircons.",
      ],
      [
        "Black tourmaline and green tiger's eye, with silky forest- and emerald-green glints, and a central bead paved with zircons.",
      ],
      [
        "التورمالين الأسود وعين النمر الخضراء بانعكاسات حريرية بالأخضر الغابي والزمرّدي، مع خرزة وسطى مرصّعة بالزركون.",
      ],
    ),
    virtues: L(
      "La tourmaline noire absorbe les énergies négatives et ancre ; l'œil de tigre vert donne confiance et persévérance, avec calme. Ensemble : la stabilité et l'élan pour avancer.",
      "Black tourmaline absorbs negative energy and grounds; green tiger's eye brings calm confidence and perseverance. Together: stability, and the drive to move forward.",
      "التورمالين الأسود يمتصّ الطاقات السلبية ويُرسّخ، وعين النمر الخضراء تمنح الثقة والمثابرة بهدوء. معاً: الثبات والدفع إلى الأمام.",
    ),
    pieces: ["bracelet"],
    price: 80,
    status: "available",
  },
  {
    id: "bracelet-lave",
    ref: 75,
    images: img(75),
    collection: "homme",
    title: L("Bracelet pierre de lave", "Lava stone bracelet", "سوار الحجر البركاني"),
    description: R(
      [
        "Des perles de pierre de lave naturelle, poreuses et mates, et une perle centrale pavée de zircons noirs. Un style sobre, moderne et mixte, très léger à porter.",
        "Une ou deux gouttes d'huile essentielle ou de parfum sur la pierre poreuse, et le bracelet les diffuse doucement toute la journée.",
      ],
      [
        "Beads of natural lava stone, porous and matte, with a central bead paved with black zircons. Understated, modern and unisex, very light to wear.",
        "Add a drop or two of essential oil or perfume to the porous stone, and the bracelet gently diffuses it all day.",
      ],
      [
        "خرز من الحجر البركاني الطبيعي، مسامي ومطفأ، وخرزة وسطى مرصّعة بالزركون الأسود. أسلوب بسيط وعصري للجنسين، خفيف جداً.",
        "قطرة أو قطرتان من زيت عطري أو عطر على الحجر المسامي، فينشرها السوار بلطف طوال اليوم.",
      ],
    ),
    pieces: ["bracelet"],
    price: 45,
    status: "available",
  },
];
