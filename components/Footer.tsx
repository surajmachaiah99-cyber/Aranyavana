export default function Footer() {
  return (
    <footer className="bg-bark border-t border-soleil/25">
      <div className="container-edit py-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        <div>
          <p className="font-body text-parchment text-[0.85rem] tracking-[0.3em] uppercase">
            ARANYAVANA
          </p>
          <p className="mt-3 font-display italic font-light text-soleil/85 text-[0.95rem] tracking-wide">
            Own Nature. Build Legacy.
          </p>
        </div>

        <div className="md:text-center">
          <p className="font-body font-light text-parchment/80 text-[0.9rem]">
            Udyana · The Lake Retreat Solur, Nelamangala
          </p>
          <p className="mt-2 font-body font-light text-parchment/45 text-[0.78rem]">
            hello@aranyavana.com
          </p>
        </div>

        <div className="md:text-right space-y-2">
          <p className="font-body font-light text-parchment/60 text-[0.78rem]">
            © 2025 Aranyavana Infra Developers LLP
          </p>
          <p className="font-body font-light text-parchment/45 text-[0.72rem]">
            All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
