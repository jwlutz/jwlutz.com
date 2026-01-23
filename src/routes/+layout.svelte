<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Nav, Footer, profile } from '$lib';
	import { darkMode } from '$lib/stores/darkMode';
	import { onMount } from 'svelte';

	let { children } = $props();

	let activeSection = $state('home');

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

<!-- Dark mode background with grid lines -->
{#if $darkMode}
	<div class="dark-bg">
		<div class="gradient-orb orb-1"></div>
		<div class="gradient-orb orb-2"></div>
		<div class="grid-lines"></div>
	</div>
{/if}

<Nav {activeSection} {profile} />

<main>
	{@render children()}
</main>

<Footer />

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
</style>
