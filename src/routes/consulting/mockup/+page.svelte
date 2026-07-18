<script lang="ts">
	import ConsultingMark from '$lib/components/ConsultingMark.svelte';
	import ConsultingScrollStory from '$lib/components/ConsultingScrollStory.svelte';
	import ConsultingWorkChapter from '$lib/components/ConsultingWorkChapter.svelte';
	import { inview } from '$lib/actions/inview';

	const emailHref = 'mailto:jwlutz65@gmail.com?subject=Project%20inquiry%20for%20Lutz%20Consulting%20Group';

	const services = [
		{
			index: '01',
			title: 'Build',
			body: 'Websites, ecommerce, migrations, and custom products designed around how the business actually works.',
			items: ['Web design + development', 'Squarespace migrations', 'Commerce + payments', 'Custom applications']
		},
		{
			index: '02',
			title: 'Run',
			body: 'The technical care that keeps a launch from becoming a second job after it goes live.',
			items: ['Hosting + deployments', 'Domains + integrations', 'Maintenance + support', 'Monitoring + performance']
		},
		{
			index: '03',
			title: 'Improve',
			body: 'Analytics, automations, machine learning, and AI integrations that turn activity into better operations.',
			items: ['Analytics + reporting', 'Operational automation', 'AI integrations', 'ML + decision systems']
		}
	];
</script>

<svelte:head>
	<title>Consulting Direction — Lutz Consulting Group</title>
	<meta name="description" content="A cinematic consulting landing-page direction for Lutz Consulting Group." />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="mockup">
	<header class="site-nav">
		<a class="brand" href="#top" aria-label="Lutz Consulting Group home">
			<ConsultingMark size={31} />
			<span>Lutz Consulting Group</span>
		</a>
		<nav aria-label="Main navigation">
			<a href="#services">Services</a>
			<a href="#work">Work</a>
			<a href="#approach">Approach</a>
		</nav>
		<a class="nav-cta" href={emailHref}>Start a project <span>↗</span></a>
	</header>

	<main>
		<section class="hero" id="top">
			<div class="hero-grid" aria-hidden="true"></div>
			<div class="hero-orbit orbit-one" aria-hidden="true"></div>
			<div class="hero-orbit orbit-two" aria-hidden="true"></div>

			<div class="hero-copy">
				<p class="eyebrow">WEBSITES / AI INTEGRATIONS / ANALYTICS</p>
				<h1>Don’t let your website become your <em>second job.</em></h1>
				<p class="hero-lede">
					We build, connect, and operate the digital systems behind businesses and people—then stay around to keep them working.
				</p>
				<div class="hero-actions">
					<a class="primary" href={emailHref}>Tell us what you need <span>↗</span></a>
					<a class="text-link" href="#story">See what we take off your plate <span>↓</span></a>
				</div>
			</div>

			<div class="hero-status" aria-label="Services status">
				<div><span class="status-dot"></span><small>AVAILABLE FOR NEW WORK</small></div>
				<div><small>DESIGN</small><strong>→</strong><small>BUILD</small><strong>→</strong><small>OPERATE</small></div>
			</div>
		</section>

		<div id="story">
			<ConsultingScrollStory />
		</div>

		<section class="services page-shell" id="services">
			<div use:inview class="section-intro reveal">
				<p class="eyebrow">WHAT WE DO</p>
				<h2>From first idea to the thing that comes next.</h2>
				<p>Web design is often the beginning. The valuable relationship is everything that keeps improving afterward.</p>
			</div>

			<div class="service-grid">
				{#each services as service, i}
					<article use:inview class="service-card reveal" style={`transition-delay: ${i * 90}ms`}>
						<div class="service-top"><span>{service.index}</span><span>↘</span></div>
						<h3>{service.title}</h3>
						<p>{service.body}</p>
						<ul>
							{#each service.items as item}<li>{item}</li>{/each}
						</ul>
					</article>
				{/each}
			</div>
		</section>

		<section class="work page-shell" id="work">
			<div use:inview class="work-heading reveal">
				<div>
					<p class="eyebrow">SELECTED SYSTEMS</p>
					<h2>Built for production.<br /><em>Proven in it.</em></h2>
				</div>
				<p>A visual record of the products, storefronts, and operating systems we have designed and built.</p>
			</div>

			<ConsultingWorkChapter
				index="001"
				category="FINANCIAL INFRASTRUCTURE"
				title="One trade. Routed everywhere."
				description="A live multi-broker copy-trading platform where every millisecond, risk decision, and connected account has to remain observable."
				metrics={[
					{ value: '447ms', label: 'MEAN FAN-OUT LATENCY' },
					{ value: '90%', label: 'UNDER HALF A SECOND' },
					{ value: '1.5bps', label: 'MEAN SLIPPAGE' },
					{ value: '16', label: 'COMPATIBLE BROKERS' }
				]}
				bullets={['Product and interface design', 'Broker and payment integrations', 'Execution, risk, and monitoring systems', 'Live analytics and operational tooling']}
				variant="candella"
			/>

			<ConsultingWorkChapter
				index="002"
				category="ECOMMERCE"
				title="A storefront with somewhere to go."
				description="A complete ecommerce rebuild for a dance product company: migrated from Squarespace to Shopify, redesigned for the product, and connected to the analytics behind future growth."
				metrics={[
					{ value: '01', label: 'COMPLETE PLATFORM MIGRATION' },
					{ value: '100%', label: 'RESPONSIVE STOREFRONT' },
					{ value: '24/7', label: 'COMMERCE AVAILABILITY' },
					{ value: 'LIVE', label: 'ANALYTICS MONITORING' }
				]}
				bullets={['Squarespace to Shopify migration', 'Website and product design', 'Mobile commerce experience', 'Analytics and social growth support']}
				variant="sparkling"
			/>

			<ConsultingWorkChapter
				index="003"
				category="ADAPTIVE SOFTWARE"
				title="Measure whether you’re getting sharper."
				description="A cognitive-training product where the interface, adaptive ratings, and integrity systems were designed as one connected experience."
				metrics={[
					{ value: '07', label: 'INTERACTIVE DRILLS' },
					{ value: '05', label: 'COGNITIVE DOMAINS' },
					{ value: 'ELO', label: 'ADAPTIVE RATING SYSTEM' },
					{ value: 'LIVE', label: 'ANTI-CHEAT CHECKS' }
				]}
				bullets={['Website and product design', 'Adaptive ELO architecture', 'Anti-cheat and integrity systems', 'Collaborative product development']}
				variant="mindlsn"
			/>
		</section>

		<section class="approach" id="approach">
			<div class="page-shell approach-grid">
				<div use:inview class="approach-copy reveal">
					<p class="eyebrow">HOW WE WORK</p>
					<h2>Modern tools.<br /><em>Human judgment.</em></h2>
				</div>
				<div use:inview class="approach-body reveal">
					<p class="approach-lede">AI is a tool. Judgment is the product.</p>
					<p>We use the latest tools to move faster and solve harder problems. But tools do not understand your customers, your constraints, or what the business can actually support.</p>
					<div class="checks">
						<span><i>01</i> Every line reviewed by a person</span>
						<span><i>02</i> Every system tested against the real workflow</span>
						<span><i>03</i> Every decision has someone accountable for it</span>
					</div>
				</div>
			</div>
		</section>

		<section class="final-cta">
			<div class="cta-grid" aria-hidden="true"></div>
			<p class="eyebrow">WHAT DOES THE BUSINESS NEED NEXT?</p>
			<h2>Tell us where it hurts.<br /><em>We’ll take it from there.</em></h2>
			<a href={emailHref}>Start a conversation <span>↗</span></a>
		</section>
	</main>

	<footer>
		<a class="brand" href="#top"><ConsultingMark size={27} /><span>Lutz Consulting Group</span></a>
		<span>Websites, AI integrations, and analytics.</span>
		<a href="/">Personal portfolio ↗</a>
	</footer>
</div>

<style>
	:global(html) { scroll-behavior: smooth; background: #0b0d0e; }
	:global(body) { margin: 0; background: #0b0d0e !important; }
	:global(html.dark body) { background: #0b0d0e !important; }

	.mockup {
		--lcg-bg: #0b0d0e;
		--lcg-surface: #111416;
		--lcg-surface-2: #171a1c;
		--lcg-text: #f1eee6;
		--lcg-text-soft: #d3d1ca;
		--lcg-muted: #8f9696;
		--lcg-line: rgba(241, 238, 230, 0.09);
		--lcg-line-strong: rgba(241, 238, 230, 0.17);
		--lcg-accent: #c7ff57;
		--lcg-display: 'Instrument Serif', Georgia, serif;
		--lcg-sans: 'Manrope', Inter, sans-serif;
		--lcg-mono: 'IBM Plex Mono', 'JetBrains Mono', monospace;
		background: var(--lcg-bg);
		color: var(--lcg-text);
		font-family: var(--lcg-sans);
		min-height: 100vh;
		overflow: clip;
	}

	.site-nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		height: 4.5rem;
		padding: 0 clamp(1rem, 3vw, 3rem);
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		border-bottom: 1px solid var(--lcg-line);
		background: rgba(11, 13, 14, 0.74);
		backdrop-filter: blur(18px) saturate(130%);
	}

	.brand { display: inline-flex; align-items: center; gap: .8rem; color: var(--lcg-text); text-decoration: none; width: max-content; }
	.brand span { font-size: .84rem; font-weight: 600; letter-spacing: -.02em; }
	.site-nav nav { display: flex; align-items: center; gap: 2rem; }
	.site-nav nav a, footer a { font-size: .72rem; color: var(--lcg-muted); text-decoration: none; transition: color .2s; }
	.site-nav nav a:hover, footer a:hover { color: var(--lcg-text); }
	.nav-cta { justify-self: end; font-size: .72rem; color: var(--lcg-bg); background: var(--lcg-accent); padding: .72rem 1rem; text-decoration: none; font-weight: 600; }
	.nav-cta span { margin-left: .55rem; }

	.hero {
		position: relative;
		min-height: 100vh;
		min-height: 100svh;
		display: flex;
		align-items: center;
		padding: 8rem clamp(1.25rem, 6vw, 7rem) 5rem;
		overflow: hidden;
	}

	.hero-grid, .cta-grid {
		position: absolute;
		inset: 0;
		background-image: linear-gradient(var(--lcg-line) 1px, transparent 1px), linear-gradient(90deg, var(--lcg-line) 1px, transparent 1px);
		background-size: clamp(54px, 7vw, 110px) clamp(54px, 7vw, 110px);
		mask-image: radial-gradient(circle at 65% 46%, black, transparent 68%);
	}

	.hero-orbit { position: absolute; border: 1px solid rgba(199,255,87,.18); border-radius: 50%; pointer-events: none; }
	.orbit-one { width: min(70vw, 950px); aspect-ratio: 1; right: -17%; top: -35%; animation: orbit-spin 34s linear infinite; }
	.orbit-two { width: min(45vw, 620px); aspect-ratio: 1; right: 3%; bottom: -38%; animation: orbit-spin 28s linear infinite reverse; }
	.hero-orbit::before { content: ''; position: absolute; left: 50%; top: -5px; width: 9px; height: 9px; background: var(--lcg-accent); box-shadow: 0 0 30px rgba(199,255,87,.7); }

	.hero-copy { position: relative; z-index: 2; max-width: 1080px; }
	.eyebrow { font-family: var(--lcg-mono); font-size: .68rem; letter-spacing: .14em; text-transform: uppercase; color: var(--lcg-accent); margin: 0 0 1.5rem; }
	.hero h1 { font-family: var(--lcg-display); font-size: clamp(4.5rem, 9.7vw, 10.5rem); font-weight: 400; line-height: .83; letter-spacing: -.055em; max-width: 1120px; margin: 0; }
	.hero h1 em, .work-heading h2 em, .approach h2 em, .final-cta h2 em { font-weight: 400; color: var(--lcg-accent); }
	.hero-lede { max-width: 670px; font-size: clamp(1.05rem, 1.45vw, 1.3rem); line-height: 1.65; color: var(--lcg-muted); margin: 2.4rem 0 0; }
	.hero-actions { display: flex; align-items: center; gap: 1.5rem; margin-top: 2.4rem; }
	.primary { display: inline-flex; align-items: center; gap: 1.5rem; padding: 1rem 1.2rem; background: var(--lcg-accent); color: var(--lcg-bg); text-decoration: none; font-size: .78rem; font-weight: 600; }
	.text-link { color: var(--lcg-text-soft); font-size: .76rem; text-decoration: none; }
	.text-link span { color: var(--lcg-accent); margin-left: .6rem; }
	.hero-status { position: absolute; z-index: 3; left: clamp(1.25rem,6vw,7rem); right: clamp(1.25rem,6vw,7rem); bottom: 1.8rem; display: flex; justify-content: space-between; align-items: center; font-family: var(--lcg-mono); }
	.hero-status div { display: flex; align-items: center; gap: .6rem; }
	.hero-status small { font-size: .58rem; color: var(--lcg-muted); letter-spacing: .1em; }
	.hero-status strong { font-weight: 400; color: var(--lcg-accent); }
	.status-dot { width: 6px; height: 6px; background: var(--lcg-accent); box-shadow: 0 0 12px rgba(199,255,87,.7); }

	.page-shell { width: min(1380px, calc(100% - clamp(2.5rem, 9vw, 10rem))); margin: 0 auto; }
	.services { padding-top: clamp(7rem, 13vw, 13rem); padding-bottom: clamp(8rem, 14vw, 14rem); }
	.section-intro { display: grid; grid-template-columns: .6fr 1.4fr 1fr; gap: 3rem; align-items: start; margin-bottom: 6rem; }
	.section-intro h2, .work-heading h2, .approach h2, .final-cta h2 { font-family: var(--lcg-display); font-weight: 400; letter-spacing: -.045em; margin: 0; }
	.section-intro h2 { font-size: clamp(3rem,5.5vw,6rem); line-height: .95; }
	.section-intro > p:last-child { color: var(--lcg-muted); line-height: 1.75; margin: .4rem 0 0; }
	.service-grid { display: grid; grid-template-columns: repeat(3,1fr); border-top: 1px solid var(--lcg-line-strong); border-left: 1px solid var(--lcg-line-strong); }
	.service-card { min-height: 520px; padding: clamp(1.5rem,3vw,2.8rem); border-right: 1px solid var(--lcg-line-strong); border-bottom: 1px solid var(--lcg-line-strong); background: var(--lcg-surface); display: flex; flex-direction: column; transition: background .35s, transform .35s; }
	.service-card:hover { background: var(--lcg-surface-2); transform: translateY(-4px); }
	.service-top { display: flex; justify-content: space-between; color: var(--lcg-muted); font: .66rem var(--lcg-mono); }
	.service-top span:last-child { color: var(--lcg-accent); font-size: 1.1rem; }
	.service-card h3 { font: 400 clamp(3rem,5vw,5rem)/1 var(--lcg-display); margin: auto 0 1.5rem; }
	.service-card > p { color: var(--lcg-muted); line-height: 1.65; margin: 0 0 2rem; }
	.service-card ul { list-style: none; padding: 0; margin: 0; border-top: 1px solid var(--lcg-line); }
	.service-card li { padding: .75rem 0; border-bottom: 1px solid var(--lcg-line); font-size: .74rem; color: var(--lcg-text-soft); }
	.service-card li::before { content: '+'; color: var(--lcg-accent); margin-right: .7rem; }

	.work { padding-top: 5rem; }
	.work-heading { display: grid; grid-template-columns: 1.4fr .6fr; gap: 4rem; align-items: end; padding-bottom: 7rem; }
	.work-heading h2 { font-size: clamp(3.5rem,7.5vw,8rem); line-height: .87; }
	.work-heading > p { color: var(--lcg-muted); line-height: 1.75; max-width: 480px; margin: 0 0 .8rem; }

	.approach { background: #e8e4da; color: #141617; padding: clamp(8rem,14vw,14rem) 0; }
	.approach-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(4rem,10vw,11rem); }
	.approach .eyebrow { color: #5f751f; }
	.approach h2 { font-size: clamp(4rem,7vw,8rem); line-height: .87; }
	.approach h2 em { color: #5f751f; }
	.approach-lede { font: 400 clamp(2rem,3.2vw,3.4rem)/1.04 var(--lcg-display); margin: 0 0 2rem; }
	.approach-body > p:not(.approach-lede) { font-size: 1.05rem; line-height: 1.75; color: #535859; }
	.checks { margin-top: 3rem; border-top: 1px solid rgba(20,22,23,.2); }
	.checks span { display: flex; gap: 1.2rem; padding: 1.1rem 0; border-bottom: 1px solid rgba(20,22,23,.2); font-size: .8rem; }
	.checks i { font: normal .64rem var(--lcg-mono); color: #5f751f; }

	.final-cta { position: relative; min-height: 88vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 8rem 1.25rem; overflow: hidden; }
	.final-cta .eyebrow, .final-cta h2, .final-cta a { position: relative; z-index: 2; }
	.final-cta h2 { font-size: clamp(4rem,8vw,9rem); line-height: .88; }
	.final-cta a { margin-top: 3rem; display: inline-flex; gap: 2rem; padding: 1.1rem 1.3rem; background: var(--lcg-accent); color: var(--lcg-bg); text-decoration: none; font-size: .78rem; font-weight: 600; }

	footer { min-height: 7rem; border-top: 1px solid var(--lcg-line); padding: 1.5rem clamp(1rem,3vw,3rem); display: flex; align-items: center; justify-content: space-between; color: var(--lcg-muted); font-size: .68rem; }

	.reveal { opacity: 0; transform: translateY(28px); transition: opacity .8s ease, transform .9s cubic-bezier(.22,1,.36,1); }
	.reveal:global(.visible) { opacity: 1; transform: translateY(0); }

	@keyframes orbit-spin { to { transform: rotate(360deg); } }

	@media (max-width: 900px) {
		.site-nav { grid-template-columns: 1fr auto; }
		.site-nav nav { display: none; }
		.brand span { font-size: .72rem; }
		.hero { padding-left: 1.25rem; padding-right: 1.25rem; }
		.hero h1 { font-size: clamp(4rem,16vw,7rem); }
		.hero-status div:last-child { display: none; }
		.hero-actions { align-items: flex-start; flex-direction: column; }
		.page-shell { width: min(100% - 2.5rem, 1380px); }
		.section-intro, .work-heading, .approach-grid { grid-template-columns: 1fr; }
		.section-intro { gap: 1rem; }
		.service-grid { grid-template-columns: 1fr; }
		.service-card { min-height: 440px; }
		.work-heading { gap: 2rem; padding-bottom: 4rem; }
		footer { align-items: flex-start; flex-direction: column; gap: 1rem; }
	}

	@media (prefers-reduced-motion: reduce) {
		:global(html) { scroll-behavior: auto; }
		.hero-orbit { animation: none; }
		.reveal { opacity: 1; transform: none; transition: none; }
	}
</style>
