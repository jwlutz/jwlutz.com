# Polish the hero animation — click legibility, order, progress-bar layout

**Created:** 2026-07-18
**Assigned To:** Fable session
**Completed:** 2026-07-18

## Why

Jack review (2026-07-18, verbatim): "your animations really lack polish. the
hero isn't clicking correctly. the clicks don't look like clicks. you can't
tell the order of things. i think the progress bar should be on top words on
bottom. it needs work. great bones though."

Surface: `PrototypeThroughlineStory.svelte` (Fable-owned). This is a POLISH
pass, not a redesign — keep the story beats, chapters, 26s timeline, and
composition.

## Acceptance criteria

- [x] P1 Clicks read as clicks: cursor press + click ripple at contact point +
      target depress, all synchronized to the click instant; cursor motion
      eased (not linear) with a dwell before contact.
- [x] P2 Order is legible: phase bar accumulates (completed phases stay filled,
      active fills live, future empty); strong active-phase treatment; caption
      change registers and stays in sync with the active phase.
- [x] P3 Progress bar on top, caption words below; bar reads as the primary
      progress indicator. Desktop + 375px.
- [x] Preserve reduced-motion, sessionStorage intro, seek(i), replay(),
      aria-live. Animate transform/opacity/clip-path only; no glow/green
      status. svelte-check 0 errors. Verified by render at desktop + 375px.

## Notes

**2026-07-18 (Fable):** Claimed. Ran a design panel (4 lenses + synthesis) to
lock the approach, implementing + render-verifying in the main loop. Core bug
already found: the phase-fill `scaleX(index===activeChapter ? amount : 0)`
resets completed phases to empty, which is why order is unreadable. @codex:
consulting hero is Fable's surface; your portfolio waves are unaffected.

**2026-07-18 (Fable, to testing):** Shipped via a 4-lens design panel + synthesis
(24-step spec). Every click layer is now a pure function of `story` (seekable,
reduced-motion-safe): cursor press (scale 0.82 at contact), a brass square ring
emitted at the pointer tip, and the target depressing, all firing on the same
frame at four contacts (Notion grab 7.55, address focus 14.10, button 16.35,
refresh 22.48). Cursor travel is eased (cubic in-out) with a dwell before each
contact. Phase bar now ACCUMULATES (root-cause fix: dropped the
`index===activeChapter ? amount : 0` gate) with a brass top-rail and a
three-channel active state; caption retimed to nest inside chapters and
fade/slide-swaps. Layout flipped: progress bar on top, caption + Replay below.
Verified: deterministic timing sim (envelopes peak exactly at contact, fills
accumulate), live DOM at the grab contact (cursor matrix 1.0824, ring o=0.85,
tab depress 0.22), end-frame + mobile captures, svelte-check 0, build green.
Two aesthetic knobs left for Jack's eye on the live loop: press depth (18%) and
ring intensity.

**2026-07-18 (Fable, cursor fix):** Two follow-up bugs from Jack: cursor
vanished between actions, and it didn't land on targets. Root cause of the
latter: the target coords were carried over from old code, not measured — the
"Start a project" button was at x11 but the cursor was sent to x42 (clicking
empty space). Re-measured every target from the live DOM and rebuilt the cursor
as a persistent keyframe path (fades in ~1.4s, then always visible, easing
between measured targets and resting between them). Ring emit points updated to
match. Verified live: grab lands at cx85.996 (tab=86), cursor opacity 1 at
chapter 4 (was 0 before), all contacts route to measured centers. svelte-check 0.
