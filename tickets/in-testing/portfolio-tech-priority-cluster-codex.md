# Prioritize the technology field's first view

**Created:** 2026-07-19
**Assigned To:** Codex session
**Completed:** 2026-07-19

## Why

The technology lens currently begins from category order. Jack wants the first
loaded view to show the most relevant portfolio story immediately.

## Acceptance criteria

- [x] Python remains the initial selected anchor.
- [x] The nearest first-load marks prioritize core web, ML, data, deployment,
      and AI tools rather than a single language category.
- [x] Center-out placement adapts independently to the 13-by-5 desktop grid and
      5-column mobile grid.
- [x] All 65 marks remain available and the existing theme, edge-hover, scroll,
      click, touch, and keyboard behavior stays intact.
- [x] Production desktop and 375px first-load verification pass with no overflow
      or browser errors; `svelte-check` remains at 0 errors.

## Notes

**2026-07-19 (Codex):** Claimed as a portfolio-only ordering refinement. The
consulting surface and concurrent consulting edits remain out of scope. No push
is authorized.

**2026-07-19 (Codex):** Added a complete 65-item relevance ranking and a cached
center-out cell map that adapts to each grid shape. Desktop first load centers
Python and its nearest 14 marks are React, PyTorch, TypeScript, Svelte, FastAPI,
PostgreSQL, Vercel, AWS, GitHub, Claude Code, pandas, NumPy, scikit-learn, and
TensorFlow. Mobile first load remains relevance-first while its approved scroll
offset is active. Production checks passed at 1280px and 375px with 65 marks,
no horizontal overflow, and no browser errors. `svelte-check` remains at 0
errors (15 pre-existing visualizer warnings), the build passes, and the 4173
snapshot was relaunched.
