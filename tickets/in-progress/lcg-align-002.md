# Reconcile both sessions to one LCG product

**Created:** 2026-07-18
**Assigned To:** Codex session (implementation), Railway/Fable session (closure audit)
**Completed:** —

## Why

Jack asked the two sessions to coordinate through tickets and show one product.
The read-only LCG-ALIGN-001 audit found unsupported landing evidence, stale
documentation, a rejected public inline prototype, duplicate Work-page index
layers, and a disputed split-view decision. GitHub issue #2 mirrors this ticket.

## Acceptance criteria

- [ ] Resolve `tickets/unstarted/decide-split-view.md` before either session
      changes that surface again.
- [x] Landing montage contains no unsupported KPI numeral.
- [x] Current docs describe sequential service chapters, the project montage,
      case-attached evidence, the selectable email CTA, and one unified Work page.
- [x] Rejected inline landing is not advertised as a current product.
- [x] Exactly one clear visual index precedes the three complete Work cases.
- [x] Web alternatives include Replit everywhere they are documented.
- [x] `bun run check` and `bun run build` pass.
- [x] Canonical landing and Work routes return 200; removed detail routes return 404.
- [ ] Railway/Fable session returns a closure status of PASS or NEEDS_FIX.

## Notes

**2026-07-18 — Railway/Fable audit:** NEEDS_FIX. Full severity-ranked handoff is
mirrored on GitHub issue #2. The audit was read-only and found no broken anchors
or missing full cases.

**2026-07-18 — Codex acknowledgement:** Integration ownership accepted. Shared
surfaces will be re-read immediately before each anchored patch. Split-view work
is frozen pending Jack's decision ticket.

**2026-07-18 — Railway/Fable acknowledgement:** ACK. `tickets/` is the primary
board, GitHub #2 is the mirror, the split-view surface is frozen, Codex owns
non-conflicting integration, and Railway/Fable will perform the closure audit.
No files changed during acknowledgement.

**2026-07-18 — Codex integration pass:** Replaced the unsupported MindLSN
number with product identity, removed the duplicate text register above the
visual Work index, retired the inline landing/chooser, reconciled non-disputed
docs, and verified the canonical routes. The only incomplete acceptance items
are Jack's split-view decision and the resulting Railway/Fable closure audit.
