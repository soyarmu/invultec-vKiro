'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare } from 'lucide-react';

export function FinalCTA() {
  const scrollToFinder = () => {
    const finder = document.getElementById('fitment-finder');
    if (finder) {
      finder.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="bg-white py-16 sm:py-20 border-t border-neutral-100">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block px-3 py-1 bg-red-100 text-brand-red text-xs font-bold rounded-full uppercase tracking-wider mb-3">
            Atención Inmediata Invultec
          </span>
          <h2 className="text-3xl font-extrabold text-neutral-900 sm:text-4xl">
            ¿Quieres Proteger la Suspensión de tu Auto Hoy Mismo?
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Ingresa la marca, modelo y año de tu vehículo en nuestro buscador interactivo y chatea directamente con un asesor de ventas de Invultec Colombia.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={scrollToFinder}
              className="group flex items-center space-x-2 bg-brand-red hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Consultar Disponibilidad</span>
              <ArrowRight
                className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
