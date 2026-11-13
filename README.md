# Contax Landing Page

Landing de Contax Business Solutions en Next.js, React y TypeScript. La versión `0.30.1` utiliza el prototipo aprobado y publica una entrega estática en el sitio principal de Firebase Hosting. El dominio oficial confirmado es `contaxbs.com`, con DNS administrados en Cloudflare.

```sh
npm ci
npm run dev
```

Español en `/`; inglés en `/en`. Cada ruta entrega HTML, idioma y metadatos propios desde la exportación. No requiere servidor de Next.js en producción. Se utiliza Node 24, registrado en `.node-version`.

## Organización

| Ruta | Responsabilidad |
| --- | --- |
| `app/(es)` y `app/(en)` | Rutas y documentos de cada idioma |
| `components/landing/landing-page.tsx` | Secciones, navegación y estado de la landing |
| `components/landing/dialog.tsx` | Servicios, consultas, recursos y videos |
| `components/landing/content.ts` | Textos ES/EN y contenido de esta versión |
| `components/landing/ui.tsx` y `graphics.tsx` | Elementos compartidos e ilustraciones vectoriales |
| `app/site-config.ts` | Contacto oficial y WhatsApp |
| `app/site-metadata.ts` | Metadatos base de la entrega |
| `app/globals.css` | Tokens de marca y estilos adaptables del prototipo |
| `public/contax` | Logo transparente consolidado e ilustraciones aprobadas |
| `docs/prototypes/contax` | Referencia visual aprobada; no se usa como iframe |
| `scripts/verify-export.mjs` | Validación del artefacto que se publica |
| `.github/workflows/landing.yml` | Validación y publicación de versiones |

`app/editorial-content.ts` conserva el catálogo anterior como referencia de migración; no alimenta esta versión. Para cambiar los textos visibles se utiliza `components/landing/content.ts`.

## Validación y vista de revisión

```sh
npm run check
npm start
```

`check` ejecuta ESLint, genera los tipos de rutas, comprueba TypeScript, construye la aplicación y verifica `out/`: idiomas, encabezados, navegación interna, archivos locales, logo aprobado y destino de WhatsApp. `start` sirve esa exportación con el emulador de Firebase en `http://127.0.0.1:5005`.

El build usa Webpack: Turbopack no pudo iniciar su proceso de CSS en este entorno. No se requiere acceso a fuentes o imágenes externas durante la construcción.

Los diálogos utilizan el elemento nativo `dialog`, cierran con Escape y restituyen el foco. El formulario valida país y servicio antes de abrir WhatsApp con un mensaje preparado; no envía mensajes, reserva citas ni almacena datos. ITIN se ofrece únicamente para Estados Unidos.

## Firebase independiente

- Proyecto: `contax-business-solutions` (`147770944219`).
- Sitio de Hosting: `contax-business-solutions`.
- Destino local: `landing`.
- Artefacto: `out/`.

La configuración no apunta a ningún sitio de Dynosoft. El sitio principal ya está publicado en https://contax-business-solutions.web.app. El dominio `contaxbs.com` está registrado en Firebase y su conexión requiere los DNS y la validación HTTPS descritos en la entrega. Se conserva `noindex` y los avisos de contenido pendiente hasta la aprobación editorial.

```sh
# Valida y publica una vista temporal de 30 días.
npm run deploy:preview

# Valida y publica el sitio principal, cuando se decida el lanzamiento.
npm run deploy:production
```

Los comandos fijan explícitamente el proyecto y el destino. No se agregan rewrites de SPA: las rutas inexistentes devuelven la página 404.

## GitHub Actions

Los PR a `master` y los pushes a `master`, `refactor` o tags `v*` ejecutan lint, tipos, build y comprobación de la exportación. Un tag debe coincidir con `package.json`; esta entrega utiliza `v0.30.1`.

El despliegue es manual sobre un tag. El workflow conserva el artefacto validado y lo publica desde el entorno `production`. El job de despliegue tiene su propia exclusión mutua para evitar publicaciones simultáneas.

La autenticación usa OpenID Connect y Workload Identity Federation. Configura estas variables en el entorno `production` de GitHub:

- `FIREBASE_WIF_PROVIDER`: recurso completo del proveedor de Google, restringido a `lpipeal/contax-landing-page` y a `refs/tags/v*`.
- `FIREBASE_DEPLOYER`: correo de una cuenta de servicio dedicada a Hosting de Contax.

La cuenta debe tener permisos de despliegue de Hosting en este proyecto y permitir su uso desde el proveedor mediante `roles/iam.workloadIdentityUser`. No se guardan JSON de cuentas de servicio ni tokens permanentes en el repositorio. La configuración de esa identidad y las variables no se realiza al crear el proyecto; deben completarse antes del primer despliegue desde Actions.

Con la identidad configurada y el workflow presente en la rama predeterminada:

```sh
gh workflow run landing.yml --ref v0.30.1
```

Consulta el [checklist de la entrega](docs/releases/v0.30.1.md) y el [criterio de organización para proyectos de Dynosoft](docs/PROJECT_DELIVERY_STANDARD.md).
