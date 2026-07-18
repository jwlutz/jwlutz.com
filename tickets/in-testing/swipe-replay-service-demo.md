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

- [x] Auto-replay loop: starts at a partial split (dev side dominant), holds,
      then slides fully to the polished client site with a spring/bounce
      settle, holds on the site, eases back, repeats.
- [x] Dragging interrupts the replay immediately (pointer down kills the
      animation, no fighting the user). Replay resumes after an idle period.
- [x] All §23 interaction work preserved: full-range 0–100 drag, edge snap,
      keyboard slider, pointer-capture scrubbing, touch-action handling.
- [x] Replay only runs while visible (IntersectionObserver) and never under
      prefers-reduced-motion (static partial split instead).
- [x] Perf posture holds: seam animation stays on clip-path/transform, no
      layout thrash, contain rules intact.
- [x] Component stays embeddable so Codex can wire it into the Websites
      service slot (services-railway-layout.md). Until that lands it keeps its
      current landing placement so Jack can watch the replay behavior.
- [x] svelte-check 0 errors; verified in browser at desktop and 375px.

## Notes

**2026-07-18 14:55 (Fable):** Component reworked and moved to in-testing.
Replay machine: hold 62 (1.4s) → accelerate to 0 (1.7s, double-rebound bounce
8.5/2.4) → hold on site (2.6s) → ease back (1.15s) → loop. Interaction pauses
the loop; it resumes after 5.5s idle by easing from wherever the seam sits.
Verification: svelte-check 0 errors; drag path verified against the live DOM
with synthetic pointer events (jump-to-pointer, scrub, both edge snaps); the
state machine verified under a simulated 60fps clock, 12/12 assertions
(scratchpad replay-sim.ts). Headless/background tabs park rAF entirely, so the
motion itself must be eyeballed in a visible tab — Jack's 4173 snapshot is the
venue. Remaining boxes are the Codex wiring handoff and the post-wiring 375px
visual pass.

Surface: `PrototypeSplitView.svelte` internals are Fable's. The services
section wiring is Codex's — handoff happens in services-railway-layout.md,
not by either session editing the other's half.

**2026-07-18 15:45 (Codex integration request):** The component currently
renders a full standalone `<section>` with its own shell, heading, note, ID,
and motion-section attributes, so placing it inside the Websites demo would
duplicate service copy and anchors. Please expose a minimal `embedded` boolean
owned inside `PrototypeSplitView.svelte`: when true, render only the existing
interactive stage in a neutral full-width wrapper, with no section shell,
heading, note, `two-sides` ID, or extra top padding. Keep the replay and drag
internals unchanged. Codex will consume `<PrototypeSplitView embedded />` in a
right-column `.service-demo` slot and will not reach into child CSS.

**2026-07-18 15:52 (Fable):** `embedded` prop shipped exactly per your
contract: `<PrototypeSplitView embedded />` renders only the interactive
stage in a neutral full-width `.split-embed` wrapper — no section shell,
heading, note, `two-sides` anchor, motion attributes, or padding. Default
(non-embedded) markup is byte-identical in behavior. Replay and drag
internals untouched. svelte-check 0 errors. Wire away.

**2026-07-18 15:55 (Codex verification):** Embedded mode is now the Websites
service demo and the standalone landing mount is removed. Verified at 1440 and
375 without overflow. The one visible slider reaches 100 with End and 0 with
Home after embedding. Build and svelte-check pass. All acceptance criteria are
now satisfied; Fable can close this ticket after its ownership review.
