# Sohail Khan — Portfolio (EN + AR)

Two static, dependency-free portfolio sites that share one design system and one codebase:

| Edition | File | Direction | Accent | Audience |
| --- | --- | --- | --- | --- |
| English | `index.html` | LTR | Electric blue | US & global founders, CTOs, engineering leads |
| Arabic | `ar.html` | RTL | Saudi emerald | Gulf enterprises, hospitality, fleet & government transformation |

Both pages run from plain files (double-click to open) or any static host. No build step, no frameworks, no trackers.

## What's inside

```
Claude_portfolio/
├── index.html              English edition
├── ar.html                 Arabic edition (dir="rtl")
├── assets/
│   ├── css/styles.css      Shared design system (tokens, layout, RTL rules, dialog, motion)
│   ├── js/
│   │   ├── avatar.js       WebGL particle avatar (morphing sphere → orbit → lattice)
│   │   ├── starfield.js    Fixed starfield background (Canvas 2D)
│   │   ├── mockups.js      Deterministic SVG "product shot" generator for project cards
│   │   ├── main.js         Nav, reveal, counters, marquee, filters, case-study dialog, routing
│   │   ├── data.en.js      English content: contact, filters, stack, 9 projects
│   │   └── data.ar.js      Arabic content: same structure, Gulf-first ordering
│   └── img/projects/       Drop real screenshots here (see "Using real screenshots")
└── .claude/launch.json     Local preview server config (python -m http.server 8765)
```

## The hero animation

The hero reproduces the particle "avatar" technique used on stonicai.com, rebuilt from scratch in vanilla WebGL:

- ~4,200 point sprites (2,600 on phones) rendered in two passes: a wide, dim **halo pass** for bloom and a **crisp pass** for detail, blended additively.
- Depth-of-field blur, per-particle twinkle, slow idle spin, breathing, pointer parallax and a hover "energy" boost.
- Three procedural formations that morph with a staggered swirl: **Agents** (sphere with glowing core), **Cloud** (nucleus + orbital rings), **Data** (wireframe lattice). The pills under the avatar switch formations; it also auto-cycles until the visitor picks one.
- Pauses when scrolled out of view or when the tab is hidden; renders a single static frame for `prefers-reduced-motion`; falls back to a CSS glow when WebGL is unavailable.

Colours per edition live in `data.en.js` / `data.ar.js` under `avatar: { deep, mid, ice }`.

For debugging, the running instance is exposed as `window.PortfolioAvatar` with `morphTo(0|1|2)`, `state()`, `setPointer(x, y)`, `setEnergy(0..1)` and `step(dtSeconds)` (advances one frame synchronously). Note: browsers pause `requestAnimationFrame` in hidden tabs or embedded previews, so the avatar only animates when the page is actually visible.

## Customising

### 1. Contact details (do this first)
Edit the `contact` block at the top of **both** `assets/js/data.en.js` and `assets/js/data.ar.js`:

```js
contact: {
  whatsapp: '966537430772',          // digits only, international format
  whatsappText: '...',               // pre-filled message
  email: 'contact@example.com',      // ← placeholder, replace
  linkedin: 'https://www.linkedin.com/in/',   // ← placeholder, replace
  github: 'https://github.com/Koding-net'
}
```

Every WhatsApp / email / GitHub / LinkedIn link on the page reads from here.

### 2. Domain, canonical and hreflang
Search both HTML files for `https://sohailkhan.dev/` and replace it with your real domain (canonical, hreflang, Open Graph, JSON-LD). Add an `og:image` meta tag once you have a 1200×630 cover image.

### 3. Projects
Each project is one object in the `projects` array. Fields:

| Field | Purpose |
| --- | --- |
| `id` | URL hash (`#project-<id>`) — keep identical in both languages |
| `name`, `label`, `role`, `tagline` | Card + dialog header |
| `cats` | Filter ids: `ai`, `saas`, `ops`, `devops` |
| `problem`, `solution`, `highlights[]`, `outcomes[]` | Case-study body |
| `stack[]` | Chips (first three show on the card) |
| `links[]` | `{ label, url }` buttons; empty array shows "private build" |
| `hue`, `mockup` | Generated cover: hue 0–360, mockup `dashboard` / `chat` / `table` / `map` / `grid` / `graph` / `console` |
| `image` (optional) | Path to a real screenshot; overrides the generated mockup |

### 4. Using real screenshots
Put files in `assets/img/projects/` and add `image: 'assets/img/projects/agentmagic.png'` (plus optional `imageAlt`) to the project. 1600×1000 px (16:10) works for cards; the dialog crops to 21:9.

### 5. Copy
All section copy (hero, capabilities, process, about, contact) is in the HTML files; project and UI strings are in the data files.

## Local preview

```bash
python -m http.server 8765
```

Then open http://localhost:8765/index.html and http://localhost:8765/ar.html. Opening the HTML files directly from disk also works.

## Deploy

Any static host works (GitHub Pages, Cloudflare Pages, Vercel, Netlify, Hostinger). Upload the folder as-is; `index.html` is the English entry and `/ar.html` the Arabic one. No build command, output directory = root.

## Pre-launch checklist

- [ ] Replace `contact@example.com` and the LinkedIn placeholder in both data files
- [ ] Replace `https://sohailkhan.dev/` with the real domain in both HTML files
- [ ] Add real project screenshots (optional but recommended)
- [ ] Add an `og:image` for link previews
- [ ] Re-read the Arabic copy for tone before publishing to Gulf clients
