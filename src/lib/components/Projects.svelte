<script lang="ts">
	import ProjectCard from './ProjectCard.svelte';
	import type { Project } from '$lib/types';
	import { track } from '$lib/analytics';

	let { projects }: { projects: Project[] } = $props();
	let accordionRef: HTMLDivElement;
	let currentIndex = $state(2);

	function selectProject(index: number, source: 'spine' | 'arrow' | 'keyboard' = 'spine') {
		if (!projects.length) return;
		const nextIndex = (index + projects.length) % projects.length;
		if (nextIndex === currentIndex) return;
		currentIndex = nextIndex;
		track('project_accordion_select', { project_id: projects[nextIndex].id, source });
	}

	function focusTrigger(index: number) {
		requestAnimationFrame(() => {
			accordionRef?.querySelectorAll<HTMLButtonElement>('.project-trigger')[index]?.focus();
		});
	}

	function move(direction: -1 | 1, source: 'arrow' | 'keyboard') {
		const nextIndex = (currentIndex + direction + projects.length) % projects.length;
		selectProject(nextIndex, source);
		if (source === 'keyboard') focusTrigger(nextIndex);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
			event.preventDefault();
			move(1, 'keyboard');
		}
		if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
			event.preventDefault();
			move(-1, 'keyboard');
		}
		if (event.key === 'Home') {
			event.preventDefault();
			selectProject(0, 'keyboard');
			focusTrigger(0);
		}
		if (event.key === 'End') {
			event.preventDefault();
			selectProject(projects.length - 1, 'keyboard');
			focusTrigger(projects.length - 1);
		}
	}
</script>

<section id="projects" class="projects-section">
	<div class="section-shell">
		<div class="section-header-sticky">
			<p class="section-label">Selected work</p>
			<div class="projects-heading">
				<h2 class="section-heading">Built from the problem outward.</h2>
				<p>Software, machine learning, research tools, and infrastructure. Select a project to open the full story.</p>
			</div>
		</div>

		<div bind:this={accordionRef} class="project-accordion" role="group" aria-label="Selected portfolio projects">
			{#each projects as project, i (project.id)}
				<ProjectCard {project} index={i} active={i === currentIndex} onSelect={selectProject} onNavigate={handleKeydown} />
			{/each}
		</div>

		<div class="accordion-controls">
			<div class="position" aria-live="polite">
				<span>{String(currentIndex + 1).padStart(2, '0')}</span>
				<i></i>
				<span>{String(projects.length).padStart(2, '0')}</span>
				<strong>{projects[currentIndex]?.title}</strong>
			</div>
			<p>Click a spine or use the arrow keys</p>
			<div class="arrow-controls">
				<button type="button" onclick={() => move(-1, 'arrow')} aria-label="Previous project">Previous</button>
				<button type="button" onclick={() => move(1, 'arrow')} aria-label="Next project">Next</button>
			</div>
		</div>
	</div>
</section>

<style>
	.projects-section {
		padding: 120px 0 145px;
		overflow: hidden;
		border-top: 1px solid var(--color-border);
		background: color-mix(in srgb, var(--color-emerald-deep) 26%, var(--color-background));
		content-visibility: auto;
		contain-intrinsic-size: 1050px;
	}

	.section-shell { width: min(1320px, calc(100% - 80px)); margin: 0 auto; }
	.projects-heading { display: grid; grid-template-columns: minmax(0, 1fr) minmax(280px, 410px); align-items: end; gap: 64px; }
	.projects-heading .section-heading { max-width: 820px; }
	.projects-heading > p { margin: 0 0 8px; color: var(--color-text-secondary); font-size: 13px; line-height: 1.65; }

	.project-accordion {
		display: flex;
		gap: 10px;
		width: 100%;
		margin-top: 46px;
		contain: layout paint;
	}

	.accordion-controls {
		min-height: 68px;
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto auto;
		align-items: center;
		gap: 32px;
		border-top: 1px solid var(--color-border-strong);
		border-bottom: 1px solid var(--color-border);
	}

	.position { min-width: 0; display: flex; align-items: center; gap: 9px; color: var(--color-text-muted); font: 500 9px var(--font-family-mono); }
	.position span:first-child { color: var(--color-brass); }
	.position i { flex: 0 0 38px; height: 1px; background: var(--color-border-strong); }
	.position strong { min-width: 0; margin-left: 11px; overflow: hidden; color: var(--color-text-secondary); font-weight: 500; text-overflow: ellipsis; text-transform: uppercase; white-space: nowrap; }
	.accordion-controls > p { margin: 0; color: var(--color-text-muted); font: 500 8px var(--font-family-mono); letter-spacing: .06em; text-transform: uppercase; }
	.arrow-controls { display: flex; }
	.arrow-controls button { min-width: 78px; height: 36px; border: 1px solid var(--color-border-strong); background: transparent; color: var(--color-text-secondary); font-size: 10px; cursor: pointer; }
	.arrow-controls button + button { border-left: 0; }
	.arrow-controls button:hover { color: var(--color-ink); background: var(--color-paper); }
	.arrow-controls button:focus-visible { outline: 2px solid var(--color-brass); outline-offset: 2px; }

	@media (max-width: 1020px) {
		.section-shell { width: min(1320px, calc(100% - 48px)); }
		.projects-heading { grid-template-columns: minmax(0, 1fr) 330px; gap: 38px; }
		.accordion-controls > p { display: none; }
		.accordion-controls { grid-template-columns: minmax(0, 1fr) auto; }
	}

	@media (max-width: 920px) {
		.projects-section { padding: 78px 0 96px; }
		.section-shell { width: calc(100% - 32px); }
		.projects-heading { display: block; }
		.projects-heading > p { margin-top: 22px; }
		.project-accordion { flex-direction: column; gap: 8px; margin-top: 34px; }
		.accordion-controls { margin-top: 10px; grid-template-columns: minmax(0, 1fr) auto; gap: 10px; }
		.position strong { display: none; }
		.arrow-controls button { min-width: 58px; padding-inline: 10px; }
	}

	@media (prefers-reduced-motion: reduce) {
		.project-accordion { scroll-behavior: auto; }
	}
</style>
