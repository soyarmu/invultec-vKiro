import { describe, it, expect } from 'vitest';
import {
  // Vehicles
  validVehicle,
  createVehicle,
  createVehicleBatch,
  // Products
  availableProduct,
  unavailableProduct,
  createProduct,
  getProductByType,
  getAllProducts,
  // Leads
  validLead,
  invalidPhoneLead,
  createLead,
  createLeadBatch,
  validColombianPhones,
  invalidColombianPhones,
  // Fitment
  toyotaHiluxFitmentData,
  matchRecommendation,
  validMeasurementInches,
  validMeasurementMM,
  createMeasurement,
  confidenceBadgeTestData,
} from './index';

/**
 * Fixtures Self-Tests
 * Verifica que los fixtures están correctamente estructurados
 */

describe('Vehicle Fixtures', () => {
  it('validVehicle tiene estructura correcta', () => {
    expect(validVehicle).toHaveProperty('make');
    expect(validVehicle).toHaveProperty('model');
    expect(validVehicle).toHaveProperty('year');
    expect(typeof validVehicle.year).toBe('number');
  });

  it('createVehicle factory funciona correctamente', () => {
    const custom = createVehicle({ year: 2023, trim: 'Sport' });
    expect(custom.year).toBe(2023);
    expect(custom.trim).toBe('Sport');
    expect(custom.make).toBe(validVehicle.make);
  });

  it('createVehicleBatch genera cantidad correcta', () => {
    const batch = createVehicleBatch(5);
    expect(batch).toHaveLength(5);
    expect(batch[0]).toHaveProperty('make');
  });
});

describe('Product Fixtures', () => {
  it('availableProduct está disponible', () => {
    expect(availableProduct.available).toBe(true);
  });

  it('unavailableProduct no está disponible', () => {
    expect(unavailableProduct.available).toBe(false);
  });

  it('createProduct factory sobrescribe correctamente', () => {
    const custom = createProduct({ price: 50000, available: false });
    expect(custom.price).toBe(50000);
    expect(custom.available).toBe(false);
  });

  it('getProductByType retorna producto correcto', () => {
    const product = getProductByType('A+');
    expect(product.type).toBe('A+');
  });

  it('getAllProducts retorna 5 productos', () => {
    const products = getAllProducts();
    expect(products).toHaveLength(5);
  });
});

describe('Lead Fixtures', () => {
  it('validLead tiene teléfono colombiano válido', () => {
    expect(validLead.phone).toMatch(/^3\d{9}$/);
  });

  it('invalidPhoneLead tiene teléfono inválido', () => {
    expect(invalidPhoneLead.phone).not.toMatch(/^3\d{9}$/);
  });

  it('createLead factory funciona', () => {
    const custom = createLead({ name: 'Test User', quantity: 5 });
    expect(custom.name).toBe('Test User');
    expect(custom.quantity).toBe(5);
  });

  it('createLeadBatch genera leads válidos', () => {
    const batch = createLeadBatch(3);
    expect(batch).toHaveLength(3);
    batch.forEach(lead => {
      expect(lead.phone).toMatch(/^300\d{7}$/);
    });
  });

  it('validColombianPhones contiene teléfonos válidos', () => {
    validColombianPhones.forEach(phone => {
      expect(phone).toMatch(/^3\d{9}$/);
    });
  });

  it('invalidColombianPhones contiene teléfonos inválidos', () => {
    invalidColombianPhones.forEach(phone => {
      expect(phone).not.toMatch(/^3\d{9}$/);
    });
  });
});

describe('Fitment Fixtures', () => {
  it('toyotaHiluxFitmentData tiene estructura correcta', () => {
    expect(toyotaHiluxFitmentData.make).toBe('Toyota');
    expect(toyotaHiluxFitmentData.model).toBe('Hilux');
    expect(toyotaHiluxFitmentData.confidence).toBe('HIGH');
  });

  it('matchRecommendation es un match exitoso', () => {
    expect(matchRecommendation.status).toBe('MATCH');
    expect(matchRecommendation.product).toBeDefined();
  });

  it('validMeasurementInches tiene unidad correcta', () => {
    expect(validMeasurementInches.unit).toBe('inches');
    expect(validMeasurementInches.springGap).toBeGreaterThan(0);
  });

  it('validMeasurementMM convierte correctamente', () => {
    expect(validMeasurementMM.unit).toBe('mm');
    // 50.8mm = 2 inches
    expect(validMeasurementMM.springGap).toBeCloseTo(50.8);
  });

  it('createMeasurement factory funciona', () => {
    const custom = createMeasurement({ springGap: 3.5, unit: 'mm' });
    expect(custom.springGap).toBe(3.5);
    expect(custom.unit).toBe('mm');
  });

  it('confidenceBadgeTestData tiene 3 casos', () => {
    expect(confidenceBadgeTestData).toHaveLength(3);
    confidenceBadgeTestData.forEach(data => {
      expect(data).toHaveProperty('confidence');
      expect(data).toHaveProperty('expectedText');
      expect(data).toHaveProperty('expectedVariant');
    });
  });
});
