import type { Metadata } from 'next';
import LegalPageLayout from '@/components/LegalPageLayout';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Legal Notices · Udyana by Aranyavana',
  description:
    'Legal notices and terms concerning the information published on the Udyana website: informational nature, indicative pricing, RERA applicability, and independent verification.',
};

export default function LegalPage() {
  return (
    <LegalPageLayout
      eyebrow="· Legal · Aranyavana"
      title="Terms plainly stated."
      lastUpdated="November 2026"
    >
      <p>
        This is the legal notice governing the content published on the{' '}
        {SITE.product} website. It is intended to be read, not skipped.
      </p>

      <h2>Informational nature</h2>
      <p>
        The content of this website is <strong>informational</strong>. It does
        not constitute a legal offer, an invitation to offer, or a binding
        contract. Nothing on this site should be relied on as a commitment by{' '}
        {SITE.legalName} or {SITE.product} until reduced to a definitive
        written agreement executed between the parties.
      </p>

      <h2>Indicative pricing and specifications</h2>
      <p>
        Prices, plot availability, dimensions, orientations, material
        schedules, and finish specifications shown here are{' '}
        <strong>indicative</strong>. They may be revised without notice as
        inventory sells and specifications are refined. The definitive figures
        are those set out in the sale document you sign, not those shown on
        this site at any given point.
      </p>

      <h2>Renders and illustrations</h2>
      <p>
        Landscape imagery, construction package visuals, floor plans, and any
        renders shown on this website are <strong>representative</strong> —
        included to convey design intent. They are not contractual. Actual
        homes, landscapes, and finishes may vary.
      </p>

      <h2>Superseding agreement</h2>
      <p>
        All representations, statements, and figures on this website are
        subject to and <strong>superseded</strong> by the definitive agreement
        executed between the purchaser and {SITE.legalName}.
      </p>

      <h2>RERA applicability</h2>
      <p>
        {SITE.product} is an <strong>agricultural land development</strong>. As
        agricultural land it falls outside the ambit of the Real Estate
        (Regulation and Development) Act, which applies to residential and
        commercial real estate projects. All documentation relating to land
        title, revenue records, and permissions is available for independent
        legal review at the private briefing stage.
      </p>

      <h2>Independent verification encouraged</h2>
      <p>
        Purchasers are <strong>expressly encouraged</strong> to have all
        documentation independently verified by their own legal counsel before
        entering into any commitment. Our position is that land this
        significant should be verified independently, not taken on trust.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All content on this site — copy, photography, videos, renders,
        illustrations, layouts, and code — is the intellectual property of{' '}
        {SITE.legalName} or its licensors. Reproduction or reuse outside of the
        site requires written permission.
      </p>

      <h2>Contact</h2>
      <p>
        For questions about anything on this page, write to{' '}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call{' '}
        <a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a>.
      </p>
    </LegalPageLayout>
  );
}
