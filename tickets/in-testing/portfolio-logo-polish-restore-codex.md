# Restore portfolio logo language and finish

**Created:** 2026-07-18
**Assigned To:** Codex session
**Completed:** —

## Why

Jack flagged that the portfolio lost logos and polish. The shared technology
logo registry still exists and covers every project technology, but the current
project accordion and Technical Range board render the technology layer as
plain text. This makes two of the portfolio's most visual sections feel flatter
and less authored than the versions they replaced.

## Acceptance criteria

- [x] Project technology treatments restore their real brand marks from the
      shared registry without returning to rounded pill styling.
- [x] The Technical Range rails show available real marks while conceptual
      methods remain intentionally typographic.
- [x] Logos use restrained authentic color, clear monochrome fallbacks, and a
      consistent angular frame that fits the ink / emerald / cream / brass
      system.
- [x] Hover, focus, accordion selection, rail motion, and the one-board
      Atropos interaction retain their approved behavior.
- [x] Desktop and 375px layouts remain collision-free and do not overflow;
      touch and reduced-motion behavior remains intact.
- [x] `svelte-check` remains at 0 errors and the production build passes.

## Notes

**2026-07-18 19:19 (Codex):** Claimed as a portfolio-only restoration. The
existing `tech-icons.ts` registry has 49 marks, covers all 27 unique project
technologies, and covers 27 of the 56 Technical Range entries. Missing range
entries are primarily academic methods and will remain typographic instead of
receiving invented glyphs. Consulting files remain untouched. No push is
authorized.

**2026-07-18 19:25 (Codex):** Added one reusable angular `TechMark` renderer
and restored it across the portfolio's two technology surfaces. Every project
spine now exposes its leading technology mark before selection; the active
story repeats marks in the media metadata and every technology treatment. The
Technical Range shows all 27 available real marks in each rail sequence and a
48px mark in the inspector when a marked tool is focused. Black brands use the
portfolio cream foreground so they remain legible on ink.

Browser QA found 13 rendered marks in the default project accordion state and
one active story, 54 moving rail marks plus the selected inspector mark, one
Atropos root with no nested instances, all four desktop rails running, and no
document overflow. At 375px the project accordion remains 680px tall, both
sections stay inside the viewport, rail copies remain hidden, animations are
off, and the Atropos transform is neutral. `svelte-check` is 0 errors (15
pre-existing visualizer warnings), the production build passes, and the
restarted 5173 / 4173 servers both return 200. Consulting files were not
touched. No push is authorized.
