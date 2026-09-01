# Contax — auditoría de marca y plan de refactor

Fecha: 2026-09-01
Referencia visual: tarjeta de presentación de Contax Business Solutions.

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

### Validación de salida

- [ ] Probar español e inglés, incluidos metadatos y títulos de página.
- [ ] Probar todas las acciones de contacto en móvil y escritorio.
- [ ] Revisar navegación por teclado y foco visible.
- [ ] Ejecutar lint y build de producción.
- [ ] Revisar la landing visualmente en 390 px, 768 px y 1440 px.
- [ ] Obtener aprobación de marca antes de desplegar.

## Criterio de éxito

Al terminar, la página debe conservar la claridad actual, pero permitir reconocer Contax antes de leer el logo: azul profundo dominante, barridos dorados contenidos, blanco/marfil generoso, turquesa puntual y una ruta de contacto inequívoca.
