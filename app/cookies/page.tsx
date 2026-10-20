import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal/LegalPage';
import { cookiesSections, COOKIES_UPDATED } from '@/content/legal/cookies';

export const metadata: Metadata = {
  title: 'Política de Cookies | Invultec Colombia',
  description:
    'Qué cookies y tecnologías similares utiliza este sitio y cómo gestionarlas.',
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Política de Cookies"
      lastUpdated={COOKIES_UPDATED}
      sections={cookiesSections}
    />
  );
}
