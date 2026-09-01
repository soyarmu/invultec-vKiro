# SPEC 02: Traducción Completa a Español y Optimización de Copy de Marketing Invultec RS-001

**State:** Implementado  
**Date:** 2026-09-01  
**Objective:** Traducir al español todos los componentes y secciones que aún contienen texto en inglés (Trust, FAQ, FinalCTA, Footer, MeasurementGuide), y optimizar el copy publicitario para el mercado colombiano resaltando los beneficios clave del Rubber Shock RS-001 de Invultec.

---

## 1. Scope

### In Scope
- Traducción 100% al español y adaptaciones de copy comercial para los siguientes componentes:
  - `components/sections/Trust.tsx`: Puntos de confianza (atención técnica personalizada, envío a todo Colombia, kits completos, garantía Invultec).
  - `components/sections/FAQ.tsx`: Preguntas frecuentes (compatibilidad con vehículos colombianos, instalación, medición de resorte, durabilidad del hule uretano).
  - `components/sections/FinalCTA.tsx`: Llamado a la acción final con copy persuasivo orientado a conversión vía WhatsApp.
  - `components/navigation/Footer.tsx`: Enlaces rápidos, soporte, información legal y descripción de marca Invultec Colombia.
  - `components/sections/MeasurementGuide.tsx`: Guía técnica de medición simplificada con terminología automotriz colombiana.
  - `components/sections/WhyThisProduct.tsx` & `HowItWorks.tsx`: Ajuste y refinamiento de textos para alineación de propuesta de valor.
- Revisión de micro-textos y badges en componentes UI para eliminar anglicismos innecesarios.

### Out of Scope
- Modificación de la API Route `/api/leads` o base de datos Supabase.
- Cambios estructurales en la paleta de colores de Tailwind o maquetación del Hero.

---

## 2. Data Model

No introduce nuevos modelos de datos ni migraciones en base de datos.
Utiliza constantes traducidas en cada componente React.

---

## 3. Implementation Plan

1. **`components/sections/Trust.tsx`**: Traducir título, subtítulo y los 4 puntos de confianza (Compatibilidad Garantizada, Kits Listos para Instalar, Envío Seguro Colombia, Asesoría Especializada).
2. **`components/sections/FAQ.tsx`**: Traducir y redactar las 5 preguntas frecuentes enfocadas en objeciones comunes de conductores colombianos.
3. **`components/sections/FinalCTA.tsx`**: Actualizar el banner CTA final con copy directo de conversión hacia el formulario y WhatsApp.
4. **`components/navigation/Footer.tsx`**: Traducir textos del pie de página, derechos de autor y enlaces de soporte de Invultec.
5. **`components/sections/MeasurementGuide.tsx`**: Traducir instrucciones de medición del resorte helicoidal (espacio de separación).
6. **Revisión General**: Correr `npm run build` para asegurar 0 errores de tipado e internacionalización fluida.

---

## 4. Acceptance Criteria

- [ ] `Trust.tsx` no contiene ningún texto en inglés y presenta los beneficios comerciales de Invultec en Colombia.
- [ ] `FAQ.tsx` contiene preguntas y respuestas 100% en español natural sobre el Rubber Shock RS-001.
- [ ] `FinalCTA.tsx` utiliza llamado a la acción persuasivo en español dirigiendo al buscador vehicular.
- [ ] `Footer.tsx` muestra la marca Invultec Colombia con enlaces y derechos en español.
- [ ] `MeasurementGuide.tsx` explica la medición del resorte helicoidal en español claro con terminología local.
- [ ] La compilación `npm run build` se ejecuta sin advertencias ni errores.

---

## 5. Decisions Taken and Discarded

- **Sin librerías de i18n pesadas (next-intl / react-i18next)**: Confirmado mantener textos estáticos directamente en componentes React para evitar sobrecarga de bundle JS.
- **Enfoque en español colombiano**: Adoptado vocabulario cercano al mercado local ("huecos", "resorte helicoidal", "pesantez", "vías colombianas").

---

## 6. Identified Risks

- **Inconsistencia de términos técnicos**: Riesgo de mezclar "buffer", "amortiguador" o "separador". Se estandariza el uso de "Amortiguador de Resorte Rubber Shock RS-001" o "Separador de Resorte".
