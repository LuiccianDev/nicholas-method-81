# Tailwind CSS v4 Guidelines

1. **Tokens Oficiales en `@theme`:**
   - Todos los colores personalizados deben usar la sintaxis oficial `--color-*` en `src/styles/index.css`.
   - No inventar clases no definidas ni aplicar `font-family` o estilos en línea directamente en el JSX.
2. **Prettier Tailwind Plugin:**
   - Mantener el ordenamiento automático de clases ejecutando siempre `pnpm format` después de cada cambio.
3. **Responsive Design:**
   - Utilizar el enfoque Mobile-First (`sm:`, `md:`, `lg:`, `xl:`) y estados interactivos (`hover:`, `focus-visible:`, `active:`).
