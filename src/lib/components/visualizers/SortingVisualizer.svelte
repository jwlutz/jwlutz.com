<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import {
		SORTING_ALGORITHMS,
		ALGORITHM_NAMES,
		SortState,
		generateRandomArrayWithSeed,
		type SortStep,
		type SortGenerator
	} from '$lib/sorting';

	// Props
	let { comparisonMode = false }: { comparisonMode?: boolean } = $props();

	// Constants
	const BAR_COUNTS = [25, 50, 100, 200, 500];

	// Colors (dark theme with neon accents)
	const COLOR = {
		bg: '#1a1a1a',
		bar: '#10b981',
		compare: '#fbbf24',
		swap: '#ef4444',
		sorted: '#34d399',
		text: '#e5e5e5'
	};

	// Convert algorithm name to filename
	function toFilename(name: string): string {
		return name.toLowerCase().replace(/['\s]+/g, '_').replace(/[^a-z0-9_]/g, '') + '.py';
	}

	// Python syntax highlighter
	function highlightPython(code: string): string {
		// Escape HTML first
		let html = code
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');

		// Comments (must be first to avoid conflicts)
		html = html.replace(/(#[^\n]*)/g, '<span class="hljs-comment">$1</span>');

		// Strings
		html = html.replace(/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g, '<span class="hljs-string">$1</span>');

		// Keywords
		const keywords = ['def', 'return', 'if', 'else', 'elif', 'for', 'while', 'in', 'not', 'and', 'or', 'is', 'None', 'True', 'False', 'from', 'import'];
		keywords.forEach(kw => {
			html = html.replace(new RegExp(`\\b(${kw})\\b`, 'g'), '<span class="hljs-keyword">$1</span>');
		});

		// Built-in functions
		const builtins = ['len', 'range', 'max', 'min', 'enumerate', 'append', 'extend', 'pop', 'set', 'list', 'dict', 'int', 'float', 'str', 'abs'];
		builtins.forEach(fn => {
			html = html.replace(new RegExp(`\\b(${fn})(?=\\()`, 'g'), '<span class="hljs-builtin">$1</span>');
		});

		// Function definitions
		html = html.replace(/\b(def)\s+(\w+)/g, '<span class="hljs-keyword">$1</span> <span class="hljs-function">$2</span>');

		// Numbers
		html = html.replace(/\b(\d+)\b/g, '<span class="hljs-number">$1</span>');

		return html;
	}

	// Algorithm descriptions and Python implementations
	const ALGORITHM_INFO: Record<string, { description: string; time: string; space: string; python: string }> = {
		'Bubble Sort': {
			description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they\'re in the wrong order. Simple but inefficient for large datasets.',
			time: 'O(n²)',
			space: 'O(1)',
			python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`
		},
		'Insertion Sort': {
			description: 'Builds the sorted array one item at a time by inserting each element into its correct position. Efficient for small or nearly sorted datasets.',
			time: 'O(n²)',
			space: 'O(1)',
			python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`
		},
		'Selection Sort': {
			description: 'Repeatedly finds the minimum element from the unsorted portion and places it at the beginning. Simple but makes O(n) swaps.',
			time: 'O(n²)',
			space: 'O(1)',
			python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`
		},
		'Merge Sort': {
			description: 'Divides the array into halves, recursively sorts them, and merges the sorted halves. Stable sort with guaranteed O(n log n) performance.',
			time: 'O(n log n)',
			space: 'O(n)',
			python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`
		},
		'Quick Sort': {
			description: 'Selects a pivot element and partitions the array around it, recursively sorting the partitions. Fast in practice but O(n²) worst case.',
			time: 'O(n log n)',
			space: 'O(log n)',
			python: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pivot_idx = partition(arr, low, high)
        quick_sort(arr, low, pivot_idx - 1)
        quick_sort(arr, pivot_idx + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`
		},
		'Heap Sort': {
			description: 'Builds a max heap from the array, then repeatedly extracts the maximum element. Guaranteed O(n log n) but not stable.',
			time: 'O(n log n)',
			space: 'O(1)',
			python: `def heap_sort(arr):
    n = len(arr)
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    # Extract elements
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    return arr

def heapify(arr, n, i):
    largest = i
    left, right = 2 * i + 1, 2 * i + 2
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)`
		},
		'Counting Sort': {
			description: 'A non-comparison sort that counts occurrences of each element. Linear time when k (range) is O(n), but uses extra space.',
			time: 'O(n + k)',
			space: 'O(k)',
			python: `def counting_sort(arr):
    if not arr:
        return arr
    max_val = max(arr)
    count = [0] * (max_val + 1)
    for num in arr:
        count[num] += 1
    result = []
    for i, c in enumerate(count):
        result.extend([i] * c)
    return result`
		}
	};

	// State
	let algorithm1 = $state(ALGORITHM_NAMES[0]);
	let algorithm2 = $state(ALGORITHM_NAMES[1]);
	let barCount = $state(50);
	let speed = $state(50); // Good default: ~20 steps/sec for watchable animation
	let seed = $state(Math.floor(Math.random() * 100000));
	let soundEnabled = $state(false);

	// Panel states
	interface PanelState {
		array: number[];
		generator: SortGenerator | null;
		isSorting: boolean;
		isDone: boolean;
		highlightA: number;
		highlightB: number;
		sortState: SortState;
		comparisons: number;
		swaps: number;
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
		return {
			array: [],
			generator: null,
			isSorting: false,
			isDone: false,
			highlightA: -1,
			highlightB: -1,
			sortState: SortState.COMPARE,
			comparisons: 0,
			swaps: 0,
			startTime: 0,
			elapsedTime: 0
		};
	}

	function resetPanel(panel: PanelState, algorithmName: string): PanelState {
		return {
			...createPanelState(),
			array: generateRandomArrayWithSeed(barCount, seed, barCount)
		};
	}

	function reset() {
		seed = Math.floor(Math.random() * 100000);
		stopAnimation();
		isPaused = false;
		panel1 = resetPanel(panel1, algorithm1);
		if (comparisonMode) {
			panel2 = resetPanel(panel2, algorithm2);
		}
		requestAnimationFrame(draw);
	}

	function shuffle() {
		seed = Math.floor(Math.random() * 100000);
		stopAnimation();
		isPaused = false;
		panel1 = resetPanel(panel1, algorithm1);
		if (comparisonMode) {
			panel2 = resetPanel(panel2, algorithm2);
		}
		requestAnimationFrame(draw);
	}

	function startSorting() {
		if (panel1.isDone) {
			reset();
			// Don't auto-start after reset, let user click again
			return;
		}

		// If paused, just resume
		if (isPaused) {
			isPaused = false;
			panel1.isSorting = true;
			if (comparisonMode && panel2.generator && !panel2.isDone) {
				panel2.isSorting = true;
			}
			startAnimation();
			return;
		}

		// Start fresh
		if (!panel1.generator) {
			const algo1 = SORTING_ALGORITHMS[algorithm1];
			panel1.generator = algo1([...panel1.array]);
			panel1.startTime = performance.now();
		}
		panel1.isSorting = true;

		if (comparisonMode && !panel2.generator && !panel2.isDone) {
			const algo2 = SORTING_ALGORITHMS[algorithm2];
			panel2.generator = algo2([...panel2.array]);
			panel2.startTime = performance.now();
		}
		if (comparisonMode && !panel2.isDone) {
			panel2.isSorting = true;
		}

		startAnimation();
	}

	function pauseSorting() {
		stopAnimation();
		isPaused = true;
		panel1.isSorting = false;
		panel2.isSorting = false;
	}

	function stepPanel(panel: PanelState): PanelState {
		if (!panel.generator || panel.isDone) return panel;

		const result = panel.generator.next();
		if (result.done) {
			return {
				...panel,
				isSorting: false,
				isDone: true,
				elapsedTime: performance.now() - panel.startTime,
				highlightA: -1,
				highlightB: -1,
				sortState: SortState.SORTED
			};
		}

		const step = result.value as SortStep;
		const newPanel = {
			...panel,
			array: step.array,
			highlightA: step.indexA,
			highlightB: step.indexB,
			sortState: step.state
		};

		if (step.state === SortState.COMPARE) {
			newPanel.comparisons++;
		} else if (step.state === SortState.SWAP) {
			newPanel.swaps++;
		} else if (step.state === SortState.SORTED) {
			newPanel.isSorting = false;
			newPanel.isDone = true;
			newPanel.elapsedTime = performance.now() - panel.startTime;
		}

		// Play sound
		if (soundEnabled && step.indexA >= 0 && step.indexA < step.array.length) {
			playTone(step.array[step.indexA], Math.max(...step.array));
		}

		return newPanel;
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

			// Speed 1 = 10 steps/sec, Speed 50 = 500 steps/sec, Speed 200 = 2000 steps/sec
			const stepsPerSecond = speed * 2;
			const stepInterval = 1000 / stepsPerSecond;

			while (accumulator >= stepInterval) {
				if (panel1.isSorting) {
					panel1 = stepPanel(panel1);
				}
				if (comparisonMode && panel2.isSorting) {
					panel2 = stepPanel(panel2);
				}
				accumulator -= stepInterval;
			}

			draw();

			if (panel1.isSorting || (comparisonMode && panel2.isSorting)) {
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
		drawPanel(canvas1, panel1, algorithm1);
		if (comparisonMode && canvas2) {
			drawPanel(canvas2, panel2, algorithm2);
		}
	}

	function drawPanel(canvas: HTMLCanvasElement, panel: PanelState, algorithmName: string) {
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
		const barAreaY = headerHeight;
		const barAreaHeight = height - headerHeight - 10;

		// Draw algorithm name
		ctx.fillStyle = COLOR.text;
		ctx.font = 'bold 16px Inter, sans-serif';
		ctx.fillText(algorithmName, 10, 25);

		// Draw stats
		const elapsed = panel.isDone
			? panel.elapsedTime
			: panel.isSorting
				? performance.now() - panel.startTime
				: 0;
		const stats = `Time: ${(elapsed / 1000).toFixed(2)}s | Comparisons: ${panel.comparisons} | Swaps: ${panel.swaps}`;
		ctx.font = '12px Inter, sans-serif';
		ctx.fillStyle = '#a1a1aa';
		ctx.fillText(stats, 10, 45);

		// Draw bars
		const arr = panel.array;
		if (arr.length === 0) return;

		const maxVal = Math.max(...arr);
		const barWidth = width / arr.length;
		const spacing = barWidth > 3 ? 1 : 0;

		for (let i = 0; i < arr.length; i++) {
			const barHeight = (arr[i] / maxVal) * (barAreaHeight - 10);
			const x = i * barWidth;
			const y = barAreaY + barAreaHeight - barHeight;

			// Determine color
			let color = COLOR.bar;
			if (panel.isDone) {
				color = COLOR.sorted;
			} else if (i === panel.highlightA || i === panel.highlightB) {
				color = panel.sortState === SortState.SWAP ? COLOR.swap : COLOR.compare;
			}

			ctx.fillStyle = color;
			ctx.fillRect(x, y, Math.max(1, barWidth - spacing), barHeight);
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

		const frequency = 200 + (value / maxValue) * 800;
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();

		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);

		oscillator.frequency.value = frequency;
		oscillator.type = 'sine';
		gainNode.gain.value = 0.05;
		gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);

		oscillator.start(audioContext.currentTime);
		oscillator.stop(audioContext.currentTime + 0.05);
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
	let prevBarCount = barCount;
	let prevAlgorithm1 = algorithm1;
	let prevAlgorithm2 = algorithm2;
	let prevComparisonMode = comparisonMode;

	$effect(() => {
		const needsReset =
			barCount !== prevBarCount ||
			algorithm1 !== prevAlgorithm1 ||
			algorithm2 !== prevAlgorithm2 ||
			comparisonMode !== prevComparisonMode;

		if (needsReset) {
			prevBarCount = barCount;
			prevAlgorithm1 = algorithm1;
			prevAlgorithm2 = algorithm2;
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
				Algorithm {comparisonMode ? '1' : ''}
				<select bind:value={algorithm1}>
					{#each ALGORITHM_NAMES as name}
						<option value={name}>{name}</option>
					{/each}
				</select>
			</label>

			{#if comparisonMode}
				<label>
					Algorithm 2
					<select bind:value={algorithm2}>
						{#each ALGORITHM_NAMES as name}
							<option value={name}>{name}</option>
						{/each}
					</select>
				</label>
			{/if}
		</div>

		<div class="control-group">
			<label>
				Array Size
				<select bind:value={barCount}>
					{#each BAR_COUNTS as count}
						<option value={count}>{count} elements</option>
					{/each}
				</select>
			</label>

			<label class="slider-label">
				Speed: {speed}
				<input type="range" min="1" max="200" bind:value={speed} />
			</label>
		</div>

		<div class="control-group buttons">
			<button class="btn-start" onclick={startSorting}>
				{panel1.isDone ? 'Reset' : isPaused ? 'Resume' : panel1.isSorting ? 'Running...' : 'Start'}
			</button>
			<button class="btn-secondary" onclick={isPaused ? reset : pauseSorting} disabled={!panel1.isSorting && !isPaused}>
				{isPaused ? 'Reset' : 'Pause'}
			</button>
			<button class="btn-secondary" onclick={shuffle}>Shuffle</button>
			<button class="btn-sound" onclick={() => (soundEnabled = !soundEnabled)}>
				{soundEnabled ? 'Sound ON' : 'Sound OFF'}
			</button>
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
			<div class="algo-info-panel">
				<div class="algo-header">
					<h3>{algorithm1}</h3>
					<div class="complexity-badges">
						<span class="complexity time">Time: {ALGORITHM_INFO[algorithm1].time}</span>
						<span class="complexity space">Space: {ALGORITHM_INFO[algorithm1].space}</span>
					</div>
				</div>
				<p class="algo-description">{ALGORITHM_INFO[algorithm1].description}</p>
				<div class="code-block">
					<div class="code-header">
						<span class="code-filename">{toFilename(algorithm1)}</span>
					</div>
					<pre><code>{@html highlightPython(ALGORITHM_INFO[algorithm1].python)}</code></pre>
				</div>
			</div>
			<div class="algo-info-panel">
				<div class="algo-header">
					<h3>{algorithm2}</h3>
					<div class="complexity-badges">
						<span class="complexity time">Time: {ALGORITHM_INFO[algorithm2].time}</span>
						<span class="complexity space">Space: {ALGORITHM_INFO[algorithm2].space}</span>
					</div>
				</div>
				<p class="algo-description">{ALGORITHM_INFO[algorithm2].description}</p>
				<div class="code-block">
					<div class="code-header">
						<span class="code-filename">{toFilename(algorithm2)}</span>
					</div>
					<pre><code>{@html highlightPython(ALGORITHM_INFO[algorithm2].python)}</code></pre>
				</div>
			</div>
		{:else}
			<div class="algo-info-panel single">
				<div class="algo-header">
					<h3>{algorithm1}</h3>
					<div class="complexity-badges">
						<span class="complexity time">Time: {ALGORITHM_INFO[algorithm1].time}</span>
						<span class="complexity space">Space: {ALGORITHM_INFO[algorithm1].space}</span>
					</div>
				</div>
				<p class="algo-description">{ALGORITHM_INFO[algorithm1].description}</p>
				<div class="code-block">
					<div class="code-header">
						<span class="code-filename">{toFilename(algorithm1)}</span>
					</div>
					<pre><code>{@html highlightPython(ALGORITHM_INFO[algorithm1].python)}</code></pre>
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
		border-color: var(--color-accent);
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

	.canvas-container {
		display: flex;
		gap: 1rem;
		padding: 10px;
		height: 400px;
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

	.algo-info-section.comparison {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.algo-info-panel {
		background: var(--color-surface-hover);
		border: 1px solid var(--color-border);
		border-radius: 8px;
		padding: 1.25rem;
	}

	.algo-info-panel.single {
		max-width: 700px;
		width: 100%;
	}

	.algo-header {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}

	.algo-header h3 {
		font-size: 1.125rem;
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

	.algo-description {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		line-height: 1.6;
		margin-bottom: 1rem;
	}

	.code-block {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 8px;
		overflow: hidden;
	}

	.code-header {
		background: var(--color-surface-hover);
		padding: 0.5rem 1rem;
		border-bottom: 1px solid var(--color-border);
	}

	.code-filename {
		font-family: 'JetBrains Mono', 'Fira Code', monospace;
		font-size: 0.8rem;
		font-weight: 500;
		color: var(--color-text-secondary);
	}

	.code-block pre {
		margin: 0;
		padding: 1rem;
		overflow-x: auto;
	}

	.code-block code {
		font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
		font-size: 0.8rem;
		line-height: 1.7;
		color: var(--color-text-primary);
		white-space: pre;
	}

	/* Syntax highlighting */
	.code-block :global(.hljs-keyword) {
		color: #c678dd;
	}

	.code-block :global(.hljs-function) {
		color: #61afef;
	}

	.code-block :global(.hljs-string) {
		color: #98c379;
	}

	.code-block :global(.hljs-number) {
		color: #d19a66;
	}

	.code-block :global(.hljs-comment) {
		color: #5c6370;
		font-style: italic;
	}

	.code-block :global(.hljs-builtin) {
		color: #e5c07b;
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

		.algo-info-section.comparison {
			grid-template-columns: 1fr;
		}
	}
</style>
