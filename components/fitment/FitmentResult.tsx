import { Vehicle, FitmentRecommendation } from '@/types/fitment';
import { ConfidenceBadge } from './ConfidenceBadge';
import { ProductCard } from '../product/ProductCard';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { trackProductViewed, trackProductCtaClicked } from '@/lib/analytics/analytics';
import { useEffect } from 'react';

interface FitmentResultProps {
  vehicle: Vehicle;
  recommendation: FitmentRecommendation;
  onReset: () => void;
}

export function FitmentResult({
  vehicle,
  recommendation,
  onReset,
}: FitmentResultProps) {
  const { status, confidence, product, recommendedType, springGap, notes, isDemo } =
    recommendation;

  // Track product view
  useEffect(() => {
    if (product && recommendedType) {
      trackProductViewed(product.id, recommendedType);
    }
  }, [product, recommendedType]);

  const handlePrimaryClick = () => {
    if (product && recommendedType) {
      trackProductCtaClicked(product.id, recommendedType, 'primary');
      // In production, navigate to purchase or add to cart
      window.location.href = product.purchaseUrl;
    }
  };

  const handleSecondaryClick = () => {
    if (product && recommendedType) {
      trackProductCtaClicked(product.id, recommendedType, 'secondary');
      // In production, show measurement verification
    }
  };

  // Success Match
  if (status === 'MATCH' && product && confidence && springGap) {
    return (
      <div>
        <div className="mb-6">
          <div className="flex items-start gap-3">
            <CheckCircle
              className="mt-1 h-6 w-6 flex-shrink-0 text-success"
              aria-hidden="true"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
                Good news — we found your fit
              </h2>
              <p className="mt-2 text-neutral-600">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-lg bg-neutral-50 p-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-neutral-700">
                Recommended Type
              </p>
              <p className="mt-1 text-2xl font-bold text-neutral-900">
                Type {recommendedType}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-700">Spring Gap</p>
              <p className="mt-1 text-2xl font-bold text-neutral-900">
                {springGap.min.toFixed(2)}&quot; – {springGap.max.toFixed(2)}&quot;
              </p>
            </div>
          </div>

          <div className="mt-4 border-t border-neutral-200 pt-4">
            <ConfidenceBadge confidence={confidence} showDescription />
            {notes && (
              <p className="mt-2 text-sm text-neutral-600">{notes}</p>
            )}
          </div>

          {isDemo && (
            <div className="mt-4 border-t border-neutral-200 pt-4">
              <Badge variant="demo">DEMO DATA</Badge>
              <p className="mt-2 text-xs text-neutral-500">
                This is demonstration data. Production system would use verified
                vehicle compatibility data.
              </p>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h3 className="mb-4 text-lg font-semibold text-neutral-900">
            Recommended Product
          </h3>
          <div className="mx-auto max-w-sm">
            <ProductCard
              product={product}
              onPrimaryClick={handlePrimaryClick}
              onSecondaryClick={handleSecondaryClick}
            />
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onReset}
            className="text-sm text-neutral-600 hover:text-neutral-900 hover:underline"
          >
            Check another vehicle
          </button>
        </div>
      </div>
    );
  }

  // No Match
  if (status === 'NO_MATCH') {
    return (
      <div>
        <div className="mb-6">
          <div className="flex items-start gap-3">
            <XCircle
              className="mt-1 h-6 w-6 flex-shrink-0 text-error"
              aria-hidden="true"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
                We don&apos;t have a verified fit for this vehicle yet
              </h2>
              <p className="mt-2 text-neutral-600">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border-2 border-neutral-200 bg-neutral-50 p-6">
          <p className="text-neutral-700">
            {notes || "No fitment data available for this vehicle."}
          </p>
          <p className="mt-4 text-sm text-neutral-600">
            You can still find the right size by measuring your spring gap.
          </p>
          <a
            href="#measurement-guide"
            className="mt-4 inline-block font-medium text-brand-red hover:underline"
          >
            View measurement guide →
          </a>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onReset}
            className="text-sm text-neutral-600 hover:text-neutral-900 hover:underline"
          >
            Try another vehicle
          </button>
        </div>
      </div>
    );
  }

  // Unknown or other status
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle
            className="mt-1 h-6 w-6 flex-shrink-0 text-warning"
            aria-hidden="true"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
              Unable to determine fit
            </h2>
            <p className="mt-2 text-neutral-600">
              {notes || 'Please check your vehicle information and try again.'}
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onReset}
          className="text-sm text-neutral-600 hover:text-neutral-900 hover:underline"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
