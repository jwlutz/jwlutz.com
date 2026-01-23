<script lang="ts">
	import SkillsGrid from './skills/SkillsGrid.svelte';
	import Keyboard3DThree from './skills/Keyboard3DThree.svelte';
	import { isMobile } from '$lib/stores/mediaQuery';
	import type { Skills as SkillsType } from '$lib/types';

	let { skills }: { skills: SkillsType } = $props();
</script>

<section id="skills" class="skills-section">
	<!-- Marquee background -->
	<div class="marquee-bg">
		<div class="marquee-row">
			<div class="marquee-track">
				{#each [...skills.languages, ...skills.languages, ...skills.languages, ...skills.languages] as lang}
					<span class="marquee-item">{lang}</span>
				{/each}
			</div>
		</div>

		<div class="marquee-row reverse">
			<div class="marquee-track">
				{#each [...skills.technologies, ...skills.technologies, ...skills.technologies] as tech}
					<span class="marquee-item">{tech}</span>
				{/each}
			</div>
		</div>

		<div class="marquee-row slow">
			<div class="marquee-track">
				{#each [...skills.coursework, ...skills.coursework, ...skills.coursework, ...skills.coursework] as course}
					<span class="marquee-item">{course}</span>
				{/each}
			</div>
		</div>

		<div class="marquee-row reverse slow">
			<div class="marquee-track">
				{#each [...skills.languages, ...skills.technologies].slice(0, 15) as item}
					<span class="marquee-item">{item}</span>
				{/each}
				{#each [...skills.languages, ...skills.technologies].slice(0, 15) as item}
					<span class="marquee-item">{item}</span>
				{/each}
			</div>
		</div>
	</div>

	<!-- Content -->
	<div class="content-overlay">
		<div class="max-w-[1200px] mx-auto px-6">
			<div class="section-header-sticky tech-header text-center">
				<p class="section-label">Skills</p>
				<h2 class="section-heading">Tech Stack</h2>
			</div>

			{#if $isMobile}
				<SkillsGrid />
			{:else}
				<div class="keyboard-wrapper">
					<Keyboard3DThree />
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	.skills-section {
		position: relative;
		min-height: 100vh;
		padding: 6rem 0;
		overflow: visible;
	}

	/* Marquee Background */
	.marquee-bg {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		opacity: 0.06;
		pointer-events: none;
		overflow: hidden;
		padding-top: 10rem;
	}

	.marquee-row {
		display: flex;
		white-space: nowrap;
		overflow: hidden;
	}

	.marquee-track {
		display: flex;
		gap: 3rem;
		animation: marquee 40s linear infinite;
	}

	.marquee-row.reverse .marquee-track {
		animation-direction: reverse;
	}

	.marquee-row.slow .marquee-track {
		animation-duration: 60s;
	}

	.marquee-item {
		font-size: 2rem;
		font-weight: 700;
		color: var(--color-text-primary);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	@keyframes marquee {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	.content-overlay {
		position: relative;
		z-index: 10;
	}

	.tech-header {
		z-index: 50;
	}

	.keyboard-wrapper {
		width: 100%;
		display: flex;
		justify-content: center;
	}
</style>
