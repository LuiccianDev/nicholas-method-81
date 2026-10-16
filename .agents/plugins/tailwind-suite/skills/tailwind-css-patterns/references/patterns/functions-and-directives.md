---
name: functions-and-directives
description: CSS-first directives (@import, @theme, @utility, @variant, @custom-variant, @apply, @reference, @plugin) and build-time functions (--alpha, --spacing) in Tailwind v4
---

# Functions and Directives

In Tailwind CSS **v4** all configuration lives in CSS. Directives are Tailwind-specific at-rules; functions are build-time helpers evaluated while generating your stylesheet.

Source: [Functions and directives](https://tailwindcss.com/docs/functions-and-directives).

## Directives

### @import

Import your CSS, including Tailwind itself:

```css
@import "tailwindcss";
```

### @theme

Define design tokens. Every variable you add becomes a utility, a variant, or both:

```css
@theme {
  --color-brand-500: oklch(0.65 0.2 250);
  --font-display: "Satoshi", "sans-serif";
  --breakpoint-3xl: 120rem;
  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
  --animate-wiggle: wiggle 1s ease-in-out infinite;
}
```

Options:

- `@theme inline` — resolve referenced variables by value instead of `var()` references (for tokens that reuse other theme variables)
- `@theme static` — always emit all variables in the output (overrides variable tree-shaking)
- `--*: initial` — replace the entire default theme; only your tokens are generated
- Default behavior keeps the built-in theme and adds/overrides your tokens

Namespaces map to utilities: `--color-*` → `bg-*`/`text-*`/`border-*`, `--font-*` → `font-*`, `--radius-*` → `rounded-*`, `--spacing-*` → spacing utilities, `--animate-*` → `animate-*`, `--breakpoint-*` → responsive variants.

### @source

Add files outside the conventional roots to class detection:

```css
@import "tailwindcss";
@source "../node_modules/@my-company/ui-lib";
```

Use `@source inline("...")` for an exact string of classes:

```css
@source inline("bg-red-500 text-white");
```

### @utility

Register custom utilities that support variants and nesting:

```css
@utility tab-4 {
  tab-size: 4;
}
```

```html
<div class="tab-4 hover:tab-8">Content</div>
```

Functional utilities use `--value()` and `--modifier()` to accept theme values and modifiers:

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

Apply a Tailwind variant to plain CSS:

```css
.my-element {
  background: white;

  @variant dark {
    background: black;
  }
}
```

### @custom-variant

Define a custom variant (like the class-based `dark`):

```css
@custom-variant dark (&:where(.dark, .dark *));
```

```html
<div class="bg-white dark:bg-gray-900">...</div>
```

### @apply

Inline utility classes into custom CSS:

```css
.card {
  @apply rounded-lg border border-gray-200 p-4 shadow-sm;
}
```

To use `@apply` in a separate file that does not import Tailwind, add `@reference` first. Otherwise utilities from that file will not be found.

### @reference

Import a stylesheet only to use its classes (no styles are emitted). Useful for Vue/Svelte `<style>` blocks:

```html
<style>
  @reference "../../app.css";

  h1 {
    @apply text-2xl font-bold;
  }
</style>
```

You can reference Tailwind directly:

```html
<style>
  @reference "tailwindcss";

  h1 {
    @apply text-2xl font-bold;
  }
</style>
```

Subpath imports (like TS path aliases) work too:

```css
@reference "#app.css";
```

### @plugin

Load a JavaScript plugin (v4 CSS-first replacement for `plugins` in config):

```css
@plugin "@tailwindcss/typography";
@plugin "./my-plugin.js";
```

## Functions

### --alpha()

Mix a color with transparency at build time:

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

Generate values from the spacing scale:

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

Use it inside arbitrary values with `calc()`:

```html
<div class="py-[calc(--spacing(4)-1px)]">Content</div>
```

## Key Points

- All configuration lives in CSS: no `tailwind.config.js`, no `theme()` function
- `@theme` tokens generate utilities and variants automatically
- `@utility` + `--value()`/`--modifier()` build functional utilities that work with variants
- `@custom-variant` is the way to add variants like a class-based `dark`
- `@apply` requires `@reference` in files that do not import Tailwind
- `@plugin` loads third-party JS plugins
- `--alpha()` and `--spacing()` are evaluated at build time

## Source References

- https://tailwindcss.com/docs/functions-and-directives
- https://tailwindcss.com/docs/theme
- https://tailwindcss.com/docs/adding-custom-styles
- https://tailwindcss.com/docs/detecting-classes-in-source-files
- https://tailwindcss.com/docs/dark-mode