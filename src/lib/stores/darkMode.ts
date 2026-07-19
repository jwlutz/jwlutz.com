import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Dark-only site: the light/dark toggle was removed 2026-07-19 per Jack, so the
// site always renders dark regardless of any previously saved preference.
function getInitialMode(): boolean {
	return true;
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
