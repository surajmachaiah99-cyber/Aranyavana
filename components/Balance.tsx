import SectionReveal from '@/components/SectionReveal';
import { StaggerGroup, StaggerItem } from '@/components/Stagger';

export default function Balance() {
  return (
    <section
      id="balance"
      className="relative bg-stone py-32 md:py-44 overflow-hidden"
    >
      <div className="container-edit relative">
        <SectionReveal className="text-center max-w-3xl mx-auto">
          <p className="eyebrow mb-5">· The Architecture of Balance</p>
          <span className="rule mx-auto mb-10" />
          <h2 className="font-display italic font-light text-cream text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.05]">
            <span className="block">A Profound 1:4</span>
            <span className="block">Ecological Advantage.</span>
          </h2>
          <p className="mt-8 font-display italic font-light text-mist/85 text-[clamp(1.05rem,1.8vw,1.4rem)] leading-snug">
            <span className="block">60 Acres of Living Lake.</span>
            <span className="block">15 Acres of Forest Sanctuary.</span>
          </p>
          <p className="mt-10 font-body font-light text-sky/90 text-[1.02rem] leading-[1.95] max-w-[640px] mx-auto">
            We do not build over the land; we yield to it. By pairing an
            exclusive, low-density gated estate of fifteen acres with a vast,
            sixty-acre perennial lake — a water body four times its size — we
            ensure your legacy home is forever anchored by one of the most
            ecologically dominant landscapes in the region. This is not
            symmetry. This is supremacy of nature over concrete.
          </p>
        </SectionReveal>

        <StaggerGroup className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          <StaggerItem className="md:col-span-7">
            <figure className="relative overflow-hidden bg-earth/40 aspect-[16/9] md:aspect-auto md:h-[66vh] md:max-h-[640px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/balance-lake.jpg"
                alt="The 60-acre Living Lake — a vast, thriving freshwater ecosystem fringed with lily pads and palms"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </figure>
          </StaggerItem>

          <StaggerItem className="md:col-span-5">
            <figure className="relative overflow-hidden bg-earth/40 aspect-[3/4] md:aspect-auto md:h-[66vh] md:max-h-[640px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/balance-avenue.jpg"
                alt="A tree-lined red earth avenue threading through the forest sanctuary"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </figure>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
