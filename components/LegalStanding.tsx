import SectionReveal from '@/components/SectionReveal';
import { StaggerGroup, StaggerItem } from '@/components/Stagger';

/**
 * LegalStanding — trust-anchor block placed immediately before the
 * enquiry form. States three legal facts about Udyana in the site's
 * flat, factual voice: RERA applicability, title/revenue-record
 * standing, and the offer of independent verification.
 *
 * The section is deliberately quiet -- restraint reads as honesty
 * on a legal disclosure.
 */

type LegalItem = {
  eyebrow: string;
  title: string;
  body: string;
};

const ITEMS: LegalItem[] = [
  {
    eyebrow: '· RERA Applicability',
    title: 'Agricultural land · Outside RERA',
    body: 'Udyana is an agricultural land development and therefore falls outside the ambit of RERA registration, which applies to residential and commercial real estate projects. All documentation relating to land title, revenue records, and permissions is available for independent legal review at your private briefing.',
  },
  {
    /* TODO: Once khata type (A / B / E) and DC conversion status are
       confirmed by the internal legal team, replace this neutral copy
       with the exact standing. Until then the fallback below is what
       ships. Do not publish khata claims that are not yet on file. */
    eyebrow: '· Title & Revenue Records',
    title: 'Documentation open to your counsel.',
    body: 'Complete title documentation, revenue records, and encumbrance history are available for review by your legal counsel at the private briefing stage. We encourage independent verification.',
  },
  {
    eyebrow: '· Independent Verification Encouraged',
    title: 'Verify, then decide.',
    body: `We provide the full documentation set to your advocate before any commitment is sought. Aranyavana's position is that land this significant should be verified independently, not taken on trust.`,
  },
];

export default function LegalStanding() {
  return (
    <section id="legal" className="relative bg-earth py-32 md:py-44">
      <div className="container-edit">
        <SectionReveal className="text-center max-w-3xl mx-auto">
          <p className="eyebrow mb-5">· Legal Standing · Udyana</p>
          <span className="rule mx-auto mb-10" />
          <h2 className="font-display italic font-light text-cream text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.05]">
            Clarity, stated plainly.
          </h2>
          <p className="mt-10 font-body font-light text-sky/85 text-[1.02rem] leading-[1.95] max-w-[620px] mx-auto">
            Silence on the legal facts is not an option for land this
            significant. What we can state publicly is stated here; the
            remainder is on the table at the private briefing.
          </p>
        </SectionReveal>

        <StaggerGroup className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-px bg-bark/40 border border-bark/40">
          {ITEMS.map((item) => (
            <StaggerItem key={item.title}>
              <article className="h-full bg-stone/40 p-8 md:p-10 transition-colors duration-500 hover:bg-stone/60">
                <p className="font-sc text-sand text-[0.68rem] tracking-widest2 mb-5">
                  {item.eyebrow}
                </p>
                <h3 className="font-display font-light text-cream text-[clamp(1.25rem,1.8vw,1.65rem)] leading-tight mb-5">
                  {item.title}
                </h3>
                <p className="font-body font-light text-mist/65 text-[0.9rem] leading-[1.85]">
                  {item.body}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
