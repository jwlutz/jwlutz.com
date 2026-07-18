<script lang="ts">
	import { onMount } from 'svelte';
	import { siGoogleanalytics, siMake, siReplit, siZapier } from 'simple-icons';
	import { consultingSite } from '$lib/content/consulting-prototype';
	import PrototypeWebDemo from './PrototypeWebDemo.svelte';
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
		Make: { icon: siMake },
		Gumloop: { favicon: '/consulting/prototypes/brands/gumloop.png' },
		'Google Analytics': { icon: siGoogleanalytics },
		Tableau: { favicon: '/consulting/prototypes/brands/tableau.ico' },
		'Power BI': { favicon: '/consulting/prototypes/brands/powerbi.ico' }
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
		<p class="eyebrow" data-motion-item>{consultingSite.services.eyebrow}</p>
		<h2 data-motion-item>{consultingSite.services.title}</h2>
		<p data-motion-item>{consultingSite.services.body}</p>
	</header>

	<div class="service-stack shell">
		{#each services as service, index}
			<article class={`service-chapter service-${index + 1}`} data-service={index} data-motion-section>
				<header class="service-head">
					<div data-motion-item>
						<p class="service-label"><small>0{index + 1}</small>{service.title}</p>
						<h3>{service.headline}</h3>
					</div>
					<div class="service-summary" data-motion-item>
						<p>{service.body}</p>
						<small>{service.detail}</small>
					</div>
				</header>

				<div class="service-demo">
					{#if index === 0}
						<PrototypeWebDemo playing={visibleServices[index]} />
					{:else if index === 1}
						<PrototypeAIDemo playing={visibleServices[index]} />
					{:else}
						<PrototypeAnalyticsDemo playing={visibleServices[index]} />
					{/if}
				</div>

				<div class="feature-grid">
					{#each service.features as feature, featureIndex}
						<div data-motion-item><small>0{featureIndex + 1}</small><strong>{feature.title}</strong><p>{feature.body}</p></div>
					{/each}
				</div>

				<div class="alternative-row">
					<small>{service.alternativeLabel}</small>
					<div>
						{#each service.alternatives as alternative}
							{@const brand = alternativeBrands[alternative]}
							<span title={alternative} aria-label={alternative}>{#if 'icon' in brand}<i>{@html brand.icon.svg}</i>{:else}<img src={brand.favicon} alt="" />{/if}</span>
						{/each}
					</div>
				</div>
			</article>
		{/each}
	</div>

	<p class="tool-note shell"><i></i>{consultingSite.services.toolNote}</p>
</section>

<style>
	.operating-loop{padding:clamp(115px,11vw,175px) 0 145px;background:linear-gradient(180deg,#080b09,#0a0d0b 18%,#0a0d0b 88%,#080b09);scroll-margin-top:84px}.shell{width:min(1380px,calc(100% - 80px));margin:0 auto}.eyebrow{margin:0;color:#45a77f;font:500 9px var(--proto-mono);letter-spacing:.14em}.services-intro{display:grid;grid-template-columns:.72fr 1.18fr .8fr;gap:48px;align-items:end;margin-bottom:145px}.services-intro h2{margin:0;font:400 clamp(62px,6.6vw,100px)/.87 var(--proto-display);letter-spacing:-.045em}.services-intro>p:last-child{margin:0;color:var(--proto-muted);font-size:16px;line-height:1.75}.service-stack{counter-reset:service}.service-chapter{--chapter-accent:#45a77f;position:relative;margin-bottom:150px;padding-top:1px;border-top:1px solid color-mix(in srgb,var(--chapter-accent) 48%,rgba(240,239,233,.15));background:radial-gradient(circle at 86% 3%,color-mix(in srgb,var(--chapter-accent) 11%,transparent),transparent 27%)}.service-2{--chapter-accent:#9a7dcc}.service-3{--chapter-accent:#b49a67}.service-head{padding:72px 24px 58px;display:grid;grid-template-columns:minmax(0,1.25fr) minmax(300px,.75fr);gap:90px;align-items:end}.service-label{width:max-content;margin:0 0 30px;padding:8px 10px;display:flex;align-items:center;gap:9px;border:1px solid color-mix(in srgb,var(--chapter-accent) 26%,transparent);color:var(--chapter-accent);background:color-mix(in srgb,var(--chapter-accent) 6%,transparent);font:500 8px var(--proto-mono);letter-spacing:.09em;text-transform:uppercase}.service-label small{padding-right:9px;border-right:1px solid currentColor;font:inherit;opacity:.55}.service-head h3{max-width:870px;margin:0;font:400 clamp(58px,6.4vw,94px)/.87 var(--proto-display);letter-spacing:-.045em;text-wrap:balance}.service-summary{max-width:560px;justify-self:end}.service-summary>p{margin:0;color:#b2b7b2;font-size:17px;line-height:1.72}.service-summary>small{display:block;margin-top:26px;color:var(--chapter-accent);font:500 7px/1.65 var(--proto-mono);letter-spacing:.09em}.service-demo{position:relative}.feature-grid{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid rgba(240,239,233,.1);border-top:0;background:rgba(9,12,10,.32)}.feature-grid>div{min-height:230px;padding:37px 34px;border-right:1px solid rgba(240,239,233,.09)}.feature-grid>div:last-child{border-right:0}.feature-grid small{color:var(--chapter-accent);font:7px var(--proto-mono)}.feature-grid strong{display:block;margin:50px 0 12px;color:#e4e4de;font-size:15px}.feature-grid p{max-width:340px;margin:0;color:#858d87;font-size:12px;line-height:1.68}.alternative-row{min-height:105px;padding:0 34px;display:flex;align-items:center;gap:28px;border:1px solid rgba(240,239,233,.1);border-top:0;color:#8b938d}.alternative-row>small{font:500 8px var(--proto-mono);letter-spacing:.09em;text-transform:uppercase}.alternative-row>div{display:flex;align-items:center;gap:24px}.alternative-row span{width:29px;height:29px;display:grid;place-items:center;color:#8d948f;filter:grayscale(1);opacity:.68;transition:color .25s ease,filter .25s ease,opacity .25s ease,transform .25s ease}.alternative-row span:hover{color:var(--chapter-accent);filter:none;opacity:1;transform:translateY(-2px)}.alternative-row span i{width:23px;height:23px;display:grid}.alternative-row span i :global(svg){width:100%;height:100%;fill:currentColor}.alternative-row img{width:24px;height:24px;object-fit:contain}.tool-note{position:relative;max-width:760px;margin-top:-80px;padding-left:24px;color:#828a83;font-size:12px;line-height:1.7}.tool-note i{position:absolute;left:0;top:10px;width:9px;height:1px;background:var(--proto-brass)}
	@media(max-width:950px){.services-intro{grid-template-columns:1fr 1fr}.services-intro>p:last-child{grid-column:2}.service-head{grid-template-columns:1fr;gap:32px}.service-summary{max-width:720px;justify-self:start}.feature-grid>div{padding:30px 24px}.service-chapter{margin-bottom:115px}}
	@media(max-width:650px){.operating-loop{padding:90px 0 105px}.shell{width:calc(100% - 24px)}.services-intro{grid-template-columns:1fr;gap:24px;margin-bottom:95px}.services-intro>p:last-child{grid-column:auto;font-size:14px}.services-intro h2{font-size:clamp(54px,15vw,72px)}.service-chapter{margin-bottom:95px;background:radial-gradient(circle at 90% 2%,color-mix(in srgb,var(--chapter-accent) 9%,transparent),transparent 20%)}.service-head{padding:52px 10px 36px;gap:25px}.service-label{margin-bottom:21px;font-size:7px}.service-head h3{font-size:clamp(47px,13vw,64px)}.service-summary>p{font-size:14px}.service-summary>small{font-size:6px}.feature-grid{grid-template-columns:1fr}.feature-grid>div{min-height:180px;border-right:0;border-bottom:1px solid rgba(240,239,233,.09)}.feature-grid>div:last-child{border-bottom:0}.feature-grid strong{margin:30px 0 10px}.alternative-row{min-height:0;padding:28px 22px 34px;align-items:flex-start;flex-direction:column;gap:17px}.tool-note{margin-top:-45px;font-size:11px}}
</style>
