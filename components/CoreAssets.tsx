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
    title: 'The 60-Acre Living Lake',
    body: 'Not a peripheral amenity, but the organizing intelligence of the community. A secure, natural water resource that guarantees environmental permanence for your family.',
    pill: '· Water Security',
    iconColor: 'text-water',
    Icon: () => <WaveIcon />,
  },
  {
    number: '02',
    title: 'The 1km Transition',
    body: 'Situated exactly 1 kilometer from the Bangalore–Mangalore Highway. A brief, scenic drive acts as a decompression chamber — the city gives you success; nature gives you peace.',
    pill: '· Highway Proximity',
    iconColor: 'text-sand',
    Icon: () => <HorizonIcon />,
  },
  {
    number: '03',
    title: 'The Biosphere',
    body: "An expansive, low-density ecosystem engineered to let the land come alive. Anchored by a sixty-acre perennial lake — four times the footprint of the estate itself — this biosphere commands its own weather. Wind corridors sweep off the water, migratory bird pathways converge on the shoreline, and the local microclimate is held in permanent equilibrium by sheer ecological mass. Your estate plot isn't just surrounded by nature — it is a vital organ within a self-sustaining, thriving biological sanctuary.",
    pill: '· Living Ecosystem',
    iconColor: 'text-leaf',
    Icon: () => <GroveIcon />,
  },
];

export default function CoreAssets() {
  return (
    <section id="assets" className="bg-stone py-32 md:py-40 relative">
      <div className="container-edit">
        <SectionReveal className="max-w-3xl">
          <p className="eyebrow mb-5">· The Offering</p>
          <span className="rule mb-10" />
          <h2 className="font-display font-light text-cream text-[clamp(2rem,4vw,3.25rem)] leading-[1.05]">
            Three Reasons This Land Is Finite
          </h2>
        </SectionReveal>

        <StaggerGroup className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7">
          {CARDS.map((c) => (
            <StaggerItem
              key={c.number}
              className="group relative flex flex-col p-12 border border-bark/70 bg-earth/40 transition-all duration-700 ease-editorial hover:border-sand/50 hover:shadow-[0_30px_80px_-30px_rgba(196,168,130,0.18)] hover:-translate-y-1"
            >
              <p className="font-sc text-sand/80 text-[0.7rem] tracking-widest2 mb-10">
                {c.number}
              </p>

              <div className={`mb-8 ${c.iconColor}`}>
                <c.Icon />
              </div>

              <h3 className="font-display font-light text-cream text-[1.6rem] leading-tight mb-5">
                {c.title}
              </h3>

              <p className="font-body font-light text-sky/85 text-[0.95rem] leading-[1.85] mb-10">
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
