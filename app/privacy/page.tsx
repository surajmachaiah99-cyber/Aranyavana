import type { Metadata } from 'next';
import LegalPageLayout from '@/components/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy · Udyana by Aranyavana',
  description:
    'How Aranyavana Infra Developers LLP handles the personal data submitted through this website, and your rights under the Digital Personal Data Protection Act 2023.',
};

/**
 * Content filled in Task 12. This is Task 11's scaffolding stub.
 */
export default function PrivacyPage() {
  return (
    <LegalPageLayout
      eyebrow="· Privacy · Aranyavana"
      title="How we handle your data."
      lastUpdated="November 2026"
    >
      <p>Content coming.</p>
    </LegalPageLayout>
  );
}
