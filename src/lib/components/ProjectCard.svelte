<script lang="ts">
	import type { Project } from '$lib/types';

	let { project, featured = false }: { project: Project; featured?: boolean } = $props();

	// Tech icons with colors and SVG paths
	const techIcons: Record<string, { color: string; icon: string }> = {
		Python: {
			color: '#3776AB',
			icon: '<path d="M12 0C5.372 0 5.998 2.857 5.998 2.857l.007 2.96h6.115v.889H3.788S0 6.238 0 12.113c0 5.875 3.304 5.666 3.304 5.666h1.972v-2.727s-.106-3.304 3.25-3.304h5.6s3.147.051 3.147-3.042V3.148S17.78 0 12 0zm-3.11 1.817a1.015 1.015 0 110 2.03 1.015 1.015 0 010-2.03z"/><path d="M12 24c6.628 0 6.002-2.857 6.002-2.857l-.007-2.96h-6.115v-.889h8.332S24 17.762 24 11.887c0-5.875-3.304-5.666-3.304-5.666h-1.972v2.727s.106 3.304-3.25 3.304h-5.6s-3.147-.051-3.147 3.042v5.558S6.22 24 12 24zm3.11-1.817a1.015 1.015 0 110-2.03 1.015 1.015 0 010 2.03z"/>'
		},
		NumPy: {
			color: '#013243',
			icon: '<path d="M10.315 4.876L6.3 2.823l-4.2 2.101 4.01 2.01zm2.038.992l4.143 2.078-4.01 2.013-4.142-2.078zm7.766 1.027l-3.985 1.996v8.193l3.985-2.01zm-6.394 4.013v8.193l-3.985-2.01V8.898zm-8.03-2.018l4.01 2.01v8.193l-4.01-2.01z"/>'
		},
		R: {
			color: '#276DC3',
			icon: '<path d="M12 2.4c-5.3 0-9.6 3.6-9.6 8s4.3 8 9.6 8c1.8 0 3.5-.4 5-1.2l2.5 4.4h3.6l-3.3-5.7c1.7-1.5 2.7-3.4 2.7-5.5 0-4.4-4.3-8-9.5-8zm0 2.4c4 0 7.2 2.5 7.2 5.6 0 3.1-3.2 5.6-7.2 5.6s-7.2-2.5-7.2-5.6c0-3.1 3.2-5.6 7.2-5.6zm-2.4 1.8v7.6h2.2v-2.4h1.5c1.8 0 3.2-1.1 3.2-2.6s-1.4-2.6-3.2-2.6h-3.7zm2.2 1.8h1.4c.7 0 1.2.4 1.2.9s-.5.9-1.2.9h-1.4v-1.8z"/>'
		},
		Streamlit: {
			color: '#FF4B4B',
			icon: '<path d="M12 2L2 19.5h20L12 2zm0 4l6.5 11.5h-13L12 6z"/>'
		},
		SvelteKit: {
			color: '#FF3E00',
			icon: '<path d="M20.485 2.515a7.5 7.5 0 00-10.606 0L7.05 5.343a7.5 7.5 0 00-.707 9.9l.707.707 2.829-2.829-.707-.707a4.5 4.5 0 010-6.364l2.828-2.828a4.5 4.5 0 016.364 6.364l-1.414 1.414 2.121 2.121 1.414-1.414a7.5 7.5 0 000-10.606zm-2.828 8.485l-2.829 2.829.707.707a4.5 4.5 0 010 6.364l-2.828 2.828a4.5 4.5 0 01-6.364-6.364l1.414-1.414-2.121-2.121-1.414 1.414a7.5 7.5 0 0010.606 10.606l2.829-2.828a7.5 7.5 0 00.707-9.9z"/>'
		},
		TypeScript: {
			color: '#3178C6',
			icon: '<path d="M0 12v12h24V0H0v12zm19.341-.956c.61.152 1.074.423 1.501.865.221.236.549.666.575.77.008.03-1.036.73-1.668 1.123-.023.015-.115-.084-.217-.236-.31-.45-.633-.644-1.128-.678-.728-.05-1.196.331-1.192.967a.88.88 0 00.102.45c.16.331.458.53 1.39.933 1.719.74 2.454 1.227 2.911 1.92.51.773.625 2.008.278 2.926-.38 1.006-1.324 1.685-2.655 1.912-.409.073-1.382.062-1.824-.018-.964-.172-1.878-.648-2.442-1.273-.221-.243-.652-.88-.625-.925.011-.016.11-.077.22-.141.108-.061.511-.294.892-.515l.69-.4.145.214c.202.308.643.731.91.872.766.404 1.817.347 2.335-.118a.883.883 0 00.313-.72c0-.278-.035-.4-.18-.61-.186-.266-.567-.49-1.649-.96-1.238-.533-1.771-.864-2.259-1.39a3.165 3.165 0 01-.659-1.2c-.091-.339-.114-1.189-.042-1.531.255-1.197 1.158-2.03 2.461-2.278.423-.08 1.406-.05 1.821.053zm-5.634 1.002l.008.983H10.59v8.876H8.38v-8.876H5.258v-.964c0-.534.011-.98.026-.99.012-.016 1.913-.024 4.217-.02l4.195.012z"/>'
		},
		'Canvas API': {
			color: '#E44D26',
			icon: '<path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h4v4H7V7zm0 6h10v4H7v-4zm6-6h4v4h-4V7z"/>'
		},
		FastAPI: {
			color: '#009688',
			icon: '<path d="M12 0L1.5 6v12L12 24l10.5-6V6L12 0zm0 2.25l8.25 4.714v9.429L12 21.107l-8.25-4.714V6.964L12 2.25zm0 3.375L6.75 9v6l5.25 3 5.25-3V9L12 5.625z"/>'
		},
		PostgreSQL: {
			color: '#4169E1',
			icon: '<path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm-2 4v8h1.5v-3h1c1.933 0 3.5-1.567 3.5-3.5S14.433 6 12.5 6H10zm1.5 1.5h1c1.105 0 2 .895 2 2s-.895 2-2 2h-1v-4z"/>'
		},
		'Google OR-Tools': {
			color: '#4285F4',
			icon: '<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>'
		},
		Go: {
			color: '#00ADD8',
			icon: '<path d="M1.811 10.231c-.047 0-.058-.023-.035-.059l.246-.315c.023-.035.081-.058.128-.058h4.172c.046 0 .058.035.035.07l-.199.303c-.023.036-.082.07-.117.07zM.047 11.306c-.047 0-.059-.023-.035-.058l.245-.316c.023-.035.082-.058.129-.058h5.328c.047 0 .07.035.058.07l-.093.28c-.012.047-.058.07-.105.07zm2.828 1.075c-.047 0-.059-.035-.035-.07l.163-.292c.023-.035.07-.07.117-.07h2.337c.047 0 .07.035.07.082l-.023.28c0 .047-.047.082-.082.082zM18.615 10.09c-.727.187-1.222.327-1.942.515-.187.047-.199.059-.363-.128-.187-.21-.328-.35-.597-.468-.807-.363-1.59-.257-2.327.199-.876.538-1.327 1.343-1.315 2.362.012 1.007.7 1.839 1.695 1.968.878.117 1.614-.14 2.222-.77.128-.14.245-.292.386-.457H14.18c-.257 0-.315-.152-.233-.362.152-.387.433-1.03.597-1.354.035-.082.117-.21.292-.21h4.253c-.023.316-.023.631-.07.947a5.124 5.124 0 01-1.018 2.386c-.853 1.112-1.965 1.8-3.36 2.012-1.16.176-2.257-.012-3.243-.69-1.007-.7-1.591-1.649-1.743-2.828-.187-1.449.28-2.734 1.183-3.852.936-1.16 2.152-1.824 3.607-2 1.29-.152 2.503.082 3.583.83.515.363.932.83 1.265 1.378.082.117.058.175-.07.222z"/>'
		},
		JavaScript: {
			color: '#F7DF1E',
			icon: '<path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>'
		},
		'Chrome Extension MV3': {
			color: '#4285F4',
			icon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>'
		},
		'Claude API': {
			color: '#D97757',
			icon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
		},
		pandas: {
			color: '#150458',
			icon: '<rect x="5" y="2" width="4" height="8" rx="1"/><rect x="5" y="14" width="4" height="8" rx="1"/><rect x="15" y="2" width="4" height="8" rx="1"/><rect x="15" y="14" width="4" height="8" rx="1"/><rect x="10" y="6" width="4" height="12" rx="1"/>'
		},
		'Claude Code': {
			color: '#D97757',
			icon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
		},
		'CLI Plugin': {
			color: '#4EAA25',
			icon: '<path d="M2 4h20v16H2V4zm2 2v12h16V6H4zm2 2l4 4-4 4v-2l2-2-2-2V8zm6 6h6v2h-6v-2z"/>'
		},
		Markdown: {
			color: '#083FA1',
			icon: '<path d="M2 4h20v16H2V4zm2 2v12h16V6H4zm2 2h2l2 3 2-3h2v8h-2v-4l-2 3-2-3v4H6V8zm10 0h2l2 4 2-4h2v8h-2v-5l-2 3-2-3v5h-2V8z"/>'
		}
	};

	function getTechIcon(tech: string): { color: string; icon: string } | null {
		return techIcons[tech] || null;
	}
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
