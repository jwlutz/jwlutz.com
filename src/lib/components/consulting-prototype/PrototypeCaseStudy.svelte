<script lang="ts">
	import { onMount } from 'svelte';
	import { workPageCopy, type PrototypeCase } from '$lib/content/consulting-prototype';
	import PrototypeCaseMedia from './PrototypeCaseMedia.svelte';

	let { project, compact = false }: { project: PrototypeCase; compact?: boolean } = $props();
	let article: HTMLElement;
	let activeChapter = $state(0);
	let liveHost = $derived(new URL(project.liveUrl).hostname.replace(/^www\./, ''));
	let chapterTotal = $derived(compact ? Math.min(3, project.sections.length) : project.sections.length);

	onMount(() => {
		const chapters = [...article.querySelectorAll<HTMLElement>('[data-chapter]')];
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) activeChapter = Number((entry.target as HTMLElement).dataset.chapter ?? 0);
				}
			},
			{ rootMargin: '-34% 0px -46% 0px' }
		);
		chapters.forEach((chapter) => observer.observe(chapter));
		return () => observer.disconnect();
	});
</script>

<article class="case-study" class:compact id={`case-${project.slug}`} bind:this={article}>
	<div class="visual-column">
		<div class="sticky-visual">
			<div class="case-heading">
				<div><span>CASE STUDY {project.index} · CHAPTER</span><b>{String(activeChapter + 1).padStart(2, '0')} / {String(chapterTotal).padStart(2, '0')}</b></div>
				<h3>{project.name}</h3>
			</div>
			<PrototypeCaseMedia {project} stage={activeChapter} />
			<div class="evidence-grid">
				{#each project.evidence as evidence}
					<div><strong>{evidence.value}</strong><span>{evidence.label}</span></div>
				{/each}
			</div>
		</div>
	</div>

	<div class="case-copy">
		<p class="case-kicker">{project.category}</p>
		<h2>{project.title.lead}<br /><em>{project.title.emphasis}</em></h2>
		<p class="case-summary">{project.summary}</p>
		<a class="live-link" href={project.liveUrl} target="_blank" rel="noreferrer"><span>View live site</span><small>{liveHost}</small></a>

		<div class="narrative">
			{#each (compact ? project.sections.slice(0, 3) : project.sections) as section, index}
				<section data-chapter={index} class:active={index === activeChapter}>
					<p>{section.label}</p>
					<div class="thread-tick"></div>
					<span>{section.body}</span>
				</section>
			{/each}
		</div>

		<div class="responsibilities">
			<p>{workPageCopy.ownedLabel}</p>
			<ul>{#each project.responsibilities as item}<li>{item}</li>{/each}</ul>
		</div>
	</div>
</article>

<style>
	.case-study {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		gap: clamp(28px, 4vw, 58px);
		padding: clamp(84px, 10vw, 150px) 0;
		border-top: 1px solid var(--proto-line);
		min-height: 1300px;
		content-visibility: auto;
		contain-intrinsic-size: auto 1400px;
	}
	.case-study.compact { min-height: 1080px; }
	.visual-column { grid-column: span 5; }
	.sticky-visual { position: sticky; top: 94px; display: flex; flex-direction: column; gap: 18px; }
	.case-heading > div { display: flex; justify-content: space-between; align-items: baseline; font: 500 9px var(--proto-mono); letter-spacing: .12em; color: var(--proto-brass); }
	.case-heading b { font: 400 clamp(50px,7vw,92px)/.7 var(--proto-display); color: var(--proto-line-strong); }
	.case-heading h3 { font: 400 clamp(25px,3vw,40px)/1 var(--proto-display); margin: 4px 0 0; }
	.evidence-grid { display: grid; grid-template-columns: repeat(2,1fr); border-top: 1px solid var(--proto-line-strong); border-left: 1px solid var(--proto-line-strong); }
	.evidence-grid div { padding: 15px 13px; border-right: 1px solid var(--proto-line-strong); border-bottom: 1px solid var(--proto-line-strong); }
	.evidence-grid strong { display: block; font: 400 clamp(17px,1.8vw,27px)/1.05 var(--proto-display); color: var(--proto-paper); }
	.evidence-grid span { display: block; margin-top: 8px; font: 500 9px/1.45 var(--proto-mono); letter-spacing: .07em; color: var(--proto-muted); }

	.case-copy { grid-column: span 7; padding: 54px 0 80px clamp(24px,4vw,64px); border-left: 1px solid var(--proto-line); position: relative; }
	.case-copy::before { content: ''; position: absolute; left: -1px; top: 0; width: 2px; height: 118px; background: var(--proto-brass); }
	.case-kicker { font: 500 9px var(--proto-mono); letter-spacing: .12em; color: var(--proto-brass); margin: 0 0 22px; }
	.case-copy h2 { font: 400 clamp(52px,6.5vw,94px)/.88 var(--proto-display); letter-spacing: -.04em; margin: 0; max-width: 760px; }
	.case-copy h2 em { color: var(--proto-paper); font-weight: 400; font-style: normal; }
	.case-summary { margin: 30px 0 28px; max-width: 670px; color: var(--proto-muted); font-size: clamp(16px,1.5vw,19px); line-height: 1.7; }
	.live-link { display: inline-flex; align-items:center;gap:35px;padding: 13px 16px; background: var(--proto-paper); color: var(--proto-bg); text-decoration: none; font-weight: 600; font-size: 13px; transition: background .25s ease, color .25s ease; }
	.live-link small{font:500 9px var(--proto-mono);letter-spacing:.04em;opacity:.62}
	.live-link:hover { background: var(--proto-brass); }
	.narrative { margin-top: clamp(78px,9vw,130px); }
	.narrative section { display: grid; grid-template-columns: 100px 20px 1fr; gap: 20px; padding: 29px 0 34px; border-top: 1px solid var(--proto-line); align-items: start; }
	.narrative section > p, .responsibilities > p { margin: 0; font: 500 9px var(--proto-mono); letter-spacing: .1em; text-transform: uppercase; color: var(--proto-brass); }
	.narrative section > span { color: var(--proto-muted); line-height: 1.8; max-width: 630px; transition: color .35s ease; }
	.narrative section { opacity: .55; transition: opacity .35s ease; }
	.narrative section.active { opacity: 1; }
	.narrative section.active > span { color: var(--proto-paper); }
	.thread-tick { height: 1px; width: 20px; margin-top: 7px; background: var(--proto-brass); }
	.responsibilities { margin-top: 40px; padding-top: 25px; border-top: 1px solid var(--proto-line); }
	.responsibilities ul { list-style: none; padding: 0; margin: 20px 0 0; display: grid; grid-template-columns: repeat(2,1fr); }
	.responsibilities li { padding: 13px 0; color: var(--proto-paper); border-bottom: 1px solid var(--proto-line); font-size: 14px; }
	.responsibilities li::before { content: ''; display: inline-block; width: 8px; height: 1px; margin: 0 10px 4px 0; background: var(--proto-brass); }

	@media (max-width: 900px) {
		.case-study, .case-study.compact { grid-template-columns: 1fr; min-height: auto; padding: 80px 0; gap: 50px; }
		.visual-column, .case-copy { grid-column: auto; }
		.sticky-visual { position: relative; top: auto; }
		.case-copy { padding: 32px 0 0 24px; }
	}
	@media (max-width: 560px) {
		.narrative section { grid-template-columns: 1fr; gap: 10px; }
		.thread-tick { display: none; }
		.responsibilities ul { grid-template-columns: 1fr; }
	}
</style>
