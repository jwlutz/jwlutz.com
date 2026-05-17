<script lang="ts">
	import type { Project } from '$lib/types';
	import { getTechIcon } from '$lib/data/tech-icons';
	import { track } from '$lib/analytics';

	let { project, featured = false }: { project: Project; featured?: boolean } = $props();

	function trackClick(target: 'github' | 'live') {
		track('project_click', { project_id: project.id, target });
	}
</script>

<article class="project-card {featured ? 'project-card-featured' : ''}">
	<!-- Project Image / Colored Top -->
	<div
		class="card-top relative h-48 overflow-hidden"
		style={project.gradient ? `background: ${project.gradient}` : undefined}
	>
		{#if project.image}
			<img
				src={project.image}
				alt={project.title}
				loading="lazy"
				decoding="async"
				class="w-full h-full {project.imageFit === 'contain' ? 'object-contain' : 'object-cover'}"
			/>
		{/if}

		<!-- Featured Badge -->
		{#if project.featured || project.featuredTag}
			<div class="absolute top-4 right-4">
				<span class="featured-badge">
					{project.featuredTag || 'Featured'}
				</span>
			</div>
		{/if}
	</div>

	<!-- Content -->
	<div class="p-6 flex flex-col flex-grow">
		<h3 class="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
			{project.title}
		</h3>

		<p class="text-[var(--color-text-secondary)] text-sm mb-4 leading-relaxed">
			{project.description}
		</p>

		<!-- Tech Tags -->
		<div class="flex flex-wrap gap-2 mb-4">
			{#each project.tech as tech}
				{@const iconData = getTechIcon(tech)}
				<span class="tech-tag" style={iconData ? `--tag-color: ${iconData.color}` : ''}>
					{#if iconData}
						<svg
							viewBox="0 0 24 24"
							class="tech-icon"
							style="color: {iconData.color}"
						>
							{@html iconData.icon}
						</svg>
					{/if}
					{tech}
				</span>
			{/each}
		</div>

		<!-- Highlights -->
		{#if project.highlights && project.highlights.length > 0}
			<ul class="space-y-1 mb-4 flex-grow">
				{#each project.highlights as highlight}
					<li class="text-sm text-[var(--color-text-secondary)] flex items-start gap-2">
						<span class="text-[var(--color-accent)] mt-0.5">•</span>
						{highlight}
					</li>
				{/each}
			</ul>
		{/if}

		<!-- Action Buttons -->
		<div class="flex gap-3 pt-2 mt-auto">
			{#if project.github}
				<a
					href={project.github}
					target="_blank"
					rel="noopener noreferrer"
					class="btn-secondary"
					onclick={() => trackClick('github')}
				>
					GitHub Repo
				</a>
			{/if}
			{#if project.live}
				<a
					href={project.live}
					target={project.live.startsWith('/') ? undefined : '_blank'}
					rel={project.live.startsWith('/') ? undefined : 'noopener noreferrer'}
					class="btn-secondary"
					onclick={() => trackClick('live')}
				>
					{project.liveText || (project.live.startsWith('/') ? 'Try Demo' : 'Live Demo')}
				</a>
			{/if}
			{#if !project.github && !project.live}
				<span class="btn-secondary opacity-50 cursor-default">
					{project.codeStatus || 'Private'}
				</span>
			{/if}
		</div>
	</div>
</article>

<style>
	/* Default top background when neither image nor custom gradient is provided. */
	.card-top {
		background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
	}

	.tech-icon {
		width: 14px;
		height: 14px;
		fill: currentColor;
		flex-shrink: 0;
	}

	.tech-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.75rem;
		padding: 0.25rem 0.625rem;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 9999px;
		color: var(--color-text-secondary);
		transition: all 0.2s ease;
	}

	.tech-tag:hover {
		border-color: var(--tag-color, var(--color-accent));
		color: var(--tag-color, var(--color-accent));
	}

	.featured-badge {
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--color-text-primary);
		background: var(--color-surface);
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		border: 1px solid var(--color-border);
	}
</style>
