# Invultec vKiro — Project Guidelines & Workflow

## Git & Branching Rules (STRICT)

1. **Feature Branches**: NEVER implement features or refactors directly on `main`. Always create a dedicated branch before making changes (e.g., `spec-03-actualizacion-terminologia-rubber-shock` or `feat/...`).
2. **No Unapproved Merges**: NEVER merge any feature branch into `main` or push directly to `main` without explicit user review and approval.
3. **Spec-Driven Workflow**:
   - Specifications live in `specs/NN-slug.md`.
   - Before implementing a spec, ensure a dedicated feature branch is active (`git checkout -b spec-NN-slug`).

## Tech Stack

- **Frontend**: Next.js 14 App Router, TypeScript, Tailwind CSS
- **Database / BaaS**: Supabase
- **Deployment**: Vercel
