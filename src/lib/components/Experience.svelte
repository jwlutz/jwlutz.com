<script lang="ts">
	import { inview } from '$lib/actions/inview';
	import type { ExperienceItem } from '$lib/types';

	let { experiences }: { experiences: ExperienceItem[] } = $props();
</script>

<section id="experience" class="py-32">
	<div class="max-w-[1200px] mx-auto px-6">
		<div class="section-header-sticky text-center">
			<p class="section-label">Background</p>
			<h2 class="section-heading">Experience</h2>
		</div>

		<div class="max-w-3xl mx-auto mt-8 space-y-6">
			{#each experiences as exp, i}
				<div
					class="animate-on-scroll"
					use:inview
					style="transition-delay: {i * 100}ms"
				>
					<article class="experience-card">
						<div class="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
							<div>
								{#if exp.id === 'lutz-consulting'}
									<a href="/consulting" class="group">
										<h3 class="font-semibold text-lg text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors inline-flex items-center gap-2">
											{exp.company}
											<svg class="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
											</svg>
										</h3>
									</a>
								{:else}
									<h3 class="font-semibold text-lg text-[var(--color-text-primary)]">
										{exp.company}
									</h3>
								{/if}
								<p class="text-[var(--color-accent)] font-medium">{exp.role}</p>
							</div>
							<div class="md:text-right">
								<p class="text-[var(--color-text-secondary)] text-sm font-mono">{exp.period}</p>
								<p class="text-[var(--color-text-secondary)] text-sm flex items-center gap-1 md:justify-end">
									<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
										/>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
									{exp.location}
								</p>
							</div>
						</div>

						<ul class="space-y-2">
							{#each exp.description as item}
								<li class="text-[var(--color-text-secondary)] text-sm leading-relaxed flex gap-3">
									<span class="text-[var(--color-accent)] mt-0.5 flex-shrink-0">•</span>
									<span>{item}</span>
								</li>
							{/each}
						</ul>
					</article>
				</div>
			{/each}
		</div>
	</div>
</section>
