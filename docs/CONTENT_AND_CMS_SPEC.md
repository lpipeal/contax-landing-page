# Especificación de contenido y administración

## Objetivo

Separar el contenido de la presentación para que Contax pueda agregar tips, videos, aliados y testimonios sin rediseñar la landing. La primera versión puede usar datos TypeScript locales; la estructura debe permitir conectar un CMS posteriormente.

## Principios

- Una sola fuente de verdad para teléfono, email, WhatsApp, dirección, redes y horarios.
- Todo contenido debe existir en español e inglés o declarar explícitamente que solo está disponible en un idioma.
- Cada recurso debe indicar el país o jurisdicción aplicable.
- Tips y videos educativos deben incluir un aviso de que no constituyen asesoría fiscal o legal individual.
- Aliados y testimonios solo se publican con autorización.
- La carga de videos es administrativa; nunca se expone como formulario público.

## Esqueleto de componentes

| Sección | Identificador | Componente sugerido | Fuente de contenido |
| --- | --- | --- | --- |
| Header | `top` | `Header` | navegación y configuración |
| Hero | `hero` | `HeroSection` | contenido institucional |
| Servicios | `services` | `ServicesSection` | servicios |
| Países | `locations` | `CountryCoverageSection` | países y servicios |
| Planeación tributaria | `tax-planning` | `TaxPlanningSection` | contenido editorial |
| Tips | `resources` | `ResourcesSection` | recursos publicados |
| Videos | `videos` | `VideoLibrarySection` | videos publicados |
| Por qué Contax | `about` | `WhyContaxSection` | ventajas institucionales |
| Proceso | `process` | `ProcessSection` | pasos del servicio |
| Industrias | `industries` | `IndustriesSection` | industrias |
| Aliados | `partners` | `PartnersSection` | aliados publicados |
| Testimonios | `testimonials` | `TestimonialsSection` | testimonios aprobados |
| Contacto | `contact` | `ContactSection` | configuración de contacto |
| Footer | `footer` | `Footer` | navegación, legal y contacto |

## Modelo de contenido

### Configuración global

```ts
type SiteConfig = {
  phone: string;
  whatsappUrl: string;
  email: string;
  websiteUrl: string;
  instagramUrl: string;
  linkedinUrl?: string;
  facebookUrl?: string;
  schedulingUrl?: string;
  businessHours: LocalizedText;
  addresses: Address[];
};
```

Todos los botones y metadatos deben consumir esta configuración. No se deben repetir datos de contacto manualmente en componentes.

### Texto localizado

```ts
type LocalizedText = {
  es: string;
  en: string;
};
```

### País y cobertura

```ts
type CountryCoverage = {
  id: "us" | "co";
  name: LocalizedText;
  summary: LocalizedText;
  serviceIds: string[];
  contactChannel?: string;
  disclaimer?: LocalizedText;
  isPublished: boolean;
};
```

El contenido debe validarse con los servicios y credenciales reales disponibles en cada jurisdicción.

### Servicio

```ts
type Service = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  features: LocalizedText[];
  countryIds: Array<"us" | "co">;
  icon: string;
  order: number;
  isPublished: boolean;
};
```

### Tip o recurso

```ts
type Resource = {
  id: string;
  slug: string;
  type: "article" | "reel" | "video" | "guide" | "checklist";
  category: "taxes" | "accounting" | "business" | "itin" | "payroll" | "international";
  title: LocalizedText;
  summary: LocalizedText;
  countryIds: Array<"us" | "co">;
  thumbnail: string;
  externalUrl?: string;
  publishedAt: string;
  duration?: string;
  featured: boolean;
  status: "draft" | "published" | "archived";
};
```

Primer recurso propuesto: reel de Instagram de Contax sobre planeación tributaria:

`https://www.instagram.com/reel/DWkVUxjkYXr/`

### Video

```ts
type Video = {
  id: string;
  slug: string;
  platform: "instagram" | "youtube" | "hosted";
  title: LocalizedText;
  description: LocalizedText;
  category: Resource["category"];
  countryIds: Array<"us" | "co">;
  videoUrl: string;
  thumbnail: string;
  transcript?: LocalizedText;
  duration?: string;
  publishedAt: string;
  featured: boolean;
  status: "draft" | "published" | "archived";
};
```

La landing no recibirá archivos directamente. La administración guardará una URL y una miniatura optimizada. Si se alojan archivos propios, deben cargarse a un proveedor de video o almacenamiento externo, no al repositorio Git.

### Aliado estratégico

```ts
type Partner = {
  id: string;
  name: string;
  category: "legal" | "insurance" | "banking" | "technology" | "payroll" | "community";
  description: LocalizedText;
  logo: string;
  websiteUrl?: string;
  countryIds: Array<"us" | "co">;
  permissionConfirmed: boolean;
  order: number;
  status: "draft" | "published" | "archived";
};
```

`permissionConfirmed` debe ser verdadero antes de mostrar la marca.

### Testimonio

```ts
type Testimonial = {
  id: string;
  quote: LocalizedText;
  displayName: string;
  company?: string;
  industry?: string;
  countryId: "us" | "co";
  serviceId?: string;
  sourceUrl?: string;
  publicationConsent: boolean;
  order: number;
  status: "draft" | "published" | "archived";
};
```

No se deben almacenar datos tributarios, cifras financieras privadas ni información personal que el cliente no haya autorizado.

## Estrategia de administración

### Primera versión

- Datos tipados dentro del repositorio.
- Imágenes optimizadas en `public/`.
- Publicación mediante commit y despliegue.
- Validación automática de campos obligatorios y estados.

### Evolución a CMS

Conservar los mismos modelos detrás de una capa de acceso a datos. Un CMS futuro debe permitir:

- Edición bilingüe.
- Borradores y programación de publicaciones.
- Gestión de miniaturas y texto alternativo.
- Roles de editor y aprobador.
- Vista previa antes de publicar.
- Historial de cambios.

## Reglas por sección

### Tips y videos

- Mostrar únicamente elementos con estado `published`.
- Un solo recurso destacado por sección.
- Las miniaturas deben mantener la identidad Contax y un texto corto.
- Evitar reproducir varios videos automáticamente.
- Abrir reels externos de forma explícita; no simular que están alojados localmente.
- Proveer transcripción o resumen para accesibilidad y SEO.

### Aliados

- Usar logotipos con proporciones consistentes y fondo neutro.
- No alterar los colores o el símbolo del aliado sin permiso.
- Describir la relación sin sugerir avales o garantías inexistentes.

### Testimonios

- No inventar nombres, empresas, calificaciones ni resultados.
- Ocultar la sección completa si no existen al menos tres testimonios aprobados.
- Permitir iniciales o anonimización cuando el cliente lo solicite.

### Estados Unidos y Colombia

- Etiquetar contenido por jurisdicción.
- No mezclar obligaciones, formularios ni fechas de ambos países.
- Incluir avisos cuando un servicio dependa del estado, ciudad o condición tributaria.

## SEO y datos estructurados

- Metadata localizada por idioma.
- `Organization` o `ProfessionalService` para la empresa, después de validar dirección y contacto.
- `VideoObject` para videos alojados o con metadata verificable.
- Páginas o rutas individuales para recursos que necesiten posicionamiento orgánico.
- URLs canónicas y Open Graph coherentes.

## Analítica mínima

Registrar sin incluir información tributaria o personal:

- `consultation_click`
- `whatsapp_click`
- `contact_click`
- `resource_open`
- `video_play`
- `video_external_open`
- `country_select`
- `language_change`

Cada evento puede incluir identificadores de contenido, país e idioma, pero nunca datos sensibles del cliente.

## Criterios de aceptación

- Agregar un recurso, video, aliado o testimonio no requiere editar JSX de presentación.
- El contenido no publicado nunca aparece en producción.
- Los datos de contacto provienen de una sola configuración.
- La landing funciona aunque no existan aliados o testimonios aprobados.
- Todos los contenidos públicos tienen idioma, jurisdicción y texto alternativo apropiados.

## Estado de implementación

- Aliados y testimonios ya consumen la fuente de contenido local tipada.
- Un aliado requiere estado `published` y `permissionConfirmed: true` antes de aparecer.
- Los testimonios requieren estado `published`, `publicationConsent: true` y un mínimo de tres registros aprobados para habilitar la sección.
- Tips y videos se publican únicamente con estado `published` y una URL externa válida; así los borradores no se presentan como contenido disponible.
- Horarios, ubicación y asunto de contacto se conservan localizados en la configuración central y se consumen desde el footer y las llamadas a la acción.
- Cuando aún no hay videos publicados, la biblioteca conserva un estado editorial visible y dirige al Instagram oficial; no expone títulos ni duraciones de borradores.
- La vista local puede activar `NEXT_PUBLIC_CONTAX_CONTENT_MODE=preview` para mostrar tarjetas demo con enlaces reservados bajo `example.com`; dichas tarjetas permanecen ocultas en producción hasta reemplazarlas por URLs aprobadas.
- El mismo modo preview habilita aliados y testimonios de demostración, sin permisos ni consentimiento de publicación, exclusivamente para revisar la composición completa de ambas secciones.
