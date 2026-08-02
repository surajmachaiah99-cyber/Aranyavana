import type { Metadata } from 'next';
import LegalPageLayout from '@/components/LegalPageLayout';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy · Udyana by Aranyavana',
  description:
    'How Aranyavana Infra Developers LLP handles the personal data submitted through this website, and your rights under the Digital Personal Data Protection Act 2023.',
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      eyebrow="· Privacy · Aranyavana"
      title="How we handle your data."
      lastUpdated="November 2026"
    >
      <p>
        This is how {SITE.legalName} — the <strong>Data Fiduciary</strong>{' '}
        under India&rsquo;s <strong>Digital Personal Data Protection Act 2023</strong>{' '}
        — handles the personal data you submit through this website. No opaque
        paragraphs, no dark patterns. If anything below is unclear, write to{' '}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>Who we are</h2>
      <p>
        {SITE.legalName} — the developer of {SITE.product}, and the Data
        Fiduciary responsible for personal data submitted through this site.
      </p>
      <span className="placeholder-block">
        · Registered address to be inserted ·
      </span>

      <h2>What we collect</h2>
      <p>Two forms on this site collect data:</p>
      <ul>
        <li>
          <strong>Private briefing enquiry.</strong> Your name, phone number,
          email address, designation or company, preferred date for a site
          visit, and your stated area of interest.
        </li>
        <li>
          <strong>Ecology report request.</strong> Your email address alone.
        </li>
      </ul>
      <p>
        Nothing else is collected from you. There are no cookies used for
        tracking, no analytics scripts, and no advertising pixels on this site.
      </p>

      <h2>Why we collect it</h2>
      <ul>
        <li>To respond to your enquiry</li>
        <li>To arrange a private briefing or site visit</li>
        <li>To share the project documentation you have asked for</li>
      </ul>
      <p>
        Personal data is <strong>never sold, rented, or shared</strong> with
        third parties for marketing purposes.
      </p>

      <h2>Legal basis</h2>
      <p>
        Consent, given at the moment you submit either form. Consent may be
        withdrawn at any time — see <em>Your rights</em> below.
      </p>

      <h2>How your data is stored</h2>
      <p>
        Submissions are delivered directly to our business email inbox. We do
        not operate a customer relationship management (CRM) database, and no
        third-party data processor holds a copy on our behalf.
      </p>

      <h2>Analytics and tracking</h2>
      <p>
        This website uses <strong>no analytics</strong>, no advertising pixels,
        and no third-party tracking cookies. We do not build behavioural
        profiles of visitors, and we do not know who has read this page.
      </p>

      <h2>Retention</h2>
      <p>
        We retain your data only as long as necessary to respond to your
        enquiry and maintain a record of the conversation. On written request,
        we will delete it.
      </p>

      <h2>Your rights under the DPDP Act</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Correct any inaccuracies in it</li>
        <li>Request its erasure</li>
        <li>Withdraw the consent under which it was collected</li>
        <li>
          Raise a grievance if you believe your data has been handled improperly
        </li>
      </ul>
      <p>
        To exercise any of these rights, email{' '}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. If you would rather
        speak with someone, you can also reach us on{' '}
        <a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a>.
      </p>

      <h2>Contact for data requests</h2>
      <p>
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> — primary channel for
        all data-related requests.
        <br />
        <a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a> — if you prefer to
        speak.
      </p>
    </LegalPageLayout>
  );
}
