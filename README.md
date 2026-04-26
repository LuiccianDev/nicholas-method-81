<div align="center">
  <img src="public/banner.png" width="100%" alt="Nicholas Method Banner">

  # Nicholas Method 81
  *Mining Method Selection: A Numerical Approach*

  ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)
  ![pnpm](https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm&logoColor=white)
  ![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=white)
  ![Prettier](https://img.shields.io/badge/Prettier-3-F7B93E?logo=prettier&logoColor=black)

  [Features](#features) • [Methodology](#methodology) • [Installation](#installation) • [Quick Start](#quick-start)

</div>

A modern web application to evaluate and recommend mining methods using an evaluation matrix based on deposit geometry and geomechanical conditions.

## Features

- **Input Form** - Capture deposit parameters intuitively
- **Automated Normalization** - Transform continuous variables into method categories
- **Score Calculation** - Evaluate geometric and geomechanical scores by mining method
- **Results Visualization** - Display data via interactive tables, selection matrices, and charts
- **Smart Recommendations** - Identify the best overall method and optimal underground method automatically

## Methodology

This application implements a practical adaptation of the mining method selection methodology proposed by **David E. Nicholas (1981)**: *Method Selection: A Numerical Approach*. 

The core logic converts geological and geomechanical conditions into comparable scores to objectively rank alternatives.

### General Workflow

1. **Definition of Deposit Input Variables**: Assess geometry (shape, thickness, dip angle, grade) and geomechanical conditions by zone (ore body, hanging wall, footwall).
2. **Categorization of Continuous Variables**: Transform numerical inputs into discrete categories for evaluation with decision tables.
3. **Evaluation by Scoring Matrices**: Each mining method receives scores by criterion, computing a geometric score and total geomechanical score.
4. **Sum and Ranking of Alternatives**: Total score = geometry + geomechanics. Methods are ranked from highest to lowest.
5. **Exclusion Rule**: Strongly penalized values in the matrix indicate combinations not recommended for that method.

> [!CAUTION]
> This tool serves as support for technical preselection. It **does not replace** detailed engineering studies, cost analysis, ventilation, operational sequence, safety, or project-specific geotechnical validation.

## Installation

Ensure you have Node.js 20+ and pnpm 10+ installed.

```bash
# Install dependencies
pnpm install
```

## Available Scripts

- `pnpm dev` - Start development environment with Vite
- `pnpm build` - Compile TypeScript and generate production build
- `pnpm preview` - Preview the generated build
- `pnpm lint` - Run ESLint
- `pnpm format` - Format project with Prettier

## Quick Start

```bash
pnpm dev
```
Then open the local URL shown by Vite (default `http://localhost:5173`).

---

<div align="center">
  Developed for the Mining Industry.
</div>
