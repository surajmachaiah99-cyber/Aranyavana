import { SITE } from '@/lib/site';

/**
 * FloatingWhatsApp — small, circular, restrained.
 *
 * Positioned bottom-right, uses the site's `sand` accent (never
 * WhatsApp green) so it reads as part of Aranyavana's visual system
 * rather than a bolted-on marketing widget. Opens a wa.me link in a
 * new tab with a prefilled message pointing at Udyana.
 */
export default function FloatingWhatsApp() {
  return (
    <a
      href={SITE.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message us on WhatsApp — ${SITE.phone}`}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-sand text-earth shadow-lg shadow-earth/40 ring-1 ring-earth/30 transition-transform duration-500 ease-editorial hover:scale-110 hover:bg-mist"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-6 w-6 md:h-7 md:w-7"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 2.05C6.5 2.05 2 6.55 2 12.1c0 1.762.464 3.484 1.345 5.001L2 22.05l5.061-1.331A10.05 10.05 0 0012.05 22.15c5.55 0 10.05-4.5 10.05-10.05S17.6 2.05 12.05 2.05z" />
      </svg>
    </a>
  );
}
