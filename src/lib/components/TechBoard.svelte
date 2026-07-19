<script lang="ts">
	import { onMount } from 'svelte';
	import type { Skills as SkillsType } from '$lib/types';
	import TechMark from './TechMark.svelte';

	type ToolkitItem = {
		tech: string;
		label: string;
		group: string;
		detail: string;
	};

	type SpherePoint = {
		x: number;
		y: number;
		z: number;
	};

	let { skills }: { skills: SkillsType } = $props();
	let sectionElement: HTMLElement;
	let fieldElement: HTMLDivElement;
	let tileElements: HTMLButtonElement[] = [];
	let activeIndex = $state(0);

	let motionAllowed = false;
	let inView = true;
	let frame = 0;
	let currentYaw = 0;
	let currentPitch = 0;
	let targetYaw = 0;
	let targetPitch = 0;
	let anchorYaw = 0;
	let anchorPitch = 0;

	const toolkit: ToolkitItem[] = [
		{ tech: 'Python', label: 'Python', group: 'Language', detail: 'Models, data pipelines, APIs, and automation.' },
		{ tech: 'TypeScript', label: 'TypeScript', group: 'Language', detail: 'Typed product code across frontend and backend systems.' },
		{ tech: 'JavaScript', label: 'JavaScript', group: 'Language', detail: 'Interactive web products and browser tooling.' },
		{ tech: 'R', label: 'R', group: 'Language', detail: 'Statistical analysis, modeling, and research workflows.' },
		{ tech: 'Go', label: 'Go', group: 'Language', detail: 'Fast data collection and production services.' },
		{ tech: 'C++', label: 'C++', group: 'Language', detail: 'Performance-sensitive systems and quantitative engines.' },
		{ tech: 'Svelte', label: 'Svelte', group: 'Interface', detail: 'Fast, focused interfaces with a small runtime footprint.' },
		{ tech: 'React', label: 'React', group: 'Interface', detail: 'Component systems for complex product surfaces.' },
		{ tech: 'PyTorch', label: 'PyTorch', group: 'Machine learning', detail: 'Neural networks, experimentation, and model training.' },
		{ tech: 'NumPy', label: 'NumPy', group: 'Data', detail: 'Numerical computing underneath analysis and modeling.' },
		{ tech: 'pandas', label: 'pandas', group: 'Data', detail: 'Data cleaning, transformation, and analysis pipelines.' },
		{ tech: 'FastAPI', label: 'FastAPI', group: 'Backend', detail: 'Typed Python services and production APIs.' },
		{ tech: 'PostgreSQL', label: 'PostgreSQL', group: 'Data', detail: 'Reliable relational storage for production systems.' },
		{ tech: 'SQLite', label: 'SQLite', group: 'Data', detail: 'Portable storage for local-first tools and prototypes.' },
		{ tech: 'Redis', label: 'Redis', group: 'Infrastructure', detail: 'Caching, queues, and low-latency application state.' },
		{ tech: 'Supabase', label: 'Supabase', group: 'Infrastructure', detail: 'Product backends with database, auth, and realtime data.' },
		{ tech: 'Docker', label: 'Docker', group: 'Infrastructure', detail: 'Repeatable development and deployment environments.' },
		{ tech: 'AWS', label: 'AWS', group: 'Infrastructure', detail: 'Cloud systems spanning compute, storage, and delivery.' },
		{ tech: 'Linux', label: 'Linux', group: 'Systems', detail: 'The operating layer behind deployed applications.' },
		{ tech: 'Git', label: 'Git', group: 'Workflow', detail: 'Versioned, reviewable delivery from first commit onward.' },
		{ tech: 'GitHub', label: 'GitHub', group: 'Workflow', detail: 'Code review, collaboration, and automated delivery.' },
		{ tech: 'Streamlit', label: 'Streamlit', group: 'Product', detail: 'Fast analytical tools that put models in front of users.' },
		{ tech: 'CUDA', label: 'CUDA', group: 'Machine learning', detail: 'GPU-accelerated experimentation and model workloads.' },
		{ tech: 'Google OR-Tools', label: 'OR-Tools', group: 'Optimization', detail: 'Constraint solvers for scheduling and recommendation systems.' }
	];

	const available = $derived(new Set([...skills.languages, ...skills.technologies, 'GitHub']));
	const logoItems = $derived(toolkit.filter((item) => available.has(item.tech)));
	const points = $derived(createSpherePoints(logoItems.length));
	const methodItems = $derived(skills.coursework.slice(0, 6));
	const active = $derived(logoItems[activeIndex] ?? toolkit[0]);

	function createSpherePoints(count: number): SpherePoint[] {
		const goldenAngle = Math.PI * (3 - Math.sqrt(5));
		return Array.from({ length: count }, (_, index) => {
			const y = 1 - ((index + 0.5) / count) * 2;
			const radius = Math.sqrt(Math.max(0, 1 - y * y));
			const angle = index * goldenAngle;
			return {
				x: Math.cos(angle) * radius,
				y,
				z: Math.sin(angle) * radius
			};
		}).sort((a, b) => b.z - a.z);
	}

	function angleDifference(from: number, to: number) {
		return Math.atan2(Math.sin(to - from), Math.cos(to - from));
	}

	function renderSphere() {
		if (!fieldElement) return;
		const width = fieldElement.clientWidth;
		const height = fieldElement.clientHeight;
		const radiusX = width * (width < 700 ? 0.54 : 0.5);
		const radiusY = height * (width < 700 ? 0.43 : 0.48);
		const cosYaw = Math.cos(currentYaw);
		const sinYaw = Math.sin(currentYaw);
		const cosPitch = Math.cos(currentPitch);
		const sinPitch = Math.sin(currentPitch);

		points.forEach((point, index) => {
			const tile = tileElements[index];
			if (!tile) return;

			const xAfterYaw = point.x * cosYaw + point.z * sinYaw;
			const zAfterYaw = -point.x * sinYaw + point.z * cosYaw;
			const yAfterPitch = point.y * cosPitch - zAfterYaw * sinPitch;
			const zAfterPitch = point.y * sinPitch + zAfterYaw * cosPitch;
			const depth = Math.max(0, Math.min(1, (zAfterPitch + 1) / 2));
			const scale = 0.36 + Math.pow(depth, 1.55) * 0.94;
			const opacity = 0.06 + Math.pow(depth, 1.8) * 0.94;
			const x = xAfterYaw * radiusX;
			const y = -yAfterPitch * radiusY;

			tile.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
			tile.style.opacity = opacity.toFixed(3);
			tile.style.zIndex = `${Math.round(depth * 100)}`;
			tile.style.pointerEvents = zAfterPitch < -0.38 ? 'none' : 'auto';
		});
	}

	function animateSphere() {
		frame = 0;
		if (!inView) return;

		const yawDelta = angleDifference(currentYaw, targetYaw);
		const pitchDelta = targetPitch - currentPitch;
		const ease = motionAllowed ? 0.115 : 1;
		currentYaw += yawDelta * ease;
		currentPitch += pitchDelta * ease;
		renderSphere();

		if (Math.abs(yawDelta) > 0.0005 || Math.abs(pitchDelta) > 0.0005) {
			frame = requestAnimationFrame(animateSphere);
		}
	}

	function requestRender() {
		if (!frame && inView) frame = requestAnimationFrame(animateSphere);
	}

	function centerItem(index: number, instant = false) {
		const point = points[index];
		if (!point) return;
		activeIndex = index;
		anchorYaw = -Math.atan2(point.x, point.z);
		anchorPitch = Math.atan2(point.y, Math.hypot(point.x, point.z));
		targetYaw = anchorYaw;
		targetPitch = anchorPitch;

		if (instant || !motionAllowed) {
			currentYaw = targetYaw;
			currentPitch = targetPitch;
			renderSphere();
			return;
		}

		requestRender();
	}

	function handlePointer(event: PointerEvent) {
		if (!motionAllowed || event.pointerType === 'touch' || !fieldElement) return;
		const rect = fieldElement.getBoundingClientRect();
		const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
		const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
		targetYaw = anchorYaw + x * 0.2;
		targetPitch = anchorPitch - y * 0.13;
		requestRender();
	}

	function resetPointer() {
		targetYaw = anchorYaw;
		targetPitch = anchorPitch;
		requestRender();
	}

	function handleKeydown(event: KeyboardEvent, index: number) {
		const last = logoItems.length - 1;
		let next = index;
		if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = index === last ? 0 : index + 1;
		else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = index === 0 ? last : index - 1;
		else if (event.key === 'Home') next = 0;
		else if (event.key === 'End') next = last;
		else return;

		event.preventDefault();
		centerItem(next);
		requestAnimationFrame(() => tileElements[next]?.focus());
	}

	onMount(() => {
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
		const updateMotion = () => {
			motionAllowed = !reducedMotion.matches && finePointer.matches;
			if (!motionAllowed) centerItem(activeIndex, true);
		};

		const resizeObserver = new ResizeObserver(() => renderSphere());
		const intersectionObserver = new IntersectionObserver(([entry]) => {
			inView = entry.isIntersecting;
			if (inView) requestRender();
			else if (frame) {
				cancelAnimationFrame(frame);
				frame = 0;
			}
		}, { rootMargin: '160px 0px' });

		updateMotion();
		centerItem(0, true);
		resizeObserver.observe(fieldElement);
		intersectionObserver.observe(sectionElement);
		reducedMotion.addEventListener('change', updateMotion);
		finePointer.addEventListener('change', updateMotion);

		return () => {
			if (frame) cancelAnimationFrame(frame);
			resizeObserver.disconnect();
			intersectionObserver.disconnect();
			reducedMotion.removeEventListener('change', updateMotion);
			finePointer.removeEventListener('change', updateMotion);
		};
	});
</script>

<section id="skills" class="skills-sphere-section" bind:this={sectionElement}>
	<div class="sphere-intro">
		<div>
			<p class="section-label">Technical range</p>
			<h2>From first model to production.</h2>
		</div>
		<p>I choose the stack around the problem, then stay with it through deployment, iteration, and maintenance.</p>
	</div>

	<div
		class="sphere-field"
		bind:this={fieldElement}
		onpointermove={handlePointer}
		onpointerleave={resetPointer}
		aria-label="Interactive technology toolkit"
	>
		<div class="field-instruction" aria-hidden="true">
			<span>Move to explore</span>
			<span>Select a mark to hold it</span>
		</div>
		<div class="sphere-cloud">
			{#each logoItems as item, index}
				<button
					type="button"
					class="sphere-tile"
					class:active={activeIndex === index}
					bind:this={tileElements[index]}
					onclick={() => centerItem(index)}
					onfocus={() => centerItem(index)}
					onkeydown={(event) => handleKeydown(event, index)}
					aria-pressed={activeIndex === index}
					aria-label={`${item.label}. ${item.group}. ${item.detail}`}
				>
					<span class="tile-face"><TechMark tech={item.tech} size="feature" framed={false} /></span>
				</button>
			{/each}
		</div>
	</div>

	<div class="sphere-readout" aria-live="polite">
		<div>
			<span>{active.group}</span>
			<strong>{active.label}</strong>
		</div>
		<p>{active.detail}</p>
	</div>

	<div class="method-index">
		<strong>Methods underneath</strong>
		<div>{#each methodItems as method}<span>{method}</span>{/each}</div>
	</div>
</section>

<style>
	.skills-sphere-section {
		--sphere-line: rgba(240, 239, 233, .13);
		position: relative;
		overflow: hidden;
		border-top: 1px solid var(--sphere-line);
		border-bottom: 1px solid var(--sphere-line);
		background: #090f0c;
		color: var(--color-cream);
		contain: layout paint;
	}

	.sphere-intro,
	.sphere-readout,
	.method-index {
		width: min(1320px, calc(100% - 80px));
		margin: 0 auto;
	}

	.sphere-intro {
		min-height: 218px;
		padding: 46px 0 40px;
		display: grid;
		grid-template-columns: minmax(0, 1.25fr) minmax(280px, .75fr);
		align-items: end;
		gap: 80px;
	}

	.sphere-intro h2 {
		max-width: 800px;
		margin: 18px 0 0;
		font: 400 clamp(48px, 5.6vw, 82px)/.87 var(--font-family-display);
		letter-spacing: -.045em;
	}

	.sphere-intro > p {
		max-width: 430px;
		margin: 0 0 8px;
		color: #9ba39d;
		font-size: 13px;
		line-height: 1.7;
	}

	.sphere-field {
		position: relative;
		height: clamp(520px, 49vw, 680px);
		overflow: hidden;
		border-top: 1px solid var(--sphere-line);
		border-bottom: 1px solid var(--sphere-line);
		background:
			radial-gradient(ellipse 42% 48% at 50% 50%, rgba(60, 77, 66, .32), transparent 75%),
			linear-gradient(180deg, #0a100d, #07100b 55%, #090e0b);
		isolation: isolate;
		touch-action: manipulation;
	}

	.sphere-field::before {
		content: '';
		position: absolute;
		z-index: 0;
		inset: 0;
		background:
			linear-gradient(rgba(240, 239, 233, .022) 1px, transparent 1px),
			linear-gradient(90deg, rgba(240, 239, 233, .018) 1px, transparent 1px);
		background-size: 76px 76px;
		mask-image: radial-gradient(ellipse 72% 78% at 50% 50%, black, transparent 82%);
		pointer-events: none;
	}

	.field-instruction {
		position: absolute;
		z-index: 120;
		top: 24px;
		left: 40px;
		right: 40px;
		display: flex;
		justify-content: space-between;
		color: #6f7972;
		font: 500 8px var(--font-family-mono);
		letter-spacing: .1em;
		text-transform: uppercase;
		pointer-events: none;
	}

	.field-instruction span:first-child { color: var(--color-brass); }

	.sphere-cloud {
		position: absolute;
		z-index: 2;
		inset: 0;
		mask-image: radial-gradient(ellipse 72% 68% at 50% 50%, black 42%, rgba(0, 0, 0, .94) 58%, rgba(0, 0, 0, .18) 84%, transparent 100%);
	}

	.sphere-tile {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 112px;
		height: 96px;
		padding: 0;
		border: 0;
		border-radius: 2px;
		background: transparent;
		color: inherit;
		cursor: pointer;
		opacity: 0;
		will-change: transform, opacity;
	}

	.tile-face {
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
		border: 1px solid rgba(240, 239, 233, .14);
		border-radius: 2px;
		background: rgba(18, 26, 21, .94);
		box-shadow: 0 18px 42px rgba(0, 0, 0, .24);
		transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
	}

	.sphere-tile :global(.tech-mark) { width: 54px; height: 54px; }

	.sphere-tile:hover .tile-face,
	.sphere-tile:focus-visible .tile-face { transform: scale(1.1); border-color: rgba(240, 239, 233, .42); }
	.sphere-tile:focus-visible { outline: none; }
	.sphere-tile.active .tile-face {
		border-color: var(--color-brass);
		background: rgba(31, 42, 35, .98);
		box-shadow: 0 24px 60px rgba(0, 0, 0, .34), inset 0 -2px var(--color-brass);
	}

	.sphere-readout {
		min-height: 116px;
		padding: 25px 0 27px;
		display: grid;
		grid-template-columns: minmax(220px, .7fr) minmax(300px, 1fr);
		align-items: center;
		gap: 70px;
	}

	.sphere-readout > div { display: flex; align-items: baseline; gap: 18px; }
	.sphere-readout span {
		color: var(--color-brass);
		font: 500 8px var(--font-family-mono);
		letter-spacing: .1em;
		text-transform: uppercase;
	}
	.sphere-readout strong { color: #ece9e2; font: 400 34px/.95 var(--font-family-display); letter-spacing: -.02em; }
	.sphere-readout p { max-width: 620px; margin: 0; color: #919a93; font-size: 12px; line-height: 1.6; }

	.method-index {
		min-height: 74px;
		padding: 18px 0;
		display: grid;
		grid-template-columns: 180px minmax(0, 1fr);
		align-items: center;
		gap: 30px;
		border-top: 1px solid var(--sphere-line);
	}

	.method-index strong { color: var(--color-brass); font: 500 8px var(--font-family-mono); letter-spacing: .1em; text-transform: uppercase; }
	.method-index > div { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 7px 20px; }
	.method-index span { color: #747d77; font-size: 8px; line-height: 1.4; }

	@media (max-width: 700px) {
		.sphere-intro,
		.sphere-readout,
		.method-index { width: calc(100% - 32px); }
		.sphere-intro { min-height: 0; padding: 42px 0 34px; grid-template-columns: 1fr; gap: 24px; }
		.sphere-intro h2 { font-size: 52px; }
		.sphere-intro > p { font-size: 12px; }
		.sphere-field { height: 450px; }
		.field-instruction { top: 18px; left: 16px; right: 16px; }
		.field-instruction span:last-child { display: none; }
		.sphere-cloud { mask-image: radial-gradient(ellipse 88% 70% at 50% 50%, black 40%, rgba(0, 0, 0, .9) 62%, rgba(0, 0, 0, .16) 88%, transparent 100%); }
		.sphere-tile { width: 78px; height: 68px; }
		.sphere-tile :global(.tech-mark) { width: 39px; height: 39px; }
		.sphere-readout { min-height: 148px; padding: 22px 0 25px; grid-template-columns: 1fr; gap: 12px; }
		.sphere-readout > div { gap: 14px; }
		.sphere-readout strong { font-size: 30px; }
		.sphere-readout p { font-size: 10px; }
		.method-index { min-height: 0; padding: 22px 0 25px; display: block; }
		.method-index > div { margin-top: 13px; justify-content: flex-start; gap: 7px 15px; }
	}

	@media (prefers-reduced-motion: reduce) {
		.sphere-tile,
		.tile-face { transition: none; }
	}
</style>
