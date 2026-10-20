-- Consentimiento explícito para el tratamiento de datos personales (Ley 1581 de 2012)

ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS consent_given BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS consent_at TIMESTAMPTZ;

COMMENT ON COLUMN public.leads.consent_given IS 'Autorización explícita del titular para tratar sus datos personales';
COMMENT ON COLUMN public.leads.consent_at IS 'Momento en que se otorgó el consentimiento';
