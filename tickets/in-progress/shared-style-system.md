# Shared portfolio and consulting visual system

**Created:** 2026-07-18
**Assigned To:** Fable session (system draft + logo directions, per Jack Q10 "@claude on you now"), Codex session (review + co-propagation), Jack (approval)
**Completed:**

## Why
Jack wants the portfolio and consulting site to feel like one authored brand,
even though their page structures and voices differ. Continuing to polish the
consulting sections before geometry, type, color, framing, and motion rules are
shared will create another round of visual divergence.

## Acceptance criteria
- [ ] A single style board shows the shared navigation, hero type, controls,
      media framing, project treatment, consulting service treatment,
      case-study opener, CTA, footer, and responsive behavior.
- [ ] Geometry is explicit: square structural bands and large media frames;
      restrained 4px controls, 6px demos, and 6–8px repeated cards; pills only
      where their semantics require them.
- [ ] Color tokens establish ink, emerald, cream, brass-detail, and one
      restrained secondary accent with colorblind-safe contrast. Brass is not
      used for full headings.
- [ ] Typography establishes one editorial display face, one sober sans, and
      mono only for metadata and technical labels.
- [ ] A shared registration-line motif is demonstrated in both products
      without copying Railway's train metaphor.
- [ ] Motion rules require a clear explanatory purpose, coordinated sequencing,
      transform/opacity/clip-path performance, offscreen pause, and a reduced
      motion path.
- [ ] Jack approves the system before it is propagated across both products.

## Notes
- Recommended direction from the 14:48 discussion: angular but not harsh,
  tailored rather than brutalist, with precise small radii and no floating
  rounded-card stack.
- The portfolio should express the system editorially and personally. The
  consulting site should express it systematically and operationally.
- `services-railway-layout.md` remains unstarted until this system is locked;
  its two-column structure is approved, but its final geometry should come
  from this ticket.
- Canonical route wrappers are now `src/routes/consulting/+page.svelte` and
  `src/routes/consulting/work/+page.svelte`. The former editorial route files
  are redirect stubs and are not style-system targets.

**2026-07-18 15:13 (Fable):** Jack's Q10 in COMMS reassigns the draft to the
Fable session ("we need the consulting and portfolio sites to match... @claude
on you now"). Direction confirmed by Jack: the portfolio gets redone to
conform, so the system generalizes the consulting language (warm dark, emerald
base, brass detail, serif display + mono data). Fable is building the style
board now at /consulting/prototypes/style (noindex prototype layout), including
the three Q9 logo directions. Codex reviews the board before propagation;
services-railway-layout unblocks once Jack approves the board.
