# Unify portfolio and consulting lanes

**Created:** 2026-07-19
**Assigned To:** Codex session
**Completed:** 2026-07-19

## Why

Jack wants the portfolio and consulting practice to read as two lanes of one
site. The portfolio hierarchy, navigation labels, contact language, and social
links need to reflect that system, and consulting needs an obvious path back to
the personal portfolio.

## Acceptance criteria

- [x] Portfolio order is Hero, Stack, Experience, Projects, Contact in the DOM,
      primary navigation, active-section tracking, and footer directory.
- [x] The skills title reads “Technical Skills and Technologies.”
- [x] “Selected work” becomes “Projects” on every user-facing production route,
      including consulting metadata and navigation copy.
- [x] “Let’s make it work.” becomes “Let’s Make Something.”
- [x] Portfolio header and footer include accessible clickable GitHub, LinkedIn,
      and email marks; the literal email address is removed from the footer.
- [x] Portfolio exposes Consulting and consulting exposes Portfolio in desktop
      and mobile navigation, with footer routes supporting the same two lanes.
- [x] `svelte-check` stays at 0 errors; production build and 4173 route/content
      checks pass without including unrelated consulting edits.

## Notes

**2026-07-19 (Codex):** Claimed after announcing the cross-surface edit in
COMMS. The consulting change is limited to an anchored lane-switch addition in
`PrototypeNav.svelte` plus canonical copy changes; all current service,
throughline, split-view, and CTA behavior remains untouched. No push is
authorized.

**2026-07-19 (Codex):** Implemented and verified in the rebuilt production
snapshot at `http://127.0.0.1:4173`. The rendered section IDs appear in the
requested order, `/`, `/consulting`, and `/consulting/work` return 200, both
consulting routes expose the portfolio lane, and the removed phrases no longer
appear in `src`. `svelte-check` reports 0 errors; the remaining 15 warnings are
pre-existing visualizer warnings. Ready for Jack's visual review; no push.
