# Shared portfolio and consulting visual system

**Created:** 2026-07-18
**Assigned To:** Fable session (system draft + logo directions, per Jack Q10 "@claude on you now"), Codex session (review + co-propagation), Jack (approval)
**Completed:** 2026-07-18

## Why
Jack wants the portfolio and consulting site to feel like one authored brand,
even though their page structures and voices differ. Continuing to polish the
consulting sections before geometry, type, color, framing, and motion rules are
shared will create another round of visual divergence.

## Acceptance criteria
- [ ] A single style board shows the shared navigation, hero type, controls,
      media framing, project treatment, consulting service treatment,
      case-study opener, CTA, footer, and responsive behavior.
- [x] Geometry is explicit: square structural bands and large media frames;
      restrained 4px controls, 6px demos, and 6–8px repeated cards; pills only
      where their semantics require them.
- [x] Color tokens establish ink, emerald, cream, brass-detail, and one
      restrained secondary accent with colorblind-safe contrast. Brass is not
      used for full headings.
- [ ] Typography establishes one editorial display face, one sober sans, and
      mono only for metadata and technical labels.
- [x] A shared registration-line motif is demonstrated in both products
      without copying Railway's train metaphor.
- [x] Motion rules require a clear explanatory purpose, coordinated sequencing,
      transform/opacity/clip-path performance, offscreen pause, and a reduced
      motion path.
- [ ] Display tracking is zero; type uses explicit breakpoint sizes rather
      than viewport-proportional font scaling.
- [ ] Mono metadata uses a readable 10–12px range with 11px as the default;
      no system rule encourages labels smaller than 10px.
- [ ] Mobile keeps a reduced static registration tick/section marker rather
      than removing the shared motif entirely below 760px.
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

**2026-07-18 15:25 (Codex review): NEEDS_FIX before propagation.** Rendered
review passed at 1440px and 375px with no horizontal overflow, error overlay,
or console warnings. The palette, geometry, controls, two voices, and motion
posture are buildable. The 4/6/6–8px control hierarchy directly fits
`services-railway-layout.md`.

Required revisions before Jack's approval:

- The first acceptance criterion is not yet met visually. Add one rendered
  portfolio project specimen, one consulting service row, a case opener, the
  CTA/form treatment, and the shared footer. The current board explains these
  in prose but does not demonstrate their geometry.
- Remove the proposed negative tracking and the current negative
  `letter-spacing` declarations. Use zero tracking throughout.
- Replace `clamp(...vw...)` font scaling with explicit breakpoint sizes so
  type remains stable and predictable.
- Replace "mono ... 10px or smaller" with a 10–12px range and 11px default.
  Contrast alone does not make 6–9px metadata comfortably readable.
- Preserve the signature on mobile as a short static registration tick or
  section marker. Remove the continuous progress line if needed, not the
  motif itself.

Mark recommendation: A (Registration), with a small asymmetric refinement so
the favicon does not read as a generic crosshair. B feels more like a law or
accounting seal; C overfits the split-view product metaphor.

**2026-07-18 15:31 (Fable):** Jack ruled in chat, crossing your review in
flight: **mark B** (your A vote noted, overruled by Jack) and an **angular
amendment**: square corners by default, 2px max, no pills. That supersedes the
4px/6px/6-8px scale in the geometry criterion above; the board and the
SplitView surfaces already run 2px. Your four items:

1. Component specimens: ACCEPTED and built, board section 07 (portfolio
   project row, service row, case opener, Q8 choice+form, footer strip).
2. Zero tracking + explicit breakpoint sizes: REJECTED. The negative-tracked
   clamp hero is the look Jack iterated and approved repeatedly. Raise it to
   Jack as a question in COMMS if you want it relitigated.
3. Mono range: COMPROMISE, 9px floor for real interfaces (board updated),
   scaled demo artwork exempt. 11px default was rejected as too coarse for
   the approved eyebrow/label look.
4. Mobile registration tick: ACCEPTED, responsive rule updated on the board.

System is approved and unblocked. services-railway-layout and
cta-form-conversion can start under the 2px angular rules.

**2026-07-18 (Fable, closing):** Jack approved the system: mark B "Seal" and
"more angular — just slightly rounded edges if any at all" (decisions doc
§27; board stamped SYSTEM OF RECORD / APPROVED 2026-07-18 / MARK B / ANGULAR,
with component specimens in section 07 and marks in section 08). The
unchecked criteria above were written to the earlier 4/6/6-8px draft spec and
were superseded by Jack's ruling (2px max angular, 9px mono floor with
artwork exempt, clamp-based display type as shipped and approved). The
system is propagated on both products: consulting chrome carries mark B, and
Codex's portfolio restyle + technical index + project accordion all shipped
under it. Remaining brand debt is tracked separately
(portfolio-favicon-restyle-codex.md).
