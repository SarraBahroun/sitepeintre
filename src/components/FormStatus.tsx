"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { site } from "@/data/site";
import type { SendStatus } from "@/lib/useFormSender";

/* =============================================================================
   Le bouton d'envoi et la ligne qui dit où en est la demande — communs au
   formulaire de contact et à celui des cours.
   En cas d'échec, l'adresse de l'artiste reste à portée : la demande ne se
   perd pas.
   ========================================================================== */

export default function FormStatus({
  status,
  sendLabel,
}: {
  status: SendStatus;
  sendLabel: string;
}) {
  const t = useTranslations("contact");
  const tp = useTranslations("privacy");

  return (
    <>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-10 w-full rounded-sm border border-glow/35 bg-glow/5 px-7 py-4 text-[0.76rem] font-medium uppercase tracking-[0.2em] text-glow transition-all duration-400 hover:border-glow/70 hover:bg-glow/15 disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending" ? t("formSending") : sendLabel}
      </button>

      <p
        role="status"
        className={`mt-5 text-center text-xs leading-relaxed transition-colors duration-500 ${
          status === "sent"
            ? "text-glow"
            : status === "error"
              ? "text-ivory"
              : "text-sage-dim"
        }`}
      >
        {status === "sent" && t("formSent")}
        {status === "error" && (
          <>
            {t("formError")}{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-glow underline underline-offset-4"
            >
              <bdi dir="ltr">{site.email}</bdi>
            </a>
          </>
        )}
        {(status === "idle" || status === "sending") && (
          <>
            {t("formNote")}{" "}
            <Link
              href="/confidentialite"
              className="underline decoration-sage-dim/50 underline-offset-4 transition-colors duration-300 hover:text-glow"
            >
              {tp("formNote")}
            </Link>
          </>
        )}
      </p>
    </>
  );
}
