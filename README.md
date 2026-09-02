# Invultec Colombia — Rubber Shock RS-001 Landing Page & Lead Capture

Una landing page interactiva de alto rendimiento con motor de compatibilidad vehicular, captura server-side de leads en **Supabase** y canal de ventas directo por **WhatsApp** para el producto **Rubber Shock RS-001** de Invultec Colombia.

---

## 📑 Especificaciones del Proyecto (`specs/`)

Toda la evolución y arquitectura del proyecto está documentada mediante especificaciones técnicas numeradas:

| Spec | Nombre | Estado | Descripción |
| :--- | :--- | :---: | :--- |
| **[SPEC 00](./specs/00-arquitectura-base-stack-html-js.md)** | Arquitectura Base, Stack y Frontend | `Implementado` | Definición de la arquitectura Next.js 14, jerarquía de componentes HTML/React, motor de compatibilidad y sistema de diseño Tailwind. |
| **[SPEC 01](./specs/01-lead-capture-rubber-shock.md)** | Captura de Leads & Backend | `Implementado` | Dataset de 20 marcas líderes en Colombia, API Route Server-Side `/api/leads` con Rate Limiting, Honeypot anti-bot y tabla `public.leads`. |
| **[SPEC 02](./specs/02-traduccion-y-marketing-invultec.md)** | Traducción & Marketing | `Implementado` | Traducción 100% al español y optimización del copy comercial para el mercado colombiano (Trust, FAQ, CTA, Footer, Guía de medición). |
| **[SPEC 03](./specs/03-actualizacion-terminologia-rubber-shock.md)** | Terminología Rubber Shock | `Implementado` | Estandarización de términos técnicos de marca: *Rubber Shock RS-001*, *resortes helicoidales* y *hule uretano de alta resistencia*. |
| **[SPEC 04](./specs/04-conexion-supabase.md)** | Verificación Conexión Supabase | `Implementado` | Configuración y verificación del cliente Supabase en `lib/supabase.ts`, variables `.env.local` y endpoint de health check (`/api/health/supabase`). |
| **[SPEC 05](./specs/05-creacion-primer-lead-y-redireccion-whatsapp.md)** | Primer Lead E2E & WhatsApp | `Implementado` | Script de migración SQL `supabase/migrations/20260902_create_leads_table.sql`, RLS, prueba E2E en BD y redirección a WhatsApp. |

---

## 🛠️ Stack Tecnológico

- **Frontend & Renderizado**: [Next.js 14](https://nextjs.org/) (App Router, Server Components y Client Components)
- **Lenguaje**: [TypeScript 5.4](https://www.typescriptlang.org/) con tipado estricto
- **Estilos & UI**: [Tailwind CSS 3.4](https://tailwindcss.com/) con sistema de tokens corporativos (Rojo Carmesí `#C0262D`, Negro `#0A0A0A`, Gris `#71727A`)
- **Base de Datos & Backend (BaaS)**: [Supabase](https://supabase.com/) (`@supabase/supabase-js` 2.x) con Row Level Security (RLS)
- **Iconografía**: [Lucide React](https://lucide.dev/) (Iconos vectoriales automotrices y de UI)
- **Integraciones**: Canal de ventas directo vía WhatsApp (`wa.me`)

---

## ✨ Características Principales (Features)

1. **Buscador de Compatibilidad Vehicular (Fitment Finder)**:
   - Algoritmo de recomendación dinámica de Rubber Shock (Tipos A+, B+, C, D, E) según marca, modelo y año (cobertura 2000-2026 para 20 marcas líderes en Colombia).
   - Modo de medición manual para ingresar la separación de espiras del resorte helicoidal en mm o pulgadas.
2. **Formulario de Captura Server-Side & Anti-Bot**:
   - Validación estricta de celular colombiano de 10 dígitos (iniciando en 3).
   - Campo Honeypot `hp` para simular éxito sin sobrecargar la BD si es un bot.
   - Rate Limiter en memoria (máximo 5 peticiones por minuto por IP).
   - Persistencia segura en la tabla `public.leads` de Supabase.
   - Redirección automática a WhatsApp mediante `window.location.href` evitando bloqueos de popups.
3. **Copy de Marketing Adaptado a Colombia**:
   - Contenido 100% en español con terminología automotriz local (*resortes helicoidales*, *hule uretano*, *separación entre espiras*).
   - Sección de confianza con 4 pilares Invultec, FAQ con acordeón interactivo y llamados a la acción de alta conversión.

---

## 📂 Estructura del Proyecto

```
invultec-vKiro/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes (leads, health check)
│   │   ├── health/           # Health check de conexión a Supabase
│   │   └── leads/            # Endpoint POST de captura de leads
│   ├── globals.css           # Importaciones de Tailwind y estilos globales
│   ├── layout.tsx            # Root Layout HTML con SEO y Metadata
│   └── page.tsx              # Landing Page principal
├── components/               # Componentes UI divididos por módulo
│   ├── fitment/              # Buscador vehicular, resultados y captura de leads
│   ├── hero/                 # Banner Hero principal
│   ├── navigation/           # Navbar superior y Footer
│   ├── product/              # Tarjetas de visualización de producto
│   ├── sections/             # Secciones (WhyThisProduct, HowItWorks, MeasurementGuide, Trust, FAQ, FinalCTA)
│   └── ui/                   # Primitivas de interfaz (Button, Input, Select, Badge)
├── data/                     # Datasets de vehículos, tamaños y productos
│   ├── fitment/              # Rangos de espiras y base de datos vehicular
│   ├── products/             # Catálogo de referencias Rubber Shock (RS-001)
│   └── vehicles.json         # Dataset con 20 marcas principales en Colombia
├── lib/                      # Lógica de negocio e integraciones
│   ├── analytics/            # Abstracción de eventos de tracking
│   ├── fitment/              # Motor de cálculo de compatibilidad vehicular
│   ├── supabase.ts           # Cliente singleton de Supabase (Público y Admin)
│   └── utils.ts              # Utilidad cn() para clases Tailwind
├── specs/                    # Especificaciones técnicas (SPECs 00-05)
├── supabase/                 # Migraciones SQL y esquemas de base de datos
│   └── migrations/           # Scripts DDL (20260902_create_leads_table.sql)
└── types/                    # Definiciones de tipos TypeScript
```

---

## 🗄️ Base de Datos & Migraciones Supabase

La tabla `public.leads` almacena los contactos de clientes interesados en el Rubber Shock RS-001:

```sql
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year TEXT NOT NULL,
  quantity INTEGER DEFAULT 1 NOT NULL,
  converted_to_wa BOOLEAN DEFAULT true NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
```

Los scripts de migración se encuentran en `supabase/migrations/20260902_create_leads_table.sql`.

---

## 🚀 Guía de Inicio Rápido (Getting Started)

### Requisitos Previos
- Node.js 18+ o 20+
- npm, pnpm o yarn

### 1. Instalación de Dependencias

```bash
npm install
```

### 2. Configuración de Variables de Entorno (`.env.local`)

Crea o edita el archivo `.env.local` en la raíz del proyecto basándote en `.env.local.example`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://xkpnllrmwvnsdyjqklqn.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="tu-publishable-key"
NEXT_PUBLIC_SUPABASE_ANON_KEY="tu-anon-key"
SUPABASE_SERVICE_ROLE_KEY="tu-service-role-key"

# WhatsApp Business Sales Channel
NEXT_PUBLIC_WHATSAPP_NUMBER="573172130907"
```

### 3. Servidor de Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador para ver la landing page.

---

## 🧪 Verificación y Producción

### Verificación de Tipos y Linter

```bash
npm run lint
npx tsc --noEmit
```

### Compilación para Producción

```bash
npm run build
npm start
```

---

## 📄 Licencia

Proprietary — **Invultec Colombia**. Todos los derechos reservados.
