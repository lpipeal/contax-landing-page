import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

// Deterministic adaptation of the supplied raster logo, not a redraw/vector trace.
// Embed the original so the SVG also works when consumed through an <img>.
const sourceUrl = new URL("./assets/contax-logo.png", import.meta.url);
const outputUrl = new URL("./assets/contax-logo-on-dark.svg", import.meta.url);
const source = (await readFile(sourceUrl)).toString("base64");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1473" height="340" viewBox="0 0 1473 340">
  <title>Contax Business Solutions — variante para fondo oscuro</title>
  <desc>Geometría original conservada. Letras azules del nombre y subtítulo en marfil; símbolo, oro y turquesa originales.</desc>
  <defs>
    <image id="source" width="1473" height="340" xlink:href="data:image/png;base64,${source}"/>
    <clipPath id="name-region"><rect x="380" y="0" width="1093" height="289"/></clipPath>
    <clipPath id="tagline-region"><rect x="500" y="289" width="830" height="51"/></clipPath>
    <filter id="ivory-name" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <!-- Blue-dominant name pixels only. Warm gold and green/teal pixels stay original. -->
      <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0.976470588 0 0 0 0 0.972549020 0 0 0 0 0.960784314 0 -44 32 0 -0.3" result="selection"/>
      <feComponentTransfer in="selection" result="solid-selection"><feFuncA type="discrete" tableValues="0 1"/></feComponentTransfer>
      <feComposite in="solid-selection" in2="SourceGraphic" operator="in"/>
    </filter>
    <filter id="ivory-tagline" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feColorMatrix type="matrix" values="0 0 0 0 0.976470588 0 0 0 0 0.972549020 0 0 0 0 0.960784314 0 0 0 1 0"/>
    </filter>
  </defs>
  <use xlink:href="#source"/>
  <g clip-path="url(#name-region)"><use xlink:href="#source" filter="url(#ivory-name)"/></g>
  <g clip-path="url(#tagline-region)"><use xlink:href="#source" filter="url(#ivory-tagline)"/></g>
</svg>
`;
await writeFile(outputUrl, svg);
process.stdout.write(`Generated ${fileURLToPath(outputUrl)}\n`);
