	<script lang="ts">
	import { onMount } from 'svelte';
	import { animate as motionAnimate, inView, scroll, stagger as motionStagger } from 'motion';
	import { consultingSite } from '$lib/content/consulting-prototype';
	import PrototypeNav from './PrototypeNav.svelte';
	import PrototypeThroughlineStory from './PrototypeThroughlineStory.svelte';
	import PrototypeSplitView from './PrototypeSplitView.svelte';
	import PrototypeOperatingLoop from './PrototypeOperatingLoop.svelte';
	import PrototypeLowerSections from './PrototypeLowerSections.svelte';
	import PrototypeFooter from './PrototypeFooter.svelte';

	let pageProgress = $state(0);
	let prototypeRoot: HTMLElement;
	const workHref = '/consulting/prototypes/editorial/work';

	onMount(() => {
		const cleanups: (() => void)[] = [];
		cleanups.push(scroll((progress: number) => { pageProgress = progress; }));

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!reducedMotion) {
			for (const section of prototypeRoot.querySelectorAll<HTMLElement>('[data-motion-section]')) {
				const stop = inView(section, () => {
					const items = section.querySelectorAll<HTMLElement>('[data-motion-item]');
					if (items.length) {
						motionAnimate(items, { opacity: [0, 1], y: [28, 0] }, {
							duration: 0.75,
							delay: motionStagger(0.07),
							ease: [0.2, 0.75, 0.2, 1]
						});
					}
				}, { amount: 0.16 });
				cleanups.push(stop);
			}
		}

		return () => cleanups.forEach((cleanup) => cleanup());
	});
</script>

<svelte:head>
	<title>Lutz Consulting Group — Websites, AI Integrations, and Analytics</title>
	<meta name="description" content="Lutz Consulting Group designs, builds, and operates websites, AI integrations, analytics, and the systems behind them." />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Lutz Consulting Group" />
	<meta property="og:title" content="Lutz Consulting Group — Websites, AI Integrations, and Analytics" />
	<meta property="og:description" content="We design, build, and operate the digital systems behind your business—so you can keep running the business." />
	<meta name="twitter:card" content="summary" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
</svelte:head>

<div class="prototype" bind:this={prototypeRoot}>
	<a class="skip-link" href="#main-content">Skip to main content</a>
	<div class="page-thread" aria-hidden="true"><i style={`transform:scaleY(${pageProgress})`}></i><b style={`transform:translateY(calc(${pageProgress} * (100vh - 72px)))`}></b></div>
	<PrototypeNav
		links={[
			{ label: 'Services', href: '#services' },
			{ label: 'Work', href: workHref },
			{ label: 'Contact', href: '#contact' }
		]}
		brandHref="#top"
		ariaLabel="Prototype navigation"
	/>

	<main id="main-content">
		<div id="throughline"><PrototypeThroughlineStory storageKey="lcg_editorial_story_seen" {workHref} /></div>

		<PrototypeSplitView />

		<PrototypeOperatingLoop />

		<PrototypeLowerSections />
	</main>

	<PrototypeFooter />
</div>

<style>
	:global(html) { scroll-behavior: smooth; background: #080b09; }
	:global(body) { margin: 0; background: #080b09 !important; }
	.prototype {
		--proto-bg:#080b09; --proto-surface:#131815; --proto-surface-2:#19201b; --proto-green:#07543f; --proto-green-light:#2d8064; --proto-green-deep:#0d2d24; --proto-text:#f0efe9; --proto-muted:#9b9d98; --proto-paper:#dad6cc; --proto-leather:#774633; --proto-brass:#b49a67; --proto-line:rgba(240,239,233,.1); --proto-line-strong:rgba(240,239,233,.18); --proto-display:'Instrument Serif',Georgia,serif; --proto-sans:'DM Sans',sans-serif; --proto-mono:'IBM Plex Mono',monospace;
		background:var(--proto-bg); color:var(--proto-text); font-family:var(--proto-sans); min-height:100vh; overflow:clip;
	}
	.prototype, .prototype * { box-sizing: border-box; }
	.skip-link { position:fixed;z-index:100;left:16px;top:12px;transform:translateY(-160%);padding:11px 14px;background:var(--proto-paper);color:var(--proto-bg);font-size:12px;font-weight:600;text-decoration:none;transition:transform .2s ease; }
	.skip-link:focus { transform:translateY(0); }
	:global(.prototype a:focus-visible),:global(.prototype button:focus-visible){outline:2px solid var(--proto-green-light);outline-offset:4px}
	.page-thread { position:fixed; z-index:30; left:24px; top:72px; bottom:0; width:1px; background:var(--proto-line); pointer-events:none; }
	.page-thread i { display:block; height:100%; width:2px; background:var(--proto-green); transform-origin:top; will-change:transform; }
	.page-thread b { position:absolute; left:-3px; top:-3px; width:7px; height:7px; border-radius:50%; background:var(--proto-brass); box-shadow:0 0 0 5px var(--proto-bg); will-change:transform; }
	@media(max-width:760px){.page-thread{display:none}}
</style>
