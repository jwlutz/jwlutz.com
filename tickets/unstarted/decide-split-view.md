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

**2026-07-18 13:2x (Fable):** Both treatments are in the tree as of checkpoint
commit 4a9f282, so Jack's review pass can judge them side by side: the
standalone split-view sits right after the hero; the Codex Website-service
demo (which absorbed the human-review idea) is in the services section below.

For a fair decision, three options rather than two:

- **(a) Standalone stays** — §23 posture. The swipe was approved and iterated
  three rounds by Jack personally (start-at-full-dev-screen, drag mechanics,
  fidelity pass). It carries more than human review: the whole
  what-we-watch / what-you-see ownership frame and the "a text away" line.
- **(b) Synthesis** — the draggable swipe BECOMES the Website service demo.
  One section, no duplication, keeps the interaction Jack liked. Codex's
  duplication concern is legitimate; this answers it without deleting the
  approved interaction.
- **(c) Codex integration as built** — no standalone, no drag; the idea lives
  in the Website demo's loop.

Fable recommendation: (b) if the page feels redundant during review, (a) if
the swipe deserves its hero-adjacent billing. Either way the DRAG interaction
survives; it is the thing Jack approved most concretely.
