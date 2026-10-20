# SPEC 08: Cumplimiento Legal, Privacidad y Prácticas Justas

**State:** Aprobado  
**Date:** 2026-10-19  
**Objective:** Publicar las páginas legales del sitio (`/privacidad`, `/terminos`, `/reembolsos`, `/cookies`), agregar consentimiento explícito en la captura de leads y corregir afirmaciones del sitio para reflejar el material real del producto, sin introducir banner de cookies ni SDKs de terceros.

**Depends on:** SPEC 01, SPEC 05

---

## 1. Scope

### In Scope

**Documentos legales (borradores pendientes de revisión jurídica)**
- `/privacidad` — Política de Privacidad (Ley 1581 de 2012, Decreto 1377 de 2013/2014, Ley 1480 de 2011): responsable del tratamiento, datos recolectados, finalidades, base legal (consentimiento), tiempo de retención, derechos del titular y cómo ejercerlos, canal de contacto, DPO/responsable, transferencias (Supabase).
- `/terminos` — Términos del Servicio: identificación del responsable, objeto, condiciones de uso del sitio, limitación de responsabilidad, propiedad intelectual, ley aplicable y jurisdicción (Colombia), canal de venta por WhatsApp.
- `/reembolsos` — Política de Reembolso y Garantía: derecho de retracto (5 días hábiles, Ley 1480 de 2011 art. 47 para ventas a distancia), requisitos de producto para devolución, proceso de solicitud por WhatsApp, plazos de reversión del pago, garantía de producto.
- `/cookies` — Política de Cookies: declarar el estado real (sin cookies analíticas/publicitarias ni SDKs de terceros), cookies estrictamente necesarias, cómo limpiarlas en el navegador, y compromiso de solicitar consentimiento previo antes de activar cualquier cookie no esencial.
- Todas: contenido estático en español (Colombia), fecha de vigencia visible, `metadata` con título/descripción, enlaces cruzados entre documentos y al sitio.
- Banner dentro de cada página legal que indique `Pendiente de revisión jurídica` (visible solo en `NODE_ENV !== 'production'`).

**Consentimiento en captura de leads**
- Checkbox obligatorio y no premarcado en `LeadCaptureForm`: "He leído y acepto la Política de Privacidad" con enlace a `/privacidad`.
- Bloqueo del envío si no está marcado, con mensaje de error accesible (`aria-live`).
- Persistencia: columnas `consent_given BOOLEAN NOT NULL DEFAULT false` y `consent_at TIMESTAMPTZ` en `public.leads`.
- El API `/api/leads` exige `consentGiven === true` y responde `400` en caso contrario (validación server-side, no solo UI).

**Prácticas justas y afirmaciones**
- Unificar el material del producto a **neopreno** en todo `components/` y `app/` (Hero, Trust, FAQ, metadata de `layout.tsx`); actualizar `CLAUDE.md` para reflejar neopreno como término oficial.
- Reemplazar "Garantía de Fábrica Invultec" del Footer por un enlace a `/reembolsos`.
- Suavizar la afirmación absoluta de FAQ "no invalida la garantía de la suspensión" → "no modifica piezas originales; consulta la garantía de tu fabricante".
- Agregar en el Footer una columna/bloque "Legal" con enlaces a los cuatro documentos.
- Agregar al Footer el aviso de conducta y defensor del consumidor (SIC) requerido por el Estatuto del Consumidor para canales de contacto.

**Auditoría de terceros y datos**
- Documentar en este spec el inventario de datos y terceros (sección 2.3), declarado en `/privacidad`.
- Auditación ejecutada como paso de verificación (grep de terceros + revisión de `credentials`) al cierre del spec; resultado registrado en la sección 9.

### Out of Scope

- Banner de cookies interactivo (aceptar/rechazar/preferencias) y consent mode.
- Activación real de Google Analytics, Meta Pixel o cualquier SDK de terceros.
- Pasarela de pago, checkout, precios o tarifas.
- Backend de derechos ARCO (consulta/actualización/eliminación automatizada); se ejerce por WhatsApp/correo.
- Registro Nacional de Bases de Datos (RNBD) ante la SIC.
- Revisión legal profesional certificada; los textos son borradores.
- Internacionalización (solo español de Colombia).

---

## 2. Data Model

### 2.1 Migración `public.leads`

Archivo: `supabase/migrations/20261019_add_consent_to_leads.sql`

```sql
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS consent_given BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS consent_at TIMESTAMPTZ;

COMMENT ON COLUMN public.leads.consent_given IS 'Autorización explícita del titular para tratar sus datos personales';
COMMENT ON COLUMN public.leads.consent_at IS 'Momento en que se otorgó el consentimiento';
```

Sin cambios de RLS: la política de inserción permanece.

### 2.2 Tipos TypeScript

`types/leads.ts` (nuevo):

```typescript
export interface LeadPayload {
  name: string;
  phone: string;
  brand: string;
  model: string;
  year: string;
  quantity?: number;
  consentGiven: boolean;
  hp?: string;
}
```

### 2.3 Inventario de datos y terceros (fuente de `/privacidad`)

| Dato | Finalidad | Dónde se almacena | Retención |
|------|-----------|-------------------|-----------|
| Nombre completo | Contacto comercial | Supabase `public.leads` | 24 meses desde el último contacto |
| Número de celular | Contacto vía WhatsApp | Supabase `public.leads` | 24 meses desde el último contacto |
| Marca/modelo/año del vehículo | Asesoría de fitment | Supabase `public.leads` | 24 meses desde el último contacto |
| Cantidad | Cotización | Supabase `public.leads` | 24 meses desde el último contacto |
| `consent_given` / `consent_at` | Evidencia de autorización | Supabase `public.leads` | 24 meses |
| IP (rate limiting) | Seguridad / anti-abuso | Memoria del proceso, no persistida | Vida del proceso |
| Campo `hp` (honeypot) | Anti-spam; no se almacena | Descartado | N/A |

Terceros: **Supabase** (Postgres, región del proyecto) y **WhatsApp/Meta** (destino de la conversación iniciada por el usuario). Sin analytics, pixels, CDNs publicitarios ni SDKs de terceros en el cliente. Dependencias del cliente: `next`, `react`, `@supabase/supabase-js`, `lucide-react`.

---

## 3. Implementation Plan

Cada paso deja el sistema funcional.

### Fase 1: Páginas legales

1. **Componente compartido** `components/legal/LegalPage.tsx`:
   - Props: `title`, `lastUpdated`, `children`.
   - Layout: contenedor `container-custom`, tipografía prose-like (encabezados, listas, enlaces con `text-brand-red`), fecha de vigencia, bloque de enlaces cruzados a las otras tres políticas.
   - Enlace "Volver al inicio" (`/`) y header mínimo con logo Invultec (sin duplicar `Navbar` si rompe el scroll de anclas).

2. **Contenido legal** en `content/legal/` (constantes TS exportadas, no MDX):
   - `privacy.ts`, `terms.ts`, `refunds.ts`, `cookies.ts` con secciones tipadas `{ id, heading, body: string[] }`.
   - Textos redactados en español de Colombia conforme a Ley 1581 de 2012, Decreto 1377 de 2013, Ley 1480 de 2011 y lineamientos SIC.

3. **Rutas**:
   - `app/privacidad/page.tsx`
   - `app/terminos/page.tsx`
   - `app/reembolsos/page.tsx`
   - `app/cookies/page.tsx`
   - Cada una exporta `metadata` (title, description, `robots: { index: true }`).

4. **Aviso de borrador**: en `LegalPage`, renderizar un banner `Pendiente de revisión jurídica` cuando `process.env.NODE_ENV !== 'production'`.

### Fase 2: Consentimiento en leads

5. **Migración** `20261019_add_consent_to_leads.sql` aplicada en Supabase (MCP `apply_migration` en implementación).

6. **`LeadPayload`** en `types/leads.ts`.

7. **`components/fitment/LeadCaptureForm.tsx`**:
   - Checkbox `id="consent"` requerido, no premarcado, texto con `<Link href="/privacidad">`.
   - Estado local `consentGiven`; mensaje de error bajo el checkbox con `aria-live="polite"` si intenta enviar sin marcar.
   - Envío de `consentGiven` en el body.

8. **`app/api/leads/route.ts`**:
   - Desestructurar `consentGiven`.
   - Si `consentGiven !== true` → `NextResponse.json({ error: 'Debes aceptar la Política de Privacidad.' }, { status: 400 })`.
   - En el insert: `consent_given: true`, `consent_at: new Date().toISOString()`.

9. **Tests** (`tests/unit/components/LeadCaptureForm.test.tsx`, `tests/unit/api/leads.test.ts`):
   - No envía sin consentimiento.
   - Envía `consentGiven: true` cuando se marca.
   - API responde 400 sin consentimiento y 200 con él.

### Fase 3: Afirmaciones y navegación

10. **Footer** (`components/navigation/Footer.tsx`):
    - Nueva columna "Legal" con `<Link>` a `/privacidad`, `/terminos`, `/reembolsos`, `/cookies`.
    - Reemplazar "Garantía de Fábrica Invultec" por `<Link href="/reembolsos">Garantía y Reembolsos</Link>`.
    - Agregar texto SIC: "Para quejas o reclamos, escribe a nuestro WhatsApp de atención. También puedes acudir a la Superintendencia de Industria y Comercio (SIC)."
    - Grid `lg:grid-cols-4` → `lg:grid-cols-5` (o equivalente) para acomodar la columna.

11. **Unificación de material** (neopreno):
    - `components/hero/Hero.tsx`: "100% neopreno" (mantener), "caucho neopreno" (mantener).
    - `components/sections/Trust.tsx`: "hule uretano" → "neopreno".
    - `components/sections/FAQ.tsx`: "hule uretano reforzado" → "neopreno reforzado"; suavizar la frase de garantía del vehículo.
    - `app/layout.tsx`: revisar metadata/keywords; no usar "hule uretano".
    - `CLAUDE.md`: actualizar "Material: hule uretano de alta resistencia" → "Material: neopreno de alta resistencia".

12. **Claims numéricos**: mantener `+2.7 cm`, `35% absorción de impacto`, `5 min instalación` únicamente si el usuario confirma que son verificables; de lo contrario, eliminarlos o reformularlos como "hasta". Decisión final registrada en sección 5.

### Fase 4: Auditoría y verificación

13. **Auditoría de terceros**:
    - `grep -rniE 'googletagmanager|google-analytics|facebook\.net|hotjar|posthog|clarity\.ms|tiktok|linkedin|segment' app components lib`.
    - `grep -rni 'set-cookie\|document\.cookie' app components lib`.
    - Confirmar en Network (Playwright MCP) que la home y las páginas legales solo cargan recursos del propio dominio.
    - Resultado documentado en sección 9.

14. **Reglas de contenido** (verificación manual): sin reseñas/testimonios fabricados, sin precios ni tarifas ocultas, sin falso sentido de urgencia, sin afirmaciones médicas/de salud.

---

## 4. Acceptance Criteria

### Páginas legales
- [ ] `/privacidad`, `/terminos`, `/reembolsos`, `/cookies` responden 200 y renderizan contenido en español.
- [ ] Cada página muestra fecha de vigencia.
- [ ] Cada página enlaza a las otras tres y al inicio.
- [ ] `/privacidad` incluye responsable, datos (tabla 2.3), finalidades, base legal, retención, derechos del titular, canal para ejercerlos, mención de Supabase.
- [ ] `/terminos` incluye identificación del responsable, uso del sitio, limitación de responsabilidad, propiedad intelectual, ley aplicable.
- [ ] `/reembolsos` incluye derecho de retracto (5 días hábiles, venta a distancia), requisitos del producto, proceso por WhatsApp, plazo de reversión, garantía.
- [ ] `/cookies` declara que no hay cookies no esenciales ni SDKs de terceros y compromete consentimiento previo futuro.
- [ ] En `NODE_ENV !== 'production'` aparece el banner "Pendiente de revisión jurídica".

### Consentimiento
- [ ] El formulario no permite envío sin marcar el checkbox.
- [ ] El checkbox no está premarcado y enlaza a `/privacidad`.
- [ ] `POST /api/leads` sin `consentGiven: true` → `400` y sin insertar fila.
- [ ] `POST /api/leads` con `consentGiven: true` → inserta `consent_given = true` y `consent_at` no nulo.
- [ ] Tests de UI y de API pasan con `npm run test`.
- [ ] La columna existe en Supabase (`list_tables` verbose).

### Afirmaciones y navegación
- [ ] `grep -rn "hule uretano" app components` no devuelve resultados.
- [ ] Footer enlaza a los cuatro documentos legales.
- [ ] Footer no contiene "Garantía de Fábrica Invultec".
- [ ] FAQ no afirma que "no invalida la garantía" de forma absoluta.
- [ ] `CLAUDE.md` declara neopreno como material oficial.

### Auditoría
- [ ] No hay SDKs de terceros en `dependencies` ni scripts cargados.
- [ ] No hay `Set-Cookie` ni `document.cookie` en el código de la app.
- [ ] Network de la home y las páginas legales sin dominios de terceros.

### Calidad
- [ ] `npm run lint` sin errores.
- [ ] `npx tsc --noEmit` sin errores.
- [ ] `npm run build` exitoso.

---

## 5. Decisions Taken and Discarded

### Decisiones Tomadas

**1. Textos redactados por el agente, validados por el usuario**
- ✅ **Elegido**: el agente redacta borradores basados en normativa colombiana; el usuario valida.
- ❌ **Descartado**: esperar textos de un abogado antes de implementar.
- **Razón**: desbloquea la implementación; el banner "Pendiente de revisión jurídica" en no-producción evita publicar textos sin revisar.

**2. Sin banner de cookies interactivo en este spec**
- ✅ **Elegido**: solo páginas legales + consentimiento de leads.
- ❌ **Descartado**: banner ahora.
- **Razón**: `lib/analytics/analytics.ts` no tiene proveedor real; no hay cookies no esenciales. Construir un banner sin uso genera UI muerta y deuda.

**3. Rutas cortas en español**
- ✅ **Elegido**: `/privacidad`, `/terminos`, `/reembolsos`, `/cookies`.
- ❌ **Descartado**: rutas largas (`/politica-de-privacidad`, etc.) y rutas en inglés.
- **Razón**: más memorables y compartibles por WhatsApp.

**4. Checkbox obligatorio no premarcado + validación server-side**
- ✅ **Elegido**: checkbox + `400` en API.
- ❌ **Descartado**: checkbox opcional + aviso pasivo.
- **Razón**: el consentimiento debe ser libre, previo, expreso e informado (Ley 1581). La validación server-side evita bypass por cliente.

**5. Neopreno como material oficial**
- ✅ **Elegido**: unificar a neopreno; actualizar CLAUDE.md.
- ❌ **Descartado**: unificar a hule uretano.
- **Razón**: decisión del usuario; coincide con Hero (texto visible actual).

**6. Reembolso basado en Ley 1480 de 2011**
- ✅ **Elegido**: retracto 5 días hábiles para venta a distancia + proceso por WhatsApp.
- ❌ **Descartado**: solo declarar que las ventas se cierran por WhatsApp.
- **Razón**: la venta remota activa el derecho de retracto; ignorarlo es riesgo de incumplimiento.

**7. Claims numéricos**
- ✅ **Elegido**: mantener `+2.7 cm`, `35% absorción`, `5 min` **condicionado a que el usuario confirme que son verificables**; si no, reformular como "hasta" o eliminar.
- ❌ **Descartado**: eliminar todos por defecto.
- **Razón**: son la propuesta de valor del Hero; eliminarlos sin confirmación degrada el producto.

### Decisiones Descartadas

**1. Backend de derechos ARCO**
- ❌ **Descartado**: endpoints de consulta/actualización/eliminación.
- **Razón**: el volumen actual no lo justifica; el ejercicio por WhatsApp/correo es válido bajo la ley y se documenta en `/privacidad`.

**2. Registro RNBD ante la SIC**
- ❌ **Descartado**: por ahora.
- **Razón**: requiere proceso administrativo externo; se documenta como obligación del responsable.

**3. Revisión legal certificada**
- ❌ **Descartado**: contratar abogado en este spec.
- **Razón**: fuera del alcance del agente; el spec deja los textos como borrador con aviso.

---

## 6. Identified Risks

### Riesgo 1: Textos legales sin revisión profesional
- **Severidad**: MEDIUM
- **Impacto**: cláusulas inexactas o incompletas frente a la SIC.
- **Mitigación**: banner de borrador en no-producción; validación del usuario antes de `Approved`; futura revisión jurídica.

### Riesgo 2: Consentimiento registrado sin base legal suficiente
- **Severidad**: HIGH
- **Impacto**: sanción por tratar datos sin autorización válida.
- **Mitigación**: checkbox explícito + enlace a política + registro de `consent_at`; el formulario no envía sin marcar.

### Riesgo 3: Retención de datos sin purga automática
- **Severidad**: MEDIUM
- **Impacto**: conservar datos más de lo declarado (24 meses) contradice la política.
- **Mitigación**: declarar la retención y dejarla como tarea operativa; no se implementa cron en este spec (fuera de alcance).

### Riesgo 4: Afirmaciones de rendimiento no verificables
- **Severidad**: MEDIUM
- **Impacto**: publicidad engañosa (Ley 1480, art. 29-30).
- **Mitigación**: condicionar los claims numéricos a confirmación del usuario (decisión 5.7).

### Riesgo 5: RLS de `leads` permite lectura pública
- **Severidad**: HIGH
- **Impacto**: exposición de datos personales a cualquiera con la anon key.
- **Mitigación**: detectado en la auditoría; se especifica corregir la política de `SELECT` en este spec (ver sección 7).

---

## 7. Hallazgo de Auditoría: RLS de `public.leads`

La migración `20260902_create_leads_table.sql` crea:

```sql
CREATE POLICY "Permitir lectura de leads" ON public.leads
  FOR SELECT
  TO public, anon, authenticated, service_role
  USING (true);
```

Esto permite leer todos los leads con la clave pública. **Debe corregirse en este spec:**

- Eliminar la política de lectura para `public`/`anon`.
- Restringir `SELECT` a `service_role` únicamente.
- Mantener `INSERT` público (necesario para la captura desde el navegador), o mover la inserción al API Route con `service_role` exclusivamente.

Migración adicional: `supabase/migrations/20261019_harden_leads_rls.sql`.

Criterio de aceptación adicional:
- [ ] `list_tables` / `pg_policies` muestran que `anon` no tiene `SELECT` sobre `public.leads`.
- [ ] El formulario sigue insertando correctamente (vía API con `service_role`).

---

## 8. Archivos Afectados

| Archivo | Acción |
|---------|--------|
| `app/privacidad/page.tsx` | Nuevo |
| `app/terminos/page.tsx` | Nuevo |
| `app/reembolsos/page.tsx` | Nuevo |
| `app/cookies/page.tsx` | Nuevo |
| `components/legal/LegalPage.tsx` | Nuevo |
| `content/legal/{privacy,terms,refunds,cookies}.ts` | Nuevo |
| `components/navigation/Footer.tsx` | Modificado |
| `components/fitment/LeadCaptureForm.tsx` | Modificado |
| `app/api/leads/route.ts` | Modificado |
| `components/sections/Trust.tsx` | Modificado |
| `components/sections/FAQ.tsx` | Modificado |
| `app/layout.tsx` | Revisar metadata |
| `CLAUDE.md` | Modificado (material) |
| `types/leads.ts` | Nuevo |
| `supabase/migrations/20261019_add_consent_to_leads.sql` | Nuevo |
| `supabase/migrations/20261019_harden_leads_rls.sql` | Nuevo |
| `tests/unit/components/LeadCaptureForm.test.tsx` | Nuevo/modificado |
| `tests/unit/api/leads.test.ts` | Nuevo/modificado |

---

## 9. Auditoría de Terceros — Resultado Esperado

Checklist a completar durante la implementación:

| Verificación | Comando | Resultado esperado |
|--------------|---------|--------------------|
| SDKs analytics/pixel | `grep -rniE 'googletagmanager|google-analytics|facebook\.net|hotjar|posthog|clarity\.ms|tiktok|linkedin|segment' app components lib` | Sin resultados |
| Cookies JS | `grep -rni 'set-cookie\|document\.cookie' app components lib` | Sin resultados |
| Dependencias | `node -e "require('./package.json').dependencies"` | Solo stack declarado |
| Network home | Playwright MCP → network requests | Solo dominio propio |
| Network legales | Playwright MCP → network requests | Solo dominio propio |
| Reseñas falsas | revisión manual de `components/` | Ninguna |
| Precios/tarifas ocultas | revisión manual | Ninguna |
| Urgencia falsa | revisión manual | Ninguna |

---

## 10. Next Steps

- [ ] Revisar y aprobar este spec (`State: Approved`).
- [ ] Ejecutar `/spec-impl 08-cumplimiento-legal-privacidad`.
- [ ] Confirmar verificabilidad de claims numéricos (`+2.7 cm`, `35%`, `5 min`) antes de la Fase 3.
- [ ] Validar textos legales con revisión jurídica antes de desplegar a producción.

---

## 11. References

- [Ley 1581 de 2012 — Protección de Datos Personales](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981)
- [Decreto 1377 de 2013 — Reglamentario de la Ley 1581](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=53646)
- [Ley 1480 de 2011 — Estatuto del Consumidor](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=44306)
- [SIC — Protección al Consumidor](https://www.sic.gov.co/)
- [SIC — Protección de Datos Personales](https://www.sic.gov.co/proteccion-de-datos-personales)
- [SPEC 05: Creación Primer Lead y Redirección WhatsApp](./05-creacion-primer-lead-y-redireccion-whatsapp.md)

---

**Status**: 📝 Draft  
**Pendiente**: Aprobación del usuario y revisión jurídica
