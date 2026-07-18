<!--
	ANALYTICS OFFERING DEMO — a live traffic dashboard.
	Jack's direction (2026-07-18): "it should show traffic dashboard."
	The cycle draws the traffic curve, grows the source and page bars, and
	keeps a live-visitor feed ticking. No invented client claims: shapes and
	state, one modest live count, nothing presented as a client's results.
	`playing` contract per Codex's layout wiring; shell dims unchanged.
-->
<script lang="ts">
	let { playing = false }: { playing?: boolean } = $props();
</script>

<div class="demo" class:playing role="img" aria-label="A website traffic dashboard: a visitors-over-time curve, traffic sources, top pages, and a live feed of people currently on the site.">
	<header><span>TRAFFIC / YOURBUSINESS.COM</span><small>live</small></header>

	<div class="workspace">
		<section class="main">
			<div class="panel-bar"><span>VISITORS · LAST 30 DAYS</span><small>steady climb</small></div>
			<div class="chart">
				<svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
					<path class="area" d="M0,33 C8,31 14,27 22,28 C30,29 36,22 44,23 C52,24 58,16 66,17 C74,18 80,11 88,12 C93,12.5 97,9 100,9 L100,40 L0,40 Z" />
					<path class="line" d="M0,33 C8,31 14,27 22,28 C30,29 36,22 44,23 C52,24 58,16 66,17 C74,18 80,11 88,12 C93,12.5 97,9 100,9" />
				</svg>
				<div class="gridlines" aria-hidden="true"><i></i><i></i><i></i></div>
			</div>
			<div class="panel-bar sources-bar"><span>WHERE THEY COME FROM</span></div>
			<div class="sources">
				<div><span>Search</span><i style="--w:86%"></i></div>
				<div><span>Direct</span><i style="--w:58%"></i></div>
				<div><span>Social</span><i style="--w:37%"></i></div>
				<div><span>Referral</span><i style="--w:22%"></i></div>
			</div>
		</section>

		<aside class="side">
			<div class="panel-bar"><span>RIGHT NOW</span><small class="pulse-wrap"><i class="pulse"></i>on site</small></div>
			<div class="now"><strong>14</strong><span>people browsing</span></div>
			<div class="feed">
				{#each [
					{ path: '/products/leather-tote', from: 'search' },
					{ path: '/', from: 'direct' },
					{ path: '/about', from: 'social' },
					{ path: '/checkout', from: 'returning' }
				] as visit, i}
					<div class="visit" style={`--d:${i}`}><b>{visit.path}</b><small>{visit.from} · just now</small></div>
				{/each}
			</div>
			<div class="panel-bar pages-bar"><span>TOP PAGES</span></div>
			<div class="pages">
				<div><span>/products</span><i style="--w:92%"></i></div>
				<div><span>/</span><i style="--w:74%"></i></div>
				<div><span>/about</span><i style="--w:41%"></i></div>
			</div>
		</aside>
	</div>

	<footer><span>Watched by us, readable by you.</span><small>reports monthly · alerts immediately</small></footer>
	<i class="progress" aria-hidden="true"></i>
</div>

<style>
	.demo{position:relative;height:610px;display:flex;flex-direction:column;overflow:hidden;border:1px solid rgba(240,239,233,.18);background:#0d100e;box-shadow:0 36px 100px rgba(0,0,0,.34);contain:layout paint}
	.demo>header{flex:0 0 54px;padding:0 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(240,239,233,.09);color:#848a83;background:#101411;font:500 7px var(--proto-mono);letter-spacing:.1em}
	.demo>header small{color:#b49a67;font:inherit}
	.workspace{flex:1;min-height:0;display:grid;grid-template-columns:1.5fr 1fr}
	.main{min-width:0;display:flex;flex-direction:column;border-right:1px solid rgba(240,239,233,.08)}
	.side{min-width:0;display:flex;flex-direction:column;background:#0e120f}
	.panel-bar{flex:0 0 40px;padding:0 14px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(240,239,233,.07);color:#9aa09a;font:500 7px var(--proto-mono);letter-spacing:.1em}
	.panel-bar small{color:#666d66;font:inherit}
	.sources-bar,.pages-bar{border-top:1px solid rgba(240,239,233,.07)}

	.chart{position:relative;flex:1;min-height:0;margin:16px 14px 12px;contain:layout paint}
	.chart svg{position:absolute;inset:0;width:100%;height:100%;clip-path:inset(0 100% 0 0)}
	.playing .chart svg{animation:chart-reveal 9s ease infinite}
	.chart .area{fill:rgba(45,128,100,.14)}
	.chart .line{fill:none;stroke:#b49a67;stroke-width:1.6;vector-effect:non-scaling-stroke}
	.gridlines{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:space-between;pointer-events:none}
	.gridlines i{height:1px;background:rgba(240,239,233,.05)}

	.sources{padding:14px;display:grid;gap:11px}
	.sources>div{display:grid;grid-template-columns:52px 1fr;gap:10px;align-items:center}
	.sources span{color:#8b9089;font-size:8px}
	.sources i{display:block;width:var(--w);height:7px;background:linear-gradient(90deg,#6f6043,#b49a67);transform:scaleX(0);transform-origin:left}
	.playing .sources i{animation:bar-grow 9s ease infinite}
	.sources>div:nth-child(2) i{animation-delay:.15s}
	.sources>div:nth-child(3) i{animation-delay:.3s}
	.sources>div:nth-child(4) i{animation-delay:.45s}

	.pulse-wrap{display:flex;align-items:center;gap:6px}
	.pulse{width:6px;height:6px;border-radius:50%;background:#b49a67}
	.playing .pulse{animation:pulse 2.2s ease infinite}
	.now{padding:18px 14px 8px;display:flex;align-items:baseline;gap:9px}
	.now strong{color:#f0efe9;font:400 34px/1 var(--proto-display)}
	.now span{color:#8b9089;font-size:9px}
	.feed{padding:8px 14px 14px;display:grid;gap:8px}
	.visit{padding:9px 11px;border:1px solid rgba(240,239,233,.09);border-radius:2px;background:#111512;opacity:0;transform:translateY(7px)}
	.playing .visit{animation:visit-in 9s ease infinite;animation-delay:calc(var(--d) * .5s)}
	.visit b{display:block;color:#ccd0c8;font:500 8.5px var(--proto-mono)}
	.visit small{display:block;margin-top:3px;color:#6e746d;font-size:6.5px}
	.pages{padding:12px 14px;display:grid;gap:10px}
	.pages>div{display:grid;grid-template-columns:64px 1fr;gap:10px;align-items:center}
	.pages span{color:#8b9089;font:500 7.5px var(--proto-mono)}
	.pages i{display:block;width:var(--w);height:6px;background:rgba(240,239,233,.16);transform:scaleX(0);transform-origin:left}
	.playing .pages i{animation:bar-grow 9s ease infinite;animation-delay:.6s}

	.demo>footer{flex:0 0 44px;padding:0 20px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(240,239,233,.09);background:#101411}
	.demo>footer span{color:#9b9d98;font-size:10px;font-style:italic;font-family:var(--proto-display)}
	.demo>footer small{color:#666d66;font:500 7px var(--proto-mono);letter-spacing:.1em}
	.progress{position:absolute;left:0;right:0;bottom:0;height:2px;background:#b49a67;transform:scaleX(0);transform-origin:left}
	.playing .progress{animation:dash-progress 9s linear infinite}

	@keyframes chart-reveal{0%{clip-path:inset(0 100% 0 0)}18%,92%{clip-path:inset(0 0 0 0)}98%,100%{clip-path:inset(0 100% 0 0)}}
	@keyframes bar-grow{0%,6%{transform:scaleX(0)}20%,92%{transform:scaleX(1)}98%,100%{transform:scaleX(0)}}
	@keyframes visit-in{0%,8%{opacity:0;transform:translateY(7px)}18%,90%{opacity:1;transform:none}97%,100%{opacity:0}}
	@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
	@keyframes dash-progress{to{transform:scaleX(1)}}

	@media(max-width:680px){
		.demo{height:520px}
		.workspace{grid-template-columns:1fr}
		.side{display:none}
		.demo>footer small{display:none}
	}
	@media(prefers-reduced-motion:reduce){
		.demo *{animation:none!important}
		.chart svg{clip-path:none}
		.sources i,.pages i{transform:scaleX(1)}
		.visit{opacity:1;transform:none}
	}
</style>
