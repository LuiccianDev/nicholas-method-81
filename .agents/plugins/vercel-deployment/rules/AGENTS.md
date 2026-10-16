# Vercel Deployment Guidelines

1. **Variables de Entorno:**
   - La API key `GEMINI_API_KEY` debe estar definida en el dashboard del proyecto en Vercel (Production y Preview).
   - Nunca incluir el archivo `.env` en commits de Git (verificar `.gitignore`).
2. **Build de Verificación:**
   - Antes de realizar un push a producción, comprobar que `pnpm build` compile limpiamente.
3. **Adaptador Vercel:**
   - Mantener el adaptador `@astrojs/vercel` en `astro.config.ts`.
