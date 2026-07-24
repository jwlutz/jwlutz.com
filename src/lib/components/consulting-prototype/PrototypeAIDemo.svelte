<!--
	AI OFFERING DEMO - the full lead engine, built then run (v4: dense).
	Jack (2026-07-18): "add detail and clean this up." Four aligned columns,
	an explicit collector bus, status lines inside every node that light as
	the run passes, output previews, orthogonal rails, and an execution log.
	Notion is the human checkpoint. `playing` contract per Codex's wiring.
-->
<script lang="ts">
	import { siTiktok, siInstagram, siX, siReddit, siPerplexity, siSupabase, siClaude, siGmail, siNotion } from 'simple-icons';
	import { aiDemoCopy } from '$lib/content/consulting-prototype';

	const TIMELINE: [number, string][] = [
		[0, 'b1'], [250, 'b2'], [500, 'b3'], [750, 'b4'], [1000, 'b5'], [1250, 'b6'],
		[1900, 'b7'], [2300, 'b8'], [2700, 'b9'], [3100, 'b10'], [3500, 'b11'], [3900, 'b12'], [4300, 'b13'],
		[5600, 'r1'], [6100, 'r2'], [6700, 'r3'], [7200, 'r4'], [7700, 'r5'],
		[8300, 'r6'], [8900, 'r7'], [9500, 'r8'], [10100, 'r9'], [10800, 'done'], [13600, 'idle']
	];
	const CYCLE = 14200;
	const ORDER = ['idle', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10', 'b11', 'b12', 'b13', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'done'];

	let { playing = false }: { playing?: boolean } = $props();
	let phase = $state('idle');
	let frame = 0;
	let cycleStart = 0;
	let reducedMotion = $state(false);

	const past = (p: string) => ORDER.indexOf(phase) >= ORDER.indexOf(p);

	// Icons and phase wiring stay here; names and watch-lines come from
	// aiDemoCopy.sources in the same top-to-bottom order.
	const sourceMeta = [
		{ icon: siTiktok, brand: '#f0efe9', b: 'b1' },
		{ icon: siInstagram, brand: '#E4405F', b: 'b2' },
		{ icon: siX, brand: '#f0efe9', b: 'b3' },
		{ icon: null, brand: '', b: 'b4' },
		{ icon: siReddit, brand: '#FF4500', b: 'b5' },
		{ icon: null, brand: '', b: 'b6', glyph: '⌂' }
	];
	const sources = sourceMeta.map((meta, index) => ({ ...meta, ...aiDemoCopy.sources[index] }));
	const nodes = aiDemoCopy.nodes;

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

<div class="demo" class:playing role="img" aria-label="A complete lead engine being built, then run: six social and web sources feed a collector, Perplexity researches each lead, they are ranked on your criteria and stored in Supabase, Claude writes personalized outreach that Gmail sends, unanswered leads loop back through a Claude follow-up, replies land in Notion for the owner to read, and outcomes feed back into the ranking.">
	<header><span>{aiDemoCopy.header}</span><small class:on={past('done')}>{past('done') ? aiDemoCopy.states.done : past('r1') ? aiDemoCopy.states.running : aiDemoCopy.states.building}</small></header>

	<div class="canvas">
		<svg class="edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
			<g class="wire">
				<polyline class:on={past('b7')} points="18,8 21,8" />
				<polyline class:on={past('b7')} points="18,22.5 21,22.5" />
				<polyline class:on={past('b7')} points="18,37 21,37" />
				<polyline class:on={past('b7')} points="18,51.5 21,51.5" />
				<polyline class:on={past('b7')} points="18,66 21,66" />
				<polyline class:on={past('b7')} points="18,80.5 21,80.5" />
				<polyline class:on={past('b7')} points="21,8 21,80.5" />
				<polyline class:on={past('b7')} points="21,12 24,12" />
				<polyline class:on={past('b8')} points="35.5,20 35.5,40" />
				<polyline class:on={past('b9')} points="35.5,54 35.5,74" />
				<polyline class:on={past('b10')} points="47,46 50,46 50,12 53,12" />
				<polyline class:on={past('b11')} points="64.5,20 64.5,40" />
				<polyline class:on={past('b12')} points="64.5,54 64.5,74" />
				<polyline class="loop" class:on={past('b12')} points="76,80 79,80 79,13 76,13" />
				<polyline class:on={past('b13')} points="76,46 81,46" />
				<polyline class="loop" class:on={past('b13')} points="89,52 89,60 35.5,60 35.5,54" />
			</g>
			<g class="live">
				<polyline class:on={past('r2')} points="21,8 21,80.5" />
				<polyline class:on={past('r2')} points="21,12 24,12" />
				<polyline class:on={past('r3')} points="35.5,20 35.5,40" />
				<polyline class:on={past('r4')} points="35.5,54 35.5,74" />
				<polyline class:on={past('r5')} points="47,46 50,46 50,12 53,12" />
				<polyline class:on={past('r6')} points="64.5,20 64.5,40" />
				<polyline class:on={past('r7')} points="76,46 81,46" />
				<polyline class:on={past('r8')} points="64.5,54 64.5,74" />
				<polyline class="loop" class:on={past('r8')} points="76,80 79,80 79,13 76,13" />
				<polyline class="loop" class:on={past('r9')} points="89,52 89,60 35.5,60 35.5,54" />
			</g>
		</svg>

		{#each sources as s, i}
			<div class="node src" class:on={past(s.b)} class:hit={past('r1')} style={`left:3%;top:${4 + i * 14.5}%;--rd:${i * 0.1}s`}>
				<i class="logo">{#if s.icon}<span style={`--brand:${s.brand}`}>{@html s.icon.svg}</span>{:else if s.glyph}<em>{s.glyph}</em>{:else}<img src="/consulting/prototypes/brands/linkedin.png" alt="" />{/if}</i>
				<div><strong>{s.name}</strong><span>{s.watch}</span></div>
			</div>
		{/each}

		<div class="node ai" class:on={past('b7')} class:hit={past('r2')} style="left:24%;top:6%">
			<i class="logo"><span style="--brand:#1FB8CD">{@html siPerplexity.svg}</span></i>
			<small>{nodes.research.label}</small><strong>{nodes.research.title}</strong><span>{nodes.research.sub}</span>
			<samp class:show={past('r2')}>{nodes.research.status}</samp>
		</div>
		<div class="node ai" class:on={past('b8')} class:hit={past('r3')} style="left:24%;top:40%">
			<i class="logo"><em class="glyph">✦</em></i>
			<small>{nodes.rank.label}</small><strong>{nodes.rank.title}</strong><span>{nodes.rank.sub}</span>
			<samp class:show={past('r3')}>{nodes.rank.status}</samp>
		</div>
		<div class="node act" class:on={past('b9')} class:hit={past('r4')} style="left:24%;top:74%">
			<i class="logo"><span style="--brand:#3FCF8E">{@html siSupabase.svg}</span></i>
			<small>{nodes.store.label}</small><strong>{nodes.store.title}</strong><span>{nodes.store.sub}</span>
			<samp class:show={past('r4')}>{nodes.store.status}</samp>
		</div>

		<div class="node ai" class:on={past('b10')} class:hit={past('r5')} style="left:53%;top:6%">
			<i class="logo"><span style="--brand:#D97757">{@html siClaude.svg}</span></i>
			<small>{nodes.write.label}</small><strong>{nodes.write.title}</strong><span>{nodes.write.sub}</span>
			<samp class:show={past('r5')}>{nodes.write.status}</samp>
		</div>
		<div class="node act" class:on={past('b11')} class:hit={past('r6')} style="left:53%;top:40%">
			<i class="logo"><span style="--brand:#EA4335">{@html siGmail.svg}</span></i>
			<small>{nodes.send.label}</small><strong>{nodes.send.title}</strong><span>{nodes.send.sub}</span>
			<samp class:show={past('r6')}>{nodes.send.status}</samp>
		</div>
		<div class="node ai" class:on={past('b12')} class:hit={past('r8')} style="left:53%;top:74%">
			<i class="logo"><span style="--brand:#D97757">{@html siClaude.svg}</span></i>
			<small>{nodes.followUp.label}</small><strong>{nodes.followUp.title}</strong><span>{nodes.followUp.sub}</span>
			<samp class:show={past('r8')}>{nodes.followUp.status}</samp>
		</div>

		<div class="node human" class:on={past('b13')} class:hit={past('r7')} style="left:81%;top:38%">
			<i class="logo"><span style="--brand:#f0efe9">{@html siNotion.svg}</span></i>
			<small>{nodes.human.label}</small><strong>{nodes.human.title}</strong><span>{nodes.human.sub}</span>
			<samp class:show={past('r7')}>{nodes.human.status}</samp>
		</div>

		<div class="rail-label" class:on={past('r8')} style="left:80.5%;top:26%">{aiDemoCopy.rails.noReply}</div>
		<div class="rail-label" class:on={past('r9')} style="left:41%;top:61.5%">{aiDemoCopy.rails.tune}</div>

		<div class="runlog" aria-hidden="true">
			<span class:on={past('r4')}>{aiDemoCopy.runlog[0]}</span>
			<span class:on={past('r6')}>{aiDemoCopy.runlog[1]}</span>
			<span class:on={past('r9')}>{aiDemoCopy.runlog[2]}</span>
		</div>
	</div>

	<footer><span>{aiDemoCopy.footer.tagline}</span><small class:on={past('done')}><i>✓</i>{aiDemoCopy.footer.badge}</small></footer>
	<i class="progress" aria-hidden="true"></i>
</div>

<style>
	.demo{position:relative;height:610px;display:flex;flex-direction:column;overflow:hidden;border:1px solid rgba(240,239,233,.18);background:#0d100e;box-shadow:0 36px 100px rgba(0,0,0,.34);contain:layout paint}
	.demo>header{flex:0 0 54px;padding:0 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(240,239,233,.09);color:#848a83;background:#101411;font:500 7px var(--proto-mono);letter-spacing:.1em}
	.demo>header small{color:#666d66;font:inherit;transition:color .4s ease}
	.demo>header small.on{color:#b49a67}
	.canvas{position:relative;flex:1;min-height:0;background-image:radial-gradient(rgba(240,239,233,.06) 1px,transparent 1px);background-size:20px 20px}
	.edges{position:absolute;inset:0;width:100%;height:100%}
	.wire polyline,.live polyline{fill:none;stroke-width:1.4;vector-effect:non-scaling-stroke}
	.wire polyline{stroke:rgba(240,239,233,.15);opacity:0;transition:opacity .45s ease}
	.wire polyline.on{opacity:1}
	.live polyline{stroke:#b49a67;opacity:0;transition:opacity .35s ease}
	.live polyline.on{opacity:.85}
	.wire .loop{stroke-dasharray:3 3;stroke:rgba(240,239,233,.11)}
	.live .loop{stroke-dasharray:3 3}
	.node{position:absolute;width:23%;padding:9px 11px 8px;border:1px solid rgba(240,239,233,.16);border-radius:2px;background:#121613;box-shadow:0 1px 0 rgba(255,255,255,.05) inset,0 12px 26px rgba(0,0,0,.3);opacity:0;transform:translateY(8px) scale(.97);transition:opacity .4s ease,transform .4s ease,border-color .35s ease}
	.node.on{opacity:1;transform:none}
	.node.hit{border-color:rgba(180,154,103,.75)}
	.node.src{width:15%;padding:6px 8px;display:flex;align-items:center;gap:7px;border-left:2px solid #774633;transition-delay:0s}
	.node.src.hit{transition-delay:var(--rd,0s)}
	.node.src .logo{position:static;width:11px;height:11px;flex:0 0 auto}
	.node.src strong{margin:0;font-size:7.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
	.node.src span{margin-top:2px;font-size:5.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
	.node .logo{position:absolute;right:8px;top:8px;width:13px;height:13px;display:grid;place-items:center;font-style:normal}
	.node .logo span{display:block;width:100%;height:100%}
	.node .logo :global(svg){display:block;width:100%;height:100%;fill:var(--brand,#dedfda)}
	.node .logo img{width:100%;height:100%;display:block;border-radius:2px}
	.node .logo em,.node .logo .glyph{color:#b49a67;font-style:normal;font-size:11px;line-height:1}
	.node small{display:block;margin-bottom:4px;font:500 6px var(--proto-mono);letter-spacing:.12em;color:#666d66}
	.node.hit small{color:#b49a67}
	.node strong{display:block;color:#e6e8e1;font:500 9.5px var(--proto-sans)}
	.node span{display:block;margin-top:3px;color:#82887f;font-size:7px}
	.node samp{display:block;margin-top:6px;padding-top:6px;border-top:1px solid rgba(240,239,233,.08);color:#666d66;font:6.5px var(--proto-mono);letter-spacing:.03em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;opacity:0;transition:opacity .4s ease,color .4s ease}
	.node samp.show{opacity:1;color:#a89670}
	.node.ai{border-left:2px solid #2d8064}
	.node.act{border-left:2px solid #6e6553}
	.node.human{width:17%;border-left:2px solid #b49a67;background:#15130d}
	.rail-label{position:absolute;color:transparent;font:500 5.5px var(--proto-mono);letter-spacing:.1em;transition:color .4s ease}
	.rail-label.on{color:#8d8571}
	.runlog{position:absolute;left:3%;bottom:2.5%;display:flex;gap:14px;font:500 6px var(--proto-mono);letter-spacing:.06em}
	.runlog span{color:transparent;transition:color .45s ease}
	.runlog span.on{color:#6f7669}
	.runlog span.on::before{content:'· ';color:#b49a67}
	.demo>footer{flex:0 0 44px;padding:0 20px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(240,239,233,.09);background:#101411}
	.demo>footer span{min-width:0;overflow:hidden;color:#9b9d98;font-size:10px;font-style:italic;font-family:var(--proto-display);white-space:nowrap;text-overflow:ellipsis}
	.demo>footer small{display:flex;gap:6px;align-items:center;color:transparent;font:500 7px var(--proto-mono);letter-spacing:.1em;transition:color .4s ease}
	.demo>footer small.on{color:#8d8571}
	.demo>footer small i{font-style:normal;color:inherit}
	.demo>footer small.on i{color:#b49a67}
	.progress{position:absolute;left:0;right:0;bottom:0;height:2px;background:#b49a67;transform:scaleX(0);transform-origin:left}
	.playing .progress{animation:flow-progress 14.2s linear infinite}
	@keyframes flow-progress{to{transform:scaleX(1)}}
	@media(max-width:680px){
		.demo{height:560px}
		.node{width:25%;padding:6px 7px}
		.node.src{width:16%}
		.node strong{font-size:7.5px}
		.node span,.node samp{display:none}
		.rail-label,.runlog{display:none}
		.demo>footer span{font-size:8.5px}
	}
	@media(prefers-reduced-motion:reduce){
		.demo *{animation:none!important;transition:none!important}
		.progress{transform:scaleX(1)}
	}
</style>
