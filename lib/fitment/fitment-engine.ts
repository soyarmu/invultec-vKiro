import {
  Vehicle,
  FitmentRecommendation,
  MeasurementInput,
  FitmentStatus,
  FitmentConfidence,
} from '@/types/fitment';
import { findFitmentData } from '@/data/fitment/vehicle-data';
import { findTypeBySpringGap } from '@/data/fitment/size-ranges';
import { getProductByType } from '@/data/products/products';

/**
 * Core fitment recommendation engine
 * Separated from UI for testability and maintainability
 * 
 * Business logic layer - can be replaced with API calls
 */

/**
 * Get fitment recommendation based on vehicle information
 */
export function getFitmentRecommendation(
  vehicle: Vehicle
): FitmentRecommendation {
  // Validate input
  if (!vehicle.make || !vehicle.model || !vehicle.year) {
    return {
      status: 'UNKNOWN',
      notes: 'Please provide complete vehicle information',
    };
  }

  // Look up vehicle in fitment database
  const fitmentData = findFitmentData(
    vehicle.make,
    vehicle.model,
    vehicle.year
  );

  // No match found - require measurement
  if (!fitmentData) {
    return {
      status: 'MEASUREMENT_REQUIRED',
      confidence: 'MEASUREMENT_REQUIRED',
      notes: 'We need a spring gap measurement to confirm your fit',
    };
  }

  // Get product for recommended type
  const product = getProductByType(fitmentData.recommendedType);

  if (!product) {
    return {
      status: 'NO_MATCH',
      notes: 'Product temporarily unavailable',
    };
  }

  if (!product.available) {
    return {
      status: 'NO_MATCH',
      notes: 'This product is currently out of stock',
    };
  }

  // Return successful match
  return {
    status: 'MATCH',
    recommendedType: fitmentData.recommendedType,
    confidence: fitmentData.confidence,
    springGap: {
      min: fitmentData.springGapMin,
      max: fitmentData.springGapMax,
    },
    product,
    notes: fitmentData.notes,
    isDemo: fitmentData.isDemo,
  };
}

/**
 * Get fitment recommendation based on manual measurement
 */
export function getFitmentFromMeasurement(
  measurement: MeasurementInput
): FitmentRecommendation {
  // Validate measurement
  if (!measurement.springGap || measurement.springGap <= 0) {
    return {
      status: 'UNKNOWN',
      notes: 'Please provide a valid spring gap measurement',
    };
  }

  // Convert to inches if needed
  let springGapInches = measurement.springGap;
  if (measurement.unit === 'mm') {
    springGapInches = measurement.springGap / 25.4;
  }

  // Find matching size range
  const sizeRange = findTypeBySpringGap(springGapInches);

  if (!sizeRange) {
    return {
      status: 'NO_MATCH',
      notes: 'No product matches this spring gap measurement. Please verify your measurement.',
    };
  }

  // Get product for this type
  const product = getProductByType(sizeRange.type);

  if (!product || !product.available) {
    return {
      status: 'NO_MATCH',
      notes: 'Product currently unavailable for this size',
    };
  }

  // Return successful match from measurement
  return {
    status: 'MATCH',
    recommendedType: sizeRange.type,
    confidence: 'HIGH',
    springGap: {
      min: sizeRange.min,
      max: sizeRange.max,
    },
    product,
    notes: 'Based on your measurement',
  };
}

/**
 * Get confidence badge text and styling
 */
export function getConfidenceBadgeInfo(confidence: FitmentConfidence): {
  text: string;
  description: string;
  variant: 'high' | 'medium' | 'measurement';
} {
  switch (confidence) {
    case 'HIGH':
      return {
        text: 'High Confidence',
        description: 'This fit is supported by our vehicle compatibility data',
        variant: 'high',
      };
    case 'MEDIUM':
      return {
        text: 'Likely Match',
        description: 'We recommend verifying your spring gap before ordering',
        variant: 'medium',
      };
    case 'MEASUREMENT_REQUIRED':
      return {
        text: 'Measurement Required',
        description: 'We need one quick measurement to confirm your fit',
        variant: 'measurement',
      };
  }
}
