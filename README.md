
<div align="center">

<img src="public/banner.png" alt="Mining Glossary Banner" width="100%">


![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-3-F7B93E?logo=prettier&logoColor=black)

Aplicacion web para recomendar metodos de minado usando una matriz de evaluacion basada en geometria del deposito y condiciones geomecanicas.
</div>

## Caracteristicas

- Formulario de entrada para parametros del yacimiento.
- Normalizacion de variables continuas a categorias del metodo.
- Calculo de puntajes por metodo minero.
- Visualizacion de resultados en tabla, seleccion y grafico.
- Recomendacion del mejor metodo absoluto y mejor metodo subterraneo.

## Metodo Nicholas 1981: enfoque numerico de seleccion

Esta aplicacion implementa una adaptacion practica del metodo de seleccion de metodos de minado propuesto por Nicholas en 1981.
La logica central es convertir condiciones geologicas y geomecanicas del yacimiento en puntajes comparables por metodo, para ordenar alternativas de forma objetiva.

Flujo general del metodo en esta app:

1. Definicion de variables de entrada del deposito.
	- Geometria y condicion general: forma, potencia, buzamiento y ley.
	- Condiciones geomecanicas por zona: mena, techo y muro piso.
2. Categorizacion de variables continuas.
	- Algunas entradas numericas se transforman en categorias discretas para poder evaluar con tablas de decision.
3. Evaluacion por matrices de puntuacion.
	- Cada metodo minero recibe puntajes por criterio.
	- Se calcula un puntaje geometrico y un puntaje geomecanico total.
4. Suma y ranking de alternativas.
	- Puntaje total = geometria + geomecanica.
	- Los metodos se ordenan de mayor a menor para obtener recomendacion.
5. Regla de descarte.
	- Valores fuertemente penalizados en la matriz indican combinaciones no recomendables para ese metodo.

Alcance de esta implementacion:

- Sirve como herramienta de apoyo para preseleccion tecnica.
- No reemplaza estudios de ingenieria de detalle, costos, ventilacion, secuencia operativa, seguridad, ni validacion geotecnica especifica del proyecto.

## Referencia metodologica

- Nicholas, D. E. (1981). Method Selection: A Numerical Approach.
- Fuente consultada: https://www.cnitucson.com/publications/1981_Nicholas_436-Method%20Selection%20-%20A%20Numerical%20Approach%201981.pdf
- Nota: esta descripcion resume el enfoque metodologico y no reproduce contenido textual extenso del documento original.


## Requisitos

- Node.js 20+
- pnpm 10+

## Instalacion

```bash
pnpm install
```

## Scripts disponibles

```bash
pnpm dev       # Inicia entorno de desarrollo con Vite
pnpm build     # Compila TypeScript y genera build de produccion
pnpm preview   # Previsualiza el build generado
pnpm lint      # Ejecuta ESLint
pnpm format    # Formatea el proyecto con Prettier
```

## Uso rapido

```bash
pnpm dev
```

Luego abre la URL local mostrada por Vite (por defecto `http://localhost:5173`).

## Licencia

Este proyecto se distribuye bajo licencia MIT. Consulta el archivo `LICENSE` para mas detalles.
