import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { checkRateLimit, getClientIp, checkCsrf } from '@/lib/security';
import { validatePartnerPayload } from '@/lib/validation';

export async function POST(request: NextRequest) {
  const csrfError = checkCsrf(request);
  if (csrfError) {
    return NextResponse.json({ error: csrfError }, { status: 403 });
  }

  const clientIp = getClientIp(request.headers.get('x-forwarded-for'));
  const limit = checkRateLimit(`submit-partner:${clientIp}`, 15, 10 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } }
    );
  }

  try {
    const body = await request.json();
    const parsed = validatePartnerPayload(body);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    // Honeypot for bot submissions: silently accept but drop.
    if (parsed.data.website) {
      return NextResponse.json({ success: true });
    }

    const supabase = getSupabase();

    const { data, error } = await supabase.from('partner_applications').insert([
      {
        company: parsed.data.company,
        contact_name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        countries_served: parsed.data.countries,
        services_offered: parsed.data.services,
        min_client_size: parsed.data.minSize,
        languages_supported: parsed.data.languages,
        credentials: parsed.data.credentials,
        capacity: parsed.data.capacity,
      },
    ]);

    if (error) {
      console.error('submit-partner supabase error', { message: error.message, code: error.code });
      return NextResponse.json({ error: 'Failed to save application' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown';
    console.error('submit-partner api error', { message });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
