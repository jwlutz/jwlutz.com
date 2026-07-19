# Restyle the personal portfolio into the shared visual system

**Created:** 2026-07-18
**Assigned To:** Codex session
**Completed:** —

## Why

Jack wants the personal portfolio to feel authored from the same system as the
consulting site while remaining more personal and editorial. The current
portfolio needs a first restyle and recoloring pass, beginning with a
photographic parallax hero card.

## Acceptance criteria

- [ ] Preserve the existing portfolio content and route while propagating the
      approved ink, emerald, cream, and brass palette, square-by-default
      geometry, serif display type, and restrained mono labels.
- [ ] Rebuild the hero media as a purposeful parallax image card with pointer
      and scroll depth, a stable touch treatment, and a reduced-motion path.
- [ ] Restyle the nav, projects, experience, skills, contact, and footer so the
      page is one coherent product without copying the consulting page layout.
- [ ] Prefer real portfolio artifacts and photography over decorative geometry;
      no glow, green status dots, invented claims, or generic card stacks.
- [ ] Keep consulting components and canonical consulting routes untouched.
- [ ] Run `bun run check` with 0 errors and verify the portfolio at desktop and
      375px in the approved dev/frozen-preview workflow.

## Notes

**2026-07-18 17:23 (Codex):** Claimed after Jack asked Codex to begin the
portfolio restyle while Fable continues consulting. The shared style ticket is
the visual contract. Dev processes will use `.claude/launch.json`; coordination
files remain excluded by the Vite watch rule. Fable-owned consulting surfaces
are explicitly out of scope.
