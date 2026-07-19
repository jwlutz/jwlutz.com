<script lang="ts">
	import { onMount } from 'svelte';
	import { siReplit, siZapier, siN8n, siDatabricks } from 'simple-icons';
	import { consultingSite } from '$lib/content/consulting-prototype';
	import PrototypeSplitView from './PrototypeSplitView.svelte';
	import PrototypeAIDemo from './PrototypeAIDemo.svelte';
	import PrototypeAnalyticsDemo from './PrototypeAnalyticsDemo.svelte';

	let section: HTMLElement;
	let visibleServices = $state([false, false, false]);
	const services = consultingSite.services.items;
	const alternativeBrands = {
		Lovable: { favicon: '/consulting/prototypes/brands/lovable.svg' },
		Base44: { favicon: '/consulting/prototypes/brands/base44.svg' },
		Replit: { icon: siReplit },
		Zapier: { icon: siZapier },
		n8n: { icon: siN8n },
		Gumloop: { favicon: '/consulting/prototypes/brands/gumloop.png' },
		Databricks: { icon: siDatabricks },
		BigML: { favicon: '/consulting/prototypes/brands/bigml.png' },
		'Julius AI': { favicon: '/consulting/prototypes/brands/julius.png' }
	} as const;

	onMount(() => {
		const chapters = [...section.querySelectorAll<HTMLElement>('.service-chapter')];
		const observer = new IntersectionObserver((entries) => {
			const next = [...visibleServices];
			for (const entry of entries) {
				const index = Number((entry.target as HTMLElement).dataset.service ?? 0);
				next[index] = entry.isIntersecting;
			}
			visibleServices = next;
		}, { threshold: .18, rootMargin: '-7% 0px -12%' });
		chapters.forEach((chapter) => observer.observe(chapter));
		return () => observer.disconnect();
	});
</script>

<section class="operating-loop" id="services" bind:this={section}>
	<header class="services-intro shell" data-motion-section>
		<h2 data-motion-item>{consultingSite.services.title}</h2>
	</header>

	<div class="service-stack shell">
		{#each services as service, index}
			<article class={`service-chapter service-${index + 1}`} data-service={index} data-motion-section>
				<div class="service-layout">
					<div class="service-copy">
						<header data-motion-item>
							<h3>{service.title}</h3>
						</header>

						<div class="service-summary" data-motion-item>
						<p>{service.body}</p>
						</div>

						<div class="feature-list">
							{#each service.features as feature}
								<div data-motion-item>
									<strong>{feature.title}</strong><p>{feature.body}</p>
								</div>
							{/each}
						</div>

						<div class="alternative-row" data-motion-item>
							<small>{service.alternativeLabel}</small>
							<div>
								{#each service.alternatives as alternative}
									{@const brand = alternativeBrands[alternative]}
									<span role="img" title={alternative} aria-label={alternative}>{#if 'icon' in brand}<i>{@html brand.icon.svg}</i>{:else}<img src={brand.favicon} alt="" />{/if}</span>
								{/each}
							</div>
						</div>
					</div>

					<div class="service-demo" data-motion-item>
						{#if index === 0}
							<PrototypeSplitView embedded />
						{:else if index === 1}
							<PrototypeAIDemo playing={visibleServices[index]} />
						{:else}
							<PrototypeAnalyticsDemo playing={visibleServices[index]} />
						{/if}
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>

<style>
	.operating-loop {
		padding: clamp(110px, 10vw, 160px) 0 140px;
		background: linear-gradient(180deg, #080b09, #0b0f0c 16%, #0b0f0c 88%, #080b09);
		scroll-margin-top: 84px;
	}
	.shell { width: min(1380px, calc(100% - 80px)); margin: 0 auto; }
	.eyebrow { margin: 0; color: var(--proto-brass); font: 500 9px var(--proto-mono); letter-spacing: .14em; }
	.services-intro {
		display: grid;
		grid-template-columns: 1fr;
		gap: 48px;
		align-items: center;
		text-align: center;
		margin-bottom: clamp(100px, 10vw, 150px);
	}
	.services-intro h2 { margin: 0; font: 400 clamp(62px, 6.6vw, 100px)/.87 var(--proto-display); letter-spacing: -.045em; }
	.services-intro > p:last-child { margin: 0; color: var(--proto-muted); font-size: 16.5px; line-height: 1.72; }
	.service-stack { border-bottom: 1px solid var(--proto-line); }
	.service-chapter {
		--chapter-accent: #6f9f8c;
		position: relative;
		padding: clamp(82px, 7vw, 112px) 0 clamp(96px, 8vw, 124px);
		border-top: 1px solid color-mix(in srgb, var(--chapter-accent) 46%, var(--proto-line));
		background: radial-gradient(circle at 80% 18%, color-mix(in srgb, var(--chapter-accent) 8%, transparent), transparent 34%);
		content-visibility: auto;
		contain-intrinsic-size: 780px;
	}
	.service-2 { --chapter-accent: #b49a67; }
	.service-3 { --chapter-accent: #a8735f; }
	.service-layout { display: grid; grid-template-columns: minmax(300px, .72fr) minmax(0, 1.28fr); gap: clamp(52px, 6vw, 88px); align-items: center; }
	.service-copy { position: relative; padding-left: 34px; }
	.service-copy::before { content: ''; position: absolute; inset: 0 auto 0 0; width: 1px; background: var(--proto-line-strong); }
	.service-copy::after { content: ''; position: absolute; left: -6px; top: 2px; width: 13px; height: 1px; background: var(--chapter-accent); }
	.service-label { margin: 0 0 28px; display: flex; align-items: center; color: var(--chapter-accent); font: 500 9px var(--proto-mono); letter-spacing: .1em; text-transform: uppercase; }
	.service-copy h3 { max-width: 560px; margin: 0; font: 400 clamp(48px, 4.35vw, 68px)/.92 var(--proto-display); letter-spacing: -.04em; text-wrap: balance; }
	.service-copy h3 em { color: var(--proto-paper); font-weight: 400; font-style: normal; }
	.service-summary { margin-top: 30px; }
	.service-summary > p { max-width: 520px; margin: 0; color: #bcc0bb; font-size: 16.5px; line-height: 1.7; }
	.feature-list { margin-top: 42px; border-top: 1px solid var(--proto-line); }
	.feature-list > div { padding: 18px 0; border-bottom: 1px solid var(--proto-line); }
	.feature-list strong { display: block; color: #e9e9e3; font-size: 14.5px; font-weight: 500; }
	.feature-list p { max-width: 450px; margin: 8px 0 0; color: #989e98; font-size: 12.5px; line-height: 1.62; }
	.service-demo { min-width: 0; position: relative; contain: layout paint; }
	.alternative-row { min-height: 58px; padding-top: 22px; display: flex; align-items: center; justify-content: space-between; gap: 22px; color: #7f8781; }
	.alternative-row > small { font: 500 9px var(--proto-mono); letter-spacing: .08em; text-transform: uppercase; }
	.alternative-row > div { display: flex; align-items: center; gap: 18px; }
	.alternative-row span { width: 25px; height: 25px; display: grid; place-items: center; color: #8d948f; filter: grayscale(1); opacity: .64; transition: color .25s ease, filter .25s ease, opacity .25s ease, transform .25s ease; }
	.alternative-row span:hover { color: var(--chapter-accent); filter: none; opacity: 1; transform: translateY(-2px); }
	.alternative-row span i { width: 21px; height: 21px; display: grid; }
	.alternative-row span i :global(svg) { width: 100%; height: 100%; fill: currentColor; }
	.alternative-row img { width: 22px; height: 22px; object-fit: contain; }
	.tool-note { position: relative; max-width: 650px; margin-top: 34px; margin-right: max(40px, calc((100% - 1380px) / 2)); padding-left: 22px; color: #788079; font-size: 11px; line-height: 1.7; text-align: left; }
	.tool-note i { position: absolute; left: 0; top: 9px; width: 9px; height: 1px; background: var(--proto-brass); }

	@media (max-width: 1050px) {
		.services-intro { grid-template-columns: 1fr; }
		.service-layout { grid-template-columns: 1fr; gap: 52px; }
		.service-copy { max-width: 720px; }
		.service-copy h3 { max-width: 680px; }
		.service-summary > p { max-width: 620px; }
	}
	@media (max-width: 650px) {
		.operating-loop { padding: 88px 0 104px; }
		.shell { width: calc(100% - 32px); }
		.services-intro { grid-template-columns: 1fr; gap: 22px; margin-bottom: 78px; }
		.services-intro > p:last-child { grid-column: auto; font-size: 14px; }
		.services-intro h2 { font-size: clamp(52px, 15vw, 68px); }
		.service-chapter { padding: 62px 0 78px; background: none; contain-intrinsic-size: 1050px; }
		.service-layout { gap: 38px; }
		.service-copy { padding-left: 22px; }
		.service-copy::before { bottom: auto; height: 62px; }
		.service-copy::after { left: -5px; width: 11px; }
		.service-label { margin-bottom: 22px; font-size: 9px; }
		.service-copy h3 { font-size: clamp(45px, 12.5vw, 58px); }
		.service-summary { margin-top: 24px; }
		.service-summary > p { font-size: 14px; }
		.feature-list { margin-top: 34px; }
		.feature-list > div { padding: 16px 0; }
		.alternative-row { padding-top: 20px; align-items: flex-start; flex-direction: column; gap: 15px; }
		.tool-note { margin: 28px 16px 0; font-size: 11px; }
	}
</style>
