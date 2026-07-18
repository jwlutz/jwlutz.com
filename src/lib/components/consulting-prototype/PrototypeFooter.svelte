<script lang="ts">
	import ConsultingMark from '$lib/components/ConsultingMark.svelte';
	import { consultingSite } from '$lib/content/consulting-prototype';
	import { track } from '$lib/analytics';

	const year = new Date().getFullYear();
	const email = `mailto:${consultingSite.contactEmail}?subject=${encodeURIComponent(consultingSite.emailSubject)}`;
</script>

<footer class="site-footer">
	<div class="footer-main">
		<a class="footer-brand" href="/consulting#top"><ConsultingMark size={34} /><span><b>{consultingSite.brand}</b><small>Websites, AI integrations, and analytics.</small></span></a>
		<nav aria-label="Footer navigation">
			<p>Explore</p>
			<a href="/consulting#services">Services</a>
			<a href="/consulting#work">Selected work</a>
			<a href="/consulting/work">Case studies</a>
		</nav>
		<div class="footer-contact">
			<p>Start something</p>
			<a href={email} onclick={() => track('email_click', { source: 'consulting_prototype', location: 'footer' })}>{consultingSite.contactEmail}</a>
			<span>A current site, a manual process, or a half-formed idea is enough.</span>
		</div>
	</div>
	<div class="footer-bottom"><span>© {year} Lutz Consulting Group</span><b>Made and maintained by LCG</b><a href="#top">Back to top</a></div>
</footer>

<style>
	.site-footer{padding:0 max(40px,calc((100vw - 1380px)/2));border-top:1px solid var(--proto-line);background:#080b09;color:var(--proto-muted)}
	.footer-main{min-height:270px;padding:65px 0;display:grid;grid-template-columns:1.5fr .55fr .8fr;gap:80px}
	.footer-brand{align-self:start;display:inline-flex;align-items:center;gap:14px;color:var(--proto-text);text-decoration:none}.footer-brand span{display:flex;flex-direction:column;gap:7px}.footer-brand b{font-size:13px;font-weight:600}.footer-brand small{color:#707770;font-size:10px}
	.site-footer nav,.footer-contact{display:flex;flex-direction:column;align-items:flex-start;gap:11px}.site-footer p{margin:0 0 8px;color:#5b625c;font:500 7px var(--proto-mono);letter-spacing:.1em;text-transform:uppercase}.site-footer nav a,.footer-contact a{color:#a3aaa4;font-size:11px;text-decoration:none;transition:color .2s ease}.site-footer nav a:hover,.footer-contact a:hover,.footer-bottom a:hover{color:var(--proto-text)}.footer-contact>a{color:var(--proto-paper)}.footer-contact span{max-width:330px;margin-top:5px;color:#697069;font-size:10px;line-height:1.6}
	.footer-bottom{min-height:68px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;border-top:1px solid var(--proto-line);color:#535a54;font:6px var(--proto-mono);letter-spacing:.08em;text-transform:uppercase}.footer-bottom b{font-weight:500;color:#69706a}.footer-bottom a{justify-self:end;color:#69706a;text-decoration:none;transition:color .2s ease}
	@media(max-width:760px){.site-footer{padding:0 20px}.footer-main{padding:52px 0;grid-template-columns:1fr 1fr;gap:45px 30px}.footer-brand{grid-column:1/-1}.footer-contact span{max-width:240px}.footer-bottom{min-height:105px;grid-template-columns:1fr auto;gap:12px}.footer-bottom b{display:none}.footer-bottom a{justify-self:end}}
</style>
