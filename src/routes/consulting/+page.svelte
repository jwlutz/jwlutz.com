<script lang="ts">
	import { profile, consulting as consultingData } from '$lib';
	import { onMount } from 'svelte';
	import { inview } from '$lib/actions/inview';
	import { darkMode } from '$lib/stores/darkMode';
	import { techIcons } from '$lib/data/tech-icons';

	// Mermaid is dynamically imported on first diagram expansion to keep it out of the initial bundle.
	let mermaid: typeof import('mermaid').default | null = null;
	async function ensureMermaid(isDark: boolean) {
		if (!mermaid) {
			mermaid = (await import('mermaid')).default;
			initMermaid(isDark);
		}
	}

	// All page copy lives in /content.yaml at the repo root.
	const { hero, services, work: workCopy, cta } = consultingData;

	let pipelineExpanded = $state(false);
	let feedmeExpanded = $state(false);
	let websiteExpanded = $state(false);
	let mermaidContainer: HTMLElement;
	let feedmeContainer: HTMLElement;
	let mermaidRendered = false;
	let feedmeRendered = false;
	let isMobile = $state(false);
	let lastMobileState = false;
	let lastDarkModeState: boolean | null = null;

	// Desktop diagrams (left to right)
	const ecommerceDiagramLR = `
flowchart LR
    A[Employee Photos] -->|40k+ items| B[CV + OCR]
    A --> C[AWS S3]
    B --> D[Supabase]
    C --> E[Streamlit Review App]
    D --> E
    E -->|Edit| D
    C --> F[Lightspeed POS]
    D --> F
    F --> G[Website]
`;

	const feedmeDiagramLR = `
flowchart LR
    A[Menu APIs] --> B[Scraper]
    B --> C[Supabase]
    C --> D[Router]
    D --> E[OR-Tools]
    D --> F[LLM]
    E --> G[Filter]
    F --> G
    G --> H[API]
    H --> I[Metrics]
    H --> J[App]
`;

	// Mobile diagrams (top to bottom)
	const ecommerceDiagramTB = `
flowchart TB
    A[Employee Photos] -->|40k+ items| B[CV + OCR]
    A --> C[AWS S3]
    B --> D[Supabase]
    C --> E[Streamlit App]
    D --> E
    E -->|Edit| D
    C --> F[Lightspeed POS]
    D --> F
    F --> G[Website]
`;

	const feedmeDiagramTB = `
flowchart TB
    A[Menu APIs] --> B[Scraper]
    B --> C[Supabase]
    C --> D[Router]
    D --> E[OR-Tools]
    D --> F[LLM]
    E --> G[Filter]
    F --> G
    G --> H[API]
    H --> I[Metrics]
    H --> J[App]
`;

	// Get current diagram based on screen size
	let ecommerceDiagram = $derived(isMobile ? ecommerceDiagramTB : ecommerceDiagramLR);
	let feedmeDiagram = $derived(isMobile ? feedmeDiagramTB : feedmeDiagramLR);


	// SVG path content for service category icons, keyed by the `icon` field in consulting.json
	const serviceIcons: Record<string, string> = {
		home: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path d="M9 22V12h6v10"/>',
		stack: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
		sparkle: '<circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>',
		dashboard: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>'
	};

	function checkMobile() {
		isMobile = window.innerWidth < 900;
	}

	function initMermaid(isDark: boolean) {
		if (!mermaid) return;
		const themeVariables = isDark
			? {
					primaryColor: '#10b981',
					primaryTextColor: '#fafafa',
					primaryBorderColor: '#10b981',
					lineColor: '#10b981',
					secondaryColor: '#1e1e1e',
					tertiaryColor: '#0c0c0c',
					background: '#0c0c0c',
					mainBkg: '#1a1a1a',
					nodeBorder: '#10b981',
					clusterBkg: 'rgba(16, 185, 129, 0.05)',
					clusterBorder: 'rgba(16, 185, 129, 0.2)',
					titleColor: '#fafafa',
					edgeLabelBackground: '#0c0c0c'
			  }
			: {
					primaryColor: '#10b981',
					primaryTextColor: '#1a1a1a',
					primaryBorderColor: '#10b981',
					lineColor: '#10b981',
					secondaryColor: '#f1f3f4',
					tertiaryColor: '#ffffff',
					background: '#ffffff',
					mainBkg: '#f8f9fa',
					nodeBorder: '#10b981',
					clusterBkg: 'rgba(16, 185, 129, 0.05)',
					clusterBorder: 'rgba(16, 185, 129, 0.2)',
					titleColor: '#1a1a1a',
					edgeLabelBackground: '#ffffff'
			  };

		mermaid.initialize({
			startOnLoad: false,
			theme: isDark ? 'dark' : 'default',
			themeVariables,
			flowchart: {
				curve: 'basis',
				padding: 15,
				nodeSpacing: 40,
				rankSpacing: 50,
				useMaxWidth: true,
				htmlLabels: true
			},
			fontSize: 16
		});
	}

	onMount(() => {
		checkMobile();
		lastMobileState = isMobile;
		lastDarkModeState = $darkMode;
		window.addEventListener('resize', handleResize);

		// Subscribe to dark mode changes to re-render charts (only after mermaid is loaded)
		const unsubscribe = darkMode.subscribe((isDark) => {
			if (lastDarkModeState !== null && lastDarkModeState !== isDark && mermaid) {
				initMermaid(isDark);
				// Re-render charts if they're visible
				if (mermaidRendered) {
					mermaidRendered = false;
					renderEcommerce();
				}
				if (feedmeRendered) {
					feedmeRendered = false;
					renderFeedme();
				}
			}
			lastDarkModeState = isDark;
		});

		return () => {
			window.removeEventListener('resize', handleResize);
			unsubscribe();
		};
	});

	function handleResize() {
		checkMobile();
		// Re-render diagrams if mobile state changed
		if (lastMobileState !== isMobile) {
			lastMobileState = isMobile;
			if (mermaidRendered) {
				mermaidRendered = false;
				renderEcommerce();
			}
			if (feedmeRendered) {
				feedmeRendered = false;
				renderFeedme();
			}
		}
	}

	let renderCount = 0;

	async function renderEcommerce() {
		if (mermaidContainer) {
			try {
				await ensureMermaid($darkMode);
				renderCount++;
				const { svg } = await mermaid!.render(`ecommerce-diagram-${renderCount}`, ecommerceDiagram);
				mermaidContainer.innerHTML = svg;
				mermaidRendered = true;
			} catch (e) {
				console.error('Mermaid render error:', e);
			}
		}
	}

	async function renderFeedme() {
		if (feedmeContainer) {
			try {
				await ensureMermaid($darkMode);
				renderCount++;
				const { svg } = await mermaid!.render(`feedme-diagram-${renderCount}`, feedmeDiagram);
				feedmeContainer.innerHTML = svg;
				feedmeRendered = true;
			} catch (e) {
				console.error('Mermaid render error:', e);
			}
		}
	}

	$effect(() => {
		if (pipelineExpanded && !mermaidRendered) {
			renderEcommerce();
		}
	});

	$effect(() => {
		if (feedmeExpanded && !feedmeRendered) {
			renderFeedme();
		}
	});

	const work = workCopy.items;
</script>

<div class="page">
	<!-- Hero -->
	<section id="hero" class="hero">
		<div use:inview class="hero-content animate-on-scroll">
			<h1>{hero.title}</h1>
			<p>{@html hero.subtitle.replace(/\n/g, '<br/>')}</p>
			<a href="mailto:{profile.email}" class="btn-primary">
				{hero.ctaLabel}
			</a>
		</div>
	</section>

	<!-- Services -->
	<section id="services" class="services">
		<div class="section-header">
			<span class="label">{services.label}</span>
			<h2>{services.heading}</h2>
		</div>

		<div class="services-grid">
			{#each services.items as item, i}
				<div
					use:inview
					class="service-card animate-on-scroll"
					style="transition-delay: {i * 100}ms"
				>
					<div class="service-icon-large">
						<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							{@html serviceIcons[item.icon] || ''}
						</svg>
					</div>
					<h3>{item.title}</h3>
					<p>{item.description}</p>
					<ul class="service-features">
						{#each item.features as feature}
							<li>{feature}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</section>

	<!-- Work -->
	<section id="work" class="work">
		<div class="section-header">
			<span class="label">{workCopy.label}</span>
			<h2>{workCopy.heading}</h2>
		</div>

		<div class="work-grid">
			{#each work as project, i}
				<article
					use:inview
					class="work-card animate-on-scroll"
					class:expandable={project.expandable}
					class:expanded={(project.id === 'ecommerce' && pipelineExpanded) || (project.id === 'feedme' && feedmeExpanded) || (project.id === 'website' && websiteExpanded)}
					style="transition-delay: {i * 100}ms"
				>
						<button
							class="card-header"
							onclick={() => {
								if (project.id === 'ecommerce') pipelineExpanded = !pipelineExpanded;
								if (project.id === 'feedme') feedmeExpanded = !feedmeExpanded;
								if (project.id === 'website') websiteExpanded = !websiteExpanded;
							}}
							disabled={!project.expandable}
						>
							<div class="card-content">
								<h3>{project.title}</h3>
								<p>{project.description}</p>
								{#if project.tech?.length}
									<div class="tech-stack-inline">
										<div class="tech-icons">
											{#each project.tech as tech}
												<div class="tech-icon-wrapper">
													<span class="tech-tooltip">{tech}</span>
													<div class="tech-icon" style="background: {techIcons[tech]?.color || '#666'}">
														<svg viewBox="0 0 24 24" fill="currentColor">
															{@html techIcons[tech]?.icon || ''}
														</svg>
													</div>
												</div>
											{/each}
										</div>
									</div>
								{/if}
							</div>
							{#if project.expandable}
								<div class="expand-icon" class:rotated={(project.id === 'ecommerce' && pipelineExpanded) || (project.id === 'feedme' && feedmeExpanded) || (project.id === 'website' && websiteExpanded)}>
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<path d="M6 9l6 6 6-6"/>
									</svg>
								</div>
							{/if}
						</button>

						{#if project.id === 'ecommerce'}
							<div class="pipeline-container" class:visible={pipelineExpanded}>
								<div class="mermaid-wrapper" bind:this={mermaidContainer}></div>
							</div>
						{/if}

						{#if project.id === 'feedme'}
							<div class="pipeline-container" class:visible={feedmeExpanded}>
								<div class="mermaid-wrapper" bind:this={feedmeContainer}></div>
							</div>
						{/if}

						{#if project.id === 'website' && project.examples}
							<div class="pipeline-container" class:visible={websiteExpanded}>
								<div class="examples-section">
									<span class="examples-label">{project.examplesLabel ?? 'See some examples'}</span>
									<div class="example-links">
										{#each project.examples as ex}
											<a href={ex.url} target="_blank" rel="noopener noreferrer" class="example-link">
												<span>{ex.label}</span>
												<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
													<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
												</svg>
											</a>
										{/each}
									</div>
								</div>
							</div>
						{/if}
					</article>
			{/each}
		</div>
	</section>

	<!-- CTA -->
	<section id="cta" class="cta">
		<div use:inview class="cta-content animate-on-scroll">
			<h2>{cta.heading}</h2>
			<p>{cta.subheading}</p>
			<a href="mailto:{profile.email}" class="btn-primary btn-lg">
				{cta.ctaLabel}
			</a>
		</div>
	</section>
</div>

<style>
	.page {
		--accent: var(--color-accent);
		--accent-secondary: var(--color-accent-secondary);
		--text: var(--color-text-primary);
		--text-muted: var(--color-text-secondary);
		--text-dim: var(--color-text-secondary);
		--border: var(--color-border);
		--card: var(--color-surface);
		--card-hover: var(--color-surface-hover);
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* Hero */
	.hero {
		width: 100%;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 8rem 1.5rem;
		position: relative;
		box-sizing: border-box;
	}

	.hero-content {
		max-width: 720px;
		text-align: center;
		width: 100%;
		padding: 0 1rem;
		box-sizing: border-box;
	}

	h1 {
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: 600;
		line-height: 1.1;
		letter-spacing: -0.03em;
		margin-bottom: 1.5rem;
	}

	.hero-content > p {
		font-size: 1.25rem;
		color: var(--text-muted);
		line-height: 1.6;
		max-width: 540px;
		margin: 0 auto 2rem;
	}

	.hero-cta {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.875rem 1.5rem;
		background: var(--accent);
		color: #000;
		font-weight: 600;
		font-size: 0.9375rem;
		border-radius: 8px;
		text-decoration: none;
		transition: all 0.2s;
	}

	.btn-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 0 40px rgba(16, 185, 129, 0.3);
	}

	.btn-lg {
		padding: 1rem 2rem;
		font-size: 1rem;
	}

	.response-time {
		font-size: 0.875rem;
		color: var(--text-dim);
	}

	/* Sections */
	section:not(.hero) {
		width: 100%;
		max-width: 1200px;
		margin-left: auto;
		margin-right: auto;
		padding: 6rem 1.5rem;
		position: relative;
		box-sizing: border-box;
	}

	.section-header {
		margin-bottom: 3rem;
		text-align: center;
	}

	.label {
		display: inline-block;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--accent);
		margin-bottom: 0.75rem;
	}

	.section-header h2 {
		font-size: 1.75rem;
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	/* Work */
	.work {
		border-top: 1px solid var(--border);
	}

	.work-grid {
		display: grid;
		gap: 1rem;
	}

	.work-card {
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: 16px;
		padding: 2rem;
		transition: all 0.25s;
		overflow: visible;
	}

	.work-card:hover {
		background: var(--card-hover);
		border-color: var(--accent);
		transform: translateY(-2px);
		box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.15);
	}

	.work-card.expandable {
		cursor: pointer;
	}

	.work-card.expandable:hover h3 {
		color: var(--accent);
	}

	.work-card h3 {
		font-size: 1.125rem;
		font-weight: 600;
		margin-bottom: 0.75rem;
	}

	.work-card p {
		font-size: 0.9375rem;
		color: var(--text-muted);
		line-height: 1.6;
		margin-bottom: 1rem;
	}

	.tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.tags span {
		font-size: 0.75rem;
		color: var(--text-muted);
		padding: 0.25rem 0.625rem;
		background: var(--color-surface-hover);
		border: 1px solid var(--border);
		border-radius: 4px;
	}

	/* Expandable card */
	.card-header {
		all: unset;
		width: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		cursor: default;
		box-sizing: border-box;
		overflow: visible;
	}

	.work-card.expandable .card-header {
		cursor: pointer;
	}

	.work-card.expandable .card-header:hover .expand-icon {
		color: var(--accent);
	}

	.card-content {
		flex: 1;
		text-align: left;
		min-width: 0;
	}

	.card-content h3,
	.card-content p {
		word-wrap: break-word;
		overflow-wrap: break-word;
	}

	.expand-icon {
		color: var(--text-dim);
		transition: transform 0.3s ease, color 0.2s;
		flex-shrink: 0;
		margin-top: 0.25rem;
	}

	.expand-icon.rotated {
		transform: rotate(180deg);
		color: var(--accent);
	}

	.work-card.expandable:hover .expand-icon {
		color: var(--accent);
	}

	/* Pipeline / Mermaid */
	.pipeline-container {
		max-height: 0;
		overflow: hidden;
		transition: max-height 0.5s ease, opacity 0.4s ease, margin 0.3s ease;
		opacity: 0;
		margin-top: 0;
	}

	.pipeline-container.visible {
		max-height: 1200px;
		opacity: 1;
		margin-top: 1.5rem;
	}

	.mermaid-wrapper {
		padding: 1.5rem;
		background: rgba(16, 185, 129, 0.03);
		border: 1px solid rgba(16, 185, 129, 0.15);
		border-radius: 12px;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.mermaid-wrapper :global(svg) {
		display: block;
		height: auto;
		min-height: 120px;
		max-width: 100%;
	}

	.mermaid-wrapper :global(.nodeLabel) {
		font-family: inherit;
		font-weight: 500;
	}

	.mermaid-wrapper :global(.node rect),
	.mermaid-wrapper :global(.node polygon) {
		rx: 6px;
		ry: 6px;
	}

	.mermaid-wrapper :global(.edgeLabel) {
		font-size: 0.75rem;
	}

	/* Tech Stack */
	.tech-stack {
		margin-bottom: 1.5rem;
		padding: 2.5rem 0 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tech-label {
		display: none;
	}

	.tech-icons {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.875rem;
		padding: 0.25rem;
	}

	.tech-icon-wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.tech-tooltip {
		position: absolute;
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		margin-bottom: 8px;
		padding: 0.5rem 0.75rem;
		background: var(--card);
		color: var(--text);
		font-size: 0.75rem;
		font-weight: 600;
		border-radius: 6px;
		white-space: nowrap;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.2s ease;
		z-index: 100;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		border: 1px solid var(--border);
	}

	.tech-icon-wrapper:hover .tech-tooltip {
		opacity: 1;
	}

	.tech-icon {
		width: 52px;
		height: 52px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
		cursor: pointer;
	}

	.tech-icon-wrapper:hover .tech-icon {
		transform: scale(1.1);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}

	.tech-icon svg {
		width: 26px;
		height: 26px;
	}

	/* Inline tech stack for non-expandable cards */
	.tech-stack-inline {
		margin-top: 1rem;
		padding-top: 1rem;
		padding-bottom: 0.5rem;
		margin-bottom: -0.5rem;
	}

	.tech-stack-inline .tech-icons {
		justify-content: flex-start;
		gap: 0.625rem;
	}

	.tech-stack-inline .tech-icon {
		width: 40px;
		height: 40px;
	}

	.tech-stack-inline .tech-icon svg {
		width: 20px;
		height: 20px;
	}

	/* Examples section */
	.examples-section {
		padding: 2rem;
		background: rgba(16, 185, 129, 0.03);
		border: 1px solid rgba(16, 185, 129, 0.15);
		border-radius: 12px;
		text-align: center;
	}

	.examples-label {
		display: block;
		font-size: 0.875rem;
		color: var(--text-muted);
		margin-bottom: 1.25rem;
		font-weight: 500;
	}

	.example-links {
		display: flex;
		justify-content: center;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.example-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.25rem;
		background: rgba(16, 185, 129, 0.1);
		border: 1px solid rgba(16, 185, 129, 0.25);
		border-radius: 8px;
		color: var(--accent);
		text-decoration: none;
		font-weight: 500;
		font-size: 0.9375rem;
		transition: all 0.2s ease;
	}

	.example-link:hover {
		background: rgba(16, 185, 129, 0.2);
		border-color: var(--accent);
		transform: translateY(-2px);
	}

	.example-link svg {
		opacity: 0.7;
		transition: opacity 0.2s;
	}

	.example-link:hover svg {
		opacity: 1;
	}

	/* Services */
	.services {
		border-top: 1px solid var(--border);
	}

	.services-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
	}

	.service-card {
		padding: 2rem;
		background: var(--card);
		border: 1px solid var(--border);
		border-radius: 16px;
		transition: all 0.25s;
		overflow: hidden;
	}

	.service-card h3,
	.service-card p {
		word-wrap: break-word;
		overflow-wrap: break-word;
	}

	.service-card:hover {
		border-color: rgba(16, 185, 129, 0.3);
		background: var(--card-hover);
		transform: translateY(-4px);
	}

	.service-icon-large {
		width: 56px;
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(16, 185, 129, 0.1);
		border: 1px solid rgba(16, 185, 129, 0.2);
		border-radius: 12px;
		color: var(--accent);
		margin-bottom: 1.25rem;
	}

	.service-card h3 {
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 0.75rem;
	}

	.service-card p {
		font-size: 0.9375rem;
		color: var(--text-muted);
		line-height: 1.6;
		margin-bottom: 1.25rem;
	}

	.service-features {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.service-features li {
		font-size: 0.8125rem;
		color: var(--text-dim);
		padding: 0.375rem 0.75rem;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 6px;
	}

	/* CTA */
	.cta {
		border-top: 1px solid var(--border);
	}

	.cta-content {
		text-align: center;
		padding: 3rem;
		background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(59, 130, 246, 0.05));
		border: 1px solid var(--border);
		border-radius: 20px;
	}

	.cta-content h2 {
		font-size: 2rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.cta-content p {
		color: var(--text-muted);
		margin-bottom: 1.5rem;
	}

	/* Responsive */
	@media (max-width: 900px) {
		.mermaid-wrapper {
			display: flex;
			justify-content: center;
		}

		.mermaid-wrapper :global(svg) {
			max-width: 100%;
		}
	}

	@media (max-width: 768px) {
		.hero {
			padding: 6rem 1.5rem;
		}

		section:not(.hero) {
			padding: 4rem 1.5rem;
		}

		.services-grid {
			grid-template-columns: 1fr;
		}

		.service-card {
			padding: 1.5rem;
		}

		.work-card {
			padding: 1.5rem;
		}

		.mermaid-wrapper {
			padding: 1rem;
		}

		.tech-icon {
			width: 44px;
			height: 44px;
		}

		.tech-icon svg {
			width: 22px;
			height: 22px;
		}

		.tech-icons {
			gap: 0.625rem;
		}

		.tech-stack-inline .tech-icon {
			width: 36px;
			height: 36px;
		}

		.tech-stack-inline .tech-icon svg {
			width: 18px;
			height: 18px;
		}

		.cta-content {
			padding: 2rem 1.5rem;
		}

		.cta-content h2 {
			font-size: 1.5rem;
		}

		.example-links {
			flex-direction: column;
			gap: 0.75rem;
		}

		.example-link {
			justify-content: center;
		}
	}

	@media (max-width: 480px) {
		.hero {
			padding: 5rem 1rem;
		}

		section:not(.hero) {
			padding: 3rem 1rem;
		}

		.work-card,
		.service-card {
			padding: 1.25rem;
		}

		.work-card h3 {
			font-size: 1rem;
		}

		.work-card p {
			font-size: 0.875rem;
		}

		.service-card h3 {
			font-size: 1.1rem;
		}

		.service-card p {
			font-size: 0.875rem;
		}

		.tech-stack-inline .tech-icon {
			width: 32px;
			height: 32px;
		}

		.tech-stack-inline .tech-icon svg {
			width: 16px;
			height: 16px;
		}

		.tech-stack-inline .tech-icons {
			gap: 0.5rem;
		}

		.examples-section {
			padding: 1.25rem;
		}

		.cta-content {
			padding: 1.5rem 1rem;
		}

		.cta-content h2 {
			font-size: 1.375rem;
		}

		.btn-lg {
			padding: 0.875rem 1.5rem;
			font-size: 0.9375rem;
		}
	}
</style>
