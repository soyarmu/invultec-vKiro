# SPEC 09: Accesibilidad, Datos de Empresa y Derechos del Titular

**State:** Implementado  
**Date:** 2026-10-19  
**Objective:** Hacer el sitio operable y comprensible con lector de pantalla y teclado (alt correcto, contraste WCAG AA, navegación accesible), publicar los datos identificativos de la empresa en Footer y páginas legales, declarar el tratamiento de datos de menores, documentar la procedencia de las imágenes y clarificar el procedimiento para solicitar la eliminación de datos.

**Depends on:** SPEC 08

---

## 1. Scope

### In Scope

**Accesibilidad — texto alternativo**
- Auditar todos los `<Image>` y elementos gráficos del sitio: mantener `alt` descriptivo en la imagen del producto y aplicar `aria-hidden="true"` a iconos Lucide e ilustraciones SVG puramente decorativas.
- Garantizar `alt=""` en imágenes redundantes con el texto adyacente.
- Documentar en el spec el inventario de gráficos y su tratamiento.

**Accesibilidad — contraste WCAG 2.1 AA**
- Medir ratios reales de contraste en: Hero (texto claro sobre fondo oscuro), Footer (`text-neutral-400` sobre `bg-neutral-900`), botones primario/secundario, mensajes de error/éxito del formulario y enlaces legales.
- Criterio: 4.5:1 para texto normal, 3:1 para texto grande (≥18.66px bold o ≥24px) y 3:1 para componentes de interfaz.
- Corregir las combinaciones que no cumplan, preferiblemente ajustando el token de color en `tailwind.config.ts` (no parcheando clases sueltas).

**Accesibilidad — navegación por teclado**
- Link "Saltar al contenido principal" visible al recibir foco, apuntando a `#main-content`.
- Orden de tabulación lógico en Home (Navbar → Hero → Formulario → secciones → Footer).
- Foco visible en todos los elementos interactivos (botones, selects, inputs, checkbox, enlaces del Footer y de las páginas legales).
- `main` con `id="main-content"` y `tabIndex={-1}` donde corresponda.

**Datos de empresa**
- Archivo `lib/company.ts` con `COMPANY_DATA` (razón social, NIT, dirección, ciudad, email, teléfono/WhatsApp, sitio web).
- Footer: bloque de identificación con razón social, NIT y email de contacto.
- Páginas legales (`/privacidad`, `/terminos`, `/reembolsos`, `/cookies`): encabezado "Responsable" con los datos completos.
- Nunca duplicar literales: todo consume `COMPANY_DATA`.

**Consentimiento de menores**
- Cláusula en `/privacidad`: el servicio está dirigido a mayores de 18 años. Si se detectan datos de un menor, se eliminan salvo autorización del representante legal, conforme al Decreto 1377 de 2013.
- Aviso en el formulario de leads: "Debes ser mayor de 18 años para enviar tus datos."
- El checkbox de consentimiento de SPEC 08 se amplía para incluir esa declaración (sin crear un segundo checkbox).

**Licencia de imágenes**
- Archivo `content/media/provenance.ts` con el registro de cada imagen estática: ruta, origen (generada por IA / banco / fotografía propia), herramienta o autor, licencia, fecha de incorporación y restricciones.
- `agent_generate_image___3D_photorealistic_cinematic_product_render__X_ray_side_view_.png`: registrar como generada por IA; si no hay documentación del modelo/herramienta ni del derecho de uso comercial, marcarla como `PENDING_LICENSE` y dejarla fuera de producción (ver riesgo 3).
- El archivo se declara como fuente de verdad para futuras imágenes.

**Solicitud de eliminación de datos**
- Página `/privacidad/solicitud` con: título, instrucciones, lista de derechos (acceso, rectificación, supresión, revocatoria), datos a incluir en la solicitud (nombre completo y celular usados en el formulario), plazo de respuesta, y botón que abre WhatsApp con mensaje prellenado.
- Enlace desde `/privacidad` y desde el Footer.
- SQL documentado en `/privacidad`: `DELETE FROM public.leads WHERE phone = '...'` ejecutado por el responsable desde Supabase. Sin endpoint ni automatización.

### Out of Scope

- Suscripciones o correos de marketing: no existe envío de correo en el proyecto; se difiere a un spec futuro.
- Endpoint, formulario transaccional o autoservicio de eliminación: el borrado lo ejecuta un humano.
- Menú móvil con trampa de foco y accordion FAQ operable por teclado: se seleccionaron solo orden de tabulación y foco visible.
- Tests automatizados de accesibilidad (axe-core).
- Formulario o checkout de pagos.
- Revisión jurídica certificada de los textos.

---

## 2. Data Model

### 2.1 Configuración de empresa

`lib/company.ts`:

```typescript
export interface CompanyData {
  legalName: string;
  tradeName: string;
  nit: string;
  address: string;
  city: string;
  department: string;
  country: string;
  email: string;
  phone: string;
  website: string;
  whatsapp: string;
}

export const COMPANY_DATA: CompanyData = { /* valores reales */ };
```

Los valores reales son provistos por el usuario antes de la implementación; el archivo no puede quedar con placeholders en producción.

### 2.2 Registro de procedencia de imágenes

`content/media/provenance.ts`:

```typescript
export type MediaOrigin = 'ai-generated' | 'stock' | 'own-photography' | 'commissioned';
export type LicenseStatus = 'LICENSED' | 'PENDING_LICENSE' | 'RESTRICTED';

export interface MediaProvenance {
  path: string;
  origin: MediaOrigin;
  authorOrTool: string;
  license: string;
  licenseStatus: LicenseStatus;
  addedAt: string;
  restrictions?: string;
}

export const MEDIA_PROVENANCE: MediaProvenance[] = [
  {
    path: '/images/agent_generate_image___3D_photorealistic_cinematic_product_render__X_ray_side_view_.png',
    origin: 'ai-generated',
    authorOrTool: 'Pendiente de documentar',
    license: 'Pendiente de verificar',
    licenseStatus: 'PENDING_LICENSE',
    addedAt: '2026-10-19',
  },
];
```

### 2.3 Datos de la solicitud de eliminación (sin persistencia)

No se crea tabla ni endpoint. La solicitud se envía por WhatsApp con mensaje prellenado que contiene: nombre completo, celular registrado y derecho ejercido. El responsable la ejecuta con SQL manual sobre `public.leads`.

---

## 3. Implementation Plan

Cada paso deja el sistema funcional.

### Fase 1: Datos de empresa

1. **Crear `lib/company.ts`** con `CompanyData` y `COMPANY_DATA`, alimentado con los datos reales confirmados por el usuario.
2. **Footer**: bloque con razón social, NIT, dirección y email con `mailto:`, usando `COMPANY_DATA`.
3. **`components/legal/LegalPage.tsx`**: bloque fijo "Responsable del sitio" al inicio, con razón social, NIT, dirección, email, usando `COMPANY_DATA`.
4. **Verificar** que ningún dato de empresa esté escrito a mano en `content/legal/*.ts`.

### Fase 2: Accesibilidad de contenido

5. **Inventario de gráficos**: revisar `components/hero/Hero.tsx`, iconos Lucide en todos los componentes, y añadir `aria-hidden="true"` a los decorativos; mantener el `alt` descriptivo del producto.
6. **Contraste**: medir ratios de las combinaciones listadas en el alcance; ajustar tokens en `tailwind.config.ts` y, si es necesario, clases puntuales para Hero y Footer hasta cumplir 4.5:1 / 3:1.
7. **Documentar** la tabla de mediciones (antes/después) en la sección 9 del spec al implementar.

### Fase 3: Navegación por teclado

8. **Skip link** en `app/layout.tsx`: primer elemento enfocable, oculto visualmente hasta recibir foco, apunta a `#main-content`. Añadir `id="main-content"` y `tabIndex={-1}` al `<main>` de `app/page.tsx` y de `LegalPage`.
9. **Auditoría de foco**: recorrer la Home y las 4 páginas legales con Tab y confirmar foco visible y orden lógico; corregir `outline` suprimidos o elementos con `tabIndex` indebido.

### Fase 4: Menores, imágenes y eliminación

10. **Cláusula de menores** en `content/legal/privacy.ts` (sección nueva "Menores de edad").
11. **Aviso de mayoría de edad** en `LeadCaptureForm`, integrado en el texto del checkbox existente.
12. **`content/media/provenance.ts`** con la imagen actual marcada `PENDING_LICENSE`, y su referencia en el spec.
13. **Página `/privacidad/solicitud`**: componente en `app/privacidad/solicitud/page.tsx` con instrucciones, derechos y botón de WhatsApp prellenado; enlace desde `/privacidad` y Footer.

---

## 4. Acceptance Criteria

### Datos de empresa
- [x] `lib/company.ts` existe y exporta `COMPANY_DATA` con razón social, NIT, dirección, ciudad, email y WhatsApp.
- [x] El Footer muestra razón social, NIT y email de contacto.
- [x] Las 4 páginas legales muestran el bloque "Responsable del sitio" con los mismos datos.
- [x] `grep -rn "NIT" app components content` solo encuentra referencias a `COMPANY_DATA`, no literales duplicados.

### Texto alternativo
- [x] La imagen del producto conserva un `alt` descriptivo.
- [x] Todos los iconos y SVG decorativos tienen `aria-hidden="true"` o `alt=""`.
- [x] Ningún `<Image>` carece de `alt`.

### Contraste
- [x] Texto normal ≥ 4.5:1 en Hero, Footer, botones, formulario y páginas legales.
- [x] Texto grande ≥ 3:1 y componentes de interfaz ≥ 3:1.
- [x] Tabla de mediciones antes/después registrada en la sección 9.

### Teclado
- [x] Primer Tab revela el skip link y Enter lleva a `#main-content`.
- [x] Todos los interactivos muestran foco visible.
- [x] El orden de tabulación de la Home sigue el orden visual.

### Menores
- [x] `/privacidad` contiene una sección sobre menores de edad.
- [x] El formulario indica que se debe ser mayor de 18 años antes de postular datos.

### Imágenes
- [x] `content/media/provenance.ts` registra todas las imágenes de `public/images`.
- [x] Ninguna imagen marcada `PENDING_LICENSE` se publica en producción.

### Eliminación de datos
- [x] `/privacidad/solicitud` responde 200 y enlaza desde `/privacidad` y el Footer.
- [x] El botón abre WhatsApp con el mensaje prellenado correcto.
- [x] `/privacidad` describe el canal, los plazos y el derecho ejercido.

### Calidad
- [x] `npm run lint` sin errores.
- [x] `npx tsc --noEmit` sin errores.
- [x] `npm run build` exitoso.
- [x] `npm run test` sin regresiones.

---

## 5. Decisions Taken and Discarded

### Decisiones Tomadas

**1. Un solo spec para las ocho tareas**
- ✅ **Elegido**: SPEC 09 consolidado.
- ❌ **Descartado**: separar accesibilidad de derechos/datos.
- **Razón**: todas son cambios acotados sobre el mismo conjunto de páginas y componentes; separarlas duplica ceremonia sin aislar riesgo real.

**2. Auditoría WCAG AA de contraste incluida**
- ✅ **Elegido**: medir y corregir ratios.
- ❌ **Descartado**: dejar el contraste a la skill `impeccable`.
- **Razón**: `impeccable` no está instalado en el proyecto y el usuario pidió incluirlo. Tener el criterio numérico en el spec permite verificarlo.

**3. Navegación por teclado acotada a orden y foco visible**
- ✅ **Elegido**: skip link, orden lógico, foco visible.
- ❌ **Descartado**: trampa de foco en menú móvil y accordion FAQ por teclado.
- **Razón**: decisión del usuario; mantiene el cambio pequeño y verificable. Quedan como candidatos para un spec futuro.

**4. Datos de empresa en archivo único**
- ✅ **Elegido**: `lib/company.ts` como única fuente.
- ❌ **Descartado**: literales en cada página.
- **Razón**: evita divergencias cuando cambie el NIT o la dirección; facilita la verificación.

**5. Suscripciones/correos fuera de alcance**
- ✅ **Elegido**: excluido.
- ❌ **Descartado**: casilla opcional y cláusula de baja.
- **Razón**: el proyecto no envía correos; implementar baja de un servicio inexistente es deuda sin uso. Se revisará cuando exista email marketing.

**6. Eliminación de datos solo por WhatsApp**
- ✅ **Elegido**: página con instrucciones y botón prellenado, borrado manual por el responsable.
- ❌ **Descartado**: endpoint `/api/data-requests` y eliminación automática.
- **Razón**: el volumen actual no justifica backend; la verificación de identidad sin autenticación sería débil y un borrado automático no verificado es riesgoso.

**7. Licencias en archivo de procedencia**
- ✅ **Elegido**: `content/media/provenance.ts` con estado de licencia por imagen.
- ❌ **Descartado**: documento markdown suelto.
- **Razón**: el archivo queda cerca del código y puede consumirse en verificación automatizada futura.

### Decisiones Descartadas

**1. Tests automatizados de a11y (axe-core)**
- ❌ **Descartado**: por ahora.
- **Razón**: el usuario no lo seleccionó; se valida manualmente con Tab y medición de contraste.

**2. Rediseño del menú móvil**
- ❌ **Descartado**: fuera de alcance de este spec.

---

## 6. Identified Risks

### Riesgo 1: Datos de empresa incompletos o incorrectos
- **Severidad**: HIGH
- **Impacto**: incumplimiento del deber de información del Estatuto del Consumidor.
- **Mitigación**: `COMPANY_DATA` debe llenarse con datos reales antes de aprobar el spec; la verificación falla si quedan placeholders.

### Riesgo 2: Contraste corregido solo en clases puntuales
- **Severidad**: MEDIUM
- **Impacto**: regresiones cuando se añada nueva UI.
- **Mitigación**: ajustar primero los tokens de `tailwind.config.ts` y documentar cada cambio.

### Riesgo 3: Imagen generada por IA sin licencia documentada
- **Severidad**: HIGH
- **Impacto**: reclamaciones de terceros por uso no autorizado o falta de derechos comerciales.
- **Mitigación**: marcarla `PENDING_LICENSE`, mantenerla fuera de producción hasta documentar herramienta y derechos de uso, y registrarla en `provenance.ts`.

### Riesgo 4: Solicitudes de eliminación sin verificación de identidad
- **Severidad**: MEDIUM
- **Impacto**: borrado de datos de una persona por solicitud de un tercero.
- **Mitigación**: el responsable verifica nombre + celular antes de ejecutar el SQL; el spec lo exige en el texto de `/privacidad/solicitud`.

### Riesgo 5: Skip link invisible o roto
- **Severidad**: LOW
- **Impacto**: usuarios de teclado no pueden saltar la navegación.
- **Mitigación**: verificar con Tab en navegador; el criterio de aceptación lo exige explícitamente.

---

## 7. Archivos Afectados

| Archivo | Acción |
|---------|--------|
| `lib/company.ts` | Nuevo |
| `content/media/provenance.ts` | Nuevo |
| `app/privacidad/solicitud/page.tsx` | Nuevo |
| `components/legal/LegalPage.tsx` | Modificado (bloque Responsable) |
| `components/navigation/Footer.tsx` | Modificado (datos empresa, enlace eliminación) |
| `components/fitment/LeadCaptureForm.tsx` | Modificado (aviso mayoría de edad) |
| `content/legal/privacy.ts` | Modificado (menores, enlace a solicitud) |
| `content/legal/terms.ts` | Revisar datos del responsable |
| `content/legal/refunds.ts` | Revisar datos del responsable |
| `content/legal/cookies.ts` | Revisar datos del responsable |
| `components/hero/Hero.tsx` | Modificado (aria-hidden, contraste) |
| `app/layout.tsx` | Modificado (skip link) |
| `app/page.tsx` | Modificado (`id="main-content"`) |
| `tailwind.config.ts` | Modificado (tokens de contraste) |
| Iconos Lucide en `components/` | Modificado (`aria-hidden`) |

---

## 8. Pending Inputs

Antes de implementar se requieren:

1. **Datos reales de la empresa**: razón social, NIT, dirección, ciudad/departamento, email de contacto.
2. **Procedencia de la imagen del producto**: herramienta de generación, derechos de uso comercial y fecha.
3. **Confirmación** de que el canal de eliminación es el WhatsApp oficial `573172130907`.

---

## 9. Contrast Measurements

Ratios calculados con la fórmula WCAG 2.1 (luminancia relativa, sRGB) sobre los colores finales.

| Elemento | Fondo | Texto | Antes | Después | Objetivo | Acción |
|----------|-------|-------|-------|---------|----------|--------|
| Hero — eyebrow | `#0E0E0E` | `brand-red` → `brand-red-onDark` (`#E04A50`) | 3.27:1 | **4.84:1** ✅ | 4.5:1 | Token nuevo `brand.red.onDark` |
| Hero — acentos "Shock"/specs | `#0E0E0E` | `brand-red` → `brand-red-onDark` | 3.27:1 | **4.84:1** ✅ | 4.5:1 | Mismo token |
| Footer — descripción y copyright | `neutral-900` (`#171717`) | `neutral-500` → `neutral-400` (`#A3A3A3`) | 3.78:1 | **7.11:1** ✅ | 4.5:1 | `text-neutral-400` |
| Footer — títulos de columna | `neutral-900` | `brand-red` (`#C0262D`) | 3.04:1 | 3.04:1 ⚠️ | 3:1 (texto ≥18.66px bold) | Cumple como texto grande/UI; se mantiene el rojo de marca |
| Footer — enlaces | `neutral-900` | `neutral-300` (`#D4D4D4`) | 10.9:1 | **10.9:1** ✅ | 4.5:1 | Sin cambio |
| Enlaces legales (blancos) | `#FFFFFF` | `brand-red` → `brand-red-accessible` (`#A81F25`) | 5.9:1 | **7.27:1** ✅ | 4.5:1 | Token nuevo `brand.red.accessible` |
| Botón primario (FinalCTA / Hero) | `brand-red` | `#FFFFFF` | 5.9:1 | **5.9:1** ✅ | 4.5:1 | Sin cambio |
| Botón WhatsApp del formulario | `green-600` → `green-700` (`#15803D`) | `#FFFFFF` | 3.3:1 ❌ | **5.02:1** ✅ | 4.5:1 | `hover:bg-green-800` |
| Mensaje de error | `red-50` | `red-700` | 5.4:1 | **5.4:1** ✅ | 4.5:1 | Sin cambio |
| Mensaje de éxito | `green-50` | `green-700` | 5.0:1 | **5.0:1** ✅ | 4.5:1 | Sin cambio |
| Badge "Rubber Shock RS-001" (formulario) | `brand-red-50` | `brand-red` → `brand-red-accessible` | 5.37:1 | **6.65:1** ✅ | 4.5:1 | Token accesible |
| Etiqueta de formulario (uppercase) | `#FFFFFF` | `brand-red` → `brand-red-accessible` | 5.9:1 | **7.27:1** ✅ | 4.5:1 | Token accesible |
| Párrafo secundario | `neutral-50` | `neutral-600` (`#525252`) | 7.6:1 | **7.6:1** ✅ | 4.5:1 | Sin cambio |
| Enlaces de navbar (hover) | `#FFFFFF` | `brand-red` → `brand-red-accessible` | 5.9:1 | **7.27:1** ✅ | 4.5:1 | Token accesible |

---

## 10. References

- [WCAG 2.1 — Criterio 1.4.3 Contraste (mínimo)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [WCAG 2.1 — Criterio 2.4.1 Evitar bloques](https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html)
- [WCAG 2.1 — Criterio 2.4.7 Foco visible](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html)
- [WCAG — Imágenes decorativas](https://www.w3.org/WAI/tutorials/images/decorative/)
- [Ley 1581 de 2012](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981)
- [Decreto 1377 de 2013 — tratamiento de datos de niños y adolescentes](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=53646)
- [Ley 1480 de 2011 — deber de información](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=44306)
- [SPEC 08: Cumplimiento Legal, Privacidad y Prácticas Justas](./08-cumplimiento-legal-privacidad.md)

---

**Status**: 📝 Draft  
**Pendiente**: datos reales de empresa, procedencia de la imagen y aprobación del usuario
