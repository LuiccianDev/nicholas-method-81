---
name: core-theme
description: Understanding theme variables, design tokens, customizing Tailwind's default theme, and working with colors
---

# Theme Variables

Theme variables are special CSS variables defined using the `@theme` directive that influence which utility classes exist in your project.

## Overview

Theme variables store design tokens like colors, fonts, spacing, shadows, and breakpoints. They're defined using the `@theme` directive:

```css
@import "tailwindcss";

@theme {
  --color-mint-500: oklch(0.72 0.11 178);
  --font-display: "Satoshi", "sans-serif";
  --breakpoint-3xl: 120rem;
}
```

Now utilities like `bg-mint-500`, `font-display`, and `3xl:grid-cols-6` become available.

## Why @theme Instead of :root?

Theme variables aren't just CSS variables - they also instruct Tailwind to create new utility classes. Using `@theme` makes this explicit and ensures variables are defined top-level.

Use `@theme` for design tokens that map to utilities. Use `:root` for regular CSS variables that shouldn't have corresponding utilities.

## Theme Variable Namespaces

Theme variables are organized into namespaces that map to utility classes:

| Namespace | Utility Classes |
|-----------|----------------|
| `--color-*` | `bg-red-500`, `text-sky-300`, `border-indigo-600`, etc. |
| `--font-*` | `font-sans`, `font-serif`, `font-mono` |
| `--text-*` | `text-lg`, `text-2xl` (font-size + line-height) |
| `--font-weight-*` | `font-bold`, `font-medium` |
| `--tracking-*` | `tracking-tight`, `tracking-widest` (letter-spacing) |
| `--leading-*` | `leading-tight`, `leading-loose` (line-height) |
| `--breakpoint-*` | Responsive variants like `md:`, `lg:`, `xl:` |
| `--spacing-*` | Spacing scale for padding, margin, gap, width, height |
| `--radius-*` | `rounded-sm`, `rounded-lg`, `rounded-full` |
| `--shadow-*` | `shadow-sm`, `shadow-md`, `shadow-lg` |
| `--ease-*` | Transition timing functions (`ease-in`, `ease-out`) |
| `--animate-*` | `animate-spin`, `animate-pulse` (can bundle `@keyframes`) |
| `--blur-*` | `blur-sm`, `blur-md` (filter blur) |
| `--container-*` | Container scale used by `max-w-*`, `w-*` |
| `--aspect-*` | `aspect-video`, `aspect-square` |
| `--inset-*` | `inset-*`, `top-*`, `right-*`, `bottom-*`, `left-*` (spacing scale) |
| `--grid-template-columns-*` | `grid-cols-*`, `grid-cols-12` |
| `--perspective-*` | `perspective-distant`, `perspective-[1000px]` |
| `--default-*` | `default-transition-duration`, `default-transition-timing-function` |

Each `--color-*` token automatically powers every color utility: `bg-*`, `text-*`, `border-*`, `ring-*`, `outline-*`, `fill-*`, `stroke-*`, `caret-*`, `accent-*`, `decoration-*`, `divide-*`, `placeholder-*`, gradient stops, and shadows.

## Colors

Source: [Colors](https://tailwindcss.com/docs/colors).

The default theme provides **26 color families** (each with shades 50–950) plus `black` and `white`: red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, slate, gray, zinc, neutral, stone, mauve, olive, mist, and taupe (the last four added in v4.2). Values are defined in OKLCH.

```html
<div class="bg-sky-500">Sky 500</div>
<div class="text-slate-900">Dark slate text</div>
<div class="bg-mauve-200">v4.2 family</div>
<div class="bg-black text-white">Black & white</div>
```

### Custom colors

Add brand colors with `--color-*` tokens:

```css
@theme {
  --color-brand-50: oklch(0.97 0.01 250);
  --color-brand-500: oklch(0.62 0.21 259.8);
}
```

```html
<div class="bg-brand-500 text-brand-50">Brand</div>
```

### Opacity modifiers

Every color accepts an opacity modifier using native `color-mix()`:

```html
<div class="bg-sky-500/50">50% opacity</div>
<div class="bg-brand-500/25">25% opacity</div>
```

### Arbitrary colors

Use any CSS color inline:

```html
<div class="bg-[#1da1f2]">Hex</div>
<div class="text-(--my-color)">CSS variable</div>
```

## Extending the Default Theme

Add new theme variables to extend the default theme:

```css
@import "tailwindcss";

@theme {
  /* Add new color */
  --color-brand-500: oklch(0.65 0.2 250);

  /* Add new breakpoint */
  --breakpoint-3xl: 120rem;

  /* Add new font */
  --font-display: "Satoshi", "sans-serif";
}
```

## @theme Options

### `@theme inline`

Reference other theme variables by value. Use when a token reuses another variable so utilities emit the resolved value instead of a nested `var()`:

```css
@theme inline {
  --color-primary: var(--color-brand-500);
  --color-primary-foreground: var(--color-white);
}
```

### `@theme static`

Emit ALL theme variables in the output CSS, even unused ones (by default only used variables are emitted):

```css
@theme static {
  --color-primary: var(--color-red-500);
}
```

### `--*: initial`

Replace the entire default theme with only your tokens (100% custom design system):

```css
@theme {
  --*: initial;
  --color-lagoon: oklch(0.72 0.11 221.19);
  --color-dusk: oklch(0.82 0.15 72.09);
}
```

### `@theme` without `default`

Import a theme from another CSS file while keeping the default theme intact:

```css
@theme {
  /* customization */
}
```

## Using Theme Variables

Tailwind generates CSS variables for your theme variables, so you can reference them:

```html
<!-- Use utility classes -->
<div class="bg-brand-500 text-display">Content</div>

<!-- Reference CSS variables directly -->
<div style="background-color: var(--color-brand-500)">
  Content
</div>
```

## Default Theme

When you import `tailwindcss`, it includes default theme variables:

```css
@layer theme, base, components, utilities;

@import "./theme.css" layer(theme);
@import "./preflight.css" layer(base);
@import "./utilities.css" layer(utilities);
```

The default theme includes:
- Color palette (26 families, 50-950 shades) plus black and white
- Font families (sans, serif, mono)
- Spacing scale
- Shadows
- Breakpoints (sm, md, lg, xl, 2xl)

## Key Points

- Theme variables define which utilities exist in your project
- Use `@theme` directive to define design tokens
- Variables must be defined top-level, not nested
- Tailwind generates both utilities and CSS variables
- Use `@theme inline` for tokens that reference other variables, `@theme static` to always emit, `--*: initial` for a fully custom theme
- Default theme provides a solid starting point

<!--
Source references:
- https://tailwindcss.com/docs/theme
- https://tailwindcss.com/docs/colors
-->