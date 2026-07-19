<script lang="ts">
	import TechMark from './TechMark.svelte';
	import type { Project } from '$lib/types';
	import { track } from '$lib/analytics';

	let { projects }: { projects: Project[] } = $props();
	let indexRef = $state<HTMLDivElement>();
	let currentIndex = $state(0);
	let activeProject = $derived(projects[currentIndex] ?? projects[0]);

	function selectProject(index: number, source: 'index' | 'keyboard' = 'index') {
		if (!projects.length) return;
		const nextIndex = (index + projects.length) % projects.length;
		if (nextIndex === currentIndex) return;
		currentIndex = nextIndex;
		track('project_stage_select', { project_id: projects[nextIndex].id, source });
	}

	function focusTab(index: number) {
		requestAnimationFrame(() => {
			indexRef?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[index]?.focus();
		});
	}

	function move(direction: -1 | 1) {
		const nextIndex = (currentIndex + direction + projects.length) % projects.length;
		selectProject(nextIndex, 'keyboard');
		focusTab(nextIndex);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
			event.preventDefault();
			move(1);
		}
		if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
			event.preventDefault();
			move(-1);
		}
		if (event.key === 'Home') {
			event.preventDefault();
			selectProject(0, 'keyboard');
			focusTab(0);
		}
		if (event.key === 'End') {
			event.preventDefault();
			selectProject(projects.length - 1, 'keyboard');
			focusTab(projects.length - 1);
		}
	}

	function trackProject(project: Project, target: 'source' | 'live') {
		track('project_click', { project_id: project.id, target });
	}
</script>

<section id="projects" class="projects-section">
	<div class="section-shell">
		<div class="section-header-sticky">
			<p class="section-label">Projects</p>
			<div class="projects-heading">
				<h2 class="section-heading">From question to working system.</h2>
				<p>Six projects across product, machine learning, and infrastructure. Choose one to see the system and the evidence behind it.</p>
			</div>
		</div>

		{#if activeProject}
			<div class="desktop-stage">
				<div bind:this={indexRef} class="project-index" role="tablist" aria-label="Projects" aria-orientation="vertical">
					{#each projects as project, index (project.id)}
						<button
							type="button"
							role="tab"
							id={`project-tab-${project.id}`}
							aria-selected={index === currentIndex}
							aria-controls={`project-panel-${project.id}`}
							tabindex={index === currentIndex ? 0 : -1}
							class:active={index === currentIndex}
							onclick={() => selectProject(index)}
							onkeydown={handleKeydown}
						>
							<span class="index-mark"><TechMark tech={project.tech[0]} size="small" /></span>
							<span class="index-copy"><strong>{project.title}</strong><small>{project.featuredTag}</small></span>
							<span class="index-state">{index === currentIndex ? 'Viewing' : 'View'}</span>
						</button>
					{/each}
				</div>

				<div class="project-display" role="tabpanel" id={`project-panel-${activeProject.id}`} aria-labelledby={`project-tab-${activeProject.id}`} tabindex="0">
					{#key activeProject.id}
						<div class="active-story">
							<div class={`project-media project-media-${activeProject.id}`}>
								{#if activeProject.id === 'tinynccl'}
									<div class="nccl-artifact" aria-label="tinynccl data path from PyTorch through two GPU ranks">
										<div class="nccl-path">
											<span>PyTorch DDP</span><i></i><span>c10d backend</span><i></i><span>tinynccl::Comm</span><i></i><span>libibverbs</span>
										</div>
										<div class="rank-grid">
											<div><small>RANK 0</small><strong>GPU tensor</strong><span>gradient shards</span></div>
											<div class="all-reduce"><b>ALL REDUCE</b><i></i><small>softRoCE</small></div>
											<div><small>RANK 1</small><strong>GPU tensor</strong><span>gradient shards</span></div>
										</div>
										<blockquote>“ROMEO: I fear thee bear thee to undertake thee...”</blockquote>
									</div>
								{:else if activeProject.id === 'ucla-dining'}
									<div class="dining-artifact">
										<img src={activeProject.image} alt="FeedMe data and recommendation pipeline" loading="lazy" decoding="async" />
										<div class="dining-states">
											<div><small>INGEST</small><strong>UCLA menus</strong><span>Daily structured dining data</span></div>
											<div><small>SOLVE</small><strong>Nutrition constraints</strong><span>Macro targets and dining rules</span></div>
											<div><small>DELIVER</small><strong>Student meal plan</strong><span>Personalized recommendations</span></div>
										</div>
									</div>
								{:else if activeProject.image}
									<img src={activeProject.image} alt={`${activeProject.title} project artifact`} loading="lazy" decoding="async" class:contain={activeProject.imageFit === 'contain'} />
								{/if}
								<div class="media-label"><span>Project artifact</span><strong>{activeProject.featuredTag}</strong></div>
							</div>

							<div class="project-details">
								<div class="project-intro">
									<p>{activeProject.featuredTag}</p>
									<h3>{activeProject.title}</h3>
									<span>{activeProject.description}</span>
								</div>
								<div class="project-proof">
									<p>What it proves</p>
									<ul>{#each activeProject.highlights?.slice(0, 2) ?? [] as highlight}<li>{highlight}</li>{/each}</ul>
								</div>
								<div class="project-meta">
									<div class="tech-row" aria-label={`${activeProject.title} technologies`}>
										{#each activeProject.tech.slice(0, 5) as tech}<span><TechMark {tech} size="tiny" framed={false} />{tech}</span>{/each}
									</div>
									<div class="project-actions">
										{#if activeProject.live}<a href={activeProject.live} target="_blank" rel="noopener noreferrer" onclick={() => trackProject(activeProject, 'live')}>{activeProject.liveText || 'Open project'}</a>{/if}
										{#if activeProject.github}<a href={activeProject.github} target="_blank" rel="noopener noreferrer" onclick={() => trackProject(activeProject, 'source')}>View source</a>{/if}
										{#if !activeProject.live && !activeProject.github}<span>{activeProject.codeStatus || 'Private work'}</span>{/if}
									</div>
								</div>
							</div>
						</div>
					{/key}
				</div>
			</div>

			<div class="mobile-projects" aria-label="Portfolio projects">
				{#each projects as project (project.id)}
					<article class="mobile-card">
						<div class={`mobile-media project-media-${project.id}`}>
							{#if project.id === 'tinynccl'}
								<div class="mobile-nccl"><span>PyTorch DDP</span><i></i><span>tinynccl</span><i></i><span>libibverbs</span></div>
							{:else if project.id === 'ucla-dining'}
								<div class="mobile-dining"><span>Menu data</span><i></i><span>Constraint solver</span><i></i><span>Meal plan</span></div>
							{:else if project.image}
								<img src={project.image} alt={`${project.title} project artifact`} loading="lazy" decoding="async" class:contain={project.imageFit === 'contain'} />
							{/if}
							<small>{project.featuredTag}</small>
						</div>
						<div class="mobile-copy">
							<h3>{project.title}</h3>
							<p>{project.description}</p>
							<ul>{#each project.highlights?.slice(0, 2) ?? [] as highlight}<li>{highlight}</li>{/each}</ul>
							<div class="tech-row">{#each project.tech.slice(0, 4) as tech}<span><TechMark {tech} size="tiny" framed={false} />{tech}</span>{/each}</div>
							<div class="project-actions">
								{#if project.live}<a href={project.live} target="_blank" rel="noopener noreferrer" onclick={() => trackProject(project, 'live')}>{project.liveText || 'Open project'}</a>{/if}
								{#if project.github}<a href={project.github} target="_blank" rel="noopener noreferrer" onclick={() => trackProject(project, 'source')}>View source</a>{/if}
								{#if !project.live && !project.github}<span>{project.codeStatus || 'Private work'}</span>{/if}
							</div>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	.projects-section {
		padding: 120px 0 145px;
		overflow: hidden;
		border-top: 1px solid var(--color-border);
		background: var(--color-background);
		content-visibility: auto;
		contain-intrinsic-size: 1180px;
	}

	.section-shell { width: min(1320px, calc(100% - 80px)); margin: 0 auto; }
	.projects-heading { display: grid; grid-template-columns: minmax(0, 1fr) minmax(280px, 410px); align-items: end; gap: 64px; }
	.projects-heading .section-heading { max-width: 820px; }
	.projects-heading > p { margin: 0 0 8px; color: var(--color-text-secondary); font-size: 13px; line-height: 1.65; }

	.desktop-stage {
		display: grid;
		grid-template-columns: 320px minmax(0, 1fr);
		min-height: 720px;
		margin-top: 46px;
		overflow: hidden;
		border: 1px solid var(--color-border-strong);
		background: var(--color-ink);
		contain: layout paint;
	}

	.project-index { display: flex; flex-direction: column; border-right: 1px solid rgba(240, 239, 233, .13); background: #0c100d; }
	.project-index button {
		position: relative;
		flex: 1 1 0;
		min-height: 92px;
		padding: 20px 18px;
		display: grid;
		grid-template-columns: 28px minmax(0, 1fr) auto;
		align-items: center;
		gap: 13px;
		border: 0;
		border-bottom: 1px solid rgba(240, 239, 233, .1);
		background: transparent;
		color: var(--color-cream);
		text-align: left;
		cursor: pointer;
		transition: background 180ms ease, color 180ms ease;
	}
	.project-index button:last-child { border-bottom: 0; }
	.project-index button::before { content: ''; position: absolute; inset: 0 auto 0 0; width: 2px; background: var(--color-brass); transform: scaleY(0); transition: transform 220ms ease; }
	.project-index button:hover { background: rgba(240, 239, 233, .035); }
	.project-index button.active { background: rgba(240, 239, 233, .065); }
	.project-index button.active::before { transform: scaleY(1); }
	.project-index button:focus-visible { z-index: 2; outline-offset: -3px; }
	.index-mark { opacity: .64; transition: opacity 180ms ease, transform 180ms ease; }
	.project-index button.active .index-mark { opacity: 1; transform: translateX(2px); }
	.index-copy { min-width: 0; display: grid; gap: 5px; }
	.index-copy strong { overflow: hidden; max-height: 2.5em; color: rgba(240, 239, 233, .88); font: 500 12px/1.25 var(--font-family-sans); }
	.index-copy small, .index-state { color: #787f79; font: 500 8px var(--font-family-mono); letter-spacing: .08em; text-transform: uppercase; }
	.project-index button.active .index-copy strong { color: var(--color-cream); }
	.project-index button.active .index-copy small, .project-index button.active .index-state { color: var(--color-brass); }

	.project-display { min-width: 0; min-height: 720px; overflow: hidden; background: #0a0d0b; }
	.project-display:focus-visible { outline: 2px solid var(--color-brass); outline-offset: -4px; }
	.active-story { min-height: 720px; display: grid; grid-template-rows: 420px minmax(0, 1fr); animation: stage-in 480ms cubic-bezier(.2,.75,.2,1) both; }
	@keyframes stage-in { from { opacity: 0; transform: translateX(16px); clip-path: inset(0 0 0 5%); } to { opacity: 1; transform: none; clip-path: inset(0); } }

	.project-media, .mobile-media { position: relative; min-width: 0; overflow: hidden; background: #111512; isolation: isolate; }
	.project-media::after, .mobile-media::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, transparent 65%, rgba(8,11,9,.66)); }
	.project-media img, .mobile-media img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top center; }
	.project-media img.contain, .mobile-media img.contain { object-fit: contain; padding: 26px; }
	.project-media-claude-o-meter { background: linear-gradient(135deg, #145f8d, #0b1115 58%); }
	.project-media-claude-o-meter img { width: 52%; margin-left: auto; margin-right: 10%; object-position: center; }
	.project-media-learning-ml { background: #f4f2ec; }
	.project-media-ucla-dining { background: #0c110f; }
	.media-label { position: absolute; z-index: 2; left: 20px; right: 20px; bottom: 17px; display: flex; justify-content: space-between; gap: 24px; color: rgba(240,239,233,.7); font: 500 8px var(--font-family-mono); letter-spacing: .09em; text-transform: uppercase; }
	.media-label strong { color: var(--color-cream); font-weight: 500; }

	.project-details { min-height: 300px; padding: 30px 32px 24px; display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(240px, .9fr); grid-template-rows: 1fr auto; gap: 24px 48px; border-top: 1px solid rgba(240,239,233,.12); color: var(--color-cream); }
	.project-intro > p, .project-proof > p { margin: 0 0 10px; color: var(--color-brass); font: 500 8px var(--font-family-mono); letter-spacing: .1em; text-transform: uppercase; }
	.project-intro h3 { margin: 0; font: 400 clamp(40px, 4vw, 58px)/.9 var(--font-family-display); letter-spacing: -.035em; }
	.project-intro > span { display: block; max-width: 600px; margin-top: 16px; color: #aeb4ae; font-size: 12px; line-height: 1.65; }
	.project-proof ul { margin: 0; padding: 0; list-style: none; }
	.project-proof li { position: relative; padding: 10px 0 10px 19px; border-top: 1px solid rgba(240,239,233,.1); color: #c7cbc6; font-size: 11px; line-height: 1.5; }
	.project-proof li::before { content: ''; position: absolute; left: 0; top: 17px; width: 6px; height: 1px; background: var(--color-brass); }
	.project-meta { grid-column: 1 / -1; padding-top: 17px; display: flex; align-items: flex-end; justify-content: space-between; gap: 22px; border-top: 1px solid rgba(240,239,233,.1); }
	.tech-row { display: flex; flex-wrap: wrap; gap: 7px 12px; }
	.tech-row > span { display: inline-flex; align-items: center; gap: 6px; color: #969d97; font: 500 8px var(--font-family-mono); }
	.project-actions { display: flex; align-items: center; gap: 10px; }
	.project-actions a, .project-actions > span { min-height: 36px; padding: 0 12px; display: inline-flex; align-items: center; border: 1px solid rgba(240,239,233,.2); color: var(--color-cream); font-size: 10px; text-decoration: none; transition: border-color 180ms ease, color 180ms ease, background 180ms ease; }
	.project-actions a:hover { border-color: var(--color-brass); color: var(--color-brass); }
	.project-actions > span { color: #777e78; }

	.nccl-artifact { height: 100%; padding: 48px 52px 46px; display: grid; grid-template-rows: auto 1fr auto; gap: 28px; background: linear-gradient(140deg, #101713, #070907 70%); color: var(--color-cream); }
	.nccl-path { display: flex; align-items: center; justify-content: center; gap: 10px; }
	.nccl-path span { padding: 8px 10px; border: 1px solid rgba(240,239,233,.15); color: #b9beb9; font: 500 8px var(--font-family-mono); }
	.nccl-path i { flex: 0 1 24px; height: 1px; background: var(--color-brass); }
	.rank-grid { display: grid; grid-template-columns: 1fr 110px 1fr; align-items: center; gap: 24px; }
	.rank-grid > div:not(.all-reduce) { min-height: 134px; padding: 22px; display: grid; align-content: center; border: 1px solid rgba(240,239,233,.16); background: rgba(240,239,233,.035); }
	.rank-grid small { color: var(--color-brass); font: 500 8px var(--font-family-mono); letter-spacing: .09em; }
	.rank-grid strong { margin: 14px 0 4px; font: 400 27px var(--font-family-display); }
	.rank-grid span { color: #7e867f; font: 500 8px var(--font-family-mono); }
	.all-reduce { display: grid; justify-items: center; gap: 9px; }
	.all-reduce b { color: #c8cdc8; font: 500 8px var(--font-family-mono); letter-spacing: .08em; }
	.all-reduce i { width: 100%; height: 2px; background: linear-gradient(90deg, var(--color-brass) 0 44%, transparent 44% 56%, var(--color-brass) 56%); }
	.nccl-artifact blockquote { margin: 0; padding-top: 16px; border-top: 1px solid rgba(240,239,233,.1); color: #737a74; font: 400 11px/1.5 var(--font-family-mono); }
	.dining-artifact { height: 100%; padding: 30px 48px 42px; display: grid; grid-template-columns: minmax(170px, .72fr) minmax(300px, 1.28fr); align-items: center; gap: 52px; background: radial-gradient(circle at 14% 44%, rgba(7,84,63,.28), transparent 37%), #0a0e0c; }
	.dining-artifact > img { width: 100%; height: 326px; object-fit: contain; }
	.dining-states { display: grid; gap: 10px; }
	.dining-states > div { min-height: 82px; padding: 15px 18px; display: grid; grid-template-columns: 58px minmax(0, 1fr); align-items: center; gap: 4px 16px; border: 1px solid rgba(240,239,233,.14); background: rgba(240,239,233,.025); }
	.dining-states small { grid-row: 1 / 3; color: var(--color-brass); font: 500 8px var(--font-family-mono); letter-spacing: .09em; }
	.dining-states strong { color: var(--color-cream); font: 400 24px/1 var(--font-family-display); }
	.dining-states span { color: #7f8780; font: 500 8px var(--font-family-mono); }

	.mobile-projects { display: none; }

	@media (max-width: 1020px) {
		.section-shell { width: min(1320px, calc(100% - 48px)); }
		.projects-heading { grid-template-columns: minmax(0, 1fr) 330px; gap: 38px; }
		.desktop-stage { grid-template-columns: 270px minmax(0, 1fr); }
		.project-details { gap: 22px 28px; padding-inline: 26px; }
		.nccl-artifact { padding-inline: 32px; }
	}

	@media (max-width: 820px) {
		.projects-section { padding: 78px 0 96px; }
		.section-shell { width: calc(100% - 32px); }
		.projects-heading { display: block; }
		.projects-heading > p { margin-top: 22px; }
		.desktop-stage { display: none; }
		.mobile-projects { width: calc(100% + 32px); margin: 34px -16px 0; padding: 0 16px 14px; display: flex; gap: 12px; overflow-x: auto; scroll-snap-type: x mandatory; overscroll-behavior-x: contain; scrollbar-width: thin; }
		.mobile-card { flex: 0 0 min(88vw, 350px); min-height: 620px; display: grid; grid-template-rows: 248px 1fr; overflow: hidden; scroll-snap-align: center; border: 1px solid var(--color-border-strong); background: var(--color-ink); color: var(--color-cream); }
		.mobile-media { min-height: 248px; }
		.mobile-media img.contain { padding: 20px; }
		.project-media-claude-o-meter img { width: 58%; margin-right: 8%; }
		.mobile-media > small { position: absolute; z-index: 2; left: 15px; bottom: 13px; color: var(--color-cream); font: 500 8px var(--font-family-mono); letter-spacing: .08em; text-transform: uppercase; }
		.mobile-copy { min-height: 0; padding: 22px 18px 18px; display: flex; flex-direction: column; }
		.mobile-copy h3 { margin: 0; font: 400 38px/.95 var(--font-family-display); letter-spacing: -.03em; }
		.mobile-copy > p { margin: 14px 0 17px; color: #a7ada7; font-size: 11px; line-height: 1.6; }
		.mobile-copy ul { margin: 0; padding: 0; list-style: none; }
		.mobile-copy li { padding: 9px 0 9px 15px; position: relative; border-top: 1px solid rgba(240,239,233,.1); color: #c4c8c4; font-size: 10px; line-height: 1.5; }
		.mobile-copy li::before { content: ''; position: absolute; left: 0; top: 15px; width: 5px; height: 1px; background: var(--color-brass); }
		.mobile-copy .tech-row { margin-top: 16px; }
		.mobile-copy .project-actions { margin-top: auto; padding-top: 18px; }
		.mobile-nccl, .mobile-dining { height: 100%; padding: 36px 24px 50px; display: grid; grid-template-columns: 1fr; align-content: center; justify-items: stretch; gap: 9px; background: linear-gradient(140deg, #101713, #070907 70%); }
		.mobile-dining { background: radial-gradient(circle at 24% 30%, rgba(7,84,63,.38), transparent 48%), #080c0a; }
		.mobile-nccl span, .mobile-dining span { padding: 11px; border: 1px solid rgba(240,239,233,.16); color: #c6cbc6; font: 500 8px var(--font-family-mono); text-align: center; }
		.mobile-nccl i, .mobile-dining i { width: 1px; height: 9px; justify-self: center; background: var(--color-brass); }
	}

	@media (prefers-reduced-motion: reduce) {
		.active-story { animation: none; }
		.project-index button::before, .index-mark { transition: none; }
	}
</style>
