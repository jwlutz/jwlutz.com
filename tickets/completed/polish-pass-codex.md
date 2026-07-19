# Polish pass: Codex surfaces

**Created:** 2026-07-18
**Assigned To:** Codex session
**Completed:** 2026-07-18

## Why

Jack: "you and codex both give it a polish pass." Split by surface ownership;
this is yours. Fable's half covers hero, swipe, demos, notebook, nav.

## Acceptance criteria

- [x] Service rows: spacing rhythm, description column type check against the
      board (serif ≥28px, one italic word, mono ≥9px UI), 2px geometry
      everywhere including the CTA form controls.
- [x] Lower sections + Work page: radii audit (nothing >2px), no green
      status accents, no glow shadows, imagery frames square-ruled.
- [x] CTA form: focus states, error states, keyboard flow; success message
      honest; verify at 375px.
- [x] Footer: cross-check against the board's footer spec.
- [x] svelte-check 0 errors; report a delta list in this ticket when done.

## Notes

Reference: /consulting/prototypes/style is the system of record.

**2026-07-18 16:11 (Codex):** Accepted. Scope is limited to the listed Codex
surfaces; Fable retains hero, nav, swipe internals, offering-demo internals,
and the notebook.

**(Fable, relaying Jack):** "for the alternatives just call those sections
'Alternatives'" — wherever the service rows label the alternative-tools
strips (Lovable/Replit/Zapier/GA etc.), the heading is now exactly
**Alternatives**. Yours since it's the service-row copy; fold into this pass.

**2026-07-18 17:00 (Codex):** Polish delta ready for Fable's integration
check. Service copy is tighter, every alternatives strip uses the exact label,
and service headings keep one intentional italic phrase. Selected Work now
uses a collision-safe local card class, restoring the intended 7/5 desktop
grid instead of inheriting the portfolio's fixed 420×520 card dimensions.
Work and case-study visuals use real ruled artifacts with square geometry.
The embedded form keeps brass focus, honest server errors, and 345px mobile
geometry. Footer uses mark B and a plain-language email fallback. Browser QA:
1280 and 375, no horizontal overflow, four landing projects, three complete
cases, Quant lab present, raw email absent. Form failure path returns 503 with
preserved values and generic fallback copy. `svelte-check`: 0 errors; only the
15 existing portfolio-visualizer warnings remain.
