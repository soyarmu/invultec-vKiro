/**
 * Lead Fixtures
 * Reusable test data for lead capture and API testing
 */

export interface LeadData {
  name: string;
  phone: string;
  brand: string;
  model: string;
  year: string;
  quantity?: number;
  hp?: string; // honeypot field
}

export const validLead: LeadData = {
  name: 'Juan Pérez',
  phone: '3001234567',
  brand: 'Toyota',
  model: 'Hilux',
  year: '2020',
  quantity: 1,
};

export const invalidPhoneLead: LeadData = {
  name: 'María García',
  phone: '1234567', // Invalid: less than 10 digits, doesn't start with 3
  brand: 'Chevrolet',
  model: 'Colorado',
  year: '2019',
  quantity: 1,
};

export const shortNameLead: LeadData = {
  name: 'A', // Invalid: less than 2 characters
  phone: '3009876543',
  brand: 'Ford',
  model: 'Ranger',
  year: '2021',
  quantity: 1,
};

export const missingVehicleInfoLead: LeadData = {
  name: 'Carlos López',
  phone: '3005551234',
  brand: '', // Missing
  model: '', // Missing
  year: '', // Missing
  quantity: 1,
};

export const leadWithHoneypot: LeadData = {
  name: 'Bot User',
  phone: '3001111111',
  brand: 'Toyota',
  model: 'Hilux',
  year: '2020',
  quantity: 1,
  hp: 'bot-filled-value', // Honeypot filled (indicates bot)
};

export const leadWithMultipleQuantity: LeadData = {
  name: 'Pedro Ramírez',
  phone: '3007778888',
  brand: 'Nissan',
  model: 'Frontier',
  year: '2018',
  quantity: 4,
};

/**
 * Factory function to create custom lead fixtures
 * @param overrides - Partial lead data to override defaults
 * @returns LeadData with merged data
 */
export function createLead(overrides?: Partial<LeadData>): LeadData {
  return {
    ...validLead,
    ...overrides,
  };
}

/**
 * Create a batch of leads for bulk testing
 */
export function createLeadBatch(count: number): LeadData[] {
  const names = ['Juan Pérez', 'María García', 'Carlos López', 'Ana Rodríguez', 'Pedro Ramírez'];
  const brands = ['Toyota', 'Chevrolet', 'Ford', 'Nissan', 'Mazda'];
  const models = ['Hilux', 'Colorado', 'Ranger', 'Frontier', 'BT-50'];
  
  return Array.from({ length: count }, (_, i) => ({
    name: names[i % names.length],
    phone: `300${String(i).padStart(7, '0')}`,
    brand: brands[i % brands.length],
    model: models[i % models.length],
    year: String(2015 + (i % 10)),
    quantity: 1 + (i % 4),
  }));
}

/**
 * Valid Colombian phone numbers for testing
 */
export const validColombianPhones = [
  '3001234567',
  '3101234567',
  '3201234567',
  '3009876543',
  '3107778888',
  '3205554444',
  '3003332222',
];

/**
 * Invalid Colombian phone numbers for testing
 */
export const invalidColombianPhones = [
  '1234567',      // Too short
  '12345678901',  // Too long
  '2001234567',   // Doesn't start with 3
  '4001234567',   // Doesn't start with 3
  '301234567',    // Only 9 digits
  'abc1234567',   // Contains letters
  '',             // Empty
];
