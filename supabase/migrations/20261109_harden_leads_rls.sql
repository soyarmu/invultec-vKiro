-- Hardening idempotente de RLS para public.leads
-- Garantiza el estado final sin importar si 20261019_harden_leads_rls.sql fue aplicada.
-- Re-ejecutable sin error: DROP POLICY IF EXISTS + CREATE POLICY
-- (PostgreSQL no soporta CREATE OR REPLACE POLICY).

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Elimina las políticas permisivas creadas por 20260902_create_leads_table.sql
-- y 01_create_leads_table.sql (anon/public/authenticated con USING/WITH CHECK (true)).
DROP POLICY IF EXISTS "Permitir lectura de leads" ON public.leads;
DROP POLICY IF EXISTS "Permitir inserción de leads" ON public.leads;
DROP POLICY IF EXISTS "Permitir insercion de leads" ON public.leads;

-- Reemplaza las políticas de 20261019_harden_leads_rls.sql si ya existen.
DROP POLICY IF EXISTS "Inserción solo service role" ON public.leads;
DROP POLICY IF EXISTS "Lectura solo service role" ON public.leads;

-- Único actor con acceso: service_role (API Route del servidor).
CREATE POLICY "Inserción solo service role" ON public.leads
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Lectura solo service role" ON public.leads
  FOR SELECT
  TO service_role
  USING (true);
