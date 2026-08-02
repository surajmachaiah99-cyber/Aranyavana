import SectionReveal from '@/components/SectionReveal';
import EnquiryFormCard from '@/components/EnquiryFormCard';

/**
 * EnquiryForm — the homepage's Private Briefing section.
 *
 * Renders the section wrapper + eyebrow + headline + bullet list on
 * the left, and delegates the actual form to EnquiryFormCard on the
 * right. The card is a client component; keeping this outer shell as
 * a server component means the marketing copy is rendered at build
 * time and the client bundle stays limited to the form itself.
 */
export default function EnquiryForm() {
  return (
    <section id="enquiry" className="bg-earth py-32 md:py-44">
      <div className="container-edit grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        <SectionReveal className="lg:col-span-5">
          <p className="eyebrow mb-5">· Private Briefing</p>
          <span className="rule mb-10" />
          <h2 className="font-display font-light text-cream text-[clamp(2rem,4vw,3.25rem)] leading-[1.05]">
            Begin Your Conversation with the Land.
          </h2>
          <p className="mt-10 font-body font-light text-sky text-[1.02rem] leading-[1.9] max-w-md">
            Udyana is available by private appointment only. Complete the form
            to receive a personal briefing from our estate advisors.
          </p>

          <ul className="mt-12 space-y-4">
            {[
              '· Private Site Tours Available',
              '· Detailed Investment Dossier',
              '· Masterplan Walkthrough',
            ].map((item) => (
              <li
                key={item}
                className="font-sc text-sand/85 text-[0.78rem] tracking-widest2"
              >
                {item}
              </li>
            ))}
          </ul>
        </SectionReveal>

        <SectionReveal className="lg:col-span-7" delay={0.15}>
          <EnquiryFormCard />
        </SectionReveal>
      </div>
    </section>
  );
}
