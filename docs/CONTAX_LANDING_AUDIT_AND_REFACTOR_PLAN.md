# Contax — auditoría de marca y plan de refactor

Fecha: 2026-09-01
Referencia visual: tarjeta de presentación de Contax Business Solutions.

## Documentos relacionados

- [Especificación de contenido y administración](CONTENT_AND_CMS_SPEC.md)
- [Checklist de recopilación de contenido](CONTENT_COLLECTION_CHECKLIST.md)
- [Concepto visual inicial](design/contax-landing-refactor-concept.png)
- [Concepto visual ampliado](design/contax-landing-refactor-concept-v2.png)
- [Plan de desarrollo del mockup principal](PRIMARY_MOCKUP_DEVELOPMENT_PLAN.md)
- [Mockup principal aprobado](design/contax-primary-mockup.png)

## Mockup principal seleccionado

El 10 de septiembre de 2026 se seleccionó `design/contax-primary-mockup.png` como referencia principal para la implementación. El plan operativo y el checklist específico están en `PRIMARY_MOCKUP_DEVELOPMENT_PLAN.md`.

## Decisión de diseño

La landing no requiere una reconstrucción total. La estructura, el tono editorial y la jerarquía del hero ya proyectan una firma financiera profesional. El refactor debe hacer que esa buena base se perciba inequívocamente como **Contax**: una marca institucional, clara y premium, con azul marino dominante, dorado como guía y turquesa como firma secundaria.

La regla central es: **el azul domina, el oro dirige y el turquesa firma**.

## Hallazgos de la auditoría

### Fortalezas actuales

- Hero con una jerarquía clara, buen contraste y una narrativa de crecimiento.
- Uso editorial de tipografía serif para titulares y un sistema de secciones ordenado.
- La arquitectura de contenido (nosotros, servicios, proceso, industrias y contacto) es fácil de recorrer.
- Landing bilingüe con preferencia persistente de idioma.
- La versión móvil mantiene una buena lectura de texto y de las tarjetas de servicios.

### Fricciones que se deben resolver

1. **Identidad visual dispersa.** Las líneas orbitales actuales funcionan, pero son una solución fintech genérica y no retoman lo más distintivo de la tarjeta: curvas amplias, bordes dorados y masas limpias de azul/blanco.
2. **Turquesa sobredimensionado.** El CTA final completamente turquesa compite con el azul institucional. Debe pasar a ser un acento, no un fondo de gran superficie.
3. **Logo tipo "placa".** El logo sobre fondo blanco en el hero pierde integración con el fondo oscuro. Se necesita una variante del lockup para fondos marinos o un uso más contenido de la placa blanca.
4. **Hero móvil recortado.** La tarjeta de crecimiento se desplaza fuera del viewport y corta parte del contenido visual en 390 px. Debe convertirse en una tarjeta completa debajo del texto o en un detalle gráfico reducido.
5. **Servicios no totalmente alineados.** La tarjeta incluye Nómina / Payroll; la landing no la muestra como servicio. La página agrega clientes internacionales y asesoría empresarial, que sí deben permanecer, pero el catálogo debe quedar consistente.
6. **Datos de contacto contradictorios.** La tarjeta y la landing muestran teléfonos y emails distintos. Antes de publicar se debe definir una única fuente oficial de contacto, redes y dominio.
7. **Conversión con fricción.** El CTA principal termina en correo. Una combinación de agenda, WhatsApp y formulario corto reduce la pérdida de prospectos.
8. **Accesibilidad del oro.** El dorado brillante sirve para detalles y titulares grandes; para texto pequeño sobre blanco se debe usar una variante más oscura.

## Sistema visual propuesto

### Paleta y uso

| Token | Valor | Uso recomendado |
| --- | --- | --- |
| Azul 900 | `#071A3C` | Fondo institucional, hero, footer, manifiestos (55%) |
| Azul 800 | `#0B2C58` | Gradientes, capas y hover (15%) |
| Oro Contax | `#C79A42` | Botones, bordes, flechas y titulares destacados (10%) |
| Oro profundo | `#94651F` | Texto pequeño o elementos sobre blanco |
| Turquesa | `#008F98` | Iconos, enlaces y microinteracciones (5%) |
| Marfil | `#F8F6F1` | Superficie editorial clara (10%) |
| Niebla | `#EDF1F2` | Separación de bloques y tarjetas secundarias (5%) |

### Fondos y motivos

Crear tres motivos reutilizables mediante SVG o CSS, nunca como fondos raster pesados:

1. **Onda Contax:** curva blanca amplia con un borde dorado; para hero, manifiesto y CTA.
2. **Órbita institucional:** curvas concéntricas doradas a 8–12% de opacidad; para zonas oscuras amplias.
3. **Microtextura:** puntos dorados muy sutiles y limitados a esquinas; para secciones claras.

Las ondas son un identificador de marca, no relleno decorativo. Deben vivir en esquinas o bordes y nunca cruzar texto, botones ni información operativa.

### Tipografía e iconografía

- Mantener un serif editorial para titulares, con una familia sans humanista para cuerpos y controles.
- Si se introduce una nueva familia, probar primero `Cormorant Garamond` para display y `Manrope` o `Source Sans 3` para UI/cuerpo.
- Usar iconos lineales con círculo azul y detalle dorado para los servicios, inspirados en la tarjeta. No añadir iconos donde no ayuden a escanear contenido.

## Arquitectura ampliada de la landing

La landing debe funcionar como carta de presentación, canal de conversión y centro educativo. El orden recomendado del esqueleto completo es:

1. Header y navegación.
2. Hero y propuesta de valor.
3. Servicios principales.
4. Presencia en Estados Unidos y Colombia.
5. Importancia de la planeación tributaria.
6. Tips y recursos destacados.
7. Biblioteca de videos.
8. Por qué Contax.
9. Proceso de trabajo.
10. Industrias atendidas.
11. Aliados estratégicos.
12. Testimonios de clientes.
13. CTA y canales de contacto.
14. Footer legal y corporativo.

### Presencia en Estados Unidos y Colombia

Crear una sección de cobertura con dos columnas o pestañas accesibles:

- **Estados Unidos:** preparación de impuestos, ITIN, creación de empresas, bookkeeping, payroll y asesoría para empresarios extranjeros.
- **Colombia:** acompañamiento contable y tributario, formalización y asesoría empresarial según el alcance real confirmado por Contax.

Cada país debe mostrar servicios, moneda, jurisdicción y canal de atención correspondientes. No se deben prometer servicios regulados hasta validar las credenciales y el alcance legal en cada territorio.

### Planeación tributaria y preparación de impuestos

Sección editorial prioritaria con el mensaje: **"Las decisiones tributarias se planean antes de presentar la declaración"**.

Debe explicar, en lenguaje sencillo:

- Diferencia entre preparación de impuestos y planeación tributaria.
- Por qué una estrategia personalizada puede reducir legalmente la carga fiscal.
- Cómo la estructura empresarial, los registros y las fechas afectan el resultado.
- Cuándo solicitar una revisión profesional.

CTA sugerido: **"Solicita una revisión tributaria"**.

Todo contenido educativo debe incluir un aviso breve: información general, no asesoría fiscal o legal individual.

### Tips y recursos

Diseñar una cuadrícula de tarjetas administrables con:

- Categoría: impuestos, contabilidad, empresas, ITIN, nómina o internacional.
- Título y resumen breve.
- País o jurisdicción aplicable.
- Tipo de recurso: artículo, reel, video, guía o checklist.
- Miniatura, fecha, duración y enlace.
- CTA contextual: ver video, leer tip o agendar consulta.

El reel de referencia de Instagram sobre **Planeación tributaria / Soluciones tributarias** se utilizará como primer contenido destacado:

`https://www.instagram.com/reel/DWkVUxjkYXr/`

### Biblioteca de videos

La landing mostrará una biblioteca pública con video destacado y tarjetas secundarias. Los videos podrán provenir de Instagram, YouTube o archivos alojados en un proveedor de video.

La carga de videos no debe estar disponible para visitantes. Debe existir como función administrativa o mediante un CMS, con estos campos mínimos:

- Título, descripción y categoría.
- Miniatura y URL del video.
- Plataforma de origen.
- País/jurisdicción.
- Fecha de publicación y duración.
- Texto alternativo o transcripción.
- Estado: borrador, publicado o archivado.

Para el primer alcance se recomienda administrar una lista de videos desde datos estructurados del proyecto; posteriormente se puede conectar un CMS sin rediseñar la sección.

### Aliados estratégicos

Sección sobria con logotipos monocromáticos o institucionales, acompañados por una frase que explique el valor de la alianza. Posibles categorías:

- Abogados y firmas legales.
- Seguros y beneficios empresariales.
- Banca, pagos y crédito.
- Tecnología contable y nómina.
- Cámaras de comercio y comunidades empresariales.

Publicar únicamente aliados confirmados y contar con autorización para usar sus marcas.

### Testimonios de clientes

Usar de tres a seis testimonios reales con:

- Nombre o iniciales según autorización.
- Empresa, industria y país.
- Servicio recibido.
- Comentario breve y específico.
- Fuente verificable cuando exista.

No inventar testimonios ni resultados financieros. La primera versión puede mostrar tarjetas de contenido pendiente, pero debe ocultarlas en producción hasta recibir comentarios aprobados.

## Alcance del refactor

### Fase 0 — contenido y confianza (prioridad crítica)

- Confirmar teléfono, email, dominio, ubicación y redes oficiales.
- Alinear la lista de servicios con la tarjeta e incluir Nómina / Payroll si sigue siendo un servicio vigente.
- Reemplazar el CTA único por agenda + WhatsApp + formulario corto.
- Definir pruebas de confianza reales: testimonios, industrias, experiencia, certificaciones o herramientas.

### Fase 1 — cimientos de diseño

- Convertir colores, espaciado, bordes y sombras en tokens de diseño.
- Reorganizar el uso de color para respetar la proporción de paleta.
- Rediseñar el CTA final y las secciones oscuras con azul marino y onda dorada.
- Ajustar logo, favicon, Open Graph y pie de página al lockup oficial.
- Corregir el hero móvil y agregar navegación móvil visible.

### Fase 2 — componentes de marca

- Implementar los tres fondos reutilizables como componentes SVG/CSS.
- Actualizar tarjetas de servicios con iconos y estados hover sobrios.
- Reforzar la sección "Por qué Contax" con una pieza visual de confianza.
- Añadir formulario de contacto accesible y acciones directas de conversión.
- Crear cobertura de Estados Unidos y Colombia con alcance confirmado.
- Construir tips, recursos y biblioteca de videos a partir de datos estructurados.
- Añadir aliados estratégicos y testimonios con contenido aprobado.

### Fase 3 — calidad de publicación

- Revisar contraste, foco de teclado, navegación semántica y tamaño táctil.
- Validar escritorio (1440 px), tablet (768 px) y móvil (390 px).
- Optimizar imágenes, metadata bilingüe, schema de organización/servicio y OG image.
- Medir formularios, clics de WhatsApp y clics de agenda como eventos de conversión.

## Checklist de inicio

### Antes de diseñar

- [ ] Confirmar datos oficiales de contacto y enlaces sociales.
- [ ] Confirmar catálogo definitivo de servicios y el orden comercial.
- [ ] Confirmar el canal principal de conversión: agenda, WhatsApp, formulario o combinación.
- [ ] Reunir logo oscuro/claro, isologo, favicon y cualquier guía de marca existente.
- [ ] Aprobar la paleta y los porcentajes de uso de esta guía.
- [ ] Confirmar servicios y credenciales aplicables en Estados Unidos y Colombia.
- [ ] Recopilar aliados autorizados, logotipos y enlaces.
- [ ] Recopilar testimonios reales y permisos de publicación.
- [ ] Crear inventario inicial de tips, reels y videos.

### Diseño y desarrollo

- [ ] Crear tokens de color, tipografía, espaciado y sombras.
- [ ] Implementar la onda Contax y los fondos oscuros reutilizables.
- [ ] Reemplazar el CTA turquesa por una versión azul + oro.
- [ ] Corregir el hero móvil sin contenido visual recortado.
- [ ] Crear menú móvil o acceso visible a las secciones principales.
- [ ] Añadir Nómina / Payroll si se confirma el servicio.
- [ ] Actualizar datos de contacto en CTA, footer, metadata y enlaces.
- [ ] Implementar formulario y enlaces de conversión.
- [ ] Revisar contraste del oro sobre superficies claras.
- [ ] Implementar sección de cobertura Estados Unidos / Colombia.
- [ ] Implementar bloque de planeación tributaria con aviso educativo.
- [ ] Implementar tarjetas administrables de tips y recursos.
- [ ] Implementar biblioteca pública de videos y modelo de publicación.
- [ ] Implementar aliados estratégicos con marcas autorizadas.
- [ ] Implementar testimonios reales con estado borrador/publicado.

### Validación de salida

- [ ] Probar español e inglés, incluidos metadatos y títulos de página.
- [ ] Probar todas las acciones de contacto en móvil y escritorio.
- [ ] Revisar navegación por teclado y foco visible.
- [ ] Ejecutar lint y build de producción.
- [ ] Revisar la landing visualmente en 390 px, 768 px y 1440 px.
- [ ] Obtener aprobación de marca antes de desplegar.

## Criterio de éxito

Al terminar, la página debe conservar la claridad actual, pero permitir reconocer Contax antes de leer el logo: azul profundo dominante, barridos dorados contenidos, blanco/marfil generoso, turquesa puntual y una ruta de contacto inequívoca.

## Implementación inicial — 1 de septiembre de 2026

Se implementó una primera versión funcional de la arquitectura acordada en `app/page.tsx` y el sistema visual en `app/globals.css`.

- El azul marino es el color dominante; el oro se usa en CTA, separadores y ondas, y el turquesa solo como acento.
- Se añadió la onda Contax al hero y al CTA final, además de una navegación bilingüe español/inglés.
- Se incorporaron los servicios, cobertura Estados Unidos/Colombia, planeación tributaria, recursos, biblioteca de videos, razones de confianza, proceso, industrias, aliados, testimonios y CTA final.
- El recurso de planeación tributaria enlaza al reel proporcionado. Los demás recursos y videos están marcados como contenido próximo para no presentar piezas inexistentes como publicadas.
- Los aliados se muestran por categoría y los testimonios se mantienen como un estado editorial pendiente: no se han inventado logos, nombres ni opiniones de clientes.
- Se aplicaron los datos de contacto visibles en la tarjeta compartida: `+1 (346) 339-8946` y `contaxbsllc@gmail.com`. Deben confirmarse antes de publicar.

### Validación realizada

- Compilación de producción satisfactoria: `./node_modules/.bin/next build --webpack`.

### Pendientes antes de publicar

- Confirmar el canal de conversión principal (agenda, WhatsApp, formulario o una combinación) y reemplazar los enlaces de correo donde corresponda.
- Aprobar textos legales, horarios, ubicación y datos de contacto.
- Cargar recursos reales, videos, aliados con autorización y testimonios aprobados mediante el modelo de contenido descrito en `CONTENT_AND_CMS_SPEC.md`.
- Realizar la revisión visual final en 390 px, 768 px y 1440 px y una prueba de accesibilidad por teclado.
