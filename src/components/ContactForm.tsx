"use client";

import { useTranslations } from "next-intl";

import { useFormSender } from "@/lib/useFormSender";
import FormStatus from "@/components/FormStatus";

/* =============================================================================
   Formulaire de contact — la demande arrive directement dans la boîte de
   l'artiste (voir `useFormSender`).
   ========================================================================== */

const fieldClass =
  "mt-3 w-full border-b border-glow/20 bg-transparent pb-2.5 text-[0.95rem] text-ivory outline-none transition-colors duration-300 placeholder:text-sage-dim focus:border-glow";

export default function ContactForm() {
  const t = useTranslations("contact");
  const { status, send } = useFormSender();

  const fields = [
    { name: "name", label: t("formName"), type: "text" },
    { name: "email", label: t("formEmail"), type: "email" },
    { name: "subject", label: t("formSubject"), type: "text" },
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    // Le piège à robots : un humain ne voit pas cette case
    if (data.get("botcheck")) return;

    const ok = await send({
      subject: `Contact — ${data.get("subject")}`,
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      fields: {
        Sujet: String(data.get("subject") ?? ""),
        Message: String(data.get("message") ?? ""),
      },
    });
    if (ok) form.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-sm border border-glow/12 bg-night-2/50 p-7 sm:p-10"
    >
      <div className="space-y-6">
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="eyebrow block">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              required
              className={fieldClass}
            />
          </div>
        ))}

        <div>
          <label htmlFor="message" className="eyebrow block">
            {t("formMessage")}
          </label>
          <textarea
            id="message"
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
