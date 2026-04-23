
<div align="center">

<img src="public/banner.png" alt="Mining Glossary Banner" width="100%">


![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-3-F7B93E?logo=prettier&logoColor=black)

Web application to recommend mining methods using an evaluation matrix based on deposit geometry and geomechanical conditions.
</div>

## Features

- Input form for deposit parameters.
- Normalization of continuous variables into method categories.
- Score calculation by mining method.
- Results visualization in table, selection matrix, and chart.
- Recommendation of the best overall method and best underground method.

## Nicholas Method 1981: Numerical Selection Approach

This application implements a practical adaptation of the mining method selection methodology proposed by Nicholas in 1981.
The core logic is to convert geological and geomechanical conditions of the deposit into comparable scores by method, to rank alternatives objectively.

General workflow of the method in this app:

1. Definition of deposit input variables.
	- Geometry and general condition: shape, thickness, dip angle, and grade.
	- Geomechanical conditions by zone: ore body, hanging wall, and footwall.
2. Categorization of continuous variables.
	- Some numerical inputs are transformed into discrete categories to enable evaluation with decision tables.
3. Evaluation by scoring matrices.
	- Each mining method receives scores by criterion.
	- A geometric score and total geomechanical score are calculated.
4. Sum and ranking of alternatives.
	- Total score = geometry + geomechanics.
	- Methods are ranked from highest to lowest to obtain recommendations.
5. Exclusion rule.
	- Strongly penalized values in the matrix indicate combinations not recommended for that method.

Scope of this implementation:

- Serves as a support tool for technical preselection.
- Does not replace detailed engineering studies, cost analysis, ventilation, operational sequence, safety, or project-specific geotechnical validation.

## Methodological Reference

- Nicholas, D. E. (1981). Method Selection: A Numerical Approach.
- Source consulted: https://www.cnitucson.com/publications/1981_Nicholas_436-Method%20Selection%20-%20A%20Numerical%20Approach%201981.pdf
- Note: this description summarizes the methodological approach and does not reproduce extensive textual content from the original document.


## Requirements

- Node.js 20+
- pnpm 10+

## Installation

```bash
pnpm install
```

## Available Scripts

```bash
pnpm dev       # Start development environment with Vite
pnpm build     # Compile TypeScript and generate production build
pnpm preview   # Preview the generated build
pnpm lint      # Run ESLint
pnpm format    # Format project with Prettier
```

## Quick Start

```bash
pnpm dev
```

Then open the local URL shown by Vite (default `http://localhost:5173`).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Developed with ❤️ for the Mining Industry.
</div>
