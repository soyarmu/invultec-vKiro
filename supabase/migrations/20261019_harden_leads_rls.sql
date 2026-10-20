-- Restringir lectura de datos personales: solo service_role puede consultar leads

DROP POLICY IF EXISTS "Permitir lectura de leads" ON public.leads;
DROP POLICY IF EXISTS "Permitir inserción de leads" ON public.leads;

-- Inserción únicamente desde el servidor (API Route con service_role)
CREATE POLICY "Inserción solo service role" ON public.leads
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Lectura solo service role" ON public.leads
  FOR SELECT
  TO service_role
  USING (true);
