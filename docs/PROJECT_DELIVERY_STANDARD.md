# Organización de entregas de Dynosoft

Contax adopta la estructura de trabajo de la landing de Dynosoft y mantiene infraestructura independiente. Esta decisión del cliente permite añadir aplicaciones y servicios futuros sin mezclar permisos ni datos de clientes.

## Unidad de proyecto

Cada entrega conserva su repositorio, prototipo aprobado, documentación, assets, configuración Firebase y pipeline. Una landing de otro cliente no se incorpora como carpeta dentro del repositorio de Contax.

| Elemento | Contax | Convención para nuevos trabajos |
| --- | --- | --- |
| Repositorio | `lpipeal/contax-landing-page` | `<cliente>-<producto>` |
| Firebase | `contax-business-solutions` | Proyecto independiente por cliente |
| Destino Hosting | `landing` | Un destino explícito por web/app |
| Rama de trabajo actual | `refactor` | Rama de trabajo → PR → `master` |
| Versión | `0.30.0` / `v0.30.0` | Versión del paquete igual al tag |
| Automatización | `.github/workflows/landing.yml` | Validación en PR/push, publicación manual por tag |
| Identidad de publicación | Pendiente de configurar | Cuenta dedicada por proyecto, federación OIDC restringida al repo |

Compartir un proyecto Firebase entre productos del mismo cliente puede ser útil si necesitan los mismos usuarios o datos; debe documentarse al incorporar esa aplicación. No se comparte la cuenta de servicio de publicación entre clientes. Los ambientes de desarrollo y producción de aplicaciones con datos deben aislarse según su necesidad; esta entrega solo usa Hosting estático.

## Flujo de entrega

1. Aprobar referencia y alcance en `docs/`.
2. Implementar con componentes, contenido y configuración separados. Mantener el contacto real en una única fuente.
3. Validar lint, tipos, build, enlaces internos y recursos del artefacto.
4. Revisar escritorio, móvil, teclado y ambos idiomas en el emulador o un canal de Hosting.
5. Registrar pendientes y evidencia en el documento de versión.
6. Commitear la rama de trabajo, revisar PR y crear un tag que coincida con el paquete.
7. Publicar el artefacto validado usando el proyecto y el destino explícitos. Registrar la URL.
8. Ante un problema, volver a publicar un tag validado anterior o utilizar el historial de versiones de Hosting. No mover tags existentes.

## Controles mínimos

- Acciones de terceros fijadas a commits; permisos de GitHub de solo lectura salvo OIDC en el despliegue.
- Dependencias instaladas con `npm ci` y lockfile versionado.
- Artefacto de producción generado una sola vez por ejecución de Actions y transferido al job de despliegue.
- Ningún secreto, dato de cliente o credencial en assets públicos, variables `NEXT_PUBLIC_*` o código del navegador.
- Publicación explícita y serializada, con protecciones del entorno `production` según la política del equipo.
- Revisiones de contenido y autorización de testimonios/logos antes de mostrarlos como información real.
- Los formularios que necesiten datos fiscales o documentos se diseñarán como un flujo autenticado del proyecto del cliente; esta landing solo prepara una consulta general por WhatsApp.

Referencias técnicas: [exportación estática de Next.js](https://nextjs.org/docs/app/guides/static-exports), [sitios de Firebase Hosting](https://firebase.google.com/docs/hosting/multisites) y [autenticación de Google para GitHub Actions](https://github.com/google-github-actions/auth).
