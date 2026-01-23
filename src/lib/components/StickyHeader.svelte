<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	// Section configuration
	const sections = [
		{ id: 'home', label: '', heading: '' }, // Hero has no sticky label
		{ id: 'skills', label: 'Skills', heading: 'Tech Stack' },
		{ id: 'experience', label: 'Background', heading: 'Experience' },
		{ id: 'projects', label: 'Work', heading: 'Projects' },
		{ id: 'contact', label: 'Contact', heading: 'Get in touch' }
	];

	let currentSection = $state<(typeof sections)[0] | null>(null);
	let isVisible = $state(false);
	let prevHeading = $state('');
	let isTransitioning = $state(false);

	let observers: IntersectionObserver[] = [];

	onMount(() => {
		if (!browser) return;

		// Create observers for each section
		sections.forEach((section) => {
			const element = document.getElementById(section.id);
			if (!element) return;

			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						// When section enters viewport (from top or bottom)
						if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
							const newSection = sections.find((s) => s.id === section.id);
							if (newSection && newSection.heading && newSection !== currentSection) {
								// Trigger transition animation
								if (currentSection?.heading) {
									prevHeading = currentSection.heading;
									isTransitioning = true;
									setTimeout(() => {
										isTransitioning = false;
									}, 300);
								}
								currentSection = newSection;
								isVisible = true;
							} else if (newSection && !newSection.heading) {
								// Hero section - hide the sticky header
								isVisible = false;
								currentSection = null;
							}
						}
					});
				},
				{
					threshold: [0.1, 0.5],
					rootMargin: '-80px 0px -50% 0px' // Trigger when section is in upper half of viewport
				}
			);

			observer.observe(element);
			observers.push(observer);
		});
	});

	onDestroy(() => {
		observers.forEach((obs) => obs.disconnect());
	});
</script>

{#if isVisible && currentSection?.heading}
	<div class="sticky-header" class:transitioning={isTransitioning}>
		<div class="sticky-content">
			<span class="sticky-label">{currentSection.label}</span>
			<span class="sticky-heading">{currentSection.heading}</span>
		</div>
	</div>
{/if}

<style>
	.sticky-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding: 1rem 1.5rem;
		background: linear-gradient(
			to bottom,
			rgba(var(--color-bg-rgb, 10, 10, 10), 0.95) 0%,
			rgba(var(--color-bg-rgb, 10, 10, 10), 0.8) 70%,
			rgba(var(--color-bg-rgb, 10, 10, 10), 0) 100%
		);
		pointer-events: none;
		animation: fadeIn 0.3s ease-out;
	}

	.sticky-content {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.sticky-label {
		font-size: 0.75rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-accent);
		opacity: 0.8;
	}

	.sticky-heading {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-text-primary);
		animation: slideIn 0.3s ease-out;
	}

	.transitioning .sticky-heading {
		animation: slideReplace 0.3s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateX(-10px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes slideReplace {
		0% {
			opacity: 1;
			transform: translateY(0);
		}
		50% {
			opacity: 0;
			transform: translateY(-8px);
		}
		51% {
			transform: translateY(8px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Mobile adjustments */
	@media (max-width: 640px) {
		.sticky-header {
			padding: 0.75rem 1rem;
		}

		.sticky-heading {
			font-size: 1rem;
		}
	}
</style>
