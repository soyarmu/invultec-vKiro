# Ejemplos de Animaciones Avanzadas

Este documento contiene ejemplos de código para extender las animaciones del Hero con interactividad y efectos adicionales.

---

## 🖱️ Parallax con Mouse

### Implementación Básica

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';

export function Hero() {
  const productRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (productRef.current) {
      productRef.current.style.transform = `
        translateX(${mousePos.x * 10}px) 
        translateY(${mousePos.y * 10}px)
      `;
    }
    if (impactRef.current) {
      impactRef.current.style.transform = `
        translate(-50%, -50%) 
        scale(1) 
        translateX(${mousePos.x * 5}px) 
        translateY(${mousePos.y * 5}px)
      `;
    }
  }, [mousePos]);

  // Resto del componente...
}
```

---

## 📜 Scroll-Triggered Animations

### Con IntersectionObserver

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Animar solo una vez
        }
      },
      { threshold: 0.2 } // Activar cuando 20% es visible
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={heroRef}
      className={`hero ${isVisible ? 'animate-in' : 'opacity-0'}`}
    >
      {/* Contenido del hero */}
    </section>
  );
}
```

### Con Framer Motion (Avanzado)

```typescript
'use client';

import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="hero">
      <motion.div
        className="layer-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35 }}
      >
        {/* Contenido */}
      </motion.div>

      <motion.div
        className="layer-product"
        initial={{ opacity: 0, x: 40, scale: 0.94 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ 
          duration: 1, 
          delay: 1,
          type: "spring",
          stiffness: 100
        }}
      >
        {/* Producto SVG */}
      </motion.div>
    </section>
  );
}
```

---

## 🔢 Counter Animado (Specs)

### Usando CSS Counters

```typescript
'use client';

import { useEffect, useState } from 'react';

function AnimatedCounter({ 
  target, 
  suffix = '', 
  duration = 2000 
}: { 
  target: number; 
  suffix?: string; 
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <>{count}{suffix}</>;
}

// Uso en specs:
<ul className="specs">
  <li>
    <strong className="text-brand-red">
      +<AnimatedCounter target={2.7} suffix=" cm" />
    </strong> altura
  </li>
  <li>
    <strong className="text-brand-red">
      <AnimatedCounter target={95} suffix="%" />
    </strong> absorción
  </li>
</ul>
```

---

## ⌨️ Typewriter Effect

### Efecto de Escritura Progresiva

```typescript
'use client';

import { useEffect, useState } from 'react';

function TypewriterText({ 
  text, 
  speed = 50 
}: { 
  text: string; 
  speed?: number;
}) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <>{displayText}</>;
}

// Uso en subhead:
<p className="subhead">
  <TypewriterText 
    text="Tope de suspensión en caucho neopreno. Se instala sobre los espirales del vehículo en 5 minutos por rueda."
    speed={30}
  />
</p>
```

---

## 🌊 Efecto de Ondas (Ripple)

### En el Botón CTA

```typescript
'use client';

import { useState } from 'react';

function RippleButton({ 
  onClick, 
  children 
}: { 
  onClick: () => void; 
  children: React.ReactNode;
}) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
    
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="cta relative overflow-hidden"
    >
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
          }}
        />
      ))}
    </button>
  );
}

// Tailwind config:
// animation: { 'ripple': 'ripple 0.6s ease-out' }
// keyframes: {
//   ripple: {
//     '0%': { width: '0', height: '0', opacity: '1' },
//     '100%': { width: '300px', height: '300px', opacity: '0', 
//               transform: 'translate(-50%, -50%)' }
//   }
// }
```

---

## ✨ Partículas Flotantes

### Partículas Técnicas en Background

```typescript
'use client';

import { useEffect, useRef } from 'react';

function TechnicalParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    // Crear partículas
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(199, 197, 187, 0.3)'; // neutral-300

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] opacity-20 pointer-events-none"
    />
  );
}

// Agregar en Hero:
<div className="layer-bg">
  <TechnicalParticles />
  {/* Resto del contenido */}
</div>
```

---

## 🎭 Glitch Effect (Opcional)

### Efecto Glitch en Título

```typescript
'use client';

import { useEffect, useState } from 'react';

function GlitchText({ 
  text, 
  className 
}: { 
  text: string; 
  className?: string;
}) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 100);
    }, 5000); // Glitch cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <span 
      className={`
        ${className} 
        ${isGlitching ? 'animate-glitch' : ''}
      `}
      style={{
        position: 'relative',
      }}
    >
      {text}
      {isGlitching && (
        <>
          <span 
            className="absolute inset-0 text-brand-red opacity-70"
            style={{ 
              left: '-2px', 
              textShadow: '2px 0 #E31E24' 
            }}
          >
            {text}
          </span>
          <span 
            className="absolute inset-0 text-blue-500 opacity-70"
            style={{ 
              left: '2px', 
              textShadow: '-2px 0 #3B82F6' 
            }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
}

// Uso:
<h1>
  <GlitchText text="Rubber" />
  <br />
  <GlitchText text="Shock" className="text-brand-red" />
</h1>

// Tailwind config:
// animation: { 'glitch': 'glitch 0.3s ease-in-out' }
// keyframes: {
//   glitch: {
//     '0%, 100%': { transform: 'translate(0)' },
//     '20%': { transform: 'translate(-2px, 2px)' },
//     '40%': { transform: 'translate(2px, -2px)' },
//     '60%': { transform: 'translate(-2px, -2px)' },
//     '80%': { transform: 'translate(2px, 2px)' }
//   }
// }
```

---

## 🎨 Color Transitions

### Cambio de Color en Hover/Scroll

```typescript
'use client';

import { useEffect, useState } from 'react';

export function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      className={`
        hero 
        transition-all duration-700
        ${scrolled ? 'bg-neutral-900' : 'bg-neutral-950'}
      `}
    >
      {/* Contenido */}
    </section>
  );
}
```

---

## 🎯 Instalación de Dependencias

Para usar algunos de estos ejemplos, necesitarás instalar:

```bash
# Framer Motion (animaciones avanzadas)
npm install framer-motion

# GSAP (animaciones profesionales)
npm install gsap

# React Spring (físicas realistas)
npm install @react-spring/web
```

---

## 📚 Recursos Adicionales

- [Framer Motion Docs](https://www.framer.com/motion/)
- [GSAP Docs](https://greensock.com/docs/)
- [CSS Animation Guide](https://web.dev/animations/)
- [React Spring Docs](https://www.react-spring.dev/)

---

**Nota:** Estos ejemplos son plantillas. Ajusta los valores de timing, colores y comportamiento según las necesidades específicas de tu proyecto.
