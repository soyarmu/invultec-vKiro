import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/LegalPage';
import { termsSections, TERMS_UPDATED } from '@/content/legal/terms';

export const metadata: Metadata = {
  title: 'Términos del Servicio | Invultec Colombia',
  description:
    'Condiciones de uso del sitio, información del producto y limitación de responsabilidad.',
  robots: { index: true, follow: true },
};

export default function TerminosPage() {
  return (
    <LegalPage
      title="Términos del Servicio"
      lastUpdated={TERMS_UPDATED}
      sections={termsSections}
    />
  );
}
