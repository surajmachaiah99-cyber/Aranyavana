import Link from 'next/link';
import Footer from '@/components/Footer';
import { SITE } from '@/lib/site';

/**
 * Shared shell for /privacy and /legal.
 *
 * Centred single column, ~68ch reading measure, generous vertical
 * whitespace. Header carries only the ARANYAVANA wordmark linking
 * home; the sitewide Footer sits at the bottom. Content inside the
 * `<article>` is wrapped in `.legal-prose` (see app/globals.css) so
 * H2/H3/P/UL/EM/STRONG inherit the site's editorial voice without
 * every element needing per-element Tailwind classes.
 */
export default function LegalPageLayout({
  eyebrow,
  title,
  lastUpdated,
  children,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-bark/40 bg-earth">
        <div className="container-edit py-8 md:py-10 flex items-center justify-center">
          <Link
            href="/"
            className="group flex flex-col items-center gap-1 text-[#D1C2A5] hover:text-[#E5D9C4] transition-colors duration-500"
            aria-label={`${SITE.brand} — home`}
          >
            <span className="font-sc text-xl md:text-2xl tracking-widest3 leading-none">
              ARANYAVANA
            </span>
            <span className="font-display italic font-light text-[0.7rem] md:text-[0.78rem] text-[#D1C2A5]/60 tracking-[0.05em] leading-none group-hover:text-[#E5D9C4]/75 transition-colors">
              Curated Nature Living
            </span>
          </Link>
        </div>
      </header>

      <main className="bg-earth py-24 md:py-36">
        <article className="container-edit max-w-[68ch]">
          <p className="eyebrow mb-5">{eyebrow}</p>
          <span className="rule mb-10 block" />
          <h1 className="font-display italic font-light text-cream text-[clamp(2rem,4vw,3.25rem)] leading-[1.1]">
            {title}
          </h1>

          <div className="mt-14 legal-prose">{children}</div>

          <p className="mt-20 pt-8 border-t border-bark/50 font-sc text-mist/45 text-[0.68rem] tracking-widest2">
            Last updated · {lastUpdated}
          </p>
        </article>
      </main>

      <Footer />
    </>
  );
}
