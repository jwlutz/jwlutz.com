<script lang="ts">
	import type { Profile } from '$lib/types';
	import HeroText from './hero/HeroText.svelte';

	let { profile }: { profile: Profile } = $props();
</script>

<section id="home" class="hero-section">
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

	@media (max-width: 760px) {
		.hero-section { min-height: 0; padding: 96px 0 54px; background-size: auto, 56px 56px, 56px 56px; }
	}
</style>
