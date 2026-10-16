# Vercel Deployment Suite

Plugin para la preparación, validación y despliegue continuo de la aplicación en **Vercel**:
- Adaptador `@astrojs/vercel` en modo SSR (`output: 'server'`).
- Inyección de variables de entorno seguras (`GEMINI_API_KEY`).
- Validaciones pre-deployment mediante `pnpm build`.
