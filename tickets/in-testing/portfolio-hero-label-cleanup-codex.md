# Portfolio hero label cleanup

**Created:** 2026-07-19
**Assigned To:** Codex session
**Completed:** 2026-07-19

## Why

The portfolio hero repeats identity, portfolio, location, date, and scroll
labels across the fixed navigation, registration rail, card index, and
headshot. Jack wants the first viewport quieter and the portrait unobstructed.

## Acceptance criteria

- [x] Remove the headshot caption and its caption wash without changing the
      image crop, size, or color treatment.
- [x] Change “Portfolio / 2026” to “Portfolio.”
- [x] Remove the hero registration rail, including “Jack Lutz / Personal
      portfolio” and “Scroll to explore.”
- [x] Remove the fixed-nav “Personal portfolio” subtitle while retaining the
      JL mark and Jack Lutz name.
- [x] Remove the mobile technology-field “Scroll to explore” prompt and leave
      the desktop interaction guidance intact.
- [x] Verify desktop and 375px hero geometry in the rebuilt 4173 snapshot;
      `svelte-check` remains at 0 errors.

## Notes

**2026-07-19 (Codex):** Claimed after Jack's annotated screenshots. This is a
portfolio-only deletion pass; the JL mark stays because it remains the cleanest
small-scale identity for the shared header. Consulting remains untouched. No
push is authorized.

**2026-07-19 (Codex):** Removed all requested labels plus the caption-only
portrait wash. Rendered checks at 1440px and 375px confirm the JL mark remains,
the portrait is unchanged and unobstructed, the card stays within the viewport,
and the removed text and elements are absent. `svelte-check` is 0 errors, the
production build passes, and 4173 was relaunched. Ready for visual review; no
push.
