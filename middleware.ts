import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Gate for /dossier.
 *
 * The dossier holds the full space programs, material specifications,
 * finish schedules, and investment tiers -- the detail that used to
 * live in the marketing page's Homes section. It's now second-touch
 * content: a reader unlocks it by submitting the private-briefing
 * enquiry form. On successful submit, /api/enquiry sets the
 * `udyana_verified` HttpOnly cookie which this middleware reads.
 *
 * No cookie -> redirect to the homepage with an #enquiry hash so the
 * form is scrolled into view.
 */
export function middleware(request: NextRequest) {
  const verified = request.cookies.get('udyana_verified');
  if (!verified) {
    return NextResponse.redirect(new URL('/#enquiry', request.url));
  }
}

export const config = {
  matcher: '/dossier/:path*',
};
