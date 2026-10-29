"use client";

import { useEffect, useState } from "react";

/* =============================================================================
   Le rideau est-il levé ?
   -----------------------------------------------------------------------------
   L'ouverture pose data-intro="running" sur la racine tant qu'elle joue, et
   le retire en se fermant. Les pages y lisent le moment où elles entrent en
   scène, pour ne pas jouer leur arrivée derrière un rideau fermé.

   Sans ouverture — page intérieure, visite déjà faite, animations réduites —
   l'attribut n'existe pas et le rideau est réputé levé d'emblée.
   ========================================================================== */

export function useCurtain(): boolean {
  const [raised, setRaised] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const check = () => setRaised(root.dataset.intro !== "running");
    check();

    const observer = new MutationObserver(check);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-intro"],
    });
    return () => observer.disconnect();
  }, []);

  return raised;
}
