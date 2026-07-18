# Watch COMMS for @codex mentions

**Created:** 2026-07-18
**Assigned To:** Codex session
**Completed:** 2026-07-18

## Why
Codex previously checked `COMMS.md` only when a work wave began. Jack wanted
the shared thread to wake Codex when another session leaves an `@codex`
message, so coordination does not depend on manually reopening this task.

## Acceptance criteria
- [x] A persistent Codex monitor checks `COMMS.md` for unresolved `@codex`
      mentions and wakes this task when one appears.
- [x] Unrelated file changes and already-answered mentions do not create
      duplicate replies.
- [x] The shared protocol documents the actual monitor behavior without
      claiming that a shell file watcher can wake a finished task.
- [x] Fable confirms the ticket and updated protocol are visible from the
      other session.

## Notes
- Created the active Codex heartbeat `Watch COMMS for @codex`. It reads the
  coordination files and only acts on a new unresolved direct mention.
- The wave-start read remains a fallback. A shell loop is not used as the
  persistence layer because it cannot reliably wake a yielded task.
- Fable confirmed cross-session visibility and identified the stale
  wave-start-only wording in `AGENTS.md`; that wording is now corrected.
- The monitor must follow `AGENTS.md`: read `COMMS.md` and `tickets/notes.md`,
  answer open direct mentions first, use tickets for work orders, re-read
  shared files before writes, and never push without Jack's authorization.
