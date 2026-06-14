import { NextResponse } from 'next/server';
import { enquirySchema } from '@/lib/schemas';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed.', issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const supabase = createClient();
  const { error } = await supabase.from('enquiries').insert({
    full_name: parsed.data.fullName,
    designation: parsed.data.designation,
    phone: parsed.data.phone,
    email: parsed.data.email,
    visit_date: parsed.data.visitDate,
    interest: parsed.data.interest,
  });

  if (error) {
    console.error('[Udyana enquiry] supabase insert failed', error);
    return NextResponse.json(
      { error: 'Could not save your enquiry. Please try again.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
