# Guía de Prompts de Imágenes — Nicholas Method 81

Documento técnico de generación de imágenes con inteligencia artificial (Midjourney v6, FLUX.1, DALL-E 3, Stable Diffusion XL) para la landing page de **Nicholas Method 81**.

El estilo integra una visión **geológico-ambiental contemporánea**, paisajes verdes de campo y alta montaña, sustentabilidad y preservación ecológica, combinada con dinamismo visual (**motion style / cinematic motion blur**) y la paleta cromática oficial del proyecto.

---

## 1. Sistema de Estilo y Dirección de Arte (Master Style Guide)

### Paleta Cromática y Tokens Visuales
- **Mineral Lime Green (`#a4cf82`):** Musgo andino, praderas de altura, vegetación viva en bancos mineros revegetados, luminiscencia mineral verdosa.
- **Sulphur Yellow (`#f0e76f`):** Rayos solares matutinos filtrados por niebla, acentos de mineral sulfurado, reflejos cálidos de alta energía.
- **Ochre Gold (`#ecb65f`):** Estratos de areniscas, óxidos de hierro, vetas de roca meteorizada y tierra arcillosa.
- **Terracotta Orange (`#e89951`):** Luces de seguridad cálidas, atardeceres sobre macizos rocosos.
- **Charcoal Black (`#0e0701`):** Cavidades profundas, sombras de socavón, contraste tectónico.
- **Alabaster Off-White (`#fbfdfa`):** Niebla de valle, vapor geotérmico limpio, luz natural difusa.

### Modificadores de Cámara y "Motion Style"
- **Keywords de Movimiento:** `kinetic motion blur`, `subtle long exposure`, `panning camera movement`, `dynamic atmospheric dust in light shafts`, `cinematic camera drift`.
- **Óptica:** `35mm anamorphic lens`, `f/2.8 shallow depth of field`, `photorealistic RAW photograph`, `volumetric light beams`, `natural overcast daylight mixed with golden hour`.
- **Negativos recomendados:** `deformed, cartoon, 3d render plastic, low resolution, cyberpunk neon, smog pollution, toxic waste, oversaturated unnatural colors`.

---

## 2. Prompts para Secciones de la Landing Page

### 2.1 Hero Section — Panorámica Geológica y Entrada al Socavón Verde
- **Uso en web:** Fondo del Hero en [Hero.tsx](file:///c:/Users/DAVID/Desktop/WorksSpacesCoding/nicholas-method-81/src/features/landing/sections/Hero/Hero.tsx) (`/Underground.jpeg`).
- **Relación de aspecto:** `16:9` (`--ar 16:9`)
- **Concepto:** Una majestuosa cordillera andina con laderas verdes y vegetación fresca, donde se integra armónicamente un portal de mina subterránea de alta tecnología y arquitectura de piedra natural. Haces de luz solar dorada y verde esmeralda entran por la boca del túnel con niebla en movimiento.

```text
Cinematic wide shot of a sustainable modern underground mine portal nestled in lush green Andean highland mountains, rolling green meadows, emerald moss-covered rocky cliffs, natural morning mist moving gently, warm golden sunlight streaming through fog, subtle kinetic motion blur of passing environmental research vehicle, technical geological field equipment, photorealistic 8k, muted earth tones with accents of lime green (#a4cf82) and warm ochre (#ecb65f), shot on 35mm Hasselblad, f/2.8, atmospheric depth, clean eco-mining aesthetic --ar 16:9 --style raw --v 6.1
```

---

### 2.2 Overview Section — Inspección Geomecánica en el Campo
- **Uso en web:** Componente de visión técnica y evaluación geológica.
- **Relación de aspecto:** `16:9` (`--ar 16:9`)
- **Concepto:** Primer plano dinámico de testigos de perforación diamantina (core samples) ordenados en cajas de madera rústica sobre una mesa de campo al aire libre, con geólogos analizando la roca con lentes de aumento, de fondo praderas verdes y colinas brumosas.

```text
Close-up dynamic composition of cylindrical diamond drill core rock samples resting in wooden core boxes on an outdoor field table, hands of a geologist in technical field gear holding a brass magnifier inspecting rock fracture spacing, background of vast green rolling hills and mountain mist, natural soft sunlight, cinematic depth of field, sharp rock textures contrasting with soft green field flora, color grading in lime green and warm ochre mineral tones, photorealistic national geographic documentary style, 35mm lens --ar 16:9 --style raw --v 6.1
```

---

### 2.3 How It Works — Las 3 Fases del Algoritmo

#### Paso 1: Caracterización del Terreno y Geología (Step 1)
```text
Geological engineering field survey at dawn, female and male mining engineers in high-visibility safety vests with digital tablets and geological compass, surveying a steep green vegetated rock cliff face with exposed mineral veins, subtle morning breeze moving alpine grasses, dynamic low-angle shot, soft volumetric lighting, eco-friendly field exploration, crisp textures, shot on Sony A7R V --ar 16:9 --style raw --v 6.1
```

#### Paso 2: Análisis Numérico Nicholas 1981 (Step 2)
```text
Transparent holographic 3D geological stratum matrix projected above a technical drafting table in a high-tech field tent, glowing technical wireframe showing rock mass classification and mining method scores, surrounded by panoramic windows opening to a lush pine mountain landscape, subtle motion blur of illuminated data particles, elegant lime green (#a4cf82) and soft sulphur yellow (#f0e76f) glow, architectural photography --ar 16:9 --style raw --v 6.1
```

#### Paso 3: Decisión Óptima y Sostenibilidad (Step 3)
```text
Panoramic view from a modern glass-walled technical observation post overlooking an eco-responsible mining operation integrated into green terraced hills, clean electric haulage trucks silently moving on contoured roads, blue sky with white clouds, pristine environmental reclamation, sense of engineering precision, dynamic composition --ar 16:9 --style raw --v 6.1
```

---

### 2.4 Footer Section — Paisaje Post-Minería y Restauración Ecológica
- **Uso en web:** Fondo del banner de cierre en [Footer.tsx](file:///c:/Users/DAVID/Desktop/WorksSpacesCoding/nicholas-method-81/src/components/layout/Footer.tsx) (`/footer.jpeg`).
- **Relación de aspecto:** `16:9` o `21:9` (`--ar 16:9`)
- **Concepto:** Horizonte expansivo al atardecer sobre un valle minero completamente restaurado con terrazas agrícolas verdes, humedales limpios, vegetación autóctona y siluetas montañosas serenas.

```text
Breathtaking panoramic sunset over a successfully reclaimed post-mining valley, terraced green hillsides covered in native wildflowers and alpine grasses, clean natural water catchment basin reflecting the golden and lime green sky, distant mountains under soft purple and ochre twilight, peaceful environmental rehabilitation, atmospheric mist rising from the valley floor, ultra-wide cinematic landscape photography, medium format camera, f/8, hyper-detailed --ar 16:9 --style raw --v 6.1
```

---

## 3. Prompts para los 10 Métodos de Minería (Cards del MethodsRail)

Cada uno de estos prompts está diseñado para generar tarjetas verticales con proporción **`2:3`** (`--ar 2:3`), concordando perfectamente con el contenedor de [MethodCard.tsx](file:///c:/Users/DAVID/Desktop/WorksSpacesCoding/nicholas-method-81/src/features/landing/components/cards/MethodCard.tsx) (`aspectRatio: '2/3'`).

---

### 01. Open Pit (Cielo Abierto)
- **Descriptor:** *Surface mining, shallow deposits*
- **Visual:** Bancos y terrazas concéntricas talladas en la roca rodeadas por un cinturón forestal verde espeso, con camiones de extracción eléctricos en movimiento con suave estela de polvo y vegetación perimetral.

```text
Vertical composition of an environmentally managed Open Pit mine, grand stepped rock benches bordered by vibrant green pine forest and terraced slope revegetation, electric mining hauler climbing a switchback ramp with subtle motion blur, morning sunbeams slicing through mountain fog, contrast between ochre-grey mineral walls and rich emerald green vegetation, aerial drone perspective looking down, ultra realistic --ar 2:3 --style raw --v 6.1
```

---

### 02. Block Caving (Hundimiento por Bloques)
- **Descriptor:** *Large, low-grade massive deposits*
- **Visual:** Sección transversal geológica monumental que muestra la masa mineral fracturada hundiéndose de manera gravitacional y controlada en galerías de extracción subterránea, coronada en superficie por valles verdes naturales no perturbados.

```text
Dynamic vertical cutaway cross-section of a massive Block Caving underground mining system, upper untouched pristine green mountain surface with alpine trees, transitioning downward into a massive fractured ore body undergoing controlled gravity subsidence into extraction funnel cones, warm underground safety lights contrasting with cool green daylight above, cinematic technical illustration blended with photorealism --ar 2:3 --style raw --v 6.1
```

---

### 03. Sublevel Stoping (Caserones por Subniveles)
- **Descriptor:** *Competent ore, moderate thickness*
- **Visual:** Gran cámara subterránea vertical (stope) en roca competente y firme, con perforación de barrenos largos visibles y haces de luz cenital filtrándose, polvo suspendido en movimiento cinético.

```text
High-ceiling subterranean stope in Sublevel Stoping mining method, competent vertical rock walls with visible longhole drill patterns, dynamic upward angled shot, shafts of dusty volumetric light beaming from an upper sublevel access drift, subtle motion of falling fine rock fragments, amber work lamps illuminating lime-green mineral veining in the dark solid rock mass, architectural underground photography --ar 2:3 --style raw --v 6.1
```

---

### 04. Sublevel Caving (Hundimiento por Subniveles)
- **Descriptor:** *Weak ore, tabular to massive*
- **Visual:** Galería de producción activa donde una pala cargadora (LHD) extrae mineral fragmentado mientras el techo rocoso cede controladamente; sensación de masa geológica activa y potente.

```text
Underground production crosscut during Sublevel Caving, an electric LHD loader scooping blasted rock muckpile with kinetic tire motion blur, controlled caving gravel and rock fragments descending in the background, steel arched supports and rockbolts, dust illuminated by vehicle headlights, earthy ochre and dark charcoal palette with bright technical accents, raw industrial documentary photography --ar 2:3 --style raw --v 6.1
```

---

### 05. Longwall (Tajos Largos)
- **Descriptor:** *Thin, flat coal or soft ore seams*
- **Visual:** Perspectiva en fuga a lo largo de un frente mecanizado continuo con escudos hidráulicos relucientes y una cizalladora en traslación cortando el manto de mineral, con rocío de agua en spray para control ambiental de polvo.

```text
Linear perspective looking down a mechanized Longwall mining face, row of heavy automated hydraulic roof support shields receding into darkness, shearer drum actively cutting the mineral seam with motion-blurred water mist spray suppression, vibrant sparks and wet glossy rock reflections, high-tech underground extraction, industrial realism, dramatic lighting --ar 2:3 --style raw --v 6.1
```

---

### 06. Room & Pillar (Cámaras y Pilares)
- **Descriptor:** *Flat, competent bedded deposits*
- **Visual:** Cuadrícula geométrica y majestuosa de pilares monolíticos de roca natural sosteniendo un techo plano y regular, semejante a una catedral subterránea iluminada por luminarias LED sostenibles.

```text
Underground cavernous grid of massive rectangular rock pillars in a Room and Pillar mine, flat smooth ceiling supported by systematic resin rockbolts, clean gravel roadway disappearing into the distance between massive rock columns, low-mounted green-tinted LED lighting strips casting long shadows, subterranean architectural cathedral feel, ultra-crisp textures --ar 2:3 --style raw --v 6.1
```

---

### 07. Shrinkage Stoping (Caserones de Almacenamiento)
- **Descriptor:** *Steep, narrow, competent veins*
- **Visual:** Veta vertical estrecha e inclinada donde mineros sobre la plataforma del mineral arrancado perforan hacia el techo, polvo dorado en suspensión y sensación de verticalidad extrema.

```text
Dramatic vertical composition inside a steep, narrow vein Shrinkage Stope, miners standing on the broken ore reserve platform operating a stoper drill upward, water droplets and fine mist caught in the beam of helmet cap lamps, sheer hanging-wall and footwall rock boundaries clearly defined, intense verticality and tactile stone texture, cinematic documentary style --ar 2:3 --style raw --v 6.1
```

---

### 08. Cut & Fill (Corte y Relleno)
- **Descriptor:** *High-value, irregular ore bodies*
- **Visual:** Galería de extracción selectiva donde se observa la fase de relleno con pasta estéril compactada (relave cementado ecológico) y vegetación/roca viva circundante, destacando el manejo ambiental de residuos.

```text
Modern Cut and Fill mining stope undergoing engineered paste backfill, smooth compacted eco-friendly cemented tailings floor providing a pristine working platform, selective excavation of an irregular high-grade mineral vein, technical workers monitoring paste injection pipes, bright clean industrial work lights, contrasting dark host rock and light grey engineered fill, high resolution --ar 2:3 --style raw --v 6.1
```

---

### 09. Top Slicing (Rebanado Descendente)
- **Descriptor:** *Weak ore under caving hanging wall*
- **Visual:** Estructura flexible de entramado de madera y esteras metálicas que sostiene un techo fracturado mientras se desciende en rebanadas sucesivas, combinando artesanía geológica y control de presiones.

```text
Underground timber-supported slice excavation in Top Slicing mining, heavy timber mats and wire mesh holding back caved overburden rock above, warm yellow incandescent work lamps hanging from rough wooden beams, rustic texture of seasoned logs and compressed rock layers, historical engineering methodology modernized with safety gear, authentic tactile atmosphere --ar 2:3 --style raw --v 6.1
```

---

### 10. Square Set (Cuadros de Madera)
- **Descriptor:** *Weak ore and walls, high-grade*
- **Visual:** Malla tridimensional modular de marcos de madera cúbicos interconectados (square sets) ensamblados en una veta de alta ley con mineral visible brillando con reflejos de calcopirita y oro, luz cálida y sensación de celosía geométrica.

```text
Intricate three-dimensional labyrinth of interlocking cubic timber frames inside a high-grade Square Set mining stope, timber posts and caps forming a modular geometric matrix inside unstable rock mass, sparkling rich metallic ore grains in the exposed rock face reflecting warm lantern light, authentic craftsmanship of deep underground mining, atmospheric dust in rays of light, tactile vintage engineering aesthetic --ar 2:3 --style raw --v 6.1
```

---

## 4. Guía de Ejecución Rápida en Generadores

### Midjourney v6
Copia el prompt completo agregando al final los parámetros de aspecto y estilización:
- **Para Secciones:** `--ar 16:9 --style raw --v 6.1`
- **Para Métodos:** `--ar 2:3 --style raw --v 6.1`

### DALL-E 3 (ChatGPT Plus / OpenAI API)
Elimina los parámetros tipo `--ar` y antepón la instrucción de formato:
- *"Create a photorealistic vertical portrait (aspect ratio 2:3) capturing [texto del prompt]"*
- *"Create a cinematic wide panoramic landscape (aspect ratio 16:9) capturing [texto del prompt]"*

### FLUX.1 / Stable Diffusion XL
Configura la resolución nativa recomendada:
- **Para Secciones (`16:9`):** `1344 x 768 px` o `1920 x 1080 px`
- **Para Métodos (`2:3`):** `832 x 1248 px` o `1024 x 1536 px`
