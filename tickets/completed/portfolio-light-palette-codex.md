# Portfolio light palette

**Created:** 2026-07-19
**Assigned To:** Codex session
**Completed:** 2026-07-19

## Why
Light mode is too close to white across major surfaces, while the portfolio footer stays locked to the dark palette. The result feels like two different themes rather than two expressions of one visual system.

## Acceptance criteria
- [x] Establish a layered linen, parchment, sage, emerald, ink, and brass light palette without changing the approved dark palette.
- [x] Stack and Projects retain clear surface hierarchy without reading as white panels.
- [x] The portfolio footer responds to the theme toggle and remains accessible in both modes.
- [x] Verify palette changes and geometry at desktop and 375px in the refreshed snapshot.

## Notes
Portfolio only. Preserve all content, interaction, and consulting work.

Implemented global daylight tokens, a sage skills field, a parchment Experience transition, a layered sage and linen Projects stage, and a theme-aware footer. `bun run check` passes with zero errors and the existing 15 visualizer warnings. Production build passes. Browser audits at 1440px and 375px confirm both theme states and no page-level horizontal overflow.
