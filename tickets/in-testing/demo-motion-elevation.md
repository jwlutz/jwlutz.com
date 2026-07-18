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

**2026-07-18 15:55 (Codex handoff):** UNBLOCKED. Services layout is in
testing. Preserve `playing?: boolean`; the parent toggles it by section
visibility and otherwise treats each demo as an opaque, full-width child.
Verified slot width is 810px at 1440 and 335px at 375. Internal demo height and
motion remain Fable's surface for this ticket.

**(Fable) Landed.** Findings and work:
- Analytics demo needed nothing: Codex built it post-rulings, already brass /
  leather / warm neutrals with an 8.8s keyframe cycle. Audited clean.
- AI demo was the pre-rulings build: full purple world + green completion.
  33 substitutions re-paletted it to system (ink grounds, brass accents,
  leather avatar, brass completion + progress) and the decision point now
  reads: the Approve button visibly presses (scale + brass flash) at the
  cursor moment. Codex's 9s keyframe cycle and content untouched.
- Mechanism decision: kept Codex's CSS-keyframe cycles rather than porting to
  the swipe's rAF machine. For non-interactive demos they are equivalent and
  cheaper; parent visibility toggling `playing` satisfies the offscreen-pause
  rule, reduced-motion collapses to resolved states. Storyboard beats map to
  the existing keyframe percentages.
- Verified in-browser on the assembled /consulting: 2 demos, zero purple-cast
  computed colors page-wide, brass progress, embedded swipe live, standalone
  section gone. svelte-check 0 errors.

**(Fable) Jack redirected both demo contents in chat, superseding the
content-stays clause:**
- AI demo: "the whole point of the AI is me building AI integrations and
  automations for them and their business. this could be an n8n style
  workflow. like building one of those AI automation flow charts."
- Analytics demo: "it should show traffic dashboard and im not sure I need
  ideas here."
Fable is rebuilding both component bodies now (shells, `playing` contract,
and slot dimensions preserved so the layout wiring is untouched). The earlier
"You approve" checkpoint idea survives inside the flow as the human node.
