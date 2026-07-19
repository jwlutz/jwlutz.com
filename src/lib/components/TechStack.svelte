<script lang="ts">
	import { onMount } from 'svelte';
	import Atropos, { type AtroposInstance } from 'atropos';
	import 'atropos/css';
	import type { Skills as SkillsType } from '$lib/types';

	let { skills }: { skills: SkillsType } = $props();

	let sectionElement: HTMLElement;
	let boardElement: HTMLDivElement;
	let inView = $state(false);
	let active = $state({
		name: 'Working stack',
		category: '04 rails / current toolkit',
		detail: 'Hover or focus a tool to pause its rail and see where it fits in the work.'
	});

	const systems = [
		'Git',
		'AWS',
		'Docker',
		'Linux',
		'FastAPI',
		'PostgreSQL',
		'SQLite',
		'Redis',
		'Supabase',
		'MCP',
		'React',
		'Chrome Extension MV3',
		'Streamlit',
		'Cursor',
		'Claude Code'
	];

	const systemItems = $derived(skills.technologies.filter((item) => systems.includes(item)));
	const modelItems = $derived(skills.technologies.filter((item) => !systems.includes(item)));

	const rails = $derived([
		{
			label: 'Languages',
			code: '01',
			detail: 'Implementation across data, backend, systems, and interface work.',
			items: skills.languages,
			duration: 42,
			angle: -1.4,
			reverse: false
		},
		{
			label: 'Systems',
			code: '02',
			detail: 'APIs, storage, deployment, infrastructure, and maintained product systems.',
			items: systemItems,
			duration: 54,
			angle: 0.8,
			reverse: true
		},
		{
			label: 'Data & models',
			code: '03',
			detail: 'Analysis, forecasting, optimization, retrieval, and production machine learning.',
			items: modelItems,
			duration: 64,
			angle: -0.6,
			reverse: false
		},
		{
			label: 'Methods',
			code: '04',
			detail: 'The mathematical and computer science foundations behind the implementation.',
			items: skills.coursework,
			duration: 58,
			angle: 1.2,
			reverse: true
		}
	]);

	function inspect(rail: (typeof rails)[number], item: string, itemIndex: number) {
		active = {
			name: item,
			category: `${rail.code}.${String(itemIndex + 1).padStart(2, '0')} / ${rail.label}`,
			detail: rail.detail
		};
	}

	onMount(() => {
		const observer = new IntersectionObserver(([entry]) => {
			inView = entry.isIntersecting;
		}, { rootMargin: '160px 0px' });
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
		let parallax: AtroposInstance | undefined;

		observer.observe(sectionElement);

		if (!reducedMotion.matches && finePointer.matches) {
			parallax = Atropos({
				el: boardElement,
				activeOffset: 6,
				duration: 520,
				rotateXMax: 3.2,
				rotateYMax: 4.2,
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
	<div class="skills-field" aria-hidden="true">LANGUAGES / SYSTEMS / MODELS / METHODS</div>
	<div class="section-shell">
		<div class="section-header-sticky">
			<p class="section-label">03 / Technical range</p>
			<div class="skills-heading">
				<h2 class="section-heading">Built across the stack</h2>
				<p>A moving index of the languages, systems, models, and methods behind the work. Hover to slow it down.</p>
			</div>
		</div>

		<div class="atropos tech-atropos" bind:this={boardElement}>
			<div class="atropos-scale">
				<div class="atropos-rotate">
					<div class="atropos-inner">
						<div class="index-stage">
							<div class="board-registration" data-atropos-offset="-2" aria-hidden="true"></div>

							<div class="stack-readout" data-atropos-offset="5" aria-live="polite">
								<div class="readout-register">
									<span>TECHNICAL INDEX</span>
									<span>HOVER / FOCUS</span>
								</div>
								<div class="readout-detail">
									<p>{active.category}</p>
									<h3>{active.name}</h3>
									<span>{active.detail}</span>
								</div>
							</div>

							<div class="rails" aria-label="Technical skills index">
								{#each rails as rail}
									<div
										class="rail"
										class:reverse={rail.reverse}
										style={`--duration: ${rail.duration}s; --angle: ${rail.angle}deg`}
									>
										<div class="rail-label" data-atropos-offset="2">
											<span>{rail.code}</span>
											<strong>{rail.label}</strong>
											<small>{String(rail.items.length).padStart(2, '0')} items</small>
										</div>

										<div class="rail-window" data-atropos-offset="3">
											<div class="rail-plane">
												<div class="rail-track">
													<div class="rail-sequence">
														{#each rail.items as item, itemIndex}
															<button
																type="button"
																class="tech-token"
																onmouseenter={() => inspect(rail, item, itemIndex)}
																onfocus={() => inspect(rail, item, itemIndex)}
																onclick={() => inspect(rail, item, itemIndex)}
																aria-label={`${item}. ${rail.detail}`}
															>
																<span>{rail.code}.{String(itemIndex + 1).padStart(2, '0')}</span>
																<strong>{item}</strong>
															</button>
														{/each}
													</div>

													<div class="rail-sequence rail-sequence-copy" aria-hidden="true">
														{#each rail.items as item, itemIndex}
															<span
																class="tech-token tech-token-copy"
																role="presentation"
																onmouseenter={() => inspect(rail, item, itemIndex)}
															>
																<span>{rail.code}.{String(itemIndex + 1).padStart(2, '0')}</span>
																<strong>{item}</strong>
															</span>
														{/each}
													</div>
												</div>
											</div>
										</div>
									</div>
								{/each}
							</div>
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
		background: color-mix(in srgb, var(--color-emerald-deep) 22%, var(--color-background));
		content-visibility: auto;
		contain-intrinsic-size: 980px;
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
		top: 44%;
		overflow: hidden;
		color: color-mix(in srgb, var(--color-text-primary) 3%, transparent);
		font: 400 8vw/1 var(--font-family-display);
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
		max-width: 450px;
		margin: 0 0 8px;
		color: var(--color-text-secondary);
		font-size: 13px;
		line-height: 1.7;
	}

	.tech-atropos {
		margin-top: 52px;
		width: 100%;
		perspective: 1600px;
		touch-action: pan-y;
	}

	:global(.tech-atropos .atropos-scale),
	:global(.tech-atropos .atropos-rotate),
	:global(.tech-atropos .atropos-inner) {
		width: 100%;
	}

	:global(.tech-atropos .atropos-inner) {
		overflow: visible;
		transform-style: preserve-3d;
	}

	.index-stage {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		border: 1px solid var(--color-border-strong);
		background: color-mix(in srgb, var(--color-surface) 46%, transparent);
		transform-style: preserve-3d;
	}

	.board-registration {
		position: absolute;
		inset: 12px;
		z-index: 0;
		border: 1px solid color-mix(in srgb, var(--color-brass) 12%, transparent);
		pointer-events: none;
	}

	.stack-readout,
	.rails {
		position: relative;
		z-index: 1;
	}

	.stack-readout {
		min-height: 176px;
		display: grid;
		grid-template-columns: 180px minmax(0, 1fr);
		border-bottom: 1px solid var(--color-border-strong);
	}

	.readout-register {
		padding: 19px 17px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-right: 1px solid var(--color-border);
		color: var(--color-text-muted);
		font: 500 8px var(--font-family-mono);
		letter-spacing: .12em;
	}

	.readout-register span:first-child { color: var(--color-brass); }

	.readout-detail {
		padding: 26px 32px 28px;
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(260px, 420px);
		grid-template-rows: auto 1fr;
		align-items: end;
		gap: 10px 44px;
	}

	.readout-detail p {
		grid-column: 1 / -1;
		align-self: start;
		margin: 0;
		color: var(--color-brass);
		font: 500 9px var(--font-family-mono);
		letter-spacing: .09em;
		text-transform: uppercase;
	}

	.readout-detail h3 {
		margin: 0;
		color: var(--color-text-primary);
		font: 400 50px/.9 var(--font-family-display);
		letter-spacing: -.03em;
	}

	.readout-detail > span {
		align-self: end;
		color: var(--color-text-secondary);
		font-size: 12px;
		line-height: 1.65;
	}

	.rail {
		display: grid;
		grid-template-columns: 180px minmax(0, 1fr);
		min-width: 0;
		border-bottom: 1px solid var(--color-border);
	}

	.rail:last-child { border-bottom: 0; }

	.rail-label {
		min-height: 104px;
		padding: 14px 17px;
		display: grid;
		grid-template-columns: 24px minmax(0, 1fr);
		align-content: center;
		gap: 4px 8px;
		border-right: 1px solid var(--color-border);
	}

	.rail-label span,
	.rail-label small {
		color: var(--color-text-muted);
		font: 500 8px var(--font-family-mono);
		letter-spacing: .08em;
		text-transform: uppercase;
	}

	.rail-label strong {
		color: var(--color-text-primary);
		font-size: 11px;
		font-weight: 600;
	}

	.rail-label small {
		grid-column: 2;
		font-size: 7px;
	}

	.rail-window {
		min-width: 0;
		height: 104px;
		display: flex;
		align-items: center;
		overflow: hidden;
		contain: layout paint;
	}

	.rail-plane {
		width: calc(100% + 96px);
		margin-left: -48px;
		flex: none;
		transform: rotate(var(--angle));
		transform-origin: center;
		will-change: transform;
	}

	.rail-track {
		display: flex;
		width: max-content;
		animation: rail-forward var(--duration) linear infinite;
		animation-play-state: paused;
		will-change: transform;
	}

	.rail.reverse .rail-track { animation-name: rail-reverse; }
	.skills-section.motion-active .rail-track { animation-play-state: running; }
	.skills-section.motion-active .rail:hover .rail-track,
	.skills-section.motion-active .rail:focus-within .rail-track { animation-play-state: paused; }

	.rail-sequence {
		display: flex;
		flex: none;
	}

	.tech-token {
		width: auto;
		min-width: 152px;
		height: 76px;
		padding: 13px 22px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		gap: 5px;
		border: 0;
		border-right: 1px solid var(--color-border);
		border-radius: 0;
		background: transparent;
		color: var(--color-text-secondary);
		font: inherit;
		text-align: left;
		white-space: nowrap;
		cursor: crosshair;
		transition: background 180ms ease, color 180ms ease;
	}

	.tech-token > span {
		color: var(--color-text-muted);
		font: 500 7px var(--font-family-mono);
		letter-spacing: .08em;
		transition: color 180ms ease;
	}

	.tech-token strong {
		font: 400 21px/1 var(--font-family-display);
		font-weight: 400;
	}

	button.tech-token:hover,
	button.tech-token:focus-visible,
	.tech-token-copy:hover {
		background: color-mix(in srgb, var(--color-brass) 11%, transparent);
		color: var(--color-text-primary);
		outline: 0;
	}

	button.tech-token:focus-visible { box-shadow: inset 0 -2px var(--color-brass); }
	button.tech-token:hover > span,
	button.tech-token:focus-visible > span,
	.tech-token-copy:hover > span { color: var(--color-brass); }

	.tech-token-copy { pointer-events: auto; }

	@keyframes rail-forward {
		from { transform: translate3d(0, 0, 0); }
		to { transform: translate3d(-50%, 0, 0); }
	}

	@keyframes rail-reverse {
		from { transform: translate3d(-50%, 0, 0); }
		to { transform: translate3d(0, 0, 0); }
	}

	@media (max-width: 900px) {
		.stack-readout,
		.rail { grid-template-columns: 140px minmax(0, 1fr); }
		.readout-detail { grid-template-columns: 1fr; }
		.readout-detail > span { display: none; }
	}

	@media (max-width: 700px) {
		.skills-section { padding: 78px 0 96px; contain-intrinsic-size: 920px; }
		.section-shell { width: calc(100% - 32px); }
		.skills-heading { display: block; }
		.skills-heading > p { margin-top: 22px; }
		.skills-field { display: none; }
		.tech-atropos { margin-top: 38px; perspective: none; }
		.stack-readout { min-height: 156px; grid-template-columns: 92px minmax(0, 1fr); }
		.readout-register { padding: 14px 10px; font-size: 7px; }
		.readout-detail { padding: 20px 18px; }
		.readout-detail h3 { font-size: 38px; }
		.rail { display: block; }
		.rail-label {
			min-height: 42px;
			padding: 0 12px;
			grid-template-columns: 22px minmax(0, 1fr) auto;
			align-items: center;
			border-right: 0;
			border-bottom: 1px solid var(--color-border);
		}
		.rail-label small { grid-column: 3; }
		.rail-window {
			height: 66px;
			overflow-x: auto;
			scroll-snap-type: x proximity;
			scrollbar-width: none;
			-webkit-overflow-scrolling: touch;
		}
		.rail-window::-webkit-scrollbar { display: none; }
		.rail-plane { width: 100%; margin-left: 0; transform: none; }
		.rail-track { animation: none !important; transform: none !important; }
		.rail-sequence-copy { display: none; }
		.tech-token { min-width: 140px; height: 66px; padding: 10px 16px; }
		.tech-token strong { font-size: 19px; }
	}

	@media (hover: none), (pointer: coarse) {
		:global(.tech-atropos .atropos-scale),
		:global(.tech-atropos .atropos-rotate),
		:global(.tech-atropos [data-atropos-offset]) {
			transform: none !important;
		}

		.rail-window {
			overflow-x: auto;
			scroll-snap-type: x proximity;
			scrollbar-width: none;
			-webkit-overflow-scrolling: touch;
		}
		.rail-window::-webkit-scrollbar { display: none; }
		.rail-plane { width: 100%; margin-left: 0; transform: none; }
		.rail-track { animation: none !important; transform: none !important; }
		.rail-sequence-copy { display: none; }
		.tech-token { scroll-snap-align: start; }
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.tech-atropos .atropos-scale),
		:global(.tech-atropos .atropos-rotate),
		:global(.tech-atropos [data-atropos-offset]) {
			transform: none !important;
		}

		.rail-window {
			overflow-x: auto;
			scrollbar-width: thin;
		}
		.rail-track { animation: none !important; transform: none !important; }
		.rail-sequence-copy { display: none; }
	}
</style>
