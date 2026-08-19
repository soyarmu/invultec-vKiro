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
                Buenas noticias — encontramos tu ajuste
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
                Tipo Recomendado
              </p>
              <p className="mt-1 text-2xl font-bold text-neutral-900">
                Tipo {recommendedType}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-700">Espacio del Resorte</p>
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
              <Badge variant="demo">DATOS DE DEMOSTRACIÓN</Badge>
              <p className="mt-2 text-xs text-neutral-500">
                Estos son datos de demostración. El sistema de producción usaría
                datos de compatibilidad vehicular verificados.
              </p>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h3 className="mb-4 text-lg font-semibold text-neutral-900">
            Producto Recomendado
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
            Verificar otro vehículo
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
                Aún no tenemos un ajuste verificado para este vehículo
              </h2>
              <p className="mt-2 text-neutral-600">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border-2 border-neutral-200 bg-neutral-50 p-6">
          <p className="text-neutral-700">
            {notes || "No hay datos de ajuste disponibles para este vehículo."}
          </p>
          <p className="mt-4 text-sm text-neutral-600">
            Aún puedes encontrar el tamaño correcto midiendo el espacio de tu resorte.
          </p>
          <a
            href="#measurement-guide"
            className="mt-4 inline-block font-medium text-brand-red hover:underline"
          >
            Ver guía de medición →
          </a>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onReset}
            className="text-sm text-neutral-600 hover:text-neutral-900 hover:underline"
          >
            Intentar con otro vehículo
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
              No se puede determinar el ajuste
            </h2>
            <p className="mt-2 text-neutral-600">
              {notes || 'Por favor verifica la información de tu vehículo e intenta nuevamente.'}
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onReset}
          className="text-sm text-neutral-600 hover:text-neutral-900 hover:underline"
        >
          Intentar nuevamente
        </button>
      </div>
    </div>
  );
}
