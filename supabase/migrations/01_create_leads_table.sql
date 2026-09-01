-- Migración para tabla de captura de leads Rubber Shock RS-001 (Invultec Colombia)

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

-- Habilitar Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Política RLS: permitir inserción a través del Service Role
-- (Por defecto con Service Role Key se salta RLS, pero definimos política explícita de inserción para autenticados/anon si aplica)
CREATE POLICY "Permitir inserción de leads" ON public.leads
  FOR INSERT
  WITH CHECK (true);

COMMENT ON TABLE public.leads IS 'Captura de leads para el producto Rubber Shock RS-001 de Invultec';
