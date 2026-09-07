import { Product, ProductType } from '@/types/fitment';

/**
 * Product Fixtures
 * Reusable test data for product-related tests
 */

export const availableProduct: Product = {
  id: 'rs001-a-plus',
  name: 'Rubber Shock RS-001 Tipo A+',
  type: 'A+',
  price: 45000,
  image: '/images/rs001-a-plus.jpg',
  description: 'Amortiguador de hule uretano para resortes helicoidales de 1.5" a 2.0"',
  springGapMin: 1.5,
  springGapMax: 2.0,
  purchaseUrl: '/productos/rs001-a-plus',
  available: true,
  quantityInPack: 2,
};

export const unavailableProduct: Product = {
  id: 'rs001-e',
  name: 'Rubber Shock RS-001 Tipo E',
  type: 'E',
  price: 38000,
  image: '/images/rs001-e.jpg',
  description: 'Amortiguador de hule uretano para resortes helicoidales de 0.75" a 1.25"',
  springGapMin: 0.75,
  springGapMax: 1.25,
  purchaseUrl: '/productos/rs001-e',
  available: false,
  quantityInPack: 2,
};

export const productTypeBPlus: Product = {
  id: 'rs001-b-plus',
  name: 'Rubber Shock RS-001 Tipo B+',
  type: 'B+',
  price: 47000,
  image: '/images/rs001-b-plus.jpg',
  description: 'Amortiguador de hule uretano para resortes helicoidales de 2.0" a 2.5"',
  springGapMin: 2.0,
  springGapMax: 2.5,
  purchaseUrl: '/productos/rs001-b-plus',
  available: true,
  quantityInPack: 2,
};

export const productTypeC: Product = {
  id: 'rs001-c',
  name: 'Rubber Shock RS-001 Tipo C',
  type: 'C',
  price: 49000,
  image: '/images/rs001-c.jpg',
  description: 'Amortiguador de hule uretano para resortes helicoidales de 2.5" a 3.0"',
  springGapMin: 2.5,
  springGapMax: 3.0,
  purchaseUrl: '/productos/rs001-c',
  available: true,
  quantityInPack: 2,
};

export const productTypeD: Product = {
  id: 'rs001-d',
  name: 'Rubber Shock RS-001 Tipo D',
  type: 'D',
  price: 51000,
  image: '/images/rs001-d.jpg',
  description: 'Amortiguador de hule uretano para resortes helicoidales de 3.0" a 3.5"',
  springGapMin: 3.0,
  springGapMax: 3.5,
  purchaseUrl: '/productos/rs001-d',
  available: true,
  quantityInPack: 2,
};

/**
 * Factory function to create custom product fixtures
 * @param overrides - Partial product data to override defaults
 * @returns Product with merged data
 */
export function createProduct(overrides?: Partial<Product>): Product {
  return {
    ...availableProduct,
    ...overrides,
  };
}

/**
 * Get product by type helper for tests
 */
export function getProductByType(type: ProductType): Product {
  const productMap: Record<ProductType, Product> = {
    'A+': availableProduct,
    'B+': productTypeBPlus,
    'C': productTypeC,
    'D': productTypeD,
    'E': unavailableProduct,
  };
  
  return productMap[type];
}

/**
 * Create all product types as an array
 */
export function getAllProducts(): Product[] {
  return [
    availableProduct,
    productTypeBPlus,
    productTypeC,
    productTypeD,
    unavailableProduct,
  ];
}
