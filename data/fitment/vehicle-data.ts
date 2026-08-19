import { FitmentData } from '@/types/fitment';

/**
 * DEMO VEHICLE FITMENT DATA
 * This is clearly labeled demo data for demonstration purposes
 * In production, this would be replaced with:
 * - REST API calls
 * - Database queries
 * - CMS integration
 * - External fitment API
 */
export const VEHICLE_FITMENT_DATA: FitmentData[] = [
  // Toyota
  {
    make: 'Toyota',
    model: 'Camry',
    yearStart: 2018,
    yearEnd: 2024,
    position: 'rear',
    recommendedType: 'C',
    springGapMin: 1.25,
    springGapMax: 1.45,
    confidence: 'HIGH',
    isDemo: true,
  },
  {
    make: 'Toyota',
    model: 'Corolla',
    yearStart: 2019,
    yearEnd: 2024,
    position: 'rear',
    recommendedType: 'D',
    springGapMin: 1.10,
    springGapMax: 1.25,
    confidence: 'HIGH',
    isDemo: true,
  },
  {
    make: 'Toyota',
    model: 'RAV4',
    yearStart: 2019,
    yearEnd: 2024,
    position: 'rear',
    recommendedType: 'C',
    springGapMin: 1.25,
    springGapMax: 1.45,
    confidence: 'HIGH',
    isDemo: true,
  },
  {
    make: 'Toyota',
    model: 'Highlander',
    yearStart: 2020,
    yearEnd: 2024,
    position: 'rear',
    recommendedType: 'B+',
    springGapMin: 1.65,
    springGapMax: 1.85,
    confidence: 'HIGH',
    isDemo: true,
  },
  
  // Honda
  {
    make: 'Honda',
    model: 'Civic',
    yearStart: 2016,
    yearEnd: 2024,
    position: 'rear',
    recommendedType: 'D',
    springGapMin: 1.10,
    springGapMax: 1.25,
    confidence: 'HIGH',
    isDemo: true,
  },
  {
    make: 'Honda',
    model: 'Accord',
    yearStart: 2018,
    yearEnd: 2024,
    position: 'rear',
    recommendedType: 'C',
    springGapMin: 1.25,
    springGapMax: 1.45,
    confidence: 'HIGH',
    isDemo: true,
  },
  {
    make: 'Honda',
    model: 'CR-V',
    yearStart: 2017,
    yearEnd: 2024,
    position: 'rear',
    recommendedType: 'C',
    springGapMin: 1.25,
    springGapMax: 1.45,
    confidence: 'MEDIUM',
    notes: 'Verify spring gap before ordering',
    isDemo: true,
  },
  {
    make: 'Honda',
    model: 'Pilot',
    yearStart: 2016,
    yearEnd: 2024,
    position: 'rear',
    recommendedType: 'B+',
    springGapMin: 1.65,
    springGapMax: 1.85,
    confidence: 'HIGH',
    isDemo: true,
  },
  
  // Ford
  {
    make: 'Ford',
    model: 'F-150',
    yearStart: 2015,
    yearEnd: 2024,
    position: 'rear',
    recommendedType: 'A+',
    springGapMin: 2.60,
    springGapMax: 3.50,
    confidence: 'MEDIUM',
    notes: 'Varies by trim and suspension package',
    isDemo: true,
  },
  {
    make: 'Ford',
    model: 'Explorer',
    yearStart: 2020,
    yearEnd: 2024,
    position: 'rear',
    recommendedType: 'C',
    springGapMin: 1.25,
    springGapMax: 1.45,
    confidence: 'HIGH',
    isDemo: true,
  },
  {
    make: 'Ford',
    model: 'Escape',
    yearStart: 2020,
    yearEnd: 2024,
    position: 'rear',
    recommendedType: 'D',
    springGapMin: 1.10,
    springGapMax: 1.25,
    confidence: 'HIGH',
    isDemo: true,
  },
  
  // Chevrolet
  {
    make: 'Chevrolet',
    model: 'Silverado 1500',
    yearStart: 2019,
    yearEnd: 2024,
    position: 'rear',
    recommendedType: 'A+',
    springGapMin: 2.60,
    springGapMax: 3.50,
    confidence: 'MEDIUM',
    notes: 'Check spring gap - varies by configuration',
    isDemo: true,
  },
  {
    make: 'Chevrolet',
    model: 'Equinox',
    yearStart: 2018,
    yearEnd: 2024,
    position: 'rear',
    recommendedType: 'C',
    springGapMin: 1.25,
    springGapMax: 1.45,
    confidence: 'HIGH',
    isDemo: true,
  },
  {
    make: 'Chevrolet',
    model: 'Malibu',
    yearStart: 2016,
    yearEnd: 2023,
    position: 'rear',
    recommendedType: 'C',
    springGapMin: 1.25,
    springGapMax: 1.45,
    confidence: 'HIGH',
    isDemo: true,
  },
  
  // Nissan
  {
    make: 'Nissan',
    model: 'Altima',
    yearStart: 2019,
    yearEnd: 2024,
    position: 'rear',
    recommendedType: 'C',
    springGapMin: 1.25,
    springGapMax: 1.45,
    confidence: 'HIGH',
    isDemo: true,
  },
  {
    make: 'Nissan',
    model: 'Rogue',
    yearStart: 2021,
    yearEnd: 2024,
    position: 'rear',
    recommendedType: 'C',
    springGapMin: 1.25,
    springGapMax: 1.45,
    confidence: 'HIGH',
    isDemo: true,
  },
];

/**
 * Get unique vehicle makes
 */
export function getVehicleMakes(): string[] {
  const makes = new Set(VEHICLE_FITMENT_DATA.map((v) => v.make));
  return Array.from(makes).sort();
}

/**
 * Get models for a specific make
 */
export function getVehicleModels(make: string): string[] {
  const models = new Set(
    VEHICLE_FITMENT_DATA.filter((v) => v.make === make).map((v) => v.model)
  );
  return Array.from(models).sort();
}

/**
 * Get years for a specific make and model
 */
export function getVehicleYears(make: string, model: string): number[] {
  const entries = VEHICLE_FITMENT_DATA.filter(
    (v) => v.make === make && v.model === model
  );
  
  const years = new Set<number>();
  entries.forEach((entry) => {
    for (let year = entry.yearStart; year <= entry.yearEnd; year++) {
      years.add(year);
    }
  });
  
  return Array.from(years).sort((a, b) => b - a); // Most recent first
}

/**
 * Find fitment data for a specific vehicle
 */
export function findFitmentData(
  make: string,
  model: string,
  year: number
): FitmentData | undefined {
  return VEHICLE_FITMENT_DATA.find(
    (v) =>
      v.make === make &&
      v.model === model &&
      year >= v.yearStart &&
      year <= v.yearEnd
  );
}
