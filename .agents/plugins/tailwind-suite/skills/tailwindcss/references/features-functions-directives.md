---
name: features-functions-directives
description: Tailwind's CSS directives (@import, @theme, @utility, @variant) and functions (--alpha, --spacing)
---

# Functions and Directives

Tailwind provides custom CSS directives and functions for working with your design system.

## Directives

Directives are custom Tailwind-specific at-rules that offer special functionality.

### @import

Import CSS files, including Tailwind:

```css
@import "tailwindcss";
```

### @theme

Define your project's design tokens:

```css
@theme {
  --font-display: "Satoshi", "sans-serif";
  --breakpoint-3xl: 120rem;
  --color-brand-500: oklch(0.65 0.2 250);
  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
}
```

**Options:**

- `@theme inline` - resolve referenced variables by value (for tokens that reuse other variables)
- `@theme static` - always emit ALL variables in the output CSS
- `--*: initial` - replace the entire default theme with only your tokens
- `@theme` without `default` - keep the default theme and add/override tokens

### @source

Explicitly specify source files for class detection:

```css
@import "tailwindcss";
@source "../node_modules/@my-company/ui-lib";
```

### @utility

Add custom utilities:

```css
@utility tab-4 {
  tab-size: 4;
}
```

Custom utilities work with variants:

```html
<div class="tab-4 hover:tab-8">Content</div>
```

Functional utilities accept theme values and modifiers with `--value()` and `--modifier()`:

```css
@utility tab-* {
  tab-size: --value(--tab-*, [length]);
}

@utility text-* {
  font-size: --value(--text-*, [length]);
  line-height: --modifier(--leading-*, [length], [*]);
}
```

```html
<div class="text-2xl/loose">Theme value + modifier</div>
```

### @variant

Apply Tailwind variants to styles in your CSS:

```css
.my-element {
  background: white;
  
  @variant dark {
    background: black;
  }
}
```

### @custom-variant

Add custom variants:

```css
@custom-variant theme-midnight (&:where([data-theme="midnight"] *));
```

```html
<div class="theme-midnight:bg-black">Content</div>
```

### @apply

Inline existing utility classes into custom CSS:

```css
.select2-dropdown {
  @apply rounded-b-lg shadow-md;
}

.select2-search {
  @apply rounded border border-gray-300;
}
```

### @reference

Import stylesheet for reference without including styles (useful for Vue/Svelte components):

```html
<style>
  @reference "../../app.css";
  
  h1 {
    @apply text-2xl font-bold text-red-500;
  }
</style>
```

Or reference Tailwind directly:

```html
<style>
  @reference "tailwindcss";
  
  h1 {
    @apply text-2xl font-bold;
  }
</style>
```

### Subpath Imports

Directives support subpath imports (like TypeScript path aliases):

```json
{
  "imports": {
    "#app.css": "./src/css/app.css"
  }
}
```

```html
<style>
  @reference "#app.css";
  
  h1 {
    @apply text-2xl font-bold;
  }
</style>
```

## Functions

Tailwind provides build-time functions for working with colors and spacing.

### --alpha()

Adjust the opacity of a color:

```css
.my-element {
  color: --alpha(var(--color-lime-300) / 50%);
}
```

Compiles to:

```css
.my-element {
  color: color-mix(in oklab, var(--color-lime-300) 50%, transparent);
}
```

### --spacing()

Generate spacing values based on your theme:

```css
.my-element {
  margin: --spacing(4);
}
```

Compiles to:

```css
.my-element {
  margin: calc(var(--spacing) * 4);
}
```

Useful in arbitrary values with `calc()`:

```html
<div class="py-[calc(--spacing(4)-1px)]">
  Content
</div>
```

## JavaScript Plugins

### @plugin

Load third-party JavaScript plugins:

```css
@plugin "@tailwindcss/typography";
@plugin "./my-plugin.js";
```

## Key Points

- Directives are Tailwind-specific at-rules
- `@theme` defines design tokens (with `inline`/`static`/`--*: initial` options)
- `@utility` creates custom utilities, including functional ones with `--value`/`--modifier`
- `@custom-variant` creates custom variants
- `@apply` inlines utilities into CSS
- `@plugin` loads JavaScript plugins
- `--alpha()` and `--spacing()` are build-time functions

<!--
Source references:
- https://tailwindcss.com/docs/functions-and-directives
-->
