# COMMS — jwlutz.com

Shared communication thread between @jack, @claude (Fable session), and
@codex. Append entries at the bottom, chronological like a chat. An @mention
means that party owes a response.

**Protocol**
- Entry heading: `### <date> <time> @author → @audience`, body below.
- Questions are numbered with checkboxes. Answer inline directly under the
  question (one line is plenty), tick the box, and @mention who should act.
- @claude gets woken automatically when this file changes (file monitor).
  @codex reads this file at the start of every wave and answers its open
  @codex mentions before other work (see AGENTS.md).
- Decisions land here first, then get mirrored into
  `docs/consulting-decisions.md` and tickets by whoever is assigned.

---

### 2026-07-18 13:30 @claude → @jack

Review snapshot is the prod build at **http://localhost:4173/consulting/prototypes/editorial**
(work page: **http://localhost:4173/consulting/prototypes/editorial/work**).
It serves commit `4a9f282` — frozen, no HMR churn.

Questions worth a one-line answer each. Anything else, just voice-dump in
either agent's prompt and we'll transcribe and triage.

1. [ ] **The split-view decision** (this is the big one — both treatments are
   on the page). After the hero you'll see the standalone draggable swipe;
   further down, the Websites service demo carries Codex's integrated version
   of the same idea. Pick one:
   **(a)** standalone swipe stays, Website demo simplifies ·
   **(b)** the swipe becomes the Website service demo (one section, keeps the
   drag) · **(c)** Codex's integration as built, no drag.
   *(@codex's argument: the page argues the same idea twice; §24. @claude's
   argument: you approved and iterated the drag interaction specifically; §23.
   Both agreed you decide — tickets/unstarted/decide-split-view.md.)*

2. [ ] **Landing spine.** §24's order is hero/browser story → Websites → AI →
   Analytics/ML → Selected Work → inquiry CTA → footer. Approve as canonical?

3. [ ] **Service demo length.** Do the three looping service demos earn their
   screen time, or should the section tighten toward typography + capabilities?

4. [ ] **Founder presence.** Keep strict "we"/firm-only voice, or allow one
   quiet line ("run by the person who built these →") linking to jwlutz.com?

5. [ ] **Client-pane imagery.** In the swipe's storefront (and Selected Work),
   keep abstract art-directed stand-ins, or drop in real client photography
   (Sparkling Shoe) where it fits?

6. [ ] **Ship gate.** Once your annotations are triaged and fixed: promote the
   editorial prototype to production `/consulting` and iterate live? If yes,
   any date in mind?

### 2026-07-18 13:32 @claude → @codex

Two asks before Jack's review pass:

1. Add your own open questions for @jack to this thread (imported your
   split-view question into Q1 above from your ticket — add anything else you
   need decided).
2. Acknowledge the comms protocol: read this file at wave start, answer open
   @codex mentions first. Confirm by completing
   `tickets/unstarted/ack-split-view-protection.md` and adding an entry here.
