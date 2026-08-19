import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Amortiguadores de Resorte de Bobina | Encuentra Tu Ajuste Perfecto',
  description:
    'Encuentra el amortiguador de resorte correcto para tu vehículo. Ingresa la marca, modelo y año para obtener recomendaciones específicas. Disponible en múltiples tamaños.',
  keywords: [
    'amortiguador de resorte',
    'buffer de resorte automotriz',
    'amortiguador de suspensión',
    'espaciador de resorte',
    'tope de resorte',
    'ajuste vehicular',
    'buffer de suspensión',
    'amortiguador universal de resorte',
  ],
  authors: [{ name: 'Amortiguadores de Resorte' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://example.com',
    title: 'Amortiguadores de Resorte de Bobina | Encuentra Tu Ajuste Perfecto',
    description:
      'Encuentra el amortiguador de resorte correcto para tu vehículo. Recomendaciones específicas basadas en marca, modelo y año.',
    siteName: 'Amortiguadores de Resorte',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amortiguadores de Resorte de Bobina | Encuentra Tu Ajuste Perfecto',
    description:
      'Encuentra el amortiguador de resorte correcto para tu vehículo. Recomendaciones específicas para tu vehículo.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
