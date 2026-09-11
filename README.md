# Contax Business Solutions — Landing Page

Landing bilingüe de Contax Business Solutions para presentar servicios contables, tributarios y empresariales en Estados Unidos y Colombia, educar a clientes potenciales y convertir visitas en consultas.

## Estado del proyecto

- Rama de trabajo: `refactor`.
- Rama base: `master`.
- Stack: Next.js, React, TypeScript y CSS.
- Idiomas: español e inglés.
- Estado actual: mockup principal aprobado; plan de desarrollo y checklist listos.

## Dirección de marca

La regla visual del refactor es: **el azul domina, el oro dirige y el turquesa firma**.

- Azul marino para autoridad, hero, manifiestos, CTA y footer.
- Oro para acciones, bordes, ondas y énfasis.
- Marfil y blanco para contenido editorial.
- Turquesa limitado a iconos, enlaces y microinteracciones.
- Ondas amplias inspiradas en la tarjeta oficial, implementadas con SVG/CSS.

## Arquitectura de la landing

1. Header y navegación.
2. Hero y propuesta de valor.
3. Servicios principales.
4. Cobertura Estados Unidos y Colombia.
5. Planeación tributaria y preparación de impuestos.
6. Tips y recursos.
7. Biblioteca de videos.
8. Por qué Contax.
9. Proceso de trabajo.
10. Industrias atendidas.
11. Aliados estratégicos.
12. Testimonios.
13. CTA y contacto.
14. Footer legal y corporativo.

## Documentación

- [Auditoría de marca y plan de refactor](docs/CONTAX_LANDING_AUDIT_AND_REFACTOR_PLAN.md)
- [Especificación de contenido y administración](docs/CONTENT_AND_CMS_SPEC.md)
- [Checklist de recopilación de contenido](docs/CONTENT_COLLECTION_CHECKLIST.md)
- [Plan de desarrollo del mockup principal](docs/PRIMARY_MOCKUP_DEVELOPMENT_PLAN.md)
- [Mockup principal aprobado](docs/design/contax-primary-mockup.png)
- [Concepto visual inicial](docs/design/contax-landing-refactor-concept.png)
- [Concepto visual ampliado](docs/design/contax-landing-refactor-concept-v2.png)
- [Mockup mejorado](docs/design/mockup-landing-page-enhanced.png)
- [Mockup de alta resolución 4×](docs/design/mockup-landing-page-ultra-4x.png)

Los mockups son referencias de dirección visual. Los nombres de aliados, testimonios y datos de contacto que aparezcan como muestra no deben publicarse sin validación.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Verificación

```bash
npm run lint
npm run build
```

Antes de publicar también se debe validar visualmente en 390 px, 768 px y 1440 px, probar español e inglés y verificar todos los enlaces de contacto.

## Flujo de ramas

- `master`: versión estable/base.
- `refactor`: rediseño y ampliación de contenido.
- Cambios grandes: commits pequeños por fase (cimientos visuales, contenido, conversión y calidad).

Repositorio: `git@github.com:lpipeal/contax-landing-page.git`.
