---
name: typography-font-text
description: Font size, weight, style, text color, line height, letter spacing, and text decoration
---

# Typography: Font & Text

Utilities for font styling, text color, line height, letter spacing, and decoration.

## Usage

### Font size

```html
<p class="text-xs">Extra small</p>
<p class="text-sm">Small</p>
<p class="text-base">Base (default)</p>
<p class="text-lg">Large</p>
<p class="text-xl">Extra large</p>
<p class="text-2xl">2xl</p>
<p class="text-[17px]">Arbitrary</p>
```

### Font weight

```html
<p class="font-thin">100</p>
<p class="font-light">300</p>
<p class="font-normal">400</p>
<p class="font-medium">500</p>
<p class="font-semibold">600</p>
<p class="font-bold">700</p>
<p class="font-extrabold">800</p>
```

### Font style and family

```html
<p class="italic">Italic</p>
<p class="not-italic">Not italic</p>
<p class="font-sans">Sans (default)</p>
<p class="font-serif">Serif</p>
<p class="font-mono">Monospace</p>
```

### Text color

```html
<p class="text-gray-900">Dark text</p>
<p class="text-blue-500">Blue</p>
<p class="text-red-500/50">50% opacity</p>
<p class="text-[#1da1f2]">Arbitrary color</p>
<p class="text-(--my-color)">CSS variable</p>
```

### Line height

```html
<p class="leading-none">1</p>
<p class="leading-tight">1.25</p>
<p class="leading-normal">1.5</p>
<p class="leading-relaxed">1.625</p>
<p class="leading-loose">2</p>
<p class="leading-[3rem]">Arbitrary</p>
```

### Letter spacing

```html
<p class="tracking-tighter">-0.05em</p>
<p class="tracking-tight">-0.025em</p>
<p class="tracking-normal">0</p>
<p class="tracking-wide">0.025em</p>
<p class="tracking-widest">0.1em</p>
```

### Text decoration

```html
<p class="underline">Underline</p>
<p class="line-through">Strikethrough</p>
<p class="no-underline">Remove</p>
<p class="overline">Overline</p>
<p class="underline decoration-2 underline-offset-4">Custom</p>
```

### Text transform and overflow

```html
<p class="uppercase">UPPERCASE</p>
<p class="lowercase">lowercase</p>
<p class="capitalize">Capitalize Each</p>
<p class="normal-case">Normal</p>

<p class="truncate">Single line ellipsis</p>
<p class="text-ellipsis overflow-hidden">Ellipsis</p>
<p class="line-clamp-3">Clamp to 3 lines</p>
```

### Font smoothing and stretch

```html
<p class="antialiased">Antialiased (light font, macos)</p>
<p class="subpixel-antialiased">Subpixel antialiasing (windows)</p>

<p class="font-stretch-ultra-expanded">Ultra expanded</p>
<p class="font-stretch-condensed">Condensed</p>
<p class="font-stretch-75%">75% stretch</p>
```

### Font variant numeric and features

```html
<p class="tabular-nums">123456 (monospaced digits)</p>
<p class="oldstyle-nums">Oldstyle digits</p>
<p class="ordinal">1st</p>
<p class="slashed-zero">0 with slash</p>

<p class="font-features-['cv11']">Custom OpenType feature</p>
```

Numeric variants: `normal-nums`, `ordinal`, `slashed-zero`, `lining-nums`, `oldstyle-nums`, `proportional-nums`, `tabular-nums`, `diagonal-fractions`, `stacked-fractions`.

### Text wrap and whitespace

```html
<p class="text-wrap">Wrap (default)</p>
<p class="text-nowrap">No wrap</p>
<p class="text-balance">Balance lines (headlines)</p>
<p class="text-pretty">Avoid orphan words (paragraphs)</p>

<div class="whitespace-nowrap">No whitespace wrapping</div>
<div class="whitespace-pre">Preserve whitespace and newlines</div>
<div class="whitespace-pre-wrap">Preserve + wrap</div>
<div class="whitespace-break-spaces">Preserve + break</div>
```

### Word break, overflow wrap, and hyphens

```html
<p class="break-normal">Normal</p>
<p class="break-words">overflow-wrap: break-word</p>
<p class="break-all">Break anywhere</p>
<p class="break-keep">Keep words intact</p>

<p class="hyphens-none">No hyphens</p>
<p class="hyphens-manual">Hyphens only at &amp;shy;</p>
<p class="hyphens-auto">Automatic hyphens</p>
```

### Text indent, tab size, vertical align, and content

```html
<p class="indent-8">First-line indent (2rem)</p>
<p class="indent-[25%]">Indent by arbitrary percentage</p>

<div class="tab-4">Tab width = 4 spaces</div>

<span class="align-baseline">Baseline</span>
<span class="align-middle">Middle</span>
<span class="align-top">Top</span>
<span class="align-bottom">Bottom</span>
<span class="align-text-top">Text top</span>
<span class="align-super">Super</span>
<span class="align-sub">Sub</span>

<div class="content-none"></div>
<div class="content-['_•_']">Arbitrary content</div>
```

- `indent-*` - `text-indent` (spacing scale, fractions, arbitrary)
- `tab-*` - `tab-size` (number or arbitrary), v4.3
- `align-*` - `vertical-align`: `baseline`, `top`, `middle`, `bottom`, `text-top`, `text-bottom`, `sub`, `super`, arbitrary
- `content-*` - `content` property: `content-none`, arbitrary like `content-['_»_']`

## Key Points

- Font size: `text-xs` through `text-9xl`, theme scale
- Weight: `font-thin` to `font-black`
- Color: `text-{color}-{shade}`, opacity modifier `/50`, arbitrary `text-[#hex]`
- Line height: `leading-none`, `leading-tight`, `leading-normal`, `leading-loose`
- Letter spacing: `tracking-tighter` to `tracking-widest`
- Decoration: `underline`, `line-through`, `no-underline`, `decoration-*`, `underline-offset-*`
- Overflow: `truncate` (ellipsis), `line-clamp-{n}`
- Smoothing: `antialiased`, `subpixel-antialiased`
- Numeric: `tabular-nums`, `oldstyle-nums`, `ordinal`, `slashed-zero`, fractions
- Wrap: `text-wrap`, `text-nowrap`, `text-balance`, `text-pretty`
- Whitespace: `whitespace-nowrap`, `whitespace-pre`, `whitespace-pre-wrap`, `whitespace-break-spaces`
- Break: `break-normal`, `break-words`, `break-all`, `break-keep`
- Hyphens: `hyphens-none`, `hyphens-manual`, `hyphens-auto`
- Indent: `indent-*` (spacing scale); Tab: `tab-*`; Align: `align-*`; Content: `content-*`

<!--
Source references:
- https://tailwindcss.com/docs/font-size
- https://tailwindcss.com/docs/font-weight
- https://tailwindcss.com/docs/text-color
- https://tailwindcss.com/docs/line-height
- https://tailwindcss.com/docs/letter-spacing
- https://tailwindcss.com/docs/text-decoration
-->
