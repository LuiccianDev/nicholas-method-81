# Tailwind CSS Responsive Design & Dark Mode

## Responsive Design Patterns

Source: [Responsive design](https://tailwindcss.com/docs/responsive-design).

### Mobile-First Responsive Layout

```html
<div class="container mx-auto px-4">
  <!-- Hero Section -->
  <div class="flex flex-col md:flex-row items-center gap-8 py-12">
    <div class="flex-1">
      <h1 class="text-3xl md:text-5xl font-bold mb-4">
        Welcome to Our Site
      </h1>
      <p class="text-lg text-gray-600 mb-6">
        Build amazing things with Tailwind CSS
      </p>
      <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        Get Started
      </button>
    </div>
    <div class="flex-1">
      <img src="hero.jpg" class="w-full rounded-lg shadow-lg" />
    </div>
  </div>
</div>
```

### Responsive Grid Gallery

```html
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
  <div class="aspect-square bg-gray-200 rounded-lg overflow-hidden">
    <img src="image1.jpg" class="w-full h-full object-cover hover:scale-105 transition" />
  </div>
  <div class="aspect-square bg-gray-200 rounded-lg overflow-hidden">
    <img src="image2.jpg" class="w-full h-full object-cover hover:scale-105 transition" />
  </div>
  <!-- More items... -->
</div>
```

### Responsive Card Component

```tsx
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden
                    sm:flex sm:max-w-2xl">
      <img
        className="h-48 w-full object-cover sm:h-auto sm:w-48"
        src={product.image}
        alt={product.name}
      />
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {product.name}
        </h3>
        <p className="mt-2 text-gray-600">
          {product.description}
        </p>
        <button className="mt-4 px-4 py-2 bg-indigo-600 text-white
                          rounded-lg hover:bg-indigo-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
```

### Breakpoints (rem)

| Prefix | Min Width | px (at 16px) |
|--------|-----------|-------------|
| `sm:` | 40rem | 640px |
| `md:` | 48rem | 768px |
| `lg:` | 64rem | 1024px |
| `xl:` | 80rem | 1280px |
| `2xl:` | 96rem | 1536px |

Customize or add breakpoints in `@theme` (`--breakpoint-3xl: 120rem`). Use `max-*:` for ranges (desktop only), `min-[...]:` for a one-off, and `@min-*:` for container queries.

**Note (v4.2):** the `start-*`/`end-*` utilities were deprecated in favor of `inset-s-*`/`inset-e-*` (logical properties). Do not use them in new code.

## Dark Mode

Source: [Dark mode](https://tailwindcss.com/docs/dark-mode).

The `dark` variant is defined in CSS with `@custom-variant`:

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));
```

### Basic Dark Mode Support

```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <h1 class="text-gray-900 dark:text-white">Title</h1>
  <p class="text-gray-600 dark:text-gray-400">Description</p>
</div>
```

### Dark Mode with Custom Tokens

Define the light values in `@theme` and override the variables in `.dark` (this changes all utilities that use them at once):

```css
.dark {
  color-scheme: dark;
  --color-background: #0a0104;
  --color-text: #ffecc0;
  --color-border: #300c1c;
}
```

### Dark Mode Toggle (React)

```tsx
function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800"
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
}
```

### Dark Mode Best Practices

1. **Use semantic color names**: Instead of `bg-white` use `bg-surface` custom color
2. **Test with real content**: Some colors look good in light but not in dark
3. **Respect system preference**: To respect the system without a toggle, use `@media (prefers-color-scheme: dark)` as the base selector or combine it with the initial detection in JS
4. **Smooth transitions**: Add transition utilities for theme changes

```css
/* Global transition for theme changes */
* {
  @apply transition-colors duration-200;
}
```

## Container Queries (v4)

Component that responds to its container size, not viewport:

```html
<div class="@container">
  <div class="@lg:text-xl @2xl:text-2xl">
    Text size based on container, not viewport
  </div>
</div>
```

Usage in a card component:

```html
<div class="@container w-full">
  <div class="flex flex-col @[400px]:flex-row gap-4">
    <img class="w-full @[400px]:w-32 h-32 object-cover" src="image.jpg" />
    <div>
      <h3 class="text-base @[400px]:text-lg font-bold">Title</h3>
      <p class="text-sm @[400px]:text-base">Description</p>
    </div>
  </div>
</div>
```

**Note (v4.3):** the `@container-size` utility forces the container to be of `size` type (also responds to height) instead of the default `inline-size`.

Source: [Container queries](https://tailwindcss.com/docs/container-queries).