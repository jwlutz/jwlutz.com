<script lang="ts">
	type Metric = { value: string; label: string };

	let {
		index,
		category,
		title,
		description,
		metrics,
		bullets,
		variant
	}: {
		index: string;
		category: string;
		title: string;
		description: string;
		metrics: Metric[];
		bullets: string[];
		variant: 'candella' | 'sparkling' | 'mindlsn';
	} = $props();
</script>

<article class="chapter" id={`work-${index}`}>
	<div class="visual-wrap">
		<div class="visual" class:candella={variant === 'candella'} class:sparkling={variant === 'sparkling'} class:mindlsn={variant === 'mindlsn'}>
			<div class="visual-grid"></div>

			{#if variant === 'candella'}
				<div class="candella-word">CANDELLA</div>
				<div class="trade-node lead">LEAD<br /><strong>FILLED</strong></div>
				<div class="trade-route"><span></span><span></span><span></span></div>
				<div class="engine-card"><small>ROUTING ENGINE</small><strong>447<span>ms</span></strong><em>mean fan-out</em></div>
				<div class="broker-stack"><span>WEBULL</span><span>TASTYTRADE</span><span>PUBLIC</span></div>
				<div class="metric-tile"><small>P90</small><strong>&lt; 500ms</strong></div>
			{:else if variant === 'sparkling'}
				<div class="sparkle-word">THE SPARKLING SHOE</div>
				<div class="store-browser">
					<div class="store-nav"><span>THE SPARKLING SHOE</span><i>SHOP &nbsp; ABOUT &nbsp; CART</i></div>
					<div class="store-hero"><strong>Find your<br />sparkle.</strong><button>SHOP SUMMER</button></div>
				</div>
				<div class="phone"><div></div><strong>Toe-tally<br />Fresh™</strong><span>Shop now →</span></div>
				<div class="migration"><small>MIGRATION</small><span>SQUARESPACE</span><b>→</b><span>SHOPIFY</span></div>
			{:else}
				<div class="mind-word">MINDLSN / MIND LESSON</div>
				<div class="drill-card"><small>WORKING MEMORY</small><strong>Digit Span.</strong><div class="digits"><span>7</span><span>4</span><span>9</span><span>2</span></div></div>
				<div class="rating-card"><small>MIND INDEX</small><strong>1,284</strong><svg viewBox="0 0 180 60" preserveAspectRatio="none"><path d="M0 48 C26 52, 34 28, 58 34 S93 48, 112 22 S151 28, 180 8" /></svg></div>
				<div class="integrity-card"><span></span><small>INTEGRITY CHECK</small><strong>PASS</strong></div>
			{/if}
		</div>
	</div>

	<div class="chapter-copy">
		<p class="chapter-label">SYSTEM {index} / {category}</p>
		<h3>{title}</h3>
		<p class="description">{description}</p>

		<div class="metrics">
			{#each metrics as metric}
				<div>
					<strong>{metric.value}</strong>
					<span>{metric.label}</span>
				</div>
			{/each}
		</div>

		<div class="built">
			<p>What we built</p>
			<ul>
				{#each bullets as bullet}
					<li>{bullet}</li>
				{/each}
			</ul>
		</div>
	</div>
</article>

<style>
	.chapter {
		display: grid;
		grid-template-columns: minmax(440px, 1fr) minmax(380px, 0.82fr);
		gap: clamp(3rem, 7vw, 8rem);
		padding: clamp(6rem, 11vw, 11rem) 0;
		border-top: 1px solid var(--lcg-line);
	}

	.visual-wrap { position: relative; min-height: 720px; }

	.visual {
		position: sticky;
		top: 6.5rem;
		width: 100%;
		aspect-ratio: 1;
		overflow: hidden;
		background: #101214;
		border: 1px solid var(--lcg-line-strong);
	}

	.visual-grid {
		position: absolute;
		inset: 0;
		opacity: 0.42;
		background-image:
			linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
		background-size: 18% 18%;
	}

	.chapter-copy {
		padding: 1rem 0 8rem;
		align-self: center;
	}

	.chapter-label {
		font-family: var(--lcg-mono);
		font-size: 0.68rem;
		letter-spacing: 0.13em;
		text-transform: uppercase;
		color: var(--lcg-accent);
		margin: 0 0 1.4rem;
	}

	h3 {
		font-family: var(--lcg-display);
		font-size: clamp(3rem, 5.6vw, 6.5rem);
		font-weight: 400;
		line-height: 0.92;
		letter-spacing: -0.045em;
		margin: 0;
	}

	.description {
		font-size: 1.08rem;
		line-height: 1.75;
		color: var(--lcg-muted);
		margin: 2rem 0 3rem;
		max-width: 620px;
	}

	.metrics {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		border-top: 1px solid var(--lcg-line-strong);
		border-left: 1px solid var(--lcg-line-strong);
	}

	.metrics div {
		padding: 1.25rem;
		border-right: 1px solid var(--lcg-line-strong);
		border-bottom: 1px solid var(--lcg-line-strong);
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}

	.metrics strong {
		font-family: var(--lcg-mono);
		font-size: clamp(1.35rem, 2.2vw, 2rem);
		font-weight: 500;
		letter-spacing: -0.04em;
	}

	.metrics span,
	.built p {
		font-family: var(--lcg-mono);
		font-size: 0.62rem;
		line-height: 1.45;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: var(--lcg-muted);
	}

	.built {
		margin-top: 3rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--lcg-line);
	}

	.built ul { list-style: none; padding: 0; margin: 1.25rem 0 0; }
	.built li { padding: 0.75rem 0; border-bottom: 1px solid var(--lcg-line); color: var(--lcg-text-soft); }
	.built li::before { content: '↳'; color: var(--lcg-accent); margin-right: 0.75rem; }

	/* Candella composition */
	.candella { background: #0c0c0f; color: #f2712f; }
	.candella .visual-grid { background-image: linear-gradient(rgba(242,113,47,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(242,113,47,.12) 1px, transparent 1px); }
	.candella-word { position: absolute; left: 5%; bottom: 2%; font: 700 clamp(3rem, 6vw, 7rem)/.8 var(--lcg-sans); letter-spacing: -.07em; color: rgba(255,255,255,.08); }
	.trade-node, .engine-card, .metric-tile { position: absolute; background: rgba(12,12,15,.92); border: 1px solid rgba(242,113,47,.45); font-family: var(--lcg-mono); }
	.trade-node { left: 8%; top: 17%; padding: 1rem; font-size: .66rem; color: #b8b5b1; }
	.trade-node strong { color: #fff; font-size: .9rem; }
	.trade-route { position: absolute; left: 25%; right: 22%; top: 25%; height: 1px; background: rgba(242,113,47,.35); }
	.trade-route span { position: absolute; top: -3px; width: 7px; height: 7px; background: #f2712f; animation: route-pulse 2.4s linear infinite; }
	.trade-route span:nth-child(2) { animation-delay: .8s; }
	.trade-route span:nth-child(3) { animation-delay: 1.6s; }
	.engine-card { left: 28%; top: 38%; width: 43%; padding: 1.4rem; }
	.engine-card small, .metric-tile small { display: block; font-size: .58rem; letter-spacing: .12em; color: #9b9691; }
	.engine-card strong { display: block; margin-top: 1rem; font-size: clamp(2rem, 5vw, 4.5rem); color: #fff; letter-spacing: -.08em; }
	.engine-card strong span { font-size: .8rem; color: #f2712f; margin-left: .25rem; }
	.engine-card em { display: block; font-size: .62rem; font-style: normal; color: #9b9691; }
	.broker-stack { position: absolute; right: 7%; top: 14%; display: flex; flex-direction: column; gap: .4rem; }
	.broker-stack span { padding: .65rem .8rem; border: 1px solid rgba(255,255,255,.12); background: rgba(12,12,15,.9); font: .55rem var(--lcg-mono); color: #d5d0cb; }
	.metric-tile { right: 7%; bottom: 10%; padding: 1rem; }
	.metric-tile strong { display: block; margin-top: .55rem; color: #fff; }

	/* Sparkling Shoe composition */
	.sparkling { background: #ffcee8; color: #34232b; }
	.sparkling .visual-grid { opacity: .25; background-image: linear-gradient(rgba(52,35,43,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(52,35,43,.18) 1px, transparent 1px); }
	.sparkle-word { position: absolute; left: 5%; bottom: 3%; font: 600 clamp(2.2rem, 4.7vw, 5.6rem)/.82 var(--lcg-display); letter-spacing: -.07em; color: rgba(52,35,43,.16); }
	.store-browser { position: absolute; left: 7%; top: 9%; width: 69%; height: 57%; background: #fff8ef; border: 1px solid rgba(52,35,43,.25); box-shadow: 0 22px 50px rgba(97,46,73,.18); transform: rotate(-2deg); }
	.store-nav { height: 17%; border-bottom: 1px solid rgba(52,35,43,.14); display: flex; align-items: center; justify-content: space-between; padding: 0 4%; font: 600 .55rem var(--lcg-sans); }
	.store-nav i { font: .42rem var(--lcg-mono); color: rgba(52,35,43,.65); }
	.store-hero { height: 83%; padding: 8%; background: radial-gradient(circle at 75% 45%, #f7a8d2, transparent 28%), linear-gradient(135deg, #f9efe6, #f8bddc); }
	.store-hero strong { display: block; font: 500 clamp(1.8rem, 4vw, 4rem)/.83 var(--lcg-display); }
	.store-hero button { margin-top: 10%; border: 1px solid #34232b; background: transparent; padding: .6rem .8rem; font: .45rem var(--lcg-mono); }
	.phone { position: absolute; right: 7%; top: 22%; width: 27%; height: 53%; background: #fff8ef; border: 4px solid #34232b; padding: 6% 4%; transform: rotate(4deg); box-shadow: 0 24px 45px rgba(97,46,73,.2); }
	.phone div { height: 48%; background: linear-gradient(135deg,#ff8fca,#ffddec); margin-bottom: 12%; }
	.phone strong { font: 500 clamp(1rem,2vw,1.8rem)/.85 var(--lcg-display); }
	.phone span { display: block; margin-top: 10%; font: .45rem var(--lcg-mono); }
	.migration { position: absolute; left: 9%; bottom: 10%; background: #34232b; color: #fff8ef; padding: .9rem 1rem; display: flex; align-items: center; gap: .7rem; font: .52rem var(--lcg-mono); }
	.migration small { color: #f8a8d0; }
	.migration b { color: #f8a8d0; }

	/* MindLSN composition */
	.mindlsn { background: #f4efe0; color: #1a1814; }
	.mindlsn .visual-grid { opacity: .34; background-image: linear-gradient(rgba(26,24,20,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(26,24,20,.14) 1px, transparent 1px); }
	.mind-word { position: absolute; left: 5%; top: 4%; font: .6rem var(--lcg-mono); letter-spacing: .14em; }
	.drill-card, .rating-card, .integrity-card { position: absolute; border: 1px solid rgba(26,24,20,.35); background: rgba(244,239,224,.94); box-shadow: 10px 12px 0 rgba(26,24,20,.08); }
	.drill-card { left: 8%; top: 17%; width: 56%; padding: 7%; }
	.drill-card small, .rating-card small, .integrity-card small { font: .5rem var(--lcg-mono); letter-spacing: .12em; color: rgba(26,24,20,.6); }
	.drill-card strong { display: block; margin: 10% 0 12%; font: 400 clamp(1.8rem,4vw,4rem)/1 var(--lcg-display); }
	.digits { display: grid; grid-template-columns: repeat(4,1fr); gap: 4%; }
	.digits span { display: grid; place-items: center; aspect-ratio: 1; background: #1a1814; color: #f4efe0; font: clamp(1rem,2.2vw,2rem) var(--lcg-mono); }
	.rating-card { right: 8%; top: 26%; width: 32%; padding: 5%; }
	.rating-card strong { display: block; margin-top: 8%; font: 500 clamp(1.4rem,3vw,3rem) var(--lcg-mono); }
	.rating-card svg { width: 100%; margin-top: 15%; overflow: visible; }
	.rating-card path { fill: none; stroke: #bf543d; stroke-width: 2; vector-effect: non-scaling-stroke; }
	.integrity-card { right: 8%; bottom: 10%; width: 39%; padding: 4%; display: grid; grid-template-columns: auto 1fr; column-gap: 4%; align-items: center; }
	.integrity-card span { grid-row: 1/3; width: 10px; height: 10px; background: #4e7e58; border-radius: 50%; }
	.integrity-card strong { font: .65rem var(--lcg-mono); color: #4e7e58; }

	@keyframes route-pulse { from { left: 0; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } to { left: 100%; opacity: 0; } }

	@media (max-width: 900px) {
		.chapter { grid-template-columns: 1fr; gap: 3rem; padding: 5rem 0; }
		.visual-wrap { min-height: auto; }
		.visual { position: relative; top: auto; }
		.chapter-copy { padding: 0 0 3rem; }
	}

	@media (prefers-reduced-motion: reduce) {
		.trade-route span { animation: none; }
	}
</style>
