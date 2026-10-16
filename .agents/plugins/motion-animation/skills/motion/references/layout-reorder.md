---
name: layout-reorder
description: Drag-to-reorder with layout animations
---

# Reorder

`Reorder` component enables drag-to-reorder functionality with automatic layout animations. Perfect for sortable lists and grids.

## Usage

### Basic Reorder

```jsx
import { Reorder } from "motion/react"

function List({ items, setItems }) {
  return (
    <Reorder.Group axis="y" values={items} onReorder={setItems}>
      {items.map(item => (
        <Reorder.Item key={item.id} value={item}>
          {item.name}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  )
}
```

### Horizontal Reorder

```jsx
<Reorder.Group axis="x" values={items} onReorder={setItems}>
  {/* ... */}
</Reorder.Group>
```

### Custom Item Animation

```jsx
<Reorder.Item
  value={item}
  layout
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  {item.name}
</Reorder.Item>
```

### Drag Constraints

```jsx
<Reorder.Item
  value={item}
  dragConstraints={{ top: 0, bottom: 0 }}
>
  {item.name}
</Reorder.Item>
```

### Automatic Axis Detection (13.1)

The `axis` prop is now optional — Reorder detects the drag axis automatically:

```jsx
<Reorder.Group values={items} onReorder={setItems}>
  {/* ... */}
</Reorder.Group>
```

### Multidimensional Reorder (13.1)

Pass an array of axes to enable reordering in more than one dimension:

```jsx
<Reorder.Group axis={["x", "y"]} values={items} onReorder={setItems}>
  {/* ... */}
</Reorder.Group>
```

Horizontal lists also support RTL.

## Key Points

- `Reorder.Group` wraps reorderable items
- `Reorder.Item` represents each item
- `axis` controls drag direction (optional since 13.1 — auto-detected)
- `axis={["x", "y"]}` enables multidimensional reorder (13.1)
- RTL is supported for horizontal lists (13.1)
- `values` and `onReorder` manage state
- Automatic layout animations
- Works with AnimatePresence
- Each item needs unique value

<!--
Source references:
- https://motion.dev/docs/react/reorder
- https://github.com/motiondivision/motion/tree/main/packages/framer-motion/src/components/Reorder
-->
