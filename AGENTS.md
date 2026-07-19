# AGENTS.md — jwlutz.com working agreement

This file governs every agent session in this repo (Claude, Codex, or
otherwise). Jack is the only human. Read this before your first write, and
re-read `tickets/notes.md` before every work wave.

## What this repo is

- SvelteKit 2 / Svelte 5, bun, deployed to Vercel. **Pushing master deploys
  the live site.** Never push without Jack's explicit instruction.
- Two products share the repo: the personal portfolio (`src/routes/*`) and the
  Lutz Consulting Group revamp (`src/routes/consulting/prototypes/*`,
  components in `src/lib/components/consulting-prototype/`).
- All consulting copy lives in `src/lib/content/consulting-prototype.ts`.
  Wording changes happen there, not in components.

## Authority order

1. Jack's direct instructions (latest wins).
2. `docs/consulting-decisions.md` — §-numbered decisions. Highlights that keep
   getting violated: **§23** (the split-view swipe is the site's central
   metaphor and is user-approved; do not remove it), invented client metrics
   are banned, anti-AI-tool copy is banned.
3. The rest of `docs/` in the order `docs/README.md` lists.
4. This file.

## Communication: COMMS.md

`COMMS.md` at the repo root is the shared thread between @jack, @claude, and
@codex. Rules: append chronologically; an @mention means you owe a response;
**begin every work wave by reading COMMS.md and answering your open mentions
before touching code.** The @claude session runs a file monitor on it (its
"webhook"); @codex has a persistent thread monitor named
`Watch COMMS for @codex` and still performs the wave-start read as a fallback.
The monitor acts only on new unresolved direct mentions. Decisions land in
COMMS.md first, then get mirrored to the decisions doc and tickets.

## Coordination: the ticket board

`tickets/` is the shared kanban between sessions
(`backlog → unstarted → in-progress → in-testing → completed`, format in
`template.md`, cross-cutting log in `notes.md`). The rules:

- Check `tickets/in-progress/` before touching a surface; if another session
  has it open, coordinate in the ticket's Notes instead of rewriting.
- Write tickets **to each other**: if you need the other session to do or stop
  doing something, that's a ticket in `unstarted/` assigned to them, and they
  acknowledge by moving it to `completed/` with a note.
- Soft surface ownership lives in `tickets/notes.md`. Negotiable via tickets,
  never by silently rewriting.

## Concurrency rules (multiple sessions, one tree)

1. **Re-read files from disk before every write.** Never write from a copy
   loaded before your last wave. Prefer anchored edits over wholesale rewrites.
2. **Never delete a file you don't recognize.** Ticket it with your reasoning
   and let the owner respond. This rule exists because the approved split-view
   section was deleted twice on 2026-07-18 by stale-copy writes.
3. If you restructure `PrototypeLanding.svelte` or the content file, preserve
   sections you didn't author. Recovery bundles for critical sections live in
   `docs/restore/`.

## Review workflow with Jack

Established 2026-07-18. This is how Jack sees one product instead of two
agents' moving edits:

1. **Jack reviews a frozen snapshot**, not the dev tree: `bun run build` then
   `bun --bun vite preview --port 4173`. Dev servers (port 5188) are for agent
   verification, not his review.
   **After ANY `bun run build`, relaunch the 4173 preview** (`pkill -f "vite
   preview"`, then start it again): a build replaces `.svelte-kit/output`
   under the running server, and the next stale-hash request crashes it.
   This killed the snapshot server three times on 2026-07-18.
2. **He annotates raw** — voice notes, messy bullets, screenshots. Never ask
   him for structured feedback or tickets.
3. **The receiving session triages the dump into tickets**: one ticket per
   change, tagged `blocker` / `should` / `taste` in the title or Why, assigned
   by surface ownership. He then only orders the board.
4. **Afterward, review is by delta.** When he returns, summarize what changed
   since his last pass (tickets completed, surfaces touched) and let him react
   to the delta only.
5. **Commits**: local checkpoint commits at every stable point are authorized
   (established 2026-07-18). Style: lowercase, terse, no `fix:`/`feat:`
   prefixes, no AI attribution or Co-Authored-By footers. **Pushing is never
   authorized by default** — push deploys production; it requires Jack saying
   so, every time.

## Verification norms

- svelte-check stays at **0 errors**. Run it before ending any work wave.
- Verify user-facing changes in a running browser at desktop and 375px widths;
  geometry checks (no overflow, no text collisions) count, screenshots alone
  don't.
- Performance posture (hard-won, keep it): animate only transform / opacity /
  clip-path; `contain: layout paint` on animating regions;
  `content-visibility: auto` below the fold; no backdrop-filter or
  mix-blend-mode over animating content; animations pause offscreen; every
  motion system has a `prefers-reduced-motion` path; lazy-load below-fold
  images.

## Design guardrails (Jack's taste — violating these gets work redone)

- No green status dots, green buttons, or glow effects. These read as
  AI-generated mockups. Accent language is brass / ink / cream on the emerald
  base; serif display type, mono labels.
- No invented client metrics anywhere, ever. Client-facing proof shows state
  ("New order · confirmation sent"), not numbers, unless the number is real
  and verifiable.
- No anti-AI-tool copy. We use these tools; the differentiator is ownership.
- Real artifacts over simulated consoles. Dev-tool aesthetics are allowed only
  when explicitly framed as *our side of the glass* (§23).
- Site copy: no em-dashes, no hedging, no AI-tell phrasing.
