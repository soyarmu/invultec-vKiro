import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/LegalPage';
import { privacySections, PRIVACY_UPDATED } from '@/content/legal/privacy';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Invultec Colombia',
  description:
    'Cómo recolectamos, usamos y protegemos tus datos personales conforme a la Ley 1581 de 2012.',
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <LegalPage
      title="Política de Privacidad"
      lastUpdated={PRIVACY_UPDATED}
      sections={privacySections}
    />
  );
}
