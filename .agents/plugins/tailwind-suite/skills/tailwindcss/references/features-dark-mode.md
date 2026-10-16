---
name: features-dark-mode
description: Implementing dark mode with Tailwind's dark variant and custom dark mode strategies
---

# Dark Mode

Tailwind includes a `dark` variant that lets you style your site differently when dark mode is enabled.

## Overview

Use the `dark:` variant to apply styles in dark mode:

```html
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Content
</div>
```

## Default Behavior

By default, the `dark` variant uses the `prefers-color-scheme` CSS media feature:

```css
@media (prefers-color-scheme: dark) {
  .dark\:bg-gray-800 {
    background-color: oklch(0.278 0.033 256.848);
  }
}
```

## Light Mode Variant

v4 also ships a `light:` variant that matches when light mode is active, regardless of the strategy:

```html
<div class="bg-gray-800 light:bg-white dark:bg-black">Content</div>
```

The `light:` variant flips the semantics of the configured `dark` variant: with class-based dark mode it applies when the `dark` class is absent; with `prefers-color-scheme` it applies on the light media query.

## Manual Toggle with Class

Override the `dark` variant to use a class selector:

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));
```

Now dark mode utilities apply when the `dark` class is present:

```html
<html class="dark">
  <body>
    <div class="bg-white dark:bg-black">Content</div>
  </body>
</html>
```

## Manual Toggle with Data Attribute

Use a data attribute instead:

```css
@import "tailwindcss";

@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

```html
<html data-theme="dark">
  <body>
    <div class="bg-white dark:bg-black">Content</div>
  </body>
</html>
```

## Three-Way Theme Toggle

Support light mode, dark mode, and system preference:

```js
// On page load
document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
    (!("theme" in localStorage) && 
     window.matchMedia("(prefers-color-scheme: dark)").matches)
);

// Set light mode
localStorage.theme = "light";
document.documentElement.classList.remove("dark");

// Set dark mode
localStorage.theme = "dark";
document.documentElement.classList.add("dark");

// Respect system preference
localStorage.removeItem("theme");
document.documentElement.classList.toggle(
  "dark",
  window.matchMedia("(prefers-color-scheme: dark)").matches
);
```

## Common Patterns

### Cards

```html
<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-none">
  <h2 class="text-gray-900 dark:text-white">Title</h2>
  <p class="text-gray-500 dark:text-gray-400">Description</p>
</div>
```

### Borders

```html
<div class="border border-gray-200 dark:border-gray-700">
  Content
</div>
```

### Buttons

```html
<button class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
  Button
</button>
```

## Key Points

- Use `dark:` variant for dark mode styles
- Default uses `prefers-color-scheme` media query
- Override with `@custom-variant` for manual toggles
- Can use class or data attribute selectors
- Combine with responsive variants: `dark:md:bg-gray-800`

<!--
Source references:
- https://tailwindcss.com/docs/dark-mode
-->
