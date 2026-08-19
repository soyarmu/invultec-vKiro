'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToFinder = () => {
    scrollToSection('fitment-finder');
  };

  return (
    <nav
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-200',
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-white bg-opacity-95 backdrop-blur-sm'
      )}
    >
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 text-xl font-bold text-neutral-900 hover:text-brand-red transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-red">
                <span className="text-lg font-bold text-white">AR</span>
              </div>
              <span className="hidden sm:inline">Amortiguadores de Resorte</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-sm font-medium text-neutral-700 hover:text-brand-red transition-colors"
            >
              Cómo Funciona
            </button>
            <button
              onClick={scrollToFinder}
              className="text-sm font-medium text-neutral-700 hover:text-brand-red transition-colors"
            >
              Encuentra Tu Ajuste
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-sm font-medium text-neutral-700 hover:text-brand-red transition-colors"
            >
              Preguntas Frecuentes
            </button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button variant="primary" size="md" onClick={scrollToFinder}>
              Encuentra Mi Ajuste
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100 md:hidden"
            aria-label="Alternar menú"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-neutral-200 bg-white md:hidden">
          <div className="container-custom py-4">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-left text-sm font-medium text-neutral-700 hover:text-brand-red transition-colors"
              >
                Cómo Funciona
              </button>
              <button
                onClick={scrollToFinder}
                className="text-left text-sm font-medium text-neutral-700 hover:text-brand-red transition-colors"
              >
                Encuentra Tu Ajuste
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-left text-sm font-medium text-neutral-700 hover:text-brand-red transition-colors"
              >
                Preguntas Frecuentes
              </button>
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={scrollToFinder}
                  className="w-full"
                >
                  Encuentra Mi Ajuste
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
