# Plantilla de Prompting Técnico Minero para Stitch

Esta plantilla debe usarse como base para cualquier llamada a `stitch generate screen`, `stitch edit screen` o `stitch generate variants` en el proyecto **Nicholas Method 81**.

---

## 1. Estructura Obligatoria del Prompt

```text
[OBJETIVO DE LA PANTALLA O VARIANTE]
Generate a technical mining laboratory dashboard screen for [DESCRIPCIÓN DE LA SECCIÓN O PANTALLA].

STRICT DESIGN SYSTEM CONSTRAINTS:
- Aesthetic: Technical laboratory instrument, geotechnical engineering dashboard, high contrast, sharp geometric borders, clean telemetry readouts, zero generic SaaS clutter or playful rounded shapes.
- Color Palette (Strictly adhere to these exact hex values):
  * Background: #fbfdfa (Off-white / Alabaster)
  * Text Primary: #0e0701 (Charcoal Black)
  * Primary Accent: #a4cf82 (Mineral Lime Green)
  * Secondary Accent: #f0e76f (Pale Sulphur Yellow)
  * Tertiary Accent / Borders: #ecb65f (Ochre Gold)
  * Warning / Quaternary: #e89951 (Terracotta Orange)
- Typography:
  * Display / Headlines: Anton / Boldonse style (uppercase, high impact, tight leading).
  * Data & Numerical Readouts: JetBrains Mono (for all numbers, inputs, coordinates, scores, ratings).
  * Functional UI & Labels: Prompt (clean sans-serif for descriptions, buttons, and form labels).
- Components & Structure:
  * Top bar with telemetry status indicators (PROJECT: OD-81, BENCHMARK: NICHOLAS 1981, AUTO-COMPUTE: SYNCHRONIZED).
  * Technical badges formatted with NM-0x notation (e.g., NM-01 ANALYSIS INPUTS, NM-02 METHOD RECOMMENDATION, NM-03 VIABILITY INDEX).
  * Clean inputs with unit badges (m, °, frac/m, ratio) and tactile steppers.
  * Direct, concise technical copy without redundant marketing fluff.
```

---

## 2. Ejemplos de Uso

### Ejemplo A: Generar Nueva Variante del Panel Geotécnico
```bash
stitch generate variants --project 17136915846096781567 --screen 2489201705eb4c97965c2580ea27ba3f --prompt "Refine the geotechnical rock mass rating sub-cards (Ore Zone, Hanging Wall, Footwall). Keep strict Nicholas Method 81 palette (Green #a4cf82, Ochre #ecb65f, Alabaster #fbfdfa), monospace score readouts, and compact padding." --count 2 --creativeRange REFINE --json
```

### Ejemplo B: Crear un Prototipo para Modal de Matriz Numérica
```bash
stitch generate screen --project 17136915846096781567 --prompt "Create a full numerical scoring matrix modal for Nicholas (1981) method evaluation. High-density monospace data grid with column headers for Geometry, Ore Zone, Hanging Wall, Footwall, and Total Points. Use #fbfdfa background, #0e0701 text, #a4cf82 highlight for top ranking method, and #ecb65f borders." --device DESKTOP --title "Nicholas Matrix Modal" --json
```
