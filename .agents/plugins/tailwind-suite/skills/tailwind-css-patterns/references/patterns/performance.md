# Tailwind CSS Performance Optimization

In v4 the tree-shaking is **automatic and built-in**: Tailwind scans your sources and only generates the CSS for the classes it finds. Minification and prefixing are handled by Lightning CSS under the hood.

Source: [Detecting classes in source files](https://tailwindcss.com/docs/detecting-classes-in-source-files) and [Installation with Vite](https://tailwindcss.com/docs/installation/using-vite).

## Rules That Affect Bundle Size

### 1. Write Complete Class Names

The scanner only sees literal strings. Dynamically constructed classes are lost in production:

```tsx
// ❌ NOT detected in production
<div className={`bg-${color}-500`} />

// ✅ Detected
<div className="bg-blue-500" />
```

If you need dynamic variants, list the complete classes or use `@utility` with functional values.

### 2. Prefer Theme Tokens over Arbitrary Values

Arbitrary values (`bg-[#123456]`) are generated one at a time and are not reused. Define tokens in `@theme` so they are shared across utilities:

```css
@theme {
  --color-brand: oklch(0.62 0.21 259.8);
}
```

### 3. Avoid Overusing `@apply`

`@apply` works in v4, but it duplicates styles and makes analysis harder. Compose utilities directly in the markup; use `@utility` when you need to reuse a named piece of logic.

### 4. Use `@source` Only When Needed

v4 detects your content roots automatically. Only add `@source` for non-conventional roots (UI libraries, files outside the project):

```css
@source "../node_modules/@my-company/ui-lib";
```

### 5. Be Careful with Third-Party Plugins

Each `@plugin` can add CSS. Only load the ones you use (e.g. `@plugin "@tailwindcss/typography";`).

## Render Optimization (CSS)

`aspect-video`/`aspect-*` reserves media space and avoids layout shift:

```html
<img class="aspect-video w-full object-cover" src="video.jpg" alt="Video thumbnail" />
```

`content-visibility` is NOT a built-in utility in v4; define it with `@utility` if you need it:

```css
@utility content-visibility-auto {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
}
```

```html
<div class="content-visibility-auto">
  <div>Heavy content that's initially offscreen</div>
</div>
```

## Build Optimization

- **Vite**: the dev server hot-recompiles and only re-emits what changed; use `npm run dev` to iterate and `npm run build` for the production bundle.
- **CLI**: for projects without a bundler, `npx @tailwindcss/cli -i ./src/input.css -o ./dist/output.css --watch`. In watch mode, `--poll[=ms]` helps when the filesystem does not emit reliable events.
- **Source maps**: enable `source map` in production if you need to debug the final CSS.

Source: [Tailwind CLI](https://tailwindcss.com/docs/installation/tailwind-cli).

## Best Practices for Performance

1. Write complete, literal class names (no interpolation)
2. Prefer `@theme` tokens over arbitrary values
3. Compose utilities in the markup; use `@utility` only for named reusable logic
4. Add `@source` only for non-conventional roots
5. Load only the plugins you actually use
6. Review the final generated CSS if you suspect something extra slipped in (Lightning CSS already minifies it)