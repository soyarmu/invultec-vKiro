# SPEC 01: Captura de Leads y Backend Rubber Shock RS-001

**State:** Implementado  
**Date:** 2026-09-01  
**Objective:** Capturar leads del producto Rubber Shock RS-001 de Invultec Colombia mediante un formulario vehicular, guardado server-side en Supabase y redirección automática con mensaje prellenado a WhatsApp.

---

## 1. Scope

### In Scope
- Dataset de 20 marcas líderes en Colombia (Toyota, Kia, Chevrolet, Nissan, Mazda, Renault, Hyundai, Suzuki, Volkswagen, Ford, BYD, JAC, Foton, Peugeot, Jeep, Honda, Subaru, BMW, Mercedes-Benz, Audi, Tesla) con modelos más vendidos y rango de años 2000-2026 en `data/vehicles.json`.
- Script de migración SQL para la tabla `public.leads` en Supabase con Row Level Security (RLS) habilitado.
- API Route Server-Side en `app/api/leads/route.ts` con:
  - Rate limiting en memoria (máximo 5 peticiones/minuto por IP).
  - Campo honeypot anti-bot `hp` (si viene con datos, simula éxito sin guardar en BD).
  - Validación de nombre (mínimo 2 caracteres) y teléfono celular de Colombia (10 dígitos iniciando por 3).
  - Inserción server-side en Supabase usando `@supabase/supabase-js` con `SUPABASE_SERVICE_ROLE_KEY`.
  - Generación de URL codificada para WhatsApp (`https://wa.me/<NUMERO>?text=<mensaje_codificado>`).
- Componente UI de Formulario de Captura Vehicular (dropdowns dinámicos de Marca, Modelo y Año con opción "Mi vehículo no aparece" / "Modelo anterior al 2000", campos de Nombre, Teléfono Celular y honeypot).
- Redirección automática a WhatsApp al completar el formulario exitosamente.
- Configuración de variables de entorno requeridas en `.env.local`.

### Out of Scope
- Integración con WhatsApp Cloud API o Meta API.
- Reestructuración de la carpeta del proyecto a `src/` (se mantiene la estructura actual sin `src/` pasar todo a app/).
- Panel o Dashboard administrativo de leads.
- Procesamiento de pagos en línea o pasarelas de pago.

---

## 2. Data Model

### `data/vehicles.json`
Estructura JSON con arreglo de marcas, donde cada marca tiene un ID, nombre y lista de modelos principales.
```json
{
  "years": ["2026", "2025", "2024", ..., "2000"],
  "brands": [
    {
      "id": "toyota",
      "name": "Toyota",
      "models": ["Hilux", "Prado", "Fortuner", "Corolla Cross", "Yaris Cross", "RAV4", "SW4"]
    },
    ...
  ]
}
```

### Tabla Supabase `public.leads`
```sql
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year TEXT NOT NULL,
  quantity INTEGER DEFAULT 1 NOT NULL,
  converted_to_wa BOOLEAN DEFAULT false NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
```

---

## 3. Implementation Plan

1. **Dataset (`data/vehicles.json`)**: Crear el archivo con las 20 marcas principales de Colombia, sus modelos líderes y la lista de años 2000 a 2026.
2. **Dependencias SDK**: Instalar `@supabase/supabase-js`.
3. **Migración SQL Supabase**: Crear la migración SQL para definir la tabla `public.leads` y habilitar RLS.
4. **API Route Server-Side (`app/api/leads/route.ts`)**:
   - Implementar Rate Limiter en memoria (5 solicitudes/min por IP).
   - Verificar campo honeypot `hp`.
   - Validar nombre (≥ 2 caracteres) y celular colombiano (`/^3\d{9}$/`).
   - Insertar lead en Supabase mediante `@supabase/supabase-js`.
   - Retornar respuesta exitosa con la URL codificada de WhatsApp.
5. **Componente de Formulario UI (`components/fitment/VehicleFitmentFinder.tsx` o `components/fitment/LeadCaptureForm.tsx`)**:
   - Selectores interactivos para Marca, Modelo (filtrado por Marca) y Año.
   - Opciones especiales "Mi vehículo no aparece" y "Modelo anterior al 2000".
   - Inputs para Nombre, Celular y Honeypot oculto.
   - Envío asíncrono a `/api/leads` y apertura de la URL de WhatsApp en una nueva pestaña.
6. **Variables de Entorno (`.env.local`)**:
   - Definir `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.

---

## 4. Acceptance Criteria

- [ ] `data/vehicles.json` contiene 20 marcas con sus respectivos modelos y el rango de años 2000-2026.
- [ ] La migración de Supabase crea correctamente la tabla `leads` con todos sus campos y RLS activo.
- [ ] La API `/api/leads` bloquea solicitudes cuando se supera el Rate Limit de 5 peticiones/min por IP.
- [ ] Si el campo `hp` contiene datos, la API retorna estado 200 OK sin insertar ningún registro en Supabase.
- [ ] Un teléfono celular que no comience por 3 o no tenga 10 dígitos devuelve error 400.
- [ ] Los leads válidos se guardan exitosamente en la tabla `public.leads` de Supabase.
- [ ] La API retorna la URL de WhatsApp formateada como `https://wa.me/<NUMERO>?text=...` con el mensaje esperado.
- [ ] El formulario en el cliente redirige correctamente al usuario a WhatsApp tras el envío exitoso.

---

## 5. Decisions Taken and Discarded

- **Sin carpeta `src/`**: Confirmado mantener la estructura actual de la raíz (`app/`, `components/`, `data/`).
- **Rate Limit en memoria**: Discardado uso de Upstash Redis por simplicidad y cero dependencias externas.
- **Uso de `@supabase/supabase-js`**: Confirmado para operaciones server-side seguras utilizando `SUPABASE_SERVICE_ROLE_KEY`.
- **Sin WhatsApp Cloud API**: Discardado API oficial de Meta para evitar costos e infraestructura adicional; uso de `wa.me` directo.

---

## 6. Identified Risks

- **Perdida de estado en memoria en Lambdas serverless**: El Rate Limiter en memoria se reinicia si la función serverless de Vercel/Next.js se recicla. Aceptable para la escala actual.
- **Números de WhatsApp mal formateados**: Si `NEXT_PUBLIC_WHATSAPP_NUMBER` incluye signos de mas (`+`) o guiones, la URL de WhatsApp podría fallar. Se saneará el número antes de construir la URL.
