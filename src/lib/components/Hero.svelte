<script lang="ts">
	import type { Profile } from '$lib/types';
	import HeroText from './hero/HeroText.svelte';

	let { profile }: { profile: Profile } = $props();
</script>

<section id="home" class="hero-section">
	<div class="hero-register" aria-hidden="true">
		<span>Jack Lutz / Personal portfolio</span>
		<i></i>
		<span>Scroll to explore</span>
	</div>
	<HeroText {profile} />
</section>

<style>
	.hero-section {
		position: relative;
		min-height: 100svh;
		padding: 126px 0 82px;
		display: flex;
		align-items: center;
		justify-content: center;
		background:
			radial-gradient(circle at 82% 24%, color-mix(in srgb, var(--color-emerald) 34%, transparent), transparent 38%),
			linear-gradient(var(--color-border) 1px, transparent 1px),
			linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
		background-size: auto, 88px 88px, 88px 88px;
		overflow: hidden;
	}

	.hero-register {
		position: absolute;
		left: max(40px, calc((100vw - 1320px) / 2));
		right: max(40px, calc((100vw - 1320px) / 2));
		top: 88px;
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 14px;
		color: var(--color-text-muted);
		font: 500 9px var(--font-family-mono);
		letter-spacing: .1em;
		text-transform: uppercase;
	}

	.hero-register i { height: 1px; background: var(--color-border); }

	@media (max-width: 760px) {
		.hero-section { min-height: 0; padding: 96px 0 54px; background-size: auto, 56px 56px, 56px 56px; }
		.hero-register { left: 14px; right: 14px; top: 72px; }
		.hero-register span:last-child { display: none; }
		.hero-register { grid-template-columns: auto 1fr; }
	}
</style>
