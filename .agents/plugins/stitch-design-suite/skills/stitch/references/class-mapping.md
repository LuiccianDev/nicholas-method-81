# Mapeo de Clases: Stitch HTML -> Tailwind CSS v4 (Nicholas Method 81)

Este documento define la correspondencia estricta entre las clases utilitarias que genera Stitch (en su prototipo HTML estático con Tailwind CDN) y las clases oficiales configuradas en `@theme` en `src/styles/index.css`.

---

## 1. Mapeo de Colores

| Clase Stitch (Genérica) | Clase Oficial Tailwind v4 | Valor Hex / Token Oficial | Uso Recomendado |
| :--- | :--- | :--- | :--- |
| `bg-primary`, `bg-primary-container` | `bg-primary` | `#a4cf82` | Botones principales, acentos destacados, método recomendado |
| `text-primary`, `text-on-primary-container` | `text-primary` | `#a4cf82` | Etiquetas activas, puntuaciones destacadas |
| `border-primary` | `border-primary` | `#a4cf82` | Borde de tarjetas activas |
| `bg-secondary`, `bg-secondary-container` | `bg-secondary` | `#f0e76f` | Indicadores secundarios |
| `border-border`, `border-outline-variant` | `border-border` o `border-border/60` | `#ecb65f` | Bordes estándar de paneles y tarjetas técnicas |
| `bg-tertiary`, `bg-tertiary-container` | `bg-tertiary` | `#ecb65f` | Métodos viables (+10 a +30) |
| `bg-quaternary`, `bg-error-container` | `bg-quaternary` | `#e89951` | Métodos descalificados (<0), alertas |
| `bg-background`, `bg-surface`, `bg-surface-container` | `bg-background` | `#fbfdfa` | Fondo base de la aplicación y tarjetas |
| `bg-surface-container-high`, `bg-surface-variant` | `bg-background/80` o `bg-primary/10` | - | Fondos secundarios translúcidos |
| `text-text-primary`, `text-on-surface` | `text-text-primary` | `#0e0701` | Texto principal, titulares, lecturas |
| `text-on-surface-variant`, `text-outline` | `text-text-primary/60` | - | Subtítulos, metadatos, notas técnicas |

---

## 2. Mapeo de Tipografía

| Clase Stitch | Clase Oficial | Fuente Real | Cuándo Usar |
| :--- | :--- | :--- | :--- |
| `font-headline-lg`, `font-headline-md`, `font-headline-sm` | `font-boldonse` | **Boldonse** | Titulares principales (H1, H2), títulos de tarjetas, nombre de métodos |
| `font-data-mono`, `font-mono` | `font-mono` | **JetBrains Mono** | Valores numéricos, inputs, steppers, puntuaciones, badges `NM-0x`, telemetry |
| `font-body-lg`, `font-body-md`, `font-body-sm`, `font-label-md` | `font-prompt` (o default) | **Prompt** | Párrafos, explicaciones, etiquetas de formulario, navegación |

> [!CAUTION]
> **Prohibición:** Nunca usar `font-sans`, `font-monserrate` o `font-roboto`.

---

## 3. Mapeo de Componentes de Layout

| Patrón Stitch | Estructura en React / Tailwind v4 |
| :--- | :--- |
| Barra superior con telemetry | `border border-border bg-background px-4 py-2 font-mono text-[11px]` |
| Card de recomendación principal | `border-2 border-primary bg-primary p-5 sm:p-6 text-text-primary` |
| Tarjeta técnica de análisis | `border border-border bg-background p-4 sm:p-5` |
| Micro-badge técnico | `border border-border/80 bg-background px-1.5 py-0.5 font-mono text-[9px] font-bold text-text-primary uppercase` |
| Botón de acción con estilo terminal | `border border-text-primary bg-text-primary text-background font-mono text-[11px] font-bold uppercase transition-all hover:bg-background hover:text-text-primary` |
