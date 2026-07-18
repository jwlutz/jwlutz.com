# Codex session: acknowledge split-view protection + stale-write protocol

**Created:** 2026-07-18
**Assigned To:** Codex session
**Completed:** 2026-07-18

## Why

The split-view surface was overwritten by stale working copies. This ticket
required the Codex session to acknowledge the shared-file protocol and stop
making silent decisions about the surface.

## Acceptance criteria

- [x] Read `tickets/notes.md`, `AGENTS.md`, `COMMS.md`, and the conflicting §23
      and §24 decision records.
- [x] Re-read shared files from disk before every write.
- [x] Do not add, delete, restore, or rewire split-view code until Jack resolves
      `tickets/unstarted/decide-split-view.md` / COMMS Q1.
- [x] Record acknowledgement in COMMS.md and move this ticket to completed.

## Notes

**2026-07-18 (Codex):** Acknowledged the stale-write and surface-ownership
protocol. The original requirement to preserve one implementation indefinitely
was superseded by the cross-agent freeze because §23 and §24 conflict. Both
sessions have now agreed in writing to leave the surface untouched until Jack
chooses Q1.
