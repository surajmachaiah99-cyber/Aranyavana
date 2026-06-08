import SectionReveal from '@/components/SectionReveal';
import { StaggerGroup, StaggerItem } from '@/components/Stagger';
import { GroveIcon, HorizonIcon, WaveIcon } from '@/components/icons';
import type { ReactNode } from 'react';

type Card = {
  number: string;
  title: string;
  body: string;
  pill: string;
  iconColor: string;
  Icon: () => ReactNode;
};

const CARDS: Card[] = [
  {
    number: '01',
    title: 'The 15-Acre Living Lake',
    body: 'Not a peripheral amenity, but the organizing intelligence of the community. A secure, natural water resource that guarantees environmental permanence for your family.',
    pill: '· Water Security',
    iconColor: 'text-cerulean',
    Icon: () => <WaveIcon />,
  },
  {
    number: '02',
    title: 'The 1km Transition',
    body: 'Situated exactly 1 kilometer from the Bangalore–Mangalore Highway. A brief, scenic drive acts as a decompression chamber — the city gives you success; nature gives you peace.',
    pill: '· Highway Proximity',
    iconColor: 'text-soleil',
    Icon: () => <HorizonIcon />,
  },
  {
    number: '03',
    title: 'The 6,000 Sq.Ft. Sanctum',
    body: 'Expansive, low-density estate plots engineered to protect your privacy and optimize wind, light, and open skies.',
    pill: '· Estate Scale',
    iconColor: 'text-canopy',
    Icon: () => <GroveIcon />,
  },
];

export default function CoreAssets() {
  return (
    <section id="assets" className="relative bg-paper py-32 md:py-40">
      {/* Soft parchment fade so the section settles into the next */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(160deg,#FAF6EF_0%,#F0E8D8_100%)]"
      />

      <div className="container-edit relative">
        <SectionReveal className="max-w-3xl">
          <p className="eyebrow mb-5">· The Offering</p>
          <span className="rule mb-10" />
          <h2 className="font-display font-light text-bark text-[clamp(2rem,4vw,4rem)] leading-[1.1] tracking-[-0.02em]">
            Three Reasons This Land Is Finite
          </h2>
        </SectionReveal>

        <StaggerGroup className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7">
          {CARDS.map((c) => (
            <StaggerItem
              key={c.number}
              className="group relative flex flex-col p-12 border border-bark/10 bg-paper rounded-sm shadow-[0_4px_16px_rgba(42,31,20,0.06)] transition-all duration-[300ms] ease-editorial hover:border-soleil/40 hover:shadow-[0_12px_40px_rgba(232,166,66,0.18)] hover:-translate-y-1"
            >
              <p className="font-body font-normal text-clay/80 text-[0.75rem] tracking-[0.25em] uppercase mb-10">
                {c.number}
              </p>

              <div className={`mb-8 ${c.iconColor}`}>
                <c.Icon />
              </div>

              <h3 className="font-display font-normal text-bark text-[clamp(1.25rem,2vw,1.75rem)] leading-tight mb-5">
                {c.title}
              </h3>

              <p className="font-body font-light text-soil/80 text-[0.95rem] leading-[1.9] mb-10">
                {c.body}
              </p>

              <span className="mt-auto pill self-start">{c.pill}</span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
