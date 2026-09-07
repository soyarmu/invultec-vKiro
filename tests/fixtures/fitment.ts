import {
  FitmentData,
  FitmentRecommendation,
  MeasurementInput,
  SizeRange,
  FitmentConfidence,
} from '@/types/fitment';
import { availableProduct, unavailableProduct } from './products';

/**
 * Fitment Data Fixtures
 * Reusable test data for fitment engine testing
 */

export const toyotaHiluxFitmentData: FitmentData = {
  make: 'Toyota',
  model: 'Hilux',
  yearStart: 2016,
  yearEnd: 2023,
  position: 'rear',
  recommendedType: 'A+',
  springGapMin: 1.5,
  springGapMax: 2.0,
  confidence: 'HIGH',
  notes: 'Fitment confirmado para suspensión trasera',
};

export const chevroletColoradoFitmentData: FitmentData = {
  make: 'Chevrolet',
  model: 'Colorado',
  yearStart: 2015,
  yearEnd: 2022,
  position: 'rear',
  recommendedType: 'B+',
  springGapMin: 2.0,
  springGapMax: 2.5,
  confidence: 'HIGH',
  notes: 'Recomendado para modelos 4x4',
};

export const mediumConfidenceFitmentData: FitmentData = {
  make: 'Nissan',
  model: 'Frontier',
  yearStart: 2017,
  yearEnd: 2021,
  position: 'rear',
  recommendedType: 'B+',
  springGapMin: 2.0,
  springGapMax: 2.5,
  confidence: 'MEDIUM',
  notes: 'Verificar medida de resorte antes de ordenar',
};

export const demoFitmentData: FitmentData = {
  make: 'Ford',
  model: 'Ranger',
  yearStart: 2019,
  yearEnd: 2024,
  position: 'rear',
  recommendedType: 'A+',
  springGapMin: 1.5,
  springGapMax: 2.0,
  confidence: 'HIGH',
  notes: 'Datos de demostración',
  isDemo: true,
};

/**
 * Fitment Recommendation Fixtures
 */

export const matchRecommendation: FitmentRecommendation = {
  status: 'MATCH',
  recommendedType: 'A+',
  confidence: 'HIGH',
  springGap: {
    min: 1.5,
    max: 2.0,
  },
  product: availableProduct,
  notes: 'Fitment confirmado',
};

export const measurementRequiredRecommendation: FitmentRecommendation = {
  status: 'MEASUREMENT_REQUIRED',
  confidence: 'MEASUREMENT_REQUIRED',
  notes: 'Necesitamos una medida de la separación de espiras',
};

export const noMatchRecommendation: FitmentRecommendation = {
  status: 'NO_MATCH',
  notes: 'No hay producto disponible para este vehículo',
};

export const outOfStockRecommendation: FitmentRecommendation = {
  status: 'NO_MATCH',
  recommendedType: 'E',
  confidence: 'HIGH',
  springGap: {
    min: 0.75,
    max: 1.25,
  },
  product: unavailableProduct,
  notes: 'Producto temporalmente agotado',
};

export const unknownRecommendation: FitmentRecommendation = {
  status: 'UNKNOWN',
  notes: 'Por favor proporciona información completa del vehículo',
};

/**
 * Measurement Input Fixtures
 */

export const validMeasurementInches: MeasurementInput = {
  springGap: 2.0,
  unit: 'inches',
  position: 'rear',
};

export const validMeasurementMM: MeasurementInput = {
  springGap: 50.8, // 2 inches in mm
  unit: 'mm',
  position: 'rear',
};

export const invalidMeasurementZero: MeasurementInput = {
  springGap: 0,
  unit: 'inches',
};

export const invalidMeasurementNegative: MeasurementInput = {
  springGap: -5,
  unit: 'mm',
};

export const largeMeasurement: MeasurementInput = {
  springGap: 10.0,
  unit: 'inches',
};

export const smallMeasurement: MeasurementInput = {
  springGap: 0.5,
  unit: 'inches',
};

/**
 * Size Range Fixtures
 */

export const sizeRangeAPLus: SizeRange = {
  type: 'A+',
  min: 1.5,
  max: 2.0,
  unit: 'inches',
};

export const sizeRangeBPlus: SizeRange = {
  type: 'B+',
  min: 2.0,
  max: 2.5,
  unit: 'inches',
};

export const sizeRangeC: SizeRange = {
  type: 'C',
  min: 2.5,
  max: 3.0,
  unit: 'inches',
};

/**
 * Factory functions
 */

export function createFitmentData(overrides?: Partial<FitmentData>): FitmentData {
  return {
    ...toyotaHiluxFitmentData,
    ...overrides,
  };
}

export function createMeasurement(overrides?: Partial<MeasurementInput>): MeasurementInput {
  return {
    ...validMeasurementInches,
    ...overrides,
  };
}

export function createFitmentRecommendation(
  overrides?: Partial<FitmentRecommendation>
): FitmentRecommendation {
  return {
    ...matchRecommendation,
    ...overrides,
  };
}

/**
 * Confidence badge test data
 */
export const confidenceBadgeTestData: Array<{
  confidence: FitmentConfidence;
  expectedText: string;
  expectedVariant: 'high' | 'medium' | 'measurement';
}> = [
  {
    confidence: 'HIGH',
    expectedText: 'Alta Confianza',
    expectedVariant: 'high',
  },
  {
    confidence: 'MEDIUM',
    expectedText: 'Coincidencia Probable',
    expectedVariant: 'medium',
  },
  {
    confidence: 'MEASUREMENT_REQUIRED',
    expectedText: 'Medida Requerida',
    expectedVariant: 'measurement',
  },
];
