import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export interface LegalSection {
  id: string;
  heading: string;
  body: string[];
}

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export const LEGAL_LINKS = [
  { href: '/privacidad', label: 'Política de Privacidad' },
  { href: '/terminos', label: 'Términos del Servicio' },
  { href: '/reembolsos', label: 'Política de Reembolso' },
  { href: '/cookies', label: 'Política de Cookies' },
];

export function LegalPage({ title, lastUpdated, sections }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-neutral-900">
        <div className="container-custom flex h-16 items-center justify-between sm:h-20">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-white transition-colors hover:text-brand-red"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-red text-lg font-extrabold text-white">
              INV
            </span>
            Invultec Colombia
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="container-custom max-w-4xl py-12 sm:py-16">
        {process.env.NODE_ENV !== 'production' && (
          <div
            role="note"
            className="mb-8 border-l-4 border-amber-500 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          >
            <strong>Pendiente de revisión jurídica.</strong> Este texto es un
            borrador y no debe publicarse en producción sin validación legal.
          </div>
        )}

        <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-neutral-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Última actualización: {lastUpdated}
        </p>

        <nav aria-label="Documentos legales" className="mt-6">
          <ul className="flex flex-wrap gap-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block rounded border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-700 transition-colors hover:border-brand-red hover:text-brand-red"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <article className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="font-display text-xl font-semibold text-neutral-900">
                {section.heading}
              </h2>
              {section.body.map((paragraph, index) => (
                <p
                  key={`${section.id}-${index}`}
                  className="mt-3 leading-relaxed text-neutral-700"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </article>

        <footer className="mt-12 border-t border-neutral-200 pt-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-brand-red hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver al inicio
          </Link>
        </footer>
      </main>
    </div>
  );
}
