"use client";

import { useParams } from "next/navigation";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  locales,
  localeShort,
  localeLabels,
  type Locale,
} from "@/i18n/routing";

/* =============================================================================
   Bascule de langue — garde la page courante, change seulement le préfixe.
   ========================================================================== */

export default function LocaleSwitcher({
  current,
  className = "",
}: {
  current: Locale;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: Locale) => {
    if (next === current) return;
    startTransition(() => {
      router.replace(
        // @ts-expect-error — les segments dynamiques sont repris tels quels
        { pathname, params },
        { locale: next },
      );
    });
  };

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      role="group"
      aria-label={localeLabels[current]}
      data-pending={isPending || undefined}
    >
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center">
          {i > 0 && (
            <span aria-hidden className="px-1 text-[0.6rem] text-sage-dim/50">
              ·
            </span>
          )}
          <button
            type="button"
            onClick={() => switchTo(locale)}
            aria-current={locale === current ? "true" : undefined}
            lang={locale}
            title={localeLabels[locale]}
            className={`rounded-sm px-1.5 py-1 text-[0.72rem] font-medium tracking-[0.12em] transition-all duration-300 ${
              locale === current
                ? "text-glow halo"
                : "text-sage-dim hover:text-ivory"
            } ${isPending ? "opacity-60" : ""}`}
          >
            {localeShort[locale]}
          </button>
        </span>
      ))}
    </div>
  );
}
