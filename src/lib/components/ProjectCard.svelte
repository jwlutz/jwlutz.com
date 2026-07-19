<script lang="ts">
	import type { Project } from '$lib/types';
	import { track } from '$lib/analytics';

	let {
		project,
		index,
		active = false,
		onSelect,
		onNavigate
	}: {
		project: Project;
		index: number;
		active?: boolean;
		onSelect: (index: number) => void;
		onNavigate: (event: KeyboardEvent) => void;
	} = $props();

	const number = $derived(String(index + 1).padStart(2, '0'));
	const monogram = $derived(project.title
		.split(' ')
		.filter((word) => !['and', '&', 'the'].includes(word.toLowerCase()))
		.slice(0, 2)
		.map((word) => word[0])
		.join(''));

	function trackClick(target: 'github' | 'live') {
		track('project_click', { project_id: project.id, target });
	}
</script>

<article
	class="project-accordion-card"
	class:project-accordion-card-active={active}
	style={`--project-gradient: ${project.gradient ?? 'linear-gradient(135deg, #143d31, #0b1611)'};`}
>
	<button
		type="button"
		class="project-trigger"
		aria-expanded={active}
		aria-controls={`project-panel-${project.id}`}
		onclick={() => onSelect(index)}
		onkeydown={onNavigate}
	>
		<span class="trigger-number">{number}</span>
		<span class="trigger-monogram" aria-hidden="true">{monogram}</span>
		<span class="trigger-title">{project.title}</span>
		<span class="trigger-state">{active ? 'Viewing' : 'Open'}</span>
	</button>

	{#if active}
		<div class="project-panel" id={`project-panel-${project.id}`}>
			<div class="project-media">
				<div class="project-color" aria-hidden="true"></div>
				{#if project.image}
					<img
						src={project.image}
						alt={project.title}
						loading="lazy"
						decoding="async"
						class:contain={project.imageFit === 'contain'}
					/>
				{:else}
					<div class="project-monogram" aria-hidden="true">{monogram}</div>
				{/if}
				<div class="media-wash" aria-hidden="true"></div>
				<div class="media-meta">
					<span>{project.featuredTag || 'Built project'}</span>
					<span>{project.tech[0]}</span>
				</div>
			</div>

			<div class="project-copy">
				<div>
					<p class="project-id">{project.id.replaceAll('-', ' ')}</p>
					<h3>{project.title}</h3>
					<p class="description">{project.description}</p>
					<div class="tech-list" aria-label="Technologies used">
						{#each project.tech.slice(0, 7) as tech}<span class="tech-tag">{tech}</span>{/each}
					</div>
				</div>

				{#if project.highlights?.length}
					<ul>
						{#each project.highlights.slice(0, 2) as highlight}<li>{highlight}</li>{/each}
					</ul>
				{/if}

				<div class="project-actions">
					{#if project.github}
						<a href={project.github} target="_blank" rel="noopener noreferrer" onclick={() => trackClick('github')}>View source</a>
					{/if}
					{#if project.live}
						<a
							href={project.live}
							target={project.live.startsWith('/') ? undefined : '_blank'}
							rel={project.live.startsWith('/') ? undefined : 'noopener noreferrer'}
							onclick={() => trackClick('live')}
						>{project.liveText || 'Open project'}</a>
					{/if}
					{#if !project.github && !project.live}<span>{project.codeStatus || 'Private work'}</span>{/if}
				</div>
			</div>
		</div>
	{/if}
</article>

<style>
	.project-accordion-card {
		position: relative;
		flex: 0 0 48px;
		min-width: 0;
		height: 620px;
		overflow: hidden;
		border: 1px solid var(--color-border-strong);
		border-radius: 2px;
		background: var(--color-background);
		contain: layout paint;
		transition: flex-basis 680ms cubic-bezier(.22,.72,.18,1), flex-grow 680ms cubic-bezier(.22,.72,.18,1), border-color 240ms ease;
	}

	.project-accordion-card-active {
		flex: 1 1 760px;
		border-color: color-mix(in srgb, var(--color-brass) 54%, var(--color-border-strong));
	}

	.project-trigger {
		position: absolute;
		inset: 0;
		z-index: 4;
		width: 100%;
		padding: 18px 0;
		border: 0;
		background: var(--project-gradient);
		color: rgba(250, 248, 240, .94);
		font-family: inherit;
		text-align: left;
		cursor: pointer;
		overflow: hidden;
		transition: height 680ms cubic-bezier(.22,.72,.18,1), background-color 240ms ease;
	}

	.project-trigger::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgba(7, 11, 9, .04), rgba(7, 11, 9, .58));
		pointer-events: none;
	}

	.project-accordion-card-active .project-trigger {
		height: 62px;
		padding: 0 22px;
		border-bottom: 1px solid var(--color-border);
		background: color-mix(in srgb, var(--color-emerald-deep) 48%, var(--color-background));
	}

	.project-accordion-card-active .project-trigger::after { display: none; }
	.project-trigger:focus-visible { outline: 2px solid var(--color-brass); outline-offset: -3px; }

	.trigger-number,
	.trigger-state {
		position: absolute;
		z-index: 1;
		left: 50%;
		color: rgba(250, 248, 240, .78);
		font: 500 8px var(--font-family-mono);
		letter-spacing: .09em;
		text-transform: uppercase;
		transform: translateX(-50%);
	}

	.trigger-number { top: 18px; }
	.trigger-state { bottom: 18px; }

	.trigger-monogram {
		position: absolute;
		z-index: 1;
		top: 74px;
		left: 50%;
		font: 400 20px var(--font-family-display);
		transform: translateX(-50%);
	}

	.trigger-title {
		position: absolute;
		z-index: 1;
		left: 50%;
		top: 50%;
		max-height: 370px;
		color: rgba(250, 248, 240, .94);
		font: 500 9px/1.15 var(--font-family-mono);
		letter-spacing: .075em;
		text-transform: uppercase;
		writing-mode: vertical-rl;
		transform: translate(-50%, -50%) rotate(180deg);
	}

	.project-accordion-card-active .trigger-number,
	.project-accordion-card-active .trigger-state,
	.project-accordion-card-active .trigger-monogram,
	.project-accordion-card-active .trigger-title {
		top: 50%;
		bottom: auto;
		left: auto;
		max-height: none;
		writing-mode: initial;
		transform: translateY(-50%);
	}

	.project-accordion-card-active .trigger-number { left: 22px; color: var(--color-brass); }
	.project-accordion-card-active .trigger-monogram { left: 70px; color: var(--color-text-secondary); font-size: 21px; }
	.project-accordion-card-active .trigger-title { left: 112px; right: 88px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--color-text-primary); }
	.project-accordion-card-active .trigger-state { right: 22px; color: var(--color-text-muted); }

	.project-panel {
		position: absolute;
		inset: 62px 0 0;
		display: grid;
		grid-template-columns: minmax(0, .92fr) minmax(0, 1.08fr);
		animation: reveal-panel 620ms 90ms both cubic-bezier(.22,.72,.18,1);
	}

	.project-media {
		position: relative;
		min-width: 0;
		overflow: hidden;
		background: var(--color-emerald-deep);
	}

	.project-color { position: absolute; inset: 0; background: var(--project-gradient); }
	.project-media img { position: relative; display: block; width: 100%; height: 100%; object-fit: cover; filter: saturate(.74) contrast(1.06) brightness(.82); transition: transform 700ms cubic-bezier(.2,.75,.2,1); }
	.project-media img.contain { object-fit: contain; padding: 8%; }
	.project-accordion-card-active:hover .project-media img { transform: scale(1.025); }
	.project-monogram { position: absolute; inset: 0; display: grid; place-items: center; color: rgba(250,248,240,.85); font: 400 108px var(--font-family-display); }
	.media-wash { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(8,11,9,.04) 38%, rgba(8,11,9,.74)); }
	.media-meta { position: absolute; z-index: 1; left: 18px; right: 18px; bottom: 17px; display: flex; justify-content: space-between; gap: 14px; color: rgba(250,248,240,.84); font: 500 8px var(--font-family-mono); letter-spacing: .08em; text-transform: uppercase; }

	.project-copy { min-width: 0; padding: 30px 34px 28px; display: flex; flex-direction: column; background: color-mix(in srgb, var(--color-emerald-deep) 20%, var(--color-background)); }
	.project-id { margin: 0; color: var(--color-brass); font: 500 9px var(--font-family-mono); letter-spacing: .1em; text-transform: uppercase; }
	h3 { max-width: 580px; margin: 22px 0 14px; color: var(--color-text-primary); font: 400 45px/.94 var(--font-family-display); letter-spacing: -.035em; text-wrap: balance; }
	.description { max-width: 600px; margin: 0; color: var(--color-text-secondary); font-size: 12px; line-height: 1.62; }
	.tech-list { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 18px; }
	ul { margin: 20px 0 0; padding: 16px 0 0; display: grid; gap: 8px; border-top: 1px solid var(--color-border); list-style: none; }
	li { position: relative; padding-left: 14px; color: var(--color-text-muted); font-size: 10px; line-height: 1.45; }
	li::before { content: ''; position: absolute; left: 0; top: .68em; width: 6px; height: 1px; background: var(--color-brass); }
	.project-actions { margin-top: auto; padding-top: 18px; display: flex; gap: 18px; align-items: center; border-top: 1px solid var(--color-border); }
	.project-actions a,
	.project-actions span { padding-bottom: 4px; border-bottom: 1px solid var(--color-border-strong); color: var(--color-text-secondary); font-size: 11px; text-decoration: none; transition: color 180ms ease, border-color 180ms ease; }
	.project-actions a:hover { color: var(--color-text-primary); border-color: var(--color-brass); }
	.project-actions span { color: var(--color-text-muted); }

	@keyframes reveal-panel {
		from { opacity: 0; transform: translateY(10px); clip-path: inset(0 0 8% 0); }
		to { opacity: 1; transform: translateY(0); clip-path: inset(0); }
	}

	@media (max-width: 1020px) {
		.project-accordion-card { flex-basis: 44px; }
		.project-accordion-card-active { flex-basis: 620px; }
		.project-panel { grid-template-columns: minmax(0, .82fr) minmax(0, 1.18fr); }
		h3 { font-size: 38px; }
		.project-copy { padding-inline: 26px; }
		ul { display: none; }
	}

	@media (max-width: 920px) {
		.project-accordion-card,
		.project-accordion-card-active {
			flex: none;
			width: 100%;
			height: 68px;
			transition: none;
		}

		.project-accordion-card-active { height: 680px; }
		.project-trigger { padding: 0 16px; }
		.project-trigger,
		.project-accordion-card-active .project-trigger { height: 68px; border-bottom: 0; }
		.project-accordion-card-active .project-trigger { border-bottom: 1px solid var(--color-border); }
		.trigger-number,
		.trigger-state,
		.trigger-monogram,
		.trigger-title,
		.project-accordion-card-active .trigger-number,
		.project-accordion-card-active .trigger-state,
		.project-accordion-card-active .trigger-monogram,
		.project-accordion-card-active .trigger-title {
			top: 50%;
			bottom: auto;
			left: auto;
			max-height: none;
			writing-mode: initial;
			transform: translateY(-50%);
		}

		.trigger-number,
		.project-accordion-card-active .trigger-number { left: 16px; color: var(--color-brass); }
		.trigger-monogram,
		.project-accordion-card-active .trigger-monogram { left: 58px; color: rgba(250,248,240,.86); font-size: 20px; }
		.trigger-title,
		.project-accordion-card-active .trigger-title { left: 96px; right: 60px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: rgba(250,248,240,.94); }
		.trigger-state,
		.project-accordion-card-active .trigger-state { right: 16px; color: rgba(250,248,240,.72); }
		.project-accordion-card-active .trigger-title { color: var(--color-text-primary); }
		.project-accordion-card-active .trigger-monogram { color: var(--color-text-secondary); }
		.project-accordion-card-active .trigger-state { color: var(--color-text-muted); }

		.project-panel { inset: 68px 0 0; display: flex; flex-direction: column; animation-duration: 420ms; }
		.project-media { flex: 0 0 245px; }
		.project-copy { flex: 1; padding: 22px 20px 20px; }
		h3 { margin-top: 15px; font-size: 33px; }
		.description { font-size: 11px; }
		.tech-list { margin-top: 14px; }
		.project-actions { padding-top: 14px; }
	}

	@media (prefers-reduced-motion: reduce) {
		.project-accordion-card,
		.project-trigger,
		.project-media img { transition: none; }
		.project-panel { animation: none; }
	}
</style>
