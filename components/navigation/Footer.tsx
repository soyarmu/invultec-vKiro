'use client';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="container-custom py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-red">
                <span className="text-lg font-bold text-white">CS</span>
              </div>
              <span className="text-lg font-bold text-neutral-900">
                Coil Spring Buffers
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm text-neutral-600">
              Find the right coil spring buffer for your vehicle with our
              precision fitment tool. Available in multiple sizes for optimal
              compatibility.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('fitment-finder')}
                  className="text-sm text-neutral-600 hover:text-brand-red transition-colors"
                >
                  Find Your Fit
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-sm text-neutral-600 hover:text-brand-red transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('measurement-guide')}
                  className="text-sm text-neutral-600 hover:text-brand-red transition-colors"
                >
                  Measurement Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="text-sm text-neutral-600 hover:text-brand-red transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
              Support
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-neutral-600 hover:text-brand-red transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-neutral-600 hover:text-brand-red transition-colors"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-neutral-600 hover:text-brand-red transition-colors"
                >
                  Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-neutral-600 hover:text-brand-red transition-colors"
                >
                  Help Center
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-200 pt-8">
          <p className="text-center text-sm text-neutral-500">
            &copy; {currentYear} Coil Spring Buffers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
