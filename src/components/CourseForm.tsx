"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { courses, site } from "@/data/site";
import { t as tr } from "@/data/types";
import type { Locale } from "@/i18n/routing";

/* =============================================================================
   Demande d'inscription aux cours
   -----------------------------------------------------------------------------
   En attendant un service d'envoi (Resend, Formspree…), le formulaire compose
   un message prérempli et l'ouvre dans la messagerie du visiteur. Rien n'est
   perdu : la demande part bien, signée par l'expéditeur.
   ========================================================================== */

const fieldClass =
  "mt-3 w-full border-b border-glow/20 bg-transparent pb-2.5 text-[0.95rem] text-ivory outline-none transition-colors duration-300 focus:border-glow";

export default function CourseForm({ locale }: { locale: Locale }) {
  const t = useTranslations("courses");
  const tc = useTranslations("contact");
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const lines = [
      `${tc("formName")} : ${data.get("name")}`,
      `${tc("formEmail")} : ${data.get("email")}`,
      `${tc("phone")} : ${data.get("phone")}`,
      `${t("formFormula")} : ${data.get("formula")}`,
      `${t("formLevel")} : ${data.get("level")}`,
      "",
      `${t("formQuestion")} :`,
      String(data.get("message") ?? ""),
    ];

    const subject = `${t("title")} — ${data.get("name")}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  };

  const levels = [
    t("formLevelBeginner"),
    t("formLevelIntermediate"),
    t("formLevelAdvanced"),
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-sm border border-glow/12 bg-night-2/50 p-7 sm:p-10"
    >
      <div className="space-y-6">
        <div>
          <label htmlFor="c-name" className="eyebrow block">
            {tc("formName")}
          </label>
          <input id="c-name" name="name" type="text" required className={fieldClass} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="c-email" className="eyebrow block">
              {tc("formEmail")}
            </label>
            <input
              id="c-email"
              name="email"
              type="email"
              required
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="c-phone" className="eyebrow block">
              {tc("phone")}
            </label>
            <input id="c-phone" name="phone" type="tel" className={fieldClass} />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="c-formula" className="eyebrow block">
              {t("formFormula")}
            </label>
            <select
              id="c-formula"
              name="formula"
              defaultValue=""
              className={`${fieldClass} [&>option]:bg-night-2 [&>option]:text-ivory`}
            >
              <option value="">{t("formFormulaAny")}</option>
              {courses.formulas.map((formula) => (
                <option key={formula.id} value={tr(formula.title, locale)}>
                  {tr(formula.title, locale)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="c-level" className="eyebrow block">
              {t("formLevel")}
            </label>
            <select
              id="c-level"
              name="level"
              defaultValue={levels[0]}
              className={`${fieldClass} [&>option]:bg-night-2 [&>option]:text-ivory`}
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="c-message" className="eyebrow block">
            {t("formQuestion")}
          </label>
          <textarea
            id="c-message"
            name="message"
            rows={5}
            required
            className={`${fieldClass} resize-none leading-relaxed`}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-10 w-full rounded-sm border border-glow/35 bg-glow/5 px-7 py-4 text-[0.76rem] font-medium uppercase tracking-[0.2em] text-glow transition-all duration-400 hover:border-glow/70 hover:bg-glow/15"
      >
        {t("formSend")}
      </button>

      <p
        className={`mt-5 text-center text-xs transition-colors duration-500 ${
          sent ? "text-glow" : "text-sage-dim"
        }`}
        role="status"
      >
        {sent ? site.email : tc("formNote")}
      </p>
    </form>
  );
}
