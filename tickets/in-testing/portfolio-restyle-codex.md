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

- [x] Preserve the existing portfolio content and route while propagating the
      approved ink, emerald, cream, and brass palette, square-by-default
      geometry, serif display type, and restrained mono labels.
- [x] Rebuild the hero media as a purposeful parallax image card with pointer
      and scroll depth, a stable touch treatment, and a reduced-motion path.
- [x] Restyle the nav, projects, experience, skills, contact, and footer so the
      page is one coherent product without copying the consulting page layout.
- [x] Prefer real portfolio artifacts and photography over decorative geometry;
      no glow, green status dots, invented claims, or generic card stacks.
- [x] Keep consulting components and canonical consulting routes untouched.
- [x] Run `bun run check` with 0 errors and verify the portfolio at desktop and
      375px in the approved dev/frozen-preview workflow.

## Notes

**2026-07-18 17:23 (Codex):** Claimed after Jack asked Codex to begin the
portfolio restyle while Fable continues consulting. The shared style ticket is
the visual contract. Dev processes will use `.claude/launch.json`; coordination
files remain excluded by the Vite watch rule. Fable-owned consulting surfaces
are explicitly out of scope.

**2026-07-18 17:52 (Codex):** First pass landed and moved to testing. The
portfolio now uses the shared ink / emerald / cream / brass system with a more
personal editorial composition, angular controls, serif display type, and mono
registration labels. The home narrative is proof first: parallax portrait hero
→ selected work → experience → technical range → contact. The old ambient
blobs, translucent rounded cards, and WebGL keyboard have been replaced by real
project artifacts, a ruled experience chronology, and a static technical
ledger. Consulting routes and components were not changed in this wave.

Browser verification passed at 1280px and 375px with no horizontal overflow or
console errors. Desktop section order measured `0 / 860 / 2038 / 3408 / 4655`;
the 1200×652 hero changed both card and image transforms under pointer input,
while touch and reduced-motion paths remain stable. `bun run check` completed
with 0 errors (15 pre-existing warnings), and `bun run build` passed before the
clean launch-config dev restart.
