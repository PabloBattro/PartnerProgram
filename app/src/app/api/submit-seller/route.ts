import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { checkRateLimit, getClientIp, checkCsrf } from '@/lib/security';
import { validateSellerPayload } from '@/lib/validation';

export async function POST(request: NextRequest) {
  const csrfError = checkCsrf(request);
  if (csrfError) {
    return NextResponse.json({ error: csrfError }, { status: 403 });
  }

  const clientIp = getClientIp(request.headers.get('x-forwarded-for'));
  const limit = checkRateLimit(`submit-seller:${clientIp}`, 15, 10 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } }
    );
  }

  try {
    const body = await request.json();
    const parsed = validateSellerPayload(body);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    // Honeypot for bot submissions: silently accept but drop.
    if (parsed.data.website) {
      return NextResponse.json({ success: true });
    }

    const supabase = getSupabase();

    const { data, error } = await supabase.from('seller_submissions').insert([
      {
        company: parsed.data.company,
        contact_name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        sales_volume: parsed.data.volume,
        latam_presence: parsed.data.latamPresence,
        countries_of_interest: parsed.data.countries,
        partner_types_needed: parsed.data.partnerTypes,
        timeline: parsed.data.timeline,
        business_type: parsed.data.businessType,
      },
    ]);

    if (error) {
      console.error('submit-seller supabase error', { message: error.message, code: error.code });
      return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown';
    console.error('submit-seller api error', { message });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
