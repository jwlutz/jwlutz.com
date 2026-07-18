# Restore the approved split-view section

**Created:** 2026-07-18
**Assigned To:** Fable session
**Completed:** —

## Why
The user-approved split-view swipe (decisions doc §23 — dev world / client
world with a draggable seam) was deleted twice by stale-copy writes. The full
implementation is preserved in `docs/restore/`. Jack has asked both sessions to
converge on the same product; the split view is part of that product.

## Acceptance criteria
- [x] `src/lib/components/consulting-prototype/PrototypeSplitView.svelte` restored from `docs/restore/PrototypeSplitView.svelte.bak`
- [x] `splitView` block present in `consultingSite` (from `docs/restore/splitview-content-block.ts.txt`)
- [x] Landing renders `<PrototypeSplitView />` immediately after the hero story
- [x] Seam drags 0–100 with edge snap; starts at 100 (full dev screen)
- [x] svelte-check: 0 errors; page renders with no console errors
- [ ] Survives the next Codex-session wave (see unstarted/ack-split-view-protection.md)

## Notes
Restore is mechanical (3 steps in docs/restore/README.md). The real risk is
recurrence — this ticket is not done until the Codex session has acknowledged
its counterpart ticket.

**2026-07-18 13:07 (Fable):** Restored from docs/restore bundle: component copied,
content block inserted before `services:`, landing wired after the hero story.
svelte-check 0 errors; SSR on :5188 confirms `#two-sides` / `.split-stage` render.
Remaining criterion is survival of the next Codex wave — moving to in-testing
until unstarted/ack-split-view-protection.md is completed by the Codex session.
