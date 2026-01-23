<script lang="ts">
	import '../../app.css';
	import { profile } from '$lib';
	import { darkMode, toggleDarkMode } from '$lib/stores/darkMode';

	let { children } = $props();
	let isDarkMode = $derived($darkMode);

	function scrollTo(id: string) {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
	}

	// Apply dark mode class to document
	$effect(() => {
		if (typeof document !== 'undefined') {
			document.documentElement.classList.toggle('dark', $darkMode);
		}
	});
</script>

<svelte:head>
	<title>Lutz Consulting Group</title>
</svelte:head>

<!-- Dark mode background with grid lines -->
{#if isDarkMode}
	<div class="dark-bg">
		<div class="gradient-orb orb-1"></div>
		<div class="gradient-orb orb-2"></div>
		<div class="grid-lines"></div>
	</div>
{/if}

<div class="layout" class:dark={isDarkMode}>
	<div class="nav-wrapper">
		<nav class:dark={isDarkMode}>
			<a href="/consulting" class="logo">LCG</a>
			<div class="nav-links">
				<button onclick={() => scrollTo('hero')}>Home</button>
				<button onclick={() => scrollTo('services')}>Services</button>
				<button onclick={() => scrollTo('work')}>Projects</button>
			</div>
			<div class="nav-buttons">
				<a href="/" class="cta-secondary">Portfolio</a>
				<button onclick={() => scrollTo('cta')} class="cta">Get in touch</button>
				<!-- Theme Toggle -->
				<button
					onclick={toggleDarkMode}
					class="theme-toggle"
					class:dark={isDarkMode}
					aria-label="Toggle dark mode"
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
			</div>
		</nav>
	</div>

	<main>
		{@render children()}
	</main>

	<footer class:dark={isDarkMode}>
		<div class="footer-left">
			<span>Lutz Consulting Group</span>
			<span class="separator">·</span>
			<a href="/" class="profile-link">Personal Portfolio</a>
		</div>
		<div class="links">
			<a href={profile.social.github} target="_blank" rel="noopener">GitHub</a>
			<a href="mailto:jwlutz65@gmail.com">Email</a>
			<a href={profile.social.linkedin} target="_blank" rel="noopener">LinkedIn</a>
		</div>
	</footer>
</div>

<style>
	/* Dark mode background */
	.dark-bg {
		position: fixed;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
		z-index: -1;
	}

	.gradient-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.4;
	}

	.orb-1 {
		width: 600px;
		height: 600px;
		background: #10b981;
		top: -200px;
		right: -100px;
	}

	.orb-2 {
		width: 400px;
		height: 400px;
		background: #3b82f6;
		bottom: 20%;
		left: -100px;
		opacity: 0.2;
	}

	.grid-lines {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
		background-size: 80px 80px;
		mask-image: radial-gradient(ellipse 100% 80% at 50% 20%, black, transparent);
	}

	.layout {
		background: linear-gradient(135deg, #fdf2f8 0%, #f8f9fa 25%, #eff6ff 50%, #f8f9fa 75%, #ecfdf5 100%);
		color: var(--color-text-primary);
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		transition: background 0.3s ease, color 0.3s ease;
	}

	.layout.dark {
		background: #0a0a0a;
		color: #fafafa;
	}

	.nav-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding: 1rem 1.5rem;
	}

	nav {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1.5rem;
		background: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border: 1px solid var(--color-border);
		border-radius: 0.75rem;
		transition: all 0.3s ease;
	}

	nav.dark {
		background: rgba(10, 10, 10, 0.9);
		border-color: #262626;
	}

	.logo {
		font-family: var(--font-family-mono);
		font-weight: 600;
		font-size: 1.125rem;
		color: var(--color-accent);
		text-decoration: none;
		letter-spacing: -0.01em;
	}

	.nav-links {
		display: flex;
		gap: 2rem;
	}

	.nav-links button,
	.nav-links a {
		background: none;
		border: none;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-secondary);
		cursor: pointer;
		transition: color 0.15s;
		text-decoration: none;
	}

	.nav-links button:hover,
	.nav-links a:hover {
		color: var(--color-text-primary);
	}

	.nav-buttons {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.cta {
		font-size: 0.8125rem;
		font-weight: 500;
		color: white;
		background: var(--color-accent);
		padding: 0.5rem 1rem;
		border-radius: 6px;
		border: none;
		cursor: pointer;
		text-decoration: none;
		transition: all 0.15s;
	}

	.cta:hover {
		background: var(--color-accent-hover);
	}

	.cta-secondary {
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--color-text-secondary);
		background: transparent;
		padding: 0.5rem 1rem;
		border-radius: 6px;
		border: 1px solid var(--color-border);
		text-decoration: none;
		transition: all 0.15s;
	}

	.cta-secondary:hover {
		color: var(--color-text-primary);
		border-color: var(--color-accent);
	}

	/* Theme Toggle */
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

	main {
		flex: 1;
	}

	footer {
		border-top: 1px solid var(--color-border);
		padding: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1rem;
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
		transition: all 0.3s ease;
	}

	footer.dark {
		border-color: #262626;
	}

	.footer-left {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8125rem;
		color: var(--color-text-secondary);
	}

	.separator {
		color: var(--color-border);
	}

	.profile-link {
		color: var(--color-text-secondary);
		text-decoration: none;
		transition: color 0.15s;
	}

	.profile-link:hover {
		color: var(--color-text-primary);
	}

	.links {
		display: flex;
		gap: 1.5rem;
	}

	.links a {
		font-size: 0.8125rem;
		color: var(--color-text-secondary);
		text-decoration: none;
		transition: color 0.15s;
	}

	.links a:hover {
		color: var(--color-text-primary);
	}

	@media (max-width: 640px) {
		.nav-wrapper {
			padding: 0.75rem 1rem;
		}

		nav {
			padding: 0.5rem 1rem;
		}

		.nav-links {
			display: none;
		}

		.nav-buttons {
			gap: 0.5rem;
		}

		.cta,
		.cta-secondary {
			padding: 0.4rem 0.75rem;
			font-size: 0.75rem;
		}

		footer {
			flex-direction: column;
			text-align: center;
			padding: 1.5rem 1rem;
		}

		.footer-left {
			flex-wrap: wrap;
			justify-content: center;
		}

		.links {
			gap: 1rem;
		}
	}
</style>
