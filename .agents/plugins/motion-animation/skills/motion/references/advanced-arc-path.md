---
name: advanced-arc-path
description: arc() and transition.path for curved x/y motion and layout animations
---

# arc() — Motion along a curved path

By default `x`/`y` animations travel in a straight line. `arc()` (added in 12.40) bends that line into a curve. It works with `motion` components, `animate`, `useAnimate` and layout animations.

**Not supported by the mini `animate()` from `"motion/mini"`.**

## Usage

Pass `arc()` to `transition.path`:

```jsx
import { arc, motion } from "motion/react"

<motion.div
  animate={{ x: 200, y: 100 }}
  transition={{ duration: 1, path: arc() }}
/>
```

Works anywhere a `transition` is accepted, including keyframe arrays:

```jsx
<motion.div
  animate={{ x: [0, 200], y: [0, 100] }}
  transition={{ duration: 1, path: arc({ strength: 1 }) }}
/>
```

### Layout animations

Curve the motion of a layout animation with `transition.layout.path` — including `layoutId` shared-element transitions:

```jsx
<motion.div
  layout
  transition={{
    layout: { duration: 0.6, path: arc({ strength: 0.6 }) }
  }}
/>

<motion.div layoutId="bubble" transition={{ layout: { path: arc() } }} />
```

### Springs

`path` only describes the curve; the driving transition is whatever you pass alongside it. With a spring the progress overshoots `t = 1`, sampling past the endpoint for a bouncy arc:

```jsx
<motion.div
  animate={{ x: 200, y: 100 }}
  transition={{
    type: "spring",
    bounce: 0.5,
    visualDuration: 0.6,
    path: arc({ strength: 1 })
  }}
/>
```

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `strength` | `0.5` | Bend strength. `1` peaks at a height equal to the distance between the two points; `0` is no bend. |
| `peak` | `0.5` | Where along the bend the arc reaches its maximum height (lower = peak towards the start). |
| `direction` | automatic | `"cw"` or `"ccw"` bulge relative to travel direction. Automatic picks a stable screen-space side, keeping the bulge consistent when direction flips. |
| `rotate` | `false` | `true` follows the tangent fully; a number `0`–`1` scales tangent following. Additive to existing `rotate`. |

## Memoisation

With automatic `direction`, memoise the `arc()` instance per component for improved interruption:

```jsx
// React
const path = useMemo(() => arc({ strength: 1 }), [])

// Vanilla JS
const path = arc({ strength: 1 })
```

## Key Points

- Curve any `x`/`y` animation via `transition.path: arc()`
- Also works for layout and `layoutId` animations via `transition.layout.path`
- Combine with springs for bouncy curved motion
- Alternative: CSS `offset-path` + animate `offsetDistance` for fixed, non-dynamic paths

<!--
Source references:
- https://motion.dev/docs/arc
- https://motion.dev/docs/react-transitions#motion-along-a-path
-->