<script lang="ts">
	import { darkMode, toggleDarkMode } from '$lib/stores/darkMode';
	let isDarkMode = $derived($darkMode);
</script>

<button onclick={toggleDarkMode} class="theme-toggle" aria-label="Switch to {isDarkMode ? 'light' : 'dark'} mode">
	<span>{isDarkMode ? 'Dark' : 'Light'}</span>
	<i aria-hidden="true"></i>
</button>

<style>
	.theme-toggle { min-width: 58px; height: 34px; padding: 0 8px; display: flex; align-items: center; justify-content: space-between; gap: 7px; border: 1px solid var(--color-border-strong); border-radius: 1px; background: transparent; color: var(--color-text-muted); cursor: pointer; }
	.theme-toggle:hover { color: var(--color-text-primary); border-color: var(--color-brass); }
	.theme-toggle span { font: 500 8px var(--font-family-mono); letter-spacing: .05em; text-transform: uppercase; }
	.theme-toggle i { width: 6px; height: 6px; background: var(--color-brass); }
</style>
