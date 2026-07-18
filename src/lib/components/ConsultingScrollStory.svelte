<script lang="ts">
	import { onMount } from 'svelte';
	import ConsultingMark from './ConsultingMark.svelte';

	let shell: HTMLElement;
	let progress = $state(0);
	let raf = 0;

	const stages = [
		{
			kicker: 'A simple request',
			title: 'You needed a website.',
			body: 'A clear offer, a polished home, and somewhere to send people.'
		},
		{
			kicker: 'Then it had to work',
			title: 'Every screen. Every browser. Every customer.',
			body: 'Mobile layouts, accessibility, performance, domains, DNS, hosting, and deployments.'
		},
		{
			kicker: 'Then it joined the business',
			title: 'Payments. Email. Booking. Accounts.',
			body: 'The page became a system, connected to everything the business already relies on.'
		},
		{
			kicker: 'Then the connections multiplied',
			title: 'Every tool needed every other tool.',
			body: 'Products, customers, forms, inventory, vendors, webhooks, permissions, and automations.'
		},
		{
			kicker: 'Then you needed answers',
			title: 'Traffic is not insight.',
			body: 'Analytics only matters when someone monitors it, understands it, and decides what to change.'
		},
		{
			kicker: 'Then something changed',
			title: 'A credential expired. An API moved. Checkout broke.',
			body: 'The tools keep changing. The responsibility for keeping them working does not.'
		},
		{
			kicker: 'The real problem',
			title: "Don't become your own IT department.",
			body: 'You have a business to run. Technical sprawl should not become the work.'
		},
		{
			kicker: 'One accountable partner',
			title: 'Hand it to us.',
			body: 'We design it, connect it, measure it, and keep it working.'
		}
	];

	const nodes = [
		{ label: 'Domain + DNS', x: 16, y: 21, stage: 1, icon: '//' },
		{ label: 'Mobile', x: 82, y: 18, stage: 1, icon: '▯' },
		{ label: 'Hosting', x: 11, y: 52, stage: 1, icon: '↑' },
		{ label: 'Payments', x: 87, y: 45, stage: 2, icon: '$' },
		{ label: 'Email', x: 75, y: 78, stage: 2, icon: '@' },
		{ label: 'Booking', x: 24, y: 81, stage: 2, icon: '□' },
		{ label: 'Integrations', x: 51, y: 12, stage: 3, icon: '↔' },
		{ label: 'Analytics', x: 52, y: 88, stage: 4, icon: '⌁' },
		{ label: 'Monitoring', x: 6, y: 82, stage: 4, icon: '•' },
		{ label: 'Updates', x: 94, y: 78, stage: 5, icon: '!' }
	];

	let activeStage = $derived(Math.min(stages.length - 1, Math.floor(progress * stages.length)));
	let resolved = $derived(activeStage === stages.length - 1);
	let distressed = $derived(activeStage === 5 || activeStage === 6);

	function measure() {
		if (!shell) return;
		const rect = shell.getBoundingClientRect();
		const distance = Math.max(1, rect.height - window.innerHeight);
		progress = Math.min(1, Math.max(0, -rect.top / distance));
	}

	function scheduleMeasure() {
		if (raf) return;
		raf = requestAnimationFrame(() => {
			raf = 0;
			measure();
		});
	}

	onMount(() => {
		measure();
		return () => raf && cancelAnimationFrame(raf);
	});
</script>

<svelte:window onscroll={scheduleMeasure} onresize={scheduleMeasure} />

<section class="story-shell" bind:this={shell} aria-label="The hidden work behind a website">
	<div class="story-sticky">
		<div class="story-grid" aria-hidden="true"></div>

		<div class="story-copy" aria-live="polite">
			<div class="story-index">
				<span>{String(activeStage + 1).padStart(2, '0')}</span>
				<span class="index-line"></span>
				<span>{String(stages.length).padStart(2, '0')}</span>
			</div>

			{#each stages as stage, index}
				<div class="copy-stage" class:active={index === activeStage} aria-hidden={index !== activeStage}>
					<p class="kicker">{stage.kicker}</p>
					<h2>{stage.title}</h2>
					<p class="body-copy">{stage.body}</p>
				</div>
			{/each}
		</div>

		<div class="system-wrap" class:resolved class:distressed>
			<svg class="connections" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
				{#each nodes as node}
					<line
						x1="50"
						y1="50"
						x2={node.x}
						y2={node.y}
						class:visible={activeStage >= node.stage}
						class:warning={distressed && node.stage <= 5}
					/>
				{/each}
			</svg>

			{#each nodes as node}
				<div
					class="system-node"
					class:visible={activeStage >= node.stage}
					class:warning={distressed && node.stage <= 5}
					style={`--node-x: ${node.x}%; --node-y: ${node.y}%;`}
				>
					<span class="node-icon">{node.icon}</span>
					<span>{node.label}</span>
				</div>
			{/each}

			<div class="site-window">
				<div class="window-bar">
					<span></span><span></span><span></span>
					<small>{resolved ? 'managed by lutz consulting group' : 'yourbusiness.com'}</small>
				</div>

				<div class="site-content" class:resolved>
					{#if resolved}
						<ConsultingMark size={58} />
						<div>
							<strong>Lutz Consulting Group</strong>
							<span>Designed. Connected. Monitored.</span>
						</div>
					{:else}
						<div class="site-kicker"></div>
						<div class="site-title"></div>
						<div class="site-title short"></div>
						<div class="site-button"></div>
						<div class="site-cards"><span></span><span></span><span></span></div>
					{/if}
				</div>

				{#if distressed}
					<div class="incident"><span></span> connection failed</div>
				{/if}
			</div>
		</div>

		<div class="story-progress" aria-hidden="true">
			<span style={`transform: scaleX(${progress})`}></span>
		</div>
	</div>
</section>

<style>
	.story-shell {
		position: relative;
		height: 560vh;
		background: var(--lcg-bg);
	}

	.story-sticky {
		position: sticky;
		top: 0;
		height: 100vh;
		height: 100svh;
		overflow: hidden;
		display: grid;
		grid-template-columns: minmax(280px, 0.75fr) minmax(520px, 1.25fr);
		align-items: stretch;
		border-top: 1px solid var(--lcg-line);
		border-bottom: 1px solid var(--lcg-line);
		background:
			radial-gradient(circle at 78% 50%, rgba(199, 255, 87, 0.075), transparent 32%),
			var(--lcg-bg);
	}

	.story-grid {
		position: absolute;
		inset: 0;
		pointer-events: none;
		opacity: 0.28;
		background-image:
			linear-gradient(var(--lcg-line) 1px, transparent 1px),
			linear-gradient(90deg, var(--lcg-line) 1px, transparent 1px);
		background-size: 72px 72px;
		mask-image: linear-gradient(90deg, transparent, black 35%, black);
	}

	.story-copy {
		position: relative;
		z-index: 4;
		padding: clamp(6rem, 10vw, 9rem) clamp(2rem, 5vw, 5rem) 4rem;
		border-right: 1px solid var(--lcg-line);
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.story-index {
		position: absolute;
		top: 7rem;
		left: clamp(2rem, 5vw, 5rem);
		right: clamp(2rem, 5vw, 5rem);
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-family: var(--lcg-mono);
		font-size: 0.68rem;
		letter-spacing: 0.12em;
		color: var(--lcg-muted);
	}

	.index-line {
		height: 1px;
		flex: 1;
		background: var(--lcg-line-strong);
	}

	.copy-stage {
		position: absolute;
		left: clamp(2rem, 5vw, 5rem);
		right: clamp(2rem, 5vw, 5rem);
		top: 50%;
		transform: translateY(calc(-50% + 32px));
		opacity: 0;
		visibility: hidden;
		transition: opacity 440ms ease, transform 650ms cubic-bezier(0.22, 1, 0.36, 1), visibility 440ms;
	}

	.copy-stage.active {
		opacity: 1;
		visibility: visible;
		transform: translateY(-50%);
	}

	.kicker {
		font-family: var(--lcg-mono);
		font-size: 0.72rem;
		letter-spacing: 0.13em;
		text-transform: uppercase;
		color: var(--lcg-accent);
		margin: 0 0 1.25rem;
	}

	h2 {
		font-family: var(--lcg-display);
		font-weight: 400;
		font-size: clamp(2.75rem, 5vw, 5.9rem);
		line-height: 0.93;
		letter-spacing: -0.045em;
		max-width: 760px;
		margin: 0;
	}

	.body-copy {
		font-size: clamp(1rem, 1.35vw, 1.25rem);
		line-height: 1.6;
		color: var(--lcg-muted);
		max-width: 570px;
		margin: 1.75rem 0 0;
	}

	.system-wrap {
		position: relative;
		z-index: 2;
		min-width: 0;
	}

	.connections {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	.connections line {
		stroke: rgba(199, 255, 87, 0.42);
		stroke-width: 0.12;
		stroke-dasharray: 2 1;
		vector-effect: non-scaling-stroke;
		opacity: 0;
		transition: opacity 550ms ease, stroke 300ms ease;
	}

	.connections line.visible {
		opacity: 1;
	}

	.connections line.warning {
		stroke: rgba(255, 102, 82, 0.72);
	}

	.system-node {
		position: absolute;
		left: var(--node-x);
		top: var(--node-y);
		transform: translate(-50%, -50%) scale(0.82);
		display: flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.7rem 0.85rem;
		border: 1px solid var(--lcg-line-strong);
		background: rgba(13, 15, 16, 0.88);
		box-shadow: inset 0 1px rgba(255, 255, 255, 0.03);
		font-family: var(--lcg-mono);
		font-size: 0.66rem;
		letter-spacing: 0.04em;
		white-space: nowrap;
		opacity: 0;
		transition: opacity 500ms ease, transform 650ms cubic-bezier(0.22, 1, 0.36, 1), border-color 300ms, color 300ms;
	}

	.system-node.visible {
		opacity: 1;
		transform: translate(-50%, -50%) scale(1);
	}

	.system-node.warning {
		border-color: rgba(255, 102, 82, 0.62);
		color: #ff8c7a;
	}

	.resolved .system-node {
		opacity: 0;
		transform: translate(-50%, -50%) scale(0.7);
	}

	.resolved .connections line {
		opacity: 0;
	}

	.node-icon {
		display: grid;
		place-items: center;
		width: 1.35rem;
		height: 1.35rem;
		background: rgba(199, 255, 87, 0.1);
		color: var(--lcg-accent);
	}

	.site-window {
		position: absolute;
		left: 50%;
		top: 50%;
		width: min(44vw, 560px);
		aspect-ratio: 16 / 10;
		transform: translate(-50%, -50%);
		background: #111416;
		border: 1px solid rgba(255, 255, 255, 0.15);
		box-shadow: 0 32px 90px rgba(0, 0, 0, 0.55), inset 0 1px rgba(255, 255, 255, 0.06);
		transition: width 800ms cubic-bezier(0.22, 1, 0.36, 1), border-color 400ms, box-shadow 400ms;
	}

	.resolved .site-window {
		width: min(48vw, 650px);
		border-color: rgba(199, 255, 87, 0.5);
		box-shadow: 0 40px 130px rgba(0, 0, 0, 0.7), 0 0 80px rgba(199, 255, 87, 0.08);
	}

	.distressed .site-window {
		border-color: rgba(255, 102, 82, 0.62);
		animation: incident-shift 180ms steps(2, end) 2;
	}

	.window-bar {
		height: 2.6rem;
		border-bottom: 1px solid var(--lcg-line);
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0 0.9rem;
	}

	.window-bar > span {
		width: 0.42rem;
		height: 0.42rem;
		background: #44494b;
	}

	.window-bar small {
		font-family: var(--lcg-mono);
		font-size: 0.58rem;
		color: var(--lcg-muted);
		margin-left: auto;
	}

	.site-content {
		position: relative;
		height: calc(100% - 2.6rem);
		padding: clamp(1.3rem, 3vw, 2.6rem);
		background:
			linear-gradient(120deg, rgba(255, 255, 255, 0.025), transparent 60%),
			#101214;
	}

	.site-content.resolved {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.4rem;
		color: var(--lcg-accent);
	}

	.site-content.resolved div {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.site-content.resolved strong {
		font-family: var(--lcg-sans);
		font-size: clamp(1rem, 2vw, 1.5rem);
		font-weight: 600;
		color: var(--lcg-text);
	}

	.site-content.resolved span {
		font-family: var(--lcg-mono);
		font-size: 0.66rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--lcg-muted);
	}

	.site-kicker,
	.site-title,
	.site-button,
	.site-cards span {
		background: rgba(255, 255, 255, 0.11);
	}

	.site-kicker { width: 22%; height: 4%; margin-bottom: 7%; background: rgba(199, 255, 87, 0.48); }
	.site-title { width: 76%; height: 10%; margin-bottom: 3%; }
	.site-title.short { width: 52%; }
	.site-button { width: 24%; height: 10%; margin-top: 8%; background: rgba(199, 255, 87, 0.68); }
	.site-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4%; margin-top: 11%; height: 25%; }
	.site-cards span { border: 1px solid rgba(255, 255, 255, 0.05); }

	.incident {
		position: absolute;
		right: 1rem;
		bottom: 1rem;
		display: flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.55rem 0.7rem;
		background: rgba(255, 93, 72, 0.12);
		border: 1px solid rgba(255, 93, 72, 0.45);
		font-family: var(--lcg-mono);
		font-size: 0.62rem;
		color: #ff8c7a;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.incident span {
		width: 0.42rem;
		height: 0.42rem;
		background: #ff6652;
		box-shadow: 0 0 12px #ff6652;
	}

	.story-progress {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 2px;
		background: rgba(255, 255, 255, 0.06);
		z-index: 8;
	}

	.story-progress span {
		display: block;
		height: 100%;
		transform-origin: left;
		background: var(--lcg-accent);
	}

	@keyframes incident-shift {
		0%, 100% { transform: translate(-50%, -50%); }
		50% { transform: translate(calc(-50% + 3px), calc(-50% - 1px)); }
	}

	@media (max-width: 900px) {
		.story-shell { height: 520vh; }
		.story-sticky {
			grid-template-columns: 1fr;
			grid-template-rows: 44% 56%;
		}
		.story-copy {
			padding: 5rem 1.25rem 1.5rem;
			border-right: 0;
			border-bottom: 1px solid var(--lcg-line);
		}
		.story-index { top: 4.6rem; left: 1.25rem; right: 1.25rem; }
		.copy-stage { left: 1.25rem; right: 1.25rem; top: 58%; }
		h2 { font-size: clamp(2.2rem, 10vw, 4.2rem); }
		.body-copy { font-size: 0.92rem; margin-top: 0.85rem; }
		.system-wrap { min-height: 0; }
		.site-window { width: min(78vw, 520px); }
		.resolved .site-window { width: min(84vw, 570px); }
		.system-node { padding: 0.45rem; }
		.system-node > span:last-child { display: none; }
	}

	@media (prefers-reduced-motion: reduce) {
		.copy-stage,
		.system-node,
		.connections line,
		.site-window {
			transition-duration: 0.01ms !important;
		}
		.distressed .site-window { animation: none; }
	}
</style>
