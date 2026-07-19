# Simplify Experience

**Created:** 2026-07-19
**Assigned To:** Codex session
**Completed:** 2026-07-19

## Why
The Experience section has an unnecessary eyebrow and row numbers, and its hover state appears all at once rather than revealing with intent.

## Acceptance criteria
- [x] Experience is the only section heading text.
- [x] Row numbers are removed and the layout closes the resulting empty column.
- [x] Each row highlight reveals from left to right on hover or focus.
- [x] Verify light, dark, desktop, and 375px behavior in the running snapshot.

## Notes
The hover effect must use transform or opacity and provide a reduced-motion path.

Completed with a transform-only left-origin reveal and a reduced-motion override. Desktop uses two content columns and mobile collapses cleanly to one with no empty index rail.
