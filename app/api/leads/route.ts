import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Rate limiter en memoria: máximo 5 peticiones por minuto por IP
interface RateLimitEntry {
  count: number;
  expiresAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minuto
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.expiresAt) {
    rateLimitMap.set(ip, {
      count: 1,
      expiresAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  entry.count += 1;
  return false;
}

// Limpiar IPs expiradas periódicamente
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.expiresAt) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting por IP
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown-ip';

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Límite de solicitudes superado (máximo 5 por minuto). Intenta nuevamente en un minuto.' },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));

    const {
      name,
      phone,
      brand,
      model,
      year,
      quantity = 1,
      consentGiven,
      hp = '',
    } = body;

    // Sanear número de teléfono de WhatsApp del canal de ventas
    const rawWaNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573000000000';
    let cleanWaNumber = rawWaNumber.replace(/\D/g, '');
    if (cleanWaNumber.length === 10 && cleanWaNumber.startsWith('3')) {
      cleanWaNumber = `57${cleanWaNumber}`;
    }

    // Función para construir la URL de WhatsApp
    const buildWhatsAppUrl = (n: string, b: string, m: string, y: string) => {
      const message = `Hola Invultec, quiero información sobre el Rubber Shock RS-001 para mi ${b} ${m} ${y}. Mi nombre es ${n}.`;
      return `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(message)}`;
    };

    const defaultWaUrl = buildWhatsAppUrl(
      name?.trim() || 'Cliente',
      brand || 'vehículo',
      model || '',
      year || ''
    );

    // 2. Honeypot Anti-Bot
    // Si el campo trampa está lleno, simulamos éxito sin guardar en la BD
    if (hp && String(hp).trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Lead procesado',
        whatsappUrl: defaultWaUrl,
      });
    }

    // 3. Validación de campos
    const trimmedName = typeof name === 'string' ? name.trim() : '';
    if (!trimmedName || trimmedName.length < 2) {
      return NextResponse.json(
        { error: 'El nombre debe tener al menos 2 caracteres.' },
        { status: 400 }
      );
    }

    const trimmedPhone = typeof phone === 'string' ? phone.replace(/\D/g, '') : '';
    // Celular colombiano: exactamente 10 dígitos iniciando en 3 (ej. 3001234567)
    const colombianCellRegex = /^3\d{9}$/;
    if (!colombianCellRegex.test(trimmedPhone)) {
      return NextResponse.json(
        { error: 'Ingresa un número celular colombiano válido de 10 dígitos (debe iniciar con 3).' },
        { status: 400 }
      );
    }

    if (!brand || !model || !year) {
      return NextResponse.json(
        { error: 'Debes seleccionar la marca, modelo y año de tu vehículo.' },
        { status: 400 }
      );
    }

    // Ley 1581 de 2012: sin consentimiento explícito no se almacena el dato
    if (consentGiven !== true) {
      return NextResponse.json(
        { error: 'Debes aceptar la Política de Privacidad.' },
        { status: 400 }
      );
    }

    // 4. Inserción en Supabase Server-Side
    const { data: leadData, error: dbError } = await supabaseAdmin
      .from('leads')
      .insert([
        {
          name: trimmedName,
          phone: trimmedPhone,
          brand: String(brand).trim(),
          model: String(model).trim(),
          year: String(year).trim(),
          quantity: Number(quantity) || 1,
          converted_to_wa: true,
          status: 'pending',
          consent_given: true,
          consent_at: new Date().toISOString(),
        },
      ])
      .select('id')
      .single();

    if (dbError) {
      console.error('Error insertando lead en Supabase:', dbError);
      // Retornamos de todos modos la URL de WhatsApp para no perder el cliente
    }

    // 5. Generación de mensaje y URL de WhatsApp
    const whatsappUrl = buildWhatsAppUrl(
      trimmedName,
      String(brand).trim(),
      String(model).trim(),
      String(year).trim()
    );

    return NextResponse.json({
      success: true,
      leadId: leadData?.id || null,
      whatsappUrl,
    });
  } catch (err: any) {
    console.error('Error procesando lead:', err);
    return NextResponse.json(
      { error: 'Ocurrió un error inesperado al procesar la solicitud.' },
      { status: 500 }
    );
  }
}
