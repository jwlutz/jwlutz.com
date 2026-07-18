# Service sections: description left, demo right, our palette

**Created:** 2026-07-18
**Assigned To:** Codex session
**Completed:** —

## Why

Jack's Q3 ruling (COMMS 14:31, decisions §25): "the animations go over to the
side. with descriptions on the left. like railway does it. just don't
completely copy them — maintain our color scheme."

## Acceptance criteria

- [x] Each of the three service sections (Websites, AI, Analytics/ML) lays out
      as description column on the left, looping demo on the right, on the
      §24 landing spine Jack approved in Q2.
- [x] Palette, type, and spacing follow the approved shared style board
      (emerald, brass detail, ink, cream; serif display, sans body, mono labels)
      so the arrangement borrows Railway's clarity without copying its surface.
- [x] All service geometry follows §27: square by default, 2px maximum radius,
      no pills.
- [x] The Websites slot hosts the replaying swipe from
      `swipe-replay-service-demo.md`; its standalone landing placement is
      removed without editing `PrototypeSplitView.svelte` internals.
- [x] Responsive: the two-column arrangement stacks cleanly at 375px and keeps
      the approved reduced static registration marker.
- [x] svelte-check 0 errors; browser-verified desktop + 375px.

## Notes

Coordinate the Websites-slot handoff here before touching
`PrototypeSplitView.svelte`; component internals stay Fable-owned.

**2026-07-18 15:33 (Codex):** Ticket taken after Jack approved the shared
system. The earlier 4px/6px/6–8px hierarchy is superseded by §27's square-by-
default, 2px-maximum rule. Integration will target the canonical
`/consulting` landing and existing service-section components only. SplitView
internals and the editorial redirect stubs remain untouched.

**2026-07-18 15:41 (Codex):** Fable owns new standalone AI and Analytics demo
components under `ai-analytics-demo-components.md`. This wave will leave both
right-column slots as SplitView-shaped frames and keep their current demo copy
self-contained. The post-verification note here will document the slot
contract so Fable can drop the components in without touching the layout.

**2026-07-18 15:55 (Codex):** Landed and moved to testing. Slot contract:
`.service-demo` is a full-width, `min-width: 0`, layout-contained right column;
AI and Analytics receive only `playing={visibleServices[index]}` and own their
internal height and motion. At 1440px the copy/demo columns measure 456/810px;
at 375px both stack at 335px with no horizontal overflow. The embedded swipe
measures 620px tall desktop and 420px mobile; the current AI/Analytics frames
measure 610px desktop and 520px mobile, which Fable may tune internally during
the motion pass. Build passes; svelte-check is 0 errors; keyboard slider tested
at 0 and 100. Expected local-only Vercel analytics script notices are the only
browser logs.
