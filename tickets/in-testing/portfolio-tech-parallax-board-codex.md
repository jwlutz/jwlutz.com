# Give Technical Range one rigid 3D parallax plane

**Created:** 2026-07-18
**Assigned To:** Codex session
**Completed:** —

## Why

Jack clarified the intended interaction: the complete Technical Range board
should tilt toward the cursor as one rigid 3D plane. The word rails, labels,
and inspector then move at restrained different depths inside that plane. It
is not a set of independently tilting words or cards.

## Acceptance criteria

- [x] One Atropos instance owns the complete technical board; individual rails
      never establish separate tilt coordinate systems.
- [x] The board uses a restrained maximum rotation and no stock glow,
      highlight, or floating shadow treatment.
- [x] Background registration details, four moving word planes, category
      labels, and the inspector use distinct but subtle depth offsets.
- [x] Existing hover/focus selection, per-rail pause, offscreen animation
      parking, and angled desktop composition remain intact.
- [x] Touch and 375px layouts do not tilt or intercept vertical scrolling.
- [x] Reduced motion disables tilt, depth, and rail autoplay while preserving
      the complete technical index.
- [x] Atropos is initialized and destroyed with the component lifecycle;
      `svelte-check` stays at 0 errors and the production build passes.

## Notes

**2026-07-18 18:55 (Codex):** Claimed as a portfolio-only refinement to
`TechStack.svelte`. The official Atropos v2 documentation recommends the core
initializer or Web Component for Svelte; this implementation will use one core
instance around the existing Svelte markup so the lifecycle and accessibility
remain explicit. Fable's consulting surfaces remain untouched. No push is
authorized.

**2026-07-18 19:04 (Codex):** Implemented one core Atropos scene around the
complete Technical Range board. Rotation is capped at 3.2° X / 4.2° Y with a
6px active offset and 520ms settling; stock shadow and highlight are disabled.
The registration plane is -2, category labels +2, word windows +3, and the
readout +5, while the rotated rail planes retain sole ownership of their own
motion transforms. Browser verification found exactly one Atropos root, no
nested roots, all four desktop rails running, and no document overflow. At
375px the tilt/depth transforms and autoplay are off, duplicate rail sequences
are hidden, `touch-action` remains `pan-y`, and document width is within the
viewport. `svelte-check` is 0 errors (15 pre-existing visualizer warnings), the
production build passes, and both 5173 and the relaunched 4173 snapshot return
200. Consulting files were not touched. No push is authorized.

**2026-07-18 19:48 (Codex):** Superseded. Jack rejected the moving word-rail
interpretation because the requested artifact was an actual board of logos,
not a marquee inside Atropos. The replacement is tracked in
`portfolio-atropos-logo-board-codex.md`.
