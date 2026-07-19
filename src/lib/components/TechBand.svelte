<script lang="ts">
	import type { Skills as SkillsType } from '$lib/types';
	import LogoDevMark from './LogoDevMark.svelte';

	type LogoItem = {
		tech: string;
		label: string;
		domain: string;
		group: string;
	};

	let { skills }: { skills: SkillsType } = $props();

	const brandLogos: LogoItem[] = [
		{ tech: 'Python', label: 'Python', domain: 'python.org', group: 'Language' },
		{ tech: 'TypeScript', label: 'TypeScript', domain: 'typescriptlang.org', group: 'Language' },
		{ tech: 'JavaScript', label: 'JavaScript', domain: 'javascript.com', group: 'Language' },
		{ tech: 'R', label: 'R', domain: 'r-project.org', group: 'Language' },
		{ tech: 'Svelte', label: 'Svelte', domain: 'svelte.dev', group: 'Interface' },
		{ tech: 'React', label: 'React', domain: 'react.dev', group: 'Interface' },
		{ tech: 'PyTorch', label: 'PyTorch', domain: 'pytorch.org', group: 'ML' },
		{ tech: 'Hugging Face', label: 'Hugging Face', domain: 'huggingface.co', group: 'ML' },
		{ tech: 'NumPy', label: 'NumPy', domain: 'numpy.org', group: 'Data' },
		{ tech: 'pandas', label: 'pandas', domain: 'pandas.pydata.org', group: 'Data' },
		{ tech: 'FastAPI', label: 'FastAPI', domain: 'fastapi.tiangolo.com', group: 'Backend' },
		{ tech: 'PostgreSQL', label: 'PostgreSQL', domain: 'postgresql.org', group: 'Data' },
		{ tech: 'Docker', label: 'Docker', domain: 'docker.com', group: 'Infrastructure' },
		{ tech: 'AWS', label: 'AWS', domain: 'aws.amazon.com', group: 'Infrastructure' },
		{ tech: 'Supabase', label: 'Supabase', domain: 'supabase.com', group: 'Infrastructure' },
		{ tech: 'Redis', label: 'Redis', domain: 'redis.io', group: 'Infrastructure' },
		{ tech: 'Git', label: 'GitHub', domain: 'github.com', group: 'Workflow' },
		{ tech: 'Claude Code', label: 'Claude', domain: 'anthropic.com', group: 'AI tooling' },
		{ tech: 'Streamlit', label: 'Streamlit', domain: 'streamlit.io', group: 'Product' },
		{ tech: 'Linux', label: 'Linux', domain: 'linux.org', group: 'Systems' }
	];

	const available = $derived(new Set([...skills.languages, ...skills.technologies]));
	const logoItems = $derived(brandLogos.filter((item) => available.has(item.tech)));
	const methodItems = $derived(skills.coursework.slice(0, 6));
</script>

<section id="skills" class="tech-band">
	<div class="band-intro">
		<div>
			<p class="section-label">Technical range</p>
			<h2>From first model to production.</h2>
		</div>
		<p>I choose the stack around the problem, then stay with it through deployment, iteration, and maintenance.</p>
	</div>

	<div class="logo-runway" aria-label="Technology toolkit">
		<div class="logo-track">
			{#each [0, 1] as copy}
				<div class="logo-set" class:duplicate={copy === 1} aria-hidden={copy === 1}>
					{#each logoItems as item}
						<div class="logo-item">
							<LogoDevMark tech={item.tech} domain={item.domain} label={item.label} />
							<span><strong>{item.label}</strong><small>{item.group}</small></span>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>

	<div class="band-index">
		<strong>Methods underneath</strong>
		<div>{#each methodItems as method}<span>{method}</span>{/each}</div>
	</div>
</section>

<style>
	.tech-band {
		--band-line: rgba(240, 239, 233, .13);
		position: relative;
		overflow: hidden;
		border-top: 1px solid var(--band-line);
		border-bottom: 1px solid var(--band-line);
		background: #0a100d;
		color: var(--color-cream);
		contain: layout paint;
	}

	.band-intro,
	.band-index {
		width: min(1320px, calc(100% - 80px));
		margin: 0 auto;
	}

	.band-intro {
		min-height: 210px;
		padding: 45px 0 38px;
		display: grid;
		grid-template-columns: minmax(0, 1.25fr) minmax(280px, .75fr);
		align-items: end;
		gap: 80px;
	}

	.band-intro h2 {
		max-width: 780px;
		margin: 18px 0 0;
		font: 400 clamp(48px, 5.6vw, 82px)/.87 var(--font-family-display);
		letter-spacing: -.045em;
	}

	.band-intro > p {
		max-width: 430px;
		margin: 0 0 8px;
		color: #9ba39d;
		font-size: 13px;
		line-height: 1.7;
	}

	.logo-runway {
		position: relative;
		overflow: hidden;
		border-top: 1px solid var(--band-line);
		border-bottom: 1px solid var(--band-line);
		background: #0d1511;
	}

	.logo-runway::before,
	.logo-runway::after {
		content: '';
		position: absolute;
		z-index: 3;
		top: 0;
		bottom: 0;
		width: min(9vw, 120px);
		pointer-events: none;
	}

	.logo-runway::before { left: 0; background: linear-gradient(90deg, #0d1511, transparent); }
	.logo-runway::after { right: 0; background: linear-gradient(270deg, #0d1511, transparent); }

	.logo-track {
		width: max-content;
		display: flex;
		animation: logo-flow 58s linear infinite;
		will-change: transform;
	}

	.logo-runway:hover .logo-track { animation-play-state: paused; }

	.logo-set { display: flex; flex: 0 0 auto; }

	.logo-item {
		width: 168px;
		height: 104px;
		padding: 0 22px;
		display: flex;
		align-items: center;
		gap: 14px;
		border-right: 1px solid var(--band-line);
		background: transparent;
		transition: background 180ms ease, transform 220ms cubic-bezier(.2,.75,.2,1);
	}

	.logo-item:hover {
		z-index: 2;
		background: #15201b;
		outline: 0;
		transform: scale(1.045);
	}

	.logo-item > span { min-width: 0; display: flex; flex-direction: column; gap: 6px; }
	.logo-item strong { overflow: hidden; color: #e4e1d9; font-size: 11px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
	.logo-item small { color: #6f7872; font: 500 7px var(--font-family-mono); letter-spacing: .07em; text-transform: uppercase; }

	.band-index {
		min-height: 72px;
		padding: 17px 0;
		display: grid;
		grid-template-columns: 180px minmax(0, 1fr);
		align-items: center;
		gap: 30px;
	}

	.band-index strong { color: var(--color-brass); font: 500 8px var(--font-family-mono); letter-spacing: .1em; text-transform: uppercase; }
	.band-index > div { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 7px 20px; }
	.band-index span { color: #747d77; font-size: 8px; line-height: 1.4; }

	@keyframes logo-flow { to { transform: translate3d(-50%, 0, 0); } }

	@media (max-width: 700px) {
		.band-intro,
		.band-index { width: calc(100% - 32px); }
		.band-intro { min-height: 0; padding: 42px 0 34px; grid-template-columns: 1fr; gap: 24px; }
		.band-intro h2 { font-size: 52px; }
		.band-intro > p { font-size: 12px; }
		.logo-item { width: 142px; height: 88px; padding: 0 17px; gap: 12px; }
		.logo-item :global(.logo-mark) { width: 36px; height: 36px; }
		.band-index { min-height: 0; padding: 22px 0 25px; display: block; }
		.band-index > div { margin-top: 13px; justify-content: flex-start; gap: 7px 15px; }
	}

	@media (prefers-reduced-motion: reduce) {
		.logo-runway { overflow-x: auto; }
		.logo-runway::before,
		.logo-runway::after { display: none; }
		.logo-track { animation: none; }
		.logo-set.duplicate { display: none; }
		.logo-item { transform: none !important; transition: none; }
	}
</style>
