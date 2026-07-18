<script lang="ts">
	import { consultingSite, prototypeCases } from '$lib/content/consulting-prototype';
	import PrototypeNav from './PrototypeNav.svelte';
	import PrototypeFooter from './PrototypeFooter.svelte';
	import PrototypeWorkVisual from './PrototypeWorkVisual.svelte';
	import PrototypeCaseStudy from './PrototypeCaseStudy.svelte';
	import { track, trackOutbound } from '$lib/analytics';

	const contactHref = '/consulting#contact';
</script>

<svelte:head>
	<title>Selected Work | Lutz Consulting Group</title>
	<meta name="description" content="Case studies of websites, products, AI workflows, and analytics systems designed and operated by Lutz Consulting Group." />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Lutz Consulting Group" />
	<meta property="og:title" content="Selected Work | Lutz Consulting Group" />
	<meta property="og:description" content="Three different businesses. One standard of care." />
	<meta name="twitter:card" content="summary" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
</svelte:head>

<div class="work-prototype" id="top">
	<a class="skip-link" href="#cases">Skip to case studies</a>
	<PrototypeNav
		links={[
			{ label: 'Consulting', href: '/consulting' },
			{ label: 'Case studies', href: '#cases' },
			{ label: 'Contact', href: '#contact' }
		]}
		brandHref="/consulting"
		ariaLabel="Selected work navigation"
	/>

	<main>
		<section class="work-hero shell">
			<div class="hero-heading">
				<p>{consultingSite.workPage.eyebrow}</p>
				<h1>{consultingSite.workPage.title.lead}<br /><em>{consultingSite.workPage.title.emphasis}</em></h1>
			</div>
			<div class="hero-context">
				<p>{consultingSite.workPage.body}</p>
				<a href="#cases">{consultingSite.workPage.cta}</a>
			</div>
		</section>

		<section class="cases shell" id="cases">
			<header class="cases-heading">
				<p>{consultingSite.workPage.sectionEyebrow}</p>
				<h2>{consultingSite.workPage.sectionTitle}</h2>
				<span>{consultingSite.workPage.sectionBody}</span>
			</header>

			<div class="case-grid">
				{#each prototypeCases as project, index}
					<article class:lead={index === 0} class={`case-card ${project.slug}`} id={`preview-${project.slug}`}>
						<a class="case-visual" href={`#case-${project.slug}`} aria-label={`Read the ${project.name} case study below`}>
							<PrototypeWorkVisual variant={project.slug} stage={3} />
						</a>
						<div class="case-copy">
							<div class="case-meta"><small>CASE {project.index}</small><span>{project.category}</span></div>
							<h3>{project.title.lead}<br /><em>{project.title.emphasis}</em></h3>
							<p>{project.summary}</p>
							<div class="evidence">
								{#each project.evidence as item}<div><strong>{item.value}</strong><span>{item.label}</span></div>{/each}
							</div>
							<div class="case-actions">
								<a class="primary" href={`#case-${project.slug}`}>Read the case study</a>
								<a href={project.liveUrl} target="_blank" rel="noreferrer" onclick={() => trackOutbound(project.liveUrl, 'consulting_work_index')}>Visit the live site</a>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section class="full-cases shell" aria-label="Complete case studies">
			<header class="full-cases-heading">
				<p>THE FULL STORIES</p>
				<h2>What happened<br /><em>behind the screen.</em></h2>
				<span>Scroll through the need, the difficult part, what we built, and what continued after launch.</span>
			</header>
			{#each prototypeCases as project}<PrototypeCaseStudy {project} />{/each}
		</section>

		<section class="lab shell" id="lab">
			<div class="lab-visual"><img src="/consulting/prototypes/candella-quant-workspace.png" alt="Candella Quant workspace" loading="lazy" decoding="async" /><span>ACTIVE PRODUCT DEVELOPMENT</span></div>
			<div class="lab-copy"><p>{consultingSite.lab.eyebrow}</p><h2>{consultingSite.lab.title}</h2><span>{consultingSite.lab.body}</span><a href={consultingSite.lab.url} target="_blank" rel="noreferrer" onclick={() => trackOutbound(consultingSite.lab.url, 'consulting_work_lab')}>{consultingSite.lab.cta}</a></div>
		</section>

		<section class="work-cta" id="contact">
			<p>{consultingSite.finalCta.eyebrow}</p>
			<h2>Have a system<br /><em>worth untangling?</em></h2>
			<span>A polished brief is optional. The current link, problem, or process is enough to start.</span>
			<a href={contactHref} onclick={() => track('cta_click', { source: 'consulting_prototype', location: 'work_index_cta' })}>Start a project <small>Project starter</small></a>
		</section>
	</main>

	<PrototypeFooter />
</div>

<style>
	:global(html){scroll-behavior:smooth;background:#080b09}:global(body){margin:0;background:#080b09!important}
	.work-prototype{--proto-bg:#080b09;--proto-surface:#131815;--proto-surface-2:#19201b;--proto-green:#07543f;--proto-green-light:#2d8064;--proto-green-deep:#0d2d24;--proto-text:#f0efe9;--proto-muted:#9b9d98;--proto-paper:#dad6cc;--proto-brass:#b49a67;--proto-line:rgba(240,239,233,.1);--proto-line-strong:rgba(240,239,233,.18);--proto-display:'Instrument Serif',Georgia,serif;--proto-sans:'DM Sans',sans-serif;--proto-mono:'IBM Plex Mono',monospace;background:var(--proto-bg);color:var(--proto-text);font-family:var(--proto-sans);min-height:100vh;overflow:clip}
	.work-prototype,.work-prototype *{box-sizing:border-box}.shell{width:min(1380px,calc(100% - 80px));margin:0 auto}.skip-link{position:fixed;z-index:100;left:16px;top:12px;transform:translateY(-160%);padding:11px 14px;background:var(--proto-paper);color:var(--proto-bg);font-size:12px;font-weight:600;text-decoration:none}.skip-link:focus{transform:translateY(0)}
	:global(.work-prototype a:focus-visible){outline:2px solid var(--proto-brass);outline-offset:4px}
	.work-hero{min-height:850px;padding:180px 0 70px;display:grid;grid-template-columns:minmax(0,1.18fr) minmax(320px,.62fr);gap:80px;align-items:center}.hero-heading>p,.cases-heading>p,.lab-copy>p,.work-cta>p{margin:0 0 24px;color:var(--proto-brass);font:500 9px var(--proto-mono);letter-spacing:.14em}.hero-heading h1{max-width:1050px;margin:0;font:400 clamp(70px,8.4vw,128px)/.84 var(--proto-display);letter-spacing:-.045em}.hero-heading em,.work-cta em{color:var(--proto-paper);font-weight:400}.hero-context{align-self:end;padding:30px 0 8px 40px;border-left:1px solid var(--proto-line-strong)}.hero-context p{max-width:470px;margin:0;color:var(--proto-muted);font-size:16px;line-height:1.75}.hero-context>a{display:inline-flex;margin-top:30px;padding-bottom:5px;border-bottom:1px solid var(--proto-brass);color:var(--proto-paper);font-size:13px;text-decoration:none}
	.cases{padding:115px 0 145px;scroll-margin-top:70px;border-top:1px solid var(--proto-line)}.cases-heading{display:grid;grid-template-columns:.65fr 1fr .65fr;gap:50px;align-items:end;margin-bottom:72px}.cases-heading h2{margin:0;font:400 clamp(58px,6.8vw,96px)/.88 var(--proto-display);letter-spacing:-.04em}.cases-heading>span{color:var(--proto-muted);line-height:1.75}.case-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}.case-card{min-width:0;border:1px solid var(--proto-line-strong);background:var(--proto-surface);box-shadow:0 1px 0 rgba(255,255,255,.05) inset}.case-card.lead{grid-column:1/-1;display:grid;grid-template-columns:minmax(0,1.25fr) minmax(380px,.75fr)}.case-visual{display:block;min-width:0;overflow:hidden;border-bottom:1px solid var(--proto-line);background:#0c0c0f}.case-visual :global(.work-visual){height:100%;min-height:570px;aspect-ratio:auto;border:0;transition:transform .7s cubic-bezier(.2,.75,.2,1)}.case-card:not(.lead) .case-visual :global(.work-visual){height:auto;min-height:0;aspect-ratio:1}.case-visual:hover :global(.work-visual){transform:scale(1.012)}.case-copy{padding:35px;display:flex;flex-direction:column}.case-card.lead .case-copy{padding:50px}.case-meta{display:flex;justify-content:space-between;gap:20px;color:var(--proto-muted);font:500 9px var(--proto-mono);letter-spacing:.09em}.case-meta small{color:var(--proto-brass);font:inherit}.case-copy h3{margin:45px 0 18px;font:400 clamp(42px,5vw,72px)/.89 var(--proto-display);letter-spacing:-.035em}.case-copy h3 em{color:var(--proto-paper);font-weight:400}.case-card:not(.lead) .case-copy h3{font-size:clamp(38px,4vw,58px)}.case-copy>p{max-width:610px;margin:0;color:var(--proto-muted);font-size:14px;line-height:1.72}.evidence{margin:45px 0 34px;display:grid;grid-template-columns:repeat(2,1fr);border-top:1px solid var(--proto-line);border-left:1px solid var(--proto-line)}.evidence>div{padding:18px;border-right:1px solid var(--proto-line);border-bottom:1px solid var(--proto-line)}.evidence strong{display:block;color:var(--proto-paper);font:400 23px/1 var(--proto-display)}.evidence span{display:block;margin-top:8px;color:var(--proto-muted);font:500 9px/1.45 var(--proto-mono);letter-spacing:.06em}.case-actions{display:flex;align-items:center;gap:22px;margin-top:auto}.case-actions a{padding-bottom:4px;border-bottom:1px solid var(--proto-line-strong);color:var(--proto-muted);font-size:11px;text-decoration:none;transition:color .2s ease,border-color .2s ease}.case-actions a:hover{color:var(--proto-paper);border-color:var(--proto-brass)}.case-actions a.primary{padding:12px 14px;border:0;background:var(--proto-paper);color:var(--proto-bg);font-weight:600}
	.full-cases{padding:125px 0 40px;border-top:1px solid var(--proto-line)}.full-cases-heading{display:grid;grid-template-columns:.65fr 1fr .65fr;gap:50px;align-items:end;padding-bottom:85px}.full-cases-heading>p{margin:0;color:var(--proto-brass);font:500 9px var(--proto-mono);letter-spacing:.14em}.full-cases-heading h2{margin:0;font:400 clamp(58px,6.8vw,96px)/.88 var(--proto-display);letter-spacing:-.04em}.full-cases-heading h2 em{color:var(--proto-paper);font-weight:400}.full-cases-heading>span{color:var(--proto-muted);line-height:1.75}
	.lab{padding:125px 0;display:grid;grid-template-columns:1.25fr .75fr;gap:80px;align-items:center;border-top:1px solid var(--proto-line)}.lab-visual{position:relative;overflow:hidden;border:1px solid var(--proto-line-strong);background:#1b1c20;box-shadow:0 35px 100px rgba(0,0,0,.35)}.lab-visual img{display:block;width:100%;filter:saturate(.82) brightness(.82)}.lab-visual>span{position:absolute;left:14px;bottom:14px;padding:8px 9px;border:1px solid var(--proto-line-strong);background:rgba(8,11,9,.9);color:#b3b9b4;font:500 9px var(--proto-mono);letter-spacing:.1em}.lab-copy h2{margin:0;font:400 clamp(55px,6vw,88px)/.9 var(--proto-display)}.lab-copy>span{display:block;max-width:530px;margin-top:24px;color:var(--proto-muted);line-height:1.75}.lab-copy>a{display:inline-flex;margin-top:27px;padding-bottom:5px;border-bottom:1px solid var(--proto-brass);color:var(--proto-paper);font-size:12px;text-decoration:none}
	.work-cta{min-height:720px;padding:110px 30px;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;border-top:1px solid var(--proto-line);background:linear-gradient(135deg,#071a14,#0d2d24 52%,#082119)}.work-cta h2{margin:0;font:400 clamp(68px,8.5vw,122px)/.84 var(--proto-display);letter-spacing:-.045em}.work-cta>span{max-width:550px;margin-top:28px;color:#a8b2ab;font-size:15px;line-height:1.7}.work-cta>a{margin-top:37px;padding:14px 16px;display:flex;align-items:center;gap:45px;background:var(--proto-paper);color:var(--proto-bg);font-size:13px;font-weight:600;text-decoration:none;transition:background .2s ease}.work-cta>a:hover{background:var(--proto-brass)}.work-cta>a small{font:500 9px var(--proto-mono);opacity:.65}
	@media(max-width:980px){.work-hero{grid-template-columns:1fr;gap:55px}.hero-context{padding:25px 0 0;border-left:0;border-top:1px solid var(--proto-line)}.cases-heading,.full-cases-heading{grid-template-columns:1fr 1fr}.cases-heading>span,.full-cases-heading>span{grid-column:2}.case-card.lead{grid-template-columns:1fr}.case-visual :global(.work-visual){height:auto;min-height:0;aspect-ratio:1}.case-copy{padding:28px}.case-card.lead .case-copy{padding:35px}.lab{gap:50px}}
	@media(max-width:760px){.shell{width:calc(100% - 24px)}.work-hero{min-height:0;padding:145px 0 80px}.hero-heading h1{font-size:clamp(62px,18vw,90px)}.cases{padding:85px 0 100px}.cases-heading,.full-cases-heading{grid-template-columns:1fr;gap:24px;margin-bottom:45px}.cases-heading>span,.full-cases-heading>span{grid-column:auto}.case-grid{grid-template-columns:1fr}.case-card.lead{grid-column:auto}.case-copy,.case-card.lead .case-copy{padding:24px}.case-copy h3{margin-top:35px}.case-actions{align-items:flex-start;flex-direction:column}.full-cases{padding-top:90px}.lab{padding:90px 0;grid-template-columns:1fr;gap:40px}.work-cta{min-height:600px;padding:90px 20px}.work-cta>a{gap:12px;flex-direction:column}}
</style>
