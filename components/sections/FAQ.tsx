'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: '¿Le servirá el Rubber Shock RS-001 a mi vehículo?',
    answer:
      'Usa nuestro buscador de compatibilidad vehicular en esta página. Selecciona tu marca, modelo y año para conocer la disponibilidad. Si tu vehículo no aparece o tiene la suspensión modificada, nuestros asesores técnicos de Invultec te atenderán directamente por WhatsApp para confirmarte la medida exacta.',
  },
  {
    question: '¿Qué beneficios le aporta a la suspensión de mi carro?',
    answer:
      'El Rubber Shock RS-001 absorbe hasta un 95% de los golpes fuertes al pasar por huecos o resaltos, evita que el vehículo se agache por el peso de carga o pasajeros, mejora la estabilidad en curvas y prolonga la vida útil de tus amortiguadores originales.',
  },
  {
    question: '¿Cuántas unidades vienen en cada paquete?',
    answer:
      'Cada kit Rubber Shock RS-001 incluye un par (2 unidades de hule uretano reforzado) listo para ser instalado en un eje de tu vehículo.',
  },
  {
    question: '¿Requiere modificar la suspensión para instalarlo?',
    answer:
      'No. La instalación es 100% reversible y no altera, corta ni modifica ninguna pieza original del vehículo ni invalida la garantía de la suspensión.',
  },
  {
    question: '¿Es difícil de instalar?',
    answer:
      'No requiere herramientas especializadas. Se instala directamente entre las espiras del resorte helicoidal cuando el vehículo está elevado o en reposo. Enviarás un mensaje a WhatsApp y te adjuntaremos el manual visual de instalación paso a paso.',
  },
  {
    question: '¿Hacen envíos a toda Colombia?',
    answer:
      'Sí, realizamos envíos seguros a nivel nacional a todas las ciudades y municipios de Colombia con soporte y seguimiento directo de Invultec.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-neutral-50 py-16 sm:py-20">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
              Preguntas Frecuentes
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Resuelve tus dudas sobre el amortiguador de resorte Rubber Shock RS-001 de Invultec Colombia
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="card overflow-hidden transition-shadow hover:shadow-md"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-start justify-between gap-4 p-6 text-left"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-semibold text-neutral-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 flex-shrink-0 text-neutral-500 transition-transform',
                      openIndex === index && 'rotate-180'
                    )}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-200',
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  )}
                >
                  <div className="px-6 pb-6">
                    <p className="text-neutral-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
