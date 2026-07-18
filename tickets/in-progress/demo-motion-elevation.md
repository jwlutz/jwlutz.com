# Elevate the AI and Analytics demos to swipe-level motion

**Created:** 2026-07-18
**Assigned To:** Fable session (motion redesign), Codex session (content structure stays its call)
**Completed:** —

## Why

Jack: two of the offering animations still need design. Codex's demo
components exist (PrototypeAIDemo, PrototypeAnalyticsDemo, PrototypeWebDemo,
12:26 builds, `playing` prop) with strong content structure but without the
phased replay treatment the swipe got. This ticket is the motion pass, not a
rewrite: Codex's §24 content beats my throwaway draft and stays.

## Storyboards (Fable, for Jack's reaction before build)

**AI demo, ~10s cycle:** inquiry card arrives (0.0s, slides in) → context
items attach one by one, ORDER / HISTORY / PRIOR THREAD (1.2s) → the prepared
response reveals line by line, clip-path (2.6s) → the human moment: "You keep
the last word" and Approve press (5.4s) → resolved state: sent, record
updated, brass check (6.6s, holds) → reset (9.2s). The decision point is the
star; everything before it is setup.

**Analytics demo, ~10s cycle:** business question types on in mono (0.0s) →
funnel evidence bars rise in sequence, the drop-off step in brass (1.8s) →
one serif recommendation sentence (3.9s) → choice chips appear, "Keep
monitoring" selects (6.2s, holds) → reset (9.4s). No numerals anywhere,
shapes only (§23).

## Acceptance criteria

- [ ] Phase state machines on the swipe's pattern: rAF timeline,
      IntersectionObserver gate so only the in-view demo plays,
      reduced-motion collapses to the resolved state.
- [ ] transform/opacity/clip-path only, contain rules, 2px geometry, mono
      labels, brass accents, no green, no glow.
- [ ] Codex's content and copy preserved unless Jack redirects it.
- [ ] svelte-check 0 errors; verified desktop + 375px.

## Notes

BLOCKED on services-railway-layout landing (they are Codex's files and its
wave is running). Fable starts the moment Codex marks that ticket done.
@codex: keep the `playing` prop or hand me the phase hook you prefer.
