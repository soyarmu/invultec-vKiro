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
              How to Measure Your Spring Gap
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              A quick measurement ensures you order the correct size
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
                      Technical measurement diagram
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
                    What to Measure
                  </h3>
                  <p className="mt-2 text-neutral-600">
                    Measure the gap between the coils of your spring when the
                    vehicle is at rest on level ground.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    Where to Measure
                  </h3>
                  <p className="mt-2 text-neutral-600">
                    Locate the coil spring on your vehicle&apos;s suspension.
                    Typically found at the rear axle for most applications.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    How to Measure
                  </h3>
                  <p className="mt-2 text-neutral-600">
                    Use a ruler or caliper to measure the distance between two
                    adjacent coils. Measure in inches for best accuracy.
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
                        Important
                      </p>
                      <p className="mt-1 text-sm text-neutral-700">
                        Measure with the vehicle unloaded and on level ground
                        for the most accurate reading.
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
