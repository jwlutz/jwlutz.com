<script lang="ts">
	import { onMount } from 'svelte';
	import type { Skills as SkillsType } from '$lib/types';
	import TechMark from './TechMark.svelte';

	type ToolkitItem = {
		tech: string;
		label: string;
		group: string;
		detail: string;
		depth: number;
	};

	let { skills }: { skills: SkillsType } = $props();
	let boardElement: HTMLDivElement;
	let motionAllowed = false;

	const toolkit: ToolkitItem[] = [
		{ tech: 'Python', label: 'Python', group: 'Language', detail: 'Models, data pipelines, APIs, and automation.', depth: 20 },
		{ tech: 'TypeScript', label: 'TypeScript', group: 'Language', detail: 'Typed product code across frontend and backend systems.', depth: 12 },
		{ tech: 'JavaScript', label: 'JavaScript', group: 'Language', detail: 'Interactive web products and browser tooling.', depth: 7 },
		{ tech: 'R', label: 'R', group: 'Language', detail: 'Statistical analysis, modeling, and research workflows.', depth: 16 },
		{ tech: 'Go', label: 'Go', group: 'Language', detail: 'Fast data collection and production services.', depth: 9 },
		{ tech: 'C++', label: 'C++', group: 'Language', detail: 'Performance-sensitive systems and quantitative engines.', depth: 14 },
		{ tech: 'Svelte', label: 'Svelte', group: 'Interface', detail: 'Fast, focused interfaces with a small runtime footprint.', depth: 18 },
		{ tech: 'React', label: 'React', group: 'Interface', detail: 'Component systems for complex product surfaces.', depth: 6 },
		{ tech: 'PyTorch', label: 'PyTorch', group: 'Machine learning', detail: 'Neural networks, experimentation, and model training.', depth: 13 },
		{ tech: 'NumPy', label: 'NumPy', group: 'Data', detail: 'Numerical computing underneath analysis and modeling.', depth: 8 },
		{ tech: 'pandas', label: 'pandas', group: 'Data', detail: 'Data cleaning, transformation, and analysis pipelines.', depth: 17 },
		{ tech: 'FastAPI', label: 'FastAPI', group: 'Backend', detail: 'Typed Python services and production APIs.', depth: 10 },
		{ tech: 'PostgreSQL', label: 'PostgreSQL', group: 'Data', detail: 'Reliable relational storage for production systems.', depth: 15 },
		{ tech: 'SQLite', label: 'SQLite', group: 'Data', detail: 'Portable storage for local-first tools and prototypes.', depth: 5 },
		{ tech: 'Redis', label: 'Redis', group: 'Infrastructure', detail: 'Caching, queues, and low-latency application state.', depth: 11 },
		{ tech: 'Supabase', label: 'Supabase', group: 'Infrastructure', detail: 'Product backends with database, auth, and realtime data.', depth: 19 },
		{ tech: 'Docker', label: 'Docker', group: 'Infrastructure', detail: 'Repeatable development and deployment environments.', depth: 7 },
		{ tech: 'AWS', label: 'AWS', group: 'Infrastructure', detail: 'Cloud systems spanning compute, storage, and delivery.', depth: 14 },
		{ tech: 'Linux', label: 'Linux', group: 'Systems', detail: 'The operating layer behind deployed applications.', depth: 9 },
		{ tech: 'Git', label: 'Git', group: 'Workflow', detail: 'Versioned, reviewable delivery from first commit onward.', depth: 16 },
		{ tech: 'GitHub', label: 'GitHub', group: 'Workflow', detail: 'Code review, collaboration, and automated delivery.', depth: 6 },
		{ tech: 'Streamlit', label: 'Streamlit', group: 'Product', detail: 'Fast analytical tools that put models in front of users.', depth: 12 },
		{ tech: 'CUDA', label: 'CUDA', group: 'Machine learning', detail: 'GPU-accelerated experimentation and model workloads.', depth: 18 },
		{ tech: 'Google OR-Tools', label: 'OR-Tools', group: 'Optimization', detail: 'Constraint solvers for scheduling and recommendation systems.', depth: 8 }
	];

	const available = $derived(new Set([...skills.languages, ...skills.technologies, 'GitHub']));
	const logoItems = $derived(toolkit.filter((item) => available.has(item.tech)));
	const methodItems = $derived(skills.coursework.slice(0, 6));
	let active = $state(toolkit[0]);

	function inspect(item: ToolkitItem) {
		active = item;
	}

	function resetBoard() {
		if (!boardElement) return;
		boardElement.style.setProperty('--board-rx', '0deg');
		boardElement.style.setProperty('--board-ry', '0deg');
		boardElement.style.setProperty('--light-x', '50%');
		boardElement.style.setProperty('--light-y', '50%');
	}

	function handlePointer(event: PointerEvent) {
		if (!motionAllowed || !boardElement || event.pointerType === 'touch') return;
		const rect = boardElement.getBoundingClientRect();
		const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
		const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
		boardElement.style.setProperty('--board-rx', `${(0.5 - y) * 5.2}deg`);
		boardElement.style.setProperty('--board-ry', `${(x - 0.5) * 6.8}deg`);
		boardElement.style.setProperty('--light-x', `${x * 100}%`);
		boardElement.style.setProperty('--light-y', `${y * 100}%`);
	}

	onMount(() => {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
		const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
		const updateMotion = () => {
			motionAllowed = !reduced.matches && finePointer.matches;
			if (!motionAllowed) resetBoard();
		};

		updateMotion();
		reduced.addEventListener('change', updateMotion);
		finePointer.addEventListener('change', updateMotion);

		return () => {
			reduced.removeEventListener('change', updateMotion);
			finePointer.removeEventListener('change', updateMotion);
		};
	});
</script>

<section id="skills" class="skills-board-section">
	<div class="board-intro">
		<div>
			<p class="section-label">Technical range</p>
			<h2>From first model to production.</h2>
		</div>
		<p>I choose the stack around the problem, then stay with it through deployment, iteration, and maintenance.</p>
	</div>

	<div class="board-viewport">
		<div
			class="tech-board"
			bind:this={boardElement}
			onpointermove={handlePointer}
			onpointerleave={resetBoard}
		>
			<div class="board-plane">
				<header class="board-header">
					<span>Working toolkit</span>
					<span>Move across the board</span>
				</header>

				<div class="logo-grid" aria-label="Technology toolkit">
					{#each logoItems as item}
						<button
							type="button"
							class:active={active.tech === item.tech}
							class="logo-tile"
							style={`--tile-depth: ${item.depth}px`}
							onmouseenter={() => inspect(item)}
							onfocus={() => inspect(item)}
							onclick={() => inspect(item)}
							aria-pressed={active.tech === item.tech}
							aria-label={`${item.label}. ${item.detail}`}
						>
							<TechMark tech={item.tech} size="feature" framed={false} />
							<span><strong>{item.label}</strong><small>{item.group}</small></span>
						</button>
					{/each}
				</div>

				<footer class="board-readout" aria-live="polite">
					<div><span>{active.group}</span><strong>{active.label}</strong></div>
					<p>{active.detail}</p>
				</footer>
			</div>
		</div>
	</div>

	<div class="method-index">
		<strong>Methods underneath</strong>
		<div>{#each methodItems as method}<span>{method}</span>{/each}</div>
	</div>
</section>

<style>
	.skills-board-section {
		--board-line: rgba(240, 239, 233, .13);
		position: relative;
		overflow: hidden;
		border-top: 1px solid var(--board-line);
		border-bottom: 1px solid var(--board-line);
		background: #090f0c;
		color: var(--color-cream);
		contain: layout paint;
	}

	.board-intro,
	.method-index {
		width: min(1320px, calc(100% - 80px));
		margin: 0 auto;
	}

	.board-intro {
		min-height: 218px;
		padding: 46px 0 40px;
		display: grid;
		grid-template-columns: minmax(0, 1.25fr) minmax(280px, .75fr);
		align-items: end;
		gap: 80px;
	}

	.board-intro h2 {
		max-width: 800px;
		margin: 18px 0 0;
		font: 400 clamp(48px, 5.6vw, 82px)/.87 var(--font-family-display);
		letter-spacing: -.045em;
	}

	.board-intro > p {
		max-width: 430px;
		margin: 0 0 8px;
		color: #9ba39d;
		font-size: 13px;
		line-height: 1.7;
	}

	.board-viewport {
		position: relative;
		padding: 8px 24px 72px;
		perspective: 1600px;
	}

	.tech-board {
		--board-rx: 0deg;
		--board-ry: 0deg;
		--light-x: 50%;
		--light-y: 50%;
		position: relative;
		width: min(1440px, calc(100vw - 48px));
		margin: 0 auto;
		transform: rotateX(var(--board-rx)) rotateY(var(--board-ry)) scale(1.001);
		transform-style: preserve-3d;
		transition: transform 420ms cubic-bezier(.2, .75, .2, 1);
		will-change: transform;
	}

	.tech-board::after {
		content: '';
		position: absolute;
		z-index: 8;
		inset: 0;
		background: radial-gradient(circle at var(--light-x) var(--light-y), rgba(240, 239, 233, .055), transparent 31%);
		pointer-events: none;
		transform: translateZ(25px);
	}

	.board-plane {
		position: relative;
		overflow: hidden;
		background:
			linear-gradient(rgba(240, 239, 233, .025) 1px, transparent 1px),
			linear-gradient(90deg, rgba(240, 239, 233, .025) 1px, transparent 1px),
			#0d1511;
		background-size: 42px 42px;
		box-shadow: 0 46px 100px rgba(0, 0, 0, .3);
		transform-style: preserve-3d;
	}

	.board-header,
	.board-readout {
		position: relative;
		z-index: 3;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		padding: 0 24px;
		background: rgba(7, 12, 9, .72);
		color: #78817a;
		font: 500 8px var(--font-family-mono);
		letter-spacing: .11em;
		text-transform: uppercase;
		transform: translateZ(6px);
	}

	.board-header { min-height: 62px; border-bottom: 1px solid var(--board-line); }
	.board-header span:first-child { color: var(--color-brass); }

	.logo-grid {
		position: relative;
		z-index: 2;
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		transform-style: preserve-3d;
	}

	.logo-tile {
		position: relative;
		min-width: 0;
		height: 112px;
		padding: 0 22px;
		display: grid;
		grid-template-columns: 52px minmax(0, 1fr);
		align-items: center;
		gap: 15px;
		border: 0;
		border-right: 1px solid var(--board-line);
		border-bottom: 1px solid var(--board-line);
		border-radius: 0;
		background: rgba(9, 16, 12, .44);
		color: inherit;
		text-align: left;
		transform: translateZ(var(--tile-depth));
		transition: background 180ms ease, box-shadow 180ms ease;
		cursor: default;
	}

	.logo-tile:nth-child(6n) { border-right: 0; }
	.logo-tile:hover,
	.logo-tile:focus-visible,
	.logo-tile.active {
		z-index: 4;
		outline: 0;
		background: rgba(36, 52, 44, .76);
		box-shadow: inset 0 -2px var(--color-brass);
	}

	.logo-tile :global(.tech-mark) { width: 46px; height: 46px; }
	.logo-tile > span { min-width: 0; display: flex; flex-direction: column; gap: 7px; }
	.logo-tile strong { overflow: hidden; color: #e8e5de; font-size: 11px; font-weight: 650; text-overflow: ellipsis; white-space: nowrap; }
	.logo-tile small { color: #687169; font: 500 7px var(--font-family-mono); letter-spacing: .08em; text-transform: uppercase; }

	.board-readout {
		min-height: 74px;
		border-top: 0;
		transform: translateZ(10px);
	}

	.board-readout > div { display: flex; align-items: center; gap: 14px; white-space: nowrap; }
	.board-readout span { color: var(--color-brass); }
	.board-readout strong { color: #e8e5de; font-size: 10px; letter-spacing: .04em; }
	.board-readout p { max-width: 560px; margin: 0; color: #7f8881; font: 400 10px/1.45 var(--font-family-sans); letter-spacing: 0; text-align: right; text-transform: none; }

	.method-index {
		min-height: 74px;
		padding: 18px 0;
		display: grid;
		grid-template-columns: 180px minmax(0, 1fr);
		align-items: center;
		gap: 30px;
	}

	.method-index strong { color: var(--color-brass); font: 500 8px var(--font-family-mono); letter-spacing: .1em; text-transform: uppercase; }
	.method-index > div { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 7px 20px; }
	.method-index span { color: #747d77; font-size: 8px; line-height: 1.4; }

	@media (max-width: 900px) {
		.logo-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
		.logo-tile:nth-child(6n) { border-right: 1px solid var(--board-line); }
		.logo-tile:nth-child(4n) { border-right: 0; }
	}

	@media (max-width: 700px) {
		.board-intro,
		.method-index { width: calc(100% - 32px); }
		.board-intro { min-height: 0; padding: 42px 0 34px; grid-template-columns: 1fr; gap: 24px; }
		.board-intro h2 { font-size: 52px; }
		.board-intro > p { font-size: 12px; }
		.board-viewport { padding: 0 10px 40px; perspective: none; }
		.tech-board { width: 100%; transform: none !important; }
		.tech-board::after { display: none; }
		.board-header { min-height: 54px; padding: 0 14px; }
		.logo-tile {
			height: 91px;
			padding: 10px 5px 9px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 7px;
			text-align: center;
			transform: none;
		}
		.logo-tile :global(.tech-mark) { width: 34px; height: 34px; }
		.logo-tile > span { gap: 0; }
		.logo-tile strong { max-width: 78px; font-size: 8px; }
		.logo-tile small { display: none; }
		.board-readout { min-height: 82px; padding: 13px 14px; align-items: flex-start; flex-direction: column; justify-content: center; gap: 8px; transform: none; }
		.board-readout p { text-align: left; font-size: 9px; }
		.method-index { min-height: 0; padding: 22px 0 25px; display: block; }
		.method-index > div { margin-top: 13px; justify-content: flex-start; gap: 7px 15px; }
	}

	@media (prefers-reduced-motion: reduce) {
		.tech-board,
		.logo-tile { transform: none !important; transition: none; }
		.tech-board::after { display: none; }
	}
</style>
