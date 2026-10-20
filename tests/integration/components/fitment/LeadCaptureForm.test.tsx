import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { LeadCaptureForm } from '@/components/fitment/LeadCaptureForm';

describe('LeadCaptureForm — consentimiento de datos personales', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, whatsappUrl: null }),
    });
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
    const selects = screen.getAllByRole('combobox');
    await user.selectOptions(selects[0], 'Toyota');
    await user.selectOptions(selects[1], 'Hilux');
    await user.selectOptions(selects[2], '2026');

    const [nameInput, phoneInput] = screen.getAllByRole('textbox');
    await user.type(nameInput, 'Juan Pérez');
    await user.type(phoneInput, '3001234567');
  }

  it('el checkbox no está premarcado y enlaza a /privacidad', () => {
    render(<LeadCaptureForm />);

    const checkbox = screen.getByRole('checkbox', { name: /política de privacidad/i });
    expect(checkbox).not.toBeChecked();

    const link = screen.getByRole('link', { name: /política de privacidad/i });
    expect(link).toHaveAttribute('href', '/privacidad');
  });

  it('no envía la solicitud si no se acepta la política', async () => {
    const user = userEvent.setup();
    render(<LeadCaptureForm />);

    await fillValidForm(user);
    await user.click(
      screen.getByRole('button', { name: /consultar disponibilidad/i })
    );

    expect(
      screen.getByText(/debes aceptar la política de privacidad/i)
    ).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('envía consentGiven: true cuando se acepta la política', async () => {
    const user = userEvent.setup();
    render(<LeadCaptureForm />);

    await fillValidForm(user);
    await user.click(
      screen.getByRole('checkbox', { name: /política de privacidad/i })
    );
    await user.click(
      screen.getByRole('button', { name: /consultar disponibilidad/i })
    );

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.consentGiven).toBe(true);
  });
});
