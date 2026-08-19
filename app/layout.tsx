import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Coil Spring Buffer Fitment Tool | Find Your Perfect Fit',
  description:
    'Find the right coil spring buffer for your vehicle. Enter your make, model, and year to get vehicle-specific recommendations. Available in multiple sizes.',
  keywords: [
    'coil spring buffer',
    'car coil spring buffer',
    'shock absorber spring buffer',
    'spring bumper',
    'coil spring spacer',
    'vehicle fitment',
    'suspension buffer',
    'universal coil spring buffer',
  ],
  authors: [{ name: 'Coil Spring Buffers' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://example.com',
    title: 'Coil Spring Buffer Fitment Tool | Find Your Perfect Fit',
    description:
      'Find the right coil spring buffer for your vehicle. Vehicle-specific recommendations based on make, model, and year.',
    siteName: 'Coil Spring Buffers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coil Spring Buffer Fitment Tool | Find Your Perfect Fit',
    description:
      'Find the right coil spring buffer for your vehicle. Vehicle-specific recommendations.',
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
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
