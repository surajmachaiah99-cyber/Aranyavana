# Image Placement Guide — Udyana by Aranyavana

Drop final photography into this folder using the filenames below. Each row gives the section, the recommended crop, and a one-line direction for the shot.

| Filename | Section | Description |
|---|---|---|
| `hero-lake-drone.jpg` | Hero (optional bg overlay) | Drone shot — full 15-acre lake at golden hour. Wide 16:9. Use as a subtle overlay behind the dark gradient (≤30% opacity). |
| `lake-feature.jpg` | Lake section, right column | Lake edge with reflections of canopy. 3:4 portrait. Calm, no people. |
| `nest-exterior.jpg` | Homes — Nest tab | CSEB walls, clay-tile roof, sit-out deck in morning light. 4:5 portrait. |
| `canopy-exterior.jpg` | Homes — Canopy tab | Stone cladding, timber rafters, full deck — front-three-quarter view. 4:5 portrait. |
| `landscape-overview.jpg` | Landscape header (optional) | Aerial of estate canopy, native trees, paths visible. 16:9. |
| `location-satellite.jpg` | Location, right column | Satellite/map composite of the site and corridor. 4:5 portrait. |

## How to wire an image in

The HTML currently shows styled placeholder boxes with italic quotes (so the page renders beautifully even before photography lands). To swap one in, find the placeholder in `index.html` (or in `pages/homes.html`) — e.g. the lake visual:

```html
<figure class="lake-visual reveal" aria-label="Lake at Udyana">
  <p class="lake-visual-quote"><em>The lake remembers everything …</em></p>
</figure>
```

…and replace it with:

```html
<figure class="lake-visual lake-visual--photo reveal">
  <img src="images/lake-feature.jpg" alt="The 15-acre lake at Udyana at dawn" loading="lazy" />
</figure>
```

Add a tiny rule in `css/sections.css` for the photo variant if you want it to fully cover the box:

```css
.lake-visual--photo { padding: 0; }
.lake-visual--photo img { width: 100%; height: 100%; object-fit: cover; }
```

## Asset guidelines

- **Format:** prefer `.webp` for performance; `.jpg` is fine as a fallback.
- **Size:** max-width 1800px for hero/wide shots, 1200px for portraits. Compress to ~85% quality.
- **Tone:** warm, low-contrast, golden-hour. Avoid saturated reds and harsh shadows.
- **People:** absent or fully incidental — the protagonist is the land.
- **Accessibility:** every `<img>` must have a descriptive `alt` text. `loading="lazy"` on everything below the fold.
