import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Le badge des outils Next, en bas de l'écran, n'existe qu'en
  // développement — il n'atteint jamais le visiteur. On l'écarte tout de
  // même : il gêne pour juger du dessin.
  devIndicators: false,

  // Ouvrir le site de développement depuis le téléphone, sur le même Wi-Fi :
  // sans cela, Next bloque ses propres scripts et la page reste inerte.
  // Si l'ordinateur change d'adresse sur le réseau, la remplacer ici.
  allowedDevOrigins: ["192.168.100.7", "172.20.10.2"],

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  /*
    Le site est publié en fichiers statiques (dossier out/) : pas de serveur,
    donc rien qui puisse tomber, ni faille de serveur à corriger. Ce qu'un
    serveur faisait est fait autrement :
      • la langue, à l'arrivée sur « / »      → public/index.html
      • /divers → /livres                    → public/_redirects (Cloudflare)
      • les images à la bonne taille          → scripts/variantes-images.mjs
                                                 + src/lib/image-loader.ts
  */
  output: "export",

  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    // Les largeurs que scripts/variantes-images.mjs prépare (LARGEURS).
    deviceSizes: [640, 828, 1080, 1440, 1920, 2400],
    imageSizes: [320, 480],
  },
};

export default withNextIntl(nextConfig);
