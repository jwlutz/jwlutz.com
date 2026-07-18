# Consulting-site implementation guide

This document maps the current design direction to the repository and explains how to run, edit, test, and eventually promote it to the production `/consulting` route.

## 1. Current stack

- SvelteKit 2 with Svelte 5.
- TypeScript.
- Vite 7.
- Bun for local scripts and builds.
- `@sveltejs/adapter-auto` currently configured.
- Vercel Analytics and Speed Insights injected from the root layout.
- CSS-first responsive layout and animation.

Runtime packages added for this redesign:

- `animejs` — composed hero entrance.
- `motion` — page progress and viewport reveals.
- `simple-icons` — tool and alternative logos.

`three` already exists elsewhere in the repository but is not used for this experience. The browser story is DOM/CSS-based so it remains responsive, fast, and easy to tune without a WebGL scene.

## 2. Route map

| Route | Purpose | Status |
| --- | --- | --- |
| `/consulting` | Existing production consulting page | Not yet replaced |
| `/consulting/mockup` | Earlier AMCA-style direction | Superseded reference |
| `/consulting/prototypes` | Architecture comparison index | Internal review |
| `/consulting/prototypes/editorial` | Chosen landing-page direction | Current candidate |
| `/consulting/prototypes/editorial/work` | Visual index plus all three complete case studies on one page | Current candidate |

The editorial route is the only active landing implementation. The earlier mockup is a historical comparison and should not receive production polish unless the architecture decision changes.

## 3. Component map

### Current editorial direction

| File | Responsibility |
| --- | --- |
| `src/lib/components/consulting-prototype/PrototypeLanding.svelte` | Page shell, fixed navigation, progress thread, editorial/inline routing, and responsive layout |
| `src/lib/components/consulting-prototype/PrototypeThroughlineStory.svelte` | Hero copy, edge-to-edge browser story, centered caption/progress, replay, and hero entrance |
| `src/lib/components/consulting-prototype/PrototypeOperatingLoop.svelte` | Three sequential service chapters, feature details, alternatives, visibility control, and service-demo composition |
| `src/lib/components/consulting-prototype/PrototypeWebDemo.svelte` | Human review → responsive validation → release demonstration for website work |
| `src/lib/components/consulting-prototype/PrototypeAIDemo.svelte` | Context → AI preparation → human checkpoint → system update demonstration |
| `src/lib/components/consulting-prototype/PrototypeAnalyticsDemo.svelte` | Business question → evidence → recommendation → operating rhythm demonstration |
| `src/lib/components/consulting-prototype/PrototypeLowerSections.svelte` | Layered three-window live Work montage and selectable project-starter CTA |
| `src/lib/components/consulting-prototype/PrototypeFooter.svelte` | Consulting-only navigation, contact, and ownership footer |
| `src/lib/components/consulting-prototype/PrototypeWorkPage.svelte` | Visual work index, three complete case studies, project evidence, live links, Lab note, and inquiry CTA |
| `src/lib/components/consulting-prototype/PrototypeCaseStudy.svelte` | Reusable full/compact case-study chapter |
| `src/lib/components/consulting-prototype/PrototypeWorkVisual.svelte` | Purpose-built visual for each case preview/chapter |
| `src/lib/components/ConsultingMark.svelte` | Provisional compact LCG mark |
| `src/lib/content/consulting-prototype.ts` | Public copy, links, services, evidence, and case-study content |

### Available but not current

| File | Status |
| --- | --- |
| `src/lib/components/ConsultingScrollStory.svelte` | Earlier scroll-driven story used by `/consulting/mockup` |
| `src/lib/components/ConsultingWorkChapter.svelte` | Earlier work layout used by `/consulting/mockup` |
| `src/lib/components/consulting-prototype/PrototypeAmbientShader.svelte` | Options-volatility WebGL study; not used in the current editorial hero |

Do not import the old scroll story or ambient shader into the chosen page merely because they already exist. Their current value is archival and comparative.

## 4. Content architecture

`src/lib/content/consulting-prototype.ts` is intentionally the first editing surface. It exports:

- `consultingSite` — global brand, hero, services, work-index, lab, and CTA content.
- `prototypeCases` — typed case-study records for Candella, MindLSN, and The Sparkling Shoe.

The `PrototypeCase` type constrains:

- Slug.
- Index.
- Name and category.
- Title and summary.
- Live URL.
- Evidence values/labels.
- Narrative sections.
- Responsibilities.

When adding a case:

1. Expand the slug union.
2. Add a content record.
3. Add a corresponding `PrototypeWorkVisual` variant.
4. Add/optimize required assets under `static/consulting/prototypes`.
5. Verify the landing preview and single complete Work page at desktop and mobile widths.
6. Confirm all claims and the live link.

## 5. Browser story implementation

The story uses one reactive elapsed-time value and derives every visible state from it. It does not schedule dozens of independent timeouts.

Key mechanics:

- Total duration: 26 seconds.
- `requestAnimationFrame` advances `elapsed` only when an Intersection Observer reports the section visible.
- Small `ramp`, `clamp`, and `mix` helpers turn time ranges into coherent opacity, position, split, task, and tab states.
- Tabs open by index and close in reverse index.
- Tasks appear and complete sequentially.
- Search, consulting, failure, and restored pages are derived modes within one browser workspace.
- Replay resets `elapsed` and the frame timestamp.
- Reduced-motion mode jumps to a stable final state.

This time-derived approach is the reason the animation now enumerates instead of firing everything at once. New beats should be added to the same timeline rather than implemented as unrelated CSS delays.

### Hero entrance session behavior

Anime.js controls only the initial page composition. The storage key is based on the landing mode and suffixed with `_browser_intro`.

- Normal navigation: entrance once per browser session.
- Review mode: add `?replay=1`.
- Story Replay button: restarts the browser story, not the entire page entrance.

## 6. Telemetry implementation decision

The first MacBook version read Navigation Timing and Paint APIs into a five-column metrics strip. That code and interface have been removed because they competed with the narrative and produced distracting values during long review sessions.

Vercel Speed Insights remains injected globally. A future production iteration can use aggregated production data elsewhere on the site, but only with a clear source, window, and definition.

## 7. Brand icons and external assets

- Most browser/tool marks use `simple-icons` SVG data.
- ChatGPT and several alternative rows currently use remote favicons.
- Project imagery is local under `static/consulting/prototypes`.

Before production launch, download and legally review any required remote favicon assets so the hero does not depend on third-party availability or leak unnecessary requests. Preserve accessible names even when visible alternative labels are hidden.

## 8. Responsive implementation

Primary breakpoints are approximately 1000/900px, 760/650px, and 620px depending on the component.

Desktop behavior:

- Fixed nav with center links.
- Visible page thread.
- Split hero copy.
- Full browser labels and progress strip.
- One three-project Work montage linking to live products and the unified Work page; no full case narratives on the landing page.

Mobile behavior:

- Center nav hidden.
- Page thread hidden.
- Hero copy stacked.
- Browser slightly oversized relative to viewport to preserve screen legibility.
- Tool-tab labels hidden while icons remain.
- Evidence and service/case grids stack.
- The same browser narrative remains intact.

Avoid creating a completely different mobile story. Fix density and scale while keeping the same sequence and promise.

## 9. Motion and lifecycle cleanup

Every continuous system must clean up when its component unmounts:

- Cancel requestAnimationFrame.
- Disconnect Intersection Observers.
- Clear service-loop intervals.
- Revert Anime.js entrance styles.
- Remove Motion scroll/in-view observers.

When adding motion, confirm that navigating between the landing and work page does not leave timers or inline styles behind.

## 10. Accessibility

Implemented standards:

- Skip link to main content.
- Semantic headings and sections.
- Real links and buttons for navigation, CTAs, project choices, and replay.
- ARIA label for the browser story.
- Sequential semantic service sections with descriptive demonstration labels.
- Accessible labels for logo-only alternatives.
- Visible focus styles.
- `prefers-reduced-motion` paths.
- Essential service and contact content exists outside the animation.

Production checks still required:

- Full keyboard pass across landing and work pages.
- Screen-reader pass for service demonstrations and decorative visual noise.
- Contrast audit at small mono-text sizes.
- Verify that the animation’s `aria-live` usage does not become repetitive.

## 11. Local development

Install and run:

```sh
bun install
bun run dev
```

Chosen review URL:

```text
http://127.0.0.1:5173/consulting/prototypes/editorial?replay=1#top
```

The `replay=1` query is useful for visual review but should not be part of production navigation links.

## 12. Validation

Run before handoff:

```sh
bun run build
bun run check
```

Also verify manually or with browser automation:

- Opening desktop viewport.
- Short-scroll browser reveal.
- Hero Replay button.
- Complete tab opening order.
- Notion split and task enumeration.
- 404 → search → Start a project → task completion → refresh sequence.
- Story pausing offscreen.
- Each service demonstration loops while visible and pauses offscreen.
- Work-index anchor links, all three complete case studies, and live-site links.
- Three landing-page project cards and a separate case-study CTA.
- Evidence shown beside the correct case and nowhere as generic landing telemetry.
- Project-starter choices, generated email copy, and reduced-motion state.
- Mobile layout around 390px wide.
- Browser console and Vite error overlay.

Current validation status as of July 18, 2026:

- Production build passes.
- Editorial prototype renders without browser console errors.
- Desktop and 390px mobile compositions were visually checked.
- The editorial landing order is hero → three service chapters → three-project Work showcase → selectable project-starter CTA → consulting footer.
- Replay starts at zero visible tool tabs and enumerates tabs normally.
- Repository-wide `svelte-check` reports only pre-existing warnings in unrelated legacy routes and visualizers; the consulting components do not introduce a diagnostic.

## 13. Performance rules

- Keep the browser story DOM/CSS-based unless a real interaction requires WebGL.
- Pause the story and all service demonstrations offscreen.
- Keep project media local and optimize dimensions/format before launch.
- Avoid adding a shader or video to the current hero; it already has a high-attention object.
- If remote favicons remain, provide local fallbacks.
- Track bundle size if more motion libraries are considered. Use the existing tools before adding another runtime.
- Do not import React solely for shadcn, Uiverse, Origin UI, or a motion example.

The current build reports a large shared chunk elsewhere in the application. Treat code splitting as a repository-level optimization, not a reason to weaken the consulting hero without measuring its contribution.

## 14. Production promotion plan

When the editorial prototype is approved:

1. Resolve the open logo, Sparkling Shoe, CTA, and tab-order decisions.
2. Complete accessibility and performance hardening.
3. Localize any required remote icon assets.
4. Decide whether the existing `/consulting` page is replaced directly or temporarily redirected.
5. Move or render `PrototypeLanding mode="editorial"` at `/consulting`.
6. Move the work page to a production URL such as `/consulting/work` or `/work` under the consulting layout.
7. Replace prototype URLs in internal links and metadata.
8. Confirm canonical tags, Open Graph image, favicon, title, and description.
9. Verify Vercel Analytics and Speed Insights on the production deployment.
10. Test mailto behavior on desktop and mobile.
11. Keep the old mockup routes only if they are intentionally private/internal; otherwise remove them after approval.

## 15. Maintenance workflow

### Copy-only change

Edit `src/lib/content/consulting-prototype.ts`, then run build and inspect both landing and work pages.

### Case-study change

Update the case record, visual variant, and local assets together. Confirm the live site still represents the work.

### Animation timing change

Update the time constants and derived ranges in `PrototypeThroughlineStory.svelte`, then update `consulting-motion-storyboard.md`. Check the entire 26-second loop, not only the modified beat.

### Service change

Update content and ensure the operating-loop state still has a specific visual explanation. Do not add a fourth top-level service without reconsidering navigation, cycle timing, and offer hierarchy.

### New dependency

Document why the existing CSS, Motion, and Anime.js systems cannot handle the need. Prefer small, framework-neutral packages and verify bundle impact.
