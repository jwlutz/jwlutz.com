<!--
	ANALYTICS/ML OFFERING DEMO — traffic dashboard + an academic notebook.
	Jack's directions (2026-07-18): "it should show traffic dashboard" and
	"make the ML/analytics section better and more academic. demand
	forecasting, optimization, etc." Left: the live traffic dashboard.
	Right: demand_plan.ipynb runs — load orders, fit a seasonal model,
	forecast with a confidence band, then optimize reorder points under a
	service-level constraint. No client-attributed numbers.
	`playing` contract per Codex's layout wiring; shell dims unchanged.
-->
<script lang="ts">
	// notebook run: c1 load -> c2 fit -> c3 forecast plot -> c4 optimize -> loop
	const TIMELINE: [number, string][] = [
		[500, 'c1'], [1600, 'c1d'], [1900, 'c2'], [3000, 'c2a'], [3800, 'c2d'],
		[4200, 'c3'], [5600, 'c3d'], [6400, 'c4'], [8600, 'c4d'], [11400, 'nidle']
	];
	const CYCLE = 12000;
	const ORDER = ['nidle', 'c1', 'c1d', 'c2', 'c2a', 'c2d', 'c3', 'c3d', 'c4', 'c4d'];

	let { playing = false }: { playing?: boolean } = $props();
	let phase = $state('nidle');
	let frame = 0;
	let cycleStart = 0;
	let reducedMotion = $state(false);

	const past = (p: string) => ORDER.indexOf(phase) >= ORDER.indexOf(p);

	$effect(() => {
		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reducedMotion) { phase = 'c4d'; return; }
		if (!playing) { phase = 'nidle'; cycleStart = 0; cancelAnimationFrame(frame); return; }
		function tick(now: number) {
			frame = requestAnimationFrame(tick);
			if (!cycleStart) cycleStart = now;
			const t = (now - cycleStart) % CYCLE;
			let next = 'nidle';
			for (const [at, p] of TIMELINE) if (t >= at) next = p;
			phase = next;
		}
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	});
</script>

<div class="demo" class:playing role="img" aria-label="An analytics and machine-learning workspace: a live traffic dashboard beside a Jupyter notebook that loads order history, fits a seasonal demand model, plots a forecast with a confidence band, and optimizes reorder points under a service-level constraint.">
	<header><span>ANALYTICS + ML / WORKSPACE</span><small>live</small></header>

	<div class="workspace">
		<section class="main">
			<div class="panel-bar"><span>VISITORS · LAST 30 DAYS</span><small class="pulse-wrap"><i class="pulse"></i>14 on site now</small></div>
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
			<div class="nb-bar"><span>demand_plan.ipynb</span><small><i class="kdot" class:busy={past('c1') && !past('c4d')}></i>{past('c4d') ? 'Python 3 · idle' : past('c1') ? 'Python 3 · running' : 'Python 3'}</small></div>

			<div class="cell" class:ran={past('c1d')}>
				<b>{past('c1d') ? '[1]' : past('c1') ? '[*]' : '[ ]'}</b>
				<div>
					<code>orders = read_orders(months=24)</code>
					<samp class:show={past('c1d')}>24 months · 8 SKUs · weekly buckets</samp>
				</div>
			</div>

			<div class="cell" class:ran={past('c2d')}>
				<b>{past('c2d') ? '[2]' : past('c2') ? '[*]' : '[ ]'}</b>
				<div>
					<code>fit = sarima(orders).fit()</code>
					<samp class:show={past('c2a')}>
						<span class="loss" aria-hidden="true"><i style="--h:100%"></i><i style="--h:62%"></i><i style="--h:36%"></i><i style="--h:20%"></i><i style="--h:12%"></i><i style="--h:9%"></i><i style="--h:8%"></i></span>
						{past('c2d') ? 'seasonal terms kept · AIC converged' : 'searching seasonal orders'}
					</samp>
				</div>
			</div>

			<div class="cell" class:ran={past('c3d')}>
				<b>{past('c3d') ? '[3]' : past('c3') ? '[*]' : '[ ]'}</b>
				<div>
					<code>fc = fit.forecast(steps=12, ci=0.9)</code>
					<div class="fplot" class:draw={past('c3')} class:full={past('c3d')} aria-hidden="true">
						<svg viewBox="0 0 100 46" preserveAspectRatio="none">
							<polygon class="band" points="58,25 70,20 84,17 100,15 100,31 84,29 70,28 58,27" />
							<path class="hist" d="M0,34 C6,32 10,29 16,30 C22,31 26,25 32,26 C38,27 42,21 48,23 C52,24 55,25 58,26" />
							<path class="fcast" d="M58,26 C66,24 74,21 84,19.5 C90,18.5 96,17 100,16.5" />
							<line class="nowline" x1="58" y1="4" x2="58" y2="44" />
						</svg>
						<small><span>WEEKS →</span><span>90% BAND</span><span>UNITS ↑</span></small>
					</div>
				</div>
			</div>

			<div class="cell" class:ran={past('c4d')}>
				<b>{past('c4d') ? '[4]' : past('c4') ? '[*]' : '[ ]'}</b>
				<div>
					<code>plan = argmin(cost) <i class="st">s.t. service ≥ 0.98</i></code>
					<samp class:show={past('c4d')}><i class="ok">✓</i>reorder points set · holding + stockout cost minimized</samp>
				</div>
			</div>
		</aside>
	</div>

	<footer><span>Watched by us, readable by you.</span><small>dashboards live · models when they earn it</small></footer>
	<i class="progress" aria-hidden="true"></i>
</div>

<style>
	.demo{position:relative;height:610px;display:flex;flex-direction:column;overflow:hidden;border:1px solid rgba(240,239,233,.18);background:#0d100e;box-shadow:0 36px 100px rgba(0,0,0,.34);contain:layout paint}
	.demo>header{flex:0 0 54px;padding:0 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(240,239,233,.09);color:#848a83;background:#101411;font:500 7px var(--proto-mono);letter-spacing:.1em}
	.demo>header small{color:#b49a67;font:inherit}
	.workspace{flex:1;min-height:0;display:grid;grid-template-columns:1.3fr 1.05fr}
	.main{min-width:0;display:flex;flex-direction:column;border-right:1px solid rgba(240,239,233,.08)}
	.side{min-width:0;display:flex;flex-direction:column;background:#0e120f}
	.panel-bar{flex:0 0 40px;padding:0 14px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(240,239,233,.07);color:#9aa09a;font:500 7px var(--proto-mono);letter-spacing:.1em}
	.panel-bar small{color:#666d66;font:inherit}
	.sources-bar{border-top:1px solid rgba(240,239,233,.07)}
	.pulse-wrap{display:flex;align-items:center;gap:6px}
	.pulse{width:6px;height:6px;border-radius:50%;background:#b49a67}
	.playing .pulse{animation:pulse 2.2s ease infinite}

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

	/* ————— the notebook ————— */
	.nb-bar{flex:0 0 40px;padding:0 14px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(240,239,233,.07);color:#c9cdc5;font:500 8px var(--proto-mono)}
	.nb-bar small{display:flex;align-items:center;gap:6px;color:#666d66;font:500 7px var(--proto-mono);letter-spacing:.06em}
	.kdot{width:6px;height:6px;border-radius:50%;background:#4a524c;transition:background .3s ease}
	.kdot.busy{background:#b49a67}
	.cell{display:grid;grid-template-columns:26px 1fr;gap:8px;padding:12px 14px 10px;border-bottom:1px solid rgba(240,239,233,.06);border-left:2px solid transparent;transition:border-color .35s ease}
	.cell.ran{border-left-color:rgba(180,154,103,.55)}
	.cell b{color:#666d66;font:500 8px var(--proto-mono)}
	.cell.ran b{color:#b49a67}
	.cell code{display:block;color:#ccd0c8;font:500 8.5px var(--proto-mono);letter-spacing:.01em}
	.cell code .st{color:#8b9089;font-style:normal}
	.cell samp{display:flex;align-items:center;gap:8px;margin-top:7px;color:#8b9089;font:7.5px var(--proto-mono);opacity:0;transition:opacity .4s ease}
	.cell samp.show{opacity:1}
	.cell samp .ok{color:#b49a67;font-style:normal}
	.loss{display:flex;gap:2px;align-items:flex-end;height:15px}
	.loss i{width:4px;height:var(--h);background:rgba(180,154,103,.55)}
	.loss i:last-child{background:#b49a67}

	.fplot{position:relative;margin-top:9px;height:128px;opacity:0;transition:opacity .45s ease}
	.fplot.draw{opacity:1}
	.fplot svg{width:100%;height:calc(100% - 13px)}
	.fplot .hist{fill:none;stroke:#b49a67;stroke-width:1.4;vector-effect:non-scaling-stroke;clip-path:inset(0 100% 0 0);transition:clip-path 1.1s ease}
	.fplot.draw .hist{clip-path:inset(0 42% 0 0)}
	.fplot .fcast{fill:none;stroke:#b49a67;stroke-width:1.4;stroke-dasharray:3 3;vector-effect:non-scaling-stroke;opacity:0;transition:opacity .5s ease}
	.fplot .band{fill:rgba(45,128,100,.18);opacity:0;transition:opacity .55s ease}
	.fplot .nowline{stroke:rgba(240,239,233,.18);stroke-width:1;stroke-dasharray:2 3;vector-effect:non-scaling-stroke;opacity:0;transition:opacity .4s ease}
	.fplot.full .hist{clip-path:inset(0 0 0 0)}
	.fplot.full .fcast,.fplot.full .band,.fplot.full .nowline{opacity:1}
	.fplot small{display:flex;justify-content:space-between;color:#666d66;font:500 6px var(--proto-mono);letter-spacing:.1em}

	.demo>footer{flex:0 0 44px;padding:0 20px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(240,239,233,.09);background:#101411}
	.demo>footer span{color:#9b9d98;font-size:10px;font-style:italic;font-family:var(--proto-display)}
	.demo>footer small{color:#666d66;font:500 7px var(--proto-mono);letter-spacing:.1em}
	.progress{position:absolute;left:0;right:0;bottom:0;height:2px;background:#b49a67;transform:scaleX(0);transform-origin:left}
	.playing .progress{animation:dash-progress 12s linear infinite}

	@keyframes chart-reveal{0%{clip-path:inset(0 100% 0 0)}18%,92%{clip-path:inset(0 0 0 0)}98%,100%{clip-path:inset(0 100% 0 0)}}
	@keyframes bar-grow{0%,6%{transform:scaleX(0)}20%,92%{transform:scaleX(1)}98%,100%{transform:scaleX(0)}}
	@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
	@keyframes dash-progress{to{transform:scaleX(1)}}

	@media(max-width:680px){
		.demo{height:540px}
		.workspace{grid-template-columns:1fr}
		.side{border-top:1px solid rgba(240,239,233,.08)}
		.main{border-right:0}
		.chart{margin:10px 12px 8px}
		.sources,.sources-bar{display:none}
		.fplot{height:96px}
		.demo>footer small{display:none}
	}
	@media(prefers-reduced-motion:reduce){
		.demo *{animation:none!important;transition:none!important}
		.chart svg{clip-path:none}
		.sources i{transform:scaleX(1)}
		.cell samp,.fplot,.fplot .fcast,.fplot .band,.fplot .nowline{opacity:1}
		.fplot .hist{clip-path:none}
	}
</style>
