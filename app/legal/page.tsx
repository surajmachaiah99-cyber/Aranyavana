import type { Metadata } from 'next';
import LegalPageLayout from '@/components/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Legal Notices · Udyana by Aranyavana',
  description:
    'Legal notices and terms concerning the information published on the Udyana website, including RERA applicability, indicative pricing, and independent verification.',
};

/**
 * Content filled in Task 12. This is Task 11's scaffolding stub.
 */
export default function LegalPage() {
  return (
    <LegalPageLayout
      eyebrow="· Legal · Aranyavana"
      title="Terms plainly stated."
      lastUpdated="November 2026"
    >
      <p>Content coming.</p>
    </LegalPageLayout>
  );
}
