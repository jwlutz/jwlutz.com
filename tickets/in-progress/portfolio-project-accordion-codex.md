# Turn Selected Work into an expanding project accordion

**Created:** 2026-07-18
**Assigned To:** Codex session
**Completed:** —

## Why

Jack supplied Supabase's customer-story accordion as the interaction reference:
one project opens into a full story while the other projects collapse into
clickable branded spines. The portfolio should use that spatial idea without
copying Supabase's colors, customer-quote format, or rounded treatment.

## Acceptance criteria

- [ ] Five real portfolio projects occupy one horizontal desktop stage; one is
      expanded and clicking another spine smoothly changes the active project.
- [ ] The expanded project prioritizes its real visual, concise description,
      technology set, honest highlights, and existing source/live links.
- [ ] The treatment follows the shared ink / emerald / cream / brass system,
      square geometry, and 2px maximum radius.
- [ ] Buttons expose `aria-expanded`, support keyboard selection, and the stage
      supports left/right navigation without trapping focus.
- [ ] At 375px the component becomes a vertical accordion with comfortable
      touch targets and no horizontal overflow.
- [ ] Motion uses layout-safe flex/grid sizing plus transform/opacity only,
      with a static `prefers-reduced-motion` path.
- [ ] `svelte-check` stays at 0 errors; desktop and 375px browser geometry pass.

## Notes

**2026-07-18 18:23 (Codex):** Claimed as a portfolio-only change. The current
`Projects.svelte` carousel and its `ProjectCard.svelte` presentation are the
only product surfaces in scope. Fable's consulting and OG-image work remain
untouched. No push is authorized.
