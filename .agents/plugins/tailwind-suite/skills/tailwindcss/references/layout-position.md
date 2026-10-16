---
name: layout-position
description: Controlling element positioning with static, relative, absolute, fixed, and sticky utilities
---

# Position

Utilities for controlling how an element is positioned in the document.

## Usage

### Static positioning

Use `static` to position an element according to the normal flow. Offsets are ignored and it won't act as a position reference for absolutely positioned children:

```html
<div class="static">
  <p>Static parent</p>
  <div class="absolute bottom-0 left-0">
    <p>Absolute child</p>
  </div>
</div>
```

### Relative positioning

Use `relative` to position an element in normal flow. Offsets are calculated relative to the element's normal position, and it acts as a position reference for absolutely positioned children:

```html
<div class="relative">
  <p>Relative parent</p>
  <div class="absolute bottom-0 left-0">
    <p>Absolute child</p>
  </div>
</div>
```

### Absolute positioning

Use `absolute` to position an element outside the normal flow. Neighboring elements act as if it doesn't exist. Offsets are calculated relative to the nearest positioned parent:

```html
<div class="relative">
  <div class="absolute top-0 right-0">
    <p>Absolute child</p>
  </div>
</div>
```

### Fixed positioning

Use `fixed` to position an element relative to the browser window. Offsets are calculated relative to the viewport:

```html
<div class="fixed top-0 right-0 left-0">
  <p>Fixed header</p>
</div>
```

### Sticky positioning

Use `sticky` to position an element as `relative` until it crosses a threshold, then treat it as `fixed` until its parent is off screen:

```html
<div>
  <div class="sticky top-0">
    <p>Sticky header</p>
  </div>
  <div>Content...</div>
</div>
```

## Float

Push an element to one side so content wraps around it:

```html
<img class="float-left mr-4 rounded" src="..." />
<img class="float-right ml-4 rounded" src="..." />
<div class="float-none">Normal flow</div>
```

## Clear

Place an element below floating elements instead of beside them:

```html
<div class="float-left">Floated</div>
<div class="clear-left">Clears left floats</div>
<div class="clear-right">Clears right floats</div>
<div class="clear-both">Clears both sides</div>
<div class="clear-none">No clearing</div>
```

## Isolation

Create a new stacking context to isolate z-index conflicts:

```html
<div class="isolate">New stacking context</div>
<div class="isolation-auto">Default</div>
```

`isolate` is useful when a child's `z-index` would otherwise escape a parent that can't be positioned.

## Key Points

- `static` is the default - elements flow normally
- `relative` maintains normal flow but allows offsets and becomes a positioning context
- `absolute` removes from flow and positions relative to nearest positioned ancestor
- `fixed` positions relative to viewport, stays in place when scrolling
- `sticky` combines relative and fixed behavior based on scroll position
- Always use with offset utilities like `top-0`, `right-0`, `inset-0`, etc.
- `float-left`/`float-right`/`float-none`, `clear-*`, `isolate`/`isolation-auto` for flow control

<!--
Source references:
- https://tailwindcss.com/docs/position
- https://tailwindcss.com/docs/float
- https://tailwindcss.com/docs/clear
- https://tailwindcss.com/docs/isolation
-->
