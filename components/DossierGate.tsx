'use client';

import { useRouter } from 'next/navigation';
import EnquiryFormCard from '@/components/EnquiryFormCard';

/**
 * Thin client wrapper around EnquiryFormCard used inside the
 * /dossier gate.
 *
 * On successful enquiry submit the API sets the `udyana_verified`
 * cookie; router.refresh() then re-executes the server component
 * (app/dossier/page.tsx) which now reads the cookie and renders
 * the full dossier in place of this gate.
 *
 * The 1.5s delay lets the "Received" success state animate in
 * before the swap so the transition feels intentional rather than
 * abrupt.
 */
export default function DossierGate() {
  const router = useRouter();
  return (
    <EnquiryFormCard
      onSuccess={() => {
        setTimeout(() => router.refresh(), 1500);
      }}
    />
  );
}
