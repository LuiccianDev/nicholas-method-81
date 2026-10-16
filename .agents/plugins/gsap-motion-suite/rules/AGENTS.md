# Animation Guidelines — GSAP & Motion

1. **Uso de `useGSAP` en React:**
   - Envolver siempre las animaciones GSAP dentro del hook `useGSAP(() => { ... }, { scope: containerRef })` para garantizar el cleanup automático al desmontar componentes.
2. **Transformaciones en vez de geometría:**
   - Preferir siempre `x`, `y`, `xPercent`, `yPercent`, `scale`, `opacity`, `rotation`.
   - NUNCA animar `top`, `left`, `width` o `height` directamente para evitar recalcular el layout (layout thrashing).
3. **ScrollTrigger:**
   - Declarar siempre `markers: false` en producción.
   - Refrescar ScrollTrigger si el DOM cambia dinámicamente (`ScrollTrigger.refresh()`).
4. **Motion (motion/react):**
   - Utilizar `motion` para animaciones declarativas de entrada/salida (`AnimatePresence`) y transiciones de diseño compartidas (`layoutId`).
