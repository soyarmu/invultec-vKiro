-- Migración SQL para la tabla public.leads de Invultec Rubber Shock RS-001

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

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas previas si existen
DROP POLICY IF EXISTS "Permitir insercion de leads" ON public.leads;
DROP POLICY IF EXISTS "Allow service role full access" ON public.leads;
DROP POLICY IF EXISTS "Permitir inserción de leads" ON public.leads;

-- Política RLS: permitir inserción de leads (público / anon / service role)
CREATE POLICY "Permitir insercion de leads" ON public.leads
  FOR INSERT
  TO public, anon, authenticated, service_role
  WITH CHECK (true);

-- Política RLS: permitir lectura para usuarios autenticados / service role
CREATE POLICY "Permitir lectura de leads" ON public.leads
  FOR SELECT
  TO public, anon, authenticated, service_role
  USING (true);

COMMENT ON TABLE public.leads IS 'Tabla de captura de leads para el producto Rubber Shock RS-001 de Invultec Colombia';
