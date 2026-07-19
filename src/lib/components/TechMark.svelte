<script lang="ts">
	import { getTechIcon } from '$lib/data/tech-icons';

	let {
		tech,
		size = 'small',
		framed = true
	}: {
		tech: string;
		size?: 'tiny' | 'small' | 'rail' | 'feature';
		framed?: boolean;
	} = $props();

	const icon = $derived(getTechIcon(tech));
	const darkBrand = $derived(icon
		? ['#000000', '#1D1D1F', '#222222'].includes(icon.color.toUpperCase())
		: false);
</script>

{#if icon}
	<span
		class="tech-mark"
		class:framed
		data-size={size}
		style={`--tech-brand: ${darkBrand ? 'var(--color-text-primary)' : icon.color}`}
		aria-hidden="true"
	>
		<svg viewBox="0 0 24 24" focusable="false">
			{@html icon.icon}
		</svg>
	</span>
{/if}

<style>
	.tech-mark {
		display: inline-grid;
		place-items: center;
		flex: 0 0 auto;
		color: var(--tech-brand);
		transition: color 180ms ease, border-color 180ms ease, background 180ms ease, transform 180ms ease;
	}

	.tech-mark.framed {
		border: 1px solid color-mix(in srgb, var(--tech-brand) 28%, var(--color-border));
		background: color-mix(in srgb, var(--tech-brand) 7%, transparent);
	}

	.tech-mark[data-size='tiny'] { width: 15px; height: 15px; }
	.tech-mark[data-size='small'] { width: 22px; height: 22px; }
	.tech-mark[data-size='rail'] { width: 30px; height: 30px; }
	.tech-mark[data-size='feature'] { width: 48px; height: 48px; }

	svg {
		display: block;
		width: 56%;
		height: 56%;
		fill: currentColor;
	}

	.tech-mark:not(.framed) svg { width: 78%; height: 78%; }
</style>
