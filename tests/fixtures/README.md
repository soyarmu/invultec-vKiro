# Test Fixtures

Esta carpeta contiene datos de prueba reutilizables para todos los tests del proyecto.

## Estructura

```
fixtures/
├── vehicles.ts    - Fixtures de vehículos (Vehicle)
├── products.ts    - Fixtures de productos (Product)
├── leads.ts       - Fixtures de leads/formularios (LeadData)
├── fitment.ts     - Fixtures de fitment engine (FitmentData, MeasurementInput, etc.)
└── index.ts       - Barrel export para importaciones centralizadas
```

## Uso

### Importación simple

```typescript
import { validVehicle, availableProduct, validLead } from '@tests/fixtures';

// Usar fixture directamente
const vehicle = validVehicle;
// { make: 'Toyota', model: 'Hilux', year: 2020 }
```

### Factories para personalización

```typescript
import { createVehicle, createProduct, createLead } from '@tests/fixtures';

// Crear variación personalizada
const customVehicle = createVehicle({ year: 2023, trim: 'Sport' });
// { make: 'Toyota', model: 'Hilux', year: 2023, trim: 'Sport' }

const outOfStockProduct = createProduct({ available: false });
// Producto con todos los campos de availableProduct pero available: false

const leadWithMultipleItems = createLead({ quantity: 4 });
// Lead con quantity modificada pero otros campos intactos
```

### Fixtures disponibles por categoría

#### Vehículos (`vehicles.ts`)
- `validVehicle` - Vehículo válido completo
- `incompleteVehicle` - Vehículo con datos incompletos (para tests de validación)
- `unknownVehicle` - Vehículo no existente en BD
- `vehicleWithTrim` - Vehículo con trim especificado
- `vehicleWithFullDetails` - Vehículo con todos los campos opcionales
- `createVehicle(overrides)` - Factory function
- `createVehicleBatch(count)` - Crear múltiples vehículos

#### Productos (`products.ts`)
- `availableProduct` - Producto disponible tipo A+
- `unavailableProduct` - Producto agotado tipo E
- `productTypeBPlus` - Producto tipo B+
- `productTypeC` - Producto tipo C
- `productTypeD` - Producto tipo D
- `createProduct(overrides)` - Factory function
- `getProductByType(type)` - Obtener producto por tipo
- `getAllProducts()` - Array con todos los productos

#### Leads (`leads.ts`)
- `validLead` - Lead válido completo
- `invalidPhoneLead` - Lead con teléfono inválido
- `shortNameLead` - Lead con nombre muy corto
- `missingVehicleInfoLead` - Lead sin info de vehículo
- `leadWithHoneypot` - Lead con honeypot lleno (bot)
- `leadWithMultipleQuantity` - Lead con cantidad múltiple
- `createLead(overrides)` - Factory function
- `createLeadBatch(count)` - Crear múltiples leads
- `validColombianPhones` - Array de teléfonos válidos
- `invalidColombianPhones` - Array de teléfonos inválidos

#### Fitment (`fitment.ts`)
- `toyotaHiluxFitmentData` - Datos de fitment para Toyota Hilux
- `chevroletColoradoFitmentData` - Datos para Chevrolet Colorado
- `mediumConfidenceFitmentData` - Fitment con confianza media
- `demoFitmentData` - Datos demo con flag isDemo
- `matchRecommendation` - Recomendación exitosa
- `measurementRequiredRecommendation` - Requiere medición
- `noMatchRecommendation` - Sin coincidencia
- `outOfStockRecommendation` - Producto agotado
- `unknownRecommendation` - Estado desconocido
- `validMeasurementInches` - Medición válida en pulgadas
- `validMeasurementMM` - Medición válida en mm
- `invalidMeasurementZero` - Medición inválida (cero)
- `invalidMeasurementNegative` - Medición inválida (negativa)
- `sizeRangeAPLus`, `sizeRangeBPlus`, `sizeRangeC` - Rangos de tamaño
- `confidenceBadgeTestData` - Data para tests de badges
- `createFitmentData(overrides)` - Factory function
- `createMeasurement(overrides)` - Factory function
- `createFitmentRecommendation(overrides)` - Factory function

## Ejemplos de uso en tests

### Test unitario con fixture

```typescript
import { describe, it, expect } from 'vitest';
import { validVehicle } from '@tests/fixtures';
import { myFunction } from '@/lib/my-module';

describe('myFunction', () => {
  it('procesa vehículo válido correctamente', () => {
    const result = myFunction(validVehicle);
    expect(result).toBeDefined();
  });
});
```

### Test con múltiples variaciones

```typescript
import { createVehicle } from '@tests/fixtures';

it.each([
  { year: 2020, expected: true },
  { year: 2015, expected: true },
  { year: 1999, expected: false },
])('valida año $year correctamente', ({ year, expected }) => {
  const vehicle = createVehicle({ year });
  expect(isValidYear(vehicle.year)).toBe(expected);
});
```

### Test de componente React

```typescript
import { render, screen } from '@testing-library/react';
import { validLead } from '@tests/fixtures';
import LeadForm from '@/components/LeadForm';

it('renderiza formulario con datos prellenados', () => {
  render(<LeadForm initialData={validLead} />);
  expect(screen.getByDisplayValue('Juan Pérez')).toBeInTheDocument();
});
```

## Ventajas de usar fixtures

1. **Consistencia**: Mismos datos en todos los tests
2. **Mantenibilidad**: Cambio centralizado cuando los tipos evolucionan
3. **Legibilidad**: Nombres descriptivos (`validLead` vs objeto inline)
4. **Reutilización**: Evita duplicación de código
5. **Escalabilidad**: Fácil agregar nuevos fixtures cuando crece el proyecto

## Agregar nuevos fixtures

1. Crea el fixture en el archivo apropiado
2. Exporta desde ese archivo
3. El barrel export (`index.ts`) lo expondrá automáticamente
4. Documenta el fixture en este README

## Convenciones de naming

- `valid*` - Datos válidos que deberían pasar validaciones
- `invalid*` - Datos inválidos para tests de validación
- `unknown*` - Datos que no existen en la base de datos
- `*WithX` - Datos con campo específico incluido
- `create*` - Factory functions
- `get*By*` - Helper functions para buscar

## E-commerce Ready

Estos fixtures están diseñados para escalar cuando el proyecto evolucione a e-commerce:

- **Productos**: Ya tienen precio, stock, URL de compra
- **Leads**: Fácil agregar campos de checkout (dirección, método de pago)
- **Vehículos**: Estructura permite agregar configuraciones de producto
- **Factories**: Permiten crear datos bulk para tests de performance

Cuando se agreguen carritos, órdenes, usuarios, etc., seguir la misma estructura:
1. Crear `tests/fixtures/carts.ts`, `orders.ts`, `users.ts`
2. Exportar desde barrel
3. Mantener factories y helpers
4. Documentar en este README
