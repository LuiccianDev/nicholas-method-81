---
name: layout-padding
description: Controlling element padding with spacing scale, logical properties, and directional utilities
---

# Padding

Utilities for controlling an element's padding.

## Usage

### All sides

Use `p-<number>` to set padding on all sides:

```html
<div class="p-4">Padding on all sides</div>
<div class="p-8">Larger padding</div>
```

### Individual sides

Use `pt-<number>`, `pr-<number>`, `pb-<number>`, `pl-<number>`:

```html
<div class="pt-6">Top padding</div>
<div class="pr-4">Right padding</div>
<div class="pb-8">Bottom padding</div>
<div class="pl-2">Left padding</div>
```

### Horizontal and vertical

Use `px-<number>` for horizontal, `py-<number>` for vertical:

```html
<div class="px-8">Horizontal padding</div>
<div class="py-8">Vertical padding</div>
```

### Logical properties

Use `ps-<number>` (padding-inline-start), `pe-<number>` (padding-inline-end), `pbs-<number>` (padding-block-start), and `pbe-<number>` (padding-block-end) for RTL and writing-mode support:

```html
<div dir="ltr">
  <div class="ps-8">Left padding in LTR</div>
  <div class="pe-8">Right padding in LTR</div>
</div>
<div dir="rtl">
  <div class="ps-8">Right padding in RTL</div>
  <div class="pe-8">Left padding in RTL</div>
</div>

<div class="pbs-8">Block start (top in horizontal writing)</div>
<div class="pbe-8">Block end (bottom in horizontal writing)</div>
```

### Custom values

Use arbitrary values for custom padding:

```html
<div class="p-[5px]">Custom padding</div>
<div class="px-[calc(50%-1rem)]">Custom calculation</div>
```

## Key Points

- Spacing scale: `p-0` through `p-96` (and beyond)
- Individual: `pt-*`, `pr-*`, `pb-*`, `pl-*` for specific sides
- Axes: `px-*` (horizontal), `py-*` (vertical)
- Logical: `ps-*`/`pe-*` (inline start/end), `pbs-*`/`pbe-*` (block start/end)
- No negative padding - padding cannot be negative in CSS
- Common patterns: `p-4`, `px-6`, `py-8`, `pt-2`, `pb-4`

<!--
Source references:
- https://tailwindcss.com/docs/padding
-->
