'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Ruler } from 'lucide-react';

interface MeasurementInputProps {
  onMeasurementSubmit: (springGap: number) => void;
  disabled?: boolean;
}

export function MeasurementInput({
  onMeasurementSubmit,
  disabled = false,
}: MeasurementInputProps) {
  const [springGap, setSpringGap] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const gap = parseFloat(springGap);
    
    if (!springGap || isNaN(gap) || gap <= 0) {
      setError('Por favor ingrese una medida válida');
      return;
    }

    if (gap < 0.5 || gap > 5) {
      setError('La medida debe estar entre 0.5 y 5 pulgadas');
      return;
    }

    onMeasurementSubmit(gap);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-lg border-2 border-brand-grey-200 bg-brand-grey-50 p-6">
        <div className="mb-4 flex items-start gap-3">
          <Ruler className="mt-1 h-5 w-5 text-brand-red" aria-hidden="true" />
          <div>
            <h4 className="font-semibold text-neutral-900">
              Mide el Espacio de Tu Resorte
            </h4>
            <p className="mt-1 text-sm text-neutral-600">
              Mide el espacio entre las bobinas de tu resorte cuando el vehículo
              está en reposo. Usa una regla o calibrador para mayor precisión.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Input
              type="number"
              step="0.01"
              min="0.5"
              max="5"
              value={springGap}
              onChange={(e) => setSpringGap(e.target.value)}
              placeholder="ej., 1.35"
              label="Espacio del Resorte (pulgadas)"
              error={error}
              disabled={disabled}
              aria-label="Medida del espacio del resorte en pulgadas"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={disabled || !springGap}
            className="sm:w-auto"
          >
            Encontrar Mi Tamaño
          </Button>
        </div>
      </div>

      <div className="text-center text-sm text-neutral-500">
        ¿Necesitas ayuda para medir?{' '}
        <a
          href="#measurement-guide"
          className="font-medium text-brand-red hover:underline"
        >
          Ver guía de medición
        </a>
      </div>
    </form>
  );
}
