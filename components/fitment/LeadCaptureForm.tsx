'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import vehiclesData from '@/data/vehicles.json';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquare, Loader2, CheckCircle2 } from 'lucide-react';

export function LeadCaptureForm() {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [hp, setHp] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Modelos filtrados según la marca seleccionada
  const availableModels = useMemo(() => {
    if (!brand || brand === 'Mi vehículo no aparece') return [];
    const selectedBrandObj = vehiclesData.brands.find(
      (b) => b.name === brand || b.id === brand
    );
    return selectedBrandObj ? selectedBrandObj.models : [];
  }, [brand]);

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setBrand(val);
    setModel('');
    setError(null);
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setModel(e.target.value);
    setError(null);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validaciones del cliente
    if (!brand) {
      setError('Por favor selecciona la marca de tu vehículo.');
      return;
    }
    if (!model) {
      setError('Por favor selecciona el modelo de tu vehículo.');
      return;
    }
    if (!year) {
      setError('Por favor selecciona el año de tu vehículo.');
      return;
    }
    if (!name.trim() || name.trim().length < 2) {
      setError('Por favor ingresa tu nombre completo (mínimo 2 caracteres).');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (!/^3\d{9}$/.test(cleanPhone)) {
      setError('Ingresa un celular colombiano válido de 10 dígitos (iniciando con 3).');
      return;
    }

    if (!consentGiven) {
      setError(
        'Debes aceptar la Política de Privacidad para enviar tus datos.'
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: cleanPhone,
          brand,
          model,
          year,
          consentGiven,
          hp,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Ocurrió un error al procesar tu solicitud.');
      }

      setSuccess(true);

      // Redirigir automáticamente a WhatsApp (usando window.location.href para evitar bloqueadores de popups en móviles y escritorio)
      if (data.whatsappUrl) {
        setTimeout(() => {
          window.location.href = data.whatsappUrl;
        }, 300);
      }
    } catch (err: any) {
      setError(err.message || 'Error de conexión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-neutral-100">
      <div className="mb-6 text-center">
        <span className="inline-block px-3 py-1 bg-brand-red-50 text-brand-red text-xs font-bold rounded-full uppercase tracking-wider mb-2">
          Rubber Shock RS-001
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
          Consulta la Compatibilidad de tu Vehículo
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          Completa los datos de tu auto para chatear directamente por WhatsApp con un asesor experto de Invultec Colombia.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Honeypot Oculto (Anti-bot) */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <label htmlFor="hp">No llenar este campo</label>
          <input
            type="text"
            id="hp"
            name="hp"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Marca */}
        <Select
          label="Marca del Vehículo"
          value={brand}
          onChange={handleBrandChange}
          required
        >
          <option value="">Selecciona Marca</option>
          {vehiclesData.brands.map((b) => (
            <option key={b.id} value={b.name}>
              {b.name}
            </option>
          ))}
          <option value="Mi vehículo no aparece">Mi vehículo no aparece</option>
        </Select>

        {/* Modelo */}
        <Select
          label="Modelo"
          value={model}
          onChange={handleModelChange}
          disabled={!brand}
          required
        >
          <option value="">
            {!brand ? 'Primero selecciona una marca' : 'Selecciona Modelo'}
          </option>
          {availableModels.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
          {brand && (
            <option value="Mi vehículo no aparece">Mi vehículo no aparece</option>
          )}
        </Select>

        {/* Año */}
        <Select
          label="Año"
          value={year}
          onChange={handleYearChange}
          disabled={!model}
          required
        >
          <option value="">
            {!model ? 'Primero selecciona un modelo' : 'Selecciona Año'}
          </option>
          {vehiclesData.years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
          {model && (
            <option value="Modelo anterior al 2000">Modelo anterior al 2000</option>
          )}
        </Select>

        <hr className="my-4 border-neutral-200" />

        {/* Nombre completo */}
        <Input
          label="Tu Nombre Completo"
          placeholder="Ej. Juan Pérez"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(null);
          }}
          required
        />

        {/* Celular Colombiano */}
        <Input
          label="Número de Celular (Colombia)"
          placeholder="Ej. 3001234567"
          type="tel"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setError(null);
          }}
          maxLength={10}
          required
        />

        {/* Consentimiento de datos personales */}
        <div>
          <label
            htmlFor="consent"
            className="flex items-start gap-3 text-sm text-neutral-700"
          >
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={consentGiven}
              onChange={(e) => {
                setConsentGiven(e.target.checked);
                setError(null);
              }}
              className="mt-0.5 h-4 w-4 flex-shrink-0 accent-brand-red"
              aria-describedby="consent-help"
            />
            <span>
              He leído y acepto la{' '}
              <Link
                href="/privacidad"
                className="font-medium text-brand-red underline hover:text-brand-red-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de Privacidad
              </Link>{' '}
              y autorizo el tratamiento de mis datos para ser contactado por
              Invultec.
            </span>
          </label>
          <p id="consent-help" aria-live="polite" className="mt-2 text-xs text-neutral-500">
            {consentGiven
              ? 'Autorización otorgada.'
              : 'Este campo es obligatorio para enviar la solicitud.'}
          </p>
        </div>

        {/* Mensajes de error */}
        {error && (
          <div
            role="alert"
            aria-live="polite"
            className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 font-medium animate-fade-in"
          >
            {error}
          </div>
        )}

        {/* Mensaje de éxito */}
        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 font-semibold flex items-center space-x-2 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span>
              ¡Información enviada con éxito! Redirigiendo a WhatsApp...
            </span>
          </div>
        )}

        {/* Botón de envío */}
        <Button
          type="submit"
          disabled={loading}
          variant="primary"
          size="lg"
          className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all transform active:scale-95"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Procesando...</span>
            </>
          ) : (
            <>
              <MessageSquare className="w-5 h-5" />
              <span>Consultar Disponibilidad en WhatsApp</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
