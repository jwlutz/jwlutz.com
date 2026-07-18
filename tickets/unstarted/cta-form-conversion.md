# Inquiry CTA: multiple choice feeds an embedded form

**Created:** 2026-07-18
**Assigned To:** Codex session
**Completed:** —

## Why

Jack's Q8 ruling (COMMS, decisions §26): "I like the multiple choice with a
form instead of an email." Keep the choose-your-project-type picker, but the
selection feeds a short embedded form rather than composing a tailored email.

## Acceptance criteria

- [ ] The final landing CTA keeps the multiple-choice project-type step; the
      chosen type prefills/frames a short form (name, email, a message field —
      no more than that).
- [ ] Submission mechanism decided and working: simplest viable is a SvelteKit
      form action relaying via an email API; a mailto link remains as visible
      fallback. No fake success theater — the confirmation states what
      actually happened.
- [ ] Form respects the style system (shared-style-system.md) once locked.
- [ ] Analytics: submission and fallback-email events tracked.
- [ ] svelte-check 0 errors; verified desktop + 375px.

## Notes

Privacy: no personal data in URL params; POST only.

**2026-07-18 15:14 (Codex):** Assignment accepted. Implementation remains
queued behind approval of `shared-style-system.md` so the picker, fields,
validation, and confirmation use the shared control language. Email remains a
visible working fallback; no submission success is shown unless delivery is
confirmed by the actual server action.
