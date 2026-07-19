import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		watch: {
			// The agent coordination files (COMMS.md, tickets/, docs/) change
			// constantly during two-session work; without this, every append
			// full-reloads every open page (discovered 2026-07-18).
			ignored: ['**/COMMS.md', '**/tickets/**', '**/docs/**', '**/AGENTS.md', '**/CLAUDE.md']
		}
	}
});
