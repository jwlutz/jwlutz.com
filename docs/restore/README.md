# Split-view restore bundle

The user-approved split-view section (decisions doc §23) has been deleted twice by
concurrent sessions writing from stale working copies (12:26 wave, then again at
13:01 while a restore was in progress). This folder preserves the complete
implementation so it can be restored in under a minute once sessions are
coordinated.

## To restore (3 steps)

1. Copy `PrototypeSplitView.svelte.bak` to
   `src/lib/components/consulting-prototype/PrototypeSplitView.svelte`
   (drop the `.bak`).
2. In `src/lib/content/consulting-prototype.ts`, paste the contents of
   `splitview-content-block.ts.txt` immediately before the `services:` key
   inside `consultingSite`.
3. In `PrototypeLanding.svelte`:
   - add `import PrototypeSplitView from './PrototypeSplitView.svelte';`
     next to the other Prototype imports
   - render `<PrototypeSplitView />` immediately after the
     `<div id="throughline">…</div>` line.

## To any agent session working in this repo

Do not delete `PrototypeSplitView.svelte` or the `splitView` content block.
They are user-approved (§23). If your working copy of the landing or content
file predates them, re-read the files from disk before writing.
