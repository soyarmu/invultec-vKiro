import { Vehicle } from '@/types/fitment';

/**
 * Vehicle Fixtures
 * Reusable test data for vehicle-related tests
 */

export const validVehicle: Vehicle = {
  make: 'Toyota',
  model: 'Hilux',
  year: 2020,
};

export const incompleteVehicle: Vehicle = {
  make: 'Toyota',
  model: '',
  year: 0,
};

export const unknownVehicle: Vehicle = {
  make: 'UnknownMake',
  model: 'UnknownModel',
  year: 2025,
};

export const vehicleWithTrim: Vehicle = {
  make: 'Chevrolet',
  model: 'Colorado',
  year: 2019,
  trim: 'LT',
};

export const vehicleWithFullDetails: Vehicle = {
  make: 'Ford',
  model: 'Ranger',
  year: 2021,
  trim: 'XLT',
  engine: '2.3L Turbo',
  driveType: '4WD',
};

/**
 * Factory function to create custom vehicle fixtures
 * @param overrides - Partial vehicle data to override defaults
 * @returns Vehicle with merged data
 */
export function createVehicle(overrides?: Partial<Vehicle>): Vehicle {
  return {
    ...validVehicle,
    ...overrides,
  };
}

/**
 * Create a batch of vehicles for bulk testing
 */
export function createVehicleBatch(count: number): Vehicle[] {
  const makes = ['Toyota', 'Chevrolet', 'Ford', 'Nissan', 'Mazda'];
  const models = ['Hilux', 'Colorado', 'Ranger', 'Frontier', 'BT-50'];
  
  return Array.from({ length: count }, (_, i) => ({
    make: makes[i % makes.length],
    model: models[i % models.length],
    year: 2015 + (i % 10),
  }));
}
