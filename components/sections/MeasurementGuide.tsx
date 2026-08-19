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
              Cómo Medir el Espacio de Tu Resorte
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Una medida rápida asegura que ordenes el tamaño correcto
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Visual Placeholder */}
            <div className="order-2 flex items-center justify-center md:order-1">
              <div className="relative aspect-square w-full max-w-md rounded-lg bg-neutral-100 p-8">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <Ruler className="mx-auto h-24 w-24 text-neutral-300" aria-hidden="true" />
                    <p className="mt-4 text-sm text-neutral-500">
                      Diagrama técnico de medición
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="order-1 flex flex-col justify-center md:order-2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    Qué Medir
                  </h3>
                  <p className="mt-2 text-neutral-600">
                    Mide el espacio entre las bobinas de tu resorte cuando el
                    vehículo está en reposo sobre terreno nivelado.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    Dónde Medir
                  </h3>
                  <p className="mt-2 text-neutral-600">
                    Localiza el resorte de bobina en la suspensión de tu vehículo&apos;s.
                    Típicamente se encuentra en el eje trasero para la mayoría de las aplicaciones.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    Cómo Medir
                  </h3>
                  <p className="mt-2 text-neutral-600">
                    Usa una regla o calibrador para medir la distancia entre dos
                    bobinas adyacentes. Mide en pulgadas para mejor precisión.
                  </p>
                </div>

                <div className="rounded-lg border-2 border-warning bg-warning-light p-4">
                  <div className="flex gap-3">
                    <AlertCircle
                      className="h-5 w-5 flex-shrink-0 text-warning-dark"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-medium text-warning-dark">
                        Importante
                      </p>
                      <p className="mt-1 text-sm text-neutral-700">
                        Mide con el vehículo sin carga y sobre terreno nivelado
                        para obtener la lectura más precisa.
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
