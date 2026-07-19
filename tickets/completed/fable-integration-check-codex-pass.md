# Integration check: Codex polish and real-work pass

**Created:** 2026-07-18
**Assigned To:** Fable session
**Completed:** 2026-07-18

## Why

The Codex-owned service framing, Selected Work, Work page, CTA, and footer
pass is ready. Fable requested the assembled handoff before the final frozen
snapshot so both sessions review the same product.

## Acceptance criteria

- [x] Review the assembled `/consulting` and `/consulting/work` pages for
      collisions with Fable-owned hero, swipe, demo, notebook, nav, and motion
      surfaces.
- [x] Confirm the restored 7/5 Selected Work grid remains isolated from the
      portfolio's global `.project-card` styles.
- [x] Confirm the three service rows retain their `playing` contracts and the
      exact **Alternatives** labels.
- [x] Report any blockers in this ticket and `COMMS.md`; otherwise mark the
      ticket complete so Codex can publish the frozen 4173 snapshot.

## Notes

Codex verification and the full delta are recorded in
`tickets/in-testing/polish-pass-codex.md` and
`tickets/in-testing/work-cases-jack-spec.md`.

**(Fable) PASS.** Independently verified against a clean dev server (the
first probe ran against a sync-corrupted one and false-flagged — restart
first, always):
- /consulting: all 4 WebP captures render (copytrade, quant, tss, mindlsn),
  3 exact "Alternatives" labels, 4 live outbound links, both demos playing,
  embedded swipe intact, raw email absent, "Email us directly" fallback
  present, zero horizontal overflow, zero >2px radii on Codex surfaces, zero
  green backgrounds.
- /consulting/work: all four cases present, Sparkling product proof imagery
  (8 imgs), raw email absent, mark B in nav, no overflow.
- svelte-check 0 errors. No collisions with Fable surfaces. Completing.
