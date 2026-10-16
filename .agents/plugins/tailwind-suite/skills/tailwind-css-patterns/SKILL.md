---
name: tailwind-css-patterns
description: Comprehensive Tailwind CSS v4 styling — utility-first patterns (responsive, layout, flexbox, grid, spacing, typography, colors), scalable design systems and component libraries (CVA, React 19), and @theme/palette generation from user-provided color palettes (Color Hunt, Coolors, Radix). Use when styling React/Vue/Svelte components, building responsive layouts, implementing design systems, standardizing UI patterns, or mapping colors to Tailwind v4 @theme tokens. Prioritizes official v4 syntax (--color-* prefix, never --text-* for colors, CSS-first configuration).
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Tailwind CSS Patterns, Design Systems & Themes

Expert guide for building modern, responsive user interfaces with Tailwind CSS **v4.3**. CSS-first configuration (`@theme`, `@utility`, `@custom-variant`), automatic content detection, built-in tree-shaking, and correct `@theme` variable creation. Merges the former `tailwind-css-patterns`, `tailwind-design-system`, and `tailwind-palette-theme` skills.

## Overview

Tailwind works by [scanning source files for class names](https://tailwindcss.com/docs/detecting-classes-in-source-files) and generating only the CSS that is used — content detection is automatic, no `content` config needed. This skill covers three areas:

1. **Patterns** — responsive, accessible UI patterns and utility composition.
2. **Design Systems** — design tokens, component libraries (CVA, React 19), advanced CSS.
3. **Palette Theme** — generating a correct `@theme` block from a user-provided color palette.

## When to Use

- Styling React/Vue/Svelte components
- Building responsive layouts and grids
- Implementing design systems and component libraries
- Standardizing UI patterns across a codebase
- Mapping a color palette (Color Hunt, Coolors, Radix) to `@theme` tokens
- Adding dark mode support
- Optimizing CSS workflow

## Quick Reference

### Responsive Breakpoints

Source: [Responsive design](https://tailwindcss.com/docs/responsive-design).

Default breakpoints are defined in rem (16px base). The strategy is **mobile-first**: write base utilities unprefixed and add `sm:`/`md:`/... prefixes for larger screens.

| Prefix | Min Width | px (at 16px) |
|--------|-----------|-------------|
| `sm:` | 40rem | 640px |
| `md:` | 48rem | 768px |
| `lg:` | 64rem | 1024px |
| `xl:` | 80rem | 1280px |
| `2xl:` | 96rem | 1536px |

Customize breakpoints in `@theme` with `--breakpoint-*` (e.g. `--breakpoint-3xl: 120rem`), and combine them with ranges (`max-sm:*`) and container queries (`@sm:*`).

### Common Patterns

```html
<!-- Center content -->
<div class="flex items-center justify-center min-h-screen">
  Content
</div>

<!-- Responsive grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- Items -->
</div>

<!-- Card component -->
<div class="bg-white rounded-lg shadow-lg p-6">
  <h3 class="text-xl font-bold">Title</h3>
  <p class="text-gray-600">Description</p>
</div>
```

## Instructions

Source: [Styling with utility classes](https://tailwindcss.com/docs/styling-with-utility-classes).

1. **Start Mobile-First**: Write base styles for mobile, add responsive prefixes (`sm:`, `md:`, `lg:`) for larger screens
2. **Use Design Tokens**: Define tokens in CSS with `@theme` (colors `--color-*`, fonts `--font-*`, radii `--radius-*`, animations `--animate-*`) and use them via utilities (`bg-primary`, `font-mono`, `rounded-lg`)
3. **Compose Utilities**: Combine multiple utilities for complex styles
4. **Extract Components**: Create reusable component classes with `@utility` (or React/Vue/Svelte components) for repeated patterns
5. **Configure in CSS**: All configuration lives in CSS (`@theme`, `@custom-variant`, `@utility`, `@source`)
6. **Verify Changes**: Test at each breakpoint using DevTools responsive mode. Check for visual regressions and accessibility issues before committing

## Examples

### Responsive Card Component

```tsx
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden sm:flex">
      <img className="h-48 w-full object-cover sm:h-auto sm:w-48" src={product.image} />
      <div className="p-6">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
```

### Dark Mode Toggle

The `dark` variant is defined once in CSS:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <h1 class="dark:text-white">Title</h1>
</div>
```

For custom tokens, define the light values in `@theme` and override the variables in `.dark`:

```css
.dark {
  color-scheme: dark;
  --color-background: #0a0104;
  --color-text: #ffecc0;
}
```

Source: [Dark mode](https://tailwindcss.com/docs/dark-mode).

### Form Input

```html
<input
  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  placeholder="you@example.com"
/>
```

## Best Practices

Source: [Styling with utility classes](https://tailwindcss.com/docs/styling-with-utility-classes) and [Detecting classes in source files](https://tailwindcss.com/docs/detecting-classes-in-source-files).

1. **Consistent Spacing**: Use Tailwind's spacing scale (4, 8, 12, 16, etc. — `--spacing` multiplier)
2. **Use Complete Class Names**: Never build classes with dynamic interpolation (`bg-${color}`); write the full class so the scanner detects it. Use `@source inline()` only for justified cases
3. **Component Extraction**: Extract repeated patterns into reusable components or `@utility`
4. **Utility Composition**: Prefer utility classes over `@apply` to keep the HTML as the single source of truth
5. **Semantic HTML**: Use proper HTML elements with Tailwind classes
6. **Content Detection**: v4 scans your project automatically; use `@source` only for non-conventional roots (e.g. a UI package outside `src/`)
7. **Accessibility**: Include focus styles, ARIA labels, and respect user preferences (reduced-motion)

## Troubleshooting

### Classes Not Applying
- **Verify the file is being scanned**: v4 detects content automatically; for non-conventional roots add `@source "../path"` in your CSS
- **Use complete class names**: classes built with concatenation (`bg-${color}`) are not detected
- **Rebuild**: in development the dev server (Vite) hot-recompiles; in the CLI use `npx @tailwindcss/cli -i ./src/input.css -o ./dist/output.css --watch`

### Responsive Styles Not Working
- **Order matters**: Responsive prefixes must come before non-responsive (e.g., `md:flex` not `flex md:flex`)
- **Check breakpoint values**: Breakpoints are measured in rem (40/48/64/80/96rem); check that your `--breakpoint-*` do not collide
- **DevTools**: Use browser DevTools responsive mode to test at each breakpoint

### Dark Mode Issues
- **Verify the variant**: make sure `@custom-variant dark (&:where(.dark, .dark *));` is in your CSS
- **Toggle implementation**: Use `document.documentElement.classList.toggle('dark')` and persist in `localStorage`; alternatively use a `dark` variant based on `@media (prefers-color-scheme: dark)` if you don't need a manual toggle
- **Initial flash**: Add the `dark` class to `<html>` before the body renders

## Constraints and Warnings

- **Class Proliferation**: Long class strings reduce readability; extract into components or `@utility`
- **Dynamic Class Names**: Dynamically generated classes are lost in production (the scanner only sees complete strings)
- **Arbitrary Values**: Use sparingly; prefer design tokens (`@theme`) for consistency
- **Specificity Issues**: Avoid `@apply` with complex selectors; use `@utility` for custom utilities
- **Dark Mode**: Requires `@custom-variant dark` (or `@media`) configured in CSS
- **`!important`**: Avoid it in Tailwind projects; win conflicts with cascade order, specificity, or `@utility` (unlayered in v4)

## Areas & References

### Patterns (`references/patterns/`)

- **[layout-patterns.md](references/patterns/layout-patterns.md)** — Flexbox, grid, spacing, typography, colors
- **[component-patterns.md](references/patterns/component-patterns.md)** — Cards, navigation, forms, modals, React patterns
- **[responsive-design.md](references/patterns/responsive-design.md)** — Responsive patterns, dark mode, container queries
- **[animations.md](references/patterns/animations.md)** — Transitions, transforms, built-in animations, motion preferences
- **[performance.md](references/patterns/performance.md)** — Bundle optimization, CSS optimization, production builds
- **[accessibility.md](references/patterns/accessibility.md)** — Focus management, screen readers, color contrast, ARIA
- **[configuration.md](references/patterns/configuration.md)** — CSS-first config, plugins, shared theme.css
- **[functions-and-directives.md](references/patterns/functions-and-directives.md)** — @theme, @utility, @variant, @custom-variant, @apply, @reference, @plugin, --alpha(), --spacing()
- **[reference.md](references/patterns/reference.md)** — Additional reference materials

### Design Systems (`references/design-system/`)

- **[quick-start.md](references/design-system/quick-start.md)** — Design tokens, token hierarchy, base styles, dark mode overrides
- **[details.md](references/design-system/details.md)** — CVA components, compound components (React 19), forms, grid system, utility functions
- **[advanced-patterns.md](references/design-system/advanced-patterns.md)** — Native CSS animations, dark mode provider, custom `@utility`, theme modifiers, namespace overrides, best practices

### Palette Theme (`references/palette-theme/`)

- **[generate-theme.md](references/palette-theme/generate-theme.md)** — Generate a correct `@theme` block from a color palette: namespaces, naming/value rules, role mapping, dark mode, WCAG contrast, theme reuse

## External Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs) (v4.3)
- [Official repo tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss)
- [Tailwind Play](https://play.tailwindcss.com)