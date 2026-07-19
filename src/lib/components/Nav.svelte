<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import ThemeToggle from './ThemeToggle.svelte';
	import { track } from '$lib/analytics';

	let { activeSection = 'home' }: { activeSection?: string } = $props();
	let mobileMenuOpen = $state(false);
	let isHomepage = $derived($page.url.pathname === '/');

	$effect(() => {
		$page.url.pathname;
		mobileMenuOpen = false;
	});

	const navItems = [
		{ id: 'home', label: 'Home' },
		{ id: 'projects', label: 'Work' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'skills', label: 'Stack' },
		{ id: 'contact', label: 'Contact' }
	];

	function navigateToSection(id: string) {
		if (isHomepage) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
		else goto(`/#${id}`);
		mobileMenuOpen = false;
	}

	function trackResume(source: 'nav_desktop' | 'nav_mobile') {
		track('resume_download', { source });
	}
</script>

<header class="site-nav">
	<nav aria-label="Primary navigation">
		<button class="brand" onclick={() => navigateToSection('home')} aria-label="Back to portfolio home">
			<span class="mark">JL</span>
			<span class="brand-copy"><b>Jack Lutz</b><small>Personal portfolio</small></span>
		</button>

		<div class="desktop-links">
			{#each navItems as item}
				<button class:active={activeSection === item.id} onclick={() => navigateToSection(item.id)}>
					{item.label}
				</button>
			{/each}
		</div>

		<div class="nav-actions">
			<a href="/Jack_Lutz_Resume.pdf" target="_blank" rel="noopener noreferrer" onclick={() => trackResume('nav_desktop')}>Resume</a>
			<a class="consulting-link" href="/consulting">Consulting</a>
			<ThemeToggle />
			<button
				class="menu-toggle"
				class:open={mobileMenuOpen}
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				aria-label="Toggle navigation menu"
				aria-expanded={mobileMenuOpen}
			>
				<i></i><i></i>
			</button>
		</div>

		{#if mobileMenuOpen}
			<div class="mobile-menu">
				{#each navItems as item, i}
					<button class:active={activeSection === item.id} onclick={() => navigateToSection(item.id)}>
						<small>0{i + 1}</small><span>{item.label}</span>
					</button>
				{/each}
				<a href="/Jack_Lutz_Resume.pdf" target="_blank" rel="noopener noreferrer" onclick={() => trackResume('nav_mobile')}>
					<small>PDF</small><span>Resume</span>
				</a>
				<a href="/consulting"><small>LCG</small><span>Consulting practice</span></a>
			</div>
		{/if}
	</nav>
</header>

<style>
	.site-nav {
		position: fixed;
		z-index: 60;
		inset: 0 0 auto;
		height: 70px;
		border-bottom: 1px solid var(--color-border);
		background: color-mix(in srgb, var(--color-background) 96%, transparent);
	}

	nav { position: relative; width: min(1440px, 100%); height: 100%; margin: 0 auto; padding: 0 28px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; }
	button, a { font-family: var(--font-family-sans); }

	.brand { justify-self: start; padding: 0; display: flex; align-items: center; gap: 12px; border: 0; background: transparent; color: var(--color-text-primary); cursor: pointer; text-align: left; }
	.mark { width: 34px; height: 34px; display: grid; place-items: center; border: 1px solid var(--color-brass); color: var(--color-brass); font: 500 10px var(--font-family-mono); letter-spacing: .04em; }
	.brand-copy { display: flex; flex-direction: column; gap: 3px; }
	.brand-copy b { font-size: 12px; font-weight: 650; }
	.brand-copy small { color: var(--color-text-muted); font: 500 8px var(--font-family-mono); letter-spacing: .08em; text-transform: uppercase; }

	.desktop-links { display: flex; align-items: stretch; height: 100%; }
	.desktop-links button { position: relative; padding: 0 16px; border: 0; background: transparent; color: var(--color-text-secondary); font-size: 11px; cursor: pointer; }
	.desktop-links button::after { content: ''; position: absolute; left: 16px; right: 16px; bottom: -1px; height: 2px; background: var(--color-brass); transform: scaleX(0); transform-origin: left; transition: transform 180ms ease; }
	.desktop-links button:hover, .desktop-links button.active { color: var(--color-text-primary); }
	.desktop-links button.active::after { transform: scaleX(1); }

	.nav-actions { justify-self: end; display: flex; align-items: center; gap: 8px; }
	.nav-actions > a { min-height: 34px; padding: 0 11px; display: inline-flex; align-items: center; border: 1px solid transparent; color: var(--color-text-secondary); font-size: 10px; text-decoration: none; }
	.nav-actions > a:hover { color: var(--color-text-primary); }
	.nav-actions > .consulting-link { border-color: var(--color-border-strong); }
	.nav-actions > .consulting-link:hover { border-color: var(--color-brass); }

	.menu-toggle { display: none; width: 36px; height: 34px; padding: 0 9px; border: 1px solid var(--color-border-strong); background: transparent; cursor: pointer; }
	.menu-toggle i { display: block; height: 1px; margin: 5px 0; background: var(--color-text-primary); transition: transform 180ms ease; }
	.menu-toggle.open i:first-child { transform: translateY(3px) rotate(45deg); }
	.menu-toggle.open i:last-child { transform: translateY(-3px) rotate(-45deg); }

	.mobile-menu { position: absolute; top: 69px; left: 0; right: 0; padding: 18px 20px 22px; display: grid; border-bottom: 1px solid var(--color-border-strong); background: var(--color-background); }
	.mobile-menu button, .mobile-menu a { min-height: 48px; padding: 0; display: grid; grid-template-columns: 48px 1fr; align-items: center; border: 0; border-bottom: 1px solid var(--color-border); background: transparent; color: var(--color-text-secondary); text-align: left; text-decoration: none; }
	.mobile-menu button.active, .mobile-menu button:hover, .mobile-menu a:hover { color: var(--color-text-primary); }
	.mobile-menu small { color: var(--color-brass); font: 500 8px var(--font-family-mono); }
	.mobile-menu span { font-size: 13px; }

	@media (max-width: 1020px) {
		nav { grid-template-columns: 1fr auto; padding: 0 16px; }
		.desktop-links, .nav-actions > a { display: none; }
		.menu-toggle { display: block; }
	}

	@media (max-width: 520px) { .brand-copy small { display: none; } }
</style>
