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

	type GridDimensions = {
		columns: number;
		rows: number;
	};

	type GridPosition = {
		column: number;
		row: number;
	};

	let { skills }: { skills: SkillsType } = $props();
	let sectionElement: HTMLElement;
	let fieldElement: HTMLDivElement;
	let tileElements: HTMLButtonElement[] = [];
	let activeIndex = $state(0);

	let motionAllowed = false;
	let reducedMotionActive = false;
	let finePointerActive = false;
	let inView = true;
	let frame = 0;
	let lastFrameTime = 0;
	let currentColumnOffset = 0;
	let currentRowOffset = 0;
	let targetColumnOffset = 0;
	let targetRowOffset = 0;
	let anchorColumnOffset = 0;
	let anchorRowOffset = 0;
	let pointerColumnBias = 0;
	let pointerRowBias = 0;
	let scrollColumnBias = 0;
	let scrollRowBias = 0;
	let edgeColumnVelocity = 0;
	let edgeRowVelocity = 0;
	let pointerInside = false;

	const toolkit: ToolkitItem[] = [
		{ tech: 'Python', label: 'Python', group: 'Language', detail: 'Models, data pipelines, APIs, and automation.' },
		{ tech: 'TypeScript', label: 'TypeScript', group: 'Language', detail: 'Typed product code across frontend and backend systems.' },
		{ tech: 'JavaScript', label: 'JavaScript', group: 'Language', detail: 'Interactive web products and browser tooling.' },
		{ tech: 'R', label: 'R', group: 'Language', detail: 'Statistical analysis, modeling, and research workflows.' },
		{ tech: 'Go', label: 'Go', group: 'Language', detail: 'Fast data collection and production services.' },
		{ tech: 'C++', label: 'C++', group: 'Language', detail: 'Performance-sensitive systems and quantitative engines.' },
		{ tech: 'C', label: 'C', group: 'Language', detail: 'Low-level systems programming and memory-aware code.' },
		{ tech: 'Rust', label: 'Rust', group: 'Language', detail: 'Memory-safe systems software and native applications.' },
		{ tech: 'SQL', label: 'SQL', group: 'Language', detail: 'Relational queries, transformations, and analytical models.' },
		{ tech: 'Bash', label: 'Bash', group: 'Language', detail: 'Shell automation and repeatable development workflows.' },
		{ tech: 'Solidity', label: 'Solidity', group: 'Language', detail: 'Smart contracts and on-chain application logic.' },
		{ tech: 'Swift', label: 'Swift', group: 'Language', detail: 'Native Apple platform applications and utilities.' },

		{ tech: 'Svelte', label: 'Svelte', group: 'Web', detail: 'Fast, focused interfaces with a small runtime footprint.' },
		{ tech: 'Vite', label: 'Vite', group: 'Web', detail: 'Fast frontend development and production build tooling.' },
		{ tech: 'React', label: 'React', group: 'Web', detail: 'Component systems for complex product surfaces.' },
		{ tech: 'Node.js', label: 'Node.js', group: 'Web', detail: 'JavaScript services, tooling, and backend runtimes.' },
		{ tech: 'Next.js', label: 'Next.js', group: 'Web', detail: 'Full-stack React products and server-rendered applications.' },
		{ tech: 'HTML', label: 'HTML', group: 'Web', detail: 'Semantic foundations for accessible web products.' },
		{ tech: 'CSS', label: 'CSS', group: 'Web', detail: 'Responsive layout, visual systems, and interface motion.' },
		{ tech: 'Expo', label: 'Expo', group: 'Web', detail: 'Cross-platform React Native product development.' },
		{ tech: 'Astro', label: 'Astro', group: 'Web', detail: 'Content-driven sites with minimal client JavaScript.' },
		{ tech: 'Three.js', label: 'Three.js', group: 'Web', detail: 'Interactive 3D scenes and WebGL experiences.' },

		{ tech: 'PyTorch', label: 'PyTorch', group: 'Machine learning', detail: 'Neural networks, experimentation, and model training.' },
		{ tech: 'TensorFlow', label: 'TensorFlow', group: 'Machine learning', detail: 'Model development and production inference pipelines.' },
		{ tech: 'CUDA', label: 'CUDA', group: 'Machine learning', detail: 'GPU-accelerated experimentation and model workloads.' },
		{ tech: 'scikit-learn', label: 'scikit-learn', group: 'Machine learning', detail: 'Classical models, preprocessing, and evaluation.' },
		{ tech: 'matplotlib', label: 'matplotlib', group: 'Machine learning', detail: 'Scientific plots and model diagnostics.' },
		{ tech: 'Hugging Face', label: 'Hugging Face', group: 'Machine learning', detail: 'Models, datasets, evaluation, and interactive demos.' },
		{ tech: 'LangChain', label: 'LangChain', group: 'Machine learning', detail: 'Composable LLM applications and retrieval workflows.' },
		{ tech: 'OpenCV', label: 'OpenCV', group: 'Machine learning', detail: 'Computer vision pipelines and image processing.' },
		{ tech: 'JAX', label: 'JAX', group: 'Machine learning', detail: 'Accelerated numerical computing and automatic differentiation.' },
		{ tech: 'Keras', label: 'Keras', group: 'Machine learning', detail: 'High-level neural network prototyping and training.' },
		{ tech: 'Apache Spark', label: 'Apache Spark', group: 'Machine learning', detail: 'Distributed data processing and large-scale analysis.' },
		{ tech: 'Airflow', label: 'Airflow', group: 'Machine learning', detail: 'Scheduled data and machine learning workflows.' },

		{ tech: 'NumPy', label: 'NumPy', group: 'Data & deployment', detail: 'Numerical computing underneath analysis and modeling.' },
		{ tech: 'pandas', label: 'pandas', group: 'Data & deployment', detail: 'Data cleaning, transformation, and analysis pipelines.' },
		{ tech: 'PostgreSQL', label: 'PostgreSQL', group: 'Data & deployment', detail: 'Reliable relational storage for production systems.' },
		{ tech: 'SQLite', label: 'SQLite', group: 'Data & deployment', detail: 'Portable storage for local-first tools and prototypes.' },
		{ tech: 'Redis', label: 'Redis', group: 'Data & deployment', detail: 'Caching, queues, and low-latency application state.' },
		{ tech: 'MongoDB', label: 'MongoDB', group: 'Data & deployment', detail: 'Document storage for flexible application data.' },
		{ tech: 'Vercel', label: 'Vercel', group: 'Data & deployment', detail: 'Web application deployment, delivery, and observability.' },
		{ tech: 'Railway', label: 'Railway', group: 'Data & deployment', detail: 'Application services, databases, and managed deployment.' },

		{ tech: 'FastAPI', label: 'FastAPI', group: 'Backend & infrastructure', detail: 'Typed Python services and production APIs.' },
		{ tech: 'GraphQL', label: 'GraphQL', group: 'Backend & infrastructure', detail: 'Typed application data APIs and client queries.' },
		{ tech: 'Supabase', label: 'Supabase', group: 'Backend & infrastructure', detail: 'Product backends with database, auth, and realtime data.' },
		{ tech: 'Docker', label: 'Docker', group: 'Backend & infrastructure', detail: 'Repeatable development and deployment environments.' },
		{ tech: 'AWS', label: 'AWS', group: 'Backend & infrastructure', detail: 'Cloud systems spanning compute, storage, and delivery.' },
		{ tech: 'Linux', label: 'Linux', group: 'Backend & infrastructure', detail: 'The operating layer behind deployed applications.' },
		{ tech: 'Kafka', label: 'Kafka', group: 'Backend & infrastructure', detail: 'Durable event streams and distributed data movement.' },
		{ tech: 'Drizzle', label: 'Drizzle', group: 'Backend & infrastructure', detail: 'Typed SQL schemas, queries, and migrations.' },

		{ tech: 'Git', label: 'Git', group: 'Workflow', detail: 'Versioned, reviewable delivery from first commit onward.' },
		{ tech: 'GitHub', label: 'GitHub', group: 'Workflow', detail: 'Code review, collaboration, and automated delivery.' },

		{ tech: 'Claude Code', label: 'Claude Code', group: 'Tools', detail: 'Agentic development, codebase reasoning, and implementation.' },
		{ tech: 'Codex', label: 'Codex', group: 'Tools', detail: 'Collaborative software development and repository work.' },
		{ tech: 'VS Code', label: 'VS Code', group: 'Tools', detail: 'Daily editor for software, data, and systems work.' },
		{ tech: 'GitHub Actions', label: 'GitHub Actions', group: 'Tools', detail: 'Automated testing, releases, and delivery workflows.' },
		{ tech: 'Sentry', label: 'Sentry', group: 'Tools', detail: 'Production error monitoring and application diagnostics.' },
		{ tech: 'Figma', label: 'Figma', group: 'Tools', detail: 'Collaborative interface and product design.' },
		{ tech: 'Clerk', label: 'Clerk', group: 'Tools', detail: 'Authentication, user management, and organizations.' },
		{ tech: 'Stripe', label: 'Stripe', group: 'Tools', detail: 'Payments, subscriptions, and billing infrastructure.' },
		{ tech: 'Obsidian', label: 'Obsidian', group: 'Tools', detail: 'Linked technical notes and long-lived project context.' },
		{ tech: 'Notion', label: 'Notion', group: 'Tools', detail: 'Collaborative planning, documentation, and operations.' },
		{ tech: 'n8n', label: 'n8n', group: 'Tools', detail: 'Visual workflow automation across business systems.' }
	];

	const relevanceOrder = [
		'Python', 'TypeScript', 'Svelte', 'React', 'PyTorch', 'FastAPI',
		'PostgreSQL', 'Vercel', 'AWS', 'Supabase', 'Docker', 'GitHub',
		'Claude Code', 'Codex', 'VS Code', 'Next.js', 'Node.js', 'pandas', 'NumPy',
		'scikit-learn', 'TensorFlow', 'Railway', 'Git', 'GitHub Actions',
		'SQL', 'Redis', 'MongoDB', 'JavaScript', 'Drizzle', 'Sentry',
		'Figma', 'Clerk', 'Stripe', 'n8n', 'Hugging Face', 'LangChain',
		'CUDA', 'OpenCV', 'JAX', 'Keras', 'Apache Spark', 'Airflow',
		'GraphQL', 'Three.js', 'Vite', 'HTML', 'CSS',
		'Expo', 'Astro', 'Go', 'C++', 'C', 'Rust', 'Bash',
		'Solidity', 'Swift', 'R', 'matplotlib', 'SQLite', 'Linux',
		'Kafka', 'Obsidian', 'Notion'
	];
	const relevanceRank = new Map(relevanceOrder.map((tech, index) => [tech, index]));
	const logoItems = [...toolkit].sort((a, b) =>
		(relevanceRank.get(a.tech) ?? Number.MAX_SAFE_INTEGER)
		- (relevanceRank.get(b.tech) ?? Number.MAX_SAFE_INTEGER)
	);
	const positionCache = new Map<string, GridPosition[]>();
	const methodItems = $derived(skills.coursework.slice(0, 6));
	const active = $derived(logoItems[activeIndex] ?? toolkit[0]);

	function gridDimensions(): GridDimensions {
		const width = fieldElement?.clientWidth ?? 0;
		const columns = width < 700 ? 7 : width < 1050 ? 9 : 13;
		return { columns, rows: Math.ceil(logoItems.length / columns) };
	}

	function gridPositions(columns: number, rows: number): GridPosition[] {
		const key = `${columns}x${rows}`;
		const cached = positionCache.get(key);
		if (cached) return cached;

		const centerColumn = (columns - 1) / 2;
		const centerRow = (rows - 1) / 2;
		const positions = Array.from({ length: columns * rows }, (_, index) => ({
			column: index % columns,
			row: Math.floor(index / columns)
		})).sort((a, b) => {
			const distanceA = Math.hypot(a.column - centerColumn, a.row - centerRow);
			const distanceB = Math.hypot(b.column - centerColumn, b.row - centerRow);
			if (Math.abs(distanceA - distanceB) > 0.0001) return distanceA - distanceB;
			const verticalA = Math.abs(a.row - centerRow);
			const verticalB = Math.abs(b.row - centerRow);
			if (verticalA !== verticalB) return verticalA - verticalB;
			if (a.row !== b.row) return a.row - b.row;
			return a.column - b.column;
		});

		positionCache.set(key, positions);
		return positions;
	}

	function clamp(value: number, minimum: number, maximum: number) {
		return Math.max(minimum, Math.min(maximum, value));
	}

	function renderLens() {
		if (!fieldElement) return;
		const width = fieldElement.clientWidth;
		const { columns, rows } = gridDimensions();
		const centerColumn = (columns - 1) / 2;
		const centerRow = (rows - 1) / 2;
		const mobileLens = width < 700;
		const compactLens = width < 1050;
		const firstTile = tileElements[0];
		const tileWidth = firstTile?.offsetWidth ?? (mobileLens ? 46 : compactLens ? 72 : 84);
		const tileHeight = firstTile?.offsetHeight ?? (mobileLens ? 46 : compactLens ? 64 : 70);
		const horizontalCap = mobileLens ? 60 : compactLens ? 88 : 96;
		const gapX = Math.min(horizontalCap, Math.max(tileWidth + (mobileLens ? 5 : 7), width / (columns + 0.35)));
		const gapY = tileHeight + (mobileLens ? 5 : 8);
		const positions = gridPositions(columns, rows);

		logoItems.forEach((_, index) => {
			const itemTile = tileElements[index];
			if (!itemTile) return;

			const { column, row } = positions[index];
			const columnDistance = column + currentColumnOffset - centerColumn;
			const rowDistance = row + currentRowOffset - centerRow;
			const normalizedDistance = Math.hypot(
				columnDistance / Math.max(1, columns * 0.51),
				rowDistance / Math.max(1, rows * 0.55)
			);
			const depth = clamp(1 - normalizedDistance, 0, 1);
			const easedDepth = Math.pow(depth, 0.72);
			const scale = 0.54 + easedDepth * 0.46;
			const opacity = 0.22 + Math.pow(depth, 1.12) * 0.78;
			const x = columnDistance * gapX;
			const y = rowDistance * gapY;

			itemTile.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
			itemTile.style.opacity = opacity.toFixed(3);
			itemTile.style.zIndex = `${Math.round(depth * 100)}`;
			itemTile.style.pointerEvents = 'auto';
		});
	}

	function syncTarget() {
		const { columns, rows } = gridDimensions();
		targetColumnOffset = clamp(anchorColumnOffset + pointerColumnBias + scrollColumnBias, -(columns - 1) / 2, (columns - 1) / 2);
		targetRowOffset = clamp(anchorRowOffset + pointerRowBias + scrollRowBias, -(rows - 1) / 2, (rows - 1) / 2);
		requestRender();
	}

	function animateLens(timestamp: number) {
		frame = 0;
		if (!inView) {
			lastFrameTime = 0;
			return;
		}

		const elapsedFrames = lastFrameTime ? Math.min(2.5, (timestamp - lastFrameTime) / 16.667) : 1;
		lastFrameTime = timestamp;
		const edgeDrifting = motionAllowed && finePointerActive && pointerInside
			&& (Math.abs(edgeColumnVelocity) > 0.0001 || Math.abs(edgeRowVelocity) > 0.0001);

		if (edgeDrifting) {
			const { columns, rows } = gridDimensions();
			anchorColumnOffset = clamp(anchorColumnOffset + edgeColumnVelocity * elapsedFrames, -(columns - 1) / 2, (columns - 1) / 2);
			anchorRowOffset = clamp(anchorRowOffset + edgeRowVelocity * elapsedFrames, -(rows - 1) / 2, (rows - 1) / 2);
			targetColumnOffset = clamp(anchorColumnOffset + pointerColumnBias + scrollColumnBias, -(columns - 1) / 2, (columns - 1) / 2);
			targetRowOffset = clamp(anchorRowOffset + pointerRowBias + scrollRowBias, -(rows - 1) / 2, (rows - 1) / 2);
		}

		const columnDelta = targetColumnOffset - currentColumnOffset;
		const rowDelta = targetRowOffset - currentRowOffset;
		const ease = motionAllowed ? 0.13 : 1;
		currentColumnOffset += columnDelta * ease;
		currentRowOffset += rowDelta * ease;
		renderLens();

		if (edgeDrifting || Math.abs(columnDelta) > 0.0005 || Math.abs(rowDelta) > 0.0005) {
			frame = requestAnimationFrame(animateLens);
		} else {
			lastFrameTime = 0;
		}
	}

	function requestRender() {
		if (!frame && inView) frame = requestAnimationFrame(animateLens);
	}

	function centerItem(index: number, instant = false) {
		const { columns, rows } = gridDimensions();
		const { column, row } = gridPositions(columns, rows)[index];
		const centerColumn = (columns - 1) / 2;
		const centerRow = (rows - 1) / 2;
		activeIndex = index;
		pointerColumnBias = 0;
		pointerRowBias = 0;
		edgeColumnVelocity = 0;
		edgeRowVelocity = 0;
		const desiredColumnOffset = centerColumn - column;
		const desiredRowOffset = centerRow - row;
		anchorColumnOffset = desiredColumnOffset - scrollColumnBias;
		anchorRowOffset = desiredRowOffset - scrollRowBias;
		targetColumnOffset = desiredColumnOffset;
		targetRowOffset = desiredRowOffset;

		if (instant || !motionAllowed) {
			currentColumnOffset = targetColumnOffset;
			currentRowOffset = targetRowOffset;
			renderLens();
			return;
		}

		requestRender();
	}

	function handlePointer(event: PointerEvent) {
		if (!motionAllowed || !finePointerActive || event.pointerType === 'touch' || !fieldElement) return;
		const rect = fieldElement.getBoundingClientRect();
		const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
		const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
		const edgeX = Math.max(0, (Math.abs(x) - 0.68) / 0.32);
		const edgeY = Math.max(0, (Math.abs(y) - 0.72) / 0.28);

		pointerInside = true;
		pointerColumnBias = -x * 0.2;
		pointerRowBias = -y * 0.11;
		edgeColumnVelocity = -Math.sign(x) * edgeX * edgeX * 0.013;
		edgeRowVelocity = -Math.sign(y) * edgeY * edgeY * 0.008;
		syncTarget();
	}

	function resetPointer() {
		pointerInside = false;
		pointerColumnBias = 0;
		pointerRowBias = 0;
		edgeColumnVelocity = 0;
		edgeRowVelocity = 0;
		syncTarget();
	}

	function handleViewportScroll() {
		if (!fieldElement) return;
		const isMobile = fieldElement.clientWidth < 700;
		let nextColumnBias = 0;
		let nextRowBias = 0;

		if (isMobile && !reducedMotionActive) {
			const rect = fieldElement.getBoundingClientRect();
			const travel = window.innerHeight + rect.height;
			const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / travel));
			nextColumnBias = Math.sin((progress - 0.5) * Math.PI) * 0.26;
			nextRowBias = (progress - 0.5) * 0.9;
		}

		if (Math.abs(nextColumnBias - scrollColumnBias) < 0.0005
			&& Math.abs(nextRowBias - scrollRowBias) < 0.0005) return;
		scrollColumnBias = nextColumnBias;
		scrollRowBias = nextRowBias;
		syncTarget();
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

	function handleFocus(event: FocusEvent, index: number) {
		const tile = event.currentTarget as HTMLButtonElement;
		if (tile.matches(':focus-visible')) centerItem(index);
	}

	onMount(() => {
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
		const updateMotion = () => {
			reducedMotionActive = reducedMotion.matches;
			finePointerActive = finePointer.matches;
			motionAllowed = !reducedMotionActive;
			if (!finePointerActive) resetPointer();
			if (reducedMotionActive) {
				scrollColumnBias = 0;
				scrollRowBias = 0;
				centerItem(activeIndex, true);
			} else {
				handleViewportScroll();
			}
		};

		const resizeObserver = new ResizeObserver(() => {
			centerItem(activeIndex, true);
			handleViewportScroll();
		});
		const intersectionObserver = new IntersectionObserver(([entry]) => {
			inView = entry.isIntersecting;
			if (inView) requestRender();
			else if (frame) {
				cancelAnimationFrame(frame);
				frame = 0;
				lastFrameTime = 0;
			}
		}, { rootMargin: '160px 0px' });

		updateMotion();
		centerItem(0, true);
		resizeObserver.observe(fieldElement);
		intersectionObserver.observe(sectionElement);
		reducedMotion.addEventListener('change', updateMotion);
		finePointer.addEventListener('change', updateMotion);
		window.addEventListener('scroll', handleViewportScroll, { passive: true });
		handleViewportScroll();

		return () => {
			if (frame) cancelAnimationFrame(frame);
			resizeObserver.disconnect();
			intersectionObserver.disconnect();
			reducedMotion.removeEventListener('change', updateMotion);
			finePointer.removeEventListener('change', updateMotion);
			window.removeEventListener('scroll', handleViewportScroll);
		};
	});
</script>

<section id="skills" class="skills-sphere-section" bind:this={sectionElement}>
	<div class="sphere-intro">
		<div>
			<p class="section-label">Stack</p>
			<h2>Technical Skills and Technologies.</h2>
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
			<span class="desktop-instruction">Move or hold an edge to explore</span>
			<span class="mobile-instruction">Scroll to explore</span>
			<span>{logoItems.length} technologies · select a mark to hold it</span>
		</div>
		<div class="sphere-cloud">
			{#each logoItems as item, index}
				<button
					type="button"
					class="sphere-tile"
					class:active={activeIndex === index}
					bind:this={tileElements[index]}
					onclick={() => centerItem(index)}
					onfocus={(event) => handleFocus(event, index)}
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
		--field-border: rgba(15, 18, 16, .12);
		--field-background: radial-gradient(ellipse 54% 68% at 50% 51%, rgba(255, 255, 255, .98), rgba(242, 240, 235, .88) 61%, rgba(229, 227, 221, .78) 100%), #e8e6e1;
		--field-instruction: #777872;
		--field-instruction-accent: #775f3c;
		--tile-background: rgba(252, 251, 248, .96);
		--tile-background-active: #fffefb;
		--tile-border: rgba(24, 28, 25, .08);
		--tile-border-hover: rgba(84, 70, 49, .34);
		--tile-shadow: 0 8px 24px rgba(29, 32, 29, .055);
		--tile-shadow-hover: 0 12px 30px rgba(29, 32, 29, .1);
		--tile-shadow-active: 0 15px 34px rgba(29, 32, 29, .13), inset 0 -3px #a5895e;
		--sphere-mark-color: #151815;
		position: relative;
		overflow: hidden;
		border-top: 1px solid var(--sphere-line);
		border-bottom: 1px solid var(--sphere-line);
		background: #090f0c;
		color: var(--color-cream);
		contain: layout paint;
	}

	:global(html.dark) .skills-sphere-section {
		--field-border: rgba(240, 239, 233, .1);
		--field-background: radial-gradient(ellipse 56% 70% at 50% 51%, rgba(48, 57, 51, .98), rgba(21, 27, 23, .97) 62%, rgba(8, 11, 9, .99) 100%), #080b09;
		--field-instruction: #9aa29c;
		--field-instruction-accent: #c0a36e;
		--tile-background: rgba(239, 237, 230, .96);
		--tile-background-active: #fffdf7;
		--tile-border: rgba(240, 239, 233, .14);
		--tile-border-hover: rgba(192, 163, 110, .6);
		--tile-shadow: 0 12px 30px rgba(0, 0, 0, .22);
		--tile-shadow-hover: 0 16px 36px rgba(0, 0, 0, .34);
		--tile-shadow-active: 0 18px 42px rgba(0, 0, 0, .4), inset 0 -3px #b49a67;
		--sphere-mark-color: #101411;
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
		height: clamp(470px, 38vw, 540px);
		overflow: hidden;
		border-top: 1px solid var(--field-border);
		border-bottom: 1px solid var(--field-border);
		background: var(--field-background);
		isolation: isolate;
		touch-action: pan-y;
		transition: background 220ms ease, border-color 220ms ease;
	}

	.field-instruction {
		position: absolute;
		z-index: 120;
		top: 22px;
		left: 40px;
		right: 40px;
		display: flex;
		justify-content: space-between;
		color: var(--field-instruction);
		font: 600 8px var(--font-family-mono);
		letter-spacing: .1em;
		text-transform: uppercase;
		pointer-events: none;
	}

	.field-instruction span:first-child { color: var(--field-instruction-accent); }
	.mobile-instruction { display: none; }

	.sphere-cloud {
		position: absolute;
		z-index: 2;
		inset: 0;
		mask-image: radial-gradient(ellipse 86% 88% at 50% 51%, black 48%, rgba(0, 0, 0, .96) 72%, rgba(0, 0, 0, .7) 100%);
	}

	.sphere-tile {
		position: absolute;
		left: 50%;
		top: 50%;
		width: clamp(74px, 6.4vw, 84px);
		height: 70px;
		padding: 0;
		border: 0;
		border-radius: 16px;
		background: transparent;
		color: var(--sphere-mark-color);
		cursor: pointer;
		opacity: 0;
		will-change: transform, opacity;
	}

	.tile-face {
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
		border: 1px solid var(--tile-border);
		border-radius: 16px;
		background: var(--tile-background);
		box-shadow: var(--tile-shadow);
		transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
	}

	.sphere-tile :global(.tech-mark) {
		--tech-brand: var(--sphere-mark-color) !important;
		width: 48px;
		height: 48px;
	}

	.sphere-tile:hover .tile-face,
	.sphere-tile:focus-visible .tile-face {
		transform: scale(1.055);
		border-color: var(--tile-border-hover);
		box-shadow: var(--tile-shadow-hover);
	}
	.sphere-tile:focus-visible { outline: none; }
	.sphere-tile.active .tile-face {
		border-color: #9a7c50;
		background: var(--tile-background-active);
		box-shadow: var(--tile-shadow-active);
	}

	.sphere-readout {
		min-height: 116px;
		padding: 25px 0 27px;
		display: grid;
		grid-template-columns: minmax(260px, .7fr) minmax(300px, 1fr);
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

	@media (min-width: 701px) and (max-width: 1050px) {
		.sphere-intro,
		.sphere-readout,
		.method-index { width: calc(100% - 48px); }
		.sphere-intro { gap: 44px; }
		.sphere-field { height: clamp(500px, 58vw, 560px); }
		.field-instruction { left: 24px; right: 24px; }
		.sphere-tile { width: clamp(66px, 8vw, 72px); height: 64px; border-radius: 14px; }
		.tile-face { border-radius: 14px; }
		.sphere-tile :global(.tech-mark) { width: 40px; height: 40px; }
	}

	@media (max-width: 700px) {
		.sphere-intro,
		.sphere-readout,
		.method-index { width: calc(100% - 32px); }
		.sphere-intro { min-height: 0; padding: 42px 0 34px; grid-template-columns: 1fr; gap: 24px; }
		.sphere-intro h2 { font-size: 52px; }
		.sphere-intro > p { font-size: 12px; }
		.sphere-field { height: 460px; }
		.field-instruction { top: 17px; left: 16px; right: 16px; }
		.desktop-instruction { display: none; }
		.mobile-instruction { display: inline; }
		.field-instruction span:last-child { display: none; }
		.sphere-cloud { mask-image: radial-gradient(ellipse 100% 90% at 50% 51%, black 48%, rgba(0, 0, 0, .94) 72%, rgba(0, 0, 0, .68) 100%); }
		.sphere-tile { width: clamp(44px, 12vw, 52px); height: clamp(42px, 11vw, 48px); border-radius: 12px; }
		.tile-face { border-radius: 12px; }
		.sphere-tile :global(.tech-mark) { width: 29px; height: 29px; }
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
