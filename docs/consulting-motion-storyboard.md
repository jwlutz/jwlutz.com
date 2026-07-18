# Consulting-site motion storyboard

This document is the production reference for all motion on the chosen consulting-site direction. It records narrative purpose, exact sequence, timing, replay rules, responsive behavior, and ideas that were intentionally removed.

## 1. Motion hierarchy

The page has three levels of motion:

1. **Primary cinematic moment — browser ownership story**  
   A 26-second autonomous browser narrative inside the hero. This is the only complex story animation.

2. **Secondary product demonstrations — service chapters**  
   Three independent looping interfaces for websites, AI integrations, and analytics. They appear sequentially in the page rather than rotating inside one shared carousel.

3. **Page transitions — restrained reveals and progress thread**  
   Once-only section reveals, hover states, and a vertical page-progress thread. These should support pacing rather than compete with the hero.

The site is not scroll-scrubbed. Scrolling reveals the complete browser stage and moves through the page, but it does not control the story timeline.

## 2. Hero entrance

The opening composition enters once per browser session:

- Hero copy rises and fades in with a short stagger.
- The browser rises approximately 5rem, scales from roughly 96.5%, and settles with a slow ease-out.
- The caption and timing rail follow beneath it.

Implementation: Anime.js timeline in `PrototypeThroughlineStory.svelte`.

Session behavior:

- A `sessionStorage` key prevents the entrance from replaying every time the visitor navigates back.
- `?replay=1` forces the entrance for review and capture.
- Reduced-motion visitors receive the final composed state immediately.

The browser story itself is separate from this entrance and continues to loop while the section is visible.

## 3. Browser-stage composition

The animated story is presented as a large browser surface without a laptop, monitor, or other device shell.

Required details:

- 16:9 desktop ratio and a slightly taller mobile crop.
- Thin low-contrast outer frame.
- Subtle glass reflection, restrained glow, and shallow perspective.
- Deep shadow that places the browser in the dark page without turning it into a floating rounded card.
- One edge-to-edge browser; no duplicate window chrome around it.
- Centered caption, Replay control, and five-segment timing rail directly beneath the browser.

The browser begins at the bottom of the first viewport. On a standard desktop viewport, a short scroll brings the entire browser and timing rail into view. On mobile, the stage may exceed the viewport width slightly while the screen content simplifies rather than switching narratives.

## 4. Browser story — exact 26-second loop

### Chapter 1: Your site — 0.00–1.65s

Purpose: establish that the client’s website is the thing that matters.

- `yourbusiness.com` is the only meaningful open tab.
- The site is clear, calm, and working.
- The screen reads “Your website that just works.”
- Tool tabs are closed.

### Chapter 2: The stack — 1.65–7.55s

Purpose: show how quickly a straightforward website turns into a toolchain.

Tabs open individually, not all at once. Each receives a visible colored brand accent and a plain-language job:

| Implemented order | Tab | Job shown |
| --- | --- | --- |
| 1 | ChatGPT | Idea |
| 2 | Claude | Build |
| 3 | GitHub | Code |
| 4 | Vercel | Frontend |
| 5 | Railway | Backend |
| 6 | Supabase | Database |
| 7 | Clerk | Customers |
| 8 | Stripe | Payments |
| 9 | PostHog | Analytics |
| 10 | Sentry | Errors |

Timing behavior:

- First tab begins around 1.60s.
- Each next tab begins approximately 0.50s later.
- Each tab has a short 0.28s reveal.
- The motion should read as one continuous accumulation, with no unrelated jumps.

Open production check: an earlier stated list began Claude → ChatGPT. The current implementation begins ChatGPT → Claude because it reads as idea → build. Decide once before launch and keep the documentation and code aligned.

### Chapter 3: Second job — 7.15–13.45s

Purpose: turn abstract tool ownership into a recognizable work burden.

- Notion opens around 7.15s.
- A cursor becomes visible and drags Notion into split screen.
- The split grows from roughly 7.65–8.50s.
- “Website to-do” appears in the Notion pane.
- Tasks arrive one at a time at roughly 0.45s intervals:
  1. Fix mobile checkout
  2. Repair contact form
  3. Update customer login
  4. Check missing payments
  5. Restore analytics
  6. Investigate production error
  7. Finish the AI-generated change
  8. Figure out why deployment failed
- At 12.15s the site fails and becomes a 404.

The list is deliberately ordinary. The narrative should feel like accumulated ownership, not a catastrophic cyberattack.

### Chapter 4: Hand off — 13.45–18.05s

Purpose: make the conversion action literal and causal.

- The cursor opens a neutral/unbranded search tab.
- It focuses the search/address field.
- `jwlutz.com/consulting` types in from approximately 14.05–15.05s.
- The Lutz Consulting Group page appears around 15.35s.
- The cursor moves to Start a project and clicks it.
- The click transfers responsibility; it does not immediately hide the complexity.
- To-do items check off one at a time from approximately 17.25s onward.

The LCG page shown inside the animation uses the same brand language as the real landing page, but it is a scene, not a second miniature marketing experience.

### Chapter 5: It just works — 18.05–26.00s

Purpose: show the outcome as reduced cognitive load.

- Ownership transfer is signaled.
- Tool tabs close in reverse order beginning around 19.35s.
- Notion and the help tab disappear around 21.15–21.80s.
- The original website briefly returns to the failure state.
- The cursor moves to refresh from roughly 21.75–22.42s.
- At 22.55s the site returns to its resolved state.
- The page reads “Your website that just works.”
- The only LCG presence is “Made by LCG” in the business-site footer.
- The final state holds long enough to be understood before the 26-second loop restarts.

The brief second failure before refresh is intentional: it makes the recovery feel like a real completed action instead of a magical scene cut.

## 5. Story progress and controls

Five Railway-like progress segments remain visible at the bottom of the screen:

1. Your site
2. The stack
3. Second job
4. Hand off
5. It just works

Rules:

- Progress follows elapsed time, not scroll position.
- The story loops only while the hero section is sufficiently visible.
- An Intersection Observer pauses time when the section leaves the viewport.
- The Replay story control resets elapsed time to zero.
- The loop should restart cleanly without accumulated DOM elements or layout jumps.
- Scene labels may change more frequently than the five chapter labels, but the five progress chapters stay stable.

## 6. Telemetry decision

The first MacBook version included a Railway-inspired strip for connection state, DOM readiness, paint timing, and transferred size. Although truthful, it added a second information system beneath the browser and made the ownership story harder to follow. It has been removed from the hero.

Do not restore telemetry inside the hero browser unless it becomes essential to the narrative. Any publishable performance evidence belongs inside the relevant case study with a clear source and definition.

## 7. Service-chapter animations

Each service has its own large chapter and product interface. A chapter's demonstration loops only while that chapter is visible; it does not change the surrounding copy or rotate the visitor into another service.

### Chapter 1 — Websites and products

- A release candidate moves through code review, responsive preview, and explicit release checks.
- Copy reads “Fast tools. Human judgment.”
- The loop ends with a deliberate human-approved release rather than implying that generation alone is the work.

### Chapter 2 — AI integrations

- A customer inquiry enters with its source context attached.
- AI prepares the useful next step, then pauses at a visible human checkpoint.
- Approval sends the response and updates the records the business already uses.
- The visual should explain useful integration, not anthropomorphize AI.

### Chapter 3 — ML and analytics

- The loop opens with one plain business question: where does mobile checkout lose customers?
- Funnel evidence narrows to the useful signal instead of presenting an open-ended dashboard.
- The output resolves into one concrete recommendation and the requested operating mode: monitor and act, or report.

Rules:

- Every chapter remains readable without waiting for animation.
- All loops pause offscreen.
- Loops should make one causal idea clear, then restart cleanly without a visible jump.
- Reduced-motion mode removes continuous animations and displays a stable completed state.

## 8. Page-level motion

- A fixed vertical thread tracks document progress on desktop.
- The line grows with page scroll and the brass marker moves along it.
- The thread is hidden on small screens where it would become visual noise.
- Major section items reveal once using opacity and a small vertical translation.
- Project previews may lift and scale slightly on hover.
- The final CTA lets the visitor select a starting project type and opens a tailored, prefilled email.
- Text links use color and underline/border transitions; ordinary links do not need arrow glyphs.
- No additional section should become a pinned scroll takeover unless the whole motion hierarchy is reconsidered.

## 9. Responsive behavior

### Desktop

- Full browser labels.
- Full browser stage and timing rail.
- Hero copy uses a split layout.
- The browser begins near the fold.

### Tablet

- Hero copy stacks.
- Browser retains restrained depth without hardware.
- The service panel moves below its controls.
- Service demonstrations simplify their secondary labels to preserve legibility.

### Mobile

- Tabs keep icons but may hide their text labels.
- Browser chrome and typography scale down.
- Notion becomes a narrower overlay/split while preserving the same causal sequence.
- Case-study previews and evidence stack on the dedicated Work page.
- The browser can exceed the viewport width slightly to avoid making the story unreadably small.
- Page progress thread is removed.

## 10. Accessibility and performance rules

- Honor `prefers-reduced-motion` across Anime.js, CSS keyframes, service cycling, and continuous effects.
- Provide a descriptive label for the animated browser story and retain real headings and links outside it.
- Do not depend on the animation to expose essential service or contact information.
- Pause requestAnimationFrame work offscreen.
- Animate transforms and opacity wherever possible.
- Keep the cursor decorative and non-interactive.
- Ensure real buttons and links remain keyboard accessible with visible focus states.
- Do not autoplay sound.

## 11. Superseded motion concepts

The following ideas are documented but should not be restored without a new decision:

- A full-page AMCA-style scroll sequence that rearranges every section.
- A one-time-only story that never replays. The current story loops while visible and has a manual replay; only the entrance is once per session.
- Logos connected by geometry around a generic website card.
- Services breaking apart, shattering, and merging into an LCG logo.
- An LCG browser tab that replaces the client’s own website.
- CPU/RAM scaling animations copied from Railway.
- A large options-volatility surface as the consulting hero.
- Multiple generated videos or ambient shaders competing with the product story.
- Layout jumps where several tabs or tasks appear simultaneously.

The chosen version is intentionally literal: one computer, one browser, one growing workload, one handoff, and one repaired client site.
