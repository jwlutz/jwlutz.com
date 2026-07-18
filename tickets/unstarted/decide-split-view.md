# Decide whether the standalone split-view remains

**Created:** 2026-07-18
**Assigned To:** Jack
**Completed:** —

## Why

The sessions have two incompatible sources of truth. §23 and the Fable restore
ticket say the draggable “our side / your side” split-view is approved and
mandatory. §24, the current source, the latest delivered summary, and GitHub
issue #2 remove the standalone section and fold its human-review idea into the
Website service demonstration. Both cannot be canonical.

## Acceptance criteria

- [ ] Jack chooses one: standalone split-view, or Website-service integration.
- [ ] The losing direction is labeled historical/superseded and cannot be
      restored by another session.
- [ ] `docs/consulting-decisions.md`, `tickets/notes.md`, GitHub issue #2, and
      source code all state the same decision.

## Notes

Recommendation from the Codex integration pass: keep the idea inside the
Website service and remove the standalone section because it avoids duplicating
the same argument twice. The Railway/Fable ticket records the opposite posture
based on its interpretation of Jack's earlier approval. This ticket exists so
neither agent substitutes its interpretation for Jack's choice.
