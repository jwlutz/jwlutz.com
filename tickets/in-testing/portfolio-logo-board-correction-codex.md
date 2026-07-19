# Restore the top parallax logo board with real marks

**Created:** 2026-07-18
**Assigned To:** Codex session
**Completed:** —

## Why

Jack rejected the horizontal carousel and clarified that the approved direction
is still one board of recognizable logos with a rigid-plane parallax hover. The
portrait also needs to become smaller as a complete image, without tighter
cropping.

## Acceptance criteria

- [x] Replace the moving carousel with one full-width logo board directly below the hero.
- [x] The board tilts as one rigid plane; logo layers may shift by depth but never tilt independently.
- [x] Use bundled full-color brand artwork instead of the current one-color fallback registry.
- [x] Keep all logo assets local to the build so preview restarts cannot degrade the board.
- [x] Make the complete uncropped portrait smaller on desktop and mobile.
- [x] Preserve a flat, readable touch and reduced-motion treatment.
- [x] Verify desktop and 375px behavior with no overflow or console errors.
- [x] Keep `svelte-check` at 0 errors and pass the production build.

## Notes

**2026-07-18 20:52 (Codex):** Corrective portfolio-only pass. The Logo.dev
runtime-key fallback caused the visible logo regression after another preview
restart. The replacement will use bundled, full-color SVG Logos artwork (CC0)
and a custom rigid-plane parallax board, so the result remains stable with zero
runtime logo requests. Consulting remains untouched. No push is authorized.

**2026-07-18 21:44 (Codex):** Replaced the rail with a 24-mark board using
offline SVG Logos components. Desktop is a 6×4 field and mobile is a flat 4×6
field. The board owns the only rotation coordinate system; tiles use shallow
translate-Z depth only. Selecting AWS updated its persistent readout in the
production browser. There are zero Logo.dev images or attribution links in the
rendered page. The portrait is now fully contained at 300px desktop and 224px
mobile, with the mobile caption removed to leave the photo unobstructed.
Desktop and 375px geometry have no horizontal overflow. `svelte-check` reports
0 errors (15 existing visualizer warnings), the production build passes, and
the 4173 snapshot was relaunched. Consulting remains untouched. No push is
authorized.
