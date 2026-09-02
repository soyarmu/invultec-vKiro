# SPEC 00: Arquitectura Base, Stack Tecnológico y Estructura Frontend (HTML/JS)

**State:** Implementado  
**Date:** 2026-08-18  
**Objective:** Definir la arquitectura fundamental, la pila tecnológica, la maquetación HTML/React y la capa lógica JavaScript/TypeScript para la landing page interactiva de Invultec Rubber Shock RS-001.

---

## 1. Scope

### In Scope
- **Stack Tecnológico Base**:
  - Next.js 14 App Router, React 18, TypeScript 5.4, Tailwind CSS 3.4 y Lucide Icons.
- **Estructura y Maquetación HTML Semántica**:
  - Documento base (`app/layout.tsx`) con etiquetas semánticas (`<html lang="es">`, `<body>`, `<main>`, `<header>`, `<footer>`, `<section>`).
  - Metadatos SEO, OpenGraph, Twitter Cards y configuración de viewport.
- **Sistema de Diseño y Estilos**:
  - Configuración del tema corporativo en `tailwind.config.ts` (Rojo Carmesí `#C0262D`, Tonos Oscuros/Black `#0A0A0A`, Grises `#71727A` y Neutrales).
  - Estilos globales (`app/globals.css`) con scroll suave (`scroll-smooth`) y reseteo de márgenes/paddings.
- **Jerarquía de Componentes UI (React Component Tree)**:
  - Primitivas UI reusables (`components/ui/`): Button, Input, Select, Badge.
  - Componentes de navegación (`components/navigation/`): Navbar (fijo con blur) y Footer.
  - Secciones principales (`components/sections/` y `components/hero/`): Hero, FitmentFinderSection, WhyThisProduct, HowItWorks, MeasurementGuide, Trust, FAQ, FinalCTA.
  - Módulo interactivode búsqueda vehicular (`components/fitment/`): VehicleFitmentFinder, VehicleSelector, MeasurementInput, FitmentResult, ConfidenceBadge y LeadCaptureForm.
- **Capa Lógica JavaScript / TypeScript**:
  - Motor de compatibilidad vehicular (`lib/fitment/fitment-engine.ts`) para determinación automática de tamaño de producto (Tipos A+, B+, C, D, E) según marca, modelo y año.
  - Manejo de estado cliente (`use client`) para selección dinámica en cascada (Marca → Modelo → Año) y visualización de resultados.
  - Utilidad de combinación de clases CSS (`lib/utils.ts`) usando `clsx` y `tailwind-merge`.
- **Modelos de Datos y Datasets**:
  - Tipado estricto en `types/fitment.ts` (`Vehicle`, `Product`, `FitmentRecommendation`, `FitmentData`).
  - Datasets estáticos en `data/vehicles.json`, `data/products/products.ts`, `data/fitment/vehicle-data.ts` y `data/fitment/size-ranges.ts`.

### Out of Scope
- Gestión o persistencia de base de datos relacional (manejado en SPEC 01 y SPEC 04).
- Autenticación o roles de usuario en el frontend.
- Pasarela de pagos o procesamiento transaccional en línea.

---

## 2. Tech Stack & Dependencies

| Tecnología | Versión | Uso / Propósito |
| :--- | :--- | :--- |
| **Next.js** | `^14.2.0` | Framework React con App Router, SSR/SSG y optimización de assets |
| **React / React DOM** | `^18.3.1` | Librería UI para renderización de componentes basada en hooks |
| **TypeScript** | `^5.4.0` | Lenguaje de programación con tipado estricto |
| **Tailwind CSS** | `^3.4.0` | Framework CSS utilitario para estilizado responsivo |
| **Lucide React** | `^0.378.0` | Set de iconos vectoriales ligeros para UI automotriz e industrial |
| **@supabase/supabase-js**| `^2.112.4`| Cliente BaaS para integración con la base de datos |
| **clsx & tailwind-merge**| `^2.1.1` / `^2.3.0` | Utilidad de fusión condicional de clases CSS sin solapamiento |

---

## 3. Architecture & HTML Layout Hierarchy

### Estructura de Directorios del Proyecto

```
invultec-vKiro/
├── app/                      # Next.js App Router
│   ├── api/                  # Endpoints de API server-side (leads, health)
│   ├── globals.css           # Importaciones de Tailwind y estilos globales
│   ├── layout.tsx            # Root Layout HTML con SEO y Metadata
│   └── page.tsx              # Landing Page principal
├── components/               # Componentes UI divididos por dominio
│   ├── fitment/              # Flujo interactivo de búsqueda vehicular y lead form
│   ├── hero/                 # Banner Hero principal
│   ├── navigation/           # Navbar superior y Footer
│   ├── product/              # Tarjetas de visualización de producto
│   ├── sections/             # Secciones informativas de la landing page
│   └── ui/                   # Primitivas reutilizables (Button, Input, Select, Badge)
├── data/                     # Datasets de vehículos, tamaños y productos
│   ├── fitment/              # Rangos de espira y base vehicular
│   └── products/             # Catálogo de productos Rubber Shock (RS-001)
├── lib/                      # Lógica de negocio e integraciones
│   ├── analytics/            # Tracking e indicadores
│   ├── fitment/              # Motor de cálculo de compatibilidad
│   ├── supabase.ts           # Cliente configurado de Supabase
│   └── utils.ts              # Utilidad cn() para clases Tailwind
├── types/                    # Tipos e interfaces TypeScript
└── specs/                    # Especificaciones del sistema (00-05)
```

### Árbol de Componentes HTML/JSX (`app/page.tsx`)

```
RootLayout (app/layout.tsx) [<html lang="es">]
└── div.min-h-screen
    ├── Navbar (header fijo superior con navegación suavizada)
    ├── main.pt-16.sm:pt-20
    │   ├── Hero (propuesta de valor inicial y llamados a la acción)
    │   ├── FitmentFinderSection (#fitment-finder)
    │   │   └── VehicleFitmentFinder (contenedor de estado interactivo)
    │   │       ├── VehicleSelector (dropdowns dinámicos: Marca → Modelo → Año)
    │   │       ├── MeasurementInput (entrada de medida manual opcional en mm/pulgadas)
    │   │       ├── FitmentResult (tarjeta con resultado y tipo A+/B+/C/D/E)
    │   │       │   └── ConfidenceBadge (indicador visual de precisión)
    │   │       └── LeadCaptureForm (captura de contacto y redirección a WhatsApp)
    │   ├── WhyThisProduct (beneficios del hule uretano y resortes helicoidales)
    │   ├── HowItWorks (#how-it-works, pasos de selección e instalación)
    │   ├── MeasurementGuide (guía técnica interactiva con reglas de medición)
    │   ├── Trust (4 pilares de confianza y garantía Invultec Colombia)
    │   ├── FAQ (#faq, acordeón con preguntas frecuentes)
    │   └── FinalCTA (banner de cierre orientado a conversión)
    └── Footer (pie de página con enlaces, copyright e información de marca)
```

---

## 4. JavaScript / TypeScript Logic Layer

### Motor de Compatibilidad Vehicular (`lib/fitment/fitment-engine.ts`)

El motor de compatibilidad procesa los datos ingresados por el usuario para determinar la referencia adecuada de Rubber Shock:

1. **Búsqueda Vehicular en Base de Datos**:
   - `getFitmentRecommendation(vehicle: Vehicle): FitmentRecommendation`
   - Consulta `findFitmentData(make, model, year)` en el dataset predeterminado.
2. **Evaluación de Coincidencia**:
   - Si existe coincidencia directa: Retorna `status: 'MATCH'`, asigna el `recommendedType` (A+, B+, C, D, E) con nivel de confianza (`HIGH` o `MEDIUM`) y la tarjeta de producto asociada (`getProductByType()`).
   - Si no existe coincidencia directa: Retorna `status: 'MEASUREMENT_REQUIRED'`, recomendando ingresar la medición manual de la separación de espiras.
3. **Cálculo por Medición Manual**:
   - `findTypeBySpringGap(gapInMm)` evalúa la medida entre espiras contra los rangos en `data/fitment/size-ranges.ts` para asignar la referencia exacta.

### Manejo de Estado en Interfaz Cliente (`"use client"`)

- **Contenedor Principal (`VehicleFitmentFinder.tsx`)**:
  - Mantiene el estado del vehículo seleccionado (`selectedVehicle`), la recomendación calculada (`recommendation`), la medida manual (`measurement`) y el paso actual del flujo (`currentStep`).
- **Navegación Dinámica en Seleccionador (`VehicleSelector.tsx`)**:
  - Filtrado reactivo de modelos según la marca seleccionada y rangos de año disponibles (2000-2026).

---

## 5. System Design & Visual Token Configuration

### Paleta de Colores en `tailwind.config.ts`

- **Rojo Carmesí Borgoña (Brand Primary)**: `#C0262D` (`brand-red-500` / `brand-red-DEFAULT`).
- **Negro Corporativo**: `#0A0A0A` (`brand-black-DEFAULT`).
- **Grises de Soporte**: `#71727A` (`brand-grey-DEFAULT`).
- **Fondo Neutral**: `#F4F3EE` / `#FAFAFA` para secciones con contraste limpio.

---

## 6. Verification & Implementation Plan

1. **Verificación de Compilación y Servidor de Desarrollo**:
   - Ejecutar `npm run dev` para validar carga correcta de la landing page en `http://localhost:3000`.
   - Verificar la navegación suavizada a las anclas `#fitment-finder`, `#how-it-works` y `#faq`.
2. **Chequeo de Tipos y Linter**:
   - Ejecutar `npx tsc --noEmit` para asegurar ausencia de errores de tipado TypeScript.
   - Ejecutar `npm run lint` para validar reglas de Next.js y React.
3. **Verificación de Build de Producción**:
   - Ejecutar `npm run build` para asegurar la compilación estática/dinámica correcta del App Router.
