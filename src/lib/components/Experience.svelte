<script lang="ts">
	import { inview } from '$lib/actions/inview';
	import type { ExperienceItem } from '$lib/types';

	let { experiences }: { experiences: ExperienceItem[] } = $props();
</script>

<section id="experience" class="experience-section">
	<div class="section-shell">
		<div class="experience-header">
			<h2 class="section-heading">Experience</h2>
		</div>

		<div class="experience-list">
			{#each experiences as exp, i}
				<div class="animate-on-scroll" use:inview style="transition-delay: {i * 90}ms">
					<article class="experience-card">
						<div class="experience-heading">
							<p>{exp.role}</p>
							{#if exp.id === 'lutz-consulting'}
								<a href="/consulting"><h3>{exp.company}</h3></a>
							{:else}
								<h3>{exp.company}</h3>
							{/if}
							<div class="experience-meta"><span>{exp.period}</span><span>{exp.location}</span></div>
						</div>
						<ul>
							{#each exp.description as item}
								<li>{item}</li>
							{/each}
						</ul>
					</article>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.experience-section { padding: 120px 0 150px; content-visibility: auto; contain-intrinsic-size: 1100px; }
	.section-shell { width: min(1320px, calc(100% - 80px)); margin: 0 auto; }
	.experience-header {
		position: relative;
		min-height: 190px;
		padding: 24px 0 34px;
		display: flex;
		align-items: flex-end;
		border-top: 1px solid var(--color-border-strong);
	}
	.experience-header::after {
		content: '';
		position: absolute;
		left: 0;
		top: -1px;
		width: 72px;
		height: 2px;
		background: var(--color-brass);
	}
	.experience-list { margin-top: 32px; border-bottom: 1px solid var(--color-border); }
	.experience-card {
		position: relative;
		display: grid;
		grid-template-columns: minmax(250px, .78fr) minmax(0, 1.22fr);
		gap: 48px;
		overflow: hidden;
		isolation: isolate;
	}
	.experience-card::before {
		content: '';
		position: absolute;
		z-index: -1;
		inset: 0;
		background: color-mix(in srgb, var(--color-surface) 72%, transparent);
		transform: scaleX(0);
		transform-origin: left center;
		transition: transform 420ms cubic-bezier(.2,.75,.2,1), background 220ms ease;
	}
	.experience-card:hover::before,
	.experience-card:focus-within::before { transform: scaleX(1); }
	.experience-heading p { margin: 0 0 8px; color: var(--color-brass); font: 500 9px var(--font-family-mono); letter-spacing: .1em; text-transform: uppercase; }
	.experience-heading h3 { margin: 0; color: var(--color-text-primary); font: 400 34px/1 var(--font-family-display); }
	.experience-heading a { text-decoration: none; }
	.experience-heading a h3 { transition: color 180ms ease; }
	.experience-heading a:hover h3 { color: var(--color-brass); }
	.experience-meta { margin-top: 18px; display: flex; flex-direction: column; gap: 5px; color: var(--color-text-muted); font: 500 9px var(--font-family-mono); letter-spacing: .04em; }
	ul { margin: 0; padding: 0; list-style: none; }
	li { position: relative; padding: 0 0 14px 18px; color: var(--color-text-secondary); font-size: 13px; line-height: 1.75; }
	li::before { content: ''; position: absolute; left: 0; top: .75em; width: 7px; height: 1px; background: var(--color-brass); }

	@media (max-width: 820px) {
		.experience-section { padding: 78px 0 96px; }
		.section-shell { width: calc(100% - 32px); }
		.experience-header { min-height: 150px; padding: 20px 0 28px; }
		.experience-header::after { width: 48px; }
		.experience-card { grid-template-columns: minmax(0, 1fr); gap: 24px; }
		.experience-heading h3 { font-size: 30px; }
	}

	@media (prefers-reduced-motion: reduce) {
		.experience-card::before { transition: none; }
	}
</style>
