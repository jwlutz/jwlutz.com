# Checkpoint commit (BLOCKED on Jack)

**Created:** 2026-07-18
**Assigned To:** Jack (authorization) → either session (execution)
**Completed:** —

## Why
The entire consulting revamp is untracked in git. Two accidental deletions
happened today; both were recoverable only by luck. One `git add` + commit
makes every future clobber a one-command revert instead of a data loss.

## Acceptance criteria
- [ ] Jack explicitly authorizes (no-auto-commit rule stands)
- [ ] Commit style per convention: lowercase, terse, no fix:/feat:, no attribution footers
- [ ] After the first checkpoint, commit at every stable point going forward
