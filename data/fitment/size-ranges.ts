import { SizeRange } from '@/types/fitment';

/**
 * Configurable size ranges for each product type
 * These values can be adjusted without changing UI components
 */
export const SIZE_RANGES: SizeRange[] = [
  {
    type: 'E',
    min: 0.85,
    max: 1.10,
    unit: 'inches',
  },
  {
    type: 'D',
    min: 1.10,
    max: 1.25,
    unit: 'inches',
  },
  {
    type: 'C',
    min: 1.25,
    max: 1.45,
    unit: 'inches',
  },
  {
    type: 'B+',
    min: 1.65,
    max: 1.85,
    unit: 'inches',
  },
  {
    type: 'A+',
    min: 2.60,
    max: 3.50,
    unit: 'inches',
  },
];

/**
 * Get size range for a specific product type
 */
export function getSizeRange(type: string): SizeRange | undefined {
  return SIZE_RANGES.find((range) => range.type === type);
}

/**
 * Find product type based on spring gap measurement
 */
export function findTypeBySpringGap(springGap: number): SizeRange | undefined {
  return SIZE_RANGES.find(
    (range) => springGap >= range.min && springGap <= range.max
  );
}
