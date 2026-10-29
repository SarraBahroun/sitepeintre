import { getTranslations } from "next-intl/server";
import { ActionLink, Section } from "@/components/ui";

export default async function NotFound() {
  const t = await getTranslations("common");

  return (
    <Section className="flex min-h-[70svh] flex-col items-center justify-center py-40 text-center">
      <p className="font-display text-[clamp(5rem,16vw,11rem)] font-light leading-none text-glow/20">
        404
      </p>
      <h1 className="mt-6 font-display text-[clamp(1.6rem,4vw,2.6rem)] font-light text-ivory">
        {t("notFound")}
      </h1>
      <div className="rule-glow mt-8 w-40" aria-hidden />
      <div className="mt-10">
        <ActionLink href="/">{t("backHome")}</ActionLink>
      </div>
    </Section>
  );
}
