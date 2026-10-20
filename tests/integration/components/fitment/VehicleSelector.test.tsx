import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { VehicleSelector } from '@/components/fitment/VehicleSelector';
import { validVehicle, createVehicle } from '@tests/fixtures';

// Mock the vehicle data module
vi.mock('@/data/fitment/vehicle-data', () => ({
  getVehicleMakes: vi.fn(() => ['Toyota', 'Chevrolet', 'Ford', 'Nissan']),
  getVehicleModels: vi.fn((make: string) => {
    const models: Record<string, string[]> = {
      Toyota: ['Hilux', 'Land Cruiser', '4Runner'],
      Chevrolet: ['Colorado', 'Silverado'],
      Ford: ['Ranger', 'F-150'],
      Nissan: ['Frontier', 'Titan'],
    };
    return models[make] || [];
  }),
  getVehicleYears: vi.fn(() => [2020, 2021, 2022, 2023]),
}));

// Mock analytics
vi.mock('@/lib/analytics/analytics', () => ({
  trackMakeSelected: vi.fn(),
  trackModelSelected: vi.fn(),
  trackYearSelected: vi.fn(),
}));

describe('VehicleSelector Component', () => {
  const mockOnVehicleChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renderiza los tres dropdowns: Marca, Modelo y Año', () => {
      render(<VehicleSelector onVehicleChange={mockOnVehicleChange} />);

      expect(screen.getByLabelText(/marca/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/modelo/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/año/i)).toBeInTheDocument();
    });

    it('muestra las marcas disponibles en el dropdown', () => {
      render(<VehicleSelector onVehicleChange={mockOnVehicleChange} />);

      const makeSelect = screen.getByLabelText(/marca/i);
      expect(makeSelect).toBeInTheDocument();

      // Verificar opciones de marca
      expect(screen.getByRole('option', { name: 'Toyota' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Chevrolet' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Ford' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Nissan' })).toBeInTheDocument();
    });

    it('dropdown de modelo está deshabilitado cuando no se ha seleccionado marca', () => {
      render(<VehicleSelector onVehicleChange={mockOnVehicleChange} />);

      const modelSelect = screen.getByLabelText(/modelo/i);
      expect(modelSelect).toBeDisabled();
    });

    it('dropdown de año está deshabilitado cuando no se ha seleccionado modelo', () => {
      render(<VehicleSelector onVehicleChange={mockOnVehicleChange} />);

      const yearSelect = screen.getByLabelText(/año/i);
      expect(yearSelect).toBeDisabled();
    });
  });

  describe('Interacción de Usuario - Cascading Selection', () => {
    it('habilita dropdown de modelo cuando se selecciona marca', async () => {
      const user = userEvent.setup();
      render(<VehicleSelector onVehicleChange={mockOnVehicleChange} />);

      const makeSelect = screen.getByLabelText(/marca/i);
      const modelSelect = screen.getByLabelText(/modelo/i);

      expect(modelSelect).toBeDisabled();

      await user.selectOptions(makeSelect, 'Toyota');

      await waitFor(() => {
        expect(modelSelect).not.toBeDisabled();
      });
    });

    it('actualiza modelos disponibles cuando cambia la marca', async () => {
      const user = userEvent.setup();
      render(<VehicleSelector onVehicleChange={mockOnVehicleChange} />);

      const makeSelect = screen.getByLabelText(/marca/i);

      await user.selectOptions(makeSelect, 'Toyota');

      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'Hilux' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Land Cruiser' })).toBeInTheDocument();
      });
    });

    it('habilita dropdown de año cuando se selecciona modelo', async () => {
      const user = userEvent.setup();
      render(<VehicleSelector onVehicleChange={mockOnVehicleChange} />);

      const makeSelect = screen.getByLabelText(/marca/i);
      const modelSelect = screen.getByLabelText(/modelo/i);
      const yearSelect = screen.getByLabelText(/año/i);

      await user.selectOptions(makeSelect, 'Toyota');
      
      await waitFor(() => {
        expect(modelSelect).not.toBeDisabled();
      });

      await user.selectOptions(modelSelect, 'Hilux');

      await waitFor(() => {
        expect(yearSelect).not.toBeDisabled();
      });
    });

    it('muestra años disponibles cuando se selecciona modelo', async () => {
      const user = userEvent.setup();
      render(<VehicleSelector onVehicleChange={mockOnVehicleChange} />);

      await user.selectOptions(screen.getByLabelText(/marca/i), 'Toyota');
      await user.selectOptions(screen.getByLabelText(/modelo/i), 'Hilux');

      await waitFor(() => {
        expect(screen.getByRole('option', { name: '2020' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: '2021' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: '2022' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: '2023' })).toBeInTheDocument();
      });
    });
  });

  describe('Callback - onVehicleChange', () => {
    it('NO dispara callback hasta completar la selección', async () => {
      const user = userEvent.setup();
      render(<VehicleSelector onVehicleChange={mockOnVehicleChange} />);

      await user.selectOptions(screen.getByLabelText(/marca/i), 'Toyota');
      expect(mockOnVehicleChange).not.toHaveBeenCalled();

      await user.selectOptions(screen.getByLabelText(/modelo/i), 'Hilux');
      expect(mockOnVehicleChange).not.toHaveBeenCalled();
    });

    it('dispara callback con vehículo completo al seleccionar año', async () => {
      const user = userEvent.setup();
      render(<VehicleSelector onVehicleChange={mockOnVehicleChange} />);

      await user.selectOptions(screen.getByLabelText(/marca/i), 'Toyota');
      await user.selectOptions(screen.getByLabelText(/modelo/i), 'Hilux');
      await user.selectOptions(screen.getByLabelText(/año/i), '2020');

      await waitFor(() => {
        expect(mockOnVehicleChange).toHaveBeenCalledWith({
          make: 'Toyota',
          model: 'Hilux',
          year: 2020,
        });
      });
    });

    it('convierte año de string a number en el callback', async () => {
      const user = userEvent.setup();
      render(<VehicleSelector onVehicleChange={mockOnVehicleChange} />);

      await user.selectOptions(screen.getByLabelText(/marca/i), 'Chevrolet');
      await user.selectOptions(screen.getByLabelText(/modelo/i), 'Colorado');
      await user.selectOptions(screen.getByLabelText(/año/i), '2023');

      await waitFor(() => {
        const call = mockOnVehicleChange.mock.calls[0];
        expect(call[0].year).toBe(2023);
        expect(typeof call[0].year).toBe('number');
      });
    });
  });

  describe('Reseteo de Selección', () => {
    it('resetea modelo y año al cambiar marca', async () => {
      const user = userEvent.setup();
      render(<VehicleSelector onVehicleChange={mockOnVehicleChange} />);

      // Selección inicial completa
      await user.selectOptions(screen.getByLabelText(/marca/i), 'Toyota');
      await user.selectOptions(screen.getByLabelText(/modelo/i), 'Hilux');
      await user.selectOptions(screen.getByLabelText(/año/i), '2020');

      // Cambiar marca
      await user.selectOptions(screen.getByLabelText(/marca/i), 'Ford');

      await waitFor(() => {
        const modelSelect = screen.getByLabelText(/modelo/i) as HTMLSelectElement;
        const yearSelect = screen.getByLabelText(/año/i) as HTMLSelectElement;
        
        expect(modelSelect.value).toBe('');
        expect(yearSelect.value).toBe('');
      });
    });

    it('resetea año al cambiar modelo', async () => {
      const user = userEvent.setup();
      render(<VehicleSelector onVehicleChange={mockOnVehicleChange} />);

      await user.selectOptions(screen.getByLabelText(/marca/i), 'Toyota');
      await user.selectOptions(screen.getByLabelText(/modelo/i), 'Hilux');
      await user.selectOptions(screen.getByLabelText(/año/i), '2020');

      // Cambiar modelo
      await user.selectOptions(screen.getByLabelText(/modelo/i), 'Land Cruiser');

      await waitFor(() => {
        const yearSelect = screen.getByLabelText(/año/i) as HTMLSelectElement;
        expect(yearSelect.value).toBe('');
      });
    });
  });

  describe('Prop - disabled', () => {
    it('deshabilita todos los dropdowns cuando disabled=true', () => {
      render(<VehicleSelector onVehicleChange={mockOnVehicleChange} disabled={true} />);

      expect(screen.getByLabelText(/marca/i)).toBeDisabled();
      expect(screen.getByLabelText(/modelo/i)).toBeDisabled();
      expect(screen.getByLabelText(/año/i)).toBeDisabled();
    });

    it('habilita dropdowns cuando disabled=false', () => {
      render(<VehicleSelector onVehicleChange={mockOnVehicleChange} disabled={false} />);

      expect(screen.getByLabelText(/marca/i)).not.toBeDisabled();
      // Modelo y año siguen deshabilitados por lógica de cascada
      expect(screen.getByLabelText(/modelo/i)).toBeDisabled();
      expect(screen.getByLabelText(/año/i)).toBeDisabled();
    });
  });

  describe('Edge Cases', () => {
    it('maneja marca sin modelos disponibles', async () => {
      const user = userEvent.setup();
      
      // Mock para retornar array vacío solo para este test
      const { getVehicleModels } = await import('@/data/fitment/vehicle-data');
      vi.mocked(getVehicleModels).mockReturnValueOnce([]);

      render(<VehicleSelector onVehicleChange={mockOnVehicleChange} />);

      await user.selectOptions(screen.getByLabelText(/marca/i), 'Toyota');

      await waitFor(() => {
        const modelSelect = screen.getByLabelText(/modelo/i);
        expect(modelSelect).not.toBeDisabled();
        
        // Solo debe tener la opción de placeholder
        const options = modelSelect.querySelectorAll('option');
        expect(options.length).toBe(1);
        expect(options[0].textContent).toBe('Seleccione Modelo');
      });
    });

    it('maneja selección rápida consecutiva', async () => {
      const user = userEvent.setup();
      render(<VehicleSelector onVehicleChange={mockOnVehicleChange} />);

      await user.selectOptions(screen.getByLabelText(/marca/i), 'Toyota');
      expect(await screen.findByRole('option', { name: 'Hilux' })).toBeInTheDocument();

      await user.selectOptions(screen.getByLabelText(/modelo/i), 'Hilux');
      expect(await screen.findByRole('option', { name: '2020' })).toBeInTheDocument();

      await user.selectOptions(screen.getByLabelText(/año/i), '2020');

      // Debe eventualmente llamar al callback
      await waitFor(() => {
        expect(mockOnVehicleChange).toHaveBeenCalledTimes(1);
      });
    });
  });
});
