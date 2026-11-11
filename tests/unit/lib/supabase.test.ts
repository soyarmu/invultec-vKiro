import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// `server-only` lanza error fuera de React Server Components; en el entorno
// de vitest lo neutralizamos para poder importar @/lib/supabase (Riesgo 2
// del spec 10). Sin este mock, el import dinámico falla siempre.
vi.mock('server-only', () => ({}));

describe('lib/supabase — fail-fast de SUPABASE_SERVICE_ROLE_KEY', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://xkpnllrmwvnsdyjqklqn.supabase.co');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY', 'sb_publishable_test');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('lanza error [Supabase] si falta SUPABASE_SERVICE_ROLE_KEY', async () => {
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', '');

    await expect(import('@/lib/supabase')).rejects.toThrow('[Supabase]');
  });

  it('no lanza y crea los clientes con SUPABASE_SERVICE_ROLE_KEY definida', async () => {
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'sb_service_role_test');

    const mod = await import('@/lib/supabase');

    expect(mod.supabase).toBeDefined();
    expect(mod.supabaseAdmin).toBeDefined();
  });
});
