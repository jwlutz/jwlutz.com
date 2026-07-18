# Inquiry CTA: multiple choice feeds an embedded form

**Created:** 2026-07-18
**Assigned To:** Codex session
**Completed:** —

## Why

Jack's Q8 ruling (COMMS, decisions §26): "I like the multiple choice with a
form instead of an email." Keep the choose-your-project-type picker, but the
selection feeds a short embedded form rather than composing a tailored email.

## Acceptance criteria

- [x] The final landing CTA keeps the multiple-choice project-type step; the
      chosen type prefills/frames a short form (name, email, a message field —
      no more than that).
- [ ] Submission mechanism decided and working: simplest viable is a SvelteKit
      form action relaying via an email API; a mailto link remains as visible
      fallback. No fake success theater — the confirmation states what
      actually happened.
- [x] Form respects the style system (shared-style-system.md) once locked.
- [x] Analytics: submission and fallback-email events tracked.
- [x] svelte-check 0 errors; verified desktop + 375px.

## Notes

Privacy: no personal data in URL params; POST only.

**2026-07-18 15:14 (Codex):** Assignment accepted. Implementation remains
queued behind approval of `shared-style-system.md` so the picker, fields,
validation, and confirmation use the shared control language. Email remains a
visible working fallback; no submission success is shown unless delivery is
confirmed by the actual server action.

**2026-07-18 16:02 (Codex):** Ticket taken. Delivery decision: named
SvelteKit form action → Resend → `jwlutz65@gmail.com`, with the visitor as
Reply-To and `Lutz Consulting Group <projects@jwlutz.com>` as the verified
sender. Direct email remains visible fallback. The code will fail closed when
email configuration is absent and will never show success before Resend
accepts the message. Resend Marketplace activation and sender-domain DNS are
external launch steps, not part of this local write.

**2026-07-18 16:12 (Codex):** Implementation complete and moved to testing.
Jack confirmed `jwlutz65@gmail.com` as the destination in COMMS. Added the
named SvelteKit action, server validation, Resend transport, Reply-To, private
POST, direct-email fallback, and success/failure states. Browser test at 1440:
688px form, 309px paired fields, no overflow. At 375: 345px form, 311px fields,
four 62px option rows, no overflow. Picker and mailto subject update together;
missing credentials return the honest not-connected state while preserving
entered values. Invalid server submissions return all four expected errors.
`bun run check` is 0 errors and build passes. The unchecked delivery criterion
now depends only on `activate-contact-email.md`: provision Resend, verify the
sender domain, and confirm one real accepted send.
