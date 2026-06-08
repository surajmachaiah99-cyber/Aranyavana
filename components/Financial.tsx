import SectionReveal from '@/components/SectionReveal';
import { StaggerGroup, StaggerItem } from '@/components/Stagger';

const STATS: Array<{ value: string; label: string }> = [
  { value: '18', label: 'Estate Plots Total' },
  { value: '15 Acres', label: 'Natural Lake' },
  { value: '1 km', label: 'From NH 75' },
];

export default function Financial() {
  return (
    <section
      id="investment"
      className="relative bg-bark py-32 md:py-44 overflow-hidden"
    >
      {/* Dark gradient per spec: linear-gradient(160deg, #2A1F14 0%, #4A3520 100%) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(160deg,#2A1F14_0%,#4A3520_100%)]"
      />

      {/* Ghost watermark "04" */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-12 md:top-0 text-center font-display font-light text-soleil/[0.05] text-[28vw] leading-none select-none"
      >
        04
      </span>

      <div className="container-edit relative">
        <SectionReveal className="text-center max-w-3xl mx-auto">
          <p className="font-body font-normal text-soleil/80 text-[0.75rem] tracking-[0.25em] uppercase mb-5">
            · The Investment Thesis
          </p>
          <span className="block h-px w-12 bg-soleil/55 mx-auto mb-10" />
          <h2 className="font-display italic font-light text-parchment text-[clamp(2rem,4vw,4rem)] leading-[1.1] tracking-[-0.02em]">
            <span className="block">Wealth Preservation through</span>
            <span className="block">Ecological Scarcity.</span>
          </h2>

          <p className="mt-12 font-body font-light text-parchment/80 text-[1rem] leading-[1.9] max-w-[640px] mx-auto">
            In the coming decades, land with secure, clean, natural water will
            be the ultimate luxury asset. With only 18 exclusive estate plots
            available, Udyana is a finite opportunity to secure a nature-based
            wealth asset that will appreciate as the surrounding ecosystem
            matures.
          </p>
        </SectionReveal>

        <StaggerGroup className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 max-w-4xl mx-auto">
          {STATS.map((s) => (
            <StaggerItem
              key={s.label}
              className="text-center md:border-r md:last:border-r-0 border-soleil/15 px-4"
            >
              <p className="font-display font-light text-parchment text-[clamp(3rem,6vw,5rem)] leading-none">
                {s.value}
              </p>
              <p className="mt-4 font-body font-normal text-soleil/80 text-[0.75rem] tracking-[0.25em] uppercase">
                · {s.label}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <SectionReveal className="mt-24 flex justify-center">
          <div className="w-full max-w-[440px] border border-soleil/55 rounded-sm p-12 text-center bg-bark/40 backdrop-blur-sm shadow-[0_0_60px_rgba(232,166,66,0.10)]">
            <p className="font-body font-normal text-soleil text-[0.75rem] tracking-[0.25em] uppercase mb-6">
              · Starting Investment
            </p>
            <p className="font-display font-light text-parchment text-[clamp(2.75rem,5vw,4rem)] leading-none">
              ₹75 Lakhs
            </p>
            <p className="mt-5 font-body font-light text-parchment/80 text-[0.88rem] leading-relaxed">
              For a 6,000 Sq.Ft. Lakefront Estate Plot
            </p>
            <p className="mt-6 font-body font-light text-parchment/45 text-[0.72rem] tracking-wide">
              Price subject to escalation. Limited plots remaining.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
