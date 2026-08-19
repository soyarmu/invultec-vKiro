/**
 * Vehicle Information
 */
export interface Vehicle {
  make: string;
  model: string;
  year: number;
  trim?: string;
  engine?: string;
  driveType?: string;
}

/**
 * Product Type Definitions
 */
export type ProductType = 'E' | 'D' | 'C' | 'B+' | 'A+';

/**
 * Fitment Confidence Levels
 */
export type FitmentConfidence = 'HIGH' | 'MEDIUM' | 'MEASUREMENT_REQUIRED';

/**
 * Fitment Status
 */
export type FitmentStatus = 'MATCH' | 'MEASUREMENT_REQUIRED' | 'NO_MATCH' | 'UNKNOWN';

/**
 * Fitment Data Entry
 */
export interface FitmentData {
  make: string;
  model: string;
  yearStart: number;
  yearEnd: number;
  trim?: string | null;
  position: 'front' | 'rear' | 'both';
  recommendedType: ProductType;
  springGapMin: number;
  springGapMax: number;
  confidence: Exclude<FitmentConfidence, 'MEASUREMENT_REQUIRED'>;
  notes?: string;
  isDemo?: boolean; // Explicitly flag demo data
}

/**
 * Product Information
 */
export interface Product {
  id: string;
  name: string;
  type: ProductType;
  price: number;
  image: string;
  description: string;
  springGapMin: number;
  springGapMax: number;
  purchaseUrl: string;
  available: boolean;
  quantityInPack: number;
}

/**
 * Size Range Configuration
 */
export interface SizeRange {
  type: ProductType;
  min: number;
  max: number;
  unit: 'inches' | 'mm';
}

/**
 * Fitment Recommendation Result
 */
export interface FitmentRecommendation {
  status: FitmentStatus;
  recommendedType?: ProductType;
  confidence?: FitmentConfidence;
  springGap?: {
    min: number;
    max: number;
  };
  product?: Product;
  notes?: string;
  isDemo?: boolean; // Pass through demo flag
}

/**
 * Measurement Input
 */
export interface MeasurementInput {
  springGap: number;
  unit: 'inches' | 'mm';
  position?: 'front' | 'rear';
}
