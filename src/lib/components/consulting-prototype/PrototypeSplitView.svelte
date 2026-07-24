<!--
	APPROVED SECTION - do not remove in refactors.
	Jack's Q1 ruling (docs/consulting-decisions.md §25, 2026-07-18): this swipe
	is the demo element of the Websites service section. It auto-replays
	(partial split → slides fully to the polished site, bounces, returns, loops)
	and dragging interrupts the replay. Codex wires placement per
	tickets services-railway-layout.md; component internals are Fable's surface.
	Content lives in consultingSite.splitView in src/lib/content/consulting-prototype.ts.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { consultingSite, splitScene } from '$lib/content/consulting-prototype';
	import { track } from '$lib/analytics';

	// embedded: render only the interactive stage (no section shell, heading,
	// note, or anchor) so Codex can slot it into the Websites service row.
	let { embedded = false }: { embedded?: boolean } = $props();

	const content = consultingSite.splitView;

	// Replay cycle (§25): hold a partial split, accelerate fully to the client
	// site, bounce on impact, hold there, ease back, repeat. Any interaction
	// pauses the loop; it resumes after RESUME_DELAY of idle.
	const REPLAY_START = 62;
	const HOLD_SPLIT = 1400;
	const SLIDE = 1700;
	const HOLD_SITE = 2600;
	const RETURN = 1150;
	const RESUME_DELAY = 5500;

	let stage: HTMLElement;
	let seam = $state(REPLAY_START);
	let visible = $state(false);
	let interacted = $state(false);
	let reducedMotion = false;
	let dragging = false;
	let frame = 0;
	let paused = false;
	let lastInteraction = 0;
	let phase: 'hold-split' | 'slide' | 'hold-site' | 'return' = 'hold-split';
	let phaseStart = 0;
	let returnFrom = 0;

	function clampSeam(value: number) {
		return Math.max(0, Math.min(100, value));
	}

	function seamFromEvent(event: PointerEvent) {
		const rect = stage.getBoundingClientRect();
		return clampSeam(((event.clientX - rect.left) / rect.width) * 100);
	}

	function markInteracted() {
		paused = true;
		lastInteraction = performance.now();
		if (!interacted) {
			interacted = true;
			track('split_view_interact', { source: 'consulting_prototype' });
		}
	}

	function onPointerDown(event: PointerEvent) {
		if (event.pointerType === 'mouse' && event.button !== 0) return;
		dragging = true;
		markInteracted();
		event.preventDefault();
		try {
			stage.setPointerCapture(event.pointerId);
		} catch {
			// capture can fail on some browsers; bubbling moves still work inside the stage
		}
		seam = seamFromEvent(event);
	}

	function onPointerMove(event: PointerEvent) {
		if (dragging) {
			seam = seamFromEvent(event);
			lastInteraction = performance.now();
		}
	}

	function onPointerUp() {
		dragging = false;
		lastInteraction = performance.now();
		if (seam < 8) seam = 0;
		else if (seam > 92) seam = 100;
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowLeft') seam = clampSeam(seam - 6);
		else if (event.key === 'ArrowRight') seam = clampSeam(seam + 6);
		else if (event.key === 'Home') seam = 0;
		else if (event.key === 'End') seam = 100;
		else return;
		event.preventDefault();
		markInteracted();
	}

	function easeInOutCubic(p: number) {
		return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
	}

	// Accelerate into the edge, then two decaying rebounds - the §25 bounce.
	function slideBounce(p: number) {
		if (p < 0.5) {
			const q = p / 0.5;
			return REPLAY_START * (1 - q * q);
		}
		if (p < 0.78) {
			const q = (p - 0.5) / 0.28;
			return 8.5 * Math.sin(Math.PI * q);
		}
		if (p < 0.94) {
			const q = (p - 0.78) / 0.16;
			return 2.4 * Math.sin(Math.PI * q);
		}
		return 0;
	}

	onMount(() => {
		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reducedMotion) seam = 50;
		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			// Re-enter the cycle by easing from wherever the seam is, not snapping.
			if (visible && !paused && !dragging) {
				phase = 'return';
				returnFrom = seam;
				phaseStart = 0;
			}
		}, { threshold: 0.35 });
		observer.observe(stage);

		function tick(now: number) {
			frame = requestAnimationFrame(tick);
			if (!visible || reducedMotion || dragging) {
				phaseStart = 0;
				return;
			}
			if (paused) {
				if (now - lastInteraction < RESUME_DELAY) return;
				paused = false;
				phase = 'return';
				returnFrom = seam;
				phaseStart = now;
			}
			if (!phaseStart) phaseStart = now;
			const t = now - phaseStart;
			if (phase === 'hold-split') {
				if (t >= HOLD_SPLIT) { phase = 'slide'; phaseStart = now; }
			} else if (phase === 'slide') {
				const p = Math.min(1, t / SLIDE);
				seam = slideBounce(p);
				if (p === 1) { phase = 'hold-site'; phaseStart = now; }
			} else if (phase === 'hold-site') {
				if (t >= HOLD_SITE) { phase = 'return'; returnFrom = seam; phaseStart = now; }
			} else if (phase === 'return') {
				const p = Math.min(1, t / RETURN);
				seam = returnFrom + (REPLAY_START - returnFrom) * easeInOutCubic(p);
				if (p === 1) { phase = 'hold-split'; phaseStart = now; }
			}
		}
		frame = requestAnimationFrame(tick);
		return () => {
			observer.disconnect();
			cancelAnimationFrame(frame);
		};
	});
</script>

{#snippet stageBlock()}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="split-stage"
		class:playing={visible}
		bind:this={stage}
		style={`--seam:${seam}`}
		onpointerdown={onPointerDown}
		onpointermove={onPointerMove}
		onpointerup={onPointerUp}
		onpointercancel={onPointerUp}
		onlostpointercapture={onPointerUp}
		data-motion-item={embedded ? undefined : ''}
	>
		<div class="stage-visual" role="img" aria-label="Interactive comparison: the editors, logs, and deploys we watch on one side, and the finished website you and your customers see on the other. Use the slider to reveal either side.">
			<div class="pane pane-yours" aria-hidden="true">
				<div class="client-world">
					<nav>
						<strong>{splitScene.client.brand}</strong>
						{#each splitScene.client.links as link}<span>{link}</span>{/each}
						<b>{splitScene.client.cta}</b>
					</nav>
					<div class="client-main">
						<div class="client-copy">
							<small>{splitScene.client.badge}</small>
							<h3>{splitScene.client.headline[0]}<br />{splitScene.client.headline[1]}</h3>
							<p>{splitScene.client.body}</p>
							<span class="client-link">{splitScene.client.link}</span>
						</div>
						<div class="client-imagery">
							<div class="imagery-photo"></div>
							<div class="imagery-card"><small>{splitScene.client.imageryCard.tag}</small><b>{splitScene.client.imageryCard.title}</b></div>
						</div>
					</div>
					<div class="client-strip">
						<div><i class="swatch swatch-a"></i><span>{splitScene.client.strip[0]}</span></div>
						<div><i class="swatch swatch-b"></i><span>{splitScene.client.strip[1]}</span></div>
						<div><i class="swatch swatch-c"></i><span>{splitScene.client.strip[2]}</span></div>
					</div>
					<div class="client-toast"><div><strong>{splitScene.client.toast.title}</strong><span>{splitScene.client.toast.detail}</span></div></div>
					<footer><span>{splitScene.client.footer.left}</span><b>{splitScene.client.footer.right}</b></footer>
				</div>
				<span class="pane-label label-yours">{content.yoursLabel}</span>
			</div>

			<div class="pane pane-ours" aria-hidden="true">
				<div class="dev-world">
					<div class="dev-editor">
						<div class="win-bar">
							<span class="traffic"><i></i><i></i><i></i></span>
							<span class="tab active">routing.ts</span>
							<span class="tab">webhooks.ts</span>
							<b>main</b>
						</div>
						<div class="editor-body">
							<div class="gutter">{#each Array(10) as _, n}<i>{n + 1}</i>{/each}</div>
							<div class="code">
								{#each Array(10) as _, lineIndex}
									<div class="code-line" class:active-line={lineIndex === 4} data-line={lineIndex}>
										<i></i><b></b><em></em>{#if lineIndex === 4}<u class="caret"></u>{/if}
									</div>
								{/each}
							</div>
							<div class="minimap">{#each Array(14) as _, n}<i data-m={n % 4}></i>{/each}</div>
						</div>
						<div class="editor-status"><span>TypeScript</span><span>LF</span><span>UTF-8</span><b>saved</b></div>
					</div>

					<div class="dev-dash">
						<div class="win-bar">
							<span class="traffic"><i></i><i></i><i></i></span>
							<span class="dash-title">operations</span>
							<b class="live">live</b>
						</div>
						<div class="dash-tiles">
							{#each splitScene.dev.tiles as tile}<div><small>{tile.label}</small><b>{tile.value}</b></div>{/each}
						</div>
						<div class="dash-log">
							{#each content.logLines as line, lineIndex}<p style={`--i:${lineIndex}`}><i>✓</i>{line}</p>{/each}
							<p class="log-caret" style={`--i:${content.logLines.length}`}><b></b></p>
						</div>
					</div>

					<div class="dev-statusline">{#each splitScene.dev.statusline.words as word, wordIndex}{#if wordIndex > 0}<i></i>{/if}<span>{word}</span>{/each}<em>{splitScene.dev.statusline.signature}</em></div>
				</div>
				<span class="pane-label label-ours">{content.oursLabel}</span>
			</div>

			<div class="seam-shadow" aria-hidden="true"></div>
			<div class="seam" aria-hidden="true"></div>
		</div>

		<button
			class="seam-handle"
			type="button"
			role="slider"
			aria-valuemin={0}
			aria-valuemax={100}
			aria-valuenow={Math.round(seam)}
			aria-label="Reveal more of our maintenance side or your customer side"
			onkeydown={onKeydown}
		><i>‹</i><span>{content.dragHint}</span><i>›</i></button>
	</div>
{/snippet}

{#if embedded}
	<div class="split-embed">{@render stageBlock()}</div>
{:else}
	<section class="split-view shell" id="two-sides" data-motion-section>
		<header class="split-heading">
			<div>
				<p class="eyebrow" data-motion-item>{content.eyebrow}</p>
				<h2 data-motion-item>{content.title.lead} <em>{content.title.emphasis}</em></h2>
			</div>
			<p data-motion-item>{content.body}</p>
		</header>
		{@render stageBlock()}
		<p class="split-note" data-motion-item><i></i>{content.note}</p>
	</section>
{/if}

<style>
	.split-view { padding: clamp(100px, 10vw, 150px) 0 0; scroll-margin-top: 84px; }
	.split-embed { position: relative; width: 100%; }
	.shell { width: min(1380px, calc(100% - 80px)); margin: 0 auto; }
	.eyebrow { margin: 0 0 24px; font: 500 9px var(--proto-mono); letter-spacing: .14em; color: var(--proto-green-light); }
	.split-heading { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(280px, .7fr); gap: 70px; align-items: end; margin-bottom: 54px; }
	.split-heading h2 { margin: 0; font: 400 clamp(54px, 6vw, 92px)/.9 var(--proto-display); letter-spacing: -.04em; }
	.split-heading h2 em { font-weight: 400; font-style: normal; color: var(--proto-paper); }
	.split-heading > p { max-width: 470px; margin: 0; justify-self: end; color: var(--proto-muted); font-size: 15px; line-height: 1.75; }

	.split-stage { position: relative; height: clamp(430px, 46vw, 620px); overflow: hidden; border: 1px solid var(--proto-line-strong); border-radius: 2px; box-shadow: 0 1px 0 rgba(255,255,255,.06) inset, 0 24px 60px rgba(0,0,0,.34), 0 60px 140px rgba(0,0,0,.3); cursor: ew-resize; touch-action: pan-y; contain: layout paint; user-select: none; -webkit-user-select: none; }
	.stage-visual { position: absolute; inset: 0; }
	.pane { position: absolute; inset: 0; }
	.pane-ours { clip-path: inset(0 calc(100% - var(--seam) * 1%) 0 0); will-change: clip-path; }
	.pane-label { position: absolute; z-index: 8; top: 16px; padding: 8px 10px; font: 500 8px var(--proto-mono); letter-spacing: .12em; border-radius: 2px; white-space: nowrap; box-shadow: 0 6px 18px rgba(0,0,0,.28); }
	.label-ours { left: 16px; color: var(--proto-paper); background: #0b0e0c; border: 1px solid rgba(180, 154, 103, .55); }
	.label-yours { right: 16px; color: #40392c; background: #fffdf7; border: 1px solid rgba(23, 25, 20, .22); }

	/* ----- Your side: a real storefront in real layout ----- */
	.pane-yours { background: linear-gradient(160deg, #efe9dd 0%, #e6dfd2 55%, #ddd4c4 100%); color: #171914; }
	.client-world { position: absolute; inset: 0; display: flex; flex-direction: column; will-change: transform; transform: translate3d(calc(var(--seam) * 0.045%), 0, 0); }
	.client-world nav { flex: 0 0 auto; height: 60px; padding: 0 4.5%; display: flex; align-items: center; gap: 24px; border-bottom: 1px solid rgba(17,19,15,.12); background: rgba(244,239,229,.85); font-size: 11px; color: #4d4f47; }
	.client-world nav strong { margin-right: auto; font: 600 11px var(--proto-sans); letter-spacing: .14em; color: #171914; }
	.client-world nav b { padding: 10px 14px; background: #171914; color: #f2efe7; border-radius: 2px; font-size: 10px; font-weight: 500; box-shadow: 0 6px 16px rgba(23,25,20,.22); }
	.client-main { flex: 1; min-height: 0; padding: 0 4.5%; display: grid; grid-template-columns: 1.05fr .95fr; gap: 5%; align-items: center; }
	.client-copy small { color: #8a6d3f; font: 600 8px var(--proto-mono); letter-spacing: .14em; }
	.client-copy h3 { margin: 13px 0 14px; font: 400 clamp(30px, 3.3vw, 52px)/.92 var(--proto-display); letter-spacing: -.035em; }
	.client-copy p { max-width: 300px; margin: 0 0 18px; color: #63655c; font-size: 12px; line-height: 1.65; }
	.client-link { display: inline-block; padding-bottom: 4px; border-bottom: 1px solid #171914; font-size: 11px; color: #171914; }
	.client-imagery { position: relative; height: 76%; min-height: 150px; }
	.imagery-photo { position: absolute; inset: 0; border-radius: 2px; background: radial-gradient(circle at 28% 22%, #d9b98e 0%, transparent 52%), radial-gradient(circle at 75% 80%, #9b6f4d 0%, transparent 58%), linear-gradient(155deg, #c9a97e 0%, #a37e58 48%, #71503a 100%); box-shadow: 0 2px 0 rgba(255,255,255,.35) inset, 0 24px 50px rgba(88,62,40,.35); }
	.imagery-photo::after { content: ''; position: absolute; inset: 0; border-radius: 2px; box-shadow: 0 0 0 1px rgba(255,255,255,.18) inset, 0 -34px 60px rgba(58,38,24,.28) inset; }
	.imagery-card { position: absolute; left: -7%; bottom: 9%; padding: 12px 15px; border-radius: 2px; background: #fffdf7; box-shadow: 0 3px 0 rgba(255,255,255,.6) inset, 0 16px 38px rgba(23,25,20,.2); }
	.imagery-card small { display: block; margin-bottom: 4px; color: #8a6d3f; font: 600 7px var(--proto-mono); letter-spacing: .12em; }
	.imagery-card b { font: 400 15px var(--proto-display); color: #171914; }
	.client-strip { flex: 0 0 auto; padding: 0 4.5% 20px; display: flex; gap: 26px; }
	.client-strip > div { display: flex; align-items: center; gap: 9px; font-size: 10px; color: #55574f; }
	.swatch { width: 26px; height: 26px; border-radius: 2px; box-shadow: 0 1px 0 rgba(255,255,255,.5) inset, 0 5px 12px rgba(23,25,20,.16); }
	.swatch-a { background: linear-gradient(145deg, #c9a97e, #8f6a48); }
	.swatch-b { background: linear-gradient(145deg, #b9b3a4, #7d786b); }
	.swatch-c { background: linear-gradient(145deg, #8e9b8b, #5a675c); }
	.client-toast { position: absolute; right: 4%; bottom: 15%; padding: 12px 16px 12px 14px; border-left: 2px solid #8a6d3f; border-radius: 2px; background: #fffdf7; box-shadow: 0 2px 0 rgba(255,255,255,.5) inset, 0 18px 42px rgba(23,25,20,.18); opacity: 0; }
	.playing .client-toast { animation: toast 9s ease infinite 2s; }
	.client-toast strong { display: block; font-size: 11px; color: #171914; }
	.client-toast span { color: #7c7e75; font-size: 9px; }
	.client-world footer { flex: 0 0 auto; height: 34px; padding: 0 4.5%; display: flex; align-items: center; justify-content: space-between; color: #9a978c; background: #171914; font: 7px var(--proto-mono); letter-spacing: .09em; }
	.client-world footer b { color: #d8c49a; font-weight: 500; }

	/* ----- Our side: the working screen ----- */
	.pane-ours { background: linear-gradient(180deg, #0d100e 0%, #0a0d0b 100%); color: #b8bdb7; }
	.dev-world { position: absolute; inset: 0; padding: 3.5% 3.5% 0; display: grid; grid-template-columns: 1.05fr .95fr; grid-template-rows: 1fr auto; gap: 13px; }
	.dev-editor, .dev-dash { min-height: 0; display: flex; flex-direction: column; overflow: hidden; border: 1px solid rgba(240,239,233,.13); border-radius: 2px; background: linear-gradient(180deg, #12160f0d, transparent), #101411; box-shadow: 0 1px 0 rgba(255,255,255,.07) inset, 0 18px 40px rgba(0,0,0,.35); }
	.win-bar { flex: 0 0 auto; height: 36px; padding: 0 12px; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid rgba(240,239,233,.08); background: linear-gradient(180deg, #191e1a, #10140f); font: 500 8px var(--proto-mono); letter-spacing: .06em; color: #7d847e; }
	.traffic { display: flex; gap: 5px; }
	.traffic i { width: 8px; height: 8px; border-radius: 50%; background: linear-gradient(145deg, #3d423e, #262b27); box-shadow: 0 1px 0 rgba(255,255,255,.09) inset; }
	.win-bar .tab { padding: 5px 9px; border-radius: 2px 2px 0 0; align-self: flex-end; margin-bottom: -1px; border: 1px solid transparent; }
	.win-bar .tab.active { color: #d6d9d2; background: #101411; border-color: rgba(240,239,233,.1); border-bottom-color: #101411; }
	.win-bar > b { margin-left: auto; color: var(--proto-brass); font-weight: 500; }
	.win-bar > b.live { letter-spacing: .12em; }
	.dash-title { color: #a7ada6; }
	.editor-body { flex: 1; min-height: 0; display: grid; grid-template-columns: 30px 1fr 12px; gap: 0 10px; padding: 14px 10px 10px 0; }
	.gutter { display: flex; flex-direction: column; gap: 10px; align-items: flex-end; padding-right: 4px; border-right: 1px solid rgba(240,239,233,.07); }
	.gutter i { font: 8px var(--proto-mono); color: #4a524c; font-style: normal; line-height: 1; }
	.code { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
	.code-line { position: relative; height: 8px; display: flex; gap: 7px; align-items: center; }
	.code-line.active-line::before { content: ''; position: absolute; inset: -3px -8px; background: rgba(240,239,233,.035); border-radius: 2px; }
	.code-line i, .code-line b, .code-line em { height: 7px; border-radius: 2px; }
	.code-line i { width: 24px; background: rgba(119,70,51,.75); }
	.code-line b { width: 34%; background: rgba(122,148,131,.5); }
	.code-line em { width: 18%; background: rgba(180,154,103,.42); }
	.caret { position: relative; width: 1.5px; height: 11px; background: #dad6cc; border-radius: 0; }
	.playing .caret { animation: caret-blink 1.05s steps(1) infinite; }
	.code-line[data-line="1"] b { width: 48%; } .code-line[data-line="1"] em { display: none; }
	.code-line[data-line="2"] { padding-left: 22px; } .code-line[data-line="2"] b { width: 26%; }
	.code-line[data-line="3"] { padding-left: 22px; } .code-line[data-line="3"] b { width: 39%; } .code-line[data-line="3"] em { width: 10%; }
	.code-line[data-line="4"] { padding-left: 44px; } .code-line[data-line="4"] i { background: rgba(240,239,233,.28); } .code-line[data-line="4"] b { width: 21%; }
	.code-line[data-line="5"] { padding-left: 44px; } .code-line[data-line="5"] b { width: 30%; } .code-line[data-line="5"] em { display: none; }
	.code-line[data-line="6"] { padding-left: 22px; } .code-line[data-line="6"] b { width: 15%; }
	.code-line[data-line="7"] b { width: 42%; }
	.code-line[data-line="8"] { padding-left: 22px; } .code-line[data-line="8"] b { width: 24%; } .code-line[data-line="8"] em { display: none; }
	.code-line[data-line="9"] b { width: 9%; } .code-line[data-line="9"] em { display: none; }
	.minimap { display: flex; flex-direction: column; gap: 5px; padding-top: 2px; }
	.minimap i { height: 3px; border-radius: 1px; background: rgba(240,239,233,.12); }
	.minimap i[data-m="1"] { width: 70%; } .minimap i[data-m="2"] { width: 45%; background: rgba(119,70,51,.5); } .minimap i[data-m="3"] { width: 85%; background: rgba(122,148,131,.24); }
	.editor-status { flex: 0 0 auto; height: 24px; padding: 0 12px; display: flex; align-items: center; gap: 14px; border-top: 1px solid rgba(240,239,233,.07); background: #0d110e; font: 7px var(--proto-mono); letter-spacing: .08em; color: #626a63; }
	.editor-status b { margin-left: auto; color: #9aa29a; font-weight: 500; }

	.dash-tiles { flex: 0 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); border-bottom: 1px solid rgba(240,239,233,.08); }
	.dash-tiles > div { padding: 12px 12px 11px; border-right: 1px solid rgba(240,239,233,.06); }
	.dash-tiles > div:last-child { border-right: 0; }
	.dash-tiles small { display: block; margin-bottom: 6px; font: 500 6px var(--proto-mono); letter-spacing: .12em; color: #626a63; }
	.dash-tiles b { font: 500 9px var(--proto-mono); color: #cfd3cc; white-space: nowrap; }
	.dash-log { flex: 1; min-height: 0; padding: 13px 14px; overflow: hidden; }
	.dash-log p { margin: 0 0 10px; display: flex; gap: 8px; align-items: baseline; font: 8px/1.5 var(--proto-mono); letter-spacing: .04em; color: #969d97; opacity: .3; }
	.playing .dash-log p { animation: term-line .5s ease forwards; animation-delay: calc(var(--i) * .8s); }
	.dash-log p i { color: #a8956b; font-style: normal; }
	.dash-log .log-caret b { display: inline-block; width: 7px; height: 11px; background: #dad6cc; }
	.playing .dash-log .log-caret b { animation: caret-blink 1.05s steps(1) infinite; }
	.dev-statusline { grid-column: 1 / -1; display: flex; align-items: center; gap: 12px; padding: 10px 4px 12px; font: 500 7px var(--proto-mono); letter-spacing: .12em; color: #6d756e; }
	.dev-statusline i { width: 3px; height: 3px; border-radius: 50%; background: #454b46; }
	.dev-statusline em { margin-left: auto; font-style: normal; color: #8a6d3f; }

	/* ----- The seam: a physical edge, not a glow ----- */
	.seam-shadow { position: absolute; z-index: 4; top: 0; bottom: 0; left: clamp(0px, var(--seam) * 1%, 100%); width: 52px; background: linear-gradient(90deg, rgba(6,8,6,.38), rgba(6,8,6,.14) 40%, transparent); opacity: clamp(0, (var(--seam) - 1) * 1, 1); pointer-events: none; }
	.seam { position: absolute; z-index: 5; top: 0; bottom: 0; left: clamp(1px, var(--seam) * 1%, calc(100% - 1px)); width: 2px; margin-left: -1px; background: linear-gradient(180deg, #cbb384, var(--proto-brass) 30%, #8a6d3f 85%); box-shadow: 1px 0 0 rgba(0,0,0,.35); pointer-events: none; }
	.seam-handle { position: absolute; z-index: 6; left: clamp(48px, var(--seam) * 1%, calc(100% - 48px)); top: 50%; transform: translate(-50%, -50%); display: flex; align-items: center; gap: 8px; padding: 11px 13px; border: 1px solid var(--proto-brass); border-radius: 2px; background: linear-gradient(180deg, #14171412, transparent), rgba(10, 13, 11, .94); color: var(--proto-paper); font: 500 8px var(--proto-mono); letter-spacing: .1em; cursor: ew-resize; touch-action: none; box-shadow: 0 1px 0 rgba(255,255,255,.1) inset, 0 10px 26px rgba(0,0,0,.45); }
	.seam-handle i { color: var(--proto-brass); font-style: normal; font-size: 11px; }
	.seam-handle:focus-visible { outline: 2px solid var(--proto-green-light); outline-offset: 4px; }

	.split-note { position: relative; max-width: 640px; margin: 26px 0 0 auto; padding-left: 22px; color: var(--proto-muted); font-size: 12px; line-height: 1.7; text-align: right; }
	.split-note i { position: absolute; left: 0; top: 9px; width: 8px; height: 1px; background: var(--proto-brass); }

	@keyframes toast { 0%, 12% { opacity: 0; transform: translateY(10px); } 20%, 62% { opacity: 1; transform: translateY(0); } 72%, 100% { opacity: 0; transform: translateY(-6px); } }
	@keyframes term-line { to { opacity: 1; } }
	@keyframes caret-blink { 50% { opacity: 0; } }

	@media (max-width: 900px) {
		.split-heading { grid-template-columns: 1fr; gap: 22px; margin-bottom: 38px; }
		.split-heading > p { justify-self: start; }
		.dev-world { grid-template-columns: 1fr; grid-template-rows: 1fr 1fr auto; }
		.editor-body { grid-template-columns: 24px 1fr; }
		.minimap { display: none; }
		.client-main { grid-template-columns: 1fr; align-content: center; }
		.client-imagery { display: none; }
		.client-strip { display: none; }
	}
	@media (max-width: 650px) {
		.shell { width: calc(100% - 32px); }
		.split-view { padding-top: 85px; }
		.split-stage { height: 420px; border-radius: 2px; }
		.client-world nav { height: 46px; gap: 14px; font-size: 9px; }
		.client-world nav b { padding: 7px 10px; font-size: 8px; }
		.client-copy h3 { font-size: clamp(26px, 8vw, 34px); }
		.client-toast { right: 5%; bottom: 13%; padding: 10px 12px; }
		.win-bar { height: 30px; }
		.win-bar .tab { padding: 4px 7px; }
		.gutter i, .dash-log p { font-size: 7px; }
		.dash-tiles small { font-size: 5px; }
		.dash-tiles b { font-size: 7px; }
		.pane-label { top: 10px; padding: 6px 8px; font-size: 7px; }
		.label-ours { left: 10px; } .label-yours { right: 10px; }
		.seam-handle { padding: 13px 14px; }
		.split-note { max-width: 100%; text-align: left; }
	}
	@media (prefers-reduced-motion: reduce) {
		.split-view *, .playing .client-toast, .playing .dash-log p, .playing .caret { animation: none !important; }
		.dash-log p { opacity: 1; }
		.client-toast { opacity: 1; transform: none; }
	}
</style>
