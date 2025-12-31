<script lang="ts">
	import type { Profile } from '$lib/types';

	let {
		activeSection = 'home',
		profile
	}: { activeSection?: string; profile: Profile } = $props();
	let mobileMenuOpen = $state(false);

	const navItems = [
		{ id: 'home', label: 'Home' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'skills', label: 'Skills' },
		{ id: 'contact', label: 'Contact' }
	];

	function scrollToSection(id: string) {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
		mobileMenuOpen = false;
	}
</script>

<nav
	class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[var(--color-border)]"
>
	<div class="max-w-[1200px] mx-auto px-6 py-4">
		<div class="flex items-center justify-between">
			<button
				onclick={() => scrollToSection('home')}
				class="font-mono text-lg font-bold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
			>
				JL
			</button>

			<!-- Desktop Nav -->
			<div class="hidden md:flex items-center gap-8">
				{#each navItems as item}
					<button
						onclick={() => scrollToSection(item.id)}
						class="nav-link {activeSection === item.id ? 'nav-link-active' : ''}"
					>
						{item.label}
					</button>
				{/each}
				<a
					href="/resume.pdf"
					target="_blank"
					rel="noopener noreferrer"
					class="nav-link"
				>
					Resume
				</a>
			</div>

			<!-- Social Links -->
			<div class="hidden md:flex items-center gap-4">
				<a
					href={profile.social.github}
					target="_blank"
					rel="noopener noreferrer"
					class="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
					aria-label="GitHub"
				>
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
						/>
					</svg>
				</a>
				<a
					href={profile.social.linkedin}
					target="_blank"
					rel="noopener noreferrer"
					class="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
					aria-label="LinkedIn"
				>
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
						/>
					</svg>
				</a>
				<a
					href="mailto:{profile.email}"
					class="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
					aria-label="Email"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						/>
					</svg>
				</a>
				<a
					href="/resume.pdf"
					target="_blank"
					rel="noopener noreferrer"
					class="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
					aria-label="Resume"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
				</a>
			</div>

			<!-- Mobile Menu Button -->
			<button
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				class="md:hidden p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
				aria-label="Toggle menu"
			>
				{#if mobileMenuOpen}
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				{:else}
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				{/if}
			</button>
		</div>

		<!-- Mobile Menu -->
		{#if mobileMenuOpen}
			<div class="md:hidden mt-4 pb-4 border-t border-[var(--color-border)] pt-4">
				<div class="flex flex-col gap-4">
					{#each navItems as item}
						<button
							onclick={() => scrollToSection(item.id)}
							class="nav-link text-left {activeSection === item.id ? 'nav-link-active' : ''}"
						>
							{item.label}
						</button>
					{/each}
					<a
						href="/resume.pdf"
						target="_blank"
						rel="noopener noreferrer"
						class="nav-link text-left"
					>
						Resume
					</a>
				</div>
			</div>
		{/if}
	</div>
</nav>
