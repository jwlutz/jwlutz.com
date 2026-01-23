/**
 * Maze Generation and Solving Algorithm Library
 *
 * All algorithms are implemented as generator functions that yield
 * after each step for animation purposes.
 */

export enum CellState {
	WALL = 0,
	PATH = 1
}

export type Grid = number[][];
export type Position = [number, number]; // [x, y]

// Generation step yields the current grid state
export type GenerationStep = Grid;
export type GenerationGenerator = Generator<GenerationStep, Grid, unknown>;
export type GenerationAlgorithm = (width: number, height: number, seed: number) => GenerationGenerator;

// Solving step yields visited cells, frontier cells, and current path
export interface SolveStep {
	visited: Set<string>;
	frontier: Set<string>;
	path: Position[];
}
export type SolveGenerator = Generator<SolveStep, void, unknown>;
export type SolveAlgorithm = (grid: Grid, start: Position, end: Position) => SolveGenerator;

// Utility to convert position to string key for Sets
const posKey = (pos: Position): string => `${pos[0]},${pos[1]}`;
const keyToPos = (key: string): Position => key.split(',').map(Number) as Position;

// Seeded random number generator (mulberry32)
function createSeededRandom(seed: number) {
	let t = seed;
	return () => {
		t = (t + 0x6d2b79f5) | 0;
		let r = t;
		r = Math.imul(r ^ (r >>> 15), r | 1);
		r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
		return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
	};
}

// Deep copy grid
function copyGrid(grid: Grid): Grid {
	return grid.map((row) => [...row]);
}

// ==================== Maze Generation Algorithms ====================

/**
 * Recursive Backtracking (DFS)
 * Creates long, winding passages with fewer dead ends
 */
export function* recursiveBacktracking(width: number, height: number, seed: number): GenerationGenerator {
	const random = createSeededRandom(seed);

	// Initialize all walls
	const grid: Grid = Array.from({ length: height }, () => Array(width).fill(CellState.WALL));

	// Start from top-left (1,1 to leave border)
	const startX = 1;
	const startY = 1;
	grid[startY][startX] = CellState.PATH;

	const stack: Position[] = [[startX, startY]];
	const directions: Position[] = [
		[0, -2],
		[0, 2],
		[-2, 0],
		[2, 0]
	]; // Step by 2

	while (stack.length > 0) {
		const [x, y] = stack[stack.length - 1];

		// Find unvisited neighbors
		const neighbors: [number, number, number, number][] = [];
		for (const [dx, dy] of directions) {
			const nx = x + dx;
			const ny = y + dy;
			if (nx > 0 && nx < width - 1 && ny > 0 && ny < height - 1 && grid[ny][nx] === CellState.WALL) {
				neighbors.push([nx, ny, dx / 2, dy / 2]);
			}
		}

		if (neighbors.length > 0) {
			// Choose random neighbor
			const idx = Math.floor(random() * neighbors.length);
			const [nx, ny, wx, wy] = neighbors[idx];

			// Remove wall between current and neighbor
			grid[y + wy][x + wx] = CellState.PATH;
			grid[ny][nx] = CellState.PATH;

			stack.push([nx, ny]);
			yield copyGrid(grid);
		} else {
			stack.pop();
		}
	}

	return grid;
}

/**
 * Prim's Algorithm
 * Creates more branching, maze-like structures
 */
export function* primsAlgorithm(width: number, height: number, seed: number): GenerationGenerator {
	const random = createSeededRandom(seed);

	const grid: Grid = Array.from({ length: height }, () => Array(width).fill(CellState.WALL));

	// Start from (1, 1)
	const startX = 1;
	const startY = 1;
	grid[startY][startX] = CellState.PATH;

	const directions: Position[] = [
		[0, -2],
		[0, 2],
		[-2, 0],
		[2, 0]
	];

	// Frontier: cells that could be added to the maze
	const frontier: [number, number, number, number][] = [];

	const addFrontier = (x: number, y: number) => {
		for (const [dx, dy] of directions) {
			const nx = x + dx;
			const ny = y + dy;
			if (
				nx > 0 &&
				nx < width - 1 &&
				ny > 0 &&
				ny < height - 1 &&
				grid[ny][nx] === CellState.WALL
			) {
				// Check if not already in frontier
				if (!frontier.some(([fx, fy]) => fx === nx && fy === ny)) {
					frontier.push([nx, ny, x, y]);
				}
			}
		}
	};

	addFrontier(startX, startY);

	while (frontier.length > 0) {
		// Choose random frontier cell
		const idx = Math.floor(random() * frontier.length);
		const [fx, fy, px, py] = frontier.splice(idx, 1)[0];

		if (grid[fy][fx] === CellState.WALL) {
			// Carve passage
			grid[fy][fx] = CellState.PATH;
			// Wall between frontier and parent
			grid[(fy + py) / 2][(fx + px) / 2] = CellState.PATH;

			addFrontier(fx, fy);
			yield copyGrid(grid);
		}
	}

	return grid;
}

/**
 * Kruskal's Algorithm
 * Uses Union-Find for efficient maze generation
 */
export function* kruskalsAlgorithm(width: number, height: number, seed: number): GenerationGenerator {
	const random = createSeededRandom(seed);

	const grid: Grid = Array.from({ length: height }, () => Array(width).fill(CellState.WALL));

	// Create cells (odd coordinates only)
	const cells: Position[] = [];
	for (let y = 1; y < height - 1; y += 2) {
		for (let x = 1; x < width - 1; x += 2) {
			grid[y][x] = CellState.PATH;
			cells.push([x, y]);
		}
	}

	yield copyGrid(grid);

	// Create all possible walls (edges between adjacent cells)
	const walls: [number, number, number, number][] = [];
	for (let y = 1; y < height - 1; y += 2) {
		for (let x = 1; x < width - 1; x += 2) {
			if (x + 2 < width - 1) {
				walls.push([x, y, x + 2, y]);
			}
			if (y + 2 < height - 1) {
				walls.push([x, y, x, y + 2]);
			}
		}
	}

	// Shuffle walls
	for (let i = walls.length - 1; i > 0; i--) {
		const j = Math.floor(random() * (i + 1));
		[walls[i], walls[j]] = [walls[j], walls[i]];
	}

	// Union-Find
	const parent = new Map<string, string>();
	const rank = new Map<string, number>();

	for (const cell of cells) {
		const key = posKey(cell);
		parent.set(key, key);
		rank.set(key, 0);
	}

	const find = (key: string): string => {
		if (parent.get(key) !== key) {
			parent.set(key, find(parent.get(key)!));
		}
		return parent.get(key)!;
	};

	const union = (a: string, b: string): boolean => {
		const ra = find(a);
		const rb = find(b);
		if (ra === rb) return false;

		const rankA = rank.get(ra)!;
		const rankB = rank.get(rb)!;

		if (rankA < rankB) {
			parent.set(ra, rb);
		} else if (rankA > rankB) {
			parent.set(rb, ra);
		} else {
			parent.set(rb, ra);
			rank.set(ra, rankA + 1);
		}
		return true;
	};

	for (const [x1, y1, x2, y2] of walls) {
		const key1 = posKey([x1, y1]);
		const key2 = posKey([x2, y2]);

		if (union(key1, key2)) {
			// Remove wall between cells
			const wx = (x1 + x2) / 2;
			const wy = (y1 + y2) / 2;
			grid[wy][wx] = CellState.PATH;
			yield copyGrid(grid);
		}
	}

	return grid;
}

// Generation algorithm registry
export const GENERATION_ALGORITHMS: Record<string, GenerationAlgorithm> = {
	'Recursive Backtracking': recursiveBacktracking,
	"Prim's Algorithm": primsAlgorithm,
	"Kruskal's Algorithm": kruskalsAlgorithm
};

export const GENERATION_NAMES = Object.keys(GENERATION_ALGORITHMS);

// ==================== Maze Solving Algorithms ====================

const SOLVE_DIRECTIONS: Position[] = [
	[0, -1],
	[0, 1],
	[-1, 0],
	[1, 0]
];

/**
 * Depth-First Search (DFS)
 * Explores as deep as possible before backtracking
 */
export function* dfsSolve(grid: Grid, start: Position, end: Position): SolveGenerator {
	const visited = new Set<string>();
	const stack: [Position, Position[]][] = [[start, [start]]];

	while (stack.length > 0) {
		const [pos, path] = stack.pop()!;
		const [x, y] = pos;

		if (x === end[0] && y === end[1]) {
			yield { visited, frontier: new Set(), path };
			return;
		}

		const key = posKey(pos);
		if (visited.has(key)) continue;

		visited.add(key);

		for (const [dx, dy] of SOLVE_DIRECTIONS) {
			const nx = x + dx;
			const ny = y + dy;
			const nkey = posKey([nx, ny]);

			if (
				ny >= 0 &&
				ny < grid.length &&
				nx >= 0 &&
				nx < grid[0].length &&
				grid[ny][nx] === CellState.PATH &&
				!visited.has(nkey)
			) {
				stack.push([[nx, ny], [...path, [nx, ny]]]);
			}
		}

		const frontier = new Set(stack.map(([p]) => posKey(p)));
		yield { visited, frontier, path };
	}

	yield { visited, frontier: new Set(), path: [] };
}

/**
 * Breadth-First Search (BFS)
 * Explores all neighbors at current depth before moving deeper
 * Guarantees shortest path
 */
export function* bfsSolve(grid: Grid, start: Position, end: Position): SolveGenerator {
	const visited = new Set<string>();
	const queue: [Position, Position[]][] = [[start, [start]]];
	visited.add(posKey(start));

	while (queue.length > 0) {
		const [pos, path] = queue.shift()!;
		const [x, y] = pos;

		if (x === end[0] && y === end[1]) {
			yield { visited, frontier: new Set(), path };
			return;
		}

		for (const [dx, dy] of SOLVE_DIRECTIONS) {
			const nx = x + dx;
			const ny = y + dy;
			const nkey = posKey([nx, ny]);

			if (
				ny >= 0 &&
				ny < grid.length &&
				nx >= 0 &&
				nx < grid[0].length &&
				grid[ny][nx] === CellState.PATH &&
				!visited.has(nkey)
			) {
				visited.add(nkey);
				queue.push([[nx, ny], [...path, [nx, ny]]]);
			}
		}

		const frontier = new Set(queue.map(([p]) => posKey(p)));
		yield { visited, frontier, path };
	}

	yield { visited, frontier: new Set(), path: [] };
}

/**
 * Dijkstra's Algorithm
 * Uses priority queue based on distance
 * All edges have weight 1, so behaves like BFS
 */
export function* dijkstraSolve(grid: Grid, start: Position, end: Position): SolveGenerator {
	const visited = new Set<string>();
	const distances = new Map<string, number>();
	distances.set(posKey(start), 0);

	// Simple priority queue using sorted array (for visualization purposes)
	// [distance, x, y, path]
	const heap: [number, number, number, Position[]][] = [[0, start[0], start[1], [start]]];

	while (heap.length > 0) {
		// Sort by distance and pop smallest
		heap.sort((a, b) => a[0] - b[0]);
		const [dist, x, y, path] = heap.shift()!;
		const key = posKey([x, y]);

		if (x === end[0] && y === end[1]) {
			yield { visited, frontier: new Set(), path };
			return;
		}

		if (visited.has(key)) continue;
		visited.add(key);

		for (const [dx, dy] of SOLVE_DIRECTIONS) {
			const nx = x + dx;
			const ny = y + dy;
			const nkey = posKey([nx, ny]);

			if (
				ny >= 0 &&
				ny < grid.length &&
				nx >= 0 &&
				nx < grid[0].length &&
				grid[ny][nx] === CellState.PATH &&
				!visited.has(nkey)
			) {
				const newDist = dist + 1;
				const currentDist = distances.get(nkey);

				if (currentDist === undefined || newDist < currentDist) {
					distances.set(nkey, newDist);
					heap.push([newDist, nx, ny, [...path, [nx, ny]]]);
				}
			}
		}

		const frontier = new Set(heap.map(([, hx, hy]) => posKey([hx, hy])));
		yield { visited, frontier, path };
	}

	yield { visited, frontier: new Set(), path: [] };
}

/**
 * A* Search
 * Uses heuristic (Manhattan distance) to guide search towards goal
 * Guarantees shortest path with admissible heuristic
 */
export function* astarSolve(grid: Grid, start: Position, end: Position): SolveGenerator {
	const heuristic = (pos: Position): number => {
		return Math.abs(pos[0] - end[0]) + Math.abs(pos[1] - end[1]);
	};

	const visited = new Set<string>();
	const gScores = new Map<string, number>();
	gScores.set(posKey(start), 0);

	// [fScore, gScore, x, y, path]
	const heap: [number, number, number, number, Position[]][] = [
		[heuristic(start), 0, start[0], start[1], [start]]
	];

	while (heap.length > 0) {
		// Sort by fScore and pop smallest
		heap.sort((a, b) => a[0] - b[0]);
		const [, g, x, y, path] = heap.shift()!;
		const key = posKey([x, y]);

		if (x === end[0] && y === end[1]) {
			yield { visited, frontier: new Set(), path };
			return;
		}

		if (visited.has(key)) continue;
		visited.add(key);

		for (const [dx, dy] of SOLVE_DIRECTIONS) {
			const nx = x + dx;
			const ny = y + dy;
			const nkey = posKey([nx, ny]);

			if (
				ny >= 0 &&
				ny < grid.length &&
				nx >= 0 &&
				nx < grid[0].length &&
				grid[ny][nx] === CellState.PATH &&
				!visited.has(nkey)
			) {
				const newG = g + 1;
				const currentG = gScores.get(nkey);

				if (currentG === undefined || newG < currentG) {
					gScores.set(nkey, newG);
					const f = newG + heuristic([nx, ny]);
					heap.push([f, newG, nx, ny, [...path, [nx, ny]]]);
				}
			}
		}

		const frontier = new Set(heap.map(([, , hx, hy]) => posKey([hx, hy])));
		yield { visited, frontier, path };
	}

	yield { visited, frontier: new Set(), path: [] };
}

// Solving algorithm registry
export const SOLVING_ALGORITHMS: Record<string, SolveAlgorithm> = {
	'Depth-First Search': dfsSolve,
	'Breadth-First Search': bfsSolve,
	"Dijkstra's Algorithm": dijkstraSolve,
	'A* Search': astarSolve
};

export const SOLVING_NAMES = Object.keys(SOLVING_ALGORITHMS);

// Grid sizes (odd numbers for proper maze generation)
export const GRID_SIZES: Record<string, number> = {
	Small: 15,
	Medium: 31,
	Large: 51,
	XLarge: 75,
	Huge: 101
};

export const GRID_SIZE_NAMES = Object.keys(GRID_SIZES);

// Utility functions
export function createEmptyGrid(width: number, height: number): Grid {
	return Array.from({ length: height }, () => Array(width).fill(CellState.WALL));
}

export function getDefaultStartEnd(gridSize: number): { start: Position; end: Position } {
	return {
		start: [1, 1],
		end: [gridSize - 2, gridSize - 2]
	};
}
