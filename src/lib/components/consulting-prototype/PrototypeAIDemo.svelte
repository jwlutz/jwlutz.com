<!--
	AI OFFERING DEMO — an automation flow being built, then run.
	Jack's direction (2026-07-18): "the whole point of the AI is me building AI
	integrations and automations for them and their business... an n8n style
	workflow." The cycle constructs the flow node by node, then executes it;
	the human-approval node is the emphasized beat (nothing sends itself).
	`playing` contract per Codex's layout wiring; shell dims unchanged.
-->
<script lang="ts">
	import { siShopify, siGmail, siGooglesheets, siClaude } from 'simple-icons';

	// build: nodes+edges assemble · run: execution passes through · done: logged
	const TIMELINE: [number, string][] = [
		[0, 'b1'], [550, 'b2'], [1100, 'b3'], [1650, 'b4'], [2200, 'b5'], [2750, 'b6'],
		[4100, 'r1'], [4700, 'r2'], [5300, 'r3'], [5900, 'r4'],
		[7000, 'approve'], [7800, 'r5'], [8400, 'r6'], [9000, 'done'], [11400, 'idle']
	];
	const CYCLE = 12000;
	const ORDER = ['idle', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'r1', 'r2', 'r3', 'r4', 'approve', 'r5', 'r6', 'done'];

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

<div class="demo" class:playing role="img" aria-label="A real automation being built node by node, then run: a delivered Shopify order waits three days, Claude drafts a personal thank-you and review ask, the owner approves it with one tap in Slack, Gmail sends it, and the customer sheet logs it.">
	<header><span>AUTOMATION / AFTER-SALE FOLLOW-UP</span><small class:on={past('done')}>{past('done') ? 'run complete · logged' : past('r1') ? 'running' : 'building'}</small></header>

	<div class="canvas">
		<svg class="edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
			<!-- base edges -->
			<g class="wire">
				<polyline class:on={past('b2')} points="20,26 34,26" />
				<polyline class:on={past('b3')} points="54,26 66,26" />
				<polyline class:on={past('b4')} points="79,32 79,44 48,44 48,56" />
				<polyline class:on={past('b5')} points="48,68 48,78 62,78" />
				<polyline class:on={past('b6')} points="55,64 68,64 68,58" />
			</g>
			<!-- brass run overlay -->
			<g class="live">
				<polyline class:on={past('r2')} points="20,26 34,26" />
				<polyline class:on={past('r3')} points="54,26 66,26" />
				<polyline class:on={past('r4')} points="79,32 79,44 48,44 48,56" />
				<polyline class:on={past('r6')} points="48,68 48,78 62,78" />
				<polyline class:on={past('r5')} points="55,64 68,64 68,58" />
			</g>
		</svg>

		<div class="node trigger" class:on={past('b1')} class:hit={past('r1')} style="left:4%;top:20%">
			<i class="logo" style="--brand:#95BF47">{@html siShopify.svg}</i>
			<small>TRIGGER</small><strong>Order delivered</strong><span>Shopify · fires on its own</span>
		</div>
		<div class="node wait" class:on={past('b2')} class:hit={past('r2')} style="left:34%;top:20%">
			<i class="logo glyph">◷</i>
			<small>WAIT</small><strong>Three days</strong><span>let the shoes get worn</span>
		</div>
		<div class="node ai" class:on={past('b3')} class:hit={past('r3')} style="left:66%;top:20%">
			<i class="logo" style="--brand:#D97757">{@html siClaude.svg}</i>
			<small>AI STEP</small><strong>Write the follow-up</strong><span>thank-you + review ask, your voice</span>
		</div>
		<div class="node human" class:on={past('b4')} class:hit={past('r4')} style="left:34%;top:56%">
			<i class="logo"><img src="/consulting/prototypes/brands/slack.png" alt="" /></i>
			<small>HUMAN CHECKPOINT</small><strong>You approve</strong><span>one tap in #orders</span>
			<b class="chip" class:pressed={past('approve')}>Approve</b>
		</div>
		<div class="node act" class:on={past('b6')} class:hit={past('r5')} style="left:66%;top:50%">
			<i class="logo" style="--brand:#EA4335">{@html siGmail.svg}</i>
			<small>ACTION</small><strong>Send the email</strong><span>from your address</span><i class:done={past('r5')}>✓</i>
		</div>
		<div class="node act" class:on={past('b5')} class:hit={past('r6')} style="left:66%;top:74%">
			<i class="logo" style="--brand:#34A853">{@html siGooglesheets.svg}</i>
			<small>ACTION</small><strong>Log the customer</strong><span>sheet updated</span><i class:done={past('r6')}>✓</i>
		</div>
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
	.node{position:absolute;width:28%;min-height:52px;padding:10px 12px;border:1px solid rgba(240,239,233,.16);border-radius:2px;background:#121613;box-shadow:0 1px 0 rgba(255,255,255,.05) inset,0 14px 30px rgba(0,0,0,.3);opacity:0;transform:translateY(8px) scale(.96);transition:opacity .4s ease,transform .4s ease,border-color .35s ease}
	.node.on{opacity:1;transform:none}
	.node.hit{border-color:rgba(180,154,103,.75)}
	.node .logo{position:absolute;right:9px;top:9px;width:15px;height:15px;display:grid;place-items:center;font-style:normal}
	.node .logo :global(svg){width:100%;height:100%;fill:var(--brand,#dedfda)}
	.node .logo.glyph{color:#b49a67;font-size:13px}
	.node .logo img{width:100%;height:100%;display:block;border-radius:2px}
	.node small{display:block;margin-bottom:5px;font:500 6px var(--proto-mono);letter-spacing:.12em;color:#666d66}
	.node.hit small{color:#b49a67}
	.node strong{display:block;color:#e6e8e1;font:500 10.5px var(--proto-sans)}
	.node span{display:block;margin-top:4px;color:#82887f;font-size:7.5px}
	.node.trigger{border-left:2px solid #774633}
	.node.ai{border-left:2px solid #2d8064}
	.node.human{border-left:2px solid #b49a67;background:#15130d}
	.node.act i:not(.logo){position:absolute;right:10px;bottom:9px;color:transparent;font-style:normal;font-size:10px;transition:color .35s ease}
	.node.act i.done{color:#b49a67}
	.node.wait{border-left:2px solid #6e6553}
	.chip{display:inline-block;margin-top:8px;padding:6px 10px;border-radius:2px;background:#dad6cc;color:#171914;font:500 8px var(--proto-sans);transition:transform .18s ease,background .18s ease}
	.chip.pressed{transform:scale(.94);background:#b49a67}
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
		.node{width:30%;padding:8px 9px;min-height:44px}
		.node strong{font-size:8.5px}
		.node span{display:none}
		.demo>footer span{font-size:8.5px}
	}
	@media(prefers-reduced-motion:reduce){
		.demo *{animation:none!important;transition:none!important}
		.progress{transform:scaleX(1)}
	}
</style>
