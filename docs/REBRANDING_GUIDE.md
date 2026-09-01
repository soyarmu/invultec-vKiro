# Guía de Rebranding - Invultec Hero Section

## 🎨 Resumen del Rebranding

Se ha implementado un nuevo diseño industrial y técnico para la sección Hero de la landing page, basado en el archivo `rebranding.html`. El nuevo diseño presenta:

- **Estética industrial/técnica** con grillas, remaches y diagramas de impacto
- **Animaciones secuenciales** de 5 segundos que cuentan una historia visual
- **Tipografía mejorada** con tres familias: Oswald (display), Inter (body), JetBrains Mono (mono)
- **Paleta de colores actualizada** basada en el rojo Invultec (#E31E24) y escala de grises

---

## 🎬 Sistema de Animaciones por Capas

El Hero está construido en **6 capas** que se animan secuencialmente:

### Timeline de Animaciones (0-5s)

```
0s ──────── 1s ──────── 2s ──────── 3s ──────── 4s ──────── 5s
│           │           │           │           │           │
├─ Fondo    │           │           │           │           │
├─ Contenido│           │           │           │           │
│           ├─ Producto │           │           │           │
│           │           ├─ Impacto  │           │           │
│           │           │           ├─ Grid     │           │
│           │           │           ├─ Ticks    │           │
```

### Capa 1: Background (0-1s)
**Animación:** `bgIn` - Fade in suave
- Gradiente diagonal oscuro (neutral-900 → neutral-950)
- Textura diagonal "steel-plate seam"
- 6 remaches metálicos en las esquinas

### Capa 2: Technical Grid (3-4s)
**Animación:** `gridIn` - Fade in tardío
- Patrón de grilla técnica semi-transparente
- Aparece después del producto para no distraer

### Capa 3: Impact Diagram (2-3s)
**Animación:** `impactIn` + `ringPulse` continuo
- 3 anillos concéntricos pulsantes (rojo #E31E24)
- Líneas de cruz (crosshair)
- Etiqueta de medición "-2.7 CM"
- Posicionado a la derecha en desktop, centro en mobile

### Capa 4: Product (1-2s)
**Animación:** `productIn` + `idleFloat` continuo
- Ilustración SVG del RubberShock
- Entrada desde la derecha con scale
- Flotación sutil infinita después de entrar
- Drop shadow dramático

### Capa 5: Measurement Ticks (3-4s)
**Animación:** `tickIn` con delays escalonados
- 4 etiquetas técnicas: "RS-001", "95% ABS.", "+2.7CM", "NEOPRENO"
- Fuente monospace
- Delays individuales (3.1s, 3.3s, 3.5s, 3.7s)

### Capa 6: Content (0-1s)
**Animación:** `contentIn` - Fade + slide up temprano
- Contenido textual principal
- Entra primero para legibilidad inmediata

---

## 🎨 Sistema de Colores

### Paleta Principal
```css
--brand-red:          #E31E24  /* Rojo Invultec */
--brand-red-dark:     #A81419  /* Hover/Active */

--neutral-950:        #0E0E0E  /* Fondo principal */
--neutral-900:        #171716  /* Fondo secundario */
--neutral-800:        #2B2B29  /* Bordes */
--neutral-500:        #78766F  /* Remaches */
--neutral-400:        #A3A199  /* Texto secundario */
--neutral-300:        #C7C5BB  /* Grilla técnica */
--neutral-100:        #F4F3EE  /* Texto principal */
--neutral-0:          #FFFFFF  /* Texto títulos */
```

### Uso en Tailwind
```tsx
bg-neutral-950        // Fondo oscuro
text-neutral-100      // Texto claro
text-brand-red        // Acentos rojos
border-neutral-800    // Bordes sutiles
```

---

## 🔤 Tipografía

### Familias de Fuentes
```css
--font-display:  'Oswald'         → font-display
--font-body:     'Inter'          → font-sans
--font-mono:     'JetBrains Mono' → font-mono
```

### Aplicación
- **Títulos principales:** `font-display` (Oswald, uppercase, bold)
- **Cuerpo de texto:** `font-sans` (Inter)
- **Etiquetas técnicas:** `font-mono` (JetBrains Mono, tracking amplio)

---

## ⚙️ Personalización de Animaciones

### Deshabilitar Animaciones
Las animaciones respetan `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  /* Todas las animaciones se deshabilitan automáticamente */
}
```

### Modificar Timing
Editar en `tailwind.config.ts`:
```typescript
animation: {
  'bg-in': 'bgIn 1.1s ease-out forwards',        // Ajustar duración
  'product-in': 'productIn 1s cubic-bezier(...)', // Ajustar curva
  'idle-float': 'idleFloat 6s ease-in-out infinite', // Ajustar velocidad
}
```

### Ajustar Delays
En el componente `Hero.tsx`:
```typescript
// Ticks delays
{ label: 'RS-001', delay: '3.1s' },  // Modificar aquí
{ label: '95% ABS.', delay: '3.3s' },
```

---

## 📐 Layout Responsivo

### Desktop (≥1024px)
- Grid 2 columnas: contenido (1.05fr) | producto (0.95fr)
- Impact diagram a la derecha
- Producto y diagrama visibles simultáneamente

### Tablet/Mobile (<1024px)
- Grid 1 columna, stack vertical
- Contenido primero, producto después
- Impact diagram centrado en top 62%
- Fuentes más pequeñas vía `clamp()`

### Breakpoints CSS
```css
@media (max-width: 1024px) {
  .layer-impact {
    right: 50%;
    top: 62%;
    transform: translate(50%, -50%) scale(0.85);
  }
}
```

---

## 🚀 Extensiones Futuras

### Interactividad
1. **Parallax con mouse:**
   ```typescript
   useEffect(() => {
     const handleMouseMove = (e: MouseEvent) => {
       const x = (e.clientX / window.innerWidth - 0.5) * 20;
       const y = (e.clientY / window.innerHeight - 0.5) * 20;
       // Aplicar transform a layers
     };
   }, []);
   ```

2. **Scroll-triggered animations:**
   - Usar `IntersectionObserver` o `framer-motion`
   - Activar animaciones cuando el hero entra en viewport

3. **3D transforms:**
   - Agregar `perspective` al producto
   - Rotación 3D con mouse tracking

### Animaciones Adicionales
1. **Partículas flotantes** en layer grid
2. **Glitch effect** en título (opcional, según marca)
3. **Counter animado** en specs (+2.7cm, 95%, 5min)
4. **Typewriter effect** en subhead

---

## 🎯 Notas de Implementación

### Tecnologías Usadas
- **React 18** (con hooks)
- **Next.js 14** (App Router)
- **Tailwind CSS** (animaciones nativas)
- **SVG inline** (para control total)

### Performance
- ✅ Animaciones CSS (GPU-accelerated)
- ✅ SVG inline (sin HTTP requests adicionales)
- ✅ `useEffect` solo para setup inicial (no re-renders)
- ✅ Clases Tailwind (CSS compilado, no JS runtime)

### Accesibilidad
- ✅ `prefers-reduced-motion` respetado
- ✅ Estructura semántica (`<section>`, `<h1>`, etc.)
- ✅ Contraste de color AAA compliant
- ✅ Focus visible en botón CTA

---

## 📝 Checklist de QA

- [ ] Animaciones ejecutan en orden correcto (0-5s)
- [ ] Producto "flota" suavemente después de entrar
- [ ] Anillos de impacto pulsan infinitamente
- [ ] Remaches visibles en esquinas
- [ ] Grilla técnica semi-transparente
- [ ] Ticks aparecen escalonados
- [ ] Responsive en mobile (stack vertical)
- [ ] Botón scroll to finder funciona
- [ ] `prefers-reduced-motion` deshabilita animaciones
- [ ] No hay errores en consola

---

## 🔗 Archivos Relevantes

```
/app/globals.css                  → Fuentes y CSS base
/tailwind.config.ts               → Colores, animaciones, keyframes
/components/hero/Hero.tsx         → Componente Hero nuevo
/app/rebranding.html              → Referencia original (HTML)
```

---

## 📞 Soporte

Para ajustes o extensiones, modificar:
1. **Colores:** `tailwind.config.ts` → `colors.brand`
2. **Animaciones:** `tailwind.config.ts` → `animation` y `keyframes`
3. **Contenido:** `components/hero/Hero.tsx` → JSX markup
4. **Timing:** `Hero.tsx` → delays inline o animation classes

---

**Versión:** 1.0  
**Última actualización:** 2026-08-19  
**Autor:** Armando Bermúdez  
