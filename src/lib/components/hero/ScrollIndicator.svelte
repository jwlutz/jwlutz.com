<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let visible = $state(true);

	onMount(() => {
		if (!browser) return;

		const handleScroll = () => {
			visible = window.scrollY < 50;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

{#if visible}
	<div class="scroll-indicator" role="presentation" aria-hidden="true">
		<div class="mouse">
			<div class="wheel"></div>
		</div>
		<span class="hint">Scroll</span>
	</div>
{/if}

<style>
	.scroll-indicator {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		animation: fadeIn 1s ease-out 1.5s both;
	}

	.mouse {
		width: 24px;
		height: 40px;
		border: 2px solid var(--color-text-secondary);
		border-radius: 12px;
		position: relative;
		opacity: 0.6;
	}

	.wheel {
		width: 4px;
		height: 8px;
		background: var(--color-text-secondary);
		border-radius: 2px;
		position: absolute;
		top: 8px;
		left: 50%;
		transform: translateX(-50%);
		animation: scroll 1.5s ease-in-out infinite;
	}

	.hint {
		font-size: 0.75rem;
		color: var(--color-text-secondary);
		opacity: 0.6;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	@keyframes scroll {
		0% {
			opacity: 1;
			transform: translateX(-50%) translateY(0);
		}
		100% {
			opacity: 0;
			transform: translateX(-50%) translateY(16px);
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateX(-50%) translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateX(-50%) translateY(0);
		}
	}
</style>
