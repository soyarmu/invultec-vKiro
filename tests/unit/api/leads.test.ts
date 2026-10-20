import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

const insertMock = vi.fn();
const selectMock = vi.fn();
const singleMock = vi.fn();

vi.mock('@/lib/supabase', () => ({
  supabaseAdmin: {
    from: vi.fn(() => ({
      insert: (rows: unknown[]) => {
        insertMock(rows);
        return { select: selectMock };
      },
    })),
  },
}));

const { POST } = await import('@/app/api/leads/route');

function buildRequest(body: Record<string, unknown>, ip = '1.1.1.1') {
  return new NextRequest('http://localhost/api/leads', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': ip,
    },
    body: JSON.stringify(body),
  });
}

const validBody = {
  name: 'Juan Pérez',
  phone: '3001234567',
  brand: 'Toyota',
  model: 'Hilux',
  year: '2026',
};

describe('POST /api/leads — consentimiento', () => {
  beforeEach(() => {
    insertMock.mockClear();
    selectMock.mockReturnValue({ single: singleMock });
    singleMock.mockResolvedValue({ data: { id: 'lead-1' }, error: null });
  });

  it('responde 400 y no inserta sin consentimiento', async () => {
    const response = await POST(buildRequest({ ...validBody, consentGiven: false }));

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.error).toMatch(/política de privacidad/i);
    expect(insertMock).not.toHaveBeenCalled();
  });

  it('responde 400 cuando consentGiven está ausente', async () => {
    const response = await POST(buildRequest({ ...validBody }));

    expect(response.status).toBe(400);
    expect(insertMock).not.toHaveBeenCalled();
  });

  it('inserta consent_given y consent_at con consentimiento', async () => {
    const response = await POST(buildRequest({ ...validBody, consentGiven: true }));

    expect(response.status).toBe(200);
    expect(insertMock).toHaveBeenCalledTimes(1);

    const [row] = insertMock.mock.calls[0][0];
    expect(row.consent_given).toBe(true);
    expect(typeof row.consent_at).toBe('string');
    expect(Number.isNaN(Date.parse(row.consent_at))).toBe(false);
  });
});
