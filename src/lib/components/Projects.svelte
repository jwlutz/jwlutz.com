<script lang="ts">
	import { onMount } from 'svelte';
	import ProjectCard from './ProjectCard.svelte';
	import type { Project } from '$lib/types';

	let { projects }: { projects: Project[] } = $props();

	let carouselRef: HTMLDivElement;
	let currentIndex = $state(1);

	onMount(() => {
		setTimeout(() => {
			if (carouselRef) {
				const cardWidth = 420 + 24;
				carouselRef.scrollLeft = cardWidth;
			}
		}, 100);
	});

	function scrollTo(index: number) {
		if (!carouselRef) return;
		const cardWidth = 420 + 24;
		carouselRef.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
		currentIndex = index;
	}

	function next() {
		const newIndex = (currentIndex + 1) % projects.length;
		scrollTo(newIndex);
	}

	function prev() {
		const newIndex = (currentIndex - 1 + projects.length) % projects.length;
		scrollTo(newIndex);
	}
</script>

<section id="projects" class="projects-section">
	<div class="max-w-[1200px] mx-auto px-6">
		<div class="section-header-sticky text-center">
			<p class="section-label">Work</p>
			<h2 class="section-heading">Projects</h2>
		</div>
	</div>

	<div class="relative mt-8">
		<!-- Navigation Buttons (hidden on mobile) -->
		<button
			onclick={prev}
			class="carousel-btn absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 hidden md:flex"
			aria-label="Previous project"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
		</button>

		<button
			onclick={next}
			class="carousel-btn absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 hidden md:flex"
			aria-label="Next project"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</button>

		<!-- Cards -->
		<div
			bind:this={carouselRef}
			class="carousel-track"
		>
			{#each projects as project, i}
				<div class="snap-center flex-shrink-0">
					<ProjectCard {project} featured={i === currentIndex} />
				</div>
			{/each}
		</div>

		<!-- Dots Indicator (hidden on mobile) -->
		<div class="hidden md:flex justify-center gap-2 mt-8">
			{#each projects as _, i}
				<button
					onclick={() => scrollTo(i)}
					class="w-2 h-2 rounded-full transition-all duration-300 {i === currentIndex
						? 'bg-[var(--color-accent)] w-6'
						: 'bg-[var(--color-border)]'}"
					aria-label="Go to project {i + 1}"
				></button>
			{/each}
		</div>
	</div>
</section>

<style>
	.projects-section {
		position: relative;
		padding: 6rem 0;
	}

	.carousel-track {
		display: flex;
		gap: 1.5rem;
		overflow-x: auto;
		overflow-y: visible;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		padding: 1rem 0;
		padding-left: max(1rem, calc(50vw - 210px));
		padding-right: max(1rem, calc(50vw - 210px));
		-webkit-overflow-scrolling: touch;
	}

	.carousel-track::-webkit-scrollbar {
		display: none;
	}

	.carousel-track {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	/* Mobile: vertical stack */
	@media (max-width: 768px) {
		.carousel-track {
			flex-direction: column;
			overflow-x: visible;
			scroll-snap-type: none;
			padding-left: 1rem;
			padding-right: 1rem;
			gap: 1.5rem;
		}

		.carousel-track > div {
			width: 100%;
		}
	}
</style>
