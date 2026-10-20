'use client';

import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="border-t border-neutral-200 bg-neutral-900 text-white">
      <div className="container-custom py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Marca / Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-red">
                <span className="text-lg font-extrabold text-white">INV</span>
              </div>
              <span className="text-xl font-bold text-white">
                Invultec Colombia
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm text-neutral-400">
              Especialistas en Rubber Shock de alta resistencia para la suspensión de todo tipo de vehículos en Colombia. Protege tu suspensión, mejora el confort y viaja con total tranquilidad.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-red">
              Enlaces Rápidos
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('fitment-finder')}
                  className="text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  Consultar Vehículo
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  Cómo Funciona
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('measurement-guide')}
                  className="text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  Guía de Medición
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  Preguntas Frecuentes
                </button>
              </li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-red">
              Soporte y Atención
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('fitment-finder')}
                  className="text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  Asesoría en WhatsApp
                </button>
              </li>
              <li>
                <span className="text-sm text-neutral-400">
                  Envíos a todo Colombia
                </span>
              </li>
              <li>
                <Link
                  href="/reembolsos"
                  className="text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  Garantía y Reembolsos
                </Link>
              </li>
              <li>
                <span className="text-sm text-neutral-400">
                  Soporte Técnico Especializado
                </span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-red">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/privacidad"
                  className="text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos"
                  className="text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  Términos del Servicio
                </Link>
              </li>
              <li>
                <Link
                  href="/reembolsos"
                  className="text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  Política de Reembolso
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-800 pt-8">
          <p className="text-center text-xs leading-relaxed text-neutral-400">
            Para quejas o reclamos, escríbenos por nuestro WhatsApp de atención.
            También puedes acudir a la Superintendencia de Industria y Comercio
            (SIC) — www.sic.gov.co. Consulta nuestras políticas en los enlaces
            de la columna Legal.
          </p>
          <p className="mt-4 text-center text-sm text-neutral-500">
            &copy; {currentYear} Invultec Colombia — Rubber Shock RS-001. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
