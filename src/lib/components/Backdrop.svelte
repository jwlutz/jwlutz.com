<!--
	Shared decorative backdrop: two large blurred color orbs + a subtle grid mask.
	Used by the homepage dark mode and the consulting site (both modes).
	Parents decide when to mount it; this file is purely presentational.
-->
<div class="backdrop" aria-hidden="true">
	<div class="orb orb-green"></div>
	<div class="orb orb-blue"></div>
	<div class="grid"></div>
</div>

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
		z-index: -1;
	}

	.orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(60px);
		opacity: 0.4;
	}

	.orb-green {
		width: 600px;
		height: 600px;
		background: var(--color-accent);
		top: -200px;
		right: -100px;
	}

	.orb-blue {
		width: 400px;
		height: 400px;
		background: var(--color-accent-secondary);
		bottom: 20%;
		left: -100px;
		opacity: 0.2;
	}

	.grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
		background-size: 80px 80px;
		mask-image: radial-gradient(ellipse 100% 80% at 50% 20%, black, transparent);
	}
</style>
