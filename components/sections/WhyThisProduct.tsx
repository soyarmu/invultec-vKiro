import { Shield, Wrench, Layers, Package } from 'lucide-react';

const benefits = [
  {
    icon: Layers,
    title: 'Designed for a Better Fit',
    description:
      'Available in multiple sizes to match your specific spring gap for optimal performance.',
  },
  {
    icon: Shield,
    title: 'Supports the Coil Spring',
    description:
      'Helps maintain proper spring compression and reduces excessive movement.',
  },
  {
    icon: Wrench,
    title: 'Easy Installation',
    description:
      'Simple to install without specialized tools or professional assistance.',
  },
  {
    icon: Package,
    title: 'Complete Kit',
    description: 'Includes 2 buffers per pack, ready to install on your vehicle.',
  },
];

export function WhyThisProduct() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            Why Choose Our Coil Spring Buffers?
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Precision-engineered components for your vehicle&apos;s suspension system.
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
