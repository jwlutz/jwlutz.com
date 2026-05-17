<script lang="ts">
	import { onMount } from 'svelte';
	import ProjectCard from './ProjectCard.svelte';
	import type { Project } from '$lib/types';
	import { track } from '$lib/analytics';

	let { projects }: { projects: Project[] } = $props();

	let carouselRef: HTMLDivElement;
	// Start centered on DSA from Scratch (index 2 in projects.json).
	const initialIndex = 2;
	let currentIndex = $state(initialIndex);

	function centerCard(index: number, behavior: ScrollBehavior = 'auto') {
		if (!carouselRef) return;
		const child = carouselRef.children[index] as HTMLElement | undefined;
		if (!child) return;
		const target = child.offsetLeft + child.offsetWidth / 2 - carouselRef.clientWidth / 2;
		carouselRef.scrollTo({ left: target, behavior });
	}

	onMount(() => {
		// Position before the first paint so mobile doesn't briefly show card 0.
		centerCard(initialIndex);
		// One rAF pass after layout settles, in case fonts/images shift widths.
		requestAnimationFrame(() => centerCard(initialIndex));

		let raf = 0;
		const onScroll = () => {
			if (!carouselRef || raf) return;
			raf = requestAnimationFrame(() => {
				raf = 0;
				if (!carouselRef.children.length) return;
				const first = carouselRef.children[0] as HTMLElement;
				const second = carouselRef.children[1] as HTMLElement | undefined;
				const cardWidth = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
				const center = carouselRef.scrollLeft + carouselRef.clientWidth / 2;
				const idx = Math.round((center - first.offsetLeft - first.offsetWidth / 2) / cardWidth);
				if (idx >= 0 && idx < projects.length) currentIndex = idx;
			});
		};
		carouselRef?.addEventListener('scroll', onScroll, { passive: true });
		return () => carouselRef?.removeEventListener('scroll', onScroll);
	});

	function scrollTo(index: number, source: 'arrow' | 'dot' = 'dot') {
		centerCard(index, 'smooth');
		currentIndex = index;
		track('carousel_navigate', { source });
	}

	function next() {
		const newIndex = (currentIndex + 1) % projects.length;
		scrollTo(newIndex, 'arrow');
	}

	function prev() {
		const newIndex = (currentIndex - 1 + projects.length) % projects.length;
		scrollTo(newIndex, 'arrow');
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

	/* Mobile: keep horizontal carousel but center cards in the viewport */
	@media (max-width: 768px) {
		.carousel-track {
			padding-left: max(1rem, calc(50vw - 160px));
			padding-right: max(1rem, calc(50vw - 160px));
			gap: 1rem;
		}
	}
</style>
