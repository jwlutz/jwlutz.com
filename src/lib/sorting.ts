/**
 * Sorting Algorithm Visualizer - Algorithm Library
 *
 * All sorting algorithms are implemented as generator functions that yield
 * after each step for animation purposes.
 */

export enum SortState {
	COMPARE = 'compare',
	SWAP = 'swap',
	SORTED = 'sorted'
}

export interface SortStep {
	array: number[];
	indexA: number;
	indexB: number;
	state: SortState;
}

export type SortGenerator = Generator<SortStep, void, unknown>;
export type SortAlgorithm = (arr: number[]) => SortGenerator;

/**
 * Bubble Sort - O(n^2)
 * Repeatedly swaps adjacent elements if they are in the wrong order
 */
export function* bubbleSort(arr: number[]): SortGenerator {
	const n = arr.length;
	for (let i = 0; i < n; i++) {
		let swapped = false;
		for (let j = 0; j < n - i - 1; j++) {
			yield { array: [...arr], indexA: j, indexB: j + 1, state: SortState.COMPARE };
			if (arr[j] > arr[j + 1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
				yield { array: [...arr], indexA: j, indexB: j + 1, state: SortState.SWAP };
				swapped = true;
			}
		}
		if (!swapped) break;
	}
	yield { array: [...arr], indexA: -1, indexB: -1, state: SortState.SORTED };
}

/**
 * Insertion Sort - O(n^2)
 * Builds sorted array one element at a time by inserting each element into its correct position
 */
export function* insertionSort(arr: number[]): SortGenerator {
	for (let i = 1; i < arr.length; i++) {
		const key = arr[i];
		let j = i - 1;
		while (j >= 0) {
			yield { array: [...arr], indexA: j, indexB: i, state: SortState.COMPARE };
			if (arr[j] > key) {
				arr[j + 1] = arr[j];
				yield { array: [...arr], indexA: j, indexB: j + 1, state: SortState.SWAP };
				j--;
			} else {
				break;
			}
		}
		arr[j + 1] = key;
	}
	yield { array: [...arr], indexA: -1, indexB: -1, state: SortState.SORTED };
}

/**
 * Selection Sort - O(n^2)
 * Finds the minimum element and places it at the beginning
 */
export function* selectionSort(arr: number[]): SortGenerator {
	const n = arr.length;
	for (let i = 0; i < n; i++) {
		let minIdx = i;
		for (let j = i + 1; j < n; j++) {
			yield { array: [...arr], indexA: minIdx, indexB: j, state: SortState.COMPARE };
			if (arr[j] < arr[minIdx]) {
				minIdx = j;
			}
		}
		if (minIdx !== i) {
			[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
			yield { array: [...arr], indexA: i, indexB: minIdx, state: SortState.SWAP };
		}
	}
	yield { array: [...arr], indexA: -1, indexB: -1, state: SortState.SORTED };
}

/**
 * Merge Sort - O(n log n)
 * Iterative bottom-up implementation for better visualization
 */
export function* mergeSort(arr: number[]): SortGenerator {
	const n = arr.length;
	let size = 1;

	while (size < n) {
		for (let left = 0; left < n; left += 2 * size) {
			const mid = Math.min(left + size, n);
			const right = Math.min(left + 2 * size, n);

			// Merge arr[left:mid] and arr[mid:right]
			const merged: number[] = [];
			let i = left;
			let j = mid;

			while (i < mid && j < right) {
				yield { array: [...arr], indexA: i, indexB: j, state: SortState.COMPARE };
				if (arr[i] <= arr[j]) {
					merged.push(arr[i]);
					i++;
				} else {
					merged.push(arr[j]);
					j++;
				}
			}

			while (i < mid) {
				merged.push(arr[i]);
				i++;
			}
			while (j < right) {
				merged.push(arr[j]);
				j++;
			}

			// Copy merged back to arr
			for (let k = 0; k < merged.length; k++) {
				if (arr[left + k] !== merged[k]) {
					arr[left + k] = merged[k];
					yield { array: [...arr], indexA: left + k, indexB: -1, state: SortState.SWAP };
				}
			}
		}
		size *= 2;
	}

	yield { array: [...arr], indexA: -1, indexB: -1, state: SortState.SORTED };
}

/**
 * Quick Sort - O(n log n) average, O(n^2) worst
 * Iterative implementation with stack
 */
export function* quickSort(arr: number[]): SortGenerator {
	const stack: [number, number][] = [[0, arr.length - 1]];

	while (stack.length > 0) {
		const [low, high] = stack.pop()!;
		if (low < high) {
			// Partition
			const pivot = arr[high];
			let i = low - 1;

			for (let j = low; j < high; j++) {
				yield { array: [...arr], indexA: j, indexB: high, state: SortState.COMPARE };
				if (arr[j] <= pivot) {
					i++;
					if (i !== j) {
						[arr[i], arr[j]] = [arr[j], arr[i]];
						yield { array: [...arr], indexA: i, indexB: j, state: SortState.SWAP };
					}
				}
			}

			[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
			yield { array: [...arr], indexA: i + 1, indexB: high, state: SortState.SWAP };

			const pi = i + 1;

			stack.push([pi + 1, high]);
			stack.push([low, pi - 1]);
		}
	}

	yield { array: [...arr], indexA: -1, indexB: -1, state: SortState.SORTED };
}

/**
 * Heap Sort - O(n log n)
 * Uses a max heap to sort in ascending order
 */
export function* heapSort(arr: number[]): SortGenerator {
	const n = arr.length;

	function* heapify(size: number, root: number): SortGenerator {
		let largest = root;
		const left = 2 * root + 1;
		const right = 2 * root + 2;

		if (left < size) {
			yield { array: [...arr], indexA: largest, indexB: left, state: SortState.COMPARE };
			if (arr[left] > arr[largest]) {
				largest = left;
			}
		}

		if (right < size) {
			yield { array: [...arr], indexA: largest, indexB: right, state: SortState.COMPARE };
			if (arr[right] > arr[largest]) {
				largest = right;
			}
		}

		if (largest !== root) {
			[arr[root], arr[largest]] = [arr[largest], arr[root]];
			yield { array: [...arr], indexA: root, indexB: largest, state: SortState.SWAP };
			yield* heapify(size, largest);
		}
	}

	// Build max heap
	for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
		yield* heapify(n, i);
	}

	// Extract elements from heap
	for (let i = n - 1; i > 0; i--) {
		[arr[0], arr[i]] = [arr[i], arr[0]];
		yield { array: [...arr], indexA: 0, indexB: i, state: SortState.SWAP };
		yield* heapify(i, 0);
	}

	yield { array: [...arr], indexA: -1, indexB: -1, state: SortState.SORTED };
}

/**
 * Counting Sort - O(n + k) where k is the range
 * Non-comparison based sort using counting
 */
export function* countingSort(arr: number[]): SortGenerator {
	if (arr.length === 0) {
		yield { array: [...arr], indexA: -1, indexB: -1, state: SortState.SORTED };
		return;
	}

	const maxVal = Math.max(...arr);
	const count = new Array(maxVal + 1).fill(0);

	// Count occurrences
	for (let i = 0; i < arr.length; i++) {
		count[arr[i]]++;
		yield { array: [...arr], indexA: i, indexB: -1, state: SortState.COMPARE };
	}

	// Reconstruct sorted array
	let idx = 0;
	for (let val = 0; val <= maxVal; val++) {
		for (let c = 0; c < count[val]; c++) {
			if (arr[idx] !== val) {
				arr[idx] = val;
				yield { array: [...arr], indexA: idx, indexB: -1, state: SortState.SWAP };
			}
			idx++;
		}
	}

	yield { array: [...arr], indexA: -1, indexB: -1, state: SortState.SORTED };
}

// Algorithm registry
export const SORTING_ALGORITHMS: Record<string, SortAlgorithm> = {
	'Bubble Sort': bubbleSort,
	'Insertion Sort': insertionSort,
	'Selection Sort': selectionSort,
	'Merge Sort': mergeSort,
	'Quick Sort': quickSort,
	'Heap Sort': heapSort,
	'Counting Sort': countingSort
};

export const ALGORITHM_NAMES = Object.keys(SORTING_ALGORITHMS);

// Utility functions
export function generateRandomArray(size: number, maxValue?: number): number[] {
	const max = maxValue ?? size;
	return Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1);
}

export function generateRandomArrayWithSeed(size: number, seed: number, maxValue?: number): number[] {
	// Simple seeded random number generator (mulberry32)
	let t = seed;
	const random = () => {
		t = (t + 0x6d2b79f5) | 0;
		let r = t;
		r = Math.imul(r ^ (r >>> 15), r | 1);
		r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
		return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
	};

	const max = maxValue ?? size;
	return Array.from({ length: size }, () => Math.floor(random() * max) + 1);
}

export function shuffleArray(arr: number[]): number[] {
	const shuffled = [...arr];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}
