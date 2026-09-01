import { CheckCircle, Info, Headphones, Package } from 'lucide-react';

const trustPoints = [
  {
    icon: CheckCircle,
    title: 'Compatibilidad Exacta',
    description:
      'Nuestro sistema verifica la medida adecuada según la marca, modelo y año de tu vehículo.',
  },
  {
    icon: Info,
    title: 'Especificaciones Transparentes',
    description:
      'Datos técnicos claros y rango de separación de espira para la máxima tranquilidad en tu compra.',
  },
  {
    icon: Package,
    title: 'Kits Listos para Instalar',
    description:
      'Paquetes completos con 2 amortiguadores de hule uretano Rubber Shock RS-001 de alta durabilidad.',
  },
  {
    icon: Headphones,
    title: 'Asesoría Especializada WhatsApp',
    description:
      '¿Tienes dudas sobre la medida? Nuestros asesores técnicos de Invultec Colombia te guían en tiempo real.',
  },
];

export function Trust() {
  return (
    <section className="bg-gradient-to-br from-neutral-900 to-neutral-800 py-16 sm:py-20">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Compatibilidad Garantizada Antes de Comprar
          </h2>
          <p className="mt-4 text-lg text-neutral-300">
            Nos aseguramos de que recibas la medida exacta para proteger la suspensión de tu auto en las vías de Colombia.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-brand-red bg-opacity-20">
                  <Icon className="h-7 w-7 text-brand-red" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-400">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
