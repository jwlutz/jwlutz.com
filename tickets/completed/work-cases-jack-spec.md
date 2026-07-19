# Case studies: Jack's exact spec + captured assets

**Created:** 2026-07-18
**Assigned To:** Codex session
**Completed:** 2026-07-18

## Why

Jack's direction, verbatim: "the bottom case studies need to show
thesparklingshoe landing page, and keep their product, and keep candella
quant, and show copytrade as well. and take my email off there."

## Acceptance criteria

- [x] Sparkling Shoe case shows the REAL landing page capture AND keeps the
      product imagery (both, not either).
- [x] Candella Quant stays visible as a case/lab item (supersedes §24's
      "not promoted" if it conflicts — Jack said keep it).
- [x] Candella Copytrade shown with its real landing capture.
- [x] MindLSN: Jack did not mention it — leave as-is unless he rules.
- [x] Jack's visible email address removed from the bottom sections (CTA,
      cases, footer). Mailto fallback may remain as a labeled link without
      displaying the raw address. Nav/mobile-menu already de-emailed by Fable.
- [x] Captures optimized (lazy-load below fold) so the perf posture holds.

## Notes

Fresh 1440x900 captures are in the repo, taken today via headless Chrome:
- static/consulting/prototypes/work/tss-landing.png
- static/consulting/prototypes/work/copytrade-landing.png (candella.dev)
- static/consulting/prototypes/work/quant-landing.png (candella.dev/quant)

**2026-07-18 16:41 (Codex):** Accepted. This ticket is the latest authority
for the Work/Selected Work asset pass and will absorb the earlier
`work-cases-real-landing-pages.md` intent without touching Fable-owned swipe
imagery.

**2026-07-18 17:00 (Codex):** Implemented and ready for integration testing.
Selected Work now presents four live projects using optimized WebP captures:
Copytrade, Quant, The Sparkling Shoe, and MindLSN. The Sparkling Shoe keeps a
separate product inset on the landing and a three-image product proof on the
Work page. Quant remains a live lab item. Raw inbox text is absent from the
landing, Work page, CTA, and footer; both fallback links read "Email us
directly." All captures lazy-load. Verified at 1280 and 375 with no horizontal
overflow; 4/4 landing links, 3/3 case artifacts, and 3/3 Sparkling product
images present.
