# Plan de desarrollo — mockup principal de Contax

Fecha: 10 de septiembre de 2026
Estado: aprobado como dirección visual de desarrollo

## Progreso de implementación — 10 de septiembre de 2026

Se inició la Fase 1 y el primer recorrido visual. La landing ya incorpora la paleta, ondas, servicios, cobertura, planeación, recursos, videos, proceso, industrias, CTA y footer. En esta iteración se ajustó la navegación para corresponder con el mockup principal, se restauró el logo oficial a color sobre las superficies marinas y se añadió un menú móvil accesible. Los datos de contacto ahora viven en una configuración única y el bloque de planeación incluye un aviso educativo bilingüe. Servicios, cobertura, recursos y videos usan contenido localizado: el reel validado está disponible y los elementos aún no aprobados se muestran como próximos. La compilación de producción finalizó correctamente.

## Referencia definitiva

El mockup principal es [contax-primary-mockup.png](design/contax-primary-mockup.png). Esta imagen define la composición, el orden de las secciones, el ritmo visual y el uso de la marca para la primera versión de la landing.

No define como contenido final los nombres, testimonios, aliados, logos, datos de contacto, horarios ni textos pequeños que aparezcan dentro de la imagen. Todo contenido publicable seguirá la validación descrita en [CONTENT_COLLECTION_CHECKLIST.md](CONTENT_COLLECTION_CHECKLIST.md).

## Contrato visual

- Azul marino como superficie institucional predominante.
- Oro como elemento de orientación: CTA, divisores, bordes y ondas.
- Marfil o blanco para las secciones editoriales y tarjetas.
- Turquesa reservado a microacentos, nunca como bloque principal.
- Curvas blanco–oro–azul como transición entre hero, CTA y footer; no deben cruzar textos ni controles.
- Titulares serif de alto contraste y cuerpo sans legible.
- Tarjetas de servicios, recursos y videos con bordes claros, sombra sutil y jerarquía consistente.
- En móvil, las curvas y gráficos se reducen antes que el tamaño mínimo de los textos o botones.

## Alcance de la primera versión

La landing tendrá una sola página bilingüe (ES/EN), con las secciones en este orden:

1. Header con logo, navegación, selector de idioma y CTA.
2. Hero con propuesta de valor, acciones principales e isologo/crecimiento.
3. Seis servicios.
4. Cobertura para Estados Unidos y Colombia.
5. Bloque de planeación tributaria y preparación de impuestos.
6. Tips y recursos, con un reel destacado.
7. Biblioteca de videos.
8. Por qué Contax.
9. Proceso en cinco pasos.
10. Industrias atendidas.
11. Aliados estratégicos.
12. Testimonios aprobados.
13. CTA de conversión.
14. Footer con navegación, contacto y avisos legales.

Los aliados y testimonios deben permanecer ocultos o mostrarse como estado editorial pendiente hasta contar con autorización. No se publicarán datos ficticios.

## Plan por fases

### Fase 0 — Validar insumos y decisiones de conversión

Objetivo: evitar implementar contactos, promesas comerciales o bloques de confianza con información incorrecta.

- Confirmar contacto oficial, WhatsApp, agenda, email, dominios, redes, horarios y ubicaciones.
- Validar servicios por país, especialmente ITIN, nómina, planeación y creación de empresas.
- Definir el canal principal del CTA: agenda, WhatsApp, formulario o combinación.
- Reunir los contenidos mínimos para recursos, videos, aliados y testimonios.
- Aprobar el aviso educativo para contenidos tributarios y la política de privacidad.

Salida: configuración central de contacto y contenido inicial aprobado.

### Fase 1 — Cimientos técnicos y sistema de diseño

Objetivo: convertir el mockup en componentes y tokens reutilizables antes de desarrollar cada bloque.

- Establecer tokens de color, espaciado, bordes, sombras, tipografía y breakpoints.
- Preparar variantes del logo para fondos claros y oscuros, más isologo y favicon.
- Crear motivos reutilizables: onda Contax, fondo marino, divisor oro y textura puntual.
- Crear configuración localizada para ES/EN y una única fuente de datos de contacto.
- Acordar el set de iconos lineales y accesibles para servicios, industrias y pasos.

Salida: base visual consistente y preparada para desktop, tablet y móvil.

### Fase 2 — Recorrido comercial prioritario

Objetivo: construir la parte que convierte una visita en una consulta.

- Implementar header, navegación y selector de idioma.
- Implementar hero con la primera onda Contax, contenido editorial y CTA.
- Construir la cuadrícula de seis servicios con enlaces a contacto o detalle futuro.
- Implementar cobertura EE. UU./Colombia con servicios y avisos aplicables.
- Implementar planeación tributaria con CTA y aviso educativo breve.
- Crear CTA final con contacto centralizado y footer.

Salida: una página navegable con el mensaje comercial completo y acciones funcionales.

### Fase 3 — Centro educativo y prueba de confianza

Objetivo: añadir el contenido que construye credibilidad sin duplicar la lógica de presentación.

- Crear modelos de datos locales para recursos, videos, aliados y testimonios.
- Implementar tarjetas de tips con tipo, jurisdicción, fecha, miniatura y enlace externo.
- Publicar el reel de planeación tributaria proporcionado como primer recurso destacado.
- Implementar biblioteca de videos con estado publicado/borrador y enlaces reales.
- Implementar “Por qué Contax”, proceso e industrias según el mockup.
- Conectar aliados y testimonios solo cuando estén aprobados; sin datos aprobados, usar un estado vacío sobrio o no mostrar la tarjeta.

Salida: landing con educación y confianza administrables mediante datos.

### Fase 4 — Conversión, accesibilidad y metadatos

Objetivo: que la landing sea clara, inclusiva y medible.

- Añadir formulario breve si se aprueba como canal de contacto.
- Implementar enlaces de teléfono, correo, WhatsApp y agenda con etiquetas accesibles.
- Revisar navegación por teclado, foco visible, contraste y textos alternativos.
- La navegación principal destaca la sección activa durante el desplazamiento y conserva enlaces semánticos para teclado y lectores de pantalla.
- Las transiciones y el desplazamiento suave respetan la preferencia del visitante de reducir movimiento.
- Metadata, `sitemap.xml` y `robots.txt` ya están definidos para la landing. Los datos estructurados de organización y servicio se añadirán cuando estén confirmados los datos legales, la URL pública definitiva y los canales de contacto.
- Definir eventos de conversión aprobados: clic en agenda, WhatsApp, teléfono, correo y recursos.

Salida: experiencia preparada para publicar y medir.

### Fase 5 — Validación y entrega

Objetivo: verificar fidelidad al mockup sin sacrificar rendimiento ni usabilidad.

- Comparar escritorio, tablet y móvil contra el mockup principal.
- Probar ES/EN, todos los enlaces, formularios y estados vacíos.
- Optimizar imágenes, fuentes y carga diferida.
- Ejecutar build de producción y corregir incidencias.
- Revisar contenido, permisos y avisos antes de abrir el sitio al público.

Salida: versión candidata para aprobación de marca y publicación.

## Checklist de inicio de desarrollo

### A. Decisión de producto

- [x] Mockup principal definido y archivado en el repositorio.
- [x] Arquitectura de secciones definida.
- [x] Dirección de marca definida: azul domina, oro dirige, turquesa firma.
- [ ] Canal de conversión principal confirmado.
- [ ] Alcance final por país confirmado.
- [ ] Versión definitiva de español e inglés aprobada.

### B. Contenido mínimo para la primera entrega

- [ ] Teléfono, WhatsApp, correo, horarios, ubicaciones y redes oficiales confirmados.
- [ ] Seis servicios y descripciones comerciales aprobados.
- [ ] Servicios disponibles en EE. UU. y Colombia validados.
- [ ] Texto de planeación tributaria y aviso educativo aprobados.
- [ ] Reel destacado y al menos dos recursos adicionales validados.
- [ ] Al menos cuatro videos reales o decisión de ocultar la biblioteca temporalmente.
- [ ] Aliados con autorización o decisión de ocultar la sección temporalmente.
- [ ] Tres testimonios aprobados o decisión de mostrar solo el estado editorial pendiente.
- [ ] Política de privacidad y términos de uso aprobados.

### C. Diseño y componentes

- [x] Tokens de diseño implementados.
- [ ] Logo claro/oscuro, isologo y favicon disponibles en alta resolución.
- [x] Onda Contax implementada como motivo reutilizable.
- [x] Header y menú móvil definidos.
- [x] Componentes de tarjetas: servicio, recurso, video, aliado y testimonio definidos.
- [x] Componentes de cobertura y planeación tributaria definidos.
- [x] Estados vacíos y de contenido pendiente definidos.
- [ ] Diseño responsive validado para 390 px, 768 px y 1440 px.

### D. Desarrollo y calidad

- [x] Datos de contacto centralizados en una configuración única.
- [x] Contenido ES/EN separado de los componentes de presentación.
- [x] Enlaces externos usan URL y etiquetado seguro.
- [ ] Formularios y CTAs tienen estados de éxito/error cuando se implementen.
- [ ] Textos y controles cumplen tamaños legibles en móvil.
- [ ] Navegación por teclado, foco y contraste revisados.
- [ ] Imágenes tienen texto alternativo y dimensiones definidas.
- [x] Build de producción finaliza correctamente.
- [ ] No quedan nombres, logos, testimonios o promesas de muestra en producción.

### E. Control de entrega

- [ ] Cambios organizados por commits pequeños dentro de `refactor`.
- [ ] Revisión visual final aprobada por Contax.
- [ ] Contenido legal y permisos aprobados.
- [ ] Plan de despliegue y responsable de atención de mensajes confirmados.

## Criterio de aceptación

La primera versión estará lista para aprobación cuando reproduzca el recorrido y la personalidad del mockup principal, responda correctamente en móvil, mantenga los CTAs funcionales, presente solo información aprobada y permita actualizar recursos, videos, aliados y testimonios sin rediseñar la página.
