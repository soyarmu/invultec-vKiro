import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xkpnllrmwvnsdyjqklqn.supabase.co';
  const apiKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    '';

  try {
    const healthUrl = `${supabaseUrl}/rest/v1/`;
    const response = await fetch(healthUrl, {
      method: 'GET',
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
      cache: 'no-store',
    });

    if (response.ok || response.status === 200 || response.status === 404) {
      return NextResponse.json({
        status: 'ok',
        connected: true,
        projectUrl: supabaseUrl,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      {
        status: 'error',
        connected: false,
        statusCode: response.status,
        message: 'No se pudo conectar a la REST API de Supabase',
      },
      { status: 500 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        connected: false,
        message: error?.message || 'Error de red o conexión al servidor de Supabase',
      },
      { status: 500 }
    );
  }
}
