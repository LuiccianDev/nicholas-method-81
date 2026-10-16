---
name: layout-width
description: Setting element width with spacing scale, fractions, container sizes, and viewport units
---

# Width

Utilities for setting the width of an element.

## Usage

### Spacing scale

Use `w-<number>` utilities based on the spacing scale:

```html
<div class="w-24">w-24</div>
<div class="w-48">w-48</div>
<div class="w-64">w-64</div>
```

### Percentage widths

Use `w-full` or `w-<fraction>` for percentage-based widths:

```html
<div class="flex">
  <div class="w-1/2">50%</div>
  <div class="w-1/2">50%</div>
</div>
<div class="flex">
  <div class="w-2/5">40%</div>
  <div class="w-3/5">60%</div>
</div>
<div class="w-full">100%</div>
```

### Container scale

Use container size utilities like `w-sm`, `w-md`, `w-lg`:

```html
<div class="w-sm">Small container</div>
<div class="w-md">Medium container</div>
<div class="w-xl">Extra large container</div>
```

### Viewport units

Use `w-screen` for full viewport width, or dynamic viewport units:

```html
<div class="w-screen">Full viewport width</div>
<div class="w-dvw">Dynamic viewport width</div>
<div class="w-svw">Small viewport width</div>
<div class="w-lvw">Large viewport width</div>
```

### Content-based widths

Use `w-auto`, `w-fit`, `w-min`, `w-max` for content-based sizing:

```html
<div class="w-auto">Auto width</div>
<div class="w-fit">Fit content</div>
<div class="w-min">Min content</div>
<div class="w-max">Max content</div>
```

### Size utility

Use `size-<number>` to set both width and height:

```html
<div class="size-16">16x16</div>
<div class="size-24">24x24</div>
<div class="size-full">100% x 100%</div>
```

### Logical sizing (writing-mode aware)

Use `inline-*` (inline-size) and `block-*` (block-size) for flow-relative sizing. In horizontal writing they equal width/height and flip automatically in vertical writing modes or RTL contexts:

```html
<div class="inline-64">inline-size (width in LTR)</div>
<div class="block-48">block-size (height in LTR)</div>
<div class="inline-full">100% of inline axis</div>
<div class="inline-[300px]">Arbitrary inline size</div>
```

These accept the same scales as `w-*`/`h-*`: spacing numbers, fractions, container sizes, viewport units, and arbitrary values. `min-inline-*`, `max-inline-*`, `min-block-*`, `max-block-*` (see layout-min-max-sizing).

### Custom values

Use arbitrary values for custom widths:

```html
<div class="w-[117px]">Custom pixel width</div>
<div class="w-[50%]">Custom percentage</div>
<div class="w-[calc(100%-2rem)]">Custom calculation</div>
```

## Key Points

- Spacing scale: `w-0` through `w-96` (and beyond)
- Fractions: `w-1/2`, `w-1/3`, `w-2/3`, `w-1/4`, `w-3/4`, `w-1/5`, `w-4/5`, `w-1/6`, `w-5/6`
- Container sizes: `w-3xs`, `w-2xs`, `w-xs`, `w-sm`, `w-md`, `w-lg`, `w-xl`, `w-2xl`, `w-3xl`, `w-4xl`, `w-5xl`, `w-6xl`, `w-7xl`
- Viewport units: `w-screen` (100vw), `w-dvw`, `w-svw`, `w-lvw`
- `size-*` utilities set both width and height simultaneously
- Use `w-auto` to reset width at specific breakpoints

<!--
Source references:
- https://tailwindcss.com/docs/width
-->
