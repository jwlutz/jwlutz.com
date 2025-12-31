<script lang="ts">
	import { onMount } from 'svelte';
	import { inview } from '$lib/actions/inview';
	import ProjectCard from './ProjectCard.svelte';
	import type { Project } from '$lib/types';

	let { projects }: { projects: Project[] } = $props();

	let carouselRef: HTMLDivElement;
	let currentIndex = $state(1);

	onMount(() => {
		// Scroll carousel to second slide on mount (without affecting page scroll)
		setTimeout(() => {
			if (carouselRef) {
				const cardWidth = 420 + 24; // card max-width + gap
				carouselRef.scrollLeft = cardWidth;
			}
		}, 100);
	});

	function scrollTo(index: number) {
		if (!carouselRef) return;
		const cardWidth = 420 + 24; // card max-width + gap
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

<section id="projects" class="py-24">
	<div class="max-w-[1200px] mx-auto px-6">
		<div class="animate-on-scroll text-center mb-16" use:inview>
			<p class="section-label">Work</p>
			<h2 class="section-heading">Projects</h2>
		</div>
	</div>

	<!-- Carousel Container -->
	<div class="relative">
		<!-- Navigation Buttons -->
		<button
			onclick={prev}
			class="carousel-btn absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10"
			aria-label="Previous project"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
		</button>

		<button
			onclick={next}
			class="carousel-btn absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10"
			aria-label="Next project"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</button>

		<!-- Cards -->
		<div
			bind:this={carouselRef}
			class="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-[calc(50%-200px)] pb-4 hide-scrollbar"
			style="scrollbar-width: none; -ms-overflow-style: none;"
		>
			{#each projects as project, i}
				<div class="snap-center">
					<ProjectCard {project} featured={i === currentIndex} />
				</div>
			{/each}
		</div>

		<!-- Dots Indicator -->
		<div class="flex justify-center gap-2 mt-8">
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
	.hide-scrollbar::-webkit-scrollbar {
		display: none;
	}
</style>
