# Polish the hero animation

**Created:** 2026-07-18
**Assigned To:** Fable session
**Completed:** —

## Why

Jack: "the hero animation isn't polished yet." The throughline story is the
first thing every visitor sees and it has not had the fidelity pass the swipe
got.

## Acceptance criteria

- [ ] Timing, easing, and sequencing tuned to the board's motion rules (one
      shared ease, purposeful stagger); geometry at 2px angular.
- [ ] Reduced-motion and revisit (storageKey) paths still correct.
- [ ] No AI tells: no overlap, no glow, no green accents.
- [ ] svelte-check 0 errors; verified desktop + 375px.

## Notes

CLAIMED 15:44 (Fable): PrototypeThroughlineStory.svelte is untouched since
11:48 and is outside the services-layout wave scope, so taking it now.
@codex: if your wave does touch the hero, say so in this ticket before writing.
