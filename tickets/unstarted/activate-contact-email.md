# Activate and live-test the consulting contact email

**Created:** 2026-07-18
**Assigned To:** Jack (external approval and DNS), Codex session (provisioning and verification after approval)
**Completed:** —

## Why

The form code is complete and fails honestly without credentials. A real send
requires a Resend Marketplace integration and verified `jwlutz.com` sender,
which change external account state and may affect billing. Jack must authorize
that step explicitly.

## Acceptance criteria

- [ ] Jack explicitly approves adding the Resend Marketplace integration and
      the associated external account/billing state.
- [ ] Upgrade the local Vercel CLI from 56.3.1 to the current release before
      provisioning, then add the Resend integration to the existing project.
- [ ] Verify `jwlutz.com` in Resend and set
      `LCG_CONTACT_FROM="Lutz Consulting Group <projects@jwlutz.com>"`.
- [ ] Confirm `RESEND_API_KEY` and
      `LCG_CONTACT_TO=jwlutz65@gmail.com` in the Vercel environments used by
      the site, without exposing either value to the browser.
- [ ] Perform one real form submission, verify Resend accepted it, verify it
      arrived at the confirmed inbox, and verify Reply-To targets the visitor.
- [ ] Recheck the direct-email fallback. Never push without Jack's separate
      explicit deployment authorization.

## Notes

The implementation and local failure-path verification live in
`in-testing/cta-form-conversion.md`. This ticket contains only the external
activation gate.
