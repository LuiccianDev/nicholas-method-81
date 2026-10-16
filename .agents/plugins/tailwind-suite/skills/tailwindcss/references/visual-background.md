---
name: visual-background
description: Background color, gradient, image, and attachment utilities
---

# Background

Utilities for background color, gradients, images, and attachment.

## Usage

### Background color

```html
<div class="bg-white">White</div>
<div class="bg-gray-100">Light gray</div>
<div class="bg-blue-500">Blue</div>
<div class="bg-sky-500/50">50% opacity</div>
<div class="bg-[#1da1f2]">Arbitrary</div>
<div class="bg-(--my-bg)">CSS variable</div>
```

Color palette follows theme (red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, slate, gray, zinc, neutral, stone).

### Background image and gradient

```html
<div class="bg-linear-to-r from-blue-500 to-purple-600">Linear gradient</div>
<div class="bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500">Multi-stop</div>
<div class="bg-linear-45 from-cyan-500 to-blue-600">Gradient at 45°</div>

<div class="bg-radial from-sky-500 to-indigo-600">Radial gradient</div>
<div class="bg-conic from-pink-500 to-amber-500">Conic gradient</div>
<div class="bg-conic-[from_45deg] from-fuchsia-500 to-cyan-500">Conic from angle</div>

<div class="bg-[url('/img/hero.jpg')]">Image</div>
<div class="bg-[url('/img/hero.jpg')] bg-cover bg-center">Image with size/position</div>
```

Linear gradient directions: `to-t`, `to-tr`, `to-r`, `to-br`, `to-b`, `to-bl`, `to-l`, `to-tl`. Gradients use `bg-linear-*` plus angle utilities like `bg-linear-45`, `bg-linear-115`. Radial: `bg-radial`, `bg-radial-[at_25%_25%]`. Conic: `bg-conic`, `bg-conic-[from_45deg]`. All share the `from-*`, `via-*`, `to-*` stop utilities.

### Background clip and origin

```html
<div class="bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-purple-600">
  Gradient text
</div>
<div class="bg-clip-border">Clip to border box (default)</div>
<div class="bg-clip-padding">Clip to padding box</div>
<div class="bg-clip-content">Clip to content box</div>

<div class="bg-origin-border">Position relative to border box</div>
<div class="bg-origin-padding">Position relative to padding box (default)</div>
<div class="bg-origin-content">Position relative to content box</div>
```

`bg-clip-text` with `text-transparent` is the standard pattern for gradient text.

### Background size and position

```html
<div class="bg-auto">auto</div>
<div class="bg-cover">cover</div>
<div class="bg-contain">contain</div>

<div class="bg-center">center</div>
<div class="bg-top">top</div>
<div class="bg-bottom">bottom</div>
<div class="bg-left">left</div>
<div class="bg-right">right</div>
<div class="bg-[position:2rem_2rem]">Arbitrary</div>
```

### Background repeat and attachment

```html
<div class="bg-repeat">repeat (default)</div>
<div class="bg-no-repeat">no-repeat</div>
<div class="bg-repeat-x">repeat-x</div>

<div class="bg-fixed">fixed (parallax)</div>
<div class="bg-local">local</div>
<div class="bg-scroll">scroll</div>
```

### Background blend mode

```html
<div class="bg-blend-multiply">Multiply</div>
<div class="bg-blend-screen">Screen</div>
<div class="bg-blend-overlay">Overlay</div>
<div class="bg-blend-difference">Difference</div>
```

Blend modes: `bg-blend-normal`, `bg-blend-multiply`, `bg-blend-screen`, `bg-blend-overlay`, `bg-blend-darken`, `bg-blend-lighten`, `bg-blend-color-dodge`, `bg-blend-color-burn`, `bg-blend-hard-light`, `bg-blend-soft-light`, `bg-blend-difference`, `bg-blend-exclusion`, `bg-blend-hue`, `bg-blend-saturation`, `bg-blend-color`, `bg-blend-luminosity`.

## Key Points

- Colors: `bg-{color}-{shade}`, opacity `/50`, arbitrary `bg-[#hex]`
- Gradients: `bg-linear-to-{dir}`, `bg-linear-{angle}`, `bg-radial-*`, `bg-conic-*`, `from-*`, `via-*`, `to-*`
- Image: `bg-[url('...')]`, `bg-cover`, `bg-center`, etc.
- Clip: `bg-clip-text` for gradient text, `bg-clip-border/padding/content`
- Origin: `bg-origin-border/padding/content`
- Blend: `bg-blend-{mode}` for mixing backgrounds
- Size: `bg-auto`, `bg-cover`, `bg-contain`
- Position: `bg-center`, `bg-top`, `bg-[position:...]`

<!--
Source references:
- https://tailwindcss.com/docs/background-color
- https://tailwindcss.com/docs/background-image
- https://tailwindcss.com/docs/background-clip
- https://tailwindcss.com/docs/background-origin
- https://tailwindcss.com/docs/background-blend-mode
-->
