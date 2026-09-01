'use client';

import { useEffect, useRef } from 'react';

export function Hero() {
  const rivetsRef = useRef<HTMLDivElement>(null);
  const ticksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add rivets
    if (rivetsRef.current) {
      const rivetPositions = [
        [3, 4],
        [97, 4],
        [3, 96],
        [97, 96],
        [50, 2],
        [50, 98],
      ];
      rivetPositions.forEach(([x, y]) => {
        const rivet = document.createElement('span');
        rivet.className =
          'absolute w-1.5 h-1.5 rounded-full bg-neutral-500 opacity-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]';
        rivet.style.left = `${x}%`;
        rivet.style.top = `${y}%`;
        rivetsRef.current?.appendChild(rivet);
      });
    }

    // Add measurement ticks
    if (ticksRef.current) {
      const ticks = [
        { label: 'RS-001', x: '6%', y: '10%', delay: '3.1s' },
        { label: '95% ABS.', x: '90%', y: '18%', delay: '3.3s' },
        { label: '+2.7CM', x: '4%', y: '82%', delay: '3.5s' },
        { label: 'NEOPRENO', x: '88%', y: '86%', delay: '3.7s' },
      ];
      ticks.forEach((tick) => {
        const el = document.createElement('span');
        el.className =
          'absolute font-mono text-[11px] tracking-wider text-neutral-400 opacity-0 animate-tick-in';
        el.textContent = tick.label;
        el.style.left = tick.x;
        el.style.top = tick.y;
        el.style.animationDelay = tick.delay;
        ticksRef.current?.appendChild(el);
      });
    }
  }, []);

  const scrollToFinder = () => {
    const finder = document.getElementById('fitment-finder');
    if (finder) {
      finder.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="hero relative isolate grid min-h-screen grid-cols-1 items-center overflow-hidden bg-neutral-950 text-neutral-100 lg:grid-cols-[1.05fr_0.95fr]">
      {/* LAYER 1 — BACKGROUND */}
      <div
        className="layer-bg absolute inset-0 z-0 opacity-0 animate-bg-in"
        style={{
          background:
            'linear-gradient(155deg, #171716 0%, #0E0E0E 55%, #050505 100%)',
        }}
      >
        {/* Diagonal steel-plate seam */}
        <div
          className="absolute inset-[-10%]"
          style={{
            background:
              'linear-gradient(100deg, transparent 46%, rgba(255,255,255,0.045) 47%, rgba(255,255,255,0.045) 47.6%, transparent 48.4%)',
          }}
        />
        {/* Rivets */}
        <div ref={rivetsRef} className="rivets absolute inset-0" />
      </div>

      {/* LAYER 2 — TECHNICAL GRID */}
      <svg
        className="layer-grid absolute inset-0 z-[1] opacity-0 animate-grid-in"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="techGrid"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 64 0 L 0 0 0 64"
              fill="none"
              stroke="#C7C5BB"
              strokeWidth="0.5"
              opacity="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#techGrid)" />
      </svg>

      {/* LAYER 3 — IMPACT DIAGRAM */}
      <div className="layer-impact absolute right-[6%] top-1/2 z-[2] h-[min(46vw,640px)] w-[min(46vw,640px)] -translate-y-1/2 scale-85 opacity-0 animate-impact-in lg:block hidden">
        <svg viewBox="0 0 640 640" width="100%" height="100%">
          {/* Pulsing rings */}
          <circle
            className="impact-ring animate-ring-pulse"
            cx="320"
            cy="320"
            r="120"
            fill="none"
            stroke="#E31E24"
            strokeOpacity="0.55"
            strokeWidth="1"
            strokeDasharray="2 6"
            style={{ transformOrigin: 'center', animationDelay: '0s' }}
          />
          <circle
            className="impact-ring animate-ring-pulse"
            cx="320"
            cy="320"
            r="200"
            fill="none"
            stroke="#E31E24"
            strokeOpacity="0.55"
            strokeWidth="1"
            strokeDasharray="2 8"
            style={{ transformOrigin: 'center', animationDelay: '0.4s' }}
          />
          <circle
            className="impact-ring animate-ring-pulse"
            cx="320"
            cy="320"
            r="280"
            fill="none"
            stroke="#E31E24"
            strokeOpacity="0.55"
            strokeWidth="1"
            strokeDasharray="2 10"
            style={{ transformOrigin: 'center', animationDelay: '0.8s' }}
          />
          {/* Crosshair lines */}
          <line
            x1="320"
            y1="10"
            x2="320"
            y2="60"
            stroke="#E31E24"
            strokeWidth="1"
            opacity="0.5"
          />
          <line
            x1="320"
            y1="580"
            x2="320"
            y2="630"
            stroke="#E31E24"
            strokeWidth="1"
            opacity="0.5"
          />
          <line
            x1="10"
            y1="320"
            x2="60"
            y2="320"
            stroke="#E31E24"
            strokeWidth="1"
            opacity="0.5"
          />
          <line
            x1="580"
            y1="320"
            x2="630"
            y2="320"
            stroke="#E31E24"
            strokeWidth="1"
            opacity="0.5"
          />
          {/* Measurement label */}
          <text
            x="330"
            y="130"
            fontFamily="JetBrains Mono"
            fontSize="11"
            fill="#C7C5BB"
            opacity="0.7"
          >
            -2.7 CM
          </text>
        </svg>
      </div>

      {/* LAYER 5 — MEASUREMENT TICKS */}
      <div
        ref={ticksRef}
        className="layer-ticks absolute inset-0 z-[4] pointer-events-none"
      />

      {/* LAYER 6 — CONTENT */}
      <div className="layer-content relative z-[5] col-span-1 px-6 py-24 opacity-0 translate-y-3.5 animate-content-in sm:px-12 lg:px-16 lg:py-32">
        <p className="eyebrow font-mono text-xs uppercase tracking-[0.14em] text-brand-red flex items-center gap-2.5 mb-4">
          <span className="w-[26px] h-px bg-brand-red" />
          Ref. RS-001 · 100% neopreno
        </p>

        <h1 className="font-display text-[clamp(2.6rem,6vw,4.6rem)] font-bold leading-[0.96] tracking-tight uppercase text-neutral-0 mb-4">
          Rubber
          <br />
          <span className="text-brand-red">Shock</span>{' '}
          <span
            className="font-display font-bold text-transparent text-[0.32em] align-top"
            style={{
              WebkitTextStroke: '1.5px #E31E24',
            }}
          >
            R
          </span>
        </h1>

        <p className="subhead font-body text-[clamp(0.95rem,1.4vw,1.05rem)] leading-relaxed text-neutral-300 max-w-[34ch] mb-8">
          Tope de suspensión en caucho neopreno. Se instala sobre los espirales
          del vehículo en 5 minutos por rueda, sin desmontar piezas ni afectar
          la garantía.
        </p>

        <ul className="specs flex flex-wrap gap-2.5 mb-10 p-0 list-none">
          <li className="font-mono text-xs text-neutral-100 border border-neutral-800 bg-[rgba(255,255,255,0.02)] px-3 py-2 flex items-center gap-2 tracking-wide">
            <strong className="text-brand-red font-medium">+2.7 cm</strong>{' '}
            altura
          </li>
          <li className="font-mono text-xs text-neutral-100 border border-neutral-800 bg-[rgba(255,255,255,0.02)] px-3 py-2 flex items-center gap-2 tracking-wide">
            <strong className="text-brand-red font-medium">95%</strong>{' '}
            absorción de impacto
          </li>
          <li className="font-mono text-xs text-neutral-100 border border-neutral-800 bg-[rgba(255,255,255,0.02)] px-3 py-2 flex items-center gap-2 tracking-wide">
            <strong className="text-brand-red font-medium">5 min</strong>{' '}
            instalación por rueda
          </li>
        </ul>

        <div className="cta-row flex flex-col items-start gap-3.5 sm:flex-row sm:items-center">
          <button
            onClick={scrollToFinder}
            className="cta font-body font-semibold text-sm text-neutral-0 bg-brand-red px-7 py-3.5 border-none cursor-pointer uppercase tracking-wider transition-all duration-200 hover:bg-brand-red-dark hover:-translate-y-px"
            style={{
              clipPath:
                'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
            }}
          >
            Ver producto
          </button>
          <span className="cta-note font-mono text-[11px] text-neutral-500">
            Envíos a nivel nacional
          </span>
        </div>
      </div>

      {/* LAYER 4 — PRODUCT */}
      <div className="layer-product relative z-[3] col-span-1 flex items-center justify-center px-8 py-16 opacity-0 translate-x-10 scale-94 animate-product-in lg:py-16">
        <svg
          className="product-parallax animate-idle-float w-[min(90%,460px)] h-auto"
          style={{
            filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.55))',
            transformOrigin: 'center',
          }}
          viewBox="0 0 320 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top cap */}
          <ellipse
            cx="160"
            cy="60"
            rx="34"
            ry="12"
            fill="#1A1A18"
            stroke="#3A3A37"
          />
          <rect x="140" y="20" width="40" height="46" rx="6" fill="#111" />

          {/* Upper mount */}
          <path
            d="M110 90 Q160 60 210 90 L215 150 Q160 175 105 150 Z"
            fill="#161615"
            stroke="#3A3A37"
            strokeWidth="1.5"
          />
          <circle cx="130" cy="115" r="6" fill="#050505" />
          <circle cx="190" cy="115" r="6" fill="#050505" />

          {/* Shock wave lines */}
          <g stroke="#E31E24" strokeWidth="4" fill="none" opacity="0.9">
            <path d="M60 150 C90 160, 70 190, 100 200 C130 210, 110 240, 140 250" />
            <path d="M220 150 C250 160, 230 190, 260 200 C290 210, 270 240, 300 250" />
          </g>

          {/* Rubber coils */}
          <g stroke="#4A4A46" strokeWidth="1.5">
            <ellipse cx="160" cy="160" rx="72" ry="26" fill="#0F0F0E" />
            <ellipse cx="160" cy="185" rx="72" ry="26" fill="#141412" />
            <ellipse cx="160" cy="210" rx="72" ry="26" fill="#0F0F0E" />
            <ellipse cx="160" cy="235" rx="72" ry="26" fill="#141412" />
          </g>

          {/* Texture details */}
          <g fill="#050505">
            <circle cx="120" cy="160" r="4" />
            <circle cx="160" cy="150" r="4" />
            <circle cx="200" cy="160" r="4" />
            <circle cx="120" cy="185" r="4" />
            <circle cx="160" cy="175" r="4" />
            <circle cx="200" cy="185" r="4" />
            <circle cx="120" cy="210" r="4" />
            <circle cx="160" cy="200" r="4" />
            <circle cx="200" cy="210" r="4" />
          </g>

          {/* Lower shaft */}
          <rect
            x="140"
            y="255"
            width="40"
            height="130"
            rx="4"
            fill="#101010"
            stroke="#2E2E2B"
          />
          <rect x="132" y="270" width="56" height="10" fill="#E31E24" />

          {/* Bottom mount */}
          <circle cx="160" cy="390" r="10" fill="#0A0A0A" stroke="#3A3A37" />
        </svg>
      </div>

      {/* Mobile impact diagram adjustment */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .layer-impact {
            display: block;
            right: 50%;
            top: 62%;
            transform: translate(50%, -50%) scale(0.85);
          }
        }
      `}</style>
    </section>
  );
}
