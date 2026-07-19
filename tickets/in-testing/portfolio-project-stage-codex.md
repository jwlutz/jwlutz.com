# Replace the project accordion with a fixed evidence stage

**Created:** 2026-07-18
**Assigned To:** Codex session
**Completed:** 2026-07-18

## Why

Jack rejected the expanding project accordion and chose a six-project portfolio
edit built around real project evidence. The current accordion changes width,
repeats labels, compresses the active story, and turns into an overly tall
mobile stack. A fixed stage should make the work easier to scan while giving
each project enough room to look finished.

## Acceptance criteria

- [x] Feature exactly these six projects in this order: Candella Quant,
      Wikipedia Speedrun, Claude-o-Meter, Learning ML, UCLA Dining, tinynccl.
- [x] Candella Quant links to `https://candella.dev/quant`; each other public
      project keeps an accurate source or live link.
- [x] Desktop uses a stable project index plus a fixed-size active visual stage;
      selection changes content without resizing the surrounding layout.
- [x] Project visuals come from real screenshots, repositories, plots, or
      architecture artifacts; missing evidence is generated from project
      outputs rather than generic product mockups.
- [x] The active story stays concise: category, title, one explanation, two
      proof points, a restrained technology row, and clear actions.
- [x] Mobile becomes a compact horizontal scroll-snap story set with no tall
      accordion and no horizontal page overflow.
- [x] Selection is keyboard accessible, motion uses only transform / opacity /
      clip-path, and reduced motion is static.
- [x] `svelte-check` stays at 0 errors; production build and desktop / 375px
      browser verification pass.

## Notes

**2026-07-18 (Codex):** Claimed as a portfolio-only replacement for
`portfolio-project-accordion-codex.md`. Repository and live-surface evidence is
being audited before implementation. Consulting remains untouched. No push is
authorized.

**2026-07-18 (Codex):** Built the approved six-project edit. Candella Quant,
Wikipedia Speedrun, Claude-o-Meter, and Learning ML use repository or live-site
artifacts. UCLA Dining and tinynccl use project-specific architecture
compositions derived from their real systems. Desktop keeps a 720px stage while
the active story changes; 375px uses six 330px scroll-snap cards with no page
overflow. Keyboard selection, reduced motion, external links, `svelte-check`,
the production build, and desktop/mobile browser geometry all pass. The 4173
review snapshot was rebuilt and relaunched. Consulting remains untouched. No
push is authorized.
