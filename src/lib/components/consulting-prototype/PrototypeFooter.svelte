<script lang="ts">
	import ConsultingMark from '$lib/components/ConsultingMark.svelte';
	import { consultingSite, footerCopy } from '$lib/content/consulting-prototype';
	import { track } from '$lib/analytics';

	const year = new Date().getFullYear();
	const email = `mailto:${consultingSite.contactEmail}?subject=${encodeURIComponent(consultingSite.emailSubject)}`;
</script>

<footer class="site-footer">
	<div class="footer-main">
		<div class="footer-lead"><a class="footer-brand" href="/consulting#top"><ConsultingMark size={42} /><span><b>{consultingSite.brand}</b><small>{footerCopy.brandTagline}</small></span></a><p class="footer-line">{footerCopy.line.lead} <em>{footerCopy.line.emphasis}</em></p></div>
		<nav aria-label="Footer navigation">
			<p>{footerCopy.exploreLabel}</p>
			{#each footerCopy.explore as link}<a href={link.href}>{link.label}</a>{/each}
		</nav>
		<div class="footer-contact">
			<p>{footerCopy.contactLabel}</p>
			<a href={email} onclick={() => track('email_click', { source: 'consulting_prototype', location: 'footer' })}>{consultingSite.finalCta.emailLabel}</a>
			<span>{footerCopy.contactNote}</span>
		</div>
	</div>
	<div class="footer-bottom"><span>© {year} {footerCopy.copyrightName}</span><span class="footer-legal"><a href="/privacy">Privacy</a><a href="/terms">Terms</a></span><b>{footerCopy.madeBy}</b><a class="to-top" href="#top">{footerCopy.backToTop}</a></div>
</footer>

<style>
	.site-footer{padding:0 max(40px,calc((100vw - 1380px)/2));border-top:1px solid var(--proto-line);background:#080b09;color:var(--proto-muted)}
	.footer-main{min-height:270px;padding:65px 0;display:grid;grid-template-columns:1.2fr .55fr .75fr;gap:60px}
	.footer-lead{display:flex;flex-direction:column;gap:26px;align-self:start}
	.footer-line{max-width:340px;margin:0;color:var(--proto-paper);font:400 19px/1.4 var(--proto-display);letter-spacing:.005em;text-wrap:balance}.footer-line em{color:#8d8571;font-style:italic}
	.footer-brand{align-self:start;display:inline-flex;align-items:center;gap:14px;color:var(--proto-text);text-decoration:none}.footer-brand span{display:flex;flex-direction:column;gap:7px}.footer-brand b{font-size:13px;font-weight:600}.footer-brand small{color:#707770;font-size:10px}
	.site-footer nav,.footer-contact{display:flex;flex-direction:column;align-items:flex-start;gap:11px}.site-footer nav p,.footer-contact p{margin:0 0 8px;color:var(--proto-brass);font:500 9px var(--proto-mono);letter-spacing:.1em;text-transform:uppercase}.site-footer nav a,.footer-contact a{color:#a3aaa4;font-size:11px;text-decoration:none;transition:color .2s ease}.site-footer nav a:hover,.footer-contact a:hover,.footer-bottom a:hover{color:var(--proto-text)}.site-footer nav a:focus-visible,.footer-contact a:focus-visible,.footer-bottom a:focus-visible,.footer-brand:focus-visible{outline:2px solid var(--proto-brass);outline-offset:4px}.footer-contact>a{color:var(--proto-paper)}.footer-contact span{max-width:330px;margin-top:5px;color:#777e77;font-size:10px;line-height:1.6}
	.footer-bottom{min-height:68px;display:flex;flex-wrap:wrap;align-items:center;gap:12px 22px;border-top:1px solid var(--proto-line);color:#656c66;font:9px var(--proto-mono);letter-spacing:.08em;text-transform:uppercase}.footer-bottom b{font-weight:500;color:#9c8a68}.footer-legal{display:flex;gap:16px}.footer-bottom a{color:#747b75;text-decoration:none;transition:color .2s ease}.footer-bottom .to-top{margin-left:auto}
	@media(max-width:760px){.site-footer{padding:0 20px}.footer-main{padding:52px 0;grid-template-columns:1fr 1fr;gap:45px 30px}.footer-lead{grid-column:1/-1}.footer-line{font-size:16px}.footer-contact span{max-width:240px}.footer-bottom{min-height:auto;padding:20px 0;gap:12px 18px}.footer-bottom b{display:none}}
</style>
