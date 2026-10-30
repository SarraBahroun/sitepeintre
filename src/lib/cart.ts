"use client";

import { useSyncExternalStore } from "react";

import type { Artwork, Localized } from "@/data/types";

/* =============================================================================
   Le panier
   -----------------------------------------------------------------------------
   Gardé dans le navigateur du visiteur (localStorage) : il survit à un
   rechargement, à la fermeture de l'onglet, au changement de langue. Rien ne
   part tant que la commande n'est pas envoyée.

   Chaque toile est unique : une ligne par œuvre, jamais de quantité. Le
   panier sait aussi accueillir d'autres créations (les bijoux viendront),
   d'où `kind`.

   Aucun paiement en ligne : la commande est une demande, que l'artiste
   confirme, et le règlement se fait en espèces ou par chèque.
   ========================================================================== */

export type CartItem = {
  id: string;
  kind: "artwork" | "jewel";
  title: Localized;
  image: string;
  price?: number;
  currency?: Artwork["currency"];
  /** D'où vient l'œuvre : « La Jungle 2 »… pour l'artiste qui reçoit. */
  origin?: string;
};

const KEY = "hb-cart";
const EMPTY: CartItem[] = [];
const listeners = new Set<() => void>();

let cache: CartItem[] | null = null;

function read(): CartItem[] {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as CartItem[]) : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(items: CartItem[]) {
  cache = items;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // Navigation privée, stockage plein : le panier vit le temps de la page.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Un autre onglet a changé le panier
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    cache = null;
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useCart() {
  const items = useSyncExternalStore(subscribe, read, () => EMPTY);

  return {
    items,
    count: items.length,
    has: (id: string) => items.some((item) => item.id === id),
    add: (item: CartItem) => {
      if (read().some((i) => i.id === item.id)) return;
      write([...read(), item]);
    },
    remove: (id: string) => write(read().filter((item) => item.id !== id)),
    clear: () => write(EMPTY),
  };
}
