// Type extensions for svelte-motion
// Adds whileInView prop which exists at runtime but is missing from type definitions

import 'svelte-motion';

declare module 'svelte-motion' {
	interface MotionProps {
		whileInView?: {
			opacity?: number;
			x?: number;
			y?: number;
			scale?: number;
			rotate?: number;
			[key: string]: unknown;
		};
		viewport?: {
			once?: boolean;
			amount?: number | 'some' | 'all';
			margin?: string;
			root?: Element | null;
		};
	}
}
