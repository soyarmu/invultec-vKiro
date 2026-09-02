# SPEC 05: Creación del Primer Lead, Migración de Base de Datos y Redirección a WhatsApp

**State:** Draft  
**Date:** 2026-09-02  
**Objective:** Asegurar la estructura de la tabla `public.leads` en Supabase mediante una migración SQL, verificar la configuración de variables de entorno y validar el flujo de captura de leads desde el formulario UI con persistencia en BD y redirección a WhatsApp.

---

## 1. Scope

### In Scope
- Script de migración SQL `supabase/migrations/20260902_create_leads_table.sql` para crear/asegurar la tabla `public.leads` con columnas adecuadas (`id`, `created_at`, `name`, `phone`, `brand`, `model`, `year`, `quantity`, `converted_to_wa`, `status`) y políticas de Row Level Security (RLS).
- Ejecución / verificación de la migración en la instancia de Supabase del proyecto (`xkpnllrmwvnsdyjqklqn`).
- Verificación y ajuste de variables de entorno en `.env.local` (`NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
- Verificación y conexión del componente UI de captura (`components/fitment/LeadCaptureForm.tsx` o `components/fitment/VehicleFitmentFinder.tsx`) con la API Route `/api/leads`.
- Prueba E2E de creación del primer lead a través de la interfaz web, confirmando:
  1. Inserción correcta del lead en la tabla `public.leads` de Supabase.
  2. Redirección automática hacia la API de WhatsApp (`https://wa.me/...`) con los datos del vehículo y cliente formateados.

### Out of Scope
- Integración con WhatsApp Cloud API (se utiliza el enlace directo `wa.me`).
- Creación de panel o dashboard administrativo de visualización de leads.
- Notificaciones por correo electrónico o SMS tras el envío.

---

## 2. Data Model

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
  converted_to_wa BOOLEAN DEFAULT true NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Política de lectura y escritura para service role / backend
CREATE POLICY "Allow service role full access" ON public.leads
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

---

## 3. Implementation Plan

1. **Migración SQL para la tabla `public.leads`**:
   - Crear el archivo `supabase/migrations/20260902_create_leads_table.sql` con la definición DDL de la tabla `public.leads` y sus políticas RLS.
   - Ejecutar la migración en Supabase a través del cliente SDK o herramienta correspondiente para garantizar que la tabla exista.
2. **Configuración de Variables de Entorno (`.env.local`)**:
   - Asegurar que `.env.local` contenga `NEXT_PUBLIC_WHATSAPP_NUMBER` con el número oficial de ventas (ej. `573000000000` o formato limpio).
   - Verificar `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` y `SUPABASE_SERVICE_ROLE_KEY`.
3. **Verificación y Conexión de UI y Backend**:
   - Revisar el flujo en `components/fitment/LeadCaptureForm.tsx` para asegurar que capture Nombre, Celular, Marca, Modelo y Año, y que consuma la API `/api/leads`.
   - Asegurar que tras recibir la respuesta HTTP 200 con `whatsappUrl`, el formulario efectúe la redirección del navegador (`window.location.href` o `window.open`).
4. **Ejecución y Verificación del Primer Lead (E2E)**:
   - Realizar la sumisión del formulario con datos reales/de prueba.
   - Consultar la base de datos de Supabase para validar que se registró el primer lead en `public.leads`.
   - Confirmar que la redirección a WhatsApp genera la URL correcta con el mensaje prellenado.

---

## 4. Acceptance Criteria

- [ ] Existe el archivo de migración SQL en `supabase/migrations/20260902_create_leads_table.sql`.
- [ ] La tabla `public.leads` existe y está disponible en Supabase con su estructura completa y RLS activo.
- [ ] El archivo `.env.local` incluye la variable `NEXT_PUBLIC_WHATSAPP_NUMBER` correctamente formateada.
- [ ] El envío del formulario en la interfaz del cliente realiza un llamado `POST` a `/api/leads`.
- [ ] La API `/api/leads` guarda exitosamente los datos del lead en la tabla `public.leads` de Supabase usando el Service Role key.
- [ ] Tras el guardado en BD, el usuario es redirigido automáticamente a la ventana/pestaña de WhatsApp con el mensaje estructurado sobre el Rubber Shock RS-001.
- [ ] El registro en la BD de Supabase queda verificado con `converted_to_wa = true` y estado `pending`.

---

## 5. Decisions Taken and Discarded

- **Migración SQL explícita**: Se decide incluir el archivo de migración SQL en el repositorio para contar con control de versiones sobre la tabla `public.leads`.
- **Persistencia Server-Side con Service Role**: Confirmado guardar el lead mediante el endpoint `/api/leads` utilizando `SUPABASE_SERVICE_ROLE_KEY` para evitar exponer escrituras públicas sin autenticación.
- **Redirección inmediata a WhatsApp**: Confirmado que el formulario redireccionará al cliente a WhatsApp tan pronto como la API responda con el enlace codificado.

---

## 6. Identified Risks

- **Bloqueo de pop-ups por el navegador**: Si el cliente intenta abrir WhatsApp en una nueva pestaña (`window.open`), el navegador puede bloquearlo si no ocurre directamente en el evento del clic. Se recomienda redireccionar en la misma ventana (`window.location.href`) o disparar la apertura en respuesta directa al submit.
- **Formato del número de WhatsApp**: Un número con caracteres especiales o sin prefijo de país (ej. sin `57`) puede romper el enlace `wa.me`. Se garantiza el saneamiento en el backend antes de construir la URL.
