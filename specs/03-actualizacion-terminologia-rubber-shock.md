# SPEC 03: Actualización de Terminología a Rubber Shock y Helicoidales

**State:** Aprobado  
**Date:** 2026-09-01  
**Objective:** Reemplazar las menciones de "Amortiguadores de Resorte de Bobina" y "bobinas" por "Rubber Shock" y "resortes helicoidales / espirales", garantizando la creación de una rama aislada de git para la implementación.

---

## 1. Scope

### In Scope
- Creación aislada de rama git `spec-03-actualizacion-terminologia-rubber-shock` mediante `/spec-impl`.
- Reemplazar "Amortiguadores de Resorte de Bobina" y "Amortiguadores de Resorte" por "Rubber Shock" en:
  - `app/layout.tsx`: Títulos de la aplicación, metadatos OpenGraph, Twitter card y siteName.
  - `components/navigation/Navbar.tsx`: Nombre de marca en el logo superior.
  - `components/navigation/Footer.tsx`: Descripción principal del pie de página.
  - `components/sections/WhyThisProduct.tsx`: Encabezados y descripciones.
- Cambiar referencias técnicas de "bobinas" / "resorte de bobina" por "espirales" / "resorte helicoidal" en:
  - `components/fitment/MeasurementInput.tsx`: Instrucciones del formulario de medición.
  - `components/sections/WhyThisProduct.tsx`: Títulos de características técnicas.

### Out of Scope
- Modificación de endpoints de backend `/api/leads` o esquemas de base de datos Supabase.
- Cambios de diseño visual, CSS o componentes de maquetación en el Hero.

---

## 2. Data Model

No aplica. No se introducen nuevos modelos de datos ni migraciones en la base de datos.

---

## 3. Implementation Plan

1. **Aislamiento en Rama Git**:
   - Confirmar creación y cambio automático a la rama `spec-03-actualizacion-terminologia-rubber-shock` vía `/spec-impl`.
2. **Actualización de Metadatos y Layout Global (`app/layout.tsx`)**:
   - Reemplazar los títulos y descripciones SEO de "Amortiguadores de Resorte de Bobina" por "Rubber Shock".
3. **Ajuste de Componentes de Navegación**:
   - `components/navigation/Navbar.tsx`: Actualizar texto secundario del logo de "Amortiguadores de Resorte" a "Rubber Shock".
   - `components/navigation/Footer.tsx`: Ajustar descripción comercial para posicionar a "Rubber Shock" como el producto para suspensión helicoidal.
4. **Corrección de Textos Técnicos y Características**:
   - `components/sections/WhyThisProduct.tsx`: Cambiar "Soporta el Resorte de Bobina" por "Soporta el Resorte Helicoidal".
   - `components/fitment/MeasurementInput.tsx`: Cambiar "espacio entre las bobinas" por "espacio entre las espiras del resorte".
5. **Verificación**:
   - Ejecutar `npm run build` para garantizar cero errores de compilación o tipado.
   - Verificar mediante búsqueda global (`grep`) la eliminación completa de la frase "Resorte de Bobina".

---

## 4. Acceptance Criteria

- [ ] La implementación se realiza en la rama dedicada `spec-03-actualizacion-terminologia-rubber-shock`.
- [ ] `app/layout.tsx` utiliza "Rubber Shock" en los títulos y metadatos SEO.
- [ ] No existen ocurrencias del término "Resorte de Bobina" ni "bobinas" en los componentes del proyecto.
- [ ] Se utiliza la terminología "espirales" / "resorte helicoidal" en las guías técnicas.
- [ ] La compilación `npm run build` finaliza con éxito.

---

## 5. Decisions Taken and Discarded

- **Uso de "Rubber Shock" sin "RS-001" en títulos principales**: Confirmado por el usuario para simplificar el nombre comercial en títulos y metadatos.
- **Sustitución de "bobina" por "espiral / helicoidal"**: Adoptado según terminología automotriz estándar en Colombia.
- **Creación obligatoria de rama git**: Se garantiza mediante la configuración `AutoCreateBranch: true` en `specs/.spec-config.yml`.

---

## 6. Identified Risks

- Ningún riesgo técnico identificado, dado que se trata de cambios exclusivos de textos UI y metadatos sin impacto en lógica de componentes ni API.
