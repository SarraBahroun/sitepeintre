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
const JUNGLE = "/images/oeuvres/animaux-hd.jpeg";

/** Série commune aux deux expositions. */
const jungleSeries = {
  fr: "The Jungle Series",
  en: "The Jungle Series",
  ar: "سلسلة قصة الغابة",
};

/** Collection des toiles de La Jungle 2. */
const jungle2 = {
  fr: "La Jungle 2",
  en: "La Jungle 2",
  ar: "الغابة 2",
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
      fr: [
        "L’exposition La Jungle 1, organisée au Palais du Baron Rodolphe d’Erlanger à Sidi Bou Saïd, a bénéficié d’une couverture médiatique de la part de Mosaïque FM, qui a accompagné cette expérience artistique à travers une série de reportages vidéo publiés sur sa chaîne YouTube officielle.",
        "Cette couverture vient documenter une facette de mon parcours plastique et mettre en lumière mon univers artistique, à travers lequel j’explore la relation entre la nature, les êtres vivants et l’humain. Les éléments de la jungle y dépassent leur simple présence naturelle pour devenir des symboles porteurs de dimensions humaines et philosophiques.",
        "J’ai le plaisir de partager ces reportages avec les visiteurs de mon site, afin qu’ils demeurent un témoignage médiatique de cette étape de mon parcours artistique.",
      ],
      en: [
        "The exhibition La Jungle 1, held at the Palace of Baron Rodolphe d’Erlanger in Sidi Bou Saïd, received media coverage from Mosaïque FM, which followed this artistic experience through a series of video reports published on its official YouTube channel.",
        "This coverage documents one facet of my artistic journey and sheds light on my artistic universe, in which I explore the relationship between nature, living beings and humankind. The elements of the jungle go beyond their mere natural presence to become symbols carrying human and philosophical dimensions.",
        "I am pleased to share these reports with the visitors of my website, so that they remain a media testimony to this stage of my artistic journey.",
      ],
      ar: [
        "حظي معرض «الغابة 1»، الذي احتضنه قصر البارون رودولف ديرلانجي بسيدي بوسعيد، بتغطية إعلامية من إذاعة موزاييك أف أم، التي واكبت هذه التجربة الفنية من خلال سلسلة من الروبورتاجات المصوّرة المنشورة على قناتها الرسمية على يوتيوب.",
        "توثّق هذه التغطية جانباً من مسيرتي التشكيلية، وتسلّط الضوء على عالمي الفني الذي أستكشف من خلاله العلاقة بين الطبيعة والكائنات الحية والإنسان؛ فعناصر الغابة تتجاوز فيه حضورها الطبيعي لتصبح رموزاً تحمل أبعاداً إنسانية وفلسفية.",
        "ويسعدني أن أشارك هذه الروبورتاجات مع زوّار موقعي، لتبقى شاهداً إعلامياً على هذه المرحلة من مسيرتي الفنية.",
      ],
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
    film: "RVRLLJYfi58",
    filmOutlet: "Mosaïque FM",
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
      fr: [
        "L’exposition Jungle 2, accueillie par la Galerie Jeelen à Nabeul, a bénéficié d’une couverture médiatique de la part de Radio Med, qui a accompagné cet événement artistique et mis en lumière l’expérience plastique de l’artiste Hana Bahroun, ses univers artistiques et sa vision créative au sein de la série Jungle.",
        "Cette couverture vient documenter une facette du parcours artistique de l’exposition, ainsi que les expressions visuelles et symboliques qu’elle porte, explorant la relation entre la nature, l’humain et l’imaginaire.",
      ],
      en: [
        "The exhibition Jungle 2, hosted by Galerie Jeelen in Nabeul, received media coverage from Radio Med, which followed this artistic event and highlighted the visual practice of the artist Hana Bahroun, her artistic worlds and her creative vision within the Jungle series.",
        "This coverage documents one facet of the exhibition’s artistic journey, as well as the visual and symbolic expressions it carries, exploring the relationship between nature, humankind and the imagination.",
      ],
      ar: [
        "حظي معرض «الغابة 2»، الذي احتضنه غاليري جيلان بنابل، بتغطية إعلامية من إذاعة راديو ماد، التي واكبت هذا الحدث الفني وسلّطت الضوء على التجربة التشكيلية للفنانة هناء بحرون، وعوالمها الفنية ورؤيتها الإبداعية ضمن سلسلة «الغابة».",
        "توثّق هذه التغطية جانباً من المسيرة الفنية للمعرض، وما يحمله من تعبيرات بصرية ورمزية تستكشف العلاقة بين الطبيعة والإنسان والخيال.",
      ],
    },
    cover: "/images/jungle-2/tableau-d.jpeg",
    backdrop: JUNGLE,
    accent: "glow",
    artworks: [
      {
        // le cheval blanc sous l'arcade
        id: "cheval-arcade",
        image: "/images/jungle-2/tableau-a.jpeg",
        title: {
          fr: "The Guardian of Threshold",
          en: "The Guardian of Threshold",
          ar: "The Guardian of Threshold",
        },
        collection: jungle2,
        symbolism: {
          fr: "The Guardian of Threshold incarne une présence majestueuse empreinte de noblesse et de mystère. Le cheval blanc, d'une pureté éclatante et sculpté par une lumière subtile, se dresse tel un gardien intemporel veillant sur l'espace sacré entre deux mondes.",
          en: "The Guardian of Threshold embodies a majestic presence steeped in nobility and mystery. The white horse, radiant in its purity and sculpted by a subtle light, stands like a timeless guardian watching over the sacred space between two worlds.",
          ar: "تجسّد لوحة «The Guardian of Threshold» حضوراً مهيباً يفيض نبلاً وغموضاً. فالحصان الأبيض، بنقائه الساطع وملامحه التي ينحتها ضوء خفيّ، ينتصب كحارس خالد يسهر على الفضاء المقدّس بين عالمين.",
        },
        description: {
          fr: "La composition s'articule autour d'un contraste saisissant entre la brillance de la robe équine et la richesse des tons chauds de l'arrière-plan, magnifiquement rehaussée par des moucharabiehs et des arabesques vert émeraude d'une grande finesse. La lanterne suspendue ainsi que la mosaïque en zellige au bas du tableau renforcent l'atmosphère spirituelle et architecturale du lieu. L'ensemble est sublimé par un cadre en or mat luxueux, qui apporte une note finale d'élégance et d'intemporalité.",
          en: "The composition rests on a striking contrast between the sheen of the horse's coat and the rich warm tones of the background, beautifully enhanced by finely worked mashrabiyas and emerald green arabesques. The hanging lantern and the zellige mosaic at the foot of the painting reinforce the spiritual and architectural atmosphere of the place. The whole is elevated by a luxurious matte gold frame, which adds a final note of elegance and timelessness.",
          ar: "تقوم التركيبة على تباين آسر بين لمعان جسد الحصان وثراء الألوان الدافئة في الخلفية، تزيده جمالاً مشربيات وزخارف أرابيسك بالأخضر الزمرّدي بالغة الدقة. ويعزّز الفانوس المعلّق وفسيفساء الزليج أسفل اللوحة الأجواء الروحانية والمعمارية للمكان. ويكتمل العمل بإطار فاخر بلون الذهب المطفي يضفي عليه لمسة أخيرة من الأناقة والخلود.",
        },
        technique: oilOnCanvas,
        framing: {
          fr: "Cadre en or doré mat luxueux",
          en: "Luxurious matte gold frame",
          ar: "إطار فاخر بلون الذهب المطفي",
        },
        dimensions: "115 × 140 cm",
        status: "available",
      },
      {
        // le corail rouge
        id: "corail",
        image: "/images/jungle-2/tableau-b.jpeg",
        title: {
          fr: "The Tree of the Living Ocean",
          en: "The Tree of the Living Ocean",
          ar: "The Tree of the Living Ocean",
        },
        collection: jungle2,
        symbolism: {
          fr: "The Tree of the Living Ocean offre une immersion spectaculaire dans les profondeurs marines, où le corail incandescent se dresse comme l'arbre de vie du monde aquatique.",
          en: "The Tree of the Living Ocean offers a spectacular immersion in the depths of the sea, where the incandescent coral rises like the tree of life of the aquatic world.",
          ar: "تقدّم لوحة «The Tree of the Living Ocean» غوصاً مذهلاً في أعماق البحر، حيث ينتصب المرجان المتوهّج كشجرة الحياة في العالم المائي.",
        },
        description: {
          fr: "Au cœur de la composition, les ramifications coralliennes d'un rouge écarlate et orangé s'élèvent avec une vitalité vibrante, créant un contraste saisissant avec l'immensité bleutée de l'océan. Les détails des reliefs marins, la richesse des textures minérales au premier plan et le jeu subtil de la lumière filtrée à travers l'eau célèbrent la biodiversité sous-marine et l'énergie sacrée des fonds marins. L'ensemble est magnifiquement mis en valeur par un cadre doré mat luxueux, qui apporte une note d'élégance intemporelle à cette fenêtre ouverte sur l'océan vivant.",
          en: "At the heart of the composition, the coral branches in scarlet red and orange rise with vibrant vitality, creating a striking contrast with the bluish immensity of the ocean. The details of the seabed, the rich mineral textures in the foreground and the subtle play of light filtered through the water celebrate underwater biodiversity and the sacred energy of the deep. The whole is beautifully set off by a luxurious matte gold frame, which adds a note of timeless elegance to this window opened onto the living ocean.",
          ar: "في قلب التركيبة، ترتفع أغصان المرجان بالأحمر القرمزي والبرتقالي بحيوية نابضة، في تباين آسر مع زرقة المحيط الشاسعة. وتحتفي تفاصيل التضاريس البحرية، وثراء الملامس المعدنية في المقدّمة، ولعبة الضوء الخفيّة المتسلّلة عبر الماء، بالتنوّع الحيوي تحت الماء وبالطاقة المقدّسة للأعماق. ويزيد العمل بهاءً إطار فاخر بلون الذهب المطفي يضفي لمسة من الأناقة الخالدة على هذه النافذة المفتوحة على المحيط الحي.",
        },
        technique: oilOnCanvas,
        framing: {
          fr: "Cadre luxueux en or doré mat",
          en: "Luxurious matte gold frame",
          ar: "إطار فاخر بلون الذهب المطفي",
        },
        dimensions: "115 × 100 cm",
        status: "available",
      },
      {
        // le tigre de lumière
        id: "tigre-de-lumiere",
        image: "/images/jungle-2/tableau-c.jpeg",
        title: {
          fr: "Pulse of the Jungle",
          en: "Pulse of the Jungle",
          ar: "Pulse of the Jungle",
        },
        collection: jungle2,
        symbolism: {
          fr: "Pulse of the Jungle saisit la pulsation vibrante et mystique de la vie sauvage à travers le regard perçant d'un tigre majestueux. Surgissant des profondeurs de l'obscurité, l'animal se dessine par un réseau complexe de lignes lumineuses aux reflets bleutés, évoquant l'énergie pure et le pouls invisible de la jungle nocturne.",
          en: "Pulse of the Jungle captures the vibrant, mystical pulse of wild life through the piercing gaze of a majestic tiger. Emerging from the depths of darkness, the animal takes shape through a complex network of luminous lines with bluish glints, evoking the pure energy and invisible heartbeat of the jungle at night.",
          ar: "تلتقط لوحة «Pulse of the Jungle» نبض الحياة البرية الحيّ والغامض من خلال النظرة الثاقبة لنمر مهيب. يبرز الحيوان من أعماق الظلمة، وتتشكّل ملامحه عبر شبكة معقّدة من الخطوط المضيئة ذات الانعكاسات الزرقاء، توحي بالطاقة الخالصة وبالنبض الخفيّ لغابة الليل.",
        },
        description: {
          fr: "Ses yeux intenses et perçants captent la lumière et retiennent l'attention, symbolisant la force intérieure, la conscience éveillée et le lien profond entre la bête et son habitat originel. L'ensemble est magnifiquement mis en valeur par un cadre luxueux en noir mat, qui renforce le contraste saisissant de cette vision électrique et insuffle une élégance intemporelle à l'œuvre.",
          en: "Its intense, piercing eyes catch the light and hold the attention, symbolising inner strength, awakened awareness and the deep bond between the beast and its original habitat. The whole is beautifully set off by a luxurious matte black frame, which heightens the striking contrast of this electric vision and lends the work a timeless elegance.",
          ar: "تلتقط عيناه الحادّتان الثاقبتان الضوء وتأسران الانتباه، رمزاً للقوة الداخلية والوعي اليقظ والرابطة العميقة بين الوحش وموطنه الأصلي. ويزيد العمل بهاءً إطار فاخر باللون الأسود المطفي يعزّز التباين الآسر لهذه الرؤية المتوهّجة ويمنح اللوحة أناقة خالدة.",
        },
        technique: oilOnCanvas,
        framing: {
          fr: "Cadre luxueux en noir mat",
          en: "Luxurious matte black frame",
          ar: "إطار فاخر باللون الأسود المطفي",
        },
        dimensions: "100 × 80 cm",
        status: "available",
      },
      {
        // le phénix d'or
        id: "phenix",
        image: "/images/jungle-2/tableau-d.jpeg",
        title: {
          fr: "Ethereal Flame",
          en: "Ethereal Flame",
          ar: "Ethereal Flame",
        },
        collection: jungle2,
        symbolism: {
          fr: "Ethereal Flame capture la splendeur et la puissance majestueuse d'une créature légendaire. Déployant ses ailes avec grâce, l'oiseau semble suspendu entre terre et ciel dans une étreinte incandescente.",
          en: "Ethereal Flame captures the splendour and majestic power of a legendary creature. Spreading its wings with grace, the bird seems suspended between earth and sky in an incandescent embrace.",
          ar: "تلتقط لوحة «Ethereal Flame» بهاء كائن أسطوري وقوته المهيبة. يبسط الطائر جناحيه برشاقة، فيبدو معلّقاً بين الأرض والسماء في عناق متوهّج.",
        },
        description: {
          fr: "L'application minutieuse de feuilles d'or crée des éclats précieux qui dansent à la surface du plumage, illuminant la composition d'une lueur divine et intemporelle.",
          en: "The meticulous application of gold leaf creates precious glints that dance across the plumage, illuminating the composition with a divine and timeless glow.",
          ar: "تخلق أوراق الذهب، الموضوعة بعناية دقيقة، بريقاً نفيساً يتراقص على سطح الريش، فيضيء التركيبة بوهج إلهي خالد.",
        },
        technique: {
          fr: "Huile sur toile et feuilles d'or",
          en: "Oil on canvas and gold leaf",
          ar: "زيت على قماش وأوراق الذهب",
        },
        framing: {
          fr: "Cadre luxueux en or mat",
          en: "Luxurious matte gold frame",
          ar: "إطار فاخر بلون الذهب المطفي",
        },
        dimensions: "100 × 100 cm",
        status: "available",
        featured: true,
      },
      {
        // le flamant rose
        id: "flamant-rose",
        image: "/images/jungle-2/tableau-e.jpeg",
        title: {
          fr: "Flame of Grace",
          en: "Flame of Grace",
          ar: "Flame of Grace",
        },
        collection: jungle2,
        symbolism: {
          fr: "Flame of Grace incarne la majesté et l'élégance fluide du flamant rose. Surgissant d'un fond sombre et mystérieux, l'oiseau se dresse comme une étincelle de vie lumineuse et vibrante.",
          en: "Flame of Grace embodies the majesty and fluid elegance of the pink flamingo. Emerging from a dark and mysterious background, the bird stands like a bright, vibrant spark of life.",
          ar: "تجسّد لوحة «Flame of Grace» جلال طائر النحام الوردي وأناقته الانسيابية. يبرز الطائر من خلفية داكنة غامضة، وينتصب كشرارة حياة مضيئة نابضة.",
        },
        description: { fr: "", en: "", ar: "" },
        technique: oilOnCanvas,
        framing: {
          fr: "Cadre luxueux en or mat",
          en: "Luxurious matte gold frame",
          ar: "إطار فاخر بلون الذهب المطفي",
        },
        dimensions: "100 × 80 cm",
        status: "sold",
      },
      {
        // l'aigle
        id: "aigle",
        image: "/images/jungle-2/tableau-f.jpeg",
        title: {
          fr: "The Sovereign Ascent",
          en: "The Sovereign Ascent",
          ar: "The Sovereign Ascent",
        },
        collection: jungle2,
        symbolism: {
          fr: "The Sovereign Ascent met en scène un aigle majestueux, symbole universel de liberté, de puissance et de vision. Surgissant des profondeurs d'un fond sombre et mystérieux, l'animal déploie ses ailes avec une précision anatomique saisissante, sculptées par des reflets lumineux et des teintes ambrées qui évoquent sa connexion intime avec le ciel et la lumière.",
          en: "The Sovereign Ascent portrays a majestic eagle, a universal symbol of freedom, power and vision. Emerging from the depths of a dark and mysterious background, the bird spreads its wings with striking anatomical precision, sculpted by luminous reflections and amber hues that evoke its intimate connection with the sky and the light.",
          ar: "تصوّر لوحة «The Sovereign Ascent» نسراً مهيباً، رمزاً كونياً للحرية والقوة وبُعد النظر. يبرز الطائر من أعماق خلفية داكنة غامضة، ويبسط جناحيه بدقة تشريحية آسرة، تنحتهما انعكاسات مضيئة وألوان كهرمانية توحي بصلته الحميمة بالسماء والضوء.",
        },
        description: {
          fr: "Plus qu'une simple représentation animalière, cette œuvre incarne la capacité à s'élever au-dessus des obstacles et à voir au-delà des limites terrestres. L'aigle y transmet un profond message de force intérieure et de courage face aux défis, servant de pont symbolique entre le monde matériel et le spirituel. Chaque coup de pinceau insuffle un mouvement dynamique et souverain, magnifiquement mis en valeur par un cadre luxueux en or doré mat qui ancre cette pièce dans une élégance intemporelle.",
          en: "More than a simple animal portrait, this work embodies the ability to rise above obstacles and to see beyond earthly limits. The eagle carries a deep message of inner strength and courage in the face of challenges, serving as a symbolic bridge between the material and the spiritual worlds. Each brushstroke breathes a dynamic, sovereign movement, beautifully set off by a luxurious matte gold frame that anchors the piece in timeless elegance.",
          ar: "أبعد من مجرّد تصوير لحيوان، يجسّد هذا العمل القدرة على السموّ فوق العقبات والنظر إلى ما وراء حدود الأرض. ويحمل النسر رسالة عميقة عن القوة الداخلية والشجاعة أمام التحديات، ليكون جسراً رمزياً بين العالمين المادي والروحي. وتبعث كل ضربة فرشاة حركة حيوية ومهيبة، يزيدها بهاءً إطار فاخر بلون الذهب المطفي يرسّخ هذه القطعة في أناقة خالدة.",
        },
        technique: oilOnCanvas,
        framing: {
          fr: "Cadre luxueux en or doré mat",
          en: "Luxurious matte gold frame",
          ar: "إطار فاخر بلون الذهب المطفي",
        },
        dimensions: "100 × 80 cm",
        status: "available",
      },
      {
        // la fleur iridescente
        id: "fleur-iridescente",
        image: "/images/jungle-2/tableau-g.jpeg",
        title: {
          fr: "Life’s Vortex",
          en: "Life’s Vortex",
          ar: "Life’s Vortex",
        },
        collection: jungle2,
        symbolism: {
          fr: "Life’s Vortex est une plongée fascinante au cœur de la puissance cosmique et organique de la nature. L'œuvre capture un tourbillon d'énergie pure où des formes végétales et célestes semblent fusionner dans un mouvement ascendant vertigineux.",
          en: "Life’s Vortex is a fascinating plunge into the heart of nature's cosmic and organic power. The work captures a whirlwind of pure energy in which plant and celestial forms seem to merge in a dizzying upward movement.",
          ar: "لوحة «Life’s Vortex» غوص آسر في قلب قوة الطبيعة الكونية والعضوية. يلتقط العمل دوّامة من الطاقة الخالصة تبدو فيها الأشكال النباتية والسماوية وكأنها تنصهر في حركة صاعدة تأخذ بالألباب.",
        },
        description: {
          fr: "Sur un fond sombre et mystérieux, les éclats de bleu luminescent, de vert turquoise et de nuances violettes créent une dynamique hypnotique. Le jeu raffiné de la lumière et des textures donne à ce vortex une dimension presque tridimensionnelle, évoquant à la fois le souffle de la vie et le mystère de l'univers. Le cadre noir mat luxueux apporte un contraste élégant qui vient sceller la profondeur captivante du tableau, renforçant l'éclat de ses teintes vibrantes.",
          en: "On a dark and mysterious background, flashes of luminescent blue, turquoise green and shades of violet create a hypnotic dynamic. The refined play of light and texture gives this vortex an almost three-dimensional quality, evoking both the breath of life and the mystery of the universe. The luxurious matte black frame provides an elegant contrast that seals the captivating depth of the painting and heightens the brilliance of its vibrant hues.",
          ar: "على خلفية داكنة غامضة، تخلق ومضات الأزرق المتألّق والأخضر الفيروزي ودرجات البنفسجي حركية آسرة. وتمنح لعبة الضوء والملامس الراقية هذه الدوّامة بُعداً يكاد يكون ثلاثياً، يوحي في آن واحد بنَفَس الحياة وبغموض الكون. ويضفي الإطار الفاخر باللون الأسود المطفي تبايناً أنيقاً يختم العمق الآسر للوحة ويعزّز بريق ألوانها النابضة.",
        },
        technique: oilOnCanvas,
        framing: {
          fr: "Cadre luxueux en noir mat",
          en: "Luxurious matte black frame",
          ar: "إطار فاخر باللون الأسود المطفي",
        },
        dimensions: "100 × 80 cm",
        status: "available",
      },
      {
        // l'oasis et les dromadaires
        id: "oasis",
        image: "/images/jungle-2/tableau-h.jpeg",
        title: {
          fr: "The Trajectory of Light",
          en: "The Trajectory of Light",
          ar: "The Trajectory of Light",
        },
        collection: jungle2,
        symbolism: {
          fr: "The Trajectory of Light offre une immersion envoûtante au cœur d'une oasis désertique, où la trajectoire du soleil couchant baigne le paysage d'une clarté dorée et vibrante.",
          en: "The Trajectory of Light offers a captivating immersion in the heart of a desert oasis, where the path of the setting sun bathes the landscape in a vibrant golden clarity.",
          ar: "تقدّم لوحة «The Trajectory of Light» غوصاً ساحراً في قلب واحة صحراوية، حيث يغمر مسار الشمس الغاربة المشهد بصفاء ذهبي نابض.",
        },
        description: {
          fr: "Au centre de la composition, la silhouette des dromadaires s'articule autour d'une source d'eau d'un bleu profond et cristallin, symbolisant la vie et le renouveau au milieu des dunes de sable. Les palmiers majestueux encadrent l'horizon avec élégance, tandis que le jeu poétique des ombres et la réflexion de la lumière solaire célèbrent la sérénité et la beauté mystique des paysages arides. L'ensemble est magnifiquement mis en valeur par un cadre doré mat luxueux, qui apporte une note d'élégance intemporelle à cette ode à la lumière désertique.",
          en: "At the centre of the composition, the silhouettes of the dromedaries gather around a spring of deep, crystalline blue, symbolising life and renewal amid the sand dunes. Majestic palm trees elegantly frame the horizon, while the poetic play of shadows and the reflection of the sunlight celebrate the serenity and mystical beauty of arid landscapes. The whole is beautifully set off by a luxurious matte gold frame, which adds a note of timeless elegance to this ode to desert light.",
          ar: "في وسط التركيبة، تلتفّ صور الجمال حول نبع ماء بزرقة عميقة صافية، رمزاً للحياة والتجدّد وسط الكثبان الرملية. وتحيط أشجار النخيل المهيبة بالأفق في أناقة، بينما تحتفي لعبة الظلال الشاعرية وانعكاس ضوء الشمس بسكينة المناظر القاحلة وجمالها الصوفي. ويزيد العمل بهاءً إطار فاخر بلون الذهب المطفي يضفي لمسة من الأناقة الخالدة على هذه القصيدة المهداة إلى ضوء الصحراء.",
        },
        technique: oilOnCanvas,
        framing: {
          fr: "Cadre luxueux en or doré mat",
          en: "Luxurious matte gold frame",
          ar: "إطار فاخر بلون الذهب المطفي",
        },
        dimensions: "90 × 100 cm",
        status: "available",
      },
      {
        // le chat de lumière
        id: "chat-de-lumiere",
        image: "/images/jungle-2/tableau-i.jpeg",
        title: {
          fr: "Nebula Noir",
          en: "Nebula Noir",
          ar: "Nebula Noir",
        },
        collection: jungle2,
        symbolism: {
          fr: "Nebula Noir explore le mystère et la grâce féline à travers une vision nocturne et cosmique. Surgissant des profondeurs de l'obscurité, le chat se dessine par un réseau complexe de lignes lumineuses aux reflets bleutés, évoquant l'énergie d'une nébuleuse stellaire sculptée au cœur de la nuit.",
          en: "Nebula Noir explores feline mystery and grace through a nocturnal, cosmic vision. Emerging from the depths of darkness, the cat takes shape through a complex network of luminous lines with bluish glints, evoking the energy of a stellar nebula sculpted in the heart of the night.",
          ar: "تستكشف لوحة «Nebula Noir» غموض القطط ورشاقتها من خلال رؤية ليلية كونية. يبرز القط من أعماق الظلمة، وتتشكّل ملامحه عبر شبكة معقّدة من الخطوط المضيئة ذات الانعكاسات الزرقاء، توحي بطاقة سديم نجمي منحوت في قلب الليل.",
        },
        description: {
          fr: "Ses yeux perçants, aux reflets dorés et chaleureux, captent la lumière avec une intensité fascinante, symbolisant l'intuition, la vigilance et la conscience éveillée. L'ensemble est magnifiquement mis en valeur par un cadre luxueux en noir mat, qui renforce le contraste saisissant de cette esthétique électrique et insuffle une élégance intemporelle à l'œuvre.",
          en: "Its piercing eyes, with warm golden glints, catch the light with fascinating intensity, symbolising intuition, vigilance and awakened awareness. The whole is beautifully set off by a luxurious matte black frame, which heightens the striking contrast of this electric aesthetic and lends the work a timeless elegance.",
          ar: "تلتقط عيناه الثاقبتان، بانعكاساتهما الذهبية الدافئة، الضوء بكثافة آسرة، رمزاً للحدس واليقظة والوعي المتيقّظ. ويزيد العمل بهاءً إطار فاخر باللون الأسود المطفي يعزّز التباين الآسر لهذه الجمالية المتوهّجة ويمنح اللوحة أناقة خالدة.",
        },
        technique: oilOnCanvas,
        framing: {
          fr: "Cadre luxueux en noir mat",
          en: "Luxurious matte black frame",
          ar: "إطار فاخر باللون الأسود المطفي",
        },
        dimensions: "80 × 60 cm",
        status: "available",
      },
    ],
    film: "aEvdAMARZ5Y",
    filmOutlet: "Radio Med",
    vernissage: [
      "/images/jungle-2/j2-01.jpeg",
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
