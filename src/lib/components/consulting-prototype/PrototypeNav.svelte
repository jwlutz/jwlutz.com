<script lang="ts">
	import ConsultingMark from '$lib/components/ConsultingMark.svelte';
	import { consultingSite, navCopy } from '$lib/content/consulting-prototype';
	import { track } from '$lib/analytics';

	let {
		links,
		brandHref,
		ariaLabel
	}: { links: { label: string; href: string }[]; brandHref: string; ariaLabel: string } = $props();

	let menuOpen = $state(false);

	function close() {
		menuOpen = false;
	}

	function toggleMenu() {
		menuOpen = !menuOpen;
		track('mobile_nav_toggle', { source: 'consulting_prototype', open: menuOpen });
	}
</script>

<svelte:window onkeydown={(event) => { if (event.key === 'Escape') close(); }} />

<header class="proto-nav">
	<a class="brand" href={brandHref} onclick={close}><ConsultingMark size={28} /><b>{consultingSite.brand}</b></a>
	<nav aria-label={ariaLabel}>
		{#each links as link}<a href={link.href}>{link.label}</a>{/each}
	</nav>
	<div class="nav-actions">
		<a class="nav-cta" href="#contact" onclick={() => track('cta_click', { source: 'consulting_prototype', location: 'nav' })}>{consultingSite.hero.primaryCta}</a>
		<button
			class="nav-toggle"
			type="button"
			aria-expanded={menuOpen}
			aria-controls="proto-mobile-menu"
			aria-label={menuOpen ? 'Close menu' : 'Open menu'}
			onclick={toggleMenu}
		><i></i><i></i></button>
	</div>
</header>

{#if menuOpen}
	<div class="mobile-menu" id="proto-mobile-menu">
		<nav aria-label={`${ariaLabel} (mobile)`}>
			{#each links as link, index}<a href={link.href} style={`--i:${index}`} onclick={close}>{link.label}</a>{/each}
		</nav>
		<a class="menu-cta" href="#contact" onclick={() => { close(); track('cta_click', { source: 'consulting_prototype', location: 'mobile_menu' }); }}>{consultingSite.hero.primaryCta}<small>{navCopy.mobileCtaHint}</small></a>
	</div>
{/if}

<style>
	.proto-nav { height:72px; position:fixed; z-index:40; left:0; right:0; top:0; display:flex; align-items:center; justify-content:space-between; padding:0 32px; background:#0a0d0b; border-bottom:1px solid var(--proto-line); }
	.brand { display:flex; align-items:center; gap:12px; text-decoration:none; color:inherit; font-size:13px; }
	.proto-nav nav { display:flex; gap:27px; }
	.proto-nav nav a { color:var(--proto-muted); text-decoration:none; font-size:12px; transition:color .2s ease; }
	.proto-nav nav a:hover { color:var(--proto-paper); }
	.nav-actions { display:flex; align-items:center; gap:18px; }
	.nav-cta { padding:11px 15px; background:var(--proto-paper); color:var(--proto-bg); text-decoration:none; font-size:12px; font-weight:600; }
	.nav-cta:hover { background:var(--proto-brass); }

	.nav-toggle { display:none; position:relative; width:40px; height:40px; margin-right:-8px; padding:0; border:0; background:none; cursor:pointer; }
	.nav-toggle i { position:absolute; left:10px; right:10px; top:17px; height:1px; background:var(--proto-paper); transition:transform .3s cubic-bezier(.2,.75,.2,1); }
	.nav-toggle i:last-child { top:23px; }
	.nav-toggle[aria-expanded='true'] i:first-child { transform:translateY(3px) rotate(45deg); }
	.nav-toggle[aria-expanded='true'] i:last-child { transform:translateY(-3px) rotate(-45deg); }

	.mobile-menu { position:fixed; z-index:39; inset:72px 0 0; display:none; flex-direction:column; padding:34px 24px 30px; background:#080b09; }
	.mobile-menu nav { display:flex; flex-direction:column; }
	.mobile-menu nav a { padding:20px 0; border-bottom:1px solid var(--proto-line); color:var(--proto-text); text-decoration:none; font:400 clamp(30px,8vw,40px)/1 var(--proto-display); letter-spacing:-.02em; animation:menu-item .45s cubic-bezier(.2,.75,.2,1) both; animation-delay:calc(var(--i) * 60ms); }
	.mobile-menu nav a:active { color:var(--proto-brass); }
	.menu-cta { margin-top:auto; display:flex; align-items:center; justify-content:space-between; gap:20px; padding:16px 18px; background:var(--proto-paper); color:var(--proto-bg); text-decoration:none; font-size:13px; font-weight:600; animation:menu-item .45s cubic-bezier(.2,.75,.2,1) .2s both; }
	.menu-cta small { font:500 9px var(--proto-mono); letter-spacing:.04em; opacity:.62; }
	@keyframes menu-item { from { opacity:0; transform:translateY(14px); } }

	@media (max-width: 850px) {
		.proto-nav { padding:0 16px; }
		.proto-nav nav { display:none; }
		.brand b { font-size:11px; }
		.nav-cta { padding:9px 12px; font-size:11px; }
		.nav-toggle { display:block; }
		.mobile-menu { display:flex; }
	}
	@media (prefers-reduced-motion: reduce) {
		.mobile-menu nav a, .menu-cta { animation:none; }
		.nav-toggle i { transition:none; }
	}
</style>
