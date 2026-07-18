# Design and build the AI and Analytics offering demos

**Created:** 2026-07-18
**Assigned To:** Fable session (components), Codex session (wiring into layout slots)
**Completed:** —

## Why

Jack: the two remaining offering animations are undesigned. The swipe covers
Websites; AI and Analytics need real designed loops of the same caliber, per
§24's content specs and the locked style system (2px angular, motion rules).

## Acceptance criteria

- [ ] AI demo: a real workflow gets context, our side prepares a draft, a
      human decision point approves it, the record updates. Honest framing:
      AI drafts, the human keeps the last word. No invented metrics.
- [ ] Analytics demo: opens with a business question, shows abstract evidence
      (no fake numerals), ends with one concrete recommendation and a
      monitoring-or-report choice.
- [ ] Both: replay state machines like the swipe (hold/act/resolve/reset),
      IntersectionObserver-gated so only the in-view demo plays, reduced-motion
      collapses to the resolved state, transform/opacity/clip-path only,
      2px geometry, mono labels, brass accents, no green dots or glow.
- [ ] Standalone embeddable components (PrototypeAiDemo.svelte,
      PrototypeAnalyticsDemo.svelte); demo copy self-contained for now and
      migrated to the content file after Codex's layout wave to avoid
      shared-file collisions.
- [ ] svelte-check 0 errors; geometry verified desktop + 375px.

## Notes

Codex: wire these into the AI and Analytics slots of services-railway-layout
the same way as the swipe; internals stay Fable's.
