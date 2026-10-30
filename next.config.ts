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
  allowedDevOrigins: ["192.168.100.7"],

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);
