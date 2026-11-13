# Contax — nueve propuestas de iluminación del logo

25 de octubre de 2026. Primera ronda de exploración. Ninguna propuesta seleccionada ni aplicada a la landing.

- [Galería interactiva](index.html): ampliar propuestas, revisar escritorio/móvil y marcar candidatas.
- [Lámina de nueve opciones](contax-logo-proposals-01-09.jpg).
- [Detalle de la propuesta 05](detail-05.jpg).
- [Contexto visual aportado](reference-context.png): referencia de iluminación y contraste; su isotipo y su O no se adoptan.

## Alcance e invariantes

Se parte de `public/contax-logo.png`, conservando sus posiciones, proporciones, tipografía, isotipo, esfera, arcos, gráfica ascendente y la O vórtice. No se sustituyen por elementos generados ni por un nuevo tipo de letra. La O queda excluida del recoloreado del nombre: mantiene su construcción azul y dorada, con una elevación moderada de iluminación.

Las nueve opciones exploran color del nombre, acabado de luz y jerarquía del subtítulo. La 09 añade un filo muy fino únicamente al nombre, fuera de la O. La landing Next.js, el prototipo existente y sus recursos aplicados permanecen sin cambios.

## Direcciones

| Nº | Propuesta | Acabado del nombre | Subtítulo |
| --- | --- | --- | --- |
| 01 | Marfil satinado | Marfil cálido `#F2EDE3` | Oro `#D1AD65` |
| 02 | Plata fría | Plata azulada `#CEDDEB` | Gris claro `#BCCBDD` |
| 03 | Champaña | Champaña `#E4CC95` | Marfil `#EDE7DC` |
| 04 | Azul glaciar | Azul claro `#8DB6D6` | Oro suave `#D1AC62` |
| 05 | Acero pulido | Reflejo `#819BB4 → #EAF1F6 → #9BB4CA` | Plata `#C3D1DF` |
| 06 | Oro luminoso | Reflejo `#B28238 → #F3D69A → #C99B4D` | Marfil `#ECE5D7` |
| 07 | Zafiro iluminado | Reflejo `#295D93 → #8ABBE0 → #3A729F` | Champaña `#D6BA7E` |
| 08 | Original con luz | Color y textura originales con sombras elevadas | Gris cálido `#D6D0C5` |
| 09 | Filo champaña | Azul original iluminado con filo `#D9BE83` | Oro grisáceo `#CBB88F` |

Las caras claras se proponen principalmente para azul marino. El selector de fondo claro es una prueba de contraste, no una declaración de que cada acabado resuelva ambos fondos. Después de elegir una dirección se prepararán las variantes principal, clara y compacta del mismo sistema.

## Revisar localmente

Desde la raíz del repositorio:

```sh
python3 -m http.server 4174 --bind 127.0.0.1 --directory docs/design/logo-proposals/r001
```

Abrir [galería local](http://127.0.0.1:4174/) o [lámina de comparación](http://127.0.0.1:4174/?view=board). El servidor de revisión se detiene al terminar la sesión de trabajo; el comando permite abrirlo de nuevo.

La carpeta contiene HTML, CSS, JavaScript clásico y recursos locales. No instala dependencias ni contacta servicios externos. Las estrellas guardan números de candidatas en el almacenamiento local del navegador; no aplican una marca ni envían una selección. La revisión visual se hizo por HTTP local; no se probó el protocolo `file://`.

## Fuente y regeneración

Fuente PNG: 1471 × 340 px. SHA-256:

```text
997811c61936af04111963f62e263caa623ad3e8b06005adc9727161a8e1f01a
```

Para regenerar los nueve recursos y sus datos:

```sh
node docs/design/logo-proposals/r001/build.mjs
```

`build.mjs` solo escribe en esta carpeta. Cada SVG incrusta el mismo PNG original y sus tratamientos de color/luz; no es una reconstrucción vectorial. Esa decisión conserva exactamente las formas durante la exploración. La vectorización real y el refinamiento de bordes del original corresponden a la propuesta que se elija posteriormente.

## Verificación

- Nueve recursos cargados y nueve tarjetas, sin errores de consola en la sesión revisada.
- Detalle ampliado, vistas de 238 px y 175 px, recortes del isotipo y de la O, fondo claro/oscuro y cierre con Escape con devolución del foco.
- Galería de tres columnas en escritorio y una columna a 390 px, sin desbordamiento horizontal observado.
- Revisión independiente de geometría: decodificación en memoria del PNG y de los SVG con `sharp`, a su tamaño nativo, sin escribir imágenes intermedias.
- En 01–08, el canal alfa completo es idéntico al original: cero píxeles diferentes.
- En las nueve, el alfa del isotipo (`x=0..349`) y de la O (`x=560..738`, `y=0..288`) es idéntico al original.
- En 09, el cambio de alfa queda únicamente en el filo añadido al nombre fuera de la O; no elimina píxeles de la silueta original.

No se afirma una auditoría completa de accesibilidad ni una vectorización del logo. Las opciones son candidatas para revisión, no una identidad final aprobada.

## Siguiente decisión

Elegir dos o tres números para refinar luminosidad, tonos y subtítulo. Una vez elegido el acabado, preparar su sistema de fondos y tamaños y revisar la versión final en la cabecera real antes de aplicarla.
