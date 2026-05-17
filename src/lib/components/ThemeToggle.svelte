<script lang="ts">
	import { darkMode, toggleDarkMode } from '$lib/stores/darkMode';
	let isDarkMode = $derived($darkMode);
</script>

<button
	onclick={toggleDarkMode}
	class="theme-toggle"
	class:dark={isDarkMode}
	aria-label="Toggle dark mode"
	title="{isDarkMode ? 'Dark' : 'Light'} mode"
>
	<svg class="sun-icon" fill="currentColor" viewBox="0 0 24 24">
		<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
	</svg>
	<span class="toggle-track">
		<span class="toggle-thumb"></span>
	</span>
	<svg class="moon-icon" fill="currentColor" viewBox="0 0 24 24">
		<path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
	</svg>
</button>

<style>
	.theme-toggle {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem;
		border-radius: 9999px;
		background: transparent;
		border: none;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.theme-toggle:hover {
		background: rgba(128, 128, 128, 0.1);
	}

	.sun-icon,
	.moon-icon {
		width: 1rem;
		height: 1rem;
		transition: all 0.3s ease;
	}

	.sun-icon {
		color: #f59e0b;
	}

	.moon-icon {
		color: var(--color-text-secondary);
	}

	.theme-toggle.dark .sun-icon {
		color: var(--color-text-secondary);
	}

	.theme-toggle.dark .moon-icon {
		color: #8b5cf6;
	}

	.toggle-track {
		position: relative;
		width: 2.5rem;
		height: 1.25rem;
		background: var(--color-border);
		border-radius: 9999px;
		transition: all 0.3s ease;
	}

	.theme-toggle.dark .toggle-track {
		background: var(--color-accent);
	}

	.toggle-thumb {
		position: absolute;
		top: 2px;
		left: 2px;
		width: 1rem;
		height: 1rem;
		background: white;
		border-radius: 50%;
		transition: all 0.3s ease;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	}

	.theme-toggle.dark .toggle-thumb {
		left: calc(100% - 1rem - 2px);
	}
</style>
