import SectionReveal from '@/components/SectionReveal';
import { StaggerGroup, StaggerItem } from '@/components/Stagger';
import { SITE } from '@/lib/site';

const STATS: Array<{ value: string; label: string }> = [
  { value: `${SITE.inventory.estateAcres} Acres`, label: 'Gated Eco-Community' },
  { value: `${SITE.inventory.lakeAcres} Acres`, label: 'Living Lake' },
  { value: SITE.inventory.ratio, label: 'Land-to-Water Ratio' },
];

export default function Financial() {
  return (
    <section id="investment" className="relative bg-stone py-32 md:py-44 overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-12 md:top-0 text-center font-display font-light text-cream/[0.05] text-[28vw] leading-none select-none"
      >
        04
      </span>

      <div className="container-edit relative">
        <SectionReveal className="text-center max-w-3xl mx-auto">
          <p className="eyebrow mb-5">· The Investment Thesis</p>
          <span className="rule mx-auto mb-10" />
          <h2 className="font-display italic font-light text-cream text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.05]">
            <span className="block">Wealth Preservation through</span>
            <span className="block">Ecological Scarcity.</span>
          </h2>

          <p className="mt-12 font-body font-light text-sky/90 text-[1.02rem] leading-[1.95] max-w-[640px] mx-auto">
            In the coming decades, land with secure, clean, natural water will
            be the ultimate luxury asset. Udyana comprises{' '}
            {SITE.inventory.totalPlots} estate plots across{' '}
            {SITE.inventory.estateAcres} acres.{' '}
            {SITE.inventory.remainingPlots} remain available — a finite window
            to secure a nature-based wealth asset that will appreciate as the
            surrounding ecosystem matures.
          </p>
        </SectionReveal>

        <StaggerGroup className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 max-w-4xl mx-auto">
          {STATS.map((s) => (
            <StaggerItem
              key={s.label}
              className="text-center md:border-r md:last:border-r-0 border-bark/50 px-4"
            >
              <p className="font-display font-light text-cream text-[clamp(3rem,6vw,5rem)] leading-none">
                {s.value}
              </p>
              <p className="mt-4 font-sc text-sand/85 text-[0.72rem] tracking-widest2">
                · {s.label}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Acreage breakdown — makes the plot/lot arithmetic transparent so
            a sharp reader doesn't have to reconcile 15 acres against 69
            plots on their own. */}
        <SectionReveal className="mt-12 text-center">
          <p className="font-sc text-sand/70 text-[0.72rem] tracking-widest2 max-w-2xl mx-auto leading-relaxed">
            {SITE.inventory.totalPlots} plots · approx.{' '}
            {SITE.inventory.plotSizeDisplay} each · the balance of the{' '}
            {SITE.inventory.estateAcres} acres held as roads, commons, and
            permanent green buffer
          </p>
        </SectionReveal>

        {/* Scarcity counter — honest, no urgency theatre. Numbers and the
            "Updated" label read from SITE.inventory; update them there when
            a plot actually sells. See lib/site.ts. */}
        <SectionReveal className="mt-5 text-center">
          <p className="font-sc text-sand text-[0.72rem] tracking-widest2">
            · {SITE.inventory.remainingPlots} of{' '}
            {SITE.inventory.totalPlots} estate plots remain · Updated{' '}
            {SITE.inventory.updatedLabel}
          </p>
        </SectionReveal>

        <SectionReveal className="mt-20 flex justify-center">
          <div className="w-full max-w-[440px] border border-sand/55 p-12 text-center bg-earth/30 backdrop-blur-sm">
            <p className="font-sc text-sand text-[0.72rem] tracking-widest2 mb-6">
              · Starting Investment
            </p>
            <p className="font-display font-light text-cream text-[clamp(2.75rem,5vw,4rem)] leading-none">
              ₹75 Lakhs
            </p>
            <p className="mt-5 font-body font-light text-sky text-[0.88rem] leading-relaxed">
              For a {SITE.inventory.plotSizeDisplay} Lakefront Estate Plot
            </p>
            <p className="mt-6 font-body font-light text-mist/45 text-[0.72rem] tracking-wide">
              Price subject to escalation. Limited plots remaining.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
