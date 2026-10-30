"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { t as tr, formatPrice } from "@/data/types";
import { useCart, type CartItem } from "@/lib/cart";
import { useFormSender } from "@/lib/useFormSender";
import FormStatus from "./FormStatus";

/* =============================================================================
   Le panier et la commande
   -----------------------------------------------------------------------------
   La commande est une demande : elle part dans la boîte de l'artiste, qui
   rappelle pour confirmer, convenir de la remise et du règlement — en
   espèces ou par chèque. Aucun paiement en ligne.
   Le mail est écrit en français, pour l'artiste, quelle que soit la langue
   du visiteur.
   ========================================================================== */

const fieldClass =
  "mt-3 w-full border-b border-glow/20 bg-transparent pb-2.5 text-[0.95rem] text-ivory outline-none transition-colors duration-300 focus:border-glow";

/** Référence courte, pour en parler au téléphone : HB-251030-4821 */
function orderReference() {
  const d = new Date();
  const stamp = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  return `HB-${stamp}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function totalOf(items: CartItem[]) {
  const priced = items.filter((item) => typeof item.price === "number");
  return {
    sum: priced.reduce((acc, item) => acc + (item.price ?? 0), 0),
    currency: priced[0]?.currency ?? "TND",
    complete: priced.length === items.length,
  };
}

export default function CartView({ locale }: { locale: Locale }) {
  const t = useTranslations("cart");
  const tc = useTranslations("contact");
  const ta = useTranslations("artwork");
  const { items, remove, clear } = useCart();
  const { status, send } = useFormSender();
  const [done, setDone] = useState<{ reference: string } | null>(null);

  const untitled = locale === "ar" ? "بدون عنوان" : "Sans titre";
  const total = totalOf(items);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("botcheck")) return;
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const reference = orderReference();
    // Les œuvres, une par ligne, lisibles d'un coup d'œil dans Gmail
    const lines = items.map((item, i) => {
      const price =
        formatPrice(item.price, item.currency, "fr") ?? "prix sur demande";
      const title = item.title.fr || "Sans titre";
      return `${i + 1}. ${title}${item.origin ? ` — ${item.origin}` : ""} — ${price} (réf. ${item.id})`;
    });
    const totalLine = total.complete
      ? formatPrice(total.sum, total.currency, "fr")
      : total.sum > 0
        ? `${formatPrice(total.sum, total.currency, "fr")} + œuvres sur demande`
        : "à établir (prix sur demande)";

    const ok = await send({
      subject: `Commande ${reference} — ${get("name")}`,
      name: get("name"),
      email: get("email"),
      fields: {
        Référence: reference,
        Téléphone: get("phone"),
        Ville: get("city"),
        Adresse: get("address") || "—",
        Remise: get("delivery"),
        Règlement: get("payment"),
        Œuvres: lines.join("\n"),
        Total: totalLine ?? "",
        Message: get("message") || "—",
        "Langue du site": locale,
      },
    });
    if (ok) {
      clear();
      setDone({ reference });
    }
  };

  /* --- Commande envoyée --------------------------------------------------- */
  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-xl rounded-sm border border-glow/20 bg-night-2/50 px-7 py-14 text-center sm:px-12"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-glow/40 text-glow">
          <svg width="20" height="15" viewBox="0 0 14 11" aria-hidden>
            <path
              d="M1 5.5l4 4L13 1"
              stroke="currentColor"
              strokeWidth="1.3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h2 className="mt-7 font-display text-[clamp(1.7rem,3.4vw,2.4rem)] font-light text-ivory">
          {t("sentTitle")}
        </h2>
        <p className="mt-5 leading-relaxed text-sage">{t("sentBody")}</p>
        <p className="mt-7 text-[0.72rem] uppercase tracking-[0.18em] text-sage-dim">
          {t("reference")}
        </p>
        <p className="mt-2 font-display text-2xl text-gold">
          <bdi dir="ltr">{done.reference}</bdi>
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="text-[0.76rem] font-medium uppercase tracking-[0.2em] text-glow"
          >
            {t("continue")}
          </Link>
        </div>
      </motion.div>
    );
  }

  /* --- Panier vide -------------------------------------------------------- */
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-sm border border-dashed border-glow/15 bg-night-2/40 px-8 py-16 text-center">
        <p className="font-display text-2xl font-light text-ivory">
          {t("empty")}
        </p>
        <p className="mt-4 text-sage">{t("emptyLead")}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            href="/expositions/jungle-1"
            className="rounded-full border border-glow/30 px-5 py-2.5 text-[0.74rem] uppercase tracking-[0.16em] text-glow transition-colors hover:border-glow/70"
          >
            La Jungle 1
          </Link>
          <Link
            href="/expositions/jungle-2"
            className="rounded-full border border-glow/30 px-5 py-2.5 text-[0.74rem] uppercase tracking-[0.16em] text-glow transition-colors hover:border-glow/70"
          >
            La Jungle 2
          </Link>
        </div>
      </div>
    );
  }

  /* --- Panier et formulaire ----------------------------------------------- */
  return (
    <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
      {/* Les œuvres choisies */}
      <div>
        <ul className="divide-y divide-glow/10 border-y border-glow/10">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.li
                key={item.id}
                layout
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-5 py-5"
              >
                <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-night-2">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  {item.origin && (
                    <p className="text-[0.66rem] uppercase tracking-[0.18em] text-sage-dim">
                      {item.origin}
                    </p>
                  )}
                  <p className="mt-1 font-display text-lg font-light text-ivory">
                    {tr(item.title, locale) || (
                      <span className="italic text-sage-dim">{untitled}</span>
                    )}
                  </p>
                  <p className="mt-1 text-sm text-gold">
                    {formatPrice(item.price, item.currency, locale) ??
                      ta("onRequest")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  aria-label={t("remove")}
                  title={t("remove")}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-glow/15 text-sage-dim transition-colors hover:border-glow/45 hover:text-ivory"
                >
                  <svg width="11" height="11" viewBox="0 0 14 14" aria-hidden>
                    <path
                      d="M1 1l12 12M13 1L1 13"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <div className="mt-6 flex items-baseline justify-between gap-4">
          <p className="eyebrow">{t("total")}</p>
          <p className="text-end font-display text-2xl text-ivory">
            {total.sum > 0 && formatPrice(total.sum, total.currency, locale)}
            {!total.complete && (
              <span className="block text-sm text-sage">
                {total.sum > 0 ? `+ ${t("toConfirm")}` : t("onRequestTotal")}
              </span>
            )}
          </p>
        </div>

        {/* Comment cela se passe */}
        <div className="mt-10 rounded-sm border border-gold/20 bg-gold/[0.04] p-6">
          <p className="eyebrow text-gold">{t("howTitle")}</p>
          <ol className="mt-4 space-y-2.5 text-[0.92rem] leading-relaxed text-sage">
            <li>1. {t("how1")}</li>
            <li>2. {t("how2")}</li>
            <li>3. {t("how3")}</li>
          </ol>
        </div>
      </div>

      {/* La commande */}
      <form
        onSubmit={handleSubmit}
        className="rounded-sm border border-glow/12 bg-night-2/50 p-7 sm:p-10"
      >
        <p className="eyebrow">{t("formTitle")}</p>

        <div className="mt-8 space-y-6">
          <div>
            <label htmlFor="o-name" className="eyebrow block">
              {tc("formName")}
            </label>
            <input id="o-name" name="name" required className={fieldClass} />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="o-phone" className="eyebrow block">
                {tc("phone")}
              </label>
              <input
                id="o-phone"
                name="phone"
                type="tel"
                required
                dir="ltr"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="o-email" className="eyebrow block">
                {tc("formEmail")}
              </label>
              <input
                id="o-email"
                name="email"
                type="email"
                dir="ltr"
                className={fieldClass}
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="o-city" className="eyebrow block">
                {t("city")}
              </label>
              <input id="o-city" name="city" required className={fieldClass} />
            </div>
            <div>
              <label htmlFor="o-address" className="eyebrow block">
                {t("address")}
              </label>
              <input id="o-address" name="address" className={fieldClass} />
            </div>
          </div>

          <Choice
            legend={t("delivery")}
            name="delivery"
            options={[
              { value: "Retrait à l'atelier (Nabeul)", label: t("pickup") },
              { value: "Livraison", label: t("shipping") },
            ]}
          />

          <Choice
            legend={t("payment")}
            name="payment"
            options={[
              { value: "Espèces", label: t("cash") },
              { value: "Chèque", label: t("cheque") },
            ]}
          />

          <div>
            <label htmlFor="o-message" className="eyebrow block">
              {tc("formMessage")}
            </label>
            <textarea
              id="o-message"
              name="message"
              rows={3}
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

        <p className="mt-8 text-xs leading-relaxed text-sage-dim">
          {t("noOnlinePayment")}
        </p>

        <FormStatus status={status} sendLabel={t("send")} />
      </form>
    </div>
  );
}

/** Un choix exclusif, présenté en deux pastilles. Le premier est retenu. */
function Choice({
  legend,
  name,
  options,
}: {
  legend: string;
  name: string;
  options: { value: string; label: string }[];
}) {
  return (
    <fieldset>
      <legend className="eyebrow">{legend}</legend>
      <div className="mt-4 flex flex-wrap gap-3">
        {options.map((option, i) => (
          <label key={option.value} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              defaultChecked={i === 0}
              className="peer sr-only"
            />
            <span className="inline-block rounded-full border border-glow/20 px-5 py-2.5 text-[0.86rem] text-sage transition-all duration-300 peer-checked:border-glow/70 peer-checked:bg-glow/10 peer-checked:text-glow peer-focus-visible:ring-1 peer-focus-visible:ring-glow">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
