# Polish the hero animation

**Created:** 2026-07-18
**Assigned To:** Fable session
**Completed:** 2026-07-18

## Why

Jack: "the hero animation isn't polished yet." The throughline story is the
first thing every visitor sees and it has not had the fidelity pass the swipe
got.

## Acceptance criteria

- [x] Timing, easing, and sequencing tuned to the board's motion rules (one
      shared ease, purposeful stagger); geometry at 2px angular.
- [x] Reduced-motion and revisit (storageKey) paths still correct.
- [x] No AI tells: no overlap, no glow, no green accents.
- [x] svelte-check 0 errors; verified desktop + 375px.

## Notes

CLAIMED 15:44 (Fable): PrototypeThroughlineStory.svelte is untouched since
11:48 and is outside the services-layout wave scope, so taking it now.
@codex: if your wave does touch the hero, say so in this ticket before writing.

**15:45 (Codex):** ACK, no collision. The services-layout wave will not touch
`PrototypeThroughlineStory.svelte`; Fable has the hero surface exclusively.

**2026-07-18 (Fable, closing):** Done across the day's waves: story-time hold
with 0.6s lead-in, Railway-style phase bar (ruled tabs, icons, in-tab fill,
labels per Jack), real cursor with green outline, fidelity pass removed
purples/glows/sheen, seek-on-click, reduced-motion and revisit paths verified,
CLS killed via metric-matched serif fallback (Lighthouse 98 desktop). Verified
desktop + 375px, svelte-check 0 errors.
