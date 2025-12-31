<script lang="ts">
	import { inview } from '$lib/actions/inview';
	import type { Skills as SkillsType } from '$lib/types';

	let { skills }: { skills: SkillsType } = $props();

	let expanded: 'languages' | 'technologies' | 'coursework' | null = $state(null);

	function toggle(category: 'languages' | 'technologies' | 'coursework') {
		expanded = expanded === category ? null : category;
	}
</script>

<section id="skills" class="py-24 overflow-hidden">
	<div class="max-w-[1200px] mx-auto px-6">
		<div class="animate-on-scroll text-center mb-16" use:inview>
			<p class="section-label">Toolbox</p>
			<h2 class="section-heading">Skills that Ship</h2>
		</div>
	</div>

	<!-- Languages -->
	<div class="mb-12">
		<div class="flex justify-center mb-6">
			<button class="category-label cursor-pointer hover:shadow-md transition-shadow" onclick={() => toggle('languages')}>
				Languages
				<svg class="w-4 h-4 ml-1 inline transition-transform {expanded === 'languages' ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
			</button>
		</div>
		{#if expanded === 'languages'}
			<div class="max-w-4xl mx-auto px-6">
				<ul class="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2">
					{#each skills.languages as lang}
						<li class="text-[var(--color-text-secondary)] flex items-center gap-2">
							<span class="text-[var(--color-accent)]">•</span>
							{lang}
						</li>
					{/each}
				</ul>
			</div>
		{:else}
			<div class="marquee-container">
				<div class="marquee-fade-left"></div>
				<div class="marquee-fade-right"></div>
				<div class="flex marquee">
					{#each [...skills.languages, ...skills.languages, ...skills.languages] as lang}
						<span class="skill-pill">{lang}</span>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<!-- Technologies -->
	<div class="mb-12">
		<div class="flex justify-center mb-6">
			<button class="category-label cursor-pointer hover:shadow-md transition-shadow" onclick={() => toggle('technologies')}>
				Technology & Platforms
				<svg class="w-4 h-4 ml-1 inline transition-transform {expanded === 'technologies' ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
			</button>
		</div>
		{#if expanded === 'technologies'}
			<div class="max-w-4xl mx-auto px-6">
				<ul class="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2">
					{#each skills.technologies as tech}
						<li class="text-[var(--color-text-secondary)] flex items-center gap-2">
							<span class="text-[var(--color-accent)]">•</span>
							{tech}
						</li>
					{/each}
				</ul>
			</div>
		{:else}
			<div class="marquee-container">
				<div class="marquee-fade-left"></div>
				<div class="marquee-fade-right"></div>
				<div class="flex marquee-reverse">
					{#each [...skills.technologies, ...skills.technologies, ...skills.technologies] as tech}
						<span class="skill-pill">{tech}</span>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<!-- Coursework -->
	<div>
		<div class="flex justify-center mb-6">
			<button class="category-label cursor-pointer hover:shadow-md transition-shadow" onclick={() => toggle('coursework')}>
				Coursework
				<svg class="w-4 h-4 ml-1 inline transition-transform {expanded === 'coursework' ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
			</button>
		</div>
		{#if expanded === 'coursework'}
			<div class="max-w-4xl mx-auto px-6">
				<ul class="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2">
					{#each skills.coursework as course}
						<li class="text-[var(--color-text-secondary)] flex items-center gap-2">
							<span class="text-[var(--color-accent)]">•</span>
							{course}
						</li>
					{/each}
				</ul>
			</div>
		{:else}
			<div class="marquee-container">
				<div class="marquee-fade-left"></div>
				<div class="marquee-fade-right"></div>
				<div class="flex marquee">
					{#each [...skills.coursework, ...skills.coursework, ...skills.coursework] as course}
						<span class="skill-pill">{course}</span>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	.marquee-container {
		position: relative;
		overflow: hidden;
	}

	.marquee-fade-left,
	.marquee-fade-right {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 300px;
		z-index: 10;
		pointer-events: none;
	}

	.marquee-fade-left {
		left: 0;
		background: linear-gradient(to right,
			rgb(253, 242, 248) 0%,
			rgba(253, 242, 248, 1) 15%,
			rgba(248, 249, 250, 0.8) 50%,
			transparent 100%
		);
	}

	.marquee-fade-right {
		right: 0;
		background: linear-gradient(to left,
			rgb(236, 253, 245) 0%,
			rgba(236, 253, 245, 1) 15%,
			rgba(248, 249, 250, 0.8) 50%,
			transparent 100%
		);
	}
</style>
