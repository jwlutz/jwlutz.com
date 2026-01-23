# Codebase Understanding

Generated: 2026-01-22

## Summary
A personal portfolio website for Jack Lutz (AI Engineer/Data Scientist/UCLA student) built with SvelteKit, featuring an interactive 3D keyboard skills display using Three.js, smooth scroll animations, and data-driven content sections.

## Architecture
- **Type**: SvelteKit portfolio/personal website
- **Languages**: TypeScript, Svelte 5, CSS/Tailwind CSS 4
- **Framework**: SvelteKit 2.x with Svelte 5 (runes)
- **Entry points**:
  - [src/routes/+page.svelte](src/routes/+page.svelte) - Main portfolio page
  - [src/routes/+layout.svelte](src/routes/+layout.svelte) - Root layout with Nav/Footer
  - [src/routes/consulting/+page.svelte](src/routes/consulting/+page.svelte) - Consulting page
- **Organization**:
  - Feature-based structure under `src/lib/`
  - Components in `src/lib/components/`
  - Data files in `src/lib/data/` (JSON + TypeScript)
  - Shared stores in `src/lib/stores/`
  - Custom actions in `src/lib/actions/`
  - Barrel exports via `src/lib/index.ts`

## Components

### Layout Components
- **Path**: [src/lib/components/Nav.svelte](src/lib/components/Nav.svelte), [src/lib/components/Footer.svelte](src/lib/components/Footer.svelte)
- **Purpose**: Fixed navigation header with smooth-scroll links, mobile hamburger menu; simple footer
- **Key features**: Active section tracking, responsive mobile menu
- **Depends on**: Profile data, CSS custom properties

### Hero Section
- **Path**: [src/lib/components/Hero.svelte](src/lib/components/Hero.svelte)
- **Purpose**: Full-screen hero with animated gradient background and profile text
- **Key classes**: `AnimatedGradient`, `HeroText`
- **Depends on**: Profile data, media query stores
- **Sub-components**: [src/lib/components/hero/AnimatedGradient.svelte](src/lib/components/hero/AnimatedGradient.svelte), [src/lib/components/hero/HeroText.svelte](src/lib/components/hero/HeroText.svelte)

### TechStack/Skills Section
- **Path**: [src/lib/components/TechStack.svelte](src/lib/components/TechStack.svelte)
- **Purpose**: Displays skills with marquee background effect; shows 3D keyboard on desktop, grid on mobile
- **Key features**: Responsive layout, animated marquee background
- **Depends on**: Skills data, media query stores
- **Sub-components**:
  - [src/lib/components/skills/Keyboard3DThree.svelte](src/lib/components/skills/Keyboard3DThree.svelte) - Interactive 3D keyboard with Three.js
  - [src/lib/components/skills/SkillsGrid.svelte](src/lib/components/skills/SkillsGrid.svelte) - Mobile fallback grid

### 3D Keyboard (Major Feature)
- **Path**: [src/lib/components/skills/Keyboard3DThree.svelte](src/lib/components/skills/Keyboard3DThree.svelte)
- **Purpose**: Interactive 3D mechanical keyboard showing 24 skill icons (4x6 grid)
- **Key features**:
  - Lazy-loaded Three.js (only loads when in viewport)
  - OrbitControls for rotation/zoom
  - Keycap press animations with audio feedback
  - Dynamic logo loading with canvas-based fallbacks
  - Skill tooltip on hover/click
- **Dependencies**: Three.js, RoundedBoxGeometry, OrbitControls
- **Skill data**: [src/lib/data/keyboard-skills.ts](src/lib/data/keyboard-skills.ts)

### Experience Section
- **Path**: [src/lib/components/Experience.svelte](src/lib/components/Experience.svelte)
- **Purpose**: Timeline of work experience with staggered scroll animations
- **Key features**: IntersectionObserver-based reveal animations
- **Depends on**: Experience data, inview action

### Projects Section
- **Path**: [src/lib/components/Projects.svelte](src/lib/components/Projects.svelte)
- **Purpose**: Horizontal carousel of project cards with navigation
- **Key features**: Scroll-snap carousel, dot navigation, prev/next buttons
- **Depends on**: Projects data, ProjectCard component

### Contact Section
- **Path**: [src/lib/components/Contact.svelte](src/lib/components/Contact.svelte)
- **Purpose**: Simple contact section with email CTA and social links
- **Depends on**: Profile data

## Data Flow
1. **Static Data**: JSON files ([profile.json](src/lib/data/profile.json), [experience.json](src/lib/data/experience.json), [projects.json](src/lib/data/projects.json), [skills.json](src/lib/data/skills.json)) + TypeScript ([keyboard-skills.ts](src/lib/data/keyboard-skills.ts))
2. **Barrel Export**: All data and components exported from [src/lib/index.ts](src/lib/index.ts)
3. **Page Import**: Main page imports everything from `$lib`
4. **Props Flow**: Data passed as props to section components
5. **Reactive Stores**: Media query store ([src/lib/stores/mediaQuery.ts](src/lib/stores/mediaQuery.ts)) for responsive behavior

## Stores

### mediaQuery.ts
- **Path**: [src/lib/stores/mediaQuery.ts](src/lib/stores/mediaQuery.ts)
- **Purpose**: Svelte readable stores for responsive breakpoints
- **Exports**: `isMobile` (max-width: 768px), `prefersReducedMotion`
- **Pattern**: Factory function `createMediaQueryStore(query)`

## Actions

### inview.ts
- **Path**: [src/lib/actions/inview.ts](src/lib/actions/inview.ts)
- **Purpose**: Svelte action for scroll-triggered visibility animations
- **Pattern**: IntersectionObserver, adds `.visible` class when element enters viewport
- **Options**: `threshold`, `once`

## Patterns

- **Svelte 5 Runes**: Uses `$state()`, `$props()`, `$derived()` (not legacy reactive statements)
- **CSS Custom Properties**: Theme defined in [app.css](src/app.css) via `@theme` block (Tailwind v4 syntax)
- **TypeScript**: Full type coverage with interfaces in [types.ts](src/lib/types.ts)
- **Barrel Exports**: Single entry point for imports via `$lib`
- **Component Composition**: Sub-components for complex sections (hero/, skills/)
- **Lazy Loading**: Three.js loaded only when 3D keyboard enters viewport
- **Data-Driven Content**: All content in JSON files, not hardcoded in templates

## Styling Approach

- **Tailwind CSS v4**: Using new `@theme` directive in [app.css](src/app.css)
- **CSS Custom Properties**: Extensive use of `var(--color-*)` variables
- **Scoped Styles**: Component-level `<style>` blocks
- **Utility Classes**: Mix of Tailwind utilities and custom CSS classes
- **Fonts**: Inter (sans) + JetBrains Mono (mono)
- **Color Scheme**: Light theme with emerald accent (#10b981)

## Build & Deploy

- **Build Tool**: Vite 7.x
- **Adapter**: @sveltejs/adapter-auto (auto-detects Vercel)
- **Deploy Target**: Vercel (`.vercel/` directory present)
- **Scripts**:
  - `npm run dev` - Development server
  - `npm run build` - Production build
  - `npm run check` - TypeScript/Svelte checking

## Key Dependencies

| Package | Purpose |
|---------|---------|
| svelte@5 | UI framework with runes |
| @sveltejs/kit@2 | Meta-framework |
| three | 3D graphics for keyboard |
| @threlte/core, @threlte/extras | Svelte Three.js bindings (installed but keyboard uses raw Three.js) |
| gsap | Animation library (available) |
| tailwindcss@4 | CSS utilities |

## Risks

- **No Critical Issues Found**

### Warnings
- **External CDN Dependencies**: Skill icons loaded from jsdelivr.net CDN - could fail if CDN is down
- **Audio Files Required**: 3D keyboard expects `/assets/keycap-sounds/press.mp3` and `release.mp3`
- **Unused Dependencies**: @threlte packages installed but 3D keyboard uses raw Three.js

### Notes
- **No TODO/FIXME/HACK Comments**: Codebase appears clean
- **Type Safety**: Good TypeScript coverage, though Three.js references use `any`
- **Archive**: [src/_archive/casino/](src/_archive/casino/) contains unused casino/slot machine experiment

## Glossary

- **Runes**: Svelte 5's new reactivity primitives ($state, $props, etc.)
- **Barrel Export**: Single index.ts file that re-exports all module contents
- **IntersectionObserver**: Browser API for detecting element visibility
- **OrbitControls**: Three.js camera controls for rotation/zoom interaction
- **Keycap**: Individual key on the 3D keyboard, represents a skill
