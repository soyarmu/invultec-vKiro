'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  const scrollToFinder = () => {
    const finder = document.getElementById('fitment-finder');
    if (finder) {
      finder.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
            Not sure which size you need?
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Tell us what you drive and we&apos;ll help you find your fit
          </p>
          <div className="mt-8">
            <Button
              variant="primary"
              size="lg"
              onClick={scrollToFinder}
              className="group"
            >
              Find My Fit
              <ArrowRight
                className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
