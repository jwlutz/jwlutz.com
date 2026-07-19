# Turn Technical Range into an interactive infinite index

**Created:** 2026-07-18
**Assigned To:** Codex session
**Completed:** —

## Why

Jack suggested replacing the static technical ledger with an infinite-scroll
experience where visitors can hover to see the full technology set. The motion
should add discovery and personality without becoming a generic logo marquee.

## Acceptance criteria

- [x] Four editorial rails expose the real technologies across build, data,
      infrastructure, and research work; no decorative or invented tools.
- [x] Rails move slowly in alternating directions and pause when hovered or
      keyboard-focused; the focused item reveals concise, honest usage context.
- [x] Geometry, typography, and color stay inside the shared portfolio system:
      angular rules, cream / ink / emerald / brass, no pills, glow, or green
      status treatments.
- [x] Animation is transform-only, visibility-gated, and static under
      `prefers-reduced-motion`.
- [x] Touch uses a manually scrollable, snap-friendly treatment rather than an
      ungrabbable autoplay strip.
- [x] `svelte-check` remains at 0 errors; desktop and 375px browser geometry
      pass without overflow or text collisions.

## Notes

**2026-07-18 18:03 (Codex):** Claimed as a portfolio-only refinement. Fable's
consulting copy-centralization wave remains untouched. The interaction will
replace only `src/lib/components/TechStack.svelte` and preserve the existing
`#skills` route contract.

**2026-07-18 18:06 (Codex):** Implemented and moved to testing. The former
four-column ledger is now an editorial working index with four alternating
rails and one large shared inspector. All 56 current entries come directly
from `content.yaml`, so Jack can still edit the list without touching the
component. Hover, focus, and click update the inspector; focusing a desktop
item pauses only its rail while the other three continue. IntersectionObserver
parks every animation offscreen. Widths at 1280 and 375 were 1271/1280 and
366/375 respectively, with no text collisions or console errors. At 375px the
duplicate sequences are removed, animations are disabled, and each rail is a
manual snap-scroller. `svelte-check` is 0 errors (15 pre-existing warnings) and
the production build passes.
