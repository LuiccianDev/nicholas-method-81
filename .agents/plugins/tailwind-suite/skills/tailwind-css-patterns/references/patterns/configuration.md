# Tailwind CSS Configuration

All configuration in Tailwind CSS **v4** lives in CSS (CSS-first). There is no `tailwind.config.js`.

Source: [Theme variables](https://tailwindcss.com/docs/theme) and [Functions and directives](https://tailwindcss.com/docs/functions-and-directives).

## CSS-First Configuration (v4)

```css
/* src/styles.css */
@import "tailwindcss";

@theme {
  /* Custom colors */
  --color-brand-50: oklch(0.97 0.01 250);
  --color-brand-500: oklch(0.62 0.21 259.8);
  --color-brand-900: oklch(0.33 0.12 260);

  /* Custom fonts */
  --font-display: "Inter", system-ui, sans-serif;
  --font-mono: "Fira Code", monospace;

  /* Custom spacing */
  --spacing-128: 32rem;

  /* Custom animations (keyframes inside @theme) */
  --animate-fade-in: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Custom breakpoints */
  --breakpoint-3xl: 120rem;
}
```

### Vite Integration (official)

The `@tailwindcss/vite` plugin is the recommended path. In Astro it goes inside `vite.plugins` of `astro.config.ts`; in plain Vite, in `vite.config.ts`.

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
})
```

```css
/* src/style.css */
@import "tailwindcss";
```

Source: [Installation with Vite](https://tailwindcss.com/docs/installation/using-vite).

## Custom Variants and Content Detection

- **`@custom-variant`**: registers custom variants (class-based dark mode, data attributes, ARIA, media queries).
- **`@source`**: adds content roots outside the automatically detected ones (e.g. a UI library in `node_modules`).

```css
@custom-variant dark (&:where(.dark, .dark *));

@source "../node_modules/@my-company/ui-lib";
```

Source: [Custom variants](https://tailwindcss.com/docs/functions-and-directives#custom-variant-directive) and [Detecting classes](https://tailwindcss.com/docs/detecting-classes-in-source-files#using-a-source-directive).

## Custom Utilities

Custom utilities are defined with `@utility`, with support for variants and functional values.

```css
@utility content-auto {
  content-visibility: auto;
}

/* Functional utility with theme values and a modifier */
@utility text-* {
  font-size: --value(--text-*, [length]);
  line-height: --modifier(--leading-*, [length], [*]);
}
```

Source: [Adding custom styles](https://tailwindcss.com/docs/adding-custom-styles#using-css-to-add-custom-utilities).

## JavaScript Plugins (v4)

Third-party JS plugins are loaded with the `@plugin` directive (using the `tailwindcss/plugin` entry of the package). This is how to integrate plugins that still exist (e.g. `@tailwindcss/typography`, `@tailwindcss/forms`):

```css
@plugin "@tailwindcss/typography";
@plugin "@tailwindcss/forms";
```

```css
@plugin "./my-plugin.js"; /* local plugin */
```

Source: [Plugins](https://tailwindcss.com/docs/functions-and-directives#plugin-directive).

## Reusing the Theme Across Projects

Share design tokens across projects by publishing a `theme.css` file with your tokens and `@import`ing it:

```css
/* packages/brand/theme.css */
@theme {
  --color-brand-500: oklch(0.62 0.21 259.8);
  --font-display: "Inter", system-ui, sans-serif;
}
```

```css
/* app.css */
@import "tailwindcss";
@import "../packages/brand/theme.css";
```

For a fully custom theme (without the default theme) use `--*: initial`. To always emit the tokens use `@theme static`. To reuse a variable inside another use `@theme inline`.

Source: [Theme variables — sharing across projects](https://tailwindcss.com/docs/theme#sharing-across-projects).