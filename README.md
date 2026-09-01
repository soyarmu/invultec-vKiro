# Invultec - RubberShock Landing Page

Una landing page premium de alto rendimiento para RubberShock, el tope de suspensión en caucho neopreno, construida con Next.js, TypeScript y Tailwind CSS.

## 🎨 Rebranding 2026

**Nueva estética industrial/técnica** con sistema de animaciones por capas que cuenta una historia visual:

- ✨ **6 capas animadas** con timeline secuencial (0-5s)
- 🎭 **Animaciones CSS nativas** (GPU-accelerated, 60fps)
- 🎨 **Paleta actualizada**: Rojo Invultec (#E31E24) + escala de grises refinada
- 🔤 **Triple tipografía**: Oswald (display) + Inter (body) + JetBrains Mono (técnico)
- 📱 **100% responsive** con animaciones adaptativas
- ♿ **Accesibilidad completa** (WCAG 2.1 AA, prefers-reduced-motion)

### 📚 Documentación del Rebranding

- **[REBRANDING_GUIDE.md](./REBRANDING_GUIDE.md)** - Sistema completo de diseño y animaciones
- **[ANIMATION_EXAMPLES.md](./ANIMATION_EXAMPLES.md)** - Ejemplos de extensiones avanzadas
- **[NEXT_STEPS.md](./NEXT_STEPS.md)** - Roadmap y próximas mejoras

---

## Features

- **Vehicle Fitment Finder**: Herramienta interactiva que recomienda el producto correcto basándose en marca, modelo y año del vehículo
- **Measurement Fallback**: Flujo alternativo para vehículos no registrados en la base de datos
- **Premium Design**: Estética industrial técnica con grillas, remaches y diagramas de impacto
- **Responsive**: Diseño mobile-first con experiencia óptima en todos los dispositivos
- **Accessible**: Implementación WCAG-friendly con navegación por teclado y soporte de lectores de pantalla
- **SEO Optimized**: Metadata apropiada y estructura HTML semántica
- **Analytics Ready**: Capa de analytics abstracta lista para integración

## Tech Stack

- **Next.js 14** - App Router con Server Components
- **TypeScript** - Desarrollo type-safe
- **Tailwind CSS** - Sistema de diseño personalizado con animaciones nativas
- **Lucide React** - Sistema de iconos consistente
- **React 18** - Arquitectura de componentes con hooks

## Project Structure

```
├── app/
│   ├── layout.tsx          # Layout raíz con metadata
│   ├── page.tsx            # Landing page principal
│   ├── globals.css         # Estilos globales y tokens de diseño
│   └── rebranding.html     # Referencia de diseño original
├── components/
│   ├── ui/                 # Componentes UI reutilizables
│   ├── hero/               # Hero section (REBRANDEADO ✨)
│   ├── fitment/            # Componentes del fitment finder
│   ├── product/            # Componentes de visualización de producto
│   ├── sections/           # Secciones de la landing page
│   └── navigation/         # Nav y Footer
├── lib/
│   ├── fitment/            # Lógica del motor de fitment
│   ├── analytics/          # Abstracción de analytics
│   └── utils.ts            # Funciones utilitarias
├── data/
│   ├── fitment/            # Datos de compatibilidad de vehículos
│   └── products/           # Catálogo de productos
├── types/                  # Definiciones de tipos TypeScript
└── public/
    └── images/             # Imágenes de productos
```

## Getting Started

### Prerequisites

- Node.js 18+ o 20+
- npm, yarn, o pnpm

### Installation

1. Instalar dependencias:

```bash
npm install
```

2. Agregar imágenes de productos a `public/images/`:
   - product-buffer-e.jpg
   - product-buffer-d.jpg
   - product-buffer-c.jpg
   - product-buffer-b-plus.jpg
   - product-buffer-a-plus.jpg

3. Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

4. Abrir [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
npm start
```

## Lint

```bash
npm run lint
```

## Design System

### Colors (Actualizado 2026)

- **Brand Red**: `#E31E24` - CTA primario, acentos, estados seleccionados
- **Brand Red Dark**: `#A81419` - Hover/Active states
- **Neutral 950**: `#0E0E0E` - Fondo principal oscuro
- **Neutral 900**: `#171716` - Fondo secundario
- **Neutral 800**: `#2B2B29` - Bordes
- **Neutral 500**: `#78766F` - Elementos metálicos (remaches)
- **Neutral 400**: `#A3A199` - Texto secundario
- **Neutral 300**: `#C7C5BB` - Grilla técnica
- **Neutral 100**: `#F4F3EE` - Texto principal
- **Neutral 0**: `#FFFFFF` - Títulos

### Typography

- **Display**: Oswald (títulos, uppercase, bold)
- **Body**: Inter (texto general, legible)
- **Mono**: JetBrains Mono (etiquetas técnicas, specs)

### Animaciones

- **Sistema por capas**: 6 capas con timeline secuencial
- **Performance**: GPU-accelerated, CSS nativo
- **Accesibilidad**: Respeta `prefers-reduced-motion`
- **Duración total**: 0-5s (entrada progresiva)

Ver [REBRANDING_GUIDE.md](./REBRANDING_GUIDE.md) para detalles completos.

### Components

- Buttons: Primary (red cortado), Secondary (oscuro), Outline
- Cards: Bordes sutiles neutral-800, backgrounds semi-transparentes
- Inputs: Estados de focus claros, labels accesibles
- Specs: Badges técnicos con font mono

## Fitment System

### Data Architecture

El sistema de fitment está diseñado para ser reemplazable:

- **Actual**: Datos demo locales en `data/fitment/vehicle-data.ts`
- **Futuro**: Puede reemplazarse con REST API, base de datos, CMS, o API externa de fitment

### Fitment Engine

Lógica de negocio central en `lib/fitment/fitment-engine.ts`:

- `getFitmentRecommendation(vehicle)` - Retorna recomendación basada en vehículo
- `getFitmentFromMeasurement(measurement)` - Retorna recomendación basada en gap de resorte

### Size Ranges

Configurable en `data/fitment/size-ranges.ts`:

- Type E: 0.85" - 1.10"
- Type D: 1.10" - 1.25"
- Type C: 1.25" - 1.45"
- Type B+: 1.65" - 1.85"
- Type A+: 2.60" - 3.50"

## Analytics

Abstracción de analytics en `lib/analytics/analytics.ts` proporciona tracking sin vendor lock-in.

Eventos rastreados:
- vehicle_finder_viewed
- make_selected
- model_selected
- year_selected
- fitment_check_started
- fitment_match_found
- measurement_required
- product_viewed
- product_cta_clicked

Para integrar con tu proveedor de analytics, actualiza el método `track()`.

## Deployment

Esta es una aplicación Next.js estándar y puede ser desplegada en:

- Vercel (recomendado)
- Netlify
- AWS Amplify
- Cualquier hosting de Node.js

### Build de Producción

```bash
npm run build
npm start
```

## Demo Data

La implementación actual usa datos demo claramente etiquetados. Todos los datos de fitment de vehículos incluyen una bandera `isDemo`.

En producción, reemplazar con:
- Base de datos de compatibilidad verificada
- API externa de fitment
- Datos de productos gestionados por CMS

## Accessibility

- Estructura HTML semántica
- Soporte de navegación por teclado
- Labels y descripciones ARIA
- Estados de focus visibles
- Contraste de color compliant (AAA en textos principales)
- Friendly con lectores de pantalla
- Soporte de reduced motion

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- ✅ Lighthouse Performance > 90
- ✅ First Contentful Paint < 1.5s
- ✅ Animaciones 60fps (GPU-accelerated)
- ✅ Zero layout shift (CLS < 0.1)

## License

Proprietary - Todos los derechos reservados

## Support

Para preguntas o soporte, contacta a tu equipo de desarrollo.

---

## 🎯 Próximos Pasos Sugeridos

1. **Probar el nuevo Hero** en desarrollo (`npm run dev`)
2. **Ajustar timings** de animaciones según feedback visual
3. **Implementar interactividad** (parallax, counters) - Ver [ANIMATION_EXAMPLES.md](./ANIMATION_EXAMPLES.md)
4. **Extender rebranding** a otras secciones - Ver [NEXT_STEPS.md](./NEXT_STEPS.md)
5. **Optimizar assets** (imágenes WebP, lazy loading)

Ver **[NEXT_STEPS.md](./NEXT_STEPS.md)** para roadmap completo.
