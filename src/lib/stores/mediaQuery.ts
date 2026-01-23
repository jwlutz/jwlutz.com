import { readable } from 'svelte/store';
import { browser } from '$app/environment';

export function createMediaQueryStore(query: string) {
	return readable(false, (set) => {
		if (!browser) return;

		const mediaQuery = window.matchMedia(query);
		set(mediaQuery.matches);

		const handler = (e: MediaQueryListEvent) => set(e.matches);
		mediaQuery.addEventListener('change', handler);

		return () => mediaQuery.removeEventListener('change', handler);
	});
}

export const isMobile = createMediaQueryStore('(max-width: 768px)');
export const prefersReducedMotion = createMediaQueryStore('(prefers-reduced-motion: reduce)');
