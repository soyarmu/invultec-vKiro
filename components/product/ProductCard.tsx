import { Product } from '@/types/fitment';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  onPrimaryClick: () => void;
  onSecondaryClick?: () => void;
}

export function ProductCard({
  product,
  onPrimaryClick,
  onSecondaryClick,
}: ProductCardProps) {
  return (
    <div className="card overflow-hidden">
      <div className="relative aspect-square w-full bg-neutral-100">
        {/* Placeholder for product image */}
        <div className="flex h-full items-center justify-center">
          <Package className="h-20 w-20 text-neutral-300" aria-hidden="true" />
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-neutral-900">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-neutral-600">
            Type {product.type} • {product.quantityInPack}-Pack
          </p>
          <p className="mt-2 text-sm text-neutral-600">{product.description}</p>
        </div>

        <div className="mb-4 flex items-baseline gap-2">
          <span className="text-3xl font-bold text-neutral-900">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <div className="mb-4 rounded-md bg-neutral-50 p-3">
          <p className="text-xs font-medium text-neutral-700">Spring Gap</p>
          <p className="text-sm text-neutral-900">
            {product.springGapMin.toFixed(2)}&quot; – {product.springGapMax.toFixed(2)}&quot;
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            variant="primary"
            size="lg"
            onClick={onPrimaryClick}
            className="w-full"
          >
            Get My Fit
          </Button>
          {onSecondaryClick && (
            <Button
              variant="outline"
              size="md"
              onClick={onSecondaryClick}
              className="w-full"
            >
              Verify My Size
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
