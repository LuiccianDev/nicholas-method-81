---
name: visual-effects
description: Box shadow, opacity, mix-blend, and filter effects
---

# Effects

Utilities for box shadow, opacity, mix-blend, and filters.

## Usage

### Box shadow

```html
<div class="shadow-sm">Small</div>
<div class="shadow">Default</div>
<div class="shadow-md">Medium</div>
<div class="shadow-lg">Large</div>
<div class="shadow-xl">Extra large</div>
<div class="shadow-2xl">2xl</div>
<div class="shadow-none">None</div>

<div class="shadow-lg shadow-blue-500/50">Colored shadow</div>
<div class="shadow-[0_0_15px_rgba(0,0,0,0.2)]">Arbitrary</div>
```

### Opacity

```html
<div class="opacity-0">Invisible</div>
<div class="opacity-50">50%</div>
<div class="opacity-100">Full</div>
```

### Mix blend mode

```html
<div class="mix-blend-normal">Normal</div>
<div class="mix-blend-multiply">Multiply</div>
<div class="mix-blend-screen">Screen</div>
<div class="mix-blend-overlay">Overlay</div>
```

### Text shadow (v4.1+)

```html
<div class="text-shadow-sm">Small text shadow</div>
<div class="text-shadow">Default</div>
<div class="text-shadow-lg text-2xl">Large text shadow</div>
<div class="text-shadow-[0_0_10px_rgba(0,0,0,0.5)]">Arbitrary</div>
```

Sizes: `text-shadow-2xs`, `text-shadow-xs`, `text-shadow-sm`, `text-shadow` (default), `text-shadow-md`, `text-shadow-lg`, driven by `--text-shadow-*` theme variables.

### Mask utilities

Mask an element with an image or gradient:

```html
<div class="mask-image-linear">mask-image: linear-gradient(...)</div>
<div class="mask-image-[url('/img/fade.png')]">Arbitrary mask image</div>
<div class="mask-image-none">No mask</div>
<div class="mask-size-cover">mask-size: cover</div>
<div class="mask-repeat-no-repeat">mask-repeat: no-repeat</div>
<div class="mask-position-center">mask-position: center</div>
<div class="mask-clip-content">mask-clip: content-box</div>
<div class="mask-composite-intersect">mask-composite: intersect</div>
<div class="mask-mode-alpha">mask-mode: alpha</div>
<div class="mask-type-luminance">mask-type: luminance</div>
```

Mask namespaces: `mask-image-*`, `mask-size-*`, `mask-repeat-*`, `mask-position-*`, `mask-clip-*`, `mask-composite-*`, `mask-mode-*`, `mask-type-*`. Popular fade-to-edge pattern: `mask-image-linear` defaults to `linear-gradient(to top, #fff 0%, #fff 12%, transparent 44%)`.

### Backdrop blur and filter

```html
<div class="backdrop-blur-sm">Blur backdrop</div>
<div class="backdrop-blur-md">Medium blur</div>
<div class="backdrop-blur-none">No blur</div>

<div class="backdrop-opacity-50">Backdrop opacity</div>
<div class="backdrop-brightness-110">Backdrop brightness</div>
<div class="backdrop-contrast-125">Backdrop contrast</div>
<div class="backdrop-grayscale">Backdrop grayscale</div>
<div class="backdrop-hue-rotate-15">Backdrop hue rotate</div>
<div class="backdrop-invert">Backdrop invert</div>
<div class="backdrop-saturate-150">Backdrop saturate</div>
<div class="backdrop-sepia">Backdrop sepia</div>
```

### Filter (blur, brightness, contrast, etc.)

```html
<div class="blur-sm">Blur</div>
<div class="brightness-90">Brightness</div>
<div class="contrast-125">Contrast</div>
<div class="drop-shadow-lg">Drop shadow following shape</div>
<div class="grayscale">Grayscale</div>
<div class="hue-rotate-15">Hue rotate</div>
<div class="invert">Invert</div>
<div class="saturate-150">Saturate</div>
<div class="sepia">Sepia</div>
<div class="blur-none">No filter</div>
```

Filter utilities: `blur-*`, `brightness-*`, `contrast-*`, `drop-shadow-*`, `grayscale`, `hue-rotate-*`, `invert`, `saturate-*`, `sepia`. They compose via CSS variables and apply in order.

### Object fit (images/video)

```html
<img class="object-contain" /> <!-- Fit within bounds -->
<img class="object-cover" />   <!-- Cover area, may crop -->
<img class="object-fill" />    <!-- Stretch -->
<img class="object-none" />    <!-- No resize -->
<img class="object-scale-down" /> <!-- contain or none, whichever is smaller -->
<img class="object-top object-cover" /> <!-- Position -->
```

## Key Points

- Shadow: `shadow-{size}`, `shadow-{color}/opacity`, `shadow-none`
- Text shadow: `text-shadow-{2xs,xs,sm,md,lg}` (v4.1+)
- Opacity: `opacity-{0-100}`
- Mix blend: `mix-blend-{mode}`
- Mask: `mask-{image,size,repeat,position,clip,composite,mode,type}-*`
- Backdrop: `backdrop-{blur,brightness,contrast,grayscale,hue-rotate,invert,opacity,saturate,sepia}-*`
- Filter: `blur-*`, `brightness-*`, `contrast-*`, `drop-shadow-*`, `grayscale`, `hue-rotate-*`, `invert`, `saturate-*`, `sepia`

<!--
Source references:
- https://tailwindcss.com/docs/box-shadow
- https://tailwindcss.com/docs/text-shadow
- https://tailwindcss.com/docs/opacity
- https://tailwindcss.com/docs/mask-image
- https://tailwindcss.com/docs/backdrop-filter-blur
- https://tailwindcss.com/docs/filter-blur
-->
