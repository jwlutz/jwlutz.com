<!--
	AI OFFERING DEMO — a real lead-outreach automation, built then run.
	Jack's direction (2026-07-18): "make it automating like finding leads
	through different social medias and making personalized outreach and
	following up." Three social sources fan into AI qualification, a
	personalized draft, a human approval in Slack, the send, and an automatic
	follow-up loop back to drafting. `playing` contract per Codex's wiring.
-->
<script lang="ts">
	import { siInstagram, siX, siGmail } from 'simple-icons';

	// build: sources + chain assemble · run: a lead flows through · done: logged
	const TIMELINE: [number, string][] = [
		[0, 'b1'], [400, 'b2'], [800, 'b3'], [1300, 'b4'], [1800, 'b5'], [2300, 'b6'], [2800, 'b7'],
		[4200, 'r1'], [4450, 'r2'], [4700, 'r3'], [5200, 'r4'], [6000, 'r5'],
		[7200, 'approve'], [8000, 'r6'], [8700, 'r7'], [9400, 'done'], [11400, 'idle']
	];
	const CYCLE = 12000;
	const ORDER = ['idle', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'r1', 'r2', 'r3', 'r4', 'r5', 'approve', 'r6', 'r7', 'done'];

	let { playing = false }: { playing?: boolean } = $props();
	let phase = $state('idle');
	let frame = 0;
	let cycleStart = 0;
	let reducedMotion = $state(false);

	const past = (p: string) => ORDER.indexOf(phase) >= ORDER.indexOf(p);

	$effect(() => {
		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reducedMotion) { phase = 'done'; return; }
		if (!playing) { phase = 'idle'; cycleStart = 0; cancelAnimationFrame(frame); return; }
		function tick(now: number) {
			frame = requestAnimationFrame(tick);
			if (!cycleStart) cycleStart = now;
			const t = (now - cycleStart) % CYCLE;
			let next = 'idle';
			for (const [at, p] of TIMELINE) if (t >= at) next = p;
			phase = next;
		}
		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	});
</script>

<div class="demo" class:playing role="img" aria-label="A lead-outreach automation being built, then run: Instagram, X, and LinkedIn feed new leads to AI qualification, a personalized outreach draft is written, the owner approves it in Slack, it sends, and unanswered leads loop back for an automatic follow-up.">
	<header><span>AUTOMATION / LEAD OUTREACH</span><small class:on={past('done')}>{past('done') ? 'run complete · logged' : past('r1') ? 'running' : 'building'}</small></header>

	<div class="canvas">
		<svg class="edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
			<g class="wire">
				<polyline class:on={past('b4')} points="25,13 28,13 28,35 31,35" />
				<polyline class:on={past('b4')} points="25,39 31,39" />
				<polyline class:on={past('b4')} points="25,65 28,65 28,43 31,43" />
				<polyline class:on={past('b5')} points="57,37 60,37 60,14 63,14" />
				<polyline class:on={past('b6')} points="76,22 76,40" />
				<polyline class:on={past('b7')} points="76,58 76,76" />
				<polyline class="loop" class:on={past('b7')} points="63,86 51,86 51,14 63,14" />
			</g>
			<g class="live">
				<polyline class:on={past('r4')} points="25,13 28,13 28,35 31,35" />
				<polyline class:on={past('r4')} points="25,39 31,39" />
				<polyline class:on={past('r4')} points="25,65 28,65 28,43 31,43" />
				<polyline class:on={past('r5')} points="57,37 60,37 60,14 63,14" />
				<polyline class:on={past('approve')} points="76,22 76,40" />
				<polyline class:on={past('r6')} points="76,58 76,76" />
				<polyline class="loop" class:on={past('r7')} points="63,86 51,86 51,14 63,14" />
			</g>
		</svg>

		<div class="node src" class:on={past('b1')} class:hit={past('r1')} style="left:3%;top:6%">
			<i class="logo" style="--brand:#E4405F">{@html siInstagram.svg}</i>
			<small>SOURCE</small><strong>Instagram</strong><span>new followers · comments</span>
		</div>
		<div class="node src" class:on={past('b2')} class:hit={past('r2')} style="left:3%;top:32%">
			<i class="logo" style="--brand:#f0efe9">{@html siX.svg}</i>
			<small>SOURCE</small><strong>X</strong><span>replies · mentions</span>
		</div>
		<div class="node src" class:on={past('b3')} class:hit={past('r3')} style="left:3%;top:58%">
			<i class="logo"><img src="/consulting/prototypes/brands/linkedin.png" alt="" /></i>
			<small>SOURCE</small><strong>LinkedIn</strong><span>connections · posts</span>
		</div>

		<div class="node ai" class:on={past('b4')} class:hit={past('r4')} style="left:31%;top:28%">
			<small>AI STEP</small><strong>Qualify the lead</strong><span>fits your customer profile?</span>
		</div>
		<div class="node ai" class:on={past('b5')} class:hit={past('r5')} style="left:63%;top:6%">
			<small>AI STEP</small><strong>Personal outreach</strong><span>references their post · your voice</span>
		</div>
		<div class="node human" class:on={past('b6')} class:hit={past('approve')} style="left:63%;top:40%">
			<i class="logo"><img src="/consulting/prototypes/brands/slack.png" alt="" /></i>
			<small>HUMAN CHECKPOINT</small><strong>You approve</strong><span>one tap in #leads</span>
			<b class="chip" class:pressed={past('approve')}>Approve</b>
		</div>
		<div class="node act" class:on={past('b7')} class:hit={past('r6')} style="left:63%;top:76%">
			<i class="logo" style="--brand:#EA4335">{@html siGmail.svg}</i>
			<small>ACTION</small><strong>Send + log</strong><span>DM or email · CRM updated</span><i class:done={past('r6')}>✓</i>
		</div>

		<div class="loop-label" class:on={past('r7')}>NO REPLY? FOLLOW UP IN 3 DAYS ↺</div>
	</div>

	<footer><span>Your tools, wired together, run on your rules.</span><small class:on={past('done')}><i>✓</i>every run logged</small></footer>
	<i class="progress" aria-hidden="true"></i>
</div>

<style>
	.demo{position:relative;height:610px;display:flex;flex-direction:column;overflow:hidden;border:1px solid rgba(240,239,233,.18);background:#0d100e;box-shadow:0 36px 100px rgba(0,0,0,.34);contain:layout paint}
	.demo>header{flex:0 0 54px;padding:0 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(240,239,233,.09);color:#848a83;background:#101411;font:500 7px var(--proto-mono);letter-spacing:.1em}
	.demo>header small{color:#666d66;font:inherit;transition:color .4s ease}
	.demo>header small.on{color:#b49a67}
	.canvas{position:relative;flex:1;min-height:0;background-image:radial-gradient(rgba(240,239,233,.07) 1px,transparent 1px);background-size:22px 22px}
	.edges{position:absolute;inset:0;width:100%;height:100%}
	.wire polyline,.live polyline{fill:none;stroke-width:1.5;vector-effect:non-scaling-stroke}
	.wire polyline{stroke:rgba(240,239,233,.16);opacity:0;transition:opacity .45s ease}
	.wire polyline.on{opacity:1}
	.live polyline{stroke:#b49a67;opacity:0;transition:opacity .35s ease}
	.live polyline.on{opacity:.85}
	.wire .loop{stroke-dasharray:3 3;stroke:rgba(240,239,233,.12)}
	.live .loop{stroke-dasharray:3 3}
	.node{position:absolute;width:26%;min-height:52px;padding:10px 12px;border:1px solid rgba(240,239,233,.16);border-radius:2px;background:#121613;box-shadow:0 1px 0 rgba(255,255,255,.05) inset,0 14px 30px rgba(0,0,0,.3);opacity:0;transform:translateY(8px) scale(.96);transition:opacity .4s ease,transform .4s ease,border-color .35s ease}
	.node.src{width:22%;min-height:44px;padding:8px 10px}
	.node.on{opacity:1;transform:none}
	.node.hit{border-color:rgba(180,154,103,.75)}
	.node .logo{position:absolute;right:9px;top:9px;width:14px;height:14px;display:grid;place-items:center;font-style:normal}
	.node .logo :global(svg){width:100%;height:100%;fill:var(--brand,#dedfda)}
	.node .logo img{width:100%;height:100%;display:block;border-radius:2px}
	.node small{display:block;margin-bottom:5px;font:500 6px var(--proto-mono);letter-spacing:.12em;color:#666d66}
	.node.hit small{color:#b49a67}
	.node strong{display:block;color:#e6e8e1;font:500 10.5px var(--proto-sans)}
	.node span{display:block;margin-top:4px;color:#82887f;font-size:7.5px}
	.node.src{border-left:2px solid #774633}
	.node.ai{border-left:2px solid #2d8064}
	.node.human{border-left:2px solid #b49a67;background:#15130d}
	.node.act i:not(.logo){position:absolute;right:10px;bottom:9px;color:transparent;font-style:normal;font-size:10px;transition:color .35s ease}
	.node.act i.done{color:#b49a67}
	.chip{display:inline-block;margin-top:8px;padding:6px 10px;border-radius:2px;background:#dad6cc;color:#171914;font:500 8px var(--proto-sans);transition:transform .18s ease,background .18s ease}
	.chip.pressed{transform:scale(.94);background:#b49a67}
	.loop-label{position:absolute;left:31%;top:88%;color:transparent;font:500 6px var(--proto-mono);letter-spacing:.1em;transition:color .4s ease}
	.loop-label.on{color:#8d8571}
	.demo>footer{flex:0 0 44px;padding:0 20px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(240,239,233,.09);background:#101411}
	.demo>footer span{color:#9b9d98;font-size:10px;font-style:italic;font-family:var(--proto-display)}
	.demo>footer small{display:flex;gap:6px;align-items:center;color:transparent;font:500 7px var(--proto-mono);letter-spacing:.1em;transition:color .4s ease}
	.demo>footer small.on{color:#8d8571}
	.demo>footer small i{font-style:normal;color:inherit}
	.demo>footer small.on i{color:#b49a67}
	.progress{position:absolute;left:0;right:0;bottom:0;height:2px;background:#b49a67;transform:scaleX(0);transform-origin:left}
	.playing .progress{animation:flow-progress 12s linear infinite}
	@keyframes flow-progress{to{transform:scaleX(1)}}
	@media(max-width:680px){
		.demo{height:520px}
		.node{width:28%;padding:8px 9px;min-height:40px}
		.node.src{width:24%}
		.node strong{font-size:8.5px}
		.node span{display:none}
		.loop-label{font-size:5px}
		.demo>footer span{font-size:8.5px}
	}
	@media(prefers-reduced-motion:reduce){
		.demo *{animation:none!important;transition:none!important}
		.progress{transform:scaleX(1)}
	}
</style>
