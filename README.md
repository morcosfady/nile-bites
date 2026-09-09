# Pharaoh's Bites — Egyptian Restaurant &amp; Artisan Bakery

A luxury restaurant website for **Pharaoh's Bites**, a family-owned Egyptian kitchen and artisan
bakery. Dark, gold-accented, Pharaonic-inspired without a single cartoon pyramid — built as
static HTML/CSS/JS with no build step and no dependencies.

**Live preview:** open `index.html` in a browser, or serve the folder (see *Running locally*).

---

## Pages

| Page | File | What it does |
|---|---|---|
| Home | `index.html` | Cinematic hero, story intro, featured dishes, categories, bakery band, stats, gallery preview, reviews, CTA |
| About | `about.html` | Who we are, six values, the family, stats, full guest book |
| Our Story | `our-story.html` | Nine-point heritage timeline, craft breakdown, founder quote |
| Menu | `menu.html` | Signature spotlight, live search, 9 category filters, 46 dishes, featured cards |
| Bakery | `bakery.html` | Wood-oven panel with bake schedule, six bakery counters, atmosphere split, gallery |
| Gallery | `gallery.html` | Masonry gallery, subject filters, keyboard-navigable lightbox |
| Reservations | `reservations.html` | Validated booking form, live opening hours, party picker, private dining |
| Order Online | `order.html` | Full item list, category filters, persistent basket with live totals |
| Contact | `contact.html` | Contact tiles, Google Map, hours, socials, validated enquiry form |

Plus `sitemap.xml`, `robots.txt`, `site.webmanifest`.

## Structure

```
assets/
  css/
    main.css      design tokens, reset, typography, layout, components, motion
    pages.css     page modules: hero, timeline, menu, gallery, basket, map
  js/
    data.js       ALL content: menu, categories, gallery, reviews
    main.js       every interaction (each module no-ops if its markup is absent)
  img/
    brand/        logo.svg, mark.svg, favicon.svg — hand-drawn lotus + sun disk
    pattern-lotus.svg, hieroglyph-border.svg
```

One CSS bundle and one JS bundle serve every page. `main.js` is written so each module
silently does nothing when its markup isn't on the page — that's why the same two files
can drive nine very different templates.

## Design system

Everything is driven by custom properties at the top of `main.css`. Change these and the
whole site follows.

| Token | Value | |
|---|---|---|
| `--gold` | `#d4af37` | primary accent |
| `--gold-light` / `--gold-deep` | `#f1dfa4` / `#a8862a` | gradient ends |
| `--bronze` | `#8c6239` | |
| `--black` / `--charcoal` | `#111111` / `#1b1b1b` | backgrounds |
| `--sand` / `--ivory` | `#e7d5a5` / `#f8f3ea` | warm text |
| `--emerald` | `#14413a` | accent (reservations panel) |

Type: **Cormorant Garamond** for headings (classical inscription feel), **Jost** for body.
Both loaded from Google Fonts with `display=swap`. Sizes use a fluid `clamp()` scale
(`--step--2` … `--step-5`) so nothing needs per-breakpoint font rules.

## Editing content

**All copy for menu, gallery and reviews lives in `assets/js/data.js`** — one file, plain
objects, no build step. Add a dish and it appears on the menu page, the order page, and
(if `featured: true`) on the homepage automatically.

```js
{ id: "koshari", cat: "cuisine", name: "Koshari of the House", ar: "كشري",
  price: 165, featured: false,
  desc: "Rice, lentils, macaroni and chickpeas…",
  tags: ["Vegan"], img: "https://…" }
```

- `cat` must match a `CATEGORIES` id: `breakfast`, `bakery`, `feteer`, `bread`, `desserts`,
  `cuisine`, `drinks`, `chef`, `kids`.
- `tags` render as pills; anything matching *vegan/vegetarian* turns green, anything matching
  *signature/chef/tasting* turns gold.
- Prices are plain numbers, formatted as EGP by `money()` in `main.js`.

Business details (address, phone, WhatsApp, email, hours) are in the header/footer of each
HTML page and in the JSON-LD block in each `<head>`. Search and replace across the folder:

- `27 Abou El Feda Street, Zamalek` / `Cairo 11211`
- `+20 2 2735 0100` and `tel:+20227350100`
- `201005550142` (WhatsApp)
- `hello@pharaohsbites.com`, `events@pharaohsbites.com`
- `https://www.pharaohsbites.com` (canonical + Open Graph URLs)

## Photography — important

**The images are placeholders.** They are hot-linked from Unsplash so the site looks
finished out of the box. Every URL was checked to load at the time of building, but they
are third-party links: replace them with your own photography before launch.

Two things follow from this:

1. **Alt text describes the intended shot**, not always the exact placeholder currently
   showing. Once you drop in real photography the alt text will be accurate. If you launch
   with placeholders still in place, review the alt text first.
2. **There is a graceful fallback.** If any image fails to load, `hydrateImages()` in
   `main.js` adds `.img-failed` to its `.media` wrapper, which renders an elegant
   gold-lotus-on-charcoal panel instead of a broken-image icon. Nothing ever looks broken.

To swap images: replace the `img` values in `data.js`, and the inline `data-src` /
`src` attributes in the HTML (hero and section images). Recommended sizes — hero `2000px`
wide, section images `1100–1800px`, cards `800–900px`, gallery `1600px`.

Also add your own `assets/img/og-cover.jpg` (1200×630) — it's referenced by the Open Graph
tags on every page but not included.

## Features

**Interaction** — sticky header that condenses on scroll, full-screen mobile nav, scroll
progress bar, reveal-on-scroll with stagger, parallax hero layers, animated counters,
back-to-top, toast notifications.

**Menu** — debounced live search across names, Arabic names, descriptions and tags; category
filters that scroll to their section; per-section live counts; empty state.

**Ordering** — add to basket from any dish card, quantity stepping, remove, delivery vs
collection (delivery fee toggles), 12% service line, live totals. Basket and favourites
persist in `localStorage` under the `nb:` prefix and survive page changes. The checkout
button is a front-end demo — wire `[data-checkout]` in `main.js` to your real endpoint.

**Forms** — client-side validation with inline, `aria-live` error messages; required fields,
email and phone patterns, and a past-date guard on the reservation date. Forms are demo-only;
point them at your backend or a service like Formspree.

**Accessibility** — semantic landmarks, skip link, visible focus rings, `aria-pressed` on all
toggles, `aria-current` on the active nav item, labelled icon buttons, keyboard-operable
lightbox (`←` `→` `Esc`) with focus return, and a full `prefers-reduced-motion` path that
disables every animation and reveal.

**SEO** — unique title/description/keywords per page, canonical URLs, Open Graph and Twitter
cards, and per-page JSON-LD: `Restaurant` + `WebSite` on the homepage, plus `Menu`,
`Bakery`, `AboutPage`, `Article`, `ImageGallery`, `ContactPage`, `ReserveAction` and
`OrderAction`. Sitemap and robots.txt included.

**Performance** — no framework, no jQuery, no build. Two CSS files, two JS files. Images are
lazy-loaded with `loading="lazy"` and `decoding="async"`; the hero uses `fetchpriority="high"`.
Fonts and the image CDN are preconnected. Scroll handlers are passive and parallax is
rAF-throttled.

## Asset versioning — read before you edit CSS or JS

Every local stylesheet and script is linked with a `?v=N` query:

```html
<link rel="stylesheet" href="assets/css/main.css?v=3">
<script src="assets/js/main.js?v=3" defer></script>
```

GitHub Pages caches assets aggressively, so without this a returning visitor
keeps the old CSS after you deploy and your change appears not to have worked.

**After changing anything in `assets/`, bump the number in all nine HTML files:**

```bash
find . -maxdepth 1 -name '*.html' -exec sed -i 's/?v=3/?v=4/g' {} +
```

The HTML itself is not versioned — Pages revalidates HTML on each request, so
new markup arrives immediately.

## Running locally

Opening `index.html` directly works. To serve it properly (recommended — some browsers
restrict `file://`):

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying

It's a static site — any host works. For **GitHub Pages**: push to `main`, then
Settings → Pages → Source: *Deploy from a branch* → `main` / `root`.

Before going live: replace the placeholder photography, update the business details and the
`https://www.pharaohsbites.com` canonical URLs, add `og-cover.jpg`, and connect the forms and
checkout to a real backend.

## Browser support

Modern evergreen browsers. Uses `IntersectionObserver`, CSS custom properties, `clamp()`,
`aspect-ratio`, CSS grid and `:focus-visible` — all with graceful degradation (reveals fall
back to visible, images fall back to the lotus panel).
