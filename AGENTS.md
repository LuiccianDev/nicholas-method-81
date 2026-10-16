# AGENTS.md — Nicholas Method 81

Guía compacta para agentes que trabajen en este repositorio. Léelo antes de editar.

## Stack y framework (importante)

- **Astro 7** con renderizado **server** (`output: 'server'`) y adapter **Vercel** — ver `astro.config.ts`. **NO** es un proyecto Vite independiente: no hay `vite.config`; Tailwind se monta como plugin de vite dentro de `astro.config.ts`.
- **React 19** (islas con `@astrojs/react`), TypeScript estricto (`astro/tsconfigs/strict`), **Tailwind 4**, GSAP, Recharts, lucide-react.
- Chat IA: endpoint `src/pages/api/chat.ts` usando `@google/genai` (Gemini), con fallback entre modelos.

## Gestor de paquetes

- Usa **pnpm** SIEMPRE. **No usar `npm`, `yarn`** en este proyecto.
- `pnpm-workspace.yaml` tiene `engineStrict` y `ignore-scripts`; instala con `pnpm install`.

## Comandos (definidos en `package.json`)

```bash
pnpm dev       # servidor de desarrollo (astro dev)
pnpm build     # build de producción (astro build) — SOLO para verificar producción
pnpm preview   # previsualizar el build generado
pnpm format    # Prettier: Prettier global (escribe sobre los archivos)
```

No existen scripts de `lint` ni `test`. No hay configuración de ESLint.

### Regla sobre `pnpm build`

- **NO ejecutes `pnpm build` por cada cambio pequeño o arreglo simple.** Reserva el build para verificar el resultado final en producción.
- Para validar cambios durante el desarrollo usa `pnpm dev` (server con hot reload) y revisa la consola del dev server.

## Formato de código

- Siempre, en **cada cambio**, formatea con el comando ya definido:
  ```bash
  pnpm format
  ```
- Prettier (`.prettierrc`): `semi`, `singleQuote`, `trailingComma: es5`, `tabWidth: 2`, `printWidth: 80`. Plugins: `prettier-plugin-astro` y `prettier-plugin-tailwindcss`.
- **`.prettierignore` ignora todo excepto `src/`**: `pnpm format` solo toca archivos dentro de `src/`. No intentes formatear fuera de ahí.
- `prettier-plugin-tailwindcss` usa `tailwindStylesheet` apuntando a `src/styles/index.css` — no muevas/renombres ese archivo sin ajustar `.prettierrc`.

## Tipografía — uso correcto de fuentes

Tokens definidos en `src/styles/index.css` (`@theme`). Usa SIEMPRE la utility de Tailwind correspondiente; no apliques `font-family` manual.

| Token | Utility | Cuándo usarla |
| --- | --- | --- |
| `--font-mono` (JetBrains Mono) | `font-mono` | Datos y números: inputs numéricos, resultados/scores, etiquetas técnicas (uppercase + tracking), matrices, badges, códigos de sección (NM-0x), placeholders de imagen. |
| `--font-boldonse` (Boldonse) | `font-boldonse` | Hero, headlines (h1/h2/h3 de display), texto decorativo grande, marca/logo, títulos de tarjetas. |
| `--font-prompt` (Prompt) | `font-prompt` (heredado en `body`) | UI base: párrafos, labels, botones, navegación. Es el default — no hace falta añadirla. |

### Prohibidas (no usar)

- `font-sans` (Inter), `font-monserrate` (Montserrat) y `font-roboto` (Roboto) están marcadas como "Typography not Use" en `index.css:11-13`. No usarlas en código nuevo ni mantenerlas en código existente.

### Reglas rápidas

- Número / etiqueta técnica → `font-mono`.
- Titular grande / impacto → `font-boldonse`.
- Todo lo demás (texto funcional) → `font-prompt` (default, sin clase).
- Eyebrows/labels en mayúsculas: combina `font-mono` con `tracking-wide`/`tracking-widest` (tokens en `index.css:36-37`).
- No mezclar: ni `font-boldonse` en párrafos ni `font-mono` en headlines.

## Estructura

- `src/pages/` — rutas Astro (`index.astro`, `App.astro`) y endpoints API (`api/chat.ts`).
- `src/features/` — features autocontenidas en minúsculas: `app/` (calculadora), `chat/`, `landing/`. Cada una agrupa sus componentes, secciones y hooks propios (p. ej. `features/chat/useChat.ts`).
- `src/components/` — componentes **compartidos** entre features: `layout/Footer.tsx`, `icons/IconHelmet.tsx`.
- `src/layouts/` — layouts Astro: `LayoutApp.astro`, `LayoutLanding.astro`, `BaseHead.astro` (head/meta/SEO único).
- `src/lib/nicholas/` — **solo dominio**: matrices de puntuación, cálculo de scores, categorización de inputs. Ni stores ni estado.
- `src/state/` — estado global (context) + stores externos: `calculator.tsx`, `calculatorStore.ts`, `theme.ts`.
- `src/types/` — tipos compartidos; `src/styles/` — CSS global (`index.css` + temas Tailwind 4).

**Importación:** usa SIEMPRE el alias raíz `@/*` (definido en `tsconfig.json` → `paths: { "@/*": ["src/*"] }`) para imports entre carpetas: p. ej. `@/state/calculator`, `@/lib/nicholas/calculateScores`, `@/features/app/App`, `@/layouts/LayoutApp.astro`. Solo rutas dentro de la misma feature usan relativas (`./`).

## Verificación de cambios (Playwright + skills)

- Antes de reportar un cambio como "listo", verifica en un navegador REAL cuando el cambio afecte a la UI/UX (renderizado, interacción, estilos, animación, layout). Para lógica interna, la consola del dev server es suficiente.
- Usa la skill `playwright-cli` (browser automation). Flujo estándar sobre el dev server:
  ```bash
  playwright-cli open http://localhost:4321
  playwright-cli snapshot        # confirmar renderizado
  playwright-cli click <ref>      # probar interacciones nuevas (según caso)
  playwright-cli console           # detectar errores de consola
  playwright-cli close
  ```
- **IMPORTANTE:** el puerto es `4321` (default de Astro), **NO** `5173`. El `README.md` dice `5173` pero está desactualizado — ignóralo.
- El dev server ya valida errores de TS/astro en caliente; úsalo para iterar. Solo corre `pnpm build` para verificar el resultado final de producción.

### Dev server y conflictos de puerto — REUTILIZAR, no duplicar

- **El dev server del usuario suele estar ya corriendo. NO lances `pnpm dev` a ciegas.**
- Antes de arrancar, comprueba si ya hay uno activo en el puerto 4321:
  ```bash
  curl -s -o NUL -w "%{http_code}" http://localhost:4321
  ```
  - responde `200` (o 3xx) → **ya hay server activo: REUTILÍZALO** y apunta Playwright a `http://localhost:4321`. No arranques otro.
  - no responde (error/`000`) → es cuando puedes lanzar `pnpm dev`.
- **Gotcha:** si el puerto 4321 está ocupado y aun así lanzas `pnpm dev`, Astro salta automáticamente al siguiente puerto libre (4322, 4323...) **sin dar error** — crearás un server duplicado inútil y no sabrás contra cuál verificar. Evítalo.
- Para confirmar en qué puerto quedó Astro, mira la línea `Local: http://localhost:<puerto>` de la salida de `pnpm dev`, o usa `netstat -ano | findstr :4321` (Windows).

## Skills — cargar antes de trabajar

Antes de abordar una tarea, carga la skill relevante vía la herramienta de skills cuando el trabajo matchee (obligatorio, no opcional):

- Animación/scroll (GSAP/ScrollTrigger): `gsap-react`, `gsap-scrolltrigger` u otra específica del contexto.
- Animación declarativa/React (Motion v13, `motion/react`): `motion` (islas React, gestures, layout, exit, scroll, springs).
- Diseño de UI / styling / rediseño: `frontend-design`, `tailwind-css-patterns`.
- Accesibilidad / a11y: `accessibility`.
- SEO / meta tags: `seo`.
- Refactor de código: `refactor` (o `request-refactor-plan` para planes grandes).
- Componentes React / performance: `react-best-practices` o `vercel-composition-patterns`.
- Revisión estricta de calidad: `thermo-nuclear-code-quality-review` (a pedido).
- Framework Astro: `astro`.
- Prototipado / Diseño UI / Stitch: `stitch` (plugin local `stitch-design-suite`).

Carga la skill ANTES de escribir código, para aplicar sus patrones desde el inicio.

## Prototipado y Rediseño con Stitch (Workflow Mandatorio)

Cuando el usuario pida prototipar, rediseñar, generar variantes o crear nuevas pantallas con Stitch:

1. **NO modificar código React directamente**: Todo rediseño comienza obligatoriamente en Stitch Canvas.
2. **Inyección de `DESIGN.md`**: Cada comando (`stitch generate screen`, `stitch edit screen`, `stitch generate variants`) debe inyectar la paleta de colores oficial (`#a4cf82`, `#ecb65f`, `#fbfdfa`, `#0e0701`), tipografía estricta (`font-boldonse`, `font-mono`, `font-prompt`) y estética de laboratorio minero técnico según [prompt-engineering-mining.md](.agents/plugins/stitch-design-suite/skills/stitch/references/prompt-engineering-mining.md).
3. **Presentación Previa**: Mostrar siempre el enlace directo (`stitch url screen <id> --project <id>`) al usuario para su revisión visual antes de iniciar la implementación.
4. **Traducción Quirúrgica a React**: Una vez aprobado el prototipo, usar el diccionario [class-mapping.md](.agents/plugins/stitch-design-suite/skills/stitch/references/class-mapping.md) para adaptar la estructura visual a componentes React existentes sin romper el estado global ni los cálculos matemáticos de Nicholas 1981. NUNCA pegar HTML monolítico directamente.

## Lógica de negocio / cálculo (zona delicada)

- **NO cambies los valores de las matrices de puntuación** (`src/lib/nicholas/scoringMatrices.ts`) a la ligera: son datos de la metodología Nicholas 1981, no "tuning". Cualquier cambio debe justificarse y avisarse explícitamente.
- **Resultados deterministas**: no introduzcas aleatoriedad ni orden inestable en el ranking (`calculateScores.ts`, `scoringMatrices.ts`). Si hay empates, documenta el criterio de desempate.
- **Tipos compartidos en `src/types/`**: al tocar inputs/resultados, actualiza en paralelo `src/lib/nicholas/categorizeInput.ts`, `src/lib/nicholas/calculateScores.ts` y `src/types/` para evitar drift de tipos.
- **Reglas de negocio del chat** (`src/pages/api/chat.ts`): respeta la regla de responder siempre en inglés y el descarte de Open Pit para la selección de método subterráneo (reglas del `SYSTEM_PROMPT`); no las alteres sin motivo.

## Seguridad (no romper)
- `src/middleware.ts` inyecta headers de seguridad en todas las respuestas (HSTS, X-Content-Type-Options, etc.). No lo elimines ni lo alteres sin motivo.
- La API key de Gemini se lee con `import { GEMINI_API_KEY } from 'astro:env/server'` (env definida en `astro.config.ts` como secret, opcional). La clave vive en `.env` local (ignorado por git). **Nunca** hardcodees ni imprimas la key; usa `.env.example` como plantilla.
- El endpoint `chat.ts` ya sanitiza inputs, limita tamaño-5 de body (`content-length`), acota mensajes y define su propio `SYSTEM_PROMPT`. Sigue ese patrón en nuevos endpoints.

## Convenciones

- Respuestas de chat del bot: siempre en **inglés** (regla del `SYSTEM_PROMPT`).
- Cambios pequeños y enfocados, respetando el estilo existente y formateando con `pnpm format`.
- No crear scripts nuevos de lint/test en `package.json` a menos que lo pida el usuario.

## Lo que NO debes inventar (evitar ruido)

- No hay scripts de `lint` ni `test`, ni config ESVM, ni `vite.config`. No los asumas ni los agregues.
- No crees reglas de branching/PR/commits ni flujos de revisión que este repo no practica.
- No recogíes la API key de Gemini en logs ni en código: vive solo en `.env` local.
- No dejes procesos corriendo (dev server, `astro preview`) al terminar, ni archivos de más (`dist/`, `.astro/`, `.env`, snapshots de playwright) sin limpiar.