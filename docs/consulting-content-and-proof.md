# Consulting-site content and proof guide

This document defines the current messaging, content hierarchy, evidence standards, case-study model, and the safest way to update public copy.

## 1. Editing source of truth

Routine public-content changes belong in:

`src/lib/content/consulting-prototype.ts`

That file contains:

- Brand and contact information.
- Hero copy and CTA labels.
- Proof strip.
- Narrative scene copy.
- Service names, descriptions, capabilities, and alternatives.
- Engagement steps and formats.
- Work-page introduction.
- Lab feature.
- Final CTA.
- Case-study evidence, chapters, responsibilities, and links.

Do not hard-code alternate versions of the same public claim in a component unless it is screen-specific microcopy inside the animation. Layout, motion, and component-specific interface labels remain in the Svelte components.

## 2. Message hierarchy

Every section should reinforce this sequence:

1. **Problem:** the visible website becomes a hidden operational burden.
2. **Promise:** one partner can design, build, connect, and operate it.
3. **Method:** human judgment first; useful AI and analytics add leverage.
4. **Proof:** real products, responsibilities, live links, and defensible evidence.
5. **Action:** send the messy current state and let LCG define the right first move.

If a paragraph does not advance one of those ideas, it is probably unnecessary.

## 3. Approved hero copy

Eyebrow:

> WEBSITES / AI INTEGRATIONS / ANALYTICS

Headline:

> Don’t let your website become your second job.

Body:

> We design, build, and operate the digital systems behind your business—so you can keep running the business.

Primary CTA:

> Start a project

Secondary CTA:

> See our work

Animation caption:

> ONE WEBSITE / ELEVEN OPEN TABS

> The tools are excellent. Owning how they work together is still a job.

Why this is current:

- “Second job” is specific and memorable.
- “Design, build, and operate” communicates lifecycle ownership.
- “Digital systems” leaves room for AI, analytics, commerce, and operational tools.
- The body states the business benefit without promising a particular stack.

## 4. Approved services

### 01 — Websites, built with judgment

Detail line:

> DESIGN · DEVELOPMENT · COMMERCE · PRODUCTS

Body:

> Every line we ship is read, understood, and tested by a person who is accountable for the whole result.

Capabilities:

- Websites and rebuilds.
- Commerce and platform migrations.
- Custom products and integrations.

What this includes in practice:

- New websites and professional landing pages.
- Squarespace or other site-builder migrations.
- Shopify and commerce implementation.
- Domains, hosting, mobile behavior, forms, auth, payments, databases, SEO, logging, source control, and deployment.
- Product design and custom web applications.
- Maintenance and ongoing care.

The public page should not enumerate the entire stack in the service paragraph. The browser story demonstrates that complexity more effectively.

### 02 — AI that fits the work

Detail line:

> INTEGRATIONS · AUTOMATION · INTERNAL TOOLS · AGENTS

Body:

> We connect AI to the business you already run—removing repetitive work without creating another system you have to babysit.

Capabilities:

- AI integrations inside existing workflows.
- Purpose-built internal tools.
- Reliable automation with human checkpoints.

Positioning rule: sell the business process that becomes easier, not access to a model. AI should appear as an integrated capability rather than a novelty or a reason to replace human judgment.

### 03 — Analytics that leads somewhere

Detail line:

> MEASUREMENT · REPORTING · EXPERIMENTS · GROWTH

Body:

> We turn customer behavior and operating data into the next useful decision—not another dashboard nobody checks.

Capabilities:

- Analytics designed around real questions.
- Reports or ongoing monitoring.
- Experiments and product growth.

Operating models:

- LCG monitors the system and acts on the findings.
- LCG provides a report when the client prefers to execute.
- The relationship may include product, website, or social-growth changes when those are the next useful action.

## 5. Alternatives framing

The alternatives rows explain the difference between assembling tools and retaining one accountable owner.

Current categories and examples:

| Offer | Visible label | Logo examples |
| --- | --- | --- |
| Websites | The tool-only route | Lovable, Base44, Replit |
| AI | The self-serve route | Zapier, Make, Gumloop |
| Analytics | The dashboard-only route | Google Analytics, Tableau, Power BI |

Display rules:

- Use company marks without visible company names.
- Keep the marks muted and non-clickable.
- Retain accessible labels and optional restrained hover titles.
- Do not write direct attacks or feature-by-feature comparisons.
- Keep the clarification: “We use some of these tools too. What you are buying is judgment and ownership—not a preference for one platform.”

The section should not send visitors shopping. It should make the ownership gap obvious.

## 6. Case-attached evidence

The landing page does not use a standalone proof strip. Evidence stays with its
relevant case on the unified Work page. Current plain-language examples include:

- **Candella Copytrade:** 16 connected brokerages.
- **MindLSN:** 7 adaptive cognitive drills.
- **The Sparkling Shoe:** Squarespace → Shopify.

These are preferable to generic badges such as LIVE, WORKING, 99.9%, or FAST because they explain what was actually made. Do not reintroduce them as a disconnected landing-page numbers row.

## 7. Evidence standard

Evidence belongs in one of four categories:

1. **Scope evidence** — what was connected, migrated, or built.
2. **Measured product behavior** — a defined metric captured by the product.
3. **Operational ownership** — what LCG designed, implemented, monitors, or continues to improve.
4. **Business outcome** — revenue, conversion, qualified inquiries, time saved, or growth, only when a reliable baseline and source exist.

Before publishing a number, record:

- Definition.
- Data source.
- Date range.
- Sample size when relevant.
- Whether LCG can reasonably claim influence.
- Whether the client has approved public use.

### Metrics to avoid for now

- Uptime without a monitored, meaningful period.
- Incident response without an actual service-level record.
- Build time, which varies by project and says little to a client.
- Page response time without test conditions and business relevance.
- Revenue or conversion claims without a verified baseline.
- “100% responsive,” “24/7,” and similar technically true but unpersuasive filler.
- Aggregate Web Vitals invented from a local test.

### Browser metrics

DOM-ready, paint, transfer size, and connection state were briefly displayed inside the MacBook. The values were legitimate but distracted from the story and have been removed. They remain unsuitable as client case-study evidence.

### Testimonials

There are not currently enough strong testimonials for a dedicated section. Do not fill the gap with anonymous praise, invented quotes, or vague one-line endorsements. Use real systems, responsibilities, and live links as proof. Add a testimonial only when it names a concrete benefit, has an attributable source, and is approved for public use.

## 8. Case-study writing template

Each full case has the same structure:

1. **Title and summary** — the product’s useful outcome in plain language.
2. **Evidence** — two compact facts that can be defended.
3. **The need** — what the client or product needed to accomplish.
4. **The difficult part** — the real product, operational, or technical constraint.
5. **What we built** — the connected result, not a list of frameworks.
6. **What continues** — ongoing care, extension, or collaborative development.
7. **Responsibilities** — specific areas LCG owned.
8. **Live site** — a direct external link.

This formula is adapted from In the Brand Lab’s visual-first pacing but uses product and operational evidence instead of agency revenue statistics.

## 9. Current case copy and facts

### Candella Copytrade

Category: Financial infrastructure  
Title: “One trade. Sixteen brokerages.”  
Summary: a real-money trading system that mirrors a lead trader across connected brokerage accounts while keeping risk and every execution visible.

Evidence:

- 16 brokerages — one connected execution network.
- 90% under half a second — measured lead-to-follower routing.

Chapters:

- **The need:** let a follower mirror a live human trader into a personal brokerage account without hiding risk, latency, or execution quality.
- **The difficult part:** every broker behaves differently; orders must survive networks, acknowledgements, slippage, position sizing, failed connections, and user risk limits.
- **What we built:** the public product, broker engine, risk controls, payments, account connections, and reporting operate as one system.
- **What continues:** execution is monitored and the platform evolves with broker behavior, credentials, compliance needs, and product requirements.

Responsibilities:

- Product and interface design.
- Broker execution architecture.
- Payments and account systems.
- Monitoring and analytics.

### MindLSN

Category: Adaptive product  
Title: “A score that learns with you.”  
Summary: an adaptive cognitive-training product where drills, ratings, integrity checks, and the surrounding experience work as one coherent system.

Evidence:

- 7 adaptive drills — difficulty changes with performance.
- 5 domains — one comparable Mind Index.

Chapters:

- **The need:** turn short cognitive drills into a long-running, understandable measure of improvement without making the product clinical or over-gamified.
- **The difficult part:** difficulty must adapt, performance must remain comparable, and obvious shortcuts must not distort the score.
- **What we built:** per-game ELO behavior, a weighted Mind Index, integrity checks, and a calm editorial interface.
- **What continues:** collaborative development as drills, rating behavior, and research questions evolve.

Responsibilities:

- Website and product design.
- Adaptive ELO architecture.
- Anti-cheat and integrity systems.
- Collaborative product development.

### The Sparkling Shoe

Category: Ecommerce  
Title: “From site builder to commerce system.”  
Summary: a commerce rebuild connecting product presentation, Shopify, mobile shopping, analytics, and ongoing growth.

Evidence:

- Squarespace → Shopify — complete commerce migration.
- Built for mobile — product discovery through checkout.

Chapters:

- **The need:** give handmade pointe accessories enough visual space to explain the product while making the storefront easier to browse and buy from.
- **The difficult part:** product discovery, mobile shopping, catalog management, checkout, analytics, and future wholesale needs had to work together.
- **What we built:** a Shopify experience that combines product photography, direct education, and a maintainable commerce platform.
- **What continues:** analytics, product presentation, and social-growth support.

Responsibilities:

- Squarespace to Shopify migration.
- Website and product design.
- Mobile commerce.
- Analytics and social growth.

Publication caution: because the live site was later redone and may no longer represent the original work, the case should be supported with owned screenshots and kept under review.

### Candella Quant

Category: In the Lab / closed beta  
Summary: a modular workspace for live charts, strategy editing, backtests, and AI-assisted research.

Do not describe it as a finished case or overstate the current public page. It can demonstrate active technical product work while the more complete story is developed.

## 10. Engagement and CTA copy

Engagement eyebrow:

> HOW ENGAGEMENTS START

Title:

> Bring us the messy version.

Body:

> No polished brief required. Send the current site, the inherited system, the manual process, or the idea that is not quite formed yet.

Steps:

1. **Show us what exists** — a link, recording, list of problems, or conversation is enough.
2. **Choose the right first move** — separate what matters now from what can wait.
3. **Keep one throughline** — carry context from build through launch, care, analytics, and improvement.

Starting formats:

- Focused project.
- Rebuild plus ongoing care.
- Existing-system care.

Final CTA:

> Tell us where it hurts. We’ll take it from there.

> Send the site, the problem, or the half-formed idea. We will help identify the right first move.

No booking link exists yet. Use `jwlutz65@gmail.com` until a real booking workflow is established.

## 11. Voice checklist

Use:

- Concrete nouns and verbs.
- Plain descriptions of the work and what the client no longer has to carry.
- “We” for Lutz Consulting Group.
- Technical detail when it clarifies complexity or proves responsibility.
- Confident but bounded claims.

Avoid:

- “Cutting-edge,” “revolutionary,” “seamless solutions,” and other generic AI/agency phrases.
- Presenting the latest tools as the product.
- Excessive gold-highlighted headings or decorative status language.
- Founder-first copy on the consulting pages.
- Arrows on every link.
- Making unfamiliar metrics the first thing a visitor must decode.
- Naming competitors in visible alternative rows.

## 12. Asset priorities

Use in this order:

1. Real product UI and owned screenshots.
2. Purpose-built diagrams based on real product behavior.
3. Product photography.
4. Art-directed generated imagery, only when clearly decorative.

Potential new one-day visuals:

- Dance inventory workflow: product photo → extraction → confidence checks → human review queue.
- Micrograd backward-pass visualization for the personal portfolio.
- Makemore training/generation sequence for the personal portfolio.

Do not use generated campaign art as client proof. If video is eventually generated with Flow/Whisk-style tooling, it should be a single silent brand moment with a poster fallback, not a wallpaper behind the whole site.
