import type { Exposition } from "./types";

/* =============================================================================
   LES EXPOSITIONS
   -----------------------------------------------------------------------------
   Convention de nommage des images, pour s'y retrouver :
     • Jungle I  → tableau-1.jpeg, tableau-2.jpeg …   (les toiles)
     • Jungle II → tableau-a.jpeg, tableau-b.jpeg …   (les toiles)
     • tout fichier sans nom de tableau = photo d'exposition → `vernissage`

   Pour ajouter une œuvre : copier un bloc de `artworks`, changer `id`, `image`
   et les textes. Tant que `image` est vide, la fiche reste cachée. `status` accepte : "available" | "sold" | "reserved"
   | "notForSale". Retirer `price` pour afficher « Prix sur demande ».

   Pour ajouter une vidéo : un bloc dans `media`. `youtubeId` est la partie
   après « v= » dans l'adresse YouTube. `kind` accepte : "video" | "radio"
   | "tv" | "interview".
   ========================================================================== */

/** Le fond de nuit commun aux pages d'exposition. */
const JUNGLE = "/images/oeuvres/animaux-hd.jpeg";

/** Collection des toiles de La Jungle 1. */
const jungle1 = {
  fr: "La Jungle 1",
  en: "La Jungle 1",
  ar: "الغابة 1",
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

const toutesLesExpositions: Exposition[] = [
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
        // le tigre du Bengale
        id: "the-infinite-mystery",
        image: "/images/jungle-1/tableau-01.jpeg",
        title: {
          fr: "Le mystère infini",
          en: "The Infinite Mystery",
          ar: "The Infinite Mystery",
        },
        collection: jungle1,
        symbolism: {
          fr: "Incarnation par excellence de la puissance brute, du courage indomptable et de la souveraineté, le tigre du Bengale symbolise également la force vitale brute, l'instinct et la liberté farouche. En résonance avec le titre « Le mystère infini », il incarne la sagesse silencieuse des profondeurs sauvages, un gardien des secrets de la nature invitant à la contemplation et au voyage intérieur.",
          en: "Part of « The Jungle Series », this magnificent piece embodies an emblem of ultimate royalty and mystery. Feared, deeply respected for its raw power, and exuding a quiet authority, the tiger stands as the regal and enigmatic guardian of the pristine forest.",
          ar: "ضمن مجموعة «قصة الغابة»، تجسّد هذه اللوحة الاستثنائية رمزاً خالصاً للسيادة والملكية. إنه الحاكم الخفيّ للغابة؛ كائن غامض يُهاب ويُحترم لقوته الهادئة وهيبته الخالدة، ليقف كحارس ملكي يفرض حضوره بوقار وسكينة.",
        },
        description: {
          fr: "Cette huile sur toile saisissante met en scène un majestueux tigre du Bengale, fièrement dressé au cœur d'une jungle luxuriante. L'animal, représenté avec une minutie saisissante dans ses moindres détails et ses rayures caractéristiques, se détache sur un arrière-plan verdoyant composé de feuillages denses et de troncs d'arbres tropicaux. Son regard perçant et son allure souveraine renforcent l'atmosphère énigmatique et envoûtante de la scène.",
          en: "« The Infinite Mystery » invites viewers into a serene yet commanding tropical sanctuary. Masterfully painted in rich oil on canvas, the artwork captures the majestic presence of the tiger amidst dense, atmospheric jungle foliage and deep green gradients. Measuring an impressive 140 × 110 cm, this creation is elegantly housed in a sophisticated matte gold frame, offering a refined touch of timeless elegance and a commanding focal point for private collections and art connoisseurs.",
          ar: "تأخذنا لوحة «The Infinite Mystery» في رحلة بصرية عميقة إلى قلب الطبيعة الاستوائية الكثيفة. أُنجز العمل بألوان زيتية دقيقة ومتقنة تُبرز التفاصيل المعقّدة لفرو النمر وتدرّجات الخضرة الغنية بالعمق والجو الغامض. بحجمها الكبير وحضورها المهيب (140 × 110 سم)، وتكتمل فخامتها بإطار ذهبي مطفي راقٍ، لتشكّل قطعة فنية متحفية تُضفي هيبة وأناقة.",
        },
        technique: oilOnCanvas,
        framing: {
          fr: "Cadre doré luxueux mat",
          en: "Luxurious matte gold frame",
          ar: "إطار فاخر بلون الذهب المطفي",
        },
        dimensions: "140 × 110 cm",
        status: "available",
        featured: true,
      },
      {
        // l'oiseau de paradis
        id: "oiseau-de-paradis",
        image: "/images/jungle-1/tableau-02.jpeg",
        title: {
          fr: "Lesser Bird of Paradise",
          en: "Lesser Bird of Paradise",
          ar: "Lesser Bird of Paradise",
        },
        collection: jungle1,
        symbolism: {
          fr: "Cette création dégage une impression d'exotisme raffiné, célébrant la beauté flamboyante de la nature tropicale à travers des textures riches et des harmonies chromatiques éclatantes.",
          en: "This creation gives off a sense of refined exoticism, celebrating the flamboyant beauty of tropical nature through rich textures and brilliant colour harmonies.",
          ar: "يفيض هذا العمل بإحساس من الغرائبية الراقية، محتفياً بالجمال المتوهّج للطبيعة الاستوائية من خلال ملامس غنية وتناغمات لونية ساطعة.",
        },
        description: {
          fr: "L'œuvre met en vedette un oiseau de paradis majestueux juché au cœur d'un feuillage luxuriant. L'oiseau se distingue par son plumage somptueux aux nuances chaudes de brun, de jaune doré et de blanc vaporeux, contrastant magnifiquement avec la tête aux reflets verts émeraude. La composition végétale environnante est travaillée avec une grande précision, créant une canopée dense et vivante de feuilles vertes qui encadrent et font ressortir la silhouette élégante de l'oiseau.",
          en: "The work features a majestic bird of paradise perched at the heart of lush foliage. The bird stands out for its sumptuous plumage in warm shades of brown, golden yellow and misty white, contrasting beautifully with its emerald-green head. The surrounding vegetation is worked with great precision, creating a dense, living canopy of green leaves that frames the bird and sets off its elegant silhouette.",
          ar: "يتصدّر العمل طائر جنّة مهيب يحطّ في قلب أوراق كثيفة. يتميّز الطائر بريشه الفاخر بدرجات دافئة من البنّي والأصفر الذهبي والأبيض الضبابي، في تباين بديع مع رأسه ذي الانعكاسات الخضراء الزمرّدية. وقد صيغت النباتات المحيطة بدقة عالية، فشكّلت ظُلّة كثيفة نابضة بالحياة من الأوراق الخضراء تؤطّر الطائر وتُبرز قوامه الأنيق.",
        },
        technique: oilOnCanvas,
        framing: {
          fr: "Cadre doré, mat, luxueux, orné de motifs symboliques représentant l'oiseau de paradis",
          en: "Luxurious matte gold frame, adorned with symbolic motifs of the bird of paradise",
          ar: "إطار فاخر بلون الذهب المطفي، مزيّن بزخارف رمزية تمثّل طائر الجنّة",
        },
        dimensions: "100 × 80 cm",
        status: "available",
      },
      {
        // le cheval blanc sous le porche
        id: "cheval-blanc",
        image: "/images/jungle-1/tableau-03.jpeg",
        title: {
          fr: "Don't stop me now",
          en: "Don't stop me now",
          ar: "Don't stop me now",
        },
        collection: jungle1,
        symbolism: {
          fr: "Intitulée Don't stop me now, cette création célèbre la puissance et la grâce à travers la figure du cheval blanc, qui incarne ici le symbole de la force, de la vitesse et de la fidélité.",
          en: "Titled Don't stop me now, this creation celebrates power and grace through the figure of the white horse, which here embodies strength, speed and loyalty.",
          ar: "تحتفي لوحة «Don't stop me now» بالقوة والرشاقة من خلال صورة الحصان الأبيض، الذي يجسّد هنا رمز القوة والسرعة والوفاء.",
        },
        description: {
          fr: "L'œuvre met en scène un magnifique cheval blanc qui s'avance avec prestance à travers de grandes portes en bois entrouvertes. En arrière-plan, un décor luxuriant de feuillages verdoyants et de fleurs éclatantes vient encadrer et dynamiser la scène. Le pelage blanc et lumineux du cheval se détache avec éclat au milieu des tons chaleureux du bois et de la nature environnante, tandis que le modelé des muscles et les détails de l'anatomie témoignent d'un travail minutieux.",
          en: "The work depicts a magnificent white horse stepping proudly through large, half-open wooden doors. In the background, a lush setting of green foliage and bright flowers frames and enlivens the scene. The horse's bright white coat stands out vividly against the warm tones of the wood and the surrounding nature, while the modelling of the muscles and the anatomical detail bear witness to meticulous work.",
          ar: "يصوّر العمل حصاناً أبيض بديعاً يتقدّم بهيبة عبر بوّابات خشبية كبيرة مواربة. وفي الخلفية، تؤطّر الأوراق الخضراء والأزهار الزاهية المشهد وتبثّ فيه الحيوية. ويبرز بياض الحصان المضيء وسط الألوان الدافئة للخشب والطبيعة المحيطة، فيما تشهد تفاصيل العضلات والتشريح على عمل دقيق متأنٍّ.",
        },
        technique: oilOnCanvas,
        framing: {
          fr: "Cadre doré mat luxueux",
          en: "Luxurious matte gold frame",
          ar: "إطار فاخر بلون الذهب المطفي",
        },
        dimensions: "140 × 120 cm",
        status: "available",
      },
      {
        // l'éléphant en sous-bois
        id: "elephant",
        image: "/images/jungle-1/tableau-04.jpeg",
        title: {
          fr: "Force et Sagesse",
          en: "Force et Sagesse",
          ar: "Force et Sagesse",
        },
        collection: jungle1,
        symbolism: {
          fr: "Intitulée Force et Sagesse, cette création célèbre la figure imposante et protectrice de l'éléphant, un symbole universel de puissance tranquille, de clairvoyance et de sagesse intemporelle.",
          en: "Titled Force et Sagesse (Strength and Wisdom), this creation celebrates the imposing, protective figure of the elephant, a universal symbol of quiet power, clear-sightedness and timeless wisdom.",
          ar: "تحتفي لوحة «Force et Sagesse» (القوة والحكمة) بالحضور المهيب والحامي للفيل، رمزاً كونياً للقوة الهادئة وبُعد النظر والحكمة الخالدة.",
        },
        description: {
          fr: "L'œuvre met en scène un majestueux éléphant évoluant au cœur d'une forêt dense et luxuriante. L'animal se dresse avec prestance au milieu d'une végétation verdoyante, entouré de troncs d'arbres majestueux qui confèrent à la scène une atmosphère profonde et naturelle. Les nuances terreuses et profondes du pelage de l'éléphant contrastent subtilement avec les verts éclatants de la prairie et les tons tamisés du sous-bois. Le travail minutieux des détails met en valeur la texture de la peau de l'animal ainsi que la complexité de l'environnement forestier.",
          en: "The work depicts a majestic elephant moving through the heart of a dense, lush forest. The animal stands proudly amid green vegetation, surrounded by stately tree trunks that give the scene a deep, natural atmosphere. The deep earthy shades of the elephant's hide contrast subtly with the bright greens of the meadow and the muted tones of the undergrowth. Meticulous detail brings out the texture of the animal's skin and the complexity of the forest around it.",
          ar: "يصوّر العمل فيلاً مهيباً يتهادى في قلب غابة كثيفة وارفة. ينتصب الحيوان بوقار وسط خضرة نضرة، تحيط به جذوع أشجار شامخة تمنح المشهد جوّاً عميقاً وطبيعياً. وتتباين الدرجات الترابية العميقة لجلد الفيل بلطف مع خضرة المرج الساطعة وألوان ما تحت الأشجار الخافتة. وتُبرز التفاصيل الدقيقة ملمس جلد الحيوان وتعقيد البيئة الغابية.",
        },
        technique: oilOnCanvas,
        framing: {
          fr: "Doré mat luxueux",
          en: "Luxurious matte gold frame",
          ar: "إطار فاخر بلون الذهب المطفي",
        },
        dimensions: "100 × 80 cm",
        status: "available",
      },
      {
        // le cheval bai
        id: "cheval-bai",
        image: "/images/jungle-1/tableau-05.jpeg",
        title: {
          fr: "L'énergie de la vie",
          en: "L'énergie de la vie",
          ar: "L'énergie de la vie",
        },
        collection: jungle1,
        symbolism: {
          fr: "Intitulée L'énergie de la vie, cette création célèbre la force vitale à travers la figure du cheval marron, incarnant à la fois une puissance débordante et le parfait contrôle du mouvement.",
          en: "Titled L'énergie de la vie (The Energy of Life), this creation celebrates the life force through the figure of the brown horse, embodying both overflowing power and perfect control of movement.",
          ar: "تحتفي لوحة «L'énergie de la vie» (طاقة الحياة) بالقوة الحيوية من خلال صورة الحصان البنّي، الذي يجمع بين قوة فيّاضة وتحكّم تامّ في الحركة.",
        },
        description: {
          fr: "L'œuvre met en vedette un magnifique cheval marron à la crinière sombre, capturé dans une posture élégante et dynamique sur un fond vert lumineux. Les brides et rênes rouges apportent un contraste saisissant qui guide le regard à travers la composition. Le pelage alezan du cheval est rendu avec une grande précision dans le modelé des muscles, mettant en valeur la puissance physique de l'animal, tandis que les balzanes blanches aux sabots accentuent son allure racée.",
          en: "The work features a magnificent brown horse with a dark mane, captured in an elegant, dynamic pose against a bright green background. The red bridle and reins add a striking contrast that guides the eye through the composition. The horse's chestnut coat is rendered with great precision in the modelling of the muscles, bringing out the animal's physical power, while the white socks above the hooves accentuate its thoroughbred bearing.",
          ar: "يتصدّر العمل حصان بنّي بديع ذو عُرف داكن، في وضعية أنيقة مفعمة بالحركة على خلفية خضراء مضيئة. ويضفي اللجام والأعنّة الحمراء تبايناً آسراً يقود النظر عبر التركيبة. وقد صيغ لون الحصان الأشقر بدقة كبيرة في تجسيم العضلات، مُبرزاً قوّته الجسدية، فيما تزيد البقع البيضاء فوق الحوافر من أصالة هيئته.",
        },
        technique: {
          fr: "Peinture sur toile",
          en: "Painting on canvas",
          ar: "رسم على قماش",
        },
        framing: {
          fr: "Cadre luxueux, tête de nacre",
          en: "Luxurious frame with mother-of-pearl",
          ar: "إطار فاخر مطعّم بالصدف",
        },
        dimensions: "150 × 95 cm",
        status: "available",
      },
      {
        // les paons en vol
        id: "danseuses-paon",
        image: "/images/jungle-1/tableau-06.jpeg",
        title: {
          fr: "Flying to the Moon",
          en: "Flying to the Moon",
          ar: "Flying to the Moon",
        },
        collection: jungle1,
        symbolism: {
          fr: "Intitulée Flying to the Moon, cette création met à l'honneur le symbole du paon volant, incarnant la croissance, le succès et la liberté.",
          en: "Titled Flying to the Moon, this creation honours the symbol of the flying peacock, embodying growth, success and freedom.",
          ar: "تحتفي لوحة «Flying to the Moon» برمز الطاووس الطائر، تجسيداً للنموّ والنجاح والحرية.",
        },
        description: {
          fr: "L'œuvre met en scène deux superbes paons au plumage richement texturé, capturés dans un mouvement aérien et dynamique. Leurs ailes grandement déployées et leurs couleurs vibrantes contrastent harmonieusement avec le paysage environnant, créant une impression de légèreté et d'élévation. Le bleu profond de leur cou s'allie à des nuances cuivrées et aux verts étincelants de leurs parures ornées de motifs perlés. Le soin minutieux apporté aux plumes et au décor naturel témoigne d'une recherche graphique et tactile poussée.",
          en: "The work depicts two superb peacocks with richly textured plumage, caught in a dynamic, airborne movement. Their wide-spread wings and vibrant colours contrast harmoniously with the surrounding landscape, creating a sense of lightness and elevation. The deep blue of their necks blends with coppery shades and the sparkling greens of their pearl-patterned finery. The meticulous care given to the feathers and the natural setting reflects an advanced graphic and tactile research.",
          ar: "يصوّر العمل طاووسين رائعين بريش غنيّ الملمس، في حركة جوّية مفعمة بالحيوية. وتتناغم أجنحتهما المبسوطة وألوانهما النابضة مع المشهد المحيط، فتولّد إحساساً بالخفّة والارتقاء. ويمتزج الأزرق العميق لعنقيهما بدرجات نحاسية وبخضرة متلألئة لحُلّتهما المزيّنة بزخارف لؤلؤية. وتشهد العناية الدقيقة بالريش وبالمشهد الطبيعي على بحث تشكيلي ولمسي متقدّم.",
        },
        technique: oilOnCanvas,
        framing: {
          fr: "Cadre doré, luxueux, mat",
          en: "Luxurious matte gold frame",
          ar: "إطار فاخر بلون الذهب المطفي",
        },
        dimensions: "130 × 110 cm",
        status: "available",
      },
      {
        // le tigre blanc sous la neige
        id: "tigre-blanc",
        image: "/images/jungle-1/tableau-07.jpeg",
        title: {
          fr: "On the Way of Life",
          en: "On the Way of Life",
          ar: "On the Way of Life",
        },
        collection: jungle1,
        symbolism: {
          fr: "Figure légendaire de force, de courage et de protection, le tigre blanc incarne la puissance royale, la maîtrise de soi et la noblesse d'esprit. En écho au titre de l'œuvre (« On the Way of Life »), il symbolise le cheminement de la vie, l'instinct de survie et la capacité à avancer avec assurance et dignité à travers les épreuves et les environnements les plus rigoureux.",
          en: "A legendary figure of strength, courage and protection, the white tiger embodies royal power, self-mastery and nobility of spirit. Echoing the title of the work (« On the Way of Life »), it symbolises life's journey, the survival instinct and the ability to move forward with confidence and dignity through hardship and the harshest environments.",
          ar: "النمر الأبيض شخصية أسطورية للقوة والشجاعة والحماية، يجسّد السلطة الملكية وضبط النفس ونبل الروح. وفي صدى لعنوان العمل («On the Way of Life»)، يرمز إلى مسار الحياة وغريزة البقاء والقدرة على المضيّ بثقة وكرامة عبر المحن وأقسى البيئات.",
        },
        description: {
          fr: "Cette huile sur toile saisissante met en scène un magnifique tigre blanc aux perçants yeux bleus, avançant résolument à travers un paysage enneigé bordé de troncs d'arbres sombres. L'animal, représenté avec une grande précision et des textures minutieuses, dégage une présence magnétique et puissante.",
          en: "This striking oil on canvas depicts a magnificent white tiger with piercing blue eyes, advancing resolutely through a snowy landscape lined with dark tree trunks. Rendered with great precision and meticulous textures, the animal gives off a magnetic, powerful presence.",
          ar: "تصوّر هذه اللوحة الزيتية الآسرة نمراً أبيض بديعاً بعينين زرقاوين ثاقبتين، يتقدّم بعزم عبر مشهد مكسوّ بالثلج تحفّه جذوع أشجار داكنة. وقد رُسم الحيوان بدقة عالية وملامس متأنّية، فيشعّ بحضور جاذب وقويّ.",
        },
        technique: oilOnCanvas,
        framing: {
          fr: "Noir mat luxueux",
          en: "Luxurious matte black frame",
          ar: "إطار فاخر باللون الأسود المطفي",
        },
        dimensions: "120 × 90 cm",
        status: "available",
      },
      {
        // l'ara sur sa branche
        id: "ara",
        image: "/images/jungle-1/tableau-08.jpeg",
        title: {
          fr: "Peace and Prosperity",
          en: "Peace and Prosperity",
          ar: "Peace and Prosperity",
        },
        collection: jungle1,
        symbolism: {
          fr: "Intitulée Peace and Prosperity, cette création célèbre la splendeur de la nature tropicale à travers la prestance lumineuse du perroquet ara, évoquant l'harmonie et l'opulence.",
          en: "Titled Peace and Prosperity, this creation celebrates the splendour of tropical nature through the luminous presence of the macaw, evoking harmony and abundance.",
          ar: "تحتفي لوحة «Peace and Prosperity» ببهاء الطبيعة الاستوائية من خلال الحضور المضيء لببغاء المكاو، مستحضرةً الانسجام والوفرة.",
        },
        description: {
          fr: "L'œuvre met en vedette un magnifique perroquet ara aux couleurs éclatantes, posé avec élégance sur une branche texturée. Le plumage de l'oiseau se distingue par un dégradé saisissant de rouge flamboyant, de vert tendre et de bleu vif, créant un contraste visuel captivant sur un fond neutre et nuancé. Le travail minutieux des détails met en valeur chaque plume ainsi que les aspérités de la branche.",
          en: "The work features a magnificent, brightly coloured macaw perched elegantly on a textured branch. The bird's plumage stands out for its striking gradient of flaming red, soft green and vivid blue, creating a captivating visual contrast against a neutral, nuanced background. Meticulous detail brings out every feather as well as the roughness of the branch.",
          ar: "يتصدّر العمل ببغاء مكاو بديع بألوان ساطعة، يحطّ بأناقة على غصن متعرّج الملمس. ويتميّز ريشه بتدرّج آسر من الأحمر المتوهّج والأخضر الناعم والأزرق الزاهي، في تباين بصري جذّاب على خلفية محايدة متدرّجة. وتُبرز التفاصيل الدقيقة كل ريشة ونتوءات الغصن.",
        },
        technique: oilOnCanvas,
        framing: {
          fr: "Cadre doré, mat, luxueux",
          en: "Luxurious matte gold frame",
          ar: "إطار فاخر بلون الذهب المطفي",
        },
        dimensions: "100 × 80 cm",
        status: "available",
      },
      {
        // la coccinelle sur le trèfle
        id: "coccinelle",
        image: "/images/jungle-1/tableau-09.jpeg",
        title: {
          fr: "Good Life",
          en: "Good Life",
          ar: "Good Life",
        },
        collection: jungle1,
        symbolism: {
          fr: "Intitulée Good Life, la toile célèbre la beauté des petits bonheurs de la nature, la coccinelle étant universellement perçue comme un symbole de chance, de bonheur et de vie sereine.",
          en: "Titled Good Life, the painting celebrates the beauty of nature's small joys, the ladybird being universally seen as a symbol of luck, happiness and a serene life.",
          ar: "تحتفي لوحة «Good Life» بجمال المسرّات الصغيرة في الطبيعة، إذ يُنظر إلى الدعسوقة في كل مكان رمزاً للحظّ والسعادة والحياة الهانئة.",
        },
        description: {
          fr: "L'œuvre met en scène une coccinelle rouge éclatante parée de ses pois noirs caractéristiques, délicatement posée sur une feuille d'un vert lumineux. Le contraste entre le rouge vif de l'insecte et les nuances de vert de la composition végétale crée une atmosphère fraîche et printanière. Le travail des textures met en valeur chaque détail de la feuille et de la carapace bombée de la coccinelle.",
          en: "The work depicts a bright red ladybird adorned with its characteristic black spots, delicately resting on a luminous green leaf. The contrast between the insect's vivid red and the shades of green in the foliage creates a fresh, springlike atmosphere. The handling of texture brings out every detail of the leaf and of the ladybird's domed shell.",
          ar: "يصوّر العمل دعسوقة حمراء ساطعة مزيّنة بنقاطها السوداء المميّزة، تحطّ برقّة على ورقة خضراء مضيئة. ويخلق التباين بين أحمر الحشرة الزاهي ودرجات الأخضر في النبات جوّاً منعشاً ربيعياً. ويُبرز الاشتغال على الملامس كل تفاصيل الورقة وصدفة الدعسوقة المحدّبة.",
        },
        technique: oilOnCanvas,
        framing: {
          fr: "Cadre doré mat luxueux",
          en: "Luxurious matte gold frame",
          ar: "إطار فاخر بلون الذهب المطفي",
        },
        dimensions: "90 × 80 cm",
        status: "available",
      },
      {
        // le lion de lumière
        id: "lion-de-lumiere",
        image: "/images/jungle-1/tableau-10.jpeg",
        title: {
          fr: "Brave",
          en: "Brave",
          ar: "Brave",
        },
        collection: jungle1,
        symbolism: {
          fr: "Intitulée Brave, cette création incarne à travers la figure majestueuse du lion les valeurs intemporelles du courage, de la justice et de la bravoure.",
          en: "Titled Brave, this creation embodies, through the majestic figure of the lion, the timeless values of courage, justice and bravery.",
          ar: "تجسّد لوحة «Brave»، من خلال صورة الأسد المهيبة، القيم الخالدة للشجاعة والعدل والإقدام.",
        },
        description: {
          fr: "L'œuvre met en lumière le visage puissant et magnétique d'un lion. Sa crinière et ses traits sont dessinés par des lignes lumineuses aux teintes électriques de bleu et de blanc, créant un effet visuel saisissant et texturé. Le fond sombre et profond accentue l'éclat mystique de la crinière bleutée, tandis que les yeux du félin, d'un jaune doré perçant, captivent instantanément le regard et insufflent une intensité féroce à la composition.",
          en: "The work highlights the powerful, magnetic face of a lion. Its mane and features are drawn in luminous lines of electric blue and white, creating a striking, textured visual effect. The deep, dark background heightens the mystical glow of the bluish mane, while the feline's piercing golden-yellow eyes instantly capture the gaze and breathe a fierce intensity into the composition.",
          ar: "يُبرز العمل وجه أسد قويّ وجذّاب. تُرسم لبدته وملامحه بخطوط مضيئة بألوان كهربائية من الأزرق والأبيض، فتخلق أثراً بصرياً آسراً غنيّ الملمس. وتزيد الخلفية الداكنة العميقة من البريق الغامض للّبدة الزرقاء، فيما تأسر عينا الأسد الذهبيتان الثاقبتان النظر على الفور وتبثّان في التركيبة حدّة ضارية.",
        },
        technique: oilOnCanvas,
        framing: {
          fr: "Cadre noir mat luxueux",
          en: "Luxurious matte black frame",
          ar: "إطار فاخر باللون الأسود المطفي",
        },
        dimensions: "95 × 80 cm",
        status: "available",
      },
      {
        // les colombes
        id: "colombes",
        image: "/images/jungle-1/tableau-11.jpeg",
        title: {
          fr: "Peace and Love",
          en: "Peace and Love",
          ar: "Peace and Love",
        },
        collection: jungle1,
        symbolism: {
          fr: "Fidèle à son titre Peace and Love, cette toile transmet un message universel d'harmonie, de douceur et d'amour à travers la grâce intemporelle de ces symboles de paix.",
          en: "True to its title Peace and Love, this painting conveys a universal message of harmony, gentleness and love through the timeless grace of these symbols of peace.",
          ar: "وفاءً لعنوانها «Peace and Love»، تحمل هذه اللوحة رسالة كونية من الانسجام والرقّة والحبّ، عبر الرشاقة الخالدة لهذين الرمزين للسلام.",
        },
        description: {
          fr: "L'œuvre met en scène deux colombes blanches en plein vol, s'effleurant dans un élan de tendresse et de complicité. Leurs ailes grandement déployées créent un dynamisme aérien saisissant qui insuffle vie et mouvement à la composition. Le blanc pur et éclatant de leur plumage se détache de manière magistrale sur un fond sombre et profond. Ce contraste puissant accentue la luminosité des oiseaux et met en valeur la minutie des textures des plumes.",
          en: "The work depicts two white doves in full flight, brushing against each other in a surge of tenderness and closeness. Their wide-spread wings create a striking aerial momentum that brings life and movement to the composition. The pure, brilliant white of their plumage stands out masterfully against a deep, dark background. This powerful contrast heightens the birds' luminosity and brings out the fine texture of the feathers.",
          ar: "يصوّر العمل حمامتين بيضاوين في عزّ تحليقهما، تتلامسان في اندفاعة من الحنان والألفة. وتخلق أجنحتهما المبسوطة حيوية جوّية آسرة تبثّ الحياة والحركة في التركيبة. ويبرز البياض النقيّ الساطع لريشهما ببراعة على خلفية داكنة عميقة، تباينٌ قويّ يزيد من إشراق الطائرين ويُبرز دقّة ملمس الريش.",
        },
        technique: oilOnCanvas,
        framing: {
          fr: "Cadre noir mat luxueux",
          en: "Luxurious matte black frame",
          ar: "إطار فاخر باللون الأسود المطفي",
        },
        dimensions: "100 × 80 cm",
        status: "available",
      },
      {
        // le flamant rose
        id: "flamant-rose",
        image: "/images/jungle-1/tableau-12.jpeg",
        title: {
          fr: "Love and Peace",
          en: "Love and Peace",
          ar: "Love and Peace",
        },
        collection: jungle1,
        symbolism: {
          fr: "Intitulée Love and Peace, cette création dégage une sérénité profonde et une douce harmonie, transformant la posture gracieuse de l'oiseau en un symbole intemporel de paix et d'apaisement.",
          en: "Titled Love and Peace, this creation gives off a deep serenity and gentle harmony, turning the bird's graceful posture into a timeless symbol of peace and calm.",
          ar: "تفيض لوحة «Love and Peace» بسكينة عميقة وانسجام رقيق، فتحوّل وقفة الطائر الرشيقة إلى رمز خالد للسلام والطمأنينة.",
        },
        description: {
          fr: "L'œuvre met en scène un majestueux flamant rose se dressant avec grâce sur un fond profond et ténébreux. Ce contraste saisissant met en valeur la vivacité et la chaleur des nuances orangées et corail du plumage. Le plumage est rendu avec un relief et une minutie remarquables, capturant la texture délicate et duveteuse des ailes ainsi que l'élégance naturelle de la courbure du cou.",
          en: "The work depicts a majestic flamingo standing gracefully against a deep, shadowy background. This striking contrast brings out the vividness and warmth of the orange and coral shades of its plumage. The feathers are rendered with remarkable relief and precision, capturing the delicate, downy texture of the wings and the natural elegance of the curving neck.",
          ar: "يصوّر العمل طائر فلامنغو مهيباً ينتصب برشاقة على خلفية عميقة قاتمة. ويُبرز هذا التباين الآسر حيوية ودفء الدرجات البرتقالية والمرجانية في ريشه. وقد صيغ الريش ببروز ودقّة لافتين، يلتقطان الملمس الرقيق الزغبي للجناحين والأناقة الطبيعية لانحناءة العنق.",
        },
        technique: oilOnCanvas,
        framing: {
          fr: "Cadre mat doré luxueux",
          en: "Luxurious matte gold frame",
          ar: "إطار فاخر بلون الذهب المطفي",
        },
        dimensions: "100 × 80 cm",
        status: "available",
      },
      {
        // le poisson doré
        id: "poisson-dore",
        image: "/images/jungle-1/tableau-13.jpeg",
        title: {
          fr: "Beautiful World",
          en: "Beautiful World",
          ar: "Beautiful World",
        },
        collection: jungle1,
        symbolism: {
          fr: "Universellement associé à la fluidité de la vie, à la régénération et à la liberté, le poisson navigue en toute sérénité dans les profondeurs insondables. Il incarne l'abondance, la sagesse silencieuse et l'intuition. En parfaite harmonie avec le titre de l'œuvre (« Beautiful World »), il célèbre la pureté des origines et la beauté foisonnante des mondes cachés, invitant à la contemplation et à l'apaisement intérieur.",
          en: "Universally associated with the fluidity of life, renewal and freedom, the fish glides serenely through unfathomable depths. It embodies abundance, silent wisdom and intuition. In perfect harmony with the title of the work (« Beautiful World »), it celebrates the purity of origins and the teeming beauty of hidden worlds, inviting contemplation and inner calm.",
          ar: "يرتبط السمك في كل الثقافات بانسيابية الحياة والتجدّد والحرية، فهو يسبح بسكينة في أعماق لا يُدرك غورها. ويجسّد الوفرة والحكمة الصامتة والحدس. وفي تناغم تامّ مع عنوان العمل («Beautiful World»)، يحتفي بنقاء الأصول وبالجمال الزاخر للعوالم الخفيّة، داعياً إلى التأمّل والسكينة الداخلية.",
        },
        description: {
          fr: "Cette magnifique huile sur toile, élégamment mise en valeur par un cadre doré mat luxueux, déploie un univers aquatique fascinant et haut en couleur. La composition célèbre la beauté et la richesse de la vie sous-marine, capturant la grâce et le mouvement fluide de ses habitants au cœur d'un écosystème vibrant de lumière et de vie.",
          en: "This magnificent oil on canvas, elegantly set off by a luxurious matte gold frame, unfolds a fascinating and colourful aquatic world. The composition celebrates the beauty and richness of underwater life, capturing the grace and fluid movement of its inhabitants at the heart of an ecosystem vibrant with light and life.",
          ar: "تبسط هذه اللوحة الزيتية البديعة، التي يزيدها إطار فاخر بلون الذهب المطفي أناقة، عالماً مائياً ساحراً زاخراً بالألوان. وتحتفي التركيبة بجمال الحياة تحت الماء وثرائها، ملتقطةً رشاقة سكّانها وحركتهم الانسيابية في قلب نظام بيئي ينبض بالضوء والحياة.",
        },
        technique: oilOnCanvas,
        framing: {
          fr: "Cadre doré mat luxueux",
          en: "Luxurious matte gold frame",
          ar: "إطار فاخر بلون الذهب المطفي",
        },
        dimensions: "100 × 80 cm",
        status: "available",
      },
      {
        // le paon et les magnolias
        id: "paon",
        image: "/images/jungle-1/tableau-14.jpeg",
        title: {
          fr: "Yes, I am beautiful peacock",
          en: "Yes, I am beautiful peacock",
          ar: "Yes, I am beautiful peacock",
        },
        collection: jungle1,
        // le texte sur le symbole du paon s'arrête net dans la fiche reçue
        symbolism: { fr: "", en: "", ar: "" },
        description: {
          fr: "Cette composition acrylique sur toile cartonnée met en scène un somptueux paon indien, aux nuances vibrantes de bleu saphir et de vert émeraude, majestueusement posé sur une branche noueuse. L'animal est entouré de délicates fleurs de magnolia blanc aux feuilles sombres, se détachant avec élégance sur un fond doux et lumineux.",
          en: "This acrylic composition on canvas board depicts a sumptuous Indian peacock in vibrant shades of sapphire blue and emerald green, majestically perched on a gnarled branch. The bird is surrounded by delicate white magnolia blossoms with dark leaves, standing out elegantly against a soft, luminous background.",
          ar: "تصوّر هذه التركيبة بالأكريليك على قماش مقوّى طاووساً هندياً فاخراً بدرجات نابضة من الأزرق الياقوتي والأخضر الزمرّدي، يحطّ بمهابة على غصن معقود. وتحيط به أزهار ماغنوليا بيضاء رقيقة ذات أوراق داكنة، تبرز بأناقة على خلفية ناعمة مضيئة.",
        },
        technique: {
          fr: "Acrylique sur toile cartonnée",
          en: "Acrylic on canvas board",
          ar: "أكريليك على قماش مقوّى",
        },
        framing: {
          fr: "Cadre effet bois luxueux",
          en: "Luxurious wood-effect frame",
          ar: "إطار فاخر بمظهر الخشب",
        },
        dimensions: "95 × 70 cm",
        status: "available",
      },
      {
        // le monarque sur la fleur rouge
        id: "monarque",
        image: "/images/jungle-1/tableau-16.jpeg",
        title: {
          fr: "Light of the world",
          en: "Light of the world",
          ar: "Light of the world",
        },
        collection: jungle1,
        symbolism: {
          fr: "La composition est habitée par une profonde charge spirituelle : le papillon incarne ici la métaphore universelle de l'âme. Symbole d'immortalité, de détachement de la matière et d'élévation, il s'accorde intimement avec le titre de l'œuvre (« Light of the world »), agissant comme un messager de lumière pure, de renaissance et de transcendance intérieure.",
          en: "The composition carries a deep spiritual charge: the butterfly here embodies the universal metaphor of the soul. A symbol of immortality, detachment from matter and elevation, it is closely attuned to the title of the work (« Light of the world »), acting as a messenger of pure light, rebirth and inner transcendence.",
          ar: "تسكن التركيبةَ شحنةٌ روحية عميقة: فالفراشة هنا تجسّد الاستعارة الكونية للروح. رمزاً للخلود والتحرّر من المادّة والارتقاء، تنسجم انسجاماً حميماً مع عنوان العمل («Light of the world»)، فتغدو رسولاً للنور الصافي والانبعاث والسموّ الداخلي.",
        },
        description: {
          fr: "Cette huile sur toile met en scène un papillon monarque aux teintes flamboyantes, délicatement posé sur le cœur lumineux d'une fleur rouge éclatante, sur un fond sombre et feutré de vert olive.",
          en: "This oil on canvas depicts a monarch butterfly in flaming hues, delicately resting on the luminous heart of a bright red flower, against a dark, muted olive-green background.",
          ar: "تصوّر هذه اللوحة الزيتية فراشة ملكية بألوان متوهّجة، تحطّ برقّة على القلب المضيء لزهرة حمراء ساطعة، على خلفية داكنة خافتة بلون الزيتون الأخضر.",
        },
        technique: oilOnCanvas,
        framing: {
          fr: "Cadre doré mat luxueux",
          en: "Luxurious matte gold frame",
          ar: "إطار فاخر بلون الذهب المطفي",
        },
        dimensions: "100 × 80 cm",
        status: "available",
      },
      {
        // le léopard sur son rocher
        id: "leopard",
        image: "/images/jungle-1/tableau-17.jpeg",
        title: {
          fr: "Le Noble Sauvage",
          en: "Le Noble Sauvage",
          ar: "Le Noble Sauvage",
        },
        collection: jungle1,
        symbolism: {
          fr: "Intitulée Le Noble Sauvage, cette création dégage une force tranquille et un magnétisme intense. Le regard perçant du léopard fixe le spectateur, incarnant la puissance, la liberté et la noblesse de la vie sauvage.",
          en: "Titled Le Noble Sauvage (The Noble Wild One), this creation gives off a quiet strength and intense magnetism. The leopard's piercing gaze holds the viewer's eye, embodying the power, freedom and nobility of wild life.",
          ar: "تفيض لوحة «Le Noble Sauvage» (النبيل البرّي) بقوة هادئة وجاذبية حادّة. فنظرة الفهد الثاقبة تثبت على المشاهد، مجسّدةً قوة الحياة البرية وحريّتها ونبلها.",
        },
        description: {
          fr: "L'œuvre met en scène un magnifique léopard d'Afrique majestueusement posé sur un affleurement rocheux, dominant un paysage vaste et paisible. Sa posture détendue mais vigilante traduit une maîtrise souveraine de son environnement. Le pelage tacheté du grand félin est rendu avec une précision remarquable, alternant des tons chaleureux de doré et des motifs sombres caractéristiques. Le travail de la lumière souligne la musculature puissante de l'animal et la texture brute de la roche.",
          en: "The work depicts a magnificent African leopard majestically resting on a rocky outcrop, overlooking a vast and peaceful landscape. Its relaxed yet watchful posture conveys a sovereign mastery of its surroundings. The big cat's spotted coat is rendered with remarkable precision, alternating warm golden tones with its characteristic dark markings. The handling of light underlines the animal's powerful musculature and the raw texture of the rock.",
          ar: "يصوّر العمل فهداً إفريقياً بديعاً يستقرّ بمهابة على صخرة بارزة، مُطلّاً على مشهد شاسع هادئ. وتعكس وضعيته المسترخية اليقظة سيطرة سيادية على محيطه. وقد صيغ فراء القطّ الكبير المرقّط بدقة لافتة، تتناوب فيه الدرجات الذهبية الدافئة مع البقع الداكنة المميّزة. ويُبرز الاشتغال على الضوء عضلات الحيوان القوية وملمس الصخر الخشن.",
        },
        technique: oilOnCanvas,
        framing: {
          fr: "Cadre en bois mat luxueux",
          en: "Luxurious matte wooden frame",
          ar: "إطار خشبي فاخر مطفي",
        },
        dimensions: "100 × 80 cm",
        status: "available",
      },
      {
        // le poisson corail dans les herbes
        id: "good-vibes",
        // photo à venir → "/images/jungle-1/tableau-18.jpeg"
        image: "",
        title: {
          fr: "Good Vibes",
          en: "Good Vibes",
          ar: "Good Vibes",
        },
        collection: jungle1,
        symbolism: {
          fr: "Dans cette œuvre, le poisson symbolise la fluidité, la sérénité et le mouvement harmonieux de la vie. Il incarne l'énergie positive (good vibes) et la capacité à naviguer avec aisance à travers les courants de l'existence. Ses nageoires déployées comme des voiles traduisent la liberté, l'apaisement et la connexion profonde avec la nature, tandis que les reflets dorés et lumineux rappellent la richesse intérieure et la clarté d'esprit.",
          en: "In this work, the fish symbolises fluidity, serenity and the harmonious movement of life. It embodies positive energy (good vibes) and the ability to glide with ease through the currents of existence. Its fins, spread like sails, express freedom, calm and a deep connection with nature, while the luminous golden glints recall inner richness and clarity of mind.",
          ar: "يرمز السمك في هذا العمل إلى الانسيابية والسكينة والحركة المتناغمة للحياة. ويجسّد الطاقة الإيجابية (good vibes) والقدرة على الإبحار بيُسر عبر تيّارات الوجود. وتعبّر زعانفه المبسوطة كالأشرعة عن الحرية والطمأنينة والصلة العميقة بالطبيعة، فيما تذكّر الانعكاسات الذهبية المضيئة بالثراء الداخلي وصفاء الذهن.",
        },
        description: {
          fr: "Cette composition met en scène un poisson aux formes gracieuses et fluides, baignant dans un écosystème aquatique luxuriant. Le sujet principal se distingue par des teintes lumineuses allant du rose corail à l'orangé, rehaussées de délicats détails dorés et de motifs bleutés sur ses nageoires aériennes. Il évolue au milieu d'un feuillage aquatique dense aux nuances de vert vibrant, qui se détache avec profondeur sur un fond sombre et mystérieux. L'ensemble est sublimé par un encadrement doré mat luxueux qui apporte une touche d'élégance et met en valeur la chaleur des teintes de la toile.",
          en: "This composition depicts a fish with graceful, flowing forms, swimming in a lush aquatic ecosystem. The main subject stands out for its luminous hues ranging from coral pink to orange, enhanced by delicate golden details and bluish patterns on its airy fins. It moves among dense aquatic foliage in vibrant shades of green, which stands out with depth against a dark, mysterious background. The whole is elevated by a luxurious matte gold frame that adds a touch of elegance and brings out the warmth of the canvas.",
          ar: "تصوّر هذه التركيبة سمكة رشيقة الأشكال انسيابية، تسبح في نظام بيئي مائي وارف. ويتميّز الموضوع الرئيسي بألوان مضيئة تمتدّ من الوردي المرجاني إلى البرتقالي، تزيّنها تفاصيل ذهبية رقيقة وزخارف زرقاء على زعانفها الخفيفة. وتتهادى السمكة وسط نباتات مائية كثيفة بدرجات خضراء نابضة، تبرز بعمق على خلفية داكنة غامضة. ويكتمل العمل بإطار فاخر بلون الذهب المطفي يضفي لمسة من الأناقة ويُبرز دفء ألوان اللوحة.",
        },
        technique: oilOnCanvas,
        framing: {
          fr: "Cadre doré mat luxueux",
          en: "Luxurious matte gold frame",
          ar: "إطار فاخر بلون الذهب المطفي",
        },
        dimensions: "90 × 80 cm",
        status: "available",
      },
      {
        // les grues du Japon sous la neige
        id: "danse-des-grues",
        // photo à venir → "/images/jungle-1/tableau-19.jpeg"
        image: "",
        title: {
          fr: "La danse des grues",
          en: "Dance of the Crane",
          ar: "Dance of the Crane",
        },
        collection: jungle1,
        symbolism: {
          fr: "Symbole universel de fidélité, de sagesse et de longévité, cet oiseau majestueux incarne ici l'harmonie et la pureté des liens. Les mouvements amples et synchronisés des ailes expriment la liberté et la grâce d'un rituel ancestral.",
          en: "A universal symbol of fidelity, wisdom and longevity, this majestic bird here embodies harmony and the purity of bonds. The broad, synchronised movements of the wings express the freedom and grace of an ancestral ritual.",
          ar: "رمزاً كونياً للوفاء والحكمة وطول العمر، يجسّد هذا الطائر المهيب هنا الانسجام ونقاء الروابط. وتعبّر حركات الأجنحة الواسعة المتناسقة عن حرية طقس عريق ورشاقته.",
        },
        description: {
          fr: "Cette composition saisissante met en scène la grâce intemporelle de la grue du Japon au cœur d'un décor hivernal épuré, délicatement enveloppé de flocons. Leurs plumages d'un blanc immaculé contrastent avec la profondeur du noir de leurs ailes et l'éclat rubis de leur calotte, capturant l'instant précis d'une danse nuptiale d'une grande poésie. Le cadre noir luxueux structure la composition avec modernité et met en valeur la délicatesse des nuances argentées et poudrées de l'arrière-plan.",
          en: "This striking composition depicts the timeless grace of the Japanese crane in a pared-back winter setting, delicately wrapped in snowflakes. Their immaculate white plumage contrasts with the deep black of their wings and the ruby glint of their crowns, capturing the precise moment of a deeply poetic courtship dance. The luxurious black frame gives the composition a modern structure and brings out the delicate silvery, powdery shades of the background.",
          ar: "تصوّر هذه التركيبة الآسرة الرشاقة الخالدة لطائر الكركي الياباني في قلب مشهد شتوي صافٍ، تلفّه ندف الثلج برقّة. ويتباين ريشها الأبيض الناصع مع سواد أجنحتها العميق وبريق تاجها الياقوتي، ملتقطاً لحظة رقصة تزاوج بالغة الشاعرية. ويمنح الإطار الأسود الفاخر التركيبة بنية عصرية ويُبرز رقّة الدرجات الفضية والبودرية في الخلفية.",
        },
        technique: oilOnCanvas,
        framing: {
          fr: "Cadre noir luxueux",
          en: "Luxurious black frame",
          ar: "إطار فاخر باللون الأسود",
        },
        dimensions: "95 × 95 cm",
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

/**
 * Les expositions telles que le site les montre : une œuvre dont la photo
 * manque encore (`image: ""`) attend, rédigée, sans apparaître nulle part.
 */
export const expositions: Exposition[] = toutesLesExpositions.map((expo) => ({
  ...expo,
  artworks: expo.artworks.filter((a) => a.image),
}));

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
