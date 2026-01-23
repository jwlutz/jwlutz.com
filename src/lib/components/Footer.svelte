<script lang="ts">
	import { page } from '$app/stores';

	const year = new Date().getFullYear();

	// Check if we're on a project/demo page (dark mode)
	let isDarkMode = $derived($page.url.pathname.startsWith('/projects/'));
</script>

<footer class="py-8 border-t {isDarkMode ? 'bg-[#0a0a0a] border-[#262626]' : 'border-[var(--color-border)]'}">
	<div class="max-w-[1200px] mx-auto px-6">
		<p class="text-center text-sm {isDarkMode ? 'text-[#a1a1aa]' : 'text-[var(--color-text-secondary)]'}">
			Built with
			<span class="text-[var(--color-accent)]">SvelteKit</span>
			&
			<span class="{isDarkMode ? 'text-[#3b82f6]' : 'text-[var(--color-accent-secondary)]'}">Tailwind CSS</span>
		</p>
		<p class="text-center opacity-60 text-xs mt-2 {isDarkMode ? 'text-[#a1a1aa]' : 'text-[var(--color-text-secondary)]'}">
			&copy; Jack Lutz
		</p>
	</div>
</footer>
