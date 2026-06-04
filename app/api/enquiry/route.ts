import { NextResponse } from 'next/server';
import { enquirySchema } from '@/lib/schemas';

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

  // Stub: log to server console. Wire to email/CRM later.
  console.log('[Udyana enquiry]', {
    at: new Date().toISOString(),
    ...parsed.data,
  });

  return NextResponse.json({ ok: true });
}
