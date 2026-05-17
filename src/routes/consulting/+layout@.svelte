<script lang="ts">
	import '../../app.css';
	import { profile, Backdrop, ThemeToggle } from '$lib';
	import { darkMode } from '$lib/stores/darkMode';

	let { children } = $props();
	let isDarkMode = $derived($darkMode);
	let mobileMenuOpen = $state(false);

	function scrollTo(id: string) {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
		mobileMenuOpen = false;
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

<!-- Always render the decorative backdrop on the consulting site (looks the
	same orb arrangement in both light and dark modes). -->
<Backdrop />

<div class="layout" class:dark={isDarkMode}>
	<div class="nav-wrapper" class:dark={isDarkMode}>
		<nav class:dark={isDarkMode}>
			<div class="nav-row">
				<button
					class="hamburger"
					class:open={mobileMenuOpen}
					onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
					aria-label="Toggle menu"
					aria-expanded={mobileMenuOpen}
				>
					{#if mobileMenuOpen}
						<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
						</svg>
					{:else}
						<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
						</svg>
					{/if}
				</button>
				<a href="/consulting" class="logo">LCG</a>
				<div class="nav-links">
					<button onclick={() => scrollTo('hero')}>Home</button>
					<button onclick={() => scrollTo('services')}>Services</button>
					<button onclick={() => scrollTo('work')}>Projects</button>
				</div>
				<div class="nav-buttons">
					<a href="/" class="cta-secondary">Portfolio</a>
					<button onclick={() => scrollTo('cta')} class="cta">Get in touch</button>
					<ThemeToggle />
				</div>
			</div>

			{#if mobileMenuOpen}
				<div class="mobile-menu" class:dark={isDarkMode}>
					<button onclick={() => scrollTo('hero')}>Home</button>
					<button onclick={() => scrollTo('services')}>Services</button>
					<button onclick={() => scrollTo('work')}>Projects</button>
					<button onclick={() => scrollTo('cta')}>Get in touch</button>
					<a href="/" onclick={() => (mobileMenuOpen = false)}>Portfolio</a>
				</div>
			{/if}
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
		background: rgba(255, 255, 255, 0.7);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--color-border);
		transition: background 0.3s ease, border-color 0.3s ease;
	}

	.nav-wrapper.dark {
		background: rgba(10, 10, 10, 0.7);
		border-bottom-color: #262626;
	}

	nav {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0.75rem 1.5rem;
		background: transparent;
		border: none;
	}

	.nav-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.hamburger {
		display: none;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		padding: 0.4rem;
		margin: -0.4rem 0 -0.4rem -0.4rem;
		color: var(--color-text-secondary);
		cursor: pointer;
		border-radius: 6px;
		transition: color 0.15s, background 0.15s;
	}

	.hamburger:hover {
		color: var(--color-text-primary);
		background: rgba(128, 128, 128, 0.08);
	}

	.mobile-menu {
		display: none;
		flex-direction: column;
		gap: 0.25rem;
		margin-top: 0.75rem;
		padding-top: 0.75rem;
		border-top: 1px solid var(--color-border);
	}

	.mobile-menu.dark {
		border-top-color: #262626;
	}

	.mobile-menu button,
	.mobile-menu a {
		text-align: left;
		background: none;
		border: none;
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--color-text-secondary);
		padding: 0.6rem 0.25rem;
		cursor: pointer;
		text-decoration: none;
		transition: color 0.15s;
	}

	.mobile-menu button:hover,
	.mobile-menu a:hover {
		color: var(--color-text-primary);
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

	@media (max-width: 768px) {
		.hamburger {
			display: inline-flex;
		}

		.nav-links {
			display: none;
		}

		/* Hide desktop CTAs in the row; surface them in the mobile menu instead.
		   Theme toggle stays accessible. */
		.nav-buttons .cta,
		.nav-buttons .cta-secondary {
			display: none;
		}

		.mobile-menu {
			display: flex;
		}
	}

	@media (max-width: 640px) {
		nav {
			padding: 0.5rem 1rem;
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
