# jwlutz.com

Personal portfolio and Lutz Consulting Group website, built with SvelteKit 5, TypeScript, Vite, and Bun.

## Development

```sh
bun install
bun run dev
```

Production validation:

```sh
bun run build
bun run check
```

Other useful scripts:

```sh
bun run dev:host
bun run preview
bun run audit:mobile
bun run build:diagrams
```

## Consulting redesign

The current chosen direction is available at:

- Landing page: `/consulting/prototypes/editorial`
- Detailed work page: `/consulting/prototypes/editorial/work`
- Architecture comparison: `/consulting/prototypes`

The editorial prototype is intended to replace the current production `/consulting` page after final approval and launch hardening.

### Documentation

- [Documentation index](docs/README.md)
- [Current product specification](docs/consulting-site-spec.md)
- [Motion storyboard](docs/consulting-motion-storyboard.md)
- [Content and proof guide](docs/consulting-content-and-proof.md)
- [Design system](docs/consulting-design-system.md)
- [Implementation guide](docs/consulting-implementation.md)
- [Complete decision and idea history](docs/consulting-decisions.md)

Public consulting copy, links, services, and case-study evidence are centralized in [`src/lib/content/consulting-prototype.ts`](src/lib/content/consulting-prototype.ts).

## Current consulting architecture

- `PrototypeLanding.svelte` — page shell and section composition.
- `PrototypeThroughlineStory.svelte` — 3D MacBook hero and browser ownership story.
- `PrototypeOperatingLoop.svelte` — three-service animation and alternative tools.
- `PrototypeWorkPage.svelte` — separate editorial case-study page.
- `PrototypeCaseStudy.svelte` and `PrototypeWorkVisual.svelte` — reusable case content and visuals.

See the [implementation guide](docs/consulting-implementation.md) for the full route/component map and promotion checklist.

## Deployment and analytics

The app currently uses `@sveltejs/adapter-auto`. Vercel Analytics and Speed Insights are initialized in the root layout. Confirm the final adapter and production route migration as part of the consulting launch checklist.
