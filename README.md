# Sohail Khan — Portfolio (EN + AR)

Two static, dependency-free portfolio sites that share one design system and one codebase:

| Edition | File         | Direction | Accent        | Audience                                                         |
| ------- | ------------ | --------- | ------------- | ---------------------------------------------------------------- |
| English | `index.html` | LTR       | Electric blue | US & global founders, CTOs, engineering leads                    |
| Arabic  | `ar.html`    | RTL       | Saudi emerald | Gulf enterprises, hospitality, fleet & government transformation |

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
  whatsapp: '+923025504938',          // digits only, international format
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

| Field                                               | Purpose                                                                                                                       |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `id`                                                | URL hash (`#project-<id>`) — keep identical in both languages                                                                 |
| `name`, `label`, `role`, `tagline`                  | Card + dialog header                                                                                                          |
| `cats`                                              | Filter ids: `ai`, `saas`, `ops`, `devops`                                                                                     |
| `problem`, `solution`, `highlights[]`, `outcomes[]` | Case-study body                                                                                                               |
| `stack[]`                                           | Chips (first three show on the card)                                                                                          |
| `links[]`                                           | `{ label, url }` buttons; empty array shows "private build"                                                                   |
| `hue`, `mockup`                                     | Generated cover: hue 0–360, mockup `dashboard` / `chat` / `table` / `map` / `grid` / `graph` / `console`                      |
| `image` (optional)                                  | Path to a real screenshot; overrides the generated mockup                                                                     |
| `cs` (optional)                                     | Full 6-part case study (see below); when present it replaces `problem` / `solution` / `highlights` / `outcomes` in the dialog |
| `status` (optional)                                 | Pill on the card image and in the dialog header, e.g. `'In development'` / `'قيد التطوير'`                                    |

#### Full case studies (`cs`)

Projects with a `cs` block open a long-form case study with a sticky section nav, following the six-part structure: problem & target user → system architecture → engineering decisions & trade-offs → resilience & security → measurable outcomes → live links & verification. AgentMagic is the reference example.

| `cs` field                                        | Purpose                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `role`                                            | "My role" statement: only what you can back up                                                                                                                                                                                                                                                                                                 |
| `glance[]`                                        | `[label, value]` pairs for the at-a-glance strip                                                                                                                                                                                                                                                                                               |
| `problem`, `blockers[]`, `user`                   | 01: pain point, `{ t, d }` blockers, target user callout                                                                                                                                                                                                                                                                                       |
| `arch`                                            | 02: `{ stages[{ k, t, items[], hot?, aside?{t,d} }], loop?, bus, store{ t, items[] }, caption }`, drawn as an HTML diagram that mirrors in RTL and stacks on phones; with `loop` set, the `hot` stage gets a two-way arrow before it. For several paths over one store use `flows: [{ label, stages[] }]` instead of `stages` (see YourAIList) |
| `decisions[]`                                     | 03: `{ t, c (chose), o (over), w (why), x (trade-off) }`                                                                                                                                                                                                                                                                                       |
| `securityNote`, `security[]`, `audit`, `limits[]` | 04: optional framing sentence; `{ t, items[] }` control cards; optional `{ t, d, items[] }` audit-then-fix callout; `{ l (today), n (next) }` known limits. Leave unfixed, exploitable gaps out until patched                                                                                                                                  |
| `outcomes[]`, `outcomesNote`, `region`            | 05: `{ v, l, e (evidence) }`, a note on what is not yet measured, optional regional callout `{ t, items[] }`                                                                                                                                                                                                                                   |
| `links[]`, `linksNote`, `verify[]`                | 06: `{ label, url, d }` link cards (may be empty); optional note shown when nothing is public yet; ways to verify without repo access                                                                                                                                                                                                          |

Section labels live in `ui.cs` in each data file. Only publish metrics with evidence. In Arabic copy, wrap long Latin code runs in `\u2066 … \u2069` (LTR isolate) so punctuation does not reorder, and prefer Arabic terms next to numbers (e.g. «57 إيداعاً» rather than "57 commit"), since a Latin word beside a number pulls the number into the wrong reading order.

### 4. Using real screenshots

Put files in `assets/img/projects/` and add `image: 'assets/img/projects/agentmagic.png'` (plus optional `imageAlt`) to the project. 1600×1000 px (16:10) works for cards; the dialog crops to 21:9.

### 5. Productized services (the "Services" section)

The three fixed-price offers (agent & MCP security, white-label Copilot/Azure bench for MSPs, AI rescue & run) live directly in `index.html` and `ar.html` under `id="services"`. Each card has:

- a `from $…` price list — starting points taken from the October 2026 market brief; adjust before launch,
- a WhatsApp button with its own pre-filled message via `data-wa-text="…"` (falls back to the global `whatsappText` when omitted).

Keep the three offers identical in both languages; only the copy differs.

### 6. Copy

All section copy (hero, services, capabilities, process, about, contact) is in the HTML files; project and UI strings are in the data files.

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
