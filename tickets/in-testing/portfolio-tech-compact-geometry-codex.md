# Correct compact technology-lens geometry

**Created:** 2026-07-19
**Assigned To:** Codex session
**Completed:** 2026-07-19

## Why

Jack's 2x screenshot shows the 430px mobile technology lens collapsing into
tall translucent stacks. Its five-column grid creates thirteen compressed rows,
so scaled logo tiles overlap instead of reading as Ramp-like cells on a shallow
spherical surface. The same surface also needs a compact desktop step between
mobile and the full 13-column field.

## Acceptance criteria

- [x] Add a compact desktop projection between the wide field and 375px mobile.
- [x] Keep visible logo tiles separated enough to read as rounded cells instead
      of overlapping pills.
- [x] Preserve Python as the initial anchor and the relevance-first nearby stack.
- [x] Preserve dark mode, edge-hover movement, mobile scroll movement, and all
      click, touch, focus, and keyboard interactions.
- [x] Verify wide desktop, the screenshot's compact width, and 375px with all 65
      marks, no horizontal overflow, and no browser errors; `svelte-check` stays
      at 0 errors.

## Notes

**2026-07-19 (Codex):** Claimed as a portfolio-only responsive correction.
Consulting surfaces remain out of scope. No push is authorized.

**2026-07-19 (Codex):** Replaced the five-by-thirteen mobile projection with a
seven-by-ten field, added an eleven-column compact desktop step, reduced tile
mass with depth, and expanded the vertical arc. At Jack's exact 430px viewport,
all 65 marks remain in the DOM, Python opens active, the visible field has zero
tile collisions and no overflow, selection lands on the intended mark, and
normal page scroll moves the lens. A deterministic 375px geometry audit also
reports zero collisions across 65 marks. Wide desktop retains the 13-column
field and verified edge-hover movement. Pointer focus no longer moves a tile
before the click completes; keyboard focus still centers it. `svelte-check` is
0 errors (15 pre-existing visualizer warnings), the build passes, and the 4173
snapshot was relaunched.
