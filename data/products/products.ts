import { Product, ProductType } from '@/types/fitment';

/**
 * Product catalog
 * Supports multiple SKUs for different sizes
 */
export const PRODUCTS: Product[] = [
  {
    id: 'buffer-type-e',
    name: 'Universal Coil Spring Buffer',
    type: 'E',
    price: 24.99,
    image: '/images/product-buffer-e.jpg',
    description: 'Type E - Compact size for smaller spring gaps',
    springGapMin: 0.85,
    springGapMax: 1.10,
    purchaseUrl: '#',
    available: true,
    quantityInPack: 2,
  },
  {
    id: 'buffer-type-d',
    name: 'Universal Coil Spring Buffer',
    type: 'D',
    price: 26.99,
    image: '/images/product-buffer-d.jpg',
    description: 'Type D - Standard size for most compact vehicles',
    springGapMin: 1.10,
    springGapMax: 1.25,
    purchaseUrl: '#',
    available: true,
    quantityInPack: 2,
  },
  {
    id: 'buffer-type-c',
    name: 'Universal Coil Spring Buffer',
    type: 'C',
    price: 28.99,
    image: '/images/product-buffer-c.jpg',
    description: 'Type C - Mid-size vehicles and crossovers',
    springGapMin: 1.25,
    springGapMax: 1.45,
    purchaseUrl: '#',
    available: true,
    quantityInPack: 2,
  },
  {
    id: 'buffer-type-b-plus',
    name: 'Universal Coil Spring Buffer',
    type: 'B+',
    price: 32.99,
    image: '/images/product-buffer-b-plus.jpg',
    description: 'Type B+ - Larger vehicles and SUVs',
    springGapMin: 1.65,
    springGapMax: 1.85,
    purchaseUrl: '#',
    available: true,
    quantityInPack: 2,
  },
  {
    id: 'buffer-type-a-plus',
    name: 'Universal Coil Spring Buffer',
    type: 'A+',
    price: 36.99,
    image: '/images/product-buffer-a-plus.jpg',
    description: 'Type A+ - Heavy-duty for trucks and large SUVs',
    springGapMin: 2.60,
    springGapMax: 3.50,
    purchaseUrl: '#',
    available: true,
    quantityInPack: 2,
  },
];

/**
 * Get product by type
 */
export function getProductByType(type: ProductType): Product | undefined {
  return PRODUCTS.find((p) => p.type === type);
}

/**
 * Get all available products
 */
export function getAvailableProducts(): Product[] {
  return PRODUCTS.filter((p) => p.available);
}
