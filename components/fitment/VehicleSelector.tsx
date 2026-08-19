'use client';

import { useState, useEffect } from 'react';
import { Vehicle } from '@/types/fitment';
import { Select } from '@/components/ui/select';
import {
  getVehicleMakes,
  getVehicleModels,
  getVehicleYears,
} from '@/data/fitment/vehicle-data';
import {
  trackMakeSelected,
  trackModelSelected,
  trackYearSelected,
} from '@/lib/analytics/analytics';

interface VehicleSelectorProps {
  onVehicleChange: (vehicle: Vehicle) => void;
  disabled?: boolean;
}

export function VehicleSelector({
  onVehicleChange,
  disabled = false,
}: VehicleSelectorProps) {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);

  const makes = getVehicleMakes();

  // Update available models when make changes
  useEffect(() => {
    if (make) {
      const models = getVehicleModels(make);
      setAvailableModels(models);
      setModel('');
      setYear('');
      setAvailableYears([]);
      trackMakeSelected(make);
    } else {
      setAvailableModels([]);
      setModel('');
      setYear('');
      setAvailableYears([]);
    }
  }, [make]);

  // Update available years when model changes
  useEffect(() => {
    if (make && model) {
      const years = getVehicleYears(make, model);
      setAvailableYears(years);
      setYear('');
      trackModelSelected(make, model);
    } else {
      setAvailableYears([]);
      setYear('');
    }
  }, [make, model]);

  // Notify parent when complete vehicle is selected
  useEffect(() => {
    if (make && model && year) {
      const yearNum = parseInt(year, 10);
      trackYearSelected(make, model, yearNum);
      onVehicleChange({
        make,
        model,
        year: yearNum,
      });
    }
  }, [make, model, year, onVehicleChange]);

  return (
    <div className="space-y-4">
      <Select
        label="Marca"
        value={make}
        onChange={(e) => setMake(e.target.value)}
        disabled={disabled}
        aria-label="Seleccione la marca del vehículo"
      >
        <option value="">Seleccione Marca</option>
        {makes.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </Select>

      <Select
        label="Modelo"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        disabled={disabled || !make}
        aria-label="Seleccione el modelo del vehículo"
      >
        <option value="">Seleccione Modelo</option>
        {availableModels.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </Select>

      <Select
        label="Año"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        disabled={disabled || !model}
        aria-label="Seleccione el año del vehículo"
      >
        <option value="">Seleccione Año</option>
        {availableYears.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </Select>
    </div>
  );
}
