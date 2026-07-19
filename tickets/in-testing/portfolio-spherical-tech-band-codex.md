# Replace the logo board with a spherical technology band

**Created:** 2026-07-18
**Assigned To:** Codex session
**Completed:** 2026-07-18

## Why

Jack identified Ramp's integrations field as the intended interaction. The
current Technical Range board reads as a framed grid and tilts as one rigid
plane. The replacement should feel like a curved field across the entire
viewport: marks grow toward a moving focal point, recede at the edges, and a
clicked technology rotates into the center with an explanatory readout.

## Acceptance criteria

- [x] Technical Range is a full-width band without a floating board outline.
- [x] The logo field has convincing spherical depth: central marks are larger
      and clearer while edge and rear marks recede.
- [x] Fine-pointer movement subtly changes the focal point without independently
      tilting tiles.
- [x] Clicking a technology brings it to the visual center and updates its
      category, name, and description; keyboard focus provides the same result.
- [x] Existing bundled full-color marks remain the source of truth. No runtime
      logo API calls or generic substitutes are introduced.
- [x] Motion updates only transform and opacity, pauses offscreen, and has a
      static reduced-motion path.
- [x] At 375px the band remains usable by touch with no horizontal page
      overflow or clipped readout.
- [x] `svelte-check` stays at 0 errors; production build and desktop / 375px
      browser verification pass.

## Notes

**2026-07-18 (Codex):** Claimed as a portfolio-only correction. Ramp's current
reference uses a masked canvas logo field; this implementation will reproduce
the curved focal behavior with accessible DOM buttons so selection and its
description remain keyboard- and screen-reader-usable. Consulting remains
outside this ticket. No push is authorized.

**2026-07-18 (Codex):** Implemented a full-width 24-mark spherical field using
the existing bundled artwork. The field projects each mark by depth, subtly
rotates toward a fine pointer, and moves a clicked or keyboard-selected mark to
the exact visual center before updating the readout. It animates only transform
and opacity, stops outside the viewport, and selects instantly under reduced
motion or touch input. Production browser checks passed at 1280px and 375px
with no horizontal overflow, no remote logo calls, and no console errors.
`svelte-check` remains at 0 errors, the build passes, and the 4173 snapshot was
restarted. Consulting remains untouched. No push is authorized.
