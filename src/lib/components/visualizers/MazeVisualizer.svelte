<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import {
		GENERATION_ALGORITHMS,
		GENERATION_NAMES,
		SOLVING_ALGORITHMS,
		SOLVING_NAMES,
		GRID_SIZES,
		GRID_SIZE_NAMES,
		CellState,
		getDefaultStartEnd,
		type Grid,
		type Position,
		type GenerationGenerator,
		type SolveGenerator,
		type SolveStep
	} from '$lib/maze';

	// Props
	let { comparisonMode = false }: { comparisonMode?: boolean } = $props();

	// Colors (dark theme with neon accents)
	const COLOR = {
		bg: '#1a1a1a',
		wall: '#262626',
		path: '#1f3d2e',
		visited: '#2d5a3f',
		frontier: '#10b981',
		finalPath: '#34d399',
		start: '#3b82f6',
		end: '#ef4444',
		text: '#e5e5e5',
		gridLine: '#0a0a0a'
	};

	// Convert algorithm name to filename
	function toFilename(name: string): string {
		return name.toLowerCase().replace(/['\s]+/g, '_').replace(/[^a-z0-9_]/g, '') + '.py';
	}

	// Python syntax highlighter
	function highlightPython(code: string): string {
		let html = code
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');

		html = html.replace(/(#[^\n]*)/g, '<span class="hljs-comment">$1</span>');
		html = html.replace(/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g, '<span class="hljs-string">$1</span>');

		const keywords = ['def', 'return', 'if', 'else', 'elif', 'for', 'while', 'in', 'not', 'and', 'or', 'is', 'None', 'True', 'False', 'from', 'import'];
		keywords.forEach(kw => {
			html = html.replace(new RegExp(`\\b(${kw})\\b`, 'g'), '<span class="hljs-keyword">$1</span>');
		});

		const builtins = ['len', 'range', 'max', 'min', 'enumerate', 'append', 'extend', 'pop', 'set', 'list', 'dict', 'int', 'float', 'str', 'abs', 'deque', 'heapq', 'heappush', 'heappop', 'popleft', 'add', 'get', 'randint', 'shuffle', 'choice'];
		builtins.forEach(fn => {
			html = html.replace(new RegExp(`\\b(${fn})(?=\\()`, 'g'), '<span class="hljs-builtin">$1</span>');
		});

		html = html.replace(/\b(def)\s+(\w+)/g, '<span class="hljs-keyword">$1</span> <span class="hljs-function">$2</span>');
		html = html.replace(/\b(\d+)\b/g, '<span class="hljs-number">$1</span>');

		return html;
	}

	// Algorithm descriptions and Python implementations
	const GENERATION_INFO: Record<string, { description: string; time: string; space: string; python: string }> = {
		'Recursive Backtracking': {
			description: 'Uses depth-first search with backtracking. Creates long, winding corridors with few dead ends. The algorithm carves passages by visiting unvisited neighbors randomly.',
			time: 'O(V)',
			space: 'O(V)',
			python: `def recursive_backtracking(width, height):
    grid = [[1] * width for _ in range(height)]  # 1 = wall
    stack = [(1, 1)]
    grid[1][1] = 0  # 0 = path

    while stack:
        x, y = stack[-1]
        neighbors = []
        for dx, dy in [(0, -2), (0, 2), (-2, 0), (2, 0)]:
            nx, ny = x + dx, y + dy
            if 0 < nx < width-1 and 0 < ny < height-1:
                if grid[ny][nx] == 1:
                    neighbors.append((nx, ny, dx//2, dy//2))

        if neighbors:
            nx, ny, wx, wy = random.choice(neighbors)
            grid[y + wy][x + wx] = 0  # Remove wall
            grid[ny][nx] = 0
            stack.append((nx, ny))
        else:
            stack.pop()
    return grid`
		},
		"Prim's Algorithm": {
			description: 'Starts from a random cell and grows the maze by repeatedly adding random frontier cells. Creates mazes with more branching and shorter dead ends than DFS.',
			time: 'O(V log V)',
			space: 'O(V)',
			python: `def prims_algorithm(width, height):
    grid = [[1] * width for _ in range(height)]
    start = (1, 1)
    grid[1][1] = 0
    frontier = []

    def add_frontier(x, y):
        for dx, dy in [(0, -2), (0, 2), (-2, 0), (2, 0)]:
            nx, ny = x + dx, y + dy
            if 0 < nx < width-1 and 0 < ny < height-1:
                if grid[ny][nx] == 1:
                    frontier.append((nx, ny, x, y))

    add_frontier(1, 1)

    while frontier:
        idx = random.randint(0, len(frontier) - 1)
        nx, ny, px, py = frontier.pop(idx)
        if grid[ny][nx] == 1:
            grid[ny][nx] = 0
            grid[(ny + py) // 2][(nx + px) // 2] = 0
            add_frontier(nx, ny)
    return grid`
		},
		"Kruskal's Algorithm": {
			description: 'Uses Union-Find to randomly connect cells while avoiding cycles. Creates mazes with uniform passage lengths and even branching throughout.',
			time: 'O(E α(V))',
			space: 'O(V)',
			python: `def kruskals_algorithm(width, height):
    grid = [[1] * width for _ in range(height)]
    parent = {}

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(a, b):
        pa, pb = find(a), find(b)
        if pa != pb:
            parent[pa] = pb
            return True
        return False

    cells = [(x, y) for x in range(1, width, 2)
                    for y in range(1, height, 2)]
    for cell in cells:
        parent[cell] = cell
        grid[cell[1]][cell[0]] = 0

    edges = []
    for x, y in cells:
        if x + 2 < width: edges.append(((x, y), (x + 2, y)))
        if y + 2 < height: edges.append(((x, y), (x, y + 2)))

    random.shuffle(edges)
    for (x1, y1), (x2, y2) in edges:
        if union((x1, y1), (x2, y2)):
            grid[(y1 + y2) // 2][(x1 + x2) // 2] = 0
    return grid`
		}
	};

	const SOLVING_INFO: Record<string, { description: string; time: string; space: string; python: string }> = {
		'Depth-First Search': {
			description: 'Explores as deep as possible before backtracking. Fast but doesn\'t guarantee the shortest path. Performance depends heavily on maze structure.',
			time: 'O(V + E)',
			space: 'O(V)',
			python: `def dfs_solve(grid, start, end):
    stack = [start]
    visited = set([start])
    parent = {start: None}

    while stack:
        x, y = stack.pop()
        if (x, y) == end:
            # Reconstruct path
            path = []
            while (x, y) is not None:
                path.append((x, y))
                x, y = parent[(x, y)] or (None, None)
            return path[::-1]

        for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
            nx, ny = x + dx, y + dy
            if (nx, ny) not in visited and grid[ny][nx] == 0:
                visited.add((nx, ny))
                parent[(nx, ny)] = (x, y)
                stack.append((nx, ny))
    return None`
		},
		'Breadth-First Search': {
			description: 'Explores all neighbors at current depth before moving deeper. Always finds the shortest path in unweighted graphs. Expands uniformly in all directions.',
			time: 'O(V + E)',
			space: 'O(V)',
			python: `from collections import deque

def bfs_solve(grid, start, end):
    queue = deque([start])
    visited = set([start])
    parent = {start: None}

    while queue:
        x, y = queue.popleft()
        if (x, y) == end:
            path = []
            while (x, y) is not None:
                path.append((x, y))
                x, y = parent[(x, y)] or (None, None)
            return path[::-1]

        for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
            nx, ny = x + dx, y + dy
            if (nx, ny) not in visited and grid[ny][nx] == 0:
                visited.add((nx, ny))
                parent[(nx, ny)] = (x, y)
                queue.append((nx, ny))
    return None`
		},
		"Dijkstra's Algorithm": {
			description: 'Uses a priority queue to always expand the lowest-cost path. Guarantees shortest path in weighted graphs. In uniform mazes, behaves like BFS.',
			time: 'O((V+E) log V)',
			space: 'O(V)',
			python: `import heapq

def dijkstra_solve(grid, start, end):
    heap = [(0, start)]
    dist = {start: 0}
    parent = {start: None}

    while heap:
        d, (x, y) = heapq.heappop(heap)
        if (x, y) == end:
            path = []
            while (x, y) is not None:
                path.append((x, y))
                x, y = parent[(x, y)] or (None, None)
            return path[::-1]

        if d > dist.get((x, y), float('inf')):
            continue

        for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
            nx, ny = x + dx, y + dy
            if grid[ny][nx] == 0:
                new_dist = d + 1
                if new_dist < dist.get((nx, ny), float('inf')):
                    dist[(nx, ny)] = new_dist
                    parent[(nx, ny)] = (x, y)
                    heapq.heappush(heap, (new_dist, (nx, ny)))
    return None`
		},
		'A* Search': {
			description: 'Combines path cost with a heuristic (Manhattan distance) to guide search toward the goal. Often explores fewer cells than BFS while finding optimal paths.',
			time: 'O((V+E) log V)',
			space: 'O(V)',
			python: `import heapq

def astar_solve(grid, start, end):
    def heuristic(a, b):
        return abs(a[0] - b[0]) + abs(a[1] - b[1])

    heap = [(heuristic(start, end), 0, start)]
    g_score = {start: 0}
    parent = {start: None}

    while heap:
        f, g, (x, y) = heapq.heappop(heap)
        if (x, y) == end:
            path = []
            while (x, y) is not None:
                path.append((x, y))
                x, y = parent[(x, y)] or (None, None)
            return path[::-1]

        for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
            nx, ny = x + dx, y + dy
            if grid[ny][nx] == 0:
                new_g = g + 1
                if new_g < g_score.get((nx, ny), float('inf')):
                    g_score[(nx, ny)] = new_g
                    f = new_g + heuristic((nx, ny), end)
                    parent[(nx, ny)] = (x, y)
                    heapq.heappush(heap, (f, new_g, (nx, ny)))
    return None`
		}
	};

	// State
	let genAlgorithm = $state(GENERATION_NAMES[0]);
	let solveAlgorithm1 = $state(SOLVING_NAMES[0]);
	let solveAlgorithm2 = $state(SOLVING_NAMES[1]);
	let gridSizeName = $state('Medium');
	let speed = $state(50); // Good default for watchable animation
	let seed = $state(Math.floor(Math.random() * 100000));
	let soundEnabled = $state(false);

	// Panel states
	interface PanelState {
		grid: Grid;
		genGenerator: GenerationGenerator | null;
		solveGenerator: SolveGenerator | null;
		visited: Set<string>;
		frontier: Set<string>;
		finalPath: Position[];
		start: Position;
		end: Position;
		isGenerating: boolean;
		isSolving: boolean;
		isDone: boolean;
		cellsVisited: number;
		pathLength: number;
		startTime: number;
		elapsedTime: number;
	}

	let panel1 = $state<PanelState>(createPanelState());
	let panel2 = $state<PanelState>(createPanelState());

	let animationFrameId: number | null = null;
	let audioContext: AudioContext | null = null;
	let isPaused = $state(false);

	// Canvas refs
	let canvas1: HTMLCanvasElement;
	let canvas2: HTMLCanvasElement;
	let container: HTMLDivElement;

	function createPanelState(): PanelState {
		const gridSize = GRID_SIZES[gridSizeName];
		const { start, end } = getDefaultStartEnd(gridSize);
		return {
			grid: Array.from({ length: gridSize }, () => Array(gridSize).fill(CellState.WALL)),
			genGenerator: null,
			solveGenerator: null,
			visited: new Set(),
			frontier: new Set(),
			finalPath: [],
			start,
			end,
			isGenerating: false,
			isSolving: false,
			isDone: false,
			cellsVisited: 0,
			pathLength: 0,
			startTime: 0,
			elapsedTime: 0
		};
	}

	function resetPanel(): PanelState {
		return createPanelState();
	}

	function reset() {
		seed = Math.floor(Math.random() * 100000);
		stopAnimation();
		isPaused = false;
		panel1 = resetPanel();
		if (comparisonMode) {
			panel2 = resetPanel();
		}
		requestAnimationFrame(draw);
	}

	function startGeneration() {
		// If done, reset first
		if (panel1.isDone) {
			reset();
			return;
		}

		// If paused, resume
		if (isPaused) {
			isPaused = false;
			if (panel1.genGenerator || panel1.solveGenerator) {
				panel1 = { ...panel1, isGenerating: !!panel1.genGenerator && !panel1.solveGenerator, isSolving: !!panel1.solveGenerator };
			}
			if (comparisonMode && (panel2.genGenerator || panel2.solveGenerator)) {
				panel2 = { ...panel2, isGenerating: !!panel2.genGenerator && !panel2.solveGenerator, isSolving: !!panel2.solveGenerator };
			}
			startAnimation();
			return;
		}

		// Start fresh
		const gridSize = GRID_SIZES[gridSizeName];
		const genFunc = GENERATION_ALGORITHMS[genAlgorithm];

		panel1 = {
			...panel1,
			genGenerator: genFunc(gridSize, gridSize, seed),
			isGenerating: true,
			startTime: performance.now()
		};

		if (comparisonMode) {
			panel2 = {
				...panel2,
				genGenerator: genFunc(gridSize, gridSize, seed),
				isGenerating: true,
				startTime: performance.now()
			};
		}

		startAnimation();
	}

	function pauseAnimation() {
		stopAnimation();
		isPaused = true;
		panel1 = { ...panel1, isGenerating: false, isSolving: false };
		if (comparisonMode) {
			panel2 = { ...panel2, isGenerating: false, isSolving: false };
		}
	}

	function stepPanel(panel: PanelState, solveAlgoName: string): PanelState {
		// Generation phase
		if (panel.genGenerator && panel.isGenerating) {
			const result = panel.genGenerator.next();
			if (result.done) {
				// Generation complete, ensure start and end are paths
				const newGrid = result.value as Grid;
				newGrid[panel.start[1]][panel.start[0]] = CellState.PATH;
				newGrid[panel.end[1]][panel.end[0]] = CellState.PATH;

				// Start solving
				const solveFunc = SOLVING_ALGORITHMS[solveAlgoName];
				return {
					...panel,
					grid: newGrid,
					isGenerating: false,
					isSolving: true,
					solveGenerator: solveFunc(newGrid, panel.start, panel.end)
				};
			}
			return { ...panel, grid: result.value as Grid };
		}

		// Solving phase
		if (panel.solveGenerator && panel.isSolving) {
			const result = panel.solveGenerator.next();
			if (result.done) {
				return {
					...panel,
					isSolving: false,
					isDone: true,
					elapsedTime: performance.now() - panel.startTime
				};
			}

			const step = result.value as SolveStep;
			const newPanel = {
				...panel,
				visited: step.visited,
				frontier: step.frontier,
				cellsVisited: step.visited.size
			};

			// Check if path reaches the end
			if (step.path.length > 0) {
				const lastPos = step.path[step.path.length - 1];
				if (lastPos[0] === panel.end[0] && lastPos[1] === panel.end[1]) {
					newPanel.finalPath = step.path;
					newPanel.pathLength = step.path.length;
					newPanel.isSolving = false;
					newPanel.isDone = true;
					newPanel.elapsedTime = performance.now() - panel.startTime;
				}
			}

			// Play sound based on frontier position
			if (soundEnabled && step.frontier.size > 0) {
				const frontierArr = Array.from(step.frontier);
				const lastKey = frontierArr[frontierArr.length - 1];
				const [fx, fy] = lastKey.split(',').map(Number);
				const gridSize = panel.grid.length;
				playTone(fx + fy, gridSize * 2);
			}

			return newPanel;
		}

		return panel;
	}

	function startAnimation() {
		if (animationFrameId !== null) return;

		let lastTime = 0;
		let accumulator = 0;

		const animate = (time: number) => {
			// Skip first frame to avoid huge delta from page load time
			if (lastTime === 0) {
				lastTime = time;
				animationFrameId = requestAnimationFrame(animate);
				return;
			}
			const delta = time - lastTime;
			lastTime = time;
			accumulator += delta;

			// Speed 1 = 10 steps/sec, Speed 50 = 500 steps/sec, Speed 100 = 1000 steps/sec
			const stepsPerSecond = speed * 2;
			const stepInterval = 1000 / stepsPerSecond;

			while (accumulator >= stepInterval) {
				if (panel1.isGenerating || panel1.isSolving) {
					panel1 = stepPanel(panel1, solveAlgorithm1);
				}
				if (comparisonMode && (panel2.isGenerating || panel2.isSolving)) {
					panel2 = stepPanel(panel2, solveAlgorithm2);
				}
				accumulator -= stepInterval;
			}

			draw();

			const active =
				panel1.isGenerating ||
				panel1.isSolving ||
				(comparisonMode && (panel2.isGenerating || panel2.isSolving));

			if (active) {
				animationFrameId = requestAnimationFrame(animate);
			} else {
				animationFrameId = null;
			}
		};

		animationFrameId = requestAnimationFrame(animate);
	}

	function stopAnimation() {
		if (animationFrameId !== null) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}
	}

	function draw() {
		drawPanel(canvas1, panel1, solveAlgorithm1);
		if (comparisonMode && canvas2) {
			drawPanel(canvas2, panel2, solveAlgorithm2);
		}
	}

	function drawPanel(canvas: HTMLCanvasElement, panel: PanelState, solveAlgoName: string) {
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const width = canvas.width;
		const height = canvas.height;

		// Clear
		ctx.fillStyle = COLOR.bg;
		ctx.fillRect(0, 0, width, height);

		// Header area
		const headerHeight = 60;
		const gridAreaY = headerHeight;
		const gridAreaSize = Math.min(width - 20, height - headerHeight - 20);

		// Draw title
		const title = `${genAlgorithm} + ${solveAlgoName}`;
		ctx.fillStyle = COLOR.text;
		ctx.font = 'bold 14px Inter, sans-serif';
		ctx.fillText(title, 10, 25);

		// Draw stats
		const elapsed = panel.isDone
			? panel.elapsedTime
			: panel.isGenerating || panel.isSolving
				? performance.now() - panel.startTime
				: 0;
		const stats = `Time: ${(elapsed / 1000).toFixed(2)}s | Visited: ${panel.cellsVisited} | Path: ${panel.pathLength}`;
		ctx.font = '12px Inter, sans-serif';
		ctx.fillStyle = '#a1a1aa';
		ctx.fillText(stats, 10, 45);

		// Draw grid
		const grid = panel.grid;
		if (grid.length === 0) return;

		const gridSize = grid.length;
		const cellSize = gridAreaSize / gridSize;
		const offsetX = (width - gridAreaSize) / 2;
		const offsetY = gridAreaY + (height - headerHeight - 10 - gridAreaSize) / 2;

		for (let y = 0; y < gridSize; y++) {
			for (let x = 0; x < gridSize; x++) {
				const px = offsetX + x * cellSize;
				const py = offsetY + y * cellSize;

				const key = `${x},${y}`;

				// Determine color
				let color = COLOR.wall;

				if (x === panel.start[0] && y === panel.start[1]) {
					color = COLOR.start;
				} else if (x === panel.end[0] && y === panel.end[1]) {
					color = COLOR.end;
				} else if (panel.finalPath.some((p) => p[0] === x && p[1] === y)) {
					color = COLOR.finalPath;
				} else if (panel.frontier.has(key)) {
					color = COLOR.frontier;
				} else if (panel.visited.has(key)) {
					color = COLOR.visited;
				} else if (grid[y][x] === CellState.PATH) {
					color = COLOR.path;
				}

				ctx.fillStyle = color;
				ctx.fillRect(px, py, cellSize, cellSize);

				// Grid lines for larger cells
				if (cellSize > 4) {
					ctx.strokeStyle = COLOR.gridLine;
					ctx.lineWidth = 0.5;
					ctx.strokeRect(px, py, cellSize, cellSize);
				}
			}
		}
	}

	function playTone(value: number, maxValue: number) {
		if (!audioContext) {
			try {
				audioContext = new AudioContext();
			} catch {
				return;
			}
		}

		if (audioContext.state === 'suspended') {
			audioContext.resume();
		}

		const frequency = 200 + (value / maxValue) * 600;
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();

		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);

		oscillator.frequency.value = frequency;
		oscillator.type = 'sine';
		gainNode.gain.value = 0.03;
		gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.03);

		oscillator.start(audioContext.currentTime);
		oscillator.stop(audioContext.currentTime + 0.03);
	}

	function handleResize() {
		if (!container) return;

		const rect = container.getBoundingClientRect();
		const padding = 20;
		const gap = 16;

		if (comparisonMode && canvas2) {
			const canvasWidth = (rect.width - gap - padding * 2) / 2;
			const canvasHeight = rect.height - padding * 2;

			canvas1.width = canvasWidth;
			canvas1.height = canvasHeight;
			canvas2.width = canvasWidth;
			canvas2.height = canvasHeight;
		} else if (canvas1) {
			canvas1.width = rect.width - padding * 2;
			canvas1.height = rect.height - padding * 2;
		}

		requestAnimationFrame(draw);
	}

	onMount(() => {
		reset();
		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	onDestroy(() => {
		stopAnimation();
		if (audioContext) {
			audioContext.close();
		}
	});

	// Only reset when these specific settings change (not speed)
	let prevGridSizeName = gridSizeName;
	let prevGenAlgorithm = genAlgorithm;
	let prevSolveAlgorithm1 = solveAlgorithm1;
	let prevSolveAlgorithm2 = solveAlgorithm2;
	let prevComparisonMode = comparisonMode;

	$effect(() => {
		const needsReset =
			gridSizeName !== prevGridSizeName ||
			genAlgorithm !== prevGenAlgorithm ||
			solveAlgorithm1 !== prevSolveAlgorithm1 ||
			solveAlgorithm2 !== prevSolveAlgorithm2 ||
			comparisonMode !== prevComparisonMode;

		if (needsReset) {
			prevGridSizeName = gridSizeName;
			prevGenAlgorithm = genAlgorithm;
			prevSolveAlgorithm1 = solveAlgorithm1;
			prevSolveAlgorithm2 = solveAlgorithm2;
			prevComparisonMode = comparisonMode;
			reset();
		}
	});
</script>

<div class="visualizer">
	<!-- Controls -->
	<div class="controls">
		<div class="control-group">
			<label>
				Generation
				<select bind:value={genAlgorithm}>
					{#each GENERATION_NAMES as name}
						<option value={name}>{name}</option>
					{/each}
				</select>
			</label>

			<label>
				Solve {comparisonMode ? '1' : ''}
				<select bind:value={solveAlgorithm1}>
					{#each SOLVING_NAMES as name}
						<option value={name}>{name}</option>
					{/each}
				</select>
			</label>

			{#if comparisonMode}
				<label>
					Solve 2
					<select bind:value={solveAlgorithm2}>
						{#each SOLVING_NAMES as name}
							<option value={name}>{name}</option>
						{/each}
					</select>
				</label>
			{/if}
		</div>

		<div class="control-group">
			<label>
				Grid Size
				<select bind:value={gridSizeName}>
					{#each GRID_SIZE_NAMES as name}
						<option value={name}>{name} ({GRID_SIZES[name]})</option>
					{/each}
				</select>
			</label>

			<label class="slider-label">
				Speed: {speed}
				<input type="range" min="1" max="100" bind:value={speed} />
			</label>
		</div>

		<div class="control-group buttons">
			<button class="btn-start" onclick={startGeneration}>
				{panel1.isDone ? 'Reset' : isPaused ? 'Resume' : panel1.isGenerating || panel1.isSolving ? 'Running...' : 'Generate & Solve'}
			</button>
			<button class="btn-secondary" onclick={isPaused ? reset : pauseAnimation} disabled={!panel1.isGenerating && !panel1.isSolving && !isPaused}>
				{isPaused ? 'Reset' : 'Pause'}
			</button>
			<button class="btn-secondary" onclick={reset}>Reset</button>
			<button class="btn-sound" onclick={() => (soundEnabled = !soundEnabled)}>
				{soundEnabled ? 'Sound ON' : 'Sound OFF'}
			</button>
		</div>
	</div>

	<!-- Legend -->
	<div class="legend">
		<div class="legend-item">
			<span class="legend-color" style="background: {COLOR.start}"></span>
			Start
		</div>
		<div class="legend-item">
			<span class="legend-color" style="background: {COLOR.end}"></span>
			End
		</div>
		<div class="legend-item">
			<span class="legend-color" style="background: {COLOR.visited}"></span>
			Visited
		</div>
		<div class="legend-item">
			<span class="legend-color" style="background: {COLOR.frontier}"></span>
			Frontier
		</div>
		<div class="legend-item">
			<span class="legend-color" style="background: {COLOR.finalPath}"></span>
			Path
		</div>
	</div>

	<!-- Canvas Container -->
	<div class="canvas-container" class:comparison={comparisonMode} bind:this={container}>
		<canvas bind:this={canvas1}></canvas>
		{#if comparisonMode}
			<canvas bind:this={canvas2}></canvas>
		{/if}
	</div>

	<!-- Algorithm Info Section -->
	<div class="algo-info-section" class:comparison={comparisonMode}>
		{#if comparisonMode}
			<!-- Comparison mode: show each solver -->
			<div class="algo-info-panel">
				<div class="algo-header">
					<h3>{solveAlgorithm1}</h3>
					<div class="complexity-badges">
						<span class="complexity time">Time: {SOLVING_INFO[solveAlgorithm1].time}</span>
						<span class="complexity space">Space: {SOLVING_INFO[solveAlgorithm1].space}</span>
					</div>
				</div>
				<p class="algo-description">{SOLVING_INFO[solveAlgorithm1].description}</p>
				<div class="code-block">
					<div class="code-header">
						<span class="code-filename">{toFilename(solveAlgorithm1)}</span>
					</div>
					<pre><code>{@html highlightPython(SOLVING_INFO[solveAlgorithm1].python)}</code></pre>
				</div>
			</div>
			<div class="algo-info-panel">
				<div class="algo-header">
					<h3>{solveAlgorithm2}</h3>
					<div class="complexity-badges">
						<span class="complexity time">Time: {SOLVING_INFO[solveAlgorithm2].time}</span>
						<span class="complexity space">Space: {SOLVING_INFO[solveAlgorithm2].space}</span>
					</div>
				</div>
				<p class="algo-description">{SOLVING_INFO[solveAlgorithm2].description}</p>
				<div class="code-block">
					<div class="code-header">
						<span class="code-filename">{toFilename(solveAlgorithm2)}</span>
					</div>
					<pre><code>{@html highlightPython(SOLVING_INFO[solveAlgorithm2].python)}</code></pre>
				</div>
			</div>
		{:else}
			<!-- Single mode: show generation + solver -->
			<div class="algo-info-panel">
				<div class="algo-header">
					<h3>{genAlgorithm}</h3>
					<div class="complexity-badges">
						<span class="complexity time">Time: {GENERATION_INFO[genAlgorithm].time}</span>
						<span class="complexity space">Space: {GENERATION_INFO[genAlgorithm].space}</span>
					</div>
				</div>
				<p class="algo-description">{GENERATION_INFO[genAlgorithm].description}</p>
				<div class="code-block">
					<div class="code-header">
						<span class="code-filename">{toFilename(genAlgorithm)}</span>
					</div>
					<pre><code>{@html highlightPython(GENERATION_INFO[genAlgorithm].python)}</code></pre>
				</div>
			</div>
			<div class="algo-info-panel">
				<div class="algo-header">
					<h3>{solveAlgorithm1}</h3>
					<div class="complexity-badges">
						<span class="complexity time">Time: {SOLVING_INFO[solveAlgorithm1].time}</span>
						<span class="complexity space">Space: {SOLVING_INFO[solveAlgorithm1].space}</span>
					</div>
				</div>
				<p class="algo-description">{SOLVING_INFO[solveAlgorithm1].description}</p>
				<div class="code-block">
					<div class="code-header">
						<span class="code-filename">{toFilename(solveAlgorithm1)}</span>
					</div>
					<pre><code>{@html highlightPython(SOLVING_INFO[solveAlgorithm1].python)}</code></pre>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.visualizer {
		display: flex;
		flex-direction: column;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 12px;
	}

	.controls {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		padding: 1rem;
		background: var(--color-surface-hover);
		border-bottom: 1px solid var(--color-border);
	}

	.control-group {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		align-items: center;
	}

	.control-group.buttons {
		margin-left: auto;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.75rem;
		color: var(--color-text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.slider-label {
		min-width: 120px;
	}

	select,
	input[type='range'] {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 6px;
		padding: 0.5rem;
		color: var(--color-text-primary);
		font-size: 0.875rem;
		cursor: pointer;
	}

	select:focus,
	input[type='range']:focus {
		outline: none;
		border-color: #10b981;
	}

	input[type='range'] {
		-webkit-appearance: none;
		height: 6px;
		padding: 0;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: #10b981;
		cursor: pointer;
	}

	button {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 6px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.btn-start {
		background: #10b981;
		color: #000;
	}

	.btn-start:hover {
		background: #34d399;
	}

	.btn-secondary {
		background: var(--color-surface);
		color: var(--color-text-primary);
		border: 1px solid var(--color-border);
	}

	.btn-secondary:hover:not(:disabled) {
		background: var(--color-surface-hover);
		border-color: var(--color-accent);
	}

	.btn-secondary:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.btn-sound {
		background: transparent;
		color: var(--color-text-secondary);
		border: 1px solid var(--color-border);
	}

	.btn-sound:hover {
		color: var(--color-accent);
		border-color: var(--color-accent);
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		padding: 0.5rem 1rem;
		background: var(--color-surface);
		border-bottom: 1px solid var(--color-border);
		font-size: 0.75rem;
		color: var(--color-text-secondary);
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.legend-color {
		width: 12px;
		height: 12px;
		border-radius: 2px;
	}

	.canvas-container {
		display: flex;
		gap: 1rem;
		padding: 10px;
		height: 450px;
	}

	.canvas-container.comparison {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	canvas {
		width: 100%;
		height: 100%;
		border-radius: 8px;
		background: var(--color-surface);
	}

	/* Algorithm Info Section */
	.algo-info-section {
		display: flex;
		justify-content: center;
		gap: 1rem;
		padding: 1.5rem;
		background: var(--color-surface);
		border-top: 1px solid var(--color-border);
	}

	.algo-info-panel {
		background: var(--color-surface-hover);
		border: 1px solid var(--color-border);
		border-radius: 8px;
		padding: 1rem;
	}

	.algo-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.5rem;
	}

	.algo-header h3 {
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-text-primary);
		margin: 0;
	}

	.complexity-badges {
		display: flex;
		gap: 0.5rem;
	}

	.complexity {
		font-family: 'JetBrains Mono', 'Fira Code', monospace;
		font-size: 0.7rem;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
	}

	.complexity.time {
		color: #10b981;
		background: rgba(16, 185, 129, 0.1);
	}

	.complexity.space {
		color: #3b82f6;
		background: rgba(59, 130, 246, 0.1);
	}

	.algo-type {
		font-size: 0.7rem;
		font-weight: 600;
		color: #3b82f6;
		background: rgba(59, 130, 246, 0.1);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.algo-description {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		line-height: 1.5;
		margin-bottom: 0.75rem;
	}

	.code-block {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 6px;
		overflow: hidden;
	}

	.code-header {
		background: var(--color-surface-hover);
		padding: 0.375rem 0.75rem;
		border-bottom: 1px solid var(--color-border);
	}

	.code-filename {
		font-family: 'JetBrains Mono', 'Fira Code', monospace;
		font-size: 0.7rem;
		font-weight: 500;
		color: var(--color-text-secondary);
	}

	.code-block pre {
		margin: 0;
		padding: 0.75rem;
		overflow-x: auto;
	}

	.code-block code {
		font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
		font-size: 0.75rem;
		line-height: 1.6;
		color: var(--color-text-primary);
		white-space: pre;
	}

	/* Syntax highlighting */
	:global(.hljs-keyword) {
		color: #c586c0;
	}

	:global(.hljs-function) {
		color: #dcdcaa;
	}

	:global(.hljs-string) {
		color: #ce9178;
	}

	:global(.hljs-number) {
		color: #b5cea8;
	}

	:global(.hljs-comment) {
		color: #6a9955;
		font-style: italic;
	}

	:global(.hljs-builtin) {
		color: #4ec9b0;
	}

	@media (max-width: 768px) {
		.controls {
			flex-direction: column;
		}

		.control-group.buttons {
			margin-left: 0;
			width: 100%;
			justify-content: center;
		}

		.canvas-container.comparison {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr;
		}

		.legend {
			justify-content: center;
		}

		.algo-info-section {
			grid-template-columns: 1fr;
		}
	}
</style>
