---
name: transform-base
description: Base transform utilities for enabling transforms, hardware acceleration, and custom transform values
---

# Transform

Base utilities for transforming elements.

## Usage

### Hardware acceleration

Use `transform-gpu` to force GPU acceleration for better performance:

```html
<div class="scale-150 transform-gpu">
  GPU-accelerated transform
</div>
```

### CPU rendering

Use `transform-cpu` to force CPU rendering if needed:

```html
<div class="scale-150 transform-cpu">
  CPU-rendered transform
</div>
```

### Removing transforms

Use `transform-none` to remove all transforms:

```html
<div class="skew-y-3 md:transform-none">
  Skewed on mobile, normal on desktop
</div>
```

### Custom transforms

Use arbitrary values for custom transform functions:

```html
<div class="transform-[matrix(1,2,3,4,5,6)]">
  Custom matrix transform
</div>
<div class="transform-[perspective(1000px)_rotateX(45deg)]">
  Custom 3D transform
</div>
```

## 3D Transforms

### Perspective

Set the perspective on the parent of a 3D-transformed element:

```html
<div class="perspective-distant">
  <div class="rotate-x-45">3D rotation</div>
</div>
```

Perspective utilities: `perspective-distant` (1200px), `perspective-near` (300px), `perspective-[1000px]` arbitrary. Also available for 3D transforms: `rotate-x-*`, `rotate-y-*`, `rotate-z-*`.

### Perspective origin

Control the vanishing point:

```html
<div class="perspective-origin-center">Center (default)</div>
<div class="perspective-origin-top-left">Top left</div>
<div class="perspective-origin-[75%_25%]">Arbitrary</div>
```

### Transform origin

```html
<div class="origin-center">Center (default)</div>
<div class="origin-top-left">Top left</div>
<div class="origin-[35%_60%]">Arbitrary</div>
```

Utilities: `origin-center`, `origin-top`, `origin-top-right`, `origin-right`, `origin-bottom-right`, `origin-bottom`, `origin-bottom-left`, `origin-left`, `origin-top-left`.

### Transform style

```html
<div class="transform-3d">preserve-3d (nested 3D)</div>
<div class="transform-flat">flat (default)</div>
```

### Backface visibility

```html
<div class="backface-visible">Visible from behind (default)</div>
<div class="backface-hidden">Hidden from behind (card flip)</div>
```

### Zoom (v4.3)

```html
<div class="zoom-75">zoom: 75%</div>
<div class="zoom-125">zoom: 125%</div>
```

`zoom-*` uses the CSS `zoom` property (affects layout, unlike `scale-*`). It accepts any number (`zoom-<number>` compiles to `zoom: <number>%`), arbitrary values (`zoom-[1.1]`), and CSS variables (`zoom-(--my-zoom)`).

## Key Points

- `transform-gpu` enables hardware acceleration with `translateZ(0)`
- `transform-cpu` forces CPU rendering (removes GPU acceleration)
- `transform-none` removes all transforms at once
- Use `transform-gpu` for better animation performance
- Custom transforms use arbitrary values: `transform-[...]`
- 3D: `perspective-*`, `perspective-origin-*`, `rotate-x/y/z-*`, `transform-3d`/`transform-flat`, `backface-visible`/`backface-hidden`
- `origin-*` sets `transform-origin` (default `origin-center`)
- `zoom-*` (v4.3) uses the CSS `zoom` property and affects layout
- Transform utilities (translate, rotate, scale, skew) automatically enable transform
- Hardware acceleration is usually beneficial for animations

<!--
Source references:
- https://tailwindcss.com/docs/transform
-->
