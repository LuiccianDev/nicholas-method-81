---
name: effects-scroll-snap
description: CSS scroll snap for carousels and scroll containers
---

# Scroll Snap

Utilities for scroll snap behavior in overflow containers. Use for carousels, horizontal galleries, or paged scroll.

## Usage

### Container

```html
<!-- Horizontal snap (carousel) -->
<div class="snap-x snap-mandatory overflow-x-auto flex gap-4">
  <div class="snap-center shrink-0 w-80">Slide 1</div>
  <div class="snap-center shrink-0 w-80">Slide 2</div>
  <div class="snap-center shrink-0 w-80">Slide 3</div>
</div>

<!-- Vertical snap -->
<div class="snap-y snap-mandatory overflow-y-auto h-screen">
  <div class="snap-start h-screen">Section 1</div>
  <div class="snap-start h-screen">Section 2</div>
</div>

<!-- Both axes -->
<div class="snap-both overflow-auto">...</div>
```

### Strictness

- `snap-mandatory` - always rest on a snap point
- `snap-proximity` - snap only when close to a point (default)

### Child alignment

```html
<div class="snap-x overflow-x-auto">
  <div class="snap-center">Center snap</div>
  <div class="snap-start">Start snap</div>
  <div class="snap-end">End snap</div>
  <div class="snap-align-none">No snap</div>
</div>
```

### Snap stop

Force stopping at every snap point instead of skipping:

```html
<div class="snap-x snap-mandatory overflow-x-auto">
  <div class="snap-start snap-stop">Stops at every item</div>
  <div class="snap-start snap-normal">May skip ahead (default)</div>
</div>
```

`snap-stop` prevents the scroll from jumping past snap points (pairs well with `snap-mandatory` for carousels).

## Scroll Margin & Padding

Control the offset applied around snap targets (scroll-margin) or inside the scroll container (scroll-padding):

```html
<div class="scroll-p-6 snap-y overflow-y-auto">
  <div class="snap-start scroll-mt-24">Sticky-header offset</div>
</div>
```

- `scroll-m-*`, `scroll-mt-*`, `scroll-mr-*`, `scroll-mb-*`, `scroll-ml-*`, `scroll-mx-*`, `scroll-my-*` - scroll-margin (spacing scale)
- `scroll-p-*`, `scroll-pt-*`, `scroll-pr-*`, `scroll-pb-*`, `scroll-pl-*`, `scroll-px-*`, `scroll-py-*` - scroll-padding (spacing scale)

Commonly used with sticky headers: `scroll-mt-*` keeps snap targets clear of fixed elements.

## Key Points

- `snap-x` - horizontal; `snap-y` - vertical; `snap-both` - both; `snap-none` - disable
- `snap-mandatory` / `snap-proximity` - strictness
- Child: `snap-center`, `snap-start`, `snap-end`, `snap-align-none`
- `snap-stop` forces a stop at every snap point
- `scroll-m-*`/`scroll-p-*` adjust the offset for snap targets and containers
- Requires overflow (e.g. `overflow-x-auto`) and scroll on container

<!--
Source references:
- https://tailwindcss.com/docs/scroll-snap-type
- https://tailwindcss.com/docs/scroll-snap-align
- https://tailwindcss.com/docs/scroll-snap-stop
- https://tailwindcss.com/docs/scroll-margin
- https://tailwindcss.com/docs/scroll-padding
-->
