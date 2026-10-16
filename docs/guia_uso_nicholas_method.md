# Guia tecnica de uso: Metodo de Nicholas

## 1. Proposito

Esta aplicacion convierte el metodo numerico de Nicholas para seleccion de metodos de explotacion en un flujo simple de uso. Su objetivo es ayudar a preseleccionar metodos mineros a partir de la geometria del yacimiento, la distribucion de leyes y las condiciones geomecanicas del cuerpo mineralizado, la caja techo y la caja piso.

La herramienta no reemplaza el criterio del ingeniero. El resultado es una preseleccion tecnica para pasar a una etapa de analisis mas detallado.

## 2. Que evalua la metodologia

El paper original propone un proceso en dos etapas:

1. Stage 1: clasificar el yacimiento por geometria, distribucion de leyes y caracteristicas geomecanicas, y luego rankear los metodos mineros que mejor se ajustan.
2. Stage 2: tomar los metodos mejor rankeados y hacer un estudio preliminar de mina para estimar costos, cut-off grade, reservas minables y viabilidad economica.

La aplicacion implementa la logica de Stage 1 para ordenar los metodos y mostrar cuales tienen mejor encaje tecnico.

## 3. Datos que debes ingresar

El formulario trabaja con 4 bloques de informacion:

### Geometria y distribucion de leyes

- General shape: forma general del cuerpo mineralizado.
- Ore thickness: espesor del cuerpo.
- Ore plunge: inclinacion o buzamiento del cuerpo.
- Grade distribution: distribucion de leyes.

### Roca del mineral (Ore)

- Rock substance strength.
- Fracture spacing.
- Fracture strength.

### Hanging wall

- Rock substance strength.
- Fracture spacing.
- Fracture strength.

### Footwall

- Rock substance strength.
- Fracture spacing.
- Fracture strength.

## 4. Como interpretar cada categoria

La metodologia original usa categorias discretas. Si tu dato real cae entre dos rangos, usa el criterio geologico-geomecanico mas representativo del dominio que estas evaluando.

### Geometria

- General shape: Massive, Tabular/Platy o Irregular.
- Ore thickness: Narrow, Intermediate, Thick o Very Thick.
- Ore plunge: Flat, Intermediate o Steep.
- Grade distribution: Uniform, Gradational o Erratic.

### Rock mechanics

Para el paper, la resistencia del macizo se expresa como una relacion entre resistencia a compresion simple y esfuerzo litostatico.

- Weak: < 8.
- Moderate: 8 - 15.
- Strong: > 15.

El espaciamiento de fracturas se interpreta por densidad de discontinuidades o por RQD equivalente.

- Very close.
- Close.
- Wide.
- Very wide.

La resistencia de fractura se clasifica de forma cualitativa:

- Weak: junta limpia y lisa, o con relleno debil.
- Moderate: junta limpia y rugosa.
- Strong: junta con relleno mas resistente que la roca de caja.

## 5. Como usar la aplicacion

1. Abre la pantalla principal de la calculadora.
2. Completa primero la geometria del yacimiento.
3. Completa luego las tres zonas geomecanicas: ore, hanging wall y footwall.
4. Revisa que los datos no queden vacios y que cada valor represente el dominio geologico correcto.
5. Ejecuta el calculo.
6. Revisa el ranking de metodos resultante.

## 6. Como leer el resultado

La aplicacion presenta un puntaje por metodo minero. El metodo con mejor puntuacion total es el candidato principal de preseleccion.

Un resultado alto significa que el metodo es compatible con la geometria y con las condiciones de roca ingresadas. Un resultado bajo o negativo indica que una o mas caracteristicas penalizan mucho ese metodo, o incluso lo eliminan.

En el paper original, un valor de exclusion muy fuerte aparece como penalizacion extrema y sirve para descartar un metodo cuando la condicion geologica lo hace incompatible.

## 7. Como se debe tomar la decision

No uses el ranking como decision final. El paper insiste en que la seleccion debe pasar despues por una revision de:

- costos de minado y capitalizacion,
- ritmo de produccion,
- disponibilidad y tipo de mano de obra,
- impacto ambiental,
- condiciones de subsistencia,
- y restricciones especificas del sitio.

En otras palabras, la aplicacion te dice que metodos vale la pena estudiar con mas detalle, no cual debe construirse automaticamente.

## 8. Ejemplo de uso

Si el cuerpo es tabular, muy grueso, de inclinacion plana y con distribucion uniforme de leyes, el metodo de Nicholas tiende a favorecer alternativas a cielo abierto o metodos masivos segun el conjunto geomecanico.

Si la roca del ore y de las cajas es competente, y la geometria es favorable, el ranking puede empujar metodos como open pit o block caving hacia la parte superior.

Si las cajas son debiles o la geometria es desfavorable para oquedades abiertas, los metodos soportados o con relleno suelen ganar prioridad relativa.

## 9. Recomendacion practica de uso

Para obtener un resultado confiable:

- usa informacion de sondajes y mapeo geologico consistente,
- no mezcles datos de dominios estructurales distintos en un mismo registro,
- define bien ore, hanging wall y footwall antes de ingresar valores,
- y valida siempre el resultado con una revision de factibilidad economica y geotecnica.

## 10. Resumen corto

La aplicacion implementa la primera etapa del metodo de Nicholas para clasificar y rankear metodos de explotacion a partir de geometria, leyes y geomecanica. Su salida es una ayuda de preseleccion tecnica para apoyar el estudio minero, no una decision final de disenio.
