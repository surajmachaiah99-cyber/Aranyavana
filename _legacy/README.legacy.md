# Udyana by Aranyavana

Production-ready marketing site for **Udyana** — a 15-acre lakefront nature estate in Kudlur, Solur, Bengaluru, by Aranyavana.

Pure vanilla HTML / CSS / JS (no frameworks). A small Express server provides a contact endpoint and serves the static site in one process.

---

## Project structure

```
udyana-aranyavana/
├── index.html               # Single-page experience (12 sections)
├── pages/
│   ├── homes.html           # Homes & Packages detail page
│   └── contact.html         # Enquiry / appointment page
├── css/
│   ├── tokens.css           # Design tokens (colour, type, spacing)
│   ├── base.css             # Reset, typography, layout helpers
│   ├── nav.css              # Fixed nav + frosted glass + hamburger
│   ├── hero.css             # Hero, lake-ripple keyframes
│   ├── sections.css         # Manifesto, Lake, Plots, Location, Philosophy, Invest, CTA, Footer, Form
│   ├── homes.css            # Tabbed homes panel + landscape grid
│   ├── landscape.css        # Subpage-specific overrides (placeholder)
│   ├── animations.css       # Keyframes + reveal classes + reduced-motion
│   └── responsive.css       # < 900px, < 600px, < 375px breakpoints
├── js/
│   ├── main.js              # Scroll reveal (IntersectionObserver), nav shrink, mobile hamburger
│   ├── tabs.js              # Homes tab switcher (with keyboard support)
│   └── form.js              # Enquiry form validate + fetch
├── images/
│   └── README.md            # Image placement guide
├── server/
│   └── contact.js           # Express + Nodemailer endpoint + static host
├── package.json
├── .env.example
└── .gitignore
```

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Copy env and fill in SMTP credentials (Gmail app password works well)
cp .env.example .env
# edit .env

# 3. Run
npm run dev    # nodemon, auto-reloads on file change
# or
npm start

# 4. Open
http://localhost:3000
```

If `.env` is not configured, the form still works — the server will log enquiries to the console and return `{ success: true, delivered: false }`. Real delivery requires SMTP credentials.

### Gmail app password

1. Enable 2-Step Verification on your Google account.
2. Visit https://myaccount.google.com/apppasswords and create an app password.
3. Paste it as `SMTP_PASS` in `.env`. Use your full Gmail address as `SMTP_USER`.

---

## Form contract

`POST /api/enquire`

```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "phone": "string (optional)",
  "message": "string (required, >=4 chars)"
}
```

Returns `{ "success": true }` on success, or `{ "error": "…" }` on failure. There is a small in-memory rate limit (5 enquiries / 10 min / IP) and request size cap (32 kb).

---

## Image guide

See [images/README.md](images/README.md) for filenames, crops, and swap-in instructions. The site renders beautifully with the styled placeholders until real photography lands.

---

## Performance

- Google Fonts loaded via `preconnect` + `&display=swap`.
- All CSS in `<head>`, all JS deferred.
- `IntersectionObserver` for scroll reveal (no scroll listeners on reveals).
- `prefers-reduced-motion` respected — ripples disabled, transitions collapsed.
- No third-party scripts, no trackers, no cookie banner.

Lighthouse targets: 90+ Performance, 100 Accessibility, 100 Best Practices.

---

## Deployment

The site is static + a tiny Node endpoint. A few options:

- **Single VPS** — `npm start` behind nginx or Caddy. Use `pm2` or systemd to keep it running.
- **Render / Railway / Fly.io** — point at the repo, set `npm start`, paste env vars.
- **Static + serverless** — host `/`, `/css`, `/js`, `/images`, `/pages` on any CDN (Netlify, Cloudflare Pages, S3). Deploy `server/contact.js` as a serverless function with a route rewrite from `/api/enquire`.

Set `TO_EMAIL` and SMTP credentials in the host's environment — never commit `.env`.

---

## Copy & brand

Copy, pricing, and brand language are final. Do not change without sign-off from Aranyavana.

- **Brand:** Aranyavana — *Forest + Living · Where Nature Leads Life*
- **Project:** Udyana — *Where the lake holds time still.*
- **Contact:** hello@aranyavana.com · aranyavana.in
