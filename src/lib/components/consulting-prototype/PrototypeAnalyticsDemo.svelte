<!--
	ANALYTICS/ML OFFERING DEMO — traffic dashboard + a running notebook.
	Jack's directions (2026-07-18): "it should show traffic dashboard" and
	"try something with a jupyter notebook, a volatility surface? model
	training?" Left column: the live traffic dashboard. Right column: a
	Jupyter notebook that runs its cells in sequence — load data, train the
	model, plot the volatility surface. No invented client claims.
	`playing` contract per Codex's layout wiring; shell dims unchanged.
-->
<script lang="ts">
	// notebook run: c1 load -> c2 fit (epochs) -> c3 plot surface -> hold -> loop
	const TIMELINE: [number, string][] = [
		[500, 'c1'], [1800, 'c1d'], [2100, 'c2'], [3400, 'c2a'], [5200, 'c2d'],
		[5600, 'c3'], [8200, 'c3d'], [11400, 'nidle']
	];
	const CYCLE = 12000;
	const ORDER = ['nidle', 'c1', 'c1d', 'c2', 'c2a', 'c2d', 'c3', 'c3d'];

	let { playing = false }: { playing?: boolean } = $props();
	let phase = $state('nidle');
	let frame = 0;
	let cycleStart = 0;
	let reducedMotion = $state(false);

	const past = (p: string) => ORDER.indexOf(phase) >= ORDER.indexOf(p);

	$effect(() => {
		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reducedMotion) { phase = 'c3d'; return; }
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

<div class="demo" class:playing role="img" aria-label="An analytics and machine-learning workspace: a live traffic dashboard beside a Jupyter notebook that loads data, trains a model, and plots a volatility surface.">
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
			<div class="nb-bar"><span>vol_model.ipynb</span><small><i class="kdot" class:busy={past('c1') && !past('c3d')}></i>{past('c3d') ? 'Python 3 · idle' : past('c1') ? 'Python 3 · running' : 'Python 3'}</small></div>

			<div class="cell" class:ran={past('c1d')}>
				<b>{past('c1d') ? '[1]' : past('c1') ? '[*]' : '[ ]'}</b>
				<div>
					<code>chain = load_options("SPY")</code>
					<samp class:show={past('c1d')}>4,812 quotes · 34 expiries</samp>
				</div>
			</div>

			<div class="cell" class:ran={past('c2d')}>
				<b>{past('c2d') ? '[2]' : past('c2') ? '[*]' : '[ ]'}</b>
				<div>
					<code>model.fit(iv_grid)</code>
					<samp class:show={past('c2a')}>
						<span class="loss" aria-hidden="true"><i style="--h:100%"></i><i style="--h:64%"></i><i style="--h:38%"></i><i style="--h:22%"></i><i style="--h:13%"></i><i style="--h:9%"></i><i style="--h:8%"></i></span>
						{past('c2d') ? 'converged · loss stable' : 'training · loss falling'}
					</samp>
				</div>
			</div>

			<div class="cell" class:ran={past('c3d')}>
				<b>{past('c3d') ? '[3]' : past('c3') ? '[*]' : '[ ]'}</b>
				<div>
					<code>plot_iv_surface(model)</code>
					<div class="surface" class:show={past('c3')} aria-hidden="true">
						<svg viewBox="0 0 100 62">
							<g class="mesh">
								<path style="--d:0" d="M6,50 C14,44 22,42 34,43 C46,44 54,44 62,42 C72,39 80,42 88,48" />
								<path style="--d:1" d="M10,43 C18,37 26,35 38,36 C50,37 58,37 66,35 C76,32 84,35 92,41" />
								<path style="--d:2" d="M14,36 C22,30 30,28 42,29 C54,30 62,30 70,28 C80,25 88,28 96,34" />
								<path style="--d:3" d="M18,29 C26,23 34,21 46,22 C58,23 66,23 74,21 C84,18 90,21 98,27" />
								<path style="--d:4" d="M6,50 L18,29" />
								<path style="--d:4" d="M34,43 L46,22" />
								<path style="--d:4" d="M62,42 L74,21" />
								<path style="--d:4" d="M88,48 L98,27" />
							</g>
						</svg>
						<small><span>STRIKE →</span><span>↗ EXPIRY</span><span>IV ↑</span></small>
					</div>
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
	.workspace{flex:1;min-height:0;display:grid;grid-template-columns:1.35fr 1fr}
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
	.cell{display:grid;grid-template-columns:26px 1fr;gap:8px;padding:13px 14px 11px;border-bottom:1px solid rgba(240,239,233,.06);border-left:2px solid transparent;transition:border-color .35s ease,background .35s ease}
	.cell.ran{border-left-color:rgba(180,154,103,.55)}
	.cell b{color:#666d66;font:500 8px var(--proto-mono)}
	.cell.ran b{color:#b49a67}
	.cell code{display:block;color:#ccd0c8;font:500 9px var(--proto-mono);letter-spacing:.02em}
	.cell samp{display:flex;align-items:center;gap:8px;margin-top:8px;color:#8b9089;font:7.5px var(--proto-mono);opacity:0;transition:opacity .4s ease}
	.cell samp.show{opacity:1}
	.loss{display:flex;gap:2px;align-items:flex-end;height:16px}
	.loss i{width:4px;height:var(--h);background:rgba(180,154,103,.55)}
	.loss i:last-child{background:#b49a67}
	.surface{position:relative;margin-top:10px;height:150px;opacity:0;transition:opacity .5s ease}
	.surface.show{opacity:1}
	.surface svg{width:100%;height:calc(100% - 14px)}
	.mesh path{fill:none;stroke:#b49a67;stroke-width:1;vector-effect:non-scaling-stroke;opacity:0;transition:opacity .5s ease;transition-delay:calc(var(--d) * .35s)}
	.mesh path[style*="--d:1"]{stroke:rgba(180,154,103,.8)}
	.mesh path[style*="--d:2"]{stroke:rgba(180,154,103,.6)}
	.mesh path[style*="--d:3"]{stroke:rgba(180,154,103,.45)}
	.mesh path[style*="--d:4"]{stroke:rgba(240,239,233,.22)}
	.surface.show .mesh path{opacity:1}
	.surface small{display:flex;justify-content:space-between;color:#666d66;font:500 6px var(--proto-mono);letter-spacing:.1em}

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
		.demo{height:520px}
		.workspace{grid-template-columns:1fr}
		.side{border-top:1px solid rgba(240,239,233,.08)}
		.main{border-right:0}
		.chart{margin:10px 12px 8px}
		.sources{display:none}
		.sources-bar{display:none}
		.surface{height:110px}
		.demo>footer small{display:none}
	}
	@media(prefers-reduced-motion:reduce){
		.demo *{animation:none!important;transition:none!important}
		.chart svg{clip-path:none}
		.sources i{transform:scaleX(1)}
		.cell samp,.surface,.mesh path{opacity:1}
	}
</style>
