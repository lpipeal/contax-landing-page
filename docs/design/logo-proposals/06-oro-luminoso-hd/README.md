# Contax · 06 Oro luminoso en alta resolución

Refinamiento de la [propuesta 06](../r001/assets/contax-06-oro-luminoso.svg) para fondos azul marino. Se conservan la composición, el isotipo y la «O» vórtice originales. Los archivos quedan disponibles para revisión; todavía no se aplican a la landing ni a su prototipo.

| Archivo | Dimensiones | Uso |
| --- | --- | --- |
| [PNG 4×](assets/contax-06-oro-luminoso-4x.png) | 5884 × 1360 px | Exportación de alta resolución con fondo transparente. |
| [WebP](assets/contax-06-oro-luminoso-web.webp) | 952 × 220 px | Versión ligera sin pérdida de compresión y con transparencia. Equivale a 4× el ancho de 238 px del logo en la cabecera de escritorio. |
| [Vista previa](oro-luminoso-preview.png) | 1440 × 570 px | Muestra sobre azul marino con tamaños de cabecera de 238 y 175 px. |

El original del logo completo mide 1471 × 340 px. Se suavizaron las transiciones de color en la A y la X para eliminar motas del primer acabado, y se pulieron los bordes semitransparentes antes de ampliar. El PNG tiene cuatro veces más píxeles por lado que el original; parte de una fuente rasterizada y conserva sus límites de detalle al ampliar.

Para regenerar los recursos, instalar las dependencias del proyecto (incluida `sharp`, dependencia opcional de Next.js) y ejecutar desde la raíz:

```sh
node docs/design/logo-proposals/06-oro-luminoso-hd/build.mjs
```

Se verificaron dimensiones y transparencia de ambos archivos, y se revisó la vista previa en los tamaños de la cabecera. Al comparar el contorno al 50 % de opacidad con el de una ampliación sin el pulido, el solapamiento supera el 99,9 % en el isotipo y la «O».
