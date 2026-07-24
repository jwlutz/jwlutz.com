<script lang="ts">
	let { size = 34, title = 'Lutz Consulting Group' }: { size?: number; title?: string } = $props();
</script>

<!-- Mark B, "the Seal" - Jack's pick 2026-07-18 (style board section 08,
     tickets/completed/lcg-logo-directions.md). Serif LCG in a ruled square
     over a brass baseline. Same size/title API as the provisional mark. -->
<svg
	class="mark"
	width={size}
	height={size}
	viewBox="0 0 40 40"
	fill="none"
	role="img"
	aria-label={title}
>
	<rect x="2.5" y="2.5" width="35" height="35" />
	<text x="20" y="23.5" text-anchor="middle">LCG</text>
	<line x1="9" y1="28.5" x2="31" y2="28.5" />
</svg>

<style>
	.mark {
		display: block;
		color: currentColor;
	}

	rect {
		stroke: currentColor;
		stroke-width: 1.4;
	}

	text {
		fill: currentColor;
		font: 400 15px 'Instrument Serif', Georgia, serif;
		letter-spacing: -0.5px;
	}

	line {
		stroke: var(--lcg-accent, #b49a67);
		stroke-width: 1.6;
	}
</style>
