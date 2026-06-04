/**
 * HeroScene — fully CSS-rendered dawn-lake scene.
 * Layers, back to front:
 *  1. Sky gradient (deep earth → muted dawn rose → mist horizon)
 *  2. Glowing sun/moon orb with soft bloom
 *  3. Distant tree silhouettes (SVG, near-black)
 *  4. Animated golden horizon line
 *  5. Water surface gradient with mirrored tree reflection
 *  6. Three drifting mist layers (animated)
 *  7. Vignette
 */
export default function HeroScene() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Sky */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#16140f_0%,#231f1a_28%,#3a2f28_52%,#5a4338_64%,#7d5c48_70%,#3a3328_74%,#1c1a17_100%)]" />

      {/* Glowing orb */}
      <div className="absolute left-[58%] top-[44%] -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-[clamp(120px,14vw,220px)] w-[clamp(120px,14vw,220px)]">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,#f5e6c8_0%,#e7c890_40%,#c4a882_70%,transparent_75%)] blur-[3px]" />
          <div className="absolute -inset-[120%] rounded-full bg-[radial-gradient(circle,rgba(245,230,200,0.18)_0%,rgba(196,168,130,0.08)_30%,transparent_60%)]" />
          <div className="absolute -inset-[60%] rounded-full bg-[radial-gradient(circle,rgba(245,230,200,0.25)_0%,transparent_55%)]" />
        </div>
      </div>

      {/* Distant tree silhouette ridge */}
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        className="absolute left-0 right-0 top-[68%] h-[18%] w-full text-earth"
      >
        <path
          fill="currentColor"
          d="M0,220 L0,140 L40,120 L60,135 L80,90 L92,108 L110,82 L122,98 L140,70 L156,92 L178,60 L195,82 L212,68 L228,90 L250,55 L272,80 L292,72 L310,98 L334,70 L355,92 L376,76 L398,100 L422,84 L444,102 L466,72 L490,96 L514,80 L536,104 L560,72 L584,96 L608,82 L632,108 L656,86 L680,104 L702,78 L726,100 L750,72 L774,94 L798,82 L820,102 L844,78 L866,98 L888,82 L912,108 L934,86 L956,108 L978,78 L1000,100 L1024,84 L1046,106 L1068,82 L1090,104 L1112,76 L1134,98 L1156,82 L1178,108 L1200,86 L1222,110 L1244,82 L1266,104 L1288,86 L1310,108 L1332,80 L1356,100 L1380,82 L1402,108 L1424,86 L1440,104 L1440,220 Z"
        />
      </svg>

      {/* Animated golden horizon line */}
      <div className="absolute left-0 right-0 top-[78%] h-px overflow-hidden">
        <div className="h-full w-full bg-[linear-gradient(90deg,transparent_0%,rgba(196,168,130,0.85)_30%,rgba(245,230,200,1)_50%,rgba(196,168,130,0.85)_70%,transparent_100%)] [animation:horizonShimmer_8s_ease-in-out_infinite]" />
      </div>

      {/* Water surface */}
      <div className="absolute left-0 right-0 top-[78%] bottom-0 bg-[linear-gradient(180deg,#2a2520_0%,#1f1c18_30%,#16140f_100%)]" />

      {/* Orb reflection on water */}
      <div className="absolute left-[58%] top-[80%] h-[clamp(60px,8vw,120px)] w-[clamp(120px,14vw,220px)] -translate-x-1/2 opacity-50">
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_center_top,rgba(245,230,200,0.45)_0%,rgba(196,168,130,0.2)_30%,transparent_70%)] blur-[2px]" />
      </div>

      {/* Vertical light streak on water */}
      <div className="absolute left-[58%] top-[78%] bottom-0 w-[clamp(20px,3vw,60px)] -translate-x-1/2 opacity-40 bg-[linear-gradient(180deg,rgba(245,230,200,0.5)_0%,transparent_100%)] blur-sm" />

      {/* Tree reflection (flipped) */}
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        className="absolute left-0 right-0 top-[78%] h-[10%] w-full text-earth opacity-50 scale-y-[-1]"
      >
        <path
          fill="currentColor"
          d="M0,220 L0,140 L40,120 L60,135 L80,90 L92,108 L110,82 L122,98 L140,70 L156,92 L178,60 L195,82 L212,68 L228,90 L250,55 L272,80 L292,72 L310,98 L334,70 L355,92 L376,76 L398,100 L422,84 L444,102 L466,72 L490,96 L514,80 L536,104 L560,72 L584,96 L608,82 L632,108 L656,86 L680,104 L702,78 L726,100 L750,72 L774,94 L798,82 L820,102 L844,78 L866,98 L888,82 L912,108 L934,86 L956,108 L978,78 L1000,100 L1024,84 L1046,106 L1068,82 L1090,104 L1112,76 L1134,98 L1156,82 L1178,108 L1200,86 L1222,110 L1244,82 L1266,104 L1288,86 L1310,108 L1332,80 L1356,100 L1380,82 L1402,108 L1424,86 L1440,104 L1440,220 Z"
        />
      </svg>

      {/* Drifting mist — three layers at different speeds */}
      <div className="absolute left-[-20%] right-[-20%] top-[60%] h-[20%] opacity-50 [animation:mistDriftA_42s_linear_infinite]">
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,rgba(232,224,212,0.35)_0%,transparent_60%)] blur-2xl" />
      </div>
      <div className="absolute left-[-30%] right-[-30%] top-[66%] h-[16%] opacity-40 [animation:mistDriftB_60s_linear_infinite]">
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,rgba(232,224,212,0.3)_0%,transparent_55%)] blur-2xl" />
      </div>
      <div className="absolute left-[-25%] right-[-25%] top-[72%] h-[12%] opacity-30 [animation:mistDriftA_80s_linear_infinite_reverse]">
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,rgba(232,224,212,0.25)_0%,transparent_55%)] blur-3xl" />
      </div>

      {/* Atmospheric vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(28,26,23,0.65)_100%)]" />

      {/* Bottom legibility gradient for headline */}
      <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-earth/85 via-earth/40 to-transparent" />

      <style>{`
        @keyframes horizonShimmer {
          0%, 100% { transform: translateX(-10%); opacity: 0.85; }
          50% { transform: translateX(10%); opacity: 1; }
        }
        @keyframes mistDriftA {
          0% { transform: translateX(0%); }
          100% { transform: translateX(20%); }
        }
        @keyframes mistDriftB {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-25%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="animation:mistDrift"],
          [class*="animation:horizon"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
