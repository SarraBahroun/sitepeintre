"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { useCart } from "@/lib/cart";
import { CartIcon } from "./AddToCart";

/* =============================================================================
   Le panier dans la barre de navigation — le nombre d'œuvres en pastille.
   ========================================================================== */

export default function CartButton() {
  const t = useTranslations("cart");
  const { count } = useCart();

  return (
    <Link
      href="/panier"
      aria-label={`${t("title")} (${count})`}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-glow/15 text-sage transition-colors duration-300 hover:border-glow/40 hover:text-glow"
    >
      <CartIcon size={18} />
      {count > 0 && (
        <span className="absolute -end-1 -top-1 flex h-[1.15rem] min-w-[1.15rem] items-center justify-center rounded-full bg-gold px-1 text-[0.62rem] font-semibold text-night">
          {count}
        </span>
      )}
    </Link>
  );
}
