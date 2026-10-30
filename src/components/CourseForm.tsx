"use client";

import { useTranslations } from "next-intl";

import { courses } from "@/data/site";
import { t as tr } from "@/data/types";
import type { Locale } from "@/i18n/routing";
import { useFormSender } from "@/lib/useFormSender";
import FormStatus from "@/components/FormStatus";

/* =============================================================================
   Demande d'inscription aux cours
   -----------------------------------------------------------------------------
   La demande arrive directement dans la boîte de l'artiste (voir
   `useFormSender`), sans que le visiteur quitte la page.
   ========================================================================== */

const fieldClass =
  "mt-3 w-full border-b border-glow/20 bg-transparent pb-2.5 text-[0.95rem] text-ivory outline-none transition-colors duration-300 focus:border-glow";

export default function CourseForm({ locale }: { locale: Locale }) {
  const t = useTranslations("courses");
  const tc = useTranslations("contact");
  const { status, send } = useFormSender();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    // Le piège à robots : un humain ne voit pas cette case
    if (data.get("botcheck")) return;

    const get = (key: string) => String(data.get(key) ?? "");
    const ok = await send({
      subject: `Cours de peinture — ${get("name")}`,
      name: get("name"),
      email: get("email"),
      fields: {
        Téléphone: get("phone"),
        Formule: get("formula") || "—",
        Niveau: get("level"),
        Message: get("message"),
      },
    });
    if (ok) form.reset();
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
          <input
            id="c-name"
            name="name"
            type="text"
            required
            className={fieldClass}
          />
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
            <input
              id="c-phone"
              name="phone"
              type="tel"
              className={fieldClass}
            />
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

        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="hidden"
        />
      </div>

      <FormStatus status={status} sendLabel={t("formSend")} />
    </form>
  );
}
