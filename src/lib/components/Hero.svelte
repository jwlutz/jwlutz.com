<script lang="ts">
	import { inview } from '$lib/actions/inview';
	import type { Profile } from '$lib/types';

	let { profile }: { profile: Profile } = $props();
</script>

<section id="home" class="min-h-screen flex items-center justify-center pt-20 pb-16">
	<div class="max-w-[1200px] mx-auto px-6 w-full">
		<div class="animate-on-scroll" use:inview>
			<!-- Hero Card -->
			<div
				class="bg-gradient-to-br from-white/80 via-blue-50/50 to-purple-50/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 lg:p-16 shadow-lg border border-white/50"
			>
				<div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
					<!-- Left Content -->
					<div class="flex-1 text-center lg:text-left">
						<!-- Role Tags -->
						<p
							class="text-xs md:text-sm font-medium tracking-widest text-[var(--color-text-secondary)] uppercase mb-6"
						>
							AI Engineer &bull; Data Scientist &bull; Software Engineer
						</p>

						<!-- Name -->
						<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] mb-4">
							{profile.name}
						</h1>

						<!-- Tagline -->
						<p class="text-base md:text-lg lg:text-xl text-[var(--color-text-secondary)] mb-8 whitespace-nowrap">
							I Build Systems that Scale, and Answer Questions that Matter.
						</p>

						<!-- Location & Education -->
						<p
							class="text-sm text-[var(--color-text-secondary)] flex items-center justify-center lg:justify-start gap-2 flex-wrap"
						>
							<span class="flex items-center gap-1">
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
								{profile.location}
							</span>
							<span>&bull;</span>
							<span>{profile.subtitle}</span>
						</p>
					</div>

					<!-- Right: Headshot -->
					<div class="flex-shrink-0">
						<div
							class="w-48 h-56 md:w-56 md:h-64 lg:w-64 lg:h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 shadow-xl"
						>
							<img
								src="/headshot.jpg"
								alt={profile.name}
								class="w-full h-full object-cover object-top"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
