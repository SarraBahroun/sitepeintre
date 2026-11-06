import type { Localized } from "./types";

/* =============================================================================
   CONFIDENTIALITÉ
   -----------------------------------------------------------------------------
   Ce que le site fait des informations de ses visiteurs. Chaque phrase décrit
   ce que fait réellement le code — à tenir à jour si l'on ajoute un
   formulaire, une mesure d'audience ou un service extérieur :
     • formulaires   → src/lib/useFormSender.ts (Web3Forms)
     • panier        → src/lib/cart.ts (localStorage)
     • ouverture     → src/components/Intro.tsx (sessionStorage)
     • vidéos        → ExpoFilm, MediaGallery (YouTube, au clic)
   ========================================================================== */

/** Date de la dernière mise à jour du texte, affichée en bas de page. */
export const privacyUpdated = "2026-11-06";

export type PrivacySection = {
  id: string;
  title: Localized;
  body: { fr: string[]; en: string[]; ar: string[] };
};

export const privacySections: PrivacySection[] = [
  {
    id: "qui",
    title: {
      fr: "Qui reçoit vos informations",
      en: "Who receives your information",
      ar: "من يتلقّى معلوماتك",
    },
    body: {
      fr: [
        "Ce site est celui de l’artiste peintre Hana Bahroun, à Nabeul, en Tunisie. Les informations que vous y laissez ne sont destinées qu’à elle, pour vous répondre.",
      ],
      en: [
        "This is the website of the painter Hana Bahroun, based in Nabeul, Tunisia. The information you leave here is intended for her alone, so that she can reply to you.",
      ],
      ar: [
        "هذا الموقع هو موقع الفنانة التشكيلية هناء بحرون، بنابل في تونس. والمعلومات التي تتركها فيه موجّهة إليها وحدها، لتتمكّن من الردّ عليك.",
      ],
    },
  },
  {
    id: "formulaires",
    title: {
      fr: "Ce que vous nous écrivez",
      en: "What you write to us",
      ar: "ما تكتبه إلينا",
    },
    body: {
      fr: [
        "Les formulaires de contact, d’inscription aux cours et de commande vous demandent ce qu’il faut pour vous répondre : votre nom, votre adresse e-mail, votre téléphone, votre message et, selon le cas, la technique et le niveau souhaités, ou l’adresse de livraison et le mode de règlement.",
        "Ces informations servent uniquement à répondre à votre demande, à organiser un cours ou à préparer une commande. Elles ne sont ni vendues, ni prêtées, ni utilisées pour de la publicité.",
        "Pour arriver jusqu’à l’artiste, votre message passe par Web3Forms, un service qui transmet les formulaires par e-mail. Il le reçoit, l’envoie dans sa boîte de réception, et s’arrête là.",
      ],
      en: [
        "The contact, course registration and order forms ask for what is needed to reply to you: your name, email address, phone number, your message and, depending on the form, the technique and level you are interested in, or the delivery address and payment method.",
        "This information is used only to answer your request, arrange a lesson or prepare an order. It is never sold, lent or used for advertising.",
        "To reach the artist, your message goes through Web3Forms, a service that forwards forms by email. It receives the message, delivers it to her inbox, and goes no further.",
      ],
      ar: [
        "تطلب منك استمارات الاتصال والتسجيل في الدروس والطلب ما يلزم للردّ عليك: اسمك، وبريدك الإلكتروني، ورقم هاتفك، ورسالتك، وبحسب الحالة التقنية والمستوى المرغوب فيهما، أو عنوان التسليم وطريقة الدفع.",
        "تُستعمل هذه المعلومات فقط للردّ على طلبك، أو لتنظيم درس، أو لتحضير طلبية. ولا تُباع ولا تُعار ولا تُستعمل لأيّ إشهار.",
        "ولتصل رسالتك إلى الفنانة، تمرّ عبر Web3Forms، وهي خدمة تنقل الاستمارات عبر البريد الإلكتروني: تتلقّى الرسالة، وتوصلها إلى صندوق بريدها، ولا تتجاوز ذلك.",
      ],
    },
  },
  {
    id: "navigateur",
    title: {
      fr: "Ce qui reste dans votre navigateur",
      en: "What stays in your browser",
      ar: "ما يبقى في متصفّحك",
    },
    body: {
      fr: [
        "Le site n’utilise aucun cookie et aucun outil de mesure d’audience. Personne ne suit votre visite.",
        "Deux petites notes restent seulement dans votre propre navigateur : le contenu de votre panier, pour qu’il vous attende si vous revenez, et le fait que vous avez déjà vu le film d’ouverture, pour ne pas vous le remontrer pendant la même visite. Elles ne quittent jamais votre appareil, et vous pouvez les effacer en vidant les données du site dans votre navigateur.",
      ],
      en: [
        "The site uses no cookies and no audience-measurement tools. No one tracks your visit.",
        "Only two small notes stay in your own browser: the contents of your cart, so that it waits for you if you come back, and the fact that you have already seen the opening film, so that it is not shown again during the same visit. They never leave your device, and you can erase them by clearing the site’s data in your browser.",
      ],
      ar: [
        "لا يستعمل الموقع أيّ ملفات تعريف ارتباط (كوكيز) ولا أيّ أداة لقياس الزيارات. لا أحد يتتبّع زيارتك.",
        "تبقى ملاحظتان صغيرتان فقط في متصفّحك أنت: محتوى سلّتك، لتجدها إن عدت، وكونك شاهدت فيلم الافتتاح، كي لا يُعرض عليك مجدداً خلال الزيارة نفسها. ولا تغادران جهازك أبداً، ويمكنك محوهما بمسح بيانات الموقع من متصفّحك.",
      ],
    },
  },
  {
    id: "videos",
    title: {
      fr: "Les vidéos",
      en: "Videos",
      ar: "الفيديوهات",
    },
    body: {
      fr: [
        "Les reportages sont hébergés sur YouTube. Leur image d’aperçu vient des serveurs de YouTube ; le lecteur, lui, ne se charge que si vous cliquez pour regarder, dans sa version « sans cookie ». Dès lors, ce que vous regardez relève des règles de confidentialité de YouTube.",
      ],
      en: [
        "The reports are hosted on YouTube. Their preview image comes from YouTube’s servers; the player itself loads only if you click to watch, in its “no-cookie” version. From then on, what you watch falls under YouTube’s privacy rules.",
      ],
      ar: [
        "الروبورتاجات مستضافة على يوتيوب. صورة المعاينة تأتي من خوادم يوتيوب، أمّا المشغّل فلا يُحمَّل إلّا إذا نقرت للمشاهدة، وفي نسخته «من دون كوكيز». ومن ثمّ، تخضع مشاهدتك لقواعد الخصوصية الخاصة بيوتيوب.",
      ],
    },
  },
  {
    id: "duree",
    title: {
      fr: "Combien de temps",
      en: "How long",
      ar: "إلى متى",
    },
    body: {
      fr: [
        "Vos messages sont gardés dans la boîte de réception de l’artiste le temps de vous répondre et de suivre votre demande — un cours, une commande —, puis ne sont plus utilisés.",
      ],
      en: [
        "Your messages are kept in the artist’s inbox for as long as it takes to reply and follow up on your request — a lesson, an order — and are not used afterwards.",
      ],
      ar: [
        "تُحفظ رسائلك في صندوق بريد الفنانة طوال المدّة اللازمة للردّ عليك ومتابعة طلبك — درساً كان أو طلبية — ثمّ لا تُستعمل بعد ذلك.",
      ],
    },
  },
  {
    id: "droits",
    title: {
      fr: "Vos droits",
      en: "Your rights",
      ar: "حقوقك",
    },
    body: {
      fr: [
        "Vous pouvez à tout moment demander à savoir ce que l’artiste a reçu de vous, le faire corriger ou le faire effacer. Il suffit d’écrire à l’adresse ci-dessous.",
      ],
      en: [
        "You may at any time ask to know what the artist has received from you, have it corrected or have it deleted. Simply write to the address below.",
      ],
      ar: [
        "يمكنك في أيّ وقت أن تطلب معرفة ما تلقّته الفنانة منك، أو تصحيحه، أو محوه. يكفي أن تكتب إلى العنوان أدناه.",
      ],
    },
  },
];
