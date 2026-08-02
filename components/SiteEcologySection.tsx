'use client';

import { useState } from 'react';
import SectionReveal from '@/components/SectionReveal';
import {
  SE_STYLES,
  SiteEcologyTrigger,
  SiteEcologyAccordion,
} from '@/components/SiteEcologyStudy';
import { sectionNum } from '@/lib/site';

/**
 * SiteEcologySection — section 02 · Independent Verification.
 *
 * Wraps the SiteEcologyTrigger + SiteEcologyAccordion pair (previously
 * nested inside SeedballSection's ritual tab 01) as a top-level
 * section on the homepage. The report itself is unchanged; only its
 * host has moved.
 *
 * Section stays collapsed by default -- expanding it reveals the
 * report header, land-clearance grid, and (after email capture) the
 * gated site-data / species / eco-compliance blocks.
 */
export default function SiteEcologySection() {
  const [isOpen, setIsOpen] = useState(false);
  const num = sectionNum('verification');

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: SE_STYLES }} />

      <section
        id="verification"
        className="relative bg-[#1a2318] py-32 md:py-44 overflow-hidden"
      >
        {/* Background numeral, mirrors the treatment on Financial's 04 */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-12 md:top-0 text-center font-display font-light text-cream/[0.04] text-[28vw] leading-none select-none"
        >
          {num}
        </span>

        <div className="container-edit relative">
          {/* Outer header stays lean -- the accordion's own report header
              (eyebrow + title + intro) is the heavy lifter once opened, so
              duplicating those elements outside would just create noise. */}
          <SectionReveal className="text-center max-w-3xl mx-auto">
            <p className="eyebrow mb-5">
              · {num} · Independent Verification · Udyana
            </p>
            <span className="rule mx-auto mb-10" />
            <p className="font-body font-light text-sky/80 text-[0.95rem] leading-[1.85] max-w-xl mx-auto">
              A comprehensive independent spatial risk analysis of the estate
              and its 60-acre adjoining lake. Government land records, village
              maps, master plan data, and water body boundaries all cross-
              checked before the first seedball was placed.
            </p>

            <div className="mt-10">
              <SiteEcologyTrigger
                isOpen={isOpen}
                onToggle={() => setIsOpen((prev) => !prev)}
              />
            </div>
          </SectionReveal>

          <SiteEcologyAccordion
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        </div>
      </section>
    </>
  );
}
