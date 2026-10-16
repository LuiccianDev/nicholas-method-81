---
name: layout-grid
description: CSS Grid utilities including grid-cols, grid-rows, gap, place-items, and grid placement
---

# Grid

Utilities for CSS Grid layouts: columns, rows, gap, and item placement.

## Usage

### Grid columns and rows

```html
<div class="grid grid-cols-3 gap-4">3 equal columns</div>
<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">Responsive</div>
<div class="grid grid-cols-none">No explicit tracks</div>

<div class="grid grid-rows-3 gap-2">3 rows</div>
<div class="grid grid-rows-[auto_1fr_auto]">Custom rows</div>
```

### Custom grid template

```html
<div class="grid grid-cols-[200px_minmax(900px,1fr)_100px]">Custom template</div>
<div class="grid grid-cols-(--my-cols)">CSS variable</div>
```

### Subgrid

```html
<div class="grid grid-cols-4 gap-4">
  <div>01</div><div>02</div><div>03</div><div>04</div>
  <div>05</div>
  <div class="col-span-3 grid grid-cols-subgrid gap-4">
    <div class="col-start-2">06</div>
  </div>
</div>
```

### Gap

```html
<div class="grid gap-4">Uniform gap</div>
<div class="grid gap-x-2 gap-y-4">Different x/y</div>
```

### Grid auto flow

Control how auto-placed items are laid out:

```html
<div class="grid grid-flow-row">Rows (default)</div>
<div class="grid grid-flow-col">Columns</div>
<div class="grid grid-flow-dense">Rows, filling holes</div>
<div class="grid grid-flow-col-dense">Columns, filling holes</div>
```

### Grid auto columns and rows

Size implicit tracks created by auto-flow:

```html
<div class="grid grid-flow-col auto-cols-fr">Equal implicit columns</div>
<div class="grid grid-flow-row auto-rows-min">Minimum implicit rows</div>
<div class="grid auto-cols-[minmax(0,2fr)]">Arbitrary implicit tracks</div>
```

- `auto-cols-*`: `auto-cols-auto`, `auto-cols-min`, `auto-cols-max`, `auto-cols-fr`, `auto-cols-[...]`
- `auto-rows-*`: `auto-rows-auto`, `auto-rows-min`, `auto-rows-max`, `auto-rows-fr`, `auto-rows-[...]`

### Justify and align items

```html
<div class="grid justify-items-center">Align inline axis</div>
<div class="grid justify-items-stretch">Stretch (default)</div>
<div class="grid items-start">Align block axis</div>
<div class="grid justify-items-center items-center">Both centered</div>
```

### Justify and align self (on grid children)

```html
<div class="grid grid-cols-3">
  <div class="justify-self-end">Pushed to inline end</div>
  <div class="self-end">Pushed to block end</div>
</div>
```

### Place content (align + justify of the whole grid)

```html
<div class="grid place-content-center">Grid centered in container</div>
<div class="grid place-content-between">Rows spread</div>
<div class="grid place-content-end">Grid at the end</div>
```

### Place self (on grid children)

```html
<div class="grid">
  <div class="place-self-center">Item centered</div>
  <div class="place-self-end">Item at the end</div>
</div>
```

### Place items (align + justify)

```html
<div class="grid place-items-center">Center both</div>
<div class="grid place-items-start">Start both</div>
<div class="grid items-center justify-center">Equivalent</div>
```

### Grid placement (col/row span and start)

```html
<div class="grid grid-cols-4 gap-4">
  <div class="col-span-2">Spans 2 columns</div>
  <div class="col-start-3">Starts at col 3</div>
  <div class="row-span-2">Spans 2 rows</div>
  <div class="col-span-full">Full width</div>
</div>
```

## Key Points

- `grid` / `inline-grid` - Grid container (see layout-display)
- Columns: `grid-cols-{n}`, `grid-cols-none`, `grid-cols-subgrid`, `grid-cols-[...]`
- Rows: `grid-rows-{n}`, `grid-rows-[...]`
- Auto flow: `grid-flow-row`, `grid-flow-col`, `grid-flow-dense`
- Auto tracks: `auto-cols-*`, `auto-rows-*`
- Gap: `gap-{n}`, `gap-x-{n}`, `gap-y-{n}`
- Placement: `col-span-{n}`, `col-start-{n}`, `row-span-{n}`, `row-start-{n}`
- `col-span-full` / `row-span-full` - span all
- Alignment: `justify-items-*`, `justify-self-*`, `items-*`, `self-*`, `place-content-*`, `place-self-*`
- `place-items-*` - shorthand for align + justify
- Use `grid-cols-[...]` for custom templates like `minmax()` or `repeat()`

<!--
Source references:
- https://tailwindcss.com/docs/grid-template-columns
- https://tailwindcss.com/docs/grid-template-rows
- https://tailwindcss.com/docs/gap
- https://tailwindcss.com/docs/place-items
- https://tailwindcss.com/docs/grid-column
- https://tailwindcss.com/docs/grid-row
-->
