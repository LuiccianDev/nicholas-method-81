# Astro 7 Project Guidelines

1. **Arquitectura del Proyecto:**
   - Modo de salida del servidor: `output: 'server'` con `@astrojs/vercel` en `astro.config.ts`.
   - Plugin de estilos: `@tailwindcss/vite` montado en `vite.plugins` dentro de `astro.config.ts`.
2. **Islas React:**
   - Usar directivas explícitas de cliente según la necesidad:
     - `client:load` para componentes críticos interactivos inmediatos (como navegación o calculadoras activas).
     - `client:visible` para componentes interactivos ubicados más abajo del viewport.
3. **Documentación Oficial en Vivo (MCP):**
   - Cuando se presenten dudas sobre APIs de Astro 7, directivas o cambios de versión, priorizar la consulta a través del servidor MCP `astro-docs` (`https://mcp.docs.astro.build/mcp`).
4. **Dev Server & Puerto:**
   - El puerto por defecto del servidor Astro es **4321**.
