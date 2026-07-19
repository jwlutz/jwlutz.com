<script lang="ts">
	const year = new Date().getFullYear();
</script>

<footer>
	<div class="footer-main">
		<div class="footer-brand"><span>JL</span><div><b>Jack Lutz</b><small>Software / ML / Data</small></div></div>
		<p>Building systems, models, and products from first principles.</p>
		<nav aria-label="Footer navigation"><a href="#home">Top</a><a href="#projects">Work</a><a href="/consulting">Consulting</a></nav>
	</div>
	<div class="footer-bottom"><span>© {year} Jack Lutz</span><span>Built with SvelteKit</span><span>Las Vegas, NV</span></div>
</footer>

<style>
	footer { padding: 0 max(24px, calc((100vw - 1320px)/2)); border-top: 1px solid var(--color-border); background: var(--color-ink); color: #7c847d; }
	.footer-main { min-height: 210px; padding: 48px 0; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 50px; align-items: start; }
	.footer-brand { display: flex; align-items: center; gap: 13px; }
	.footer-brand > span { width: 38px; height: 38px; display: grid; place-items: center; border: 1px solid var(--color-brass); color: var(--color-brass); font: 500 10px var(--font-family-mono); }
	.footer-brand div { display: flex; flex-direction: column; gap: 5px; }
	.footer-brand b { color: var(--color-cream); font-size: 12px; }
	.footer-brand small { font: 500 8px var(--font-family-mono); letter-spacing: .06em; text-transform: uppercase; }
	.footer-main > p { max-width: 360px; margin: 0; color: var(--color-paper); font: 400 20px/1.4 var(--font-family-display); }
	nav { justify-self: end; display: flex; flex-direction: column; gap: 10px; }
	nav a { color: #8a918b; font-size: 11px; text-decoration: none; }
	nav a:hover { color: var(--color-cream); }
	.footer-bottom { min-height: 66px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; border-top: 1px solid rgba(240,239,233,.08); font: 500 8px var(--font-family-mono); letter-spacing: .08em; text-transform: uppercase; }
	.footer-bottom span:last-child { justify-self: end; }

	@media (max-width: 700px) {
		.footer-main { grid-template-columns: 1fr; gap: 30px; }
		nav { justify-self: start; flex-direction: row; }
		.footer-bottom { grid-template-columns: 1fr auto; }
		.footer-bottom span:nth-child(2) { display: none; }
	}
</style>
