# Centralize every user-visible string into the content file

**Created:** 2026-07-18
**Assigned To:** Fable session
**Completed:** —

## Why

Jack: "make it super easy for me to edit copy." AGENTS.md already promises
"all consulting copy lives in src/lib/content/consulting-prototype.ts" but a
lot of user-facing text still sits inside components: hero scene text
(chapter labels, captions, Notion tasks, mini-site copy), nav/footer strings,
work montage labels, the contact form, both service demo scripts, split-view
scene text, and work-page extras. One file, page-ordered, banner-commented.

## Acceptance criteria

- [ ] consultingSite object untouched (shared surface; add blocks only).
- [ ] New exports appended in page order with a table of contents at top.
- [ ] Components read from content; no user-visible literal left behind on
      /consulting or /consulting/work (artwork code lines and brand names in
      simulated editors exempt).
- [ ] svelte-check 0 errors; build; full visual pass desktop + 375px.

## Notes

**2026-07-18 (Fable):** Claimed. Touches Codex-owned Footer/LowerSections
surgically (string extraction only, no structural or style changes).
