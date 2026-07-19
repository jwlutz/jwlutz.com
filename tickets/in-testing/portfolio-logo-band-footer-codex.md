# Replace the logo board with a top band and rebuild the portfolio footer

**Created:** 2026-07-18
**Assigned To:** Codex session
**Completed:** —

## Why

Jack rejected the framed Atropos board. The technology surface should be a
normal full-width band near the top of the portfolio, with accurate Logo.dev
marks, while the portrait should occupy less of the hero and the final footer
should function as a professional contact and navigation index.

## Acceptance criteria

- [x] Remove Atropos and all framed-board/readout treatment from Technical Range.
- [x] Move Technical Range directly below the hero as a full-bleed horizontal band.
- [x] Use Logo.dev's image CDN with the existing publishable key and visible attribution.
- [x] Preserve a readable fallback for every technology when an external logo is unavailable.
- [x] Reduce the desktop and mobile portrait footprint without reintroducing a color wash.
- [x] Add a polished footer with email, GitHub, LinkedIn, consulting, portfolio sections, resume, and back-to-top navigation.
- [x] Verify desktop and 375px behavior with no overflow or console errors.
- [x] Keep `svelte-check` at 0 errors and pass the production build.

## Notes

**2026-07-18 20:22 (Codex):** Claimed as a portfolio-only pass. Logo.dev's
official guidance identifies `pk_` publishable keys as safe for browser image
CDN use and requires visible Logo.dev attribution. The existing Copytrade env
contains both key types; only the publishable key will be used. Consulting
surfaces remain untouched. No push is authorized.

**2026-07-18 20:34 (Codex):** The Atropos component and package are removed.
Technical Range now follows the hero as a 100%-width ink band with one calm,
hover-pausing rail of 20 Logo.dev marks and a compact methods index. The
publishable key is passed through `PUBLIC_LOGO_DEV_TOKEN`; every mark falls
back to the local registry if the CDN or token is unavailable, and the footer
contains the required attribution. The portrait is 348×510 on the 1280px
layout and 308×250 at 375px. The footer now exposes nine useful destinations
across Portfolio, Connect, and More, plus direct email and utility navigation.
Production-browser verification loaded all 20 primary Logo.dev marks, reported
no console errors, and found no horizontal overflow at 1280px or 375px.
`svelte-check` is 0 errors (15 existing visualizer warnings), the build passes,
and the 4173 snapshot was relaunched with the publishable key. Consulting
remains untouched. No push is authorized.

**2026-07-18 21:44 (Codex):** The moving Logo.dev rail portion of this ticket
was rejected and is superseded by `portfolio-logo-board-correction-codex.md`.
The footer directory remains. Logo.dev, its runtime key, and its attribution
were removed in favor of bundled CC0 brand artwork. No push is authorized.
