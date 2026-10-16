---
name: nicholas-methodology
description: Procedimiento y criterios para la selección numérica de métodos de minería según Nicholas (1981). Clasificación geométrica, geomecánica (RMR/RQD/UCS), cálculo de puntuaciones y ranking de métodos subterráneos y cielo abierto.
---

# Nicholas Method (1981) — Numerical Mining Method Selection

Esta skill proporciona el conocimiento técnico y procedimental para comprender, evaluar y auditar la selección de métodos mineros desarrollada por David E. Nicholas en 1981.

## 1. Parámetros de Entrada

### A. Geometría del Yacimiento
- **Forma general (Shape):**
  - Masivo (Massive): dimensiones similares en todas direcciones.
  - Tabular / Laminar (Tabular): dos dimensiones predominan sobre el espesor.
  - Irregular (Irregular): límites y dimensiones variables.
- **Potencia / Espesor (Thickness):**
  - Muy estrecho (Very Narrow): < 3 m.
  - Estrecho (Narrow): 3 m - 10 m.
  - Intermedio (Intermediate): 10 m - 30 m.
  - Potente / Grueso (Thick): 30 m - 100 m.
  - Muy potente (Very Thick): > 100 m.
- **Inclinación / Buzamiento (Plunge / Dip):**
  - Plano (Flat): < 20°.
  - Intermedio (Intermediate): 20° - 55°.
  - Empinado (Steep): > 55°.
- **Distribución de leyes (Grade distribution):**
  - Uniforme (Uniform): ley homogénea en todo el depósito.
  - Gradacional (Gradational): transición gradual de leyes.
  - Errático (Erratic): bolsas o concentración irregular.

### B. Condiciones Geomecánicas (por zona: Mineral, Techo/Hanging Wall, Piso/Footwall)
1. **Resistencia de la roca intacta (Substance Strength):**
   - Razón entre la Resistencia a Compresión Uniaxial ($\sigma_c$ o UCS) y el esfuerzo vertical inducido ($\sigma_v$):
     - Débil (Weak): $< 8$
     - Moderada (Moderate): $8 - 15$
     - Fuerte (Strong): $> 15$
2. **Espaciamiento de fracturas (Fracture Spacing / RQD):**
   - Muy espaciado (Wide): $> 1.0\text{ m}$ o RQD $> 75\%$
   - Moderadamente espaciado (Moderate): $0.3 - 1.0\text{ m}$ o RQD $50\% - 75\%$
   - Muy fracturado (Close): $0.1 - 0.3\text{ m}$ o RQD $25\% - 50\%$
   - Muy intenso (Very Close): $< 0.1\text{ m}$ o RQD $< 25\%$
3. **Resistencia de las fracturas (Fracture Shear Strength):**
   - Débil (Weak): juntas abiertas, rellenos blandos arcillosos.
   - Moderada (Moderate): juntas limpias o ligeramente rugosas.
   - Fuerte (Strong): juntas rugosas, onduladas, sin relleno blando.

## 2. Puntuación y Ranking
- Cada método recibe una puntuación geométrica ($S_{geo}$) y una puntuación geomecánica ($S_{rock} = S_{ore} + S_{hw} + S_{fw}$).
- **Puntuación Total:** $S_{total} = S_{geo} + S_{rock}$.
- Puntuaciones negativas extremas (ej. -49) indican incompatibilidad o exclusión operativa.
- **Top 1 Subterráneo:** Excluir siempre Open Pit de la lista de métodos subterráneos candidatos.
