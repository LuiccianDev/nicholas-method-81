# Quality & Testing Guidelines

1. **Verificación en Navegador:**
   - Antes de dar por terminado cualquier cambio de interfaz visual, verificar mediante Playwright CLI en `http://localhost:4321`.
   - Comprobar que no existan errores en la consola del navegador (`playwright-cli console`).
2. **Puerto del Dev Server:**
   - El puerto del servidor es **4321** (Astro default). Comprobar disponibilidad antes de intentar arrancar un nuevo proceso.
3. **No romper accesibilidad:**
   - Todos los inputs numéricos y dropdowns en la calculadora deben tener etiquetas legibles por lectores de pantalla y soporte de foco por teclado.
