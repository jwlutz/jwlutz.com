<script lang="ts">
	let { size = 34, title = 'Lutz Consulting Group' }: { size?: number; title?: string } = $props();
</script>

<svg
	class="mark"
	width={size}
	height={size}
	viewBox="0 0 40 40"
	fill="none"
	role="img"
	aria-label={title}
>
	<path d="M3 7h10l7 7" />
	<path d="M3 20h17" />
	<path d="M3 33h10l7-7" />
	<path d="M20 14v12" />
	<path d="M20 20h17" />
	<circle cx="3" cy="7" r="2" />
	<circle cx="3" cy="20" r="2" />
	<circle cx="3" cy="33" r="2" />
	<circle cx="37" cy="20" r="2" />
</svg>

<style>
	.mark {
		display: block;
		color: currentColor;
	}

	path {
		stroke: currentColor;
		stroke-width: 1.6;
		stroke-linecap: square;
		stroke-linejoin: miter;
	}

	circle {
		fill: var(--lcg-accent, currentColor);
	}
</style>
