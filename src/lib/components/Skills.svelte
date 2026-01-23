<script lang="ts">
	import type { Skills as SkillsType } from '$lib/types';

	let { skills }: { skills: SkillsType } = $props();
</script>

<!-- Skills marquees - footer section -->
<section id="skills-marquee" class="py-16 overflow-hidden bg-[var(--color-surface)]">
	<!-- Languages -->
	<div class="mb-8">
		<div class="flex justify-center mb-4">
			<span class="category-label">Languages</span>
		</div>
		<div class="marquee-container">
			<div class="marquee-fade-left"></div>
			<div class="marquee-fade-right"></div>
			<div class="flex marquee">
				{#each [...skills.languages, ...skills.languages, ...skills.languages] as lang}
					<span class="skill-pill">{lang}</span>
				{/each}
			</div>
		</div>
	</div>

	<!-- Technologies -->
	<div class="mb-8">
		<div class="flex justify-center mb-4">
			<span class="category-label">Technology & Platforms</span>
		</div>
		<div class="marquee-container">
			<div class="marquee-fade-left"></div>
			<div class="marquee-fade-right"></div>
			<div class="flex marquee-reverse">
				{#each [...skills.technologies, ...skills.technologies, ...skills.technologies] as tech}
					<span class="skill-pill">{tech}</span>
				{/each}
			</div>
		</div>
	</div>

	<!-- Coursework -->
	<div>
		<div class="flex justify-center mb-4">
			<span class="category-label">Coursework</span>
		</div>
		<div class="marquee-container">
			<div class="marquee-fade-left"></div>
			<div class="marquee-fade-right"></div>
			<div class="flex marquee">
				{#each [...skills.coursework, ...skills.coursework, ...skills.coursework] as course}
					<span class="skill-pill">{course}</span>
				{/each}
			</div>
		</div>
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
		width: 200px;
		z-index: 10;
		pointer-events: none;
	}

	.marquee-fade-left {
		left: 0;
		background: linear-gradient(
			to right,
			var(--color-surface) 0%,
			var(--color-surface) 20%,
			transparent 100%
		);
	}

	.marquee-fade-right {
		right: 0;
		background: linear-gradient(
			to left,
			var(--color-surface) 0%,
			var(--color-surface) 20%,
			transparent 100%
		);
	}
</style>
