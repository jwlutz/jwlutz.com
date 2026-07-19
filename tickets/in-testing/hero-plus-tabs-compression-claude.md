# Hero: real "+" to open tabs, click→pause→action, tab compression

**Created:** 2026-07-18
**Assigned To:** Fable session
**Completed:** 2026-07-18

## Why

Jack review (2026-07-18, verbatim): "the cursor needs to hit the plus that's at
the end of the browser tab right now there's no plus. and right now the click
seems to be happening too late in some places. there needs to be a little bit
of a pause between click and action it seems like it's instant as of right now.
[dev-stack tab labels] they all open full size and if there's too many the ones
besides the right-most one compress to just logos."

Plus the split-view + services copy notes bundled in the same dump (tracked in
the copy commit, not here).

Surface: `PrototypeThroughlineStory.svelte` (Fable-owned).

## Acceptance criteria

- [x] A real **+** at the end of the tab row; the cursor clicks it to open each
      tab. Cursor reads the live "+" position each frame so it always lands on
      it through the strip reflow.
- [x] A beat (PAUSE ≈ 0.16s) between every click and its action: tab appears
      after the "+" click, checkbox fills after the tap, page resolves after the
      refresh, URL types after the search click.
- [x] Tabs open full-size and compress to logo-only as the next opens; newest
      stays full; "+" follows the last open tab. Zero-width when closed
      (box-sizing:border-box so padding is included).
- [x] Dev-stack tab tooltips: GitHub=version control, Vercel=DNS + hosting,
      Railway=cloud backend, Clerk=auth, Stripe=billing, Sentry=error monitoring.
- [x] Every workspace target lands (verified `over: true`): button, all 8
      checkboxes, refresh, search box.
- [x] svelte-check 0, build clean, reduced-motion + seek + replay preserved,
      transform/opacity only, no glow/green status.

## Notes

**2026-07-18 (Fable):** Rebuilt the tab strip: fixed cqw widths that pack left
(TAB_FULL 8.4 / TAB_ICON 3.5), a `--w`-driven width model where a tool is full
only while it is the newest open tab (`toolSucc` = max of any later tab / Notion
/ help opening), else it collapses to its logo. The "+" is a real click target
(`.new-tab`, bound as `plusEl`, depresses on click via `--plus-press`). The
cursor rides the live-measured "+" (`plusTarget`) and Notion tab
(`notionTarget`), measured each frame from getBoundingClientRect vs
`.screen-content` — its own container — during the tab phase only (guarded by
`visible && s < 14`).

Retimed with a PAUSE constant: `tabAmount` opens at `toolClickTime + PAUSE`,
`taskComplete` at `boxTap + PAUSE`, refresh resolve/spin at 22.64, typing at
14.16. Added "+" click rings (ride plusTarget) and grab ring (rides
notionTarget); box clicks keep the checkbox-fill as feedback plus cursor press.

**Root-caused the recurring "wrong places" bug for real:** the inherited
workspace keyframes (button 58.4, boxes 39.6–78.9, refresh 4/9.1) were measured
in a distorted state and sat 6–13% ABOVE the real targets. Re-measured live at
each real frame: button (11.3, 66.6), boxes x68.8 y[45.9…92.3], refresh
(4.9, 10.7), search (50, 63.6). Confirmed cursor `over: true` on button (11.6,67
vs 11.3,66.7), checkbox 4 (72.9 vs 72.4), refresh (5.4,11.2 vs 4.9,10.7).
Visually confirmed the "+" clicks (tab 0 open, Railway full, all-10 compressed),
Notion grab, and fresh-tab "+" via screenshots at seek(2.0/3.6/4.35/7.5/13.4).

Can't verify motion feel at speed (headless parks the clock) — left for Jack's
eye on the live loop. Commits 7f4eb93 (copy) + 9544770 (hero). No push.
