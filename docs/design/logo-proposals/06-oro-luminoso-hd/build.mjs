import { createHash } from "node:crypto";
import { mkdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const original = await readFile(new URL("../r001/assets/contax-06-oro-luminoso.svg", import.meta.url));
const brandPng = await readFile(new URL("../../../../public/contax-logo.png", import.meta.url));
const width = 1471;
const height = 340;
const scale = 4;
const sourceHash = createHash("sha256").update(brandPng).digest("hex");
if (!original.includes(`source-sha256:${sourceHash};geometry:original-raster;proposal:06`)) {
  throw new Error("The logo source no longer matches proposal 06; review the pixel coordinates before exporting.");
}
const output = new URL("./assets/", import.meta.url);
await mkdir(output, { recursive: true });
const file = (name) => fileURLToPath(new URL(name, output));

// Render the selected color treatment at source size so the SVG's color masks
// use the same original pixels. Then refine the resampled edge transitions.
const source = await sharp(original).ensureAlpha().raw().toBuffer();
const brand = await sharp(brandPng).ensureAlpha().raw().toBuffer();
const accentColors = Buffer.from(source);
const goldStops = [[178, 130, 56], [243, 214, 154], [201, 155, 77]];
const clamp = (v) => Math.max(0, Math.min(1, v));
const index = (x, y) => (y * width + x) * 4;

// The original 06 uses a binary color mask on the A/X. At high zoom, isolated
// edge pixels can fall in the wrong color. Resolve the finish from nearby
// interior pixels and leave every source alpha value and all spacing intact.
for (let y = 0; y < 289; y++) {
  const position = 2 * ((y + 0.5) / height);
  const stop = Math.floor(position);
  const gold = goldStops[stop].map((c, channel) => c + (goldStops[stop + 1][channel] - c) * (position - stop));
  for (let x = 1070; x < width; x++) {
    const i = index(x, y);
    if (!brand[i + 3]) continue;
    let weight = 0;
    let tone = 0;
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        if (x + dx < 1070 || x + dx >= width || y + dy < 0) continue;
        const j = index(x + dx, y + dy);
        const w = (brand[j + 3] / 255) ** 3 / (1 + dx * dx + dy * dy);
        weight += w;
        tone += w * (brand[j + 2] - 1.375 * brand[j + 1] - 2.4);
      }
    }
    // A crossbar and X slash/lower stroke keep their original color accents.
    const goldCoverage = x < 1235 && (y < 182 || y > 209) ? 1
      : x >= 1235 && (y < 80 || y > 164 || x > 1370) ? 0
        : clamp((tone / weight + 3) / 9);
    for (let c = 0; c < 3; c++) {
      accentColors[i + c] = Math.round(brand[i + c] + goldCoverage * (gold[c] - brand[i + c]));
    }
  }
}

// Suppress isolated colored fringes on partially transparent edges. The
// opaque artwork and native-resolution silhouette are kept as-is.
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = index(x, y);
    const a = accentColors[i + 3];
    if (!a) continue;
    let weight = 0;
    const inner = [0, 0, 0];
    if (a < 224) {
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          if (x + dx < 0 || x + dx >= width || y + dy < 0 || y + dy >= height) continue;
          const j = index(x + dx, y + dy);
          const w = Math.max(0, (accentColors[j + 3] - a) / 255) ** 2 / (1 + dx * dx + dy * dy);
          weight += w;
          for (let c = 0; c < 3; c++) inner[c] += w * accentColors[j + c];
        }
      }
    }
    const blend = weight > 0.01 ? 0.8 * (1 - a / 224) : 0;
    for (let c = 0; c < 3; c++) {
      source[i + c] = blend
        ? Math.round(accentColors[i + c] * (1 - blend) + (inner[c] / weight) * blend)
        : accentColors[i + c];
    }
  }
}

const raster = (pixels, w, h) => sharp(pixels, { raw: { width: w, height: h, channels: 4 } });
const masterWidth = width * scale;
const masterHeight = height * scale;
const master = await raster(source, width, height)
  .resize(masterWidth, masterHeight, { kernel: sharp.kernel.cubic })
  .raw()
  .toBuffer();

// Tighten the soft part of the edge without moving its 50% alpha contour.
// Color, opaque detail and fully transparent pixels are left intact.
for (let i = 3; i < master.length; i += 4) {
  const a = master[i] / 255;
  master[i] = Math.round(255 * (a + 0.8 * a * (1 - a) * (a - 0.5)));
}

await raster(master, masterWidth, masterHeight)
  .png({ compressionLevel: 9 })
  .toFile(file("contax-06-oro-luminoso-4x.png"));

await raster(master, masterWidth, masterHeight)
  .resize(952, 220, { kernel: sharp.kernel.lanczos3 })
  .webp({ lossless: true, effort: 6 })
  .toFile(file("contax-06-oro-luminoso-web.webp"));

// A single review sheet over the navy used by the landing's prototype.
const previewWidth = 1440;
const previewHeight = 570;
const layout = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${previewWidth}" height="${previewHeight}" viewBox="0 0 ${previewWidth} ${previewHeight}">
  <defs><linearGradient id="navy" x2="1" y2="1"><stop stop-color="#02142B"/><stop offset="1" stop-color="#061B37"/></linearGradient></defs>
  <rect width="1440" height="570" fill="url(#navy)"/>
  <path d="M72 132H1368M72 462H1368" stroke="#BC8D46" stroke-opacity=".4"/>
  <path d="M720 491V538" stroke="#BC8D46" stroke-opacity=".4"/>
  <text x="72" y="55" fill="#E0BC78" font-family="Helvetica, sans-serif" font-size="16" letter-spacing="4">CONTAX · ESTUDIO DE MARCA</text>
  <text x="72" y="106" fill="#F3EBDC" font-family="Georgia, serif" font-size="42">06 / Oro luminoso</text>
  <g fill="#B9C8DB" font-family="Helvetica, sans-serif" font-size="16" letter-spacing="1.1">
    <text x="1368" y="106" text-anchor="end">PNG 4× · 5884 × 1360 PX</text>
    <text x="72" y="516">ESCRITORIO · 238 PX</text>
    <text x="750" y="516">MÓVIL · 175 PX</text>
  </g>
</svg>`);

const large = await raster(master, masterWidth, masterHeight).resize(1296).png().toBuffer();
const small = await Promise.all([238, 175].map((size) =>
  sharp(file("contax-06-oro-luminoso-web.webp")).resize(size).png().toBuffer(),
));
await sharp(layout).composite([
  { input: large, left: 72, top: 147 },
  { input: small[0], left: 452, top: 485 },
  { input: small[1], left: 1193, top: 492 },
]).png().toFile(fileURLToPath(new URL("./oro-luminoso-preview.png", import.meta.url)));
