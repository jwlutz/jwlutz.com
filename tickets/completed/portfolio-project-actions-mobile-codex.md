# Portfolio project actions and mobile focus

**Created:** 2026-07-19
**Assigned To:** Codex session
**Completed:** 2026-07-19

## Why
The mobile Projects rail should enter with its second project centered, and project actions need recognizable destination-specific icons and clearer labels.

## Acceptance criteria
- [x] Mobile Projects initially centers the second card without changing desktop order.
- [x] Source actions show the GitHub logo when a repository exists.
- [x] Candella Quant reads View Live Site and the benchmark action shows the Hugging Face logo.
- [x] Verify the initial mobile position, actions, and geometry at desktop and 375px in the refreshed snapshot.

## Notes
Portfolio only. Preserve all consulting work and current project order.

The 375px browser audit measured Wikipedia Speedrun at an exact 0px center delta with the first and third cards equally offset by 342px. The mobile rail initializes at a 340px internal scroll position without page overflow. GitHub and Hugging Face actions each render one mark and one SVG; desktop keeps Candella Quant active first and the existing project order. `svelte-check` passes with zero errors and the production build passes.
