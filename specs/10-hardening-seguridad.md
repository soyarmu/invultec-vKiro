# SPEC 10: Hardening de Seguridad — Fail-Fast de Service Key, RLS Idempotente y Cierre del Review

**State:** Aprobado
**Date:** 2026-11-09
**Objective:** Corregir los hallazgos de la revisión de seguridad: eliminar el fallback silencioso a la anon key en `lib/supabase.ts` (validación fail-fast + guard `server-only`), garantizar con una migración idempotente que solo `service_role` pueda leer e insertar en `public.leads`, re-ejecutar el agente de seguridad de SPEC 07 como criterio de cierre y documentar la decisión aceptada sobre el rate limiter.

**Depends on:** SPEC 07, SPEC 08

---

## 1. Scope

### In Scope

**Fail-fast de `SUPABASE_SERVICE_ROLE_KEY` (`lib/supabase.ts`)**
- Eliminar el fallback `process.env.SUPABASE_SERVICE_ROLE_KEY || supabasePublicApiKey` (hoy en `lib/supabase.ts:10-12`), que construye `supabaseAdmin` con la clave pública anon si falta la service role key, sin error ni advertencia.
- Ampliar la validación existente (`lib/supabase.ts:14-18`) para que **lance error** si `SUPABASE_SERVICE_ROLE_KEY` no está definida, con mensaje claro en español.
- Añadir `import 'server-only'` como primera línea del archivo, garantizando que el cliente admin jamás se empaquete en código de cliente por importaciones futuras.
- Instalar `server-only` como dependencia explícita (`npm ls server-only` hoy: vacío).

**Hardening RLS idempotente en Supabase**
- Nueva migración `supabase/migrations/20261109_harden_leads_rls.sql`, re-ejecutable sin error, que garantiza el estado final de las políticas de `public.leads` sin importar si `20261019_harden_leads_rls.sql` fue aplicada en la DB alojada (pendiente registrado en SPEC 08).
- Estado final exigido: `anon`/`public`/`authenticated` sin ninguna política sobre `public.leads`; solo `service_role` con `SELECT` e `INSERT`.
- La aplicación de la migración en la DB alojada es **paso manual del usuario** (el MCP de Supabase falla por autenticación `28P01`): vía `supabase db push` o SQL Editor del dashboard.

**Cierre con el agente de seguridad (SPEC 07)**
- Ejecutar `npm run security-review` tras los cambios y exigir 0 issues CRITICAL y 0 HIGH como criterio de aceptación.

**Rate limiter — decisión documentada (sin código)**
- Registrar en este spec la decisión de aceptar el diseño actual (`x-forwarded-for` en `app/api/leads/route.ts:47-49`) con su justificación: en Vercel el header lo sobrescribe Vercel con la IP real del cliente, por lo que el spoofing no es explotable en producción. No se modifica código.
- Documentar el riesgo residual: si el sitio migra fuera de Vercel, el header vuelve a ser spoofeable y el rate limit debe endurecerse (ver sección 6).

### Out of Scope

- Corrección de credenciales del MCP de Supabase (error `28P01`).
- Aplicación manual de `20261019_add_consent_to_leads.sql` si aún está pendiente en la DB alojada (pendiente operativo de SPEC 08; esta spec no toca columnas).
- Endpoint de autenticación, migración a Supabase Auth o cualquier cambio de modelo de usuarios.
- Escaneo de dependencias (npm audit), secrets en git history y DAST (ya excluidos en SPEC 07).
- Limpieza de la migración duplicada `01_create_leads_table.sql` (higiene de historial, sin impacto en el estado final).
- Cambios en el rate limiter (`x-forwarded-for`): se documenta la decisión, no se reimplementa.

---

## 2. Data Model

### 2.1 Migración idempotente `supabase/migrations/20261109_harden_leads_rls.sql`

Sin cambios de esquema ni de tipos TypeScript. Solo políticas RLS:

```sql
-- Hardening idempotente de RLS para public.leads
-- Garantiza el estado final sin importar si 20261019_harden_leads_rls.sql fue aplicada.
-- Re-ejecutable sin error: DROP IF EXISTS + CREATE OR REPLACE.

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Elimina las políticas permisivas creadas por 20260902_create_leads_table.sql
-- y 01_create_leads_table.sql (anon/public/authenticated con USING/WITH CHECK (true)).
DROP POLICY IF EXISTS "Permitir lectura de leads" ON public.leads;
DROP POLICY IF EXISTS "Permitir inserción de leads" ON public.leads;
DROP POLICY IF EXISTS "Permitir insercion de leads" ON public.leads;

-- Único actor con acceso: service_role (API Route del servidor).
CREATE OR REPLACE POLICY "Inserción solo service role" ON public.leads
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE OR REPLACE POLICY "Lectura solo service role" ON public.leads
  FOR SELECT
  TO service_role
  USING (true);
```

Nota: `CREATE OR REPLACE POLICY` reemplaza las políticas del mismo nombre creadas por `20261019_harden_leads_rls.sql` si ya existen; `DROP POLICY IF EXISTS` elimina los tres nombres heredados de las migraciones permisivas. La migración asume que la tabla existe (las migraciones `20260902`/`01` ya la crearon en producción).

### 2.2 `lib/supabase.ts` esperado (fragmento)

```typescript
import 'server-only';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xkpnllrmwvnsdyjqklqn.supabase.co';

const supabasePublicApiKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !supabasePublicApiKey ||
  !supabaseServiceRoleKey
) {
  throw new Error(
    '[Supabase] NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (o NEXT_PUBLIC_SUPABASE_ANON_KEY) y SUPABASE_SERVICE_ROLE_KEY deben estar definidas en las variables de entorno.',
  );
}
```

Sin cambios en `types/`, `public.leads` ni en el payload del lead.

---

## 3. Implementation Plan

Cada paso deja el sistema funcional.

### Fase 1: Fail-fast en `lib/supabase.ts`

1. **Instalar dependencia**: `npm install server-only` (quedará en `dependencies` de `package.json`).
2. **Modificar `lib/supabase.ts`**:
   - Añadir `import 'server-only';` como primera línea.
   - Sustituir las líneas 10-12 por `const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;` (sin fallback).
   - Ampliar la condición del `throw` (líneas 14-18) para incluir `!supabaseServiceRoleKey` y actualizar el mensaje (ver sección 2.2).
3. **Test unitario** `tests/unit/lib/supabase.test.ts` (nuevo):
   - Con `vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', '')` + `vi.resetModules()` + import dinámico de `@/lib/supabase`, esperar que el import lance el error `[Supabase]`.
   - Con la variable definida, esperar que el import no lance (crea el cliente).
   - Si `import 'server-only'` interfiere con el entorno de vitest (el paquete lanza fuera de RSC), añadir `vi.mock('server-only', () => ({}))` en este test y documentarlo en un comentario.

### Fase 2: Migración RLS idempotente

4. **Crear `supabase/migrations/20261109_harden_leads_rls.sql`** con el contenido exacto de la sección 2.1.
5. **Aplicación manual por el usuario** (MCP sin acceso a la DB por `28P01`):
   - Opción A: `supabase db push` desde la raíz del proyecto.
   - Opción B: SQL Editor del dashboard de Supabase, ejecutando el contenido del archivo.
   - Verificar en SQL Editor: `SELECT tablename, policyname, roles FROM pg_policies WHERE tablename = 'leads';` — deben existir únicamente "Inserción solo service role" e "Inserción solo service role"/"Lectura solo service role" con `roles = {service_role}`.

### Fase 3: Verificación y cierre

6. **Verificaciones locales**: `npm run lint`, `npx tsc --noEmit`, `npm run test`, `npm run build` — todas sin errores.
7. **Agente de seguridad**: `npm run security-review` → resumen con 0 CRITICAL y 0 HIGH.
8. **Verificación end-to-end**: con `npm run dev`, enviar un lead desde el formulario y confirmar que se inserta (vía `supabaseAdmin`/service_role) y que redirige a WhatsApp.
9. **Actualizar este spec** al implementar: marcar los criterios de aceptación cumplidos y registrar el resultado del scan en la sección 4.

---

## 4. Acceptance Criteria

### Fail-fast
- [ ] `lib/supabase.ts` no contiene `|| supabasePublicApiKey` para la service role key.
- [ ] Importar `@/lib/supabase` sin `SUPABASE_SERVICE_ROLE_KEY` definida lanza error con el mensaje `[Supabase]`.
- [ ] `import 'server-only'` es la primera línea de `lib/supabase.ts`.
- [ ] `server-only` aparece en `dependencies` de `package.json`.
- [ ] `tests/unit/lib/supabase.test.ts` pasa en `npm run test`.

### RLS
- [ ] Existe `supabase/migrations/20261109_harden_leads_rls.sql` con el contenido de la sección 2.1.
- [ ] `pg_policies` en Supabase muestra solo "Lectura solo service role" e "Inserción solo service role" sobre `public.leads`, ambas con `roles = {service_role}`.
- [ ] `GET {SUPABASE_URL}/rest/v1/leads?select=*` con la anon key devuelve 0 filas (o error de permiso).
- [ ] El formulario sigue insertando leads correctamente vía `/api/leads` y redirige a WhatsApp.

### Cierre de seguridad
- [ ] `npm run security-review` termina con 0 CRITICAL y 0 HIGH.
- [ ] `npm run lint`, `npx tsc --noEmit`, `npm run test` y `npm run build` sin errores.

### Rate limiter
- [ ] La decisión de aceptar `x-forwarded-for` (sección 5) y su riesgo residual (sección 6) están documentados en este spec.

---

## 5. Decisions Taken and Discarded

### Decisiones Tomadas

**1. Fail-fast en lugar de fallback a anon key**
- ✅ **Elegido**: lanzar error si falta `SUPABASE_SERVICE_ROLE_KEY`; sin cliente admin degradado.
- ❌ **Descartado**: mantener el fallback silencioso, o loggear un warning y continuar.
- **Razón**: el fallback enmascara una misconfiguración y puede terminar escribiendo con la clave pública (según el estado de RLS) o provocando 500s intermitentes. El error temprano hace visible la configuración rota.

**2. Migración idempotente nueva en lugar de solo verificación manual**
- ✅ **Elegido**: `20261109_harden_leads_rls.sql` re-ejecutable como red de seguridad, aplicada manualmente por el usuario.
- ❌ **Descartado**: depender solo de revisar `pg_policies` en el dashboard, o que el agente la aplique por MCP.
- **Razón**: el MCP falla por autenticación (`28P01`) y el estado real de la DB alojada es desconocido (SPEC 08 quedó pendiente de aplicar las migraciones `20261019_*`). Una migración idempotente garantiza el estado final sin importar la historia, y la aplica quien tiene acceso.

**3. `server-only` como guard de compilación**
- ✅ **Elegido**: `import 'server-only'` + dependencia explícita.
- ❌ **Descartado**: solo comentarios `// server only` o mover el archivo a una carpeta.
- **Razón**: es el mecanismo nativo de Next.js; rompe el build si un componente de cliente intenta importar el módulo, previniendo fugas futuras de la service role key al bundle.

**4. Rate limiter: aceptar el diseño actual con `x-forwarded-for`**
- ✅ **Elegido**: documentar como aceptado, sin cambios de código.
- ❌ **Descartado**: composite key IP+UA, mover a middleware, o WAF de Vercel.
- **Razón**: en Vercel el header `x-forwarded-for` lo escribe Vercel con la IP real del cliente (no se puede spoofear desde el navegador). El diseño actual cumple su función anti-spam en el entorno de producción real. Cualquier endurecimiento añade complejidad sin beneficio medible hoy.

**5. Cierre con el agente de SPEC 07 como criterio de aceptación**
- ✅ **Elegido**: `npm run security-review` con 0 CRITICAL/HIGH como gating.
- ❌ **Descartado**: solo revisión manual de los cambios.
- **Razón**: el agente ya existe y está integrado en CI; re-correrlo cierra el ciclo del review que originó esta spec.

### Decisiones Descartadas

**1. Limpiar la migración duplicada `01_create_leads_table.sql`**
- ❌ **Descartado**: por ahora.
- **Razón**: tocar el historial de migraciones ya aplicadas puede desincronizar la DB alojada; sin impacto en el estado final de RLS.

**2. Corregir las credenciales del MCP de Supabase como parte de esta spec**
- ❌ **Descartado**: tarea de infraestructura del usuario, no de código del proyecto.

---

## 6. Identified Risks

### Riesgo 1: La migración nueva falla si la tabla no existe en la DB alojada
- **Severidad**: LOW
- **Impacto**: error al aplicar `20261109_harden_leads_rls.sql`.
- **Mitigación**: la tabla `public.leads` existe en producción (hay leads capturados); si el usuario encuentra una DB sin la tabla, debe aplicar primero `20260902_create_leads_table.sql`.

### Riesgo 2: `import 'server-only'` interfiere con vitest
- **Severidad**: MEDIUM
- **Impacto**: el test nuevo (y potencialmente otros) falla en el entorno de test porque el paquete lanza fuera de React Server Components.
- **Mitigación**: `vi.mock('server-only', () => ({}))` en `tests/unit/lib/supabase.test.ts`; documentado en el paso 3 del plan.

### Riesgo 3: Build de Vercel roto si falta `SUPABASE_SERVICE_ROLE_KEY` en el dashboard
- **Severidad**: MEDIUM
- **Impacto**: con el fail-fast, un deploy sin la variable configurada lanza error (comportamiento deseado, pero visible como build/500).
- **Mitigación**: confirmar que `SUPABASE_SERVICE_ROLE_KEY` está definida en Vercel (Settings → Environment Variables) antes de mergear. El error es claro y apunta a la variable exacta.

### Riesgo 4: Rate limiter spoofeable fuera de Vercel
- **Severidad**: LOW
- **Impacto**: si el sitio migra a otro hosting que respete el header del cliente, el límite de 5/min se puede eludir.
- **Mitigación**: decisión documentada (sección 5.4); reabrir el tema si cambia el proveedor de hosting.

### Riesgo 5: `20261019_add_consent_to_leads.sql` sigue sin aplicarse en la DB alojada
- **Severidad**: MEDIUM
- **Impacto**: el insert de `/api/leads` (que incluye `consent_given`/`consent_at`) fallaría si las columnas no existen; independiente de esta spec.
- **Mitigación**: el usuario verifica ambas migraciones `20261019_*` al aplicar esta (pendiente operativo heredado de SPEC 08).

---

## 7. Archivos Afectados

| Archivo | Acción |
|---------|--------|
| `lib/supabase.ts` | Modificado (fail-fast + `server-only`) |
| `package.json` / `package-lock.json` | Modificados (dependencia `server-only`) |
| `supabase/migrations/20261109_harden_leads_rls.sql` | Nuevo |
| `tests/unit/lib/supabase.test.ts` | Nuevo |
| `app/api/leads/route.ts` | Sin cambios (decisión documentada en spec) |

---

## 8. Pending Inputs

Antes de cerrar la implementación se requieren:

1. **Acceso a la DB alojada**: el usuario aplica `supabase/migrations/20261109_harden_leads_rls.sql` (SQL Editor o `supabase db push`) — el MCP no tiene acceso (`28P01`).
2. **Confirmación de `SUPABASE_SERVICE_ROLE_KEY` en Vercel** (evita el riesgo 3).
3. **Resultado de la verificación `pg_policies`** para marcar los criterios de RLS como cumplidos.

---

## 9. References

- [SPEC 07: Security Review Agent Basado en OWASP Top 10 2021](./07-security-review-agent-owasp.md)
- [SPEC 08: Cumplimiento Legal, Privacidad y Prácticas Justas](./08-cumplimiento-legal-privacidad.md)
- [Supabase — Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js — `server-only`](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment)
- [Vercel — Headers (`x-forwarded-for`)](https://vercel.com/docs/edge-network/headers)

---

**Status**: 📝 Draft
**Pendiente**: aprobación del usuario
