import { Search, CheckCircle, ShoppingCart } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Tell us your car',
    description:
      'Enter your vehicle make, model, and year to get started with our fitment finder.',
  },
  {
    number: "02",
    icon: CheckCircle,
    title: "Find your fit",
    description:
      "We'll analyze your vehicle and recommend the right buffer size based on compatibility data.",
  },
  {
    number: '03',
    icon: ShoppingCart,
    title: 'Get your buffer',
    description:
      'Order with confidence knowing you have the correct size for your vehicle.',
  },
];

export function HowItWorks() {
  return (
    <section className="bg-neutral-50 py-16 sm:py-20">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Three simple steps to find the perfect fit for your vehicle
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector line - hidden on mobile, shown on md+ */}
                {index < steps.length - 1 && (
                  <div
                    className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-neutral-200 md:block"
                    aria-hidden="true"
                  />
                )}

                <div className="relative flex flex-col items-center text-center">
                  {/* Step number */}
                  <div className="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-red text-2xl font-bold text-white shadow-red">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-100">
                    <Icon
                      className="h-6 w-6 text-brand-red"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-neutral-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-neutral-600">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
