# Frontend Design Guidelines — Typography & Stack

1. **Tipografía Estricta (Tokens de `src/styles/index.css`):**
   - **`font-mono` (JetBrains Mono):** Exclusivo para datos numéricos, inputs de parámetros, puntuaciones, matrices, badges técnicos y códigos NM-0x.
   - **`font-boldonse` (Boldonse):** Exclusivo para titulares principales (h1/h2), títulos de tarjetas y encabezados de impacto.
   - **`font-prompt` (Prompt):** Heredado automáticamente en `body`. Usado en todo el texto funcional (párrafos, labels, botones).
   - **PROHIBIDAS:** No utilizar `font-sans` (Inter), `font-monserrate` (Montserrat) ni `font-roboto` (Roboto).
2. **Importaciones:**
   - Usar siempre el alias raíz `@/*` (ej. `@/components/layout/Header`, `@/lib/nicholas/calculateScores`).
3. **Tailwind CSS v4:**
   - Usar utilidades oficiales `--color-*` en `@theme`. No inventar clases no definidas.
