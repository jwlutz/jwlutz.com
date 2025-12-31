<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Nav, Footer, profile } from '$lib';

	let { children } = $props();

	let activeSection = $state('home');

	function handleScroll() {
		const sections = ['home', 'projects', 'experience', 'skills', 'contact'];
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

<Nav {activeSection} {profile} />

<main>
	{@render children()}
</main>

<Footer />
