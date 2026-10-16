# Backend Guidelines — Node.js & APIs

1. **Seguridad y Validación en Endpoints:**
   - Validar y limitar el tamaño del body (`content-length`) en todas las rutas bajo `src/pages/api/`.
   - Sanitizar cadenas de texto de entrada antes de procesarlas o enviarlas a APIs externas.
2. **Middleware:**
   - Mantener intacto el middleware de seguridad en `src/middleware.ts` con tipado `async (_context, next) => { ... }`.
3. **Manejo de Secrets:**
   - La API key de servicios externos (Gemini u otros) se consume vía `import { ... } from 'astro:env/server'`. Nunca exponerla en el cliente ni imprimirla en logs.
