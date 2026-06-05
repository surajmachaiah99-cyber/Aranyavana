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
            Udyana · Kudlur, Solur, Karnataka
          </p>
          <p className="mt-2 font-body font-light text-mist/45 text-[0.78rem]">
            hello@aranyavana.com
          </p>
        </div>

        <div className="md:text-right space-y-2">
          <p className="font-body font-light text-mist/60 text-[0.78rem]">
            © 2025 Aranyavana Infra Developers LLP
          </p>
          <p className="font-body font-light text-mist/45 text-[0.72rem]">
            All Rights Reserved
          </p>
          <p className="font-sc text-sand/65 text-[0.65rem] tracking-widest2">
            · RERA Registration Pending
          </p>
        </div>
      </div>
    </footer>
  );
}
