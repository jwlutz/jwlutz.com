<script lang="ts">
	import type { Project } from '$lib/types';
	import { track } from '$lib/analytics';

	let { project, featured = false }: { project: Project; featured?: boolean } = $props();
	function trackClick(target: 'github' | 'live') { track('project_click', { project_id: project.id, target }); }
</script>

<article class="project-card" class:project-card-featured={featured}>
	<div class="project-media" style={project.gradient ? `background: ${project.gradient}` : undefined}>
		{#if project.image}
			<img src={project.image} alt={project.title} loading="lazy" decoding="async" class:contain={project.imageFit === 'contain'} />
		{:else}
			<div class="project-monogram" aria-hidden="true">{project.title.split(' ').slice(0, 2).map((word) => word[0]).join('')}</div>
		{/if}
		<div class="media-overlay" aria-hidden="true"></div>
		<div class="media-meta"><span>{project.featuredTag || 'Built project'}</span><span>{project.tech[0]}</span></div>
	</div>

	<div class="project-copy">
		<p class="project-id">{project.id.replaceAll('-', ' ')}</p>
		<h3>{project.title}</h3>
		<p class="description">{project.description}</p>
		<div class="tech-list">
			{#each project.tech.slice(0, 6) as tech}<span class="tech-tag">{tech}</span>{/each}
		</div>
		{#if project.highlights?.length}
			<ul>
				{#each project.highlights.slice(0, 2) as highlight}<li>{highlight}</li>{/each}
			</ul>
		{/if}
		<div class="project-actions">
			{#if project.github}<a href={project.github} target="_blank" rel="noopener noreferrer" onclick={() => trackClick('github')}>View source</a>{/if}
			{#if project.live}<a href={project.live} target={project.live.startsWith('/') ? undefined : '_blank'} rel={project.live.startsWith('/') ? undefined : 'noopener noreferrer'} onclick={() => trackClick('live')}>{project.liveText || 'Open project'}</a>{/if}
			{#if !project.github && !project.live}<span>{project.codeStatus || 'Private work'}</span>{/if}
		</div>
	</div>
</article>

<style>
	.project-card { display: grid; grid-template-columns: minmax(0, .92fr) minmax(0, 1.08fr); width: min(880px, calc(100vw - 80px)); min-width: min(880px, calc(100vw - 80px)); height: 570px; }
	.project-media { position: relative; min-width: 0; overflow: hidden; background: var(--color-emerald-deep); }
	.project-media img { display: block; width: 100%; height: 100%; object-fit: cover; filter: saturate(.76) contrast(1.06) brightness(.8); transition: transform 700ms cubic-bezier(.2,.75,.2,1); }
	.project-media img.contain { object-fit: contain; padding: 8%; }
	.project-card:hover .project-media img { transform: scale(1.025); }
	.project-monogram { position: absolute; inset: 0; display: grid; place-items: center; color: rgba(240,239,233,.82); font: 400 116px var(--font-family-display); }
	.media-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 48%, rgba(8,11,9,.68)); }
	.media-meta { position: absolute; left: 18px; right: 18px; bottom: 17px; display: flex; justify-content: space-between; gap: 14px; color: rgba(240,239,233,.82); font: 500 8px var(--font-family-mono); letter-spacing: .08em; text-transform: uppercase; }
	.project-copy { min-width: 0; padding: 34px 36px 30px; display: flex; flex-direction: column; }
	.project-id { margin: 0; color: var(--color-brass); font: 500 9px var(--font-family-mono); letter-spacing: .1em; text-transform: uppercase; }
	h3 { margin: 24px 0 15px; color: var(--color-text-primary); font: 400 48px/.92 var(--font-family-display); letter-spacing: -.035em; }
	.description { margin: 0; color: var(--color-text-secondary); font-size: 13px; line-height: 1.65; }
	.tech-list { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 20px; }
	ul { margin: 22px 0 0; padding: 18px 0 0; display: grid; gap: 9px; border-top: 1px solid var(--color-border); list-style: none; }
	li { position: relative; padding-left: 14px; color: var(--color-text-muted); font-size: 11px; line-height: 1.5; }
	li::before { content: ''; position: absolute; left: 0; top: .7em; width: 6px; height: 1px; background: var(--color-brass); }
	.project-actions { margin-top: auto; padding-top: 20px; display: flex; gap: 18px; align-items: center; border-top: 1px solid var(--color-border); }
	.project-actions a, .project-actions span { padding-bottom: 4px; border-bottom: 1px solid var(--color-border-strong); color: var(--color-text-secondary); font-size: 11px; text-decoration: none; transition: color 180ms ease, border-color 180ms ease; }
	.project-actions a:hover { color: var(--color-text-primary); border-color: var(--color-brass); }
	.project-actions span { color: var(--color-text-muted); }

	@media (max-width: 820px) {
		.project-card { display: flex; flex-direction: column; width: 324px; min-width: 324px; height: 610px; }
		.project-media { flex: 0 0 235px; }
		.project-copy { flex: 1; padding: 24px 22px 22px; }
		h3 { margin-top: 16px; font-size: 36px; }
		.description { font-size: 12px; }
		ul { display: none; }
	}
</style>
