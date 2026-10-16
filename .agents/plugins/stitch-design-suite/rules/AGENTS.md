# Stitch Design Guidelines — Nicholas Method 81

Reglas mandatorias para la generación de diseño, captura de pantallas, prototipado y sincronización con Stitch:

1. **Fidelidad al Sistema de Diseño (`src/styles/index.css` & `DESIGN.md`):**
   - **Tipografía Estricta:**
     - `font-mono` (JetBrains Mono): Exclusivo para valores numéricos, puntuaciones, matrices RMR/UCS/RQD, inputs de parámetros, badges técnicos y códigos NM-0x.
     - `font-boldonse` (Boldonse): Exclusivo para encabezados de sección, marca y titulares h1/h2.
     - `font-prompt` (Prompt): Para textos funcionales, descripciones y controles UI.
   - **Paleta de Colores Oficial (Tailwind CSS v4):**
     - `--color-primary`: `#a4cf82` (Mineral Lime Green)
     - `--color-secondary`: `#f0e76f` (Sulphur Yellow)
     - `--color-tertiary`: `#ecb65f` (Ochre Gold)
     - `--color-quaternary`: `#e89951` (Terracotta Orange)
     - `--color-background`: `#fbfdfa` (Alabaster Off-white)
     - `--color-text-primary`: `#0e0701` (Charcoal Black)
     - `--color-border`: `#ecb65f`

2. **Workflow Estricto de Prototipado (Stitch -> Local React):**
   - **Paso 1: Generación / Variación con Inyección de `DESIGN.md`:**
     - Al generar pantallas (`stitch generate screen`) o variantes (`stitch edit screen`), SIEMPRE incluir las directivas explícitas de color, fuentes permitidas y estilo editorial técnico ("technical laboratory dashboard, high contrast, clean monospace readouts, no generic SaaS clutter").
     - Nunca permitir que Stitch invente clases utilitarias incompatibles (`bg-surface-container`, `text-headline-sm`) sin mapearlas de inmediato a las clases de nuestro Tailwind v4.
   - **Paso 2: Comunicación y Aprobación Previa:**
     - Mostrar al usuario el enlace de la pantalla en Stitch Canvas (`stitch url screen ...`) o la imagen de previsualización antes de tocar código.
     - Explicar claramente: *"Esta pantalla es un prototipo visual estático (HTML/CSS). Ahora adaptaremos su layout y estética a tus componentes React respetando el cálculo matemático y el estado global."*
   - **Paso 3: Traslado Quirúrgico al Código (Traducción React):**
     - NUNCA pegar el HTML monolítico plano de Stitch directamente en el proyecto, ya que destruiría la reactividad, el cálculo Nicholas (1981) y los hooks de estado.
     - Extraer quirúrgicamente la estructura visual (grillas, bordes, flexbox, espaciados) y adaptarla a los componentes modulares (`CardResult.tsx`, `BarChart.tsx`, `ParametersForm.tsx`, etc.).
     - Mantener siempre la lógica de negocio intacta en `src/lib/nicholas/`.

3. **Captura de Pantallas:**
   - Realizar las capturas locales siempre sobre el puerto de Astro (**4321**):
     `stitch capture browser --url="http://localhost:4321/calculator"` o ruta correspondiente.
   - Verificar siempre el renderizado en `.stitch/verify-capture.png` antes de subir o enlazar pantallas.

4. **No Modificar Código para Pruebas de Captura:**
   - NUNCA modificar el código fuente en `src/` para eludir estados de carga o modales durante la captura de Stitch.

