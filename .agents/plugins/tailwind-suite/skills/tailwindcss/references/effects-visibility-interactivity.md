---
name: effects-visibility-interactivity
description: Visibility, cursor, pointer-events, user-select, and z-index
---

# Visibility & Interactivity

Utilities for visibility, cursor, pointer-events, user-select, and stacking.

## Usage

### Visibility

```html
<div class="visible">Visible (default)</div>
<div class="invisible">Hidden but in layout</div>
<div class="collapse">Table collapse</div>
```

Use `invisible` when you need to keep layout space; use `hidden` (display:none) to remove from flow.

### Cursor

```html
<button class="cursor-pointer">Pointer</button>
<div class="cursor-not-allowed">Disabled</div>
<div class="cursor-wait">Loading</div>
<div class="cursor-move">Draggable</div>
<div class="cursor-grab">Grab</div>
<div class="cursor-grabbing">Grabbing</div>
<div class="cursor-text">Text select</div>
<div class="cursor-default">Default</div>
<div class="cursor-none">No cursor</div>
```

### Pointer events

```html
<div class="pointer-events-none">Ignore all pointer events</div>
<div class="pointer-events-auto">Default behavior</div>
```

Useful for overlays: make overlay `pointer-events-none` so clicks pass through, or `pointer-events-none` on disabled elements.

### User select

```html
<p class="select-none">Cannot select</p>
<p class="select-text">Select text (default)</p>
<p class="select-all">Select all on click</p>
<p class="select-auto">Browser default</p>
```

### Z-index

```html
<div class="z-0">0</div>
<div class="z-10">10</div>
<div class="z-20">20</div>
<div class="z-50">50</div>
<div class="z-auto">Auto</div>
<div class="z-[100]">Arbitrary</div>
```

Common: `z-0` (base), `z-10` (dropdowns), `z-20` (fixed nav), `z-50` (modal), `z-40` (overlay).

### Color scheme

Let native controls (scrollbars, inputs, form widgets) follow light or dark:

```html
<html class="color-scheme-light">...</html>
<html class="color-scheme-dark">...</html>
<html class="color-scheme-normal">...</html>
```

### Scroll behavior

```html
<div class="scroll-auto">Instant scroll (default)</div>
<div class="scroll-smooth">Smooth scrolling</div>
```

### Scrollbar styling (v4.3)

Style the scrollbar color, width, and gutter space:

```html
<div class="scrollbar-color-red-500">Red scrollbar thumb/track</div>
<div class="scrollbar-thin">Thin scrollbar</div>
<div class="scrollbar-none">Hide scrollbar (still scrollable)</div>
<div class="scrollbar-gutter-stable">Reserve space for scrollbar</div>
```

- `scrollbar-color-*` - `scrollbar-color` (theme colors or arbitrary); requires Firefox support or `scrollbar-thin`/custom styling
- `scrollbar-width-*` - `scrollbar-width`: `scrollbar-thin`, `scrollbar-auto`, `scrollbar-none`
- `scrollbar-gutter-*` - `scrollbar-gutter`: `scrollbar-gutter-auto`, `scrollbar-gutter-stable`, `scrollbar-gutter-stable-both-edges`

### Touch action

Control how touch scrolling and zoom behave on an element:

```html
<div class="touch-auto">Default</div>
<div class="touch-none">No touch scrolling/zooming</div>
<div class="touch-pan-x">Pan horizontally only</div>
<div class="touch-pan-y">Pan vertically only</div>
<div class="touch-pinch-zoom">Allow pinch zoom</div>
<div class="touch-manipulation">Allow taps and panning (recommended for buttons)</div>
```

### Will change

Hint which properties will animate (use sparingly):

```html
<div class="will-change-auto">Browser decides</div>
<div class="will-change-scroll">Optimize for scrolling</div>
<div class="will-change-transform">Optimize for transforms</div>
<div class="will-change-[contents]">Arbitrary</div>
```

### Forced colors

Control rendering under forced-colors / high-contrast mode (Accessibility):

```html
<button class="forced-color-adjust-auto">Let the browser adjust</button>
<button class="forced-color-adjust-none">Keep custom colors in forced-colors mode</button>
```

## Key Points

- Visibility: `visible`, `invisible`, `collapse`
- Cursor: `cursor-{pointer,not-allowed,wait,move,grab,text,default,none}`
- Pointer events: `pointer-events-none`, `pointer-events-auto`
- User select: `select-none`, `select-text`, `select-all`
- Z-index: `z-{0,10,20,30,40,50,auto}`, `z-[n]`
- Color scheme: `color-scheme-light`, `color-scheme-dark`, `color-scheme-normal`
- Scroll behavior: `scroll-auto`, `scroll-smooth`
- Scrollbar (v4.3): `scrollbar-color-*`, `scrollbar-thin`, `scrollbar-none`, `scrollbar-gutter-*`
- Touch: `touch-none`, `touch-pan-x`, `touch-pan-y`, `touch-pinch-zoom`, `touch-manipulation`
- Will change: `will-change-auto`, `will-change-scroll`, `will-change-transform`
- Forced colors: `forced-color-adjust-auto`, `forced-color-adjust-none`

<!--
Source references:
- https://tailwindcss.com/docs/visibility
- https://tailwindcss.com/docs/cursor
- https://tailwindcss.com/docs/pointer-events
- https://tailwindcss.com/docs/user-select
- https://tailwindcss.com/docs/z-index
- https://tailwindcss.com/docs/color-scheme
- https://tailwindcss.com/docs/scroll-behavior
- https://tailwindcss.com/docs/scrollbar-color
- https://tailwindcss.com/docs/scrollbar-width
- https://tailwindcss.com/docs/scrollbar-gutter
- https://tailwindcss.com/docs/touch-action
- https://tailwindcss.com/docs/will-change
- https://tailwindcss.com/docs/forced-color-adjust
-->
