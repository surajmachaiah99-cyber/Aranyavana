import SectionReveal from '@/components/SectionReveal';

const MATERIALS: Array<[string, string]> = [
  ['Compressed Stabilised Earth Blocks', 'CSEB · Structural Core'],
  ['Natural Stone Cladding', 'Site-Sourced · Tactile'],
  ['Lime Plaster', 'Breathable · Ageless'],
  ['Timber', 'Responsibly Harvested'],
  ['Clay Roof Tiles', 'Thermal Mass · Vernacular'],
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
    <section id="architecture" className="bg-earth py-32 md:py-40">
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

            <div className="mt-14">
              <p className="font-sc text-sand text-[0.7rem] tracking-widest2 mb-6">
                · The Material Palette
              </p>
              <ul className="divide-y divide-bark/50 border-y border-bark/50">
                {MATERIALS.map(([material, quality]) => (
                  <li
                    key={material}
                    className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 sm:gap-8 py-5"
                  >
                    <span className="font-display font-light text-cream text-[1.2rem]">
                      {material}
                    </span>
                    <span className="font-body font-light text-mist/60 text-[0.78rem] tracking-wider uppercase self-end sm:self-center">
                      {quality}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-14 font-body font-light text-sky text-[1.02rem] leading-[1.9] max-w-[560px]">
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
