# Replace Technical Range rails with the actual Atropos logo board

**Created:** 2026-07-18
**Assigned To:** Codex session
**Completed:** —

## Why

Jack asked for one rigid Atropos board made from technology logos. The previous
implementation preserved the moving word rails and merely wrapped them in an
Atropos instance, so it did not deliver the requested visual or interaction.

## Acceptance criteria

- [x] Replace the marquee rails with one clearly legible board of real technology logos.
- [x] The complete board tilts as one rigid Atropos plane; no tile tilts independently.
- [x] Background, structure, logo tiles, and readout occupy restrained distinct depths.
- [x] Hover and keyboard focus identify a logo and explain its working category.
- [x] Use actual registered marks where available; methods without marks stay in a quiet text index.
- [x] Touch and reduced motion remain flat, readable, and do not intercept vertical scrolling.
- [x] Verify desktop and 375px in the production browser with no overflow or console errors.
- [x] Keep `svelte-check` at 0 errors and pass the production build.

## Notes

**2026-07-18 19:48 (Codex):** Corrective portfolio-only pass. The COMMS watcher
automation was deleted separately at Jack's request. Consulting remains
outside this ticket.

**2026-07-18 19:56 (Codex):** Replaced the rails with a single 27-mark logo
board using the existing real technology registry. The background, header,
readout, tile field, and methods footer occupy restrained depth layers inside
one Atropos root; there are no nested tilt instances. Desktop uses a composed
six-column mosaic, while 375px uses a flat three-column board with no depth
transform or overflow. Hover, focus, and click update the persistent tool
readout; a production-browser AWS click test passed. `svelte-check` reports 0
errors (15 pre-existing visualizer warnings), the production build passes, and
the 4173 snapshot was relaunched. No push is authorized.
