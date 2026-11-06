/* =============================================================================
   Voir le site construit, sur l'ordinateur et le téléphone
   -----------------------------------------------------------------------------
   npm run build, puis npm run voir → http://localhost:3000
   (et, sur le même Wi-Fi, http://<adresse de l'ordinateur>:3000)

   Sert le dossier out/ comme le fera Cloudflare : /fr/livres trouve
   fr/livres.html, les redirections de public/_redirects s'appliquent, une
   adresse inconnue reçoit 404.html, et les vidéos se lisent par morceaux
   (en-têtes Range) — Safari ne lit pas une vidéo autrement.
   Aucune dépendance : seulement Node.
   ========================================================================== */

import { createServer } from "node:http";
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { networkInterfaces } from "node:os";

const RACINE = "out";
const PORT = Number(process.env.PORT ?? 3000);

if (!existsSync(RACINE)) {
  console.error("Pas de dossier out/ : lancer d'abord « npm run build ».");
  process.exit(1);
}

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".mp3": "audio/mpeg",
};

/** Les règles de public/_redirects, « /:lang/divers /:lang/livres 301 ». */
const redirections = (() => {
  const fichier = join(RACINE, "_redirects");
  if (!existsSync(fichier)) return [];
  return readFileSync(fichier, "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const [de, vers, code = "302"] = l.split(/\s+/);
      const noms = [];
      const motif = new RegExp(
        "^" +
          de.replace(/:(\w+)/g, (_, nom) => {
            noms.push(nom);
            return "([^/]+)";
          }) +
          "/?$",
      );
      return { motif, noms, vers, code: Number(code) };
    });
})();

function trouver(chemin) {
  const candidats = [
    chemin,
    `${chemin}.html`,
    join(chemin, "index.html"),
  ].map((c) => join(RACINE, normalize(c)));
  return candidats.find((c) => existsSync(c) && statSync(c).isFile());
}

const serveur = createServer((req, res) => {
  const url = new URL(req.url ?? "/", "http://local");
  let chemin = decodeURIComponent(url.pathname);
  if (chemin.includes("..")) {
    res.writeHead(400).end();
    return;
  }

  for (const r of redirections) {
    const m = chemin.match(r.motif);
    if (!m) continue;
    let vers = r.vers;
    r.noms.forEach((nom, i) => (vers = vers.replace(`:${nom}`, m[i + 1])));
    res.writeHead(r.code, { Location: vers + url.search }).end();
    return;
  }

  if (chemin.length > 1 && chemin.endsWith("/")) chemin = chemin.slice(0, -1);
  let fichier = trouver(chemin);
  let statut = 200;
  if (!fichier) {
    fichier = join(RACINE, "404.html");
    statut = 404;
    if (!existsSync(fichier)) {
      res.writeHead(404).end("404");
      return;
    }
  }

  const taille = statSync(fichier).size;
  const type = TYPES[extname(fichier).toLowerCase()] ?? "application/octet-stream";
  const plage = req.headers.range?.match(/bytes=(\d*)-(\d*)/);

  if (plage && statut === 200) {
    const debut = plage[1] ? Number(plage[1]) : taille - Number(plage[2]);
    const fin = plage[1] && plage[2] ? Number(plage[2]) : taille - 1;
    if (debut >= taille || fin >= taille || debut > fin) {
      res.writeHead(416, { "Content-Range": `bytes */${taille}` }).end();
      return;
    }
    res.writeHead(206, {
      "Content-Type": type,
      "Content-Length": fin - debut + 1,
      "Content-Range": `bytes ${debut}-${fin}/${taille}`,
      "Accept-Ranges": "bytes",
    });
    createReadStream(fichier, { start: debut, end: fin }).pipe(res);
    return;
  }

  res.writeHead(statut, {
    "Content-Type": type,
    "Content-Length": taille,
    "Accept-Ranges": "bytes",
  });
  if (req.method === "HEAD") res.end();
  else createReadStream(fichier).pipe(res);
});

serveur.listen(PORT, "0.0.0.0", () => {
  const adresses = Object.values(networkInterfaces())
    .flat()
    .filter((a) => a && a.family === "IPv4" && !a.internal)
    .map((a) => `http://${a.address}:${PORT}`);
  console.log(`Le site : http://localhost:${PORT}`);
  for (const a of adresses) console.log(`Sur le téléphone (même Wi-Fi) : ${a}`);
});
