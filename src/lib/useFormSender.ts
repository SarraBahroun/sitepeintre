"use client";

import { useState } from "react";

import { site } from "@/data/site";

/* =============================================================================
   Envoi des formulaires — Web3Forms
   -----------------------------------------------------------------------------
   Chaque demande part directement vers la boîte de l'artiste
   (site.email, déclarée auprès de Web3Forms), sans serveur à nous et sans
   que le visiteur quitte la page. La clé est publique par nature : elle ne
   permet que d'écrire à cette adresse-là.

   Les champs arrivent dans le mail sous les noms qu'on leur donne ici :
   on les nomme en français, pour l'artiste, quelle que soit la langue du
   visiteur. `replyto` permet de répondre d'un clic depuis Gmail.
   ========================================================================== */

const ENDPOINT = "https://api.web3forms.com/submit";

export type SendStatus = "idle" | "sending" | "sent" | "error";

export function useFormSender() {
  const [status, setStatus] = useState<SendStatus>("idle");

  const send = async ({
    subject,
    name,
    email,
    fields,
  }: {
    subject: string;
    name: string;
    email: string;
    fields: Record<string, string>;
  }) => {
    setStatus("sending");
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: site.web3formsKey,
          subject,
          from_name: `${site.name} — site`,
          replyto: email,
          Nom: name,
          "E-mail": email,
          ...fields,
        }),
      });
      const result = await response.json();
      setStatus(result.success ? "sent" : "error");
      return Boolean(result.success);
    } catch {
      setStatus("error");
      return false;
    }
  };

  return { status, send };
}
