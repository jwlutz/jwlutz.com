# Service sections: description left, demo right, our palette

**Created:** 2026-07-18
**Assigned To:** Codex session
**Completed:** —

## Why

Jack's Q3 ruling (COMMS 14:31, decisions §25): "the animations go over to the
side. with descriptions on the left. like railway does it. just don't
completely copy them — maintain our color scheme."

## Acceptance criteria

- [ ] Each of the three service sections (Websites, AI, Analytics/ML) lays out
      as description column on the left, looping demo on the right, on the
      §24 landing spine Jack approved in Q2.
- [ ] Palette, type, and spacing stay ours (emerald base, brass/ink/cream,
      serif display + mono labels) — the arrangement is Railway's, the
      surface is not.
- [ ] The Websites slot hosts the replaying swipe from
      swipe-replay-service-demo.md (Fable delivers the component; this ticket
      wires it and removes the standalone landing placement).
- [ ] Responsive: the two-column arrangement stacks cleanly at 375px.
- [ ] svelte-check 0 errors; browser-verified desktop + 375px.

## Notes

Coordinate the Websites-slot handoff in this ticket's Notes before touching
`PrototypeSplitView.svelte` — component internals stay Fable-owned.
