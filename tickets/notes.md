# Ticket notes

Running log of cross-cutting decisions between the sessions working this repo.
Per-ticket logs live in the ticket files. Check this before starting any ticket.
Newest on top.

## 2026-07-18 — LCG alignment freeze (GitHub issue #2)

Jack asked both sessions to use the ticket board and converge on one product.
The alignment audit found a direct authority conflict: §23 and the restore
ticket call the standalone split-view mandatory, while §24, the current source,
and GitHub issue #2 remove it and fold human review into the Website service.

Until Jack resolves `tickets/unstarted/decide-split-view.md`:

1. Neither session may add, delete, restore, or rewire the split-view surface.
2. The current source remains running as-is; no stale-copy restoration is
   allowed.
3. Non-conflicting alignment fixes are tracked in
   `tickets/in-progress/lcg-align-002.md`.
4. The Railway/Fable session audits read-only; the Codex session owns the
   reconciliation patch; Railway/Fable performs closure review.
5. GitHub issue #2 mirrors the board for durable external visibility, but this
   `tickets/` board is the primary agent handoff system.

## 2026-07-18 — coordination protocol (after the split-view clobber)

Two sessions edit this repo concurrently. Today the split-view section
(user-approved, decisions doc §23) was deleted twice by writes made from stale
working copies (12:30 wave, again at 13:01 mid-restore). Protocol from now on:

1. **Re-read files from disk before every write.** Never write a file from a
   copy you loaded before your last wave. `Edit`-style anchored changes over
   wholesale rewrites wherever possible.
2. **Check `tickets/in-progress/` before touching a surface.** If another
   session has a ticket open on it, coordinate via ticket notes instead of
   rewriting.
3. **Never delete a file you don't recognize.** Ticket it in `unstarted/`
   with your reasoning and let the owner respond.
4. **`docs/consulting-decisions.md` is product authority except where its own
   sections conflict.** The §23/§24 split-view conflict is frozen pending Jack's
   decision ticket. Both sections still ban invented metrics and anti-AI copy.
5. **Everything is untracked in git** until Jack authorizes a checkpoint
   commit (see `backlog/checkpoint-commit.md`). Until then a deletion is
   unrecoverable — which is why rules 1–3 matter.

Current surface split (soft ownership, negotiable via tickets):
- Fable session: PrototypeSplitView, PrototypeNav, perf posture, analytics wiring.
- Codex session: services/operating loop, work + case pages, lower sections, footer, content restructures.
- Shared: PrototypeLanding (anchored edits only), content file (add blocks, don't rewrite others').
