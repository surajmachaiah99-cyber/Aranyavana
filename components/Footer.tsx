import Link from 'next/link';
import { SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="bg-earth border-t border-sand/25">
      <div className="container-edit py-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        <div>
          <p className="font-sc text-mist text-[0.85rem] tracking-widest2">
            ARANYAVANA
          </p>
          <p className="mt-3 font-sc text-sand/85 text-[0.72rem] tracking-widest2">
            Own Nature. Build Legacy.
          </p>
        </div>

        <div className="md:text-center">
          <p className="font-body font-light text-mist/80 text-[0.9rem]">
            {SITE.product} by {SITE.brand} · {SITE.location}
          </p>
          <p className="mt-2 font-body font-light text-mist/45 text-[0.78rem]">
            {SITE.email}
          </p>
          <p className="mt-1 font-body font-light text-mist/45 text-[0.78rem]">
            <a href={`tel:${SITE.phoneRaw}`} className="hover:text-mist transition-colors">
              {SITE.phone}
            </a>
          </p>
          <p className="mt-1 font-body font-light text-mist/45 text-[0.78rem]">
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Aranyavana on Instagram — ${SITE.instagramHandle}`}
              className="hover:text-mist transition-colors"
            >
              {SITE.instagramHandle}
            </a>
          </p>
        </div>

        <div className="md:text-right space-y-2">
          <p className="font-body font-light text-mist/60 text-[0.78rem]">
            © {new Date().getFullYear()} {SITE.legalName}
          </p>
          <p className="font-body font-light text-mist/45 text-[0.72rem]">
            All Rights Reserved
          </p>
          <p className="mt-3 font-sc text-mist/45 text-[0.68rem] tracking-widest2">
            <Link href="/privacy" className="hover:text-mist transition-colors">
              Privacy
            </Link>
            <span className="mx-2 text-mist/25">·</span>
            <Link href="/legal" className="hover:text-mist transition-colors">
              Legal
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
