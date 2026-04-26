# Guía Técnica: Pre-selección de Métodos de Explotación (Método de Nicholas)

## 1. Introducción: Propósito de la Herramienta

Bienvenido a la aplicación de evaluación para la selección de métodos de explotación basada en el Método de Nicholas (modificado). Esta herramienta está diseñada específicamente para estudiantes y profesionales de **Ingeniería de Minas** con el objetivo de agilizar el proceso de diseño y planificación inicial.

El principal beneficio de esta aplicación es **eliminar el trabajo manual** de las complejas operaciones matriciales y la categorización de variables continuas. En lugar de cruzar datos a mano en múltiples tablas, la aplicación permite ingresar los datos del yacimiento directamente y procesa la información al instante para generar recomendaciones objetivas.

> [!WARNING]
> **Advertencia Crítica:** Esta aplicación entrega una **sugerencia técnica de pre-selección**. El resultado arrojado (por ejemplo, *Sublevel Stoping*) **no reemplaza** el criterio del ingeniero ni los estudios de pre-factibilidad y factibilidad. La decisión final debe siempre considerar parámetros económicos, diseño de ventilación, ritmo de producción requerido y validaciones geotécnicas in-situ.

## 2. Fundamentos del Método en la Aplicación

La aplicación digitaliza y automatiza el enfoque numérico de selección de métodos de explotación. El flujo lógico interno es el siguiente:

1. **Recepción de Inputs:** Toma las características geométricas y geomecánicas del yacimiento y sus rocas encajonantes (caja techo y caja piso).
2. **Categorización:** Transforma valores numéricos continuos (como la potencia en metros o el buzamiento en grados) en las categorías discretas requeridas por las matrices originales (ej. "Estrecho", "Intermedio", "Masivo").
3. **Evaluación Matricial:** Aplica las matrices de puntuación del método de Nicholas/UBC. Cada método minero recibe una calificación geométrica y una calificación geomecánica.
4. **Sugerencia Óptima:** Suma los puntajes y sugiere el método (o métodos) con el valor numérico más alto, aplicando penalizaciones y reglas de exclusión para aquellos técnicamente inviables.

> [!IMPORTANT]
> **Criterios Externos No Evaluados:**
> La herramienta asume ciertas condiciones estándar para simplificar el cálculo inicial. Como ingeniero, es tu responsabilidad complementar el análisis evaluando factores externos que la herramienta no pide, tales como:
> - **Profundidad del yacimiento:** Métodos como *Block Caving* o *Room and Pillar* tienen serias limitantes de profundidad debido a los esfuerzos inducidos.
> - **Dilución y Recuperación Aceptable:** El valor del mineral (leyes) dicta qué tanta dilución es económicamente permisible.
> - **Disponibilidad de Capital (CAPEX):** Algunos métodos sugeridos pueden requerir inversiones iniciales masivas inasumibles para un proyecto pequeño.

## 3. Cómo Usar la Aplicación Paso a Paso

Sigue estos pasos para obtener una recomendación de explotación subterránea a partir de los datos de exploración de tu proyecto.

### Paso 1: Preparación de Datos (Inputs)
Antes de abrir la aplicación, asegúrate de tener a la mano el modelo geológico y geotécnico preliminar. Necesitarás:
- **Geometría:** Forma general del cuerpo, potencia (grosor), buzamiento (inclinación) y distribución de leyes.
- **Geomecánica (RMR/Q):** Resistencia de la roca intacta (RQD, UCS), fracturamiento y resistencia de discontinuidades tanto para la **Veta/Cuerpo (Ore)**, como para la **Caja Techo (Hanging Wall)** y **Caja Piso (Footwall)**.

### Paso 2: Ingreso en el Formulario
1. Abre la interfaz principal.
2. Ingresa los parámetros en la sección de formulario. Evita dejar campos vacíos, ya que la matriz requiere información completa para no sesgar el resultado.
3. El sistema categorizará automáticamente tus números reales a los rangos de la metodología.

### Paso 3: Interpretación de Resultados
Una vez calculados los puntajes, la interfaz te mostrará varias visualizaciones:

- **La Sugerencia Principal:** Verás destacado el **Mejor Método de Explotación Subterránea**. Este es el que matemáticamente se adapta mejor a tu yacimiento.
- **Gráficos de Barras y Matrices:** Observa los métodos que quedaron en segundo o tercer lugar. Si los puntajes son muy cercanos (ej. *Cut and Fill* vs *Shrinkage*), ambos merecen un estudio económico detallado.
- **Regla de Exclusión:** Si ves métodos con puntuaciones negativas muy altas (ej. -49), significa que una o más características de tu yacimiento hacen que ese método sea física o económicamente inviable (ej. *Room and Pillar* en una veta muy buzante).

## 4. Caso de Uso de Ejemplo

**Contexto del Yacimiento "Mina Ejemplo":**
- **Forma:** Tabular
- **Potencia:** 15 metros
- **Buzamiento:** 75° (Vertical/Subvertical)
- **Calidad Roca (Cuerpo):** Fuerte (RMR > 70)
- **Calidad Roca (Cajas):** Regular a Débil (RMR 40-50)

**Acción en la App:**
Ingresas estos datos en el formulario. La app toma los 15 metros y los clasifica como "Intermedio". Toma los 75° y los clasifica como "Empinado". Analiza la geomecánica donde el cuerpo es competente pero las cajas colapsarían si se dejan expuestas.

**Resultado Esperado:**
La aplicación descartará métodos de tajeos abiertos (*Open Stopes*) debido a la debilidad de las cajas (penalización severa). Puntuará positivamente métodos soportados, sugiriendo probablemente **Cut and Fill Stoping** (Corte y Relleno) como la mejor alternativa técnica subterránea, eliminando horas de cruce manual de datos en las matrices para el estudiante.
