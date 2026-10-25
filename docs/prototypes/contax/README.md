# Contax — prototipo HTML de la landing

Fecha: 25 de octubre de 2026. Estado: propuesta navegable para revisión visual.

Entrada: [index.html](index.html). Referencia: [mockup principal](../../design/contax-primary-mockup.png). [Comparación del logo sobre azul](logo-preview.html). Este prototipo vive en la rama `refactor`, junto al proyecto existente; la aplicación Next.js conserva su implementación actual.

## Abrir y revisar

La carpeta es autónoma: HTML, CSS, JavaScript clásico y recursos locales. No requiere npm, un framework, fuentes remotas ni una compilación. Conserva juntos `index.html`, `styles.css`, `content.js`, `app.js` y `assets/`.

Desde la raíz del repositorio:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory docs/prototypes/contax
```

Abrir [vista local](http://127.0.0.1:4173/). También existen entradas en [español](http://127.0.0.1:4173/?lang=es), [inglés](http://127.0.0.1:4173/?lang=en) y [planeación tributaria](http://127.0.0.1:4173/#tax-planning).

Los enlaces son locales al equipo que ejecuta el servidor. El HTML usa rutas relativas compatibles con apertura directa; la verificación visual se realizó por HTTP porque el navegador integrado bloquea el protocolo `file://`.

## Composición

Se conserva el recorrido de la referencia elegida:

1. Header, marca oficial y hero con ilustración de crecimiento.
2. Seis servicios con iconografía lineal y detalle navegable.
3. Estados Unidos y Colombia, con tarjetas y mapa ilustrativo.
4. Preparación y planeación tributaria, con sello y panel marino.
5. Tips: reel destacado, artículo y guía.
6. Biblioteca de cuatro videos, con uno destacado.
7. Por qué Contax y marca de agua institucional.
8. Proceso en cinco pasos.
9. Industrias.
10. Aliados y testimonios con el estado “Próximamente” del mockup.
11. CTA con consulta, WhatsApp y correo.
12. Footer con navegación, servicios, contacto y espacios legales.

En escritorio, el bloque tributario conserva la división clara/oscura. Hasta 900 px se apila para proteger el texto del sello decorativo. Servicios pasa de seis a tres y dos columnas; el proceso se convierte en una secuencia vertical en teléfono.

## Interacciones

- Navegación por anclas, indicador de sección y enlaces directos al recargar.
- Menú compacto, cierre al navegar y con Escape; desplazamiento interno en horizontal.
- Español e inglés completos. La selección se recuerda cuando el navegador permite almacenamiento local; `?lang=es` o `?lang=en` permite elegir el idioma de entrada.
- Las flechas de servicios y sus accesos en el footer abren un detalle.
- “Agenda una consulta” abre una selección de país y servicio; “Continuar en WhatsApp” abre el número confirmado con el contexto elegido. No reserva una cita automáticamente.
- ITIN está asociado a Estados Unidos; no se ofrece en la selección de Colombia.
- El reel identificado abre su URL real de Instagram. Las otras tarjetas abren vistas de contenido propuesto, sin simular reproducción de videos inexistentes.
- Artículo y guía abren contenido de ejemplo identificado dentro de la vista de lectura.
- Diálogos nativos con foco contenido, Escape y retorno al control de origen.
- Los documentos legales muestran su estado pendiente; no presentan un texto ficticio como aprobado.

## Identidad y recursos

| Uso | Valor |
| --- | --- |
| Marino institucional | `#061B37` |
| Marino profundo | `#021329` |
| Oro | `#C79845` |
| Oro para texto sobre claro | `#93662A` |
| Turquesa | `#006B7C` |
| Marfil | `#F9F8F5` |
| Texto principal | `#142E50` |

Titulares: Georgia/Times New Roman. Cuerpo: Arial/Helvetica. Se usan fuentes del sistema para que la muestra sea reproducible y no dependa de terceros.

`assets/contax-logo.png`, `assets/contax-isotype.png` y el favicon son copias de los recursos existentes en `public/`. `growth-scene.svg` es una ilustración vectorial para el hero y el cierre, no un reemplazo del logo. Ondas, mapa ilustrativo e iconos también son SVG; se mantienen nítidos al ampliar. La resolución de los logos PNG conserva la calidad del archivo de origen.

### Logo sobre fondos oscuros

Cabecera y footer usan `assets/contax-logo-gold-outline.svg`: el logo conserva todos sus colores originales y recibe únicamente un contorno en el oro de la web `#C79845`. El trazo recorre el símbolo, el nombre, el subtítulo y los detalles decorativos. La propuesta anterior con letras en marfil fue retirada. El PNG original permanece intacto.

La variante se deriva de forma determinista del PNG incrustado: se expande su silueta alfa 1,4 unidades del archivo original, se resta la silueta inicial y se colorea solo el borde añadido. El PNG se compone encima con sus colores intactos. Un margen transparente evita recortar los extremos del trazo. El contorno se afinó un 56 % frente a la primera propuesta dorada: equivale aproximadamente a 0,22 px en una cabecera de 238 px y a 0,16 px en 175 px. No se añaden desenfoques ni resplandores. Este SVG contiene el PNG de origen y filtros, **no es una vectorización**. Una exportación enteramente vectorial requiere la fuente de diseño original.

Para regenerar la variante desde la raíz del repositorio:

```sh
node docs/prototypes/contax/build-logo-variant.mjs
```

La [vista de comparación](logo-preview.html) muestra antes/después a tamaño grande y a los anchos reales de cabecera: 238 px en escritorio y 175 px en teléfono. [Captura comparativa](preview-logo-comparison.jpg).

## Contenido y límites

WhatsApp confirmado: **+1 (346) 339-8946**. El correo, Instagram, ubicación y horario se toman de la configuración existente como referencia. `content.js` los centraliza dentro de este prototipo autónomo; no se sincroniza automáticamente con `app/site-config.ts`.

El alcance de servicios, textos comerciales, horario y ubicación continúan sujetos a la validación del [checklist de contenido](../../CONTENT_COLLECTION_CHECKLIST.md). Los contenidos editoriales de ejemplo, el mapa y las ilustraciones permiten revisar la composición, no acreditan resultados tributarios, oficinas, licencias ni alianzas. No se inventan clientes, opiniones, calificaciones o logos de aliados.

No hay CMS, carga de videos, backend, envío de formularios, reserva de agenda ni analítica. Los CTAs externos abren WhatsApp, correo o Instagram; enviar un mensaje depende del visitante. El prototipo incluye `noindex, nofollow` y no se ha desplegado.

## Validación realizada

- Sintaxis de `content.js` y `app.js` con `node --check`.
- HTTP local con respuesta 200 y recursos cargados.
- Revisión de desbordamiento en 320×740, 390×844, 768×1024, 844×390, 1024×768 y 1440×1000: ninguno detectado en español; también se revisó inglés en teléfono.
- Revisión visual de escritorio, teléfono y bloque tributario en tablet.
- Servicios → detalle → consulta, selección de país, restricción ITIN y destino de WhatsApp.
- Recursos, estado de videos propuestos, cambio de idioma y persistencia al recargar.
- Menú móvil, navegación a Recursos, Escape y devolución del foco.
- Anclas internas sin destinos faltantes y ausencia de errores o advertencias en la consola de la sesión revisada.
- Variante de delineado dorado cargada en cabecera y footer, sin recoloreado de las superficies originales ni filtros CSS globales; revisión visual a 1440 px y 390 px y comparación a 238/175 px. Capturas de las tres composiciones actualizadas.

No se enviaron mensajes ni se probó una conversación real con WhatsApp. No se afirma una auditoría completa de accesibilidad, regresión de Next.js ni validación en dispositivos físicos. La apertura directa bajo `file://` no se pudo verificar por la restricción del navegador integrado.

Capturas: [escritorio](preview-desktop.jpg), [tablet](preview-tablet.jpg), [teléfono](preview-mobile.jpg), [portada](preview-cover.jpg).

## Checklist para trasladar la propuesta a Next.js

- [x] Completar el prototipo HTML y conservar la composición del mockup.
- [x] Reutilizar la identidad disponible y dibujar ilustraciones escalables.
- [x] Implementar recorridos y adaptación responsive.
- [x] Separar datos, estilos e interacciones.
- [x] Documentar verificación y contenido pendiente.
- [ ] Revisar visualmente el prototipo con Contax y registrar los ajustes aceptados.
- [ ] Incorporar los cambios aprobados en los componentes del proyecto Next.js.
- [ ] Conservar `app/site-config.ts` y los modelos editoriales como fuentes de producción.
- [ ] Sustituir propuestas de artículos y videos por contenido autorizado.
- [ ] Incorporar aliados, testimonios y documentos legales aprobados.
- [ ] Validar contenido, enlaces y experiencia final antes de publicar.
