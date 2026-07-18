# Lutz Consulting Group design system

This document defines the current visual and interaction language for the consulting site. References are used for principles and quality bars, not as templates to copy.

## 1. Creative direction

The site should feel:

- Dark and premium.
- Editorial but technically credible.
- Coherent rather than decorated section by section.
- Tactile and dimensional where the main product story needs it.
- Calm enough for a business owner and interesting enough for a technical peer or recruiter.
- Human-made, with intentional hierarchy and content-specific visuals rather than generic geometry.

The shorthand is **old-money technical product studio**: black, deep emerald, cream, leather, and brass; real interfaces; restrained colored system accents; and one excellent cinematic product demonstration.

## 2. Primary references

| Reference | What it does well | LCG application |
| --- | --- | --- |
| [Railway](https://railway.com) | A single visual idea carried through the site; custom product motion; progress bars; offerings explained against alternatives; technical detail with warmth | Primary reference. The large browser is the opening product demo; each service then receives its own promise, looping interface, feature details, and logo-only alternatives row. The page thread carries progress through the site. |
| [AMCA](https://amca.com) | Cinematic scale, spatial confidence, and elements that genuinely rearrange | Borrow editorial confidence and meaningful transitions. Do not copy the full scroll choreography or let animation take over the whole page. |
| [Supabase](https://supabase.com) | Authentic interface artifacts, technical credibility, approachable density | Show real product systems, accurate labels, and useful technical detail instead of fake dashboards. |
| [Mercury](https://mercury.com) | Premium restraint, strong typography, visual polish without constant spectacle | Use as a quality bar for calm spacing, control states, and transitions. |
| [In the Brand Lab](https://inthebrandlab.com) | Visual-first cases and clear separation between overview and detail | Keep the landing page focused and give the full project sequence its own editorial Work page. |
| [ContentCore](https://contentcore.xyz) | Severe reduction, art-directed type, small navigation, tool-like surfaces | Keep the interface quiet around the browser story and project visuals. Avoid redundant cards and labels. |
| [Shaders](https://shaders.com) | Purpose-built responsive visual fields and composable effects | Reference for craft, not a requirement. A shader should only return if a specific content purpose is identified. |
| IS Graphics | User-supplied reference | The supplied `is.graphics` domain did not resolve during the original audit. Confirm the intended reference before using it. |

## 3. Design principles

### One protagonist

The edge-to-edge browser ownership story is the protagonist. Other sections may animate, but they should not introduce competing cinematic metaphors.

### Show the thing itself

Lead with the client website, browser, product interfaces, product photography, and real system behavior. Avoid surrounding a generic webpage card with unexplained geometry or status badges.

### Color has a job

Emerald establishes the brand. Cream creates editorial warmth. Brass and leather add old-money material character. Purple and amber appear mainly as system/brand accents. Color should identify state or add depth, not turn every headline gold.

### Technical detail must be legible

A business owner should understand the first pass. A technical visitor should find accurate detail on closer inspection.

### Motion explains causality

Tabs open, a workload accumulates, a site fails, help is requested, tasks resolve, and the site refreshes. Avoid effects that look impressive but cannot be explained in the story.

### Real proof outranks atmosphere

Project visuals and factual responsibilities are more valuable than a second ambient shader, generated film, or decorative dashboard.

## 4. Color system

Current CSS variables live on `.prototype` in `PrototypeLanding.svelte`.

| Token | Current value | Use |
| --- | --- | --- |
| `--proto-bg` | `#080b09` | Page background and deepest black-green |
| `--proto-surface` | `#131815` | Primary dark panels |
| `--proto-surface-2` | `#19201b` | Raised/alternate dark surfaces |
| `--proto-green` | `#07543f` | Brand emerald and primary structural accent |
| `--proto-green-light` | `#2d8064` | Active states, progress, eyebrows, and focus |
| `--proto-green-deep` | `#0d2d24` | Deep green panels and CTA backgrounds |
| `--proto-text` | `#f0efe9` | Primary text |
| `--proto-muted` | `#9b9d98` | Secondary copy |
| `--proto-paper` | `#dad6cc` | Warm buttons, emphasis, and editorial contrast |
| `--proto-leather` | `#774633` | Reserved brown material accent |
| `--proto-brass` | `#b49a67` | Small highlights, indices, and progress markers |
| `--proto-line` | `rgba(240,239,233,.1)` | Standard dividers |
| `--proto-line-strong` | `rgba(240,239,233,.18)` | Strong boundaries |

Additional hero accents:

- Brighter emerald glow around `#0e8e66`.
- Restrained purple around `#6d4bb1`.
- Restrained warm accent around `#c8784f`.
- Brand-specific colors inside browser tabs.

### Color rules

- Body text must meet readable contrast on the dark background.
- Green is the brand state; do not use it as a generic “everything is good” badge on every component.
- Brass is a small accent, not the default headline color.
- Cream buttons are the highest-contrast calls to action.
- Client/project colors may appear inside their own visual frames without changing the global palette.
- Brand colors in the browser tabs are allowed because they help distinguish the toolchain.

## 5. Typography

### Display

`Instrument Serif`, with Georgia as fallback.

Use for:

- Hero headline.
- Section statements.
- Case-study titles.
- Emotional or editorial emphasis.

Italic is used selectively for the human or outcome-oriented phrase: “second job,” “human judgment,” or “keep one owner.” Do not italicize every heading.

### Sans

`DM Sans`, with a generic sans-serif fallback.

Use for:

- Body copy.
- Navigation.
- CTAs.
- Case descriptions.
- Product-interface labels that need readability.

### Mono

`IBM Plex Mono`, with monospace fallback.

Use for:

- Eyebrows.
- Metrics.
- Index numbers.
- Browser labels.
- Small system/status copy.

Do not use mono for long paragraphs. Small uppercase mono should remain large enough to read and should not carry essential meaning by itself.

## 6. Layout and spacing

- Primary content shell: `min(1380px, calc(100% - 80px))` on desktop.
- Reduce to 32px total horizontal gutters on small screens.
- Fixed navigation height: 72px.
- Large sections generally use 110–170px of vertical padding on desktop.
- Dividers organize long flows more effectively than rounded cards.
- Grids may be asymmetrical, but alignment should remain obvious.
- The browser stage can be wider than normal text content and may slightly exceed the mobile viewport to preserve screen legibility.

The site should not become a stack of identical three-column cards. Use different compositions for service demonstrations, live work, case-specific evidence, and the final CTA while retaining the same tokens and typography.

## 7. Shape, borders, and material

- Page sections and offer rows use square or nearly square geometry.
- Use thin, warm low-opacity dividers.
- Rounded corners are reserved for browser chrome and small controls.
- The browser stage receives the strongest depth treatment: a thin frame, restrained reflection, subtle perspective, and deep shadow without fake hardware.
- Project visuals may use their own product-specific geometry.
- Avoid the generic AI-site combination of large rounded cards, glowing green borders, dot grids, and pill labels everywhere.

## 8. The page thread

The fixed vertical line is a quiet page-progress spine, not a train illustration.

- It begins below the fixed navigation.
- The emerald line grows with page progress.
- A small brass marker travels along it.
- It is hidden on mobile.
- It should remain a page-system motif rather than becoming a literal cable, vehicle, route capsule, or mandatory part of the logo.

Potential future refinements:

- Let the marker align briefly with major section boundaries.
- Use the thread as a subtle connector on the work page.
- Develop a matching favicon motion study only after the brand mark is final.

## 9. Brand mark

The current `ConsultingMark.svelte` is a compact LCG/interface monogram used in navigation and footer. It is intentionally simple enough to work at small sizes.

Status: provisional.

Before finalizing:

1. Create at least two additional mark directions.
2. Test all options at nav size, favicon size, monochrome, and cream-on-emerald.
3. Avoid ornamental crests that clash with the technical interface.
4. Do not force the page thread into the mark unless it remains legible at 16px.

## 10. Navigation and links

- Fixed translucent dark navigation with backdrop blur.
- Brand left, three simple navigation links centered, primary CTA right.
- Mobile hides the center navigation before the layout becomes cramped.
- Primary CTA uses a warm paper fill.
- Text links use color and a restrained underline/bottom border.
- Do not append arrow glyphs to ordinary links.
- External links may communicate their behavior through label/context rather than decorative arrows.
- Keyboard focus uses a visible green outline with offset.

## 11. Components

### Browser hero

- The browser is the most dimensional component, but it is not placed inside a laptop or monitor.
- It begins in the first viewport and becomes fully legible after a short normal scroll.
- One changing caption and a centered five-segment timing rail sit directly beneath the browser.
- Telemetry, duplicate monitor chrome, camera, bezel, keyboard, deck, and other fake hardware are intentionally absent.

### Service chapters

- Three sequential product chapters; no carousel or manually selected phases.
- Each chapter combines a quiet editorial heading, one large purpose-built demonstration, three feature details, and a muted alternatives row.
- Website motion shows human review, responsive validation, and a controlled release. AI motion shows context moving through preparation, a human checkpoint, and downstream updates. Analytics motion starts with a business question and ends with one recommendation plus an operating rhythm.
- Do not use a repeated Railway-style train capsule or a generic dashboard template inside every chapter.
- Each product demonstration loops independently only while its chapter is visible.
- The chapter order is websites and products, AI integrations, then ML and analytics.

### Alternatives

- Logo-only, muted, square cells.
- No visible brand names and no external links.
- Color may return on hover, but the row should remain subordinate to the service copy.
- The first row currently includes Lovable, Base44, and Replit.

### Work showcase

- Reuse the original three-project hero composition here rather than inventing another Work grid: Candella Quant as the main workspace window, The Sparkling Shoe product image across the lower left, and the MindLSN index card at the lower right.
- A deep emerald stage and one thin horizontal thread unite the three project-specific visual treatments without forcing them into identical cards.
- Every project card links directly to its live site; a separate button links to the detailed case-study page.
- Landing-page captions stay brief. Evidence, responsibilities, and complete narratives remain on the dedicated Work page.
- No live/status badge, green status dot, or arrow glyph. Hover motion is limited to bringing the selected window forward, a small lift, slight image scale, and color recovery.

### Inquiry CTA and footer

- The CTA uses the strongest field of emerald on the page and a functional project starter.
- Four mutually exclusive starting points prepare a direct, prefilled email. The interaction earns its space by reducing inquiry friction rather than simulating a fake workflow.
- The consulting footer contains LCG navigation and contact only; it does not advertise the personal portfolio.

### Case chapters

- A visual index opens the separate Work page; all complete cases continue below it on that same page.
- Visual-first intro and a sticky case-specific visual that changes with the active chapter.
- Need, difficult part, build, continuing ownership, evidence, and responsibilities.
- Direct live link.
- Index anchors and direct live-site navigation.
- Enough whitespace for the visual to feel like the subject rather than an illustration beside a wall of copy.

### Final CTA

- Deep emerald field.
- Large editorial statement and a single obvious action.
- No extra “quiet line” competing with the CTA.

## 12. Imagery policy

Priority order:

1. Real product screens.
2. Purpose-built diagrams from actual system behavior.
3. Real product photography.
4. Clearly decorative generated imagery.

Current asset set:

- Candella logo and purpose-built trading-system visual.
- MindLSN mark and live capture.
- Sparkling Shoe product photography and live capture.
- Candella Quant workspace capture.

Generated imagery must never impersonate client work. If Flow/Gemini/Whisk-style tools are used later, keep generated media to an approved, art-directed brand moment and ship a static poster fallback.

## 13. Motion rules

1. The ownership story is the only complex narrative animation.
2. The three service demonstrations are the only other repeating product animations.
3. Hero entrance plays once per browser session; the story loops only while visible.
4. Use transforms and opacity for most movement.
5. Every motion system needs a reduced-motion path.
6. Continuous work pauses offscreen.
7. Layout changes must be causal and coherent; items should move between states rather than jump.
8. Progress indicators should clarify timing, not decorate unrelated sections.

See [`consulting-motion-storyboard.md`](consulting-motion-storyboard.md) for exact timing.

## 14. Libraries and reference sources

### Runtime dependencies in use

- [`motion`](https://motion.dev) — page progress and once-only viewport reveals without introducing React.
- [`animejs`](https://animejs.com) — composed, once-per-session hero entrance.
- [`simple-icons`](https://simpleicons.org) — toolchain and alternative brand marks.
- CSS transforms/gradients — the browser stage and most product motion.

### Pattern references, not runtime dependencies

- [shadcn/ui](https://ui.shadcn.com) — semantic tokens, accessibility, and composable open-code patterns. Do not copy React components into Svelte.
- [Uiverse](https://uiverse.io) — micro-interaction sketches only; port selectively into the LCG language.
- [Animata](https://animata.design) — CSS-first motion and reduced-motion discipline. This is the assumed intended reference behind “animasterlib.”
- [Origin UI / coss ui](https://coss.com/ui) — component anatomy and state density.
- [Framer](https://www.framer.com) — motion studies and timing prototypes, not the production runtime.

The site stays in SvelteKit. Do not switch to React solely to consume a component library.

## 15. Things that make the site feel generic or AI-made

Avoid:

- Repeated rounded feature cards with identical icon/title/body anatomy.
- Green status dots on every surface.
- Large decorative grids and arbitrary geometry with no content role.
- Excessive gold text.
- Fake browser windows showing invented businesses.
- Unexplained infrastructure metrics.
- Every section fading upward with the same timing.
- Multiple competing glow colors at full saturation.
- Copy that could belong to any agency.
- Direct clones of reference-site layouts or animations.

Prefer:

- One coherent narrative object.
- Real project artifacts.
- Copy-specific compositions.
- Purposeful motion.
- Warm material details.
- Strong editorial typography.
- Fewer, more meaningful claims.
