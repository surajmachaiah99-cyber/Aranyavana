# Udyana by Aranyavana

A premium, immersive single-page marketing site for **Udyana** — a lakefront nature-investment community in Kudlur, Solur, near Bangalore.

A single self-contained `index.html` file. No build step. No framework. Vanilla HTML, CSS, and JS, with **GSAP + ScrollTrigger** loaded from a CDN for the scroll animations.

---

## Preview

Two ways to view it:

**1. Open the file directly** — double-click `index.html` and your browser will render it. GSAP loads from a CDN so an internet connection is required for the animations on first load.

**2. Run the tiny static server** (no dependencies — uses only Node built-ins):

```bash
node serve.mjs              # http://localhost:3000
PORT=8080 node serve.mjs    # custom port
```

---

## Structure

```
index.html        # the entire site — embedded CSS + JS
serve.mjs         # zero-dep static server (Node built-ins only)
.claude/          # editor / preview config
images/           # (empty placeholder folder — all visuals are CSS gradients)
_legacy/          # original vanilla site preserved
_next_archive/    # archived Next.js 14 prototype (see below)
```

All visuals on the page are rendered from CSS gradients — no image files, no broken `<img>` tags. Drop in real photography later by replacing the `.land-visual` and `.hero-bg` rule sets.

---

## Sections

1. **Hero** — Full-viewport gradient landscape, parallax background, stagger word-reveal on the title.
2. **Nature Statement** — Forest-green pause: *"A 15-acre living lake. 6,000 sq.ft of earth. A legacy that outlasts markets."*
3. **The Lake** — Three editorial cards: 15 Acres of Water · Lakefront Ownership · Water as Legacy.
4. **The Land** — Split-screen: CSS-gradient aerial study + copy block.
5. **Location** — Light section with two minimal callouts (1 km from highway, 60 km from city).
6. **Philosophy** — Centered dark quote with sand attribution.
7. **Invest** — Conversion: ₹75 Lakhs starting price + private consultation CTA.
8. **Footer** — Wordmark, tagline, light links, copyright.

---

## Brand tokens

Defined once at the top of `index.html`:

```css
--color-earth:  #2C1810;
--color-forest: #1B3A2D;
--color-stone:  #8B7355;
--color-mist:   #F5F0E8;
--color-water:  #4A7C8E;
--color-sky:    #E8EFF5;
--font-primary:   'Cormorant Garamond', serif;
--font-secondary: 'Inter', sans-serif;
```

---

## Animation

GSAP + ScrollTrigger, loaded from `cdn.jsdelivr.net`. Animations are slow and deliberate — no bouncy easings, no overshoot. The site respects `prefers-reduced-motion`.

| Effect | Where |
|---|---|
| Stagger word reveal | Hero title |
| Parallax | Hero background |
| Fade + slide on scroll | Every `.reveal` element |
| Slow centered fade | Statement, Philosophy |

---

## Editing copy

All copy lives in `index.html`. Search for the section comment headers like `<!-- ========== 6. PHILOSOPHY ========== -->`.

---

## Archived directions

- **`_legacy/`** — Original vanilla HTML/CSS/JS with Express contact endpoint.
- **`_next_archive/`** — Editorial Next.js 14 build with Framer Motion, Tailwind, a custom dot cursor, and a CSS-rendered hero scene. Kept for reference. To revive: `mv _next_archive/{app,components,lib,public,*.json,*.mjs,*.ts} .` then `npm install && npm run dev`.

---

## Brand

- **Brand**: Aranyavana — *Own Nature. Build Legacy.*
- **Project**: Udyana — *Kudlur, Solur, Karnataka*
- **Contact**: hello@aranyavana.com
