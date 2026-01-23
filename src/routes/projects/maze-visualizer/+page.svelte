<script lang="ts">
	import MazeVisualizer from '$lib/components/visualizers/MazeVisualizer.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let mounted = $state(false);
	let comparisonMode = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Maze Visualizer | Jack Lutz</title>
	<meta
		name="description"
		content="Interactive visualization of maze generation and pathfinding algorithms. Watch DFS, BFS, Dijkstra, and A* solve mazes generated with Recursive Backtracking, Prim's, and Kruskal's algorithms."
	/>
</svelte:head>

<div class="page">
	<!-- Hero Section -->
	<section class="hero">
		<div class="hero-bg">
			<div class="hero-gradient"></div>
			<div class="hero-grid"></div>
		</div>

		<div class="hero-content">
			{#if mounted}
				<a href="/" class="back-link" in:fly={{ y: 20, duration: 400, delay: 0 }}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M19 12H5M12 19l-7-7 7-7" />
					</svg>
					Back to Portfolio
				</a>

				<span class="label" in:fly={{ y: 20, duration: 600, delay: 100 }}>Interactive Demo</span>

				<h1 in:fly={{ y: 30, duration: 600, delay: 200 }}>
					Maze Generation &<br />
					<span class="gradient-text">Pathfinding Visualizer</span>
				</h1>

				<p class="tagline" in:fly={{ y: 30, duration: 600, delay: 300 }}>
					Generate mazes using 3 different algorithms, then watch 4 pathfinding algorithms race to
					find the solution. Compare solvers side-by-side to see which finds the path fastest.
				</p>

				<div class="mode-toggle" in:fly={{ y: 30, duration: 600, delay: 400 }}>
					<button class="mode-btn" class:active={!comparisonMode} onclick={() => (comparisonMode = false)}>
						Single Mode
					</button>
					<button class="mode-btn" class:active={comparisonMode} onclick={() => (comparisonMode = true)}>
						Comparison Mode
					</button>
				</div>
			{/if}
		</div>
	</section>

	<!-- Visualizer Section -->
	<section class="visualizer-section">
		<div class="visualizer-container">
			{#key comparisonMode}
				<MazeVisualizer {comparisonMode} />
			{/key}
		</div>
	</section>

	<!-- Info Section -->
	<section class="info-section">
		<div class="container">
			<div class="info-row">
				<div class="info-column">
					<h2>Generation Algorithms</h2>

					<div class="algo-card">
						<h3>Recursive Backtracking (DFS)</h3>
						<p>
							Creates long, winding corridors with few dead ends. Uses a stack to backtrack when it
							reaches a dead end, creating a perfect maze with exactly one path between any two
							points.
						</p>
					</div>

					<div class="algo-card">
						<h3>Prim's Algorithm</h3>
						<p>
							Starts from a single cell and grows the maze by randomly adding frontier cells.
							Creates mazes with more branching patterns and shorter dead ends than DFS.
						</p>
					</div>

					<div class="algo-card">
						<h3>Kruskal's Algorithm</h3>
						<p>
							Uses Union-Find to randomly connect cells while avoiding cycles. Creates mazes with a
							more uniform distribution of passage lengths and even branching.
						</p>
					</div>
				</div>

				<div class="info-column">
					<h2>Solving Algorithms</h2>

					<div class="algo-card">
						<h3>Depth-First Search (DFS)</h3>
						<p>
							Explores as deep as possible before backtracking. Fast but doesn't guarantee the
							shortest path. Can get lucky or unlucky depending on the maze structure.
						</p>
					</div>

					<div class="algo-card">
						<h3>Breadth-First Search (BFS)</h3>
						<p>
							Explores all neighbors at the current depth before moving deeper. Always finds the
							shortest path in unweighted graphs. Expands uniformly in all directions.
						</p>
					</div>

					<div class="algo-card">
						<h3>Dijkstra's Algorithm</h3>
						<p>
							Uses a priority queue to always expand the lowest-cost path first. In a maze with
							uniform weights, behaves like BFS but demonstrates the weighted graph approach.
						</p>
					</div>

					<div class="algo-card">
						<h3>A* Search</h3>
						<p>
							Combines Dijkstra's approach with a heuristic (Manhattan distance) to guide the search
							toward the goal. Often explores fewer cells than BFS while still finding the shortest
							path.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Back Link -->
	<div class="back-section">
		<a href="/" class="back-link-bottom">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M19 12H5M12 19l-7-7 7-7" />
			</svg>
			Back to Portfolio
		</a>
	</div>
</div>

<style>
	.page {
		--bg-primary: var(--color-background);
		--bg-secondary: var(--color-surface);
		--bg-elevated: var(--color-surface-hover);
		--bg-card: var(--color-surface);

		--accent: var(--color-accent);
		--accent-hover: var(--color-accent-hover);
		--accent-dim: rgba(16, 185, 129, 0.1);
		--accent-glow: rgba(16, 185, 129, 0.15);

		--text-primary: var(--color-text-primary);
		--text-secondary: var(--color-text-secondary);
		--text-muted: var(--color-text-secondary);

		--border: var(--color-border);
		--border-subtle: var(--color-border);

		background-color: var(--bg-primary);
		color: var(--text-primary);
		min-height: 100vh;
	}

	/* Hero */
	.hero {
		min-height: 50vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		padding: 4rem 1.5rem 3rem;
		overflow: hidden;
	}

	.hero-bg {
		position: absolute;
		inset: 0;
		z-index: 0;
	}

	.hero-gradient {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse 80% 50% at 50% -20%, var(--accent-glow), transparent),
			radial-gradient(ellipse 60% 40% at 80% 60%, rgba(59, 130, 246, 0.08), transparent);
	}

	.hero-grid {
		position: absolute;
		inset: 0;
		background-image: linear-gradient(var(--border-subtle) 1px, transparent 1px),
			linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px);
		background-size: 60px 60px;
		mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent);
	}

	.hero-content {
		position: relative;
		z-index: 1;
		text-align: center;
		max-width: 800px;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--text-muted);
		text-decoration: none;
		font-size: 0.875rem;
		margin-bottom: 2rem;
		transition: color 0.2s;
	}

	.back-link:hover {
		color: var(--accent);
	}

	.label {
		display: inline-block;
		font-family: var(--font-family-mono);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--accent);
		margin-bottom: 1rem;
		padding: 0.5rem 1rem;
		background: var(--accent-dim);
		border: 1px solid rgba(16, 185, 129, 0.2);
		border-radius: 9999px;
	}

	h1 {
		font-size: clamp(2rem, 6vw, 3.5rem);
		font-weight: 700;
		line-height: 1.1;
		margin-bottom: 1rem;
		letter-spacing: -0.02em;
	}

	.gradient-text {
		background: linear-gradient(135deg, var(--accent) 0%, #34d399 50%, #3b82f6 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.tagline {
		font-size: 1.125rem;
		color: var(--text-secondary);
		max-width: 600px;
		margin: 0 auto 2rem;
		line-height: 1.7;
	}

	.mode-toggle {
		display: flex;
		gap: 0.5rem;
		justify-content: center;
	}

	.mode-btn {
		padding: 0.75rem 1.5rem;
		border: 1px solid var(--border);
		border-radius: 8px;
		background: transparent;
		color: var(--text-secondary);
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.mode-btn:hover {
		border-color: var(--accent);
		color: var(--accent);
	}

	.mode-btn.active {
		background: var(--accent);
		border-color: var(--accent);
		color: #000;
	}

	/* Visualizer */
	.visualizer-section {
		padding: 0 1rem 3rem;
	}

	.visualizer-container {
		max-width: 1400px;
		margin: 0 auto;
	}

	/* Info Section */
	.info-section {
		padding: 4rem 1.5rem;
		background: var(--bg-secondary);
		border-top: 1px solid var(--border);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.info-row {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 3rem;
	}

	.info-column h2 {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 1.5rem;
		color: var(--accent);
	}

	.algo-card {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 1.25rem;
		margin-bottom: 1rem;
		transition: all 0.2s;
	}

	.algo-card:hover {
		border-color: var(--accent);
		transform: translateY(-2px);
	}

	.algo-card h3 {
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.algo-card p {
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	/* Back Section */
	.back-section {
		padding: 3rem 1.5rem;
		text-align: center;
		border-top: 1px solid var(--border);
		background: var(--bg-primary);
	}

	.back-link-bottom {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--text-muted);
		text-decoration: none;
		font-size: 0.875rem;
		transition: color 0.2s;
	}

	.back-link-bottom:hover {
		color: var(--accent);
	}

	@media (max-width: 768px) {
		.hero {
			padding-top: 3rem;
		}

		.visualizer-container {
			height: 550px;
		}

		.mode-toggle {
			flex-direction: column;
			width: 100%;
			max-width: 300px;
		}

		.mode-btn {
			width: 100%;
		}

		.info-row {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}
</style>
