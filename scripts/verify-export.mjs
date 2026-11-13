import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import path from "node:path";

// Validate the actual deployment artifact, including links and approved branding.
for (const [file, heading] of [
  ["index.html", "Construimos empresas"],
  ["en.html", "We build"],
]) {
  const html = await readFile(`out/${file}`, "utf8");
  assert(
    html.includes(file === "index.html" ? 'lang="es"' : 'lang="en"'),
    `${file}: incorrect document language`,
  );
  assert(html.includes(heading), `${file}: missing localized heading`);
  assert.equal(
    (html.match(/<h1[ >]/g) ?? []).length,
    1,
    `${file}: expected one h1`,
  );
  assert(
    html.includes("noindex"),
    `${file}: review release must not be indexed`,
  );
  assert(
    html.includes("contax-logo-consolidado-transparente.webp"),
    `${file}: approved logo missing`,
  );
  assert(
    !html.includes("/_next/image"),
    `${file}: requires a runtime image server`,
  );
  const ids = new Set(
    [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]),
  );
  for (const [, target] of html.matchAll(/href="#([^"]+)"/g))
    assert(ids.has(target), `${file}: broken fragment #${target}`);
  for (const [, url] of html.matchAll(
    /(?:src|href)="(\/[^"?#]+)(?:[?#][^"]*)?"/g,
  )) {
    if (url === "/" || url === "/en") continue;
    await access(path.join("out", url));
  }
  assert(
    html.includes("https://wa.me/13463398946"),
    `${file}: wrong WhatsApp destination`,
  );
}
for (const file of [
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "contax/growth-scene.svg",
])
  await access(`out/${file}`);
console.log(
  "Static export verified: Spanish, English, navigation, local assets, branding and contact destination.",
);
