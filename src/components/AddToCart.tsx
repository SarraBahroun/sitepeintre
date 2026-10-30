"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { useCart, type CartItem } from "@/lib/cart";

/* =============================================================================
   Ajouter au panier — dans la fiche d'une œuvre disponible.
   Une fois l'œuvre ajoutée, le bouton devient un chemin vers le panier :
   une toile unique ne s'ajoute pas deux fois.
   ========================================================================== */

const primary =
  "inline-flex w-full items-center justify-center gap-2.5 rounded-sm border px-6 py-3.5 text-[0.76rem] font-medium uppercase tracking-[0.18em] transition-all duration-400";

export default function AddToCart({ item }: { item: CartItem }) {
  const t = useTranslations("cart");
  const tc = useTranslations("artwork");
  const { has, add } = useCart();
  const inCart = has(item.id);

  return (
    <div className="space-y-3">
      {inCart ? (
        <Link
          href="/panier"
          className={`${primary} border-gold/50 bg-gold/10 text-gold hover:border-gold hover:bg-gold/20`}
        >
          <svg width="14" height="11" viewBox="0 0 14 11" aria-hidden>
            <path
              d="M1 5.5l4 4L13 1"
              stroke="currentColor"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {t("inCart")} — {t("view")}
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => add(item)}
          className={`${primary} border-glow/40 bg-glow/10 text-glow hover:border-glow/80 hover:bg-glow/20`}
        >
          <CartIcon />
          {t("add")}
        </button>
      )}

      <Link
        href="/contact"
        className="block text-center text-[0.72rem] uppercase tracking-[0.16em] text-sage-dim transition-colors hover:text-sage"
      >
        {tc("inquire")}
      </Link>
    </div>
  );
}

export function CartIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 8h14l-1.2 11.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 10V6.5a3 3 0 0 1 6 0V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
