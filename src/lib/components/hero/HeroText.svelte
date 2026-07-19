<script lang="ts">
	import { onMount } from 'svelte';
	import type { Profile } from '$lib/types';

	let { profile }: { profile: Profile } = $props();
	let card: HTMLElement;
	let motionAllowed = false;
	let scrollFrame = 0;

	function resetPointer() {
		if (!card) return;
		card.style.setProperty('--pointer-x', '0px');
		card.style.setProperty('--pointer-y', '0px');
		card.style.setProperty('--rotate-x', '0deg');
		card.style.setProperty('--rotate-y', '0deg');
	}

	function handlePointer(event: PointerEvent) {
		if (!motionAllowed || !card || event.pointerType === 'touch') return;
		const rect = card.getBoundingClientRect();
		const x = (event.clientX - rect.left) / rect.width - 0.5;
		const y = (event.clientY - rect.top) / rect.height - 0.5;
		card.style.setProperty('--pointer-x', `${x * 18}px`);
		card.style.setProperty('--pointer-y', `${y * 14}px`);
		card.style.setProperty('--rotate-x', `${y * -2.2}deg`);
		card.style.setProperty('--rotate-y', `${x * 2.8}deg`);
	}

	function updateScrollDepth() {
		scrollFrame = 0;
		if (!motionAllowed || !card) return;
		const rect = card.getBoundingClientRect();
		const viewportCenter = window.innerHeight / 2;
		const cardCenter = rect.top + rect.height / 2;
		const distance = Math.max(-1, Math.min(1, (cardCenter - viewportCenter) / window.innerHeight));
		card.style.setProperty('--scroll-depth', `${distance * -24}px`);
	}

	function handleScroll() {
		if (scrollFrame || !motionAllowed) return;
		scrollFrame = requestAnimationFrame(updateScrollDepth);
	}

	onMount(() => {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
		const updateMotion = () => {
			motionAllowed = !reduced.matches;
			if (!motionAllowed) resetPointer();
			updateScrollDepth();
		};

		updateMotion();
		reduced.addEventListener('change', updateMotion);
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			reduced.removeEventListener('change', updateMotion);
			window.removeEventListener('scroll', handleScroll);
			if (scrollFrame) cancelAnimationFrame(scrollFrame);
		};
	});
</script>

<article
	bind:this={card}
	class="hero-card"
	onpointermove={handlePointer}
	onpointerleave={resetPointer}
>
	<div class="card-content">
		<div class="hero-index">
			<span>Portfolio / 2026</span>
			<span>01</span>
		</div>

		<p class="titles">
			{#each profile.titles as title, i}
				<span>{title}</span>
				{#if i < profile.titles.length - 1}<i aria-hidden="true"></i>{/if}
			{/each}
		</p>

		<h1>{profile.name}</h1>
		<p class="tagline">{profile.tagline}</p>

		<div class="hero-actions">
			<a href="#projects">Selected work</a>
			<a href="/consulting" class="quiet">Consulting practice</a>
		</div>

		<div class="meta">
			<span>{profile.location}</span>
			<span>{profile.subtitle}</span>
		</div>
	</div>

	<figure class="photo-panel">
		<div class="photo-depth">
			<img
				src={profile.photo}
				alt="{profile.name}, software and applied machine learning engineer"
				fetchpriority="high"
				decoding="async"
				width="597"
				height="600"
			/>
		</div>
		<div class="photo-wash" aria-hidden="true"></div>
		<figcaption>
			<span>Jack Lutz</span>
			<span>Las Vegas / Los Angeles</span>
		</figcaption>
	</figure>
</article>

<style>
	.hero-card {
		--pointer-x: 0px;
		--pointer-y: 0px;
		--rotate-x: 0deg;
		--rotate-y: 0deg;
		--scroll-depth: 0px;
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 1.12fr) minmax(360px, 0.88fr);
		width: min(1320px, calc(100vw - 80px));
		min-height: 650px;
		overflow: hidden;
		border: 1px solid var(--color-border-strong);
		border-radius: 2px;
		background: var(--color-surface);
		box-shadow: 0 45px 120px rgba(0, 0, 0, 0.3);
		transform: perspective(1500px) translate3d(0, var(--scroll-depth), 0) rotateX(var(--rotate-x)) rotateY(var(--rotate-y));
		transition: transform 180ms cubic-bezier(.2,.75,.2,1), border-color 200ms ease;
		transform-style: preserve-3d;
		contain: layout paint;
	}

	.hero-card:hover { border-color: color-mix(in srgb, var(--color-brass) 45%, var(--color-border-strong)); }

	.card-content {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		padding: 34px 48px 42px;
		background:
			linear-gradient(90deg, transparent 0, transparent calc(100% - 1px), var(--color-border) calc(100% - 1px)),
			var(--color-surface);
		transform: translateZ(18px);
	}

	.hero-index,
	.meta,
	figcaption {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		font: 500 10px/1.2 var(--font-family-mono);
		letter-spacing: .09em;
		text-transform: uppercase;
	}

	.hero-index {
		padding-bottom: 18px;
		border-bottom: 1px solid var(--color-border);
		color: var(--color-brass);
	}

	.titles {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 10px;
		margin: auto 0 26px;
		color: var(--color-text-secondary);
		font: 500 10px var(--font-family-mono);
		letter-spacing: .09em;
		text-transform: uppercase;
	}

	.titles i { width: 12px; height: 1px; background: var(--color-brass); opacity: .7; }

	h1 {
		margin: 0;
		max-width: 690px;
		color: var(--color-text-primary);
		font: 400 clamp(78px, 8vw, 132px)/.78 var(--font-family-display);
		letter-spacing: -.055em;
	}

	.tagline {
		max-width: 620px;
		margin: 30px 0 0;
		color: var(--color-text-secondary);
		font-size: clamp(17px, 1.5vw, 21px);
		line-height: 1.55;
	}

	.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 36px; }
	.hero-actions a {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		padding: 0 16px;
		border: 1px solid var(--color-paper);
		border-radius: 1px;
		background: var(--color-paper);
		color: var(--color-ink);
		font-size: 12px;
		font-weight: 650;
		text-decoration: none;
		transition: background 180ms ease, color 180ms ease, border-color 180ms ease;
	}
	.hero-actions a:hover { background: var(--color-brass); border-color: var(--color-brass); }
	.hero-actions a.quiet { background: transparent; color: var(--color-text-secondary); border-color: var(--color-border-strong); }
	.hero-actions a.quiet:hover { color: var(--color-text-primary); border-color: var(--color-brass); }

	.meta {
		margin-top: auto;
		padding-top: 30px;
		color: var(--color-text-muted);
	}

	.meta span:last-child { text-align: right; }

	.photo-panel {
		position: relative;
		min-width: 0;
		min-height: 650px;
		margin: 0;
		overflow: hidden;
		background: var(--color-emerald-deep);
		transform: translateZ(8px);
	}

	.photo-depth {
		position: absolute;
		inset: -5%;
		transform: translate3d(calc(var(--pointer-x) * -1), calc(var(--pointer-y) * -1 + var(--scroll-depth) * .7), 0) scale(1.08);
		transition: transform 220ms cubic-bezier(.2,.75,.2,1);
		will-change: transform;
	}

	.photo-depth img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 51% 42%;
		filter: saturate(.7) contrast(1.08) brightness(.78);
	}

	.photo-wash {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(180deg, rgba(4, 25, 19, .04), rgba(4, 25, 19, .68)),
			linear-gradient(110deg, rgba(7, 84, 63, .46), transparent 58%);
		pointer-events: none;
	}

	figcaption {
		position: absolute;
		z-index: 2;
		left: 24px;
		right: 24px;
		bottom: 24px;
		padding-top: 15px;
		border-top: 1px solid rgba(240, 239, 233, .36);
		color: rgba(240, 239, 233, .86);
	}

	@media (max-width: 980px) {
		.hero-card { grid-template-columns: 1fr 320px; width: min(100% - 40px, 980px); }
		.card-content { padding: 28px 32px 34px; }
		h1 { font-size: 82px; }
	}

	@media (max-width: 760px) {
		.hero-card {
			display: flex;
			flex-direction: column-reverse;
			width: calc(100% - 28px);
			min-height: 0;
			transform: none;
		}
		.card-content { min-height: 480px; padding: 20px 20px 26px; transform: none; }
		.photo-panel { min-height: 330px; transform: none; }
		.photo-depth { inset: -4%; transform: scale(1.08); }
		.titles { margin-top: 74px; }
		h1 { font-size: 72px; }
		.tagline { margin-top: 22px; font-size: 16px; }
		.meta { align-items: flex-start; flex-direction: column; gap: 9px; }
		.meta span:last-child { text-align: left; }
		figcaption { left: 16px; right: 16px; bottom: 16px; font-size: 8px; }
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-card,
		.photo-depth { transform: none !important; transition: none; }
	}
</style>
