import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Cormorant_Garamond, Inter, Amiri, Cairo } from "next/font/google";

import { routing, type Locale } from "@/i18n/routing";
import JungleBackdrop from "@/components/JungleBackdrop";
import Intro from "@/components/Intro";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "../globals.css";

/* --- Typographies ------------------------------------------------------- */

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
});

/* --- Métadonnées -------------------------------------------------------- */

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    ),
    title: {
      default: `${t("siteName")} — ${t("tagline")}`,
      template: `%s · ${t("siteName")}`,
    },
    description: t("description"),
    openGraph: {
      title: `${t("siteName")} — ${t("tagline")}`,
      description: t("description"),
      type: "website",
      locale,
    },
  };
}

/* --- Gabarit ------------------------------------------------------------ */

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${cormorant.variable} ${inter.variable} ${amiri.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <body className="relative min-h-dvh">
        <NextIntlClientProvider>
          <Intro locale={locale as Locale} />
          <JungleBackdrop />
          <div className="relative z-10 flex min-h-dvh flex-col">
            <Nav locale={locale as Locale} />
            <main className="flex-1">{children}</main>
            <Footer locale={locale as Locale} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
