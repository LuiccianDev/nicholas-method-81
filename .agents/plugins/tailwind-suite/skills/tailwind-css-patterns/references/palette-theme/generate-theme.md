---
name: palette-theme
description: Generates a Tailwind CSS v4 @theme block with correct semantic tokens (primary, secondary, accent, background, card, border, ring, text, text-muted, foreground, success, warning, danger) from a user-provided color palette. Use whenever the user mentions colors, a palette, @theme, or pastes a Color Hunt, Coolors, Radix Colors or other palette-generator link — any mention of defining/mapping colors for Tailwind v4 should trigger this. Prioritizes official v4 syntax (--color-* prefix, never --text-* for colors) and token names paired with their usage utility.
---

# Tailwind Palette Theme

Generates a ready-to-paste Tailwind v4 `@theme` block with correct semantic tokens from the colors the user provides. Follows the official [theme variables](https://tailwindcss.com/docs/theme) syntax of Tailwind CSS v4.3.

## Correct @theme variable creation (v4)

Source: [Theme variables](https://tailwindcss.com/docs/theme) and [Theme variable namespaces](https://tailwindcss.com/docs/theme#theme-variable-namespaces).

All design tokens live in CSS, inside an `@theme` block placed after `@import "tailwindcss"` (CSS-first: there is no `tailwind.config.js`). Every variable you define becomes a utility, a variant, or both depending on its namespace.

### Namespaces and what they generate

| Namespace | Example | What it generates |
| --- | --- | --- |
| `--color-*` | `--color-primary` | All color utilities at once: `bg-*`, `text-*`, `border-*`, `ring-*`, `outline-*`, `divide-*`, `placeholder-*`, `caret-*`, `accent-*`, `fill-*`, `stroke-*`, `decoration-*`, `from-*`/`via-*`/`to-*` (gradients) and `shadow-*`. Do not repeat the color in each utility. |
| `--font-*` | `--font-display` | `font-*` (font-family) |
| `--font-weight-*` | `--font-weight-bold` | `font-*` (font-weight) |
| `--text-*` | `--text-2xl` | `text-*` = **font-size + line-height** (typographic scale — NOT color) |
| `--tracking-*` | `--tracking-wide` | `tracking-*` (letter-spacing) |
| `--leading-*` | `--leading-relaxed` | `leading-*` (line-height) |
| `--breakpoint-*` | `--breakpoint-3xl` | responsive variants (`3xl:`) |
| `--container-*` | `--container-md` | `max-w-*` (container scale) |
| `--spacing-*` | `--spacing-18` | named spacing steps (the default scale is derived from the `--spacing` multiplier) |
| `--radius-*` | `--radius-lg` | `rounded-*` |
| `--shadow-*` | `--shadow-lg` | `shadow-*` |
| `--inset-shadow-*` | `--inset-shadow-sm` | `inset-shadow-*` |
| `--drop-shadow-*` | `--drop-shadow-md` | `drop-shadow-*` |
| `--blur-*` | `--blur-md` | `blur-*` |
| `--perspective-*` | `--perspective-distant` | `perspective-*` |
| `--aspect-*` | `--aspect-video` | `aspect-*` |
| `--ease-*` | `--ease-in-out` | `ease-*` |
| `--animate-*` | `--animate-spin` | `animate-*` |

### Rules for variable names

1. Always use the `--` prefix with kebab-case: `--color-primary`, `--font-display`.
2. Never leave spaces or trailing spaces: `--border-primary ` (with a trailing space) is invalid and silently breaks the token.
3. **`--text-*` is the typographic scale (size/line-height) — never a color.** `--text-primary` would generate a font size, not a color. The correct text color token is `--color-text`.
4. **`--border-*` is not a color namespace.** The correct border color token is `--color-border`.

### Rules for values

1. `--color-*` accepts hex (`#5eb996`), OKLCH (`oklch(0.65 0.2 250)`), or any CSS color; the v4 default theme uses OKLCH.
2. Write values directly, without `var()`. If a token references another variable, use `@theme inline` so the utility receives the *value* instead of a nested `var()` reference.
3. `--*: initial` inside `@theme` replaces the entire default theme so only your tokens are generated (100% custom palette).
4. Opacity modifiers (`bg-primary/50`) work with any color format in v4 (they compile to native `color-mix()`).

## Value format: OKLCH recommended

Source: [Theme variables — default theme](https://tailwindcss.com/docs/theme#default-theme-variables) and `node_modules/tailwindcss/theme.css`.

The v4 default theme defines its colors in **OKLCH** (e.g. `--color-red-500: oklch(0.637 0.237 25.331)`). Prefer OKLCH for manual tokens when the user does not bring hex values: it is more perceptually uniform and mixes better with `color-mix()`.

- If the user provides **hex** values (Color Hunt, Coolors, etc.), use them directly: they are valid (`--color-black: #000` and `--color-white: #fff` are also hex in the default theme).
- Opacity modifiers (`bg-primary/50`) work with any format in v4 (they use native `color-mix()`).

## Process

1. **Get the hex values.** If they come from a Color Hunt URL (`colorhunt.co/palette/xxxxxxxxxxxx`), the concatenated characters of the URL are the hex values without `#`, in groups of 6. Coolors works similarly. For Radix or any dynamically generated tool, ask for the exported values directly (fetch does not return hex from tools that generate via JS).
2. **Assign roles** following this guide (adjust with judgment if the user hints which color is which):
   - `primary`: the most saturated/dominant → CTAs, links, focus.
   - `secondary`: the second most neutral/soft → secondary buttons, tags.
   - `accent`: the most eye-catching or distinct → badges, highlights, notifications.
   - `background`: the lightest/pastel → general background.
   - `card`: pure white `#ffffff` unless the user asks for something else → card/elevated surface backgrounds.
   - `border`: one of the soft palette colors → borders, dividers.
   - `text`: a warm or cool dark that matches the palette (never pure black `#000`) → primary text.
   - `text-muted`: a lighter variant of `text` → secondary text.
   - `*-foreground`: the text color that sits on top of its surface (see contrast).
3. **Generate the full token set** (use the ones that apply to the case):

   ```css
   @theme {
     /* Colors + their "foreground" variant */
     --color-primary: #5eb996;
     --color-primary-foreground: #ffffff;
     --color-secondary: #e8cb6b;
     --color-secondary-foreground: #2b2420;
     --color-accent: #ffb6a6;
     --color-accent-foreground: #2b2420;

     /* Surfaces */
     --color-background: #fffdf9;
     --color-card: #ffffff;
     --color-card-foreground: #2b2420;
     --color-popover: #ffffff;
     --color-popover-foreground: #2b2420;

     /* Structure */
     --color-border: #e2ddd3;
     --color-ring: #5eb996;

     /* Text */
     --color-text: #2b2420;
     --color-text-muted: #6b5d55;

     /* Status */
     --color-success: #2f9e5f;
     --color-warning: #d9a514;
     --color-danger: #d64545;

     /* Hover/active (optional) */
     --color-primary-hover: #4da284;
     --color-primary-active: #448d75;
   }
   ```

4. **Output: ONLY the CSS block** (no table or extra explanation unless the user asks for it).

## Dark mode (correct in v4)

Source: [Dark mode](https://tailwindcss.com/docs/dark-mode).

For class-based dark mode, define the official variant with `@custom-variant` and then **override the variables** in a `.dark` block after the `@theme` (do not duplicate the `@theme` block inside `.dark`). Utilities read `var(--color-*)`, so overriding the variables changes all colors at once:

```css
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* light tokens (see above) */
}

.dark {
  color-scheme: dark;
  --color-background: #0a0104;
  --color-primary: #b95e82;
  --color-primary-foreground: #ffffff;
  --color-secondary: #ffc29b;
  --color-secondary-foreground: #2b2420;
  --color-card: #18050e;
  --color-card-foreground: #ffecc0;
  --color-border: #300c1c;
  --color-ring: #b95e82;
  --color-text: #ffecc0;
  --color-text-muted: #dec9a4;
}
```

Adjust the dark values with more contrast between surfaces and text. `color-scheme: dark` in `.dark` makes native controls (scrollbars, inputs) follow the mode.

## Contrast (WCAG)

Source: [Colors](https://tailwindcss.com/docs/colors).

The `*-foreground` values must be decided by **contrast ratio** (WCAG: 4.5:1 for normal text, 3:1 for large text/UI):

- Dark `primary` → light `primary-foreground` (white or pastel).
- Light/pastel `primary` → dark `primary-foreground` (never white).
- Very light (pastel) `background` → warm/cool dark `text` matching the palette, never pure black.

Rule of thumb: same approach for `card-foreground`, `popover-foreground` and `secondary-foreground` depending on the color of their surface.

## Theme reuse and scaling

Source: [Theme variables — customizing your theme](https://tailwindcss.com/docs/theme#customizing-your-theme).

- **`@theme inline`**: when a token references another variable (brand reuse), use `inline` so the utility uses the *value* instead of a nested reference:

  ```css
  @theme inline {
    --color-primary: var(--color-brand-500);
    --color-primary-foreground: var(--color-white);
  }
  ```

- **`@theme static`**: always emits ALL variables in the output CSS (by default only the ones used are generated):

  ```css
  @theme static {
    --color-primary: var(--color-red-500);
  }
  ```

- **`--*: initial`**: to fully replace the default theme and use only your tokens (100% custom palette):

  ```css
  @theme {
    --*: initial;
    --color-lagoon: oklch(0.72 0.11 221.19);
    --color-dusk: oklch(0.82 0.15 72.09);
  }
  ```

- **Sharing tokens across projects**: define the tokens in their own `theme.css` file and `@import` it where needed (ideal for reusable design systems):

  ```css
  @import "tailwindcss";
  @import "./theme.css";
  ```

## How they are used (correct names)

- `bg-primary text-primary-foreground hover:bg-primary-hover` → primary button.
- `bg-secondary text-secondary-foreground` → secondary button/tag.
- `bg-card text-card-foreground border border-border` → card.
- `bg-background text-text` → global background and text.
- `text-text-muted` → secondary text.
- `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring` → accessible focus.
- `text-danger border-danger bg-danger/10` → error states.
- `bg-primary/10 text-primary` → "primary" badge/signal on a soft background.

## Before writing tokens into an existing project

- Review the project's global CSS (e.g. `src/styles/index.css`) before generating: if a `@theme` already exists, add/merge the tokens without duplicating keys and respect the existing `@custom-variant dark`.
- Do not invent or change business values; only map the colors of the palette the user provided.
- If the project integrates with Vite (including Astro), the setup is already the official [Vite installation](https://tailwindcss.com/docs/installation/using-vite): the `@tailwindcss/vite` plugin + `@import "tailwindcss"` in the CSS. All configuration lives in CSS (CSS-first).

## Sources

- [Theme variables](https://tailwindcss.com/docs/theme) — namespaces, `@theme inline`/`static`, `--*: initial`, default theme.
- [Colors](https://tailwindcss.com/docs/colors) — color system and opacity.
- [Dark mode](https://tailwindcss.com/docs/dark-mode) — the `@custom-variant dark` variant.
- [Functions and directives](https://tailwindcss.com/docs/functions-and-directives) — `@theme`, `@custom-variant`, `@import`.
- [Installation with Vite](https://tailwindcss.com/docs/installation/using-vite) — project setup.
- [Official repo tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss) — `theme.css` (default tokens) and releases.