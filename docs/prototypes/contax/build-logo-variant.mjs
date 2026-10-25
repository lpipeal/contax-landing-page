import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

// Deterministic adaptation of the supplied raster logo, not a redraw/vector trace.
// Embed the original so the SVG also works when consumed through an <img>.
const sourceUrl = new URL("./assets/contax-logo.png", import.meta.url);
const outputUrl = new URL("./assets/contax-logo-gold-outline.svg", import.meta.url);
const source = (await readFile(sourceUrl)).toString("base64");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1485" height="352" viewBox="-6 -6 1485 352">
  <title>Contax Business Solutions — delineado dorado</title>
  <desc>Logo original con sus colores intactos y contorno dorado continuo en todas sus formas. Margen transparente para conservar el trazo exterior.</desc>
  <defs>
    <image id="source" width="1473" height="340" xlink:href="data:image/png;base64,${source}"/>
    <filter id="gold-outline" filterUnits="userSpaceOnUse" x="-6" y="-6" width="1485" height="352" color-interpolation-filters="sRGB">
      <!-- Extend only the alpha silhouette; keep every original color on top. -->
      <feMorphology in="SourceAlpha" operator="dilate" radius="3.2" result="expanded"/>
      <feComposite in="expanded" in2="SourceAlpha" operator="out" result="rim"/>
      <feFlood flood-color="#C79845" result="gold"/>
      <feComposite in="gold" in2="rim" operator="in" result="outline"/>
      <feMerge><feMergeNode in="outline"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <use xlink:href="#source" filter="url(#gold-outline)"/>
</svg>
`;
await writeFile(outputUrl, svg);
process.stdout.write(`Generated ${fileURLToPath(outputUrl)}\n`);
