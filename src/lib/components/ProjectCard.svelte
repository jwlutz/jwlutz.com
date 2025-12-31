<script lang="ts">
	import type { Project } from '$lib/types';

	let { project, featured = false }: { project: Project; featured?: boolean } = $props();
</script>

<article class="project-card {featured ? 'project-card-featured' : ''}">
	<!-- Project Image -->
	<div class="relative h-48 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] overflow-hidden">
		{#if project.image}
			<img
				src={project.image}
				alt={project.title}
				class="w-full h-full object-cover"
			/>
		{:else}
			<!-- Placeholder with code-like pattern -->
			<div class="absolute inset-0 flex items-center justify-center opacity-30">
				<div class="font-mono text-xs text-white/50 p-4 leading-relaxed">
					<div class="text-green-400">// {project.title}</div>
					<div class="text-blue-400">const</div>
					<div class="text-yellow-400">  data = await</div>
					<div class="text-purple-400">  fetch(api)</div>
				</div>
			</div>
			<div class="absolute bottom-4 right-4 font-mono text-4xl font-bold text-white/10">
				{project.title.split(' ').map(w => w[0]).join('').slice(0, 3)}
			</div>
		{/if}

		<!-- Featured Badge -->
		{#if project.featured}
			<div class="absolute top-4 right-4">
				<span class="text-xs font-medium text-[var(--color-text-secondary)] bg-white/90 px-2 py-1 rounded">
					Featured
				</span>
			</div>
		{/if}
	</div>

	<!-- Content -->
	<div class="p-6">
		<h3 class="font-semibold text-lg text-[var(--color-text-primary)] mb-2">
			{project.title}
		</h3>

		<p class="text-[var(--color-text-secondary)] text-sm mb-4 leading-relaxed">
			{project.description}
		</p>

		<!-- Tech Tags -->
		<div class="flex flex-wrap gap-2 mb-4">
			{#each project.tech as tech}
				<span class="tech-tag">{tech}</span>
			{/each}
		</div>

		<!-- Highlights -->
		{#if project.highlights && project.highlights.length > 0}
			<ul class="space-y-1 mb-4">
				{#each project.highlights as highlight}
					<li class="text-sm text-[var(--color-text-secondary)] flex items-start gap-2">
						<span class="text-[var(--color-accent)] mt-0.5">•</span>
						{highlight}
					</li>
				{/each}
			</ul>
		{/if}

		<!-- Action Buttons -->
		<div class="flex gap-3 pt-2">
			{#if project.github}
				<a
					href={project.github}
					target="_blank"
					rel="noopener noreferrer"
					class="btn-secondary"
				>
					Code
				</a>
			{/if}
			{#if project.live}
				<a
					href={project.live}
					target="_blank"
					rel="noopener noreferrer"
					class="btn-secondary"
				>
					Live Demo
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
