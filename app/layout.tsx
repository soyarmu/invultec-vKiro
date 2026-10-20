import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rubber Shock | Encuentra Tu Ajuste Perfecto',
  description:
    'Encuentra el Rubber Shock correcto para tu vehículo. Ingresa la marca, modelo y año para obtener recomendaciones específicas. Disponible en múltiples tamaños.',
  keywords: [
    'rubber shock',
    'tope de suspensión',
    'buffer de resorte automotriz',
    'amortiguador de suspensión',
    'espaciador de resorte',
    'tope de resorte helicoidal',
    'ajuste vehicular',
    'invultec colombia',
  ],
  authors: [{ name: 'Rubber Shock Invultec' }],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://invultec.com',
    title: 'Rubber Shock | Encuentra Tu Ajuste Perfecto',
    description:
      'Encuentra el Rubber Shock correcto para tu vehículo. Recomendaciones específicas basadas en marca, modelo y año.',
    siteName: 'Rubber Shock Invultec',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rubber Shock | Encuentra Tu Ajuste Perfecto',
    description:
      'Encuentra el Rubber Shock correcto para tu vehículo. Recomendaciones específicas para tu vehículo.',
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
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-neutral-900 focus:shadow-lg focus:ring-2 focus:ring-brand-red"
        >
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
