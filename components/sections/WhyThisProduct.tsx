import { Shield, Wrench, Layers, Package } from 'lucide-react';

const benefits = [
  {
    icon: Layers,
    title: 'Diseñado para un Mejor Ajuste',
    description:
      'Disponible en múltiples tamaños para coincidir con tu espacio de resorte específico para un rendimiento óptimo.',
  },
  {
    icon: Shield,
    title: 'Soporta el Resorte de Bobina',
    description:
      'Ayuda a mantener la compresión adecuada del resorte y reduce el movimiento excesivo.',
  },
  {
    icon: Wrench,
    title: 'Instalación Fácil',
    description:
      'Simple de instalar sin herramientas especializadas o asistencia profesional.',
  },
  {
    icon: Package,
    title: 'Kit Completo',
    description: 'Incluye 2 amortiguadores por paquete, listos para instalar en tu vehículo.',
  },
];

export function WhyThisProduct() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            ¿Por Qué Elegir Nuestros Amortiguadores de Resorte?
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Componentes de precisión ingeniera para el sistema de suspensión de tu vehículo.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-brand-red bg-opacity-10">
                  <Icon className="h-8 w-8 text-brand-red" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-neutral-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
