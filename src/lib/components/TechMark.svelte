<script lang="ts">
	import Icon from '@iconify/svelte';
	import { getBrandIcon } from '$lib/data/brand-icons';
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

	const brandIcon = $derived(getBrandIcon(tech));
	const fallbackIcon = $derived(getTechIcon(tech));
	const darkBrand = $derived(fallbackIcon
		? ['#000000', '#1D1D1F', '#222222'].includes(fallbackIcon.color.toUpperCase())
		: false);
</script>

{#if brandIcon || fallbackIcon}
	<span
		class="tech-mark"
		class:framed
		class:full-color={Boolean(brandIcon)}
		data-size={size}
		style={`--tech-brand: ${darkBrand || brandIcon ? 'var(--color-text-primary)' : fallbackIcon?.color}`}
		aria-hidden="true"
	>
		{#if brandIcon}
			<Icon icon={brandIcon} class="brand-svg" />
		{:else if fallbackIcon}
			<svg class="fallback-svg" viewBox="0 0 24 24" focusable="false">
				{@html fallbackIcon.icon}
			</svg>
		{/if}
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
	.tech-mark.full-color.framed {
		border-color: var(--color-border);
		background: rgba(240, 239, 233, .025);
	}

	.tech-mark[data-size='tiny'] { width: 15px; height: 15px; }
	.tech-mark[data-size='small'] { width: 22px; height: 22px; }
	.tech-mark[data-size='rail'] { width: 30px; height: 30px; }
	.tech-mark[data-size='feature'] { width: 48px; height: 48px; }

	.fallback-svg {
		display: block;
		width: 56%;
		height: 56%;
		fill: currentColor;
	}

	.tech-mark:not(.framed) .fallback-svg { width: 78%; height: 78%; }
	.tech-mark :global(.brand-svg) { display: block; width: 78%; height: 78%; }
</style>
