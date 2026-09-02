# SPEC 04: Verificación y Garantía de Conexión a Supabase

**State:** Implementado  
**Date:** 2026-09-02  
**Objective:** Garantizar y verificar la conexión cliente-servidor con la instancia de Supabase del proyecto Invultec vKiro sin realizar cambios ni creaciones en el esquema de base de datos.

---

## 1. Scope

### In Scope
- Creación aislada de rama git `spec-04-conexion-supabase` mediante `/spec-impl`.
- Verificación y estandarización del cliente de Supabase en `lib/supabase.ts`.
- Creación/actualización de `.env.local.example` con las variables de entorno requeridas para Supabase (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`).
- Creación de un endpoint API de verificación de estado (Health Check) en `app/api/health/supabase/route.ts` para validar conectividad en tiempo de ejecución.
- Verificación de la conectividad contra el proyecto Supabase (`xkpnllrmwvnsdyjqklqn`).

### Out of Scope
- Creación de tablas, migraciones DDL, tipos de datos o modificación de esquemas en Supabase.
- Modificación de políticas RLS o estructuras existentes.
- Cambios en el flujo de interfaz de usuario de captura de leads.

---

## 2. Data Model

No aplica. No se crean ni modifican tablas en la base de datos en esta especificación.

---

## 3. Implementation Plan

1. **Aislamiento en Rama Git**:
   - Confirmar creación y cambio automático a la rama `spec-04-conexion-supabase` mediante `/spec-impl`.
2. **Plantilla de Variables de Entorno (`.env.local.example`)**:
   - Crear/actualizar `.env.local.example` incluyendo:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
3. **Refactorización y Validación del Cliente (`lib/supabase.ts`)**:
   - Asegurar que el cliente de Supabase reconozca `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` además de la anon key y valide variables.
4. **Endpoint de Health Check (`app/api/health/supabase/route.ts`)**:
   - Crear endpoint GET `/api/health/supabase` que realiza una petición de prueba (ping a REST API) para confirmar conectividad activa.
5. **Prueba y Verificación**:
   - Ejecutar `npm run build` para asegurar cero errores de compilación.

---

## 4. Acceptance Criteria

- [x] La implementación se ejecuta en la rama dedicada `spec-04-conexion-supabase`.
- [x] Existe archivo `.env.local.example` documentando todas las llaves requeridas de Supabase.
- [x] `lib/supabase.ts` valida las variables de entorno adecuadamente.
- [x] El endpoint GET `/api/health/supabase` responde con estado HTTP 200 y confirmación de conectividad.
- [x] No se ha creado ni modificado ninguna tabla en la base de datos de Supabase.
- [x] La compilación `npm run build` finaliza exitosamente.

---

## 5. Decisions Taken and Discarded

- **Sin cambios DDL o tablas**: Confirmado por el usuario enfocar esta iteración exclusivamente en validar la conectividad de la infraestructura.
- **Soporte para publishable key**: Agregado en `lib/supabase.ts` para compatibilidad con el formato moderno de llaves de Supabase (`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`).
- **Endpoint Health Check dedicado**: Adoptado para permitir monitoreo y verificación de la API de Supabase en cualquier momento desde Vercel / desarrollo local.

---

## 6. Identified Risks

- **Variables de entorno faltantes en despliegue**: Si `NEXT_PUBLIC_SUPABASE_URL` no está configurada en Vercel, el cliente usará la URL por defecto del proyecto (`https://xkpnllrmwvnsdyjqklqn.supabase.co`).
