# Udyana by Aranyavana

A premium, editorial Next.js 14 landing page for **Udyana** — a lakefront nature-estate investment community in Kudlur, Solur, Karnataka.

This is a brand experience, not a conventional real estate site.

---

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** with project-specific design tokens (earth / stone / sand / water / leaf palette)
- **Framer Motion** for scroll reveals, stagger, Ken Burns hero, and form transitions
- **react-hook-form + zod** for the enquiry form
- **next/font** for Cormorant Garamond, Cormorant SC, and DM Sans

---

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run typecheck    # tsc --noEmit
npm run lint
```

If `node` is not on your PATH, prepend it for the session (Windows / PowerShell):

```powershell
$env:Path = "C:\Program Files\nodejs;" + $env:Path
```

---

## Structure

```
app/
  layout.tsx         # fonts, metadata, mounts <Grain /> and <Cursor />
  globals.css        # design tokens, component classes, grain overlay, custom cursor
  page.tsx           # composes all sections
  api/enquiry/route.ts   # POST handler — validates with zod, logs to console (stub)

components/
  Navbar.tsx         # sticky transparent → solid on scroll, mobile overlay nav
  Hero.tsx           # full-viewport video + Ken Burns + scroll indicator
  Thesis.tsx         # section 01 — "The Architecture of Silence"
  CoreAssets.tsx     # section 02 — three feature cards
  Architectural.tsx  # section 03 — 2-col with sticky material study
  Financial.tsx      # section 04 — watermark "04", stats, price anchor
  EnquiryForm.tsx    # section 05 — react-hook-form + zod, inline success
  Footer.tsx
  SectionReveal.tsx  # framer-motion reveal wrapper
  Stagger.tsx        # parent/child stagger primitives
  Cursor.tsx         # custom dot cursor (desktop, fine pointer only)
  Grain.tsx          # fixed SVG noise overlay
  icons.tsx          # minimal SVG marks: WaveIcon, HorizonIcon, GroveIcon, ArrowRight

lib/
  schemas.ts         # zod schemas + EnquiryInput type, shared client/server

public/
  images/            # drop hero-lake.jpg here (see *.README)
  videos/            # drop hero-lake.mp4 here (see *.README)
```

---

## Media drop-ins

The hero renders without media via a fallback gradient + vignette + Ken Burns. To switch to the real video:

1. Drop `hero-lake.jpg` (poster, 2880×1620) into `public/images/`
2. Drop `hero-lake.mp4` (looping 8–14s, ≤4 MB) into `public/videos/`

No code change required.

---

## Form contract

`POST /api/enquiry` accepts JSON validated by `lib/schemas.ts#enquirySchema`:

```ts
{
  fullName: string,           // min 2
  designation: string,        // min 2
  phone: string,              // 10–15 digits, "0-9 -+ " allowed
  email: string,              // valid email
  visitDate: string,          // YYYY-MM-DD
  interest: "Long-term Investment" | "Personal Retreat" | "Family Legacy" | "Nature & Lifestyle"
}
```

Responses: `200 { ok: true }`, `400` invalid JSON, `422 { error, issues }` validation failed.

The route currently logs to `console`. Wire to email (Resend, Postmark, SES) or a CRM by editing `app/api/enquiry/route.ts`.

---

## Design tokens

| Token         | Hex       | Use                              |
|---------------|-----------|----------------------------------|
| `earth`       | `#1C1A17` | Primary background               |
| `stone`       | `#2E2B27` | Cards, elevated surfaces         |
| `bark`        | `#4A4035` | Borders, dividers                |
| `sand`        | `#C4A882` | Accent, CTAs, eyebrows           |
| `mist`        | `#E8E0D4` | Light text on dark               |
| `water`       | `#7B9E9B` | Lake-teal accent                 |
| `leaf`        | `#4D5C3A` | Forest green accent              |
| `sky`         | `#D6DDD8` | Body text                        |
| `cream`       | `#F5F0E8` | Hero / display headlines         |

Type scales tune via `clamp()` in each section; no hard-coded mobile breakpoints in headlines.

---

## Motion philosophy

- All sections fade-in and translate-up via `SectionReveal` (`once: true`, `amount: 0.2`).
- Stagger children at 0.15s via `StaggerGroup` / `StaggerItem`.
- Hero uses a 24-second `ken-burns` keyframe; respects `prefers-reduced-motion`.
- Custom dot cursor only on `(pointer: fine)` devices; CSS hides on mobile.
- Global `prefers-reduced-motion` rule in `globals.css` collapses animations.

---

## Legacy

The previous vanilla HTML/CSS/JS Udyana site is preserved at `_legacy/` and excluded from the TypeScript build via `tsconfig.json`. Nothing in `_legacy/` is shipped.
