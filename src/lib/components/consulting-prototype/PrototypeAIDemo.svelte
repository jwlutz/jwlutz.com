<!--
	AI OFFERING DEMO — the full lead engine, built then run.
	Jack's spec (2026-07-18): scrape TikTok / Instagram / X / LinkedIn /
	Reddit / company pages → research leads with Perplexity → rank on criteria
	→ store in Supabase → Claude writes personalized outreach → Gmail sends →
	no-reply loops to a Claude follow-up → replies log to Notion for human
	reading → outcomes feed back into the ranking. The Notion node is the
	human checkpoint. `playing` contract per Codex's wiring.
-->
<script lang="ts">
	import { siTiktok, siInstagram, siX, siReddit, siPerplexity, siSupabase, siClaude, siGmail, siNotion } from 'simple-icons';

	const TIMELINE: [number, string][] = [
		[0, 'b1'], [300, 'b2'], [600, 'b3'], [900, 'b4'], [1200, 'b5'], [1500, 'b6'],
		[2000, 'b7'], [2400, 'b8'], [2800, 'b9'], [3200, 'b10'], [3600, 'b11'], [4000, 'b12'], [4400, 'b13'],
		[5600, 'r1'], [6200, 'r2'], [6800, 'r3'], [7300, 'r4'], [7800, 'r5'],
		[8400, 'r6'], [9100, 'r7'], [9800, 'r8'], [10500, 'r9'], [11200, 'done'], [13600, 'idle']
	];
	const CYCLE = 14200;
	const ORDER = ['idle', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10', 'b11', 'b12', 'b13', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'done'];

	let { playing = false }: { playing?: boolean } = $props();
	let phase = $state('idle');
	let frame = 0;
	let cycleStart = 0;
	let reducedMotion = $state(false);

	const past = (p: string) => ORDER.indexOf(phase) >= ORDER.indexOf(p);

	const sources = [
		{ icon: siTiktok, brand: '#f0efe9', name: 'TikTok', b: 'b1' },
		{ icon: siInstagram, brand: '#E4405F', name: 'Instagram', b: 'b2' },
		{ icon: siX, brand: '#f0efe9', name: 'X', b: 'b3' },
		{ icon: null, brand: '', name: 'LinkedIn', b: 'b4' },
		{ icon: siReddit, brand: '#FF4500', name: 'Reddit', b: 'b5' },
		{ icon: null, brand: '', name: 'Company pages', b: 'b6', glyph: '⌂' }
	];

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

<div class="demo" class:playing role="img" aria-label="A complete lead engine being built, then run: TikTok, Instagram, X, LinkedIn, Reddit, and company pages are scraped, Perplexity researches each lead, they are ranked on your criteria and stored in Supabase, Claude writes personalized outreach that Gmail sends, unanswered leads loop through a Claude follow-up, replies log to Notion for the owner to read, and outcomes feed back into the ranking.">
	<header><span>AUTOMATION / LEAD ENGINE</span><small class:on={past('done')}>{past('done') ? 'run complete · ranking updated' : past('r1') ? 'running' : 'building'}</small></header>

	<div class="canvas">
		<svg class="edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
			<g class="wire">
				<polyline class:on={past('b7')} points="17,8 20,8" />
				<polyline class:on={past('b7')} points="17,24 20,24" />
				<polyline class:on={past('b7')} points="17,40 20,40" />
				<polyline class:on={past('b7')} points="17,56 20,56" />
				<polyline class:on={past('b7')} points="17,72 20,72" />
				<polyline class:on={past('b7')} points="17,88 20,88" />
				<polyline class:on={past('b7')} points="20,8 20,88" />
				<polyline class:on={past('b7')} points="20,14 23,14" />
				<polyline class:on={past('b8')} points="33,24 33,40" />
				<polyline class:on={past('b9')} points="33,56 33,72" />
				<polyline class:on={past('b10')} points="44,46 47,46 47,14 50,14" />
				<polyline class:on={past('b11')} points="60,24 60,40" />
				<polyline class:on={past('b12')} points="60,56 60,72" />
				<polyline class="loop" class:on={past('b12')} points="71,78 73.5,78 73.5,48 71,48" />
				<polyline class:on={past('b13')} points="71,44 77,44" />
				<polyline class="loop" class:on={past('b13')} points="87,56 87,94 36,94 36,56" />
			</g>
			<g class="live">
				<polyline class:on={past('r2')} points="20,8 20,88" />
				<polyline class:on={past('r2')} points="20,14 23,14" />
				<polyline class:on={past('r3')} points="33,24 33,40" />
				<polyline class:on={past('r4')} points="33,56 33,72" />
				<polyline class:on={past('r5')} points="44,46 47,46 47,14 50,14" />
				<polyline class:on={past('r6')} points="60,24 60,40" />
				<polyline class:on={past('r7')} points="60,56 60,72" />
				<polyline class="loop" class:on={past('r7')} points="71,78 73.5,78 73.5,48 71,48" />
				<polyline class:on={past('r8')} points="71,44 77,44" />
				<polyline class="loop" class:on={past('r9')} points="87,56 87,94 36,94 36,56" />
			</g>
		</svg>

		{#each sources as s, i}
			<div class="node src" class:on={past(s.b)} class:hit={past('r1')} style={`left:2%;top:${2 + i * 16}%;--rd:${i * 0.12}s`}>
				<i class="logo">{#if s.icon}<span style={`--brand:${s.brand}`}>{@html s.icon.svg}</span>{:else if s.glyph}<em>{s.glyph}</em>{:else}<img src="/consulting/prototypes/brands/linkedin.png" alt="" />{/if}</i>
				<strong>{s.name}</strong>
			</div>
		{/each}

		<div class="node ai" class:on={past('b7')} class:hit={past('r2')} style="left:23%;top:8%">
			<i class="logo"><span style="--brand:#1FB8CD">{@html siPerplexity.svg}</span></i>
			<small>RESEARCH</small><strong>Perplexity</strong><span>who are they, what do they need</span>
		</div>
		<div class="node ai" class:on={past('b8')} class:hit={past('r3')} style="left:23%;top:40%">
			<i class="logo"><em class="glyph">✦</em></i>
			<small>RANK</small><strong>Score on your criteria</strong><span>fit · intent · timing</span>
		</div>
		<div class="node act" class:on={past('b9')} class:hit={past('r4')} style="left:23%;top:72%">
			<i class="logo"><span style="--brand:#3FCF8E">{@html siSupabase.svg}</span></i>
			<small>STORE</small><strong>Supabase</strong><span>every lead, deduped</span><i class:done={past('r4')}>✓</i>
		</div>

		<div class="node ai" class:on={past('b10')} class:hit={past('r5')} style="left:50%;top:8%">
			<i class="logo"><span style="--brand:#D97757">{@html siClaude.svg}</span></i>
			<small>WRITE</small><strong>Personal outreach</strong><span>their work, your voice</span>
		</div>
		<div class="node act" class:on={past('b11')} class:hit={past('r6')} style="left:50%;top:40%">
			<i class="logo"><span style="--brand:#EA4335">{@html siGmail.svg}</span></i>
			<small>SEND</small><strong>Gmail</strong><span>from your address</span><i class:done={past('r6')}>✓</i>
		</div>
		<div class="node ai" class:on={past('b12')} class:hit={past('r7')} style="left:50%;top:72%">
			<i class="logo"><span style="--brand:#D97757">{@html siClaude.svg}</span></i>
			<small>FOLLOW UP</small><strong>Personal follow-up</strong><span>no reply in 3 days</span>
		</div>

		<div class="node human" class:on={past('b13')} class:hit={past('r8')} style="left:77%;top:34%">
			<i class="logo"><span style="--brand:#f0efe9">{@html siNotion.svg}</span></i>
			<small>HUMAN CHECKPOINT</small><strong>Replies land in Notion</strong><span>you read every one</span>
		</div>

		<div class="loop-label ll-followup" class:on={past('r7')}>NO REPLY ↺</div>
		<div class="loop-label ll-feedback" class:on={past('r9')}>REPLIES TUNE THE RANKING ↺</div>
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
	.wire polyline,.live polyline{fill:none;stroke-width:1.4;vector-effect:non-scaling-stroke}
	.wire polyline{stroke:rgba(240,239,233,.15);opacity:0;transition:opacity .45s ease}
	.wire polyline.on{opacity:1}
	.live polyline{stroke:#b49a67;opacity:0;transition:opacity .35s ease}
	.live polyline.on{opacity:.85}
	.wire .loop{stroke-dasharray:3 3;stroke:rgba(240,239,233,.11)}
	.live .loop{stroke-dasharray:3 3}
	.node{position:absolute;width:21%;min-height:46px;padding:9px 11px;border:1px solid rgba(240,239,233,.16);border-radius:2px;background:#121613;box-shadow:0 1px 0 rgba(255,255,255,.05) inset,0 12px 26px rgba(0,0,0,.3);opacity:0;transform:translateY(8px) scale(.96);transition:opacity .4s ease,transform .4s ease,border-color .35s ease}
	.node.src{width:15%;min-height:0;padding:6px 8px;display:flex;align-items:center;gap:6px;border-left:2px solid #774633;transition-delay:0s}
	.node.src.hit{transition-delay:var(--rd,0s)}
	.node.src strong{margin:0;font-size:7.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
	.node.src .logo{position:static;width:11px;height:11px;flex:0 0 auto}
	.node.on{opacity:1;transform:none}
	.node.hit{border-color:rgba(180,154,103,.75)}
	.node .logo{position:absolute;right:8px;top:8px;width:13px;height:13px;display:grid;place-items:center;font-style:normal}
	.node .logo span{display:block;width:100%;height:100%}
	.node .logo :global(svg){display:block;width:100%;height:100%;fill:var(--brand,#dedfda)}
	.node .logo img{width:100%;height:100%;display:block;border-radius:2px}
	.node .logo em,.node .logo .glyph{color:#b49a67;font-style:normal;font-size:11px;line-height:1}
	.node small{display:block;margin-bottom:4px;font:500 6px var(--proto-mono);letter-spacing:.12em;color:#666d66}
	.node.hit small{color:#b49a67}
	.node strong{display:block;color:#e6e8e1;font:500 9.5px var(--proto-sans)}
	.node span{display:block;margin-top:3px;color:#82887f;font-size:7px}
	.node.ai{border-left:2px solid #2d8064}
	.node.act{border-left:2px solid #6e6553}
	.node.human{border-left:2px solid #b49a67;background:#15130d}
	.node.act i:not(.logo){position:absolute;right:9px;bottom:8px;color:transparent;font-style:normal;font-size:9px;transition:color .35s ease}
	.node.act i.done{color:#b49a67}
	.loop-label{position:absolute;color:transparent;font:500 5.5px var(--proto-mono);letter-spacing:.1em;transition:color .4s ease}
	.loop-label.on{color:#8d8571}
	.ll-followup{left:63%;top:63.5%}
	.ll-feedback{left:40%;top:95.5%}
	.demo>footer{flex:0 0 44px;padding:0 20px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(240,239,233,.09);background:#101411}
	.demo>footer span{color:#9b9d98;font-size:10px;font-style:italic;font-family:var(--proto-display)}
	.demo>footer small{display:flex;gap:6px;align-items:center;color:transparent;font:500 7px var(--proto-mono);letter-spacing:.1em;transition:color .4s ease}
	.demo>footer small.on{color:#8d8571}
	.demo>footer small i{font-style:normal;color:inherit}
	.demo>footer small.on i{color:#b49a67}
	.progress{position:absolute;left:0;right:0;bottom:0;height:2px;background:#b49a67;transform:scaleX(0);transform-origin:left}
	.playing .progress{animation:flow-progress 14.2s linear infinite}
	@keyframes flow-progress{to{transform:scaleX(1)}}
	@media(max-width:680px){
		.demo{height:560px}
		.node{width:23%;padding:7px 8px;min-height:40px}
		.node.src{width:16%}
		.node strong{font-size:7.5px}
		.node span{display:none}
		.loop-label{display:none}
		.demo>footer span{font-size:8.5px}
	}
	@media(prefers-reduced-motion:reduce){
		.demo *{animation:none!important;transition:none!important}
		.progress{transform:scaleX(1)}
	}
</style>
