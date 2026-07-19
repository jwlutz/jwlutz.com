# Remove portfolio section numbering and naturalize the portrait

**Created:** 2026-07-18
**Assigned To:** Codex session
**Completed:** —

## Why

Jack does not like the template-like numbered section labels or the green tint
over his headshot. Keep the editorial hierarchy, but make the labels feel less
systematic and let the portrait read as a natural photograph.

## Acceptance criteria

- [x] Remove `01 /` through `04 /` from the four portfolio section labels.
- [x] Keep functional project and carousel position indices intact.
- [x] Remove the emerald portrait wash and restore natural skin and background color.
- [x] Preserve enough neutral contrast for the portrait caption to remain legible.
- [x] Verify desktop and 375px layouts in the running browser with no overflow.
- [x] Keep `svelte-check` at 0 errors and pass the production build.

## Notes

2026-07-18: Claimed as a narrow portfolio-only polish pass. Consulting files
are outside this ticket.

2026-07-18: Removed the separate hero `01` in addition to the four label
prefixes so the numbered section system is fully absent. The portrait filter is
now near-natural (`saturate(.98) contrast(1.03) brightness(.93)`) and its two
emerald overlays were replaced by a neutral lower vignette. Production-browser
QA passed at desktop and 375px with no horizontal overflow or console errors.
`svelte-check` reports 0 errors and 15 pre-existing visualizer warnings; the
production build passes. Both 5173 and relaunched 4173 return 200.
