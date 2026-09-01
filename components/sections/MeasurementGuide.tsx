import { Ruler, AlertCircle } from 'lucide-react';

export function MeasurementGuide() {
  return (
    <section id="measurement-guide" className="bg-white py-16 sm:py-20">
      <div className="container-custom">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-red bg-opacity-10">
              <Ruler className="h-8 w-8 text-brand-red" aria-hidden="true" />
            </div>
            <h2 className="mt-6 text-3xl font-bold text-neutral-900 sm:text-4xl">
              Guía Técnica: Cómo Medir la Separación del Resorte
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Si tu vehículo tiene suspensión adaptada o no aparece en el listado, mide la distancia entre espiras para confirmarte la referencia perfecta.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Diagrama Visual */}
            <div className="order-2 flex items-center justify-center md:order-1">
              <div className="relative aspect-square w-full max-w-md rounded-2xl bg-neutral-100 p-8 border border-neutral-200 shadow-inner flex items-center justify-center text-center">
                <div>
                  <Ruler className="mx-auto h-24 w-24 text-neutral-400 mb-3" aria-hidden="true" />
                  <p className="text-base font-bold text-neutral-800">
                    Espacio de Separación de Espiras
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    Medición de la distancia vertical en reposo
                  </p>
                </div>
              </div>
            </div>

            {/* Instrucciones */}
            <div className="order-1 flex flex-col justify-center md:order-2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    1. ¿Qué se mide?
                  </h3>
                  <p className="mt-1 text-neutral-600">
                    Mide la luz o espacio libre entre dos espiras adyacentes del resorte helicoidal cuando el vehículo está apoyado en el suelo.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    2. ¿Dónde se ubica el resorte?
                  </h3>
                  <p className="mt-1 text-neutral-600">
                    En la mayoría de automóviles y camionetas en Colombia, el resorte helicoidal está instalado en el eje trasero o amortiguador delantero.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    3. ¿Cómo tomar la medida?
                  </h3>
                  <p className="mt-1 text-neutral-600">
                    Utiliza una regla graduada en milímetros o un calibrador. Anota la medida exacta y compártela a nuestro asesor por WhatsApp.
                  </p>
                </div>

                <div className="rounded-xl border border-amber-300 bg-amber-50 p-4">
                  <div className="flex gap-3">
                    <AlertCircle
                      className="h-5 w-5 flex-shrink-0 text-amber-700"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-bold text-amber-800">
                        Nota Importante
                      </p>
                      <p className="mt-1 text-sm text-amber-900">
                        Realiza la medición con el vehículo en terreno plano, sin personas a bordo y sin carga en el baúl para garantizar la máxima precisión.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
