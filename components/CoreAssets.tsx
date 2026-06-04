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
    title: 'The 6,000 Sq.Ft. Sanctum',
    body: 'Expansive, low-density estate plots engineered to protect your privacy and optimize wind, light, and open skies.',
    pill: '· Estate Scale',
    iconColor: 'text-leaf',
    Icon: () => <GroveIcon />,
  },
];

export default function CoreAssets() {
  return (
    <section id="assets" className="bg-[#0e0d0b] py-32 md:py-44 relative">
      <div className="container-edit">
        <SectionReveal className="max-w-3xl">
          <p className="eyebrow mb-5">· The Offering</p>
          <span className="rule mb-10" />
          <h2 className="font-display font-light text-cream text-[clamp(2rem,4vw,3.25rem)] leading-[1.05]">
            Three Reasons This Land Is Finite
          </h2>
        </SectionReveal>

        <StaggerGroup className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {CARDS.map((c) => (
            <StaggerItem
              key={c.number}
              className="group relative flex flex-col overflow-hidden p-12 lg:p-14 border border-bark/50 bg-earth/40 transition-all duration-700 ease-editorial hover:border-sand/55 hover:bg-earth/70"
            >
              {/* Ghost number watermark */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-6 -right-2 font-display font-light text-cream/[0.045] text-[12rem] leading-none select-none transition-opacity duration-700 group-hover:text-sand/[0.08]"
              >
                {c.number}
              </span>

              {/* Hover gold underline */}
              <span
                aria-hidden="true"
                className="absolute left-12 lg:left-14 top-0 h-px w-12 bg-sand/0 transition-all duration-700 group-hover:bg-sand/80 group-hover:w-24"
              />

              <p className="relative font-sc text-sand/85 text-[0.7rem] tracking-widest2 mb-10">
                · {c.number}
              </p>

              <div
                className={`relative mb-10 transition-transform duration-700 ease-editorial group-hover:-translate-y-1 ${c.iconColor}`}
              >
                <c.Icon />
              </div>

              <h3 className="relative font-display font-light text-cream text-[1.65rem] leading-tight mb-6">
                {c.title}
              </h3>

              <p className="relative font-body font-light text-sky/80 text-[0.95rem] leading-[1.9] mb-10">
                {c.body}
              </p>

              <span className="relative mt-auto pill self-start">
                {c.pill}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
