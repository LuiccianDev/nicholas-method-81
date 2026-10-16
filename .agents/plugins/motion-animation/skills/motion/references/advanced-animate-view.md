---
name: advanced-animate-view
description: View Transitions API page and element transitions with animateView and AnimateView
---

# AnimateView — View Transitions API

`animateView` (added to the main library in 12.41) is Motion's wrapper around the browser's native [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API). It adds springs, interruption queuing and simplified shared-element matching on top of the native API, for page transitions, morphs and layout wipes. In browsers without View Transitions support the DOM update still runs — it just isn't animated (graceful degradation).

Use `animateView` for full-page wipes, crossfades and morphs across completely different DOM. Use **layout animations** (`layout`/`layoutId`) for interruptible, transform-based, responsive UI motion.

## Usage

Import from `"motion"` (or `"motion/react"`):

```js
import { animateView } from "motion"
```

`animateView` must be passed a function (or async function) that updates the DOM:

```js
let isOn = true

const update = () => {
  isOn = !isOn
  container.style.justifyContent = isOn ? "flex-end" : "flex-start"
}

animateView(update)
```

### Page crossfade

```js
animateView(update).new({ opacity: 1 })
```

### Animate elements (size/position)

Target elements with `add` (selector or `Element`) and they'll animate their size and position automatically:

```js
animateView(update).add(".toggle-handle")
```

`add` assigns each resolved element a unique `view-transition-name` and removes it when the animation finishes. Pass two targets to morph between two different elements (e.g. a card growing into a detail view):

```js
animateView(update).add(fromElement, toElement)
```

### Enter / exit animations

`enter` and `exit` animate layers that purely appear or leave. An `exit` value is used as the initial keyframe of matching `enter` values:

```js
animateView(update)
  .add(".dialog")
  .exit({ clipPath: "inset(50%)" })
  .enter({ clipPath: "inset(0%)" }) // animates from 50%
```

### Old / new page layers

`new` and `old` target the incoming/outgoing page snapshots, useful for wipes and slides:

```js
// Wipe left
animateView(update).new({
  clipPath: ["inset(0% 0% 0% 100%)", "inset(0% 0% 0% 0%)"]
})

// Slide up
animateView(update)
  .old({ opacity: 0, transform: "translateY(-50px)" })
  .new({ opacity: 1, transform: ["translateY(50px)", "none"] })
```

### Transitions and springs

The second argument sets the default transition (springs supported):

```js
import { spring } from "motion"

animateView(update, { type: spring, duration: 0.8, bounce: 0.4 })
```

Override per-layer with `.layout()`, `.enter()`, `.exit()`, `.new()`, `.old()`:

```js
animateView(update, { duration: 0.5 })
  .add(".card")
  .layout({ duration: 1 })
```

### Stagger

`add` can resolve a selector to many elements and their enter/exit/layout animations can be staggered:

```js
import { stagger } from "motion"

animateView(update)
  .add(".item")
  .enter({ opacity: [0, 1], scale: [0.6, 1] }, { delay: stagger(0.05) })
```

### Controls

`animateView` is an async function returning animation controls (supports all `animate()` controls except `then`/`cancel`):

```js
const animation = await animateView(update)
animation.pause()
await animation.finished
```

### Cropping, grouping and class tags

- `.crop(false)` disables aspect-ratio cropping (default crops morphing layers; disable for text).
- `.group(false)` opts out of automatic DOM-hierarchy grouping (lets a layer escape an ancestor's clip; grouping is still rolling out across browsers).
- `.class(name)` tags the generated layers with a `view-transition-class` so CSS pseudo-element rules (`::view-transition-group(.card)`) can target them.

## React: AnimateView component

React has a declarative `<AnimateView>` component wrapping the same API:

```jsx
import { AnimateView } from "motion/react"

<AnimateView
  update={update}
  new={{ opacity: 1 }}
  layout={{ duration: 0.6 }}
/>
```

## Key Points

- Built on the native View Transitions API — degrades gracefully where unsupported
- Supports springs, keyframes and interruption queuing (`interrupt: "immediate"` to override)
- `.add()` handles shared-element matching and `view-transition-name` cleanup automatically
- `new`/`old` target page snapshots; `enter`/`exit` target appearing/leaving elements
- Limited to CSS-animatable values (pseudo-element layers are not JS-animatable)
- Prefer layout animations for interruptible, transform-based UI motion

<!--
Source references:
- https://motion.dev/docs/animate-view
- https://motion.dev/docs/react-animate-view
-->