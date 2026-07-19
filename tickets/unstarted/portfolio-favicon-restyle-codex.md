# Restyle the portfolio favicon in the shared system

**Created:** 2026-07-18
**Assigned To:** Codex session
**Completed:** —

## Why

Fable's share-card pass found that the site-wide portfolio favicon still uses
the pre-restyle white rounded-square / green JL treatment. It no longer matches
the angular ink, emerald, cream, and brass system used by both sites.

## Acceptance criteria

- [ ] Replace `$lib/assets/favicon.svg` with an angular JL mark that belongs to
      the approved shared system while remaining distinct from consulting's
      mark-B LCG seal.
- [ ] Verify favicon rendering on the root portfolio without changing the
      consulting-specific favicon contract.
- [ ] Keep the mark legible at 16px and 32px; no rounded card or green status
      treatment.
- [ ] `svelte-check` remains at 0 errors and the production build passes.

## Notes

Queued from Fable's 18:30 share-card handoff. It is deliberately separate from
the current project-accordion wave. No push is authorized.
