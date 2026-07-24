<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		eyebrow = 'Legal',
		title,
		updated,
		children
	}: { eyebrow?: string; title: string; updated: string; children: Snippet } = $props();
</script>

<article class="legal-doc">
	<header>
		<p class="eyebrow">{eyebrow}</p>
		<h1>{title}</h1>
		<p class="updated">Last updated {updated}</p>
	</header>
	<div class="legal-body">
		{@render children()}
	</div>
</article>

<style>
	.legal-doc {
		width: min(820px, calc(100% - 48px));
		margin: 0 auto;
		padding: 120px 0 110px;
	}
	.eyebrow {
		margin: 0 0 18px;
		color: var(--color-brass);
		font: 500 9px var(--font-family-mono);
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}
	.legal-doc header {
		margin-bottom: 46px;
		padding-bottom: 34px;
		border-bottom: 1px solid var(--color-border);
	}
	.legal-doc h1 {
		margin: 0;
		color: var(--color-text-primary);
		font: 400 clamp(44px, 6vw, 68px) / 0.95 var(--font-family-display);
		letter-spacing: -0.03em;
	}
	.updated {
		margin: 20px 0 0;
		color: var(--color-text-muted);
		font: 500 10px var(--font-family-mono);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	.legal-body {
		color: var(--color-text-secondary);
		font-size: 15px;
		line-height: 1.75;
	}
	.legal-body :global(.lead) {
		margin: 0 0 30px;
		color: var(--color-text-secondary);
		font-size: 15.5px;
	}
	.legal-body :global(h2) {
		margin: 46px 0 15px;
		color: var(--color-text-primary);
		font: 500 12px var(--font-family-mono);
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	.legal-body :global(h2:first-of-type) {
		margin-top: 0;
	}
	.legal-body :global(p) {
		margin: 0 0 16px;
	}
	.legal-body :global(ul) {
		margin: 0 0 18px;
		padding-left: 20px;
	}
	.legal-body :global(li) {
		margin: 0 0 9px;
	}
	.legal-body :global(strong) {
		color: var(--color-text-primary);
		font-weight: 600;
	}
	.legal-body :global(a) {
		color: var(--color-text-primary);
		text-underline-offset: 3px;
	}
	.legal-body :global(a:hover) {
		color: var(--color-brass);
	}
	.legal-body :global(.addr) {
		margin: 0 0 4px;
		color: var(--color-text-muted);
		font-size: 13.5px;
		line-height: 1.6;
	}
	@media (max-width: 760px) {
		.legal-doc {
			padding: 100px 0 80px;
		}
	}
</style>
