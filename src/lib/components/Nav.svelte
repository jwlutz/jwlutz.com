<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { profile } from '$lib/content';
	import { track, trackOutbound } from '$lib/analytics';

	let { activeSection = 'home' }: { activeSection?: string } = $props();
	let mobileMenuOpen = $state(false);
	let isHomepage = $derived($page.url.pathname === '/');

	$effect(() => {
		$page.url.pathname;
		mobileMenuOpen = false;
	});

	const navItems = [
		{ id: 'home', label: 'Home' },
		{ id: 'skills', label: 'Stack' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'contact', label: 'Contact' }
	];
	const socialLinks = [
		{ label: 'GitHub', href: profile.social.github, icon: 'mdi:github', external: true },
		{ label: 'LinkedIn', href: profile.social.linkedin, icon: 'mdi:linkedin', external: true },
		{ label: 'Email', href: `mailto:${profile.email}`, icon: 'mdi:email-outline', external: false }
	];

	function navigateToSection(id: string) {
		if (isHomepage) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
		else goto(`/#${id}`);
		mobileMenuOpen = false;
	}

	function trackResume(source: 'nav_desktop' | 'nav_mobile') {
		track('resume_download', { source });
	}

	function trackSocial(link: (typeof socialLinks)[number], source: 'nav_desktop' | 'nav_mobile') {
		if (link.external) trackOutbound(link.href, source);
		else track('email_click', { source });
	}
</script>

<header class="site-nav">
	<nav aria-label="Primary navigation">
		<button class="brand" onclick={() => navigateToSection('home')} aria-label="Back to portfolio home">
			<span class="mark">JL</span>
			<span class="brand-copy"><b>Jack Lutz</b></span>
		</button>

		<div class="desktop-links">
			{#each navItems as item}
				<button class:active={activeSection === item.id} onclick={() => navigateToSection(item.id)}>
					{item.label}
				</button>
			{/each}
		</div>

		<div class="nav-actions">
			<div class="social-actions" aria-label="Connect with Jack Lutz">
				{#each socialLinks as link}
					<a
						class="social-link"
						href={link.href}
						target={link.external ? '_blank' : undefined}
						rel={link.external ? 'noopener noreferrer' : undefined}
						aria-label={link.label}
						title={link.label}
						onclick={() => trackSocial(link, 'nav_desktop')}
					><Icon icon={link.icon} /></a>
				{/each}
			</div>
			<a href="/Jack_Lutz_Resume.pdf" target="_blank" rel="noopener noreferrer" onclick={() => trackResume('nav_desktop')}>Resume</a>
			<a class="consulting-link" href="/consulting">Consulting</a>
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
				<div class="mobile-socials" aria-label="Connect with Jack Lutz">
					{#each socialLinks as link}
						<a
							href={link.href}
							target={link.external ? '_blank' : undefined}
							rel={link.external ? 'noopener noreferrer' : undefined}
							aria-label={link.label}
							title={link.label}
							onclick={() => trackSocial(link, 'nav_mobile')}
						><Icon icon={link.icon} /><span>{link.label}</span></a>
					{/each}
				</div>
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
	.brand-copy { display: flex; align-items: center; }
	.brand-copy b { font-size: 12px; font-weight: 650; }

	.desktop-links { display: flex; align-items: stretch; height: 100%; }
	.desktop-links button { position: relative; padding: 0 16px; border: 0; background: transparent; color: var(--color-text-secondary); font-size: 11px; cursor: pointer; }
	.desktop-links button::after { content: ''; position: absolute; left: 16px; right: 16px; bottom: -1px; height: 2px; background: var(--color-brass); transform: scaleX(0); transform-origin: left; transition: transform 180ms ease; }
	.desktop-links button:hover, .desktop-links button.active { color: var(--color-text-primary); }
	.desktop-links button.active::after { transform: scaleX(1); }

	.nav-actions { justify-self: end; display: flex; align-items: center; gap: 8px; }
	.social-actions { display: flex; align-items: center; gap: 4px; }
	.social-link { width: 32px; height: 32px; display: grid; place-items: center; border: 1px solid transparent; color: var(--color-text-muted); text-decoration: none; transition: color 180ms ease, border-color 180ms ease; }
	.social-link :global(svg) { width: 16px; height: 16px; }
	.social-link:hover { border-color: var(--color-border-strong); color: var(--color-text-primary); }
	.social-link:focus-visible { outline: 2px solid var(--color-brass); outline-offset: 2px; }
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
	.mobile-socials { min-height: 62px; display: flex; align-items: flex-end; gap: 10px; }
	.mobile-socials a { width: auto; min-width: 44px; min-height: 40px; padding: 0 12px; display: inline-flex; grid-template-columns: none; gap: 8px; border: 1px solid var(--color-border-strong); color: var(--color-text-secondary); }
	.mobile-socials a :global(svg) { width: 17px; height: 17px; }
	.mobile-socials a span { font-size: 10px; }

	@media (max-width: 1020px) {
		nav { grid-template-columns: 1fr auto; padding: 0 16px; }
		.desktop-links, .nav-actions > a, .social-actions { display: none; }
		.menu-toggle { display: block; }
	}

</style>
