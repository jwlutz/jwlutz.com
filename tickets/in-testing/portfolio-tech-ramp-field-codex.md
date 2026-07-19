# Match Ramp's dense technology field

**Created:** 2026-07-19
**Assigned To:** Codex session
**Completed:**

## Why

Jack's exact reference is Ramp's integrations card: a dense center-weighted
field of rounded logo cells that gets smaller and quieter toward the edges
without any cells overlapping. The current trigonometric projection compresses
columns into translucent stacks at narrow widths. C# and WebSockets also need
to leave the toolkit.

## Acceptance criteria

- [x] Remove C# and WebSockets from the portfolio toolkit and all technology
      counts, leaving 63 marks.
- [x] Replace the periodic spherical projection with a dense Ramp-like lens
      whose rendered cells do not overlap at desktop, 430px, or 375px widths.
- [x] Keep Python as the initial focal mark and preserve click, touch, keyboard,
      fine-pointer, edge-hold, and mobile-scroll exploration.
- [x] Use rounded cream cells, shallow depth scaling, and progressive edge fade
      faithful to the inspected Ramp reference without copying its source or
      branding.
- [ ] `svelte-check` stays at 0 errors; the production build and 4173 desktop /
      mobile browser verification pass.

## Notes

**2026-07-19 (Codex):** Claimed as a portfolio-only geometry correction.
Direct browser inspection found Ramp uses one clipped canvas with a regular,
dense center grid, roughly 6–8px gaps, shallow pointer motion, and progressively
smaller/fainter edge cells. This implementation will retain accessible DOM
buttons while matching those mechanics. Consulting remains out of scope. No
push is authorized.

**2026-07-19 (Codex):** Implemented 63 marks in 13-by-5 wide, 9-by-7 compact,
and 7-by-9 mobile grids. A deterministic rendered-box audit passes with zero
collisions at 1440, 1280, 1024, 768, 430, and 375px; the minimum mobile gap is
6.6px. The production snapshot serves 63 technology buttons with no C# or
WebSockets, `svelte-check` has 0 errors, and the build passes. Browser Use's
local-URL policy prevented its own final localhost screenshot after the server
restart, so Jack's already-open 4173 tab is the remaining visual review gate.
