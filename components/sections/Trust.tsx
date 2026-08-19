import { CheckCircle, Info, Headphones, Package } from 'lucide-react';

const trustPoints = [
  {
    icon: CheckCircle,
    title: 'Know what fits before you order',
    description:
      'Our fitment tool helps you select the right size based on your specific vehicle.',
  },
  {
    icon: Info,
    title: 'Clear sizing information',
    description:
      'Transparent spring gap ranges and compatibility data for each product type.',
  },
  {
    icon: Package,
    title: 'Ready to install',
    description:
      'Complete kits with everything you need, shipped directly to you.',
  },
  {
    icon: Headphones,
    title: 'Customer support',
    description:
      'Questions about fitment? Our team is here to help you find the right size.',
  },
];

export function Trust() {
  return (
    <section className="bg-gradient-to-br from-neutral-900 to-brand-black-800 py-16 sm:py-20">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Know What Fits Before You Order
          </h2>
          <p className="mt-4 text-lg text-neutral-300">
            We&apos;re committed to helping you find the right size for your vehicle
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
