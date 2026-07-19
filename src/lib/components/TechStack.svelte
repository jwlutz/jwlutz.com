<script lang="ts">
	import { onMount } from 'svelte';
	import Atropos, { type AtroposInstance } from 'atropos';
	import 'atropos/css';
	import type { Skills as SkillsType } from '$lib/types';
	import { getTechIcon } from '$lib/data/tech-icons';
	import TechMark from './TechMark.svelte';

	type GroupKey = 'Languages' | 'Data & ML' | 'Infrastructure' | 'Product systems';
	type BoardItem = {
		name: string;
		group: GroupKey;
		detail: string;
		depth: number;
		emphasis: 'feature' | 'wide' | 'standard';
	};

	let { skills }: { skills: SkillsType } = $props();

	let sectionElement: HTMLElement;
	let boardElement: HTMLDivElement;
	let inView = $state(false);

	const groupDetails: Record<GroupKey, string> = {
		Languages: 'Production code across analysis, backends, systems, and interfaces.',
		'Data & ML': 'Modeling, optimization, retrieval, experimentation, and data products.',
		Infrastructure: 'Deployment, storage, observability, and maintained production systems.',
		'Product systems': 'The application layer where workflows become usable products.'
	};

	const languageNames = new Set(['Python', 'TypeScript', 'JavaScript', 'Go', 'R', 'C++', 'Swift', 'Svelte']);
	const dataNames = new Set(['NumPy', 'pandas', 'PyTorch', 'CUDA', 'Hugging Face', 'FAISS', 'Google OR-Tools']);
	const infrastructureNames = new Set(['AWS', 'Docker', 'Linux', 'PostgreSQL', 'Redis', 'Supabase']);

	const boardOrder = [
		'Python',
		'AWS',
		'PyTorch',
		'TypeScript',
		'PostgreSQL',
		'Svelte',
		'Docker',
		'Supabase',
		'R',
		'pandas',
		'NumPy',
		'FastAPI',
		'CUDA',
		'Hugging Face',
		'FAISS',
		'Google OR-Tools',
		'Go',
		'C++',
		'Swift',
		'React',
		'Redis',
		'Linux',
		'Streamlit',
		'Claude Code',
		'MCP',
		'Chrome Extension MV3',
		'JavaScript'
	];

	function groupFor(name: string): GroupKey {
		if (languageNames.has(name)) return 'Languages';
		if (dataNames.has(name)) return 'Data & ML';
		if (infrastructureNames.has(name)) return 'Infrastructure';
		return 'Product systems';
	}

	const availableSkills = $derived(new Set([...skills.languages, ...skills.technologies]));
	const logoItems: BoardItem[] = $derived(boardOrder
		.filter((name) => availableSkills.has(name) && getTechIcon(name))
		.map((name, index) => {
			const group = groupFor(name);
			return {
				name,
				group,
				detail: groupDetails[group],
				depth: name === 'Python' ? 8 : [3, 5, 4, 6, 2][index % 5],
				emphasis: name === 'Python' ? 'feature' : ['AWS', 'PyTorch'].includes(name) ? 'wide' : 'standard'
			};
		}));

	const methodItems = $derived(skills.coursework.slice(0, 8));

	let active = $state({
		name: 'Python',
		group: 'Languages' as GroupKey,
		detail: groupDetails.Languages
	});

	function inspect(item: BoardItem) {
		active = { name: item.name, group: item.group, detail: item.detail };
	}

	onMount(() => {
		const observer = new IntersectionObserver(([entry]) => {
			inView = entry.isIntersecting;
		}, { rootMargin: '140px 0px' });
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
		let parallax: AtroposInstance | undefined;

		observer.observe(sectionElement);

		if (!reducedMotion.matches && finePointer.matches) {
			parallax = Atropos({
				el: boardElement,
				activeOffset: 7,
				duration: 560,
				rotateXMax: 3.8,
				rotateYMax: 4.8,
				rotateTouch: false,
				shadow: false,
				highlight: false
			});
		}

		return () => {
			observer.disconnect();
			parallax?.destroy();
		};
	});
</script>

<section id="skills" class:motion-active={inView} class="skills-section" bind:this={sectionElement}>
	<div class="skills-field" aria-hidden="true">BUILD / MODEL / SHIP / MAINTAIN</div>
	<div class="section-shell">
		<div class="section-header-sticky">
			<p class="section-label">Technical range</p>
			<div class="skills-heading">
				<h2 class="section-heading">The tools behind the work.</h2>
				<p>Move across the board. Every mark belongs to a stack I have used to build, analyze, deploy, or maintain real work.</p>
			</div>
		</div>

		<div class="atropos tech-atropos" bind:this={boardElement}>
			<div class="atropos-scale">
				<div class="atropos-rotate">
					<div class="atropos-inner">
						<div class="logo-stage">
							<div class="board-grid" data-atropos-offset="-4" aria-hidden="true"></div>

							<header class="board-header" data-atropos-offset="2">
								<div>
									<strong>Working toolkit</strong>
									<span>One board / multiple depths</span>
								</div>
								<span>Move or focus to inspect</span>
							</header>

							<div class="board-body">
								<aside class="board-readout" data-atropos-offset="6" aria-live="polite">
									<div class="readout-label"><span>Selected tool</span><i aria-hidden="true"></i></div>
									<div class="readout-mark"><TechMark tech={active.name} size="feature" framed={false} /></div>
									<p>{active.group}</p>
									<h3>{active.name}</h3>
									<span>{active.detail}</span>
									<div class="readout-groups" aria-label="Toolkit categories">
										<span>Languages</span>
										<span>Data & ML</span>
										<span>Infrastructure</span>
										<span>Product systems</span>
									</div>
								</aside>

								<div class="logo-field" aria-label="Technology logo board">
									{#each logoItems as item}
										<button
											type="button"
											class="logo-node"
											class:feature={item.emphasis === 'feature'}
											class:wide={item.emphasis === 'wide'}
											class:active={active.name === item.name}
											data-atropos-offset={item.depth}
											onmouseenter={() => inspect(item)}
											onfocus={() => inspect(item)}
											onclick={() => inspect(item)}
											aria-pressed={active.name === item.name}
											aria-label={`${item.name}. ${item.detail}`}
										>
											<TechMark tech={item.name} size="feature" framed={false} />
											<span>{item.name}</span>
											<small>{item.group}</small>
										</button>
									{/each}
								</div>
							</div>

							<footer class="methods-strip" data-atropos-offset="2">
								<strong>Methods underneath</strong>
								<div>
									{#each methodItems as method}<span>{method}</span>{/each}
								</div>
							</footer>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.skills-section {
		position: relative;
		padding: 120px 0 145px;
		overflow: hidden;
		border-top: 1px solid var(--color-border);
		border-bottom: 1px solid var(--color-border);
		background: color-mix(in srgb, var(--color-emerald-deep) 18%, var(--color-background));
		content-visibility: auto;
		contain-intrinsic-size: 1120px;
	}

	.section-shell {
		position: relative;
		z-index: 2;
		width: min(1320px, calc(100% - 80px));
		margin: 0 auto;
	}

	.skills-field {
		position: absolute;
		left: -2%;
		right: -2%;
		top: 45%;
		overflow: hidden;
		color: color-mix(in srgb, var(--color-text-primary) 3%, transparent);
		font: 400 7vw/1 var(--font-family-display);
		letter-spacing: -.03em;
		white-space: nowrap;
		transform: rotate(-3deg);
		pointer-events: none;
	}

	.skills-heading {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 50px;
	}

	.skills-heading > p {
		max-width: 470px;
		margin: 0 0 8px;
		color: var(--color-text-secondary);
		font-size: 13px;
		line-height: 1.7;
	}

	.tech-atropos {
		width: 100%;
		margin-top: 52px;
		perspective: 1700px;
		touch-action: pan-y;
		opacity: .001;
		transform: translate3d(0, 24px, 0);
		transition: opacity 520ms ease, transform 720ms cubic-bezier(.2,.75,.2,1);
	}

	.skills-section.motion-active .tech-atropos {
		opacity: 1;
		transform: translate3d(0, 0, 0);
	}

	:global(.tech-atropos .atropos-scale),
	:global(.tech-atropos .atropos-rotate),
	:global(.tech-atropos .atropos-inner) { width: 100%; }

	:global(.tech-atropos .atropos-inner) {
		overflow: visible;
		transform-style: preserve-3d;
	}

	.logo-stage {
		--board-ink: #08110e;
		--board-surface: #0d1713;
		--board-cream: #f0efe9;
		--board-muted: rgba(240, 239, 233, .58);
		position: relative;
		isolation: isolate;
		overflow: hidden;
		border: 1px solid color-mix(in srgb, var(--color-brass) 36%, #20312a);
		background: var(--board-ink);
		box-shadow: 0 42px 90px rgba(0, 0, 0, .25);
		transform-style: preserve-3d;
		contain: layout paint;
	}

	.board-grid {
		position: absolute;
		inset: 0;
		z-index: 0;
		background-image:
			linear-gradient(rgba(240, 239, 233, .045) 1px, transparent 1px),
			linear-gradient(90deg, rgba(240, 239, 233, .045) 1px, transparent 1px),
			linear-gradient(135deg, transparent 48%, rgba(177, 139, 76, .08) 49%, rgba(177, 139, 76, .08) 51%, transparent 52%);
		background-size: 48px 48px, 48px 48px, 260px 260px;
		pointer-events: none;
	}

	.board-header,
	.board-body,
	.methods-strip { position: relative; z-index: 1; }

	.board-header {
		min-height: 74px;
		padding: 0 22px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		border-bottom: 1px solid rgba(240, 239, 233, .16);
		color: var(--board-muted);
		font: 500 8px var(--font-family-mono);
		letter-spacing: .11em;
		text-transform: uppercase;
	}

	.board-header > div {
		display: flex;
		align-items: center;
		gap: 18px;
	}

	.board-header strong { color: var(--color-brass); font-weight: 600; }
	.board-header > span { text-align: right; }

	.board-body {
		display: grid;
		grid-template-columns: 278px minmax(0, 1fr);
		min-width: 0;
	}

	.board-readout {
		min-width: 0;
		padding: 26px 24px 24px;
		display: flex;
		flex-direction: column;
		border-right: 1px solid rgba(240, 239, 233, .16);
		background: rgba(240, 239, 233, .018);
		color: var(--board-cream);
	}

	.readout-label {
		display: flex;
		align-items: center;
		gap: 12px;
		color: var(--board-muted);
		font: 500 8px var(--font-family-mono);
		letter-spacing: .1em;
		text-transform: uppercase;
	}

	.readout-label i { height: 1px; flex: 1; background: rgba(240, 239, 233, .14); }
	.readout-mark { margin: 54px 0 26px; }
	.readout-mark :global(.tech-mark) { width: 76px; height: 76px; }

	.board-readout > p {
		margin: 0 0 10px;
		color: var(--color-brass);
		font: 500 9px var(--font-family-mono);
		letter-spacing: .1em;
		text-transform: uppercase;
	}

	.board-readout h3 {
		margin: 0;
		color: var(--board-cream);
		font: 400 clamp(38px, 4vw, 58px)/.88 var(--font-family-display);
		letter-spacing: -.035em;
		overflow-wrap: anywhere;
	}

	.board-readout > span {
		margin-top: 24px;
		color: var(--board-muted);
		font-size: 11px;
		line-height: 1.7;
	}

	.readout-groups {
		margin-top: auto;
		padding-top: 40px;
		display: grid;
		gap: 8px;
		color: rgba(240, 239, 233, .42);
		font: 500 7px var(--font-family-mono);
		letter-spacing: .08em;
		text-transform: uppercase;
	}

	.logo-field {
		min-width: 0;
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		grid-auto-flow: dense;
		grid-auto-rows: 96px;
		gap: 1px;
		background: rgba(240, 239, 233, .14);
	}

	.logo-node {
		position: relative;
		min-width: 0;
		padding: 14px 12px 12px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-end;
		gap: 5px;
		border: 0;
		border-radius: 0;
		background: var(--board-surface);
		color: var(--board-cream);
		font: inherit;
		text-align: left;
		cursor: crosshair;
		transition: background 180ms ease, box-shadow 180ms ease, color 180ms ease;
	}

	.logo-node :global(.tech-mark) {
		position: absolute;
		top: 13px;
		left: 13px;
		width: 34px;
		height: 34px;
		transition: transform 220ms cubic-bezier(.2,.75,.2,1);
	}

	.logo-node > span {
		max-width: 100%;
		overflow: hidden;
		color: var(--board-cream);
		font-size: 10px;
		font-weight: 600;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.logo-node small {
		max-width: 100%;
		overflow: hidden;
		color: rgba(240, 239, 233, .38);
		font: 500 6px var(--font-family-mono);
		letter-spacing: .06em;
		text-overflow: ellipsis;
		text-transform: uppercase;
		white-space: nowrap;
	}

	.logo-node.feature {
		grid-column: span 2;
		grid-row: span 2;
		padding: 20px;
	}

	.logo-node.feature :global(.tech-mark) { top: 20px; left: 20px; width: 76px; height: 76px; }
	.logo-node.feature > span { font: 400 28px/1 var(--font-family-display); }
	.logo-node.feature small { font-size: 7px; }
	.logo-node.wide { grid-column: span 2; }
	.logo-node.wide :global(.tech-mark) { width: 40px; height: 40px; }

	.logo-node:hover,
	.logo-node:focus-visible,
	.logo-node.active {
		z-index: 2;
		background: #15221c;
		box-shadow: inset 0 0 0 1px var(--color-brass);
		outline: 0;
	}

	.logo-node:hover :global(.tech-mark),
	.logo-node:focus-visible :global(.tech-mark),
	.logo-node.active :global(.tech-mark) { transform: translate3d(0, -3px, 0) scale(1.06); }

	.methods-strip {
		min-height: 84px;
		padding: 16px 22px;
		display: grid;
		grid-template-columns: 256px minmax(0, 1fr);
		align-items: center;
		gap: 20px;
		border-top: 1px solid rgba(240, 239, 233, .16);
		color: var(--board-muted);
	}

	.methods-strip strong {
		color: var(--color-brass);
		font: 500 8px var(--font-family-mono);
		letter-spacing: .1em;
		text-transform: uppercase;
	}

	.methods-strip > div { display: flex; flex-wrap: wrap; gap: 7px 18px; }
	.methods-strip span { font-size: 8px; line-height: 1.4; }

	@media (max-width: 1060px) {
		.board-body { grid-template-columns: 230px minmax(0, 1fr); }
		.logo-field { grid-template-columns: repeat(4, minmax(0, 1fr)); }
		.methods-strip { grid-template-columns: 208px minmax(0, 1fr); }
	}

	@media (max-width: 700px) {
		.skills-section { padding: 78px 0 96px; contain-intrinsic-size: 1380px; }
		.section-shell { width: calc(100% - 32px); }
		.skills-heading { display: block; }
		.skills-heading > p { margin-top: 22px; }
		.skills-field { display: none; }
		.tech-atropos { margin-top: 38px; perspective: none; opacity: 1; transform: none; transition: none; }
		:global(.tech-atropos .atropos-scale),
		:global(.tech-atropos .atropos-rotate),
		:global(.tech-atropos .atropos-inner),
		.logo-stage,
		.board-grid,
		.board-header,
		.board-readout,
		.logo-node,
		.methods-strip { transform: none !important; }
		.board-header { min-height: 68px; padding: 14px; align-items: flex-start; }
		.board-header > div { display: grid; gap: 5px; }
		.board-header > span { max-width: 110px; line-height: 1.5; }
		.board-body { display: block; }
		.board-readout { min-height: 252px; padding: 20px 18px; border-right: 0; border-bottom: 1px solid rgba(240, 239, 233, .16); }
		.readout-mark { margin: 28px 0 18px; }
		.readout-mark :global(.tech-mark) { width: 54px; height: 54px; }
		.board-readout h3 { font-size: 42px; }
		.board-readout > span { margin-top: 16px; }
		.readout-groups { display: none; }
		.logo-field { grid-template-columns: repeat(3, minmax(0, 1fr)); grid-auto-rows: 96px; }
		.logo-node.feature,
		.logo-node.wide { grid-column: span 1; grid-row: span 1; padding: 12px 10px 10px; }
		.logo-node.feature :global(.tech-mark),
		.logo-node.wide :global(.tech-mark),
		.logo-node :global(.tech-mark) { top: 12px; left: 10px; width: 32px; height: 32px; }
		.logo-node.feature > span,
		.logo-node > span { font: 600 9px/1.1 var(--font-family-sans); }
		.logo-node small { display: none; }
		.methods-strip { min-height: 0; padding: 18px 14px 20px; display: block; }
		.methods-strip > div { margin-top: 12px; gap: 7px 14px; }
		.methods-strip span { font-size: 7px; }
	}

	@media (prefers-reduced-motion: reduce) {
		.tech-atropos,
		:global(.tech-atropos .atropos-scale),
		:global(.tech-atropos .atropos-rotate),
		:global(.tech-atropos .atropos-inner),
		.logo-stage,
		.board-grid,
		.board-header,
		.board-readout,
		.logo-node,
		.methods-strip { transform: none !important; transition: none !important; }
		.tech-atropos { opacity: 1; }
	}
</style>
