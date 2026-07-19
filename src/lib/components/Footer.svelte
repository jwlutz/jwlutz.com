<script lang="ts">
	import { profile } from '$lib/content';
	import { track, trackOutbound } from '$lib/analytics';

	const year = new Date().getFullYear();
	const portfolioLinks = [
		{ label: 'Selected work', href: '/#projects' },
		{ label: 'Experience', href: '/#experience' },
		{ label: 'Technical range', href: '/#skills' }
	];
</script>

<footer class="site-footer">
	<div class="footer-shell">
		<div class="footer-lead">
			<a class="footer-brand" href="/#home" aria-label="Jack Lutz portfolio home">
				<span>JL</span>
				<div><b>Jack Lutz</b><small>Software / ML / Data</small></div>
			</a>
			<p>Building useful systems from ambiguous problems.</p>
			<a class="footer-email" href={`mailto:${profile.email}`} onclick={() => track('email_click', { source: 'portfolio_footer' })}>{profile.email}</a>
		</div>

		<div class="footer-directory">
			<nav aria-label="Portfolio links">
				<strong>Portfolio</strong>
				{#each portfolioLinks as link}<a href={link.href}>{link.label}</a>{/each}
			</nav>
			<nav aria-label="Connect links">
				<strong>Connect</strong>
				<a href={profile.social.github} target="_blank" rel="noopener noreferrer" onclick={() => trackOutbound(profile.social.github, 'footer')}>GitHub</a>
				<a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" onclick={() => trackOutbound(profile.social.linkedin, 'footer')}>LinkedIn</a>
				<a href={`mailto:${profile.email}`} onclick={() => track('email_click', { source: 'portfolio_footer_directory' })}>Email</a>
			</nav>
			<nav aria-label="More links">
				<strong>More</strong>
				<a href="/consulting">Consulting</a>
				<a href="/consulting#contact">Start a project</a>
				<a href="/Jack_Lutz_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
			</nav>
		</div>
	</div>

	<div class="footer-utility">
		<span>© {year} Jack Lutz</span>
		<span>Las Vegas / Los Angeles</span>
		<a href="/#home">Back to top</a>
	</div>
</footer>

<style>
	.site-footer { padding: 0 max(24px, calc((100vw - 1320px)/2)); border-top: 1px solid rgba(240,239,233,.11); background: #070a08; color: #7c847d; }
	.footer-shell { min-height: 330px; padding: 68px 0 62px; display: grid; grid-template-columns: minmax(320px, 1.1fr) minmax(470px, .9fr); gap: 90px; align-items: start; }
	.footer-lead { display: flex; flex-direction: column; align-items: flex-start; }
	.footer-brand { display: inline-flex; align-items: center; gap: 13px; color: inherit; text-decoration: none; }
	.footer-brand > span { width: 40px; height: 40px; display: grid; place-items: center; border: 1px solid var(--color-brass); color: var(--color-brass); font: 500 10px var(--font-family-mono); }
	.footer-brand div { display: flex; flex-direction: column; gap: 5px; }
	.footer-brand b { color: var(--color-cream); font-size: 12px; }
	.footer-brand small { color: #69716b; font: 500 8px var(--font-family-mono); letter-spacing: .07em; text-transform: uppercase; }
	.footer-lead > p { max-width: 500px; margin: 38px 0 28px; color: var(--color-paper); font: 400 clamp(26px, 3vw, 42px)/1.03 var(--font-family-display); letter-spacing: -.025em; }
	.footer-email { color: #aab1ab; font-size: 12px; text-underline-offset: 5px; text-decoration-color: rgba(240,239,233,.24); }
	.footer-email:hover { color: var(--color-cream); text-decoration-color: var(--color-brass); }
	.footer-directory { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 34px; }
	nav { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; }
	nav strong { margin-bottom: 9px; color: var(--color-brass); font: 500 8px var(--font-family-mono); letter-spacing: .11em; text-transform: uppercase; }
	nav a { color: #89918a; font-size: 11px; line-height: 1.4; text-decoration: none; transition: color 180ms ease; }
	nav a:hover { color: var(--color-cream); }
	.footer-utility { min-height: 70px; display: grid; grid-template-columns: 1fr 1fr auto; gap: 28px; align-items: center; border-top: 1px solid rgba(240,239,233,.08); font: 500 8px var(--font-family-mono); letter-spacing: .07em; text-transform: uppercase; }
	.footer-utility a { color: #707870; text-decoration: none; }
	.footer-utility a:hover { color: var(--color-cream); }

	@media (max-width: 820px) {
		.footer-shell { padding: 52px 0; grid-template-columns: 1fr; gap: 55px; }
		.footer-directory { max-width: 600px; }
		.footer-utility { min-height: 104px; padding: 20px 0; grid-template-columns: 1fr auto; gap: 12px 24px; }
		.footer-utility > :nth-child(even) { justify-self: end; }
	}

	@media (max-width: 520px) {
		.footer-lead > p { max-width: 340px; font-size: 32px; }
		.footer-directory { grid-template-columns: 1fr 1fr; gap: 44px 28px; }
		.footer-directory nav:last-child { grid-column: 1 / -1; }
	}
</style>
