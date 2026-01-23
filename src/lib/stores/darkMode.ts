import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

// Get system preference
function getSystemPreference(): boolean {
	if (browser) {
		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	}
	return false;
}

// Get initial mode - use saved preference or fall back to system
function getInitialMode(): boolean {
	if (browser) {
		const saved = localStorage.getItem('darkMode');
		if (saved !== null) {
			return saved === 'true';
		}
		// Default to system preference
		return getSystemPreference();
	}
	return false;
}

// Store for dark mode state
export const darkMode = writable<boolean>(getInitialMode());

// Persist to localStorage when changed
if (browser) {
	darkMode.subscribe((value) => {
		localStorage.setItem('darkMode', String(value));
	});
}

// Toggle function
export function toggleDarkMode(): void {
	darkMode.update((v) => !v);
}
