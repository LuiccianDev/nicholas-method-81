---
name: core-installation
description: Installing Tailwind CSS with Vite, PostCSS, CLI, or CDN
---

# Installation

How to add Tailwind CSS to a project.

## Vite (Recommended)

```bash
npm install tailwindcss @tailwindcss/vite
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
})
```

```css
/* style.css */
@import "tailwindcss";
```

## PostCSS

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

```js
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

```css
@import "tailwindcss";
```

## Tailwind CLI

```bash
npx @tailwindcss/cli -i ./src/input.css -o ./dist/output.css --watch
```

```css
/* input.css */
@import "tailwindcss";
```

## Play CDN (Development only)

```html
<script src="https://cdn.tailwindcss.com"></script>
```

Not for production: no purging, larger payload.

## Framework guides

- **Astro**: install `tailwindcss` + `@tailwindcss/vite` and register the plugin in `astro.config.ts` under `vite.plugins`; add `@import "tailwindcss"` to your global CSS (e.g. `src/styles/index.css`).
- **Nuxt**: `@tailwindcss/vite` in `nuxt.config.ts` under `vite.plugins`
- **Next.js**: the `@tailwindcss/postcss` plugin in `postcss.config.mjs`
- **React Router / SvelteKit / SolidJS / Remix**: use `@tailwindcss/vite`

## Key Points

- Vite: `@tailwindcss/vite` plugin + `@import "tailwindcss"`
- PostCSS: `@tailwindcss/postcss`
- CLI: `npx @tailwindcss/cli`
- v4 is CSS-first: configuration lives in CSS (`@theme`); no config file is required
- Use `@theme` in CSS to customize design tokens

<!--
Source references:
- https://tailwindcss.com/docs/installation/using-vite
- https://tailwindcss.com/docs/installation/using-postcss
- https://tailwindcss.com/docs/installation/tailwind-cli
- https://tailwindcss.com/docs/installation/play-cdn
- https://tailwindcss.com/docs/installation/framework-guides/astro
-->
