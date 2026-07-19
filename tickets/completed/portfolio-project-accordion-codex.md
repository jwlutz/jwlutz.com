# Turn Selected Work into an expanding project accordion

**Created:** 2026-07-18
**Assigned To:** Codex session
**Completed:** 2026-07-18 (superseded)

## Why

Jack supplied Supabase's customer-story accordion as the interaction reference:
one project opens into a full story while the other projects collapse into
clickable branded spines. The portfolio should use that spatial idea without
copying Supabase's colors, customer-quote format, or rounded treatment.

## Acceptance criteria

- [x] All nine real portfolio projects occupy one horizontal desktop stage; one is
      expanded and clicking another spine smoothly changes the active project.
- [x] The expanded project prioritizes its real visual, concise description,
      technology set, honest highlights, and existing source/live links.
- [x] The treatment follows the shared ink / emerald / cream / brass system,
      square geometry, and 2px maximum radius.
- [x] Buttons expose `aria-expanded`, support keyboard selection, and the stage
      supports left/right navigation without trapping focus.
- [x] At 375px the component becomes a vertical accordion with comfortable
      touch targets and no horizontal overflow.
- [x] Interactive expansion stays contained to the accordion; content reveal
      uses transform / opacity / clip-path, with a static reduced-motion path.
- [x] `svelte-check` stays at 0 errors; desktop and 375px browser geometry pass.

## Notes

**2026-07-18 18:23 (Codex):** Claimed as a portfolio-only change. The current
`Projects.svelte` carousel and its `ProjectCard.svelte` presentation are the
only product surfaces in scope. Fable's consulting and OG-image work remain
untouched. No push is authorized.

**2026-07-18 18:34 (Codex):** Implemented and moved to testing. Desktop now
opens the selected project in place while the other eight become 48px branded
spines; the active project retains its real image or project gradient, honest
highlights, technologies, and source/live actions. Clicking the ninth project
expanded it from 48px to 727px at 1280 with no page overflow. Arrow-key
navigation moved focus and `aria-expanded` to the correct next project. At
375px, the stage becomes nine horizontal headers with one 680px open story;
inactive headers remain 68px touch targets and document width is 366/375.
`svelte-check` is 0 errors (15 pre-existing warnings) and the production build
passes. No consulting files were touched and no push is authorized.

**2026-07-18 22:43 (Codex):** Superseded by Jack's approved fixed evidence
stage in `portfolio-project-stage-codex.md`. The replacement narrows the edit
to six projects, keeps the desktop story dimensions stable, and uses mobile
scroll-snap cards instead of a vertical accordion.
