<script lang="ts">
	import SortingVisualizer from '$lib/components/visualizers/SortingVisualizer.svelte';
	import MazeVisualizer from '$lib/components/visualizers/MazeVisualizer.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let mounted = $state(false);
	let activeTab = $state<'sorting' | 'maze'>('sorting');
	let sortingComparisonMode = $state(false);
	let mazeComparisonMode = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Algorithm Visualizers | Jack Lutz</title>
	<meta
		name="description"
		content="Interactive visualization of sorting and pathfinding algorithms. Compare algorithms side-by-side, adjust speed, and watch them race in real-time."
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
				<h1 in:fly={{ y: 30, duration: 600, delay: 0 }}>
					Algorithm<br />
					<span class="gradient-text">Visualizers</span>
				</h1>

				<p class="tagline" in:fly={{ y: 30, duration: 600, delay: 100 }}>
					Watch sorting and pathfinding algorithms in action. Compare their performance side-by-side,
					adjust speed, and see how different approaches solve the same problem.
				</p>

				<!-- Tab Selector -->
				<div class="tab-selector" in:fly={{ y: 30, duration: 600, delay: 200 }}>
					<button class="tab-btn" class:active={activeTab === 'sorting'} onclick={() => (activeTab = 'sorting')}>
						Sorting
					</button>
					<button class="tab-btn" class:active={activeTab === 'maze'} onclick={() => (activeTab = 'maze')}>
						Maze & Pathfinding
					</button>
				</div>

				<!-- Mode Toggle -->
				<div class="mode-toggle" in:fly={{ y: 30, duration: 600, delay: 300 }}>
					{#if activeTab === 'sorting'}
						<button class="mode-btn" class:active={!sortingComparisonMode} onclick={() => (sortingComparisonMode = false)}>
							Single Mode
						</button>
						<button class="mode-btn" class:active={sortingComparisonMode} onclick={() => (sortingComparisonMode = true)}>
							Comparison Mode
						</button>
					{:else}
						<button class="mode-btn" class:active={!mazeComparisonMode} onclick={() => (mazeComparisonMode = false)}>
							Single Mode
						</button>
						<button class="mode-btn" class:active={mazeComparisonMode} onclick={() => (mazeComparisonMode = true)}>
							Comparison Mode
						</button>
					{/if}
				</div>
			{/if}
		</div>
	</section>

	<!-- Visualizer Section -->
	<section class="visualizer-section">
		<div class="visualizer-container">
			{#if activeTab === 'sorting'}
				{#key sortingComparisonMode}
					<SortingVisualizer comparisonMode={sortingComparisonMode} />
				{/key}
			{:else}
				{#key mazeComparisonMode}
					<MazeVisualizer comparisonMode={mazeComparisonMode} />
				{/key}
			{/if}
		</div>
	</section>

	<!-- Info Section -->
	<section class="info-section">
		<div class="container">
			<!-- Sorting Algorithms -->
			<h2>Sorting Algorithms</h2>

			<div class="algorithms-grid">
				<div class="algo-card">
					<h3>Bubble Sort</h3>
					<div class="complexity">O(n<sup>2</sup>)</div>
					<p>
						Repeatedly steps through the list, compares adjacent elements and swaps them if they're
						in the wrong order.
					</p>
				</div>

				<div class="algo-card">
					<h3>Insertion Sort</h3>
					<div class="complexity">O(n<sup>2</sup>)</div>
					<p>
						Builds the sorted array one item at a time by inserting each element into its correct
						position.
					</p>
				</div>

				<div class="algo-card">
					<h3>Selection Sort</h3>
					<div class="complexity">O(n<sup>2</sup>)</div>
					<p>
						Repeatedly finds the minimum element from the unsorted portion and places it at the
						beginning.
					</p>
				</div>

				<div class="algo-card">
					<h3>Merge Sort</h3>
					<div class="complexity">O(n log n)</div>
					<p>
						Divides the array into halves, recursively sorts them, and merges the sorted halves back
						together.
					</p>
				</div>

				<div class="algo-card">
					<h3>Quick Sort</h3>
					<div class="complexity">O(n log n)</div>
					<p>
						Selects a pivot element and partitions the array around it, recursively sorting the
						partitions.
					</p>
				</div>

				<div class="algo-card">
					<h3>Heap Sort</h3>
					<div class="complexity">O(n log n)</div>
					<p>
						Builds a max heap from the array, then repeatedly extracts the maximum element to build
						the sorted result.
					</p>
				</div>

				<div class="algo-card">
					<h3>Counting Sort</h3>
					<div class="complexity">O(n + k)</div>
					<p>
						A non-comparison sort that counts occurrences of each element and uses arithmetic to
						determine positions.
					</p>
				</div>
			</div>

			<!-- Maze Generation -->
			<h2 class="section-title">Maze Generation</h2>

			<div class="algorithms-grid">
				<div class="algo-card">
					<h3>Recursive Backtracking</h3>
					<div class="complexity">O(V)</div>
					<p>
						Uses depth-first search with backtracking to carve passages. Creates long, winding
						corridors with few dead ends. The classic maze generation algorithm.
					</p>
				</div>

				<div class="algo-card">
					<h3>Prim's Algorithm</h3>
					<div class="complexity">O(V log V)</div>
					<p>
						Starts from a random cell and grows the maze by adding random frontier cells. Creates
						mazes with more branching and shorter dead ends than DFS.
					</p>
				</div>

				<div class="algo-card">
					<h3>Kruskal's Algorithm</h3>
					<div class="complexity">O(E α(V))</div>
					<p>
						Uses Union-Find to randomly connect cells while avoiding cycles. Creates mazes with
						uniform passage lengths and even branching throughout.
					</p>
				</div>
			</div>

			<!-- Pathfinding -->
			<h2 class="section-title">Pathfinding Algorithms</h2>

			<div class="algorithms-grid">
				<div class="algo-card">
					<h3>Depth-First Search</h3>
					<div class="complexity">O(V + E)</div>
					<p>
						Explores as deep as possible before backtracking. Fast but doesn't guarantee the
						shortest path. Performance depends heavily on maze structure.
					</p>
				</div>

				<div class="algo-card">
					<h3>Breadth-First Search</h3>
					<div class="complexity">O(V + E)</div>
					<p>
						Explores all neighbors at current depth before moving deeper. Always finds the shortest
						path in unweighted graphs. Expands uniformly in all directions.
					</p>
				</div>

				<div class="algo-card">
					<h3>Dijkstra's Algorithm</h3>
					<div class="complexity">O((V+E) log V)</div>
					<p>
						Uses a priority queue to always expand the lowest-cost path. Guarantees shortest path in
						weighted graphs. In uniform mazes, behaves like BFS.
					</p>
				</div>

				<div class="algo-card">
					<h3>A* Search</h3>
					<div class="complexity">O((V+E) log V)</div>
					<p>
						Combines path cost with a heuristic (Manhattan distance) to guide search toward the
						goal. Often explores fewer cells than BFS while finding optimal paths.
					</p>
				</div>
			</div>
		</div>
	</section>

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

	.tab-selector {
		display: flex;
		gap: 0.5rem;
		justify-content: center;
		margin-bottom: 1rem;
	}

	.tab-btn {
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 8px;
		background: var(--bg-card);
		color: var(--text-secondary);
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.tab-btn:hover {
		background: var(--bg-elevated);
		color: var(--text-primary);
	}

	.tab-btn.active {
		background: var(--accent);
		color: #000;
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
		padding: 0 2rem 3rem;
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

	.info-section h2 {
		font-size: 1.75rem;
		font-weight: 700;
		text-align: center;
		margin-bottom: 2rem;
	}

	.info-section h2.section-title {
		margin-top: 4rem;
	}

	.algorithms-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
	}

	.algo-card {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 1.5rem;
		transition: all 0.2s;
	}

	.algo-card:hover {
		border-color: var(--accent);
		transform: translateY(-2px);
	}

	.algo-card h3 {
		font-size: 1.125rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.complexity {
		font-family: var(--font-family-mono);
		font-size: 0.875rem;
		color: var(--accent);
		margin-bottom: 0.75rem;
	}

	.algo-card p {
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	@media (max-width: 768px) {
		.hero {
			padding-top: 3rem;
		}

		.tab-selector {
			flex-direction: column;
			width: 100%;
			max-width: 300px;
		}

		.tab-btn {
			width: 100%;
		}

		.mode-toggle {
			flex-direction: column;
			width: 100%;
			max-width: 300px;
		}

		.mode-btn {
			width: 100%;
		}
	}
</style>
