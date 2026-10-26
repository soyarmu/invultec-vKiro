'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

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
        { label: '35% ABS.', x: '90%', y: '18%', delay: '3.3s' },
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
    <section className="hero relative isolate grid min-h-screen grid-cols-1 items-center overflow-hidden bg-neutral-950 text-neutral-100 lg:grid-cols-[0.85fr_1.15fr]">
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
        aria-hidden="true"
        focusable="false"
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
        <svg
          viewBox="0 0 640 640"
          width="100%"
          height="100%"
          aria-hidden="true"
          focusable="false"
        >
          {/* Pulsing rings */}
          <circle
            className="impact-ring animate-ring-pulse"
            cx="320"
            cy="320"
            r="120"
            fill="none"
            stroke="#C0262D"
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
            stroke="#C0262D"
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
            stroke="#C0262D"
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
            stroke="#C0262D"
            strokeWidth="1"
            opacity="0.5"
          />
          <line
            x1="320"
            y1="580"
            x2="320"
            y2="630"
            stroke="#C0262D"
            strokeWidth="1"
            opacity="0.5"
          />
          <line
            x1="10"
            y1="320"
            x2="60"
            y2="320"
            stroke="#C0262D"
            strokeWidth="1"
            opacity="0.5"
          />
          <line
            x1="580"
            y1="320"
            x2="630"
            y2="320"
            stroke="#C0262D"
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
        <p className="eyebrow font-mono text-xs uppercase tracking-[0.14em] text-brand-red-onDark flex items-center gap-2.5 mb-4">
          <span className="w-[26px] h-px bg-brand-red" />
          Ref. RS-001 · 100% neopreno
        </p>

        <h1 className="font-display text-[clamp(2.6rem,6vw,4.6rem)] font-bold leading-[0.96] tracking-tight uppercase text-neutral-0 mb-4">
          Rubber
          <br />
          <span className="text-brand-red-onDark">Shock</span>{' '}
          <span
            className="font-display font-bold text-transparent text-[0.32em] align-top"
            style={{
              WebkitTextStroke: '1.5px #C0262D',
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
            <strong className="text-brand-red-onDark font-medium">+2.7 cm</strong>{' '}
            altura
          </li>
          <li className="font-mono text-xs text-neutral-100 border border-neutral-800 bg-[rgba(255,255,255,0.02)] px-3 py-2 flex items-center gap-2 tracking-wide">
            <strong className="text-brand-red-onDark font-medium">35%</strong>{' '}
            absorción de impacto
          </li>
          <li className="font-mono text-xs text-neutral-100 border border-neutral-800 bg-[rgba(255,255,255,0.02)] px-3 py-2 flex items-center gap-2 tracking-wide">
            <strong className="text-brand-red-onDark font-medium">5 min</strong>{' '}
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
          <span className="cta-note font-mono text-[11px] text-neutral-400">
            Envíos a nivel nacional
          </span>
        </div>
      </div>

      {/* LAYER 4 — PRODUCT */}
      <div className="layer-product relative z-[3] col-span-1 flex items-center justify-center px-0 py-8 opacity-0 translate-x-10 scale-94 animate-product-in sm:py-10 lg:py-6">
        <div className="product-parallax animate-idle-float relative w-[min(110%,880px)] aspect-[2752/1536]">
          <Image
            src="/images/1ruber_hero_invultec.png"
            alt="Rubber Shock RS-001 - Render 3D cinematográfico y vista rayos X de suspensión"
            fill
            priority
            sizes="(max-width: 640px) 95vw, (max-width: 1024px) 80vw, 880px"
            className="object-contain scale-[1.35] drop-shadow-[0_25px_45px_rgba(0,0,0,0.7)]"
          />
        </div>
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
