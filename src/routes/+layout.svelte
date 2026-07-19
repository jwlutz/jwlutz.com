<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Nav, Footer, Backdrop } from '$lib';
	import { darkMode } from '$lib/stores/darkMode';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	let { children } = $props();

	let activeSection = $state('home');
	let isConsulting = $derived($page.url.pathname.startsWith('/consulting'));

	onMount(() => {
		injectAnalytics();
		injectSpeedInsights();
	});

	// Apply dark mode class to document
	$effect(() => {
		if (typeof document !== 'undefined') {
			document.documentElement.classList.toggle('dark', $darkMode);
		}
	});

	function handleScroll() {
		const sections = ['home', 'skills', 'experience', 'projects', 'contact'];
		const scrollPosition = window.scrollY + 100;

		for (const section of sections) {
			const element = document.getElementById(section);
			if (element) {
				const offsetTop = element.offsetTop;
				const offsetHeight = element.offsetHeight;
				if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
					activeSection = section;
					break;
				}
			}
		}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Jack Lutz | Portfolio</title>
</svelte:head>

<svelte:window onscroll={handleScroll} />

<!-- Dark mode background with grid lines (consulting layout renders its own) -->
{#if $darkMode && !isConsulting}
	<Backdrop />
{/if}

{#if !isConsulting}
	<Nav {activeSection} />
{/if}

<main class:portfolio-main={!isConsulting}>
	{@render children()}
</main>

{#if !isConsulting}
	<Footer />
{/if}
