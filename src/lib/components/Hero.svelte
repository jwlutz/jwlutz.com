<script lang="ts">
	import type { Profile } from '$lib/types';
	import { isMobile } from '$lib/stores/mediaQuery';
	import AnimatedGradient from './hero/AnimatedGradient.svelte';
	import HeroText from './hero/HeroText.svelte';

	let { profile }: { profile: Profile } = $props();
</script>

<section id="home" class="hero-section">
	<AnimatedGradient simplified={$isMobile} />
	<div class="hero-content">
		<HeroText {profile} />
	</div>
</section>

<style>
	.hero-section {
		position: relative;
		min-height: 100vh;
		min-height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hero-content {
		position: relative;
		z-index: 10;
		padding: 1rem;
	}
</style>
