import { http, HttpResponse } from 'msw';

/**
 * Mock Service Worker (MSW) handlers for testing
 * These handlers intercept HTTP requests during tests
 */

// Supabase API base URL (from env vars)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xkpnllrmwvnsdyjqklqn.supabase.co';

export const handlers = [
  // Mock Supabase leads API - successful insert
  http.post(`${SUPABASE_URL}/rest/v1/leads`, async () => {
    return HttpResponse.json(
      [
        {
          id: 'test-lead-id-12345',
          created_at: new Date().toISOString(),
          name: 'Test User',
          phone: '3001234567',
          brand: 'Toyota',
          model: 'Hilux',
          year: '2020',
          quantity: 1,
          converted_to_wa: true,
          status: 'pending',
        },
      ],
      { status: 201 }
    );
  }),

  // Mock Supabase leads API - select
  http.get(`${SUPABASE_URL}/rest/v1/leads`, () => {
    return HttpResponse.json([
      {
        id: 'test-lead-id-12345',
        name: 'Test User',
        phone: '3001234567',
      },
    ]);
  }),
];
