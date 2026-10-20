import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getFitmentRecommendation,
  getFitmentFromMeasurement,
  getConfidenceBadgeInfo,
} from '@/lib/fitment/fitment-engine';
import {
  validVehicle,
  incompleteVehicle,
  unknownVehicle,
  createVehicle,
  availableProduct,
  unavailableProduct,
  toyotaHiluxFitmentData,
  validMeasurementInches,
  validMeasurementMM,
  invalidMeasurementZero,
  invalidMeasurementNegative,
  largeMeasurement,
  createMeasurement,
  confidenceBadgeTestData,
} from '@tests/fixtures';

// Mock the data modules
vi.mock('@/data/fitment/vehicle-data', () => ({
  findFitmentData: vi.fn(),
}));

vi.mock('@/data/fitment/size-ranges', () => ({
  findTypeBySpringGap: vi.fn(),
}));

vi.mock('@/data/products/products', () => ({
  getProductByType: vi.fn(),
}));

import * as vehicleData from '@/data/fitment/vehicle-data';
import * as sizeRanges from '@/data/fitment/size-ranges';
import * as products from '@/data/products/products';

describe('Fitment Engine - getFitmentRecommendation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Happy Path - Successful Match', () => {
    it('retorna MATCH cuando vehículo existe en BD con producto disponible', () => {
      // Arrange
      vi.mocked(vehicleData.findFitmentData).mockReturnValue({
        make: 'Toyota',
        model: 'Hilux',
        yearStart: 2016,
        yearEnd: 2023,
        position: 'rear',
        recommendedType: 'A+',
        springGapMin: 1.5,
        springGapMax: 2.0,
        confidence: 'HIGH',
      });

      vi.mocked(products.getProductByType).mockReturnValue(availableProduct);

      // Act
      const result = getFitmentRecommendation(validVehicle);

      // Assert
      expect(result.status).toBe('MATCH');
      expect(result.recommendedType).toBe('A+');
      expect(result.confidence).toBe('HIGH');
      expect(result.product).toBeDefined();
      expect(result.product?.available).toBe(true);
      expect(result.springGap).toEqual({
        min: 1.5,
        max: 2.0,
      });
      
      expect(vehicleData.findFitmentData).toHaveBeenCalledWith(
        'Toyota',
        'Hilux',
        2020
      );
      expect(products.getProductByType).toHaveBeenCalledWith('A+');
    });

    it('incluye notes del fitment data cuando existe', () => {
      vi.mocked(vehicleData.findFitmentData).mockReturnValue({
        ...toyotaHiluxFitmentData,
        notes: 'Fitment confirmado para suspensión trasera',
      });

      vi.mocked(products.getProductByType).mockReturnValue(availableProduct);

      const result = getFitmentRecommendation(validVehicle);

      expect(result.notes).toBe('Fitment confirmado para suspensión trasera');
    });

    it('incluye flag isDemo cuando el fitment data es demo', () => {
      vi.mocked(vehicleData.findFitmentData).mockReturnValue({
        ...toyotaHiluxFitmentData,
        isDemo: true,
      });

      vi.mocked(products.getProductByType).mockReturnValue(availableProduct);

      const result = getFitmentRecommendation(validVehicle);

      expect(result.isDemo).toBe(true);
    });

    it('maneja confianza MEDIUM correctamente', () => {
      vi.mocked(vehicleData.findFitmentData).mockReturnValue({
        make: 'Nissan',
        model: 'Frontier',
        yearStart: 2017,
        yearEnd: 2021,
        position: 'rear',
        recommendedType: 'B+',
        springGapMin: 2.0,
        springGapMax: 2.5,
        confidence: 'MEDIUM',
        notes: 'Verificar medida antes de ordenar',
      });

      vi.mocked(products.getProductByType).mockReturnValue({
        ...availableProduct,
        type: 'B+',
      });

      const result = getFitmentRecommendation(createVehicle({
        make: 'Nissan',
        model: 'Frontier',
        year: 2018,
      }));

      expect(result.status).toBe('MATCH');
      expect(result.confidence).toBe('MEDIUM');
      expect(result.notes).toContain('Verificar medida');
    });
  });

  describe('Input Validation', () => {
    it('retorna UNKNOWN cuando make está vacío', () => {
      const result = getFitmentRecommendation({
        ...validVehicle,
        make: '',
      });

      expect(result.status).toBe('UNKNOWN');
      expect(result.notes).toContain('complete vehicle information');
      expect(vehicleData.findFitmentData).not.toHaveBeenCalled();
    });

    it('retorna UNKNOWN cuando model está vacío', () => {
      const result = getFitmentRecommendation({
        ...validVehicle,
        model: '',
      });

      expect(result.status).toBe('UNKNOWN');
      expect(result.notes).toContain('complete vehicle information');
    });

    it('retorna UNKNOWN cuando year es 0', () => {
      const result = getFitmentRecommendation({
        ...validVehicle,
        year: 0,
      });

      expect(result.status).toBe('UNKNOWN');
      expect(result.notes).toContain('complete vehicle information');
    });

    it('retorna UNKNOWN con vehículo completamente incompleto', () => {
      const result = getFitmentRecommendation(incompleteVehicle);

      expect(result.status).toBe('UNKNOWN');
      expect(result.notes).toContain('complete vehicle information');
    });
  });

  describe('No Match Scenarios', () => {
    it('retorna MEASUREMENT_REQUIRED cuando vehículo no existe en BD', () => {
      vi.mocked(vehicleData.findFitmentData).mockReturnValue(undefined);

      const result = getFitmentRecommendation(unknownVehicle);

      expect(result.status).toBe('MEASUREMENT_REQUIRED');
      expect(result.confidence).toBe('MEASUREMENT_REQUIRED');
      expect(result.notes).toContain('spring gap measurement');
      expect(result.recommendedType).toBeUndefined();
      expect(result.product).toBeUndefined();
    });

    it('retorna NO_MATCH cuando producto no está disponible', () => {
      vi.mocked(vehicleData.findFitmentData).mockReturnValue(toyotaHiluxFitmentData);
      vi.mocked(products.getProductByType).mockReturnValue(unavailableProduct);

      const result = getFitmentRecommendation(validVehicle);

      expect(result.status).toBe('NO_MATCH');
      expect(result.notes).toContain('out of stock');
    });

    it('retorna NO_MATCH cuando producto no existe', () => {
      vi.mocked(vehicleData.findFitmentData).mockReturnValue(toyotaHiluxFitmentData);
      vi.mocked(products.getProductByType).mockReturnValue(undefined);

      const result = getFitmentRecommendation(validVehicle);

      expect(result.status).toBe('NO_MATCH');
      expect(result.notes).toContain('temporarily unavailable');
    });

    it('retorna NO_MATCH cuando producto está undefined', () => {
      vi.mocked(vehicleData.findFitmentData).mockReturnValue(toyotaHiluxFitmentData);
      vi.mocked(products.getProductByType).mockReturnValue(undefined as any);

      const result = getFitmentRecommendation(validVehicle);

      expect(result.status).toBe('NO_MATCH');
    });
  });

  describe('Edge Cases', () => {
    it('maneja vehículos con campos opcionales', () => {
      const vehicleWithTrim = createVehicle({
        trim: 'Limited',
        engine: '2.8L Diesel',
      });

      vi.mocked(vehicleData.findFitmentData).mockReturnValue(toyotaHiluxFitmentData);
      vi.mocked(products.getProductByType).mockReturnValue(availableProduct);

      const result = getFitmentRecommendation(vehicleWithTrim);

      expect(result.status).toBe('MATCH');
      // Los campos opcionales no deben afectar la búsqueda
      expect(vehicleData.findFitmentData).toHaveBeenCalledWith(
        'Toyota',
        'Hilux',
        2020
      );
    });

    it('maneja fitment data sin notes', () => {
      vi.mocked(vehicleData.findFitmentData).mockReturnValue({
        ...toyotaHiluxFitmentData,
        notes: undefined,
      });
      vi.mocked(products.getProductByType).mockReturnValue(availableProduct);

      const result = getFitmentRecommendation(validVehicle);

      expect(result.status).toBe('MATCH');
      expect(result.notes).toBeUndefined();
    });
  });
});

describe('Fitment Engine - getFitmentFromMeasurement', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Measurement Processing', () => {
    it('procesa medición en pulgadas correctamente', () => {
      vi.mocked(sizeRanges.findTypeBySpringGap).mockReturnValue({
        type: 'A+',
        min: 1.5,
        max: 2.0,
        unit: 'inches',
      });
      vi.mocked(products.getProductByType).mockReturnValue(availableProduct);

      const result = getFitmentFromMeasurement(validMeasurementInches);

      expect(result.status).toBe('MATCH');
      expect(result.recommendedType).toBe('A+');
      expect(result.confidence).toBe('HIGH');
      expect(result.notes).toBe('Based on your measurement');
      
      // Debe buscar con el valor directo en inches
      expect(sizeRanges.findTypeBySpringGap).toHaveBeenCalledWith(2.0);
    });

    it('convierte mm a inches correctamente', () => {
      vi.mocked(sizeRanges.findTypeBySpringGap).mockReturnValue({
        type: 'A+',
        min: 1.5,
        max: 2.0,
        unit: 'inches',
      });
      vi.mocked(products.getProductByType).mockReturnValue(availableProduct);

      const result = getFitmentFromMeasurement(validMeasurementMM);

      expect(result.status).toBe('MATCH');
      
      // 50.8mm / 25.4 = 2 inches
      expect(sizeRanges.findTypeBySpringGap).toHaveBeenCalledWith(2);
    });

    it('maneja diferentes conversiones mm → inches', () => {
      const testCases = [
        { mm: 38.1, expectedInches: 1.5 },
        { mm: 63.5, expectedInches: 2.5 },
        { mm: 76.2, expectedInches: 3.0 },
        { mm: 25.4, expectedInches: 1.0 },
      ];

      testCases.forEach(({ mm, expectedInches }) => {
        vi.mocked(sizeRanges.findTypeBySpringGap).mockReturnValue({
          type: 'B+',
          min: 2.0,
          max: 2.5,
          unit: 'inches',
        });
        vi.mocked(products.getProductByType).mockReturnValue(availableProduct);

        getFitmentFromMeasurement(createMeasurement({
          springGap: mm,
          unit: 'mm',
        }));

        // Use closeTo for floating point comparison
        const calls = vi.mocked(sizeRanges.findTypeBySpringGap).mock.calls;
        expect(calls[0][0]).toBeCloseTo(expectedInches, 10);
        vi.clearAllMocks();
      });
    });

    it('retorna springGap range del size range encontrado', () => {
      vi.mocked(sizeRanges.findTypeBySpringGap).mockReturnValue({
        type: 'B+',
        min: 2.0,
        max: 2.5,
        unit: 'inches',
      });
      vi.mocked(products.getProductByType).mockReturnValue({
        ...availableProduct,
        type: 'B+',
      });

      const result = getFitmentFromMeasurement(validMeasurementInches);

      expect(result.springGap).toEqual({
        min: 2.0,
        max: 2.5,
      });
    });
  });

  describe('Input Validation', () => {
    it('retorna UNKNOWN cuando springGap es 0', () => {
      const result = getFitmentFromMeasurement(invalidMeasurementZero);

      expect(result.status).toBe('UNKNOWN');
      expect(result.notes).toContain('valid spring gap measurement');
      expect(sizeRanges.findTypeBySpringGap).not.toHaveBeenCalled();
    });

    it('retorna UNKNOWN cuando springGap es negativo', () => {
      const result = getFitmentFromMeasurement(invalidMeasurementNegative);

      expect(result.status).toBe('UNKNOWN');
      expect(result.notes).toContain('valid spring gap measurement');
    });

    it('retorna UNKNOWN cuando springGap es undefined', () => {
      const result = getFitmentFromMeasurement({
        springGap: undefined as any,
        unit: 'inches',
      });

      expect(result.status).toBe('UNKNOWN');
    });

    it('retorna UNKNOWN cuando springGap es null', () => {
      const result = getFitmentFromMeasurement({
        springGap: null as any,
        unit: 'inches',
      });

      expect(result.status).toBe('UNKNOWN');
    });
  });

  describe('No Match Scenarios', () => {
    it('retorna NO_MATCH cuando no hay size range para la medida', () => {
      vi.mocked(sizeRanges.findTypeBySpringGap).mockReturnValue(undefined);

      const result = getFitmentFromMeasurement(largeMeasurement);

      expect(result.status).toBe('NO_MATCH');
      expect(result.notes).toContain('No product matches');
      expect(result.notes).toContain('verify your measurement');
    });

    it('retorna NO_MATCH cuando producto no está disponible', () => {
      vi.mocked(sizeRanges.findTypeBySpringGap).mockReturnValue({
        type: 'E',
        min: 0.75,
        max: 1.25,
        unit: 'inches',
      });
      vi.mocked(products.getProductByType).mockReturnValue(unavailableProduct);

      const result = getFitmentFromMeasurement(validMeasurementInches);

      expect(result.status).toBe('NO_MATCH');
      expect(result.notes).toContain('currently unavailable');
    });

    it('retorna NO_MATCH cuando producto no existe', () => {
      vi.mocked(sizeRanges.findTypeBySpringGap).mockReturnValue({
        type: 'A+',
        min: 1.5,
        max: 2.0,
        unit: 'inches',
      });
      vi.mocked(products.getProductByType).mockReturnValue(undefined);

      const result = getFitmentFromMeasurement(validMeasurementInches);

      expect(result.status).toBe('NO_MATCH');
    });
  });

  describe('Edge Cases', () => {
    it('maneja medidas muy pequeñas', () => {
      vi.mocked(sizeRanges.findTypeBySpringGap).mockReturnValue(undefined);

      const result = getFitmentFromMeasurement(createMeasurement({
        springGap: 0.25,
        unit: 'inches',
      }));

      expect(result.status).toBe('NO_MATCH');
    });

    it('maneja medidas muy grandes', () => {
      vi.mocked(sizeRanges.findTypeBySpringGap).mockReturnValue(undefined);

      const result = getFitmentFromMeasurement(largeMeasurement);

      expect(result.status).toBe('NO_MATCH');
    });

    it('maneja position opcional en measurement', () => {
      vi.mocked(sizeRanges.findTypeBySpringGap).mockReturnValue({
        type: 'A+',
        min: 1.5,
        max: 2.0,
        unit: 'inches',
      });
      vi.mocked(products.getProductByType).mockReturnValue(availableProduct);

      const measurementWithPosition = createMeasurement({
        position: 'rear',
      });

      const result = getFitmentFromMeasurement(measurementWithPosition);

      expect(result.status).toBe('MATCH');
      // Position no debe afectar el cálculo
    });
  });
});

describe('Fitment Engine - getConfidenceBadgeInfo', () => {
  it('retorna info correcta para HIGH confidence', () => {
    const result = getConfidenceBadgeInfo('HIGH');

    expect(result.text).toBe('Alta Confianza');
    expect(result.description).toContain('respaldado por nuestros datos');
    expect(result.variant).toBe('high');
  });

  it('retorna info correcta para MEDIUM confidence', () => {
    const result = getConfidenceBadgeInfo('MEDIUM');

    expect(result.text).toBe('Coincidencia Probable');
    expect(result.description).toContain('verificar el espacio');
    expect(result.variant).toBe('medium');
  });

  it('retorna info correcta para MEASUREMENT_REQUIRED', () => {
    const result = getConfidenceBadgeInfo('MEASUREMENT_REQUIRED');

    expect(result.text).toBe('Medida Requerida');
    expect(result.description).toContain('medida rápida');
    expect(result.variant).toBe('measurement');
  });

  it('procesa todos los casos de confidenceBadgeTestData', () => {
    confidenceBadgeTestData.forEach(({ confidence, expectedText, expectedVariant }: any) => {
      const result = getConfidenceBadgeInfo(confidence);

      expect(result.text).toBe(expectedText);
      expect(result.variant).toBe(expectedVariant);
      expect(result.description).toBeDefined();
      expect(result.description.length).toBeGreaterThan(0);
    });
  });
});

describe('Fitment Engine - Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('workflow completo: vehículo conocido → producto disponible', () => {
    // Simular flujo completo
    vi.mocked(vehicleData.findFitmentData).mockReturnValue(toyotaHiluxFitmentData);
    vi.mocked(products.getProductByType).mockReturnValue(availableProduct);

    const fitmentResult = getFitmentRecommendation(validVehicle);

    expect(fitmentResult.status).toBe('MATCH');
    expect(fitmentResult.product).toBeDefined();

    if (fitmentResult.confidence) {
      const badgeInfo = getConfidenceBadgeInfo(fitmentResult.confidence);
      expect(badgeInfo.text).toBeDefined();
      expect(badgeInfo.variant).toBeDefined();
    }
  });

  it('workflow completo: vehículo desconocido → measurement → producto', () => {
    // Step 1: Vehículo no encontrado
    vi.mocked(vehicleData.findFitmentData).mockReturnValue(undefined);
    const vehicleResult = getFitmentRecommendation(unknownVehicle);
    
    expect(vehicleResult.status).toBe('MEASUREMENT_REQUIRED');
    
    // Step 2: Usuario proporciona medida
    vi.mocked(sizeRanges.findTypeBySpringGap).mockReturnValue({
      type: 'A+',
      min: 1.5,
      max: 2.0,
      unit: 'inches',
    });
    vi.mocked(products.getProductByType).mockReturnValue(availableProduct);
    
    const measurementResult = getFitmentFromMeasurement(validMeasurementInches);
    
    expect(measurementResult.status).toBe('MATCH');
    expect(measurementResult.product).toBeDefined();
    expect(measurementResult.confidence).toBe('HIGH');
  });

  it('maneja todos los tipos de producto correctamente', () => {
    const productTypes: Array<{ type: any; min: number; max: number }> = [
      { type: 'E', min: 0.75, max: 1.25 },
      { type: 'D', min: 3.0, max: 3.5 },
      { type: 'C', min: 2.5, max: 3.0 },
      { type: 'B+', min: 2.0, max: 2.5 },
      { type: 'A+', min: 1.5, max: 2.0 },
    ];

    productTypes.forEach(({ type, min, max }) => {
      vi.mocked(sizeRanges.findTypeBySpringGap).mockReturnValue({
        type,
        min,
        max,
        unit: 'inches',
      });
      
      vi.mocked(products.getProductByType).mockReturnValue({
        ...availableProduct,
        type,
      });

      const result = getFitmentFromMeasurement(createMeasurement({
        springGap: (min + max) / 2,
        unit: 'inches',
      }));

      expect(result.status).toBe('MATCH');
      expect(result.recommendedType).toBe(type);
      
      vi.clearAllMocks();
    });
  });
});
