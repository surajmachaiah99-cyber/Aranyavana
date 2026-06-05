import SectionReveal from '@/components/SectionReveal';

type Material = {
  name: string;
  quality: string;
  /** CSS gradient that visually represents the material. */
  swatch: string;
  /** Single-word edge tone for the ring around the swatch. */
  ring: string;
};

const MATERIALS: Material[] = [
  {
    name: 'Compressed Stabilised Earth Blocks',
    quality: 'CSEB · Structural Core',
    swatch:
      'linear-gradient(135deg,#7a5a3e 0%,#a07c54 35%,#8a6442 60%,#6b4e36 100%)',
    ring: 'rgba(160,124,84,0.55)',
  },
  {
    name: 'Natural Stone Cladding',
    quality: 'Site-Sourced · Tactile',
    swatch:
      'linear-gradient(135deg,#3f3a35 0%,#615850 30%,#8c8278 55%,#4a443e 100%)',
    ring: 'rgba(140,130,120,0.5)',
  },
  {
    name: 'Lime Plaster',
    quality: 'Breathable · Ageless',
    swatch:
      'linear-gradient(135deg,#ebe4d2 0%,#d8cdb3 40%,#c2b699 70%,#b5a98a 100%)',
    ring: 'rgba(216,205,179,0.55)',
  },
  {
    name: 'Timber',
    quality: 'Responsibly Harvested',
    swatch:
      'linear-gradient(120deg,#5a3a22 0%,#7d5230 30%,#a4703f 55%,#6b4222 80%,#4a2c16 100%)',
    ring: 'rgba(164,112,63,0.55)',
  },
  {
    name: 'Clay Roof Tiles',
    quality: 'Thermal Mass · Vernacular',
    swatch:
      'linear-gradient(135deg,#7e2f1e 0%,#a64327 30%,#cb5a32 55%,#822f1c 90%)',
    ring: 'rgba(166,67,39,0.55)',
  },
];

const PRINCIPLES = [
  'Deep Verandas',
  'Open Courtyards',
  'Firepit Zones',
  'Lake Views',
  'Natural Ventilation',
  'Indoor–Outdoor Living',
];

export default function Architectural() {
  return (
    <section id="architecture" className="bg-earth py-32 md:py-44">
      <div className="container-edit grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionReveal>
              <div
                className="relative aspect-[4/5] w-full overflow-hidden bg-stone"
                role="img"
                aria-label="Tropical Modern Architecture — Udyana"
              >
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#3a3833_0%,#4a4035_45%,#2e2b27_100%)]" />
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_60%_40%,#7b9e9b40_0%,transparent_60%)]" />
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 flex flex-col">
                  <span className="rule mb-5" />
                  <p className="font-sc text-sand text-[0.7rem] tracking-widest2">
                    · Material Study
                  </p>
                  <p className="mt-3 font-display italic font-light text-cream text-[1.45rem] leading-snug">
                    Tropical Modern Architecture · Udyana
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionReveal>
            <p className="font-sc text-sand text-[0.7rem] tracking-widest2 mb-5">
              03
            </p>
            <span className="rule mb-10" />
            <h2 className="font-display font-light text-cream text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
              Homes That Breathe.
            </h2>

            <p className="mt-10 font-body font-light text-sky text-[1.02rem] leading-[1.9] max-w-[560px]">
              To protect the long-term aesthetic value and environmental
              integrity of Udyana, the community mandates a Tropical Modern
              design language. We champion homes built with natural, raw
              materials that age gracefully alongside the forest.
            </p>

            <div className="mt-16">
              <p className="font-sc text-sand text-[0.7rem] tracking-widest2 mb-6">
                · The Material Palette
              </p>

              <ul className="border-t border-bark/45">
                {MATERIALS.map((m) => (
                  <li
                    key={m.name}
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 sm:gap-8 py-6 border-b border-bark/45"
                  >
                    {/* Swatch */}
                    <span
                      aria-hidden="true"
                      className="block h-12 w-12 sm:h-14 sm:w-14 rounded-sm shadow-[0_2px_18px_-6px_rgba(0,0,0,0.6)] ring-1"
                      style={{
                        backgroundImage: m.swatch,
                        // Tailwind can't do dynamic ring colors, so inline.
                        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                        ...({ '--tw-ring-color': m.ring } as React.CSSProperties),
                      }}
                    />

                    <span className="font-display font-light text-cream text-[1.15rem] sm:text-[1.25rem] leading-snug">
                      {m.name}
                    </span>

                    <span className="font-sc text-mist/55 text-[0.7rem] tracking-widest2 text-right whitespace-nowrap hidden sm:inline">
                      {m.quality}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-16 font-body font-light text-sky text-[1.02rem] leading-[1.9] max-w-[560px]">
              Every estate blueprint prioritises deep verandas, central open
              courtyards, and dedicated lakeside firepit zones — turning the
              daily ritual of watching the sun set over the water into the
              centre of home life.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {PRINCIPLES.map((p) => (
                <span key={p} className="pill">
                  {p}
                </span>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
