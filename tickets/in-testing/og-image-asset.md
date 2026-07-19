# OG share image asset

**Created:** 2026-07-18
**Assigned To:** Fable session
**Completed:** —

## Why
The Codex session added og: meta tags (good), but there is no og:image, so
shares render as bare text cards. A marketing site needs a share image in the
site's visual language (ink/emerald/brass, serif headline).

## Acceptance criteria
- [x] 1200×630 static asset in static/ (og-consulting.png or similar)
- [x] og:image + twitter:card=summary_large_image wired on landing and work pages
- [x] Under 300KB

## Notes

**2026-07-18 (Fable):** Done, expanded slightly beyond the ticket while in
there. Two 1200x630 assets rendered from the design system (ink/emerald grid,
mark-B seal, serif headline with italic emphasis, brass mono keywords):
static/consulting/og-consulting.png (~228KB) and og-work.png (~224KB), wired
with og:image dims/alt + twitter summary_large_image + og:url + canonical on
both pages via siteMeta in the content file. Also found while wiring: app.html
hardcoded the portfolio og:title/description on EVERY route, so consulting
shares would have rendered as "Jack Lutz | Portfolio" - moved those tags into
the root layout gated by !isConsulting. And /consulting now has its own
mark-B seal favicon (static/consulting/favicon.svg); the portfolio still uses
the old green rounded JL (Codex surface, flagged in COMMS). Regenerate the
assets from the html in the session scratchpad (or rebuild by hand) if the
headline ever changes.
