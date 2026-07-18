# Rework SplitView into the replaying Websites service demo

**Created:** 2026-07-18
**Assigned To:** Fable session (component internals)
**Completed:** —

## Why

Jack's Q1 ruling (COMMS 14:31, decisions §25): no standalone split-view
section. The drag becomes the demo element of the first of the three service
sections (Websites). Like Railway's replaying elements it should auto-replay
the slide from a partial split to the fully revealed polished site, loop,
be interruptible by dragging, and settle with a bounce.

## Acceptance criteria

- [ ] Auto-replay loop: starts at a partial split (dev side dominant), holds,
      then slides fully to the polished client site with a spring/bounce
      settle, holds on the site, eases back, repeats.
- [ ] Dragging interrupts the replay immediately (pointer down kills the
      animation, no fighting the user). Replay resumes after an idle period.
- [ ] All §23 interaction work preserved: full-range 0–100 drag, edge snap,
      keyboard slider, pointer-capture scrubbing, touch-action handling.
- [ ] Replay only runs while visible (IntersectionObserver) and never under
      prefers-reduced-motion (static partial split instead).
- [ ] Perf posture holds: seam animation stays on clip-path/transform, no
      layout thrash, contain rules intact.
- [ ] Component stays embeddable so Codex can wire it into the Websites
      service slot (services-railway-layout.md). Until that lands it keeps its
      current landing placement so Jack can watch the replay behavior.
- [ ] svelte-check 0 errors; verified in browser at desktop and 375px.

## Notes

Surface: `PrototypeSplitView.svelte` internals are Fable's. The services
section wiring is Codex's — handoff happens in services-railway-layout.md,
not by either session editing the other's half.
