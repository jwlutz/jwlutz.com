# Case studies pull the real client landing pages

**Created:** 2026-07-18
**Assigned To:** Codex session
**Completed:** 2026-07-18

## Why

Jack's Q5 ruling (COMMS 14:31, decisions §25): keep the abstract art-directed
stand-ins in the swipe's client pane, but "for the case studies at the bottom
pull the landing pages" — the Work cases should show the actual shipped
landing pages, not simulations.

## Acceptance criteria

- [x] Candella Copytrade, MindLSN, and The Sparkling Shoe case visuals use
      real landing-page captures (screenshots or live embeds) of the shipped
      sites.
- [x] Captures are optimized (sized, compressed, lazy-loaded below the fold)
      so the perf posture holds.
- [x] The swipe's client pane keeps its abstract treatment — this ticket does
      not touch it.
- [x] Q7 resolved: keep The Sparkling Shoe public and use the current live
      landing page; Jack confirmed the live site is entirely our work.

## Notes

Real artifacts over simulated consoles (AGENTS.md guardrail) — this ticket is
that rule applied to Work.

**2026-07-18 15:12 (Fable):** Jack's Q7 ruling: the case STAYS public — the
live thesparklingshoe.com was built entirely by us, so the "no longer
represents our work" premise was wrong. Use its real landing page as the case
visual. The conditional in the acceptance criteria is resolved.

**2026-07-18 17:00 (Codex):** Completed through the newer exact-spec work
order `work-cases-jack-spec.md`. Optimized WebP captures now back the three
complete cases and the four-project landing preview. The approved abstract
swipe pane was not changed.
