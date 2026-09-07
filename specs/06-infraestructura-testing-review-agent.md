# SPEC 06: Infraestructura de Testing y Testing Review Agent

**State:** Implementado   
**Date:** 2026-09-07  
**Objective:** Implementar infraestructura completa de testing (Vitest, Playwright, MSW) y un agente automatizado de revisión de testing que analice gaps de cobertura y genere recomendaciones en GitHub Issues, preparando el proyecto para su evolución a e-commerce.

---

## 1. Scope

### In Scope
- Instalación y configuración de framework de testing:
  - **Vitest** (v2.1.9) para tests unitarios y de integración
  - **Playwright** (v1.62.1) para tests E2E
  - **MSW** (v2.15.0) para mocking de APIs
  - **Testing Library** para tests de componentes React
- Estructura modular de directorios: `tests/{unit,integration,e2e/{critical,standard,smoke},fixtures,mocks}`
- Configuración de archivos: `vitest.config.ts`, `vitest.setup.ts`, `playwright.config.ts`
- Fixtures reutilizables para datos de testing: `vehicles.ts`, `products.ts`, `leads.ts`, `fitment.ts`
- MSW handlers para mockear Supabase API
- Tests unitarios del Fitment Engine con 100% cobertura
- Tests de componentes UI del Fitment Finder
- Scripts npm: `test`, `test:coverage`, `test:e2e`, `test:ui`, `test:watch`
- Testing Review Agent (estructura base para futura implementación completa):
  - Code analyzer para detectar gaps de cobertura
  - Recommendation engine con priorización
  - GitHub Issues Manager para persistencia de sugerencias
  - GitHub Actions workflow para ejecución en CI/CD

### Out of Scope
- Tests de endpoints API REST (queda para fase posterior)
- Tests E2E del flujo completo de Lead Capture (estructura creada, implementación pendiente)
- Testing Review Agent completo (solo infraestructura y arquitectura inicial)
- Integración con herramientas externas de análisis de cobertura (SonarQube, Codecov)
- Tests de performance o load testing
- Tests visuales con Chromatic o similares

---

## 2. Data Model

### Estructura de Fixtures

```typescript
// tests/fixtures/vehicles.ts
interface Vehicle {
  make: string;
  model: string;
  year: string;
}

// tests/fixtures/products.ts
interface Product {
  id: string;
  name: string;
  type: 'shock-absorber';
  available: boolean;
  stock: number;
  price: number;
}

// tests/fixtures/leads.ts
interface Lead {
  name: string;
  phone: string;
  brand: string;
  model: string;
  year: string;
  quantity: number;
}

// tests/fixtures/fitment.ts
interface FitmentData {
  make: string;
  model: string;
  years: string[];
  frontSize: string;
  rearSize: string;
}
```

### Test Coverage Metrics

```typescript
interface CoverageReport {
  statements: { total: number; covered: number; pct: number };
  branches: { total: number; covered: number; pct: number };
  functions: { total: number; covered: number; pct: number };
  lines: { total: number; covered: number; pct: number };
}
```

---

## 3. Implementation Plan

### Fase 1: Configuración Inicial del Entorno de Testing
1. **Instalación de dependencias**:
   - Instalar Vitest, Playwright, MSW, Testing Library
   - Configurar compatibilidad con ESM (type:module en package.json)
   - Ajustar `postcss.config.js` → `.cjs` y `next.config.js` → `.cjs` para compatibilidad
2. **Estructura de directorios**:
   - Crear estructura modular `tests/{unit,integration,e2e/{critical,standard,smoke},fixtures,mocks}`
   - Configurar `.gitignore` para excluir `/coverage`, `/test-results`, `/playwright-report`
3. **Archivos de configuración**:
   - `vitest.config.ts`: Configuración de environment (jsdom), coverage (v8), paths aliases
   - `vitest.setup.ts`: Setup de Testing Library y MSW
   - `playwright.config.ts`: Proyectos (chromium, critical, standard, smoke), baseURL, retries
4. **Scripts npm**:
   ```json
   {
     "test": "vitest",
     "test:ui": "vitest --ui",
     "test:coverage": "vitest run --coverage",
     "test:e2e": "playwright test",
     "test:e2e:critical": "playwright test --project=critical",
     "test:e2e:ui": "playwright test --ui",
     "test:watch": "vitest watch"
   }
   ```

### Fase 2: Fixtures Reutilizables
1. **Crear fixtures modulares**:
   - `tests/fixtures/vehicles.ts`: validVehicle, incompleteVehicle, unknownVehicle, createVehicle factory
   - `tests/fixtures/products.ts`: availableProduct, unavailableProduct, getProductByType, getAllProducts
   - `tests/fixtures/leads.ts`: validLead, invalidPhoneLead, createLead, validColombianPhones
   - `tests/fixtures/fitment.ts`: toyotaHiluxFitmentData, matchRecommendation, validMeasurementInches/MM, createMeasurement
2. **Barrel export en index.ts** para importaciones centralizadas
3. **README completo** con ejemplos de uso
4. **Test suite auto-verificando** los fixtures (20 test cases)

### Fase 3: Tests Unitarios del Fitment Engine
1. **Archivo de tests**: `tests/unit/lib/fitment/fitment-engine.test.ts`
2. **Cobertura de funciones**:
   - `getFitmentRecommendation`: happy path, validación de inputs, no match, edge cases
   - `getFitmentFromMeasurement`: conversión mm→inches, validación, no match, edge cases
   - `getConfidenceBadgeInfo`: HIGH/MEDIUM/MEASUREMENT_REQUIRED
3. **Mocking con Vitest** de vehicleData, sizeRanges, products
4. **Tests de integración** de workflows completos
5. **Meta de cobertura**: 100% statements, branches, functions, lines

### Fase 4: Tests de Componentes UI
1. **Archivo de tests**: `tests/integration/components/fitment/VehicleSelector.test.tsx`
2. **Casos de prueba** (17 test cases):
   - Renderizado inicial
   - Interacción con dropdowns (marca, modelo, año)
   - Validación de onChange callback
   - Estados disabled
   - Edge cases (marca sin modelos, selección rápida)
3. **Configuración especial** para JSX/React en ambiente ESM

### Fase 5: MSW Setup
1. **Handlers**: `tests/mocks/handlers.ts` con endpoints de Supabase API mockeados
2. **Server**: `tests/mocks/server.ts` con configuración de MSW server para Node
3. **Browser**: `tests/mocks/browser.ts` con configuración para testing browser

### Fase 6: Testing Review Agent (Estructura Base)
1. **Scripts base**: `scripts/testing-review-agent/` (estructura vacía o implementación básica)
2. **Planificación de componentes** (para fase posterior):
   - Code Analyzer: AST parsing, cobertura por archivo
   - Recommendation Engine: priorización (crítico/alto/medio/bajo)
   - GitHub Issues Manager: creación/actualización de issues por tipo
   - Entry point con logging

---

## 4. Acceptance Criteria

### Infraestructura
- [x] Vitest v2.1.9 instalado y configurado
- [x] Playwright v1.62.1 instalado con chromium
- [x] MSW v2.15.0 instalado y configurado
- [x] Testing Library instalada (@testing-library/react, @testing-library/jest-dom, @testing-library/user-event)
- [x] Estructura de directorios `tests/` completa
- [x] Archivos de configuración: `vitest.config.ts`, `vitest.setup.ts`, `playwright.config.ts`
- [x] Scripts npm funcionando: `npm test`, `npm run test:coverage`, `npm run test:e2e`

### Fixtures
- [x] 4 módulos de fixtures creados: vehicles, products, leads, fitment
- [x] Barrel export en `tests/fixtures/index.ts`
- [x] README con ejemplos de uso
- [x] Test suite auto-verificando fixtures: 20/20 tests pasando

### Tests Unitarios
- [x] Tests del Fitment Engine: 35 tests implementados
- [x] Cobertura alcanzada: 100% statements, 100% branches, 100% functions, 100% lines
- [x] Mocks de Vitest funcionando correctamente
- [x] Tests de integración y edge cases completos

### Tests de Componentes
- [x] VehicleSelector.test.tsx creado con 17 test cases
- [ ] ⚠️ Tests pasando (bloqueado por issue de configuración ESM/React)
  - Issue conocido: "React is not defined" en JSX con type:module
  - Soluciones candidatas: configurar esbuild target, ajustar setup

### MSW
- [x] Handlers básicos para Supabase API
- [x] Server configurado para testing en Node
- [x] Browser configurado (preparado para E2E)

### Testing Review Agent
- [ ] Estructura base de `scripts/testing-review-agent/` (planificación)
- [ ] Code Analyzer (fase posterior)
- [ ] Recommendation Engine (fase posterior)
- [ ] GitHub Issues Manager (fase posterior)
- [ ] GitHub Actions workflow (fase posterior)

### Estado General
- [x] 55/72 tests pasando (76.4%)
  - ✅ 20/20 fixtures tests
  - ✅ 35/35 fitment engine tests
  - ⚠️ 0/17 component tests (bloqueado)
- [x] Infraestructura sólida y escalable
- [x] E-commerce ready: estructura preparada para futura expansión

---

## 5. Decisions Taken and Discarded

### Decisiones Tomadas

**1. Testing Framework: Vitest vs Jest**
- ✅ **Elegido**: Vitest
- ❌ **Descartado**: Jest
- **Razón**: 
  - Vitest es más rápido (5-10x en proyectos grandes)
  - Mejor soporte para ESM nativo
  - Compatibilidad nativa con Vite/Next.js 14
  - API compatible con Jest (migración suave)
  - UI mode integrado para debugging

**2. E2E Framework: Playwright vs Cypress**
- ✅ **Elegido**: Playwright
- ❌ **Descartado**: Cypress
- **Razón**:
  - Playwright soporta múltiples navegadores (Chromium, Firefox, WebKit)
  - Mejor performance en CI/CD
  - Auto-waiting nativo sin timeouts manuales
  - Mejor para aplicaciones que evolucionarán a e-commerce

**3. API Mocking: MSW vs Mock Service Worker Alternatives**
- ✅ **Elegido**: MSW (Mock Service Worker)
- ❌ **Descartado**: nock, fetch-mock
- **Razón**:
  - Intercepta requests a nivel de Service Worker (más realista)
  - Funciona en Node y browser
  - Mismo código para tests y desarrollo
  - Mejor para mockear Supabase API

**4. Estructura de Testing: Por Dominio vs Por Componente**
- ✅ **Elegido**: Por dominio (unit/integration/e2e/{critical,standard,smoke})
- ❌ **Descartado**: Por componente (__tests__ junto a cada archivo)
- **Razón**:
  - Escalabilidad cuando proyecto evolucione a e-commerce
  - Separación clara entre tipos de tests
  - Priorización fácil (critical vs standard)
  - Mejor organización para múltiples flujos de usuario

**5. Configuración ESM: type:module vs CommonJS**
- ✅ **Elegido**: type:module (ESM)
- ❌ **Descartado**: CommonJS puro
- **Razón**:
  - Modernidad y estándares de JavaScript
  - Mejor compatibilidad con Next.js 14+
  - Preparación para futuro de Node.js
  - **Costo**: Causó issue con React/JSX (requiere fix)

**6. Fixtures: Factories vs Objetos Estáticos**
- ✅ **Elegido**: Ambos (objetos base + factory functions)
- **Razón**:
  - Objetos base para casos comunes (rapidez)
  - Factories para customización (flexibilidad)
  - Balance entre simplicidad y potencia

### Decisiones Descartadas

**1. Storybook para Component Testing**
- ❌ **Descartado**: Storybook + Chromatic
- **Razón**: 
  - Overhead de configuración
  - No es prioritario para landing page
  - Mejor enfocarse en tests funcionales primero

**2. Integración con SonarQube/Codecov**
- ❌ **Descartado**: Por ahora
- **Razón**:
  - Proyecto pequeño, no justifica overhead
  - Vitest coverage report es suficiente
  - Puede agregarse cuando escale a e-commerce

**3. Visual Regression Testing**
- ❌ **Descartado**: Chromatic, Percy
- **Razón**:
  - No crítico para funcionalidad actual
  - Prioridad en tests funcionales
  - Puede agregarse en fase de e-commerce

---

## 6. Identified Risks

### Riesgo 1: Issue de Configuración ESM/React
- **Descripción**: Tests de componentes React fallan con "React is not defined" debido a type:module
- **Severidad**: MEDIUM
- **Impacto**: 17 tests bloqueados (23.6% del total)
- **Mitigación**: 
  - Opción A: Configurar esbuild target en vitest.config
  - Opción B: Agregar React import automático via plugin
  - Opción C: Revertir a CommonJS (última opción)
- **Estado**: Identificado, pendiente fix

### Riesgo 2: Mantenimiento de Fixtures
- **Descripción**: Fixtures pueden desincronizarse con el modelo de datos real
- **Severidad**: LOW
- **Impacto**: Tests pasando con datos obsoletos
- **Mitigación**: 
  - Test suite auto-verificando fixtures (implementado)
  - Revisar fixtures cada vez que cambie el modelo
  - Usar factories para reducir duplicación
- **Estado**: Mitigado con test suite

### Riesgo 3: Cobertura Incompleta
- **Descripción**: Áreas del código sin tests (API routes, error handling)
- **Severidad**: MEDIUM
- **Impacto**: Bugs en producción no detectados
- **Mitigación**: 
  - Testing Review Agent monitoreará gaps (fase posterior)
  - Priorizar tests de rutas críticas (captura de leads)
  - Objetivo: 80%+ cobertura antes de e-commerce
- **Estado**: En progreso (Tasks 5-12 pendientes)

### Riesgo 4: Performance de Tests en CI/CD
- **Descripción**: Tests lentos pueden ralentizar pipeline
- **Severidad**: LOW
- **Impacto**: Feedback loop más lento para desarrolladores
- **Mitigación**: 
  - Vitest es rápido por diseño
  - Playwright configurado con sharding para paralelización
  - Caché de node_modules en GitHub Actions
- **Estado**: No crítico por ahora

### Riesgo 5: Dependencias Desactualizadas
- **Descripción**: Peer dependencies conflictivas (ej: vite versions)
- **Severidad**: LOW
- **Impacto**: npm install warnings, potenciales incompatibilidades
- **Mitigación**: 
  - Usar --legacy-peer-deps cuando sea necesario
  - Mantener dependencias actualizadas periódicamente
  - Testing robusto detectará incompatibilidades
- **Estado**: Identificado, workaround aplicado

---

## 7. Testing Strategy

### Test Pyramid

```
         /\
        /  \
       / E2E \          ← Playwright (smoke, critical, standard)
      /------\
     /        \
    /   Int.   \        ← Vitest + Testing Library + MSW
   /------------\
  /              \
 /   Unit Tests   \     ← Vitest (fitment engine, utils, helpers)
/------------------\
```

### Cobertura Objetivo

| Tipo | Meta | Actual | Estado |
|------|------|--------|--------|
| Unit Tests | 90%+ | 100% (fitment) | ✅ |
| Integration | 80%+ | 0% (bloqueado) | ⚠️ |
| E2E Critical | 100% | 0% (pendiente) | 📋 |
| E2E Standard | 80%+ | 0% (pendiente) | 📋 |
| Overall | 80%+ | 48% | 🔄 |

### Priorización de Tests

**CRITICAL (P0)** - Deben pasar antes de deploy:
- ✅ Fitment engine logic
- 📋 Lead capture E2E
- 📋 API /api/leads
- 📋 Supabase connection

**HIGH (P1)** - Importantes para calidad:
- ⚠️ VehicleSelector component
- 📋 LeadCaptureForm component
- 📋 WhatsApp redirection

**MEDIUM (P2)** - Buenos de tener:
- 📋 Analytics tracking
- 📋 Error boundaries
- 📋 Loading states

**LOW (P3)** - Nice to have:
- 📋 UI animations
- 📋 Responsive design edge cases
- 📋 Accessibility enhancements

---

## 8. Next Steps (Tasks 4-12 Pendientes)

1. **Task 4**: Fix React/JSX issue, completar tests de VehicleSelector (17 tests)
2. **Task 5**: Tests de API Routes con MSW (POST /api/leads, GET /api/health)
3. **Task 6**: Tests E2E del flujo Lead Capture con Playwright
4. **Task 7**: Testing Review Agent - Code Analyzer
5. **Task 8**: Testing Review Agent - Recommendation Engine
6. **Task 9**: Testing Review Agent - GitHub Issues Manager
7. **Task 10**: GitHub Actions Workflow para Testing Review
8. **Task 11**: Entry point del agente con CLI
9. **Task 12**: Documentación completa del Testing Review Agent

---

## 9. Technical Notes

### Configuración ESM

```javascript
// package.json
{
  "type": "module"  // ← ESM habilitado
}

// next.config.cjs (no .js)
// postcss.config.cjs (no .js)
```

### Vitest Config Highlights

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: ['node_modules/', 'tests/', '.next/']
    },
    setupFiles: ['./vitest.setup.ts']
  }
});
```

### Playwright Config Highlights

```typescript
// playwright.config.ts
export default defineConfig({
  projects: [
    { name: 'critical', testMatch: /critical\.spec\.ts/ },
    { name: 'standard', testMatch: /standard\.spec\.ts/ },
    { name: 'smoke', testMatch: /smoke\.spec\.ts/ }
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry'
  }
});
```

---

## 10. References

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [MSW Documentation](https://mswjs.io/)
- [Testing Library React](https://testing-library.com/react)
- [Next.js Testing](https://nextjs.org/docs/testing)
- [SPEC 00-05](./00-arquitectura-base-stack-html-js.md) - Specs anteriores del proyecto

---

**Status**: ✅ Infraestructura implementada (Tasks 1-3 completadas)  
**Pending**: Tasks 4-12 (componentes, API, E2E, Testing Review Agent)  
**Overall Progress**: 25% (3/12 tasks)
