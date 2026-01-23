<script lang="ts">
	import type { Profile } from '$lib/types';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { darkMode, toggleDarkMode } from '$lib/stores/darkMode';

	let {
		activeSection = 'home',
		profile
	}: { activeSection?: string; profile: Profile } = $props();
	let mobileMenuOpen = $state(false);

	// Check current page
	let isHomepage = $derived($page.url.pathname === '/');
	let isConsulting = $derived($page.url.pathname.startsWith('/consulting'));
	// Use global dark mode store
	let isDarkMode = $derived($darkMode);

	// Logo text based on page
	let logoText = $derived(isConsulting ? 'LCG' : 'JL');

	const navItems = [
		{ id: 'home', label: 'Home' },
		{ id: 'skills', label: 'Skills' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'contact', label: 'Contact' }
	];

	function navigateToSection(id: string) {
		if (isHomepage) {
			// On homepage, scroll to section
			const element = document.getElementById(id);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		} else {
			// On other pages, navigate to homepage with hash
			goto(`/#${id}`);
		}
		mobileMenuOpen = false;
	}
</script>

<div class="fixed top-0 left-0 right-0 z-50 px-6 py-4">
	<nav
		class="max-w-[1200px] mx-auto backdrop-blur-md border rounded-xl {isDarkMode ? 'bg-[#0a0a0a]/90 border-[#262626]' : 'bg-white/80 border-[var(--color-border)]'}"
	>
		<div class="px-6 py-3">
			<div class="flex items-center justify-between">
			<!-- Left side: Hamburger (mobile) + Logo -->
			<div class="flex items-center gap-3">
				<!-- Mobile Menu Button (left side on mobile) -->
				<button
					onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
					class="md:hidden p-2 -ml-2 transition-colors {isDarkMode ? 'text-[#71717a] hover:text-white' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}"
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

				<button
					onclick={() => isConsulting ? goto('/consulting') : navigateToSection('home')}
					class="font-mono text-lg font-bold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
				>
					{logoText}
				</button>
			</div>

			<!-- Desktop Nav -->
			<div class="hidden md:flex items-center gap-8">
				{#each navItems as item}
					<button
						onclick={() => navigateToSection(item.id)}
						class="font-medium transition-colors {isDarkMode
							? 'text-[#a1a1aa] hover:text-white'
							: 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'} {activeSection === item.id ? 'text-[var(--color-accent)]' : ''}"
					>
						{item.label}
					</button>
				{/each}
				<a
					href="/resume.pdf"
					target="_blank"
					rel="noopener noreferrer"
					class="font-medium transition-colors {isDarkMode
						? 'text-[#a1a1aa] hover:text-white'
						: 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}"
				>
					Resume
				</a>
				<a
					href="/consulting"
					class="font-medium transition-colors {isDarkMode
						? 'text-[#a1a1aa] hover:text-white'
						: 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}"
				>
					Consulting
				</a>
			</div>

			<!-- Social Links (desktop only) -->
			<div class="hidden md:flex items-center gap-4">
				<a
					href={profile.social.github}
					target="_blank"
					rel="noopener noreferrer"
					class="transition-colors {isDarkMode ? 'text-[#71717a] hover:text-white' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}"
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
					class="transition-colors {isDarkMode ? 'text-[#71717a] hover:text-white' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}"
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
					class="transition-colors {isDarkMode ? 'text-[#71717a] hover:text-white' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}"
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
					class="transition-colors {isDarkMode ? 'text-[#71717a] hover:text-white' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}"
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
				<!-- Theme Toggle Switch -->
				<button
					onclick={toggleDarkMode}
					class="theme-toggle"
					class:dark={isDarkMode}
					aria-label="Toggle dark mode"
					title="{isDarkMode ? 'Dark' : 'Light'} mode"
				>
					<svg class="sun-icon" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
					</svg>
					<span class="toggle-track">
						<span class="toggle-thumb"></span>
					</span>
					<svg class="moon-icon" fill="currentColor" viewBox="0 0 24 24">
						<path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
					</svg>
				</button>
			</div>
		</div>

		<!-- Mobile Menu -->
		{#if mobileMenuOpen}
			<div class="md:hidden mt-4 pb-4 border-t pt-4 {isDarkMode ? 'border-[#262626]' : 'border-[var(--color-border)]'}">
				<div class="flex flex-col gap-4">
					{#each navItems as item}
						<button
							onclick={() => navigateToSection(item.id)}
							class="text-left font-medium transition-colors {isDarkMode
								? 'text-[#a1a1aa] hover:text-white'
								: 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'} {activeSection === item.id ? 'text-[var(--color-accent)]' : ''}"
						>
							{item.label}
						</button>
					{/each}
					<a
						href="/resume.pdf"
						target="_blank"
						rel="noopener noreferrer"
						class="text-left font-medium transition-colors {isDarkMode
							? 'text-[#a1a1aa] hover:text-white'
							: 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}"
					>
						Resume
					</a>
					<a
						href="/consulting"
						class="text-left font-medium transition-colors {isDarkMode
							? 'text-[#a1a1aa] hover:text-white'
							: 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}"
					>
						Consulting
					</a>

					<!-- Social Links (mobile) -->
					<div class="flex items-center gap-4 pt-4 border-t {isDarkMode ? 'border-[#262626]' : 'border-[var(--color-border)]'}">
						<a
							href={profile.social.github}
							target="_blank"
							rel="noopener noreferrer"
							class="transition-colors {isDarkMode ? 'text-[#71717a] hover:text-white' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}"
							aria-label="GitHub"
						>
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
							</svg>
						</a>
						<a
							href={profile.social.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							class="transition-colors {isDarkMode ? 'text-[#71717a] hover:text-white' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}"
							aria-label="LinkedIn"
						>
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
							</svg>
						</a>
						<a
							href="mailto:{profile.email}"
							class="transition-colors {isDarkMode ? 'text-[#71717a] hover:text-white' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}"
							aria-label="Email"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
							</svg>
						</a>
						<!-- Theme Toggle Switch (mobile) -->
						<button
							onclick={toggleDarkMode}
							class="theme-toggle"
							class:dark={isDarkMode}
							aria-label="Toggle dark mode"
							title="{isDarkMode ? 'Dark' : 'Light'} mode"
						>
							<svg class="sun-icon" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
							</svg>
							<span class="toggle-track">
								<span class="toggle-thumb"></span>
							</span>
							<svg class="moon-icon" fill="currentColor" viewBox="0 0 24 24">
								<path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		{/if}
		</div>
	</nav>
</div>

<style>
	.theme-toggle {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem;
		border-radius: 9999px;
		background: transparent;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.theme-toggle:hover {
		background: rgba(128, 128, 128, 0.1);
	}

	.sun-icon,
	.moon-icon {
		width: 1rem;
		height: 1rem;
		transition: all 0.3s ease;
	}

	.sun-icon {
		color: #f59e0b;
	}

	.moon-icon {
		color: var(--color-text-secondary);
	}

	.theme-toggle.dark .sun-icon {
		color: var(--color-text-secondary);
	}

	.theme-toggle.dark .moon-icon {
		color: #8b5cf6;
	}

	.toggle-track {
		position: relative;
		width: 2.5rem;
		height: 1.25rem;
		background: var(--color-border);
		border-radius: 9999px;
		transition: all 0.3s ease;
	}

	.theme-toggle.dark .toggle-track {
		background: var(--color-accent);
	}

	.toggle-thumb {
		position: absolute;
		top: 2px;
		left: 2px;
		width: 1rem;
		height: 1rem;
		background: white;
		border-radius: 50%;
		transition: all 0.3s ease;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
	}

	.theme-toggle.dark .toggle-thumb {
		left: calc(100% - 1rem - 2px);
	}
</style>
