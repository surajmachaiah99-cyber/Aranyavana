import { NextResponse } from 'next/server';
import { ecologyReportSchema } from '@/lib/schemas';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

/**
 * POST /api/ecology-report
 *
 * Low-friction lead capture that gates the detailed portion of the
 * Independent Spatial Risk Report (site data tables, species logs,
 * eco-compliance detail). Distinguished from the main /api/enquiry
 * flow via a separate Supabase table so we can measure the two lead
 * qualities independently.
 *
 * Required Supabase table (create once, before this route is used):
 *
 *   create table ecology_report_requests (
 *     id           uuid primary key default gen_random_uuid(),
 *     email        text not null,
 *     source       text not null default 'ecology-report',
 *     submitted_at timestamptz not null default now()
 *   );
 *
 * TODO(email-delivery): We currently only persist the lead. The
 * copy on the page says "sent immediately" -- once an email service
 * (Resend / Postmark / SES) is wired up, dispatch the report PDF
 * to `parsed.data.email` here on successful insert.
 */
export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const parsed = ecologyReportSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed.', issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const supabase = createClient();
  const { error } = await supabase.from('ecology_report_requests').insert({
    email: parsed.data.email,
    source: 'ecology-report',
  });

  if (error) {
    console.error('[Udyana ecology-report] supabase insert failed', error);
    return NextResponse.json(
      { error: 'Could not record your request. Please try again.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
