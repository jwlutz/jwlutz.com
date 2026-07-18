# Lutz Consulting Group website documentation

This folder is the source of truth for the consulting-site redesign. The documents separate the current product specification from the history of ideas that led to it.

## Start here

1. [`consulting-site-spec.md`](consulting-site-spec.md) — the current product, content, page architecture, and launch specification.
2. [`consulting-motion-storyboard.md`](consulting-motion-storyboard.md) — exact behavior and timing for the browser hero and the smaller service animations.
3. [`consulting-content-and-proof.md`](consulting-content-and-proof.md) — approved copy, offers, case-study evidence, metrics rules, and editing guidance.
4. [`consulting-design-system.md`](consulting-design-system.md) — visual language, references, tokens, typography, imagery, and interaction principles.
5. [`consulting-implementation.md`](consulting-implementation.md) — routes, components, dependencies, performance rules, testing, and production migration.
6. [`consulting-decisions.md`](consulting-decisions.md) — complete decision and idea history, including superseded directions and open questions.

## Authority order

When two documents appear to conflict, use this order:

1. An active decision ticket in `tickets/` and its GitHub issue mirror, when present
2. Current public content in `src/lib/content/consulting-prototype.ts`
3. Current product specification in `consulting-site-spec.md`
4. Motion storyboard and design system
5. Decision history

The decision history intentionally preserves old ideas. An item labeled **superseded** is context, not an instruction to restore it.

## Current review routes

- Chosen landing-page direction: `/consulting/prototypes/editorial`
- Chosen case-study page: `/consulting/prototypes/editorial/work`
- Earlier AMCA-style mockup: `/consulting/mockup`

The editorial prototype is the intended basis for the future production `/consulting` route.

## Session coordination

Two agent sessions work this repo concurrently. The shared board is `tickets/`
(kanban dirs: backlog → unstarted → in-progress → in-testing → completed).
Read `tickets/notes.md` for the stale-write protocol before editing, and check
`tickets/in-progress/` before touching another session's surface.
