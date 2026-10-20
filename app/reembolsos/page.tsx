import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/LegalPage';
import { refundsSections, REFUNDS_UPDATED } from '@/content/legal/refunds';

export const metadata: Metadata = {
  title: 'Política de Reembolso y Garantía | Invultec Colombia',
  description:
    'Derecho de retracto, devoluciones y garantía del Rubber Shock RS-001.',
  robots: { index: true, follow: true },
};

export default function ReembolsosPage() {
  return (
    <LegalPage
      title="Política de Reembolso y Garantía"
      lastUpdated={REFUNDS_UPDATED}
      sections={refundsSections}
    />
  );
}
