---
name: layout-animations
description: Automatic layout animations with layoutId
---

# Layout Animations

Layout animations automatically animate components when their layout changes. Use `layout` prop or `layoutId` for shared element transitions.

## Usage

### Basic Layout Animation

```jsx
import { motion } from "motion/react"

<motion.div layout>
  {/* Automatically animates when layout changes */}
</motion.div>
```

### Layout ID

Share layout between components:

```jsx
function Component({ selectedId }) {
  return (
    <>
      {items.map(item => (
        <motion.div
          key={item.id}
          layoutId={item.id}
          animate={selectedId === item.id ? "selected" : "normal"}
        />
      ))}
    </>
  )
}
```

### Layout Transition

Customize layout transition:

```jsx
<motion.div
  layout
  transition={{
    layout: { duration: 0.3, ease: "easeOut" }
  }}
/>
```

### Layout Root

Animate from a specific root:

```jsx
<LayoutGroup>
  <motion.div layoutRoot>
    {/* Layout animations relative to this */}
  </motion.div>
</LayoutGroup>
```

### Axis-Locked Layout (12.36)

Animate only one axis while the other snaps instantly:

```jsx
<motion.div layout="x" />  // Animate x only
<motion.div layout="y" />  // Animate y only
```

### Layout Anchor (12.38)

Pin the layout projection to a custom anchor point. Accepts `0`–`1` progress per axis (default is `{ x: 0, y: 0 }` — top left):

```jsx
<motion.li
  layout
  layoutAnchor={{ x: 0.5, y: 0.5 }}
/>
```

## Key Points

- `layout` enables automatic layout animation
- `layoutId` creates shared element transitions
- `layout="x"` / `layout="y"` animate a single axis
- `layoutAnchor` configures the projection anchor point
- Animates position, size, and rotation changes
- Use `LayoutGroup` to coordinate animations
- Layout transitions are optimized for performance
- Works with drag and other interactions
- Spring transitions recommended for layout

<!--
Source references:
- https://motion.dev/docs/react/layout-animations
- https://github.com/motiondivision/motion/tree/main/packages/framer-motion/src/projection
-->
