'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'Will this fit my car?',
    answer:
      "Use our vehicle fitment finder above to check compatibility. Simply enter your make, model, and year, and we'll recommend the right size. If your vehicle isn't listed, you can measure your spring gap to determine the correct type.",
  },
  {
    question: 'How do I know which size I need?',
    answer:
      'Our fitment tool will recommend the correct size based on your vehicle. Each size is designed for a specific spring gap range. If you prefer to measure yourself, refer to our measurement guide for instructions.',
  },
  {
    question: 'Do I need to measure my spring?',
    answer:
      'Not always. If your vehicle is in our compatibility database, we can recommend the right size automatically. However, measuring your spring gap is recommended if your vehicle has aftermarket suspension or if you want to verify the fit.',
  },
  {
    question: 'How many pieces are included?',
    answer:
      'Each pack includes 2 coil spring buffers, suitable for one axle (typically rear). Most installations require one pack per vehicle.',
  },
  {
    question: "What if my vehicle isn't listed?",
    answer:
      'You can still find the right size by measuring your spring gap. Follow our measurement guide to take an accurate measurement, then use the measurement tool to find your recommended size.',
  },
  {
    question: 'Can I use these on front or rear springs?',
    answer:
      "These buffers are most commonly used on rear coil springs. Check your vehicle's spring gap and compare it to the product specifications to ensure proper fit.",
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
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Everything you need to know about finding the right fit
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
