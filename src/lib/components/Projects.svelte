<script lang="ts">
	import { onMount } from 'svelte';
	import ProjectCard from './ProjectCard.svelte';
	import type { Project } from '$lib/types';
	import { track } from '$lib/analytics';

	let { projects }: { projects: Project[] } = $props();
	let carouselRef: HTMLDivElement;
	const initialIndex = 2;
	let currentIndex = $state(initialIndex);

	function centerCard(index: number, behavior: ScrollBehavior = 'auto') {
		if (!carouselRef) return;
		const child = carouselRef.children[index] as HTMLElement | undefined;
		if (!child) return;
		carouselRef.scrollTo({ left: child.offsetLeft + child.offsetWidth / 2 - carouselRef.clientWidth / 2, behavior });
	}

	onMount(() => {
		centerCard(initialIndex);
		requestAnimationFrame(() => centerCard(initialIndex));
		let raf = 0;
		const onScroll = () => {
			if (raf) return;
			raf = requestAnimationFrame(() => {
				raf = 0;
				const children = Array.from(carouselRef.children) as HTMLElement[];
				const center = carouselRef.scrollLeft + carouselRef.clientWidth / 2;
				let nearest = currentIndex;
				let distance = Number.POSITIVE_INFINITY;
				children.forEach((child, index) => {
					const nextDistance = Math.abs(child.offsetLeft + child.offsetWidth / 2 - center);
					if (nextDistance < distance) { distance = nextDistance; nearest = index; }
				});
				if (nearest !== currentIndex) currentIndex = nearest;
			});
		};
		carouselRef.addEventListener('scroll', onScroll, { passive: true });
		return () => carouselRef?.removeEventListener('scroll', onScroll);
	});

	function scrollTo(index: number, source: 'arrow' | 'index' = 'index') {
		centerCard(index, 'smooth');
		currentIndex = index;
		track('carousel_navigate', { source });
	}

	function next() { scrollTo((currentIndex + 1) % projects.length, 'arrow'); }
	function prev() { scrollTo((currentIndex - 1 + projects.length) % projects.length, 'arrow'); }
</script>

<section id="projects" class="projects-section">
	<div class="section-shell">
		<div class="section-header-sticky">
			<p class="section-label">03 / Selected work</p>
			<div class="projects-heading"><h2 class="section-heading">Projects</h2><p>Software, machine learning, research tools, and systems built from the problem outward.</p></div>
		</div>
	</div>

	<div class="carousel-stage">
		<div bind:this={carouselRef} class="carousel-track">
			{#each projects as project, i}
				<div class="project-slot"><ProjectCard {project} featured={i === currentIndex} /></div>
			{/each}
		</div>

		<div class="carousel-controls section-shell">
			<div class="position"><span>{String(currentIndex + 1).padStart(2, '0')}</span><i></i><span>{String(projects.length).padStart(2, '0')}</span></div>
			<div class="project-index" aria-label="Choose a project">
				{#each projects as project, i}
					<button class:active={i === currentIndex} onclick={() => scrollTo(i)} aria-label="Show {project.title}">{String(i + 1).padStart(2, '0')}</button>
				{/each}
			</div>
			<div class="arrow-controls">
				<button onclick={prev} aria-label="Previous project">Prev</button>
				<button onclick={next} aria-label="Next project">Next</button>
			</div>
		</div>
	</div>
</section>

<style>
	.projects-section { padding: 120px 0 145px; overflow: hidden; border-top: 1px solid var(--color-border); background: color-mix(in srgb, var(--color-emerald-deep) 26%, var(--color-background)); content-visibility: auto; contain-intrinsic-size: 1050px; }
	.section-shell { width: min(1320px, calc(100% - 80px)); margin: 0 auto; }
	.projects-heading { display: flex; align-items: end; justify-content: space-between; gap: 40px; }
	.projects-heading > p { max-width: 410px; margin: 0 0 8px; color: var(--color-text-secondary); font-size: 13px; line-height: 1.65; }
	.carousel-stage { margin-top: 46px; }
	.carousel-track { display: flex; gap: 24px; overflow-x: auto; overflow-y: visible; scroll-snap-type: x mandatory; scrollbar-width: none; padding: 14px max(40px, calc(50vw - 440px)) 24px; }
	.carousel-track::-webkit-scrollbar { display: none; }
	.project-slot { flex: 0 0 auto; scroll-snap-align: center; }
	.carousel-controls { min-height: 68px; display: grid; grid-template-columns: 160px 1fr 160px; align-items: center; border-top: 1px solid var(--color-border-strong); border-bottom: 1px solid var(--color-border); }
	.position { display: flex; align-items: center; gap: 9px; color: var(--color-text-muted); font: 500 9px var(--font-family-mono); }
	.position span:first-child { color: var(--color-brass); }
	.position i { width: 38px; height: 1px; background: var(--color-border-strong); }
	.project-index { display: flex; align-items: stretch; justify-content: center; height: 100%; }
	.project-index button { width: 42px; border: 0; border-left: 1px solid var(--color-border); background: transparent; color: var(--color-text-muted); font: 500 8px var(--font-family-mono); cursor: pointer; }
	.project-index button:last-child { border-right: 1px solid var(--color-border); }
	.project-index button.active { color: var(--color-ink); background: var(--color-brass); }
	.arrow-controls { justify-self: end; display: flex; }
	.arrow-controls button { min-width: 72px; height: 36px; border: 1px solid var(--color-border-strong); background: transparent; color: var(--color-text-secondary); font-size: 10px; cursor: pointer; }
	.arrow-controls button + button { border-left: 0; }
	.arrow-controls button:hover { color: var(--color-ink); background: var(--color-paper); }

	@media (max-width: 820px) {
		.projects-section { padding: 78px 0 96px; }
		.section-shell { width: calc(100% - 32px); }
		.projects-heading { display: block; }
		.projects-heading > p { margin-top: 22px; }
		.carousel-track { gap: 14px; padding-left: calc(50vw - 162px); padding-right: calc(50vw - 162px); }
		.carousel-controls { grid-template-columns: 1fr auto; }
		.project-index { display: none; }
		.arrow-controls { grid-column: 2; }
	}
</style>
