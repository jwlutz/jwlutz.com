<script lang="ts">
	let { variant, stage = 0 }: { variant: 'candella' | 'mindlsn' | 'sparkling'; stage?: number } = $props();
</script>

<div class={`work-visual stage-${Math.min(3, stage)}`} class:candella={variant === 'candella'} class:mindlsn={variant === 'mindlsn'} class:sparkling={variant === 'sparkling'}>
	{#if variant === 'candella'}
		<div class="candella-header">
			<img src="/consulting/prototypes/candella-logo.svg" alt="Candella" />
			<span>COPYTRADE / LIVE ROUTING</span>
		</div>
		<div class="route-stage">
			<div class="route-source"><small>LEAD</small><strong>FILLED</strong><span>09:30:00.447</span></div>
			<div class="route-line"><i></i><i></i><i></i></div>
			<div class="route-engine"><small>CANDELLA ENGINE</small><strong>Routing approved</strong><span>risk limits checked</span></div>
			<div class="followers"><span>WEBULL <b>FILLED</b></span><span>TASTYTRADE <b>FILLED</b></span><span>PUBLIC <b>FILLED</b></span></div>
		</div>
		<div class="candella-readout">
			<div><small>CONNECTED BROKERS</small><strong>16</strong></div>
			<div><small>UNDER HALF A SECOND</small><strong>90<span>%</span></strong></div>
			<div><small>RISK CHECKS</small><strong>LIVE</strong></div>
		</div>
	{:else if variant === 'mindlsn'}
		<div class="mind-header"><img src="/consulting/prototypes/mindlsn-mark.svg" alt="" /><span>mindlsn</span><small>INDEX METHOD / MAY 2026</small></div>
		<div class="mind-grid">
			<div class="drill">
				<small>WORKING MEMORY</small>
				<h4>Digit span.</h4>
				<div class="digits"><span>7</span><span>4</span><span>9</span><span>2</span></div>
				<p>Tier 6 · integrity active</p>
			</div>
			<div class="mind-score"><small>MIND INDEX</small><strong>1,284</strong><div class="score-line"><i></i></div><span>+38 this month</span></div>
			<div class="domains"><span>Working memory <b>312</b></span><span>Processing speed <b>281</b></span><span>Reasoning <b>244</b></span></div>
		</div>
	{:else}
		<div class="sparkling-name">THE SPARKLING SHOE<sup>™</sup></div>
		<div class="product-collage">
			<div class="product fresh"><img src="/consulting/prototypes/sparkling-fresh.jpg" alt="Toe-tally Fresh pointe shoe inserts" loading="lazy" decoding="async" /></div>
			<div class="product puff"><img src="/consulting/prototypes/sparkling-puff.jpg" alt="The Perfect Puff rosin product" loading="lazy" decoding="async" /></div>
			<div class="product pouch"><img src="/consulting/prototypes/sparkling-pouch.webp" alt="Purple Poppy toe pad pouch" loading="lazy" decoding="async" /></div>
			<div class="product-copy"><small>SHOPIFY / PRODUCT SYSTEM</small><strong>Made for dancers.<br />Built to keep moving.</strong><span>Retail · Wholesale · Custom</span></div>
		</div>
	{/if}
</div>

<style>
	.work-visual { position: relative; width: 100%; aspect-ratio: 1; overflow: hidden; border: 1px solid var(--proto-line-strong); }
	.work-visual::after { content: ''; position: absolute; inset: 0; pointer-events: none; box-shadow: inset 0 0 80px rgba(0,0,0,.16); }

	.candella { background: #0c0c0f; color: #f4f1eb; padding: clamp(18px, 3vw, 34px); display: flex; flex-direction: column; }
	.candella-header { display: flex; align-items: center; gap: 12px; padding-bottom: 18px; border-bottom: 1px solid rgba(255,255,255,.1); font: 500 9px var(--proto-mono); letter-spacing: .12em; color: #8e8e96; }
	.candella-header img { width: 27px; height: 27px; }
	.route-stage { flex: 1; position: relative; min-height: 0; }
	.route-source, .route-engine, .followers span { position: absolute; border: 1px solid rgba(241,93,28,.38); background: rgba(17,17,21,.94); font-family: var(--proto-mono); }
	.route-source { left: 0; top: 18%; padding: 14px; width: 23%; }
	.route-source small, .route-engine small { display: block; font-size: 8px; letter-spacing: .12em; color: #888891; }
	.route-source strong { display: block; margin: 9px 0; font-size: 13px; color: #fff; }
	.route-source span, .route-engine span { font-size: 7px; color: #73737b; }
	.route-line { position: absolute; left: 23%; right: 28%; top: 29%; height: 1px; background: #63311f; }
	.route-line i { position: absolute; width: 7px; height: 7px; top: -3px; border-radius: 50%; background: #f15d1c; }
	.route-line i:nth-child(1) { left: 22%; }.route-line i:nth-child(2) { left: 54%; }.route-line i:nth-child(3) { left: 86%; }
	.route-engine { left: 32%; top: 42%; width: 38%; padding: 17px; border-color: #f15d1c; }
	.route-engine strong { display: block; margin: 13px 0 4px; color: #f15d1c; font-size: clamp(12px, 1.6vw, 18px); }
	.followers { position: absolute; right: 0; top: 12%; display: flex; flex-direction: column; gap: 7px; width: 26%; }
	.followers span { position: relative; padding: 11px 10px; font-size: 7px; color: #a3a3aa; display: flex; justify-content: space-between; gap: 8px; }
	.followers b { color: #f15d1c; font-weight: 500; }
	.candella-readout { display: grid; grid-template-columns: repeat(3,1fr); border-top: 1px solid rgba(255,255,255,.1); }
	.candella-readout div { padding: 15px 8px 0; border-right: 1px solid rgba(255,255,255,.08); }
	.candella-readout div:last-child { border-right: 0; }
	.candella-readout small { display: block; font: 7px var(--proto-mono); color: #73737b; }
	.candella-readout strong { display: block; margin-top: 8px; font: 500 clamp(18px,3vw,32px) var(--proto-mono); letter-spacing: -.06em; }
	.candella-readout strong span { font-size: 8px; color: #f15d1c; margin-left: 3px; }
	.route-source,.route-engine,.followers,.candella-readout { transition: opacity .55s ease, transform .65s cubic-bezier(.2,.75,.2,1); }
	.candella.stage-0 .route-engine,.candella.stage-0 .followers,.candella.stage-0 .candella-readout { opacity: .22; }
	.candella.stage-1 .route-source,.candella.stage-1 .followers,.candella.stage-1 .candella-readout { opacity: .24; }
	.candella.stage-1 .route-engine { transform: scale(1.05); }
	.candella.stage-2 .route-source { opacity: .2; }.candella.stage-2 .followers { transform: translateX(-5px); }.candella.stage-2 .candella-readout { opacity: .25; }
	.candella.stage-3 .route-source,.candella.stage-3 .route-engine,.candella.stage-3 .followers { opacity: .28; }.candella.stage-3 .candella-readout { transform: translateY(-4px); }

	.mindlsn { background: #eee8d9; color: #191815; padding: clamp(18px,3vw,36px); }
	.mind-header { height: 52px; border-bottom: 1px solid rgba(25,24,21,.2); display: flex; align-items: center; gap: 10px; }
	.mind-header img { width: 22px; height: 22px; }
	.mind-header span { font: 400 21px var(--proto-display); }
	.mind-header small { margin-left: auto; font: 7px var(--proto-mono); letter-spacing: .12em; color: #716d63; }
	.mind-grid { position: relative; height: calc(100% - 52px); }
	.drill { position: absolute; left: 0; top: 8%; width: 58%; padding: 6%; border: 1px solid rgba(25,24,21,.32); background: #f3eddf; box-shadow: 13px 13px 0 rgba(25,24,21,.08); }
	.drill small, .mind-score small { font: 7px var(--proto-mono); letter-spacing: .12em; color: #706c63; }
	.drill h4 { font: 400 clamp(24px,4vw,40px)/.9 var(--proto-display); margin: 10px 0 14px; letter-spacing: -.04em; }
	.digits { display: grid; grid-template-columns: repeat(4,1fr); gap: 6px; }
	.digits span { aspect-ratio: 1; display: grid; place-items: center; background: #191815; color: #eee8d9; font: 20px var(--proto-mono); }
	.drill p { margin: 17px 0 0; font: 8px var(--proto-mono); color: #716d63; }
	.mind-score { position: absolute; right: 0; top: 12%; width: 35%; padding: 4%; border-top: 1px solid #191815; border-bottom: 1px solid #191815; background: #eee8d9; }
	.mind-score strong { display: block; margin: 8px 0 12px; font: 400 clamp(28px,4.2vw,44px) var(--proto-display); }
	.score-line { height: 30px; border-bottom: 1px solid rgba(25,24,21,.2); position: relative; overflow: hidden; }
	.score-line::before { content: ''; position: absolute; left: 0; right: 0; bottom: 8px; height: 25px; border-top: 2px solid #07543f; transform: skewY(-9deg); }
	.score-line i { position: absolute; right: 2px; top: 3px; width: 7px; height: 7px; border-radius: 50%; background: #07543f; }
	.mind-score span { display: block; margin-top: 10px; font: 8px var(--proto-mono); color: #07543f; }
	.domains { position: absolute; z-index: 2; left: 9%; right: 0; bottom: 0; display: grid; grid-template-columns: repeat(3,1fr); border-top: 1px solid rgba(25,24,21,.22); background: #eee8d9; }
	.domains span { padding: 12px 8px; font: 7px/1.4 var(--proto-mono); color: #716d63; border-right: 1px solid rgba(25,24,21,.16); }
	.domains b { display: block; color: #191815; font-size: 13px; margin-top: 5px; }
	.drill,.mind-score,.domains { transition: opacity .55s ease, transform .65s cubic-bezier(.2,.75,.2,1); }
	.mindlsn.stage-0 .mind-score,.mindlsn.stage-0 .domains { opacity: .25; }
	.mindlsn.stage-1 .drill,.mindlsn.stage-1 .domains { opacity: .25; }.mindlsn.stage-1 .mind-score { transform: translateY(-5px); }
	.mindlsn.stage-2 .drill,.mindlsn.stage-2 .mind-score { opacity: .28; }.mindlsn.stage-2 .domains { transform: translateY(-5px); }
	.mindlsn.stage-3 .drill { opacity: .5; }.mindlsn.stage-3 .mind-score,.mindlsn.stage-3 .domains { transform: translateY(-3px); }

	.sparkling { background: #ffceec; color: #34232b; }
	.sparkling-name { position: absolute; z-index: 4; left: 6%; top: 6%; font: 600 clamp(13px,2vw,22px) var(--proto-sans); letter-spacing: .04em; }
	.sparkling-name sup { font-size: .45em; }
	.product-collage { position: absolute; inset: 0; }
	.product { position: absolute; overflow: hidden; background: #fff; border: 1px solid rgba(52,35,43,.2); box-shadow: 0 18px 40px rgba(88,42,65,.18); }
	.product img { width: 100%; height: 100%; object-fit: cover; display: block; }
	.fresh { width: 42%; height: 57%; left: 5%; bottom: 6%; transform: rotate(-2deg); }
	.fresh img { object-position: 50% 71%; }
	.puff { width: 36%; height: 49%; right: 5%; top: 8%; transform: rotate(2deg); }
	.puff img { object-position: center 54%; }
	.pouch { width: 25%; height: 34%; right: 17%; bottom: 5%; transform: rotate(4deg); background: #1d1b26; }
	.pouch img { object-fit: contain; }
	.product-copy { position: absolute; left: 39%; top: 40%; width: 43%; padding: 5%; background: #34232b; color: #fff6ed; transform: rotate(-1deg); z-index: 3; }
	.product-copy small { display: block; font: 7px var(--proto-mono); color: #f7a8d2; }
	.product-copy strong { display: block; margin: 10px 0 12px; font: 400 clamp(18px,2.6vw,30px)/.9 var(--proto-display); }
	.product-copy span { font: 8px var(--proto-mono); color: #e7cedb; }
	.product,.product-copy { transition: opacity .55s ease, transform .65s cubic-bezier(.2,.75,.2,1); }
	.sparkling.stage-0 .puff,.sparkling.stage-0 .pouch,.sparkling.stage-0 .product-copy { opacity: .28; }
	.sparkling.stage-1 .fresh,.sparkling.stage-1 .pouch,.sparkling.stage-1 .product-copy { opacity: .3; }.sparkling.stage-1 .puff { transform: rotate(0) scale(1.04); }
	.sparkling.stage-2 .fresh,.sparkling.stage-2 .puff { opacity: .32; }.sparkling.stage-2 .product-copy { transform: rotate(0) scale(1.03); }
	.sparkling.stage-3 .product { opacity: .72; }.sparkling.stage-3 .product-copy { transform: rotate(-1deg) translateY(-5px); }

	@media (max-width: 640px) {
		.candella-readout div:nth-child(3) { display: none; }
		.candella-readout { grid-template-columns: repeat(2,1fr); }
		.followers { width: 30%; }
		.route-engine { left: 24%; width: 42%; }
		.domains span:nth-child(3) { display: none; }
		.domains { grid-template-columns: repeat(2,1fr); }
	}
</style>
