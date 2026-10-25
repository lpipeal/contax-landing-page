import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";

// Exploration only. Never writes to public/ or the existing landing prototype.
// Every proposal uses the same source pixels and the same positioning.
const source = await readFile(new URL("../../../../public/contax-logo.png", import.meta.url));
const width = source.readUInt32BE(16);
const height = source.readUInt32BE(20);
const sourceSha256 = createHash("sha256").update(source).digest("hex");
const encoded = source.toString("base64");
const proposals = [
  { id: "01", slug: "marfil-satinado", name: "Marfil satinado", family: "Cálida · sobria", description: "Nombre en marfil cálido y subtítulo dorado. Luz suave en el símbolo original.", colors: ["#F2EDE3", "#D1AD65", "#178497"], ink: ["#F2EDE3", "#F2EDE3"], tagline: "#D1AD65", symbolGamma: .58, vortexGamma: .59 },
  { id: "02", slug: "plata-fria", name: "Plata fría", family: "Clara · corporativa", description: "Plata azulada y subtítulo claro para una lectura limpia sobre marino.", colors: ["#CEDDEB", "#BCCBDD", "#C79845"], ink: ["#CEDDEB", "#CEDDEB"], tagline: "#BCCBDD", symbolGamma: .56, vortexGamma: .56 },
  { id: "03", slug: "champana", name: "Champaña", family: "Cálida · luminosa", description: "Champaña suave en el nombre, con el oro y el turquesa del símbolo diferenciados.", colors: ["#E4CC95", "#EDE7DC", "#087D8C"], ink: ["#E4CC95", "#E4CC95"], tagline: "#EDE7DC", symbolGamma: .60, vortexGamma: .58 },
  { id: "04", slug: "azul-glaciar", name: "Azul glaciar", family: "Azul · alto contraste", description: "Azul claro para dar luz al nombre, acompañado por un subtítulo dorado suave.", colors: ["#8DB6D6", "#D1AC62", "#138BA0"], ink: ["#8DB6D6", "#8DB6D6"], tagline: "#D1AC62", symbolGamma: .53, vortexGamma: .53 },
  { id: "05", slug: "acero-pulido", name: "Acero pulido", family: "Metálica · fría", description: "Un reflejo plateado recorre las letras. Conserva el vórtice dorado de la O.", colors: ["#819BB4", "#EAF1F6", "#9BB4CA"], ink: ["#819BB4", "#EAF1F6", "#9BB4CA"], tagline: "#C3D1DF", symbolGamma: .55, vortexGamma: .55 },
  { id: "06", slug: "oro-luminoso", name: "Oro luminoso", family: "Metálica · cálida", description: "Acabado dorado con luz central; el isotipo mantiene sus tres colores de identidad.", colors: ["#B28238", "#F3D69A", "#C99B4D"], ink: ["#B28238", "#F3D69A", "#C99B4D"], tagline: "#ECE5D7", symbolGamma: .58, vortexGamma: .54 },
  { id: "07", slug: "zafiro-iluminado", name: "Zafiro iluminado", family: "Azul · con reflejo", description: "Azules con un reflejo más claro para conservar el carácter del nombre original.", colors: ["#295D93", "#8ABBE0", "#3A729F"], ink: ["#295D93", "#8ABBE0", "#3A729F"], tagline: "#D6BA7E", symbolGamma: .48, vortexGamma: .50 },
  { id: "08", slug: "original-con-luz", name: "Original con luz", family: "Fiel · exposición", description: "Eleva la luz de las letras originales y conserva su textura, sin un nuevo relleno.", colors: ["#35699A", "#D6D0C5", "#C79845"], mode: "exposure", nameGamma: .32, tagline: "#D6D0C5", symbolGamma: .50, vortexGamma: .50 },
  { id: "09", slug: "filo-champana", name: "Filo champaña", family: "Fiel · borde delicado", description: "Nombre azul iluminado con un filo champaña muy fino, sin halo exterior.", colors: ["#244D7D", "#D9BE83", "#B6A581"], mode: "edge", nameGamma: .46, tagline: "#CBB88F", symbolGamma: .55, vortexGamma: .55 },
];

function lightFilter(id, exponent) {
  return `<filter id="${id}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feComponentTransfer><feFuncR type="gamma" amplitude="1" exponent="${exponent}" offset="0"/><feFuncG type="gamma" amplitude="1" exponent="${exponent}" offset="0"/><feFuncB type="gamma" amplitude="1" exponent="${exponent}" offset="0"/></feComponentTransfer></filter>`;
}
function colorMatrix(hex) {
  const values = hex.slice(1).match(/../g).map(value => parseInt(value, 16) / 255);
  return `0 0 0 0 ${values[0]} 0 0 0 0 ${values[1]} 0 0 0 0 ${values[2]} 0 0 0 1 0`;
}
function svgFor(proposal) {
  const stops = (proposal.ink ?? []).map((color, index, values) => `<stop offset="${index / (values.length - 1)}" stop-color="${color}"/>`).join("");
  const name = proposal.mode
    ? `<g clip-path="url(#name-without-vortex)"><use xlink:href="#original" filter="url(#name-light)"/>${proposal.mode === "edge" ? '<use xlink:href="#original" filter="url(#champagne-rim)"/>' : ""}</g>`
    : '<g clip-path="url(#simple-letters)"><rect width="1471" height="340" fill="url(#ink)" mask="url(#original-alpha)"/></g><g clip-path="url(#accent-letters)"><rect width="1471" height="340" fill="url(#ink)" mask="url(#blue-letter-mask)"/><use xlink:href="#original" filter="url(#non-blue-source)"/></g>';
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <title>Contax — ${proposal.id} ${proposal.name}</title>
  <desc>Propuesta de luz y color. Isotipo, O vórtice, tipografía y proporciones del archivo original. No se ha redibujado ningún elemento.</desc>
  <metadata>source-sha256:${sourceSha256};geometry:original-raster;proposal:${proposal.id}</metadata>
  <defs>
    <image id="original" width="${width}" height="${height}" xlink:href="data:image/png;base64,${encoded}"/>
    <clipPath id="isotype"><rect width="350" height="340"/></clipPath>
    <clipPath id="vortex"><rect x="560" width="179" height="289"/></clipPath>
    <!-- O occupies x=571..728. It is excluded from every name recoloring. -->
    <clipPath id="name-without-vortex"><rect x="380" width="180" height="289"/><rect x="739" width="732" height="289"/></clipPath>
    <clipPath id="simple-letters"><rect x="380" width="180" height="289"/><rect x="739" width="331" height="289"/></clipPath>
    <clipPath id="accent-letters"><rect x="1070" width="401" height="289"/></clipPath>
    <clipPath id="tagline"><rect x="500" y="289" width="830" height="51"/></clipPath>
    <mask id="untouched-regions" maskUnits="userSpaceOnUse" x="0" y="0" width="1471" height="340" style="mask-type:luminance"><rect width="1471" height="340" fill="white"/><g fill="black"><rect width="350" height="340"/><rect x="380" width="1091" height="289"/><rect x="500" y="289" width="830" height="51"/></g></mask>
    <mask id="original-alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="1471" height="340" style="mask-type:alpha"><use xlink:href="#original"/></mask>
    ${lightFilter("symbol-light", proposal.symbolGamma)}
    ${lightFilter("vortex-light", proposal.vortexGamma)}
    ${lightFilter("name-light", proposal.nameGamma ?? .55)}
    <filter id="blue-select" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 -44 32 0 -0.3" result="blue"/><feComponentTransfer in="blue" result="selection"><feFuncA type="discrete" tableValues="0 1"/></feComponentTransfer><feComposite in="selection" in2="SourceGraphic" operator="in"/></filter>
    <filter id="non-blue-source" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 -44 32 0 -0.3" result="blue"/><feComponentTransfer in="blue" result="selection"><feFuncA type="discrete" tableValues="0 1"/></feComponentTransfer><feComposite in="SourceGraphic" in2="selection" operator="out"/></filter>
    <mask id="blue-letter-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="${width}" height="${height}" style="mask-type:alpha"><use xlink:href="#original" filter="url(#blue-select)"/></mask>
    <linearGradient id="ink" x1="0" y1="0" x2="0" y2="1">${stops}</linearGradient>
    <filter id="tagline-color" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="${colorMatrix(proposal.tagline)}"/></filter>
    <filter id="champagne-rim" x="-1%" y="-2%" width="102%" height="104%" color-interpolation-filters="sRGB"><feMorphology in="SourceAlpha" operator="dilate" radius="1.1" result="expanded"/><feComposite in="expanded" in2="SourceAlpha" operator="out" result="rim"/><feFlood flood-color="#D9BE83" flood-opacity=".7"/><feComposite in2="rim" operator="in"/></filter>
  </defs>
  <use xlink:href="#original" mask="url(#untouched-regions)"/>
  <g clip-path="url(#isotype)"><use xlink:href="#original" filter="url(#symbol-light)"/></g>
  <g clip-path="url(#vortex)"><use xlink:href="#original" filter="url(#vortex-light)"/></g>
  ${name}
  <g clip-path="url(#tagline)"><use xlink:href="#original" filter="url(#tagline-color)"/></g>
</svg>\n`;
}

await mkdir(new URL("./assets/", import.meta.url), { recursive: true });
await writeFile(new URL("./assets/original.png", import.meta.url), source);
for (const proposal of proposals) {
  proposal.asset = `assets/contax-${proposal.id}-${proposal.slug}.svg`;
  await writeFile(new URL(proposal.asset, import.meta.url), svgFor(proposal));
}
await writeFile(new URL("./proposals.js", import.meta.url), `// Generated by build.mjs.\nwindow.CONTAX_LOGOS = ${JSON.stringify({ sourceSha256, width, height, proposals }, null, 2)};\n`);
process.stdout.write(`Generated ${proposals.length} proposals. Original source SHA-256: ${sourceSha256}\n`);
