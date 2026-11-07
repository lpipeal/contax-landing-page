import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const source = new URL("./contax-sin-fondo.png", import.meta.url);
const file = (name) => fileURLToPath(new URL(name, import.meta.url));
const master = await readFile(source);
const { data, info } = await sharp(master).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
assert.deepEqual([info.width, info.height, info.channels], [2172, 724, 4]);

await sharp(master).flatten({ background: "#061B37" }).png().toFile(file("contax-fondo-azul.png"));
await sharp(master).flatten({ background: "#000000" }).png().toFile(file("contax-fondo-negro.png"));

// Only the subtitle changes color on the white version, using its existing alpha.
const lightVersion = Buffer.from(data);
for (let y = 490; y <= 556; y++) {
  for (let x = 750; x <= 1900; x++) {
    const offset = (y * info.width + x) * 4;
    if (!lightVersion[offset + 3]) continue;
    lightVersion[offset] = 5;
    lightVersion[offset + 1] = 43;
    lightVersion[offset + 2] = 96;
  }
}
await sharp(lightVersion, { raw: { width: info.width, height: info.height, channels: 4 } })
  .flatten({ background: "#FFFFFF" }).png().toFile(file("contax-fondo-blanco.png"));

const variants = [
  ["contax-sin-fondo.png", "Sin fondo", "Cuadrícula de muestra", "checker"],
  ["contax-fondo-azul.png", "Fondo azul", "#061B37", "#061B37"],
  ["contax-fondo-blanco.png", "Fondo blanco", "Subtítulo azul marino", "#FFFFFF"],
  ["contax-fondo-negro.png", "Fondo negro", "#000000", "#000000"],
];
const panels = [];
const layers = [];
for (const [index, [asset, title, description, background]] of variants.entries()) {
  const x = index % 2 ? 812 : 48;
  const y = index < 2 ? 136 : 476;
  const labelColor = background === "#FFFFFF" ? "#142E50" : "#F7F0E1";
  panels.push(`<g transform="translate(${x} ${y})">
    <rect width="740" height="310" rx="14" fill="${background === "checker" ? "url(#checker)" : background}"/>
    <text x="24" y="40" fill="${labelColor}" font-family="Georgia, serif" font-size="27">${title}</text>
    <text x="716" y="39" text-anchor="end" fill="${labelColor}" opacity=".75" font-family="Arial, sans-serif" font-size="14">${description}</text>
  </g>`);
  const logo = await sharp(file(asset))
    .extract({ left: 27, top: 56, width: 2142, height: 532 })
    .resize({ width: 692 }).png().toBuffer();
  layers.push({ input: logo, left: x + 24, top: y + 94 });
}
const sheet = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="834" viewBox="0 0 1600 834">
  <defs><pattern id="checker" width="24" height="24" patternUnits="userSpaceOnUse"><rect width="24" height="24" fill="#3A4654"/><path d="M0 0H12V12H0ZM12 12H24V24H12Z" fill="#414F60"/></pattern></defs>
  <rect width="1600" height="834" fill="#F2EEE6"/>
  <text x="48" y="45" font-family="Arial, sans-serif" font-size="15" letter-spacing="3" fill="#93662A">CONTAX · VERSIONES CONSOLIDADAS</text>
  <text x="48" y="99" font-family="Georgia, serif" font-size="43" fill="#142E50">Una misma composición para cuatro fondos</text>
  ${panels.join("\n")}
</svg>`);
await sharp(sheet).composite(layers).png().toFile(file("comparativa.png"));

// Inspect the same O against all four export backgrounds at enlarged size.
const details = [];
const detailLayers = [];
for (const [index, [asset, title, , background]] of variants.entries()) {
  const x = 20 + index * 320;
  details.push(`<rect x="${x}" y="76" width="300" height="352" rx="10" fill="${background === "checker" ? "url(#checker)" : background}"/>
    <text x="${x + 16}" y="106" fill="${background === "#FFFFFF" ? "#142E50" : "#F7F0E1"}" font-family="Arial, sans-serif" font-size="18">${title}</text>`);
  const glyph = await sharp(file(asset))
    .extract({ left: 837, top: 196, width: 268, height: 266 })
    .resize({ width: 284 }).png().toBuffer();
  detailLayers.push({ input: glyph, left: x + 8, top: 127 });
}
const detailSheet = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1300" height="448">
  <defs><pattern id="checker" width="24" height="24" patternUnits="userSpaceOnUse"><rect width="24" height="24" fill="#3A4654"/><path d="M0 0H12V12H0ZM12 12H24V24H12Z" fill="#414F60"/></pattern></defs>
  <rect width="1300" height="448" fill="#F2EEE6"/>
  <text x="20" y="47" fill="#142E50" font-family="Georgia, serif" font-size="31">Revisión ampliada de la O</text>
  ${details.join("\n")}
</svg>`);
await sharp(detailSheet).composite(detailLayers).png().toFile(file("detalle-o.png"));
process.stdout.write("Generated four 2172 × 724 PNG exports and the comparison sheet.\n");
