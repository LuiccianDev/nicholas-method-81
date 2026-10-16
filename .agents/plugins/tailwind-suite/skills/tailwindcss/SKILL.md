---
name: tailwindcss
description: Tailwind CSS utility-first CSS framework. Use when styling web applications with utility classes, building responsive designs, or customizing design systems with theme variables.
---

# Tailwind CSS

> The skill is based on Tailwind CSS v4.3.3, generated at 2026-08-19.

Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. Instead of writing custom CSS, you compose designs using utility classes directly in your markup. Tailwind v4 introduces CSS-first configuration with theme variables, making it easier to customize your design system.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Installation | Vite, PostCSS, CLI, and CDN setup | [core-installation](references/core-installation.md) |
| Utility Classes | Understanding Tailwind's utility-first approach and styling elements | [core-utility-classes](references/core-utility-classes.md) |
| Theme Variables | Design tokens, customizing theme, and theme variable namespaces | [core-theme](references/core-theme.md) |
| Colors | Default palette (26 color families), custom palette with `--color-*`, opacity modifiers | [core-theme](references/core-theme.md) |
| Responsive Design | Mobile-first breakpoints, responsive variants, arbitrary breakpoints, and container queries | [core-responsive](references/core-responsive.md) |
| Variants | Applying utilities conditionally with state, pseudo-class, pseudo-element, group/peer, and media query variants | [core-variants](references/core-variants.md) |
| Preflight | Tailwind's base styles and how to extend or disable them | [core-preflight](references/core-preflight.md) |

## Layout

### Display & Flexbox & Grid

| Topic | Description | Reference |
|-------|-------------|-----------|
| Display | flex, grid, block, inline, hidden, sr-only, flow-root, contents, table-*, box-sizing, box-decoration-break | [layout-display](references/layout-display.md) |
| Flexbox | flex-direction, justify, items, content, gap, grow, shrink, basis, wrap, order, place-* | [layout-flexbox](references/layout-flexbox.md) |
| Grid | grid-cols, grid-rows, auto-flow, auto-cols/rows, gap, place/justify/align, col-span, row-span, subgrid | [layout-grid](references/layout-grid.md) |
| Aspect Ratio | Controlling element aspect ratio for responsive media | [layout-aspect-ratio](references/layout-aspect-ratio.md) |
| Columns | Multi-column layout for magazine-style or masonry layouts | [layout-columns](references/layout-columns.md) |

### Positioning

| Topic | Description | Reference |
|-------|-------------|-----------|
| Position | Controlling element positioning with static, relative, absolute, fixed, sticky, float, clear, isolation | [layout-position](references/layout-position.md) |
| Inset | Controlling placement of positioned elements with top, right, bottom, left, and inset utilities | [layout-inset](references/layout-inset.md) |

### Sizing

| Topic | Description | Reference |
|-------|-------------|-----------|
| Width | Setting element width with spacing scale, fractions, container sizes, and viewport units | [layout-width](references/layout-width.md) |
| Height | Setting element height with spacing scale, fractions, viewport units, and content-based sizing | [layout-height](references/layout-height.md) |
| Min & Max Sizing | min-width, max-width, min-height, max-height constraints | [layout-min-max-sizing](references/layout-min-max-sizing.md) |
| Logical Sizing | `inline-*`/`block-*`, `min/max-inline-*`, `min/max-block-*` (v4.2) | [layout-width](references/layout-width.md) |

### Spacing

| Topic | Description | Reference |
|-------|-------------|-----------|
| Margin | Controlling element margins with spacing scale, negative values, logical properties, and space utilities | [layout-margin](references/layout-margin.md) |
| Padding | Controlling element padding with spacing scale, logical properties, and directional utilities | [layout-padding](references/layout-padding.md) |

### Overflow

| Topic | Description | Reference |
|-------|-------------|-----------|
| Overflow | Controlling how elements handle content that overflows their container, plus overscroll-behavior | [layout-overflow](references/layout-overflow.md) |

### Images & Replaced Elements

| Topic | Description | Reference |
|-------|-------------|-----------|
| Object Fit & Position | Controlling how images and video are resized and positioned | [layout-object-fit-position](references/layout-object-fit-position.md) |

### Tables

| Topic | Description | Reference |
|-------|-------------|-----------|
| Table Layout | border-collapse, border-spacing, table-auto, table-fixed, caption-side | [layout-tables](references/layout-tables.md) |

## Transforms

| Topic | Description | Reference |
|-------|-------------|-----------|
| Transform Base | Base transform utilities, hardware acceleration, 3D transforms, perspective, origin, style, backface | [transform-base](references/transform-base.md) |
| Translate | Translating elements on x, y, and z axes with spacing scale, percentages, and custom values | [transform-translate](references/transform-translate.md) |
| Rotate | Rotating elements in 2D and 3D space with degree values and custom rotations | [transform-rotate](references/transform-rotate.md) |
| Scale | Scaling elements uniformly or on specific axes with percentage values | [transform-scale](references/transform-scale.md) |
| Skew | Skewing elements on x and y axes with degree values | [transform-skew](references/transform-skew.md) |

## Typography

| Topic | Description | Reference |
|-------|-------------|-----------|
| Font & Text | Font size, weight, family, smoothing, variant-numeric, text-wrap, whitespace, word-break, hyphens, indent, vertical-align | [typography-font-text](references/typography-font-text.md) |
| Text Align | Controlling text alignment with left, center, right, justify, and logical properties | [typography-text-align](references/typography-text-align.md) |
| List Style | list-style-type, list-style-position, list-image for bullets and markers | [typography-list-style](references/typography-list-style.md) |

## Visual

| Topic | Description | Reference |
|-------|-------------|-----------|
| Background | Background color, linear/radial/conic gradients, image, size, position, clip, origin, blend | [visual-background](references/visual-background.md) |
| Border | Border width, color, radius, divide, ring, outline | [visual-border](references/visual-border.md) |
| Effects | Box shadow, text-shadow, opacity, mask, mix-blend, backdrop-*, filter | [visual-effects](references/visual-effects.md) |
| SVG | fill, stroke, stroke-width for SVG and icon styling | [visual-svg](references/visual-svg.md) |

## Effects & Interactivity

| Topic | Description | Reference |
|-------|-------------|-----------|
| Transition & Animation | CSS transitions, timing, delay, behavior, animation keyframes, reduced motion | [effects-transition-animation](references/effects-transition-animation.md) |
| Visibility & Interactivity | Visibility, cursor, pointer-events, user-select, z-index, color-scheme, scroll-behavior, scrollbar-*, touch-action, will-change | [effects-visibility-interactivity](references/effects-visibility-interactivity.md) |
| Form Controls | accent-color, appearance, caret-color, resize, field-sizing | [effects-form-controls](references/effects-form-controls.md) |
| Scroll Snap | scroll-snap-type, scroll-snap-align, scroll-snap-stop for carousels | [effects-scroll-snap](references/effects-scroll-snap.md) |
| Scroll Margin & Padding | scroll-margin-*, scroll-padding-* (sticky offset / snap containers) | [effects-scroll-snap](references/effects-scroll-snap.md) |
| Accessibility | forced-color-adjust for high-contrast/forced-colors support | [effects-form-controls](references/effects-form-controls.md) |

## Features

### Dark Mode

| Topic | Description | Reference |
|-------|-------------|-----------|
| Dark Mode | Implementing dark mode with the dark variant and custom strategies | [features-dark-mode](references/features-dark-mode.md) |

### Customization

| Topic | Description | Reference |
|-------|-------------|-----------|
| Custom Styles | Adding custom styles, `@utility` with modifiers, `@apply` + `@reference`, and working with arbitrary values | [features-custom-styles](references/features-custom-styles.md) |
| Functions & Directives | Tailwind's CSS directives (`@theme` options, `@utility --value`, `@variant`) and functions | [features-functions-directives](references/features-functions-directives.md) |
| Content Detection | How Tailwind detects classes and how to customize content scanning | [features-content-detection](references/features-content-detection.md) |

## Best Practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Utility Patterns | Managing duplication, conflicts, avoiding important, when to use components | [best-practices-utility-patterns](references/best-practices-utility-patterns.md) |

## Key Recommendations

- **Use utility classes directly in markup** - Compose designs by combining utilities
- **Customize with theme variables** - Use `@theme` directive to define design tokens
- **Mobile-first responsive design** - Use unprefixed utilities for mobile, prefixed for breakpoints
- **Use complete class names** - Never construct classes dynamically with string interpolation
- **Leverage variants** - Stack variants for complex conditional styling
- **Prefer CSS-first configuration** - Use `@theme`, `@utility`, and `@custom-variant` over JavaScript configs
