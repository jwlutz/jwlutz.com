<script lang="ts">
	import type { PrototypeCase } from '$lib/content/consulting-prototype';

	let { project, stage = 3 }: { project: PrototypeCase; stage?: number } = $props();
	let liveHost = $derived(new URL(project.liveUrl).hostname.replace(/^www\./, ''));
	let boundedStage = $derived(Math.max(0, Math.min(stage, 3)));
</script>

<div class={`case-artifact ${project.slug} stage-${boundedStage}`}>
	<div class="capture-window">
		<div class="window-bar">
			<span class="window-ticks" aria-hidden="true"><i></i><i></i><i></i></span>
			<small>{liveHost}</small>
			<b>LIVE CAPTURE</b>
		</div>
		<img class="capture" src={project.capture} alt={project.captureAlt} loading="lazy" decoding="async" />
	</div>

	{#if project.productImages?.length}
	<div class="product-proof" role="group" aria-label="Product imagery from The Sparkling Shoe">
			<div>
				{#each project.productImages as image}<img src={image.src} alt={image.alt} loading="lazy" decoding="async" />{/each}
			</div>
			<small>LANDING PAGE + PRODUCT SYSTEM</small>
		</div>
	{/if}

	<div class="artifact-note"><small>CASE {project.index}</small><span>Real shipped interface</span></div>
</div>

<style>
	.case-artifact{position:relative;aspect-ratio:16/10;overflow:hidden;border:1px solid var(--proto-line-strong);background:linear-gradient(145deg,#081d16,#0d100e 67%);contain:layout paint;isolation:isolate}
	.case-artifact::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent 49.9%,rgba(240,239,233,.045) 50%,transparent 50.1%),linear-gradient(transparent 49.9%,rgba(240,239,233,.04) 50%,transparent 50.1%);background-size:90px 90px;opacity:.38}
	.capture-window{position:absolute;z-index:1;inset:6% 5% 9%;overflow:hidden;border:1px solid rgba(240,239,233,.24);background:#0b0d0c;box-shadow:0 22px 55px rgba(0,0,0,.42);transform-origin:center;transition:transform .7s cubic-bezier(.2,.75,.2,1),clip-path .7s cubic-bezier(.2,.75,.2,1)}
	.window-bar{height:31px;padding:0 10px;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:10px;border-bottom:1px solid rgba(240,239,233,.12);color:#8d948e;background:#101411;font:500 9px var(--proto-mono);letter-spacing:.07em}
	.window-bar small{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font:inherit}.window-bar b{color:#666d67;font:inherit;font-weight:500}
	.window-ticks{display:flex;gap:4px}.window-ticks i{display:block;width:6px;height:1px;background:#777e78}
	.capture{display:block;width:100%;height:calc(100% - 31px);object-fit:cover;object-position:top center;transition:transform .8s cubic-bezier(.2,.75,.2,1),filter .5s ease}
	.stage-1 .capture-window{transform:scale(1.025) translate(-.5%,.2%)}
	.stage-2 .capture-window{transform:scale(1.045) translate(.6%,-.4%)}
	.stage-3 .capture-window{transform:scale(1.015)}
	.sparkling .capture-window{background:#f4e8ec}.sparkling .capture{filter:saturate(.92)}
	.product-proof{position:absolute;z-index:3;right:2.5%;bottom:3%;width:35%;padding:7px;border:1px solid rgba(240,239,233,.34);background:#ece7de;box-shadow:0 18px 42px rgba(0,0,0,.35);opacity:0;transform:translate(12px,16px);transition:opacity .55s ease,transform .7s cubic-bezier(.2,.75,.2,1)}
	.product-proof>div{display:grid;grid-template-columns:1.2fr .8fr;grid-template-rows:1fr 1fr;gap:5px;aspect-ratio:1.45}.product-proof img{width:100%;height:100%;object-fit:cover}.product-proof img:first-child{grid-row:1/3}.product-proof small{display:block;padding:7px 2px 1px;color:#514c43;font:600 8px var(--proto-mono);letter-spacing:.08em}
	.stage-2 .product-proof,.stage-3 .product-proof{opacity:1;transform:translate(0,0)}
	.artifact-note{position:absolute;z-index:4;left:0;bottom:0;height:31px;padding:0 10px;display:flex;align-items:center;gap:12px;border-top:1px solid var(--proto-line-strong);border-right:1px solid var(--proto-line-strong);color:#939b94;background:#0a0e0b;font:500 9px var(--proto-mono);letter-spacing:.06em}.artifact-note small{color:var(--proto-brass);font:inherit}
	@media(max-width:560px){.capture-window{inset:5% 3% 8%}.window-bar{font-size:9px}.window-bar b{display:none}.product-proof{width:39%}.product-proof small{font-size:9px}.artifact-note{font-size:9px}}
	@media(prefers-reduced-motion:reduce){.capture-window,.capture,.product-proof{transition:none}}
</style>
