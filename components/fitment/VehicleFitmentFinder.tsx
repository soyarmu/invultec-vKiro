'use client';

import { useState, useCallback, useEffect } from 'react';
import { Vehicle, FitmentRecommendation, MeasurementInput } from '@/types/fitment';
import { VehicleSelector } from './VehicleSelector';
import { FitmentResult } from './FitmentResult';
import { MeasurementInput as MeasurementInputComponent } from './MeasurementInput';
import { getFitmentRecommendation, getFitmentFromMeasurement } from '@/lib/fitment/fitment-engine';
import { trackFitmentCheckStarted, trackVehicleFinderViewed } from '@/lib/analytics/analytics';
import { Loader2 } from 'lucide-react';

type FinderState = 'input' | 'loading' | 'result' | 'measurement';

export function VehicleFitmentFinder() {
  const [state, setState] = useState<FinderState>('input');
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [recommendation, setRecommendation] = useState<FitmentRecommendation | null>(null);

  // Track view on mount
  useEffect(() => {
    trackVehicleFinderViewed();
  }, []);

  const handleVehicleChange = useCallback((selectedVehicle: Vehicle) => {
    setVehicle(selectedVehicle);
    
    // Start loading
    setState('loading');
    trackFitmentCheckStarted(
      selectedVehicle.make,
      selectedVehicle.model,
      selectedVehicle.year
    );

    // Simulate brief API call delay for better UX
    setTimeout(() => {
      const result = getFitmentRecommendation(selectedVehicle);
      setRecommendation(result);

      if (result.status === 'MEASUREMENT_REQUIRED') {
        setState('measurement');
      } else {
        setState('result');
      }
    }, 800);
  }, []);

  const handleMeasurementSubmit = useCallback((springGap: number) => {
    setState('loading');

    const measurement: MeasurementInput = {
      springGap,
      unit: 'inches',
    };

    // Simulate brief processing delay
    setTimeout(() => {
      const result = getFitmentFromMeasurement(measurement);
      setRecommendation(result);
      setState('result');
    }, 600);
  }, []);

  const handleReset = useCallback(() => {
    setState('input');
    setVehicle(null);
    setRecommendation(null);
  }, []);

  return (
    <div className="w-full">
      {/* Input State */}
      {state === 'input' && (
        <div className="animate-fade-in">
          <div className="mb-6">
            <p className="text-sm font-medium uppercase tracking-wide text-brand-red">
              Encuentra Tu Ajuste
            </p>
            <h2 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl">
              ¿Qué conduces?
            </h2>
            <p className="mt-2 text-neutral-600">
              Dinos tu vehículo y encontraremos el tamaño correcto para ti.
            </p>
          </div>

          <VehicleSelector onVehicleChange={handleVehicleChange} />
        </div>
      )}

      {/* Loading State */}
      {state === 'loading' && (
        <div className="animate-fade-in flex min-h-[300px] flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-brand-red" aria-hidden="true" />
          <p className="mt-4 text-lg font-medium text-neutral-900">
            Verificando tu vehículo...
          </p>
          <p className="mt-1 text-sm text-neutral-600">
            Encontrando el ajuste perfecto
          </p>
        </div>
      )}

      {/* Measurement Required State */}
      {state === 'measurement' && vehicle && (
        <div className="animate-slide-up">
          <div className="mb-6">
            <p className="text-sm font-medium uppercase tracking-wide text-brand-red">
              Un Paso Más
            </p>
            <h2 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl">
              Verifiquemos el espacio de tu resorte
            </h2>
            <p className="mt-2 text-neutral-600">
              Necesitamos una medida rápida para confirmar el ajuste correcto para tu{' '}
              <span className="font-medium">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </span>
              .
            </p>
          </div>

          <MeasurementInputComponent onMeasurementSubmit={handleMeasurementSubmit} />

          <div className="mt-6 text-center">
            <button
              onClick={handleReset}
              className="text-sm text-neutral-600 hover:text-neutral-900 hover:underline"
            >
              Comenzar de nuevo
            </button>
          </div>
        </div>
      )}

      {/* Result State */}
      {state === 'result' && vehicle && recommendation && (
        <div className="animate-slide-up">
          <FitmentResult
            vehicle={vehicle}
            recommendation={recommendation}
            onReset={handleReset}
          />
        </div>
      )}
    </div>
  );
}
