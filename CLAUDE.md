# Invultec vKiro — Project Guidelines & Workflow

## Git & Branching Rules (STRICT)

1. **Feature Branches**: NEVER implement features or refactors directly on `main`. Always create a dedicated branch before making changes (e.g., `spec-NN-slug` or `feat/...`).
2. **No Unapproved Merges**: NEVER merge any feature branch into `main` or push directly to `main` without explicit user review and approval.
3. **Commit Messages**: End all git commit messages with:
   `Co-Authored-By: Claude <noreply@anthropic.com>`
4. **Spec-Driven Workflow**:
   - Specifications live in `specs/NN-slug.md`.
   - Before implementing a spec, ensure a dedicated feature branch is active (`git checkout -b spec-NN-slug`).
   - The `/spec-impl` skill requires the spec state to be `Aprobado` (or `Approved`) before implementation begins.

---

## Tech Stack & Architecture

- **Frontend**: Next.js 14 App Router, React 18, TypeScript 5.4, Tailwind CSS 3.4
- **Database / BaaS**: Supabase (`@supabase/supabase-js` 2.x) con Row Level Security (RLS) en `public.leads`
- **Iconography**: Lucide React
- **Sales Channel**: WhatsApp Integration (`NEXT_PUBLIC_WHATSAPP_NUMBER`)
- **Deployment**: Vercel

---

## Design System & Terminology Conventions

1. **Language & Target Audience**: 100% Spanish tailored for the Colombian automotive aftermarket.
2. **Official Brand Terminology**:
   - Product name: **Rubber Shock RS-001** (or *Rubber Shock Invultec*)
   - Vehicle component: **resortes helicoidales** (helicoidal springs)
   - Material: **hule uretano de alta resistencia** (high-resistance urethane rubber)
3. **Corporate Color Palette**:
   - **Carmine Red (Brand Primary)**: `#C0262D`
   - **Corporate Black**: `#0A0A0A`
   - **Support Grey**: `#71727A`
   - **Neutral Background**: `#F4F3EE` / `#FAFAFA`

---

## Database & Migrations (Supabase)

- **Migration Scripts**: Stored in `supabase/migrations/YYYYMMDD_slug.sql`.
- **Primary Table**: `public.leads` (`id`, `created_at`, `name`, `phone`, `brand`, `model`, `year`, `quantity`, `converted_to_wa`, `status`).
- **Environment Variables**:
  - `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL (`https://xkpnllrmwvnsdyjqklqn.supabase.co`).
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Public client key.
  - `SUPABASE_SERVICE_ROLE_KEY`: Admin key for server-side API Route execution.
  - `NEXT_PUBLIC_WHATSAPP_NUMBER`: Official WhatsApp sales number (`573172130907`).

---

## Verification Commands

Run these checks before submitting PRs or finalizing tasks:

```bash
# Servidor de desarrollo
npm run dev

# Linter de Next.js / ESLint
npm run lint

# Chequeo estricto de tipos TypeScript
npx tsc --noEmit

# Compilación de producción
npm run build
```
