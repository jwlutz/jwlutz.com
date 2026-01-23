<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { prefersReducedMotion } from '$lib/stores/mediaQuery';

	let { simplified = false }: { simplified?: boolean } = $props();

	const shouldAnimate = $derived(!simplified && !$prefersReducedMotion);

	let scrollY = $state(0);

	onMount(() => {
		if (!browser) return;

		const handleScroll = () => {
			scrollY = window.scrollY;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<div
	class="animated-gradient"
	class:simplified={!shouldAnimate}
	style="transform: translateY({scrollY * 0.3}px);"
>
	<div class="gradient-blob blob-1"></div>
	<div class="gradient-blob blob-2"></div>
	<div class="gradient-blob blob-3"></div>
	<div class="gradient-blob blob-4"></div>
	<div class="noise-overlay"></div>
</div>

<style>
	.animated-gradient {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 200vh;
		overflow: visible;
		z-index: -1;
		pointer-events: none;
	}

	.gradient-blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.6;
	}

	/* Light mode colors - soft blues, teals, purples */
	.blob-1 {
		width: 60%;
		height: 60%;
		top: -10%;
		left: -10%;
		background: linear-gradient(135deg, #a5f3fc 0%, #7dd3fc 50%, #c4b5fd 100%);
		animation: float1 20s ease-in-out infinite;
	}

	.blob-2 {
		width: 50%;
		height: 50%;
		top: 50%;
		right: -10%;
		background: linear-gradient(135deg, #c4b5fd 0%, #a78bfa 50%, #93c5fd 100%);
		animation: float2 25s ease-in-out infinite;
	}

	.blob-3 {
		width: 40%;
		height: 40%;
		bottom: -10%;
		left: 20%;
		background: linear-gradient(135deg, #5eead4 0%, #67e8f9 50%, #a5f3fc 100%);
		animation: float3 18s ease-in-out infinite;
	}

	.blob-4 {
		width: 35%;
		height: 35%;
		top: 30%;
		left: 40%;
		background: linear-gradient(135deg, #fcd34d 0%, #fca5a5 50%, #c4b5fd 100%);
		opacity: 0.4;
		animation: float4 22s ease-in-out infinite;
	}

	/* Dark mode colors - deeper, moodier versions */
	:global(.dark) .blob-1 {
		background: linear-gradient(135deg, #0e7490 0%, #0369a1 50%, #6d28d9 100%);
		opacity: 0.5;
	}

	:global(.dark) .blob-2 {
		background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #1d4ed8 100%);
		opacity: 0.5;
	}

	:global(.dark) .blob-3 {
		background: linear-gradient(135deg, #047857 0%, #0891b2 50%, #0e7490 100%);
		opacity: 0.5;
	}

	:global(.dark) .blob-4 {
		background: linear-gradient(135deg, #b45309 0%, #be185d 50%, #7c3aed 100%);
		opacity: 0.3;
	}

	/* Subtle noise overlay for texture */
	.noise-overlay {
		position: absolute;
		inset: 0;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
		opacity: 0.03;
		pointer-events: none;
	}

	/* Animations */
	@keyframes float1 {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		25% {
			transform: translate(5%, 10%) scale(1.05);
		}
		50% {
			transform: translate(10%, 5%) scale(0.95);
		}
		75% {
			transform: translate(3%, -5%) scale(1.02);
		}
	}

	@keyframes float2 {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(-8%, 5%) scale(1.03);
		}
		66% {
			transform: translate(-3%, -8%) scale(0.97);
		}
	}

	@keyframes float3 {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		50% {
			transform: translate(10%, -10%) scale(1.1);
		}
	}

	@keyframes float4 {
		0%,
		100% {
			transform: translate(0, 0) scale(1) rotate(0deg);
		}
		25% {
			transform: translate(-5%, 8%) scale(1.05) rotate(5deg);
		}
		50% {
			transform: translate(5%, 5%) scale(0.95) rotate(-5deg);
		}
		75% {
			transform: translate(8%, -3%) scale(1.02) rotate(3deg);
		}
	}

	/* Simplified mode - static gradient */
	.simplified .gradient-blob {
		animation: none;
	}

	.simplified .blob-1 {
		opacity: 0.4;
	}

	.simplified .blob-2 {
		opacity: 0.3;
	}

	.simplified .blob-3 {
		opacity: 0.3;
	}

	.simplified .blob-4 {
		opacity: 0.2;
	}
</style>
