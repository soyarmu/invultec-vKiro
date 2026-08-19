'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

export function Hero() {
  const scrollToFinder = () => {
    const finder = document.getElementById('fitment-finder');
    if (finder) {
      finder.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-900 to-brand-black-800 py-16 sm:py-20 lg:py-24">
      <div className="container-custom">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-red">
              Encuentra Tu Ajuste
            </p>
            
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Encuentra el Amortiguador de Resorte Correcto para Tu Auto
            </h1>
            
            <p className="mt-6 text-lg text-neutral-300 sm:text-xl">
              Dinos qué conduces y te ayudaremos a encontrar el tamaño correcto.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                variant="primary"
                size="lg"
                onClick={scrollToFinder}
                className="group"
              >
                Encuentra Mi Ajuste
                <ArrowRight
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
            </div>

            <div className="mt-10 flex flex-col gap-3 text-sm text-neutral-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-brand-red" aria-hidden="true" />
                <span>Rápido. Simple. Específico para tu vehículo.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-brand-red" aria-hidden="true" />
                <span>Múltiples tamaños disponibles</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-brand-red" aria-hidden="true" />
                <span>Instalación fácil</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative">
              {/* Placeholder for product visual */}
              <div className="relative aspect-square w-full max-w-lg rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-700 p-8 shadow-2xl">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto h-48 w-48 rounded-full bg-neutral-600 opacity-20"></div>
                    <p className="mt-4 text-sm text-neutral-500">
                      Imagen del Producto
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Accent decoration */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-brand-red opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-brand-red opacity-10 blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
