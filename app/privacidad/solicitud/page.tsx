import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { COMPANY_DATA } from '@/lib/company';

export const metadata: Metadata = {
  title: 'Solicitud de derechos sobre datos personales | Invultec Colombia',
  description:
    'Cómo solicitar acceso, rectificación, supresión o revocatoria de tus datos personales.',
  robots: { index: true, follow: true },
};

const RIGHTS = [
  {
    title: 'Acceso',
    description: 'Conocer qué datos tuyos tenemos y cómo los usamos.',
  },
  {
    title: 'Rectificación',
    description: 'Corregir datos inexactos o incompletos.',
  },
  {
    title: 'Supresión',
    description: 'Solicitar la eliminación de tus datos cuando no exista un deber legal de conservarlos.',
  },
  {
    title: 'Revocatoria',
    description: 'Retirar la autorización que otorgaste para tratar tus datos.',
  },
];

export default function SolicitudDatosPage() {
  const message = `Hola ${COMPANY_DATA.tradeName}, quiero ejercer mis derechos sobre datos personales. Nombre completo: [tu nombre]. Celular registrado: [tu celular]. Derecho a ejercer: [acceso / rectificación / supresión / revocatoria].`;
  const whatsappUrl = `https://wa.me/${COMPANY_DATA.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-neutral-900">
        <div className="container-custom flex h-16 items-center justify-between sm:h-20">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-white transition-colors hover:text-brand-red-onDark"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-red text-lg font-extrabold text-white">
              INV
            </span>
            Invultec Colombia
          </Link>
          <Link
            href="/privacidad"
            className="flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver a la Política de Privacidad
          </Link>
        </div>
      </header>

      <main
        id="main-content"
        tabIndex={-1}
        className="container-custom max-w-4xl py-12 sm:py-16"
      >
        <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-neutral-900 sm:text-4xl">
          Solicitud de derechos sobre datos personales
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Última actualización: 19 de octubre de 2026
        </p>

        <p className="mt-6 leading-relaxed text-neutral-700">
          Como titular de tus datos personales puedes ejercer gratuitamente los
          siguientes derechos, conforme a la Ley 1581 de 2012:
        </p>

        <ul className="mt-4 space-y-3">
          {RIGHTS.map((right) => (
            <li
              key={right.title}
              className="rounded-lg border border-neutral-200 bg-white p-4"
            >
              <p className="font-semibold text-neutral-900">{right.title}</p>
              <p className="mt-1 text-sm text-neutral-700">
                {right.description}
              </p>
            </li>
          ))}
        </ul>

        <h2 className="mt-10 font-display text-xl font-semibold text-neutral-900">
          Cómo presentar la solicitud
        </h2>
        <ol className="mt-3 space-y-2 leading-relaxed text-neutral-700">
          <li>
            1. Escribe por el WhatsApp oficial de atención con tu nombre
            completo y el número de celular que usaste en el formulario.
          </li>
          <li>2. Indica el derecho que deseas ejercer.</li>
          <li>
            3. Si la solicitud está incompleta, te pediremos completarla dentro
            de los 5 días siguientes.
          </li>
        </ol>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"
        >
          <MessageSquare className="h-5 w-5" aria-hidden="true" />
          Solicitar por WhatsApp
        </a>

        <h2 className="mt-10 font-display text-xl font-semibold text-neutral-900">
          Plazos de respuesta
        </h2>
        <p className="mt-3 leading-relaxed text-neutral-700">
          Responderemos consultas en un máximo de 10 días hábiles y reclamos en
          un máximo de 15 días hábiles.
        </p>

        <h2 className="mt-10 font-display text-xl font-semibold text-neutral-900">
          Contacto directo
        </h2>
        <p className="mt-3 leading-relaxed text-neutral-700">
          {COMPANY_DATA.legalName} — NIT {COMPANY_DATA.nit}. Correo:{' '}
          <a
            href={`mailto:${COMPANY_DATA.email}`}
            className="text-brand-red-accessible underline"
          >
            {COMPANY_DATA.email}
          </a>
          . También puedes presentar quejas ante la Superintendencia de Industria
          y Comercio (SIC).
        </p>
      </main>
    </div>
  );
}
