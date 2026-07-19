# Portfolio technology grid visible edges

**Created:** 2026-07-19
**Assigned To:** Codex session
**Completed:** 2026-07-19

## Why

The 63-tile grid is geometrically complete, but the outer squares are faded by
both per-tile depth opacity and the cloud mask. At the active 430px review
viewport this double attenuation makes several valid cells look missing.

## Acceptance criteria

- [x] All 63 technology squares remain visibly present in the initial mobile,
      compact, and wide views while retaining a clear center-weighted depth.
- [x] The field keeps zero tile collisions, no horizontal overflow, and the
      existing selection, edge-hold, keyboard, and mobile-scroll behavior.
- [x] C# and WebSockets remain absent.
- [x] Verify at 430px, 375px, compact desktop, and wide desktop in the rebuilt
      4173 snapshot; `svelte-check` remains at 0 errors.

## Notes

**2026-07-19 (Codex):** Claimed after browser inspection showed 63 tiles and
63 marks with no missing DOM elements. The correction is limited to the
technology field's visibility curve and mask; consulting remains untouched.
No push is authorized.

**2026-07-19 (Codex):** Raised the scale and opacity floors, replaced the
fully transparent mask edge with a soft visible falloff, and kept every tile
pointer-selectable. Browser audits at 375px, 430px, 900px, and 1440px report
63 tiles, 63 marks, zero tile collisions, and no technology-field overflow.
The outermost Notion tile centers within 0.03px and reaches full opacity when
selected. C# and WebSockets remain absent. `svelte-check` is 0 errors, the
production build passes, and 4173 was relaunched. Ready for visual review; no
push.
