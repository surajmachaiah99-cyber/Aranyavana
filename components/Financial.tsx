import SectionReveal from '@/components/SectionReveal';
import { StaggerGroup, StaggerItem } from '@/components/Stagger';

const TOTAL_PLOTS = 18;
const TAKEN_PLOTS = 12;

const STATS: Array<{ value: string; label: string }> = [
  { value: '18', label: 'Estate Plots Total' },
  { value: '15 Acres', label: 'Natural Lake' },
  { value: '1 km', label: 'From NH 75' },
];

export default function Financial() {
  const plots = Array.from({ length: TOTAL_PLOTS }, (_, i) => i < TAKEN_PLOTS);
  const remaining = TOTAL_PLOTS - TAKEN_PLOTS;

  return (
    <section
      id="investment"
      className="relative py-36 md:py-48 overflow-hidden bg-[#1a221b]"
    >
      {/* Deep forest backdrop with radial light source */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,#3a4a3a_0%,#23302a_38%,#16201a_70%,#0e1612_100%)]" />
      {/* Subtle vignette top */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-earth to-transparent" />
      {/* Subtle vignette bottom */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-earth to-transparent" />

      {/* Ghost "04" watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-8 text-center font-display font-light text-cream/[0.045] text-[28vw] leading-none select-none"
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
            be the ultimate luxury asset. With only 18 exclusive estate plots
            available, Udyana is a finite opportunity to secure a nature-based
            wealth asset that will appreciate as the surrounding ecosystem
            matures.
          </p>
        </SectionReveal>

        {/* Scarcity grid */}
        <SectionReveal
          className="mt-20 flex flex-col items-center"
          delay={0.1}
        >
          <p className="font-sc text-sand/85 text-[0.7rem] tracking-widest2 mb-8">
            · Plot Availability
          </p>

          <div
            className="grid grid-cols-9 gap-3 sm:gap-4"
            role="img"
            aria-label={`${TAKEN_PLOTS} of ${TOTAL_PLOTS} estate plots taken; ${remaining} available.`}
          >
            {plots.map((taken, i) => (
              <span
                key={i}
                className={`block h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full transition-all duration-700 ${
                  taken
                    ? 'bg-bark/70 ring-1 ring-bark/40'
                    : 'bg-transparent ring-2 ring-sand shadow-[0_0_18px_-2px_rgba(196,168,130,0.7)]'
                }`}
              />
            ))}
          </div>

          <div className="mt-8 flex items-center gap-8 font-sc text-[0.65rem] tracking-widest2">
            <span className="inline-flex items-center gap-2 text-mist/55">
              <span className="block h-2 w-2 rounded-full bg-bark/70 ring-1 ring-bark/40" />
              {TAKEN_PLOTS} TAKEN
            </span>
            <span className="inline-flex items-center gap-2 text-sand">
              <span className="block h-2 w-2 rounded-full ring-2 ring-sand" />
              {remaining} AVAILABLE
            </span>
          </div>
        </SectionReveal>

        <StaggerGroup className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 max-w-4xl mx-auto">
          {STATS.map((s) => (
            <StaggerItem
              key={s.label}
              className="text-center md:border-r md:last:border-r-0 border-leaf/30 px-4"
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

        <SectionReveal className="mt-24 flex justify-center">
          <div className="w-full max-w-[460px] border border-sand/55 p-12 text-center bg-earth/40 backdrop-blur-sm">
            <p className="font-sc text-sand text-[0.72rem] tracking-widest2 mb-6">
              · Starting Investment
            </p>
            <p className="font-display font-light text-cream text-[clamp(2.75rem,5vw,4rem)] leading-none">
              ₹75 Lakhs
            </p>
            <p className="mt-5 font-body font-light text-sky text-[0.88rem] leading-relaxed">
              For a 6,000 Sq.Ft. Lakefront Estate Plot
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
