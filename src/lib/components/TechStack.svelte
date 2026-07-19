<script lang="ts">
	import type { Skills as SkillsType } from '$lib/types';

	let { skills }: { skills: SkillsType } = $props();

	const groups = $derived([
		{ label: 'Languages', items: skills.languages.slice(0, 10) },
		{ label: 'Systems & product', items: skills.technologies.slice(0, 11) },
		{ label: 'ML & AI', items: skills.technologies.slice(11, 23) },
		{ label: 'Study', items: skills.coursework.slice(0, 9) }
	]);
</script>

<section id="skills" class="skills-section">
	<div class="skills-field" aria-hidden="true">FIRST PRINCIPLES / WORKING SYSTEMS / HUMAN JUDGMENT</div>
	<div class="section-shell">
		<div class="section-header-sticky">
			<p class="section-label">03 / Technical range</p>
			<div class="skills-heading">
				<h2 class="section-heading">Tools I reach for</h2>
				<p>The stack changes with the problem. The standard does not: understand the system, test the assumptions, and own what ships.</p>
			</div>
		</div>

		<div class="skills-ledger">
			{#each groups as group, groupIndex}
				<div class="skill-group">
					<header><span>0{groupIndex + 1}</span><h3>{group.label}</h3></header>
					<ul>
						{#each group.items as item, itemIndex}<li><span>{String(itemIndex + 1).padStart(2, '0')}</span>{item}</li>{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.skills-section { position: relative; padding: 120px 0 145px; overflow: hidden; border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); background: color-mix(in srgb, var(--color-emerald-deep) 22%, var(--color-background)); content-visibility: auto; contain-intrinsic-size: 980px; }
	.section-shell { position: relative; z-index: 2; width: min(1320px, calc(100% - 80px)); margin: 0 auto; }
	.skills-field { position: absolute; left: -2%; right: -2%; top: 43%; overflow: hidden; color: color-mix(in srgb, var(--color-text-primary) 3%, transparent); font: 400 8vw/1 var(--font-family-display); letter-spacing: -.03em; white-space: nowrap; transform: rotate(-3deg); pointer-events: none; }
	.skills-heading { display: flex; align-items: end; justify-content: space-between; gap: 50px; }
	.skills-heading > p { max-width: 450px; margin: 0 0 8px; color: var(--color-text-secondary); font-size: 13px; line-height: 1.7; }
	.skills-ledger { margin-top: 52px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border-top: 1px solid var(--color-border-strong); border-left: 1px solid var(--color-border); }
	.skill-group { min-width: 0; border-right: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); background: color-mix(in srgb, var(--color-surface) 42%, transparent); }
	header { min-height: 83px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between; border-bottom: 1px solid var(--color-border); }
	header span { color: var(--color-brass); font: 500 8px var(--font-family-mono); }
	h3 { margin: 0; color: var(--color-text-primary); font: 400 24px var(--font-family-display); }
	ul { margin: 0; padding: 0; list-style: none; }
	li { min-height: 38px; padding: 0 14px; display: grid; grid-template-columns: 31px 1fr; align-items: center; border-bottom: 1px solid var(--color-border); color: var(--color-text-secondary); font-size: 11px; }
	li:last-child { border-bottom: 0; }
	li span { color: var(--color-text-muted); font: 500 7px var(--font-family-mono); }
	li:hover { color: var(--color-text-primary); background: color-mix(in srgb, var(--color-brass) 7%, transparent); }

	@media (max-width: 900px) { .skills-ledger { grid-template-columns: repeat(2, 1fr); } }
	@media (max-width: 700px) {
		.skills-section { padding: 78px 0 96px; }
		.section-shell { width: calc(100% - 32px); }
		.skills-heading { display: block; }
		.skills-heading > p { margin-top: 22px; }
		.skills-ledger { grid-template-columns: 1fr; margin-top: 38px; }
		.skills-field { display: none; }
	}
</style>
