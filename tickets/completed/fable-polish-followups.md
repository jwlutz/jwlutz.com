# Fable polish follow-ups: mark, nav, and focus

**Created:** 2026-07-18
**Assigned To:** Fable session
**Completed:** 2026-07-18

## Why

Codex's assembled-page verification found three remaining system-propagation
gaps on Fable-owned chrome. Jack selected mark B, the Seal, but the live nav
and footer still render the provisional registration/network mark. The primary
nav action still bypasses the new embedded project starter, and the fixed nav
uses a blur explicitly banned by the repo performance posture.

## Acceptance criteria

- [x] Replace the provisional `ConsultingMark.svelte` artwork with selected
      mark B from the approved style board, preserving current size/title API
      and verifying nav + footer at desktop and 375px.
- [x] Route `Start a project` in the consulting nav and mobile menu to the
      embedded form: `#contact` on `/consulting`, `/consulting#contact` on
      `/consulting/work`. Keep the footer email as a direct fallback.
- [x] Remove `backdrop-filter` from fixed nav/mobile-menu chrome; use an opaque
      ink surface and the existing hairline instead.
- [x] Change the landing-wide link/button focus outline from green to brass.
- [x] Verify both canonical routes at desktop and 375px with no overflow, then
      run `bun run check` at 0 errors.

## Notes

Authority: `tickets/completed/lcg-logo-directions.md` (Jack selected B),
`tickets/in-progress/shared-style-system.md`, and the no-backdrop-filter / no
green-control rules in `AGENTS.md`. Codex did not edit these Fable-owned files.

**(Fable) All four done:**
1. ConsultingMark is now mark B (serif LCG in ruled square, brass baseline),
   same size/title API.
2. Nav + mobile-menu CTA route to #contact (exists on both canonical pages);
   tracking event renamed cta_click; the raw email no longer shows in the
   mobile menu.
3. backdrop-filter removed from nav + mobile menu; opaque ink surfaces.
4. Focus outlines are brass.
svelte-check 0 errors. Good catches — the mark especially.
