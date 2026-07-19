<script lang="ts">
	import type { Profile } from '$lib/types';
	import { track, trackOutbound } from '$lib/analytics';
	let { profile }: { profile: Profile } = $props();
</script>

<section id="contact" class="contact-section">
	<div class="contact-shell">
		<div class="contact-label"><span>Contact</span><i></i><span>Las Vegas / Los Angeles</span></div>
		<div class="contact-grid">
			<div><p>Have a difficult problem or an ambitious build?</p><h2>Let’s make it <em>work.</em></h2></div>
			<div class="contact-actions">
				<p>I’m always interested in software, applied ML, data, and thoughtful product work.</p>
				<a class="email-link" href="mailto:{profile.email}" onclick={() => track('email_click', { source: 'portfolio' })}>Start a conversation</a>
				<nav aria-label="Social links">
					<a href={profile.social.github} target="_blank" rel="noopener noreferrer" onclick={() => trackOutbound(profile.social.github, 'contact')}>GitHub</a>
					<a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" onclick={() => trackOutbound(profile.social.linkedin, 'contact')}>LinkedIn</a>
					<a href="/Jack_Lutz_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
				</nav>
			</div>
		</div>
	</div>
</section>

<style>
	.contact-section { min-height: 720px; padding: 110px 0; display: flex; align-items: center; color: var(--color-cream); background: linear-gradient(135deg, #071a14, #0d2d24 52%, #082119); border-top: 1px solid rgba(240,239,233,.12); }
	.contact-shell { width: min(1320px, calc(100% - 80px)); margin: 0 auto; }
	.contact-label { display: grid; grid-template-columns: auto 1fr auto; gap: 15px; align-items: center; color: #8c968f; font: 500 9px var(--font-family-mono); letter-spacing: .1em; text-transform: uppercase; }
	.contact-label i { height: 1px; background: rgba(240,239,233,.14); }
	.contact-grid { margin-top: 85px; display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(300px, .75fr); gap: 90px; align-items: end; }
	.contact-grid > div:first-child > p { margin: 0 0 22px; color: var(--color-brass); font: 500 9px var(--font-family-mono); letter-spacing: .1em; text-transform: uppercase; }
	h2 { max-width: 820px; margin: 0; font: 400 clamp(76px, 9vw, 138px)/.79 var(--font-family-display); letter-spacing: -.05em; }
	h2 em { color: var(--color-paper); font-weight: 400; }
	.contact-actions > p { max-width: 390px; margin: 0; color: #a8b2ab; font-size: 14px; line-height: 1.7; }
	.email-link { margin-top: 28px; min-height: 48px; padding: 0 18px; display: inline-flex; align-items: center; background: var(--color-paper); color: var(--color-ink); font-size: 12px; font-weight: 650; text-decoration: none; transition: background 180ms ease; }
	.email-link:hover { background: var(--color-brass); }
	nav { margin-top: 36px; padding-top: 18px; display: flex; gap: 22px; border-top: 1px solid rgba(240,239,233,.12); }
	nav a { color: #879089; font: 500 9px var(--font-family-mono); letter-spacing: .08em; text-transform: uppercase; text-decoration: none; }
	nav a:hover { color: var(--color-cream); }

	@media (max-width: 800px) {
		.contact-section { min-height: 620px; padding: 80px 0; }
		.contact-shell { width: calc(100% - 32px); }
		.contact-label span:last-child { display: none; }
		.contact-label { grid-template-columns: auto 1fr; }
		.contact-grid { margin-top: 58px; grid-template-columns: 1fr; gap: 50px; }
		h2 { font-size: 76px; }
	}
</style>
