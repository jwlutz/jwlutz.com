<!--
	STYLE BOARD (review artifact, noindex via prototypes layout).
	The shared visual system for jwlutz.com (portfolio) and /consulting (LCG),
	per Jack's Q10 ruling and tickets/in-progress/shared-style-system.md.
	Includes the three Q9 logo directions. Delete after the system is approved
	and propagated, or keep as living brand reference.
-->
<svelte:head>
	<title>Style board, one system for LCG and jwlutz.com</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
</svelte:head>

<div class="board">
	<header class="board-head">
		<p class="crumb">STYLE BOARD · FOR JACK'S APPROVAL · 2026-07-18</p>
		<h1>One system, <em>two voices.</em></h1>
		<p class="intent">
			The portfolio and the consulting site read as one authored brand. The system
			below generalizes the consulting language. The portfolio expresses it
			editorially and personally; the consulting site expresses it systematically
			and operationally. Same bones, different posture.
		</p>
	</header>

	<!-- ————————————————— color ————————————————— -->
	<section>
		<h2><i>01</i> Color tokens</h2>
		<div class="swatches">
			<div class="sw" style="background:#080b09"><b>ink</b><span>#080B09</span><small>ground, both sites</small></div>
			<div class="sw" style="background:#07543f"><b>emerald</b><span>#07543F</span><small>structural surfaces</small></div>
			<div class="sw" style="background:#0d2d24"><b>emerald deep</b><span>#0D2D24</span><small>recessed panels</small></div>
			<div class="sw sw-light" style="background:#dad6cc"><b>paper</b><span>#DAD6CC</span><small>light ground, client side</small></div>
			<div class="sw sw-light" style="background:#f0efe9"><b>cream</b><span>#F0EFE9</span><small>text on dark</small></div>
			<div class="sw" style="background:#b49a67"><b>brass</b><span>#B49A67</span><small>detail only, never headings</small></div>
			<div class="sw" style="background:#774633"><b>leather</b><span>#774633</span><small>secondary accent, decorative only</small></div>
		</div>
		<div class="rules">
			<p><b>Measured contrast (WCAG):</b> cream on ink 17.2:1, muted gray on ink 7.2:1, brass on ink 7.3:1, cream on emerald 7.8:1, ink on paper 12.2:1. All text pairs clear AA at body sizes without relying on hue, so the palette holds for colorblind readers.</p>
			<p><b>Restrictions:</b> brass never sets a full heading, only rules, dots, numerals, and key words. Leather (2.6:1) and emerald-light (4.1:1) are decorative or large-UI only, never body text. No green buttons, no green status dots, no glow.</p>
		</div>
	</section>

	<!-- ————————————————— type ————————————————— -->
	<section>
		<h2><i>02</i> Typography</h2>
		<div class="specimens">
			<p class="spec-display">Instrument Serif carries every display moment.</p>
			<p class="spec-body">DM Sans carries body copy, navigation, and controls. It stays sober so the serif can perform. Weights 400 to 600, nothing heavier.</p>
			<p class="spec-mono">IBM PLEX MONO · METADATA, LABELS, EVIDENCE, TIMESTAMPS · NEVER PARAGRAPHS</p>
		</div>
		<div class="rules">
			<p><b>Rules:</b> serif only at 28px and above, tight leading (0.9 to 1.05), negative tracking at scale. One italic emphasis word per heading is the house move. Mono is letterspaced 0.1em or more and 10px or smaller, uppercase. The portfolio may run serif at larger text sizes for editorial passages; the consulting site may not.</p>
		</div>
	</section>

	<!-- ————————————————— geometry ————————————————— -->
	<section>
		<h2><i>03</i> Geometry and controls</h2>
		<div class="geo-row">
			<button class="g-btn">Primary action</button>
			<button class="g-btn g-btn-paper">On light ground</button>
			<span class="g-input">Form field</span>
			<span class="g-tag">semantic tag</span>
			<div class="g-card"><small>CARD · 6PX</small><b>Repeated card</b></div>
			<div class="g-frame"><small>DEMO FRAME · 6PX</small></div>
		</div>
		<div class="rules">
			<p><b>Rules:</b> structural bands and large media frames are square. Controls are 4px, demo frames 6px, repeated cards 6 to 8px. Pills exist only where the shape means something (tags, the swipe handle). Depth comes from 1px lines, inset top highlights, and directional shadows, never from blur glows. Angular but tailored, not brutalist.</p>
		</div>
	</section>

	<!-- ————————————————— registration line ————————————————— -->
	<section>
		<h2><i>04</i> The registration line</h2>
		<div class="motif-pair">
			<div class="motif motif-dark">
				<i class="reg-line"><b></b></i>
				<small>CONSULTING · OPERATIONAL</small>
				<p>A live progress thread runs the left margin: hairline, filled state, brass registration dot. It reads as monitoring.</p>
			</div>
			<div class="motif motif-light">
				<i class="reg-line reg-static"><b></b></i>
				<small>PORTFOLIO · EDITORIAL</small>
				<p>The same hairline and brass dot mark sections like a margin rule in a set book. Static, typographic, personal.</p>
			</div>
		</div>
		<div class="rules">
			<p><b>Rule:</b> this is the shared signature across both sites. One vertical hairline, one brass dot, everywhere a section registers. It is ours, not a train.</p>
		</div>
	</section>

	<!-- ————————————————— motion ————————————————— -->
	<section>
		<h2><i>05</i> Motion</h2>
		<div class="rules rules-solo">
			<p><b>Every animation explains something</b> (a replay demonstrates the product, a stagger establishes reading order). Decoration alone does not animate.</p>
			<p><b>Mechanics:</b> transform, opacity, and clip-path only. Animating regions carry contain rules. Everything pauses offscreen and collapses to a meaningful static state under reduced motion.</p>
			<p><b>Sequencing:</b> entrances stagger at 70ms with one shared ease. Ambient loops (the swipe replay) hold, act, hold, return, and always yield instantly to the user's hand.</p>
			<p><b>Split of voice:</b> the consulting site earns two ambient loops maximum per page. The portfolio moves less: entrances and hovers, no ambient loops.</p>
		</div>
	</section>

	<!-- ————————————————— chrome ————————————————— -->
	<section>
		<h2><i>06</i> Navigation, framing, footer</h2>
		<div class="rules rules-solo">
			<p><b>Navigation:</b> wordmark left, three links, one ink-or-cream rectangular CTA. Fixed, hairline bottom rule, no blur backdrop. Identical skeleton on both sites; only the wordmark and CTA label change.</p>
			<p><b>Media framing:</b> real artifacts (live sites, actual screens) sit in square 1px-ruled frames with an inset top highlight. Simulated interfaces appear only framed as our side of the glass.</p>
			<p><b>Case openers:</b> mono eyebrow, serif title with one italic word, one-sentence stake, then evidence attached to the work it measures.</p>
			<p><b>Footer:</b> ink ground, mono metadata, brass accents. The portfolio footer credits the consulting practice and vice versa; that cross-link is the only founder presence on LCG (§25 voice ruling).</p>
			<p><b>Responsive:</b> two-column arrangements stack at 900px, type ramps use clamp, the registration line hides below 760px, everything holds at 375px.</p>
		</div>
	</section>

	<!-- ————————————————— logos ————————————————— -->
	<section id="logos">
		<h2><i>07</i> Three mark directions <em>(Q9, pick one)</em></h2>

		<div class="logo-block">
			<div class="logo-title"><b>A · Registration</b><p>The registration line made into a mark: two hairlines meeting at a brass point. Reads as precision and surveying. Quietest of the three, strongest tie to the shared motif.</p></div>
			<div class="logo-row">
				<div class="lg lg-dark"><svg viewBox="0 0 64 64" aria-label="Registration mark"><line x1="22" y1="6" x2="22" y2="58" stroke="#f0efe9" stroke-width="2"/><line x1="10" y1="44" x2="58" y2="44" stroke="#f0efe9" stroke-width="2"/><circle cx="22" cy="44" r="4.5" fill="#b49a67"/></svg></div>
				<div class="lg lg-dark lg-lockup"><svg viewBox="0 0 64 64"><line x1="22" y1="6" x2="22" y2="58" stroke="#f0efe9" stroke-width="2"/><line x1="10" y1="44" x2="58" y2="44" stroke="#f0efe9" stroke-width="2"/><circle cx="22" cy="44" r="4.5" fill="#b49a67"/></svg><span class="lock-serif">Lutz Consulting Group</span></div>
				<div class="lg lg-light"><svg viewBox="0 0 64 64"><line x1="22" y1="6" x2="22" y2="58" stroke="#171914" stroke-width="2"/><line x1="10" y1="44" x2="58" y2="44" stroke="#171914" stroke-width="2"/><circle cx="22" cy="44" r="4.5" fill="#8a6d3f"/></svg></div>
				<div class="lg lg-nav"><i><svg viewBox="0 0 64 64"><line x1="22" y1="6" x2="22" y2="58" stroke="#f0efe9" stroke-width="3"/><line x1="10" y1="44" x2="58" y2="44" stroke="#f0efe9" stroke-width="3"/><circle cx="22" cy="44" r="6" fill="#b49a67"/></svg></i><b>Lutz Consulting Group</b><span>Services</span><span>Work</span><em>Start a project</em></div>
			</div>
		</div>

		<div class="logo-block">
			<div class="logo-title"><b>B · Seal</b><p>Serif LCG monogram in a thin square frame over a brass baseline. Reads as an established firm's stamp. Most traditional; closest to the current provisional mark's spirit.</p></div>
			<div class="logo-row">
				<div class="lg lg-dark"><svg viewBox="0 0 64 64" aria-label="Seal mark"><rect x="4" y="4" width="56" height="56" fill="none" stroke="#f0efe9" stroke-width="1.5"/><text x="32" y="38" text-anchor="middle" font-family="Instrument Serif, Georgia, serif" font-size="26" fill="#f0efe9" letter-spacing="-1">LCG</text><line x1="14" y1="46" x2="50" y2="46" stroke="#b49a67" stroke-width="2"/></svg></div>
				<div class="lg lg-dark lg-lockup"><svg viewBox="0 0 64 64"><rect x="4" y="4" width="56" height="56" fill="none" stroke="#f0efe9" stroke-width="1.5"/><text x="32" y="38" text-anchor="middle" font-family="Instrument Serif, Georgia, serif" font-size="26" fill="#f0efe9" letter-spacing="-1">LCG</text><line x1="14" y1="46" x2="50" y2="46" stroke="#b49a67" stroke-width="2"/></svg><span class="lock-serif">Lutz Consulting Group</span></div>
				<div class="lg lg-light"><svg viewBox="0 0 64 64"><rect x="4" y="4" width="56" height="56" fill="none" stroke="#171914" stroke-width="1.5"/><text x="32" y="38" text-anchor="middle" font-family="Instrument Serif, Georgia, serif" font-size="26" fill="#171914" letter-spacing="-1">LCG</text><line x1="14" y1="46" x2="50" y2="46" stroke="#8a6d3f" stroke-width="2"/></svg></div>
				<div class="lg lg-nav"><i><svg viewBox="0 0 64 64"><rect x="4" y="4" width="56" height="56" fill="none" stroke="#f0efe9" stroke-width="2"/><text x="32" y="39" text-anchor="middle" font-family="Instrument Serif, Georgia, serif" font-size="28" fill="#f0efe9" letter-spacing="-1">LCG</text><line x1="14" y1="47" x2="50" y2="47" stroke="#b49a67" stroke-width="3"/></svg></i><b>Lutz Consulting Group</b><span>Services</span><span>Work</span><em>Start a project</em></div>
			</div>
		</div>

		<div class="logo-block">
			<div class="logo-title"><b>C · Seam</b><p>The split view itself: ink side, paper side, brass seam off center. Carries the whole brand argument (we watch one side so you only see the other). Boldest and most product-tied.</p></div>
			<div class="logo-row">
				<div class="lg lg-dark"><svg viewBox="0 0 64 64" aria-label="Seam mark"><rect x="6" y="6" width="52" height="52" fill="#171914" stroke="#f0efe9" stroke-width="1.5"/><rect x="38" y="6" width="20" height="52" fill="#dad6cc"/><rect x="36.5" y="6" width="3" height="52" fill="#b49a67"/></svg></div>
				<div class="lg lg-dark lg-lockup"><svg viewBox="0 0 64 64"><rect x="6" y="6" width="52" height="52" fill="#171914" stroke="#f0efe9" stroke-width="1.5"/><rect x="38" y="6" width="20" height="52" fill="#dad6cc"/><rect x="36.5" y="6" width="3" height="52" fill="#b49a67"/></svg><span class="lock-serif">Lutz Consulting Group</span></div>
				<div class="lg lg-light"><svg viewBox="0 0 64 64"><rect x="6" y="6" width="52" height="52" fill="#f6f3ec" stroke="#171914" stroke-width="1.5"/><rect x="6" y="6" width="26" height="52" fill="#171914"/><rect x="30.5" y="6" width="3" height="52" fill="#8a6d3f"/></svg></div>
				<div class="lg lg-nav"><i><svg viewBox="0 0 64 64"><rect x="6" y="6" width="52" height="52" fill="#171914" stroke="#f0efe9" stroke-width="2"/><rect x="38" y="6" width="20" height="52" fill="#dad6cc"/><rect x="36" y="6" width="4" height="52" fill="#b49a67"/></svg></i><b>Lutz Consulting Group</b><span>Services</span><span>Work</span><em>Start a project</em></div>
			</div>
		</div>
	</section>

	<footer class="board-foot">
		<p>Approve in COMMS: the system as a whole, plus mark A, B, or C. Propagation and the services layout start after your yes.</p>
	</footer>
</div>

<style>
	:global(html) { background: #080b09; }
	:global(body) { margin: 0; background: #080b09 !important; }
	.board { --ink:#080b09; --surface:#131815; --emerald:#07543f; --emerald-deep:#0d2d24; --text:#f0efe9; --muted:#9b9d98; --paper:#dad6cc; --brass:#b49a67; --brass-dark:#8a6d3f; --line:rgba(240,239,233,.1); --line-strong:rgba(240,239,233,.18); --display:'Instrument Serif',Georgia,serif; --sans:'DM Sans',sans-serif; --mono:'IBM Plex Mono',monospace;
		background: var(--ink); color: var(--text); font-family: var(--sans); min-height: 100vh; padding: clamp(48px, 7vw, 110px) 0 90px; }
	.board, .board * { box-sizing: border-box; }
	.board > header, .board > section, .board > footer { width: min(1180px, calc(100% - 64px)); margin: 0 auto; }

	.board-head { margin-bottom: clamp(48px, 6vw, 86px); }
	.crumb { margin: 0 0 22px; font: 500 9px var(--mono); letter-spacing: .16em; color: var(--brass); }
	.board-head h1 { margin: 0 0 22px; font: 400 clamp(46px, 6.4vw, 88px)/.92 var(--display); letter-spacing: -.04em; }
	.board-head h1 em { color: var(--paper); }
	.intent { max-width: 620px; margin: 0; color: var(--muted); font-size: 15px; line-height: 1.75; }

	section { padding: clamp(36px, 4.5vw, 58px) 0; border-top: 1px solid var(--line); }
	h2 { display: flex; align-items: baseline; gap: 14px; margin: 0 0 30px; font: 400 clamp(26px, 3vw, 38px)/1 var(--display); letter-spacing: -.02em; }
	h2 i { font: 500 10px var(--mono); color: var(--brass); font-style: normal; letter-spacing: .12em; }
	h2 em { color: var(--muted); font-size: .55em; }

	.swatches { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-bottom: 22px; }
	.sw { min-height: 118px; padding: 12px 13px; display: flex; flex-direction: column; justify-content: flex-end; gap: 2px; border: 1px solid var(--line-strong); border-radius: 0; }
	.sw b { font-size: 12px; font-weight: 600; }
	.sw span { font: 10px var(--mono); opacity: .85; }
	.sw small { font-size: 10px; opacity: .7; line-height: 1.4; }
	.sw-light { color: #171914; }

	.rules { max-width: 860px; display: grid; gap: 12px; }
	.rules p { margin: 0; padding-left: 18px; position: relative; color: var(--muted); font-size: 13px; line-height: 1.7; }
	.rules p::before { content: ''; position: absolute; left: 0; top: 9px; width: 8px; height: 1px; background: var(--brass); }
	.rules b { color: var(--text); font-weight: 600; }

	.specimens { display: grid; gap: 18px; margin-bottom: 24px; padding: 30px; border: 1px solid var(--line-strong); background: var(--surface); }
	.spec-display { margin: 0; font: 400 clamp(30px, 4vw, 52px)/1 var(--display); letter-spacing: -.03em; }
	.spec-body { max-width: 560px; margin: 0; font-size: 15px; line-height: 1.7; color: var(--muted); }
	.spec-mono { margin: 0; font: 500 10px var(--mono); letter-spacing: .14em; color: var(--brass); }

	.geo-row { display: flex; flex-wrap: wrap; gap: 14px; align-items: center; margin-bottom: 24px; }
	.g-btn { padding: 12px 18px; border: 0; border-radius: 4px; background: var(--paper); color: #171914; font: 500 12px var(--sans); cursor: pointer; }
	.g-btn-paper { background: #171914; color: var(--paper); box-shadow: 0 0 0 1px var(--line-strong); }
	.g-input { padding: 11px 14px; border: 1px solid var(--line-strong); border-radius: 4px; color: var(--muted); font-size: 12px; background: var(--surface); }
	.g-tag { padding: 6px 12px; border: 1px solid var(--brass); border-radius: 999px; color: var(--brass); font: 500 9px var(--mono); letter-spacing: .1em; }
	.g-card { padding: 14px 16px; border: 1px solid var(--line-strong); border-radius: 7px; background: var(--surface); box-shadow: 0 1px 0 rgba(255,255,255,.06) inset; }
	.g-card small { display: block; margin-bottom: 5px; font: 500 8px var(--mono); letter-spacing: .12em; color: var(--muted); }
	.g-card b { font: 400 16px var(--display); }
	.g-frame { width: 150px; height: 74px; display: flex; align-items: flex-end; padding: 10px; border: 1px solid var(--line-strong); border-radius: 6px; background: linear-gradient(180deg, rgba(255,255,255,.05), transparent 30%), var(--emerald-deep); }
	.g-frame small { font: 500 8px var(--mono); letter-spacing: .12em; color: var(--muted); }

	.motif-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 22px; }
	.motif { position: relative; padding: 26px 26px 26px 46px; border: 1px solid var(--line-strong); min-height: 130px; }
	.motif-dark { background: var(--surface); }
	.motif-light { background: var(--paper); color: #171914; }
	.motif small { display: block; margin-bottom: 10px; font: 500 8px var(--mono); letter-spacing: .14em; color: var(--brass-dark); }
	.motif-dark small { color: var(--brass); }
	.motif p { margin: 0; font-size: 12.5px; line-height: 1.65; color: var(--muted); }
	.motif-light p { color: #55574f; }
	.reg-line { position: absolute; left: 22px; top: 20px; bottom: 20px; width: 1px; background: currentColor; opacity: .25; }
	.reg-line b { position: absolute; left: -3px; top: 0; width: 7px; height: 7px; border-radius: 50%; background: var(--brass); }
	.motif-dark .reg-line b { animation: reg-travel 6s ease-in-out infinite alternate; }
	@keyframes reg-travel { to { transform: translateY(70px); } }

	.logo-block { display: grid; grid-template-columns: minmax(220px, .8fr) 2.2fr; gap: 30px; align-items: start; padding: 26px 0; border-top: 1px solid var(--line); }
	.logo-block:first-of-type { border-top: 0; }
	.logo-title b { display: block; margin-bottom: 10px; font: 400 22px var(--display); letter-spacing: -.01em; }
	.logo-title p { margin: 0; color: var(--muted); font-size: 12.5px; line-height: 1.65; }
	.logo-row { display: flex; flex-wrap: wrap; gap: 12px; align-items: stretch; }
	.lg { display: flex; align-items: center; justify-content: center; gap: 14px; padding: 18px; border: 1px solid var(--line-strong); min-height: 96px; }
	.lg svg { width: 52px; height: 52px; flex: 0 0 auto; }
	.lg-dark { background: var(--surface); }
	.lg-light { background: var(--paper); }
	.lg-lockup { padding-right: 26px; }
	.lock-serif { font: 400 21px var(--display); letter-spacing: -.02em; white-space: nowrap; }
	.lg-nav { flex: 1 1 320px; justify-content: flex-start; gap: 18px; padding: 0 18px; background: var(--ink); border-bottom-width: 1px; min-height: 60px; }
	.lg-nav svg, .lg-nav i { width: 22px; height: 22px; display: flex; }
	.lg-nav b { margin-right: auto; font: 600 12px var(--sans); letter-spacing: .01em; }
	.lg-nav span { font-size: 11px; color: var(--muted); }
	.lg-nav em { padding: 8px 12px; border-radius: 4px; background: var(--paper); color: #171914; font: 500 10px var(--sans); font-style: normal; }

	.board-foot { margin-top: 40px; padding-top: 26px; border-top: 1px solid var(--line); }
	.board-foot p { max-width: 560px; margin: 0; color: var(--muted); font-size: 13px; line-height: 1.7; }

	@media (max-width: 900px) {
		.motif-pair { grid-template-columns: 1fr; }
		.logo-block { grid-template-columns: 1fr; gap: 16px; }
	}
	@media (max-width: 480px) {
		.board > header, .board > section, .board > footer { width: calc(100% - 36px); }
		.lg-nav span { display: none; }
		.lock-serif { font-size: 17px; white-space: normal; }
	}
	@media (prefers-reduced-motion: reduce) {
		.motif-dark .reg-line b { animation: none; }
	}
</style>
