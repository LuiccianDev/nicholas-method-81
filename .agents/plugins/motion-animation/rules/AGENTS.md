# Motion Animation Guidelines

1. **Importación Oficial:**
   - Usar siempre `import { motion, AnimatePresence } from 'motion/react'`.
2. **Accesibilidad y Movimiento Reducido:**
   - Respetar las preferencias de accesibilidad del usuario integrando el hook `usePrefersReducedMotion`.
3. **Layout Animations:**
   - Utilizar `layout` o `layoutId` para transiciones fluidas de posición y tamaño entre elementos compartidos.
